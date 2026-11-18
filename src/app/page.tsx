import Link from "next/link";
import { Search, Sparkles, BookOpen, Music, Bell, MapPin, Compass, ArrowRight, Play, Heart, Star, ShieldCheck, Smartphone, CheckCircle } from "lucide-react";
import { PanchangWidget } from "@/components/sections/PanchangWidget";
import { JapMalaCounter } from "@/components/features/JapMalaCounter";
import { TempleBellPlayer } from "@/components/features/TempleBellPlayer";
import { BHAJANS, MANTRAS, CHALISAS, AARTIS, TEMPLES, FESTIVALS, SCRIPTURES, TOOLS, RASHIS } from "@/data/devotionalData";
import { deities, brandConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-cream via-ivory to-ivory pt-10 pb-16 sm:pb-24 border-b border-gold/15 overflow-hidden">
        {/* Subtle decorative aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-saffron/15 via-gold/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/30 text-saffron-dark text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-saffron" />
            <span>{brandConfig.name} — {brandConfig.tagline}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-maroon leading-tight tracking-tight max-w-4xl mx-auto">
            {brandConfig.heroHeadingHi}
          </h1>

          <p className="mt-4 font-serif text-xl sm:text-2xl text-saffron-dark font-semibold">
            {brandConfig.tagline}
          </p>

          <p className="mt-3 text-base sm:text-lg text-stone max-w-2xl mx-auto leading-relaxed">
            {brandConfig.heroDescriptionHi}
          </p>

          {/* Large Intelligent Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form action="/search" method="GET" className="relative shadow-dropdown rounded-2xl">
              <Search className="w-5 h-5 text-stone absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                name="q"
                placeholder={`${brandConfig.nameHi} में खोजें: श्री कृष्ण भजन, हनुमान चालीसा, गायत्री मंत्र, काशी विश्वनाथ...`}
                className="w-full pl-12 pr-28 py-4 bg-white border border-gold/30 rounded-2xl text-charcoal placeholder-stone-light text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-saffron"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-saffron hover:bg-saffron-light text-white font-medium text-sm rounded-xl transition-all shadow-xs"
              >
                खोजें
              </button>
            </form>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/bhajan"
              className="px-6 py-3.5 bg-maroon hover:bg-maroon-light text-white font-medium text-base rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <span>भक्ति की दुनिया में प्रवेश करें</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/panchang"
              className="px-6 py-3.5 bg-white border border-gold/40 hover:border-gold text-maroon font-medium text-base rounded-xl transition-all shadow-xs"
            >
              आज का पंचांग देखें
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TODAY'S PANCHANG WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PanchangWidget />
      </section>

      {/* 3. DEITY EXPLORER (लोकप्रिय देवी-देवता दर्शन) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-gold/15">
          <div>
            <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
              इष्टदेव दर्शन
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              प्रमुख देवी-देवता एवं उपासना
            </h2>
          </div>
          <p className="text-stone text-xs sm:text-sm mt-1 sm:mt-0">
            अपने इष्ट के भजन, मंत्र, आरती और कथाएं {brandConfig.nameHi} पर एक स्थान पर प्राप्त करें
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {deities.map((deity) => (
            <Link
              key={deity.id}
              href={`/bhajan?deity=${deity.id}`}
              className="bg-cream border border-gold/20 rounded-2xl p-4 text-center hover:border-saffron hover:shadow-card-hover transition-all transform hover:-translate-y-1 group"
            >
              <div
                className="w-14 h-14 mx-auto rounded-full flex items-center justify-center font-serif text-xl font-bold text-white shadow-xs mb-3 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: deity.color }}
              >
                {deity.name.charAt(0)}
              </div>
              <h3 className="font-serif font-bold text-sm text-charcoal group-hover:text-maroon">
                {deity.name}
              </h3>
              <span className="text-[10px] text-stone font-inter uppercase tracking-wide">
                {deity.nameEn}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR BHAJANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-gold/15">
          <div>
            <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
              आनंदमयी संकीर्तन
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              लोकप्रिय भजन संग्रह
            </h2>
          </div>
          <Link
            href="/bhajan"
            className="text-saffron hover:text-saffron-dark text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            सभी भजन देखें <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {BHAJANS.map((bhajan) => (
            <div
              key={bhajan.id}
              className="bg-cream border border-gold/25 rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-gold transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-saffron font-medium mb-2">
                  <span>{bhajan.category}</span>
                  <span className="px-2 py-0.5 rounded-full bg-saffron/10 text-saffron-dark text-[10px]">
                    {bhajan.deity}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-maroon line-clamp-1 mb-2">
                  {bhajan.title}
                </h3>
                <p className="text-xs text-stone font-devanagari line-clamp-3 whitespace-pre-line leading-relaxed mb-4 bg-ivory/60 p-3 rounded-xl border border-gold/10">
                  {bhajan.lyrics}
                </p>
              </div>

              <div className="pt-3 border-t border-gold/10 flex items-center justify-between">
                <span className="text-[11px] text-stone truncate max-w-[140px]">
                  {bhajan.singer}
                </span>
                <Link
                  href={`/bhajan/${bhajan.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-saffron/10 hover:bg-saffron text-saffron-dark hover:text-white text-xs font-medium transition-colors inline-flex items-center gap-1"
                >
                  भावार्थ व बोल →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MANTRA OF THE DAY & INTERACTIVE JAP MALA */}
      <section className="bg-gradient-to-b from-ivory via-cream to-ivory py-12 border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Mantra of the Day Editorial Card */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold text-saffron uppercase tracking-wider block mb-1">
                  दैनिक साधना
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
                  आज का पावन मंत्र: गायत्री महामंत्र
                </h2>
                <p className="text-stone text-xs sm:text-sm mt-1">
                  ऋग्वेद का सर्वोत्कृष्ट मंत्र, जो आत्मा को परमात्मा के दिव्य प्रकाश से आलोकित करता है।
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gold/30 shadow-card">
                <div className="p-4 bg-amber-50/70 border border-gold/30 rounded-xl text-center">
                  <p className="font-serif text-maroon text-xl sm:text-2xl font-bold leading-loose text-sanskrit">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥
                  </p>
                </div>

                <div className="mt-5 space-y-3 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-charcoal">सम्पूर्ण भावार्थ:</h4>
                    <p className="text-stone leading-relaxed">
                      उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा को हम अपनी अंतरात्मा में धारण करें। वह परमात्मा हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करे।
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gold/15 flex flex-wrap items-center justify-between text-xs text-stone gap-2">
                    <span>स्रोत: ऋग्वेद (3.62.10)</span>
                    <span>अनुशंसित जाप: 108 बार</span>
                    <Link
                      href="/mantra/gayatri-mantra"
                      className="text-saffron font-bold hover:underline"
                    >
                      विस्तृत व्याख्या व विधि पढ़ें →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Temple Bell Acoustics */}
              <TempleBellPlayer />
            </div>

            {/* Right: Interactive 108 Jap Mala */}
            <div className="lg:col-span-6">
              <JapMalaCounter />
            </div>
          </div>
        </div>
      </section>

      {/* 6. AARTI & CHALISA COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chalisas */}
          <div className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-gold/15 mb-4">
              <div>
                <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
                  पावन पाठ
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                  श्री चालीसा संग्रह
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
              {CHALISAS.map((chalisa) => (
                <Link
                  key={chalisa.id}
                  href={`/chalisa/${chalisa.slug}`}
                  className="p-4 rounded-xl bg-ivory border border-gold/15 hover:border-gold hover:shadow-xs transition-all flex items-center justify-between block group"
                >
                  <div>
                    <h4 className="font-serif font-bold text-charcoal group-hover:text-maroon text-base">
                      {chalisa.title}
                    </h4>
                    <p className="text-xs text-stone line-clamp-1 mt-0.5">
                      {chalisa.significance}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone group-hover:text-saffron transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>

          {/* Aartis */}
          <div className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-gold/15 mb-4">
              <div>
                <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
                  दैनिक उपासना
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                  आरती संग्रह
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
              {AARTIS.map((aarti) => (
                <Link
                  key={aarti.id}
                  href={`/aarti/${aarti.slug}`}
                  className="p-4 rounded-xl bg-ivory border border-gold/15 hover:border-gold hover:shadow-xs transition-all flex items-center justify-between block group"
                >
                  <div>
                    <h4 className="font-serif font-bold text-charcoal group-hover:text-maroon text-base">
                      {aarti.title}
                    </h4>
                    <p className="text-xs text-stone line-clamp-1 mt-0.5">
                      {aarti.significance}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone group-hover:text-saffron transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SACRED SCRIPTURES (सनातन ग्रंथालय) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-maroon via-maroon/95 to-maroon text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-saffron/30 text-saffron-light text-xs font-semibold uppercase tracking-wider border border-saffron/40">
                {brandConfig.nameHi} — धर्मग्रंथ पुस्तकालय
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                श्रीमद्भगवद्गीता, रामायण एवं 18 महापुराण
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                मूल संस्कृत श्लोक, पदच्छेद, शब्दार्थ एवं प्रामाणिक हिंदी व्याख्या के साथ अपनी प्राचीन आध्यात्मिक धरोहर का अध्ययन करें।
              </p>

              {/* Sample Gita Verse */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-gold/30">
                <p className="font-serif text-saffron-light text-base sm:text-lg font-bold leading-relaxed">
                  कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
                </p>
                <p className="text-xs sm:text-sm text-white/90 mt-2">
                  — गीता अध्याय 2, श्लोक 47 (निष्काम कर्मयोग का दिव्य उपदेश)
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/granth"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-saffron hover:bg-saffron-light text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
                >
                  <span>संपूर्ण ग्रंथालय देखें</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Scripture Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-2xl p-4 text-center">
                <BookOpen className="w-8 h-8 text-saffron-light mx-auto mb-2" />
                <h4 className="font-serif font-bold text-base">श्रीमद्भगवद्गीता</h4>
                <p className="text-[11px] text-white/70 mt-1">18 अध्याय · 700 श्लोक</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-2xl p-4 text-center">
                <BookOpen className="w-8 h-8 text-saffron-light mx-auto mb-2" />
                <h4 className="font-serif font-bold text-base">रामचरितमानस</h4>
                <p className="text-[11px] text-white/70 mt-1">7 काण्ड · गोस्वामी तुलसीदास</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-2xl p-4 text-center">
                <BookOpen className="w-8 h-8 text-saffron-light mx-auto mb-2" />
                <h4 className="font-serif font-bold text-base">18 महापुराण</h4>
                <p className="text-[11px] text-white/70 mt-1">शिव, विष्णु, भागवत पुराण</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-2xl p-4 text-center">
                <BookOpen className="w-8 h-8 text-saffron-light mx-auto mb-2" />
                <h4 className="font-serif font-bold text-base">4 वेद व उपनिषद्</h4>
                <p className="text-[11px] text-white/70 mt-1">सनातन ज्ञान की आधारशिला</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TEMPLE & PILGRIMAGE DIRECTORY (तीर्थ दर्शन) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-gold/15">
          <div>
            <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
              पावन तीर्थ यात्रा
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              प्रमुख मंदिर एवं ज्योतिर्लिंग दर्शन
            </h2>
          </div>
          <Link
            href="/mandir"
            className="text-saffron hover:text-saffron-dark text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            सभी मंदिर देखें <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLES.map((temple) => (
            <div
              key={temple.id}
              className="bg-cream border border-gold/25 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-saffron font-medium mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{temple.location}, {temple.state}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-maroon mb-1">
                  {temple.name}
                </h3>
                <span className="inline-block px-2 py-0.5 rounded-full bg-saffron/10 text-saffron-dark text-[10px] font-medium mb-3">
                  {temple.deity}
                </span>
                <p className="text-xs text-stone leading-relaxed line-clamp-3">
                  {temple.significance}
                </p>
              </div>

              <div className="p-4 bg-ivory border-t border-gold/10 flex items-center justify-between text-xs">
                <span className="text-stone">दर्शन: प्रात: 5 बजे से</span>
                <Link
                  href={`/mandir/${temple.slug}`}
                  className="text-saffron font-semibold hover:underline"
                >
                  पूरी जानकारी →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. UPCOMING FESTIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-gold/15">
          <div>
            <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
              त्योहार व व्रत
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              आगामी प्रमुख सनातन पर्व
            </h2>
          </div>
          <Link
            href="/festivals"
            className="text-saffron hover:text-saffron-dark text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            त्योहार कैलेंडर 2026 देखें <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FESTIVALS.map((fest) => (
            <div
              key={fest.id}
              className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif text-xl font-bold text-maroon">
                  {fest.name}
                </h3>
                <span className="px-2.5 py-1 rounded-lg bg-saffron/15 text-saffron-dark font-medium text-xs">
                  {fest.date2026}
                </span>
              </div>
              <p className="text-xs text-saffron font-medium mb-3">
                तिथि: {fest.tithi}
              </p>
              <p className="text-xs text-stone leading-relaxed mb-4 line-clamp-3">
                {fest.significance}
              </p>
              <div className="pt-3 border-t border-gold/10 flex justify-between items-center text-xs">
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

      {/* 10. SPIRITUAL TOOLS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-gold/15">
          <div>
            <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
              दैनिक साधन
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              {brandConfig.nameHi} डिजिटल साधन
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-saffron hover:text-saffron-dark text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            सभी साधन देखें <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="bg-cream border border-gold/20 rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-gold transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center shrink-0 group-hover:bg-saffron group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-stone uppercase tracking-wide block">
                  {tool.category}
                </span>
                <h4 className="font-serif font-bold text-base text-charcoal group-hover:text-maroon mt-0.5">
                  {tool.name}
                </h4>
                <p className="text-xs text-stone leading-relaxed mt-1 line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 11. RASHIFAL STRIP (दैनिक राशिफल) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gold/15 mb-6">
            <div>
              <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
                वैदिक ज्योतिष
              </span>
              <h3 className="font-serif text-2xl font-bold text-maroon">
                आज का दैनिक राशिफल (12 राशियां)
              </h3>
            </div>
            <p className="text-xs text-stone mt-1 sm:mt-0">
              पारंपरिक ग्रह स्थिति व वैदिक मार्गदर्शन
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {RASHIS.map((rashi) => (
              <Link
                key={rashi.id}
                href={`/rashifal/${rashi.id}`}
                className="p-3 rounded-xl bg-ivory border border-gold/15 hover:border-saffron hover:shadow-xs transition-all text-center group"
              >
                <span className="text-2xl block mb-1">{rashi.symbol}</span>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-charcoal group-hover:text-maroon">
                  {rashi.name.split(" ")[0]}
                </h4>
                <span className="text-[10px] text-stone block">स्वामी: {rashi.lord}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11.5 DAILY EXPERIENCES & STATUS STUDIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Darshan Card */}
          <Link
            href="/daily-darshan"
            className="group bg-gradient-to-br from-cream to-ivory border border-gold/30 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:border-gold transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider inline-block">
                प्रातः मंगल दर्शन
              </span>
              <h3 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron transition-colors">
                आज का दिव्य दर्शन
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

          {/* Today's Shloka Card */}
          <Link
            href="/daily-shloka"
            className="group bg-gradient-to-br from-cream to-ivory border border-gold/30 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:border-gold transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider inline-block">
                दैनिक स्वाध्याय
              </span>
              <h3 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron transition-colors">
                आज का पावन गीता श्लोक
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

          {/* Bhakti Status Studio Card */}
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
                व्हाट्सएप और इंस्टाग्राम के लिए सुंदर HD श्लोक व भक्ति कार्ड बनाएं और शेयर करें।
              </p>
            </div>
            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-saffron-light mt-4">
              <span>स्टेटस बनाएं</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 11.6 KNOWLEDGE, ENCYCLOPEDIA & ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/encyclopedia"
            className="group bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 hover:shadow-card hover:border-gold/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-xs font-semibold text-saffron uppercase tracking-wider">सनातन ज्ञानकोश</span>
              <h3 className="font-serif text-2xl font-bold text-maroon group-hover:text-saffron transition-colors">
                सनातन धर्म विश्वकोश
              </h3>
              <p className="text-stone text-xs sm:text-sm leading-relaxed">
                12 ज्योतिर्लिंग, 51 शक्तिपीठ, चार वेद, अठारह पुराण, सप्त मोक्षदायिनी पुरियां और सनातन दर्शन का सम्पूर्ण प्रामाणिक संदर्भ।
              </p>
            </div>
            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron mt-4">
              <span>विश्वकोश में खोजें</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/articles"
            className="group bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 hover:shadow-card hover:border-gold/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-xs font-semibold text-saffron uppercase tracking-wider">शोध एवं विमर्श</span>
              <h3 className="font-serif text-2xl font-bold text-maroon group-hover:text-saffron transition-colors">
                आध्यात्मिक आलेख एवं चिंतन
              </h3>
              <p className="text-stone text-xs sm:text-sm leading-relaxed">
                ज्योतिर्लिंगों का पौराणिक रहस्य, श्रीमद्भगवद्गीता का निष्काम कर्मयोग और भारतीय संस्कृति पर विद्वानों द्वारा लिखित शोध आलेख।
              </p>
            </div>
            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron mt-4">
              <span>आलेख पढ़ें</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 12. BHAVLAYA MOBILE APP PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-saffron/15 via-gold/10 to-ivory border border-gold/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/20 text-saffron-dark text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                {brandConfig.name} Mobile Experience
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon leading-tight">
                {brandConfig.nameHi} ऐप — {brandConfig.tagline}
              </h2>
              <p className="text-stone text-sm sm:text-base leading-relaxed">
                दैनिक पंचांग सूचनाएं, लाइव दर्शन, ऑडियो भजन, 108 जप माला साधना और पवित्र धर्मग्रंथों के साथ अपनी आध्यात्मिक यात्रा को निरंतर बनाए रखें।
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-charcoal text-white text-sm font-medium rounded-xl shadow-sm">
                  <Smartphone className="w-5 h-5 text-saffron" />
                  <div className="text-left">
                    <span className="text-[10px] block opacity-80 leading-none">शीघ्र उपलब्ध</span>
                    <span className="font-bold text-xs sm:text-sm leading-tight">{brandConfig.appDisplayName}</span>
                  </div>
                </div>
                <span className="text-xs text-stone italic">
                  Android एवं iOS के लिए समर्पित मोबाइल आर्किटेक्चर तैयार
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-64 rounded-2xl bg-white shadow-xl border-4 border-gold/20 p-4 flex flex-col items-center justify-between text-center rotate-2 hover:rotate-0 transition-transform">
                <div className="w-12 h-12 rounded-full bg-saffron-gradient text-white font-serif text-xl font-bold flex items-center justify-center">
                  भा
                </div>
                <div>
                  <span className="font-serif font-bold text-maroon block">{brandConfig.nameHi}</span>
                  <span className="text-[10px] text-stone">{brandConfig.tagline}</span>
                </div>
                <div className="text-xs text-saffron font-semibold bg-amber-50 px-3 py-1.5 rounded-lg w-full">
                  {brandConfig.companyCredit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
