import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SCRIPTURES } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: `सनातन धर्मग्रंथ पुस्तकालय (Hindu Scriptures Library) | ${brandConfig.nameHi}`,
  description: `श्रीमद्भगवद्गीता, रामायण, रामचरितमानस, 4 वेद, 108 उपनिषद् एवं 18 महापुराणों का शुद्ध संस्कृत पाठ, अध्याय, श्लोक व प्रामाणिक हिंदी अनुवाद ${brandConfig.nameHi} पर।`,
};

export default function GranthListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "सनातन ग्रंथालय" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-saffron" />
          <span>अनादि ज्ञान संपदा</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन धर्मग्रंथ एवं शास्त्र पुस्तकालय
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          श्रीमद्भगवद्गीता, रामायण, 4 वेद, उपनिषद् एवं 18 महापुराण। अध्याय-वार नेविगेशन, मूल संस्कृत श्लोक, पदच्छेद व हिंदी अनुवाद।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SCRIPTURES.map((sc) => (
          <article
            key={sc.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-center text-xs text-saffron font-medium mb-2">
                <span>{sc.category}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark text-[10px]">
                  {sc.chaptersCount} अध्याय · {sc.versesCount} श्लोक
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-2">
                <Link href={`/granth/${sc.slug}`}>
                  {sc.title}
                </Link>
              </h2>
              <span className="text-xs text-stone-dark block mb-3 font-medium">
                रचयिता / उपदेशक: {sc.author}
              </span>
              <p className="text-xs sm:text-sm text-stone leading-relaxed mb-4">
                {sc.description}
              </p>

              {/* Sample Verse Preview */}
              {sc.famousVerses[0] && (
                <div className="p-4 bg-amber-50/60 rounded-xl border border-gold/20 mb-4 text-xs">
                  <span className="font-bold text-saffron block mb-1">
                    {sc.famousVerses[0].verse}
                  </span>
                  <p className="font-serif text-maroon text-sm font-bold text-sanskrit mb-1">
                    {sc.famousVerses[0].sanskrit}
                  </p>
                  <p className="text-stone italic">
                    {sc.famousVerses[0].hindi}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs">
              <span className="text-stone">अध्याय व श्लोक वार अध्ययन</span>
              <Link
                href={`/granth/${sc.slug}`}
                className="px-4 py-2 rounded-xl bg-maroon hover:bg-maroon-light text-white font-medium transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span>ग्रंथ में प्रवेश करें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
