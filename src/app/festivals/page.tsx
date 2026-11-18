import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FESTIVALS } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: `हिंदू त्योहार एवं व्रत कैलेंडर (Hindu Festivals & Vrat 2026) | ${brandConfig.nameHi}`,
  description: `महाशिवरात्रि, होली, नवरात्रि, रामनवमी, जन्माष्टमी, गणेश चतुर्थी, दीपावली, एकादशी, पूर्णिमा एवं प्रदोष व्रत की तिथियां, पूजा विधि, शुभ मुहूर्त व कथा ${brandConfig.nameHi} पर।`,
};

export default function FestivalListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "त्योहार एवं व्रत कैलेंडर 2026" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Calendar className="w-3.5 h-3.5 text-saffron" />
          <span>सनातन पावन पर्व</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन त्योहार एवं व्रत कैलेंडर 2026
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          वर्ष 2026 के सभी प्रमुख पर्वों की सटीक तिथियां, शास्त्रीय पूजा विधि, आवश्यक पूजन सामग्री, मंत्र एवं पौराणिक व्रत कथाएं।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FESTIVALS.map((fest) => (
          <article
            key={fest.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-saffron/15 text-saffron-dark font-medium text-xs">
                  {fest.date2026}
                </span>
                <span className="text-[11px] text-stone">संवत 2082-83</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-2">
                <Link href={`/festivals/${fest.slug}`}>
                  {fest.name}
                </Link>
              </h2>
              <span className="text-xs text-saffron font-medium block mb-3">
                तिथि: {fest.tithi}
              </span>
              <p className="text-xs sm:text-sm text-stone line-clamp-3 leading-relaxed mb-4">
                {fest.significance}
              </p>
            </div>

            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs">
              <span className="text-stone">पूजा विधि व सामग्री</span>
              <Link
                href={`/festivals/${fest.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-maroon hover:bg-maroon-light text-white font-medium transition-colors inline-flex items-center gap-1 shadow-2xs"
              >
                <span>पूजा विधि व मुहूर्त</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
