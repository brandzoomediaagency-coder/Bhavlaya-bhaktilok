# 06 — IMPLEMENTATION ROADMAP & EXECUTION STRATEGY

**Product:** Bhavlaya (भावलय)  
**Engineering Team:** Code Crew Labs Enterprise Architecture  
**Date:** November 2026

---

## 1. Phased Execution Overview

```
[ Phase 0: Audit & Verification ] ──▶ (Complete: 6 Documents Created)
          │
[ Phase 1: Astronomical Engine Fixes ] ──▶ (Complete: NOAA solar models, 113/113 tests pass)
          │
[ Phase 2: Stotra & Editorial Architecture ] ──▶ (/stotra, /articles, /authors)
          │
[ Phase 3: Sanatan Dharma Encyclopedia ] ──▶ (/encyclopedia, 20 categories, A-Z Index)
          │
[ Phase 4: Extended Pilgrimage & Temples ] ──▶ (/jyotirlinga, /shaktipeeth, /char-dham)
          │
[ Phase 5: Complete 7-Category Tools Catalog ] ──▶ (/tools, 15+ working interactive tools)
          │
[ Phase 6: Flagship Bhakti Status Studio ] ──▶ (/status-maker, canvas generator, HD export)
          │
[ Phase 7: Daily Darshan, Shloka & Meditation ] ──▶ (/daily-darshan, /daily-shloka, /meditation)
          │
[ Phase 8: Header Mega-Menus & Mobile Nav ] ──▶ (Complete navigation bar with quick access)
          │
[ Phase 9: Production Build & Vercel Push ] ──▶ (Git commit, push to GitHub, live verification)
```

---

## 2. Milestone Deliverables

### Milestone 1: Core Foundation & Astronomy (Completed)
- Rewrite `src/lib/panchangEngine.ts` with NOAA solar calculations.
- Pass 113 automated unit tests for Sunrise (AM), Sunset (PM), Brahma Muhurat (pre-dawn AM), Abhijit Muhurat (midday), Rahukaal, and Choghadiyas across 12 cities.

### Milestone 2: Editorial & Stotra Libraries (Phase 2)
- Implement `/stotra` and `/stotra/[slug]` for dedicated traditional stotras.
- Implement `/articles`, `/articles/[slug]`, and `/authors` with reading time, table of contents, and author profiles.

### Milestone 3: Sanatan Encyclopedia (Phase 3)
- Implement `/encyclopedia` and `/encyclopedia/[slug]` with searchable A-Z index across 20 canonical categories.

### Milestone 4: Flagship Bhakti Status Studio (Phase 6)
- Implement `/status-maker` with HTML5 Canvas export (9:16 Story, 1:1 Square, 4:5 Feed, 16:9 Landscape), live font & theme styling, and direct WhatsApp sharing.

### Milestone 5: Daily Devotional Living & Web Audio Meditation (Phase 7)
- Implement `/daily-darshan`, `/daily-shloka`, and `/meditation` (Web Audio 136.1Hz Cosmic OM & Tanpura drone).

### Milestone 6: Tools Expansion & Navigation (Phases 5 & 8)
- Expand `/tools` into 7 distinct categories with real calculators and checklists.
- Upgrade Header mega navigation and mobile bottom dock.

### Milestone 7: QA, Build & Deployment (Phase 9)
- Run `pnpm build` across all 100+ routes.
- Commit and push to GitHub repository for automatic Vercel deployment.
