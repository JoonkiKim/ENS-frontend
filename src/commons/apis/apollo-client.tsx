import {
  ApolloClient, // GraphQL 클라이언트의 핵심 객체
  InMemoryCache, // Apollo의 캐시 시스템
  createHttpLink, // HTTP 통신을 위한 링크
  from, // 여러 링크를 체인으로 연결
  Observable, // RxJS 스타일의 Observable (비동기 스트림 처리)
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; // 요청 컨텍스트 설정
import { onError } from "@apollo/client/link/error"; // 에러 핸들링
import {
  getAccessToken, // 인메모리에서 액세스 토큰 가져오기
  setAccessToken, // 인메모리에 액세스 토큰 저장
  clearAccessToken, // 인메모리 토큰 삭제
} from "../libraries/token";
import { RESTORE_ACCESS_TOKEN } from "./graphql-queries"; // 토큰 갱신 뮤테이션

/* ═══════════════════════════════════════════════════════════════
   HTTP 링크 생성
   ═══════════════════════════════════════════════════════════════
   - GraphQL 서버와 통신하기 위한 기본 HTTP 링크
   - uri: GraphQL 엔드포인트 주소
   - credentials: 'include' → 쿠키를 자동으로 포함 (리프레시 토큰용)
*/
const httpLink = createHttpLink({
  uri:
    // ✅ 프로덕션 환경에서는 프록시 경로 사용 (같은 도메인)
    // 개발 환경에서는 환경 변수 사용, 없으면 프록시 경로 사용
    process.env.NODE_ENV === "production"
      ? "/api/graphql" // 프로덕션: Vercel 프록시 사용
      : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "/api/graphql", // 개발: 환경 변수 또는 로컬 프록시
  credentials: "include", // 쿠키 포함 (HttpOnly 리프레시 토큰 전송)
});

/* ═══════════════════════════════════════════════════════════════
   인증 헤더 설정 링크
   ═══════════════════════════════════════════════════════════════
   - 모든 GraphQL 요청에 Authorization 헤더를 자동으로 추가
   - token.ts의 인메모리 토큰을 사용 (localStorage 대신)
   - 보안 강화: XSS 공격으로부터 안전
*/
const authLink = setContext((_, { headers }) => {
  const token = getAccessToken(); // 인메모리 토큰 가져오기

  return {
    headers: {
      ...headers,
      // 토큰이 있으면 Bearer 스키마로 추가
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/* ═══════════════════════════════════════════════════════════════
   토큰 갱신 상태 관리 변수
   ═══════════════════════════════════════════════════════════════
   - isRefreshing: 현재 토큰 갱신 중인지 여부
   - pendingRequests: 토큰 갱신 대기 중인 요청들의 콜백 배열
   
   **왜 필요한가?**
   동시에 여러 API 요청이 401 에러를 받으면, 토큰 갱신이 여러 번 
   실행되는 것을 방지하기 위해 첫 번째 요청만 갱신하고 나머지는 대기
*/
let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

/* ═══════════════════════════════════════════════════════════════
   에러 핸들링 링크 (자동 토큰 갱신의 핵심!)
   ═══════════════════════════════════════════════════════════════
   GraphQL 에러가 발생하면 자동으로 처리
   특히 401 Unauthorized 에러 시 토큰을 자동으로 갱신
*/
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    // ─────────────────────────────────────────────────────────
    // GraphQL 에러 처리
    // ─────────────────────────────────────────────────────────
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 401 Unauthorized 에러 감지
        if (
          err.extensions?.code === "UNAUTHENTICATED" ||
          err.message.includes("Unauthorized") ||
          err.message.includes("401")
        ) {
          /* ───────────────────────────────────────────────────
             예외 처리: 로그인 및 토큰 갱신 요청은 제외
             ───────────────────────────────────────────────────
             이 두 요청이 실패하면 갱신을 시도하지 않음
             (무한 루프 방지)
          */
          const operationName = operation.operationName;
          if (
            operationName === "Login" ||
            operationName === "RestoreAccessToken"
          ) {
            return; // 에러를 그대로 반환
          }

          /* ═══════════════════════════════════════════════════
             케이스 1: 첫 번째 401 에러 (토큰 갱신 시작)
             ═══════════════════════════════════════════════════ */
          if (!isRefreshing) {
            isRefreshing = true; // 갱신 중 플래그 설정

            // Observable을 반환하여 Apollo Link 체인에 연결
            return new Observable((observer) => {
              // ─────────────────────────────────────────────────
              // GraphQL로 토큰 갱신 요청
              // ─────────────────────────────────────────────────
              apolloClient
                .mutate({
                  mutation: RESTORE_ACCESS_TOKEN, // restoreAccessToken 뮤테이션
                  context: {
                    headers: {
                      authorization: "", // 헤더 제거 (쿠키로만 인증)
                    },
                  },
                })
                .then(({ data }) => {
                  const newToken = data?.restoreAccessToken;

                  if (newToken) {
                    // ✅ 토큰 갱신 성공
                    setAccessToken(newToken); // 인메모리에 새 토큰 저장

                    // 대기 중인 모든 요청 실행
                    pendingRequests.forEach((callback) => callback());
                    pendingRequests = []; // 큐 초기화

                    isRefreshing = false; // 갱신 완료 플래그 해제

                    // 현재 실패한 요청의 헤더에 새 토큰 추가
                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${newToken}`,
                      },
                    });

                    /* ─────────────────────────────────────────
                       원래 요청 재시도
                       ─────────────────────────────────────────
                       forward(operation): 실패한 요청을 다시 실행
                       subscribe(): 결과를 observer에 전달
                    */
                    const subscriber = {
                      next: observer.next.bind(observer), // 성공 시
                      error: observer.error.bind(observer), // 에러 시
                      complete: observer.complete.bind(observer), // 완료 시
                    };
                    forward(operation).subscribe(subscriber);
                  } else {
                    throw new Error("No token received");
                  }
                })
                .catch((error) => {
                  // ❌ 토큰 갱신 실패
                  clearAccessToken(); // 토큰 삭제
                  pendingRequests = []; // 대기 큐 초기화
                  isRefreshing = false; // 플래그 해제

                  // 로그인 페이지로 강제 이동
                  if (typeof window !== "undefined") {
                    window.location.href = "/login";
                  }

                  observer.error(error); // 에러를 상위로 전달
                });
            });
          } else {
            /* ═══════════════════════════════════════════════════
             케이스 2: 이미 토큰 갱신 중 (대기 큐에 추가)
             ═══════════════════════════════════════════════════
             다른 요청이 이미 토큰을 갱신 중이면,
             이 요청은 대기 큐에 추가하고 갱신 완료를 기다림
          */
            return new Observable((observer) => {
              // 대기 큐에 콜백 추가
              pendingRequests.push(() => {
                // 갱신 완료 후 실행될 코드
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${getAccessToken()}`, // 새 토큰 추가
                  },
                });

                // 요청 재시도
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };
                forward(operation).subscribe(subscriber);
              });
            });
          }
        }
      }
    }

    // ─────────────────────────────────────────────────────────
    // 네트워크 에러 처리 (서버 연결 실패 등)
    // ─────────────────────────────────────────────────────────
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
);

/* ═══════════════════════════════════════════════════════════════
   Apollo Client 생성 및 내보내기
   ═══════════════════════════════════════════════════════════════
   
   **링크 체인 순서 (중요!)**
   from([errorLink, authLink, httpLink])
   
   1. errorLink: 에러 감지 및 토큰 갱신
   2. authLink: Authorization 헤더 추가
   3. httpLink: 실제 HTTP 요청 전송
   
   요청 흐름: errorLink → authLink → httpLink → 서버
   응답 흐름: 서버 → httpLink → authLink → errorLink
*/
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]), // 링크 체인
  cache: new InMemoryCache(), // 캐시 시스템
  defaultOptions: {
    // ─────────────────────────────────────────────────────────
    // 에러 정책: 'all'
    // ─────────────────────────────────────────────────────────
    // GraphQL 에러가 있어도 부분적인 데이터를 반환
    // 에러를 직접 처리할 수 있게 함
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
