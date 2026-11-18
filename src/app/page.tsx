import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Music,
  Bell,
  MapPin,
  ArrowRight,
  Flame,
  Clock,
  Compass,
  Calendar,
  Sun,
  Moon,
  ShieldCheck,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import { PanchangWidget } from "@/components/sections/PanchangWidget";
import { JapMalaCounter } from "@/components/features/JapMalaCounter";
import { SpiritualAudioSection } from "@/components/features/SpiritualAudioSection";
import { SmartSearchBar } from "@/components/ui/SmartSearchBar";
import {
  BHAJANS,
  MANTRAS,
  CHALISAS,
  AARTIS,
  TEMPLES,
  FESTIVALS,
  SCRIPTURES,
  TOOLS,
  RASHIS,
  ARTICLES,
  AUTHORS,
} from "@/data/devotionalData";
import { brandConfig } from "@/config/site";

// Six Major Collections
const MAJOR_COLLECTIONS = [
  {
    title: "भजन संग्रह",
    titleEn: "Bhajan Sangrah",
    count: "100+ भजन",
    desc: "श्री कृष्ण, महादेव, श्री राम, हनुमान व देवी माँ के आनंदमयी संकीर्तन एवं भावार्थ।",
    href: "/bhajan",
    color: "from-amber-500/10 to-saffron/10",
    border: "border-saffron/30",
    icon: Music,
  },
  {
    title: "सिद्ध मंत्र",
    titleEn: "Siddha Mantra",
    count: "वैदिक ऋचाएं",
    desc: "गायत्री, महामृत्युंजय व बीज मंत्र: शुद्ध उच्चारण, जप विधि व अर्थ सहित।",
    href: "/mantra",
    color: "from-red-500/10 to-maroon/10",
    border: "border-maroon/30",
    icon: Sparkles,
  },
  {
    title: "आरती संग्रह",
    titleEn: "Aarti Sangrah",
    count: "दैनिक उपासना",
    desc: "प्रातः व संध्या आरती, कर्पूर आरती एवं समस्त देवी-देवताओं की पावन स्तुति।",
    href: "/aarti",
    color: "from-amber-600/10 to-gold/10",
    border: "border-gold/30",
    icon: Flame,
  },
  {
    title: "पावन चालीसा",
    titleEn: "Pavan Chalisa",
    count: "संकट निवारक",
    desc: "श्री हनुमान चालीसा, शिव चालीसा, दुर्गा चालीसा का संपूर्ण पाठ व दोहे।",
    href: "/chalisa",
    color: "from-orange-500/10 to-amber-500/10",
    border: "border-saffron/30",
    icon: BookOpen,
  },
  {
    title: "पंचांग एवं व्रत",
    titleEn: "Panchang & Vrat",
    count: "दैनिक मुहूर्त",
    desc: "सूर्योदय, सूर्यास्त, राहुकाल, शुभ चौघड़िया व आगामी एकादशी-त्योहार कैलेंडर।",
    href: "/panchang",
    color: "from-yellow-500/10 to-amber-500/10",
    border: "border-gold/30",
    icon: Calendar,
  },
  {
    title: "सनातन ग्रंथ",
    titleEn: "Sanatan Granth",
    count: "ज्ञान की गंगा",
    desc: "श्रीमद्भगवद्गीता, वाल्मीकि रामायण, उपनिषद् सार एवं 18 महापुराण।",
    href: "/granth",
    color: "from-maroon/10 to-stone/10",
    border: "border-maroon/25",
    icon: Compass,
  },
];

// Daily Home Puja & Sadhana Timetable
const DAILY_PUJA_TIMETABLE = [
  {
    period: "ब्रह्म मुहूर्त साधना",
    time: "05:10 AM – 05:58 AM",
    title: "आत्म-जागरण एवं ॐकार ध्यान",
    action: "बिस्तर त्यागकर ईष्ट स्मरण, ध्यान एवं 108 गायत्री / ॐकार मंत्र जप।",
    tag: "सर्वोत्तम योग काल",
  },
  {
    period: "प्रातः सूर्य अर्घ्य व देव पूजा",
    time: "06:46 AM (सूर्योदय काल)",
    title: "ताम्र कलश अर्घ्य एवं दीप प्रज्वलन",
    action: "गायत्री मंत्र के साथ सूर्य नमस्कार, घर के मंदिर में दीप प्रज्वलन व धूप-नैवेद्य अर्पण।",
    tag: "प्रातः काल",
  },
  {
    period: "मध्याह्न स्वाध्याय व गीता पाठ",
    time: "12:00 PM – 12:45 PM",
    title: "श्रीमद्भगवद्गीता स्वाध्याय",
    action: "गीता का एक अध्याय अथवा 5 श्लोकों का अर्थ सहित वाचन एवं जीवन में चिंतन।",
    tag: "ज्ञान साधना",
  },
  {
    period: "सायंकालीन संध्या व आरती",
    time: "05:27 PM (प्रदोष सूर्यास्त काल)",
    title: "कर्पूर आरती एवं तुलसी दीप",
    action: "तुलसी महारानी व मुख्य मंदिर में दीपदान, 'ॐ जय जगदीश हरे' अथवा इष्ट आरती गायन।",
    tag: "संध्या वंदन",
  },
  {
    period: "रात्रि प्रार्थना व आत्म-चिंतन",
    time: "08:30 PM – 09:15 PM",
    title: "हनुमान चालीसा पाठ एवं कृतज्ञता",
    action: "दिनभर के कर्मों का ईश्वरार्पण, हनुमान चालीसा पाठ एवं मंगलमय विश्राम प्रार्थना।",
    tag: "रात्रि शांति",
  },
  {
    period: "महामंत्र जप व मानसिक विश्राम",
    time: "शयन पूर्व",
    title: "मानसिक महामंत्र स्मरण",
    action: "हरे कृष्ण महामंत्र अथवा 'ॐ नमः शिवाय' का 11 बार मानसिक जप कर शांतिपूर्वक शयन।",
    tag: "विश्राम",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION WITH AMBIENT MANDALA & SMART MULTILINGUAL SEARCH */}
      <section className="relative bg-gradient-to-b from-cream via-ivory to-ivory pt-12 pb-16 sm:pb-24 border-b border-gold/15 overflow-hidden">
        {/* Ambient Rotating Mandala Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] pointer-events-none opacity-[0.035] animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-maroon">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50,2 L54,38 L90,50 L54,62 L50,98 L46,62 L10,50 L46,38 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M16,16 L42,42 L50,10 L58,42 L84,16 L62,46 L90,50 L62,54 L84,84 L58,58 L50,90 L42,58 L16,84 L46,62 L10,50 L46,38 Z" fill="none" stroke="currentColor" strokeWidth="0.3" />
          </svg>
        </div>

        {/* Aura glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-saffron/15 via-gold/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/30 text-saffron-dark text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-saffron" />
            <span>{brandConfig.name} — {brandConfig.tagline}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-maroon leading-tight tracking-tight max-w-4xl mx-auto">
            भक्ति, साधना एवं वैदिक ज्ञान की अमृत धारा
          </h1>

          <p className="mt-4 font-serif text-lg sm:text-2xl text-saffron-dark font-medium">
            {brandConfig.taglineHi}
          </p>

          <p className="mt-3 text-xs sm:text-base text-stone max-w-2xl mx-auto leading-relaxed">
            भजन, सिद्ध मंत्र, पावन आरती संग्रह, चालीसा पाठ, दैनिक पंचांग और व्रत-त्योहारों की प्रामाणिक एवं संदर्भ-आधारित मार्गदर्शिका।
          </p>

          {/* LARGE INTELLIGENT MULTILINGUAL SEARCH BAR */}
          <div className="mt-8 max-w-2xl mx-auto">
            <SmartSearchBar variant="hero" />
          </div>

          {/* Quick Shortcuts */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link
              href="/panchang"
              className="px-3.5 py-1.5 rounded-full bg-white border border-gold/30 hover:border-saffron text-charcoal hover:text-saffron transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Sun className="w-3.5 h-3.5 text-saffron" />
              <span>आज का पंचांग</span>
            </Link>
            <Link
              href="/daily-darshan"
              className="px-3.5 py-1.5 rounded-full bg-white border border-gold/30 hover:border-saffron text-charcoal hover:text-saffron transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>दैनिक दिव्य दर्शन</span>
            </Link>
            <Link
              href="/status-maker"
              className="px-3.5 py-1.5 rounded-full bg-white border border-gold/30 hover:border-saffron text-charcoal hover:text-saffron transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>भक्ति स्टेटस स्टूडियो</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: SIX MAJOR COLLECTION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
            पावन भक्ति संग्रह
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon mt-1">
            सनातन धर्म की छह प्रमुख ज्ञान धाराएं
          </h2>
          <p className="text-xs sm:text-sm text-stone mt-2">
            प्रत्येक श्रेणी को प्रामाणिक मूल ग्रंथों, शुद्ध संस्कृत व हिंदी भावार्थ सहित संजोया गया है
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAJOR_COLLECTIONS.map((col, idx) => {
            const Icon = col.icon;
            return (
              <Link
                key={idx}
                href={col.href}
                className={`bg-cream rounded-2xl p-6 border ${col.border} shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center group-hover:bg-saffron group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-ivory border border-gold/20 text-stone text-[11px] font-semibold">
                      {col.count}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron transition-colors">
                    {col.title}
                  </h3>
                  <span className="text-[11px] text-stone font-inter block mb-2">
                    {col.titleEn}
                  </span>
                  <p className="text-xs text-stone leading-relaxed">
                    {col.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron">
                  <span>संग्रह देखें</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. TODAY'S PANCHANG WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PanchangWidget />
      </section>

      {/* 4. SECTION 7: HIGH-PRECISION SPIRITUAL AUDIO & ACOUSTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpiritualAudioSection />
      </section>

      {/* 5. SECTION 2: LATEST BHAKTI ARTICLES (6 EDITORIAL CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-gold/15">
          <div>
            <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
              संपादकीय एवं शोध
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              नवीनतम आध्यात्मिक आलेख व चिंतन
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-saffron hover:text-saffron-dark text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors mt-2 sm:mt-0"
          >
            सभी आलेख पढ़ें <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.slice(0, 6).map((art) => {
            const author = AUTHORS.find((a) => a.id === art.authorId);
            return (
              <article
                key={art.id}
                className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark font-semibold">
                      {art.category}
                    </span>
                    <span className="text-stone flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readingTimeMinutes} मिनट वाचन
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-maroon group-hover:text-saffron transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone mt-2.5 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
                  <div className="text-xs text-stone">
                    <span className="font-medium text-charcoal block">
                      {author?.name || "विद्वान मंडल"}
                    </span>
                    <span className="text-[10px] text-stone-light">
                      {art.publishedDate}
                    </span>
                  </div>

                  <Link
                    href={`/articles/${art.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-saffron/10 hover:bg-saffron text-saffron-dark hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>पढ़ें</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 6. SECTION 3: ZODIAC EXPLORER (12 RASHI CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-gold/15 mb-6">
            <div>
              <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
                वैदिक ज्योतिष एवं साधना
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
                द्वादश राशियां: वैदिक मार्गदर्शन एवं ईष्ट मंत्र
              </h2>
            </div>
            <p className="text-xs text-stone mt-1 sm:mt-0">
              अपनी जन्म राशि अनुसार पारंपरिक स्वामी ग्रह, शुभ तत्व व सिद्ध मंत्र जानें
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {RASHIS.map((rashi) => (
              <Link
                key={rashi.id}
                href={`/rashifal/${rashi.id}`}
                className="p-4 rounded-2xl bg-ivory border border-gold/20 hover:border-saffron hover:shadow-card-hover transition-all text-center group block"
              >
                <span className="text-3xl block mb-2 transform group-hover:scale-110 transition-transform">
                  {rashi.symbol}
                </span>
                <h3 className="font-serif font-bold text-sm text-charcoal group-hover:text-maroon">
                  {rashi.name.split(" ")[0]}
                </h3>
                <span className="text-[10px] text-stone font-inter block mb-1">
                  {rashi.name.split(" ")[1] || ""}
                </span>
                <div className="pt-2 border-t border-gold/10 text-[10px] text-stone space-y-0.5">
                  <span className="block">स्वामी: <strong className="text-charcoal">{rashi.lord}</strong></span>
                  <span className="block text-saffron font-medium truncate">{rashi.mantra}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION 4: DAILY AARTI & CHALISA SIDE-BY-SIDE COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chalisas */}
          <div className="bg-cream border border-gold/25 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gold/15 mb-4">
                <div>
                  <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
                    संकट निवारक
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-maroon">
                    पावन चालीसा पाठ संग्रह
                  </h3>
                </div>
                <Link
                  href="/chalisa"
                  className="text-xs text-saffron hover:text-saffron-dark font-semibold"
                >
                  सभी चालीसा →
                </Link>
              </div>

              <div className="space-y-3">
                {CHALISAS.map((c) => (
                  <Link
                    key={c.id}
                    href={`/chalisa/${c.slug}`}
                    className="p-4 rounded-2xl bg-ivory border border-gold/15 hover:border-saffron hover:shadow-xs transition-all flex items-center justify-between block group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-saffron/10 text-saffron-dark">
                          {c.deity}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-charcoal group-hover:text-maroon text-base">
                        {c.title}
                      </h4>
                      <p className="text-xs text-stone line-clamp-1 mt-0.5">
                        {c.significance}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone group-hover:text-saffron transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gold/15 text-center">
              <Link
                href="/chalisa/hanuman-chalisa"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-maroon hover:bg-maroon-light text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
              >
                <span>श्री हनुमान चालीसा शुद्ध पाठ पढ़ें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Aartis */}
          <div className="bg-cream border border-gold/25 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gold/15 mb-4">
                <div>
                  <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
                    दैनिक उपासना
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-maroon">
                    आरती संग्रह (नित्य वंदना)
                  </h3>
                </div>
                <Link
                  href="/aarti"
                  className="text-xs text-saffron hover:text-saffron-dark font-semibold"
                >
                  सभी आरतियां →
                </Link>
              </div>

              <div className="space-y-3">
                {AARTIS.map((a) => (
                  <Link
                    key={a.id}
                    href={`/aarti/${a.slug}`}
                    className="p-4 rounded-2xl bg-ivory border border-gold/15 hover:border-saffron hover:shadow-xs transition-all flex items-center justify-between block group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-saffron/10 text-saffron-dark">
                          {a.deity}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-charcoal group-hover:text-maroon text-base">
                        {a.title}
                      </h4>
                      <p className="text-xs text-stone line-clamp-1 mt-0.5">
                        {a.significance}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone group-hover:text-saffron transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gold/15 text-center">
              <Link
                href="/aarti/om-jai-jagdish-hare"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-saffron hover:bg-saffron-light text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
              >
                <span>ॐ जय जगदीश हरे आरती पढ़ें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION 5: UPCOMING VRAT & FESTIVALS WITH ACCURATE DATES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-gold/15">
          <div>
            <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
              सनातन व्रत व उत्सव
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              आगामी प्रमुख व्रत एवं सनातन महापर्व
            </h2>
          </div>
          <Link
            href="/festivals"
            className="text-saffron hover:text-saffron-dark text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors mt-2 sm:mt-0"
          >
            वार्षिक व्रत कैलेंडर देखें <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FESTIVALS.map((fest) => (
            <div
              key={fest.id}
              className="bg-cream border border-gold/25 rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-bold text-maroon">
                    {fest.name}
                  </h3>
                  <span className="px-2.5 py-1 rounded-xl bg-saffron/15 text-saffron-dark font-semibold text-xs whitespace-nowrap">
                    {fest.date2026}
                  </span>
                </div>
                <p className="text-xs text-saffron font-medium mb-3">
                  तिथि: {fest.tithi}
                </p>
                <p className="text-xs text-stone leading-relaxed line-clamp-3">
                  {fest.significance}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/15 flex justify-between items-center text-xs">
                <span className="text-stone">पूजा विधि व मंत्र उपलब्ध</span>
                <Link
                  href={`/festivals/${fest.slug}`}
                  className="text-saffron font-bold hover:underline"
                >
                  विस्तार से जानें →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SECTION 6: DAILY HOME PUJA & SADHANA TIMETABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-maroon via-maroon/95 to-maroon text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block px-3.5 py-1 rounded-full bg-saffron/25 text-saffron-light text-xs font-semibold uppercase tracking-wider border border-saffron/30 mb-3">
                दैनिक गृह साधना
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                दैनिक गृह पूजा एवं साधना समय-सारणी
              </h2>
              <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
                सूर्योदय एवं सूर्यास्त के आधार पर निर्धारित शास्त्रीय छह प्रहर: पारिवारिक सुख, मानसिक शांति और आध्यात्मिक उन्नति हेतु अनुशंसित नियम।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DAILY_PUJA_TIMETABLE.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-gold/25 hover:border-saffron transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-saffron text-white text-[10px] font-bold">
                      {item.tag}
                    </span>
                    <span className="text-saffron-light font-medium flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-cream">
                    {item.period}
                  </h3>
                  <h4 className="text-xs font-semibold text-gold-light mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/tools/puja-sankalp-generator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-saffron hover:bg-saffron-light text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm"
              >
                <span>आज का वैदिक पूजा संकल्प तैयार करें</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. DAILY EXPERIENCES & STATUS STUDIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Darshan */}
          <Link
            href="/daily-darshan"
            className="group bg-gradient-to-br from-cream to-ivory border border-gold/30 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:border-gold transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider inline-block">
                प्रातः मंगल दर्शन
              </span>
              <h3 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron transition-colors">
                दैनिक दिव्य दर्शन
              </h3>
              <p className="text-xs text-stone leading-relaxed">
                काशी विश्वनाथ ज्योतिर्लिंग प्रातः मंगला दर्शन, दैनिक शिव संकल्प और पावन आशीर्वाद।
              </p>
            </div>
            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron mt-4">
              <span>दर्शन करें</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Today's Shloka */}
          <Link
            href="/daily-shloka"
            className="group bg-gradient-to-br from-cream to-ivory border border-gold/30 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:border-gold transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider inline-block">
                दैनिक स्वाध्याय
              </span>
              <h3 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron transition-colors">
                दैनिक संस्कृत श्लोक
              </h3>
              <p className="text-xs text-stone leading-relaxed">
                श्रीमद्भगवद्गीता के अमर श्लोक, पदच्छेद, शब्दार्थ एवं जीवनोपयोगी हिंदी भावार्थ।
              </p>
            </div>
            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron mt-4">
              <span>श्लोक पढ़ें</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Bhakti Status Studio */}
          <Link
            href="/status-maker"
            className="group bg-gradient-to-br from-maroon/90 to-maroon text-white border border-gold/40 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-full bg-saffron text-white text-xs font-semibold uppercase tracking-wider inline-block">
                विशेष साधन
              </span>
              <h3 className="font-serif text-xl font-bold text-cream group-hover:text-saffron-light transition-colors">
                भक्ति स्टेटस स्टूडियो
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                व्हाट्सएप और इंस्टाग्राम के लिए सुंदर HD 9:16 व 1:1 श्लोक स्टेटस कार्ड बनाएं।
              </p>
            </div>
            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-saffron-light mt-4">
              <span>कार्ड बनाएं</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
