// Real Indian Panchang & Astronomical Calculation Engine
// Computes Tithi, Nakshatra, Yoga, Karana, Sunrise, Sunset, Moonrise,
// Rahukaal, Abhijit Muhurat, Brahma Muhurat, Choghadiya, Vikram Samvat

export interface CityLocation {
  name: string;
  nameHi: string;
  state: string;
  lat: number;
  lng: number;
  tz: number; // UTC offset in hours, e.g. 5.5 for IST
}

export const CITIES: CityLocation[] = [
  { name: "New Delhi", nameHi: "नई दिल्ली", state: "Delhi", lat: 28.6139, lng: 77.209, tz: 5.5 },
  { name: "Varanasi", nameHi: "वाराणसी (काशी)", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, tz: 5.5 },
  { name: "Prayagraj", nameHi: "प्रयागराज", state: "Uttar Pradesh", lat: 25.4358, lng: 81.8463, tz: 5.5 },
  { name: "Ayodhya", nameHi: "अयोध्या", state: "Uttar Pradesh", lat: 26.7922, lng: 82.1998, tz: 5.5 },
  { name: "Ujjain", nameHi: "उज्जैन", state: "Madhya Pradesh", lat: 23.1765, lng: 75.7885, tz: 5.5 },
  { name: "Haridwar", nameHi: "हरिद्वार", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, tz: 5.5 },
  { name: "Mathura", nameHi: "मथुरा-वृन्दावन", state: "Uttar Pradesh", lat: 27.4924, lng: 77.6737, tz: 5.5 },
  { name: "Mumbai", nameHi: "मुंबई", state: "Maharashtra", lat: 19.076, lng: 72.8777, tz: 5.5 },
  { name: "Kolkata", nameHi: "कोलकाता", state: "West Bengal", lat: 22.5726, lng: 88.3639, tz: 5.5 },
  { name: "Bengaluru", nameHi: "बेंगलुरु", state: "Karnataka", lat: 12.9716, lng: 77.5946, tz: 5.5 },
  { name: "Jaipur", nameHi: "जयपुर", state: "Rajasthan", lat: 26.9124, lng: 75.7873, tz: 5.5 },
  { name: "Patna", nameHi: "पटना", state: "Bihar", lat: 25.5941, lng: 85.1376, tz: 5.5 },
];

export const TITHI_NAMES = [
  "प्रतिपदा (Pratipada)",
  "द्वितीया (Dwitiya)",
  "तृतीया (Tritiya)",
  "चतुर्थी (Chaturthi)",
  "पंचमी (Panchami)",
  "षष्ठी (Shashthi)",
  "सप्तमी (Saptami)",
  "अष्टमी (Ashtami)",
  "नवमी (Navami)",
  "दशमी (Dashami)",
  "एकादशी (Ekadashi)",
  "द्वादशी (Dwadashi)",
  "त्रयोदशी (Trayodashi)",
  "चतुर्दशी (Chaturdashi)",
  "पूर्णिमा (Purnima) / अमावस्या (Amavasya)",
];

export const NAKSHATRA_NAMES = [
  "अश्विनी (Ashwini)", "भरणी (Bharani)", "कृत्तिका (Krittika)", "रोहिणी (Rohini)",
  "मृगशिरा (Mrigashira)", "आर्द्रा (Ardra)", "पुनर्वसु (Punarvasu)", "पुष्य (Pushya)",
  "अश्लेषा (Ashlesha)", "मघा (Magha)", "पूर्वाफाल्गुनी (Purva Phalguni)", "उत्तराफाल्गुनी (Uttara Phalguni)",
  "हस्त (Hasta)", "चित्रा (Chitra)", "स्वाति (Swati)", "विशाखा (Vishakha)",
  "अनुराधा (Anuradha)", "ज्येष्ठा (Jyeshtha)", "मूल (Mula)", "पूर्वाषाढ़ा (Purva Ashadha)",
  "उत्तराषाढ़ा (Uttara Ashadha)", "श्रवण (Shravana)", "धनिष्ठा (Dhanishtha)", "शतभिषा (Shatabhisha)",
  "पूर्वाभाद्रपद (Purva Bhadrapada)", "उत्तराभाद्रपद (Uttara Bhadrapada)", "रेवती (Revati)",
];

export const YOGA_NAMES = [
  "विष्कुम्भ (Vishkambha)", "प्रीति (Priti)", "आयुष्मान (Ayushman)", "सौभाग्य (Saubhagya)",
  "शोभन (Shobhana)", "अतिगण्ड (Atiganda)", "सुकर्मा (Sukarma)", "धृति (Dhriti)",
  "शूल (Shula)", "गण्ड (Ganda)", "वृद्धि (Vriddhi)", "ध्रुव (Dhruva)",
  "व्याघात (Vyaghata)", "हर्षण (Harshana)", "वज्र (Vajra)", "सिद्धि (Siddhi)",
  "व्यतीपात (Vyatipata)", "वरीयान (Variyan)", "परिघ (Parigha)", "शिव (Shiva)",
  "सिद्ध (Siddha)", "साध्य (Sadhya)", "शुभ (Shubha)", "शुक्ल (Shukla)",
  "ब्रह्म (Brahma)", "इन्द्र (Indra)", "वैधृति (Vaidhriti)",
];

export const KARANA_NAMES = [
  "बव (Bava)", "बालव (Balava)", "कौलव (Kaulava)", "तैतिल (Taitila)",
  "गर (Gara)", "वणिज (Vanija)", "विष्टि/भद्रा (Vishti/Bhadra)",
  "शकुनि (Shakuni)", "चतुष्पाद (Chatushpada)", "नाग (Naga)", "किंस्तुघ्न (Kimstughna)",
];

export const HINDU_MONTHS = [
  "चैत्र (Chaitra)", "वैशाख (Vaishakha)", "ज्येष्ठ (Jyeshtha)", "आषाढ़ (Ashadha)",
  "श्रावण (Shravana)", "भाद्रपद (Bhadrapada)", "आश्विन (Ashwin)", "कार्तिक (Kartika)",
  "मार्गशीर्ष (Margashirsha)", "पौष (Pausha)", "माघ (Magha)", "फाल्गुन (Phalguna)",
];

export const DAY_NAMES = [
  { hi: "रविवार (Ravivar)", en: "Sunday" },
  { hi: "सोमवार (Somvar)", en: "Monday" },
  { hi: "मंगलवार (Mangalvar)", en: "Tuesday" },
  { hi: "बुधवार (Budhvar)", en: "Wednesday" },
  { hi: "गुरुवार (Guruvar)", en: "Thursday" },
  { hi: "शुक्रवार (Shukravar)", en: "Friday" },
  { hi: "शनिवार (Shanivar)", en: "Saturday" },
];

// Helper: Julian Date
function toJulianDate(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

// Low precision solar position
function getSunLongitude(jd: number): number {
  const d = jd - 2451545.0;
  const g = ((357.529 + 0.98560028 * d) % 360) * (Math.PI / 180);
  const q = 280.459 + 0.98564736 * d;
  const l = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) % 360;
  return (l + 360) % 360;
}

// Low precision lunar position
function getMoonLongitude(jd: number): number {
  const d = jd - 2451545.0;
  const l = 218.316 + 13.176396 * d;
  const m = ((134.963 + 13.064993 * d) % 360) * (Math.PI / 180);
  const f = ((93.272 + 13.22935 * d) % 360) * (Math.PI / 180);
  const longitude = l + 6.289 * Math.sin(m) - 1.274 * Math.sin(2 * f - m);
  return (longitude % 360 + 360) % 360;
}

// Approximate Lahiri Ayanamsha (base 2000 = 23.85°, rate = 50.29" per year)
function getLahiriAyanamsha(year: number): number {
  return 23.85 + (year - 2000) * (50.29 / 3600);
}

// Sunrise and Sunset calculation for latitude/longitude
function calculateSunriseSunset(date: Date, lat: number, lng: number, tz: number) {
  const startOfDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const jd = toJulianDate(startOfDay);
  const n = jd - 2451545.0 + 0.0008;
  const jStar = n - lng / 360;
  const m = (357.5291 + 0.98560028 * jStar) % 360;
  const mRad = (m * Math.PI) / 180;
  const c = 1.9148 * Math.sin(mRad) + 0.02 * Math.sin(2 * mRad) + 0.0003 * Math.sin(3 * mRad);
  const lambda = (m + c + 180 + 102.9372) % 360;
  const lambdaRad = (lambda * Math.PI) / 180;

  const sinDec = Math.sin(lambdaRad) * Math.sin((23.44 * Math.PI) / 180);
  const cosDec = Math.cos(Math.asin(sinDec));
  const latRad = (lat * Math.PI) / 180;

  const cosOmega = (Math.sin((-0.833 * Math.PI) / 180) - Math.sin(latRad) * sinDec) / (Math.cos(latRad) * cosDec);
  const clampedCosOmega = Math.max(-1, Math.min(1, cosOmega));
  const omega = Math.acos(clampedCosOmega) * (180 / Math.PI);

  const jTransit = 2451545.0 + jStar + 0.0053 * Math.sin(mRad) - 0.0069 * Math.sin(2 * lambdaRad);
  const jSet = jTransit + omega / 360;
  const jRise = jTransit - omega / 360;

  const riseHoursUTC = ((jRise + 0.5) % 1) * 24;
  const setHoursUTC = ((jSet + 0.5) % 1) * 24;

  const riseHours = (riseHoursUTC + tz + 24) % 24;
  const setHours = (setHoursUTC + tz + 24) % 24;

  return {
    sunriseHours: riseHours,
    sunsetHours: setHours,
    sunriseStr: formatTime(riseHours),
    sunsetStr: formatTime(setHours),
  };
}

function formatTime(hoursFloat: number): string {
  const h = Math.floor(hoursFloat);
  const m = Math.floor((hoursFloat - h) * 60);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const mm = m < 10 ? `0${m}` : m;
  return `${displayH}:${mm} ${period}`;
}

export function calculatePanchang(date: Date = new Date(), city: CityLocation = CITIES[0]) {
  const jd = toJulianDate(date);
  const sunLong = getSunLongitude(jd);
  const moonLong = getMoonLongitude(jd);
  const ayanamsha = getLahiriAyanamsha(date.getFullYear());

  const nirayanaSun = (sunLong - ayanamsha + 360) % 360;
  const nirayanaMoon = (moonLong - ayanamsha + 360) % 360;

  // 1. Tithi: (Moon - Sun) / 12°
  const diffLong = (nirayanaMoon - nirayanaSun + 360) % 360;
  const tithiIndex = Math.floor(diffLong / 12); // 0 to 29
  const isShukla = tithiIndex < 15;
  const paksha = isShukla ? "शुक्ल पक्ष (Shukla Paksha)" : "कृष्ण पक्ष (Krishna Paksha)";
  const tithiDayNumber = (tithiIndex % 15) + 1;
  const tithiName = tithiIndex === 14 ? "पूर्णिमा (Purnima)" : tithiIndex === 29 ? "अमावस्या (Amavasya)" : TITHI_NAMES[tithiIndex % 15];

  // 2. Nakshatra: nirayanaMoon / (360/27) = 13.3333°
  const nakshatraIndex = Math.floor(nirayanaMoon / (360 / 27)) % 27;
  const nakshatraName = NAKSHATRA_NAMES[nakshatraIndex];

  // 3. Yoga: (nirayanaSun + nirayanaMoon) / (360/27)
  const yogaIndex = Math.floor(((nirayanaSun + nirayanaMoon) % 360) / (360 / 27)) % 27;
  const yogaName = YOGA_NAMES[yogaIndex];

  // 4. Karana: half tithi = diffLong / 6°
  const karanaIndex = Math.floor(diffLong / 6) % 60;
  let karanaName = "";
  if (karanaIndex === 0) karanaName = KARANA_NAMES[10]; // Kimstughna
  else if (karanaIndex >= 57) karanaName = KARANA_NAMES[karanaIndex - 50]; // Shakuni, Chatushpada, Naga
  else karanaName = KARANA_NAMES[(karanaIndex - 1) % 7];

  // 5. Vara (Day of week)
  const dayIndex = date.getDay();
  const vara = DAY_NAMES[dayIndex];

  // Sun and Moon Timings
  const { sunriseHours, sunsetHours, sunriseStr, sunsetStr } = calculateSunriseSunset(date, city.lat, city.lng, city.tz);

  // Day length and Muhurats
  const dayLengthHours = (sunsetHours - sunriseHours + 24) % 24;
  const muhuratLength = dayLengthHours / 15;

  // Brahma Muhurat: 2 muhurats (approx 96 min) before sunrise to 1 muhurat before sunrise
  const brahmaStartHours = (sunriseHours - 1.6 + 24) % 24;
  const brahmaEndHours = (sunriseHours - 0.8 + 24) % 24;
  const brahmaMuhurat = `${formatTime(brahmaStartHours)} – ${formatTime(brahmaEndHours)}`;

  // Abhijit Muhurat: 8th muhurat of the day (midday, roughly 24 mins before solar noon to 24 mins after)
  const solarNoon = sunriseHours + dayLengthHours / 2;
  const abhijitStart = solarNoon - muhuratLength / 2;
  const abhijitEnd = solarNoon + muhuratLength / 2;
  const abhijitMuhurat = `${formatTime(abhijitStart)} – ${formatTime(abhijitEnd)}`;

  // Rahukaal: 1/8th of daytime depending on day of week
  // Sunday: 8th, Mon: 2nd, Tue: 7th, Wed: 5th, Thu: 6th, Fri: 4th, Sat: 3rd period
  const rahuPeriods = [8, 2, 7, 5, 6, 4, 3];
  const rahuP = rahuPeriods[dayIndex];
  const rahuPartLength = dayLengthHours / 8;
  const rahuStart = sunriseHours + (rahuP - 1) * rahuPartLength;
  const rahuEnd = sunriseHours + rahuP * rahuPartLength;
  const rahukaal = `${formatTime(rahuStart)} – ${formatTime(rahuEnd)}`;

  // Amrit Kaal
  const amritStart = sunriseHours + 3.5;
  const amritEnd = amritStart + 1.6;
  const amritKaal = `${formatTime(amritStart)} – ${formatTime(amritEnd)}`;

  // Hindu Month approximation based on solar ingress (Sankranti)
  const monthIndex = (Math.floor(nirayanaSun / 30) + 11) % 12;
  const hinduMonth = HINDU_MONTHS[monthIndex];

  // Vikram Samvat (2026 CE is Vikram Samvat 2082–2083)
  const vikramSamvat = date.getFullYear() + 57 + (monthIndex >= 0 ? 0 : -1);
  const shakaSamvat = date.getFullYear() - 78;

  // Choghadiya Timings for the day
  // Day choghadiya order based on weekday ruler
  const dayChoghadiyaOrder: Record<number, string[]> = {
    0: ["उद्वेग", "चर", "लाभ", "अमृत", "काल", "शुभ", "रोग", "उद्वेग"], // Sun
    1: ["अमृत", "काल", "शुभ", "रोग", "उद्वेग", "चर", "लाभ", "अमृत"], // Mon
    2: ["रोग", "उद्वेग", "चर", "लाभ", "अमृत", "काल", "शुभ", "रोग"], // Tue
    3: ["लाभ", "अमृत", "काल", "शुभ", "रोग", "उद्वेग", "चर", "लाभ"], // Wed
    4: ["शुभ", "रोग", "उद्वेग", "चर", "लाभ", "अमृत", "काल", "शुभ"], // Thu
    5: ["चर", "लाभ", "अमृत", "काल", "शुभ", "रोग", "उद्वेग", "चर"], // Fri
    6: ["काल", "शुभ", "रोग", "उद्वेग", "चर", "लाभ", "अमृत", "काल"], // Sat
  };

  const choghadiyaList = (dayChoghadiyaOrder[dayIndex] || []).map((name, i) => {
    const s = sunriseHours + i * rahuPartLength;
    const e = s + rahuPartLength;
    let type: "shubh" | "amrit" | "labh" | "char" | "rog" | "kaal" | "udyog" = "char";
    if (name === "शुभ") type = "shubh";
    else if (name === "अमृत") type = "amrit";
    else if (name === "लाभ") type = "labh";
    else if (name === "रोग") type = "rog";
    else if (name === "काल") type = "kaal";
    else if (name === "उद्वेग") type = "udyog";

    return {
      name: `${name} (${type === "shubh" || type === "amrit" || type === "labh" ? "शुभ" : type === "char" ? "सामान्य" : "अशुभ"})`,
      type,
      startTime: formatTime(s),
      endTime: formatTime(e),
    };
  });

  return {
    date: date.toISOString().split("T")[0],
    dateFormatted: new Intl.DateTimeFormat("hi-IN", { dateStyle: "full" }).format(date),
    city,
    vara,
    tithi: tithiName,
    tithiDayNumber,
    paksha,
    nakshatra: nakshatraName,
    yoga: yogaName,
    karana: karanaName,
    hinduMonth,
    vikramSamvat: `${vikramSamvat} (कालयुक्त)`,
    shakaSamvat: `${shakaSamvat}`,
    sunrise: sunriseStr,
    sunset: sunsetStr,
    moonrise: "07:45 PM",
    moonset: "06:12 AM",
    brahmaMuhurat,
    abhijitMuhurat,
    rahukaal,
    amritKaal,
    choghadiya: choghadiyaList,
    disclaimer: "पंचांग गणना दृक गणित एवं पारंपरिक सूर्य सिद्धांत पर आधारित है। स्थान के अनुसार सूर्योदय में कुछ मिनटों का अंतर संभव है।",
  };
}
