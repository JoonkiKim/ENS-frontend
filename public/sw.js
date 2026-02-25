/* public/sw.js */

const CACHE_NAME = "offline-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(OFFLINE_URL))
  );
});

// 수정된 push 이벤트 리스너
self.addEventListener("push", (event) => {
  console.log("🔔 Push 이벤트 수신:", event);

  let data = {};

  if (event.data) {
    try {
      data = event.data.json(); // 올바른 메서드 호출
      console.log("✅ JSON 파싱 성공:", data);
    } catch (e) {
      console.error("❌ JSON 파싱 실패:", e);
      // JSON이 아니면 텍스트로 처리
      const text = event.data.text();
      console.log("📝 텍스트 데이터:", text);
      data = {
        title: "GuardRail",
        body: text || "새로운 알림이 있습니다.",
      };
    }
  } else {
    console.warn("⚠️ event.data가 없습니다!");
    data = {
      title: "GuardRail",
      body: "새로운 알림이 있습니다.",
    };
  }

  const title = data.title || "GuardRail";
  const options = {
    body: data.body || "",
    icon: "/images/GDR.png",
    badge: "/images/GDR.png",
    data: data.url ? { url: data.url } : {},
  };

  console.log("📤 알림 표시 시도:", { title, options });

  event.waitUntil(
    self.registration
      .showNotification(title, options)
      .then(() => {
        console.log("✅ 알림 표시 성공");
      })
      .catch((error) => {
        console.error("❌ 알림 표시 실패:", error);
      })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        const existing = windowClients.find((client) => client.url === url);
        return existing ? existing.focus() : self.clients.openWindow(url);
      })
  );
});
