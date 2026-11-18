import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";

export const metadata = {
  title: `नियम एवं शर्तें (Terms & Conditions) | ${brandConfig.nameHi}`,
  description: `${brandConfig.nameHi} वेबसाइट के उपयोग के नियम, शर्तें एवं कॉपीराइट दिशा-निर्देश।`,
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "नियम एवं शर्तें" }]} />

      <div className="border-b border-gold/20 pb-6 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
          नियम एवं शर्तें (Terms & Conditions)
        </h1>
        <p className="text-stone text-xs sm:text-sm">
          अंतिम अद्यतन: वर्ष 2026 · {brandConfig.nameHi} ({brandConfig.name})
        </p>
      </div>

      <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-6 text-charcoal text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">1. सेवा की स्वीकृति</h2>
          <p className="text-stone">
            {brandConfig.nameHi} ({brandConfig.proposedDomain}) का उपयोग करके आप इन नियमों एवं शर्तों से बंधे होने की सहमति देते हैं। यदि आप इनसे सहमत नहीं हैं, तो कृपया वेबसाइट का उपयोग न करें।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">2. बौद्धिक संपदा एवं कॉपीराइट</h2>
          <p className="text-stone">
            प्राचीन वैदिक एवं सनातन धर्मग्रंथ सार्वभौमिक व सार्वजनिक धरोहर (Public Domain) हैं। हालांकि, {brandConfig.nameHi} पर प्रस्तुत मूल व्याख्याएं, लेख, डिज़ाइन सिस्टम, सॉफ्टवेयर कोड एवं डिजिटल उपकरण {brandConfig.nameHi} एवं {brandConfig.companyName} की बौद्धिक संपदा हैं। इनका व्यावसायिक अनधिकृत प्रतिरूपण वर्जित है।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">3. व्यक्तिगत एवं गैर-व्यावसायिक उपयोग</h2>
          <p className="text-stone">
            भक्त एवं पाठक अपने व्यक्तिगत दैनिक पाठ, पूजा, स्वाध्याय एवं भक्ति हेतु सामग्री को पढ़, सुन, सहेज एवं साझा कर सकते हैं।
          </p>
        </section>
      </div>
    </div>
  );
}
