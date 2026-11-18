import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TEMPLES } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { MapPin, Sparkles, ArrowRight, Compass } from "lucide-react";

export const metadata = {
  title: `द्वादश ज्योतिर्लिंग दर्शन व संपूर्ण यात्रा मार्गदर्शिका (12 Jyotirlingas) | ${brandConfig.nameHi}`,
  description: `भारत के 12 पावन ज्योतिर्लिंगों के दर्शन समय, मंगला व शयन आरती समय, इतिहास, धार्मिक महत्त्व एवं पहुँचने का सम्पूर्ण मार्ग ${brandConfig.nameHi} पर।`,
};

export default function JyotirlingaPage() {
  const jyotirlingas = TEMPLES.filter((t) => t.type === "jyotirlinga");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "द्वादश ज्योतिर्लिंग" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-saffron" />
          <span>स्वयंभू शिव धाम</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          पावन द्वादश ज्योतिर्लिंग दर्शन
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          सौराष्ट्र के सोमनाथ से लेकर हिमालय के केदारनाथ तक—भगवान शिव के 12 स्वयंभू प्रकाशमय ज्योतिर्लिंग तीर्थों का सम्पूर्ण आध्यात्मिक व यात्रा परिचय।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jyotirlingas.map((temple) => (
          <Link
            key={temple.id}
            href={`/mandir/${temple.slug}`}
            className="group bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 hover:shadow-card hover:border-gold/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark font-medium">
                  {temple.state}
                </span>
                <span className="text-stone flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-saffron" />
                  {temple.location}
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-maroon group-hover:text-saffron transition-colors">
                {temple.name}
              </h2>

              <p className="text-stone text-sm leading-relaxed line-clamp-3">
                {temple.significance}
              </p>

              <div className="pt-2 grid grid-cols-2 gap-2 text-xs bg-ivory p-3 rounded-xl border border-gold/15">
                <div>
                  <span className="text-stone-light block">दर्शन समय:</span>
                  <span className="font-semibold text-charcoal">{temple.darshanTimings.split(" ")[0]}...</span>
                </div>
                <div>
                  <span className="text-stone-light block">आरती समय:</span>
                  <span className="font-semibold text-charcoal">{temple.aartiTimings.split(" ")[0]}...</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron mt-4">
              <span>सम्पूर्ण यात्रा व आरती विवरण</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
