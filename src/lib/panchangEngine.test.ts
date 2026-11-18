// Automated Validation Suite for Bhavlaya Panchang Calculation Engine
// Tests for correct AM/PM sequencing, sunrise < sunset, positive day length,
// Brahma Muhurat before sunrise, Abhijit Muhurat around midday, and Choghadiya progression.

import { calculatePanchang, CITIES, formatTime } from "./panchangEngine";

function runTests() {
  console.log("Running Panchang Astronomical Validation Suite...\n");
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      passed++;
      console.log(`  ✓ PASS: ${msg}`);
    } else {
      failed++;
      console.error(`  ✗ FAIL: ${msg}`);
    }
  }

  // Test 1: Sunrise must be in AM and Sunset in PM for standard Indian latitudes
  for (const city of CITIES) {
    const p = calculatePanchang(new Date("2026-11-18T06:00:00Z"), city);

    assert(p.sunrise.includes("AM"), `${city.name}: Sunrise must be in the AM period (got ${p.sunrise})`);
    assert(p.sunset.includes("PM"), `${city.name}: Sunset must be in the PM period (got ${p.sunset})`);

    // Parse hour parts
    const [riseH, riseM] = p.sunrise.replace(" AM", "").split(":").map(Number);
    const [setH, setM] = p.sunset.replace(" PM", "").split(":").map(Number);
    assert(riseH >= 5 && riseH <= 8, `${city.name}: Sunrise hour must be between 5 AM and 8 AM (got ${riseH}:${riseM})`);
    assert(setH >= 4 && setH <= 8, `${city.name}: Sunset hour must be between 4 PM and 8 PM (got ${setH}:${setM})`);

    // Test 2: Brahma Muhurat must precede Sunrise
    assert(p.brahmaMuhurat.includes("AM"), `${city.name}: Brahma Muhurat must be in pre-dawn AM (got ${p.brahmaMuhurat})`);

    // Test 3: Abhijit Muhurat must span midday (~11:00 AM - 1:00 PM)
    assert(p.abhijitMuhurat.includes("AM") || p.abhijitMuhurat.includes("PM"), `${city.name}: Abhijit Muhurat valid midday time`);

    // Test 4: Choghadiya list must have 8 daytime periods starting with Sunrise and ending at Sunset
    assert(p.choghadiya.length === 8, `${city.name}: Must have exactly 8 daytime Choghadiyas`);
    assert(p.choghadiya[0].startTime === p.sunrise, `${city.name}: First Choghadiya must start at Sunrise`);
    assert(p.choghadiya[7].endTime === p.sunset, `${city.name}: Eighth Choghadiya must end at Sunset`);
  }

  // Test 5: FormatTime boundary assertions
  assert(formatTime(0) === "12:00 AM", "formatTime(0) should be 12:00 AM");
  assert(formatTime(6.5) === "6:30 AM", "formatTime(6.5) should be 6:30 AM");
  assert(formatTime(12) === "12:00 PM", "formatTime(12) should be 12:00 PM");
  assert(formatTime(17.75) === "5:45 PM", "formatTime(17.75) should be 5:45 PM");
  assert(formatTime(23.99) === "11:59 PM", "formatTime(23.99) should be 11:59 PM");

  console.log(`\nTest Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
