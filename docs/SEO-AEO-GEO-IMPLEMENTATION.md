# Bhavlaya SEO, AEO & GEO Implementation Guide

**Domain:** `bhavlaya.com` (configurable via `NEXT_PUBLIC_SITE_URL`)  
**Target Engines:** Google Search, Bing, Answer Engines (Perplexity, Google AI Overview, ChatGPT Search)  

---

## 1. Technical SEO Foundation

- **Canonical URL Generation:** Dynamic generation adhering to `NEXT_PUBLIC_SITE_URL`.
- **OpenGraph & Twitter Card:** Standardized high-resolution 1200x630 cards with saffron/maroon devotional branding.
- **Dynamic XML Sitemap:** `src/app/sitemap.ts` automatically indexes all Bhajans, Mantras, Aartis, Chalisas, Temples, Festivals, Stotras, Encyclopedia entries, Authors, and Articles.
- **Robots.txt:** Full crawlability for search bots and AI crawlers while restricting private admin paths.

---

## 2. AEO (Answer Engine Optimization) Architecture

To excel in AI overviews and featured snippets:
1. **Direct Answer Paragraph:** Every content page begins with an unambiguous 40-60 word definition/summary answering "What is X?", "Who composed X?", or "What is the best time to recite X?".
2. **Schema.org FAQPage:** Encapsulates the top 4 traditional questions with structured answers directly in JSON-LD.
3. **Structured Data Schemas:**
   - `WebSite` with `SearchAction` enabling Google Sitelinks Search Box.
   - `Article` with author schema for scholarly authority (E-E-A-T).
   - `AudioObject` for recorded Mantras and Stotras.
   - `BreadcrumbList` for SERP breadcrumb hierarchy.

---

## 3. GEO (Generative Engine Optimization) Strategy

Generative search engines value factual provenance and interconnected knowledge graphs:
1. **Knowledge Graph Entities:** Clear linkage between Deities, Temples, Shlokas, Festivals, and Vedas.
2. **Attribution & Provenance:** Explicit references to canonical scriptures (e.g., *Rigveda Mandala 7*, *Shiva Purana Kotirudra Samhita*).
3. **Clean Semantic HTML:** `<main>`, `<article>`, `<header>`, `<nav>`, `<section>` and `<aside>` without nested layout div soup.
