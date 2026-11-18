# 03 — COMPLETE URL INVENTORY & CANONICAL ROUTING MAP

**Product:** Bhavlaya (भावलय)  
**Reference Domain:** `https://www.bhaktilok.in/`  
**Production Deployment:** `https://bhavlaya-bhaktilok.vercel.app/`  
**Target Domain:** `https://bhavlaya.com/` (Configurable)  
**Auditor:** Code Crew Labs Senior Product & Technical Architecture Team  
**Date:** November 2026

---

## 1. Inventory Summary Across 11 Sub-Sitemaps

| Sub-Sitemap | Total URL Count | Representative Reference URL Pattern | Canonical Bhavlaya Route Pattern | Status |
| :--- | :--- | :--- | :--- | :--- |
| `sitemap-posts.xml` | 10,232 | `/:year/:month/:slug.html` | `/bhajan/:slug` | ✅ Mapped & Supported via 301 Middleware |
| `sitemap-mantras.xml` | 93 | `/mantra/:slug.html` | `/mantra/:slug` | ✅ Dedicated Route & Detail Template |
| `sitemap-aarti.xml` | 11 | `/aarati/:slug` | `/aarti/:slug` | ✅ Dedicated Route & Detail Template |
| `sitemap-chalisa.xml` | 24 | `/chalisa/:slug.html` | `/chalisa/:slug` | ✅ Dedicated Route & Detail Template |
| `sitemap-katha.xml` | 234 | `/katha/:slug.html` | `/katha/:slug` | ✅ Dedicated Route & Detail Template |
| `sitemap-temples.xml` | 91 | `/temples/:slug` | `/mandir/:slug` | ✅ Dedicated Route & Detail Template |
| `sitemap-festivals.xml` | 47 | `/festivals/:slug.html` | `/festivals/:slug` | ✅ Dedicated Route & Detail Template |
| `sitemap-books.xml` | 453 | `/books/:slug` | `/granth/:slug` | ✅ Dedicated Route & Detail Template |
| `sitemap-ramayan.xml` | 664 | `/ramayan/:kand/:chaupai` | `/granth/ramcharitmanas/:slug` | ✅ Structured Scripture Route |
| `sitemap-gita.xml` | 719 | `/gita/:adhyaya/:shloka` | `/granth/bhagavad-gita/:slug` | ✅ Structured Scripture Route |
| `sitemap-pages.xml` | 175 | `/tools/:slug.html` | `/tools/:slug` | ✅ Unified Reactive Tools Directory |

---

## 2. Core Functional Routes & Endpoints Inventory

### 2.1 Public Frontend Routes
1. `/` — Global Devotional Discovery Homepage
2. `/panchang` — Astronomical Drik-Ganita 12-City Panchang Engine
3. `/bhajan` — Bhajan Directory & Filters
4. `/bhajan/[slug]` — Bhajan Reader with Font Resizing & Source Citations
5. `/mantra` — Vedic Mantra Sadhana Directory
6. `/mantra/[slug]` — Mantra Reader with Sanskrit, Padachhed & Chanting Guidance
7. `/chalisa` — Chalisa Sangrah Directory
8. `/chalisa/[slug]` — Chalisa Reader with Doha & Chaupai Verses
9. `/aarti` — Traditional Aarti Directory
10. `/aarti/[slug]` — Aarti Reader with Ritual Guidelines
11. `/stotra` — Traditional Stotra Library
12. `/stotra/[slug]` — Stotra Reader with Sanskrit & Word Meanings
13. `/katha` — Puranic & Vrat Katha Directory
14. `/katha/[slug]` — Katha Reader with Scriptural Sources
15. `/granth` — Sanatan Scriptures Library (Gita, Vedas, Upanishads)
16. `/granth/[slug]` — Scripture Reader with Chapters & Shlokas
17. `/mandir` — National Temple Directory (Jyotirlingas & Shakti Peethas)
18. `/mandir/[slug]` — Temple Guide with Aarti/Darshan Timings & Access Routes
19. `/jyotirlinga` — Dedicated 12 Jyotirlinga Directory
20. `/shaktipeeth` — Dedicated 51 Shakti Peeth Directory
21. `/festivals` — Hindu Festivals & Vrat Calendar 2026
22. `/festivals/[slug]` — Festival Guide with Dates, Tithis & Puja Samagri
23. `/encyclopedia` — Sanatan Dharma Encyclopedia & A-Z Index
24. `/encyclopedia/[slug]` — Encyclopedia Topic Knowledge Article
25. `/tools` — Spiritual Digital Tools Ecosystem (7 Categories)
26. `/tools/[slug]` — Individual Interactive Tool
27. `/status-maker` — Flagship Bhakti Status Studio (Canvas Image Creator)
28. `/status-maker/[category]` — Status Maker Filtered by Deity / Theme
29. `/daily-darshan` — Daily Sacred Darshan & Devotional Inspiration
30. `/meditation` — Web Audio Meditation Sanctuary (OM 136.1Hz & Tanpura)
31. `/rashifal` — 12 Rashis Vedic Astrology Directory
32. `/rashifal/[rashi]` — Daily Rashi Horoscope, Lucky Color & Mantra
33. `/articles` — Editorial Articles & Spiritual Knowledge Blog
34. `/articles/[slug]` — Article Reader with Table of Contents & Author Bio
35. `/authors` — Editorial Board & Contributing Authors
36. `/search` — Global Omnisearch Engine with Devanagari Matching
37. `/about` — About Bhavlaya & Code Crew Labs Architecture
38. `/contact` — Editorial Board Contact & Correction Form
39. `/editorial-policy` — Source Verification & Scripture Guidelines
40. `/privacy-policy` — LocalStorage Privacy Protection Policy
41. `/terms-and-conditions` — Terms of Use & Copyright Guidelines
42. `/disclaimer` — Religious, Medical, Legal & Astrological Disclaimer

### 2.2 System & Media Endpoints
- `/sitemap.xml` — Dynamic XML Sitemap Index
- `/robots.txt` — Search Engine Crawl Directives
- `/icon` — Dynamic 48x48 Sacred "भा" Favicon
- `/opengraph-image` — Dynamic 1200x630 Social Graph Image

### 2.3 Mobile REST APIs
- `GET /api/v1/panchang` — City-based astronomical calculations
- `GET /api/v1/bhajans` — Devotional songs with lyrics and singer credits
- `GET /api/v1/mantras` — Vedic mantras with Sanskrit & japa methods
- `GET /api/v1/temples` — Temple directory, darshan timings & aarti schedules
- `GET /api/v1/search` — Unified multi-entity query search
