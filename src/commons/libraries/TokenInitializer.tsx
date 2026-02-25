import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { accessTokenState, authCheckedState } from "../stores";
import { useMutation, useQuery } from "@apollo/client";
import {
  registerAccessTokenSetter,
  setAccessToken,
  clearAccessToken,
} from "./token";
import {
  RESTORE_ACCESS_TOKEN,
  FETCH_LOGIN_USER,
  CREATE_PUSH_SUBSCRIPTION,
} from "../apis/graphql-queries";

// ✅ 인증이 필요 없는 페이지 목록
const PUBLIC_PATHS = ["/login", "/signUp", "/find-password"];

// VAPID 키 변환 함수
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// ArrayBuffer를 Base64로 변환하는 헬퍼 함수
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default function TokenInitializer() {
  const setToken = useSetRecoilState(accessTokenState);
  const setChecked = useSetRecoilState(authCheckedState);
  const router = useRouter();

  // ✅ 초기화 완료 여부를 추적
  const isInitialized = useRef(false);
  // ✅ 푸시 구독 시도 여부를 추적 (중복 방지)
  const pushSubscriptionAttempted = useRef(false);

  // GraphQL mutation hook
  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN, {
    context: {
      headers: {
        authorization: "",
      },
    },
  });

  // ✅ 푸시 구독 생성 mutation
  const [createPushSubscription] = useMutation(CREATE_PUSH_SUBSCRIPTION);

  // 사용자 정보 조회 쿼리 (토큰 갱신 성공 후 실행)
  const { data: userData, refetch: refetchUser } = useQuery(FETCH_LOGIN_USER, {
    skip: true, // 초기에는 실행하지 않음
    fetchPolicy: "network-only",
  });

  // ✅ 푸시 구독 함수 (GraphQL mutation 사용)
  const subscribeToPushNotifications = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) {
      console.warn("Service Worker is not supported");
      return;
    }
    if (!("Notification" in window)) {
      console.warn("Notifications are not supported");
      return;
    }

    const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY || "";
    if (!PUBLIC_VAPID_KEY) {
      console.warn("Missing NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      if (Notification.permission === "denied") {
        console.warn("알림 권한이 차단되어 있습니다.");
        return;
      }

      // 이미 구독되어 있는지 확인
      const existing = await registration.pushManager.getSubscription();
      if (existing) {
        console.log("이미 푸시 구독 중입니다.");
        return;
      }

      // 알림 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("알림 권한이 허용되지 않았습니다.");
        return;
      }

      // VAPID 키 변환 및 구독
      const convertedKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      });

      // ✅ GraphQL mutation으로 백엔드에 구독 정보 저장
      await createPushSubscription({
        variables: {
          input: {
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime
              ? subscription.expirationTime.toString()
              : null,
            keys: {
              p256dh: arrayBufferToBase64(subscription.getKey("p256dh")!),
              auth: arrayBufferToBase64(subscription.getKey("auth")!),
            },
          },
        },
      });

      console.log("✅ 푸시 구독 완료 (자동 구독)");
    } catch (error) {
      console.error("❌ 푸시 구독 실패:", error);
    }
  }, [createPushSubscription]);

  // ① RecoilRoot 안에서만 registerAccessTokenSetter를 호출
  useEffect(() => {
    registerAccessTokenSetter(setToken);
    return () => {
      clearAccessToken();
    };
  }, [setToken]);

  // ② 앱 시작 시 한 번만 토큰 갱신 (페이지 이동 시 재실행 안 됨)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ 이미 초기화되었으면 실행 안 함
    if (isInitialized.current) {
      return;
    }

    // ✅ 공개 페이지면 토큰 갱신 스킵
    const isPublicPath = PUBLIC_PATHS.some((path) =>
      router.pathname.startsWith(path)
    );

    if (isPublicPath) {
      console.log("🔓 공개 페이지: 토큰 갱신 스킵");
      setChecked(true);
      isInitialized.current = true; // ✅ 초기화 완료 표시
      return;
    }

    console.log("🔄 TokenInitializer: 토큰 갱신 시도...");

    // ✅ 초기화 시작 표시
    isInitialized.current = true;

    // ✅ 브라우저가 완전히 준비될 때까지 기다림 (인위적 지연 대신)
    // requestIdleCallback이 지원되지 않으면 requestAnimationFrame 사용
    const executeRestore = () => {
      restoreAccessToken({
        context: {
          headers: {
            authorization: "",
          },
        },
      })
        .then((res) => {
          console.log("✅ 리프레시 응답:", res);

          const newToken = res.data?.restoreAccessToken;
          console.log("newToken", newToken);

          if (newToken) {
            // ✅ 토큰 갱신 성공
            setAccessToken(newToken);
            console.log("✅ 리프레시 성공 (GraphQL)");
            console.log(
              "📝 새 액세스 토큰:",
              newToken.substring(0, 20) + "..."
            );

            // ✅ 토큰 갱신 성공 후 사용자 정보 조회 및 푸시 구독 처리
            refetchUser()
              .then((userRes) => {
                const marketingAgreed =
                  userRes.data?.fetchLoginUser?.marketingAgreed;
                const pushNotificationEnabled =
                  userRes.data?.fetchLoginUser?.pushNotificationEnabled;

                console.log("📧 마케팅 동의 여부:", marketingAgreed);
                console.log(
                  "🔔 푸시 알림 활성화 여부:",
                  pushNotificationEnabled
                );

                // ✅ 마케팅 동의 + 푸시 알림 활성화 + 아직 구독 시도 안 함
                if (
                  marketingAgreed &&
                  pushNotificationEnabled &&
                  !pushSubscriptionAttempted.current
                ) {
                  pushSubscriptionAttempted.current = true;
                  setTimeout(() => {
                    subscribeToPushNotifications();
                  }, 1000);
                }
              })
              .catch((error) => {
                console.error("❌ 사용자 정보 조회 실패:", error);
              });
          } else {
            // ❌ 토큰이 없음 → 로그인 필요
            console.warn(
              "⚠️ 리프레시 응답에 토큰이 없습니다 → 로그인 페이지 이동"
            );
            clearAccessToken();

            if (
              !PUBLIC_PATHS.some((path) => router.pathname.startsWith(path))
            ) {
              router.push("/login");
            }
          }
        })
        .catch((error) => {
          console.error("❌ 리프레시 실패:", error);

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

          const isNetworkError = error.networkError !== null;

          const isServerError = error.graphQLErrors?.some(
            (e: any) =>
              e.extensions?.statusCode >= 500 ||
              e.extensions?.code === "INTERNAL_SERVER_ERROR"
          );

          if (isAuthError) {
            console.log("🔐 인증 실패 → 로그인 페이지 이동");
            clearAccessToken();

            if (
              !PUBLIC_PATHS.some((path) => router.pathname.startsWith(path))
            ) {
              const returnUrl = encodeURIComponent(router.asPath);
              router.push(`/login?returnUrl=${returnUrl}`);
            }
          } else if (isNetworkError) {
            console.warn("🌐 네트워크 오류 → 토큰 유지, 오프라인 모드");
          } else if (isServerError) {
            console.warn("🔧 서버 오류 → 토큰 유지, 나중에 재시도");
          } else {
            console.error("❌ 알 수 없는 오류 → 로그인 페이지 이동");
            clearAccessToken();

            if (
              !PUBLIC_PATHS.some((path) => router.pathname.startsWith(path))
            ) {
              router.push("/login");
            }
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
  }, []); // ✅ 빈 배열 - 마운트 시 한 번만 실행!

  return null;
}
