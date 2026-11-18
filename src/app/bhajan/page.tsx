import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BHAJANS } from "@/data/devotionalData";
import { deities } from "@/config/site";
import { Music, ArrowRight, Sparkles, Filter } from "lucide-react";

export const metadata = {
  title: "भजन संग्रह (Bhajan Collection) · सम्पूर्ण देवी-देवता भजन लिरिक्स व भावार्थ",
  description: "श्री कृष्ण, राम, शिव, हनुमान, दुर्गा व खाटू श्याम जी के प्रसिद्ध व पारंपरिक भजनों का विशाल संग्रह। शुद्ध लिरिक्स, भावार्थ व ऑडियो सहित।",
};

export default function BhajanListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "भजन संग्रह" }]} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Music className="w-3.5 h-3.5" />
          <span>भक्ति रसामृत</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सम्पूर्ण सनातन भजन संग्रह
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          भगवान श्री कृष्ण, राम, शिव, हनुमान और समस्त देवी-देवताओं के पावन एवं लोकप्रिय भजनों के शुद्ध बोल व हिंदी भावार्थ।
        </p>
      </div>

      {/* Deity Quick Filters */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-stone uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-saffron" />
          <span>देवी-देवता अनुसार भजन खोजें:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/bhajan"
            className="px-4 py-2 rounded-xl bg-saffron text-white text-xs font-medium shadow-xs"
          >
            सभी भजन
          </Link>
          {deities.slice(0, 8).map((d) => (
            <Link
              key={d.id}
              href={`/bhajan?deity=${d.id}`}
              className="px-4 py-2 rounded-xl bg-cream border border-gold/25 hover:border-saffron text-charcoal text-xs font-medium transition-colors"
            >
              {d.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Bhajan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BHAJANS.map((bhajan) => (
          <article
            key={bhajan.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-saffron font-medium mb-2">
                <span>{bhajan.category}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark text-[10px]">
                  {bhajan.deity}
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-3">
                <Link href={`/bhajan/${bhajan.slug}`}>
                  {bhajan.title}
                </Link>
              </h2>
              <div className="p-4 bg-ivory rounded-xl border border-gold/15 mb-4 font-devanagari text-xs text-stone line-clamp-4 leading-relaxed whitespace-pre-line">
                {bhajan.lyrics}
              </div>
            </div>

            <div className="pt-4 border-t border-gold/15 flex items-center justify-between">
              <span className="text-xs text-stone truncate max-w-[150px]">
                {bhajan.singer}
              </span>
              <Link
                href={`/bhajan/${bhajan.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-maroon hover:bg-maroon-light text-white text-xs font-medium transition-colors inline-flex items-center gap-1 shadow-2xs"
              >
                <span>सम्पूर्ण लिरिक्स</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Editorial Guidance & FAQs */}
      <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-gold/25 space-y-4">
        <h3 className="font-serif text-xl font-bold text-maroon">
          भजन गायन और संकीर्तन का आध्यात्मिक महत्त्व
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          सनातन धर्म में कलिकाल में संकीर्तन और भजन को भगवत्प्राप्ति का सबसे सरल और सहज मार्ग बताया गया है। जब कोई भक्त प्रभु के पावन गुणों का गान करता है, तो उसका मन सांसारिक चिंताओं से मुक्त होकर परमात्मा के चरणों में एकाग्र हो जाता है।
        </p>
      </div>
    </div>
  );
}
