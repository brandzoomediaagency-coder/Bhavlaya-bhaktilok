import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CHALISAS } from "@/data/devotionalData";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata = {
  title: "चालीसा संग्रह (Chalisa Sangrah) · श्री हनुमान, शिव, दुर्गा व गणेश चालीसा",
  description: "सम्पूर्ण हनुमान चालीसा, शिव चालीसा, दुर्गा चालीसा आदि 40 चौपाइयों का शुद्ध पाठ, दोहे, चौपाई व्याख्या एवं पारंपरिक पाठ विधि।",
};

export default function ChalisaListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "चालीसा संग्रह" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>पावन चालीस पद</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन चालीसा संग्रह
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          भक्तों के संकट निवारण एवं मनोकामना पूर्ति हेतु 40 चौपाइयों का दिव्य स्तोत्र। शुद्ध पाठ, दोहे व सरल हिंदी व्याख्या।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHALISAS.map((chalisa) => (
          <article
            key={chalisa.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-saffron font-medium block mb-2">
                इष्टदेव: {chalisa.deity}
              </span>
              <h2 className="font-serif text-2xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-2">
                <Link href={`/chalisa/${chalisa.slug}`}>
                  {chalisa.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-stone leading-relaxed mb-4">
                {chalisa.significance}
              </p>
              <div className="bg-ivory rounded-xl p-4 border border-gold/15 text-xs text-stone italic">
                {chalisa.verses[0]?.text}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gold/15 flex items-center justify-between">
              <span className="text-xs text-stone">{chalisa.verses.length} पद सम्मिलित</span>
              <Link
                href={`/chalisa/${chalisa.slug}`}
                className="px-4 py-2 rounded-xl bg-maroon hover:bg-maroon-light text-white text-xs font-medium transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span>सम्पूर्ण पाठ व अर्थ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
