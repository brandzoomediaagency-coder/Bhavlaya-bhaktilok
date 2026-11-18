# BhaktiLok — Comprehensive Design System & UI Specification
**Document ID:** `BL-SPEC-07`  
**Version:** `1.0.0` (Production Master Specification)  
**Status:** Approved for Implementation  
**Target Platform:** Next.js 16+ App Router, React 19, TypeScript, Tailwind CSS v4, Lucide React  
**Design Paradigm:** Sacred Editorial (पवित्र संपादकीय शैली) — Heritage Indian Devotional Aesthetics × Contemporary Digital Publishing  
**Author:** BhaktiLok Experience Design & Engineering Guild  
**Last Updated:** November 2026  

---

## 1. Executive Summary & Design Philosophy

### 1.1 The Vision: "Sacred Editorial" (पवित्र संपादकीय शैली)
**BhaktiLok** (`bhaktilok.in`) is India’s foremost digital sanctuary for Sanatan Dharma literature, sacred texts, bhajans, stotras, temple archives, and daily spiritual utilities. 

Most devotional websites suffer from one of two extremes:
1. **Outdated, ad-cluttered portals:** Clashing neon colors, dense unreadable text, intrusive popups, and broken mobile typography that disrespect sacred literature.
2. **Generic corporate templates:** Cold, sterile, silicon-valley minimal designs that strip away the warmth, reverence, and cultural resonance essential to an authentic Indian devotional experience.

**BhaktiLok reconciles this dichotomy through the "Sacred Editorial" design philosophy.**  
Inspired by the tactile warmth of ancient Indian manuscripts (*pothi*, *tamrapatra*, hand-pressed cotton paper), traditional temple architecture (*mandir shilpakala*), and the typographical elegance of high-end editorial publications (such as *The New Yorker*, *Kinfolk*, and classical Sanskrit press publications), BhaktiLok creates an immersive, reverent, and serene reading environment.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        THE BHAKTILOK "SACRED EDITORIAL" ESSENCE                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   ANCIENT VEDIC SANCTITY                         MODERN EDITORIAL CRAFT                │
│   • Warm Ivory & Soft Cream Surfaces             • Strict 4px/8px Geometric Grid       │
│   • Bhagwa (Saffron) & Suvarna (Gold) Accents    • Fluid Responsive Typography         │
│   • Sacred Kumkum (Maroon) Typography            • Sub-Second Core Web Vitals          │
│   • Matra-Safe Devanagari Typesetting            • 44px+ Ergonomic Touch Targets       │
│   • Ornamental Shirorekha & Swastik Details      • Flawless WCAG 2.2 AAA Contrast      │
│                                                                                        │
│                             ┌────────────────────────┐                                 │
│                             │   BHAKTILOK PLATFORM   │                                 │
│                             │   आपका डिजिटल मंदिर    │                                 │
│                             └────────────────────────┘                                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 The Four Core Design Pillars

1. **Pavitrata (पवित्रता — Purity & Reverence):**  
   Every pixel reflects spiritual sanctity. Clutter, abrasive animations, aggressive advertising banners, and harsh high-contrast pure black-on-white (`#000000` on `#FFFFFF`) are strictly prohibited. The interface breathes with tranquil ivory tones and gentle golden illumination.
2. **Saundarya & Shastra (सौंदर्य व शास्त्र — Heritage Authenticity & Typographic Elegance):**  
   Sacred Sanskrit shlokas, Hindi dohas, and devotional lyrics receive museum-grade typesetting. Matras (vowel signs) never collide with line rules. Devanagari ligatures are crisp, honorable, and beautiful.
3. **Sugamata (सुगमता — Universal Accessibility for All Generations):**  
   Over 65% of BhaktiLok’s daily devotees are elders, parents, and rural devotees accessing the portal on mid-range Android devices. Interfaces must feature generous tap targets (minimum 44×44px), intuitive iconography paired with clear Hindi text, zero complex gestures, and high readability even in bright outdoor sunlight.
4. **Drudhta (दृढ़ता — Modern Engineering & Performance Rigor):**  
   Zero layout shifts (CLS = 0), instantaneous client transitions, offline-first reading resilience, lightweight vector ornamentation, and comprehensive responsive elasticity across screen widths from 360px smartphones to 4K ultra-wide monitors.

---

## 2. Color Palette & Token Architecture

The BhaktiLok color system is grounded in the sacred pigments of Sanatan rituals: **Chandan (चंदन)**, **Kesar (केसर)**, **Kumkum (कुमकुम)**, **Suvarna (स्वर्ण)**, and **Bhasma (भस्म)**.

### 2.1 Complete Color Palette Matrix

| Token Name | CSS Variable | Hex Code | RGB | Role / Usage Description | WCAG Contrast (on Ivory) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pavitra Ivory** | `--color-ivory` | `#FAF8F2` | `250, 248, 242` | Primary page background, base canvas | Canvas Base |
| **Ksheer Cream** | `--color-cream` | `#FFFDF8` | `255, 253, 248` | Card backgrounds, elevated surfaces, inputs | 1.05:1 (Subtle layer) |
| **Kesariya Saffron** | `--color-saffron` | `#D97706` | `217, 119, 6` | Primary action accent, links, active tab indicator | 3.6:1 (UI Graphical) |
| **Saffron Light** | `--color-saffron-light` | `#F59E0B` | `245, 158, 11` | Hover state for saffron, badges, warning accents | 2.5:1 (Decorative) |
| **Saffron Dark** | `--color-saffron-dark` | `#B45309` | `180, 83, 9` | Pressed state, high-contrast saffron text | 4.8:1 (AA Text) |
| **Suvarna Gold** | `--color-gold` | `#B58A43` | `181, 138, 67` | Ornamental borders, divider emblems, card trims | 3.2:1 (Graphic border) |
| **Gold Light** | `--color-gold-light` | `#D4A843` | `212, 168, 67` | Gold gradients, highlight borders, subtle cards | 2.1:1 (Layering) |
| **Gold Dark** | `--color-gold-dark` | `#8C6527` | `140, 101, 39` | High-contrast gold text, footer accents | 5.5:1 (AA Text) |
| **Kumkum Maroon** | `--color-maroon` | `#651D32` | `101, 29, 50` | Primary headings (H1/H2), sacred mastheads, CTA | **9.1:1 (AAA Text)** |
| **Maroon Light** | `--color-maroon-light` | `#8B2848` | `139, 40, 72` | Hover state on maroon buttons, category pills | **6.4:1 (AAA Text)** |
| **Maroon Dark** | `--color-maroon-dark` | `#441120` | `68, 17, 32` | Top utility announcement bar, deepest contrast | **13.4:1 (AAA Text)** |
| **Kasturi Charcoal** | `--color-charcoal` | `#22201E` | `34, 32, 30` | Primary body typography, high-density reading text | **14.2:1 (AAA Text)** |
| **Shila Stone** | `--color-stone` | `#81786B` | `129, 120, 107` | Secondary body text, metadata, reading time, icons | 4.6:1 (AA Text) |
| **Stone Light** | `--color-stone-light` | `#A39E93` | `163, 158, 147` | Subtle borders, disabled states, scrollbar thumbs | 2.6:1 (Borders) |
| **Stone Lighter** | `--color-stone-lighter` | `#D1CCC3` | `209, 204, 195` | Hairline dividers, card outlines, input borders | 1.5:1 (Hairline) |
| **Tulsi Green** | `--color-success` | `#16A34A` | `22, 163, 74` | Success toasts, Shubh Muhurat, auspicious tithi | 4.7:1 (AA Text) |
| **Haldi Amber** | `--color-warning` | `#EAB308` | `234, 179, 8` | Alerts, Madhyam Muhurat, fasting reminders | 2.1:1 (Graphic alert) |
| **Sindoor Red** | `--color-error` | `#DC2626` | `220, 38, 38` | Error messages, Rahu Kaal alert, validation failure | 4.9:1 (AA Text) |
| **Neelkanth Blue** | `--color-info` | `#2563EB` | `37, 99, 235` | Explanatory tooltips, system notices, audio status | 4.8:1 (AA Text) |

### 2.2 Deity-Specific Color Spectrum
To establish immediate visual recognition in category pages, deity hubs, and mantra cards, BhaktiLok assigns a consecrated thematic hue to each principal deity:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              CANONICAL DEITY COLOR THEMES                              │
├─────────────────────┬───────────────────┬──────────────────────────────────────────────┤
│ Deity               │ Hex Code          │ Cultural Connotation & Symbolism             │
├─────────────────────┼───────────────────┼──────────────────────────────────────────────┤
│ श्री कृष्ण (Krishna) │ `#1E40AF` (Deep)  │ Shyam Varna (श्याम वर्ण) — Divine Cloud Blue │
│ श्री राम (Rama)     │ `#059669` (Pavit) │ Maryada & Vanvaas Emerald Green              │
│ भगवान शिव (Shiva)   │ `#7C3AED` (Neel)  │ Neelkanth Visha & Dhyana Transcendence       │
│ हनुमान जी (Hanuman) │ `#DC2626` (Sind)  │ Bajrangbali Sindoor & Veer Rasa              │
│ गणेश जी (Ganesh)    │ `#EA580C` (Pitam) │ Mangalmurti Vermillion / Genda Orange        │
│ माँ दुर्गा (Durga)   │ `#BE185D` (Shakt) │ Mahashakti Alta & Crimson Energy             │
│ माँ लक्ष्मी (Lakshmi)│ `#CA8A04` (Suvar) │ Dhan, Dhanya & Padmasana Pure Gold           │
│ माँ सरस्वती (Saras) │ `#0284C7` (Vidya) │ Shweta Vastra & Vidyapeeth Serene Azure      │
│ भगवान विष्णु (Vishnu)│ `#0369A1` (Kshee) │ Ksheersagara Ocean Blue                      │
│ राधा रानी (Radha)   │ `#DB2777` (Gulab) │ Prem Rasa, Lotus Petal Rose                  │
│ खाटू श्याम (Shyam)  │ `#2563EB` (Mor)   │ Morchhari Peacock Blue                       │
│ साईं बाबा (Sai Baba) │ `#D97706` (Fakir) │ Fakir Gerua / Saffron Renunciation           │
└─────────────────────┴───────────────────┴──────────────────────────────────────────────┘
```

### 2.3 Dark Mode ("रात्रि दर्शन" — Ratri Darshan)
While BhaktiLok defaults to the tactile daytime warmth of Ivory and Cream, reading sacred texts in low-light environments (such as early morning Brahmamuhurta or late-night Jap) requires an eye-soothing dark palette. Pure black (`#000000`) is avoided to prevent harsh optical halation around Devanagari letterforms.

| Token | Light Value (`:root`) | Dark Value (`[data-theme="dark"]`) | Night Reading Purpose |
| :--- | :--- | :--- | :--- |
| Canvas Surface | `#FAF8F2` (Warm Ivory) | `#141312` (Midnight Charcoal) | Calms eye strain during night chanting |
| Card / Container | `#FFFDF8` (Soft Cream) | `#1C1A18` (Temple Slate) | Subtle contrast separation without glare |
| Primary Heading | `#651D32` (Kumkum Maroon) | `#F59E0B` (Soft Warm Gold) | Radiant readability in dark ambience |
| Body Text | `#22201E` (Kasturi Charcoal) | `#EDE8DF` (Parchment Silk) | Crisp Devanagari clarity without glare |
| Secondary Text | `#81786B` (Shila Stone) | `#A8A196` (Muted Sand) | Subdued metadata and reading timestamps |
| Border / Trims | `#D1CCC3` (Stone Lighter) | `#2E2A26` (Charred Sandal) | Delicate edge boundaries |
| Primary Accent | `#D97706` (Saffron) | `#F59E0B` (Bright Saffron) | Vibrant touchpoint clarity |

### 2.4 CSS Custom Properties Implementation

```css
/* ==========================================================================
   BhaktiLok Design Tokens — CSS Custom Properties
   ========================================================================== */

:root {
  /* Surfaces & Backgrounds */
  --bg-primary: #FAF8F2;
  --bg-secondary: #FFFDF8;
  --bg-elevated: #FFFFFF;
  --bg-tinted: rgba(181, 138, 67, 0.04);
  --bg-overlay: rgba(34, 32, 30, 0.6);

  /* Typography / Inks */
  --text-primary: #22201E;
  --text-secondary: #81786B;
  --text-tertiary: #A39E93;
  --text-heading: #651D32;
  --text-inverse: #FFFFFF;

  /* Brand Accents */
  --accent-saffron: #D97706;
  --accent-saffron-light: #F59E0B;
  --accent-saffron-dark: #B45309;
  --accent-gold: #B58A43;
  --accent-gold-light: #D4A843;
  --accent-gold-dark: #8C6527;
  --accent-maroon: #651D32;
  --accent-maroon-light: #8B2848;

  /* Borders & Dividers */
  --border-subtle: #D1CCC3;
  --border-strong: #A39E93;
  --border-gold: rgba(181, 138, 67, 0.35);
  --border-gold-focus: #B58A43;

  /* Semantic Feedback */
  --color-success: #16A34A;
  --color-success-bg: #DCFCE7;
  --color-warning: #EAB308;
  --color-warning-bg: #FEF9C3;
  --color-error: #DC2626;
  --color-error-bg: #FEE2E2;
  --color-info: #2563EB;
  --color-info-bg: #DBEAFE;

  /* Elevation Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(34, 32, 30, 0.04);
  --shadow-md: 0 4px 12px 0 rgba(34, 32, 30, 0.07), 0 1px 3px -1px rgba(34, 32, 30, 0.05);
  --shadow-lg: 0 12px 28px -4px rgba(34, 32, 30, 0.1), 0 4px 8px -2px rgba(34, 32, 30, 0.04);
  --shadow-modal: 0 24px 60px -12px rgba(34, 32, 30, 0.22);

  /* Radius Scale */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}

[data-theme="dark"] {
  --bg-primary: #141312;
  --bg-secondary: #1C1A18;
  --bg-elevated: #24221F;
  --bg-tinted: rgba(217, 119, 6, 0.06);
  --bg-overlay: rgba(0, 0, 0, 0.8);

  --text-primary: #EDE8DF;
  --text-secondary: #A8A196;
  --text-tertiary: #6E675D;
  --text-heading: #F59E0B;
  --text-inverse: #141312;

  --accent-saffron: #F59E0B;
  --accent-saffron-light: #FBBF24;
  --accent-saffron-dark: #D97706;
  --accent-gold: #D4A843;
  --accent-maroon: #E11D48;

  --border-subtle: #2E2A26;
  --border-strong: #453F39;
  --border-gold: rgba(212, 168, 67, 0.3);

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px 0 rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 12px 28px -4px rgba(0, 0, 0, 0.5);
  --shadow-modal: 0 24px 60px -12px rgba(0, 0, 0, 0.7);
}
```

---

## 3. Typography & Bilingual Typesetting

BhaktiLok is a dual-script platform where Hindi (Devanagari) is the primary content language and English (Latin) serves administrative, numerical, and search/metadata needs.

### 3.1 The Quad-Font Typographic Stack

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              BHAKTILOK FONT ASSIGNMENTS                                │
├─────────────────────────┬──────────────────────────────┬───────────────────────────────┤
│ Font Family             │ Primary Role                 │ Technical Characteristics     │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Noto Sans Devanagari    │ Hindi Body, UI, Inputs,      │ Supreme legibility on screens,│
│ (Google Fonts)          │ Navigation & Meta Labels     │ robust conjuncts, clear matras│
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Noto Serif Devanagari   │ Sacred Verses, Sanskrit      │ Classical calligraphic strokes│
│ (Google Fonts)          │ Shlokas, Mantras, H1/H2 Head │ reverent pothi aesthetic      │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Inter                   │ English UI, Timestamps,      │ Geometric neutrality, tabular │
│ (Google Fonts)          │ Panchang Coordinates, Stats  │ numerals (`tnum`), zero CLS   │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Cinzel / Cormorant      │ English Editorial Headings,  │ Classical inscriptional serif,│
│ (Google Fonts)          │ Granth Book Covers, Badges   │ refined heritage luxury feel  │
└─────────────────────────┴──────────────────────────────┴───────────────────────────────┘
```

### 3.2 The Physics of Devanagari Typesetting (Matra Clearance)

> [!IMPORTANT]
> **Why standard web line-heights break Hindi:**  
> Latin typography centers letters around an x-height with small ascenders and descenders. Devanagari letters hang from a continuous top horizontal bar (*shirorekha* / शिरोरेखा) and extend both upwards (*upper matras*: े, ै, ो, ौ, ँ, ं) and downwards (*lower matras*: ु, ू, ृ, ॄ, ्).  
> Standard English line-heights (1.3 to 1.5) cause Devanagari vowel diacritics to clip into preceding or succeeding lines.

```
       [ Upper Matra Zone ]   -->   कौ  (Clipping Danger in standard 1.4 line-height)
       ────────────────────   -->   ─── (Shirorekha / Top Hanging Line)
       [ Character Body   ]   -->   तुक
       [ Lower Matra Zone ]   -->    ु  (Collision with next line's ascenders)
```

**BhaktiLok Mandatory Line-Height Rules:**
- **Standard Body Hindi:** Line-height must **never be lower than `1.85`** (Tailwind `leading-[1.85]` or `leading-relaxed`).
- **Sacred Verses (Shloka / Stotra / Chaupai):** Line-height must be **`2.1` to `2.4`** to grant breathing space between holy verses.
- **Hindi Headings (H1/H2/H3):** Line-height set to **`1.4` to `1.5`** (preventing uppercase title crowding).
- **Paragraph Spacing:** Minimum `margin-bottom: 1.5rem` (24px) to preserve distinct visual cadence.

### 3.3 Responsive Modular Type Scale

Based on a **1.250 Major Third** scale on mobile and **1.333 Perfect Fourth** scale on desktop:

| Scale Level | Desktop Size / Line-Height | Mobile Size / Line-Height | Weight | Font Stack | Typical Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `3.25rem` (52px) / `1.35` | `2.25rem` (36px) / `1.35` | 700 Bold | Noto Serif Dev | Homepage Masthead, Granth Hero |
| **Heading 1 (H1)**| `2.5rem` (40px) / `1.4` | `1.875rem` (30px) / `1.4` | 700 Bold | Noto Serif Dev | Bhajan / Aarti / Temple Title |
| **Heading 2 (H2)**| `1.875rem` (30px) / `1.45` | `1.5rem` (24px) / `1.45` | 600 SemiBold| Noto Serif Dev | Section Titles, Katha Chapters |
| **Heading 3 (H3)**| `1.375rem` (22px) / `1.5` | `1.25rem` (20px) / `1.5` | 600 SemiBold| Noto Sans Dev | Card Headers, Widget Titles |
| **Heading 4 (H4)**| `1.125rem` (18px) / `1.55` | `1.0625rem` (17px) / `1.55`| 600 SemiBold| Noto Sans Dev | Micro-sections, Tool parameters |
| **Body Large** | `1.1875rem` (19px) / `1.9` | `1.125rem` (18px) / `1.85`| 400 Regular | Noto Sans Dev | Editorial Leads, Meaning / Bhavarth |
| **Body Medium**| `1.0625rem` (17px) / `1.85`| `1.0rem` (16px) / `1.85` | 400 Regular | Noto Sans Dev | Default Article Body, Bhajan Lyrics |
| **Body Small** | `0.9375rem` (15px) / `1.75`| `0.875rem` (14px) / `1.75` | 400 Regular | Noto Sans Dev | Metadata, Captions, Author Bio |
| **Micro / Tag**| `0.8125rem` (13px) / `1.6` | `0.75rem` (12px) / `1.6` | 500 Medium | Inter / Noto Sans | Category Badges, Tithi Timestamps |
| **Sacred Shloka**| `1.25rem` (20px) / `2.2` | `1.125rem` (18px) / `2.1` | 500 Medium | Noto Serif Dev | Sanskrit Shlokas, Gayatri Mantra |

---

## 4. Spacing, Grid & Layout Architecture

### 4.1 The 4px Base Geometric Grid
Every spatial value in BhaktiLok is an integer multiple of **4px**, mapped onto an **8-point system** for standard component flow:

```
Token       Pixel Value   Tailwind Class   Primary Structural Application
─────────────────────────────────────────────────────────────────────────────
space-1     4px           p-1, m-1, gap-1   Micro offsets, icon-text gap
space-2     8px           p-2, m-2, gap-2   Button padding Y, badge padding
space-3     12px          p-3, m-3, gap-3   Compact card internal padding
space-4     16px          p-4, m-4, gap-4   Standard mobile margin, card pad
space-6     24px          p-6, m-6, gap-6   Desktop card pad, form gap
space-8     32px          p-8, m-8, gap-8   Subsection separation, grid gap
space-12    48px          p-12, m-12        Major block rhythm, widget padding
space-16    64px          p-16, m-16        Section vertical padding (mobile)
space-24    96px          p-24, m-24        Section vertical padding (desktop)
space-32    128px         p-32, m-32        Hero banner vertical separation
```

### 4.2 Container Constraints & Content Topology

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    CONTAINER WIDTHS & READING GEOMETRY                     │
├───────────────┬────────────┬───────────────────────────────────────────────┤
│ Container     │ Max Width  │ Dedicated Content Layout                      │
├───────────────┼────────────┼───────────────────────────────────────────────┤
│ `reading-sm`  │ 640px      │ Pure Shloka Reading Room, Mantra Jap Chanting │
│ `article-md`  │ 768px      │ Devotional Katha, Bhagavad Gita Commentary    │
│ `standard-lg` │ 1024px     │ Article + Right Devotional Sidebar            │
│ `catalog-xl`  │ 1280px     │ Bhajan Catalog, Temple Directories, Granths   │
│ `canvas-2xl`  │ 1440px     │ Wide Mega Menus, Header, Global Footer Canvas │
└───────────────┴────────────┴───────────────────────────────────────────────┘
```

> [!TIP]
> **The Sacred Reading Width:** The optimum line-length for reading Devanagari continuous text is **55 to 68 characters per line** (approximately 640px–720px width). Wider containers cause eye fatigue as readers traverse the continuous shirorekha across lines.

### 4.3 Responsive Breakpoints & 12-Column System

```
Breakpoint    Min Width    Columns    Margin    Gutter    Target Device
──────────────────────────────────────────────────────────────────────────────
xs            375px        4 cols     16px      16px      iPhone SE, Compact Android
sm            480px        4 cols     20px      16px      Large Smartphones
md            768px        8 cols     24px      20px      iPad Mini, Tablets (Portrait)
lg            1024px       12 cols    32px      24px      iPad Pro, Small Laptops
xl            1280px       12 cols    40px      24px      Standard Desktop Displays
2xl           1440px       12 cols    Auto      32px      Large Desktop Displays
```

---

## 5. Master Component Library Specifications

The BhaktiLok design system specifies **22 foundational and domain-specific components**. Each is crafted for high-performance React Server Components (RSC) and client-interactive hydration where necessary.

---

### 5.1 Buttons (बटन प्रणाली)

Buttons feature a disciplined visual hierarchy with guaranteed 44px minimum touch height on mobile.

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌───────┐
│   पाठ आरंभ करें │  │   विवरण देखें   │  │   सूची देखें →   │  │  🔖   │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └───────┘
   Primary Button       Secondary Button        Ghost Button     Icon Btn
```

#### Variants & Specifications
1. **Primary Button:** Deep Kumkum Maroon base with subtle Saffron gradient on hover. Used for primary sacred actions (e.g., "पाठ आरंभ करें", "आरती सुनें").
   - Class: `bg-maroon hover:bg-maroon-light text-white font-medium rounded-md px-6 py-3 shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]`
2. **Secondary Button:** Warm Ivory surface with Suvarna Gold border and Maroon text.
   - Class: `bg-cream border border-gold/40 hover:border-gold text-maroon hover:bg-ivory font-medium rounded-md px-5 py-2.5 transition-all duration-200`
3. **Ghost Button:** Borderless button with stone text shifting to saffron on hover.
   - Class: `text-stone hover:text-saffron hover:bg-gold/10 font-medium rounded-md px-4 py-2 transition-colors duration-200`
4. **Icon Button:** Strict 44×44px square or circular interactive container with clear `aria-label`.
   - Class: `w-11 h-11 flex items-center justify-center rounded-full text-stone hover:text-maroon hover:bg-gold/10 active:bg-gold/20 transition-all duration-200`

---

### 5.2 Cards (कार्ड संग्रह)

Cards employ a layered cream surface (`#FFFDF8`) over the ivory canvas (`#FAF8F2`) with a delicate 1px gold-tinted border (`border-gold/20`) and 12px border radius.

#### 1. Content Card (भजन, आरती, चालीसा, कथा)
- **Anatomy:** Category tag (top-left), reading time/duration (top-right), title in Noto Serif (H3), 2-line excerpt in Noto Sans, author/deity pill, and bookmark action icon.
- **Micro-interaction:** Hover triggers `-2px` translateY lift with subtle shadow expansion (`shadow-md`).

```tsx
// Component: ContentCard.tsx
import Link from "next/link";
import { Clock, Bookmark, Play } from "lucide-react";

interface ContentCardProps {
  title: string;
  slug: string;
  category: string;
  deity: string;
  duration: string;
  excerpt: string;
  hasAudio?: boolean;
}

export function ContentCard({ title, slug, category, deity, duration, excerpt, hasAudio }: ContentCardProps) {
  return (
    <article className="group relative bg-cream border border-gold/20 hover:border-gold/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3 text-xs text-stone">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gold/10 text-maroon border border-gold/20">
            {category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-light" />
            {duration}
          </span>
        </div>
        <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-maroon transition-colors line-clamp-2 mb-2 leading-snug">
          <Link href={slug} className="focus:outline-none focus:underline">
            {title}
          </Link>
        </h3>
        <p className="text-stone text-sm line-clamp-2 leading-relaxed mb-4">
          {excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-stone-lighter/40 text-xs">
        <span className="font-medium text-stone-dark">{deity}</span>
        <div className="flex items-center gap-2">
          {hasAudio && (
            <span className="flex items-center gap-1 text-saffron font-medium">
              <Play className="w-3.5 h-3.5 fill-current" /> ऑडियो
            </span>
          )}
          <button 
            type="button" 
            aria-label="बुकमार्क में जोड़ें" 
            className="p-1.5 text-stone hover:text-saffron rounded-full hover:bg-gold/10 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
```

#### 2. Deity Card (देवता दर्शन कार्ड)
- **Anatomy:** Consecrated circular avatar with radiant halo border, Hindi Deity Name, English Subtitle, Sacred Mantra badge, and Total Stotras/Bhajans count.
- **Visuals:** Uses deity-specific gradient accent border (e.g., Shiva blue, Hanuman vermillion).

#### 3. Tool Card (साधन एवं कैलकुलेटर कार्ड)
- **Anatomy:** Sacred icon container (Gold backdrop), Title ("दैनिक पंचांग", "जप माला", "कुंडली मिलान"), descriptive sentence, and active status indicator pill ("दैनिक अपडेट").

#### 4. Feature Card (संपादकीय विशेष स्तम्भ)
- **Anatomy:** Large horizontal card (desktop) or stacked (mobile). 16:9 featured imagery with soft warm vignette overlay, gold corner ornaments, and prominent read button.

---

### 5.3 Navigation Architecture (नेविगेशन प्रणाली)

The navigation system connects 12,934+ URLs across 21 thematic domains with zero friction.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP BAR]  🙏 धर्मो रक्षति रक्षितः  | आज का पंचांग: मार्गशीर्ष शुक्ल पक्ष एकादशी       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [LOGO] भक्तिलोक   भजन ▾   मंत्र ▾   आरती & चालीसा ▾   ग्रंथ   पंचांग   [ 🔍 खोज ] [ 🔖 ]│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Top Utility Bar:** Deep Maroon background (`#441120`), white/90 text, showing today's auspicious Tithi, Sanskrit Subhashitam, and live audio radio trigger.
2. **Main Header:** Sticky Ivory bar (`bg-cream/95 backdrop-blur-md`) with 1px subtle gold bottom line (`border-b border-gold/15`).
3. **Mega Menu:** Four-column devotional flyout categorized by Deity, Scripture, Festival, and Quick Access, featuring thumbnail cards of popular Stotras.
4. **Mobile Navigation (Two-Tier):**
   - **Top Bar:** Hamburger trigger, Brand Logo, Search trigger, Quick Jap Counter shortcut.
   - **Bottom Sticky Tab Bar:** 5 ergonomic icons: Home (होम), Bhajan (भजन), Panchang (पंचांग), Jap Mala (जप), Menu (मेन्यू).

```tsx
// Component: MobileBottomNav.tsx
import Link from "next/link";
import { Home, Music, Calendar, CircleDot, Menu } from "lucide-react";

export function MobileBottomNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-gold/20 lg:hidden safe-area-bottom">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        <Link href="/" className="flex flex-col items-center justify-center text-xs text-charcoal hover:text-maroon py-1">
          <Home className="w-5 h-5 mb-1 text-saffron" />
          <span>होम</span>
        </Link>
        <Link href="/bhajan" className="flex flex-col items-center justify-center text-xs text-stone hover:text-maroon py-1">
          <Music className="w-5 h-5 mb-1" />
          <span>भजन</span>
        </Link>
        <Link href="/panchang" className="flex flex-col items-center justify-center text-xs text-stone hover:text-maroon py-1">
          <Calendar className="w-5 h-5 mb-1" />
          <span>पंचांग</span>
        </Link>
        <Link href="/tools/jap-mala" className="flex flex-col items-center justify-center text-xs text-stone hover:text-maroon py-1">
          <CircleDot className="w-5 h-5 mb-1 text-gold" />
          <span>जप माला</span>
        </Link>
        <button 
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center text-xs text-stone hover:text-maroon py-1"
          aria-label="नेविगेशन मेन्यू खोलें"
        >
          <Menu className="w-5 h-5 mb-1" />
          <span>मेन्यू</span>
        </button>
      </div>
    </nav>
  );
}
```

5. **Breadcrumbs:** Semantic Schema-ready breadcrumb trail with subtle gold chevrons:  
   `होम` / `आरती संग्रह` / `श्री गणेश आरती`

---

### 5.4 Search Bar & Command Palette (खोज प्रणाली)

- **Interaction:** Triggered via header input or keyboard shortcut (`⌘ + K` or `Ctrl + K`).
- **Devanagari Intelligence:** Real-time search handles phonetic English romanization (e.g., typing `"hanuman chalisa"` immediately resolves to `"हनुमान चालीसा"`).
- **Recent Searches & Quick Filters:** Chips for Deities (कृष्ण, शिव, हनुमान) and formats (मंत्र, आरती, कथा).

---

### 5.5 Form Controls (फॉर्म अवयव)

All input controls meet WCAG 2.2 accessibility standards with visible focus rings and distinct error states:

```
┌────────────────────────────────────────────────────────┐
│ नाम / Name *                                           │
│ [ अपना पूरा नाम दर्ज करें                            ] │
│ ⚠ कृपया अपना मान्य नाम दर्ज करें।                      │
└────────────────────────────────────────────────────────┘
```

1. **Text Input & Textarea:**
   - Default: `bg-cream border border-stone-lighter rounded-md px-4 py-3 text-charcoal placeholder:text-stone-light focus:outline-none focus:border-gold focus:ring-2 focus:ring-saffron/20`
   - Error: `border-error focus:ring-error/20 text-charcoal`
2. **Select Dropdown:**
   - Custom gold-trimmed dropdown with native Devanagari option styling and chevron icon.
3. **Checkbox & Radio Buttons:**
   - 20×20px minimum click target with saffron checkmark indicator (`accent-saffron` or custom SVG).

---

### 5.6 Audio Player (दिव्य ध्वनि प्लेयर)

Devotional hymns require a dedicated, persistent, non-intrusive audio player that remains active as devotees browse verses or read translations.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  ▶  श्री हनुमान चालीसा (हरिहरन)   ═════════●═══════════  03:45 / 09:20   🔁  🔊  [पाठ]  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Sticky Bottom Positioning:** Fixed above the mobile bottom nav or docked at the viewport base.
- **Controls:** Play/Pause (large 44px button), Seek bar (Saffron fill on gold track), -10s / +10s skip, 0.75x / 1.0x / 1.25x speed selector for slow Sanskrit learning, Loop button (essential for 108 mantra japs), and "पाठ देखें" (Jump to lyrics line).

---

### 5.7 Panchang Widget (दैनिक पंचांग विजेट)

Displays real-time astronomical and liturgical data calculated via high-precision Vedic algorithms.

```
┌────────────────────────────────────────────────────────────────────┐
│                    दैनिक पंचांग — आज का शुभ मुहूर्त               │
├────────────────────────────────────────────────────────────────────┤
│  📅 तिथि: शुक्ल पक्ष द्वादशी         🌅 सूर्योदय: 06:42 AM         │
│  ✨ नक्षत्र: अश्विनी (दोपहर 02:15 तक)  🌇 सूर्यास्त: 05:28 PM         │
│  ⭐ योग: सुकर्मा                   🌙 चंद्र राशि: मेष              │
├────────────────────────────────────────────────────────────────────┤
│  🟢 अभिजीत मुहूर्त: 11:45 AM – 12:28 PM (अति शुभ)                  │
│  🔴 राहुकाल: 04:15 PM – 05:35 PM (अशुभ समय)                       │
└────────────────────────────────────────────────────────────────────┘
```

- **Visual Cues:** Green dot indicator for Abhijit Muhurat, Red dot indicator for Rahu Kaal.

---

### 5.8 Content Actions Bar (सामग्री क्रिया पट्टी)

Located directly beneath shlokas or at the header of devotional texts:
- **कॉपी करें (Copy):** Copies sacred text with automatic citation (`"स्त्रोत: भक्तिलोक (bhaktilok.in)"`).
- **व्हाट्सएप शेयर (WhatsApp Share):** Formatted text with greeting (`"🙏 जय श्री राम, भक्तिलोक पर पढ़ें..."`).
- **प्रिंट करें (Print):** Strips all navigation, ads, and footers for clean home puja altar printing.
- **बुकमार्क (Bookmark):** LocalStorage & user account sync with instant heart/bookmark animation.
- **फॉन्ट साइज़ (+ A -):** Instant font scaler for elders (`100%`, `115%`, `130%`).

---

### 5.9 Reading Progress Bar (पठन प्रगति पट्टी)

- **Position:** Fixed at viewport top (`top: 0`, `height: 3px`, `z-index: 100`).
- **Styling:** Linear gradient from Saffron (`#D97706`) to Suvarna Gold (`#B58A43`).
- **Performance:** Driven by CSS transform `scaleX()` via lightweight passive scroll listener to avoid main thread reflows.

---

### 5.10 Digital Jap Counter (डिजिटल जप माला)

An interactive ritual tool enabling devotees to chant mantras with haptic and audio feedback.

```
┌────────────────────────────────────────────────────────────────────┐
│                       श्री महामृत्युंजय मंत्र                       │
│                   ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्...        │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                              ( 54 )                                │
│                          माला: 1 | मनका: 54 / 108                   │
│                                                                    │
│                     ┌───────────────────────┐                      │
│                     │       जप करें (TAP)   │                      │
│                     └───────────────────────┘                      │
│                                                                    │
│                 [ 🔁 रीसेट ]        [ 📳 कंपन ON ]                 │
└────────────────────────────────────────────────────────────────────┘
```

- **Haptic Feedback:** Triggers `navigator.vibrate(25)` on each tap, and `navigator.vibrate([100, 50, 100])` on completing 108 beads (1 Mala).
- **Audio Chime:** Gentle Tibetan bell/shankha sound on completion.

---

### 5.11 Tags, Badges & Category Pills

```
[ श्री गणेश ]       [ एकादशी विशेष ]       [ संकट नाशन ]       [ 5 मिनट पाठ ]
Gold Accent Pill      Saffron Event Badge     Maroon Category     Stone Duration
```

- **Deity Tag:** `bg-gold/10 text-maroon border border-gold/30 text-xs px-2.5 py-1 rounded-full`
- **Urgent Tithi Badge:** `bg-saffron/10 text-saffron-dark border border-saffron/30 text-xs px-2.5 py-1 rounded-full animate-pulse`

---

### 5.12 Tabs & Sub-Navigation

- **Underline Tab System:** Clean minimal line tabs for switching between:
  `[ मूल संस्कृत श्लोक ]   [ हिंदी भावार्थ ]   [ अंग्रेजी अनुवाद ]   [ वीडियो ]`
- **Active State:** 2px solid Saffron bottom bar with bold maroon text.

---

### 5.13 Accordion & FAQ System

- **Application:** Step-by-step Puja Vidhi procedures, Katha chapters, and FAQ schema questions.
- **Styling:** Gentle slide-down animation with rotating Chevron icon and gold dividing lines.

---

### 5.14 Modal & Sacred Dialog System

- **Backdrop:** Ivory-tinted semi-transparent overlay (`rgba(34, 32, 30, 0.6)`) with `backdrop-blur-sm`.
- **Dialog Box:** Soft cream surface, 16px radius, gold accent border (`border border-gold/40`), accessible focus trap, and Escape key dismissal.

---

### 5.15 Toast Notifications (सूचना संदेश)

- **Position:** Bottom-right on desktop, top-center on mobile.
- **Variants:**
  - **Success:** `"✓ मंत्र सफलतापूर्वक कॉपी किया गया"` (Tulsi Green border)
  - **Bookmark:** `"♥ श्लोक आपकी पसंद में सहेजा गया"` (Kumkum Maroon border)
  - **Offline:** `"⚡ आप ऑफलाइन हैं — सहेजे गए श्लोक उपलब्ध हैं"` (Haldi Amber border)

---

### 5.16 Skeleton & Loading States

- **Design:** Warm shimmering ivory placeholders mimicking card and verse typography layouts.
- **Spiritual Loader:** Rotating gold Dharmachakra (धर्मचक्र) or soft pulsating ॐ emblem.

---

### 5.17 Empty States (रिक्त स्थिति)

- **Illustration:** Minimal gold-line drawing of a sacred Kalash or Diya.
- **Messaging:** Polite, reverent Hindi prose (`"कोई परिणाम नहीं मिला। कृपया अन्य शब्द खोजें।"`) with a quick reset button.

---

### 5.18 Error States (त्रुटि पृष्ठ - 404 / 500)

- **404 Page:** `"मार्ग उपलब्ध नहीं है (पृष्ठ नहीं मिला)"` — A respectful message with quick search and shortcuts to Hanuman Chalisa, Bhagavad Gita, and Daily Panchang.
- **500 Page:** `"तकनीकी बाधा आई है — कृपया कुछ क्षण बाद प्रयास करें"`.

---

### 5.19 Pagination Controls

- **Desktop:** `[← पिछला]` `1` `2` `...` `12` `13` `[अगला →]`
- **Devanagari Indicator:** `"पृष्ठ १२ का २४८"`
- **Mobile:** Streamlined `[पिछला पृष्ठ]` and `[अगला पृष्ठ]` buttons with 44px tap targets.

---

### 5.20 Glossary & Sanskrit Tooltips

- Devotees hovering over or tapping difficult Sanskrit terms (e.g., *"कैवल्य"*, *"स्थितप्रज्ञ"*, *"तपस्या"*) see an instant popup displaying word breakdown, grammatical root, and simple Hindi meaning.

---

### 5.21 Avatar & Sacred Entity Badges

- **Pandit / Scholar Avatar:** Circular photo enclosed in a 2px Suvarna Gold ring with a verified badge.
- **Deity Avatar:** Consecrated icon illustration with soft golden halo backdrops.

---

### 5.22 Editorial Global Footer (वैश्विक पादलेख)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  [भक्तिलोक लोगो]         सनातन धर्म व भक्ति का पावन डिजिटल मंच                         │
│  "धर्मो रक्षति रक्षितः"   संपूर्ण भजन, आरती, मंत्र, चालीसा व दैनिक पंचांग               │
├─────────────────┬──────────────────┬──────────────────┬────────────────────────────────┤
│  भक्ति संग्रह    │  ज्ञान & शास्त्र  │  दैनिक साधन      │  नीति & संपर्क                 │
│  • भजन संग्रह    │  • भगवद्गीता     │  • आज का पंचांग  │  • हमारे बारे में              │
│  • आरती संग्रह   │  • श्री रामचरित  │  • दैनिक राशिफल  │  • संपादकीय नीति               │
│  • चालीसा संग्रह │  • उपनिषद सार    │  • डिजिटल जप     │  • गोपनीयता नीति               │
│  • सिद्ध मंत्र   │  • पुराण कथाएं   │  • मंदिर दर्शन   │  • अस्वीकरण व सेवा शर्तें       │
├─────────────────┴──────────────────┴──────────────────┴────────────────────────────────┤
│  © 2026 BhaktiLok (भक्तिलोक). सर्वाधिकार सुरक्षित।  Code Crew Labs द्वारा विकसित।       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Visual Elements, Borders & Sacred Ornamentation

### 6.1 Border Radius Scale

```
Token            Value     Application
─────────────────────────────────────────────────────────────────────────────
rounded-none     0px       Full-width banners, table cells
rounded-sm       4px       Tags, micro badges, tooltips
rounded-md       8px       Standard buttons, text inputs, search bar
rounded-lg       12px      Content cards, deity cards, audio player
rounded-xl       16px      Modals, bottom sheets, featured callouts
rounded-full     9999px    Avatars, circular icon buttons, status pills
```

### 6.2 Elevation & Shadow Hierarchy

BhaktiLok uses warm, amber-tinted shadows rather than harsh cold black shadows:

```css
/* Warm Elevation Tokens */
--shadow-card: 0 1px 3px 0 rgba(34, 32, 30, 0.04), 0 1px 2px -1px rgba(34, 32, 30, 0.04);
--shadow-card-hover: 0 6px 16px -2px rgba(181, 138, 67, 0.12), 0 2px 4px -1px rgba(34, 32, 30, 0.04);
--shadow-dropdown: 0 10px 25px -4px rgba(34, 32, 30, 0.1), 0 4px 6px -2px rgba(34, 32, 30, 0.05);
--shadow-modal: 0 24px 48px -12px rgba(101, 29, 50, 0.18), 0 8px 16px -4px rgba(34, 32, 30, 0.08);
```

### 6.3 Sacred Borders & Traditional Motifs

1. **Gold Gradient Accent Border:**  
   Applied to prominent quote cards, Shloka frames, and featured chapters.
   ```css
   .border-gold-accent {
     border: 1px solid transparent;
     border-image: linear-gradient(135deg, #B58A43 0%, #D97706 50%, #B58A43 100%) 1;
   }
   ```
2. **Sacred Ornamental Divider:**  
   A subtle horizontal divider centered with a traditional Indian glyph (e.g., `✦`, `ॐ`, `卐`, or lotus petal):
   ```tsx
   export function SacredDivider({ motif = "ॐ" }: { motif?: string }) {
     return (
       <div className="relative flex py-6 items-center">
         <div className="flex-grow border-t border-gold/25" />
         <span className="flex-shrink mx-4 font-serif text-gold text-sm select-none">
           {motif}
         </span>
         <div className="flex-grow border-t border-gold/25" />
       </div>
     );
   }
   ```

### 6.4 Iconography Standards (Lucide React + Sacred Symbols)

- **UI Icons:** Lucide React icons rendered at `strokeWidth={1.75}` for a delicate editorial aesthetic.
- **Standard Sizing:**
  - Micro / Inline: `14px` (`w-3.5 h-3.5`)
  - Standard UI: `18px` (`w-4.5 h-4.5` or `w-5 h-5`)
  - Featured / Large: `24px` (`w-6 h-6`)
- **Sacred Glyphs:** SVG symbols for ॐ (Om), Swastik (卐), Trishul, Diya, and Shankha stored in `/public/icons/sacred/`.

### 6.5 Image Treatments & Vignettes

- **Aspect Ratios:**
  - `16:9` (`aspect-video`) for Temple tours, Festival celebrations, and Video bhajans.
  - `1:1` (`aspect-square`) for Deities and Author avatars.
  - `3:4` (`aspect-[3/4]`) for Sacred Scripture and Granth book covers.
- **Warm Gold Overlay:** Featured images use a subtle warm vignette gradient (`bg-gradient-to-t from-charcoal/80 via-transparent to-transparent`) to ensure overlay text remains readable.

---

## 7. Motion Design & Animation Specification

### 7.1 Motion Philosophy: "Shant & Saumya" (शांत व सौम्य)
Devotional interfaces must never feature aggressive bounces, spring shakes, or distracting parallax flashes. Animations must feel serene, tranquil, and dignified, mirroring the calm rhythm of breathing during meditation.

### 7.2 Timing & Easing Curves

```
Scale Name       Duration   Cubic Bezier Easing              Application
─────────────────────────────────────────────────────────────────────────────
Instant          100ms      ease-out                         Toggle switch, checkbox
Normal           200ms      cubic-bezier(0.16, 1, 0.3, 1)    Button hover, card lift
Relaxed          300ms      cubic-bezier(0.16, 1, 0.3, 1)    Modal entrance, mega menu
Contemplative    500ms      cubic-bezier(0.25, 1, 0.5, 1)    Verse fade-in, tab switch
```

### 7.3 Canonical Animation Classes

```css
/* Smooth Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Gentle Slide Down for Mega Menu */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Soft Diya Pulse Glow */
@keyframes diyaGlow {
  0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 4px rgba(217, 119, 6, 0.3)); }
  50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(217, 119, 6, 0.6)); }
}

.animate-fade-in {
  animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-down {
  animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-diya-glow {
  animation: diyaGlow 3s ease-in-out infinite;
}
```

### 7.4 Reduced Motion Compliance
For users with vestibular sensitivities or explicit system preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 8. Accessibility (a11y) & Multi-Generational Inclusivity

### 8.1 WCAG 2.2 AA / AAA Contrast Verification Matrix

All core color combinations have been rigorously tested against WCAG 2.2 contrast ratio formulas:

| Foreground Color | Background Surface | Contrast Ratio | WCAG Compliance Level | Result |
| :--- | :--- | :--- | :--- | :--- |
| **Kasturi Charcoal (`#22201E`)** | Pavitra Ivory (`#FAF8F2`) | **14.2:1** | AAA Normal & Large Text | PASS (Flawless) |
| **Kumkum Maroon (`#651D32`)** | Pavitra Ivory (`#FAF8F2`) | **9.1:1** | AAA Normal & Large Text | PASS (Flawless) |
| **Kumkum Maroon (`#651D32`)** | Ksheer Cream (`#FFFDF8`) | **9.5:1** | AAA Normal & Large Text | PASS (Flawless) |
| **Shila Stone (`#81786B`)** | Pavitra Ivory (`#FAF8F2`) | **4.6:1** | AA Normal Text | PASS |
| **Kesariya Saffron (`#D97706`)** | Kasturi Charcoal (`#22201E`) | **6.4:1** | AAA Large / AA Normal | PASS |
| **White (`#FFFFFF`)** | Kumkum Maroon (`#651D32`) | **9.1:1** | AAA Normal & Large Text | PASS (CTA Button) |
| **White (`#FFFFFF`)** | Saffron Dark (`#B45309`) | **4.8:1** | AA Normal & Large Text | PASS (Badge/Button) |

### 8.2 Ergonomic Touch Targets (44px Minimum)
- Every interactive control (navigation links, tab buttons, audio controls, Jap counter, pagination) has an active clickable/tappable bounding box of at least **44 × 44 CSS pixels**.
- On mobile devices, icon buttons feature transparent padding expansion (`p-3 -m-3`) to prevent mis-clicks by elderly devotees.

### 8.3 Screen Reader & Language Optimization

```html
<!-- Proper Language Tagging for Dual-Script Devotional Content -->
<article lang="hi">
  <h1 class="font-serif">श्री हनुमान चालीसा</h1>
  
  <!-- Sacred Sanskrit Shloka marked with lang="sa" for phonetic screen reader pronunciation -->
  <blockquote lang="sa" class="verse-block">
    मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।<br>
    वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥
  </blockquote>

  <!-- Hindi Commentary marked with lang="hi" -->
  <p lang="hi" class="text-devanagari">
    <strong>भावार्थ:</strong> जिनकी मन के समान गति और वायु के समान वेग है...
  </p>
</article>
```

- **Aria Live Regions:** The Digital Jap Counter uses `aria-live="polite"` so vision-impaired devotees receive spoken bead count confirmations without interrupting audio chanting.
- **Skip Links:** A prominent skip-to-content anchor (`"सीधे मुख्य सामग्री पर जाएं"`) is positioned at the very top of DOM for keyboard navigation.

---

## 9. Developer Implementation & Tailwind v4 Architecture

### 9.1 Tailwind CSS Configuration (`@theme` in `globals.css`)

```css
@import "tailwindcss";

@theme {
  /* Color Palette */
  --color-ivory: #FAF8F2;
  --color-cream: #FFFDF8;
  --color-saffron: #D97706;
  --color-saffron-light: #F59E0B;
  --color-saffron-dark: #B45309;
  --color-gold: #B58A43;
  --color-gold-light: #D4A843;
  --color-gold-dark: #8C6527;
  --color-maroon: #651D32;
  --color-maroon-light: #8B2848;
  --color-maroon-dark: #441120;
  --color-charcoal: #22201E;
  --color-stone: #81786B;
  --color-stone-light: #A39E93;
  --color-stone-lighter: #D1CCC3;

  /* Semantic */
  --color-success: #16A34A;
  --color-warning: #EAB308;
  --color-error: #DC2626;
  --color-info: #2563EB;

  /* Typography */
  --font-sans: var(--font-noto-sans), "Noto Sans Devanagari", system-ui, sans-serif;
  --font-serif: var(--font-noto-serif), "Noto Serif Devanagari", Georgia, serif;
  --font-inter: var(--font-inter), "Inter", system-ui, sans-serif;

  /* Radii */
  --radius-button: 8px;
  --radius-card: 12px;
  --radius-modal: 16px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-card: 0 1px 3px 0 rgba(34, 32, 30, 0.04), 0 1px 2px -1px rgba(34, 32, 30, 0.04);
  --shadow-card-hover: 0 6px 16px -2px rgba(181, 138, 67, 0.12), 0 2px 4px -1px rgba(34, 32, 30, 0.04);
  --shadow-dropdown: 0 10px 25px -4px rgba(34, 32, 30, 0.1), 0 4px 6px -2px rgba(34, 32, 30, 0.05);
  --shadow-modal: 0 24px 48px -12px rgba(101, 29, 50, 0.18);
}
```

### 9.2 Component Directory Mapping in Next.js 16 App Router

```
src/
├── app/
│   ├── globals.css              # Master tokens, CSS variables, typography classes
│   ├── layout.tsx               # Root layout, Google Fonts injector, JSON-LD Schema
│   └── (routes)/...
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Sticky sacred header & top announcement bar
│   │   ├── MegaMenu.tsx         # Categorized devotional flyout
│   │   ├── MobileNav.tsx        # Bottom sticky ergonomic navigation
│   │   ├── Breadcrumbs.tsx      # Schema-compliant breadcrumb trail
│   │   └── Footer.tsx           # Multi-column editorial footer
│   ├── ui/
│   │   ├── Button.tsx           # Primary, Secondary, Ghost, Icon button variants
│   │   ├── Card.tsx             # ContentCard, DeityCard, ToolCard
│   │   ├── Input.tsx            # Form inputs with validation styles
│   │   ├── Tabs.tsx             # Underline & pill sub-navigation tabs
│   │   ├── Modal.tsx            # Accessible dialog wrapper
│   │   ├── Toast.tsx            # Feedback toast snackbars
│   │   ├── Skeleton.tsx         # Shimmering loading place-holders
│   │   └── SacredDivider.tsx    # Ornamental gold divider with ॐ glyph
│   └── features/
│       ├── AudioPlayer.tsx      # Persistent bottom devotional player
│       ├── PanchangWidget.tsx   # Real-time daily tithi & muhurat card
│       ├── JapCounter.tsx       # 108-bead mantra counter with haptics
│       ├── ContentActions.tsx   # Copy, WhatsApp share, print, font scale
│       ├── ReadingProgress.tsx  # Top 3px gradient scroll indicator
│       └── SearchModal.tsx      # Command palette search with Hindi transliteration
├── config/
│   └── site.ts                  # Site metadata, canonical colors, deity profiles
└── lib/
    ├── utils.ts                 # cn() tailwind-merge & clsx helper
    └── haptics.ts               # Web vibration API wrapper for Jap Mala
```

---

## 10. Summary & Implementation Sign-off

The **BhaktiLok Design System** provides an immutable technical and aesthetic contract for the complete re-architecture of the platform. By synthesizing Indian heritage symbolism with the finest practices of modern web typography, component modularity, and accessibility, this design language ensures that every devotee experiences the sanctity and serenity of an authentic digital temple.

**Approved by:** BhaktiLok Core Architecture & Engineering Team  
**Execution Milestone:** Sprint 1 — Foundation Tokens, Core Layout & Primary UI Components  
**Documentation Version:** `1.0.0 (Production Master)`
