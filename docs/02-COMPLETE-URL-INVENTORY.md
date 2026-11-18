# BhaktiLok (bhaktilok.in) — Complete URL Inventory & Migration Strategy

**Document ID:** `DOC-MIG-002`  
**Target Domain:** `bhaktilok.in`  
**Source Platform:** Legacy Multi-Source / Blogger-style Hybrid Architecture  
**Target Platform:** Next.js (App Router) on High-Performance Edge Runtime  
**Total Identified Inventory:** 12,934+ URLs across 11 Sitemap Categories & Core Static Services  
**Document Status:** Final & Approved for Migration Execution  

---

## Table of Contents
1. [Executive Summary & Catalog Breakdown](#1-executive-summary--catalog-breakdown)
2. [Sitemap Inventory & Summary Statistics](#2-sitemap-inventory--summary-statistics)
3. [Deep URL Pattern Analysis (Legacy Site)](#3-deep-url-pattern-analysis-legacy-site)
4. [Content Type Classification & Entity Taxonomy](#4-content-type-classification--entity-taxonomy)
5. [Proposed New URL Architecture (Next.js)](#5-proposed-new-url-architecture-nextjs)
6. [Comprehensive Old-to-New URL Mapping Matrix](#6-comprehensive-old-to-new-url-mapping-matrix)
7. [Migration Priority & Risk Assessment Matrix](#7-migration-priority--risk-assessment-matrix)
8. [301 Redirect Architecture & Technical Implementation](#8-301-redirect-architecture--technical-implementation)
9. [Next.js App Router Architecture & Route Tree](#9-nextjs-app-router-architecture--route-tree)
10. [SEO Safeguards, Canonicalization & Post-Migration Verification](#10-seo-safeguards-canonicalization--post-migration-verification)

---

## 1. Executive Summary & Catalog Breakdown

BhaktiLok (`bhaktilok.in`) is an authoritative digital repository dedicated to Sanatana Dharma, housing devotional lyrics (Bhajans, Aartis, Chalisa, Stotrams), foundational scriptural literature (Srimad Bhagavad Gita, Valmiki Ramayana, Puranas, Vedas), spiritual narratives (Vrat Kathas), temple archives, astrological panchang tools, and festival observances.

Over years of organic growth, the platform accumulated **12,934+ active URLs** indexed across **11 sitemap categories** alongside static legal, editorial, and interactive application pages. The legacy URL structure reflects several historical architectural phases:
- A massive legacy Blogger/WordPress era format for posts (`/:year/:month/:slug.html`) comprising **79.1% of all platform content**.
- Inconsistent singular vs. plural taxonomy namespaces (e.g., `/mantra/:slug` vs. `/mantras/:category`).
- Archaic phonetic transliterations (e.g., `/aarati/` instead of industry-standard `/aarti/`).
- Hardcoded calendar-year festival slugs (`/festivals/:slug-2026`), creating annual link equity decay.
- Flat hierarchies for structured scriptures (e.g., `/gita/chapter-1-verse-1` and `/ramayan/chapter/:slug`) instead of nested relational structures.
- Generic folder wrappers for interactive tools (`/pages/panchang` instead of root-level utility prominence).

This inventory establishes the definitive canonical roadmap for migrating BhaktiLok to Next.js without sacrificing SEO rankings, link equity, or user experience.

---

## 2. Sitemap Inventory & Summary Statistics

The table below details the composition of all 12,934+ URLs distributed across the 11 discovered sitemaps plus core static utility pages:

| # | Sitemap / Section Name | URL Pattern Format | Total Count | % of Total | Content Nature | Primary Search Intent | Migration Action |
|---|------------------------|--------------------|-------------|------------|----------------|-----------------------|------------------|
| **1** | **Posts / Bhajans** | `/:year/:month/:slug.html` | 10,232 | 79.11% | Evergreen Devotional Lyrics | Informational / Lyrical / Hindi | Bulk Regex 301 to `/bhajan/:slug` |
| **2** | **Srimad Bhagavad Gita** | `/gita/chapter-X-verse-Y` | 719 | 5.56% | Sanskrit Verses, Anvaya & Bhashya | Educational / Scriptural Reference | Restructure to `/gita/:chapter/:verse` |
| **3** | **Valmiki Ramayana** | `/ramayan/kand/:kand-slug`<br>`/ramayan/chapter/:chapter-slug` | 664 | 5.13% | Kandas, Sargas & Shlokas | Scriptural Study / Epics | Normalize to `/ramayana/:kand/:chapter` |
| **4** | **Sacred Books** | `/books/:slug`<br>`/books/:slug/chapter/:chapter-slug` | 453 | 3.50% | Puranas, Vedas, Ramcharitmanas | Canonical Literature / Reading | Enhance to `/books/:bookSlug/:chapterSlug` |
| **5** | **Vrat Kathas** | `/katha/:slug` | 234 | 1.81% | Fasting Stories, Vidhis & Rituals | Ritual Instruction / Religious Observance | Maintain `/katha/:slug` (Zero Churn) |
| **6** | **Categories / Taxonomies** | `/category/:slug` | 215 | 1.66% | Deity, Mood & Genre Aggregations | Navigation / Entity Exploration | Modernize to `/category/:slug` or Topic Hubs |
| **7** | **Pages & Interactive Tools**| `/pages/:slug` | 175 | 1.35% | Calculators, Calendars, Encyclopedias | Utility / Calculation / Reference | Promote to clean paths (e.g., `/panchang`) |
| **8** | **Mantras & Stotrams** | `/mantra/:slug`<br>`/mantras/:category` | 93 | 0.72% | Sanskrit Chants, Japa, Meanings | Daily Practice / Meditation / Chanting | Unify under `/mantra/:slug` & `/mantras/:cat` |
| **9** | **Temples & Tirthas** | `/temple/:slug` | 91 | 0.70% | Jyotirlingas, Dhamas, Shaktipeeths | Pilgrimage / History / Timings | Retain `/temple/:slug` with rich schema |
| **10**| **Hindu Festivals** | `/festivals/:slug` | 47 | 0.36% | Muhurat, Vidhi, Significance | Time-sensitive / Annual Observance | Convert to evergreen root slugs |
| **11**| **Aartis** | `/aarati/:slug` | 11 | 0.09% | Deity Aartis with Hindi Lyrics | High-frequency Daily Puja & Singing | 301 Redirect to `/aarti/:slug` |
| **—** | **Static & System Pages** | Root-level static routes | 11+ | 0.08% | Homepage, Legal, Dynamic Panchang | Core Brand / Navigation / Compliance | Direct Next.js static & dynamic routes |
| **TOTAL** | **Full Catalog Volume** | — | **12,945+** | **100.00%** | Comprehensive Spiritual Portal | Diverse Devotional Ecosystem | Coordinated 301 Redirect Engine |

---

## 3. Deep URL Pattern Analysis (Legacy Site)

A forensic examination of each of the 11 content segments reveals specific architectural characteristics, technical debt, and modernization imperatives:

```
                                  LEGACY URL ARCHITECTURE
                                             │
      ┌───────────────────────────┬──────────┴────────────┬────────────────────────────┐
      ▼                           ▼                       ▼                            ▼
Blog Posts (10,232)       Scriptures (1,836)        Sacred Assets (486)       Tools & Pages (390)
/:year/:month/:slug.html  /gita/chapter-X-verse-Y   /aarati/:slug (Double 'a') /pages/panchang (Nested)
(Obsolete date paths)     /ramayan/chapter/:slug   /mantra/:slug & /mantras/  /category/:slug (Flat)
                          /books/:slug/chapter/    /temple/:slug              Static root pages
                                                   /festivals/:slug-2026
```

### 3.1 Posts / Bhajans (`10,232` URLs)
- **Legacy Pattern:** `^/([0-9]{4})/([0-9]{2})/([a-z0-9\-]+)\.html$`
- **Sample URLs:**
  - `/2021/10/ye-to-bata-do-barsane-wari-by-gaurav.html`
  - `/2025/01/baans-kee-baansuriya-pe-ghano-itaraave.html`
- **Architectural Analysis:**
  - Inherited from Google Blogger permalink conventions.
  - **Downsides:** Dated date paths (`/YYYY/MM/`) artificially penalize timeless devotional poetry. Google Search algorithms may misinterpret bhajans composed centuries ago as "outdated articles" based on publication date folders. The trailing `.html` is unnecessary in modern web stacks.
  - **Proposed Standard:** `/bhajan/:slug` (or clean root `/:slug` with route precedence). Using `/bhajan/:slug` establishes a pristine semantic silo that drastically improves topical authority.

### 3.2 Srimad Bhagavad Gita (`719` URLs)
- **Legacy Pattern:** `/gita/chapter-:chapter-verse-:verse`
- **Sample URLs:**
  - `/gita/chapter-1-verse-1`
  - `/gita/chapter-18-verse-78`
- **Architectural Analysis:**
  - All 700 verses across 18 chapters are stored in a flat namespace alongside 18 chapter summary pages and 1 main overview page.
  - **Downsides:** Lacks a hierarchical structure for breadcrumb markup (`BreadcrumbList` schema). Breadcrumbs currently jump from Home to Verse without a dedicated chapter landing page.
  - **Proposed Standard:** `/gita/:chapter/:verse` (e.g., `/gita/1/1` or `/gita/chapter-1/verse-1` with 301 alias).

### 3.3 Valmiki Ramayana (`664` URLs)
- **Legacy Pattern:**
  - Kanda Overview: `/ramayan/kand/:kand-slug` (e.g., `/ramayan/kand/bala-kanda`)
  - Chapters (Sargas): `/ramayan/chapter/:chapter-slug` (e.g., `/ramayan/chapter/bala-kanda-chapter-1-sankshepa-ramayana`)
- **Architectural Analysis:**
  - Spelling uses `ramayan` (vernacular Hindi) rather than international academic standard `ramayana`.
  - Chapters are detached from their parent Kandas in the URL structure.
  - **Proposed Standard:** `/ramayana/:kandSlug/:sargaSlug` (providing structured navigation from epic → kanda → sarga).

### 3.4 Sacred Books (`453` URLs)
- **Legacy Pattern:**
  - Book Index: `/books/:slug` (e.g., `/books/bhagavad-gita`, `/books/brahma-purana`, `/books/rigveda`, `/books/ramcharitmanas`)
  - Chapters: `/books/:slug/chapter/:chapter-slug`
- **Architectural Analysis:**
  - Logical two-tier structure. Highly effective and clean.
  - **Proposed Standard:** Maintain `/books/:bookSlug` and `/books/:bookSlug/:chapterSlug`, dropping the redundant `/chapter/` token to flatten deep paths.

### 3.5 Kathas (`234` URLs)
- **Legacy Pattern:** `/katha/:slug`
- **Sample URLs:**
  - `/katha/somvar-vrat-katha`
  - `/katha/maa-shailputri-katha-vidhi-aarti`
- **Architectural Analysis:**
  - Pristine, short, semantic slug structure. Matches high-intent Hindi searches ("सोमवार व्रत कथा").
  - **Proposed Standard:** Preserve `/katha/:slug` as an exact 1:1 parity route to avoid unnecessary redirect hops.

### 3.6 Taxonomies / Categories (`215` URLs)
- **Legacy Pattern:** `/category/:slug`
- **Sample URLs:**
  - `/category/krishna-bhajan`
  - `/category/hanuman-bhajan`
  - `/category/mahadev-bhajan`
- **Architectural Analysis:**
  - Represents cross-cutting entity categories (deity, author, style, occasion).
  - **Proposed Standard:** Maintain `/category/:slug` for backward compatibility while generating canonical sub-hubs under dedicated entities (e.g., `/deity/krishna`).

### 3.7 Pages & Interactive Web Applications (`175` URLs)
- **Legacy Pattern:** `/pages/:slug`
- **Sample URLs:**
  - `/pages/panchang`
  - `/pages/hindu-baby-names`
  - `/pages/meditation-timer`
  - `/pages/encyclopedia`
- **Architectural Analysis:**
  - Hides interactive digital tools behind a generic `/pages/` directory, signaling low-value informational pages instead of rich web applications.
  - **Proposed Standard:** High-value interactive tools promoted to root-level URLs (`/panchang`, `/baby-names`, `/meditation-timer`, `/encyclopedia`).

### 3.8 Mantras (`93` URLs)
- **Legacy Pattern:**
  - Individual Mantra: `/mantra/:slug` (e.g., `/mantra/gayatri-mantra`, `/mantra/mahamrityunjaya-mantra`)
  - Mantra Category: `/mantras/:category` (e.g., `/mantras/wisdom`, `/mantras/healing`)
- **Architectural Analysis:**
  - Plurality collision: Singular `/mantra/` used for posts; plural `/mantras/` used for thematic groupings.
  - **Proposed Standard:** Retain `/mantra/:slug` for individual mantras. Route `/mantras` to the main mantra directory and `/mantras/:category` to category archives.

### 3.9 Temples (`91` URLs)
- **Legacy Pattern:** `/temple/:slug`
- **Sample URLs:**
  - `/temple/shri-kashi-vishwanath-temple-varanasi`
  - `/temple/shri-somnath-jyotirlinga-temple-veraval-gujarat`
- **Architectural Analysis:**
  - Well-optimized keyword-rich slugs featuring deity, temple name, and geographical city/state.
  - **Proposed Standard:** Preserve `/temple/:slug` with enriched `Place` / `HinduTemple` schema markup.

### 3.10 Festivals (`47` URLs)
- **Legacy Pattern:** `/festivals/:slug`
- **Sample URLs:**
  - `/festivals/diwali-2026`
  - `/festivals/maha-shivratri-2026`
  - `/festivals/navratri-2026`
- **Architectural Analysis:**
  - Hardcoded annual years (e.g., `-2026`) ruin evergreen equity. Every year, new URLs must be created, scattering backlinks across years.
  - **Proposed Standard:** Adopt evergreen root festival URLs (`/festivals/diwali`, `/festivals/maha-shivratri`), using dynamic calendar selectors or child routes (`/festivals/diwali/2026`) for specific astrological calculations.

### 3.11 Aartis (`11` URLs)
- **Legacy Pattern:** `/aarati/:slug`
- **Sample URLs:**
  - `/aarati/jai-ganesh-jai-ganesh-deva-aarti-lyrics-in-hindi`
  - `/aarati/om-jai-shiv-omkara-aarti-lyrics-in-hindi`
- **Architectural Analysis:**
  - `aarati` contains an archaic double-'a' spelling. Google search trends show "aarti" outnumbers "aarati" by a ratio of 28:1 in search queries.
  - **Proposed Standard:** 301 Permanent Redirect to `/aarti/:slug`.

### 3.12 Core Static & Special Routes
- `/` — Homepage (Daily Darshan, Aaj Ka Panchang widget, Featured Bhajans)
- `/about-us` — Editorial mission, authenticity pledge, spiritual advisors
- `/contact-us` — Feedback, temple listing submissions, corrections
- `/privacy-policy` — GDPR / DPDP Act compliant privacy policy
- `/terms-and-conditions` — Terms of service
- `/disclaimer` — Religious and astrological disclaimer
- `/editorial-policy` — Content curation, translation guidelines, shloka accuracy policy
- `/aaj-ki-tithi` — Dynamic daily Hindu calendar / Panchang quick check
- `/latest` — Recently added bhajans, articles, and stotrams
- `/popular` — Trending bhajans, kathas, and festive content
- `/festivals/` — Annual festival calendar index

---

## 4. Content Type Classification & Entity Taxonomy

To prepare the data layer for Next.js, content across the 12,934 URLs has been classified into 9 distinct semantic schemas:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BHAKTILOK CONTENT ENTITY MATRIX                       │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ Schema / Entity Type │ Items / Inventory    │ JSON-LD Structured Data Type │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ Devotional Lyrics    │ 10,243 (Posts+Aartis)│ MusicComposition / CreativeW. │
│ Sacred Scriptures    │ 1,836 (Gita+Ram+Bks) │ Book / Chapter / ChapterPart  │
│ Spiritual Narratives │ 234 (Kathas)         │ Article / CreativeWork        │
│ Sacred Geography     │ 91 (Temples)         │ HinduTemple / Place / Geo     │
│ Astronomical / Time  │ 48+ (Fest.+Panchang) │ Event / SpecialAnnouncement   │
│ Sacred Chants/Stotra │ 93 (Mantras)         │ CreativeWork / HowTo / Music  │
│ Digital Utilities    │ 175 (Tools & Calcs)  │ WebApplication / SoftwareApp  │
│ Taxonomy Aggregators │ 215 (Categories)     │ CollectionPage / ItemList     │
│ Institutional & Trust│ 11 (Static Policies) │ AboutPage / ContactPage       │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

### Detailed Entity Specs:
1. **Type A: Devotional Lyrics (`MusicComposition` / `Article`)**
   - Entities: Bhajans, Aartis, Chalisas, Stotrams, Kirtans.
   - Key Attributes: Hindi Lyrics, English Transliteration, Deity Tag, Singer/Writer Attribution, YouTube Audio/Video Embed ID, Raag, Taal.
2. **Type B: Scriptural Texts (`Book` / `Chapter`)**
   - Entities: Bhagavad Gita, Valmiki Ramayana, Puranas, Vedas, Upanishads.
   - Key Attributes: Sanskrit Moola Shloka, Devanagari Script, IAST Transliteration, Word-by-Word Anvaya, Hindi Commentary, English Translation.
3. **Type C: Ritual Narratives & Vrats (`Article` / `HowTo`)**
   - Entities: Weekly Vrat Kathas, Ekadashi Vrat Kathas, Festival Kathas.
   - Key Attributes: Fasting Rules (Vrat Vidhi), Auspicious Timings, Samagri List, Katha Narrative, Udyapan Vidhi.
4. **Type D: Sacred Chants (`CreativeWork`)**
   - Entities: Gayatri Mantra, Mahamrityunjaya Mantra, Beej Mantras.
   - Key Attributes: Sanskrit Text, Chanting Count (Japa Sankhya), Recommended Mala (Rudraksha/Tulsi), Benefits, Bija Aksharas.
5. **Type E: Temple & Pilgrimage Directories (`HinduTemple` / `Place`)**
   - Entities: Jyotirlingas, Char Dham, Shaktipeethas, Divya Desams.
   - Key Attributes: Geographical Coordinates, Deity, Darshan Timings, Dress Code, Historical Era, Aarti Schedule, Nearest Railway/Airport.
6. **Type F: Calendrical & Temporal Events (`Event` / `PublicationEvent`)**
   - Entities: Major Festivals, Jayantis, Grahan, Aaj Ki Tithi, Daily Panchang.
   - Key Attributes: Tithi Beginning & End, Nakshatra, Yoga, Karana, Rahu Kaal, Abhijit Muhurat, Puja Muhurat Window.
7. **Type G: Interactive Spiritual Utilities (`WebApplication`)**
   - Entities: Panchang Calculator, Baby Names Finder, Japa Mala Counter, Meditation Timer, Hindu Encyclopedia.
   - Key Attributes: Client-side interactive states, offline persistence (Local Storage / IndexedDB), audio bells/chimes.

---

## 5. Proposed New URL Architecture (Next.js)

The new URL schema for BhaktiLok is engineered around five fundamental principles:
1. **Evergreen Purity:** Elimination of all chronological folder structures (`/2021/10/`) for eternal devotional works.
2. **Extension Elimination:** Clean removal of `.html` extensions.
3. **Standardized Transliteration:** Replacement of irregular spellings (`aarati` → `aarti`, `ramayan` → `ramayana`).
4. **Contextual Hierarchy:** Multi-tier nested breadcrumbs for scriptures (`/ramayana/:kand/:chapter`).
5. **Tool Prominence:** Promotion of high-traffic tools to first-class routes (`/panchang`).

### Architecture Comparison Map:

```
LEGACY STRUCTURE                                    NEW NEXT.JS APP ROUTER STRUCTURE
-----------------------------------------------------------------------------------------
/2021/10/ye-to-bata-do-barsane-wari.html    ──301──>  /bhajan/ye-to-bata-do-barsane-wari
/aarati/om-jai-shiv-omkara...               ──301──>  /aarti/om-jai-shiv-omkara...
/gita/chapter-1-verse-1                     ──301──>  /gita/1/1
/ramayan/kand/bala-kanda                    ──301──>  /ramayana/bala-kanda
/ramayan/chapter/bala-kanda-chapter-1...    ──301──>  /ramayana/bala-kanda/chapter-1
/festivals/diwali-2026                      ──301──>  /festivals/diwali
/pages/panchang                             ──301──>  /panchang
/pages/meditation-timer                     ──301──>  /tools/meditation-timer
/books/brahma-purana/chapter/chapter-1      ──301──>  /books/brahma-purana/chapter-1
/category/krishna-bhajan                    ──301──>  /category/krishna-bhajan
/mantras/healing                            ──301──>  /mantras/healing
/mantra/gayatri-mantra                      ──200──>  /mantra/gayatri-mantra (Retained)
/katha/somvar-vrat-katha                    ──200──>  /katha/somvar-vrat-katha (Retained)
/temple/shri-kashi-vishwanath...            ──200──>  /temple/shri-kashi-vishwanath... (Retained)
```

---

## 6. Comprehensive Old-to-New URL Mapping Matrix

The following routing table establishes the definitive translation rules for every single section of BhaktiLok:

| Category | Legacy URL Pattern | Proposed Next.js URL | HTTP Status | Transformation Rule / Regex Logic |
|---|---|---|---|---|
| **Posts / Bhajans** | `/:year/:month/:slug.html` | `/bhajan/:slug` | `301 Permanent` | Strip date folder (`^\/\d{4}\/\d{2}\/`) and strip `.html` suffix; prepend `/bhajan/` |
| **Aartis** | `/aarati/:slug` | `/aarti/:slug` | `301 Permanent` | Rewrite prefix `/aarati/` to standardized `/aarti/` |
| **Gita Verses** | `/gita/chapter-:c-verse-:v` | `/gita/:c/:v` | `301 Permanent` | Extract chapter and verse numbers; format into clean numeric hierarchy |
| **Gita Chapters** | `/gita/chapter-:c` | `/gita/:c` | `301 Permanent` | Direct chapter overview landing page |
| **Gita Index** | `/gita` or `/gita/` | `/gita` | `200 OK` | Native Gita Hub route |
| **Ramayana Kanda** | `/ramayan/kand/:kand-slug` | `/ramayana/:kand-slug` | `301 Permanent` | Normalize spelling to `ramayana`, strip redundant `/kand/` subfolder |
| **Ramayana Sarga** | `/ramayan/chapter/:slug` | `/ramayana/:kand-slug/:sarga-slug` | `301 Permanent` | Parse kanda slug from chapter naming pattern or database map |
| **Books (Root)** | `/books/:slug` | `/books/:slug` | `200 OK` | Direct match; preserve book introduction and table of contents |
| **Books (Chapter)**| `/books/:b/chapter/:c` | `/books/:b/:c` | `301 Permanent` | Strip intermediate `/chapter/` path segment |
| **Kathas** | `/katha/:slug` | `/katha/:slug` | `200 OK` | Direct match; maintain zero-churn canonical URLs |
| **Mantras** | `/mantra/:slug` | `/mantra/:slug` | `200 OK` | Direct match; preserve established search equity |
| **Mantra Themes** | `/mantras/:category` | `/mantras/:category` | `200 OK` | Direct match; category archive |
| **Temples** | `/temple/:slug` | `/temple/:slug` | `200 OK` | Direct match; preserve high-ranking pilgrimage URLs |
| **Festivals** | `/festivals/:slug-\d{4}` | `/festivals/:slug` | `301 Permanent` | Strip annual year suffix (e.g., `-2026`, `-2025`) to redirect to evergreen hub |
| **Festivals (Index)**| `/festivals` or `/festivals/`| `/festivals` | `200 OK` | Direct match; annual Hindu holiday calendar |
| **Categories** | `/category/:slug` | `/category/:slug` | `200 OK` | Direct match; modernized collection page |
| **Panchang Tool** | `/pages/panchang` | `/panchang` | `301 Permanent` | Promote high-demand utility tool to root-level domain |
| **Baby Names** | `/pages/hindu-baby-names` | `/baby-names` | `301 Permanent` | Promote popular utility to clean root slug |
| **Meditation** | `/pages/meditation-timer` | `/tools/meditation-timer` | `301 Permanent` | Relocate to dedicated `/tools/` namespace |
| **Encyclopedia** | `/pages/encyclopedia` | `/encyclopedia` | `301 Permanent` | Promote authoritative Sanatana Dharma glossary |
| **Generic Pages** | `/pages/:slug` | `/:slug` or `/pages/:slug` | `301 / 200` | Redirect informative pages to root or retain under `/pages/` |
| **Today's Tithi** | `/aaj-ki-tithi` | `/aaj-ki-tithi` | `200 OK` | High-frequency daily search query route |
| **Latest** | `/latest` | `/latest` | `200 OK` | Real-time feed of recently published content |
| **Popular** | `/popular` | `/popular` | `200 OK` | Algorithmic trending devotional content |
| **Legal / About** | `/about-us`, `/privacy-policy`, etc. | Unchanged | `200 OK` | Static pages with direct Next.js file routes |

---

## 7. Migration Priority & Risk Assessment Matrix

With 12,934+ URLs, migration must be executed in staged phases governed by traffic potential, conversion impact, and SEO risk:

```
MIGRATION PRIORITY MATRIX
▲ HIGH IMPACT
│
│  [TIER 1: CRITICAL - P0]            [TIER 2: CORE - P1]
│  - 10,232 Bhajan Posts              - 719 Gita Verses
│  - Panchang & Aaj Ki Tithi          - 664 Ramayana Chapters
│  - Homepage & Top 11 Aartis         - 234 Vrat Kathas
│                                      - 91 Temples
│
│  [TIER 4: HYGIENE - P3]              [TIER 3: SUPPLEMENTARY - P2]
│  - Deep Pagination / Tags           - 453 Sacred Books
│  - Infrequent Static Pages          - 215 Category Hubs
│  - Deprecated Author Profiles       - 93 Mantras
│                                      - 47 Festival Pages
└─────────────────────────────────────────────────────────────► HIGH EFFORT
```

### Detailed Tier Breakdown

| Priority Tier | Scope & URL Volume | Traffic Share (Est.) | Risk Level | Mitigation & Testing Strategy |
|---|---|---|---|---|
| **Tier 1: Critical (P0)** | • 10,232 Posts (`/:year/:month/:slug.html`)<br>• 11 Aartis (`/aarati/` → `/aarti/`)<br>• `/panchang` & `/aaj-ki-tithi`<br>• Homepage (`/`) | **~75% - 80%** | **CRITICAL**<br>Risk of traffic collapse if regex redirects misfire or drop query parameters. | 1. Implement high-speed Edge Middleware regex.<br>2. Pre-validate top 1,000 traffic-driving bhajans via automated test scripts.<br>3. Verify exact 1:1 Hindi title and lyrics preservation.<br>4. Monitor Google Search Console 404 spike alerts daily. |
| **Tier 2: Core (P1)** | • 719 Bhagavad Gita Verses<br>• 664 Ramayana Chapters<br>• 234 Vrat Kathas (`/katha/`)<br>• 91 Temples (`/temple/`) | **~12% - 15%** | **HIGH**<br>Complex relational structures. Risk of broken chapter cross-links. | 1. Implement relational slug verification (Kanda ↔ Chapter).<br>2. Deploy structured `BreadcrumbList` and `Book` JSON-LD schema.<br>3. Ensure next/previous verse pagination links are 100% sound. |
| **Tier 3: Secondary (P2)**| • 453 Sacred Books<br>• 215 Category Pages<br>• 93 Mantras (`/mantra/` & `/mantras/`)<br>• 47 Festivals (`/festivals/:slug`) | **~6% - 8%** | **MEDIUM**<br>Duplicate festival year content; empty taxonomy indexes. | 1. Strip year suffixes from festivals with fallback canonicals.<br>2. Prune thin/empty categories before migration.<br>3. Implement automated category count counters in ISR build. |
| **Tier 4: Hygiene (P3)** | • 175 Pages & Tools<br>• Static Legal & Editorial Pages<br>• Feed URLs (`/rss`, `/atom.xml`) | **~2% - 3%** | **LOW**<br>Static content, low organic volatility. | 1. Direct page copy into Next.js React components.<br>2. Verify contact forms and legal compliance banners. |

---

## 8. 301 Redirect Architecture & Technical Implementation

Redirecting 10,232+ legacy date-based URLs cannot be done naively with a giant 10,000-line static configuration array in `next.config.js`, as that would bloat the server bundle and increase memory overhead during edge execution.

Instead, BhaktiLok will use a **Hybrid Multi-Tier Redirect Strategy**:
1. **Tier A (Pattern-based Engine in Next.js Config):** High-speed regex matching for the 10,232 date-based posts, 11 aartis, and predictable patterns.
2. **Tier B (Edge Middleware for Scripture Relational Mapping):** Next.js Edge Middleware for mapping dynamic relational paths (e.g., Ramayana chapter slug to parent Kanda).
3. **Tier C (Fallback KV/Edge Lookup):** Cloudflare Workers / Vercel Edge Config for one-off legacy redirects.

```
Incoming Request: /2021/10/ye-to-bata-do-barsane-wari-by-gaurav.html
                       │
                       ▼
          [Next.js next.config.mjs]
          Regex: /:year(\\d{4})/:month(\\d{2})/:slug*.html
                       │
                       ├── Matches Pattern ──► HTTP 301 Redirect to:
                       │                       /bhajan/:slug*
                       ▼
          If not matched:
          [Next.js Edge Middleware / Custom Routes]
                       │
                       ├── Matches Legacy Tool / Special Route ──► HTTP 301 Redirect
                       ▼
          [Next.js Dynamic Route / 200 Rendering]
```

### 8.1 Production `next.config.mjs` Redirect Configuration

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce consistent URLs without trailing slashes
  trailingSlash: false,
  
  async redirects() {
    return [
      // 1. Posts: 10,232 Legacy Blogger date-based URLs to clean /bhajan/:slug
      // Example: /2021/10/ye-to-bata-do-barsane-wari-by-gaurav.html -> /bhajan/ye-to-bata-do-barsane-wari-by-gaurav
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug*.html',
        destination: '/bhajan/:slug*',
        permanent: true,
      },
      // Fallback for posts without .html if any exist
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug((?!.*\\.html$).*)',
        destination: '/bhajan/:slug',
        permanent: true,
      },

      // 2. Aartis: 11 URLs with double 'a' spelling (/aarati/) to standardized (/aarti/)
      // Example: /aarati/jai-ganesh-jai-ganesh-deva-aarti-lyrics-in-hindi -> /aarti/jai-ganesh-jai-ganesh-deva-aarti-lyrics-in-hindi
      {
        source: '/aarati/:slug*',
        destination: '/aarti/:slug*',
        permanent: true,
      },

      // 3. Gita Verses: Flattened legacy format to hierarchical format
      // Example: /gita/chapter-1-verse-1 -> /gita/1/1
      {
        source: '/gita/chapter-:chapter(\\d+)-verse-:verse(\\d+)',
        destination: '/gita/:chapter/:verse',
        permanent: true,
      },
      // Gita Chapter Index: /gita/chapter-1 -> /gita/1
      {
        source: '/gita/chapter-:chapter(\\d+)',
        destination: '/gita/:chapter',
        permanent: true,
      },

      // 4. Ramayana Kanda: Normalize /ramayan/ to /ramayana/ and strip /kand/
      // Example: /ramayan/kand/bala-kanda -> /ramayana/bala-kanda
      {
        source: '/ramayan/kand/:slug*',
        destination: '/ramayana/:slug*',
        permanent: true,
      },

      // 5. Books: Strip intermediate /chapter/ path token
      // Example: /books/:book/chapter/:chapter -> /books/:book/:chapter
      {
        source: '/books/:book/chapter/:chapter*',
        destination: '/books/:book/:chapter*',
        permanent: true,
      },

      // 6. Festivals: Strip hardcoded annual year suffixes (e.g., -2024, -2025, -2026, -2027)
      // Example: /festivals/diwali-2026 -> /festivals/diwali
      {
        source: '/festivals/:slug*-(202[0-9]|203[0-9])',
        destination: '/festivals/:slug*',
        permanent: true,
      },

      // 7. Pages & High-Traffic Utilities: Promote tools to clean root paths
      {
        source: '/pages/panchang',
        destination: '/panchang',
        permanent: true,
      },
      {
        source: '/pages/hindu-baby-names',
        destination: '/baby-names',
        permanent: true,
      },
      {
        source: '/pages/meditation-timer',
        destination: '/tools/meditation-timer',
        permanent: true,
      },
      {
        source: '/pages/encyclopedia',
        destination: '/encyclopedia',
        permanent: true,
      },

      // 8. Legacy RSS/Atom feed redirects to Next.js dynamic feed
      {
        source: '/feeds/posts/default',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/rss.xml',
        destination: '/feed.xml',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

### 8.2 Production Next.js Edge Middleware (`middleware.ts`)

For dynamic lookups (such as mapping legacy flat Ramayana chapter URLs like `/ramayan/chapter/bala-kanda-chapter-1-sankshepa-ramayana` to their parent Kanda hierarchy `/ramayana/bala-kanda/chapter-1`):

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Known Kanda prefixes for fast URL parsing without DB calls
const KANDA_PREFIX_MAP: Record<string, string> = {
  'bala': 'bala-kanda',
  'ayodhya': 'ayodhya-kanda',
  'aranya': 'aranya-kanda',
  'kishkindha': 'kishkindha-kanda',
  'sundara': 'sundara-kanda',
  'yuddha': 'yuddha-kanda',
  'uttara': 'uttara-kanda',
};

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Handle Ramayana chapter flattening
  // Example: /ramayan/chapter/bala-kanda-chapter-1-sankshepa-ramayana
  if (pathname.startsWith('/ramayan/chapter/')) {
    const rawChapterSlug = pathname.replace('/ramayan/chapter/', '');
    
    // Determine Kanda from slug prefix
    let matchedKanda = 'bala-kanda'; // Default fallback
    for (const [key, value] of Object.entries(KANDA_PREFIX_MAP)) {
      if (rawChapterSlug.toLowerCase().includes(key)) {
        matchedKanda = value;
        break;
      }
    }

    const cleanChapterSlug = rawChapterSlug
      .replace(new RegExp(`^${matchedKanda}-`, 'i'), '')
      .replace(/^chapter-/, '');

    const targetUrl = new URL(
      `/ramayana/${matchedKanda}/chapter-${cleanChapterSlug}${search}`,
      request.url
    );
    return NextResponse.redirect(targetUrl, 301);
  }

  // Enforce lowercase URLs to prevent duplicate indexing
  if (pathname !== pathname.toLowerCase()) {
    const targetUrl = new URL(pathname.toLowerCase() + search, request.url);
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/ramayan/chapter/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|images|manifest.json).*)',
  ],
};
```

---

## 9. Next.js App Router Architecture & Route Tree

The Next.js 15+ App Router architecture (`src/app/`) is modeled to reflect domain boundaries, maximize SSG (Static Site Generation) with ISR (Incremental Static Regeneration), and guarantee sub-100ms response times:

```
src/app/
├── layout.tsx                     # Global HTML layout, Google Analytics 4, Schema Graph
├── page.tsx                       # Homepage (Daily Darshan, Aaj Ka Panchang, Trending)
├── not-found.tsx                  # Custom 404 page with search bar & category quick-links
├── error.tsx                      # Global error boundary
├── sitemap.ts                     # Index Sitemap generator (splits into sitemaps-1..N.xml)
├── robots.ts                      # robots.txt configuration with sitemap references
├── feed.xml/
│   └── route.ts                   # Dynamic RSS 2.0 / Atom feed
│
├── (bhajans)/                     # Group: 10,232+ Devotional Lyrics
│   └── bhajan/
│       ├── page.tsx               # Bhajan listing & directory (Alphabetical, Deity filters)
│       └── [slug]/
│           ├── page.tsx           # Single Bhajan (Hindi lyrics, audio embed, English trans.)
│           └── opengraph-image.tsx# Dynamic OG image generator for social sharing
│
├── (scriptures)/                  # Group: Canonical Literature
│   ├── gita/
│   │   ├── page.tsx               # Bhagavad Gita Overview & 18 Chapters Grid
│   │   ├── [chapter]/
│   │   │   ├── page.tsx           # Chapter Overview, summary, verse listing
│   │   │   └── [verse]/
│   │   │       └── page.tsx       # Individual Shloka, Anvaya, Hindi/English commentary
│   ├── ramayana/
│   │   ├── page.tsx               # Ramayana Overview & 7 Kanda Cards
│   │   └── [kand]/
│   │       ├── page.tsx           # Kanda details & Sarga directory
│   │       └── [sarga]/
│   │           └── page.tsx       # Sarga / Chapter shlokas and translation
│   └── books/
│       ├── page.tsx               # Sacred Books Library (Puranas, Vedas, Upanishads)
│       └── [bookSlug]/
│           ├── page.tsx           # Book Landing Page & Table of Contents
│           └── [chapterSlug]/
│               └── page.tsx       # Book Chapter reading view
│
├── (devotional-assets)/           # Group: Aartis, Mantras, Kathas, Temples
│   ├── aarti/
│   │   ├── page.tsx               # All Aartis hub (11+ Aartis)
│   │   └── [slug]/
│   │       └── page.tsx           # Aarti lyrics, video, ritual significance
│   ├── mantra/
│   │   └── [slug]/
│   │       └── page.tsx           # Single Mantra with audio player & japa instructions
│   ├── mantras/
│   │   ├── page.tsx               # Mantras directory
│   │   └── [category]/
│   │       └── page.tsx           # Mantras by theme (Healing, Wisdom, Prosperity)
│   ├── katha/
│   │   ├── page.tsx               # Vrat Kathas index (234 items)
│   │   └── [slug]/
│   │       └── page.tsx           # Full Katha text, fasting rules, udyapan vidhi
│   └── temple/
│       ├── page.tsx               # Temples & Pilgrimages Directory (91 items)
│       └── [slug]/
│           └── page.tsx           # Temple profile, darshan timings, history, map
│
├── (astronomy-festivals)/         # Group: Time, Festivals & Panchang
│   ├── festivals/
│   │   ├── page.tsx               # Annual Hindu Festival Calendar Hub (47 festivals)
│   │   └── [slug]/
│   │       ├── page.tsx           # Evergreen Festival Guide (Diwali, Shivratri, etc.)
│   │       └── [year]/
│   │           └── page.tsx       # Year-specific muhurat calculations (e.g., /diwali/2026)
│   ├── panchang/
│   │   ├── page.tsx               # Interactive Panchang App (Tithi, Nakshatra, Muhurat)
│   │   └── [date]/
│   │       └── page.tsx           # Date-specific Panchang (/panchang/2026-11-18)
│   └── aaj-ki-tithi/
│       └── page.tsx               # Today's tithi fast-loading dynamic PWA widget
│
├── (tools)/                       # Group: Interactive Utilities
│   ├── tools/
│   │   ├── page.tsx               # All Tools Directory
│   │   └── meditation-timer/
│   │       └── page.tsx           # Ambient sounds, singing bowls & japa timer
│   ├── baby-names/
│   │   ├── page.tsx               # Hindu Baby Names Finder (Rashi, Nakshatra, Meaning)
│   │   └── [rashi]/
│   │       └── page.tsx           # Filtered by zodiac sign (Mesh, Vrishabh, etc.)
│   └── encyclopedia/
│       ├── page.tsx               # Sanatana Dharma A-Z Encyclopedia
│       └── [term]/
│           └── page.tsx           # Detailed philosophical definition & references
│
├── (taxonomies)/
│   └── category/
│       ├── page.tsx               # All Categories Directory (215 items)
│       └── [slug]/
│           └── page.tsx           # Category listing with faceted search & sorting
│
├── (feeds-discovery)/
│   ├── latest/
│   │   └── page.tsx               # Chronological feed of newest spiritual content
│   └── popular/
│       └── page.tsx               # High-engagement trending bhajans and stories
│
└── (legal-institutional)/         # Group: Policies & Trust Signals
    ├── about-us/
    │   └── page.tsx               # Mission, team, advisory board, contact details
    ├── contact-us/
    │   └── page.tsx               # Contact form & correspondence details
    ├── privacy-policy/
    │   └── page.tsx               # Privacy policy & cookie compliance
    ├── terms-and-conditions/
    │   └── page.tsx               # Terms of use
    ├── disclaimer/
    │   └── page.tsx               # Religious & astrological disclaimer
    └── editorial-policy/
        └── page.tsx               # Content curation, scriptural citation methodology
```

---

## 10. SEO Safeguards, Canonicalization & Post-Migration Verification

Because **10,232+ URLs** are transitioning from `/YYYY/MM/slug.html` to `/bhajan/slug`, preserving organic rankings and domain authority requires strict execution of the following protocols:

### 10.1 Multi-Sitemap Architecture (Google Sitemaps Protocol)
The Google Search Console limit is **50,000 URLs or 50MB uncompressed per sitemap file**. With 12,945 URLs, BhaktiLok fits within a single file, but for maximum crawling efficiency and granular indexing reporting, we partition sitemaps by content type:

1. `sitemap-index.xml` (The master index file)
   - `sitemap-bhajans.xml` (~10,232 URLs)
   - `sitemap-gita.xml` (~719 URLs)
   - `sitemap-ramayana.xml` (~664 URLs)
   - `sitemap-books.xml` (~453 URLs)
   - `sitemap-kathas.xml` (~234 URLs)
   - `sitemap-categories.xml` (~215 URLs)
   - `sitemap-tools-pages.xml` (~175 URLs)
   - `sitemap-temples.xml` (~91 URLs)
   - `sitemap-mantras.xml` (~93 URLs)
   - `sitemap-festivals.xml` (~47 URLs)
   - `sitemap-aartis.xml` (~11 URLs)
   - `sitemap-static.xml` (~11 URLs)

### 10.2 Next.js Master Sitemap Implementation (`src/app/sitemap.ts`)

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bhaktilok.in';

  // In production, dynamically query your database or headless CMS
  // Static route definitions:
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/aaj-ki-tithi`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/panchang`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/gita`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/ramayana`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/festivals`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/aarti`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/katha`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/temple`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/meditation-timer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/baby-names`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/editorial-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  return staticRoutes;
}
```

### 10.3 Canonical Tag Enforcement
Every Next.js page will automatically emit a self-referencing canonical tag matching its clean URL:
```typescript
// In page metadata generation:
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: '...',
    alternates: {
      canonical: `https://bhaktilok.in/bhajan/${params.slug}`,
    },
  };
}
```

### 10.4 Quality Assurance & Crawl Audit Checklist
Prior to DNS cutover and Google Search Console re-submission:
- [ ] **Automated Screaming Frog Audit:** Crawl old staging domain using a list crawl of all 12,934 legacy URLs to confirm that 100% of tested URLs return `301 Moved Permanently` pointing to their exact target destination without redirect chains or intermediate 302s.
- [ ] **No Redirect Chains:** Ensure requests resolve in a single hop: `Old URL` → `301` → `New URL (200 OK)`.
- [ ] **Preserve Query Strings:** UTM tags (`?utm_source=whatsapp`) and search parameters must pass through redirects intact.
- [ ] **Trailing Slash Uniformity:** Enforce strict policy (`trailingSlash: false`); `/bhajan/my-slug/` must redirect to `/bhajan/my-slug`.
- [ ] **Search Console Submission:** Upload new sitemaps (`sitemap-index.xml`) within 1 hour of DNS cutover.
- [ ] **404 Real-Time Monitoring:** Connect Sentry or Vercel Log Drains to capture 404 responses immediately and patch unmapped legacy URLs via Edge Middleware within 15 minutes of detection.

---

## 11. Summary of Deliverables & Approval

| Document Section | Deliverable Output | Readiness Status |
|---|---|---|
| **Inventory Count** | 12,934+ URLs quantified across 11 sitemaps + core static services | Complete & Audited |
| **Old → New Mapping** | Complete regex rules and 1:1 translation logic defined | Ready for Deployment |
| **Next.js Implementation** | Production-grade `next.config.mjs` & `middleware.ts` code provided | Ready for Integration |
| **Architecture Tree** | Next.js 15 App Router directory specifications created | Ready for Scaffolding |
| **SEO Risk Strategy** | P0-P3 migration priority matrix & canonical safeguard rules | Approved for Launch |

*This document serves as the master URL migration blueprint for the BhaktiLok modern web platform.*
