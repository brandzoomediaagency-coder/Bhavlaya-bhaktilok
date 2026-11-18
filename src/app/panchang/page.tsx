import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { PanchangWidget } from "@/components/sections/PanchangWidget";
import { Sparkles, Calendar, Compass, ShieldCheck } from "lucide-react";

export const metadata = {
  title: `दैनिक पंचांग (Daily Hindu Panchang) · आज की तिथि, नक्षत्र, चौघड़िया व शुभ मुहूर्त | ${brandConfig.nameHi}`,
  description: `आज का दैनिक पंचांग, सूर्योदय, सूर्यास्त, राहुकाल, अभिजित मुहूर्त, ब्रह्म मुहूर्त, चौघड़िया, विक्रम संवत एवं तिथि की सटीक शास्त्रीय गणना ${brandConfig.nameHi} पर देखें।`,
};

export default function PanchangPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "दैनिक पंचांग व शुभ मुहूर्त" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>वैदिक कालगणना</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन दैनिक पंचांग एवं शुभ मुहूर्त
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          सटीक खगोलीय गणना पर आधारित पंचांग के पाँच अंग: तिथि, वार, नक्षत्र, योग और करण। अपने शहर के अनुसार सटीक सूर्योदय, सूर्यास्त और चौघड़िया देखें।
        </p>
      </div>

      {/* Main Full Panchang Widget */}
      <PanchangWidget showFullDetails={true} />

      {/* Editorial Guide on Panchang */}
      <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-gold/25 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-maroon">
          पंचांग के पाँच अंग क्या हैं और इनका क्या महत्त्व है?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone leading-relaxed">
          <div className="p-4 bg-ivory rounded-xl border border-gold/15">
            <h4 className="font-bold text-charcoal mb-1">1. तिथि (Tithi)</h4>
            <p>चंद्रमा और सूर्य के बीच की दूरी को 12 अंश के अंतर पर एक तिथि कहा जाता है। एक मास में 30 तिथियां होती हैं (15 शुक्ल पक्ष व 15 कृष्ण पक्ष)।</p>
          </div>

          <div className="p-4 bg-ivory rounded-xl border border-gold/15">
            <h4 className="font-bold text-charcoal mb-1">2. वार (Vara)</h4>
            <p>सप्ताह के सात दिन, जिनका नामकरण सात मुख्य ग्रहों के आधार पर किया गया है (रवि, सोम, मंगल, बुध, गुरु, शुक्र, शनि)।</p>
          </div>

          <div className="p-4 bg-ivory rounded-xl border border-gold/15">
            <h4 className="font-bold text-charcoal mb-1">3. नक्षत्र (Nakshatra)</h4>
            <p>आकाश मंडल को 27 नक्षत्रों में बांटा गया है। चंद्रमा प्रतिदिन लगभग एक नक्षत्र पार करता है। अश्विनी से रेवती तक 27 नक्षत्र हैं।</p>
          </div>

          <div className="p-4 bg-ivory rounded-xl border border-gold/15">
            <h4 className="font-bold text-charcoal mb-1">4. योग (Yoga)</h4>
            <p>सूर्य और चंद्रमा के भोगांशों का योग 13 अंश 20 कला होने पर एक योग बनता है। विष्कुंभ से वैधृति तक कुल 27 योग होते हैं।</p>
          </div>

          <div className="p-4 bg-ivory rounded-xl border border-gold/15 md:col-span-2">
            <h4 className="font-bold text-charcoal mb-1">5. करण (Karana)</h4>
            <p>एक तिथि के आधे भाग को करण कहते हैं। कुल 11 करण होते हैं (7 चर करण और 4 स्थिर करण)। इसमें विष्टि करण को भद्रा कहा जाता है, जिसमें शुभ कार्य वर्जित होते हैं।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
