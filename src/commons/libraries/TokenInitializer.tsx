import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { accessTokenState, authCheckedState } from "../stores";
import { useMutation, useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import {
  registerAccessTokenSetter,
  setAccessToken,
  clearAccessToken,
} from "./token";
import { RESTORE_ACCESS_TOKEN } from "../apis/graphql-queries";
import MessageModal from "../../components/commons/modals/messageModal";
import { LoadingIcon } from "./loadingOverlay";

// ✅ 인증이 필요 없는 페이지 목록
const PUBLIC_PATHS = ["/", "/resetPassword"];

const AuthCheckingOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  inset: 0;
  background: #ffffff;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1500;
`;

// JWT 토큰 만료 시간 확인 함수
const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // 초를 밀리초로 변환
    const now = Date.now();
    
    // 만료 5분 전까지는 유효하다고 간주
    return exp > now + 5 * 60 * 1000;
  } catch {
    return false;
  }
};

export default function TokenInitializer() {
  const setToken = useSetRecoilState(accessTokenState);
  const setChecked = useSetRecoilState(authCheckedState);
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetAuthChecked = useResetRecoilState(authCheckedState);
  const accessToken = useRecoilValue(accessTokenState);
  const authChecked = useRecoilValue(authCheckedState);
  const router = useRouter();
  const apolloClient = useApolloClient();

  // ✅ 각 경로별 초기화 완료 여부를 추적
  const initializedPaths = useRef<Set<string>>(new Set());
  
  // 메시지 모달 상태
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // GraphQL mutation hook
  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN, {
    context: {
      headers: {
        authorization: "",
      },
    },
  });

  // ① RecoilRoot 안에서만 registerAccessTokenSetter를 호출
  useEffect(() => {
    registerAccessTokenSetter(setToken);
    return () => {
      clearAccessToken();
    };
  }, [setToken]);

  // ② 각 페이지 접근 시마다 인증 검증
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentPath = router.pathname;

    // ✅ 공개 페이지면 토큰 갱신 스킵
    const isPublicPath = PUBLIC_PATHS.includes(currentPath);

    if (isPublicPath) {
      console.log("🔓 공개 페이지: 토큰 갱신 스킵");
      setChecked(true);
      return;
    }

    // ✅ 이미 이 경로에서 검증했으면 실행 안 함 (중복 방지)
    if (initializedPaths.current.has(currentPath)) {
      console.log("✅ 이미 검증된 경로:", currentPath);
      return;
    }

    // ✅ 액세스 토큰이 있고 유효하면 리프레시 토큰 체크 스킵
    if (accessToken && isTokenValid(accessToken)) {
      console.log("✅ 유효한 액세스 토큰 존재: 리프레시 토큰 체크 스킵");
      initializedPaths.current.add(currentPath);
      setChecked(true);
      return;
    }

    console.log("🔄 TokenInitializer: 토큰 갱신 시도...");
    console.log("🍪 현재 쿠키:", document.cookie);
    console.log("🌐 현재 환경:", process.env.NODE_ENV);
    console.log("📍 현재 경로:", currentPath);

    // ✅ 이 경로 검증 시작 표시
    initializedPaths.current.add(currentPath);

    // ✅ 브라우저가 완전히 준비될 때까지 기다림 (인위적 지연 대신)
    // requestIdleCallback이 지원되지 않으면 requestAnimationFrame 사용
    const executeRestore = () => {
      console.log("🚀 restoreAccessToken 호출 시작...");
      console.log("📤 요청 헤더:", { authorization: "" });
      
      restoreAccessToken({
        context: {
          headers: {
            authorization: "", // 쿠키로만 인증
          },
        },
      })
        .then((res) => {
          console.log("✅ 리프레시 응답:", res);

          const newToken = res.data?.restoreAccessToken;
          console.log("📝 받은 토큰:", newToken ? `${newToken.substring(0, 20)}...` : "없음");

          if (newToken) {
            // ✅ 토큰 갱신 성공
            setAccessToken(newToken);
            console.log("✅ 리프레시 성공 (GraphQL)");
            console.log(
              "📝 새 액세스 토큰:",
              newToken.substring(0, 20) + "..."
            );
          } else {
            // ❌ 토큰이 없음 → 상태 초기화 후 메시지 모달 표시
            console.warn(
              "⚠️ 리프레시 응답에 토큰이 없습니다 → 메시지 모달 표시"
            );
            clearAccessToken();
            resetAccessToken();
            resetAuthChecked();
            apolloClient.clearStore();
            
            setChecked(true);

            // 메시지 모달 표시
            setIsMessageModalOpen(true);
          }
        })
        .catch((error) => {
          console.error("❌ 리프레시 실패:", error);
          console.error("📋 에러 상세 정보:", {
            graphQLErrors: error.graphQLErrors,
            networkError: error.networkError,
            message: error.message,
            stack: error.stack,
          });

          // 네트워크 에러 확인 (404 등)
          const isNetworkError = error.networkError !== null;
          const is404Error = 
            error.networkError?.statusCode === 404 ||
            error.message?.includes("404") ||
            error.networkError?.message?.includes("404") ||
            error.networkError?.statusCode === 404;

          // 인증 에러 확인
          const isAuthError =
            error.graphQLErrors?.some(
              (e: any) =>
                e.extensions?.code === "UNAUTHENTICATED" ||
                e.extensions?.code === "FORBIDDEN" ||
                e.extensions?.statusCode === 401 ||
                e.extensions?.statusCode === 403
            ) ||
            error.message.includes("Unauthorized") ||
            error.message.includes("Invalid token") ||
            error.message.includes("Token expired") ||
            error.message.includes("No refresh token");

          const isServerError = error.graphQLErrors?.some(
            (e: any) =>
              e.extensions?.statusCode >= 500 ||
              e.extensions?.code === "INTERNAL_SERVER_ERROR"
          );

          console.log("🔍 에러 타입 분석:", {
            is404Error,
            isAuthError,
            isNetworkError,
            isServerError,
          });

          if (is404Error) {
            console.error("❌ 404 에러: 백엔드 엔드포인트를 찾을 수 없습니다");
            console.error("💡 확인 사항:");
            console.error("   - 백엔드가 http://localhost:3001에서 실행 중인지 확인");
            console.error("   - GraphQL 엔드포인트가 /graphql인지 확인");
            console.error("   - 네트워크 탭에서 실제 요청 URL 확인");
            // 404는 네트워크/설정 문제이므로 로그인 페이지로 이동하지 않음
            // 대신 사용자에게 알림을 표시하거나 재시도 로직 추가 가능
          } else if (isAuthError) {
            console.log("🔐 인증 실패 → 상태 초기화 후 메시지 모달 표시");
            console.log("💡 리프레시 토큰이 만료되었거나 유효하지 않습니다");
            clearAccessToken();
            resetAccessToken();
            resetAuthChecked();
            apolloClient.clearStore();
            
            setChecked(true);

            // 메시지 모달 표시
            setIsMessageModalOpen(true);
          } else if (isNetworkError && !is404Error) {
            console.warn("🌐 네트워크 오류 → 토큰 유지, 오프라인 모드");
            console.warn("💡 네트워크 연결을 확인해주세요");
          } else if (isServerError) {
            console.warn("🔧 서버 오류 → 토큰 유지, 나중에 재시도");
            console.warn("💡 서버에 일시적인 문제가 있습니다");
          } else {
            console.error("❌ 알 수 없는 오류 → 상태 초기화 후 메시지 모달 표시");
            console.error("💡 예상치 못한 오류가 발생했습니다");
            clearAccessToken();
            resetAccessToken();
            resetAuthChecked();
            apolloClient.clearStore();
            
            setChecked(true);

            // 메시지 모달 표시
            setIsMessageModalOpen(true);
          }
        })
        .finally(() => {
          console.log("✔️ TokenInitializer: 인증 체크 완료");
          setChecked(true);
        });
    };

    // ✅ 브라우저가 준비될 때 실행 (인위적 지연 대신)
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(executeRestore, { timeout: 1000 });
    } else if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(() => {
        requestAnimationFrame(executeRestore);
      });
    } else {
      // 폴백: 즉시 실행
      executeRestore();
    }
  }, [router.pathname, accessToken, authChecked]); // ✅ 경로, 토큰, 체크 상태 변경 시 실행

  // 메시지 모달 확인 핸들러
  const handleMessageModalConfirm = () => {
    setIsMessageModalOpen(false);
    // 현재 경로를 초기화된 경로에서 제거하여 다시 접근 시 검증 가능하도록
    initializedPaths.current.delete(router.pathname);
    router.replace("/");
  };

  const isPublicPath = PUBLIC_PATHS.includes(router.pathname);
  const showAuthCheckingOverlay =
    !authChecked && !isPublicPath && !isMessageModalOpen;

  return (
    <>
      <AuthCheckingOverlay visible={showAuthCheckingOverlay}>
        <LoadingIcon spin fontSize={48} />
      </AuthCheckingOverlay>
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleMessageModalConfirm}
        message="로그인 후 이용가능합니다"
      />
    </>
  );
}
