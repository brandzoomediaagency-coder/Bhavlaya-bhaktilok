import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { ShieldCheck, BookOpen, CheckCircle } from "lucide-react";

export const metadata = {
  title: `संपादकीय एवं संशोधन नीति (Editorial Policy) | ${brandConfig.nameHi}`,
  description: `${brandConfig.nameHi} की संपादकीय नीति, धार्मिक सामग्री का शास्त्रीय सत्यापन, स्रोत संदर्भ एवं उपयोगकर्ता संशोधन प्रक्रिया।`,
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "संपादकीय नीति" }]} />

      <div className="border-b border-gold/20 pb-6 space-y-2">
        <span className="text-xs font-semibold text-saffron uppercase tracking-wider">
          प्रामाणिकता एवं विश्वसनीयता
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
          {brandConfig.nameHi} संपादकीय एवं संशोधन नीति
        </h1>
        <p className="text-stone text-xs sm:text-sm">
          अंतिम अद्यतन: वर्ष 2026 · संपादकीय मंडल, {brandConfig.nameHi}
        </p>
      </div>

      <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-6 text-charcoal text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">
            1. शास्त्रीय प्रामाणिकता एवं स्रोत संदर्भ
          </h2>
          <p className="text-stone">
            {brandConfig.nameHi} पर प्रकाशित प्रत्येक मंत्र, श्लोक, स्तोत्र, व्रत कथा एवं पंचांग को केवल प्रामाणिक सनातन धर्मग्रंथों (चार वेद, 108 उपनिषद्, 18 महापुराण, वाल्मीकि रामायण, रामचरितमानस, श्रीमद्भगवद्गीता एवं पारंपरिक सूर्य सिद्धांत) से ही उद्धृत किया जाता है।
          </p>
          <p className="text-stone">
            हम किसी भी सामग्री को बिना मूल ग्रंथ संदर्भ, मण्डल, सूक्त, अध्याय अथवा श्लोक संख्या के प्रकाशित नहीं करते।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">
            2. तथ्य एवं आस्था का स्पष्ट विभेदन
          </h2>
          <p className="text-stone">
            हम ऐतिहासिक प्रमाण, भौगोलिक स्थिति, पारंपरिक आस्था और लोक-मान्यताओं के मध्य स्पष्ट विभेद बनाए रखते हैं। मंदिर के दर्शन समय, मार्ग एवं इतिहास की पुष्टि आधिकारिक अथवा भौगोलिक स्रोतों से की जाती है।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">
            3. अंधविश्वास एवं चमत्कारिक दावों का निषेध
          </h2>
          <p className="text-stone">
            {brandConfig.nameHi} किसी भी मंत्र, रत्न, ताबीज अथवा पूजा से अलौकिक चमत्कार, असाध्य रोगों के शर्तिया उपचार, लॉटरी अथवा रातों-रात धनवान बनने जैसे अवैज्ञानिक व भ्रामक दावों का पूर्णतः विरोध करता है। मंत्र साधना को आत्मिक शांति, चित्त की शुद्धि और ईश्वर भक्ति का माध्यम माना जाता है।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">
            4. उपयोगकर्ता संशोधन एवं त्रुटि सुधार (Corrections)
          </h2>
          <p className="text-stone">
            यदि किसी पाठक को किसी श्लोक की वर्तनी, देवनागरी मात्रा, भावार्थ अथवा तिथि में कोई विसंगति प्रतीत होती है, तो वे हमारे संपर्क प्रपत्र अथवा {brandConfig.supportEmail} पर ग्रंथ संदर्भ सहित संशोधन भेज सकते हैं। हमारा संपादकीय दल 48 घंटे के भीतर उसकी समीक्षा कर सुधार करता है।
          </p>
        </section>
      </div>
    </div>
  );
}
