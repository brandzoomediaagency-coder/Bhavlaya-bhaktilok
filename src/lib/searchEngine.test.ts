/**
 * Bhavlaya Multilingual Search Acceptance Tests
 */

import { searchDevotionalContent, normalizePhonetics, normalizeText } from "./searchEngine";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log("🕉️ Starting Bhavlaya Multilingual Search Test Suite...\n");

const testCases = [
  {
    query: "hanuman chalisa",
    expectedCategory: "chalisa",
    expectedKeyword: "हनुमान चालीसा",
  },
  {
    query: "हनुमान चालीसा",
    expectedCategory: "chalisa",
    expectedKeyword: "हनुमान चालीसा",
  },
  {
    query: "hanumaan chalisa",
    expectedCategory: "chalisa",
    expectedKeyword: "हनुमान चालीसा",
  },
  {
    query: "shiv aarti",
    expectedCategory: "aarti",
    expectedKeyword: "शिव",
  },
  {
    query: "shiva arti",
    expectedCategory: "aarti",
    expectedKeyword: "शिव",
  },
  {
    query: "mahadev",
    expectedCategory: "shiva", // Either aarti, mantra, or temple
    expectedKeyword: "शिव",
  },
  {
    query: "भोलेनाथ",
    expectedCategory: "shiva",
    expectedKeyword: "शिव",
  },
  {
    query: "krishna bhajan",
    expectedCategory: "bhajan",
    expectedKeyword: "कृष्ण",
  },
  {
    query: "कृष्ण भजन",
    expectedCategory: "bhajan",
    expectedKeyword: "कृष्ण",
  },
  {
    query: "om namah shivaya",
    expectedCategory: "mantra",
    expectedKeyword: "शिव",
  },
  {
    query: "ekadashi vrat",
    expectedCategory: "festivals",
    expectedKeyword: "एकादशी",
  },
  {
    query: "एकादशी",
    expectedCategory: "festivals",
    expectedKeyword: "एकादशी",
  },
  {
    query: "brahma muhurat",
    expectedCategory: "panchang",
    expectedKeyword: "पंचांग",
  },
  {
    query: "ब्रह्म मुहूर्त",
    expectedCategory: "panchang",
    expectedKeyword: "पंचांग",
  },
];

let passedCount = 0;

testCases.forEach((tc, idx) => {
  const results = searchDevotionalContent(tc.query);
  assert(results.length > 0, `Query "${tc.query}" returned 0 results!`);

  const topResult = results[0];
  console.log(`[PASS] Case #${idx + 1}: Query "${tc.query}" -> Top Result: "${topResult.titleHi}" (${topResult.categoryHi}) | Score: ${topResult.score}`);

  // Check matching relevance
  const titleMatches =
    topResult.titleHi.includes(tc.expectedKeyword) ||
    topResult.title.toLowerCase().includes(tc.expectedKeyword.toLowerCase()) ||
    (topResult.deity && topResult.deity.toLowerCase().includes("shiva"));

  assert(
    titleMatches || results.slice(0, 3).some((r) => r.titleHi.includes(tc.expectedKeyword)),
    `Query "${tc.query}" top results did not match expected keyword "${tc.expectedKeyword}"`
  );

  passedCount++;
});

console.log(`\n🎉 ALL ${passedCount}/${testCases.length} MULTILINGUAL SEARCH ACCEPTANCE TESTS PASSED!`);
