import { brandConfig } from "./brand";

export { brandConfig };

export interface MegaMenuColumn {
  title: string;
  items: { label: string; href: string; badge?: string }[];
}

export interface FeaturedCard {
  title: string;
  subtitle: string;
  badge: string;
  href: string;
  image?: string;
  actionText: string;
}

export interface NavItem {
  label: string;
  href: string;
  columns?: MegaMenuColumn[];
  featuredCard?: FeaturedCard;
}

export const siteConfig = {
  name: brandConfig.name,
  nameHi: brandConfig.nameHi,
  domain: brandConfig.activeDomain,
  tagline: brandConfig.tagline,
  taglineHi: brandConfig.taglineHi,
  url: brandConfig.activeDomain,
  description: brandConfig.description,
  author: brandConfig.companyName,
  links: {
    twitter: "https://twitter.com/bhavlaya",
    github: "https://github.com/brandzoomediaagency-coder/Bhavlaya-bhaktilok",
  },
};

export const navigation: { main: NavItem[]; footer: Record<string, { label: string; href: string }[]> } = {
  main: [
    // 1. BHAJAN
    {
      label: "भजन",
      href: "/bhajan",
      columns: [
        {
          title: "लोकप्रिय भजन",
          items: [
            { label: "श्री कृष्ण भजन", href: "/bhajan?deity=krishna" },
            { label: "राधा कृष्ण भजन", href: "/bhajan?deity=radha" },
            { label: "खाटू श्याम भजन", href: "/bhajan?deity=shyam" },
            { label: "श्री राम भजन", href: "/bhajan?deity=ram" },
            { label: "हनुमान भजन", href: "/bhajan?deity=hanuman" },
          ],
        },
        {
          title: "देवता भजन",
          items: [
            { label: "दुर्गा माता भजन", href: "/bhajan?deity=durga" },
            { label: "माता रानी के गीत", href: "/bhajan?deity=devi" },
            { label: "महादेव शिव भजन", href: "/bhajan?deity=shiva" },
            { label: "श्री हरि विष्णु भजन", href: "/bhajan?deity=vishnu" },
            { label: "गुरुदेव व संत भजन", href: "/bhajan?category=saint" },
          ],
        },
        {
          title: "विशेष संग्रह",
          items: [
            { label: "छठ पूजा गीत", href: "/bhajan?category=chhath" },
            { label: "भोजपुरी भक्ति संग्रह", href: "/bhajan?category=bhojpuri" },
            { label: "रामचरितमानस चौपाई", href: "/bhajan?category=ramayan" },
            { label: "राधा कृष्ण रास लीला", href: "/bhajan?category=leela" },
            { label: "समस्त भजन संग्रह", href: "/bhajan" },
          ],
        },
      ],
      featuredCard: {
        title: "अच्युतम केशवं कृष्ण दामोदरम्",
        subtitle: "परम शांतिदायक श्री कृष्ण वंदना",
        badge: "आज का प्रमुख भजन",
        href: "/bhajan/achutam-keshavam-krishna-damodaram",
        actionText: "भजन सुनें व पढ़ें →",
      },
    },

    // 2. MANTRA
    {
      label: "मंत्र",
      href: "/mantra",
      columns: [
        {
          title: "सर्वाधिक जपित महामंत्र",
          items: [
            { label: "गायत्री महामंत्र", href: "/mantra/gayatri-mantra" },
            { label: "महामृत्युंजय मंत्र", href: "/mantra/mahamrityunjaya-mantra" },
            { label: "शिव पंचाक्षरी ॐ नमः शिवाय", href: "/mantra/om-namah-shivaya" },
            { label: "हरे कृष्ण महामंत्र", href: "/mantra/hare-krishna-mahamantra" },
            { label: "गणेश बीज मंत्र", href: "/mantra/ganesh-beej-mantra" },
          ],
        },
        {
          title: "वैदिक व साधना मंत्र",
          items: [
            { label: "दुर्गा सप्तशती संपुट", href: "/mantra?category=durga" },
            { label: "सूर्य देव अर्घ्य मंत्र", href: "/mantra?category=surya" },
            { label: "शान्ति पाठ मंत्र", href: "/mantra?category=shanti" },
            { label: "सिद्धिदात्री साधना", href: "/mantra?category=siddhidatri" },
            { label: "चेतना जागरण मंत्र", href: "/mantra?category=sadhana" },
          ],
        },
        {
          title: "मंत्र साधना साधन",
          items: [
            { label: "108 जप माला काउंटर", href: "/tools/108-jap-mala-counter", badge: "Live" },
            { label: "ध्यान एवं जप कक्ष", href: "/meditation", badge: "136.1Hz" },
            { label: "इष्ट देव मंत्र खोजक", href: "/search?q=mantra" },
            { label: "मंत्र स्मरण मार्गदर्शिका", href: "/articles" },
            { label: "समस्त मंत्र संग्रह", href: "/mantra" },
          ],
        },
      ],
      featuredCard: {
        title: "ॐ त्र्यम्बकं यजामहे सुगन्धिं",
        subtitle: "अकाल मृत्यु भय निवारक महामृत्युंजय मंत्र",
        badge: "सिद्ध महामंत्र",
        href: "/mantra/mahamrityunjaya-mantra",
        actionText: "मंत्र साधना करें →",
      },
    },

    // 3. AARTI
    {
      label: "आरती",
      href: "/aarti",
      columns: [
        {
          title: "दैनिक लोकप्रिय आरती",
          items: [
            { label: "ॐ जय जगदीश हरे", href: "/aarti/om-jai-jagdish-hare" },
            { label: "जय गणेश देवा", href: "/aarti/jai-ganesh-jai-ganesh-deva" },
            { label: "ॐ जय शिव ओंकारा", href: "/aarti/om-jai-shiv-omkara" },
            { label: "आरती कीजै हनुमान लला की", href: "/aarti/aarti-kije-hanuman-lala-ki" },
            { label: "जय अम्बे गौरी", href: "/aarti/jai-ambe-gauri" },
          ],
        },
        {
          title: "देवता अनुसार आरती",
          items: [
            { label: "श्री गणेश आरती", href: "/aarti?deity=ganesh" },
            { label: "भगवान शिव आरती", href: "/aarti?deity=shiva" },
            { label: "श्री विष्णु व कृष्ण आरती", href: "/aarti?deity=vishnu" },
            { label: "माँ दुर्गा आरती", href: "/aarti?deity=durga" },
            { label: "हनुमान जी की आरती", href: "/aarti?deity=hanuman" },
          ],
        },
        {
          title: "आरती साधन व स्तोत्र",
          items: [
            { label: "डिजिटल मंदिर घंटी", href: "/tools/digital-temple-bell", badge: "Audio" },
            { label: "दैनिक पूजा चेकलिस्ट", href: "/tools/daily-puja-checklist" },
            { label: "पावन स्तोत्र संग्रह", href: "/stotra" },
            { label: "श्री हनुमान चालीसा", href: "/chalisa/hanuman-chalisa" },
            { label: "समस्त आरती संग्रह", href: "/aarti" },
          ],
        },
      ],
      featuredCard: {
        title: "ॐ जय जगदीश हरे",
        subtitle: "भारत की सर्वाधिक लोकप्रिय संध्या आरती",
        badge: "दैनिक आरती",
        href: "/aarti/om-jai-jagdish-hare",
        actionText: "आरती पढ़ें व गाएं →",
      },
    },

    // 4. MANDIR
    {
      label: "मंदिर",
      href: "/mandir",
      columns: [
        {
          title: "प्रसिद्ध तीर्थ एवं धाम",
          items: [
            { label: "श्री काशी विश्वनाथ", href: "/mandir/shri-kashi-vishwanath-varanasi" },
            { label: "श्री सोमनाथ ज्योतिर्लिंग", href: "/mandir/shri-somnath-jyotirlinga-gujarat" },
            { label: "तिरुपति बालाजी", href: "/mandir/tirupati-balaji-andhra-pradesh" },
            { label: "वैष्णो देवी धाम", href: "/mandir/mata-vaishno-devi-jammu" },
            { label: "महाकालेश्वर उज्जैन", href: "/mandir?deity=shiva" },
          ],
        },
        {
          title: "महातीर्थ मार्गदर्शिका",
          items: [
            { label: "द्वादश ज्योतिर्लिंग दर्शन", href: "/jyotirlinga", badge: "12 Dham" },
            { label: "51 शक्तिपीठ मार्गदर्शिका", href: "/shaktipeeth", badge: "51 Peeth" },
            { label: "चार धाम यात्रा गाइड", href: "/mandir?category=chardham" },
            { label: "सप्त मोक्षदायिनी पुरी", href: "/encyclopedia/sapta-mokshadayini-puri" },
            { label: "दैनिक पावन दर्शन", href: "/daily-darshan", badge: "Darshan" },
          ],
        },
        {
          title: "मंदिर निर्देशिका",
          items: [
            { label: "सम्पूर्ण मंदिर सूची", href: "/mandir" },
            { label: "तीर्थ नगर एवं भूगोल", href: "/mandir" },
            { label: "मंदिर घंटी एवं शंख नाद", href: "/tools/digital-temple-bell" },
            { label: "दैनिक दर्शन गैलरी", href: "/daily-darshan" },
            { label: "मंदिर इतिहास लेख", href: "/articles" },
          ],
        },
      ],
      featuredCard: {
        title: "द्वादश ज्योतिर्लिंग दर्शन",
        subtitle: "भगवान शिव के 12 स्वयंभू पावन ज्योतिर्लिंग",
        badge: "महातीर्थ",
        href: "/jyotirlinga",
        actionText: "दर्शन विवरण देखें →",
      },
    },

    // 5. VRAT & FESTIVALS
    {
      label: "व्रत व त्योहार",
      href: "/festivals",
      columns: [
        {
          title: "पंचांग व तिथियां",
          items: [
            { label: "आज का दैनिक पंचांग", href: "/panchang", badge: "Daily" },
            { label: "शुभ चौघड़िया मुहूर्त", href: "/panchang#choghadiya" },
            { label: "राहुकाल समय सारणी", href: "/tools/rahukaal-calculator" },
            { label: "ब्रह्म मुहूर्त गणना", href: "/panchang" },
            { label: "पूर्णिमा व अमावस्या तिथि", href: "/festivals" },
          ],
        },
        {
          title: "प्रमुख व्रत व त्योहार",
          items: [
            { label: "निर्जला एकादशी व्रत", href: "/festivals/nirjala-ekadashi-vrat", badge: "Vrat" },
            { label: "महाशिवरात्रि महापर्व", href: "/festivals/maha-shivratri" },
            { label: "श्री कृष्ण जन्माष्टमी", href: "/festivals/krishna-janmashtami" },
            { label: "दीपावली / दिवाली", href: "/festivals/diwali-deepavali" },
            { label: "चैत्र व शारदीय नवरात्रि", href: "/festivals/chaitra-navratri" },
          ],
        },
        {
          title: "पूजा मुहूर्त एवं नियम",
          items: [
            { label: "वार्षिक व्रत कैलेंडर 2026", href: "/festivals" },
            { label: "व्रत फलाहार व नियम", href: "/articles" },
            { label: "दैनिक पूजा संकल्प", href: "/tools/puja-sankalp-generator" },
            { label: "गृह प्रवेश व विवाह मुहूर्त", href: "/panchang" },
            { label: "समस्त त्योहार व व्रत", href: "/festivals" },
          ],
        },
      ],
      featuredCard: {
        title: "निर्जला एकादशी महाव्रत",
        subtitle: "ज्येष्ठ शुक्ल पक्ष भीमसेनी एकादशी",
        badge: "आगामी महाव्रत",
        href: "/festivals/nirjala-ekadashi-vrat",
        actionText: "व्रत विधि व कथा पढ़ें →",
      },
    },

    // 6. DHARM NIRDESHIKA
    {
      label: "धर्म निर्देशिका",
      href: "/encyclopedia",
      columns: [
        {
          title: "सनातन ज्ञानकोश",
          items: [
            { label: "चतुर्वेद परिचय", href: "/encyclopedia/chatur-vedas" },
            { label: "चार युग कालक्रम", href: "/encyclopedia/char-yuga" },
            { label: "द्वादश ज्योतिर्लिंग ज्ञान", href: "/encyclopedia/dwadash-jyotirlinga" },
            { label: "51 शक्तिपीठ विवरण", href: "/encyclopedia/51-shaktipeeth" },
            { label: "सप्त मोक्षदायिनी पुरी", href: "/encyclopedia/sapta-mokshadayini-puri" },
          ],
        },
        {
          title: "नियम एवं परम्पराएं",
          items: [
            { label: "रुद्राक्ष धारण विधान", href: "/articles" },
            { label: "पवित्र नदियाँ एवं तीर्थ", href: "/encyclopedia" },
            { label: "इष्ट देव निर्धारण", href: "/rashifal/mesh" },
            { label: "दैनिक संध्या वंदन", href: "/panchang" },
            { label: "शौच व शुद्धि परम्परा", href: "/articles" },
          ],
        },
        {
          title: "पूजा एवं साधना साधन",
          items: [
            { label: "वैदिक संकल्प जनरेटर", href: "/tools/puja-sankalp-generator", badge: "Vedic" },
            { label: "दैनिक पुण्य खाता", href: "/tools/daily-punya-ledger", badge: "Ledger" },
            { label: "दैनिक पूजा चेकलिस्ट", href: "/tools/daily-puja-checklist" },
            { label: "द्वादश राशियां व राशिफल", href: "/rashifal/mesh" },
            { label: "सम्पूर्ण ज्ञानकोश", href: "/encyclopedia" },
          ],
        },
      ],
      featuredCard: {
        title: "वैदिक दैनिक संकल्प विधि",
        subtitle: "गोत्र, तिथि व स्थान अनुसार शास्त्रीय संकल्प",
        badge: "साधना गाइड",
        href: "/tools/puja-sankalp-generator",
        actionText: "संकल्प तैयार करें →",
      },
    },

    // 7. KATHA
    {
      label: "कथा",
      href: "/katha",
      columns: [
        {
          title: "लोकप्रिय पावन कथाएं",
          items: [
            { label: "सत्यनारायण व्रत कथा", href: "/katha?type=satyanarayan" },
            { label: "शिव-पार्वती विवाह कथा", href: "/katha?deity=shiva" },
            { label: "श्री कृष्ण बाल लीला", href: "/katha?deity=krishna" },
            { label: "भक्त प्रह्लाद व नृसिंह", href: "/katha?type=bhakt" },
            { label: "माँ दुर्गा महिषासुरमर्दिनी", href: "/katha?deity=durga" },
          ],
        },
        {
          title: "पौराणिक आख्यान",
          items: [
            { label: "समुद्र मंथन कथा", href: "/katha?type=samudra-manthan" },
            { label: "गंगा अवतरण कथा", href: "/katha?type=ganga" },
            { label: "हनुमान जी की सूर्य साधना", href: "/katha?deity=hanuman" },
            { label: "एकादशी व्रत कथाएं", href: "/festivals/nirjala-ekadashi-vrat" },
            { label: "संतों के दिव्य प्रसंग", href: "/articles" },
          ],
        },
        {
          title: "कथा निर्देशिका",
          items: [
            { label: "सम्पूर्ण कथा पुस्तकालय", href: "/katha" },
            { label: "वाल्मीकि रामायण प्रसंग", href: "/granth/valmiki-ramayana" },
            { label: "महाभारत कथा संग्रह", href: "/granth" },
            { label: "श्रीमद्भगवद्गीता सार", href: "/granth/bhagavad-gita" },
            { label: "विद्वानों के आलेख", href: "/articles" },
          ],
        },
      ],
      featuredCard: {
        title: "श्री सत्यनारायण व्रत कथा",
        subtitle: "कलिकाल में समस्त संकटों का निवारक",
        badge: "पावन कथा",
        href: "/katha",
        actionText: "कथा विस्तार से पढ़ें →",
      },
    },

    // 8. DHARMIK SANGRAH
    {
      label: "धार्मिक संग्रह",
      href: "/granth",
      columns: [
        {
          title: "सनातन धर्म ग्रंथ",
          items: [
            { label: "श्रीमद्भगवद्गीता (18 अध्याय)", href: "/granth/bhagavad-gita", badge: "Gita" },
            { label: "वाल्मीकि रामायण", href: "/granth/valmiki-ramayana" },
            { label: "श्रीरामचरितमानस", href: "/granth" },
            { label: "पावन उपनिषद् सार", href: "/encyclopedia/chatur-vedas" },
            { label: "सम्पूर्ण ग्रंथ सूची", href: "/granth" },
          ],
        },
        {
          title: "स्तोत्र व सुविचार",
          items: [
            { label: "शिव ताण्डव स्तोत्रम्", href: "/stotra/shiva-tandava-stotram" },
            { label: "महालक्ष्मी अष्टकम्", href: "/stotra/mahalakshmi-ashtakam" },
            { label: "आदित्य हृदय स्तोत्र", href: "/stotra/aditya-hridaya-stotra" },
            { label: "दैनिक पावन श्लोक", href: "/daily-shloka", badge: "Daily" },
            { label: "भक्ति स्टेटस स्टूडियो", href: "/status-maker", badge: "Studio" },
          ],
        },
        {
          title: "विद्वान व संपादकीय",
          items: [
            { label: "संपादकीय आलेख", href: "/articles" },
            { label: "प्रमाणित विद्वान एवं लेखक", href: "/authors" },
            { label: "ज्ञानकोश (Encyclopedia)", href: "/encyclopedia" },
            { label: "द्वादश राशि निर्देशिका", href: "/rashifal/mesh" },
            { label: "दैनिक दिव्य दर्शन", href: "/daily-darshan" },
          ],
        },
      ],
      featuredCard: {
        title: "श्रीमद्भगवद्गीता",
        subtitle: "कुरुक्षेत्र में भगवान श्री कृष्ण का दिव्य उपदेश",
        badge: "सर्वोच्च ग्रंथ",
        href: "/granth/bhagavad-gita",
        actionText: "अध्याय वाचन करें →",
      },
    },

    // 9. SADHANA TOOLS
    {
      label: "साधना टूल्स",
      href: "/tools",
      columns: [
        {
          title: "दैनिक साधना व जप",
          items: [
            { label: "108 जप माला काउंटर", href: "/tools/108-jap-mala-counter", badge: "Mala" },
            { label: "दैनिक पुण्य व साधना खाता", href: "/tools/daily-punya-ledger", badge: "Ledger" },
            { label: "वैदिक पूजा संकल्प जनरेटर", href: "/tools/puja-sankalp-generator", badge: "Vedic" },
            { label: "दैनिक पूजा चेकलिस्ट", href: "/tools/daily-puja-checklist" },
            { label: "आज का पंचांग", href: "/panchang" },
          ],
        },
        {
          title: "मंदिर ध्वनि व ध्यान",
          items: [
            { label: "डिजिटल मंदिर घंटी", href: "/tools/digital-temple-bell", badge: "Bell" },
            { label: "ध्यान एवं जप कक्ष (136.1Hz)", href: "/meditation", badge: "Om" },
            { label: "राहुकाल कैलकुलेटर", href: "/tools/rahukaal-calculator" },
            { label: "संस्कृत शिशु नाम खोजक", href: "/tools/hindu-baby-names" },
            { label: "भक्ति स्टेटस स्टूडियो", href: "/status-maker", badge: "9:16" },
          ],
        },
        {
          title: "राशि एवं दर्शन",
          items: [
            { label: "12 राशियां व राशिफल", href: "/rashifal/mesh" },
            { label: "दैनिक मंदिर दर्शन", href: "/daily-darshan" },
            { label: "दैनिक संस्कृत श्लोक", href: "/daily-shloka" },
            { label: "द्वादश ज्योतिर्लिंग दर्शन", href: "/jyotirlinga" },
            { label: "समस्त साधना साधन", href: "/tools" },
          ],
        },
      ],
      featuredCard: {
        title: "भक्ति स्टेटस स्टूडियो",
        subtitle: "व्हाट्सएप, इंस्टाग्राम हेतु सुंदर 9:16 व 1:1 स्टेटस कार्ड",
        badge: "नया साधन",
        href: "/status-maker",
        actionText: "कार्ड बनाएं →",
      },
    },
  ],

  footer: {
    devotional: [
      { label: "भजन संग्रह", href: "/bhajan" },
      { label: "सिद्ध मंत्र साधना", href: "/mantra" },
      { label: "आरती संग्रह", href: "/aarti" },
      { label: "पावन चालीसा पाठ", href: "/chalisa" },
      { label: "पावन स्तोत्र संग्रह", href: "/stotra" },
      { label: "धार्मिक कथाएं", href: "/katha" },
      { label: "धर्म ग्रंथ पुस्तकालय", href: "/granth" },
    ],
    knowledge: [
      { label: "आज का पंचांग", href: "/panchang" },
      { label: "त्योहार एवं व्रत 2026", href: "/festivals" },
      { label: "सनातन ज्ञानकोश", href: "/encyclopedia" },
      { label: "द्वादश ज्योतिर्लिंग", href: "/jyotirlinga" },
      { label: "51 शक्तिपीठ मार्गदर्शिका", href: "/shaktipeeth" },
      { label: "12 राशियां व राशिफल", href: "/rashifal/mesh" },
      { label: "संपादकीय आलेख", href: "/articles" },
    ],
    tools: [
      { label: "भक्ति स्टेटस स्टूडियो", href: "/status-maker" },
      { label: "108 जप माला काउंटर", href: "/tools/108-jap-mala-counter" },
      { label: "वैदिक संकल्प जनरेटर", href: "/tools/puja-sankalp-generator" },
      { label: "दैनिक पुण्य खाता", href: "/tools/daily-punya-ledger" },
      { label: "डिजिटल मंदिर घंटी", href: "/tools/digital-temple-bell" },
      { label: "ध्यान एवं जप कक्ष", href: "/meditation" },
      { label: "दैनिक दिव्य दर्शन", href: "/daily-darshan" },
    ],
    company: [
      { label: "हमारे विषय में (About Us)", href: "/about" },
      { label: "सम्पर्क सूत्र (Contact Us)", href: "/contact" },
      { label: "संपादकीय नीति (Editorial Policy)", href: "/editorial-policy" },
      { label: "गोपनीयता नीति (Privacy Policy)", href: "/privacy-policy" },
      { label: "नियम एवं शर्तें (Terms & Conditions)", href: "/terms-and-conditions" },
      { label: "अस्वीकरण (Disclaimer)", href: "/disclaimer" },
      { label: "प्रमाणित विद्वान एवं लेखक", href: "/authors" },
    ],
  },
};

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
