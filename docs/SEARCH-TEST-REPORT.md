# Bhavlaya Multilingual Search Test Report

**Date:** November 2026  
**Test Suite:** `src/lib/searchEngine.test.ts`  
**Total Test Cases:** 14  
**Pass Rate:** 100% (14 / 14 Passed)  

---

## 1. Automated Acceptance Tests Summary

| Case # | Input Query | Target Topic | Match Type | Top Result Title | Category | Score | Status |
|---|---|---|---|---|---|---|---|
| 1 | `hanuman chalisa` | Hanuman Chalisa | Hinglish Canonical | श्री हनुमान चालीसा | चालीसा | 335 | **PASS** |
| 2 | `हनुमान चालीसा` | Hanuman Chalisa | Devanagari Exact | श्री हनुमान चालीसा | चालीसा | 270 | **PASS** |
| 3 | `hanumaan chalisa` | Hanuman Chalisa | Hinglish Phonetic | श्री हनुमान चालीसा | चालीसा | 330 | **PASS** |
| 4 | `shiv aarti` | Shiva Aarti | Hinglish Canonical | ॐ जय शिव ओंकारा | आरती | 372 | **PASS** |
| 5 | `shiva arti` | Shiva Aarti | Hinglish Phonetic | ॐ जय शिव ओंकारा | आरती | 297 | **PASS** |
| 6 | `mahadev` | Shiva Content | Synonym Expansion | शंकर तेरी जटा में बहती है गंग धारा | भजन | 127.5 | **PASS** |
| 7 | `भोलेनाथ` | Shiva Content | Devanagari Alias | शंकर तेरी जटा में बहती है गंग धारा | भजन | 127.5 | **PASS** |
| 8 | `krishna bhajan` | Krishna Bhajan | Combined Token | अच्युतम केशवं कृष्ण दामोदरम् | भजन | 171 | **PASS** |
| 9 | `कृष्ण भजन` | Krishna Bhajan | Devanagari Token | अच्युतम केशवं कृष्ण दामोदरम् | भजन | 171 | **PASS** |
| 10 | `om namah shivaya` | Shiva Mantra | Hinglish Mantra | शिव पंचाक्षरी मंत्र | मंत्र | 503.5 | **PASS** |
| 11 | `ekadashi vrat` | Ekadashi Vrat | Vrat Canonical | निर्जला एकादशी व्रत | त्योहार व व्रत | 352 | **PASS** |
| 12 | `एकादशी` | Ekadashi Vrat | Devanagari Vrat | निर्जला एकादशी व्रत | त्योहार व व्रत | 357 | **PASS** |
| 13 | `brahma muhurat` | Brahma Muhurat | Panchang Alias | दैनिक पंचांग एवं ब्रह्म मुहूर्त | पंचांग | 352 | **PASS** |
| 14 | `ब्रह्म मुहूर्त` | Brahma Muhurat | Devanagari Alias | दैनिक पंचांग एवं ब्रह्म मुहूर्त | पंचांग | 287 | **PASS** |

---

## 2. Performance & Latency Observations

- **Corpus Size:** 60+ indexed sacred entities (Bhajans, Mantras, Aartis, Chalisas, Temples, Festivals, Scriptures, Tools, Encyclopedia entries, Articles).
- **Average Query Execution Time:** < 2.5 milliseconds.
- **Client Autocomplete Debounce:** 150 milliseconds.
- **Zero-result Handling:** Clean suggestions fallback showing top 6 popular search queries.
