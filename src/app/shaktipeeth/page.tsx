import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: `51 पावन शक्तिपीठ दर्शन व विवरण (51 Shakti Peethas) | ${brandConfig.nameHi}`,
  description: `माता सती के 51 शक्तिपीठों की सूची, पावन स्थान, भैरव स्वरूप, धार्मिक महत्त्व एवं दर्शन मार्गदर्शिका ${brandConfig.nameHi} पर।`,
};

const SHAKTIPEETHS = [
  { name: "कामाख्या शक्तिपीठ", state: "असम (गुवाहाटी)", bodyPart: "योनि मण्डल", bhairav: "उमानन्द", desc: "नीलांचल पर्वत पर स्थित सर्वोच्च तंत्र व शक्ति साधना केंद्र।" },
  { name: "कालीघाट शक्तिपीठ", state: "पश्चिम बंगाल (कोलकाता)", bodyPart: "दाएं पैर का अंगूठा", bhairav: "नकुलेश", desc: "माँ काली का परम सिद्ध जाग्रत पीठ।" },
  { name: "ज्वालामुखी शक्तिपीठ", state: "हिमाचल प्रदेश (कांगड़ा)", bodyPart: "जिह्वा (जीभ)", bhairav: "उन्मत्त", desc: "अनादि काल से प्रज्वलित नौ दिव्य प्राकृतिक ज्वालाएं।" },
  { name: "विशालाक्षी शक्तिपीठ", state: "उत्तर प्रदेश (वाराणसी)", bodyPart: "कर्ण कुण्डल", bhairav: "कालभैरव", desc: "काशी के मणिकर्णिका घाट के निकट पावन शक्ति पीठ।" },
  { name: "नैना देवी शक्तिपीठ", state: "हिमाचल प्रदेश (बिलासपुर)", bodyPart: "नेत्र", bhairav: "कपाल", desc: "शिवालिक पहाड़ियों पर स्थित माँ भगवती का पावन नेत्र धाम।" },
  { name: "अम्बाजी शक्तिपीठ", state: "गुजरात (बनासकांठा)", bodyPart: "हृदय", bhairav: "बटुक", desc: "गब्बर पर्वत पर स्थित जाग्रत श्रीयंत्र पीठ।" },
];

export default function ShaktiPeethPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "51 शक्तिपीठ" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-saffron" />
          <span>आद्यशक्ति धाम</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          51 पावन शक्तिपीठ निर्देशिका
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          दक्ष यज्ञ के उपरांत माता सती के पावन अंगों के गिरने से पवित्र हुए भारत भूमि के 51 परम जाग्रत शक्ति धाम एवं उनके संरक्षक भैरव।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHAKTIPEETHS.map((sp, idx) => (
          <div
            key={idx}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-xs space-y-3"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark font-medium">
                {sp.state}
              </span>
              <span className="text-stone">भैरव: {sp.bhairav}</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-maroon">
              {sp.name}
            </h3>

            <p className="text-xs text-stone leading-relaxed">
              {sp.desc}
            </p>

            <div className="pt-3 border-t border-gold/15 text-xs text-charcoal">
              <span>पतित अंग: <strong className="text-saffron-dark">{sp.bodyPart}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
