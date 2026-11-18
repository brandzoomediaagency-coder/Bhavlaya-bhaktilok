/**
 * Bhavlaya Multilingual Search Engine
 * 
 * Supports:
 * - Hindi (Devanagari)
 * - Hinglish (Romanized Hindi)
 * - English
 * 
 * Features:
 * - Unicode NFC normalization
 * - Indic phonetic transliteration and alias mapping
 * - Editable synonym dictionary with relevance boosts
 * - Multi-field weighted scoring and ranking
 * - Typo-tolerant matching for common phonetic variations
 * - Snippet extraction and query term highlighting
 */

import {
  BHAJANS,
  MANTRAS,
  CHALISAS,
  AARTIS,
  TEMPLES,
  FESTIVALS,
  SCRIPTURES,
  TOOLS,
  RASHIS,
  STOTRAS,
  ENCYCLOPEDIA_ENTRIES,
  ARTICLES,
  AUTHORS,
} from "@/data/devotionalData";

export interface SearchResultItem {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  categoryHi: string;
  slug: string;
  href: string;
  description: string;
  deity?: string;
  snippet?: string;
  score: number;
  highlightedTitle?: string;
  thumbnail?: string;
}

export interface SearchSynonym {
  canonicalTerm: string;
  alternateTerms: string[];
  category?: string;
  relevanceBoost?: number;
}

/**
 * Comprehensive Synonym and Alias Dictionary
 * Maps diverse spelling variants, Hinglish colloquialisms, and Devanagari equivalents.
 */
export const SEARCH_SYNONYMS: SearchSynonym[] = [
  // Shiva & Mahadev
  {
    canonicalTerm: "भगवान शिव",
    alternateTerms: [
      "shiv",
      "shiva",
      "siv",
      "siva",
      "mahadev",
      "mahadeva",
      "bholenath",
      "bhole baba",
      "shankar",
      "shiv shankar",
      "rudra",
      "neelkanth",
      "शिव",
      "शिवजी",
      "महादेव",
      "भोलेनाथ",
      "भोले बाबा",
      "शंकर",
      "रुद्र",
      "नीलकंठ",
    ],
    category: "shiva",
    relevanceBoost: 1.5,
  },
  // Hanuman & Bajrang Bali
  {
    canonicalTerm: "हनुमान चालीसा",
    alternateTerms: [
      "hanuman chalisa",
      "hanumaan chalisa",
      "hanumanchalisa",
      "hanuman ji chalisa",
      "bajrang bali chalisa",
      "bajrangbali chalisa",
      "sankatmochan",
      "हनुमान चालीसा",
      "हनुमान जी की चालीसा",
      "बजरंगबली चालीसा",
    ],
    category: "chalisa",
    relevanceBoost: 2.0,
  },
  {
    canonicalTerm: "बजरंग बाण",
    alternateTerms: [
      "bajrang baan",
      "bajrang ban",
      "bajrangbaad",
      "bajrangbaan",
      "बजरंग बाण",
      "बजरंगबाण",
    ],
    category: "stotra",
    relevanceBoost: 1.8,
  },
  // Krishna & Radha
  {
    canonicalTerm: "श्री कृष्ण",
    alternateTerms: [
      "krishna",
      "krishan",
      "krisna",
      "kanha",
      "kanhaiya",
      "govind",
      "gopal",
      "radha krishna",
      "radhakrishna",
      "krishna bhajan",
      "radhe",
      "shyam",
      "khatu shyam",
      "कृष्ण",
      "श्री कृष्ण",
      "कृष्ण भजन",
      "कान्हा",
      "कन्हैया",
      "गोविन्द",
      "गोपाल",
      "राधा कृष्ण",
      "राधे",
      "श्याम",
    ],
    category: "bhajan",
    relevanceBoost: 1.6,
  },
  // Ram
  {
    canonicalTerm: "श्री राम",
    alternateTerms: [
      "ram",
      "rama",
      "shri ram",
      "shree ram",
      "sri ram",
      "jai shree ram",
      "jai shri ram",
      "ramchandra",
      "ram ji",
      "raghunath",
      "राम",
      "श्री राम",
      "जय श्री राम",
      "रामचन्द्र",
      "रघुनाथ",
    ],
    category: "ram",
    relevanceBoost: 1.5,
  },
  // Aarti general & deity
  {
    canonicalTerm: "शिव आरती",
    alternateTerms: [
      "shiv aarti",
      "shiva aarti",
      "shiv ji ki aarti",
      "shiva arti",
      "siv arti",
      "om jai shiv omkara",
      "shiv aarti katha",
      "शिव आरती",
      "शिव जी की आरती",
      "ॐ जय शिव ओंकारा",
    ],
    category: "aarti",
    relevanceBoost: 1.8,
  },
  {
    canonicalTerm: "आरती",
    alternateTerms: ["aarti", "arti", "aarthi", "aarati", "आरती", "आरती संग्रह"],
    category: "aarti",
    relevanceBoost: 1.3,
  },
  // Mantra & Chants
  {
    canonicalTerm: "महामृत्युंजय मंत्र",
    alternateTerms: [
      "mahamrityunjaya mantra",
      "maha mrityunjay mantra",
      "mrityunjaya mantra",
      "mahamrityunjay",
      "om tryambakam yajamahe",
      "mahamrityunjaya",
      "महामृत्युंजय मंत्र",
      "महा मृत्युंजय",
      "त्र्यम्बकं यजामहे",
    ],
    category: "mantra",
    relevanceBoost: 2.0,
  },
  {
    canonicalTerm: "शिव मंत्र",
    alternateTerms: [
      "om namah shivaya",
      "om namah shivay",
      "om namashivaya",
      "om namah sivaya",
      "shiv mantra",
      "shiva mantra",
      "ॐ नमः शिवाय",
      "शिव मंत्र",
    ],
    category: "mantra",
    relevanceBoost: 1.8,
  },
  // Vrat & Festivals
  {
    canonicalTerm: "एकादशी",
    alternateTerms: [
      "ekadashi",
      "ekadashi vrat",
      "ekadasi",
      "ekadasi vrat",
      "gyaras",
      "nirjala ekadashi",
      "nirjala ekadashi vrat",
      "एकादशी",
      "एकादशी व्रत",
      "निर्जला एकादशी",
      "ग्यारस",
    ],
    category: "festivals",
    relevanceBoost: 2.2,
  },
  {
    canonicalTerm: "महाशिवरात्रि",
    alternateTerms: [
      "mahashivratri",
      "maha shivratri",
      "shivratri",
      "sivaratri",
      "maha shiv ratri",
      "महाशिवरात्रि",
      "शिवरात्रि",
    ],
    category: "festivals",
    relevanceBoost: 1.8,
  },
  // Panchang & Muhurat
  {
    canonicalTerm: "पंचांग",
    alternateTerms: [
      "brahma muhurat",
      "brahm muhurat",
      "brahma muhurtha",
      "brahmamuhurta",
      "amrit vela",
      "ब्रह्म मुहूर्त",
      "अमृत वेला",
      "panchang",
      "आज का पंचांग",
    ],
    category: "panchang",
    relevanceBoost: 2.2,
  },
  {
    canonicalTerm: "राहुकाल",
    alternateTerms: [
      "rahukaal",
      "rahu kaal",
      "rahu kalam",
      "rahukalam",
      "राहुकाल",
      "राहु काल",
    ],
    category: "panchang",
    relevanceBoost: 1.6,
  },
  // Tools & Audio
  {
    canonicalTerm: "मंदिर घंटी",
    alternateTerms: [
      "temple bell",
      "mandir ghanti",
      "bell sound",
      "ghanti",
      "mandir bell",
      "मंदिर घंटी",
      "घंटी",
    ],
    category: "tool",
    relevanceBoost: 1.5,
  },
  {
    canonicalTerm: "शंख नाद",
    alternateTerms: [
      "shankh",
      "shankh nada",
      "shankh sound",
      "conch sound",
      "shankhanaad",
      "शंख",
      "शंख नाद",
    ],
    category: "tool",
    relevanceBoost: 1.5,
  },
  {
    canonicalTerm: "136.1 Hz ॐ नाद",
    alternateTerms: [
      "om nada",
      "136.1 hz",
      "136.1hz",
      "cosmic om",
      "om frequency",
      "om sound",
      "ॐ नाद",
      "136.1 हर्ट्ज",
    ],
    category: "tool",
    relevanceBoost: 1.5,
  },
];

/**
 * 1. Unicode NFC Normalization & Punctuation Clean
 */
export function normalizeText(input: string): string {
  if (!input) return "";

  return input
    .normalize("NFC")
    // Replace Devanagari danda and double danda with space
    .replace(/[।॥]/g, " ")
    // Remove unwanted punctuation except hyphen and apostrophe
    .replace(/[^\p{L}\p{N}\s\-]/gu, " ")
    // Normalize spaces
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * 2. Indic Phonetic Normalization (Hinglish/Romanized Hindi)
 * Normalizes vowel length and common consonant spelling ambiguities.
 */
export function normalizePhonetics(query: string): string {
  let q = normalizeText(query);

  // Common Hinglish vowel normalizations
  q = q.replace(/aa/g, "a");
  q = q.replace(/ee/g, "i");
  q = q.replace(/oo/g, "u");
  q = q.replace(/ou/g, "au");
  q = q.replace(/ai/g, "e");

  // Consonant normalization
  q = q.replace(/shh?/g, "s");     // sh -> s for flexible sibilant matching
  q = q.replace(/v/g, "w");        // normalize v and w
  q = q.replace(/ph/g, "f");
  q = q.replace(/ch+/g, "c");
  q = q.replace(/kh/g, "k");
  q = q.replace(/gh/g, "g");
  q = q.replace(/dh/g, "d");
  q = q.replace(/bh/g, "b");
  q = q.replace(/th/g, "t");

  // Trim trailing silent 'a' common in Sanskrit -> Hindi translation
  // e.g. "shiva" -> "shiv", "rama" -> "ram", "krishna" -> "krishn"
  const tokens = q.split(" ").map((token) => {
    if (token.length > 3 && token.endsWith("a")) {
      return token.slice(0, -1);
    }
    return token;
  });

  return tokens.join(" ");
}

/**
 * 3. Script Detection
 */
export function detectScript(text: string): "devanagari" | "latin" | "mixed" {
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  const hasLatin = /[a-zA-Z]/.test(text);

  if (hasDevanagari && hasLatin) return "mixed";
  if (hasDevanagari) return "devanagari";
  return "latin";
}

/**
 * Extract Hindi and English representations from strings formatted like "हिन्दी नाम (English Name)"
 */
function parseBilingualTitle(raw: string): { titleHi: string; titleEn: string } {
  if (!raw) return { titleHi: "", titleEn: "" };
  const match = raw.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return {
      titleHi: match[1].trim(),
      titleEn: match[2].trim(),
    };
  }
  // Check if string is predominantly Devanagari
  if (/[\u0900-\u097F]/.test(raw)) {
    return { titleHi: raw.trim(), titleEn: raw.trim() };
  }
  return { titleHi: raw.trim(), titleEn: raw.trim() };
}

/**
 * 4. Build Search Corpus from Devotional Data
 */
let CACHED_CORPUS: SearchResultItem[] | null = null;

export function getSearchCorpus(): SearchResultItem[] {
  if (CACHED_CORPUS) return CACHED_CORPUS;

  const items: SearchResultItem[] = [];

  // Bhajans
  BHAJANS.forEach((b) => {
    const parsed = parseBilingualTitle(b.title);
    items.push({
      id: `bhajan-${b.slug}`,
      title: parsed.titleEn || b.title,
      titleHi: parsed.titleHi || b.title,
      category: "bhajan",
      categoryHi: "भजन",
      slug: b.slug,
      href: `/bhajan/${b.slug}`,
      description: (b as unknown as { description?: string; lyrics?: string }).description || `${parsed.titleHi} - भगवान ${b.deity} का पावन भजन।`,
      deity: b.deity,
      score: 0,
    });
  });

  // Mantras
  MANTRAS.forEach((m) => {
    const parsed = parseBilingualTitle(m.title);
    items.push({
      id: `mantra-${m.slug}`,
      title: parsed.titleEn || m.title,
      titleHi: parsed.titleHi || m.title,
      category: "mantra",
      categoryHi: "मंत्र",
      slug: m.slug,
      href: `/mantra/${m.slug}`,
      description: m.meaning || `${parsed.titleHi} - सिद्ध मंत्र पाठ एवं साधना।`,
      deity: m.deity,
      score: 0,
    });
  });

  // Chalisas
  CHALISAS.forEach((c) => {
    const parsed = parseBilingualTitle(c.title);
    items.push({
      id: `chalisa-${c.slug}`,
      title: parsed.titleEn || c.title,
      titleHi: parsed.titleHi || c.title,
      category: "chalisa",
      categoryHi: "चालीसा",
      slug: c.slug,
      href: `/chalisa/${c.slug}`,
      description: c.significance || `${parsed.titleHi} - सम्पूर्ण चालीसा पाठ एवं भावार्थ।`,
      deity: c.deity,
      score: 0,
    });
  });

  // Aartis
  AARTIS.forEach((a) => {
    const parsed = parseBilingualTitle(a.title);
    items.push({
      id: `aarti-${a.slug}`,
      title: parsed.titleEn || a.title,
      titleHi: parsed.titleHi || a.title,
      category: "aarti",
      categoryHi: "आरती",
      slug: a.slug,
      href: `/aarti/${a.slug}`,
      description: a.significance || `${parsed.titleHi} - नित्य दैनिक आरती संग्रह।`,
      deity: a.deity,
      score: 0,
    });
  });

  // Stotras
  STOTRAS.forEach((s) => {
    const parsed = parseBilingualTitle(s.title);
    items.push({
      id: `stotra-${s.slug}`,
      title: parsed.titleEn || s.title,
      titleHi: parsed.titleHi || s.title,
      category: "stotra",
      categoryHi: "स्तोत्र",
      slug: s.slug,
      href: `/stotra/${s.slug}`,
      description: s.significance || `${parsed.titleHi} - पावन स्तोत्र पाठ।`,
      deity: s.deity,
      score: 0,
    });
  });

  // Temples
  TEMPLES.forEach((t) => {
    const parsed = parseBilingualTitle(t.name);
    items.push({
      id: `temple-${t.slug}`,
      title: parsed.titleEn || t.name,
      titleHi: parsed.titleHi || t.name,
      category: "mandir",
      categoryHi: "मंदिर",
      slug: t.slug,
      href: `/mandir/${t.slug}`,
      description: `${t.location} - ${t.significance}`,
      deity: t.deity,
      score: 0,
    });
  });

  // Festivals
  FESTIVALS.forEach((f) => {
    const parsed = parseBilingualTitle(f.name);
    items.push({
      id: `festival-${f.slug}`,
      title: parsed.titleEn || f.name,
      titleHi: parsed.titleHi || f.name,
      category: "festivals",
      categoryHi: "त्योहार एवं व्रत",
      slug: f.slug,
      href: `/festivals/${f.slug}`,
      description: `${f.significance} (तिथि: ${f.tithi})`,
      score: 0,
    });
  });

  // Scriptures / Granth
  SCRIPTURES.forEach((g) => {
    const parsed = parseBilingualTitle(g.title);
    items.push({
      id: `granth-${g.slug}`,
      title: parsed.titleEn || g.title,
      titleHi: parsed.titleHi || g.title,
      category: "granth",
      categoryHi: "धर्म ग्रंथ",
      slug: g.slug,
      href: `/granth/${g.slug}`,
      description: g.description,
      score: 0,
    });
  });

  // Encyclopedia
  ENCYCLOPEDIA_ENTRIES.forEach((e) => {
    const parsed = parseBilingualTitle(e.title);
    items.push({
      id: `encyclopedia-${e.slug}`,
      title: parsed.titleEn || e.title,
      titleHi: parsed.titleHi || e.title,
      category: "encyclopedia",
      categoryHi: "ज्ञानकोश",
      slug: e.slug,
      href: `/encyclopedia/${e.slug}`,
      description: e.summary,
      score: 0,
    });
  });

  // Articles
  ARTICLES.forEach((art) => {
    const parsed = parseBilingualTitle(art.title);
    items.push({
      id: `article-${art.slug}`,
      title: parsed.titleEn || art.title,
      titleHi: parsed.titleHi || art.title,
      category: "articles",
      categoryHi: "लेख",
      slug: art.slug,
      href: `/articles/${art.slug}`,
      description: art.excerpt,
      score: 0,
    });
  });

  // Authors
  AUTHORS.forEach((auth) => {
    items.push({
      id: `author-${auth.slug}`,
      title: auth.name,
      titleHi: auth.name,
      category: "authors",
      categoryHi: "विद्वान",
      slug: auth.slug,
      href: `/authors/${auth.slug}`,
      description: `${auth.role} - ${auth.bio}`,
      score: 0,
    });
  });

  // Tools
  TOOLS.forEach((t) => {
    const parsed = parseBilingualTitle(t.name);
    items.push({
      id: `tool-${t.slug}`,
      title: parsed.titleEn || t.name,
      titleHi: parsed.titleHi || t.name,
      category: "tools",
      categoryHi: "साधना टूल",
      slug: t.slug,
      href: `/tools/${t.slug}`,
      description: t.description,
      score: 0,
    });
  });

  // Rashis
  RASHIS.forEach((r) => {
    const parsed = parseBilingualTitle(r.name);
    items.push({
      id: `rashi-${r.id}`,
      title: `${parsed.titleEn || r.id} Rashi`,
      titleHi: `${parsed.titleHi} राशि`,
      category: "rashifal",
      categoryHi: "राशिफल",
      slug: r.id,
      href: `/rashifal/${r.id}`,
      description: `${parsed.titleHi} राशि स्वामी: ${r.lord}, मंत्र: ${r.mantra}`,
      score: 0,
    });
  });

  // Special System Entities (Panchang, Status Maker, Darshan, Meditation)
  items.push(
    {
      id: "sys-panchang",
      title: "Daily Panchang & Brahma Muhurat",
      titleHi: "दैनिक पंचांग एवं ब्रह्म मुहूर्त",
      category: "panchang",
      categoryHi: "पंचांग",
      slug: "panchang",
      href: "/panchang",
      description: "आज का पंचांग, सूर्योदय, सूर्यास्त, राहुकाल, शुभ चौघड़िया एवं ब्रह्म मुहूर्त समय।",
      score: 0,
    },
    {
      id: "sys-status-maker",
      title: "Bhakti Status Studio",
      titleHi: "भक्ति स्टेटस स्टूडियो",
      category: "tools",
      categoryHi: "साधना टूल",
      slug: "status-maker",
      href: "/status-maker",
      description: "सुंदर सनातन सुविचार, श्लोक व भजन के साथ 9:16 और 1:1 स्टेटस कार्ड बनाएं।",
      score: 0,
    },
    {
      id: "sys-daily-darshan",
      title: "Daily Temple Darshan",
      titleHi: "दैनिक दिव्य दर्शन",
      category: "mandir",
      categoryHi: "मंदिर",
      slug: "daily-darshan",
      href: "/daily-darshan",
      description: "काशी विश्वनाथ, महाकालेश्वर, सोमनाथ एवं तिरुपति बालाजी के पावन दर्शन।",
      score: 0,
    },
    {
      id: "sys-meditation",
      title: "Meditation & Chanting Room",
      titleHi: "ध्यान एवं जप कक्ष",
      category: "tools",
      categoryHi: "साधना टूल",
      slug: "meditation",
      href: "/meditation",
      description: "136.1 Hz ॐ नाद, तानपुरा, बांसुरी और मंदिर घंटी के साथ शांत ध्यान कक्ष।",
      score: 0,
    }
  );

  CACHED_CORPUS = items;
  return CACHED_CORPUS;
}

/**
 * 5. Intelligent Multilingual Search Algorithm
 */
export function searchDevotionalContent(
  query: string,
  categoryFilter: string = "all"
): SearchResultItem[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const rawQuery = query.trim();
  const normalizedQuery = normalizeText(rawQuery);
  const phoneticQuery = normalizePhonetics(rawQuery);
  const corpus = getSearchCorpus();

  // Find synonym expansions - bidirectional substring matching
  const matchedSynonyms = SEARCH_SYNONYMS.filter((syn) => {
    const normCanonical = normalizeText(syn.canonicalTerm);
    if (normalizedQuery.includes(normCanonical) || normCanonical.includes(normalizedQuery)) {
      return true;
    }
    return syn.alternateTerms.some((alt) => {
      const normAlt = normalizeText(alt);
      const phonAlt = normalizePhonetics(alt);
      return (
        normAlt === normalizedQuery ||
        normalizedQuery.includes(normAlt) ||
        normAlt.includes(normalizedQuery) ||
        phonAlt === phoneticQuery ||
        phoneticQuery.includes(phonAlt) ||
        phonAlt.includes(phoneticQuery)
      );
    });
  });

  const scoredResults: SearchResultItem[] = [];

  for (const item of corpus) {
    if (categoryFilter !== "all" && item.category !== categoryFilter) {
      continue;
    }

    const itemTitleNorm = normalizeText(item.title);
    const itemTitleHiNorm = normalizeText(item.titleHi);
    const itemTitlePhon = normalizePhonetics(item.title);
    const itemDescNorm = normalizeText(item.description);
    const itemDeityNorm = item.deity ? normalizeText(item.deity) : "";
    const itemCategoryNorm = normalizeText(item.category);
    const itemCategoryHiNorm = normalizeText(item.categoryHi);

    let score = 0;

    // 1. Exact canonical or alternate title match
    if (itemTitleNorm === normalizedQuery || itemTitleHiNorm === normalizedQuery) {
      score += 100;
    } else if (itemTitlePhon === phoneticQuery) {
      score += 90;
    }

    // 2. Exact match through synonym dictionary
    for (const syn of matchedSynonyms) {
      const canonicalNorm = normalizeText(syn.canonicalTerm);
      if (
        itemTitleHiNorm.includes(canonicalNorm) ||
        itemTitleNorm.includes(canonicalNorm) ||
        itemDeityNorm.includes(canonicalNorm)
      ) {
        score += 85 * (syn.relevanceBoost || 1.0);
      } else if (syn.category && syn.category === item.category) {
        score += 45 * (syn.relevanceBoost || 1.0);
      }
    }

    // 3. Title contains normalized query
    if (itemTitleHiNorm.includes(normalizedQuery)) {
      score += 70;
    } else if (itemTitleNorm.includes(normalizedQuery)) {
      score += 65;
    } else if (itemTitlePhon.includes(phoneticQuery)) {
      score += 60;
    }

    // 4. Deity match
    if (itemDeityNorm && itemDeityNorm.includes(normalizedQuery)) {
      score += 55;
    }

    // 5. Query token overlap
    const queryTokens = normalizedQuery.split(" ").filter((t) => t.length > 1);
    let matchedTokensCount = 0;
    for (const token of queryTokens) {
      const phonToken = normalizePhonetics(token);
      if (
        itemTitleHiNorm.includes(token) ||
        itemTitleNorm.includes(token) ||
        itemTitlePhon.includes(phonToken)
      ) {
        matchedTokensCount++;
        score += 30;
      } else if (itemDeityNorm && (itemDeityNorm.includes(token) || itemDeityNorm.includes(phonToken))) {
        matchedTokensCount++;
        score += 25;
      } else if (
        itemCategoryNorm === token ||
        itemCategoryHiNorm === token ||
        (token === "bhajan" && item.category === "bhajan") ||
        (token === "भजन" && item.category === "bhajan") ||
        (token === "aarti" && item.category === "aarti") ||
        (token === "आरती" && item.category === "aarti") ||
        (token === "mantra" && item.category === "mantra") ||
        (token === "मंत्र" && item.category === "mantra") ||
        (token === "chalisa" && item.category === "chalisa") ||
        (token === "चालीसा" && item.category === "chalisa") ||
        (token === "vrat" && item.category === "festivals") ||
        (token === "व्रत" && item.category === "festivals")
      ) {
        matchedTokensCount++;
        score += 35;
      } else if (itemDescNorm.includes(token)) {
        matchedTokensCount++;
        score += 10;
      }
    }

    // If all tokens matched, grant a synergy bonus
    if (queryTokens.length > 1 && matchedTokensCount === queryTokens.length) {
      score += 40;
    }

    // Only include if score exceeds threshold
    if (score > 15) {
      scoredResults.push({
        ...item,
        score,
        snippet: generateSnippet(item.description, queryTokens),
      });
    }
  }

  // Sort by score descending
  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults;
}

/**
 * Generate a concise context snippet around matched query tokens
 */
function generateSnippet(description: string, tokens: string[]): string {
  if (!description) return "";
  if (!tokens || tokens.length === 0) {
    return description.slice(0, 120) + (description.length > 120 ? "..." : "");
  }

  const lowerDesc = description.toLowerCase();
  let firstIdx = -1;

  for (const token of tokens) {
    const idx = lowerDesc.indexOf(token.toLowerCase());
    if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
      firstIdx = idx;
    }
  }

  if (firstIdx === -1) {
    return description.slice(0, 120) + (description.length > 120 ? "..." : "");
  }

  const start = Math.max(0, firstIdx - 40);
  const end = Math.min(description.length, firstIdx + 100);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < description.length ? "..." : "";

  return `${prefix}${description.slice(start, end).trim()}${suffix}`;
}

/**
 * Autocomplete / Live search suggestions
 */
export function getLiveSuggestions(query: string, limit: number = 6): SearchResultItem[] {
  const results = searchDevotionalContent(query);
  return results.slice(0, limit);
}
