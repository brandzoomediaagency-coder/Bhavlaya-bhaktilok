/**
 * Bhavlaya Production Service Worker
 * Version: bhavlaya-v1.0.0
 * 
 * Standards Compliant Offline Caching, Stale-While-Revalidate & Network-First for Panchang
 */

const CACHE_NAME = "bhavlaya-v1.0.0";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/manifest.webmanifest",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/apple-touch-icon.png",
];

// Install: Pre-cache App Shell & Offline Page
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: Strategy dispatcher
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== "GET") return;

  // Ignore chrome extensions or third-party origins
  if (!url.origin.includes(self.location.origin)) return;

  // Never cache administrative pages or private APIs
  if (url.pathname.startsWith("/admin")) {
    return;
  }

  // 1. Time-Sensitive Panchang & Search: NETWORK-FIRST
  if (url.pathname.includes("/api/v1/panchang") || url.pathname.includes("/api/v1/search")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 2. Static Assets (JS, CSS, Images, Fonts): STALE-WHILE-REVALIDATE
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|woff2|woff|css|js)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. HTML Navigation Pages: STALE-WHILE-REVALIDATE with OFFLINE FALLBACK
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Default: Cache with Network Fallback
  event.respondWith(
    caches.match(request).then((response) => {
      return (
        response ||
        fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
      );
    })
  );
});

// Message listener for skip waiting on update
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
