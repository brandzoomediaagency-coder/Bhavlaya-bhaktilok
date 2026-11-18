# BHAVLAYA (भावलय) — SEO DOMAIN MIGRATION & 301 REDIRECT STRATEGY

**Author:** Code Crew Labs Enterprise Architecture  
**Product:** Bhavlaya (भावलय) — *Where Devotion Meets Knowledge*  
**Scope:** Complete SEO migration roadmap from legacy `https://www.bhaktilok.in` to proposed `https://bhavlaya.com` (12,934+ URLs across 11 sub-sitemaps)  
**Status:** Ready for Execution Pending Domain Verification & DNS Provisioning

---

## 1. Executive Summary & Migration Policy

The transition from BhaktiLok to Bhavlaya is a high-stakes domain migration involving over 12,900 indexed pages with substantial Google Search rankings in Hindi devotional categories (Bhajan lyrics, Hanuman Chalisa, Gayatri Mantra, Jyotirlinga Darshan, and Daily Panchang).

### Core Migration Principles
1. **Zero Downtime:** Both domains must resolve concurrently during the cutover window.
2. **Permanent 301 Redirects:** Every legacy URL pattern is mapped directly to its canonical Bhavlaya counterpart. No blanket redirect to homepage.
3. **Decoupled Proposed Domain:** The proposed domain `https://bhavlaya.com` is centrally abstracted in `src/config/brand.ts` and controlled via `NEXT_PUBLIC_SITE_URL`. It will only be activated in production upon verified domain ownership and SSL certificate provisioning.
4. **Link Equity Preservation:** Maintain exact metadata tags, `canonical` tags, and OpenGraph structures during migration to preserve Google PageRank and Generative Engine Optimization (GEO) rankings.

---

## 2. Legacy URL Pattern to Bhavlaya Canonical Map

| Legacy Blogger / PHP Pattern (`bhaktilok.in`) | Match Example | Bhavlaya Canonical Route (`bhavlaya.com`) | HTTP Code |
| :--- | :--- | :--- | :--- |
| `/:year/:month/:slug.html` | `/2023/04/ram-raksha-stotra.html` | `/bhajan/:slug` or `/mantra/:slug` | `301 Permanent` |
| `/search/label/:tag` | `/search/label/Hanuman%20Ji` | `/search?q=:tag` | `301 Permanent` |
| `/aarati/:slug` | `/aarati/om-jai-jagdish-hare` | `/aarti/:slug` | `301 Permanent` |
| `/chalisa/:slug.html` | `/chalisa/hanuman-chalisa.html` | `/chalisa/:slug` | `301 Permanent` |
| `/mantra/:slug.html` | `/mantra/gayatri-mantra.html` | `/mantra/:slug` | `301 Permanent` |
| `/temples/:slug` | `/temples/kashi-vishwanath` | `/mandir/:slug` | `301 Permanent` |
| `/festivals/:slug.html` | `/festivals/mahashivratri-2026.html`| `/festivals/:slug` | `301 Permanent` |
| `/panchang.html` | `/panchang.html` | `/panchang` | `301 Permanent` |
| `/rashifal.html` | `/rashifal.html` | `/rashifal` | `301 Permanent` |
| `/tools/:slug.html` | `/tools/jap-mala-counter.html` | `/tools/:slug` | `301 Permanent` |

---

## 3. Middleware Implementation & Cloudflare Edge Rules

The Next.js edge middleware (`src/middleware.ts`) automatically intercepts incoming requests matching legacy Blogger/PHP permalink structures and returns HTTP 301 headers:

```typescript
// Middleware implementation snippet
if (pathname.endsWith(".html")) {
  const cleanPath = pathname.replace(/\.html$/, "");
  // Date pattern: /2024/05/slug.html -> /bhajan/slug
  const dateMatch = pathname.match(/^\/\d{4}\/\d{2}\/([^/]+)\.html$/);
  if (dateMatch) {
    const slug = dateMatch[1];
    return NextResponse.redirect(new URL(`/bhajan/${slug}`, request.url), 301);
  }
  return NextResponse.redirect(new URL(cleanPath, request.url), 301);
}
```

### Cloudflare Edge Redirect Rule (Pre-Origin Caching)
```
URI Path matches "^/\d{4}/\d{2}/(.*)\.html$" 
=> 301 Redirect to https://bhavlaya.com/bhajan/$1
```

---

## 4. Google Search Console (GSC) Domain Migration Checklist

### Step 1: Pre-Migration Setup
- [x] Complete sitemap generation at `https://bhavlaya.com/sitemap.xml` with `<lastmod>` timestamps.
- [x] Configure `robots.txt` allowing full indexing while disallowing `/admin` and staging paths.
- [x] Verify OpenGraph images (`/opengraph-image`) and Favicon icons (`/icon`) render Bhavlaya branding.
- [ ] Claim and verify DNS TXT record for `bhavlaya.com` in Google Search Console.
- [ ] Claim and verify DNS TXT record for `bhavlaya.com` in Bing Webmaster Tools.

### Step 2: The Cutover Event
1. Update DNS A / CNAME records to point to production Next.js cluster.
2. Confirm HTTPS certificate is active and auto-renewing (Let's Encrypt / Cloudflare).
3. Set environment variable: `NEXT_PUBLIC_SITE_URL=https://bhavlaya.com`.
4. Trigger production deployment build.
5. In GSC property for `https://www.bhaktilok.in/`, navigate to **Settings > Change of Address Tool**.
6. Select destination property `https://bhavlaya.com/` and run validation checks.
7. Submit Change of Address notice to Google.

### Step 3: Post-Migration Monitoring (First 90 Days)
- Monitor **Index Coverage Report** daily in GSC for 404 or redirect loop spikes.
- Submit new sitemap index `https://bhavlaya.com/sitemap.xml`.
- Check canonicalization reports to ensure Google recognizes `bhavlaya.com` as canonical.
- Maintain legacy 301 redirects on `bhaktilok.in` for a minimum of 180 days (recommended: 1 year).

---

## 5. Structured Data & Schema.org Continuity

During rebranding, the Organization schema maintains link continuity with `sameAs` references:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bhavlaya",
  "alternateName": "भावलय",
  "url": "https://bhavlaya.com",
  "logo": "https://bhavlaya.com/icon",
  "founder": {
    "@type": "Organization",
    "name": "Code Crew Labs"
  },
  "sameAs": [
    "https://www.youtube.com/@BhavlayaOfficial",
    "https://www.facebook.com/BhavlayaOfficial",
    "https://www.instagram.com/bhavlaya",
    "https://www.bhaktilok.in"
  ]
}
```

---

## 6. Generative Engine Optimization (GEO) & AEO Strategy

For AI search engines (Google AI Overviews, Perplexity, ChatGPT Search):
- **Brand Entity Co-occurrence:** Every devotional shloka, bhajan, and aarti includes an explicit citation string:  
  `स्रोत: भावलय (Bhavlaya) — https://bhavlaya.com/...`
- **Canonical Shloka Formats:** Preserves exact Vedic Sanskrit transliteration and word-for-word Hindi glosses, maximizing citation probability in generative answers.
- **Micro-Knowledge Graphs:** City-based Panchang equations provide deterministic, authoritative answers for queries like *"आज का राहुकाल कब है"*, positioning Bhavlaya as primary knowledge source.
