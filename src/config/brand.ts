// Bhavlaya Centralized Brand Architecture & Configuration
// All brand-dependent and domain-dependent values are configured centrally here.
// Rebranding or domain updates require editing ONLY this file or setting ENV variables.

export interface BrandConfig {
  name: string;
  nameHi: string;
  tagline: string;
  taglineHi: string;
  heroHeadingHi: string;
  heroDescriptionHi: string;
  description: string;
  descriptionHi: string;
  category: string;
  proposedDomain: string;
  legacyDomain: string;
  activeDomain: string;
  companyName: string;
  companyCredit: string;
  companyCreditHi: string;
  supportEmail: string;
  appDisplayName: string;
  locale: string;
  language: string;
  themeColor: string;
  social: {
    youtube: string;
    facebook: string;
    instagram: string;
    telegram: string;
    whatsapp: string;
  };
}

// Check if a custom domain is specified in the environment, otherwise default to the active runtime domain
const domainFromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_DOMAIN;

export const brandConfig: BrandConfig = {
  // Brand Identity
  name: "Bhavlaya",
  nameHi: "भावलय",
  tagline: "Where Devotion Meets Knowledge.",
  taglineHi: "भक्ति, ज्ञान और साधना का डिजिटल संसार।",
  heroHeadingHi: "भावलय में आपका स्वागत है।",
  heroDescriptionHi: "भक्ति, साधना, सनातन ज्ञान और आध्यात्मिक अनुभवों की एक नई डिजिटल दुनिया। भजन, सिद्ध मंत्र, पावन चालीसा, धर्मग्रंथ, प्रमुख तीर्थ और दैनिक पंचांग — सब कुछ एक ही पावन स्थान पर।",

  description:
    "Explore Bhavlaya for devotional Bhajans, Mantras, Aarti, Chalisa, Hindu scriptures, temples, festivals, Panchang and spiritual knowledge.",
  descriptionHi:
    "भावलय पर पढ़ें व सुनें संपूर्ण भजन, आरती संग्रह, सिद्ध मंत्र साधना, पावन चालीसा, दैनिक पंचांग, व्रत-त्योहार व सनातन धर्मग्रंथ सरल हिंदी में।",

  category: "Sanatan Dharma, Devotional Content, Spiritual Knowledge and Digital Spiritual Experiences",

  // Domain Configuration (Decoupled from brand name)
  proposedDomain: "https://bhavlaya.com",
  legacyDomain: "https://www.bhaktilok.in",
  // The active domain can be configured via environment variable or switched upon DNS verification
  activeDomain: domainFromEnv ? domainFromEnv.replace(/\/+$/, "") : "https://bhavlaya.com",

  // Development & Corporate Identity
  companyName: "Code Crew Labs",
  companyCredit: "A Code Crew Labs Product",
  companyCreditHi: "Technology by Code Crew Labs",
  supportEmail: "support@bhavlaya.com",

  // Application
  appDisplayName: "Bhavlaya – Bhakti & Spirituality",

  // Localization
  locale: "hi_IN",
  language: "hi",
  themeColor: "#D97706", // Saffron

  // Official Social Handles
  social: {
    youtube: "https://www.youtube.com/@BhavlayaOfficial",
    facebook: "https://www.facebook.com/BhavlayaOfficial",
    instagram: "https://www.instagram.com/bhavlaya",
    telegram: "https://t.me/bhavlaya",
    whatsapp: "https://whatsapp.com/channel/bhavlaya",
  },
};

// Re-export helper for content citation strings
export function getCitationString(title: string, path: string = ""): string {
  const url = `${brandConfig.activeDomain}${path}`;
  return `स्रोत: ${brandConfig.nameHi} (${brandConfig.name}) — ${url}`;
}
