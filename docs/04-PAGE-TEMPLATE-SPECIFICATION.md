# BhaktiLok — Enterprise Page Template Specification
**Document ID:** `BL-SPEC-04`  
**Version:** `2.0.0` (Production Architecture)  
**Status:** Approved for Implementation  
**Target Platform:** Next.js 16+ App Router, React 19, TypeScript, Tailwind CSS v4, Supabase / PostgreSQL 16  
**Author:** BhaktiLok Core Architecture, Design Systems & Engineering Team  
**Last Updated:** November 2026  

---

## 1. Executive Summary & Design System Foundations

### 1.1 Architectural Purpose & Scope
This document defines the complete architectural, structural, data-flow, interactive, and visual specifications for all 27 canonical page templates comprising the **BhaktiLok** devotional ecosystem. It serves as the authoritative single source of truth for frontend engineers, UI/UX designers, backend developers, and QA automation engineers.

Every template detailed within this specification adheres to:
1. **Sacred Aesthetics & Modern UX:** Balancing traditional Vedic sanctity (Devanagari typography, traditional iconography, sacred palettes) with contemporary responsive web performance (Core Web Vitals, sub-second TTFB, zero layout shift).
2. **Next.js 16+ App Router Paradigm:** Strict separation of concerns between React Server Components (RSC) for heavy data retrieval and edge-caching, and targeted Client Components (`"use client"`) for rich interactive widgets (audio players, Japa counters, reading trackers).
3. **Relational Data Integrity:** Exact alignment with the BhaktiLok PostgreSQL / Supabase schema (`BL-SPEC-05`), utilizing typed PostgREST queries, granular indexes, and edge-cached ISR invalidation tags.
4. **Autonomous Search Engine & Answer Engine Optimization (SEO/AEO/GEO):** Machine-readable JSON-LD Schema.org graphs, semantic HTML5 landmarks, inverted-pyramid editorial architecture, and OpenGraph social syndication.
5. **Universal Accessibility (a11y):** Full WCAG 2.1 AA compliance, high-contrast Devanagari readability, screen reader ARIA landmarks, keyboard traversability, and reduced-motion fallbacks.

### 1.1.1 Master Template Index & Architecture Directory

| ID | Template Name | Canonical Route Pattern | Next.js App Router File Path | Rendering Strategy | Schema.org Type |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **01** | **Homepage** | `/` | `src/app/page.tsx` | ISR (3600s) | `WebSite`, `Organization` |
| **02** | **Content Listing** | `/bhajan`, `/mantra`, `/aarti`... | `src/app/[contentType]/page.tsx` | ISR / SSR | `CollectionPage`, `ItemList` |
| **03** | **Bhajan Detail** | `/bhajan/[slug]` | `src/app/bhajan/[slug]/page.tsx` | SSG + On-Demand ISR | `MusicComposition`, `AudioObject` |
| **04** | **Mantra Detail** | `/mantra/[slug]` | `src/app/mantra/[slug]/page.tsx` | SSG + On-Demand ISR | `HowTo`, `AudioObject` |
| **05** | **Aarti Detail** | `/aarti/[slug]` | `src/app/aarti/[slug]/page.tsx` | SSG + On-Demand ISR | `MusicComposition`, `HowTo` |
| **06** | **Chalisa Detail** | `/chalisa/[slug]` | `src/app/chalisa/[slug]/page.tsx` | SSG + On-Demand ISR | `CreativeWork`, `AudioObject` |
| **07** | **Katha / Story Detail** | `/katha/[slug]` | `src/app/katha/[slug]/page.tsx` | SSG + On-Demand ISR | `Article`, `HowTo` |
| **08** | **Scripture Library** | `/granth` | `src/app/granth/page.tsx` | SSG + ISR (86400s) | `CollectionPage`, `ItemList` |
| **09** | **Scripture Chapter** | `/granth/[scriptureSlug]/[chapterSlug]` | `src/app/granth/[...]/page.tsx` | SSG + ISR (7 Days) | `Chapter`, `BreadcrumbList` |
| **10** | **Scripture Verse** | `/granth/[...]/[verseSlug]` | `src/app/granth/[...]/[verseSlug]/page.tsx` | SSG + On-Demand ISR | `Quotation`, `CreativeWork` |
| **11** | **Panchang Page** | `/panchang`, `/panchang/[date]` | `src/app/panchang/[date]/page.tsx` | ISR (3600s / 86400s) | `SpecialAnnouncement` |
| **12** | **Festival Listing** | `/festivals` | `src/app/festivals/page.tsx` | SSG + ISR (86400s) | `CollectionPage`, `EventSeries` |
| **13** | **Festival Detail** | `/festivals/[slug]`, `[year]/[slug]` | `src/app/festivals/[year]/[slug]/page.tsx` | SSG + ISR (86400s) | `Event`, `HowTo` |
| **14** | **Temple Listing** | `/mandir` | `src/app/mandir/page.tsx` | SSG + ISR (86400s) | `CollectionPage`, `ItemList` |
| **15** | **Temple Detail** | `/mandir/[slug]` | `src/app/mandir/[slug]/page.tsx` | SSG + ISR (7 Days) | `Place`, `TouristAttraction` |
| **16** | **Encyclopedia Listing**| `/encyclopedia` | `src/app/encyclopedia/page.tsx` | SSG + ISR (7 Days) | `DefinedTermSet`, `ItemList` |
| **17** | **Encyclopedia Entry**  | `/encyclopedia/[slug]` | `src/app/encyclopedia/[slug]/page.tsx` | SSG + ISR (7 Days) | `DefinedTerm`, `Article` |
| **18** | **Rashifal (Zodiac)**   | `/rashifal`, `/rashifal/[rashi]` | `src/app/rashifal/[rashi]/page.tsx` | ISR (21600s - 6h) | `Article`, `ItemPage` |
| **19** | **Tools Directory**     | `/tools` | `src/app/tools/page.tsx` | SSG + ISR (86400s) | `CollectionPage`, `WebApplication` |
| **20** | **Tool Detail**         | `/tools/[slug]` | `src/app/tools/[slug]/page.tsx` | Client + SSG Shell | `WebApplication`, `HowTo` |
| **21** | **Article Listing**     | `/articles` | `src/app/articles/page.tsx` | ISR (3600s) | `Blog`, `CollectionPage` |
| **22** | **Article Detail**      | `/articles/[slug]` | `src/app/articles/[slug]/page.tsx` | SSG + ISR (86400s) | `Article`, `NewsArticle` |
| **23** | **Author Profile**      | `/authors/[slug]` | `src/app/authors/[slug]/page.tsx` | SSG + ISR (86400s) | `ProfilePage`, `Person` |
| **24** | **Search Results**      | `/search` | `src/app/search/page.tsx` | SSR (Dynamic Edge) | `SearchResultsPage` (noindex) |
| **25** | **Static Pages**        | `/[slug]` (About, Contact...) | `src/app/(static)/[slug]/page.tsx` | SSG (Build-time) | `AboutPage`, `ContactPage` |
| **26** | **Admin Dashboard**     | `/admin/*` | `src/app/admin/*` | Dynamic (SSR / RLS) | `noindex, nofollow` |
| **27** | **404 / Error Page**    | `not-found.tsx`, `error.tsx` | `src/app/not-found.tsx` | Static / Edge Fallback | `noindex` |

---


### 1.2 Design System Tokens & Foundations

The BhaktiLok visual language is built upon a sacred color harmony reflecting dawn, temple sanctums, sandalwood, and ancient manuscripts.

#### 1.2.1 Core Color Palette
| Token Name | Hex Code | Tailwind Token | Semantic Devotional Usage |
| :--- | :--- | :--- | :--- |
| **Bhagwa Saffron** | `#FF6F00` / `#E65100` | `amber-600` / `orange-700` | Primary brand accent, primary CTA, auspicious highlights, active tabs |
| **Temple Gold** | `#D4AF37` / `#B8860B` | `amber-400` / `yellow-600` | Divine halos, verse numbering borders, premium ornaments, star ratings |
| **Sacred Sand / Cream**| `#FFFDF7` / `#FAF6ED` | `amber-50` / `stone-50` | Primary page background (light mode), reading canvas, parchment cards |
| **Deep Crimson / Kumkum**| `#800020` / `#991B1B` | `rose-900` / `red-800` | Warning, Rahu Kaal alerts, festive tags, sacred borders |
| **Shiva Bhasma / Slate**| `#2B2D42` / `#1E293B` | `slate-800` / `gray-900` | Primary Devanagari typography, headings, high-contrast text |
| **Vedic Midnight** | `#0D0E12` / `#12131A` | `neutral-950` / `zinc-950`| Dark mode background, night reading mode, audio player container |
| **Tulsi Green** | `#2E7D32` / `#166534` | `emerald-700` / `green-800` | Shubh Muhurat, auspicious indicators, verified pandit badges |

#### 1.2.2 Sacred Typography System
* **Devanagari Primary (Headings & Slokas):** `Tiro Devanagari Hindi` / `Rozha One` / `Noto Serif Devanagari`. Delivers classical calligraphic weight, clear matras, and ligature integrity.
* **Devanagari Body (Reading & Lyrics):** `Noto Sans Devanagari` (400, 500, 600). Engineered for effortless long-form reading on low-density mobile displays.
* **Latin / Numerical & UI Primary:** `Plus Jakarta Sans` / `Inter`. Clean, modern geometric sans-serif for numbers, timestamps, labels, and metadata.
* **Classical English Headings:** `Cinzel` / `Playfair Display`. Used sparingly for English epics, chapter titles, and monumental headers.

#### 1.2.3 Elevation, Borders & Sacred Motifs
* **Corner Radii:** Micro elements `rounded-md` (6px), Standard cards `rounded-xl` (12px), Modals & Hero containers `rounded-2xl` (16px), Interactive pills & buttons `rounded-full` (9999px).
* **Borders:** Subtle warm gold/amber borders (`border border-amber-200/60` in light mode, `border-amber-900/30` in dark mode).
* **Card Shadows:** Soft diffuse shadows imitating warm candlelight (`shadow-[0_4px_20px_-4px_rgba(230,81,0,0.06)]`).
* **Z-Index Layering Hierarchy:**
  - Base Content: `z-0`
  - Sticky Headers / In-Page Bars: `z-20`
  - Global Top Utility & Mega Menu: `z-40`
  - Persistent Mini Audio Player: `z-50`
  - Mobile Bottom Dock: `z-50`
  - Drawers & Bottom Sheets: `z-60`
  - Global Modals & Command Palette (`⌘K`): `z-70`
  - Toast Notifications: `z-80`

---

### 1.3 Global Layout Shell & Persistent Navigation

All pages are encapsulated within the master layout shell (`src/app/layout.tsx`), orchestrating five persistent UI components:

```
+-----------------------------------------------------------------------------------+
| GLOBAL TOP UTILITY BAR (City Selector | Today's Tithi | Language | Dark Mode)     |
+-----------------------------------------------------------------------------------+
| PRIMARY NAVBAR & MEGA MENU (Logo | Devotional | Scriptures | Panchang | Search)   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                               PAGE TEMPLATE CONTENT                               |
|                                                                                   |
+-----------------------------------------------------------------------------------+
| PERSISTENT MINI AUDIO PLAYER (Docked Bottom on active playback - Audio & Lyrics)  |
+-----------------------------------------------------------------------------------+
| MOBILE BOTTOM DOCK (Home | Bhajans | Panchang | Scriptures | My Sadhana)          |
+-----------------------------------------------------------------------------------+
| UNIVERSAL FOOTER (Directory Links | Legal | Shastric Disclaimer | Newsletter)      |
+-----------------------------------------------------------------------------------+
```

1. **Global Top Utility Bar (`TopUtilityBar.tsx`):** Displays real-time Vikram Samvat tithi, current location indicator with dynamic city switch modal, English/Hindi language toggle, and theme switch (Parchment/Dark).
2. **Primary Navbar & Mega Menu (`Navbar.tsx` & `MegaMenu.tsx`):** Sticky desktop navigation featuring the sacred BhaktiLok emblem, top devotional hubs with rich mega-menu previews (top deities, popular aartis, Gita chapters), global search trigger (`⌘K`), and user Sadhana profile icon.
3. **Mobile Bottom Navigation Dock (`MobileNavDock.tsx`):** Fixed bottom 5-tab bar on mobile viewports (< 768px): Home, Bhajans, Panchang, Scriptures, and My Bookmarks.
4. **Persistent Mini Audio Player (`GlobalAudioPlayer.tsx`):** Floats above the mobile dock or docks at the bottom of the desktop viewport upon invoking any bhajan, mantra, or aarti track. Features playback controls, time slider, loop counter (for Japa/mantras), and expandable synchronized lyrics sheet.
5. **Universal Footer (`GlobalFooter.tsx`):** Comprehensive 5-column directory, newsletter subscription form, mobile app download QR code, authoritative editorial disclaimer, and verified Sanatan Trust certification badges.

---

## 2. Core Platform & Directory Templates

### 2.1 TEMPLATE 1: HOMEPAGE TEMPLATE (`/`)

#### 2.1.1 Layout Structure (Wireframe Architecture)
The homepage functions as the divine digital dashboard of Sanatan Dharma, seamlessly weaving temporal astrological data with evergreen liturgical literature.

```
+-----------------------------------------------------------------------------------+
| [1] HERO SECTION: Dynamic Sunrise/Sunset Greeting | Daily Sankalpa | Quick Search|
+-----------------------------------------------------------------------------------+
| [2] PANCHANG WIDGET: Today's Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal (City)   |
+-----------------------------------------------------------------------------------+
| [3] DAILY DARSHAN CAROUSEL: Live/Daily Shringar from Kashi, Ayodhya, Vrindavan    |
+-----------------------------------------------------------------------------------+
| [4] POPULAR DEITIES GRID: 12 Sacred Icons (Shiv, Krishna, Ram, Hanuman, Durga...) |
+-----------------------------------------------------------------------------------+
| [5] BHAJAN COLLECTIONS: Trending Now, Morning Bhajans, Krishna Leela, Shiva Dhun   |
+-----------------------------------------------------------------------------------+
| [6] MANTRA OF THE DAY: Sacred Vedic Verse + Audio Preview + 1-Click Japa Launcher |
+-----------------------------------------------------------------------------------+
| [7] AARTI & CHALISA DUAL SECTION: Tabbed switcher with popular daily hymns        |
+-----------------------------------------------------------------------------------+
| [8] FEATURED STORIES & VRAT KATHAS: Pauranik Leelas & Upcoming Fasting Tales      |
+-----------------------------------------------------------------------------------+
| [9] SCRIPTURE HIGHLIGHTS: Bhagavad Gita Sloka of the Day + Ramcharitmanas Chaupai |
+-----------------------------------------------------------------------------------+
| [10] UPCOMING FESTIVALS: Horizontal Timeline Scroll + Live Countdown to Next Parv |
+-----------------------------------------------------------------------------------+
| [11] TEMPLE DISCOVERY: Jyotirlinga & Shaktipeeth Interactive Map & Guides         |
+-----------------------------------------------------------------------------------+
| [12] SPIRITUAL TOOLS GRID: Japa Mala, Choghadiya, Kundali, Muhurat Quick Launchers|
+-----------------------------------------------------------------------------------+
| [13] LATEST DHARMIK ARTICLES & PRAVACHAN: Editorial Philosophy & Culture Insights |
+-----------------------------------------------------------------------------------+
| [14] APP PROMOTION BANNER: Offline Sadhana, Daily Alerts, PWA / Store Download    |
+-----------------------------------------------------------------------------------+
| [15] NEWSLETTER & SANKALPA: Daily Morning Sloka & Panchang Delivered to WhatsApp  |
+-----------------------------------------------------------------------------------+
```

#### 2.1.2 Required Components
* `HeroSection.tsx`: Dynamic greeting based on time of day (Pratah Smaran, Madhyahna, Sandhya, Ratri), auspicious quote, global search bar with instant autocomplete, trending keyword pills.
* `PanchangWidgetCompact.tsx`: Server-rendered compact Panchang card showcasing Day, Tithi, Nakshatra, Sunrise/Sunset, Rahu Kaal window, and "View Full Panchang" CTA.
* `DailyDarshanCarousel.tsx`: Embla-carousel powered visual stream of daily morning temple darshan photos with location tags and high-res lightbox support.
* `DeityGrid.tsx`: 12-item CSS grid featuring custom consecrated deity illustrations, localized Devanagari names, and item counters (e.g. "१२०+ भजन").
* `BhajanCollectionTabs.tsx`: Tabbed horizontal playlist slider (Trending, Morning, Meditative, Evening).
* `MantraOfDayCard.tsx`: Featured card with gold border, Devanagari sloka, English transliteration, inline audio player trigger, and "Start Japa (१०८ जप)" CTA button.
* `AartiChalisaCollection.tsx`: Dual-column or tabbed card grid displaying top daily aartis (Om Jai Jagdish Hare, Aarti Kunj Bihari Ki) and most chanted chalisas.
* `FeaturedStoriesGrid.tsx`: 3-card grid highlighting moral kathas, vrat significance, and Pauranik allegories.
* `ScriptureHighlightCard.tsx`: Two-panel interactive widget featuring Gita verse with Sanskrit audio and Ramayana chaupai with audio recitation.
* `UpcomingFestivalsTimeline.tsx`: Horizontal scroll card deck with countdown clock (Days:Hours:Minutes) to upcoming major festivals.
* `TempleDiscoverySection.tsx`: Pilgrimage portal teaser highlighting Jyotirlingas, Shakti Peeths, and Char Dham.
* `SpiritualToolsGrid.tsx`: Quick-access 4-card grid for Japa Counter, Daily Choghadiya, Birth Kundali, and Shubh Muhurat.
* `LatestArticlesGrid.tsx`: 4-column article card grid with editorial bylines, reading time, and tags.
* `AppPromotionBanner.tsx`: High-impact conversion strip highlighting offline reading, ad-free experience, and Android/iOS links.
* `NewsletterSignup.tsx`: WhatsApp & Email daily spiritual digest subscription form with instant verification.

#### 2.1.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/page.tsx`):**
  - `panchang_data_master`: Filtered by `date = CURRENT_DATE` and default city (`Varanasi`, `city_id = 1`).
  - `deities`: Top 12 by `popularity_score DESC`.
  - `bhajans`: 8 items with `is_featured = true` or `trending_score > 80`.
  - `mantras`: 1 item designated as `is_mantra_of_the_day = true` or deterministic daily hash `id = (current_day_of_year % total_mantras)`.
  - `scripture_verses`: 1 verse from `scripture_id = 'bhagavad-gita'` with daily rotation logic.
  - `festivals`: 4 items where `start_date >= CURRENT_DATE` ordered by `start_date ASC LIMIT 4`.
  - `temples`: 3 items with `is_featured = true`.
  - `articles`: 4 items where `status = 'published'` ordered by `published_at DESC LIMIT 4`.
* **Rendering Strategy:** `ISR` (Incremental Static Regeneration) with `revalidate = 3600` (1 Hour).
* **Cache Tags:** `['homepage', 'panchang_daily', 'festivals_upcoming']`.

#### 2.1.4 SEO Metadata & Structured Data
* **Title Formula:** `भक्तिलोक — संपूर्ण सनातन धर्म, भजन, आरती, चालीसा, मंत्र एवं पंचांग`
* **Meta Description:** `BhaktiLok पर पाएं १०,०००+ प्रामाणिक भजन, दैनिक पंचांग, संपूर्ण भगवद्गीता, आरती, चालीसा, वैदिक मंत्र जप एवं मंदिर दर्शन। सनातन धर्म का सबसे प्रामाणिक आध्यात्मिक मंच।`
* **Canonical URL:** `https://bhaktilok.com/`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://bhaktilok.com/#website",
      "url": "https://bhaktilok.com/",
      "name": "BhaktiLok",
      "alternateName": "भक्तिलोक",
      "description": "Sanatan Dharma Devotional and Vedic Knowledge Portal",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://bhaktilok.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["hi-IN", "en-US", "sa-IN"]
    },
    {
      "@type": "Organization",
      "@id": "https://bhaktilok.com/#organization",
      "name": "BhaktiLok Foundation",
      "url": "https://bhaktilok.com/",
      "logo": "https://bhaktilok.com/images/bhaktilok-logo.png",
      "sameAs": [
        "https://facebook.com/bhaktilok",
        "https://twitter.com/bhaktilok",
        "https://youtube.com/@bhaktilok"
      ]
    }
  ]
}
```

#### 2.1.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - Hero section collapses into a single column with centered search bar and 4 quick deity circular avatars.
  - Panchang widget switches to a horizontal swipe card highlighting Sunrise, Sunset, and Tithi.
  - Deities grid switches from 6 columns to a 4x3 compact touch grid.
  - Horizontal scroll applied to Bhajan collections and Upcoming festivals (`overflow-x-auto snap-x`).
  - Mobile bottom navigation dock remains fixed.
* **Tablet (640px - 1024px):**
  - Deities grid displays 4 columns x 3 rows.
  - Aarti & Chalisa section renders side-by-side 2-column list.
  - Articles render in 2-column grid.
* **Desktop (> 1024px):**
  - Full multi-column layout with 1200px max container width.
  - Deities grid renders 6 columns x 2 rows with hover scale and golden border transitions.
  - Full Panchang card shows complete Muhurat and Rahu Kaal matrices.

#### 2.1.6 Interaction States
* **Loading Skeleton:** Displays pulsing golden/cream shimmer boxes (`bg-amber-100/50 dark:bg-neutral-800 animate-pulse`) mirroring exact component dimensions to eliminate Cumulative Layout Shift (CLS).
* **Empty State:** If daily darshan stream fails to load, gracefully falls back to static high-resolution temple sanctum imagery.
* **Error State:** If live Panchang API is unreachable, displays cached offline astrological ephemeris with a subtle banner: *"ऑफ़लाइन पंचांग प्रदर्शित (Offline Mode)"*.
* **Interactive Elements:**
  - Search input opens instant `⌘K` modal with Devanagari phonetic support.
  - Daily Mantra card features 1-click audio playback without leaving the page.
  - City selector triggers a lightweight modal with GPS auto-detect and top 50 pilgrimage cities.

---

### 2.2 TEMPLATE 2: CONTENT LISTING TEMPLATE (`/bhajan`, `/mantra`, `/aarti`, `/chalisa`, `/katha`)

#### 2.2.1 Layout Structure (Wireframe Architecture)
This template serves as the high-throughput search and discovery engine for all devotional collections.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Devotional > Bhajans                                           |
+-----------------------------------------------------------------------------------+
| HERO HEADER: Category Title (भजन संग्रह) | Subtitle | Total Count (१०,२३२ भजन)     |
+-----------------------------------------------------------------------------------+
| SEARCH & CONTROL BAR: In-category live search | Sort Dropdown | Filter Toggle(Mob)|
+-----------------------------------------------------------------------------------+
| [ACTIVE FILTER CHIPS]: [हनुमान x] [अवधी x] [आरती x] [Clear All]                   |
+------------------------------------------------------------------+----------------+
| MAIN CONTENT CARDS GRID (3 Columns Desktop, 1 Col Mobile)        | SIDEBAR (30%)  |
|                                                                  |                |
| +------------------------+ +------------------------+ +--------+ | [Popular       |
| | Card 1: Title, Deity   | | Card 2: Title, Deity   | | Card 3 | |  Collections]  |
| | Audio Pill, Play Count | | Audio Pill, Play Count | | ...    | |                |
| +------------------------+ +------------------------+ +--------+ | [Filter Accord]|
| +------------------------+ +------------------------+ +--------+ | - By Deity     |
| | Card 4                 | | Card 5                 | | Card 6 | | - By Language  |
| +------------------------+ +------------------------+ +--------+ | - By Raga/Taal |
|                                                                  | - By Category  |
| [PAGINATION CONTROLS: 1, 2, 3 ... 42 | Next >]                   |                |
+------------------------------------------------------------------+----------------+
| RELATED SECTIONS & THEMATIC PLAYLISTS (Krishna Bhajans, Shiv Stuti, etc.)         |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (FAQ Accordion with Schema.org markup)                 |
+-----------------------------------------------------------------------------------+
| EDITORIAL INTRODUCTION & SHASTRA CONTEXT (SEO Long-form Content Block)            |
+-----------------------------------------------------------------------------------+
```

#### 2.2.2 Required Components
* `ListingHeader.tsx`: Title in Devanagari and English, total item counter badge, short devotional preamble.
* `FilterSearchBar.tsx`: Client-side instant filter input with debounced query param sync (`?q=`).
* `FilterSidebar.tsx`: Desktop sticky sidebar containing accordion groups:
  - Deities filter (checkboxes with count badges).
  - Languages filter (Hindi, Sanskrit, Awadhi, Braj Bhasha, Gujarati, Marathi, Tamil, Bengali).
  - Categories / Occasion filter (Morning, Sandhya, Vrat, Festival, Wedding).
  - Musical taxonomy (Raga, Taal) for bhajans.
* `MobileFilterDrawer.tsx`: Slide-over bottom drawer on mobile viewports triggered by a floating "फ़िल्टर (३)" FAB button.
* `ActiveFilterChips.tsx`: Horizontal tag ribbon displaying selected facets with removal triggers and a "Reset All" button.
* `ContentCardGrid.tsx`: CSS Grid layout rendering cards based on view mode (Grid or Compact List).
* `DevotionalContentCard.tsx`: Reusable polymorphic card displaying:
  - Deity avatar thumbnail with golden border.
  - Title in Devanagari with English subtext.
  - Content badge (e.g. `आरती`, `मंत्र`, `चालीसा`, `भजन`).
  - Audio indicator with duration (e.g. `🔊 ०४:२५`).
  - Quick action buttons: Play Audio, Bookmark, Share.
* `PaginationBar.tsx`: Accessible numbered pagination component adhering to Google Crawl guidelines (preserves `rel="prev"` and `rel="next"` headers).
* `PopularCollectionsSidebar.tsx`: Sidebar widget highlighting curated playlists (e.g. "शीर्ष १० हनुमान भजन", "प्रभात भजन संग्रह").
* `FAQAccordion.tsx`: Clean expandable FAQ questions and answers with `FAQPage` microdata.
* `EditorialSeoBlock.tsx`: Authoritative 800-1200 word theological and cultural guide on the specific genre (e.g., origin of Aarti tradition, rules of Bhajan singing) to secure top-tier organic ranking.

#### 2.2.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/[contentType]/page.tsx`):**
  - Database Table: `bhajans` (or `mantras`, `aartis`, `chalisas`, `kathas`).
  - Parameters: `page` (default 1, limit 24), `deity` (slug array), `language` (string array), `category` (slug array), `sort` (`popular` | `recent` | `alphabetical`), `q` (search string).
  - Supabase Query:
    ```typescript
    let query = supabase
      .from('bhajans')
      .select('id, title, title_en, slug, language, audio_url, duration_seconds, view_count, deities(id, name, slug)', { count: 'exact' })
      .eq('status', 'published');
    
    if (deitySlug) query = query.eq('deities.slug', deitySlug);
    if (searchQuery) query = query.textSearch('search_vector', searchQuery);
    query = query.range((page - 1) * 24, page * 24 - 1);
    ```
* **Rendering Strategy:** `SSR` with URL parameter caching or `ISR` for canonical root (`revalidate = 3600`), dynamic for active filter queries.
* **Cache Tags:** `['content_listing', contentType]`.

#### 2.2.4 SEO Metadata & Structured Data
* **Title Formula:** `[Category Name Hindi] — प्रामाणिक लिरिक्स, अर्थ एवं ऑडियो संग्रह | BhaktiLok`  
  *(e.g., "श्री कृष्ण भजन संग्रह (Shri Krishna Bhajan Lyrics) — प्रामाणिक लिरिक्स एवं ऑडियो | BhaktiLok")*
* **Meta Description:** `BhaktiLok पर पढ़ें और सुनें संपूर्ण [Category Name] का प्रामाणिक संग्रह। शुद्ध देवनागरी लिरिक्स, हिंदी भावार्थ, राग एवं निःशुल्क ऑडियो सहित।`
* **Canonical URL:** `https://bhaktilok.com/[contentType]` (strips tracking and transient pagination parameters from root canonical).
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "संपूर्ण भजन संग्रह - BhaktiLok",
  "description": "प्रामाणिक हिंदू भक्ति भजनों का विशाल संग्रह देवनागरी लिरिक्स और ऑडियो सहित।",
  "url": "https://bhaktilok.com/bhajan",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 24,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://bhaktilok.com/bhajan/achyutam-keshavam"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://bhaktilok.com/bhajan/shri-krishna-govind-hare-murari"
      }
    ]
  }
}
```

#### 2.2.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - Sidebar is hidden; filters accessible via sticky bottom filter button (`FloatingActionButton`).
  - Card grid switches to 1 column with compact horizontal layout (thumbnail on left, title & audio pill on right).
  - Search bar remains sticky below the header.
* **Tablet (640px - 1024px):**
  - Content grid renders 2 columns.
  - Filter drawer is collapsed by default into an expandable top toolbar.
* **Desktop (> 1024px):**
  - 2-column layout: Sticky filter sidebar (280px width) on left, 3-column card grid on right.

#### 2.2.6 Interaction States
* **Loading Skeleton:** Grid of 12 placeholder cards featuring shimmering gold boxes for title, badge, and audio icon.
* **Empty State:** Illustrated sacred icon with text: *"कोई सामग्री नहीं मिली (No records found)"* + "फ़िल्टर रीसेट करें (Reset Filters)" button and suggested popular categories.
* **Error State:** *"सर्वर से संपर्क करने में असमर्थ"*, with a retry button triggering SWR/React Query invalidation.
* **Interactive Elements:**
  - Instant play button on card opens/updates the persistent bottom audio player without full page navigation.
  - Instant toggle between "ग्रिड दृश्य (Grid)" and "सूची दृश्य (List)".
  - Bookmark button toggles local storage / Supabase profile state with heart animation.

---


## 3. Liturgical & Devotional Detail Templates

### 3.1 TEMPLATE 3: BHAJAN DETAIL TEMPLATE (`/bhajan/[slug]`)

#### 3.1.1 Layout Structure (Wireframe Architecture)
The Bhajan detail template provides an immersive, high-reverence reading and listening room optimized for both desktop scholars and mobile devotees singing in temple gatherings or daily prabhati.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Bhajans > Krishna Bhajans > Achyutam Keshavam                  |
+-----------------------------------------------------------------------------------+
| HEADER HERO:                                                                      |
| - Title (Devanagari): अच्युतम केशवम कृष्ण दामोदरम                                  |
| - Title (English / IAST): Achyutam Keshavam Krishna Damodaram                      |
| - Metadata Bar: Deity Pill [श्री कृष्ण] | Raga [यमन] | Singer [अनूप जलोटा] | Views  |
| - Action Bar: [Play Audio] [Watch Video] [Bookmark] [Share] [Print/PDF]           |
+-----------------------------------------------------------------------------------+
| PERSISTENT/STICKY AUDIO-LYRICS SYNC PLAYER (Inline Hero + Docks on Scroll)       |
| [Play/Pause] [01:24 / 04:36] ====================O===== [Speed 1x] [Loop] [Lyrics]|
+-------------------------------------------------------------------+---------------+
| MAIN READING CANVAS (65% Width)                                   | SIDEBAR (35%) |
|                                                                   |               |
| [READING CONTROLS BAR]:                                           | [DEITY CARD]  |
| - Script Toggle: [देवनागरी (Devanagari)] [English (IAST)]         | - Image       |
| - Font Size: [A-] [A] [A+]                                        | - 120 Bhajans |
| - View Mode: [साधारण] [शब्दार्थ (Word Meanings)] [ध्यान मोड]      | - 12 Mantras  |
|                                                                   | - Temples     |
| [LYRICS CONTAINER]:                                               |               |
|  अच्युतम केशवम कृष्ण दामोदरम,                                      | [BHAJAN INFO] |
|  राम नारायणम जानकी वल्लभम ॥                                       | - Raga: Yaman |
|  (Line timestamp sync: active line highlighted in gold)            | - Taal: Kehar |
|                                                                   | - Composer:   |
| [HINDI BHAVARTH / TRANSLATION ACCORDION]:                         |   Adi Shankara|
|  सरल हिंदी भावार्थ: हे अच्युत, हे केशव, हे कृष्ण, हे दामोदर...   |               |
|                                                                   | [RELATED      |
| [ENGLISH TRANSLATION & COMMENTARY]:                               |  BHAJANS]     |
|  Meaning in English with philosophical significance.              | - Item 1      |
|                                                                   | - Item 2      |
| [SOCIAL SHARE CARD GENERATOR & WHATSAPP SLOKA BUTTON]             | - Item 3      |
+-------------------------------------------------------------------+---------------+
| YOUTUBE DEVOTIONAL VIDEO EMBED (Lazy-loaded with facade image)                    |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (Origin, Composer, Best Time to Sing)                  |
+-----------------------------------------------------------------------------------+
| CONTEXTUAL DEVOTIONAL CIRCLE (Connected Aarti, Chalisa & Temple)                  |
+-----------------------------------------------------------------------------------+
```

#### 3.1.2 Required Components
* `BhajanHeaderHero.tsx`: Rich devotional hero displaying Devanagari and transliterated titles, composer credits, deity badges, and metadata tags.
* `InlineAudioPlayer.tsx`: Custom React audio player supporting synchronized lyric line highlighting, playback speed adjustment (0.75x, 1x, 1.25x), loop toggle, and audio waveform visualization.
* `LyricsDisplay.tsx`: High-legibility lyrics container supporting Devanagari script, Romanized IAST transliteration, variable font sizing (`text-base` to `text-2xl`), and stanza separators.
* `ReadingControlsToolbar.tsx`: Sticky or floating bar with Script Selector, Font Sizer, Dark/Parchment reader theme toggle, and Fullscreen "Dhyan Mode" trigger.
* `WordMeaningAccordion.tsx`: Collapsible word-by-word Sanskrit/Hindi etymological breakdown.
* `DeityKnowledgeCard.tsx`: Sidebar card summarizing the deity's attributes, iconography, and links to dedicated aartis and stotras.
* `BhajanMetadataTable.tsx`: Technical specifications (Raga, Tala, Pauranik source, traditional singer, tempo).
* `RelatedBhajanGrid.tsx`: 4-card grid showing recommendations based on deity, raga, and singing time.
* `SocialQuoteCardModal.tsx`: Generates a high-resolution, downloadable image card with a selected stanza, BhaktiLok watermark, and WhatsApp 1-click share.
* `YouTubeFacadePlayer.tsx`: High-performance video embed with zero initial JavaScript execution, fetching YouTube iframe only on user click.

#### 3.1.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/bhajan/[slug]/page.tsx`):**
  - Table: `bhajans` joined with `deities`, `authors`, and `media_assets`.
  - Supabase Query:
    ```typescript
    const { data: bhajan } = await supabase
      .from('bhajans')
      .select(`
        id, title, title_en, slug, lyrics_devanagari, lyrics_transliteration, 
        meaning_hindi, meaning_english, raga, taal, composer, duration_seconds,
        audio_url, video_url, lrc_timestamps,
        deities:deity_id (id, name, name_en, slug, image_url),
        authors:author_id (id, name, slug)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + On-Demand ISR`. Pre-render top 1,000 most popular bhajans at build time (`generateStaticParams`); long-tail rendered via ISR on first request and cached permanently until `revalidateTag('bhajan')`.
* **Cache Tags:** `['bhajan', `bhajan:${params.slug}`, `deity:${bhajan.deity_id}`]`.

#### 3.1.4 SEO Metadata & Structured Data
* **Title Formula:** `[Bhajan Title Hindi] Lyrics (लिरिक्स) — [Deity Name] भजन, भावार्थ एवं ऑडियो | BhaktiLok`  
  *(e.g., "अच्युतम केशवम कृष्ण दामोदरम (Achyutam Keshavam) Lyrics — श्रीकृष्ण भजन एवं भावार्थ | BhaktiLok")*
* **Meta Description:** `पढ़ें अच्युतम केशवम कृष्ण दामोदरम भजन के प्रामाणिक लिरिक्स, हिंदी अर्थ एवं सुनें मधुर ऑडियो। आदि शंकराचार्य कृत श्री कृष्ण स्तुति देवनागरी एवं अंग्रेज़ी में।`
* **Canonical URL:** `https://bhaktilok.com/bhajan/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicComposition",
      "name": "अच्युतम केशवम कृष्ण दामोदरम",
      "alternateName": "Achyutam Keshavam Krishna Damodaram",
      "composer": {
        "@type": "Person",
        "name": "आदि शंकराचार्य (Adi Shankaracharya)"
      },
      "inLanguage": "sa-IN",
      "lyrics": {
        "@type": "CreativeWork",
        "text": "अच्युतं केशवं रामनारायणं कृष्णदामोदरं वासुदेवं हरिम्..."
      }
    },
    {
      "@type": "AudioObject",
      "name": "अच्युतम केशवम ऑडियो",
      "contentUrl": "https://media.bhaktilok.com/audio/achyutam-keshavam.mp3",
      "encodingFormat": "audio/mpeg",
      "duration": "PT4M36S"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://bhaktilok.com/" },
        { "@type": "ListItem", "position": 2, "name": "भजन", "item": "https://bhaktilok.com/bhajan" },
        { "@type": "ListItem", "position": 3, "name": "अच्युतम केशवम", "item": "https://bhaktilok.com/bhajan/achyutam-keshavam" }
      ]
    }
  ]
}
```

#### 3.1.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - Sidebar folds below the main lyrics container.
  - Floating mini-bar docks at the bottom of the screen with play/pause, title ticker, and font zoom button.
  - Video player renders full screen width without margin padding.
* **Tablet (640px - 1024px):**
  - Lyrics canvas expands to 100% width; Deity Knowledge Card displays as a horizontal banner below lyrics.
* **Desktop (> 1024px):**
  - Two-column split with sticky reading controls and persistent right-hand deity knowledge sidebar.

#### 3.1.6 Interaction States
* **Loading Skeleton:** Displays shimmering outline of header, audio waveform bar, and 4 stanzas of text.
* **Empty / 404 State:** If slug is not found, renders contextual recovery page suggesting closest phonetically matched bhajans using Levenshtein distance.
* **Interactive Elements:**
  - Synchronized Lyrics Highlight: As audio plays, the active line gains an amber background (`bg-amber-100/60 dark:bg-amber-950/40`) and auto-scrolls into the reader's focal point.
  - Script Switcher: Instantaneous swap between Devanagari and Roman IAST with zero layout shift.
  - Dhyan Mode: Expands reading canvas to 100vw, dimming surrounding UI and setting warm sepia background for serene temple chanting.

---

### 3.2 TEMPLATE 4: MANTRA DETAIL TEMPLATE (with Jap Counter) (`/mantra/[slug]`)

#### 3.2.1 Layout Structure (Wireframe Architecture)
This template is engineered specifically for deep spiritual sadhana, phonetic Vedic pronunciation, and ritualistic counting.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Mantras > Shiva Mantras > Maha Mrityunjaya Mantra              |
+-----------------------------------------------------------------------------------+
| SACRED MANTRA HEADER:                                                             |
| - Mantra Name (Devanagari): महामृत्युंजय मंत्र                                     |
| - Classification: [वैदिक महामंत्र] | Deity: [भगवान शिव] | Veda: [ऋग्वेद ७.५९.१२]   |
| - Viniyoga (विनियोग): ॐ अस्य श्री महामृत्युंजय मन्त्रस्य वसिष्ठ ऋषिः...          |
+-----------------------------------------------------------------------------------+
| SACRED SLOKA SANCTUM (Calligraphic Devanagari Card with Golden Aura):            |
|                                                                                   |
|         ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।                              |
|         उर्वारुकमिव बन्धनान्मृत्य pushीय मामृतात् ॥                               |
|                                                                                   |
| [IAST Transliteration]: oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam...      |
| [Authentic Vedic Chanting Audio (1x, 11x, 108x Loop Options)]                     |
+-----------------------------------------------------------------------------------+
| INTERACTIVE DIGITAL JAPA MALA & COUNTER (Full Interactive Client Component):      |
|                                                                                   |
|       +-------------------------------------------------------------+             |
|       |                     [   108 BEAD WHEEL   ]                  |             |
|       |                                                             |             |
|       |                         [  २७ / १०८ ]                       |             |
|       |                         Mala Count: 1                       |             |
|       |                                                             |             |
|       |             [ TAP TO CHANT / माला जपें ] (Touch)            |             |
|       |                                                             |             |
|       |  Target: [11] [21] [54] [108] [1008] | Sound: [Chime On]     |             |
|       |  Vibration: [On] | Reset [↺] | Fullscreen Sadhana [⛶]       |             |
|       +-------------------------------------------------------------+             |
+-------------------------------------------------------------------+---------------+
| CHANTING GUIDELINES & PUJA VIDHI (65% Width)                      | SIDEBAR (35%) |
| - Best Time / Muhurat (Brahma Muhurat, Pradosh)                   | [Mala Samagri]|
| - Direction (Facing East/North)                                   | - Rudraksha   |
| - Asana & Purity Guidelines                                       | - Tulsi       |
|                                                                   |               |
| WORD-BY-WORD SANSKRIT BREAKDOWN (Padachheda & Arth):              | [Astrological |
| - त्र्यम्बकम् (Three-eyed Lord)                                   |  Significance]|
| - यजामहे (We worship, adore)                                      | - Shani/Rahu  |
| - सुगन्धिम् (Sweet-fragranced)                                    |   Dosh Nivaran|
|                                                                   |               |
| PHALSHRUTI & SPIRITUAL BENEFITS (आरोग्य, मोक्ष, भय निवारण)       | [Related      |
|                                                                   |  Mantras]     |
+-------------------------------------------------------------------+---------------+
| FREQUENTLY ASKED QUESTIONS & CHANTING RULES (FAQ Schema)                          |
+-----------------------------------------------------------------------------------+
```

#### 3.2.2 Required Components
* `MantraHeader.tsx`: Title, Vedic categorization, Rishi, Chhanda, Devata, and Viniyoga declaration.
* `SacredSlokaDisplay.tsx`: Prominently styled calligraphic card with Devanagari text, Vedic swara pitch accents (Udatta, Anudatta, Svarita), and IAST romanization.
* `InteractiveJapaCounter.tsx`: Highly optimized interactive client component featuring:
  - Bead simulation or circular SVG progress wheel.
  - Large touch-accessible tap pad (supports screen tap, spacebar keypress, and headset remote button).
  - Configurable target caps: 11, 21, 54, 108, or 1008 repetitions.
  - Bead click audio chime (authentic Tibetan bell or temple gong sample).
  - Mobile haptic vibration feedback using the Web Vibration API (`navigator.vibrate(50)`).
  - Malas completed counter and session time tracker.
* `AudioChantLoopPlayer.tsx`: Audio player with pre-set looping capabilities (11x, 21x, 108x continuous chant loops).
* `PadachhedaTable.tsx`: Word-by-word anatomical dissection of Sanskrit root words and their philosophical definitions.
* `ChantingRulesCard.tsx`: Authoritative guidance on posture, rosary (Rudraksha / Sphatik), time, and mental disposition.
* `PhalshrutiCard.tsx`: Traditional promises of spiritual reward as stated in the Puranas and Upanishads.
* `SadhanaHistoryLogger.tsx`: LocalStorage / Supabase synced tracker logging daily chants to the user's private spiritual dashboard.

#### 3.2.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/mantra/[slug]/page.tsx`):**
  - Table: `mantras` joined with `deities`, `categories`, and `audio_assets`.
  - Supabase Query:
    ```typescript
    const { data: mantra } = await supabase
      .from('mantras')
      .select(`
        id, title, title_en, slug, sloka_devanagari, sloka_transliteration,
        padachheda, meaning_hindi, meaning_english, vedic_reference,
        rishi, chhanda, devata, viniyoga, chanting_vidhi, phalshruti,
        audio_url_single, audio_url_108, duration_seconds,
        deities:deity_id (id, name, slug)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + On-Demand ISR`.
* **Cache Tags:** `['mantra', `mantra:${params.slug}`]`.

#### 3.2.4 SEO Metadata & Structured Data
* **Title Formula:** `[Mantra Name Hindi] — शुद्ध संस्कृत श्लोक, हिंदी अर्थ, १०८ जप एवं लाभ | BhaktiLok`  
  *(e.g., "महामृत्युंजय मंत्र (Maha Mrityunjaya Mantra) — शुद्ध श्लोक, भावार्थ, १०८ जप विधि एवं लाभ | BhaktiLok")*
* **Meta Description:** `भगवान शिव के महामृत्युंजय मंत्र का शुद्ध उच्चारण, संपूर्ण अर्थ, जप विधि और फलश्रुति। ऑनलाइन १०८ जप काउंटर एवं वैदिक ऑडियो के साथ जाप करें।`
* **Canonical URL:** `https://bhaktilok.com/mantra/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      "name": "महामृत्युंजय मंत्र जप विधि (How to chant Maha Mrityunjaya Mantra)",
      "description": "रुद्राक्ष की माला से महामृत्युंजय मंत्र के १०८ बार जप की प्रामाणिक वैदिक विधि।",
      "step": [
        {
          "@type": "HowToStep",
          "name": "आचमन एवं शुद्धि",
          "text": "स्नान कर स्वच्छ वस्त्र धारण करें और पूर्व या उत्तर दिशा की ओर मुख करके कुशा के आसन पर बैठें।"
        },
        {
          "@type": "HowToStep",
          "name": "संकल्प एवं विनियोग",
          "text": "दाहिने हाथ में जल और अक्षत लेकर संकल्प करें तथा विनियोग मंत्र का पाठ करें।"
        },
        {
          "@type": "HowToStep",
          "name": "माला जप",
          "text": "रुद्राक्ष की माला से अनामिका और अंगूठे के सहयोग से १०८ बार शुद्ध उच्चारण के साथ जप करें।"
        }
      ]
    },
    {
      "@type": "AudioObject",
      "name": "महामृत्युंजय मंत्र १०८ जप ऑडियो",
      "contentUrl": "https://media.bhaktilok.com/audio/maha-mrityunjaya-108.mp3",
      "duration": "PT32M15S"
    }
  ]
}
```

#### 3.2.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - Japa counter defaults to an immersive full-width touch card.
  - Tapping anywhere on the large counter disc registers a bead count.
  - Haptic toggle is enabled by default for tactile confirmation without looking at the screen.
* **Tablet (640px - 1024px):**
  - Counter card renders with circular bead ring animation.
* **Desktop (> 1024px):**
  - Full keyboard shortcuts active: Spacebar / Up Arrow advances bead; 'R' key resets; 'M' mutes audio.

#### 3.2.6 Interaction States
* **Loading Skeleton:** Displays glowing central disc placeholder with surrounding text wireframes.
* **Counter Fullscreen State:** Clicking "ध्यान मोड (Fullscreen)" hides all headers, footers, and sidebars, rendering solely the Devanagari verse and tap counter against a soothing dark charcoal parchment background.
* **Completion Milestone:** Reaching 108 triggers a pleasant temple bell chime, a subtle gold confetti particle effect, and updates the "माला पूर्ण (Mala Completed)" badge with a prompt to record daily sadhana.

---

### 3.3 TEMPLATE 5: AARTI DETAIL TEMPLATE (`/aarti/[slug]`)

#### 3.3.1 Layout Structure (Wireframe Architecture)
Optimized for the daily household puja ritual, evening temple gatherings, and festival celebrations where users sing along holding a smartphone or pooja thali.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Aartis > Ganesh Aartis > Jai Ganesh Deva                       |
+-----------------------------------------------------------------------------------+
| AARTI HEADER:                                                                     |
| - Aarti Title: जय गणेश जय गणेश जय गणेश देवा                                        |
| - Deity Pill: [भगवान श्री गणेश] | Timing: [प्रातः एवं संध्या आरती] | Duration: ०५:१२ |
| - Ritual Utilities: [Virtual Diya / Bell Sound Effect Toggle 🔔] [Full Screen]    |
+-----------------------------------------------------------------------------------+
| VIRTUAL AARTI AUDIO-VISUAL PLAYER:                                                |
| [Play Aarti with Synchronized Lyrics & Ambient Temple Bells]                      |
| (Interactive Bell Icon) (Interactive Shankh Icon) (Virtual Camphor Flame Animation)|
+-------------------------------------------------------------------+---------------+
| COMPLETE AARTI LYRICS (Auto-scrolling with Audio) (65% Width)     | SIDEBAR (35%) |
|                                                                   |               |
|  जय गणेश जय गणेश जय गणेश देवा ।                                   | [PUJA THALI   |
|  माता जाकी पार्वती पिता महादेवा ॥ (Chorus)                         |  ESSENTIALS]  |
|                                                                   | - Camphor     |
|  एक दन्त दयावन्त चार भुजाधारी ।                                   | - Roli/Chandan|
|  माथे पर तिलक सोहे मूसे की सवारी ॥                                | - Fresh Modak |
|                                                                   | - Dhoop       |
| [AARTI HINDI BHAVARTH & SIGNIFICANCE ACCORDION]                   |               |
|                                                                   | [AARTI RULES] |
| [STUTIS SUNG AFTER AARTI]:                                        | - Circular    |
| - कर्पूरगौरं करुणावतारं संसारसारम्...                             |   Motion Vidhi|
| - त्वमेव माता च पिता त्वमेव...                                    | - Pradakshina |
+-------------------------------------------------------------------+---------------+
| STEP-BY-STEP AARTI VIDHI & THALI PREPARATION (HowTo Schema)                       |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (Best time to perform, significance of 7 rotations)    |
+-----------------------------------------------------------------------------------+
| CONNECTED CHALISAS, BHAJANS & TEMPLE DARSHAN                                      |
+-----------------------------------------------------------------------------------+
```

#### 3.3.2 Required Components
* `AartiHeader.tsx`: Title, deity association, optimal singing hours (Mangala, Sandhya, Shayan), and quick print/share triggers.
* `VirtualAartiPlayer.tsx`: Audio player with interactive ambient temple sounds:
  - Toggleable brass temple bell sound on beat.
  - Sacred Shankh (conch shell) sound trigger button.
  - Subtle glowing Diya flame animation that gently oscillates.
* `AutoScrollingLyrics.tsx`: Lyrics viewer that automatically smoothly scrolls down the page in sync with the audio track duration.
* `ChorusHighlightBadge.tsx`: Visual indicator clearly demarking chorus lines intended for collective congregation repetition.
* `PostAartiStutiCard.tsx`: Dedicated card containing the universal concluding prayers chanted after every aarti (*Karpura Gauram*, *Twameva Mata*, *Mantra Pushpanjali*).
* `PujaThaliGuide.tsx`: Illustrated guide showing proper arrangement of the Aarti plate (Diya, Kumkum, Akshat, Flowers, Bell, Achamani).
* `AartiVidhiSteps.tsx`: Illustrated 4-step sequence detailing clockwise circular rotation angles.

#### 3.3.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/aarti/[slug]/page.tsx`):**
  - Table: `aartis` joined with `deities`, `media_assets`.
  - Supabase Query:
    ```typescript
    const { data: aarti } = await supabase
      .from('aartis')
      .select(`
        id, title, title_en, slug, lyrics_devanagari, lyrics_transliteration,
        meaning_hindi, timing_recommended, vidhi_steps, post_aarti_stuti,
        audio_url, duration_seconds, lrc_timestamps,
        deities:deity_id (id, name, slug, image_url)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + On-Demand ISR`.
* **Cache Tags:** `['aarti', `aarti:${params.slug}`]`.

#### 3.3.4 SEO Metadata & Structured Data
* **Title Formula:** `[Aarti Title Hindi] — संपूर्ण आरती लिरिक्स, हिंदी अर्थ एवं ऑडियो | BhaktiLok`  
  *(e.g., "जय गणेश जय गणेश देवा आरती (Jai Ganesh Deva Aarti) — लिरिक्स, अर्थ व ऑडियो | BhaktiLok")*
* **Meta Description:** `श्री गणेश जी की प्रामाणिक आरती "जय गणेश जय गणेश देवा" पढ़ें और सुनें। शुद्ध देवनागरी लिरिक्स, आरती विधि, थाली सजावट एवं आरती के बाद की स्तुति सहित।`
* **Canonical URL:** `https://bhaktilok.com/aarti/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicComposition",
      "name": "जय गणेश जय गणेश जय गणेश देवा",
      "alternateName": "Jai Ganesh Deva Aarti",
      "inLanguage": "hi-IN",
      "lyrics": {
        "@type": "CreativeWork",
        "text": "जय गणेश जय गणेश जय गणेश देवा । माता जाकी पार्वती पिता महादेवा ॥..."
      }
    },
    {
      "@type": "HowTo",
      "name": "आरती करने की प्रामाणिक विधि",
      "description": "आरती थाल घुमाने एवं दीप प्रज्वलन की शास्त्रीय विधि।",
      "step": [
        {
          "@type": "HowToStep",
          "name": "आरती घुमाने का क्रम",
          "text": "भगवान के चरणों में चार बार, नाभि में दो बार, मुखमण्डल पर एक बार और अंत में पूरे शरीर पर सात बार घड़ी की सुई की दिशा में आरती घुमाएं।"
        }
      ]
    }
  ]
}
```

#### 3.3.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - "स्क्रीन ऑन रखें (Keep Screen Awake)" feature automatically activates via the Screen Wake Lock API to prevent phone screen timeout during puja.
  - Large font default (18px) to allow comfortable reading from a pooja altar distance.
* **Tablet & Desktop:**
  - Standard split layout with interactive puja thali diagram in the sticky right sidebar.

#### 3.3.6 Interaction States
* **Screen Wake Lock Active:** Green glowing badge: *"पूजा मोड सक्रिय: स्क्रीन बंद नहीं होगी"* (Screen Wake Lock engaged).
* **Audio-Sync Auto-Scroll:** Page auto-scrolls down smoothly without manual touch as lyrics advance.

---

### 3.4 TEMPLATE 6: CHALISA DETAIL TEMPLATE (with Reading Progress) (`/chalisa/[slug]`)

#### 3.4.1 Layout Structure (Wireframe Architecture)
Specifically designed for reciting sacred 40-verse devotional stutis (such as Hanuman Chalisa, Shiv Chalisa, Durga Chalisa) with verse-by-verse completion tracking.

```
+-----------------------------------------------------------------------------------+
| FIXED TOP READING PROGRESS BAR: [████████████░░░░░░░░░░░░░░░░░░] 42% (चौपाई १७ / ४०)|
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Chalisas > Hanuman Chalisa                                     |
+-----------------------------------------------------------------------------------+
| CHALISA HERO HEADER:                                                              |
| - Title: श्री हनुमान चालीसा (Shri Hanuman Chalisa)                                 |
| - Author: गोस्वामी तुलसीदास | Meter: दोहा एवं चौपाई | Recitation Time: ~७ मिनट     |
| - Controls: [Audio Reciter] [Verse-by-Verse Mode / Continuous Mode] [Font Size]   |
+-------------------------------------------------------------------+---------------+
| CHALISA RECITER MAIN COLUMN (70% Width)                           | SIDEBAR (30%) |
|                                                                   |               |
| [OPENING DOHA CARD (मंगलाचरण दोहा)]:                              | [RECITATION   |
|  श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।                      |  RULES]       |
|  बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥                          | - 100 Times   |
|  (Meaning & Audio Trigger)                                        |   Sankalpa    |
|                                                                   | - Tuesday /   |
| [40 CHAUPAI LIST WITH INTERACTIVE CHECKMARKS]:                    |   Saturday    |
|                                                                   |               |
| +---------------------------------------------------------------+ | [PHALSHRUTI]  |
| | चौपाई १: जय हनुमान ज्ञान गुन सागर । जय कपीस तिहुँ लोक उजागर ॥  | | - संकट कटे   |
| | [Meaning]: हे ज्ञान और गुण के सागर हनुमान जी, आपकी जय हो...   | |   मिटे सब पीरा|
| | [Status: Read ✓] [Listen]                                      | |               |
| +---------------------------------------------------------------+ | [POCKET       |
| +---------------------------------------------------------------+ |  PRINT VIEW]  |
| | चौपाई २: राम दूत अतुलित बल धामा । अंजनि पुत्र पवनसुत नामा ॥    | | [Download   |
| | [Status: Current Active]                                      | |  Printable   |
| +---------------------------------------------------------------+ |  PDF Booklet] |
|                                                                   |               |
| [CLOSING DOHA CARD (समापन दोहा)]:                                 |               |
|  पवनतनय संकट हरन मंगल मूरति रूप ।                                 |               |
|  राम लखन सीता सहित हृदय बसहु सुर भूप ॥                            |               |
+-------------------------------------------------------------------+---------------+
| CHALISA MAHATMYA & PHALSHRUTI (तुलसीदास कृत फलश्रुति एवं ऐतिहासिक महत्व)        |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (100 बार पाठ करने का नियम, सही समय, शुद्ध उच्चारण)     |
+-----------------------------------------------------------------------------------+
```

#### 3.4.2 Required Components
* `StickyReadingProgressBar.tsx`: Fixed top 4px bar calculating scroll depth and active chaupai number (1 to 40).
* `ChalisaHeroHeader.tsx`: Title, poetic meter classification, Goswami Tulsidas authorship byline, and reading time estimation.
* `ReadingModeToggle.tsx`: Client toggle switching between:
  - *Continuous Scroll View (अखंड पाठ दृश्य)*: Traditional continuous book layout.
  - *Verse-by-Verse Focus View (एकाग्र चौपाई दृश्य)*: Swipes one chaupai at a time with large devotional typography.
* `DohaCard.tsx`: Distinctly styled card with golden corner flourishes for opening and closing Mangalacharan dohas.
* `ChaupaiCardItem.tsx`: Individual chaupai unit containing:
  - Verse number badge in Devanagari numerals (e.g. `॥ चौपाई १ ॥`).
  - Sacred Chaupai text in Tiro Devanagari.
  - Romanized phonetic transliteration.
  - Simple Hindi explanation (भावार्थ).
  - Checkmark toggle marking stanza as recited.
* `ChalisaAudioReciter.tsx`: Clear vocal chanting audio synchronized with current stanza.
* `PrintableChalisaModal.tsx`: Generates a printer-friendly two-column pocketbook format without website clutter.

#### 3.4.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/chalisa/[slug]/page.tsx`):**
  - Table: `chalisas` joined with `deities`.
  - Supabase Query:
    ```typescript
    const { data: chalisa } = await supabase
      .from('chalisas')
      .select(`
        id, title, title_en, slug, author, opening_doha, closing_doha,
        verses_json, meaning_hindi, phalshruti, audio_url, duration_seconds,
        deities:deity_id (id, name, slug)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + On-Demand ISR`.
* **Cache Tags:** `['chalisa', `chalisa:${params.slug}`]`.

#### 3.4.4 SEO Metadata & Structured Data
* **Title Formula:** `[Chalisa Title Hindi] — संपूर्ण ४० चौपाई, हिंदी अर्थ, पाठ विधि एवं ऑडियो | BhaktiLok`  
  *(e.g., "श्री हनुमान चालीसा (Hanuman Chalisa) — संपूर्ण ४० चौपाई, अर्थ, दोहा एवं ऑडियो | BhaktiLok")*
* **Meta Description:** `गोस्वामी तुलसीदास कृत संपूर्ण श्री हनुमान चालीसा शुद्ध देवनागरी में पढ़ें। प्रत्येक चौपाई का सरल हिंदी अर्थ, दोहा, पाठ के नियम और फलश्रुति सहित।`
* **Canonical URL:** `https://bhaktilok.com/chalisa/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      "name": "श्री हनुमान चालीसा",
      "alternateName": "Shri Hanuman Chalisa",
      "author": {
        "@type": "Person",
        "name": "गोस्वामी तुलसीदास (Goswami Tulsidas)"
      },
      "inLanguage": "hi-IN",
      "genre": "Devotional Hymn (Chalisa)",
      "text": "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि... जो यह पढ़ै हनुमान चालीसा । होय सिद्धि साखी गौरीसा ॥"
    },
    {
      "@type": "AudioObject",
      "name": "श्री हनुमान चालीसा सस्वर पाठ",
      "contentUrl": "https://media.bhaktilok.com/audio/hanuman-chalisa.mp3",
      "duration": "PT9M48S"
    }
  ]
}
```

#### 3.4.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - Chaupai items maintain generous line-height (`leading-relaxed`) and 18px font size.
  - Sticky progress counter floats at top: `"चौपाई १४ / ४०"`.
  - Swipe gestures enabled in "Focus View" to advance to next chaupai.
* **Desktop (> 1024px):**
  - Displays reading progress bar and right-hand recitation rules sidebar.

#### 3.4.6 Interaction States
* **Reading Progress Sync:** As user scrolls, the progress bar updates smoothly, and the active chaupai card is highlighted with a soft saffron glow.
* **Recitation Counter:** Devotee can check off completed chaupais; a celebratory alert appears upon finishing all 40: *"पाठ संपन्न! प्रभु कृपा आप पर बनी रहे।"*

---

### 3.5 TEMPLATE 7: KATHA / STORY DETAIL TEMPLATE (with TOC) (`/katha/[slug]`)

#### 3.5.1 Layout Structure (Wireframe Architecture)
Optimized for long-form narrative religious literature, Pauranik vrat stories, and spiritual parables requiring clear navigation and fast chapter jumps.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Kathas > Vrat Kathas > Satyanarayan Vrat Katha                 |
+-----------------------------------------------------------------------------------+
| KATHA HERO:                                                                       |
| - Title: श्री सत्यनारायण व्रत कथा (Shri Satyanarayan Vrat Katha)                   |
| - Vrat Affiliation: पूर्णिमा एवं एकादशी व्रत | Pauranik Source: रेवाखंड, स्कंद पुराण |
| - Estimated Reading Time: ~२० मिनट | Audio Narration Available (२८ मिनट)          |
+-------------------------------------------------------------------+---------------+
| MAIN NARRATIVE COLUMN (68% Width)                                 | STICKY SIDEBAR|
|                                                                   | (32% Width)   |
| [QUICK SUMMARY & PRARAMBHIC VIDHI BOX]:                           |               |
|  कथा का संक्षिप्त परिचय एवं व्रत के मुख्य नियम...               | [TABLE OF     |
|                                                                   |  CONTENTS]    |
| [AUDIO NARRATION PLAYER]: [Play Full Katha Katha-Vachan 🔊]       | 1. प्रथम अध्याय|
|                                                                   | 2. द्वितीय    |
| [STORY SECTION 1: प्रथम अध्याय - नारद जी का भगवान विष्णु से संवाद]| 3. तृतीय      |
|  एक समय नैमिषारण्य तीर्थ में शौनकादि अठ्ठासी हजार ऋषियों ने...     | 4. चतुर्थ     |
|                                                                   | 5. पंचम       |
| [DEVOTIONAL ILLUSTRATION WITH CAPTION]                            | 6. आरती       |
|                                                                   | 7. प्रसाद विधि|
| [STORY SECTION 2: द्वितीय अध्याय - शतानंद ब्राह्मण की कथा]        |               |
|  काशीपुरी नगरी में एक अत्यंत निर्धन ब्राह्मण शतानंद रहते थे...    | [SAMAGRI LIST]|
|                                                                   | - Banana Leaves|
| [IN-TEXT ENCYCLOPEDIA POPOVER]: [सत्यनारायण] [शतानंद] [नैमिषारण्य]| - Panjamrit   |
|                                                                   | - Tulsi Dal   |
| [VRAT PARANA & PRASAD PREPARATION (पंजीरी व पंचामृत भोग विधि)]:   |               |
|                                                                   | [RELATED      |
| [KATHA CONCLUSION AARTI & PRARTHANA]                              |  VRATS]       |
+-------------------------------------------------------------------+---------------+
| ASSOCIATED FESTIVALS & UPCOMING VRAT DATES (अगली पूर्णिमा तिथि)                   |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (कथा कब सुननी चाहिए, पंचामृत कैसे बनाएं)               |
+-----------------------------------------------------------------------------------+
```

#### 3.5.2 Required Components
* `KathaHero.tsx`: Title, associated fast (vrat), scriptural origin (Purana/Itihasa), and reading duration.
* `StickyScrollspyTOC.tsx`: Sticky sidebar Table of Contents that tracks scroll position and highlights the active chapter.
* `MobileCollapsibleTOC.tsx`: Top accordion on mobile displays allowing quick chapter jumping.
* `AudioNarrationPlayer.tsx`: High-quality voiceover audio player for listening to the story recitation.
* `NarrativeRichText.tsx`: Elegantly typeset story reader with drop caps, pull quotes, and embedded Sanskrit verses with Hindi translations.
* `InTextGlossaryPopover.tsx`: Interactive tooltips that display brief definitions of Pauranik entities without navigating away.
* `SamagriChecklistCard.tsx`: Interactive ritual ingredients checklist that allows devotees to tick off required items during bazaar preparation.
* `PrasadPreparationCard.tsx`: Step-by-step recipe for sacred offering preparation (Panjiri, Panchamrit, Charnamrit).
* `UpcomingVratCalendarWidget.tsx`: Next occurrence of the corresponding fast with exact tithi timings.

#### 3.5.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/katha/[slug]/page.tsx`):**
  - Table: `kathas` joined with `vrats`, `deities`, `panchang_data_master`.
  - Supabase Query:
    ```typescript
    const { data: katha } = await supabase
      .from('kathas')
      .select(`
        id, title, title_en, slug, source_scripture, chapters_json,
        summary_hindi, samagri_list, prasad_recipe, audio_narration_url,
        vrats:vrat_id (id, name, slug, fasting_rules),
        deities:deity_id (id, name, slug)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + On-Demand ISR`.
* **Cache Tags:** `['katha', `katha:${params.slug}`]`.

#### 3.5.4 SEO Metadata & Structured Data
* **Title Formula:** `[Katha Title Hindi] — संपूर्ण कथा, व्रत विधि, सामग्री एवं आरती | BhaktiLok`  
  *(e.g., "श्री सत्यनारायण व्रत कथा (Satyanarayan Vrat Katha) — संपूर्ण अध्याय, विधि व आरती | BhaktiLok")*
* **Meta Description:** `स्कंद पुराणोक्त संपूर्ण श्री सत्यनारायण व्रत कथा हिंदी में पढ़ें। सभी ५ अध्याय, पूजा सामग्री सूची, पंचामृत प्रसाद विधि एवं सत्यनारायण भगवान की आरती सहित।`
* **Canonical URL:** `https://bhaktilok.com/katha/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "श्री सत्यनारायण व्रत कथा",
      "inLanguage": "hi-IN",
      "articleSection": "Vrat Katha",
      "author": {
        "@type": "Organization",
        "name": "BhaktiLok Editorial Board"
      },
      "publisher": {
        "@type": "Organization",
        "name": "BhaktiLok"
      }
    },
    {
      "@type": "HowTo",
      "name": "सत्यनारायण व्रत एवं पूजा विधि",
      "description": "सत्यनारायण भगवान की पूजा एवं कथा श्रवण की संपूर्ण विधि।",
      "step": [
        {
          "@type": "HowToStep",
          "name": "पूजा वेदी निर्माण",
          "text": "चौकी पर पीला वस्त्र बिछाकर नवग्रह, कलश और सत्यनारायण भगवान की प्रतिमा स्थापित करें।"
        },
        {
          "@type": "HowToStep",
          "name": "कथा श्रवण",
          "text": "परिवार सहित बैठकर पांचों अध्यायों का श्रवण या वाचन करें।"
        }
      ]
    }
  ]
}
```

#### 3.5.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - Table of Contents renders as a sticky top drawer button: `"📑 अध्याय सूची"`.
  - Samagri checklist switches to touch-friendly tap targets.
* **Desktop (> 1024px):**
  - Two-column layout with persistent sticky scrollspy TOC on the right.

#### 3.5.6 Interaction States
* **Active Chapter Scrollspy:** The Table of Contents automatically highlights the current chapter link as the user scrolls past heading thresholds.
* **Interactive Samagri Checklist:** Devotees can check off items; selections persist in LocalStorage so progress isn't lost while shopping in local mandir markets.

---


## 4. Sacred Scripture (Granth) Experience Templates

### 4.1 TEMPLATE 8: SCRIPTURE LIBRARY TEMPLATE (`/granth`)

#### 4.1.1 Layout Structure (Wireframe Architecture)
The Scripture Library functions as the central Vedic repository of Sanatan Dharma, categorizing Shruti, Smriti, Itihasa, and Purana texts into accessible, structured digital editions.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Scripture Library (धर्मग्रंथ संग्रहालय)                         |
+-----------------------------------------------------------------------------------+
| HERO SECTION:                                                                     |
| - Title: सनातन धर्मग्रंथ एवं संहिताएं (Sacred Hindu Scriptures)                   |
| - Description: वेद, उपनिषद, पुराण, श्रीमद्भगवद्गीता एवं रामायण का प्रामाणिक संग्रह |
| - Stats Ribbon: [४ वेद] [१८ महापुराण] [१०८ उपनिषद] [२ महाकाव्य] [७००+ गीता श्लोक]  |
+-----------------------------------------------------------------------------------+
| CATEGORY FILTER TABS:                                                             |
| [सभी] [श्रीमद्भगवद्गीता] [रामायण] [वेद] [उपनिषद] [पुराण] [स्तोत्र एवं संहिताएं]   |
+-----------------------------------------------------------------------------------+
| SPOTLIGHT SACRED GRANTHS (Hero Cards - 2 Columns):                                |
|                                                                                   |
| +------------------------------------+ +----------------------------------------+ |
| | SHRIMAD BHAGAVAD GITA              | | SHRI RAMCHARITMANAS                    | |
| | १८ अध्याय | ७०० श्लोक | बहुभाषी     | | ७ काण्ड | संपूर्ण दोहा-चौपाई           | |
| | मूल संस्कृत + हिंदी + Shankara Bhas| | अवधी + हिंदी भावार्थ + ऑडियो           | |
| | [प्रारंभ करें (Start Reading) ➔]   | | [प्रारंभ करें (Start Reading) ➔]       | |
| +------------------------------------+ +----------------------------------------+ |
+-----------------------------------------------------------------------------------+
| ALL SCRIPTURES CATALOG GRID (3 Columns Desktop, 1 Col Mobile):                    |
|                                                                                   |
| +--------------------+ +--------------------+ +--------------------+              |
| | Rigveda Samhita    | | Upanishads         | | Shiva Purana       |              |
| | १० मण्डल | १०२८ सूक | | ईश, केन, कठ...    | | २४,००० श्लोक       |              |
| | [Read Overview]    | | [Read Overview]    | | [Read Overview]    |              |
| +--------------------+ +--------------------+ +--------------------+              |
+-----------------------------------------------------------------------------------+
| SACRED READING PATHWAY (Beginner's Guide: How to Study Hindu Scriptures)         |
+-----------------------------------------------------------------------------------+
| SCRIPTURAL SCHOLARSHIP & TRANSLATION METHODOLOGY (E-E-A-T Authenticity Stamp)     |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (श्रुति और स्मृति में अंतर, गीता का सही अध्ययन)       |
+-----------------------------------------------------------------------------------+
```

#### 4.1.2 Required Components
* `ScriptureHero.tsx`: Dignified Vedic banner with Sanskrit invocation (*"वेदोऽखिलो धर्ममूलम्"*), library overview, and numerical statistics ribbon.
* `GranthCategoryTabs.tsx`: Filter tabs for Shrutis (Vedas), Smritis, Itihasas (Ramayana, Mahabharata), Puranas, and Darshanas.
* `SpotlightGranthCard.tsx`: Premium card with gold embossed typography, chapter and verse metrics, translator credits, and direct reading entrance.
* `GranthCatalogGrid.tsx`: CSS Grid rendering scripture cards with author/sage attribution, language availability, and reading level indicator.
* `ReadingPathGuide.tsx`: Structured educational curriculum recommending starting texts for beginners, intermediate seekers, and advanced philosophical researchers.
* `EditorialAuthenticityBadge.tsx`: E-E-A-T trust section outlining manuscript verification (Gita Press, Chaukhambha Sanskrit Sansthan sources).

#### 4.1.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/granth/page.tsx`):**
  - Table: `scriptures` joined with counts from `scripture_chapters` and `scripture_verses`.
  - Supabase Query:
    ```typescript
    const { data: scriptures } = await supabase
      .from('scriptures')
      .select(`
        id, title, title_en, slug, category, author_sage, total_chapters,
        total_verses, description_hindi, thumbnail_url, is_featured,
        scripture_chapters (count),
        scripture_verses (count)
      `)
      .order('display_order', { ascending: true });
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 86400` - Daily revalidation).
* **Cache Tags:** `['scriptures_library']`.

#### 4.1.4 SEO Metadata & Structured Data
* **Title Formula:** `सनातन धर्मग्रंथ — वेद, उपनिषद, पुराण, गीता व रामायण पुस्तकालय | BhaktiLok`
* **Meta Description:** `BhaktiLok धर्मग्रंथ पुस्तकालय में पढ़ें संपूर्ण श्रीमद्भगवद्गीता, श्रीरामचरितमानस, उपनिषद एवं पुराण। शुद्ध संस्कृत मूल श्लोक, हिंदी अनुवाद और शास्त्रीय भाष्य सहित।`
* **Canonical URL:** `https://bhaktilok.com/granth`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "सनातन धर्मग्रंथ पुस्तकालय (Sanatan Scripture Library)",
  "url": "https://bhaktilok.com/granth",
  "description": "प्रामाणिक हिंदू धर्मग्रंथों का डिजिटल संग्रह।",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "श्रीमद्भगवद्गीता (Shrimad Bhagavad Gita)",
        "url": "https://bhaktilok.com/granth/bhagavad-gita"
      },
      {
        "@type": "Book",
        "position": 2,
        "name": "श्रीरामचरितमानस (Shri Ramcharitmanas)",
        "url": "https://bhaktilok.com/granth/ramayana"
      }
    ]
  }
}
```

#### 4.1.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Spotlight cards stack vertically; category filters switch to a horizontally scrolling chip ribbon.
* **Desktop (> 1024px):** 2 spotlight hero cards side-by-side, followed by 3-column scripture catalog.

#### 4.1.6 Interaction States
* **Search / Filter State:** Instant filtering without reload as user toggles tabs.
* **Loading Skeleton:** Shimmer cards matching exact dimensions of book covers.

---

### 4.2 TEMPLATE 9: SCRIPTURE CHAPTER TEMPLATE (`/granth/[scriptureSlug]/[chapterSlug]`)

#### 4.2.1 Layout Structure (Wireframe Architecture)
Optimized for chapter-level study, summarizing philosophical themes, providing audio recitation, and displaying a clean verse index.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Scripture Library > Bhagavad Gita > Chapter 2                  |
+-----------------------------------------------------------------------------------+
| CHAPTER HEADER:                                                                   |
| - Chapter Number: अध्याय २ (Chapter 2) | Total Verses: ७२ श्लोक                   |
| - Sanskrit Title: सांख्य योग (Sankhya Yoga)                                       |
| - English Title: The Yoga of Knowledge and the Immortal Soul                      |
| - Actions: [Listen Full Chapter Audio 🔊] [Download PDF] [Share Chapter]           |
+-------------------------------------------------------------------+---------------+
| CHAPTER QUICK NAVIGATOR BAR:                                                      |
| [◀ पिछला अध्याय (Ch 1)] | [अध्याय चयन ड्रॉपडाउन (Jump to Chapter ▼)] | [अगला अध्याय ▶] |
+-------------------------------------------------------------------+---------------+
| CHAPTER OVERVIEW & PHILOSOPHICAL SYNOPSIS (70% Width)             | SIDEBAR (30%) |
| - अर्जुन की विषादपूर्ण स्थिति एवं भगवान कृष्ण का उपदेश              | [KEY THEMES]  |
| - आत्मा की अमरता (The Immortality of the Atman)                    | - Atman       |
| - स्थितप्रज्ञ के लक्षण (Qualities of a Realized Being)            | - Nishkam Karma|
| - निष्काम कर्मयोग का परिचय                                         | - Sthitaprajna|
|                                                                   |               |
| COMPLETE VERSE INDEX (श्लोक सूची - Grid / List View):             | [TOP VERSES]  |
|                                                                   | - Verse 2.14  |
| +---------------------------------------------------------------+ | - Verse 2.20  |
| | श्लोक २.१: संजय उवाच...                                       | | - Verse 2.47  |
| | तं तथा कृपयाविष्टमश्रुपूर्णाकुलेक्षणम् । विषीदन्तमिदं वाक्यम्...| |   (Karmanye)  |
| | [Read Verse & Purports ➔]                                     | | - Verse 2.70  |
| +---------------------------------------------------------------+ |               |
| +---------------------------------------------------------------+ | [CHAPTER      |
| | श्लोक २.४७ (अत्यंत लोकप्रिय श्लोक - Featured Ribbon):         | |  PROGRESS]    |
| | कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।                          | | Read: 12/72   |
| | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥                   | |               |
| | [Read Verse & Purports ➔]                                     | |               |
| +---------------------------------------------------------------+ |               |
| [Verses 2.1 through 2.72 continue...]                             |               |
+-------------------------------------------------------------------+---------------+
| FREQUENTLY ASKED QUESTIONS ABOUT THIS CHAPTER                                     |
+-----------------------------------------------------------------------------------+
| NEXT CHAPTER PREVIEW & CONTINUATION CTA                                           |
+-----------------------------------------------------------------------------------+
```

#### 4.2.2 Required Components
* `ChapterHeader.tsx`: Grand title, Devanagari and English chapter name, total verse tally, and theme synopsis.
* `ChapterAudioPlayer.tsx`: Audio recitation of the entire chapter with continuous Sanskrit chanting.
* `ChapterQuickNav.tsx`: Previous/Next chapter buttons and an instant jump dropdown selector.
* `ChapterSummaryCard.tsx`: Deep theological digest synthesizing the core philosophical arguments of the chapter.
* `VerseIndexGrid.tsx`: Interactive list/grid of verse cards with search filter within the chapter.
* `VerseIndexCard.tsx`: Compact preview card rendering verse number, opening line in Devanagari, first line translation, and direct link to verse detail room.
* `KeyVersesSidebar.tsx`: Curated shortcuts to historically famous and frequently memorized slokas in this chapter.

#### 4.2.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/granth/[scriptureSlug]/[chapterSlug]/page.tsx`):**
  - Tables: `scripture_chapters` joined with `scriptures` and `scripture_verses`.
  - Supabase Query:
    ```typescript
    const { data: chapter } = await supabase
      .from('scripture_chapters')
      .select(`
        id, chapter_number, title_devanagari, title_en, slug, summary_hindi,
        summary_english, total_verses, audio_url,
        scriptures:scripture_id (id, title, slug),
        scripture_verses (
          id, verse_number, sloka_devanagari, meaning_hindi_short, slug
        )
      `)
      .eq('scriptures.slug', params.scriptureSlug)
      .eq('slug', params.chapterSlug)
      .single();
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 604800` - 7 Days).
* **Cache Tags:** `['chapter', `chapter:${params.scriptureSlug}:${params.chapterSlug}`]`.

#### 4.2.4 SEO Metadata & Structured Data
* **Title Formula:** `[Chapter Name Hindi] (अध्याय [No]) — [Scripture Name] श्लोक सूची एवं भावार्थ | BhaktiLok`  
  *(e.g., "सांख्य योग (अध्याय २) — श्रीमद्भगवद्गीता संपूर्ण ७२ श्लोक व अर्थ | BhaktiLok")*
* **Meta Description:** `श्रीमद्भगवद्गीता अध्याय २ "सांख्य योग" के संपूर्ण ७२ श्लोक पढ़ें। आत्मा की अमरता, निष्काम कर्मयोग एवं स्थितप्रज्ञ के लक्षण का विस्तृत हिंदी भावार्थ।`
* **Canonical URL:** `https://bhaktilok.com/granth/[scriptureSlug]/[chapterSlug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Chapter",
      "name": "अध्याय २: सांख्य योग (Sankhya Yoga)",
      "chapterNumber": 2,
      "isPartOf": {
        "@type": "Book",
        "name": "श्रीमद्भगवद्गीता (Shrimad Bhagavad Gita)",
        "url": "https://bhaktilok.com/granth/bhagavad-gita"
      },
      "url": "https://bhaktilok.com/granth/bhagavad-gita/chapter-2"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://bhaktilok.com/" },
        { "@type": "ListItem", "position": 2, "name": "धर्मग्रंथ", "item": "https://bhaktilok.com/granth" },
        { "@type": "ListItem", "position": 3, "name": "भगवद्गीता", "item": "https://bhaktilok.com/granth/bhagavad-gita" },
        { "@type": "ListItem", "position": 4, "name": "अध्याय २", "item": "https://bhaktilok.com/granth/bhagavad-gita/chapter-2" }
      ]
    }
  ]
}
```

#### 4.2.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Chapter navigation bar stays fixed at screen bottom with Prev/Next buttons; verse cards expand to 100% width.
* **Desktop (> 1024px):** 2-column layout with left verse index and right chapter analytics sidebar.

#### 4.2.6 Interaction States
* **Search within Chapter:** Instant client-side search box narrows down verses by Sanskrit keyword or English translation.
* **Audio Recitation Bar:** Floating audio strip lets devotees listen to Sanskrit chanting while browsing down the verse list.

---

### 4.3 TEMPLATE 10: SCRIPTURE VERSE TEMPLATE (Gita-Style) (`/granth/[scriptureSlug]/[chapterSlug]/[verseSlug]`)

#### 4.3.1 Layout Structure (Wireframe Architecture)
The pinnacle of sacred typography and philosophical rigor, this template provides a multi-dimensional study room for an individual verse, including word breakdown, transliteration, audio pronunciation, and classical multi-tradition commentaries.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Granth > Bhagavad Gita > Chapter 2 > Verse 47                  |
+-----------------------------------------------------------------------------------+
| VERSE CONTEXT HEADER:                                                             |
| - Scripture: श्रीमद्भगवद्गीता | Chapter 2 (सांख्य योग) | Verse 47                 |
| - Speaker: श्रीभगवानुवाच (The Supreme Lord Said)                                  |
| - Navigation: [◀ पिछला श्लोक (२.४६)]   |   [अगला श्लोक (२.४८) ▶] (Arrow Hotkeys)   |
+-----------------------------------------------------------------------------------+
| SACRED SLOKA DISPLAY (Majestic Calligraphic Parchment Frame):                     |
|                                                                                   |
|            कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।                                    |
|            मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥ ४७ ॥                         |
|                                                                                   |
| [IAST]: karmaṇyevādhikāraste mā phaleṣu kadācana ।                                |
|         mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ॥                           |
| [Audio: Authentic Sanskrit Chanting with Slow Pronunciation Option 🔊]            |
+-------------------------------------------------------------------+---------------+
| PADACHHEDA (संस्कृत पदच्छेद - Word Separation):                   | SIDEBAR (32%) |
| कर्मणि — एव — अधिकारः — ते — मा — फलेषु — कदाचन ...               |               |
|                                                                   | [SHARE SLOKA  |
| ANVAYA (अन्वय - Prose Order):                                     |  QUOTE CARD]  |
| ते कर्मणि एव अधिकारः, फलेषु कदाचन मा...                           | [Download HD  |
|                                                                   |  Card for     |
| WORD-BY-WORD MEANINGS (शब्दार्थ तालिका):                          |  WhatsApp /   |
| - कर्मणि: कर्म करने में (In prescribed duties)                   |  Instagram]   |
| - एव: ही (Only)                                                   |               |
| - अधिकारः: अधिकार (Right)                                         | [SHORTCUTS]   |
| - फलेषु: फलों में (In the fruits)                                 | - Prev: ←     |
|                                                                   | - Next: →     |
| SIMPLIFIED TRANSLATIONS (सरल भावार्थ):                            | - Audio: Space|
| - हिंदी अनुवाद: तेरा कर्म करने में ही अधिकार है, फल में कभी नहीं...|               |
| - English Translation: You have a right to perform your duties... | [TOPIC TAGS]  |
|                                                                   | #KarmaYoga    |
| MULTI-COMMENTARY TABS (शास्त्रीय भाष्य एवं टीकाएं):               | #Duty         |
| [आदि शंकराचार्य] [रामानुजाचार्य] [स्वामी चिन्मयानंद] [सरल व्याख्या]| #Detachment   |
|                                                                   |               |
| Shankara Bhasya: तत्र कर्मणि एव अधिकारः न ज्ञाननिष्ठायाम्...      | [RELATED      |
|                                                                   |  VERSES]      |
| PRACTICAL LIFE APPLICATION (दैनिक जीवन में इस श्लोक का महत्व):    | - Gita 3.19   |
| - आधुनिक तनाव प्रबंधन और निष्काम कर्म का मनोविज्ञान               | - Gita 18.66  |
+-------------------------------------------------------------------+---------------+
| SOCIAL SLOKA CARD GENERATOR MODAL                                                 |
+-----------------------------------------------------------------------------------+
| RELATED VERSES & PHILOSOPHICAL CROSS-REFERENCES                                   |
+-----------------------------------------------------------------------------------+
```

#### 4.3.2 Required Components
* `VerseContextBar.tsx`: Contextual banner showing speaker identification, verse number, and Prev/Next navigation with keyboard hotkeys (`←` and `→`).
* `SacredVerseSanctum.tsx`: High-visibility sloka display box with metrical formatting, golden verse marker (`॥ ४७ ॥`), and pronunciation audio player.
* `PadachhedaAnvayaBox.tsx`: Linguistic analysis card with grammatical word separation and natural prose order.
* `WordByWordTable.tsx`: Tabular linguistic breakdown (Sanskrit Word, Devanagari Meaning, English Meaning).
* `CommentaryTabs.tsx`: Tabbed classical commentary switcher supporting:
  - *Advaita Vedanta:* Adi Shankaracharya Bhasya.
  - *Vishishtadvaita:* Ramanujacharya Gita Bhashya.
  - *Modern Spiritual:* Swami Sivananda / Swami Chinmayananda.
* `LifeApplicationCard.tsx`: Contemporary practical guide on applying this verse to modern emotional health, workplace mindfulness, and ethical dilemmas.
* `SlokaQuoteGenerator.tsx`: Interactive canvas component generating a branded 1080x1080px or 1080x1920px image card with saffron border and Sanskrit verse for social sharing.

#### 4.3.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/granth/[scriptureSlug]/[chapterSlug]/[verseSlug]/page.tsx`):**
  - Table: `scripture_verses` joined with `scripture_chapters` and `scriptures`.
  - Supabase Query:
    ```typescript
    const { data: verse } = await supabase
      .from('scripture_verses')
      .select(`
        id, verse_number, slug, sloka_devanagari, sloka_transliteration,
        speaker, padachheda, anvaya, word_meanings_json,
        meaning_hindi, meaning_english, commentaries_json,
        audio_url, life_application,
        scripture_chapters:chapter_id (
          id, chapter_number, title_devanagari, title_en, slug,
          scriptures:scripture_id (id, title, slug)
        )
      `)
      .eq('slug', params.verseSlug)
      .single();
    ```
* **Rendering Strategy:** `SSG + On-Demand ISR`. Pre-render all 700 Bhagavad Gita verses at build time.
* **Cache Tags:** `['verse', `verse:${params.scriptureSlug}:${params.chapterSlug}:${params.verseSlug}`]`.

#### 4.3.4 SEO Metadata & Structured Data
* **Title Formula:** `[Scripture] [Chapter].[Verse] — [Opening Words] | श्लोक, पदच्छेद, भावार्थ एवं भाष्य | BhaktiLok`  
  *(e.g., "भगवद्गीता २.४७ — कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | श्लोक, पदच्छेद, भावार्थ एवं शंकराचार्य भाष्य | BhaktiLok")*
* **Meta Description:** `पढ़ें श्रीमद्भगवद्गीता अध्याय २ श्लोक ४७ "कर्मण्येवाधिकारस्ते..." का मूल संस्कृत श्लोक, पदच्छेद, अन्वय, शब्दार्थ, सरल हिंदी अनुवाद एवं आदि शंकराचार्य कृत भाष्य।`
* **Canonical URL:** `https://bhaktilok.com/granth/[scriptureSlug]/[chapterSlug]/[verseSlug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Quotation",
      "text": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
      "spokenByCharacter": {
        "@type": "Person",
        "name": "श्रीभगवान् (Lord Krishna)"
      },
      "isPartOf": {
        "@type": "Chapter",
        "name": "अध्याय २: सांख्य योग",
        "chapterNumber": 2,
        "isPartOf": {
          "@type": "Book",
          "name": "श्रीमद्भगवद्गीता"
        }
      }
    },
    {
      "@type": "AudioObject",
      "name": "गीता श्लोक २.४७ शुद्ध उच्चारण",
      "contentUrl": "https://media.bhaktilok.com/audio/gita/02-47.mp3",
      "duration": "PT24S"
    }
  ]
}
```

#### 4.3.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - Padachheda words render as wrap tags with tap-to-inspect popups.
  - Commentary tabs turn into an accordion for smooth vertical scanning.
  - Sticky bottom navigation bar contains: `[← पिछला श्लोक]`, `[🎧 सुनें]`, and `[अगला श्लोक →]`.
* **Desktop (> 1024px):**
  - Full side-by-side view with left-hand deep commentary and right-hand shareable image generator.
  - Left/Right keyboard arrow navigation permanently active.

#### 4.3.6 Interaction States
* **Keyboard Hotkeys:** Pressing `ArrowLeft` navigates to previous verse; `ArrowRight` navigates to next verse; `Spacebar` toggles audio recitation.
* **Quote Image Generator:** Clicking "शेयर कार्ड बनाएं" renders an instant modal preview with customizable theme (Dawn Saffron, Temple Gold, Vedic Midnight) and instant download.

---


## 5. Temporal & Astrological Templates

### 5.1 TEMPLATE 11: PANCHANG PAGE TEMPLATE (`/panchang` and `/panchang/[date]` / `[city]/[date]`)

#### 5.1.1 Layout Structure (Wireframe Architecture)
The Panchang page serves as the authoritative, mathematical Hindu almanac calculating daily astrological movements, auspicious muhurats, and inauspicious windows based on latitude, longitude, and timezone.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Panchang > Varanasi > 18 November 2026                         |
+-----------------------------------------------------------------------------------+
| DATE & CITY CONTROLLER BAR (Sticky Top Utility):                                  |
| [◀ पिछला दिन] | [ 📅 18 Nov 2026 (बुधवार) ▼] | [अगला दिन ▶] | [📍 वाराणसी (बदलें) ▼] |
| [Ayanamsa: Drik Lahiri] | [Calendar View Modal] | [Print Daily Panchang]           |
+-----------------------------------------------------------------------------------+
| DAILY AUSPICIOUS SUMMARY BANNER (Dawn Sky Gradient Card):                         |
| - विक्रम संवत २०८३ | शक संवत १९४८ | अयन: दक्षिणायन | ऋतु: हेमंत | मास: कार्तिक | शुक्ल पक्ष |
| - सूर्योदय: ०६:२२ AM | सूर्यास्त: ०५:२४ PM | चंद्रोदय: १२:४५ PM | चंद्रास्त: ११:५० PM |
+-------------------------------------------------------------------+---------------+
| THE FIVE ESSENTIAL LIMBS OF PANCHANG (पंच-अंग ग्रिड):             | SIDEBAR (35%) |
|                                                                   |               |
| +---------------------------------------------------------------+ | [FESTIVALS    |
| | १. तिथि (Tithi): नवमी (अक्षय नवमी) समाप्त ११:४२ PM तक, उपरांत दशमी| |  TODAY]       |
| | २. नक्षत्र (Nakshatra): शतभिषा समाप्त ०३:१५ PM तक, उपरांत पूर्वा| | - आंवला नवमी  |
| | ३. योग (Yoga): ध्रुव समाप्त ०६:०८ AM तक, उपरांत व्याघात       | | - कार्तिक स्नान|
| | ४. करण (Karana): कौलव समाप्त १२:०४ PM तक, उपरांत तैतिल        | |               |
| | ५. वार (Vaar): बुधवार (Wednesday) - बुध ग्रह का दिन            | | [CHOGHADIYA   |
| +---------------------------------------------------------------+ |  PREVIEW]     |
|                                                                   | - अमृत: शुभ   |
| AUSPICIOUS TIMINGS (शुभ मुहूर्त सारणी - Green Aura):               | - शुभ: मंगल   |
| - अभिजीत मुहूर्त: ११:४४ AM से १२:२८ PM तक (सर्वोत्तम)             | - काल: त्याज्य|
| - ब्रह्म मुहूर्त: ०४:४६ AM से ०५:३४ AM तक                         |               |
| - विजय मुहूर्त: ०१:५४ PM से ०२:३८ PM तक                           | [DISCLAIMER & |
| - गोधूलि मुहूर्त: ०५:२१ PM से ०५:४७ PM तक                          |  CALCULATION  |
| - अमृत काल: ०८:१० AM से ०९:४२ AM तक                              |  BASIS]       |
|                                                                   | - Swiss       |
| INAUSPICIOUS TIMINGS (अशुभ मुहूर्त / त्याज्य काल - Red Aura):     |   Ephemeris   |
| - राहुकाल: १२:०० PM से ०१:२३ PM तक (कोई शुभ कार्य न करें)         | - Drik        |
| - यमगण्ड: ०७:४५ AM से ०९:०८ AM तक                                |   Siddhanta   |
| - गुलिक काल: १०:३१ AM से ११:५४ AM तक                              |               |
| - दुर्मुहूर्त: ११:४४ AM से १२:२८ PM तक                            |               |
| - वर्ज्यम्: ०६:१२ PM से ०७:४८ PM तक                              |               |
|                                                                   |               |
| DAY & NIGHT CHOGHADIYA MATRIX (दिन और रात का चौघड़िया):            |               |
| [Day Table: ८ भाग] [Night Table: ८ भाग]                           |               |
|                                                                   |               |
| PLANETARY POSITIONS (ग्रह स्थिति एवं गोचर सारणी):                 |               |
| - सूर्य: वृश्चिक | चन्द्र: कुम्भ | मंगल: कर्क | बुध: तुला...        |               |
+-------------------------------------------------------------------+---------------+
| MONTHLY HINDU CALENDAR OVERVIEW (मासिक पंचांग ग्रिड लिंक)                         |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (राहुकाल में क्या नहीं करना चाहिए, अभिजीत मुहूर्त)      |
+-----------------------------------------------------------------------------------+
```

#### 5.1.2 Required Components
* `PanchangDateCityBar.tsx`: Sticky navigation bar with interactive date picker, Prev/Next day arrow triggers, GPS city locator, and a searchable city picker modal (150+ global locations).
* `SunMoonTimesCard.tsx`: Dynamic astronomical card showing precise Sunrise, Sunset, Moonrise, and Moonset timestamps with visual sun elevation arc.
* `PanchangFiveLimbsGrid.tsx`: High-visibility cards for Tithi, Nakshatra, Yoga, Karana, and Vaar with exact end-times and transition moments.
* `AuspiciousTimingsTable.tsx`: Color-coded green table detailing Abhijit Muhurat, Brahma Muhurat, Amrit Kaal, and Vijaya Muhurat.
* `InauspiciousTimingsTable.tsx`: Crimson-bordered warning table detailing Rahu Kaal, Yamaganda, Gulika, and Dur Muhurat.
* `ChoghadiyaMatrix.tsx`: Tabbed day/night table displaying 16 Choghadiya slots categorized into Shubh (शुभ, लाभ, अमृत, चर) and Ashubh (रोग, काल, उद्वेग).
* `PlanetaryPositionsCard.tsx`: Vedic horoscope chart preview showing planetary rashi transitions.
* `DayFestivalsSidebar.tsx`: List of religious observances and vrats occurring on the selected date.

#### 5.1.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/panchang/[date]/page.tsx` or `/panchang/[city]/[date]/page.tsx`):**
  - Database Table: `panchang_data_master` (partitioned by year e.g. `panchang_2026`).
  - Parameters: `date` (YYYY-MM-DD), `city_id` (or default `varanasi`).
  - Supabase Query:
    ```typescript
    const { data: panchang } = await supabase
      .from('panchang_data_master')
      .select('*')
      .eq('calendar_date', params.date || todayStr)
      .eq('city_id', cityId)
      .single();
    ```
* **Rendering Strategy:** `ISR` (`revalidate = 86400` for future/past dates; current date cached at edge with `revalidate = 3600`).
* **Cache Tags:** `['panchang', `panchang:${params.date}:${cityId}`]`.

#### 5.1.4 SEO Metadata & Structured Data
* **Title Formula:** `आज का पंचांग [Date Hindi] ([City]): तिथि, नक्षत्र, राहुकाल एवं शुभ मुहूर्त | BhaktiLok`  
  *(e.g., "आज का पंचांग १८ नवंबर २०२६ (वाराणसी): तिथि, नक्षत्र, राहुकाल एवं शुभ मुहूर्त | BhaktiLok")*
* **Meta Description:** `१८ नवंबर २०२६ का विस्तृत दैनिक पंचांग वाराणसी। जानें आज की तिथि, नक्षत्र, सूर्योदय समय, राहुकाल, अभिजीत मुहूर्त और दिन का चौघड़िया।`
* **Canonical URL:** `https://bhaktilok.com/panchang/[date]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SpecialAnnouncement",
      "name": "दैनिक पंचांग १८ नवंबर २०२६",
      "datePosted": "2026-11-18",
      "text": "कार्तिक शुक्ल नवमी, शतभिषा नक्षत्र, ध्रुव योग। राहुकाल १२:०० PM से ०१:२३ PM तक। अभिजीत मुहूर्त ११:४४ AM से १२:२८ PM।"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://bhaktilok.com/" },
        { "@type": "ListItem", "position": 2, "name": "पंचांग", "item": "https://bhaktilok.com/panchang" },
        { "@type": "ListItem", "position": 3, "name": "१८ नवंबर २०२६", "item": "https://bhaktilok.com/panchang/2026-11-18" }
      ]
    }
  ]
}
```

#### 5.1.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - City/Date switcher condenses into a sticky pill header with swipe navigation (swipe left for tomorrow, swipe right for yesterday).
  - Muhurat tables stack with color badges (`Green` for Shubh, `Red` for Ashubh).
  - Choghadiya renders in a horizontally scrollable timeline.
* **Desktop (> 1024px):**
  - Full two-column dashboard with right-hand festivals and planetary charts.

#### 5.1.6 Interaction States
* **Live Clock & Muhurat Status Indicator:** Real-time indicator showing if current minute is within an auspicious or inauspicious window: e.g. *"वर्तमान समय: राहुकाल चल रहा है (अगले ३२ मिनट तक)"*.
* **City Change Modal:** Real-time city search filtering 150+ global locations with auto-recalculation of local sunrise and planetary houses.

---

### 5.2 TEMPLATE 12: FESTIVAL LISTING TEMPLATE (`/festivals`)

#### 5.2.1 Layout Structure (Wireframe Architecture)
The master chronological portal of Hindu festivals, fasting days (vrats), and sacred jubilees for the calendar year.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Festivals Calendar 2026-2027                                   |
+-----------------------------------------------------------------------------------+
| HERO SECTION:                                                                     |
| - Title: सनातन हिंदू त्यौहार एवं व्रत कैलेंडर २०२६                                |
| - Description: प्रमुख पर्व, जयंती, एकादशी, प्रदोष एवं पूर्णिमा तिथियों की सूची    |
| - Filter Controls: [वर्ष २०२६ ▼] [सभी माह ▼] [प्रमुख त्यौहार] [एकादशी] [जयंती]    |
+-----------------------------------------------------------------------------------+
| IMMINENT FESTIVAL SPOTLIGHT (Live Countdown Hero):                                |
| +-------------------------------------------------------------------------------+ |
| | महाशिवरात्रि २०२६ (Maha Shivaratri) — १५ फरवरी २०२६                            | |
| | [COUNTDOWN CLOCK]: [०५ दिन] : [१४ घंटे] : [३२ मिनट] : [१० सेकंड]               | |
| | शुभ मुहूर्त: निशिता काल ०४:१२ AM से ०५:०४ AM | चार प्रहर पूजा समय              | |
| | [संपूर्ण पूजा विधि एवं कथा पढ़ें ➔]                                           | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
| CHRONOLOGICAL MONTH-BY-MONTH FESTIVAL DIRECTORY:                                  |
|                                                                                   |
| == [ जनवरी २०२६ (माघ मास) ] ===================================================== |
| +-------------------------------------------------------------------------------+ |
| | १४ जन: मकर संक्रांति | पुण्यकाल: ०७:१५ AM - १२:३० PM | [विस्तार से पढ़ें ➔]    | |
| | १८ जन: षटतिला एकादशी | व्रत नियम एवं पारणा समय       | [विस्तार से पढ़ें ➔]    | |
| | २३ जन: बसंत पंचमी    | सरस्वती पूजा शुभ मुहूर्त      | [विस्तार से पढ़ें ➔]    | |
| +-------------------------------------------------------------------------------+ |
|                                                                                   |
| == [ फरवरी २०२६ (फाल्गुन मास) ] ================================================= |
| +-------------------------------------------------------------------------------+ |
| | १५ फर: महाशिवरात्रि | चार प्रहर पूजा एवं अभिषेक विधि | [विस्तार से पढ़ें ➔]    | |
| +-------------------------------------------------------------------------------+ |
| [Months continue through December 2026...]                                        |
+-----------------------------------------------------------------------------------+
| FESTIVAL PREPARATION & VRAT SAMAGRI GUIDELINES                                    |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS ABOUT HINDU FESTIVALS                                  |
+-----------------------------------------------------------------------------------+
```

#### 5.2.2 Required Components
* `FestivalListingHero.tsx`: Year selector, festival category filter chips, search input.
* `ImminentFestivalCountdown.tsx`: Live JavaScript countdown timer displaying days, hours, minutes, and seconds to the next major festival.
* `MonthlyFestivalAccordion.tsx`: Collapsible/expandable monthly sections mapping Gregorian dates to Vikram Samvat tithis.
* `FestivalRowItem.tsx`: High-density row item with date badge, festive icon, festival title, fasting indicator, and direct link.
* `FestivalFilterBar.tsx`: Filter by Sampradaya (Vaishnava, Shaiva, Shakta) and geography (North, South, East, West India).

#### 5.2.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/festivals/page.tsx`):**
  - Table: `festivals` joined with `panchang_data_master`.
  - Supabase Query:
    ```typescript
    const { data: festivals } = await supabase
      .from('festivals')
      .select('id, title, title_en, slug, category, is_major, date_2026, tithi_name')
      .order('date_2026', { ascending: true });
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 86400`).
* **Cache Tags:** `['festivals_list']`.

#### 5.2.4 SEO Metadata & Structured Data
* **Title Formula:** `हिंदू त्यौहार कैलेंडर २०२६ — प्रमुख पर्व, व्रत, एकादशी एवं शुभ मुहूर्त | BhaktiLok`
* **Meta Description:** `वर्ष २०२६ के सभी हिंदू त्यौहारों और व्रतों की संपूर्ण सूची। दीवाली, होली, महाशिवरात्रि, नवरात्रि, रक्षाबंधन और एकादशी की सही तिथियां और पूजा मुहूर्त।`
* **Canonical URL:** `https://bhaktilok.com/festivals`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "हिंदू त्यौहार कैलेंडर २०२६",
  "url": "https://bhaktilok.com/festivals",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Event",
        "position": 1,
        "name": "महाशिवरात्रि २०२६",
        "startDate": "2026-02-15",
        "url": "https://bhaktilok.com/festivals/maha-shivaratri"
      }
    ]
  }
}
```

#### 5.2.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Month headers become sticky as the user scrolls vertically; countdown clock shrinks into a single compact banner.
* **Desktop (> 1024px):** Full-width monthly grid with filter sidebar.

#### 5.2.6 Interaction States
* **Real-time Countdown:** Live second ticks without causing full component re-renders (using isolated `requestAnimationFrame` or lightweight `useEffect`).

---

### 5.3 TEMPLATE 13: FESTIVAL DETAIL TEMPLATE (`/festivals/[slug]` & `[year]/[slug]`)

#### 5.3.1 Layout Structure (Wireframe Architecture)
Comprehensive liturgical and practical guide for a major festival, featuring exact puja muhurats, step-by-step vidhis, samagri checklists, and city-wise calculation tables.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Festivals > Maha Shivaratri 2026                               |
+-----------------------------------------------------------------------------------+
| FESTIVAL HERO HEADER:                                                             |
| - Title: महाशिवरात्रि २०२६ (Maha Shivaratri 2026)                                 |
| - Tithi: फाल्गुन कृष्ण चतुर्दशी | Central Deity: भगवान शिव                        |
| - Fasting Type: निर्जला / फलाहार व्रत | Significance: शिव-पार्वती विवाह एवं लिंगोद्भव|
+-----------------------------------------------------------------------------------+
| REAL-TIME PUJA MUHURAT ALERT BOX (Highlighted Saffron/Gold Banner):               |
| - मुख्य निशिता काल पूजा मुहूर्त: रात ११:४८ PM से १२:३८ AM (अवधि: ५० मिनट)          |
| - चार प्रहर पूजा समय:                                                             |
|   १. प्रथम प्रहर: शाम ०६:१५ PM से ०९:२५ PM | २. द्वितीय प्रहर: ०९:२५ PM से १२:३५ AM |
|   ३. तृतीय प्रहर: १२:३५ AM से ०३:४५ AM    | ४. चतुर्थ प्रहर: ०३:४५ AM से ०६:५५ AM   |
| - व्रत पारणा समय: १६ फरवरी सुबह ०६:५५ AM के बाद                                    |
+-------------------------------------------------------------------+---------------+
| MAIN FESTIVAL GUIDE (68% Width)                                   | SIDEBAR (32%) |
|                                                                   |               |
| [WHY IS IT CELEBRATED? (धार्मिक एवं पौराणिक महत्व)]:               | [SAMAGRI      |
|  समुद्र मंथन का विषपान एवं शिव-शक्ति के मिलन का महापर्व...        |  CHECKLIST]   |
|                                                                   | - Belpatra    |
| [STEP-BY-STEP PUJA VIDHI (प्रामाणिक षोडशोपचार पूजा विधि)]:         | - Bhasma      |
|  १. प्रातःकाल संकल्प एवं भस्म स्नान                               | - Dhatura     |
|  २. शिवलिंग का पंचामृत अभिषेक (दूध, दही, घी, शहद, गंगाजल)        | - Ganga Jal   |
|  ३. बिल्वपत्र, धतूरा एवं भस्म अर्पण                               | - Janeu       |
|                                                                   |               |
| [SAMAGRI CHECKLIST (इंटरएक्टिव पूजा सामग्री)]:                    | [CITY-WISE    |
|  [✓] गंगाजल  [✓] बिल्वपत्र  [✓] सफेद चंदन  [✓] भांग...            |  MUHURATS]    |
|                                                                   | - Delhi       |
| [VRAT RULES & FOOD GUIDELINES (फलाहार नियम)]:                     | - Mumbai      |
|  क्या खाएं: कुट्टू का आटा, साबूदाना, मखाना, फल                    | - Varanasi    |
|  क्या न खाएं: अन्न, नमक, लहसुन, प्याज                             | - Bengaluru   |
|                                                                   |               |
| [ASSOCIATED MANTRAS, AARTIS & BHAJANS]:                           | [ASSOCIATED   |
| - ॐ नमः शिवाय (१०८ जप)                                            |  TEMPLES]     |
| - शिव तांडव स्तोत्रम्                                             | - Somnath     |
| - शिव चालीसा                                                      | - Kashi       |
| - ॐ जय शिव ओंकारा आरती                                            |   Vishwanath  |
+-------------------------------------------------------------------+---------------+
| CITY-WISE EXACT MUHURAT MATRIX (15 Major Indian Metros)                           |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (पारणा कब करें, शिवलिंग पर क्या न चढ़ाएं)             |
+-----------------------------------------------------------------------------------+
```

#### 5.3.2 Required Components
* `FestivalDetailHero.tsx`: Rich festive banner with year indicator, deity affiliation, and tithi description.
* `MuhuratAlertBox.tsx`: High-contrast card with golden borders showing exact Nishita Kaal and Prahar intervals.
* `PujaVidhiSteps.tsx`: Illustrated sequence of Shodashopachara rituals with Sanskrit mantras to recite during each step.
* `InteractiveSamagriChecklist.tsx`: Tappable checklist for shopping and ritual arrangement.
* `FoodGuidelinesCard.tsx`: Two-column comparison card: *"क्या ग्रहण करें (Permitted foods)"* vs *"क्या न खाएं (Forbidden foods)"*.
* `CityMuhuratTable.tsx`: Searchable table displaying city-specific timings for Delhi, Mumbai, Bengaluru, Kolkata, Chennai, Varanasi, etc.
* `AssociatedContentPills.tsx`: One-click links to the festival's specific Stotras, Bhajans, Chalisas, and Aartis.

#### 5.3.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/festivals/[year]/[slug]/page.tsx`):**
  - Table: `festivals` joined with `panchang_data_master` and `deities`.
  - Supabase Query:
    ```typescript
    const { data: festival } = await supabase
      .from('festivals')
      .select(`
        id, title, title_en, slug, description, significance,
        puja_vidhi_steps, fasting_rules, samagri_list, city_muhurats_json,
        deities:deity_id (id, name, slug)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 86400`).
* **Cache Tags:** `['festival', `festival:${params.slug}`]`.

#### 5.3.4 SEO Metadata & Structured Data
* **Title Formula:** `[Festival Name Hindi] [Year] — पूजा मुहूर्त, संपूर्ण विधि, व्रत नियम एवं कथा | BhaktiLok`  
  *(e.g., "महाशिवरात्रि २०२६ (Maha Shivaratri) — निशिता काल पूजा मुहूर्त, चार प्रहर विधि एवं व्रत नियम | BhaktiLok")*
* **Meta Description:** `महाशिवरात्रि २०२६ की सही तिथि, चार प्रहर पूजा मुहूर्त, शिवलिंग अभिषेक की संपूर्ण विधि, व्रत नियम, फलाहार और कथा। जानें अपने शहर का सटीक शुभ मुहूर्त।`
* **Canonical URL:** `https://bhaktilok.com/festivals/[year]/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "name": "महाशिवरात्रि २०२६ (Maha Shivaratri 2026)",
      "startDate": "2026-02-15T18:15:00+05:30",
      "endDate": "2026-02-16T06:55:00+05:30",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "India (All Sacred Temples & Homes)"
      },
      "description": "फाल्गुन कृष्ण चतुर्दशी को मनाया जाने वाला भगवान शिव का महापर्व।"
    },
    {
      "@type": "HowTo",
      "name": "महाशिवरात्रि पूजा एवं अभिषेक विधि",
      "step": [
        {
          "@type": "HowToStep",
          "name": "पंचामृत अभिषेक",
          "text": "दूध, दही, घी, शहद और गंगाजल से शिवलिंग का सस्वर 'ॐ नमः शिवाय' जपते हुए अभिषेक करें।"
        }
      ]
    }
  ]
}
```

#### 5.3.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - City muhurat table turns into a dropdown selector showing the user's selected city first.
  - Prahar timings render as a vertical 4-step progress stepper.
* **Desktop (> 1024px):**
  - Two-column layout with right-hand sticky samagri checklist and city selector.

#### 5.3.6 Interaction States
* **Live City Filter:** Selecting a city immediately updates all prahar and parana times across the page without page reload.

---

## 6. Pilgrimage & Knowledge Base Templates

### 6.1 TEMPLATE 14: TEMPLE LISTING TEMPLATE (`/mandir`)

#### 6.1.1 Layout Structure (Wireframe Architecture)
The comprehensive pilgrimage directory mapping sacred shrines, holy dhamas, and architectural marvels across Bharat and global Sanatan centers.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Temples & Pilgrimage (मंदिर एवं तीर्थ दर्शन)                   |
+-----------------------------------------------------------------------------------+
| HERO SECTION:                                                                     |
| - Title: भारत के प्रमुख प्राचीन एवं सिद्ध मंदिर (Sacred Temples of Bharat)         |
| - Description: १२ ज्योतिर्लिंग, ५१ शक्तिपीठ, चार धाम एवं १०८ दिव्य देशम का तीर्थ पोर्टल|
| - Search Bar: "मंदिर का नाम, शहर या देवता खोजें..."                               |
+-----------------------------------------------------------------------------------+
| THEMATIC PILGRIMAGE CIRCUITS (प्रसिद्ध तीर्थ परिक्रमा परिक्षेत्र):                |
| [१२ ज्योतिर्लिंग] [५१ शक्तिपीठ] [चार धाम (बड़ा व छोटा)] [१०८ दिव्य देशम] [नवग्रह] |
+-----------------------------------------------------------------------------------+
| INTERACTIVE GEOGRAPHIC PILGRIMAGE MAP PREVIEW (भारत का तीर्थ मानचित्र)            |
| [Leaflet/Mapbox embed displaying clickable temple pins with quick popups]         |
+-------------------------------------------------------------------+---------------+
| TEMPLE CARDS DIRECTORY (3 Columns Desktop, 1 Col Mobile)          | FILTER SIDEBAR|
|                                                                   | - By State    |
| +--------------------+ +--------------------+ +-----------------+ | - By Deity    |
| | Kashi Vishwanath   | | Somnath Temple     | | Kedarnath       | | - Live Darshan|
| | Varanasi, UP       | | Prabhas Patan, GUJ | | Rudraprayag, UK | |   Available   |
| | Deity: Shiv        | | Deity: Shiv        | | Deity: Shiv     | | - Architecture|
| | [Darshan Timings]  | | [Darshan Timings]  | | [Darshan Timings| | - Ancient Era |
| +--------------------+ +--------------------+ +-----------------+ |               |
| [Pagination: 1, 2, 3 ... 12 | Next ➔]                              |               |
+-------------------------------------------------------------------+---------------+
| PILGRIM ESSENTIALS: TRAVEL SEASONS, DRESS CODES & ACCOMMODATION (धर्मशालाएं)      |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (ज्योतिर्लिंग दर्शन का क्रम, ऑनलाइन दर्शन बुकिंग)      |
+-----------------------------------------------------------------------------------+
```

#### 6.1.2 Required Components
* `TempleListingHero.tsx`: Dignified pilgrimage banner, search input with location autosuggest, and statistics ribbon.
* `PilgrimageCircuitTabs.tsx`: Filter tabs for major religious circuits: 12 Jyotirlingas, 51 Shaktipeeths, Char Dham, 108 Divya Desams.
* `InteractiveTempleMap.tsx`: Vector/Leaflet map rendering temple coordinates with custom deity pins and hover info cards.
* `TempleCardGrid.tsx`: Responsive grid of temple cards.
* `TempleCardItem.tsx`: Card featuring high-res sanctum photo, temple name in Hindi and English, primary deity badge, city/state tag, architecture style badge, and live darshan availability beacon (`🟢 Live Darshan`).
* `TempleFiltersSidebar.tsx`: State/Region selector (Uttarakhand, Uttar Pradesh, Tamil Nadu, Gujarat, etc.) and facility filters (Wheelchair, VIP Darshan, Dharamshala).

#### 6.1.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/mandir/page.tsx`):**
  - Table: `temples` joined with `deities` and `media_assets`.
  - Supabase Query:
    ```typescript
    const { data: temples } = await supabase
      .from('temples')
      .select(`
        id, name, name_en, slug, city, state, country, circuit_tag,
        architecture_style, live_darshan_url, thumbnail_url,
        deities:deity_id (id, name, slug)
      `)
      .order('is_featured', { ascending: false });
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 86400`).
* **Cache Tags:** `['temples_listing']`.

#### 6.1.4 SEO Metadata & Structured Data
* **Title Formula:** `भारत के प्रमुख मंदिर — १२ ज्योतिर्लिंग, शक्तिपीठ, चार धाम एवं दर्शन समय | BhaktiLok`
* **Meta Description:** `भारत के प्रसिद्ध हिंदू मंदिरों का संपूर्ण तीर्थ गाइड। १२ ज्योतिर्लिंग, ५१ शक्तिपीठ, चार धाम के दर्शन समय, आरती समय, ऑनलाइन बुकिंग एवं पहुंचने के मार्ग।`
* **Canonical URL:** `https://bhaktilok.com/mandir`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "भारत के पवित्र मंदिर एवं तीर्थ (Sacred Temples of India)",
  "url": "https://bhaktilok.com/mandir",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "TouristAttraction",
        "position": 1,
        "name": "श्री काशी विश्वनाथ मंदिर",
        "url": "https://bhaktilok.com/mandir/kashi-vishwanath"
      }
    ]
  }
}
```

#### 6.1.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Map collapses into a button: *"🗺️ मानचित्र पर देखें (View on Map)"* that opens a full-screen map modal; temple cards render with compact horizontal layout.
* **Desktop (> 1024px):** Interactive map sits above a 3-column card grid with a left filter sidebar.

#### 6.1.6 Interaction States
* **Map Hover Sync:** Hovering over a temple card highlights its corresponding pin on the map.

---

### 6.2 TEMPLATE 15: TEMPLE DETAIL TEMPLATE (`/mandir/[slug]`)

#### 6.2.1 Layout Structure (Wireframe Architecture)
The comprehensive digital pilgrimage room for a sacred temple, detailing ancient sthala purana legends, exact darshan and aarti schedules, VIP ticketing, live darshan feeds, and travel guidance.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Temples > Uttar Pradesh > Varanasi > Kashi Vishwanath          |
+-----------------------------------------------------------------------------------+
| TEMPLE HERO & SANCTUM GALLERY:                                                    |
| [High-Resolution Sanctum Photograph Carousel / Virtual 360 Degree Darshan Stream]  |
| - Title: श्री काशी विश्वनाथ मंदिर (Shri Kashi Vishwanath Temple)                   |
| - Location: वाराणसी, उत्तर प्रदेश | Deity: भगवान शिव (द्वादश ज्योतिर्लिंग)       |
| - Badges: [द्वादश ज्योतिर्लिंग] [गंगा तट] [🔴 लाइव दर्शन उपलब्ध (Watch Live)]     |
+-----------------------------------------------------------------------------------+
| QUICK FACTS BAR:                                                                  |
| [समय: ०३:०० AM - ११:०० PM] [प्रवेश शुल्क: निःशुल्क] [ड्रेस कोड: पारंपरिक] [नजदीकी: BSBP]|
+-------------------------------------------------------------------+---------------+
| MAIN PILGRIMAGE DOSSIER (68% Width)                               | SIDEBAR (32%) |
|                                                                   |               |
| [TEMPLE HISTORY & STHALA PURANA (स्थानीय पौराणिक कथा)]:           | [TODAY'S AARTI|
|  स्कंद पुराण के काशी खंड के अनुसार, यह नगरी भगवान शिव के...       |  SCHEDULE]    |
|                                                                   | 1. मंगला: 03:00|
| [COMPLETE DAILY AARTI & DARSHAN TIMINGS TABLE]:                   | 2. भोग: 11:15 |
| - मंगला आरती: ०३:०० AM से ०४:०० AM (विशेष टिकट आवश्यक)            | 3. संध्या: 07:00|
| - मध्याह्न भोग आरती: ११:१५ AM से १२:२० PM                        | 4. शयन: 10:30 |
| - सप्तर्षि आरती: ०७:०० PM से ०८:३० PM                              |               |
| - रात्रि श्रृंगार / शयन आरती: १०:३० PM से ११:०० PM                 | [ONLINE PUJA  |
|                                                                   |  & DONATION]  |
| [HOW TO REACH (कैसे पहुंचे - संपूर्ण यात्रा गाइड)]:                | [Book Official|
| - हवाई मार्ग: लाल बहादुर शास्त्री हवाई अड्डा (२२ किमी)            |  Trust Puja ➔]|
| - रेल मार्ग: वाराणसी जंक्शन / बनारस रेलवे स्टेशन                  |               |
| - सड़क मार्ग: राष्ट्रीय राजमार्ग १९ द्वारा सुगम संपर्क           | [RULES & CODE]|
|                                                                   | - Traditional |
| [ESSENTIAL DEVOTEE GUIDELINES & DRESS CODE (नियम एवं सावधानियां)]:|   Dress Only  |
| - क्या ले जाएं: गंगाजल, बेलपत्र, फूल (लॉकर रूम में मोबाइल जमा)    | - No Phones in|
| - व्हीलचेयर सुविधा एवं वरिष्ठ नागरिकों के लिए सुगम दर्शन           |   Garbhagriha |
|                                                                   |               |
| [NEARBY SACRED SITES (काशी के अन्य प्रमुख तीर्थ)]:                | [DEDICATED    |
| - काल भैरव मंदिर, मणिकर्णिका घाट, संकट मोचन, अन्नपूर्णा मंदिर      |  MANTRAS]     |
+-------------------------------------------------------------------+---------------+
| GOOGLE MAPS INTERACTIVE LOCATION EMBED & GEO DIRECTIONS                           |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (मंगला आरती बुकिंग, VIP पास, दर्शन का सही समय)        |
+-----------------------------------------------------------------------------------+
```

#### 6.2.2 Required Components
* `TempleGalleryHero.tsx`: Photo gallery with fullscreen lightbox, aerial drone footage facade, and Live Darshan video modal.
* `TempleQuickFactsBar.tsx`: Icon-driven strip showing opening hours, entrance cost, dress code, and accessibility.
* `SthalaPuranaSection.tsx`: Detailed theological essay on the temple's foundation, miraculous occurrences, and scriptural citations.
* `DarshanScheduleTable.tsx`: Timetable of daily pujas, aartis, and general public darshan windows.
* `HowToReachGuide.tsx`: Multi-modal transportation directions (Air, Rail, Road) with nearest station distances.
* `DevoteeRulesList.tsx`: Visual "Do's and Don'ts" card addressing electronic lockers, shoe stands, and dress code restrictions.
* `NearbyTemplesGrid.tsx`: 3-card circuit of neighboring pilgrimage shrines.
* `LiveDarshanPlayerModal.tsx`: Real-time streaming modal for temples offering live WebRTC/HLS sanctum broadcasts.

#### 6.2.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/mandir/[slug]/page.tsx`):**
  - Table: `temples` joined with `deities`, `media_assets`.
  - Supabase Query:
    ```typescript
    const { data: temple } = await supabase
      .from('temples')
      .select(`
        id, name, name_en, slug, city, state, address, geo_lat, geo_lng,
        history_hindi, architecture_details, darshan_timings_json,
        aarti_schedule_json, dress_code, how_to_reach_json,
        live_darshan_url, official_trust_url, images_gallery,
        deities:deity_id (id, name, slug)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 604800` - 7 Days).
* **Cache Tags:** `['temple', `temple:${params.slug}`]`.

#### 6.2.4 SEO Metadata & Structured Data
* **Title Formula:** `[Temple Name Hindi] ([City]) — दर्शन समय, आरती टाइमिंग, इतिहास एवं यात्रा गाइड | BhaktiLok`  
  *(e.g., "श्री काशी विश्वनाथ मंदिर वाराणसी — दर्शन समय, आरती टाइमिंग, इतिहास एवं लाइव दर्शन | BhaktiLok")*
* **Meta Description:** `काशी विश्वनाथ मंदिर वाराणसी का संपूर्ण तीर्थ गाइड। जानें दैनिक दर्शन व आरती का समय, मंगला आरती बुकिंग, पहुंचने का मार्ग, इतिहास और ड्रेस कोड।`
* **Canonical URL:** `https://bhaktilok.com/mandir/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Place",
      "@id": "https://bhaktilok.com/mandir/kashi-vishwanath#place",
      "name": "श्री काशी विश्वनाथ मंदिर (Shri Kashi Vishwanath Temple)",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varanasi",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.3109,
        "longitude": 83.0107
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "03:00",
          "closes": "23:00"
        }
      ]
    },
    {
      "@type": "TouristAttraction",
      "name": "श्री काशी विश्वनाथ ज्योतिर्लिंग",
      "description": "द्वादश ज्योतिर्लिंगों में से एक प्रमुख पावन शिव धाम।"
    }
  ]
}
```

#### 6.2.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):**
  - Photo gallery turns into a touch-swipe carousel with indicator dots.
  - Sticky bottom bar: `[📍 दिशा-निर्देश (Get Directions)]` opens Google Maps app directly via geo URI scheme (`geo:25.3109,83.0107`).
* **Desktop (> 1024px):**
  - Multi-column layout with right-hand aarti schedule and live darshan button.

#### 6.2.6 Interaction States
* **Live Darshan Stream Modal:** Clicking "लाइव दर्शन" opens an embedded HLS player with low-latency streaming and audio volume controls.

---

### 6.3 TEMPLATE 16: ENCYCLOPEDIA LISTING TEMPLATE (`/encyclopedia`)

#### 6.3.1 Layout Structure (Wireframe Architecture)
The comprehensive Sanatan Dharma Mahakosh (A-Z Spiritual Encyclopedia) classifying philosophical terms, Vedic concepts, deities, rishis, and cosmological planes.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Sanatan Encyclopedia (सनातन महाकोश)                            |
+-----------------------------------------------------------------------------------+
| HERO SECTION:                                                                     |
| - Title: सनातन ज्ञान महाकोश (Sanatan Dharma Encyclopedia)                          |
| - Description: हिंदू धर्म, दर्शन, देवता, ऋषि, पर्व एवं आध्यात्मिक शब्दावली का प्रामाणिक कोष|
| - Live Filter Search: "शब्द खोजें (उदा. मोक्ष, कर्म, नारद, कुंभ)..."              |
+-----------------------------------------------------------------------------------+
| ALPHABETICAL DEVANAGARI & ENGLISH INDEX RIBBON:                                   |
| [अ] [आ] [इ] [ई] [उ] [ऊ] [ऋ] [ए] [ऐ] [ओ] [औ] [क] [ख] [ग] ... [ह] | [A - Z]         |
+-----------------------------------------------------------------------------------+
| DOMAIN CATEGORY PILLS:                                                            |
| [सभी] [प्रमुख देवता] [ऋषि-मुनि] [दार्शनिक संकल्पनाएं] [धार्मिक प्रतीक] [तीर्थ]     |
+-----------------------------------------------------------------------------------+
| ENCYCLOPEDIA ENTITIES GRID (4 Columns Desktop, 1 Col Mobile):                     |
|                                                                                   |
| +--------------------+ +--------------------+ +--------------------+ +-----------+ |
| | Atman (आत्मा)      | | Karma (कर्म)       | | Moksha (मोक्ष)     | | Dharma    | |
| | Category: दर्शन    | | Category: सिद्धांत | | Category: पुरुषार्थ| | (धर्म)    | |
| | जीवात्मा का अमर... | | कार्य-कारण नियम... | | जन्म-मरण से मुक्ति | | शाश्वत... | |
| | [विस्तार से ➔]     | | [विस्तार से ➔]     | | [विस्तार से ➔]     | | [विस्तार] | |
| +--------------------+ +--------------------+ +--------------------+ +-----------+ |
| [Alphabetical Pagination & Infinite Scroll Loader]                                |
+-----------------------------------------------------------------------------------+
| CONTRIBUTION & SCHOLARLY REVIEW STANDARDS (Editorial Peer-Review Board)           |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS ABOUT VEDIC TERMINOLOGY                                |
+-----------------------------------------------------------------------------------+
```

#### 6.3.2 Required Components
* `EncyclopediaHero.tsx`: Dignified reference library banner with search bar and entry counter (e.g. "५,०००+ प्रविष्टियां").
* `AlphabetRibbon.tsx`: Horizontal selector for Devanagari vowels, consonants, and Latin alphabets.
* `CategoryFilterTabs.tsx`: Semantic categorization chips (Deities, Rishis, Concepts, Rituals, Sacred Plants, Weapons).
* `EntityCardGrid.tsx`: CSS Grid rendering glossary cards.
* `EntityGlossaryCard.tsx`: Compact reference card displaying Devanagari term, IAST pronunciation, category tag, and concise 2-line definition.
* `ScholarshipStamp.tsx`: E-E-A-T credentials of the Sanskrit advisory board.

#### 6.3.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/encyclopedia/page.tsx`):**
  - Table: `encyclopedia_entries`.
  - Supabase Query:
    ```typescript
    const { data: entries } = await supabase
      .from('encyclopedia_entries')
      .select('id, term_devanagari, term_en, slug, category, short_definition')
      .order('term_devanagari', { ascending: true })
      .range(0, 48);
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 604800` - 7 Days).
* **Cache Tags:** `['encyclopedia_listing']`.

#### 6.3.4 SEO Metadata & Structured Data
* **Title Formula:** `सनातन ज्ञान महाकोश — हिंदू धर्म, दर्शन, देवता एवं आध्यात्मिक शब्दावली | BhaktiLok`
* **Meta Description:** `BhaktiLok सनातन महाकोश: हिंदू धर्म, वेद, उपनिषद, प्रमुख देवी-देवताओं, ऋषियों और आध्यात्मिक सिद्धांतों की प्रामाणिक एवं विस्तृत शब्दावली A to Z।`
* **Canonical URL:** `https://bhaktilok.com/encyclopedia`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "सनातन ज्ञान महाकोश",
  "url": "https://bhaktilok.com/encyclopedia",
  "description": "हिंदू धार्मिक एवं दार्शनिक शब्दों का प्रामाणिक संदर्भ कोष।"
}
```

#### 6.3.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Alphabet ribbon scrolls horizontally; cards render in a single high-readability column.
* **Desktop (> 1024px):** 4-column reference grid.

#### 6.3.6 Interaction States
* **Live Alphabet Filter:** Clicking an alphabet instantly scrolls the page to that section with smooth scroll physics.

---

### 6.4 TEMPLATE 17: ENCYCLOPEDIA ENTRY TEMPLATE (`/encyclopedia/[slug]`)

#### 6.4.1 Layout Structure (Wireframe Architecture)
Authoritative, peer-reviewed encyclopedic monograph examining a deity, sage, philosophical tenet, or sacred symbol with textual shastric citations.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Encyclopedia > Deities > Mahadeva Shiva                        |
+-----------------------------------------------------------------------------------+
| ENTRY HEADER:                                                                     |
| - Title (Devanagari): भगवान शिव (Mahadeva Shiva)                                  |
| - Etymology: 'शिव' शब्द का अर्थ कल्याणकारी एवं मंगलमय है                          |
| - Category: [सनातन त्रिदेव] | Aliases: [रुद्र] [महादेव] [भोलेनाथ] [नटराज]          |
+-------------------------------------------------------------------+---------------+
| MAIN SCHOLARLY TREATISE (68% Width)                               | INFOBOX (32%) |
|                                                                   |               |
| [1. THEOLOGICAL ORIGIN & VEDIC REFERENCES]:                       | [ICONOGRAPHY  |
|  ऋग्वेद के शतरुद्रीय सूक्त में रुद्र के रूप में उल्लेख...          |  & ATTRIBUTES]|
|                                                                   | - Consort:    |
| [2. SYMBOLISM & ICONOGRAPHY (प्रतीक विज्ञान)]:                     |   Maa Parvati |
| - त्रिशूल: त्रिगुण (सत्व, रज, तम) का नियंत्रण                     | - Vahana:     |
| - डमरू: अनाहत नाद एवं सृष्टि का नाद ब्रह्म                          |   Nandi (बैल) |
| - गंगा: ज्ञान की निर्मल धारा                                      | - Weapon:     |
| - तीसरा नेत्र: ज्ञान और अज्ञान का भस्म करने वाला विवेक            |   Trishula    |
|                                                                   | - Abode:      |
| [3. IN PURANIC LITERATURE (पुराणों में महत्व)]:                   |   Kailash     |
|  शिव पुराण, लिंग पुराण एवं स्कंद पुराण में शिव तत्व की व्याख्या...| - Mantra:     |
|                                                                   |   ॐ नमः शिवाय |
| [4. AUTHENTIC SHASTRIC CITATIONS & MANUSCRIPTS]:                  |               |
|  - श्वेताश्वतर उपनिषद: "यदा तमस्तन्न दिवा न रात्रिर्न सन्न चासच्छिव एव केवलः"   | [PEER-REVIEW  |
|                                                                   |  STAMP]       |
| [5. INTERCONNECTED DEVOTIONAL CIRCLE (संबंधित भक्ति साहित्य)]:     | Verified by   |
|  [शिव भजन (१२०)] [शिव तांडव स्तोत्र] [द्वादश ज्योतिर्लिंग] [महाशिवरात्रि]          | Sanskrit Board|
+-------------------------------------------------------------------+---------------+
| RELATED ENCYCLOPEDIA TERMS (संबंधित शब्दावली: शक्ति, नंदी, कैलाश, रुद्राक्ष)     |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS ABOUT THIS ENTITY                                      |
+-----------------------------------------------------------------------------------+
```

#### 6.4.2 Required Components
* `EncyclopediaEntryHeader.tsx`: Title, Sanskrit etymology, pronunciation guide, and aliases.
* `EntityInfobox.tsx`: Structured Wikipedia-style sidebar summarizing consort, mount (vahana), sacred weapons, holy abode, and primary mantra.
* `ScholarlyTreatiseBody.tsx`: Formatted prose incorporating drop caps, headings, cross-wiki links, and blockquotes.
* `ShastricCitationsBox.tsx`: Exact Sanskrit quotes from the Vedas, Upanishads, or Puranas with book, chapter, and verse references.
* `DevotionalCircleLinks.tsx`: Knowledge Graph links navigating directly to related Bhajans, Mantras, Temples, and Festivals.
* `EditorialPeerReviewBadge.tsx`: Trust stamp documenting verified pandit/scholar review.

#### 6.4.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/encyclopedia/[slug]/page.tsx`):**
  - Table: `encyclopedia_entries` joined with `content_references`.
  - Supabase Query:
    ```typescript
    const { data: entry } = await supabase
      .from('encyclopedia_entries')
      .select(`
        id, term_devanagari, term_en, slug, category, etymology,
        detailed_content_markdown, infobox_json, shastric_citations_json,
        related_entities_json
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 604800` - 7 Days).
* **Cache Tags:** `['encyclopedia_entry', `encyclopedia:${params.slug}`]`.

#### 6.4.4 SEO Metadata & Structured Data
* **Title Formula:** `[Term Hindi] ([Term English]) — अर्थ, प्रतीक रहस्य, इतिहास एवं शास्त्र प्रमाण | BhaktiLok`  
  *(e.g., "भगवान शिव (Lord Shiva) — अर्थ, प्रतीक रहस्य, वैदिक इतिहास एवं शास्त्र प्रमाण | BhaktiLok")*
* **Meta Description:** `भगवान शिव का संपूर्ण आध्यात्मिक परिचय। जानें शिव शब्द का अर्थ, त्रिशूल और डमरू का रहस्य, वैदिक संदर्भ, द्वादश ज्योतिर्लिंग एवं शिव पुराण के प्रमाण।`
* **Canonical URL:** `https://bhaktilok.com/encyclopedia/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTerm",
      "name": "भगवान शिव (Lord Shiva)",
      "termCode": "shiva",
      "description": "सनातन धर्म के प्रमुख देव, संहारक एवं कल्याणकारी परम चेतना।",
      "inDefinedTermSet": "https://bhaktilok.com/encyclopedia"
    },
    {
      "@type": "Article",
      "headline": "भगवान शिव — प्रतीक रहस्य एवं वैदिक संदर्भ",
      "author": {
        "@type": "Organization",
        "name": "BhaktiLok Sanskrit Research Desk"
      }
    }
  ]
}
```

#### 6.4.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Infobox moves above the article body as a collapsible card; shastric citations display in horizontally scrolling quote boxes.
* **Desktop (> 1024px):** 2-column layout with right-hand infobox and persistent table of contents.

#### 6.4.6 Interaction States
* **In-Text Wiki Link Hover:** Hovering over internal glossary links reveals an instant preview popover card showing a 20-word summary and image thumbnail without page jump.

---


## 7. Astrological & Interactive Tools Templates

### 7.1 TEMPLATE 18: RASHIFAL TEMPLATE (`/rashifal` & `/rashifal/[rashi]`)

#### 7.1.1 Layout Structure (Wireframe Architecture)
Astrological horoscope dashboard delivering daily, weekly, and yearly astrological guidance for the 12 Vedic Rashi signs.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Rashifal > Aries (मेष राशि)                                    |
+-----------------------------------------------------------------------------------+
| 12 RASHI WHEEL / SELECTOR RIBBON (Interactive Horizontal Scroll):                 |
| [मेष ♈] [वृषभ ♉] [मिथुन ♊] [कर्क ♋] [सिंह ♌] [कन्या ♍] [तुला ♎] [वृश्चिक ♏]...|
+-----------------------------------------------------------------------------------+
| PERIOD TABS: [दैनिक राशिफल (Today)] [साप्ताहिक (Weekly)] [मासिक] [वार्षिक २०२६]     |
+-----------------------------------------------------------------------------------+
| RASHI HERO CARD:                                                                  |
| - Sign: मेष राशि (Aries) | Ruling Planet (स्वामी ग्रह): मंगल (Mars)                |
| - Element: अग्नि तत्व | Date: 18 November 2026                                      |
| - Astrological Mood: ★★★★☆ (अनुकूल दिन)                                           |
+-------------------------------------------------------------------+---------------+
| COMPREHENSIVE HOROSCOPE CATEGORIES (68% Width)                    | SIDEBAR (32%) |
|                                                                   |               |
| 1. सामान्य पूर्वानुमान (General Overview):                         | [LUCKY        |
|    आज आपका आत्मविश्वास चरम पर रहेगा। रुके हुए कार्य पूरे होंगे...  |  METRICS]     |
|                                                                   | - Lucky No: 9 |
| 2. कार्यक्षेत्र एवं व्यवसाय (Career & Business):                   | - Lucky Color:|
|    अधिकारियों से सहयोग मिलेगा। नई साझेदारी के योग बन रहे हैं...   |   लाल (Red)   |
|                                                                   | - Lucky Time: |
| 3. आर्थिक स्थिति एवं धन (Wealth & Finance):                       |   02:15 PM    |
|    अचानक धन लाभ के संकेत हैं, परंतु अनावश्यक खर्चों से बचें...    | - Direction:  |
|                                                                   |   East        |
| 4. प्रेम एवं पारिवारिक जीवन (Love & Family):                      |               |
|    जीवनसाथी के साथ सामंजस्य बढ़ेगा। घर में मांगलिक कार्य की...     | [DAILY REMEDY |
|                                                                   |  (आज का उपाय)]|
| 5. स्वास्थ्य (Health & Well-being):                               | - हनुमान      |
|    ऊर्जावान महसूस करेंगे। खानपान में संतुलन बनाए रखें...          |   चालीसा पाठ  |
|                                                                   | - लाल चंदन    |
| [TODAY'S ASTROLOGICAL REMEDY (विशेष ज्योतिषीय उपाय)]:              |   तिलक        |
| "आज हनुमान जी को सिंदूर अर्पित करें और गुड़ का दान करें।"          |               |
+-------------------------------------------------------------------+---------------+
| COMPATIBILITY METER (मेष राशि का अन्य राशियों के साथ संबंध)                       |
+-----------------------------------------------------------------------------------+
| VERIFIED ASTROLOGER CREDENTIALS & VEDIC METHODOLOGY                               |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (मेष राशि का स्वभाव, शुभ रत्न)                          |
+-----------------------------------------------------------------------------------+
```

#### 7.1.2 Required Components
* `RashiSelectorWheel.tsx`: Interactive 12-sign ribbon with custom zodiac illustrations, Sanskrit/English names, and active sign indicator.
* `PeriodSwitcherTabs.tsx`: Tabs switching between Daily, Weekly, Monthly, and Yearly predictions.
* `HoroscopeCategoryCards.tsx`: Segmented prediction blocks for Career, Finance, Love, and Health.
* `LuckyMetricsWidget.tsx`: Golden dashboard card featuring Lucky Number, Lucky Color, Auspicious Time, and Lucky Direction.
* `AstrologicalRemedyCard.tsx`: Dedicated remedial action (Upay) for the day including mantra to chant and deity to worship.
* `RashiCompatibilityWidget.tsx`: Interactive relationship match calculator between chosen sign and the other 11 signs.
* `AstrologerByline.tsx`: E-E-A-T author signature verifying that predictions are calculated based on planetary transits (Gochar).

#### 7.1.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/rashifal/[rashi]/page.tsx`):**
  - Table: `rashifal` joined with `authors`.
  - Supabase Query:
    ```typescript
    const { data: horoscope } = await supabase
      .from('rashifal')
      .select('*')
      .eq('rashi_slug', params.rashi)
      .eq('period_type', 'daily')
      .eq('forecast_date', todayStr)
      .single();
    ```
* **Rendering Strategy:** `ISR` (`revalidate = 21600` - 6 Hours).
* **Cache Tags:** `['rashifal', `rashifal:${params.rashi}`]`.

#### 7.1.4 SEO Metadata & Structured Data
* **Title Formula:** `[Rashi Hindi] दैनिक राशिफल [Date Hindi] — करियर, धन, प्रेम, स्वास्थ्य एवं उपाय | BhaktiLok`  
  *(e.g., "मेष राशिफल आज का १८ नवंबर २०२६ — करियर, धन, प्रेम, स्वास्थ्य एवं शुभ अंक | BhaktiLok")*
* **Meta Description:** `पढ़ें आज का मेष दैनिक राशिफल १८ नवंबर २०२६। जानें आज का दिन कैसा रहेगा, व्यापार, नौकरी, प्रेम संबंध, शुभ अंक, शुभ रंग और आज का अचूक ज्योतिषीय उपाय।`
* **Canonical URL:** `https://bhaktilok.com/rashifal/[rashi]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "मेष दैनिक राशिफल १८ नवंबर २०२६",
      "author": {
        "@type": "Person",
        "name": "पंडित राधेश्याम शास्त्री (Vedic Astrologer)"
      },
      "datePublished": "2026-11-18T05:00:00+05:30",
      "description": "मेष राशि का १८ नवंबर २०२६ का विस्तृत दैनिक ज्योतिषीय फलादेश।"
    }
  ]
}
```

#### 7.1.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Rashi selector ribbon scrolls horizontally with snap points; prediction sections render as accordion tabs.
* **Desktop (> 1024px):** All 12 rashis displayed across a 6x2 grid or circular wheel.

#### 7.1.6 Interaction States
* **Instant Sign Swap:** Clicking another rashi in the ribbon updates the prediction card with a smooth fade-in animation.

---

---

### 7.2 TEMPLATE 19: TOOLS DIRECTORY TEMPLATE (`/tools`)

#### 7.3.1 Layout Structure (Wireframe Architecture)
The portal for all practical, interactive digital sadhana calculators, astrological charts, and liturgical utilities designed for daily devotion.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Spiritual Tools & Calculators (आध्यात्मिक साधन एवं उपकरण)       |
+-----------------------------------------------------------------------------------+
| HERO SECTION:                                                                     |
| - Title: दैनिक साधना एवं वैदिक उपकरण (Vedic Spiritual Tools)                       |
| - Description: डिजिटल जप माला, शुभ चौघड़िया, जन्म कुंडली, एवं मुहूर्त कैलकुलेटर     |
+-----------------------------------------------------------------------------------+
| USER SADHANA DASHBOARD OVERVIEW (Personal Streak Ribbon):                         |
| [🔥 दैनिक जप स्ट्रीक: १२ दिन] [📿 कुल जप: १२,९६० बार] [📖 निरंतर अध्ययन: ४५ मिनट]   |
+-----------------------------------------------------------------------------------+
| TOOL CATEGORY TABS:                                                               |
| [सभी साधन] [जप एवं ध्यान (Japa & Meditation)] [ज्योतिष एवं मुहूर्त] [पूजा सहायक]     |
+-----------------------------------------------------------------------------------+
| TOOLS CARDS GRID (3 Columns Desktop, 1 Col Mobile):                               |
|                                                                                   |
| +------------------------+ +------------------------+ +------------------------+ |
| | 📿 डिजिटल जप माला       | | ⏰ दैनिक चौघड़िया      | | 🧭 शुभ मुहूर्त कैलकुलेटर| |
| | १०८ मनके, ध्वनि व कंपन| | दिन व रात के १६ चौघड़िय| | विवाह, गृह प्रवेश मुहूर्त| |
| | [टूल प्रारंभ करें ➔]    | | [टूल प्रारंभ करें ➔]    | | [टूल प्रारंभ करें ➔]    | |
| +------------------------+ +------------------------+ +------------------------+ |
| +------------------------+ +------------------------+ +------------------------+ |
| | 🕉️ गायत्री जप काउंटर    | | 📜 श्लोक शेयर कार्ड    | | 🕯️ वर्चुअल आरती थार     | |
| | दैनिक गायत्री साधना     | | सुंदर वॉलपेपर जनरेटर   | | शंख, घंटी व दीप आरती  | |
| | [टूल प्रारंभ करें ➔]    | | [टूल प्रारंभ करें ➔]    | | [टूल प्रारंभ करें ➔]    | |
| +------------------------+ +------------------------+ +------------------------+ |
+-----------------------------------------------------------------------------------+
| HOW TO USE VEDIC TOOLS FOR DAILY SADHANA (मार्गदर्शिका)                           |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (क्या डिजिटल जप का फल मिलता है?, गणना की प्रामाणिकता) |
+-----------------------------------------------------------------------------------+
```

#### 7.3.2 Required Components
* `ToolsHero.tsx`: Spiritual utility hero banner with descriptive subtitle.
* `SadhanaStreakCard.tsx`: Client-synced dashboard widget showing consecutive days of practice, total mantras chanted, and badges earned.
* `ToolCategoryFilter.tsx`: Tabbed filter sorting tools by ritual application.
* `ToolGrid.tsx`: CSS Grid rendering interactive tool cards.
* `ToolCardItem.tsx`: Card with animated icon, features checklist, offline capability badge, and direct launch button.
* `ToolFAQ.tsx`: Educational FAQ addressing common questions regarding digital tools versus traditional physical rosaries.

#### 7.3.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/tools/page.tsx`):**
  - Table: `tools`.
  - Supabase Query:
    ```typescript
    const { data: tools } = await supabase
      .from('tools')
      .select('id, title, title_en, slug, category, description, icon_name, is_offline_ready')
      .order('display_order', { ascending: true });
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 86400`).
* **Cache Tags:** `['tools_directory']`.

#### 7.3.4 SEO Metadata & Structured Data
* **Title Formula:** `वैदिक एवं आध्यात्मिक उपकरण — डिजिटल जप माला, चौघड़िया एवं मुहूर्त कैलकुलेटर | BhaktiLok`
* **Meta Description:** `BhaktiLok के निःशुल्क आध्यात्मिक टूल्स: डिजिटल १०८ जप माला काउंटर, आज का चौघड़िया, शुभ मुहूर्त कैलकुलेटर एवं श्लोक कार्ड जनरेटर। ऑफ़लाइन उपलब्ध।`
* **Canonical URL:** `https://bhaktilok.com/tools`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "दैनिक साधना एवं वैदिक उपकरण",
  "url": "https://bhaktilok.com/tools",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "WebApplication",
        "position": 1,
        "name": "डिजिटल जप माला (Digital Japa Mala)",
        "url": "https://bhaktilok.com/tools/japa-counter"
      }
    ]
  }
}
```

#### 7.3.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Single column layout; personal sadhana streak card pins to the top of the screen.
* **Desktop (> 1024px):** 3-column interactive tool cards grid.

#### 7.3.6 Interaction States
* **LocalStorage Sync:** Streak counter and recent tool usage load instantly without server latency.

---

### 7.3 TEMPLATE 20: TOOL DETAIL TEMPLATE (`/tools/[slug]` - e.g. Japa Mala, Choghadiya, Kundali)

#### 7.3.1 Layout Structure (Wireframe Architecture)
Interactive, full-screen capable workspace customized for high-utility spiritual workflows (illustrated below for the flagship `japa-counter` tool).

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Tools > Digital Japa Mala (डिजिटल जप माला काउंटर)              |
+-----------------------------------------------------------------------------------+
| TOOL WORKSPACE HEADER:                                                            |
| - Tool Title: डिजिटल जप माला (Digital Japa Mala)                                   |
| - Utility Bar: [Mantra Selector ▼] [Target: 108 ▼] [Sound 🔊] [Haptic 📳] [⛶ Full]|
+-----------------------------------------------------------------------------------+
| THE INTERACTIVE TOOL CANVAS (Clean, Distraction-Free Golden Sanctum):             |
|                                                                                   |
|                   +---------------------------------------+                       |
|                   |           Mantra Selected:            |                       |
|                   |         ॐ नमः शिवाय (Om Namah Shivaya)|                       |
|                   +---------------------------------------+                       |
|                                                                                   |
|                               ( 108 BEAD )                                        |
|                            ( CIRCULAR DIAL )                                      |
|                                                                                   |
|                                   [ ४२ ]                                          |
|                                / १०८ मनके                                         |
|                                                                                   |
|                          माला संख्या: २ (Total: २५८)                               |
|                                                                                   |
|                +---------------------------------------------+                    |
|                |                                             |                    |
|                |         [ TAP TO CHANT / स्पर्श करें ]      |                    |
|                |         (Click, Tap or Press Spacebar)      |                    |
|                |                                             |                    |
|                +---------------------------------------------+                    |
|                                                                                   |
|     [↺ Reset Counter]    [⏸ Pause Session]    [💾 Save Sadhana to Profile]         |
+-------------------------------------------------------------------+---------------+
| USER SADHANA SESSION LOG (Today's Stats) (65% Width)              | SIDEBAR (35%) |
| - Time Elapsed: १२ मिनट ४५ सेकंड                                   | [MANTRAS TO   |
| - Chanting Speed: ~१.२ सेकंड प्रति मंत्र                          |  PRACTICE]    |
| - Total Malas Completed Today: ३ माला                             | - Gayatri     |
|                                                                   | - Mahamrityun |
| VEDIC RULES FOR MANTRA REPETITION (जप के शास्त्रीय नियम):         | - Hare Krishna|
| १. सुमेरु मनके को कभी लांघा नहीं जाता; वहीं से माला पलटें।        |               |
| २. जप करते समय तर्जनी (Index finger) का स्पर्श न करें।            | [BENEFITS]    |
| ३. मानसिक, उपांशु एवं वाचिक जप के प्रकार।                         | - Mental Calm |
+-------------------------------------------------------------------+---------------+
| FREQUENTLY ASKED QUESTIONS ABOUT THIS TOOL                                        |
+-----------------------------------------------------------------------------------+
```

#### 7.3.2 Required Components
* `ToolWorkspaceHeader.tsx`: Title, mantra dropdown switcher, target count selector, sound toggle, haptic toggle, fullscreen trigger.
* `InteractiveToolCanvas.tsx`: High-performance canvas/SVG rendering interactive beads with spring physics and touch inertia.
* `TapChantButton.tsx`: Large 200px round tap button with haptic feedback (`navigator.vibrate`) and audio chime trigger.
* `SadhanaSessionLog.tsx`: Real-time session stats (time active, chanting cadence, total count).
* `VedicGuidelinesCard.tsx`: Sacred instructions regarding hand posture (Mudras), posture, and the significance of Sumeru bead.
* `MantraQuickSwitcher.tsx`: Drawer allowing devotees to switch to Gayatri Mantra, Maha Mrityunjaya, or Hare Krishna Mahamantra.

#### 7.3.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/tools/[slug]/page.tsx`):**
  - Table: `tools`.
  - Supabase Query:
    ```typescript
    const { data: tool } = await supabase
      .from('tools')
      .select('*')
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** Client Component with SSG Shell (`revalidate = 86400`).
* **Cache Tags:** `['tool', `tool:${params.slug}`]`.

#### 7.3.4 SEO Metadata & Structured Data
* **Title Formula:** `[Tool Name Hindi] — ऑनलाइन साधन, नियम एवं लाभ | BhaktiLok`  
  *(e.g., "डिजिटल १०८ जप माला काउंटर (Online Japa Counter) — ध्वनि, कंपन एवं विधि सहित | BhaktiLok")*
* **Meta Description:** `निःशुल्क ऑनलाइन १०८ जप माला काउंटर। मंत्र जप के लिए डिजिटल रुद्राक्ष माला, ध्वनि और कंपन के साथ। गायत्री और महामृत्युंजय मंत्र जप के लिए सर्वोत्तम।`
* **Canonical URL:** `https://bhaktilok.com/tools/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "डिजिटल जप माला काउंटर",
  "url": "https://bhaktilok.com/tools/japa-counter",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  }
}
```

#### 7.3.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Fullscreen button maximizes workspace, hiding browser chrome; entire screen acts as a touch pad for effortless chanting with eyes closed.
* **Desktop (> 1024px):** Centered workspace with sidebar guide.

#### 7.3.6 Interaction States
* **Eyes-Closed Chanting Mode:** Device vibrates lightly upon each count, and vibrates with three distinct pulses upon reaching bead 108.
* **Wake Lock Integration:** Screen remains illuminated indefinitely while a sadhana session is active.

---

## 8. Editorial & Identity Templates

### 8.1 TEMPLATE 21: ARTICLE LISTING TEMPLATE (`/articles`)

#### 8.1.1 Layout Structure (Wireframe Architecture)
The editorial magazine hub of BhaktiLok, delivering essays on Vedanta, Pauranik history, scriptural commentary, and spiritual lifestyle.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Dharmik Articles & Philosophy (धार्मिक विचार एवं दर्शन)        |
+-----------------------------------------------------------------------------------+
| HERO SECTION:                                                                     |
| - Title: धार्मिक विचार, दर्शन एवं शोध लेख (Dharmik Articles & Pravachan)          |
| - Subtitle: सनातन धर्म, वेदांत दर्शन, वैदिक जीवनशैली एवं आध्यात्मिक जिज्ञासा समाधान|
+-----------------------------------------------------------------------------------+
| FEATURED LEAD ARTICLE BANNER (Editorial Cover Story):                             |
| +-------------------------------------------------------------------------------+ |
| | [High-Resolution Devotional Cover Artwork]                                    | |
| | Category: [वेदांत दर्शन] | Reading Time: ८ मिनट | Author: वेदाचार्य राधेश्याम | |
| | Headline: आदि शंकराचार्य का अद्वैत दर्शन और आधुनिक क्वांटम भौतिकी में समानताएं| |
| | Excerpt: क्या चेतना ही ब्रह्मांड का मूल आधार है? जानिए उपनिषदों का सत्य...   | |
| | [पूरा लेख पढ़ें (Read Full Article) ➔]                                        | |
| +-------------------------------------------------------------------------------+ |
+-------------------------------------------------------------------+---------------+
| ARTICLES CATALOG GRID (2 Columns, Infinite Scroll) (68% Width)    | SIDEBAR (32%) |
|                                                                   |               |
| +----------------------------------+ +--------------------------+ | [TRENDING     |
| | Card 1: Article Image            | | Card 2: Article Image    | |  ESSAYS]      |
| | Title: कर्म और भाग्य में क्या... | | Title: तुलसी विवाह का... | | 1. मोक्ष क्या |
| | Author | Date | 5 min read      | | Author | Date | 4 min    | | 2. कुण्डलिनी  |
| +----------------------------------+ +--------------------------+ | 3. गीता ज्ञान |
| +----------------------------------+ +--------------------------+ |               |
| | Card 3                           | | Card 4                   | | [AUTHORS]     |
| +----------------------------------+ +--------------------------+ | - Top Scholars|
|                                                                   |               |
| [PAGINATION: 1, 2, 3 ... 10 | Next ➔]                             | [NEWSLETTER]  |
+-------------------------------------------------------------------+---------------+
| EDITORIAL BOARD STANDARDS & PEER-REVIEW CODE OF ETHICS                            |
+-----------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS ABOUT SANATAN PHILOSOPHY                               |
+-----------------------------------------------------------------------------------+
```

#### 8.1.2 Required Components
* `ArticlesHero.tsx`: Dignified editorial header with category chips.
* `FeaturedLeadArticle.tsx`: Wide-format hero card with rich typography and author byline.
* `ArticlesGrid.tsx`: 2-column card grid rendering article previews.
* `ArticleCardItem.tsx`: Card featuring featured image, category pill, headline, excerpt, published date, author avatar, and estimated reading time.
* `TrendingArticlesSidebar.tsx`: Ranked list of most-read essays of the week.
* `ScholarshipCodeCard.tsx`: Ethical publishing declaration affirming adherence to authentic Shastras.

#### 8.1.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/articles/page.tsx`):**
  - Table: `articles` joined with `authors` and `categories`.
  - Supabase Query:
    ```typescript
    const { data: articles } = await supabase
      .from('articles')
      .select(`
        id, title, slug, excerpt, featured_image_url, reading_time_minutes,
        published_at,
        authors:author_id (id, name, slug, avatar_url),
        categories:category_id (id, name, slug)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(0, 11);
    ```
* **Rendering Strategy:** `ISR` (`revalidate = 3600` - 1 Hour).
* **Cache Tags:** `['articles_listing']`.

#### 8.1.4 SEO Metadata & Structured Data
* **Title Formula:** `धार्मिक लेख एवं दर्शन — सनातन संस्कृति, वेदांत एवं आध्यात्मिक विचार | BhaktiLok`
* **Meta Description:** `BhaktiLok पर पढ़ें सनातन धर्म, उपनिषद, वेदांत, कर्म सिद्धांत और आध्यात्मिक साधना पर विद्वानों द्वारा रचित शोधपूर्ण एवं प्रामाणिक लेख।`
* **Canonical URL:** `https://bhaktilok.com/articles`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "BhaktiLok धार्मिक लेख एवं दर्शन",
  "url": "https://bhaktilok.com/articles"
}
```

#### 8.1.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Single column card stream; featured article stacks image above headline.
* **Desktop (> 1024px):** 2-column main grid with right-hand trending sidebar.

#### 8.1.6 Interaction States
* **Hover State:** Article thumbnail slightly zooms on hover (`scale-105 transition-transform duration-300`).

---

### 8.2 TEMPLATE 22: ARTICLE DETAIL TEMPLATE (`/articles/[slug]`)

#### 8.2.1 Layout Structure (Wireframe Architecture)
A long-form reading sanctuary with elegant Devanagari typography, in-article audio narration, pull quotes, Vedic scriptural citations, and author byline.

```
+-----------------------------------------------------------------------------------+
| FIXED TOP READING PROGRESS BAR: [████████████████░░░░░░░░░░░░░░░░] 54% Read       |
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Articles > Vedanta > Advaita Vedanta and Modern Physics        |
+-----------------------------------------------------------------------------------+
| ARTICLE HERO HEADER:                                                              |
| - Category: [वेदांत दर्शन (Vedanta Philosophy)]                                    |
| - Title: आदि शंकराचार्य का अद्वैत दर्शन और आधुनिक क्वांटम भौतिकी में समानताएं    |
| - Subtitle: क्या उपनिषदों की 'एकमेवाद्वितीयम्' की अवधारणा और क्वांटम फील्ड एक ही हैं? |
| - Metadata: लेखक: डॉ. राघवेंद्र शास्त्री | प्रकाशित: १२ नवंबर २०२६ | ८ मिनट पठन     |
+-------------------------------------------------------------------+---------------+
| MAIN ARTICLE BODY (70% Width)                                     | FLOATING SHARE|
|                                                                   | & TOC (30%)   |
| [AUDIO ARTICLE PLAYER]: [🎧 सुनें इस लेख का संपूर्ण ऑडियो (०८:२४)] |               |
|                                                                   | [QUICK TOC]   |
| [FEATURED IMAGE WITH SACRED CAPTION]                              | 1. अद्वैत दर्शन|
|                                                                   | 2. क्वांटम उलझाव|
| [SECTION 1: उपनिषद और चेतना का सिद्धांत]:                         | 3. माया और    |
|  मांडूक्य उपनिषद के अनुसार, जाग्रत, स्वप्न, सुषुप्ति और तुरीय... |    ऑब्जर्वर   |
|                                                                   | 4. निष्कर्ष   |
| [SACRED PULL QUOTE WITH GOLD EMBOSSING]:                          |               |
|  "ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः"                    | [SHARE ESSAY] |
|   — आदि शंकराचार्य (विवेकचूड़ामणि)                                | - WhatsApp    |
|                                                                   | - X / Twitter |
| [SECTION 2: क्वांटम एंटैंगलमेंट और अद्वैत अद्वैत]:                | - Facebook    |
|  श्रोडिंगर और नील्स बोर ने स्वीकार किया था कि क्वांटम सिद्धांत... |               |
|                                                                   | [AUTHOR CARD] |
| [AUTHOR BIO BOX WITH E-E-A-T CREDENTIALS]:                        | - Dr. Shastri |
| [Photo] डॉ. राघवेंद्र शास्त्री (संस्कृत विद्यापीठ, वाराणसी)       | - 45 Articles |
| "३० वर्षों से वेदांत दर्शन एवं उपनिषदों के अध्येता।"               | [View Bio ➔]  |
+-------------------------------------------------------------------+---------------+
| RELATED ESSAYS & SCRIPTURAL REFERENCES (संबंधित दार्शनिक लेख)                     |
+-----------------------------------------------------------------------------------+
| DEVOTEE DISCUSSION & THOUGHTFUL COMMENTS                                          |
+-----------------------------------------------------------------------------------+
```

#### 8.2.2 Required Components
* `ArticleReadingProgressBar.tsx`: Thin golden progress indicator fixed to top edge.
* `ArticleHeader.tsx`: Title, subtitle, category badge, publication date, author byline with avatar.
* `AudioArticlePlayer.tsx`: Synthesized or studio-recorded voice narration of the essay.
* `ArticleContentBody.tsx`: Rich markdown/HTML reader with customized typography for Devanagari drop-caps, pull quotes, and scriptural verses.
* `AuthorBioCard.tsx`: E-E-A-T profile card verifying academic and spiritual credentials.
* `FloatingShareBar.tsx`: Sticky sidebar on desktop / fixed bottom strip on mobile with WhatsApp, X, and native Web Share API triggers.
* `RelatedArticlesGrid.tsx`: 3-card grid of topically connected essays.

#### 8.2.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/articles/[slug]/page.tsx`):**
  - Table: `articles` joined with `authors`, `categories`, and `tags`.
  - Supabase Query:
    ```typescript
    const { data: article } = await supabase
      .from('articles')
      .select(`
        id, title, subtitle, slug, content_markdown, featured_image_url,
        audio_narration_url, reading_time_minutes, published_at, updated_at,
        authors:author_id (id, name, slug, bio, avatar_url, credentials),
        categories:category_id (id, name, slug)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 86400`).
* **Cache Tags:** `['article', `article:${params.slug}`]`.

#### 8.2.4 SEO Metadata & Structured Data
* **Title Formula:** `[Article Title Hindi] — [Category] | BhaktiLok`
* **Meta Description:** `पढ़ें [Article Title]। [Article Subtitle / Excerpt]। प्रामाणिक वेदांत दर्शन और शास्त्र सम्मत विश्लेषण।`
* **Canonical URL:** `https://bhaktilok.com/articles/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "आदि शंकराचार्य का अद्वैत दर्शन और आधुनिक क्वांटम भौतिकी",
  "image": "https://bhaktilok.com/images/articles/advaita-quantum.jpg",
  "datePublished": "2026-11-12T08:00:00+05:30",
  "dateModified": "2026-11-12T08:00:00+05:30",
  "author": {
    "@type": "Person",
    "name": "डॉ. राघवेंद्र शास्त्री",
    "url": "https://bhaktilok.com/authors/raghavendra-shastri"
  },
  "publisher": {
    "@type": "Organization",
    "name": "BhaktiLok",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bhaktilok.com/images/bhaktilok-logo.png"
    }
  }
}
```

#### 8.2.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Typography scales to 17px body with 1.7 line height for optimal readability; share bar pins to bottom of mobile screen.
* **Desktop (> 1024px):** 70/30 split layout with sticky table of contents and social share triggers.

#### 8.2.6 Interaction States
* **Reading Progress:** Progress bar smoothly fills from 0% to 100% as the reader scrolls to the conclusion of the article.

---

### 8.3 TEMPLATE 23: AUTHOR PROFILE TEMPLATE (`/authors/[slug]`)

#### 8.3.1 Layout Structure (Wireframe Architecture)
Authoritative scholar identity page establishing E-E-A-T credentials, academic lineage (Gurukula / University), published treatises, and translation projects.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Authors > Dr. Raghavendra Shastri                              |
+-----------------------------------------------------------------------------------+
| AUTHOR HERO DOSSIER:                                                              |
| +-------------------------------------------------------------------------------+ |
| | [High-Res Portrait Avatar]                                                    | |
| | Name: डॉ. राघवेंद्र शास्त्री (Dr. Raghavendra Shastri)                         | |
| | Title / Credentials: वेदाचार्य, पी.एच.डी. (संस्कृत), संपूर्णानंद संस्कृत वि.वि. | |
| | Verification: [✓ Verified Vedic Scholar] | Location: वाराणसी, भारत             | |
| | Bio: ३० वर्षों से अद्वैत वेदांत, उपनिषद एवं भगवद्गीता के भाष्यकार।            | |
| | Social / Academic Links: [ResearchGate] [Academia.edu] [Twitter] [Email]       | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
| AUTHOR STATS RIBBON:                                                              |
| [४२ प्रकाशित शोध लेख] [३ धर्मग्रंथ भाष्य] [१,२००+ श्लोक अनुवाद] [१० लाख+ पाठक]    |
+-----------------------------------------------------------------------------------+
| AUTHOR CONTRIBUTIONS TABS:                                                        |
| [प्रकाशित लेख (Articles)] [शास्त्र भाष्य (Commentaries)] [अनुवाद (Translations)]  |
+-----------------------------------------------------------------------------------+
| PUBLISHED WORKS GRID (3 Columns Desktop, 1 Col Mobile):                           |
|                                                                                   |
| +--------------------+ +--------------------+ +--------------------+              |
| | Article Card 1     | | Article Card 2     | | Commentary Card 3  |              |
| | अद्वैत और क्वांटम  | | ईशावास्योपनिषद सार | | गीता अध्याय २ भाष्य|              |
| | [पढ़ें ➔]          | | [पढ़ें ➔]          | | [पढ़ें ➔]          |              |
| +--------------------+ +--------------------+ +--------------------+              |
+-----------------------------------------------------------------------------------+
| SCHOLARLY INQUIRIES & ACADEMIC CONTACT MODAL TRIGGER                              |
+-----------------------------------------------------------------------------------+
```

#### 8.3.2 Required Components
* `AuthorHeroCard.tsx`: Portrait avatar, academic credentials, Sanskrit degrees, verification badge, and biography.
* `AuthorStatsRibbon.tsx`: Numerical accomplishments (published articles, books, translations).
* `AuthorWorksTabs.tsx`: Filter tabs for articles, scripture commentaries, and translations.
* `AuthorContentGrid.tsx`: CSS Grid rendering cards authored by this scholar.
* `AcademicInquiryModal.tsx`: Contact modal for theological inquiries and conference invitations.

#### 8.3.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/authors/[slug]/page.tsx`):**
  - Table: `authors` joined with `articles` and `scriptures`.
  - Supabase Query:
    ```typescript
    const { data: author } = await supabase
      .from('authors')
      .select(`
        id, name, name_en, slug, bio, credentials, affiliation,
        avatar_url, social_links_json,
        articles (id, title, slug, published_at, reading_time_minutes)
      `)
      .eq('slug', params.slug)
      .single();
    ```
* **Rendering Strategy:** `SSG + ISR` (`revalidate = 86400`).
* **Cache Tags:** `['author', `author:${params.slug}`]`.

#### 8.3.4 SEO Metadata & Structured Data
* **Title Formula:** `[Author Name Hindi] — जीवन परिचय, प्रकाशित लेख एवं ग्रंथ भाष्य | BhaktiLok`
* **Meta Description:** `जानिए [Author Name] का जीवन परिचय, वैदिक योग्यताएं एवं BhaktiLok पर उनके द्वारा रचित संपूर्ण दार्शनिक लेख और शास्त्र भाष्य।`
* **Canonical URL:** `https://bhaktilok.com/authors/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "डॉ. राघवेंद्र शास्त्री",
    "alternateName": "Dr. Raghavendra Shastri",
    "jobTitle": "Vedic Scholar & Professor of Sanskrit",
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "Sampurnanand Sanskrit Vishwavidyalaya, Varanasi"
    },
    "description": "वेदाचार्य एवं अद्वैत वेदांत के प्रमुख भाष्यकार।"
  }
}
```

#### 8.3.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Author avatar centers; stats ribbon displays as a 2x2 grid.
* **Desktop (> 1024px):** Wide format hero card with 3-column articles grid.

#### 8.3.6 Interaction States
* **Tabs Switching:** Instant client-side tab switching without reloading the page.

---

## 9. Utility, Governance & Edge Templates

### 9.1 TEMPLATE 24: SEARCH RESULTS TEMPLATE (`/search`)

#### 9.1.1 Layout Structure (Wireframe Architecture)
The central discovery engine of BhaktiLok, powering full-text, phonetic, and transliterated queries across 12,000+ devotional entities.

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > Search                                                         |
+-----------------------------------------------------------------------------------+
| SEARCH COMMAND INPUT HEADER:                                                      |
| +-------------------------------------------------------------------------------+ |
| | 🔍 [ ram raksha stotra                                           ] [✕ Clear]  | |
| | Transliteration Active: [En -> देवनागरी (राम रक्षा स्तोत्र)]                    | |
| +-------------------------------------------------------------------------------+ |
| Results Summary: "ram raksha stotra" के लिए ४२ परिणाम मिले (Found in 0.04s)      |
+-----------------------------------------------------------------------------------+
| SCOPE FILTER TABS (परिणाम वर्गीकरण):                                              |
| [सभी (४२)] [भजन (१८)] [स्तोत्र व मंत्र (१२)] [ग्रंथ (४)] [मंदिर (२)] [लेख (६)]     |
+-------------------------------------------------------------------+---------------+
| RESULTS STREAM (Highlighted Snippets) (70% Width)                 | FACETS (30%)  |
|                                                                   |               |
| 1. [स्तोत्र] श्री रामरक्षास्तोत्रम् (Shri Ram Raksha Stotram)     | [DEITY]       |
|    बुधकौशिक ऋषि विरचित संपूर्ण रामरक्षा स्तोत्र शुद्ध संस्कृत...   | [✓] श्रीराम(28)|
|    Match: "...चरितं रघुनाथस्य शतकोटिप्रविस्तरम्..."              | [ ] शिव (6)   |
|    [🔊 तुरंत सुनें] [📖 पूरा स्तोत्र पढ़ें ➔]                      | [ ] हनुमान (8)|
|                                                                   |               |
| 2. [भजन] पायो जी मैंने राम रतन धन पायो                            | [LANGUAGE]    |
|    मीराबाई कृत प्रसिद्ध राम भजन देवनागरी लिरिक्स...               | [✓] संस्कृत(16)|
|    [🔊 तुरंत सुनें] [📖 लिरिक्स देखें ➔]                          | [✓] हिंदी (20)|
|                                                                   |               |
| 3. [ग्रंथ श्लोक] वाल्मीकि रामायण - बालकाण्ड श्लोक १.१.१          | [SORT BY]     |
|    तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम्...                    | (•) प्रासंगिकता|
|    [📖 श्लोक व भावार्थ ➔]                                         | ( ) लोकप्रियता|
|                                                                   |               |
| [PAGINATION: 1, 2, 3 ... 5 | Next ➔]                              |               |
+-------------------------------------------------------------------+---------------+
| DID YOU MEAN? SPELLING ALTERNATIVES (e.g., "राम रक्षा स्तोत्रम")                  |
+-----------------------------------------------------------------------------------+
| POPULAR & TRENDING SEARCHES (हनुमान चालीसा, महामृत्युंजय मंत्र, आज का पंचांग)     |
+-----------------------------------------------------------------------------------+
```

#### 9.1.2 Required Components
* `SearchQueryBar.tsx`: Input box with real-time phonetics, auto-suggest dropdown, and clear trigger.
* `ScopeFilterTabs.tsx`: Tabs segregating results by domain with live counts.
* `PolymorphicResultItem.tsx`: Adaptable card showing entity badge, Devanagari title, highlighted search snippet, audio player button, and link.
* `SearchFacetsSidebar.tsx`: Checkboxes for Deity, Language, Content Type, and Sort Order.
* `SpellingSuggestionBanner.tsx`: "क्या आपका मतलब था..." (Did you mean) correction for phonetic mismatches.
* `ZeroResultsFallback.tsx`: Friendly empty state offering popular queries and category links.

#### 9.1.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/search/page.tsx`):**
  - Database Function: PostgreSQL `websearch_to_tsquery` and `pg_trgm` similarity search across `bhajans`, `mantras`, `aartis`, `scriptures`, `temples`.
  - Supabase RPC Query:
    ```typescript
    const { data: results } = await supabase.rpc('global_search', {
      search_term: query,
      filter_category: category || null,
      page_number: page,
      page_size: 20
    });
    ```
* **Rendering Strategy:** `SSR` (Dynamic Server-Side Rendering on request).
* **HTTP Headers:** `Cache-Control: private, no-cache, no-store`.

#### 9.1.4 SEO Metadata & Structured Data
* **Title Formula:** `[Query] — खोज परिणाम | BhaktiLok`
* **Meta Robots:** `noindex, follow` (Prevents index bloat from internal search queries while permitting link traversal).
* **Canonical URL:** `https://bhaktilok.com/search`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "SearchResultsPage",
  "name": "BhaktiLok खोज परिणाम",
  "url": "https://bhaktilok.com/search?q=ram+raksha+stotra"
}
```

#### 9.1.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Scope tabs scroll horizontally; facets accessible via top filter button; snippets highlight matching words in yellow amber.
* **Desktop (> 1024px):** 2-column layout with left search stream and right faceted filter sidebar.

#### 9.1.6 Interaction States
* **Debounced Autocomplete:** Input displays top 5 instant entity matches after 200ms debounce.
* **In-Line Audio Preview:** Clicking "तुरंत सुनें" begins playing audio in the global player without navigating away from search results.

---

### 9.2 TEMPLATE 25: STATIC PAGE TEMPLATES (About, Contact, Policies)

#### 9.2.1 Layout Structure (Wireframe Architecture)
Covers all institutional, trust, legal, and operational pages (`/about-us`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`, `/editorial-policy`).

```
+-----------------------------------------------------------------------------------+
| BREADCRUMB: Home > About Us (हमारे बारे में)                                      |
+-----------------------------------------------------------------------------------+
| STATIC PAGE BANNER:                                                               |
| - Title: हमारे बारे में (About BhaktiLok)                                         |
| - Subtitle: सनातन धर्म, वैदिक संस्कृति एवं डिजिटल साधना का प्रामाणिक मंच         |
| - Last Updated: १५ नवंबर २०२६                                                     |
+-------------------------------------------------------------------+---------------+
| MAIN INSTITUTIONAL CONTENT (72% Width)                            | SIDEBAR (28%) |
|                                                                   |               |
| 1. हमारा ध्येय (Our Mission):                                     | [LEGAL & INFO |
|    प्रामाणिक हिंदू धार्मिक साहित्य को विकृतियों से रहित कर         |  NAVIGATION]  |
|    प्रत्येक श्रद्धालु तक शुद्ध देवनागरी में पहुंचाना...           | - About Us    |
|                                                                   | - Editorial   |
| 2. ई-ई-ए-टी एवं शास्त्र प्रमाण (E-E-A-T & Scholarly Verification):|   Policy      |
|    प्रत्येक मंत्र, श्लोक और कथा की जांच प्रामाणिक विद्वान परिषद   | - Contact Us  |
|    द्वारा की जाती है। गीता प्रेस गोरखपुर एवं चौखंभा...            | - Privacy     |
|                                                                   | - Terms       |
| 3. संपर्क एवं पूछताछ फॉर्म (For /contact):                        | - Disclaimer  |
|    [नाम] [ईमेल] [विषय] [संदेश] [संदेश भेजें ➔]                     |               |
|                                                                   | [TRUST SEALS] |
| 4. कॉपीराइट एवं बौद्धिक संपदा नीति (IP & Fair Use):               | - Verified    |
|    पारंपरिक वैदिक स्तोत्र एवं मंत्र सार्वजनिक डोमेन में हैं...     |   Sanatan NGO |
+-------------------------------------------------------------------+---------------+
| FREQUENTLY ASKED QUESTIONS ABOUT BHAKTILOK FOUNDATION                             |
+-----------------------------------------------------------------------------------+
```

#### 9.2.2 Required Components
* `StaticPageHeader.tsx`: Dignified title, subtitle, and last modified date badge.
* `StaticPageBody.tsx`: Clean typography layout for long-form legal and institutional prose.
* `LegalNavSidebar.tsx`: Sticky navigation links switching between About, Editorial Policy, Contact, Privacy, Terms, and Disclaimer.
* `ContactFormWrapper.tsx`: Accessible contact form with Supabase `contact_messages` table integration, honeypot spam protection, and Turnstile CAPTCHA.
* `TrustBadgesCard.tsx`: Certified organizational registration stamps.

#### 9.2.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/(static)/[slug]/page.tsx`):**
  - Static MDX files in repository or Supabase `articles` table with `category = 'static'`.
* **Rendering Strategy:** `SSG` (Static Site Generation at build time).
* **Cache Control:** Immutable with build-time redeployment.

#### 9.2.4 SEO Metadata & Structured Data
* **Title Formula:** `[Page Title] | BhaktiLok`  
  *(e.g., "हमारे बारे में (About Us) — सनातन धर्म का प्रामाणिक मंच | BhaktiLok")*
* **Meta Description:** `जानिए BhaktiLok का ध्येय, हमारी विद्वत परिषद, संपादकीय नीति और प्रामाणिक सनातन धर्म साहित्य के प्रसार का संकल्प।`
* **Canonical URL:** `https://bhaktilok.com/[slug]`
* **Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About BhaktiLok",
  "url": "https://bhaktilok.com/about-us",
  "publisher": {
    "@type": "Organization",
    "name": "BhaktiLok Foundation"
  }
}
```

#### 9.2.5 Responsive Behavior & Breakpoints
* **Mobile (< 640px):** Sub-navigation displays as an accordion dropdown at the top; contact form inputs expand to 100% width.
* **Desktop (> 1024px):** 2-column layout with left content and right navigation sidebar.

#### 9.2.6 Interaction States
* **Form Submission State:** Instant toast notification upon inquiry submission: *"आपका संदेश प्राप्त हुआ। हमारी विद्वत टीम शीघ्र संपर्क करेगी।"*

---

### 9.3 TEMPLATE 26: ADMIN DASHBOARD TEMPLATE (`/admin` and sub-routes)

#### 9.3.1 Layout Structure (Wireframe Architecture)
The mission-control management interface for content creators, Sanskrit proofreaders, and chief editors.

```
+-----------------------------------------------------------------------------------+
| TOP ADMIN BAR: [BhaktiLok Admin] | [Search CMS ⌘K] | [🔔 Alerts (3)] | [User Profile]|
+-----------------------------------------------------------------------------------+
| SIDEBAR NAVIGATION (240px Width) | MAIN ADMIN WORKSPACE (Fluid Width)             |
|                                  |                                                |
| [DASHBOARD]                      | KPI CARDS:                                     |
| - Overview                       | +--------------+ +--------------+ +----------+ |
|                                  | | 10,232 Total | | 24 Pending   | | 12k Daily| |
| [CONTENT REPOSITORY]             | | Published    | | Review       | | Visitors | |
| - Bhajans Manager                | +--------------+ +--------------+ +----------+ |
| - Mantras & Slokas               |                                                |
| - Aartis & Chalisas              | RECENT ACTIVITY & REVISION AUDIT TRAIL:        |
| - Scriptures & Verses            | +--------------------------------------------+ |
| - Temples Directory              | | Title: Achyutam Keshavam | Action: Updated | |
| - Panchang & Holidays            | | Author: Pandit Radheshyam| Time: 12 min ago| |
|                                  | +--------------------------------------------+ |
| [EDITORIAL GOVERNANCE]           |                                                |
| - Authors & Scholars             | QUICK CONTENT ACTION SHORTCUTS:                |
| - 301 Redirect Engine            | [+ New Bhajan] [+ New Verse] [+ New Temple]    |
| - Media Storage Bucket           |                                                |
|                                  | BILINGUAL RICH TEXT DEVANAGARI EDITOR CANVAS:  |
| [SETTINGS]                       | - Devanagari IME Virtual Keyboard support      |
| - System Health                  | - Sanskrit Diacritics Padachheda parser        |
| - RBAC User Roles                | - Audio LRC Synchronizer tool                  |
+----------------------------------+------------------------------------------------+
```

#### 9.3.2 Required Components
* `AdminSidebar.tsx`: Role-based navigation tree with badge indicators for pending moderation items.
* `AdminHeader.tsx`: Search command bar, system notification bell, active user profile with role badge (`SuperAdmin`, `Editor`, `Scholar`).
* `AdminStatCard.tsx`: Metric indicators for database rows, storage quotas, CDN bandwidth, and daily active visitors.
* `ContentDataTable.tsx`: High-performance TanStack Table with sorting, multi-column filtering, bulk status updates, and CSV export.
* `BilingualDevanagariEditor.tsx`: Specialized TipTap/ProseMirror editor featuring Sanskrit diacritics insertion, Devanagari spellcheck, and verse number autoincrement.
* `LrcTimestampAligner.tsx`: Interactive waveform tool to align audio timestamps with text lines for synchronized karaoke playback.
* `SeoSnippetPreview.tsx`: Real-time Google SERP and WhatsApp snippet preview.

#### 9.3.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/admin/*`):**
  - Supabase client queries with strict RLS enforcement (`auth.uid()` checking `roles.name IN ('admin', 'editor', 'scholar')`).
* **Rendering Strategy:** Dynamic Client Components with Server Actions for mutations.
* **Security & Crawl Directives:** `X-Robots-Tag: noindex, nofollow, noarchive`.

#### 9.3.4 SEO Metadata & Structured Data
* **Title Formula:** `Admin Portal — [Section] | BhaktiLok CMS`
* **Robots Meta:** Strictly `noindex, nofollow`.

#### 9.3.5 Responsive Behavior & Breakpoints
* **Mobile (< 768px):** Sidebar collapses into a slide-over hamburger menu; data tables support horizontal touch-scrolling.
* **Desktop (> 1024px):** Persistent sidebar with split-screen side-by-side editing and preview.

#### 9.3.6 Interaction States
* **Unsaved Changes Warning:** Browser alert prompts user if navigating away while editing without saving.
* **LRC Timestamp Tool:** Devotee editor taps `Spacebar` while audio plays to stamp line timestamps automatically.

---

### 9.4 TEMPLATE 27: 404 / ERROR PAGE TEMPLATE (`src/app/not-found.tsx` and `error.tsx`)

#### 9.4.1 Layout Structure (Wireframe Architecture)
A serene, spiritually comforting recovery room that guides lost devotees back to their devotional path rather than presenting a sterile technical dead-end.

```
+-----------------------------------------------------------------------------------+
| GLOBAL NAVBAR (Logo | Search | Home)                                              |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                   SACRED SERENE ILLUSTRATION (DIYA & TEMPLE BELL)                 |
|                                                                                   |
|                 "यह पृष्ठ सांसारिक मोह की तरह क्षणिक था और विलीन हो गया"           |
|                (The page you seek has merged into the cosmic void)                |
|                                                                                   |
|                            [ त्रुटि कोड: ४०४ (Error 404) ]                         |
|                                                                                   |
|         +---------------------------------------------------------------+         |
|         | 🔍 अपनी आध्यात्मिक खोज यहां लिखें (उदा. हनुमान चालीसा, पंचांग)...|         |
|         +---------------------------------------------------------------+         |
|                                                                                   |
|                      लोकप्रिय एवं पावन तीर्थ द्वार (Quick Portals):                |
|           [🏠 मुख्य पृष्ठ] [🎵 भजन संग्रह] [📖 श्रीमद्भगवद्गीता] [📅 आज का पंचांग]  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
| TRENDING NOW ON BHAKTILOK (शीर्ष पढ़े और सुने जा रहे भक्ति साहित्य - 4 Cards Grid)|
+-----------------------------------------------------------------------------------+
| BROKEN LINK REPORT TRIGGER ("क्या यह लिंक टूटा हुआ है? हमें सूचित करें")           |
+-----------------------------------------------------------------------------------+
| GLOBAL FOOTER                                                                     |
+-----------------------------------------------------------------------------------+
```

#### 9.4.2 Required Components
* `SacredErrorIllustration.tsx`: Gentle vector artwork of an earthen lamp (Diya) with an ambient warm glow.
* `SpiritualErrorMessage.tsx`: Poetic Sanskrit/Hindi contemplative quote on impermanence.
* `RecoverySearchBar.tsx`: Prominent search bar with autofocus.
* `QuickPortalShortcuts.tsx`: Direct golden pill buttons to Homepage, Bhajans, Gita, and Panchang.
* `TrendingDevotionalGrid.tsx`: 4-card grid showcasing the top 4 most visited hymns on the platform.
* `BrokenLinkReporterModal.tsx`: Lightweight modal allowing visitors to report the broken legacy URL for swift 301 redirection.

#### 9.4.3 Data Requirements & Next.js Caching
* **Primary Query (`src/app/not-found.tsx`):**
  - Static layout with client-side search trigger.
  - Trending items fetched from Edge cache (`revalidate = 86400`).
* **HTTP Status Code:** Strictly returns HTTP `404 Not Found` (or `500` for `error.tsx`).

#### 9.4.4 SEO Metadata & Structured Data
* **Title Formula:** `पृष्ठ नहीं मिला (Page Not Found - 404) | BhaktiLok`
* **Robots Meta:** `noindex, nofollow`.

#### 9.4.5 Responsive Behavior & Breakpoints
* **Mobile & Desktop:** Centered spiritual layout with minimum 100vh height.

#### 9.4.6 Interaction States
* **Search Autofocus:** Search input automatically gains focus on desktop viewports.

---

## 10. Cross-Cutting Engineering Matrix & Quality Gates

### 10.1 Component Dependency Tree & Shared UI Primitives

All 27 templates assemble from a cohesive, hierarchical component library adhering to atomic design principles:

```
src/components/
├── primitives/                 # Atomic design tokens
│   ├── Button.tsx              # Golden, Saffron, Ghost, Outline variants
│   ├── Badge.tsx               # Deity, Meter, Shastric classification
│   ├── Input.tsx               # Devanagari font-ready input
│   ├── Modal.tsx               # Accessible dialog with ESC dismissal
│   ├── Tooltip.tsx             # Glossary and padachheda definitions
│   └── Skeleton.tsx            # Zero-CLS layout placeholder
│
├── devotional/                 # Specialized domain components
│   ├── AudioPlayer/            # Persistent & mini audio engine
│   ├── JapaCounter/            # 108 bead simulator & haptic engine
│   ├── SlokaSanctum/           # Sacred calligraphic verse frame
│   ├── LyricsViewer/           # Synchronized auto-scrolling lyrics
│   ├── PanchangMatrix/         # Tithi, Nakshatra, Muhurat tables
│   ├── ScriptureReader/        # Multi-commentary chapter/verse rooms
│   └── DevotionalCard/         # Polymorphic card for Bhajans/Aartis
│
├── layout/                     # Persistent architectural shell
│   ├── TopUtilityBar.tsx       # Tithi, City, Language, Theme
│   ├── Navbar.tsx              # Primary branding & navigation
│   ├── MegaMenu.tsx            # Comprehensive dropdown preview
│   ├── MobileNavDock.tsx       # 5-tab fixed mobile navigation
│   └── GlobalFooter.tsx        # Directory, newsletter, trust marks
│
└── seo/                        # Search & metadata injectors
    ├── BreadcrumbNav.tsx       # Schema.org BreadcrumbList generator
    ├── JsonLdScript.tsx        # Type-safe structured data injector
    └── SocialShareModal.tsx    # WhatsApp quote card canvas generator
```

---

### 10.2 Next.js 16 App Router File Tree Mapping

The complete directory structure of the Next.js App Router codebase mapping to all 27 specified templates:

```
src/app/
├── layout.tsx                                    # Master Global Shell
├── page.tsx                                      # Template 1: Homepage
├── not-found.tsx                                 # Template 27: 404 Error Room
├── error.tsx                                     # Template 27: 500 Server Error
│
├── (devotional)/
│   ├── bhajan/
│   │   ├── page.tsx                              # Template 2: Content Listing
│   │   └── [slug]/page.tsx                       # Template 3: Bhajan Detail
│   ├── mantra/
│   │   ├── page.tsx                              # Template 2: Content Listing
│   │   └── [slug]/page.tsx                       # Template 4: Mantra Detail
│   ├── aarti/
│   │   ├── page.tsx                              # Template 2: Content Listing
│   │   └── [slug]/page.tsx                       # Template 5: Aarti Detail
│   ├── chalisa/
│   │   ├── page.tsx                              # Template 2: Content Listing
│   │   └── [slug]/page.tsx                       # Template 6: Chalisa Detail
│   └── katha/
│       ├── page.tsx                              # Template 2: Content Listing
│       └── [slug]/page.tsx                       # Template 7: Katha Detail
│
├── granth/
│   ├── page.tsx                                  # Template 8: Scripture Library
│   └── [scriptureSlug]/
│       ├── page.tsx                              # Scripture Hub Overview
│       └── [chapterSlug]/
│           ├── page.tsx                          # Template 9: Scripture Chapter
│           └── [verseSlug]/page.tsx              # Template 10: Scripture Verse
│
├── panchang/
│   ├── page.tsx                                  # Template 11: Panchang (Today)
│   ├── [date]/page.tsx                           # Template 11: Panchang (By Date)
│   └── [city]/[date]/page.tsx                    # Template 11: Panchang (By City/Date)
│
├── festivals/
│   ├── page.tsx                                  # Template 12: Festival Listing
│   ├── [slug]/page.tsx                           # Template 13: Festival Evergreen
│   └── [year]/[slug]/page.tsx                    # Template 13: Festival Year-Specific
│
├── mandir/
│   ├── page.tsx                                  # Template 14: Temple Listing
│   └── [slug]/page.tsx                           # Template 15: Temple Detail
│
├── encyclopedia/
│   ├── page.tsx                                  # Template 16: Encyclopedia Listing
│   └── [slug]/page.tsx                           # Template 17: Encyclopedia Entry
│
├── rashifal/
│   ├── page.tsx                                  # Template 18: Rashifal Hub
│   └── [rashi]/page.tsx                          # Template 18: Rashi Detail
│
├── tools/
│   ├── page.tsx                                  # Template 19: Tools Directory
│   └── [slug]/page.tsx                           # Template 20: Tool Detail
│
├── articles/
│   ├── page.tsx                                  # Template 21: Article Listing
│   └── [slug]/page.tsx                           # Template 22: Article Detail
│
├── authors/
│   └── [slug]/page.tsx                           # Template 23: Author Profile
│
├── search/
│   └── page.tsx                                  # Template 24: Search Results
│
├── (static)/
│   └── [slug]/page.tsx                           # Template 25: Static Pages
│
└── admin/
    ├── layout.tsx                                # Template 26: Admin Shell
    ├── page.tsx                                  # Template 26: Admin Dashboard
    └── [section]/page.tsx                        # Template 26: Content CRUD
```

---

### 10.3 Core Web Vitals & Rendering Strategy Performance Budget

To ensure sub-second page delivery across Tier-2 and Tier-3 Indian mobile networks (4G/5G), all templates must pass the following performance budget:

| Core Web Vital Metric | Target SLA | Strategy & Engineering Rule |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | `< 1.2s` | Pre-render Devanagari web fonts (`next/font`); prioritize sacred hero image with `priority={true}` and `fetchpriority="high"`. |
| **Interaction to Next Paint (INP)** | `< 150ms` | Decouple heavy audio and bead animations using CSS hardware acceleration (`transform: translate3d`) and `requestAnimationFrame`. |
| **Cumulative Layout Shift (CLS)** | `0.00` | Hardcode aspect ratios on all temple thumbnails and devotional video embeds; mirror exact skeleton dimensions. |
| **Time to First Byte (TTFB)** | `< 400ms` | Edge CDN caching via Vercel Edge Network / Cloudflare Workers; aggressive ISR pre-warming. |

---

### 10.4 Accessibility (WCAG 2.1 AA) & Devanagari Readability Matrix

1. **High-Contrast Devanagari Text:** Body text contrast ratio must maintain a minimum of `7:1` against light parchment (`#FAF6ED`) and `9:1` against Vedic midnight dark mode (`#0D0E12`).
2. **Screen Reader Pronunciation:** Use `lang="sa"` for Sanskrit verses and `lang="hi"` for Hindi prose, allowing speech synthesizers to parse ligatures accurately.
3. **Keyboard Accessibility:** All interactive elements (audio play buttons, Japa tap pads, commentary tabs) must feature visible `:focus-visible` golden focus rings and full keyboard event listeners (`Space`, `Enter`, `ArrowKeys`).
4. **Touch Target Size:** All touch targets on mobile viewports must measure at least `48x48px` with minimum `8px` spacing to facilitate elderly devotees.

---
**End of Specification — BhaktiLok Page Template Specification (BL-SPEC-04)**
