/**
 * Bhavlaya Premium Centralized Subscription & Monetization Configuration
 *
 * Product: Bhavlaya Premium
 * Introductory Offer: ₹1 for 3 days
 * Recurring Plan: ₹499 per month
 * Currency: INR
 *
 * A Code Crew Labs Product.
 */

export interface PremiumOfferConfig {
  introductoryPriceMinorUnits: number; // 100 paise = ₹1
  introductoryPrice: number; // ₹1
  introductoryCurrency: string; // "INR"
  introductoryDurationDays: number; // 3 days
  recurringPriceMinorUnits: number; // 49,900 paise = ₹499
  recurringPrice: number; // ₹499
  recurringCurrency: string; // "INR"
  recurringPeriod: string; // "P1M" (ISO-8601 monthly)
  autoRenewEnabled: boolean; // true
  productId: string;
  basePlanId: string;
  offerId: string;
  offerTag: string;
  offerEligibility: "NEW_CUSTOMERS";
}

export const PREVIEW_SUBSCRIPTION_CONFIG: PremiumOfferConfig = {
  introductoryPriceMinorUnits: 100,
  introductoryPrice: 1,
  introductoryCurrency: "INR",
  introductoryDurationDays: 3,
  recurringPriceMinorUnits: 49900,
  recurringPrice: 499,
  recurringCurrency: "INR",
  recurringPeriod: "P1M",
  autoRenewEnabled: true,
  productId: "bhavlaya_premium_monthly",
  basePlanId: "monthly_499",
  offerId: "intro_1_inr_3_days",
  offerTag: "INTRO_1INR_3DAYS",
  offerEligibility: "NEW_CUSTOMERS",
};

export type SubscriptionState =
  | "NOT_SUBSCRIBED"
  | "INTRO_PAYMENT_PENDING"
  | "INTRO_ACTIVE"
  | "RECURRING_ACTIVE"
  | "RENEWAL_PENDING"
  | "CANCELLED_BUT_ACTIVE"
  | "EXPIRED"
  | "PAYMENT_FAILED"
  | "GRACE_PERIOD"
  | "ACCOUNT_ON_HOLD"
  | "REFUNDED"
  | "REVOKED";

export type PremiumEntitlementId =
  | "hd_wallpaper_downloads"
  | "apply_home_screen_wallpaper"
  | "apply_lock_screen_wallpaper"
  | "live_wallpaper"
  | "devotional_ringtones"
  | "set_phone_ringtone"
  | "set_notification_tone"
  | "set_alarm_tone"
  | "premium_bhajan"
  | "premium_aarti"
  | "premium_mantra"
  | "premium_chalisa"
  | "bhakti_tv"
  | "premium_devotional_videos"
  | "bhakti_alarm"
  | "daily_rashifal"
  | "bhakti_status_studio"
  | "premium_templates"
  | "premium_offline_downloads"
  | "general_premium";

export interface PremiumFeatureMetadata {
  id: PremiumEntitlementId;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  category: "audio" | "visual" | "scripture" | "utility" | "studio";
}

export const PREMIUM_FEATURES_CATALOG: PremiumFeatureMetadata[] = [
  {
    id: "hd_wallpaper_downloads",
    name: "HD Wallpaper Downloads",
    nameHi: "HD वॉलपेपर डाउनलोड",
    description: "Ultra-high resolution devotional wallpapers without watermarks.",
    descriptionHi: "बिना किसी वॉटरमार्क के अल्ट्रा एचडी वॉलपेपर डाउनलोड करें।",
    category: "visual",
  },
  {
    id: "apply_home_screen_wallpaper",
    name: "Apply Home Screen Wallpaper",
    nameHi: "होम स्क्रीन वॉलपेपर सेट करें",
    description: "One-tap direct application of divine darshan to home screen.",
    descriptionHi: "एक टैप में होम स्क्रीन पर दिव्य विग्रह दर्शन सेट करें।",
    category: "visual",
  },
  {
    id: "apply_lock_screen_wallpaper",
    name: "Apply Lock Screen Wallpaper",
    nameHi: "लॉक स्क्रीन वॉलपेपर सेट करें",
    description: "Set sanctified lock screen wallpapers with auto-refresh.",
    descriptionHi: "लॉक स्क्रीन पर नित्य पावन दर्शन वॉलपेपर सेट करें।",
    category: "visual",
  },
  {
    id: "live_wallpaper",
    name: "Live Devotional Wallpaper",
    nameHi: "लाइव दर्शन वॉलपेपर",
    description: "Animated diya, falling flowers and holy Ganga aarti live effects.",
    descriptionHi: "दीप ज्योति, पुष्प वर्षा एवं पावन आरती युक्त लाइव वॉलपेपर।",
    category: "visual",
  },
  {
    id: "devotional_ringtones",
    name: "Devotional Ringtones",
    nameHi: "दिव्य रिंगटोन संग्रह",
    description: "Studio-mastered Shankh, Bansuri, Temple Bell, and Stotra audio.",
    descriptionHi: "स्टूडियो-मास्टर्ड शंखनाद, बांसुरी, मंदिर घंटी और स्तोत्र धुनें।",
    category: "audio",
  },
  {
    id: "set_phone_ringtone",
    name: "Set Phone Ringtone",
    nameHi: "फ़ोन रिंगटोन सेट करें",
    description: "Direct system phone ringtone configuration.",
    descriptionHi: "अपने फ़ोन की कॉलिंग रिंगटोन सीधे ऐप से सेट करें।",
    category: "audio",
  },
  {
    id: "set_notification_tone",
    name: "Set Notification Tone",
    nameHi: "नोटिफिकेशन टोन सेट करें",
    description: "Gentle brass bell or mantra sound for app alerts.",
    descriptionHi: "संदेश और अलर्ट के लिए पावन घंटी व मन्त्र ध्वनि सेट करें।",
    category: "audio",
  },
  {
    id: "set_alarm_tone",
    name: "Set Alarm Tone",
    nameHi: "अलार्म टोन सेट करें",
    description: "Wake up to sacred Gayatri Mantra or Mahamrityunjaya chant.",
    descriptionHi: "प्रातःकाल गायत्री मन्त्र या महामृत्युंजय जाप से जागें।",
    category: "audio",
  },
  {
    id: "premium_bhajan",
    name: "Premium Bhajan Streaming",
    nameHi: "प्रीमियम भजन संग्रह",
    description: "Ad-free lossless audio streaming of rare and classical bhajans.",
    descriptionHi: "बिना विज्ञापन, उच्च गुणवत्ता में दुर्लभ एवं शास्त्रीय भजन सुनें।",
    category: "audio",
  },
  {
    id: "premium_aarti",
    name: "Premium Aarti Audio & Video",
    nameHi: "प्रीमियम आरती दर्शन",
    description: "Synchronized lyric scrolling with authentic temple pujari chants.",
    descriptionHi: "मंदिर के प्रामाणिक पुजारियों द्वारा उच्चारित आरती व सिंक किए गए बोल।",
    category: "audio",
  },
  {
    id: "premium_mantra",
    name: "Premium Mantra Sadhana",
    nameHi: "सिद्ध मंत्र साधना",
    description: "Padachhed, 108 japa tracking, and high-frequency sound therapy.",
    descriptionHi: "पदच्छेद, 108 जप ट्रैकिंग और 136.1 Hz नादब्रह्म साधना।",
    category: "scripture",
  },
  {
    id: "premium_chalisa",
    name: "Premium Chalisa Chanting",
    nameHi: "सम्पूर्ण चालीसा संग्रह",
    description: "Audio-assisted Doha and Chaupai recitation with font zoom.",
    descriptionHi: "दोहा व चौपाई का स्पष्ट ऑडियो पाठ एवं विस्तृत अर्थ।",
    category: "scripture",
  },
  {
    id: "bhakti_tv",
    name: "Bhakti TV 24x7",
    nameHi: "भक्ति TV लाइव दर्शन",
    description: "Continuous live streaming from top pilgrimage sites and dhams.",
    descriptionHi: "प्रमुख धामों और मंदिरों से निरंतर 24 घंटे लाइव दर्शन प्रसारण।",
    category: "visual",
  },
  {
    id: "premium_devotional_videos",
    name: "Premium Devotional Videos",
    nameHi: "प्रीमियम आध्यात्मिक वीडियो",
    description: "Curated kathas, temple documentaries, and Vedic philosophy series.",
    descriptionHi: "पौराणिक कथाएं, मंदिर डॉक्यूमेंट्री और वैदिक दर्शन श्रृंखला।",
    category: "visual",
  },
  {
    id: "bhakti_alarm",
    name: "Bhakti Brahma Muhurat Alarm",
    nameHi: "ब्रह्म मुहूर्त भक्ति अलार्म",
    description: "Astronomically calculated wake-up call based on exact daily sunrise.",
    descriptionHi: "सूर्योदय के सटीक समय पर आधारित स्वचालित ब्रह्म मुहूर्त अलार्म।",
    category: "utility",
  },
  {
    id: "daily_rashifal",
    name: "Detailed Vedic Rashifal",
    nameHi: "दैनिक वैदिक राशिफल विस्तार",
    description: "Planetary transit insights, auspicious remedies, and lucky metrics.",
    descriptionHi: "ग्रह गोचर फल, विशेष उपाय, शुभ अंक व शुभ रंग का संपूर्ण विश्लेषण।",
    category: "utility",
  },
  {
    id: "bhakti_status_studio",
    name: "Bhakti Status Studio Pro",
    nameHi: "भक्ति स्टेटस स्टूडियो प्रो",
    description: "Export ultra-HD 9:16 and 1:1 status cards without watermark.",
    descriptionHi: "बिना वॉटरमार्क के अल्ट्रा एचडी 9:16 व 1:1 स्टेटस कार्ड बनाएं।",
    category: "studio",
  },
  {
    id: "premium_templates",
    name: "Premium Status Templates",
    nameHi: "प्रीमियम स्टेटस टेम्पलेट्स",
    description: "100+ designer devotional frames, gold borders, and Sanskrit fonts.",
    descriptionHi: "100+ स्वर्ण बॉर्डर, पारंपरिक मांडना और देवनागरी डिज़ाइन फ्रेम्स।",
    category: "studio",
  },
  {
    id: "premium_offline_downloads",
    name: "Offline Devotional Downloads",
    nameHi: "ऑफ़लाइन भक्ति डाउनलोड",
    description: "Download bhajans, aartis, and scriptures for offline pilgrimage use.",
    descriptionHi: "यात्रा और बिना इंटरनेट के लिए असीमित भजन व ग्रंथ डाउनलोड करें।",
    category: "utility",
  },
  {
    id: "general_premium",
    name: "Bhavlaya VIP Experience",
    nameHi: "भावलय सम्पूर्ण अनुभव",
    description: "100% ad-free serene spiritual experience across all devices.",
    descriptionHi: "समस्त उपकरणों पर पूर्णतः विज्ञापन-मुक्त, पावन आध्यात्मिक अनुभव।",
    category: "utility",
  },
];

export const UNGATED_FREE_AREAS = [
  { id: "onboarding", path: "/onboarding", name: "Onboarding & Language Selection" },
  { id: "deity_selection", path: "/deities", name: "Deity Selection" },
  { id: "panchang_preview", path: "/panchang", name: "Daily Panchang (Basic)" },
  { id: "browse_catalog", path: "/", name: "Browse Devotional Catalog" },
  { id: "search", path: "/search", name: "Global Devotional Search" },
  { id: "cancellation", path: "/account/plan", name: "Subscription Cancellation Page" },
  { id: "restore_purchase", path: "/account/plan", name: "Restore Purchases Flow" },
  { id: "privacy_policy", path: "/privacy-policy", name: "Privacy Policy" },
  { id: "terms", path: "/terms-and-conditions", name: "Terms & Conditions" },
  { id: "help_support", path: "/contact", name: "Help Center & Support" },
];

export const SUBSCRIPTION_MARKETING_COPY = {
  hi: {
    productName: "भावलय प्रीमियम (Bhavlaya Premium)",
    headerTitle: "BHAVLAYA PREMIUM",
    headerSubtitle: "भक्ति का संपूर्ण अनुभव प्राप्त करें।",
    headerDescription: "एक ही ऐप में भजन, आरती, मंत्र, वॉलपेपर, रिंगटोन, भक्ति TV और बहुत कुछ।",
    introPriceHighlight: "सिर्फ ₹1 में पूरे 3 दिनों का Premium Access",
    recurringPriceHighlight: "3 दिनों के बाद ₹499/माह स्वतः रिन्यू होगा।",
    cancellationNotice: "आप कभी भी अपना सब्सक्रिप्शन कैंसल कर सकते हैं।",
    ctaPrimary: "सिर्फ ₹1 में शुरू करें",
    ctaSecondary: "अभी नहीं",
    timeline: {
      step1Title: "DAY 1",
      step1Badge: "₹1 भुगतान",
      step1Desc: "आज ₹1 का भुगतान करें और Premium शुरू करें।",
      step2Title: "DAY 1–3",
      step2Badge: "पूर्ण प्रीमियम एक्सेस",
      step2Desc: "अगले 3 दिनों तक Bhavlaya के सभी Premium फीचर्स इस्तेमाल करें।",
      step3Title: "AFTER DAY 3",
      step3Badge: "₹499/माह",
      step3Desc: "3 दिनों के बाद ₹499 प्रति माह स्वतः चार्ज होगा, जब तक आप कैंसल नहीं करते।",
    },
    transparency: {
      todayCharge: "आज का कुल शुल्क: ₹1",
      accessDuration: "प्रारंभिक अवधि: 3 दिन",
      recurringAmount: "आगामी रिन्यूअल शुल्क: ₹499",
      billingPeriod: "बिलिंग आवृत्ति: मासिक (Monthly)",
      provider: "भुगतान प्रदाता: Google Play Billing (सुरक्षित)",
      autoRenewNotice: "3-दिवसीय प्रारंभिक अवधि समाप्त होने पर आपका सब्सक्रिप्शन ₹499/माह पर स्वतः रिन्यू होगा जब तक आप Google Play Store में कैंसल नहीं करते।",
      noHiddenFees: "कोई छिपा हुआ शुल्क नहीं। कोई रिफंडेबल डिपॉजिट नहीं।",
    },
  },
  en: {
    productName: "Bhavlaya Premium",
    headerTitle: "BHAVLAYA PREMIUM",
    headerSubtitle: "Experience Complete Bhakti",
    headerDescription: "Bhajans, Aartis, Mantras, HD Wallpapers, Ringtones, Bhakti TV and more in one unified sacred app.",
    introPriceHighlight: "Experience Bhavlaya Premium for Just ₹1",
    recurringPriceHighlight: "After 3 days, renews automatically at ₹499/month.",
    cancellationNotice: "You can cancel your subscription anytime from Google Play.",
    ctaPrimary: "Start Premium for ₹1",
    ctaSecondary: "Not Now",
    timeline: {
      step1Title: "DAY 1",
      step1Badge: "₹1 Payment",
      step1Desc: "Pay ₹1 today and activate complete Premium access.",
      step2Title: "DAY 1–3",
      step2Badge: "Full Premium Access",
      step2Desc: "Enjoy all 20+ Bhavlaya Premium features for the next 3 days.",
      step3Title: "AFTER DAY 3",
      step3Badge: "₹499/Month",
      step3Desc: "Renews automatically at ₹499 per month until cancelled.",
    },
    transparency: {
      todayCharge: "Today's Exact Charge: ₹1",
      accessDuration: "Introductory Duration: 3 Days",
      recurringAmount: "Recurring Price: ₹499",
      billingPeriod: "Billing Frequency: Monthly",
      provider: "Payment Provider: Google Play Billing",
      autoRenewNotice: "After the 3-day introductory period, your subscription automatically renews at ₹499/month until cancelled.",
      noHiddenFees: "No hidden charges. Not a deposit. Paid introductory offer.",
    },
  },
};
