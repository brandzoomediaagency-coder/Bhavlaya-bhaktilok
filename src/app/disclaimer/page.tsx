import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: `धार्मिक एवं विधिक अस्वीकरण (Disclaimer) | ${brandConfig.nameHi}`,
  description: `${brandConfig.nameHi} का धार्मिक, ज्योतिषीय, स्वास्थ्य एवं सामान्य अस्वीकरण।`,
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "अस्वीकरण (Disclaimer)" }]} />

      <div className="border-b border-gold/20 pb-6 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
          धार्मिक एवं विधिक अस्वीकरण (Disclaimer)
        </h1>
        <p className="text-stone text-xs sm:text-sm">
          अंतिम अद्यतन: वर्ष 2026 · {brandConfig.nameHi} ({brandConfig.name})
        </p>
      </div>

      <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-6 text-charcoal text-sm leading-relaxed">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm leading-relaxed">
            <strong>सार्वजनिक घोषणा:</strong> {brandConfig.nameHi} पर प्रस्तुत समस्त सामग्री सनातन धर्म की प्राचीन परंपराओं, श्रुतियों, स्मृतियों, पुराणों एवं पारंपरिक ज्योतिषीय सिद्धांतों पर आधारित है। इसे आस्था, श्रद्धा एवं आत्मिक शांति के संदर्भ में ही ग्रहण किया जाना चाहिए।
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">1. चिकित्सा एवं स्वास्थ्य संबंधी अस्वीकरण</h2>
          <p className="text-stone">
            वेबसाइट पर वर्णित मंत्र, रुद्राक्ष, व्रत, उपवास अथवा आयुर्वेदिक जड़ी-बूटियों की पौराणिक कथाएं किसी भी प्रकार से पेशेवर चिकित्सा, औषधि अथवा चिकित्सीय सलाह (Medical Advice) का विकल्प नहीं हैं। किसी भी शारीरिक अथवा मानसिक अस्वस्थता की स्थिति में सदैव योग्य चिकित्सक से परामर्श लें।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">2. वित्तीय एवं कानूनी अस्वीकरण</h2>
          <p className="text-stone">
            ज्योतिष, राशिफल अथवा मुहूर्त संबंधी कोई भी जानकारी वित्तीय, निवेश अथवा कानूनी सलाह के रूप में प्रस्तुत नहीं की जाती। अपने व्यावसायिक अथवा कानूनी निर्णयों के लिए स्वतंत्र कानूनी एवं वित्तीय सलाहकारों से परामर्श करें।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">3. मंदिर समय एवं यात्रा जानकारी</h2>
          <p className="text-stone">
            मंदिरों के कपाट खुलने, दर्शन एवं आरती के समय संबंधित मंदिर ट्रस्टों द्वारा ऋतु एवं विशेष पर्वों के अनुसार परिवर्तित किए जा सकते हैं। किसी भी सुदूर तीर्थ की यात्रा से पूर्व स्थानीय मंदिर प्रशासन अथवा अधिकृत वेबसाइट से समय की पुष्टि अवश्य कर लें।
          </p>
        </section>
      </div>
    </div>
  );
}
