// import { useCallback } from "react";
// import { useMutation } from "@apollo/client";
// import {
//   CREATE_PUSH_SUBSCRIPTION,
//   REMOVE_PUSH_SUBSCRIPTION,
// } from "../apis/graphql-queries";

// const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY || "";

// function urlBase64ToUint8Array(base64String: string) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
//   const rawData = atob(base64);
//   const outputArray = new Uint8Array(rawData.length);
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// // ArrayBuffer를 Base64로 변환하는 헬퍼 함수
// function arrayBufferToBase64(buffer: ArrayBuffer): string {
//   const bytes = new Uint8Array(buffer);
//   let binary = "";
//   for (let i = 0; i < bytes.byteLength; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return btoa(binary);
// }

// export function usePushSubscription() {
//   // ✅ Apollo mutation 사용
//   const [createPushSubscription] = useMutation(CREATE_PUSH_SUBSCRIPTION);
//   const [removePushSubscription] = useMutation(REMOVE_PUSH_SUBSCRIPTION);

//   const subscribeToPush = useCallback(async () => {
//     if (typeof window === "undefined") return;
//     if (!("serviceWorker" in navigator)) {
//       console.warn("Service Worker is not supported");
//       throw new Error("Service Worker is not supported");
//     }
//     if (!("Notification" in window)) {
//       console.warn("Notifications are not supported");
//       throw new Error("Notifications are not supported");
//     }
//     if (!PUBLIC_VAPID_KEY) {
//       console.warn("Missing NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY");
//       throw new Error("Missing VAPID key");
//     }

//     const registration = await navigator.serviceWorker.ready;

//     if (Notification.permission === "denied") {
//       alert(
//         "알림 권한이 차단되어 있습니다. 브라우저 설정에서 허용으로 변경해주세요."
//       );
//       throw new Error("Notification permission denied");
//     }

//     // 이미 구독되어 있는지 확인
//     const existing = await registration.pushManager.getSubscription();
//     if (existing) {
//       console.log("이미 구독 중입니다.");
//       return existing;
//     }

//     // 알림 권한 요청
//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       alert("알림 권한이 허용되지 않았습니다.");
//       throw new Error("Notification permission not granted");
//     }

//     // VAPID 키 변환 및 구독
//     const convertedKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
//     const subscription = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: convertedKey,
//     });

//     // ✅ GraphQL mutation으로 백엔드에 구독 정보 저장 (Apollo Client 사용)
//     try {
//       console.log("🔄 구독 정보를 백엔드에 저장 시도...", {
//         endpoint: subscription.endpoint,
//         expirationTime: subscription.expirationTime,
//       });

//       const result = await createPushSubscription({
//         variables: {
//           input: {
//             endpoint: subscription.endpoint,
//             expirationTime: subscription.expirationTime
//               ? subscription.expirationTime.toString()
//               : null,
//             keys: {
//               p256dh: arrayBufferToBase64(subscription.getKey("p256dh")!),
//               auth: arrayBufferToBase64(subscription.getKey("auth")!),
//             },
//           },
//         },
//       });

//       console.log("✅ 푸시 구독 완료:", result);
//       return subscription;
//     } catch (error: any) {
//       console.error("❌ 푸시 구독 저장 실패:", error);
//       console.error("에러 상세:", {
//         message: error.message,
//         graphQLErrors: error.graphQLErrors,
//         networkError: error.networkError,
//       });

//       // 백엔드 저장 실패 시 브라우저 구독도 해제
//       await subscription.unsubscribe();
//       throw error;
//     }
//   }, [createPushSubscription]);

//   const unsubscribeFromPush = useCallback(async () => {
//     if (typeof window === "undefined") return;
//     if (!("serviceWorker" in navigator)) return;

//     const registration = await navigator.serviceWorker.ready;
//     const existing = await registration.pushManager.getSubscription();

//     if (existing) {
//       const endpoint = existing.endpoint;

//       // 먼저 브라우저에서 구독 해제
//       await existing.unsubscribe();

//       // ✅ GraphQL mutation으로 백엔드에서 구독 정보 삭제
//       try {
//         await removePushSubscription({
//           variables: { endpoint },
//         });
//         console.log("✅ 푸시 구독 해제 완료");
//       } catch (error) {
//         console.error("백엔드 구독 삭제 실패:", error);
//         // 브라우저는 이미 해제되었으므로 에러를 던지지 않음
//       }
//     }
//   }, [removePushSubscription]);

//   return { subscribeToPush, unsubscribeFromPush };
// }
