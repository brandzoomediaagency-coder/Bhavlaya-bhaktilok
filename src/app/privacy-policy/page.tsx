import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";

export const metadata = {
  title: `गोपनीयता नीति (Privacy Policy) | ${brandConfig.nameHi}`,
  description: `${brandConfig.nameHi} की गोपनीयता नीति, डेटा सुरक्षा, कुकीज एवं उपयोगकर्ता गोपनीयता सुरक्षा नियम।`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "गोपनीयता नीति" }]} />

      <div className="border-b border-gold/20 pb-6 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
          गोपनीयता नीति (Privacy Policy)
        </h1>
        <p className="text-stone text-xs sm:text-sm">
          अंतिम अद्यतन: वर्ष 2026 · {brandConfig.nameHi} ({brandConfig.name})
        </p>
      </div>

      <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-6 text-charcoal text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">1. परिचय एवं सूचना संग्रह</h2>
          <p className="text-stone">
            {brandConfig.nameHi} ({brandConfig.proposedDomain}) में हम अपने पाठकों की गोपनीयता का सर्वोच्च सम्मान करते हैं। सार्वजनिक धार्मिक सामग्री पढ़ने अथवा सुनने के लिए किसी भी पंजीकरण अथवा व्यक्तिगत जानकारी की आवश्यकता नहीं होती।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">2. स्थान डेटा (Location Data for Panchang)</h2>
          <p className="text-stone">
            पंचांग एवं सूर्योदय की सटीक गणना के लिए उपयोगकर्ता द्वारा चयनित शहर के अक्षांश-देशांतर का उपयोग केवल ब्राउज़र के स्तर पर स्थानीय रूप से किया जाता है। हम उपयोगकर्ता का व्यक्तिगत GPS डेटा सर्वर पर बिना अनुमति एकत्रित अथवा संग्रहीत नहीं करते।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">3. कुकीज़ एवं स्थानीय संग्रहण (Local Storage)</h2>
          <p className="text-stone">
            उपयोगकर्ता की सुविधा हेतु स्थानीय प्राथमिकताओं जैसे जप माला की गिनती, दैनिक पूजा चेकलिस्ट एवं पसंदीदा सामग्री को आपके अपने डिवाइस के LocalStorage में सहेजा जाता है।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-maroon">4. संपर्क एवं डेटा सुरक्षा</h2>
          <p className="text-stone">
            यदि आप संपर्क प्रपत्र के माध्यम से हमें नाम व ईमेल भेजते हैं, तो उसका उपयोग केवल आपके प्रश्न का उत्तर देने हेतु किया जाता है। हम किसी भी तृतीय पक्ष के साथ आपका डेटा साझा अथवा विक्रय नहीं करते। किसी भी प्रश्न हेतु आप हमें {brandConfig.supportEmail} पर संपर्क कर सकते हैं।
          </p>
        </section>
      </div>
    </div>
  );
}
