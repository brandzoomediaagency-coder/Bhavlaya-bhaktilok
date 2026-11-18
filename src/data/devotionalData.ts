// Bhavlaya Authentic Devotional Dataset
// Culturally verified Sanatan Dharma content

export interface BhajanItem {
  id: string;
  slug: string;
  title: string;
  deity: string;
  deityId: string;
  singer: string;
  category: string;
  lyrics: string;
  meaning: string;
  audioUrl?: string;
  featured: boolean;
}

export interface MantraItem {
  id: string;
  slug: string;
  title: string;
  deity: string;
  deityId: string;
  sanskritText: string;
  transliteration: string;
  meaning: string;
  wordMeaning: string;
  japaMethod: string;
  count: number;
  bestTime: string;
  scriptureSource: string;
  audioUrl?: string;
}

export interface ChalisaItem {
  id: string;
  slug: string;
  title: string;
  deity: string;
  verses: { type: "doha" | "chaupai"; text: string; meaning: string }[];
  significance: string;
}

export interface AartiItem {
  id: string;
  slug: string;
  title: string;
  deity: string;
  lyrics: string;
  significance: string;
}

export interface TempleItem {
  id: string;
  slug: string;
  name: string;
  deity: string;
  location: string;
  state: string;
  type: "jyotirlinga" | "shaktipeeth" | "char-dham" | "major";
  significance: string;
  history: string;
  darshanTimings: string;
  aartiTimings: string;
  howToReach: string;
  image: string;
}

export interface FestivalItem {
  id: string;
  slug: string;
  name: string;
  date2026: string;
  tithi: string;
  significance: string;
  pujaVidhi: string;
  pujaSamagri: string[];
  mantra: string;
}

export interface KathaItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  moralLesson: string;
  source: string;
}

export interface ScriptureItem {
  id: string;
  slug: string;
  title: string;
  titleSanskrit: string;
  author: string;
  category: string;
  chaptersCount: number;
  versesCount: number;
  description: string;
  famousVerses: { verse: string; sanskrit: string; hindi: string; meaning: string }[];
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isInteractive: boolean;
}

// BHAJANS
export const BHAJANS: BhajanItem[] = [
  {
    id: "b1",
    slug: "achutam-keshavam-krishna-damodaram",
    title: "अच्युतम केशवं कृष्ण दामोदरम्",
    deity: "श्री कृष्ण",
    deityId: "krishna",
    singer: "पारंपरिक / आदि शंकराचार्य",
    category: "कृष्ण भजन",
    featured: true,
    lyrics: `अच्युतं केशवं कृष्ण दामोदरं,
राम नारायणं जानकी वल्लभम्।
कौन कहते हैं भगवान आते नहीं,
तुम मीरा के जैसे बुलाते नहीं॥

अच्युतं केशवं कृष्ण दामोदरं,
राम नारायणं जानकी वल्लभम्।
कौन कहते हैं भगवान खाते नहीं,
बेर शबरी के जैसे खिलाते नहीं॥

कौन कहते हैं भगवान सोते नहीं,
गोपियों की तरह तुम सुलाते नहीं।
कौन कहते हैं भगवान नाचते नहीं,
गोपियों की तरह तुम नचाते नहीं॥`,
    meaning: "यह भजन भगवान कृष्ण के दिव्य नामों और उनकी लीलाओं का स्मरण कराता है। यह बताता है कि भगवान सदैव अपने सच्चे भक्तों की पुकार सुनकर उनके समक्ष प्रकट होते हैं।",
  },
  {
    id: "b2",
    slug: "meri-lagi-shyam-sang-preet",
    title: "मेरी लगी श्याम संग प्रीत",
    deity: "खाटू श्याम / श्री कृष्ण",
    deityId: "khatu-shyam",
    singer: "पारंपरिक",
    category: "श्याम भजन",
    featured: true,
    lyrics: `मेरी लगी श्याम संग प्रीत, ये दुनिया क्या जाने।
मुझे मिल गया मन का मीत, ये दुनिया क्या जाने॥

छूट गई सब जग की माया,
जब से श्याम का दर्शन पाया।
मेरी बदली है तकदीर, ये दुनिया क्या जाने॥`,
    meaning: "भक्त का अपने प्रिय प्रभु श्याम के प्रति अनन्य प्रेम और संसार की नश्वर माया से मुक्ति की भावपूर्ण अभिव्यक्ति।",
  },
  {
    id: "b3",
    slug: "nagri-ho-ayodhya-si-raghukul-sa-gharana-ho",
    title: "नगरी हो अयोध्या सी, रघुकुल सा घराना हो",
    deity: "श्री राम",
    deityId: "ram",
    singer: "पारंपरिक",
    category: "राम भजन",
    featured: true,
    lyrics: `नगरी हो अयोध्या सी, रघुकुल सा घराना हो।
चरण हो राघव के, जहाँ मेरा ठिकाना हो॥

लक्ष्मण सा भाई हो, कौशल्या सी मैया हो।
स्वामी तुम जैसा हो, सीता सी भईया हो॥`,
    meaning: "मर्यादा पुरुषोत्तम भगवान श्री राम के आदर्श राज्य अयोध्या और उनके दिव्य परिवार की महिमा का सुंदर गान।",
  },
  {
    id: "b4",
    slug: "shankar-teri-jata-me-bahti-hai-gang-dhara",
    title: "शंकर तेरी जटा में बहती है गंग धारा",
    deity: "भगवान शिव",
    deityId: "shiva",
    singer: "पारंपरिक",
    category: "शिव भजन",
    featured: true,
    lyrics: `शंकर तेरी जटा में बहती है गंग धारा।
काली घटा के अंदर चमके ज्यों रूप प्यारा॥

माथे पे चन्द्रमा है, कंठों में सर्प माला।
पीते हैं जो खुशी से विष का भरा प्याला॥`,
    meaning: "देवाधिदेव महादेव शिव के दिव्य स्वरूप, गंगाधर रूप और नीलकंठ स्वरूप का वंदन।",
  },
];

// MANTRAS
export const MANTRAS: MantraItem[] = [
  {
    id: "m1",
    slug: "gayatri-mantra",
    title: "गायत्री महामंत्र (Gayatri Mantra)",
    deity: "माँ गायत्री / सूर्य देव",
    deityId: "saraswati",
    sanskritText: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
    transliteration: "Om Bhur Bhuvaḥ Svaḥ Tat-Savitur Vareṇyaṃ Bhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt॥",
    meaning: "उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा को हम अपनी अंतरात्मा में धारण करें। वह परमात्मा हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करे।",
    wordMeaning: "ॐ = परब्रह्म; भूः = भूलोक (प्राणस्वरूप); भुवः = अन्तरिक्ष (दुःखनाशक); स्वः = स्वर्गलोक (सुखस्वरूप); तत् = उस; सवितुः = सूर्य/सृष्टिकर्ता के; वरेण्यम् = वरण करने योग्य श्रेष्ठ; भर्गः = तेजोमय पापनाशक; देवस्य = देव के; धीमहि = हम ध्यान करते हैं; धियः = बुद्धि; यः = जो; नः = हमारी; प्रचोदयात् = सन्मार्ग में प्रेरित करे।",
    japaMethod: "प्रतिदिन प्रातःकाल सूर्योदय के समय पूर्व दिशा की ओर मुख करके रुद्राक्ष अथवा तुलसी माला से कम से कम 108 बार जाप करें।",
    count: 108,
    bestTime: "ब्रह्म मुहूर्त अथवा प्रातः सूर्योदय",
    scriptureSource: "ऋग्वेद (मण्डल 3, सूक्त 62, मन्त्र 10)",
  },
  {
    id: "m2",
    slug: "mahamrityunjaya-mantra",
    title: "महामृत्युंजय मंत्र (Maha Mrityunjaya Mantra)",
    deity: "भगवान शिव",
    deityId: "shiva",
    sanskritText: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥",
    transliteration: "Om Tryambakaṃ Yajāmahe Sugandhiṃ Puṣṭi-Vardhanam। Urvārukam-Iva Bandhanān Mṛtyor-Mukṣīya Māmṛtāt॥",
    meaning: "हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित हैं और सभी प्राणियों का पोषण करते हैं। जिस प्रकार पका हुआ ककड़ी रूपी फल अपनी बेल के बंधन से मुक्त हो जाता है, उसी प्रकार हम मृत्यु के भय और संसार के बंधनों से मुक्त होकर मोक्ष (अमृतत्व) को प्राप्त हों।",
    wordMeaning: "त्र्यम्बकम् = तीन नेत्रों वाले महादेव; यजामहे = हम पूजते हैं; सुगन्धिम् = दिव्य गंध वाले; पुष्टिवर्धनम् = पोषण करने वाले; उर्वारुकमिव = ककड़ी के समान; बन्धनात् = बेल के बंधन से; मृत्योः = मृत्यु से; मुक्षीय = मुक्त करें; मा अमृतात् = न कि अमरता/मोक्ष से।",
    japaMethod: "रुद्राक्ष माला से कुश अथवा ऊनी आसन पर उत्तर या पूर्व दिशा में बैठकर 108 बार जाप अत्यंत कल्याणकारी माना गया है।",
    count: 108,
    bestTime: "प्रातःकाल अथवा प्रदोष काल",
    scriptureSource: "ऋग्वेद (मण्डल 7, सूक्त 59, मन्त्र 12)",
  },
  {
    id: "m3",
    slug: "om-namah-shivaya",
    title: "शिव पंचाक्षरी मंत्र (Om Namah Shivaya)",
    deity: "भगवान शिव",
    deityId: "shiva",
    sanskritText: "ॐ नमः शिवाय॥",
    transliteration: "Om Namaḥ Śivāya॥",
    meaning: "परम पावन कल्याणकारी भगवान शिव को मेरा बारम्बार प्रणाम है। यह पंचाक्षरी मंत्र पंचभूतों (पृथ्वी, जल, अग्नि, वायु, आकाश) को संतुलित करता है।",
    wordMeaning: "ॐ = ओंकार (ब्रह्म); न = पृथ्वी तत्त्व; म = जल तत्त्व; शि = अग्नि तत्त्व; वा = वायु तत्त्व; य = आकाश तत्त्व।",
    japaMethod: "मानसिक अथवा वाचिक रूप से किसी भी समय शांत मन से जाप किया जा सकता है।",
    count: 108,
    bestTime: "सर्वकालिक, विशेष रूप से सोमवार व प्रदोष",
    scriptureSource: "यजुर्वेद श्रीरुद्रम्",
  },
  {
    id: "m4",
    slug: "hare-krishna-mahamantra",
    title: "हरे कृष्ण महामंत्र (Maha Mantra)",
    deity: "श्री कृष्ण एवं श्री राम",
    deityId: "krishna",
    sanskritText: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥",
    transliteration: "Hare Kṛṣṇa Hare Kṛṣṇa Kṛṣṇa Kṛṣṇa Hare Hare। Hare Rāma Hare Rāma Rāma Rāma Hare Hare॥",
    meaning: "हे प्रभु की दिव्य शक्ति (हरा/राधा)! हे सर्व-आकर्षक भगवान कृष्ण! हे परमानंद स्वरूप भगवान राम! मुझे अपनी प्रेममयी दिव्य सेवा में लगाइए।",
    wordMeaning: "हरे = भगवान की दिव्य आह्लादिनी शक्ति; कृष्ण = सर्व-आकर्षक परब्रह्म; राम = परम आनंदमय प्रभु।",
    japaMethod: "तुलसी माला पर प्रतिदिन 16 माला (या कम से कम 1 माला) कीर्तन या जप करने से कलिकल्मष का नाश होता है।",
    count: 108,
    bestTime: "प्रातः ब्रह्म मुहूर्त से संध्या तक",
    scriptureSource: "कलिसंतरणोपनिषद्",
  },
];

// CHALISA
export const CHALISAS: ChalisaItem[] = [
  {
    id: "c1",
    slug: "hanuman-chalisa",
    title: "श्री हनुमान चालीसा (Shri Hanuman Chalisa)",
    deity: "हनुमान जी",
    significance: "गोस्वामी तुलसीदास जी द्वारा रचित यह 40 चौपाइयों का स्तोत्र शक्ति, साहस, भयमुक्ति और संकट निवारण का सर्वोत्तम साधन माना जाता है।",
    verses: [
      {
        type: "doha",
        text: "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥",
        meaning: "श्री गुरुदेव के चरण कमलों की धूलि से अपने मन रूपी दर्पण को पवित्र करके, मैं श्री रघुवीर के उस निर्मल यश का वर्णन करता हूँ, जो चारों फल (धर्म, अर्थ, काम, मोक्ष) प्रदान करने वाला है।",
      },
      {
        type: "doha",
        text: "बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार।\nबल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार॥",
        meaning: "स्वयं को बुद्धिहीन जानकर मैं पवनसुत श्री हनुमान जी का स्मरण करता हूँ। हे प्रभु! मुझे बल, बुद्धि और विद्या प्रदान करें और मेरे समस्त क्लेशों व विकारों को हर लें।",
      },
      {
        type: "chaupai",
        text: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥",
        meaning: "ज्ञान और गुणों के अगाध सागर श्री हनुमान जी की जय हो! तीनों लोकों में अपने पराक्रम को प्रकाशित करने वाले कपीश्वर की जय हो!",
      },
      {
        type: "chaupai",
        text: "राम दूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा॥",
        meaning: "आप श्री राम के अनन्य दूत और अतुलनीय बल के धाम हैं। माता अंजना के पुत्र और पवनसुत के पावन नाम से विख्यात हैं।",
      },
      {
        type: "chaupai",
        text: "महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥",
        meaning: "आप महा पराक्रमी और वज्र के समान अंगों वाले हैं। आप कुबुद्धि को दूर करने वाले और सुबुद्धि के सदा सहायक हैं।",
      },
      {
        type: "chaupai",
        text: "कंचन बरन बिराज सुबेसा। कानन कुंडल कुंचित केसा॥",
        meaning: "आपका वर्ण सुवर्ण जैसा कांतिमान है, आप सुंदर वेश धारण किए हैं। कानों में कुंडल और घुंघराले बाल सुशोभित हैं।",
      },
      {
        type: "chaupai",
        text: "हाथ बज्र औ ध्वजा बिराजै। काँधे मूँज जनेऊ साजै॥",
        meaning: "आपके हाथों में वज्र और विजय ध्वजा विराजमान है। आपके कंधे पर मूंज का जनेऊ सुशोभित हो रहा है।",
      },
      {
        type: "chaupai",
        text: "संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥",
        meaning: "जो भी महाबली वीर हनुमान जी का नित्य स्मरण करता है, उसके समस्त संकट कट जाते हैं और सारी पीड़ाएं मिट जाती हैं।",
      },
      {
        type: "doha",
        text: "पवनतनय संकट हरन मंगल मूरति रूप।\nराम लखन सीता सहित हृदय बसहु सुर भूप॥",
        meaning: "हे संकटमोचन पवनसुत! हे मंगलमूर्ति स्वरूप! आप श्री राम, लक्ष्मण और माता सीता सहित मेरे हृदय मंदिर में सदा निवास कीजिए।",
      },
    ],
  },
  {
    id: "c2",
    slug: "shiv-chalisa",
    title: "श्री शिव चालीसा (Shri Shiv Chalisa)",
    deity: "भगवान शिव",
    significance: "भगवान शिव की कृपा प्राप्ति, मानसिक शांति और आध्यात्मिक उन्नति हेतु 40 पदों का पावन पाठ।",
    verses: [
      {
        type: "doha",
        text: "जय गणेश गिरिजा सुवन, मंगल मूल सुजान।\nकहत अयोध्यादास तुम, देहु अभय वरदान॥",
        meaning: "माता पार्वती के पुत्र भगवान श्री गणेश की जय हो, जो समस्त मंगलों के मूल और परम ज्ञानी हैं। हे प्रभु, मुझे अभय का वरदान प्रदान करें।",
      },
      {
        type: "chaupai",
        text: "जय गिरिजापति दीन दयाला। सदा करत संतन प्रतिपाला॥",
        meaning: "हे माता पार्वती के पति, दीनों पर दया करने वाले महादेव! आप सदा संतों और भक्तों का पालन-पोषण करते हैं।",
      },
      {
        type: "chaupai",
        text: "भाल चन्द्रमा सोहत नीके। कानन कुण्डल नागफनी के॥",
        meaning: "आपके मस्तक पर सुंदर चन्द्रमा सुशोभित है और कानों में नागफनी के कुंडल शोभायमान हैं।",
      },
    ],
  },
];

// AARTIS
export const AARTIS: AartiItem[] = [
  {
    id: "a1",
    slug: "om-jai-jagdish-hare",
    title: "ॐ जय जगदीश हरे (Om Jai Jagdish Hare)",
    deity: "भगवान विष्णु",
    significance: "पंडित श्रद्धाराम फिल्लौरी द्वारा रचित संपूर्ण भारत की सर्वाधिक लोकप्रिय दैनिक संध्या आरती।",
    lyrics: `ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।
भक्त जनों के संकट, दास जनों के संकट,
क्षण में दूर करे, ॐ जय जगदीश हरे॥

जो ध्यावे फल पावे, दुःख बिनसे मन का,
स्वामी दुःख बिनसे मन का।
सुख सम्पति घर आवे, सुख सम्पति घर आवे,
कष्ट मिटे तन का, ॐ जय जगदीश हरे॥

मात पिता तुम मेरे, शरण गहूं किसकी,
स्वामी शरण गहूं किसकी।
तुम बिन और न दूजा, तुम बिन और न दूजा,
आस करूं मैं जिसकी, ॐ जय जगदीश हरे॥

तुम पूरण परमात्मा, तुम अन्तर्यामी,
स्वामी तुम अन्तर्यामी।
पारब्रह्म परमेश्वर, पारब्रह्म परमेश्वर,
तुम सब के स्वामी, ॐ जय जगदीश हरे॥`,
  },
  {
    id: "a2",
    slug: "jai-ganesh-jai-ganesh-deva",
    title: "जय गणेश जय गणेश देवा",
    deity: "गणेश जी",
    significance: "किसी भी पूजा व अनुष्ठान के आरम्भ में गाई जाने वाली विघ्नहर्ता श्री गणेश की आरती।",
    lyrics: `जय गणेश जय गणेश जय गणेश देवा।
माता जाकी पार्वती पिता महादेवा॥

एक दंत दयावंत चार भुजाधारी।
माथे पर तिलक सोहे मूसे की सवारी॥
पान चढ़े फूल चढ़े और चढ़े मेवा।
लड्डुअन का भोग लगे संत करें सेवा॥

अंधे को आंख देत कोढ़िन को काया।
बांझन को पुत्र देत निर्धन को माया॥
'सूर' श्याम शरण आए सफल कीजे सेवा।
माता जाकी पार्वती पिता महादेवा॥`,
  },
  {
    id: "a3",
    slug: "om-jai-shiv-omkara",
    title: "ॐ जय शिव ओंकारा (Om Jai Shiv Omkara)",
    deity: "भगवान शिव",
    significance: "देवाधिदेव महादेव शिव की प्रसिद्ध महाआरती।",
    lyrics: `ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।
ब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा॥
ॐ जय शिव ओंकारा...

एकानन चतुरानन पंचानन राजे।
हंसासन गरुड़ासन वृषवाहन साजे॥
ॐ जय शिव ओंकारा...

दो भुज चार चतुर्भुज दसभुज अति सोहे।
त्रिगुण रूप निरखते त्रिभुवन जन मोहे॥
ॐ जय शिव ओंकारा...`,
  },
];

// TEMPLES
export const TEMPLES: TempleItem[] = [
  {
    id: "t1",
    slug: "shri-kashi-vishwanath-varanasi",
    name: "श्री काशी विश्वनाथ मंदिर",
    deity: "भगवान शिव (विश्वेश्वर)",
    location: "वाराणसी",
    state: "उत्तर प्रदेश",
    type: "jyotirlinga",
    significance: "द्वादश ज्योतिर्लिंगों में से एक प्रमुख पावन ज्योतिर्लिंग। मोक्षदायिनी काशी नगरी में माँ गंगा के तट पर स्थित।",
    history: "अनादि काल से पूजित यह धाम सनातन धर्म का हृदय स्थल है। अहिल्याबाई होल्कर ने इसका जीर्णोद्धार कराया था तथा हाल ही में काशी विश्वनाथ धाम कॉरिडोर का भव्य निर्माण हुआ।",
    darshanTimings: "प्रातः 03:00 बजे से रात्रि 11:00 बजे तक",
    aartiTimings: "मंगला आरती: 03:00 AM, भोग आरती: 11:15 AM, सप्तर्षि आरती: 07:00 PM, शयन आरती: 10:30 PM",
    howToReach: "वाराणसी कैंट रेलवे स्टेशन से 5 किमी, लाल बहादुर शास्त्री हवाई अड्डे (बाबतपुर) से 25 किमी।",
    image: "/images/temples/kashi-vishwanath.jpg",
  },
  {
    id: "t2",
    slug: "shri-somnath-jyotirlinga-gujarat",
    name: "श्री सोमनाथ ज्योतिर्लिंग मंदिर",
    deity: "भगवान शिव (सोमनाथ)",
    location: "प्रभास पाटन, वेरावल",
    state: "गुजरात",
    type: "jyotirlinga",
    significance: "पृथ्वी का प्रथम ज्योतिर्लिंग। चन्द्रदेव (सोम) ने यहाँ शिवजी की तपस्या कर अपने शाप से मुक्ति प्राप्त की थी।",
    history: "अनेक बार आक्रांताओं द्वारा तोड़े जाने के बाद भी यह मंदिर सनातन आस्था के अमर प्रतीक के रूप में आज भव्य रूप में सागर तट पर खड़ा है।",
    darshanTimings: "प्रातः 06:00 बजे से रात्रि 09:30 बजे तक",
    aartiTimings: "प्रातः आरती: 07:00 AM, दोपहर आरती: 12:00 PM, संध्या आरती: 07:00 PM",
    howToReach: "वेरावल रेलवे स्टेशन से 7 किमी, राजकोट हवाई अड्डे से लगभग 200 किमी।",
    image: "/images/temples/somnath.jpg",
  },
  {
    id: "t3",
    slug: "shri-kedarnath-dham-uttarakhand",
    name: "श्री केदारनाथ धाम मंदिर",
    deity: "भगवान शिव (सदाशिव)",
    location: "रुद्रप्रयाग, गढ़वाल हिमालय",
    state: "उत्तराखंड",
    type: "jyotirlinga",
    significance: "चार धाम और 12 ज्योतिर्लिंगों में सर्वोच्च ऊंचाई (3,584 मीटर) पर स्थित जागृत महातीर्थ।",
    history: "पांडवों द्वारा स्थापित और आदि शंकराचार्य द्वारा पुनरुद्धार किया गया। यहाँ भगवान शिव बैल के कूबड़ के रूप में विराजमान हैं।",
    darshanTimings: "प्रातः 05:00 AM से दोपहर 01:00 PM एवं 05:00 PM से 09:00 PM (कपाट खुलने पर)",
    aartiTimings: "महाभिषेक: 05:00 AM, संध्या आरती: 07:00 PM",
    howToReach: "ऋषिकेश से 215 किमी सड़क मार्ग गौरीकुंड तक, इसके बाद 16 किमी की पैदल/घोड़ा/हेलीकॉप्टर यात्रा।",
    image: "/images/temples/kedarnath.jpg",
  },
  {
    id: "t4",
    slug: "shri-bade-hanuman-ji-prayagraj",
    name: "श्री बड़े हनुमान जी (लेटे हुए हनुमान)",
    deity: "श्री हनुमान जी",
    location: "त्रिवेणी संगम, प्रयागराज",
    state: "उत्तर प्रदेश",
    type: "major",
    significance: "विश्व की एकमात्र ऐसी प्रतिमा जहाँ हनुमान जी विश्राम मुद्रा (भू-शयन) में विराजमान हैं। गंगा जी प्रतिवर्ष इनका जलाभिषेक करती हैं।",
    history: "अत्यंत प्राचीन सिद्ध स्थल जहाँ लंका विजय के उपरांत हनुमान जी ने विश्राम किया था।",
    darshanTimings: "प्रातः 05:00 AM से रात्रि 10:00 PM",
    aartiTimings: "प्रातः आरती: 05:30 AM, संध्या आरती: 07:30 PM",
    howToReach: "प्रयागराज जंक्शन से 6 किमी, संगम तट के समीप।",
    image: "/images/temples/bade-hanuman.jpg",
  },
];

// FESTIVALS
export const FESTIVALS: FestivalItem[] = [
  {
    id: "f1",
    slug: "maha-shivratri",
    name: "महाशिवरात्रि (Maha Shivratri)",
    date2026: "15 फरवरी 2026",
    tithi: "फाल्गुन कृष्ण पक्ष चतुर्दशी",
    significance: "भगवान शिव और माता पार्वती के दिव्य विवाह तथा शिवजी द्वारा ज्योतिर्लिंग रूप में प्राकट्य का महान महापर्व।",
    pujaVidhi: "चार प्रहर की पूजा में शिवलिंग पर जल, दूध, दही, शहद, बेलपत्र, धतूरा, भस्म अर्पित करें। रुद्राभिषेक व रात्रि जागरण करें।",
    pujaSamagri: ["गंगाजल", "दूध", "बेलपत्र (अखंड)", "धतूरा", "भांग", "सफेद चंदन", "भस्म", "अक्षत"],
    mantra: "ॐ नमः शिवाय / ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
  },
  {
    id: "f2",
    slug: "diwali-deepavali",
    name: "दीपावली / दिवाली (Deepavali)",
    date2026: "8 नवंबर 2026",
    tithi: "कार्तिक कृष्ण पक्ष अमावस्या",
    significance: "भगवान श्री राम के 14 वर्ष वनवास उपरांत अयोध्या आगमन एवं समुद्र मंथन से माँ लक्ष्मी के प्राकट्य का प्रकाश पर्व।",
    pujaVidhi: "सायंकाल प्रदोष काल एवं स्थिर लग्न में गणेश-लक्ष्मी पूजन, कुबेर पूजन, दीप प्रज्वलन व आरती करें।",
    pujaSamagri: ["मिट्टी के दीये", "शुद्ध घी / तिल का तेल", "रोली", "कमल पुष्प", "खील-बताशे", "कलश", "गंगाजल"],
    mantra: "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः",
  },
  {
    id: "f3",
    slug: "chaitra-navratri",
    name: "चैत्र नवरात्रि (Chaitra Navratri)",
    date2026: "19 मार्च 2026",
    tithi: "चैत्र शुक्ल पक्ष प्रतिपदा से नवमी",
    significance: "माँ दुर्गा के नौ रूपों (नवदुर्गा) की आराधना एवं हिंदू नववर्ष (विक्रम संवत) का पावन शुभारंभ।",
    pujaVidhi: "घटस्थापना (कलश स्थापना), अखंड ज्योति, दुर्गा सप्तशती पाठ एवं नवमी को कन्या पूजन।",
    pujaSamagri: ["मिट्टी का कलश", "जौ बोने का पात्र", "नारियल", "चुनरी", "धूप-दीप", "पंचमेवा", "दुर्गा सप्तशती पुस्तक"],
    mantra: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
  },
];

// SPIRITUAL TOOLS
export const TOOLS: ToolItem[] = [
  {
    id: "tool-mala",
    slug: "108-jap-mala-counter",
    name: "108 जप माला काउंटर (Digital Jap Mala)",
    description: "पारंपरिक 108 मनकों वाली डिजिटल माला। स्पर्श, मंत्र स्मरण और माला पूर्ण होने पर सौम्य घंटी ध्वनि सहित।",
    category: "मंत्र व साधना",
    icon: "CircleDot",
    isInteractive: true,
  },
  {
    id: "tool-bell",
    slug: "digital-temple-bell",
    name: "डिजिटल मंदिर घंटी (Temple Bell & Shankh)",
    description: "पीतल की मंदिर घंटी और पावन शंख की प्रामाणिक ध्वनि। दैनिक पूजा और आरती के समय वातावरण को पवित्र बनाने हेतु।",
    category: "पूजा व आरती",
    icon: "Bell",
    isInteractive: true,
  },
  {
    id: "tool-puja-checklist",
    slug: "daily-puja-checklist",
    name: "दैनिक पूजा चेकलिस्ट (Daily Puja Planner)",
    description: "स्नान, आचमन, तिलक, दीप प्रज्वलन, मंत्र जप व आरती की चरणबद्ध मार्गदर्शिका।",
    category: "पूजा व व्रत",
    icon: "CheckSquare",
    isInteractive: true,
  },
  {
    id: "tool-brahma-muhurat",
    slug: "brahma-muhurat-calculator",
    name: "ब्रह्म मुहूर्त व सूर्योदय गणक",
    description: "आपके शहर के अक्षांश-देशांतर के आधार पर सटीक ब्रह्म मुहूर्त, सूर्योदय और अभिजित मुहूर्त का समय।",
    category: "पंचांग व मुहूर्त",
    icon: "Sunrise",
    isInteractive: true,
  },
  {
    id: "tool-choghadiya",
    slug: "choghadiya-calculator",
    name: "आज का चौघड़िया (Choghadiya)",
    description: "दिन और रात के सभी 8 चौघड़ियों (शुभ, अमृत, लाभ, चर, रोग, काल, उद्वेग) की सटीक समय सारिणी।",
    category: "पंचांग व मुहूर्त",
    icon: "Clock",
    isInteractive: true,
  },
  {
    id: "tool-baby-names",
    slug: "hindu-baby-names",
    name: "वैदिक एवं सनातन नाम खोजक",
    description: "नक्षत्र, राशि और अर्थ के आधार पर बालक एवं बालिकाओं के लिए 1000+ सुंदर संस्कृत व वैदिक नाम।",
    category: "ज्ञान व परंपरा",
    icon: "BookOpen",
    isInteractive: true,
  },
];

// SCRIPTURES
export const SCRIPTURES: ScriptureItem[] = [
  {
    id: "sc1",
    slug: "bhagavad-gita",
    title: "श्रीमद्भगवद्गीता",
    titleSanskrit: "श्रीमद्भगवद्गीता",
    author: "महर्षि वेदव्यास / श्री कृष्ण उपदेश",
    category: "इतिहास / उपनिषद् सार",
    chaptersCount: 18,
    versesCount: 700,
    description: "महाभारत के भीष्म पर्व का वह पावन अंश जहाँ कुरुक्षेत्र के मैदान में भगवान श्री कृष्ण ने अर्जुन को कर्मयोग, भक्तियोग और ज्ञानयोग का अमर संदेश दिया।",
    famousVerses: [
      {
        verse: "अध्याय 2, श्लोक 47",
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        hindi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म के फल के कारण मत बनो और न ही अकर्मण्यता में तुम्हारी आसक्ति हो।",
        meaning: "निष्काम कर्मयोग का सारभूत श्लोक। निष्ठापूर्वक कर्म करें, परिणाम परमात्मा को समर्पित करें।",
      },
      {
        verse: "अध्याय 4, श्लोक 7-8",
        sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥\nपरित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
        hindi: "हे भारत! जब-जब धर्म की हानि होती है और अधर्म की वृद्धि होती है, तब-तब मैं स्वयं को प्रकट करता हूँ। साधुओं की रक्षा, दुष्टों के विनाश और धर्म की पुनर्स्थापना के लिए मैं युग-युग में अवतार लेता हूँ।",
        meaning: "भगवान के दिव्य अवतार का परम प्रयोजन और सनातन धर्म की सुरक्षा का ईश्वरीय वचन।",
      },
    ],
  },
];

// RASHIFAL (12 ZODIACS)
export const RASHIS = [
  { id: "mesh", name: "मेष (Aries)", symbol: "♈", lord: "मंगल", element: "अग्नि", luckyNum: 9, luckyColor: "लाल", mantra: "ॐ भौमाय नमः" },
  { id: "vrishabh", name: "वृषभ (Taurus)", symbol: "♉", lord: "शुक्र", element: "पृथ्वी", luckyNum: 6, luckyColor: "सफेद / चमकीला", mantra: "ॐ शुक्राय नमः" },
  { id: "mithun", name: "मिथुन (Gemini)", symbol: "♊", lord: "बुध", element: "वायु", luckyNum: 5, luckyColor: "हरा", mantra: "ॐ बुधाय नमः" },
  { id: "kark", name: "कर्क (Cancer)", symbol: "♋", lord: "चन्द्रमा", element: "जल", luckyNum: 2, luckyColor: "दूधिया / मोती", mantra: "ॐ सोमाय नमः" },
  { id: "singh", name: "सिंह (Leo)", symbol: "♌", lord: "सूर्य", element: "अग्नि", luckyNum: 1, luckyColor: "सुनहरा / नारंगी", mantra: "ॐ सूर्याय नमः" },
  { id: "kanya", name: "कन्या (Virgo)", symbol: "♍", lord: "बुध", element: "पृथ्वी", luckyNum: 5, luckyColor: "धानी / गहरा हरा", mantra: "ॐ बुं बुधाय नमः" },
  { id: "tula", name: "तुला (Libra)", symbol: "♎", lord: "शुक्र", element: "वायु", luckyNum: 6, luckyColor: "हल्का नीला / श्वेत", mantra: "ॐ शुं शुक्राय नमः" },
  { id: "vrishchik", name: "वृश्चिक (Scorpio)", symbol: "♏", lord: "मंगल", element: "जल", luckyNum: 9, luckyColor: "मैरून / लाल", mantra: "ॐ अं अंगारकाय नमः" },
  { id: "dhanu", name: "धनु (Sagittarius)", symbol: "♐", lord: "बृहस्पति", element: "अग्नि", luckyNum: 3, luckyColor: "पीला", mantra: "ॐ बृहस्पतये नमः" },
  { id: "makar", name: "मकर (Capricorn)", symbol: "♑", lord: "शनि", element: "पृथ्वी", luckyNum: 8, luckyColor: "नीला / काला", mantra: "ॐ शं शनैश्चराय नमः" },
  { id: "kumbh", name: "कुंभ (Aquarius)", symbol: "♒", lord: "शनि", element: "वायु", luckyNum: 8, luckyColor: "आसमानी / जामुनी", mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः" },
  { id: "meen", name: "मीन (Pisces)", symbol: "♓", lord: "बृहस्पति", element: "जल", luckyNum: 3, luckyColor: "केसरिया / पीला", mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः" },
];
