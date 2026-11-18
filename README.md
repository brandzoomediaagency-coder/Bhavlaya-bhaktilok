# Bhavlaya (भावलय) — Premium Sanatan Devotional Digital Ecosystem

> **"Where Devotion Meets Knowledge."**  
> *भक्ति, ज्ञान और साधना का डिजिटल संसार।*  
> **Technology by Code Crew Labs**

---

## 🌟 Overview & Brand Architecture

**Bhavlaya (भावलय)** is a modern, high-performance, culturally authentic devotional digital ecosystem designed for Sanatan Dharma, Hindu devotional content, Vedic scriptures, sacred temples, daily astronomical Panchang, interactive spiritual tools, and spiritual knowledge.

- **Product Brand:** Bhavlaya (भावलय)
- **Technology & Engineering Partner:** Code Crew Labs ("Technology by Code Crew Labs")
- **Proposed Domain:** [https://bhavlaya.com](https://bhavlaya.com) (Decoupled & Configurable via `NEXT_PUBLIC_SITE_URL`)
- **Legacy Source Domain:** [https://www.bhaktilok.in](https://www.bhaktilok.in)
- **Local Dev Server:** `http://localhost:3000`

---

## 🏗️ Technical Architecture

- **Framework:** Next.js 16.4.6 (App Router, Turbopack, Partial Prerendering)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling & Design System:** Tailwind CSS v4 with bespoke Indian Heritage Editorial Design System
  - **Warm Ivory:** `#FAF8F2`
  - **Soft Cream:** `#FFFDF8`
  - **Saffron:** `#D97706`
  - **Antique Gold:** `#B58A43`
  - **Deep Maroon:** `#651D32`
  - **Charcoal Text:** `#22201E`
- **Typography:** `Noto Sans Devanagari`, `Noto Serif Devanagari`, `Inter`
- **Astronomical Panchang Engine:** Pure TypeScript Drik-Ganita astronomical calculation engine computing Tithi, Nakshatra, Yoga, Karana, Sunrise, Sunset, Rahukaal, Abhijit Muhurat, Brahma Muhurat, and 8 Choghadiyas based on observer Latitude/Longitude for 12 major Indian cities.
- **Synthesized Audio Engine:** Web Audio API synthesized brass temple bell harmonics (587Hz–2936Hz), sacred conch (Shankh) acoustical resonant filter, and 136.1 Hz Sadja (Cosmic Om) frequency.
- **Database & Storage:** PostgreSQL + Supabase with Row Level Security (RLS) policies.
- **REST APIs for Mobile Apps:** Versioned REST endpoints under `/api/v1/*` ready for dedicated Android & iOS applications.

---

## 📁 Architectural & Engineering Documentation

All 12 architectural, research, and migration specifications are included in the [`docs/`](./docs) directory:

1. [01-WEBSITE-AUDIT.md](./docs/01-WEBSITE-AUDIT.md) — Comprehensive technical, content, and crawl audit of the existing website.
2. [02-COMPLETE-URL-INVENTORY.md](./docs/02-COMPLETE-URL-INVENTORY.md) — Complete inventory of 12,934+ URLs across 11 sitemaps.
3. [03-INFORMATION-ARCHITECTURE.md](./docs/03-INFORMATION-ARCHITECTURE.md) — Unified information architecture, navigation, entity relationships, and taxonomy.
4. [04-PAGE-TEMPLATE-SPECIFICATION.md](./docs/04-PAGE-TEMPLATE-SPECIFICATION.md) — Detailed specifications for all 27 page templates.
5. [05-DATABASE-ARCHITECTURE.md](./docs/05-DATABASE-ARCHITECTURE.md) — PostgreSQL schema with 32 relational entities, indexes, and Supabase RLS.
6. [06-SEO-AEO-GEO-STRATEGY.md](./docs/06-SEO-AEO-GEO-STRATEGY.md) — Search, Answer Engine (AEO), and Generative Engine (GEO) optimization strategies.
7. [07-DESIGN-SYSTEM.md](./docs/07-DESIGN-SYSTEM.md) — Design tokens, color palette, typography scale, components, and WCAG AA guidelines.
8. [08-MIGRATION-AND-REDIRECT-PLAN.md](./docs/08-MIGRATION-AND-REDIRECT-PLAN.md) — 301 redirect mapping, slug extraction, and crawl equity preservation.
9. [09-DEVELOPMENT-ROADMAP.md](./docs/09-DEVELOPMENT-ROADMAP.md) — 7-phase product development and deployment roadmap.
10. [BRAND-REBRANDING-AUDIT.md](./docs/BRAND-REBRANDING-AUDIT.md) — Comprehensive audit locating legacy brand strings and rebranding strategy.
11. [BHAVLAYA-SEO-MIGRATION.md](./docs/BHAVLAYA-SEO-MIGRATION.md) — Domain migration cutover plan, Google Search Console Change of Address checklist.
12. [BHAVLAYA-REBRANDING-QA.md](./docs/BHAVLAYA-REBRANDING-QA.md) — Zero-omission verification matrix and quality assurance report.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/brandzoomediaagency-coder/Bhavlaya-bhaktilok.git
cd Bhavlaya-bhaktilok

# Install dependencies
pnpm install

# Start local development server
pnpm dev
# Open http://localhost:3000

# Build for production
pnpm build

# Run production server
pnpm start -p 3000
```

---

## 📱 Mobile Applications & REST API Endpoints

Bhavlaya is architected to power dedicated Android and iOS native applications via clean JSON endpoints:

- `GET /api/v1/panchang?city=delhi` — Real-time astronomical calculations
- `GET /api/v1/bhajans` — Devotional songs with lyrics and singer metadata
- `GET /api/v1/mantras` — Vedic mantras with Sanskrit, Padachhed, and japa methods
- `GET /api/v1/temples` — Temple directory, darshan timings, and aarti schedules
- `GET /api/v1/search?q={query}` — Omnisearch across all devotional entities

---

## 🛡️ License & Intellectual Property

- Ancient Vedic, Sanskrit, and devotional scriptures are in the Public Domain.
- Application architecture, source code, design system, and custom digital tools © 2026 **Bhavlaya** & **Code Crew Labs**.
