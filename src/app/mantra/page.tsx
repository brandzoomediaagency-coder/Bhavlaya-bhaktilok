import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MANTRAS } from "@/data/devotionalData";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "सिद्ध मंत्र साधना (Sacred Vedic Mantras) · शुद्ध संस्कृत श्लोक व भावार्थ",
  description: "गायत्री मंत्र, महामृत्युंजय मंत्र, शिव पंचाक्षरी, हरे कृष्ण महामंत्र आदि वैदिक व पौराणिक मंत्रों का शुद्ध उच्चारण, पदच्छेद, शब्दार्थ व जप विधि।",
};

export default function MantraListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "सिद्ध मंत्र साधना" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>वैदिक एवं पौराणिक मंत्र</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन सिद्ध मंत्र संग्रह
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          वेद, उपनिषद् एवं पुराणों से संकलित महामंत्र। शुद्ध संस्कृत पाठ, हिंदी व अंग्रेजी लिप्यंतरण, शब्दार्थ एवं शास्त्रीय जप विधि।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MANTRAS.map((mantra) => (
          <article
            key={mantra.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-saffron font-medium mb-3">
                <span>{mantra.deity}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark text-[10px]">
                  {mantra.scriptureSource}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-3">
                <Link href={`/mantra/${mantra.slug}`}>
                  {mantra.title}
                </Link>
              </h2>
              <div className="p-4 bg-amber-50/70 rounded-xl border border-gold/20 mb-4 text-center">
                <p className="font-serif text-maroon text-base sm:text-lg font-bold leading-relaxed text-sanskrit">
                  {mantra.sanskritText}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-stone line-clamp-2 leading-relaxed">
                {mantra.meaning}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gold/15 flex items-center justify-between text-xs">
              <span className="text-stone font-medium">अनुशंसित: {mantra.count} बार जप</span>
              <Link
                href={`/mantra/${mantra.slug}`}
                className="px-4 py-2 rounded-xl bg-maroon hover:bg-maroon-light text-white font-medium transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span>शब्दार्थ व जप साधना</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
