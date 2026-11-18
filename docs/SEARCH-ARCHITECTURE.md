# Bhavlaya Multilingual Search Architecture

**System:** Indic Multilingual Search Engine  
**Platform:** Bhavlaya (भावलय)  
**Supported Scripts/Languages:** Hindi (Devanagari), Hinglish (Romanized Hindi), English  

---

## 1. Search Engine Architecture Pipeline

```
[ User Input Query ]
         │
         ▼
[ 1. Unicode NFC & Whitespace Normalization ]
         │
         ▼
[ 2. Script Detection & Punctuation Stripping ]
   (Devanagari, Latin/Hinglish, or Mixed)
         │
         ▼
[ 3. Indic Transliteration & Phonetic Normalization ]
   - Vowel lengthening normalization (aa -> a, ee -> i, oo -> u)
   - Sibilant normalization (sh -> s, shiv -> siv)
   - Word ending silent 'a' handling (shiva <-> shiv, rama <-> ram)
         │
         ▼
[ 4. Canonical Synonym & Alias Database Expansion ]
   - Maps: "mahadev", "bholenath", "shiv" -> "भगवान शिव"
   - Maps: "bajrang baan", "hanuman chalisa" -> Canonical Entities
         │
         ▼
[ 5. Multi-field Token Indexing & Weighted Ranking ]
   - Exact Title Match (100)
   - Alias / Canonical Match (90)
   - Devanagari Equivalent Match (85)
   - Romanized Equivalent Match (80)
   - Deity & Category Match (70)
   - Prefix Match (60)
   - Content / Lyrics Match (40)
   - Phonetic Fuzzy Match (30)
         │
         ▼
[ 6. Filtered & Deduplicated Results with Snippet Highlighting ]
```

---

## 2. Indic Transliteration & Normalization Rules

1. **Vowel Collapsing:**
   - `aa` -> `a`, `ee` -> `i`, `oo` -> `u`, `ou` -> `au`.
   - Example: `hanumaan chalisa` matches `hanuman chalisa`.
2. **Sibilant Normalization:**
   - `sh`, `s`, `shh` are matched flexibly for Indic searches (`shiv` <-> `siv`).
3. **Inherent 'A' Truncation:**
   - Sanskrit/Hindi schwa deletion convention: `shiva` <-> `shiv`, `krishna` <-> `krishan`, `rama` <-> `ram`.
4. **Devanagari Danda & Nukta:**
   - Devanagari danda (`।`), double danda (`॥`), and nuktas are handled without altering the root word.

---

## 3. Synonym & Alias Entity Schema

```typescript
interface SearchSynonym {
  canonicalTerm: string;      // e.g. "भगवान शिव"
  alternateTerms: string[];   // ["mahadev", "bholenath", "shiva", "shiv", "भोलेनाथ", "शिव शंकर"]
  category?: string;          // "deity" | "mantra" | "aarti" | "chalisa" | "vrat"
  relevanceBoost: number;     // 1.0 - 2.0
}
```

---

## 4. Acceptance Criteria & Test Matrix

| Input Query | Script | Target Topic / Canonical Entity | Pass Threshold |
|---|---|---|---|
| `hanuman chalisa` | Hinglish | Hanuman Chalisa | Score >= 90 |
| `हनुमान चालीसा` | Devanagari | Hanuman Chalisa | Score >= 95 |
| `hanumaan chalisa` | Hinglish variant | Hanuman Chalisa | Score >= 85 |
| `shiv aarti` | Hinglish | Shiva Aarti | Score >= 90 |
| `shiva arti` | Hinglish variant | Shiva Aarti | Score >= 85 |
| `mahadev` | Hinglish alias | Shiva Content | Score >= 85 |
| `भोलेनाथ` | Devanagari alias | Shiva Content | Score >= 90 |
| `krishna bhajan` | Hinglish | Krishna Bhajan | Score >= 90 |
| `कृष्ण भजन` | Devanagari | Krishna Bhajan | Score >= 95 |
| `om namah shivaya` | Hinglish | Shiva Mantra | Score >= 90 |
| `ekadashi vrat` | Hinglish | Ekadashi Vrat | Score >= 90 |
| `एकादशी` | Devanagari | Ekadashi Vrat | Score >= 90 |
| `brahma muhurat` | Hinglish | Brahma Muhurat / Panchang | Score >= 85 |
| `ब्रह्म मुहूर्त` | Devanagari | Brahma Muhurat / Panchang | Score >= 90 |
