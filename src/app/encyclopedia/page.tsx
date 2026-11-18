import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ENCYCLOPEDIA_ENTRIES } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { BookOpen, Sparkles, ArrowRight, Library, Compass } from "lucide-react";

export const metadata = {
  title: `सनातन धर्म विश्वकोश (Sanatan Dharma Encyclopedia) | ${brandConfig.nameHi}`,
  description: `सनातन धर्म, वेद, पुराण, उपनिषद्, 12 ज्योतिर्लिंग, 51 शक्तिपीठ, चार युग, सप्त मोक्षदायिनी पुरी एवं देव परंपराओं का सम्पूर्ण विश्वकोश।`,
};

const CATEGORIES = [
  "तीर्थ एवं मंदिर",
  "धर्मग्रंथ एवं दर्शन",
  "वैदिक कालगणना",
  "देवी-देवता स्वरूप",
  "वैदिक कर्मकांड एवं संस्कार",
  "ऋषि एवं मुनि परंपरा",
  "सनातन प्रतीक व विज्ञान",
];

const HINDI_ALPHABET = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ",
  "क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ", "ड",
  "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह",
];

export default function EncyclopediaListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "सनातन धर्म विश्वकोश" }]} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-12 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Library className="w-3.5 h-3.5 text-saffron" />
          <span>अनादि ज्ञान संपदा</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन धर्म ज्ञान विश्वकोश
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          वेदों, उपनिषदों, 18 महापुराणों, 12 ज्योतिर्लिंगों, 51 शक्तिपीठों और सनातन मान्यताओं का प्रामाणिक संदर्भ ज्ञानकोश।
        </p>

        {/* A-Z Devanagari Quick Jump Bar */}
        <div className="mt-8 pt-6 border-t border-gold/20 flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto">
          {HINDI_ALPHABET.map((char) => (
            <span
              key={char}
              className="w-7 h-7 rounded-lg bg-ivory border border-gold/20 text-maroon text-xs font-bold flex items-center justify-center hover:bg-saffron hover:text-white cursor-pointer transition-colors"
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Categories Grid */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-maroon border-b border-gold/20 pb-3 flex items-center gap-2">
          <Compass className="w-5 h-5 text-saffron" />
          <span>प्रमुख ज्ञान श्रेणियां</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-4 bg-cream rounded-2xl border border-gold/25 hover:border-gold/60 text-center transition-all cursor-pointer group"
            >
              <h3 className="font-serif text-sm sm:text-base font-bold text-maroon group-hover:text-saffron transition-colors">
                {cat}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Encyclopedia Topics */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-maroon border-b border-gold/20 pb-3">
          सम्पूर्ण विश्वकोश विषय (Encyclopedic Topics)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENCYCLOPEDIA_ENTRIES.map((entry) => (
            <Link
              key={entry.id}
              href={`/encyclopedia/${entry.slug}`}
              className="group bg-cream border border-gold/25 rounded-2xl p-6 hover:shadow-card hover:border-gold/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold inline-block">
                  {entry.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-maroon group-hover:text-saffron transition-colors">
                  {entry.title}
                </h3>
                <p className="text-stone text-xs sm:text-sm leading-relaxed">
                  {entry.summary}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  {Object.entries(entry.keyAttributes).map(([k, v], i) => (
                    <span key={i} className="bg-ivory px-2.5 py-1 rounded-md border border-gold/15 text-stone text-[11px]">
                      <strong>{k}:</strong> {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron mt-4">
                <span>विस्तार से अध्ययन करें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
