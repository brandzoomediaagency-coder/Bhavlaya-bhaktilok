# Bhavlaya Offline Caching Strategy

**Service Worker Version:** `bhavlaya-cache-v1.0`  
**File:** `public/sw.js`  

---

## 1. Caching Strategies Matrix

| Resource Type | Cache Route / Pattern | Strategy | Justification |
|---|---|---|---|
| **App Shell & Core** | `/`, `/offline`, `/manifest.webmanifest`, CSS, JS bundles | **Cache-First with Network Revalidation** | Guarantees instant launch without network delay. |
| **Fonts & Icons** | Noto Serif/Sans, SVGs, PNG icons | **Cache-First (Long-term)** | Static typography does not change across sessions. |
| **Panchang & Muhurat** | `/api/v1/panchang*`, `/panchang` | **Network-First with Fallback** | Critical: Astronomical calculations must never display stale/yesterday's data as today's valid Panchang! |
| **Live Multilingual Search** | `/api/v1/search*` | **Network-First** | Live suggestions should reflect current indexing. |
| **Images & Media** | `/images/*`, WebP assets | **Stale-While-Revalidate** | Immediate visual render with background asset freshness check. |
| **Private Admin** | `/admin/*` | **Network-Only (No-Cache)** | Never store administrative data in public service worker caches. |

---

## 2. Offline Fallback Mechanics

When a network connection is completely lost:
1. Navigations to pages previously visited load instantly from cache.
2. Uncached page navigations gracefully render `/offline` with a devotional apology, retry button, and quick access to cached sacred stotras.
