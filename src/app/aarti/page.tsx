import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AARTIS } from "@/data/devotionalData";
import { Flame, ArrowRight } from "lucide-react";

export const metadata = {
  title: "आरती संग्रह (Aarti Sangrah) · देवी-देवता दैनिक पूजा एवं संध्या आरती",
  description: "ॐ जय जगदीश हरे, जय गणेश देवा, ॐ जय शिव ओंकारा सहित सभी प्रमुख देवी-देवताओं की दैनिक प्रातः व संध्या आरती के शुद्ध बोल व भावार्थ।",
};

export default function AartiListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "आरती संग्रह" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Flame className="w-3.5 h-3.5 text-saffron" />
          <span>पावन दीप वंदन</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन आरती संग्रह
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          दैनिक प्रातः एवं सायं पूजा, उत्सव और पर्वों के लिए सभी देवी-देवताओं की प्रामाणिक आरतियां।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AARTIS.map((aarti) => (
          <article
            key={aarti.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-saffron font-medium block mb-2">
                इष्टदेव: {aarti.deity}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-2">
                <Link href={`/aarti/${aarti.slug}`}>
                  {aarti.title}
                </Link>
              </h2>
              <p className="text-xs text-stone mb-4 line-clamp-2">
                {aarti.significance}
              </p>
              <div className="bg-ivory rounded-xl p-4 border border-gold/15 text-xs text-stone font-devanagari whitespace-pre-line line-clamp-4 leading-relaxed">
                {aarti.lyrics}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gold/15 flex items-center justify-between">
              <span className="text-xs text-stone">दैनिक पूजा विधि</span>
              <Link
                href={`/aarti/${aarti.slug}`}
                className="px-4 py-2 rounded-xl bg-maroon hover:bg-maroon-light text-white text-xs font-medium transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span>सम्पूर्ण आरती</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
