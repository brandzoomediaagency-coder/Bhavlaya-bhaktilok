import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TEMPLES } from "@/data/devotionalData";
import { MapPin, ArrowRight, Compass } from "lucide-react";

export const metadata = {
  title: "तीर्थ एवं मंदिर दर्शन (Mandir Directory) · 12 ज्योतिर्लिंग, शक्तिपीठ व चार धाम",
  description: "काशी विश्वनाथ, सोमनाथ, केदारनाथ, महाकालेश्वर सहित भारत के 12 ज्योतिर्लिंग, 51 शक्तिपीठ, चार धाम एवं प्रमुख मंदिरों का इतिहास, दर्शन समय व पहुँचने का मार्ग।",
};

export default function MandirListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "तीर्थ एवं मंदिर दर्शन" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5 text-saffron" />
          <span>पावन देवभूमि तीर्थ</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन मंदिर एवं तीर्थ निर्देशिका
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          12 ज्योतिर्लिंग, 51 शक्तिपीठ, चार धाम एवं भारतवर्ष के ऐतिहासिक पवित्र मंदिरों की प्रामाणिक जानकारी, दर्शन समय, आरती समय और यात्रा मार्ग।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLES.map((temple) => (
          <article
            key={temple.id}
            className="bg-cream border border-gold/25 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-saffron font-medium mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {temple.location}, {temple.state}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark text-[10px]">
                  {temple.type === "jyotirlinga" ? "द्वादश ज्योतिर्लिंग" : "प्रमुख तीर्थ"}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-2">
                <Link href={`/mandir/${temple.slug}`}>
                  {temple.name}
                </Link>
              </h2>
              <span className="text-xs text-stone-dark font-medium block mb-3">
                इष्टदेव: {temple.deity}
              </span>
              <p className="text-xs sm:text-sm text-stone line-clamp-3 leading-relaxed mb-4">
                {temple.significance}
              </p>
            </div>

            <div className="p-4 bg-ivory border-t border-gold/15 flex items-center justify-between text-xs">
              <span className="text-stone">दर्शन: प्रात: से सायं</span>
              <Link
                href={`/mandir/${temple.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-maroon hover:bg-maroon-light text-white font-medium transition-colors inline-flex items-center gap-1 shadow-2xs"
              >
                <span>दर्शन व यात्रा मार्ग</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
