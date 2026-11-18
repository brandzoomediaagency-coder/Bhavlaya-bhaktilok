import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RASHIS } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { Compass, Sparkles, ArrowRight, ShieldAlert } from "lucide-react";

export const metadata = {
  title: `दैनिक राशिफल (Daily Vedic Rashifal) · 12 राशियों का आज का भाग्यफल | ${brandConfig.nameHi}`,
  description: `मेष, वृषभ, मिथुन, कर्क, सिंह, कन्या, तुला, वृश्चिक, धनु, मकर, कुंभ, मीन का आज का वैदिक राशिफल, शुभ अंक, शुभ रंग व आराधना मंत्र ${brandConfig.nameHi} पर।`,
};

export default function RashifalListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "वैदिक राशिफल" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-saffron" />
          <span>वैदिक ज्योतिष मार्गदर्शन</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          दैनिक वैदिक राशिफल (12 राशियां)
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          ग्रह-नक्षत्रों के पारंपरिक गोचर के आधार पर दैनिक मार्गदर्शन, शुभ अंक, शुभ रंग और राशि स्वामी का इष्ट मंत्र।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {RASHIS.map((r) => (
          <article
            key={r.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-3xl">{r.symbol}</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark font-medium">
                  तत्त्व: {r.element}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-1">
                <Link href={`/rashifal/${r.id}`}>
                  {r.name}
                </Link>
              </h2>
              <span className="text-xs text-stone block mb-3">
                स्वामी ग्रह: <strong>{r.lord}</strong>
              </span>

              <div className="p-3 bg-ivory rounded-xl border border-gold/15 text-xs text-stone space-y-1.5">
                <p>शुभ अंक: <strong className="text-charcoal">{r.luckyNum}</strong></p>
                <p>शुभ रंग: <strong className="text-charcoal">{r.luckyColor}</strong></p>
                <p className="font-serif text-saffron font-bold text-[11px] pt-1 border-t border-gold/10">
                  {r.mantra}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gold/15">
              <Link
                href={`/rashifal/${r.id}`}
                className="w-full py-2 rounded-xl bg-maroon hover:bg-maroon-light text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>विस्तृत राशिफल देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Astrology Responsible Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>ज्योतिषीय अस्वीकरण:</strong> ज्योतिष शास्त्र पारंपरिक वैदिक मान्यताओं एवं संभावनाओं पर आधारित है। इसे जीवन में सकारात्मक प्रेरणा के रूप में लें। {brandConfig.nameHi} का राशिफल किसी भी रूप में चिकित्सा, कानूनी या वित्तीय परामर्श नहीं है।
        </p>
      </div>
    </div>
  );
}
