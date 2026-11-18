// Bhavlaya Site & Navigation Configuration
// Consumes centralized brand configuration from brand.ts

import { brandConfig } from "./brand";

export { brandConfig };

export const siteConfig = {
  name: brandConfig.nameHi,
  nameEn: brandConfig.name,
  domain: brandConfig.activeDomain,
  tagline: brandConfig.taglineHi,
  taglineEn: brandConfig.tagline,
  description: brandConfig.descriptionHi,
  descriptionEn: brandConfig.description,
  heroHeading: brandConfig.heroHeadingHi,
  heroDescription: brandConfig.heroDescriptionHi,
  locale: brandConfig.locale,
  language: brandConfig.language,
  companyName: brandConfig.companyName,
  companyCredit: brandConfig.companyCredit,
  companyCreditHi: brandConfig.companyCreditHi,
  supportEmail: brandConfig.supportEmail,
  appDisplayName: brandConfig.appDisplayName,
  social: brandConfig.social,
} as const;

export const colors = {
  // Primary backgrounds
  ivory: "#FAF8F2",
  cream: "#FFFDF8",
  // Primary accent
  saffron: "#D97706",
  gold: "#B58A43",
  // Secondary
  maroon: "#651D32",
  charcoal: "#22201E",
  stone: "#81786B",
  // Semantic
  success: "#16A34A",
  warning: "#EAB308",
  error: "#DC2626",
  info: "#2563EB",
} as const;

export const navigation = {
  main: [
    { label: "होम", href: "/" },
    {
      label: "भजन",
      href: "/bhajan",
      megaMenu: [
        {
          title: "देवता के भजन",
          items: [
            { label: "श्री कृष्ण भजन", href: "/bhajan?deity=krishna" },
            { label: "राधा कृष्ण भजन", href: "/bhajan?deity=radha-krishna" },
            { label: "खाटू श्याम भजन", href: "/bhajan?deity=khatu-shyam" },
            { label: "श्री राम भजन", href: "/bhajan?deity=ram" },
            { label: "हनुमान भजन", href: "/bhajan?deity=hanuman" },
            { label: "शिव भजन", href: "/bhajan?deity=shiva" },
            { label: "दुर्गा माता भजन", href: "/bhajan?deity=durga" },
            { label: "गणेश भजन", href: "/bhajan?deity=ganesh" },
          ],
        },
      ],
    },
    {
      label: "मंत्र",
      href: "/mantra",
      megaMenu: [
        {
          title: "प्रमुख मंत्र",
          items: [
            { label: "गायत्री मंत्र", href: "/mantra/gayatri-mantra" },
            { label: "महामृत्युंजय मंत्र", href: "/mantra/mahamrityunjaya-mantra" },
            { label: "ॐ नमः शिवाय", href: "/mantra/om-namah-shivaya" },
            { label: "हरे कृष्ण महामंत्र", href: "/mantra/hare-krishna-mahamantra" },
          ],
        },
      ],
    },
    {
      label: "आरती & चालीसा",
      href: "/aarti",
      megaMenu: [
        {
          title: "आरती संग्रह",
          items: [
            { label: "गणेश आरती", href: "/aarti?deity=ganesh" },
            { label: "शिव आरती", href: "/aarti?deity=shiva" },
            { label: "हनुमान आरती", href: "/aarti?deity=hanuman" },
            { label: "दुर्गा आरती", href: "/aarti?deity=durga" },
          ],
        },
        {
          title: "चालीसा संग्रह",
          items: [
            { label: "हनुमान चालीसा", href: "/chalisa/hanuman-chalisa" },
            { label: "शिव चालीसा", href: "/chalisa/shiv-chalisa" },
            { label: "दुर्गा चालीसा", href: "/chalisa/durga-chalisa" },
            { label: "गणेश चालीसा", href: "/chalisa/ganesh-chalisa" },
          ],
        },
      ],
    },
    { label: "कथा", href: "/katha" },
    { label: "ग्रंथ", href: "/granth" },
    { label: "पंचांग", href: "/panchang" },
    { label: "मंदिर", href: "/mandir" },
    { label: "त्योहार", href: "/festivals" },
    { label: "साधन", href: "/tools" },
  ],
  footer: {
    devotional: [
      { label: "भजन संग्रह", href: "/bhajan" },
      { label: "मंत्र साधना", href: "/mantra" },
      { label: "आरती संग्रह", href: "/aarti" },
      { label: "चालीसा पाठ", href: "/chalisa" },
      { label: "धार्मिक कथाएं", href: "/katha" },
    ],
    knowledge: [
      { label: "सनातन ग्रंथ", href: "/granth" },
      { label: "ज्ञानकोश", href: "/encyclopedia" },
      { label: "राशिफल", href: "/rashifal" },
      { label: "लेख", href: "/articles" },
    ],
    explore: [
      { label: "दैनिक पंचांग", href: "/panchang" },
      { label: "मंदिर दर्शन", href: "/mandir" },
      { label: "व्रत-त्योहार", href: "/festivals" },
      { label: "आध्यात्मिक साधन", href: "/tools" },
    ],
    company: [
      { label: "हमारे बारे में", href: "/about" },
      { label: "संपर्क करें", href: "/contact" },
      { label: "संपादकीय नीति", href: "/editorial-policy" },
      { label: "गोपनीयता नीति", href: "/privacy-policy" },
      { label: "नियम और शर्तें", href: "/terms-and-conditions" },
      { label: "अस्वीकरण", href: "/disclaimer" },
    ],
  },
} as const;

export const deities = [
  { id: "krishna", name: "श्री कृष्ण", nameEn: "Lord Krishna", color: "#1E40AF" },
  { id: "ram", name: "श्री राम", nameEn: "Lord Rama", color: "#059669" },
  { id: "shiva", name: "भगवान शिव", nameEn: "Lord Shiva", color: "#7C3AED" },
  { id: "hanuman", name: "हनुमान जी", nameEn: "Lord Hanuman", color: "#DC2626" },
  { id: "ganesh", name: "गणेश जी", nameEn: "Lord Ganesha", color: "#EA580C" },
  { id: "durga", name: "माँ दुर्गा", nameEn: "Goddess Durga", color: "#BE185D" },
  { id: "lakshmi", name: "माँ लक्ष्मी", nameEn: "Goddess Lakshmi", color: "#CA8A04" },
  { id: "saraswati", name: "माँ सरस्वती", nameEn: "Goddess Saraswati", color: "#F8FAFC" },
  { id: "vishnu", name: "भगवान विष्णु", nameEn: "Lord Vishnu", color: "#0284C7" },
  { id: "radha", name: "राधा रानी", nameEn: "Radha Rani", color: "#F472B6" },
  { id: "sai-baba", name: "साईं बाबा", nameEn: "Sai Baba", color: "#F59E0B" },
  { id: "khatu-shyam", name: "खाटू श्याम", nameEn: "Khatu Shyam", color: "#3B82F6" },
] as const;
