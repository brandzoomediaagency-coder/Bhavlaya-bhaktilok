# Bhavlaya Progressive Web App (PWA) Architecture

**Target:** Standards-compliant Installable Web Application (Desktop, Android, iOS)  
**Manifest:** `/manifest.webmanifest`  
**Service Worker:** `/sw.js`  
**Theme Color:** `#651D32` (Deep Maroon) | **Background:** `#FAF8F2` (Warm Ivory)  

---

## 1. Architectural Overview

```
[ User Browser / Device ]
           │
     ┌─────┴────────────────────────┐
     ▼                              ▼
[ Web App Manifest ]       [ Service Worker (sw.js) ]
  - Name, short_name         - App Shell precaching
  - Icons (192, 512, mask)   - Stale-While-Revalidate (Static)
  - Standalone display       - Network-First (Panchang & Search)
  - Start URL: /             - Offline Fallback Page
           │
           ▼
[ PWA Installation Engine (usePWAInstall) ]
  ├── Chromium: Intercepts beforeinstallprompt & triggers native sheet
  ├── Safari macOS: Guides "File > Add to Dock"
  ├── iOS Safari: Guides "Share > Add to Home Screen"
  └── Standalone Detection: Hides promo when already running as installed app
```

---

## 2. Platform-Specific Install Flows

1. **Chromium (Chrome, Edge, Brave on Windows/Mac/Android):**
   - Intercepts `beforeinstallprompt` event and prevents the default mini-infobar.
   - Saves event in memory.
   - When user clicks "ऐप इंस्टॉल करें", executes `deferredPrompt.prompt()`.
   - Listens to `appinstalled` to update UI state to "Installed".
2. **Apple Safari on macOS (Sonoma+):**
   - Detects Safari desktop user agent.
   - Shows instructional modal: *"File মেনু खोलें → 'Add to Dock' चुनें → Add पर क्लिक करें"*.
3. **Apple iOS Safari (iPhone / iPad):**
   - Detects iOS WebKit.
   - Shows step-by-step visual tutorial: *"नीचे Share बटन दबाएं → 'Add to Home Screen' चुनें"*.

---

## 3. Security & Domain Decoupling

- Service worker strictly limits scope to `/`.
- Authentication endpoints and private admin panels (`/admin/*`) are excluded from offline caching.
- Uses dynamic environment-aware domain references rather than hardcoded URLs.
