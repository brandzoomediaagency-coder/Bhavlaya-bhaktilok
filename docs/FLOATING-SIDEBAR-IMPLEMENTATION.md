# Bhavlaya Floating Quick Access Sidebar Implementation

**Component:** `src/components/layout/FloatingQuickAccess.tsx`  
**Related Components:** `ReadingAutoScroll.tsx`, `ShareModal.tsx`  
**Platform:** Bhavlaya (भावलय)  
**Date:** November 2026  

---

## 1. Design & Positioning

Inspired by the reference layout, the Bhavlaya Floating Sidebar is positioned on the right edge of desktop and laptop displays:
- **Container:** `fixed right-3 top-1/2 -translate-y-1/2 z-40` with dark luxury charcoal styling (`bg-[#18171C]/95 backdrop-blur-md`), rounded-3xl curvature, and soft gold border (`border border-gold/25`).
- **Ergonomics:** Vertically centered with safe margin padding. On screens with vertical height under 760px, it utilizes controlled internal scrolling (`overflow-y-auto max-h-[88vh] scrollbar-none`) to prevent clipping.
- **Collapsible Mode:** Users can collapse the dock into a subtle floating tab (`ChevronRight` toggle) with state persisted in local preferences.

---

## 2. Ten Core Actions Matrix

| # | Action Label (Hindi) | Tool / Target | Icon | Theme Color | Target Route / Execution |
|---|---|---|---|---|---|
| 1 | **जाप माला** | 108 Digital Jap Mala | CircleDot / Mala | `#FF6B00` (Saffron Orange) | `/tools/108-jap-mala-counter` |
| 2 | **राशिफल** | 12 Rashis Dashboard | Sparkles / Star | `#F59E0B` (Golden Amber) | `/rashifal` |
| 3 | **स्टेटस स्टूडियो** | Bhakti Status Studio | Camera | `#10B981` (Emerald Green) | `/status-maker` |
| 4 | **शंख ध्वनि** | Sacred Conch Sound | Volume2 / Bell | `#06B6D4` (Cyan Blue) | Plays live conch audio or `/tools/digital-temple-bell` |
| 5 | **पुण्य खाता** | Daily Punya Ledger | ClipboardCheck | `#059669` (Jade Green) | `/tools/daily-punya-ledger` |
| 6 | **कॉपी लिंक** | Copy Canonical URL | Link2 | `#3B82F6` (Royal Blue) | Native Clipboard API with success toast |
| 7 | **शेयर करें** | Multi-channel Share | Share2 | `#EC4899` (Magenta Pink) | `navigator.share` or fallback custom modal |
| 8 | **पंचांग** | Daily Vedic Panchang | CalendarDays | `#0284C7` (Sky Blue) | `/panchang` |
| 9 | **ॐ ध्यान** | 136.1 Hz Meditation | AudioLines | `#8B5CF6` (Mystic Purple) | Plays live 136.1Hz Om or `/meditation` |
| 10 | **ऑटो-स्क्रोल** | Reading Auto-Scroll | PlayCircle | `#F97316` (Deep Orange) | Toggles floating auto-scroll bar at bottom center |

---

## 3. Reading Auto-Scroll Controller (`ReadingAutoScroll.tsx`)

Mounted dynamically at the bottom center of the viewport (`fixed bottom-6 left-1/2 -translate-x-1/2 z-50`):
- **Speeds:** `0.5x` (15 px/s), `1x` (30 px/s), `1.5x` (55 px/s), `2x` (90 px/s), `3x` (140 px/s).
- **Controls:** Play/Pause (`⏸ रोकें` / `▶ शुरू`), speed selectors, reading contrast toggle, and close (`✕`).
- **Accessibility:** Automatically pauses when tab loses visibility (`visibilitychange`), reaches page bottom, or when `prefers-reduced-motion` is active.
