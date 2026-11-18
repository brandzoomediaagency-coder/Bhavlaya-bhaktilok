# Bhavlaya Rebranding Audit & Transformation Specification

**Document Version:** 1.0.0  
**Date:** November 2026  
**Subject:** Complete Brand Transformation from BhaktiLok to **Bhavlaya (भावलय)**  
**Development Partner:** Code Crew Labs  
**Current Website:** `https://www.bhaktilok.in/`  
**Proposed New Domain:** `https://bhavlaya.com/` (Pending user confirmation of registration, DNS & SSL)  

---

## 1. Executive Summary & Brand Paradigm

The objective is to rebrand the entire existing Sanatan devotional website into a completely independent, modern, premium spiritual ecosystem under the brand name **Bhavlaya (भावलय)**.

- **Brand Name:** Bhavlaya (भावलय)
- **Etymology & Essence:** *भाव (Bhav - Deep Devotion, Spiritual Emotion, Heartfelt Reverence)* + *लय (Laya - Divine Harmony, Cosmic Rhythm, Meditative Absorption)*.
- **English Tagline:** "Where Devotion Meets Knowledge."
- **Hindi Positioning:** "भक्ति, ज्ञान और साधना का डिजिटल संसार।"
- **Brand Category:** Sanatan Dharma, Vedic Knowledge, Devotional Scriptures, Interactive Spiritual Tools, and Meditative Digital Experiences.
- **Technology Partner:** Code Crew Labs ("A Code Crew Labs Product" / "Technology by Code Crew Labs").

---

## 2. Comprehensive Codebase Inventory & Audit

A rigorous search for all historical brand references across the frontend, backend, APIs, metadata, and styling identified the following touchpoints:

### A. Configuration & State Management
| File Path | Existing Value | Target Rebranded State |
|---|---|---|
| `src/config/site.ts` | `name: "भक्तिलोक"`, `nameEn: "BhaktiLok"`, `domain: "https://www.bhaktilok.in"` | Centralized brand configuration imported from `src/config/brand.ts` with configurable domain switch. |
| `src/config/brand.ts` | *(New File)* | Defines central source of truth for all brand parameters, taglines, company credits, social handles, and domain toggle. |
| `src/types/content.ts` | Header comments referencing BhaktiLok | Updated to Bhavlaya specifications. |
| `package.json` | `"name": "bhaktilok"` | `"name": "bhavlaya"` |

### B. Core Layout & Navigation
| Component | Existing Elements | Required Transformation |
|---|---|---|
| `src/components/layout/Header.tsx` | "भ" avatar circle, "भक्तिलोक / BhaktiLok" wordmark | Sacred Bhavlaya emblem ("भा" / cosmic lotus motif), "भावलय / Bhavlaya", updated tagline. |
| `src/components/layout/Footer.tsx` | "भ" emblem, BhaktiLok descriptions, social links, technology credit | Bhavlaya brand identity, "Bhakti, spiritual knowledge, scriptures and devotional experiences — all in one place.", "Technology by Code Crew Labs". |
| `src/app/layout.tsx` | Schema.org Organization, alternateName `["Bhaktilok.in", "भक्ति लोक"]`, meta tags | Updated Organization schema to Bhavlaya, canonical URL driven by central config, JSON-LD publisher updated. |
| `src/app/globals.css` | `.prose-bhaktilok` typography helpers | Refactored to `.prose-bhavlaya`. |

### C. Homepage & User Experience
| Section | Existing State | New Bhavlaya State |
|---|---|---|
| **Hero Section** | "भक्ति, साधना और सनातन ज्ञान का एक पावन स्थान" | "Welcome to Bhavlaya – Where Devotion Meets Knowledge." / "भावलय में आपका स्वागत है। भक्ति, साधना, सनातन ज्ञान और आध्यात्मिक अनुभवों की एक नई डिजिटल दुनिया।" |
| **Search Bar** | Global placeholder | Intelligent Bhavlaya search with updated popular search queries. |
| **Daily Panchang** | Share text: "भक्तिलोक पर देखें" | Share text: "भावलय पर देखें" / `${brandDomain}/panchang`. |
| **App Promotion** | "BhaktiLok Mobile Experience", "भक्तिलोक ऐप" | "Bhavlaya Mobile Experience", "भावलय ऐप – Where Devotion Meets Knowledge", proposed app display: "Bhavlaya – Bhakti & Spirituality". |

### D. Content Detail & Reusable Action Bars
| Content Type | Files | Locations & Audit Finding |
|---|---|---|
| **Bhajans** | `src/app/bhajan/page.tsx`, `src/app/bhajan/[slug]/page.tsx` | Copy-to-clipboard credit string: `स्रोत: भक्तिलोक (https://www.bhaktilok.in)` updated to centralized brand credit. |
| **Mantras** | `src/app/mantra/page.tsx`, `src/app/mantra/[slug]/page.tsx` | Copy credit and disclaimer mentioning BhaktiLok updated to Bhavlaya. |
| **Chalisas** | `src/app/chalisa/page.tsx`, `src/app/chalisa/[slug]/page.tsx` | "भक्तिलोक पाठ" badge and copy credit updated to Bhavlaya. |
| **Aartis** | `src/app/aarti/page.tsx`, `src/app/aarti/[slug]/page.tsx` | Copy credit updated to Bhavlaya. |
| **Kathas** | `src/app/katha/page.tsx`, `src/app/katha/[slug]/page.tsx` | Copy credit updated to Bhavlaya. |
| **Scriptures** | `src/app/granth/page.tsx`, `src/app/granth/[slug]/page.tsx` | Copy credit updated to Bhavlaya. |
| **Temples** | `src/app/mandir/page.tsx`, `src/app/mandir/[slug]/page.tsx` | Copy credit updated to Bhavlaya. |
| **Festivals** | `src/app/festivals/page.tsx`, `src/app/festivals/[slug]/page.tsx` | Copy credit updated to Bhavlaya. |
| **Rashifal** | `src/app/rashifal/page.tsx`, `src/app/rashifal/[rashi]/page.tsx` | Astrological disclaimer referencing BhaktiLok updated to Bhavlaya. |
| **Tools** | `src/app/tools/page.tsx`, `src/app/tools/[slug]/page.tsx` | Metadata, component titles, and copy actions updated. |
| **Storage Keys** | `JapMalaCounter.tsx`, `PujaChecklistTool.tsx` | Backward-compatible storage adapter: read `bhavlaya_*` or fallback to legacy `bhaktilok_*`. |

### E. Institutional & Legal Pages
| Route | Content Changes Required |
|---|---|
| `/about` | Complete mission statement for Bhavlaya, etymology of "Bhav + Laya", Code Crew Labs technology distinction. |
| `/contact` | `support@bhavlaya.com` (configurable), editorial address, feedback classifications. |
| `/editorial-policy` | Bhavlaya Editorial Board, rigorous scripture attribution principles, corrections policy. |
| `/privacy-policy` | Bhavlaya privacy guarantees, local storage explanation, transparent location usage for Panchang. |
| `/terms-and-conditions` | Bhavlaya terms of service, intellectual property guidelines, personal devotional usage rights. |
| `/disclaimer` | Religious and astrological disclaimers updated to Bhavlaya brand identity. |

### F. Administrative CMS & APIs
| Module | Location | Required Transformation |
|---|---|---|
| `/admin` | `src/app/admin/page.tsx` | "Bhavlaya Content Management System (भावलय प्रशासनिक नियंत्रण कक्ष)", branded statistics and editorial workflow. |
| `/api/v1/*` | `src/app/api/v1/*` | Response envelopes, metadata credits, and system identifiers branded to Bhavlaya. |

---

## 3. Preserved Cultural & Factual Integrity

In strict compliance with Master Rebranding Prompt requirements:
1. **Sacred Scriptures & Mantras:** No Sanskrit verses, shlokas, tithis, or astronomical mathematics are altered.
2. **Historical Attributions:** Authentic sources (e.g. *Rigveda 3.62.10*, *Shiv Mahapuran*, *Goswami Tulsidas*, *Shraddharam Phillauri*) remain 100% intact.
3. **Domain Safety Rule:** The proposed domain `https://bhavlaya.com/` is isolated into configurable settings. Canonical tags, sitemaps, and redirects are guarded by a production domain configuration flag until user-confirmed DNS & SSL cutover.

---

## 4. Execution Matrix

```
[Phase 1: Audit Complete] -> [Phase 2: Central Brand Config] -> [Phase 3: Visual Identity Assets] 
  -> [Phase 4: Site-Wide Component Migration] -> [Phase 5: SEO & 301 Migration Spec] 
  -> [Phase 6: CMS & Admin Rebranding] -> [Phase 7: Mobile App & Social Readiness] 
  -> [Phase 8: Functional Testing] -> [Phase 9: Build & QA Verification]
```
