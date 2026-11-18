import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { ShieldCheck, Sparkles, Heart, BookOpen, Users, Compass } from "lucide-react";

export const metadata = {
  title: `हमारे बारे में (About Bhavlaya) · परिचय एवं उद्देश्य | ${brandConfig.nameHi}`,
  description: `${brandConfig.nameHi} (${brandConfig.name}) का परिचय, उद्देश्य, संपादकीय मानक एवं सनातन धर्म के प्रामाणिक डिजिटल संरक्षण की यात्रा।`,
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "हमारे बारे में" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-12 shadow-card text-center space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          हमारा परिचय एवं संकल्प
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon">
          {brandConfig.nameHi} — {brandConfig.taglineHi}
        </h1>
        <p className="text-stone text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          &ldquo;{brandConfig.tagline} — {brandConfig.heroHeadingHi}&rdquo;
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-maroon">
          हमारा उद्देश्य (Our Mission)
        </h2>
        <p className="text-charcoal text-sm sm:text-base leading-relaxed">
          इंटरनेट और सोशल मीडिया के युग में सनातन धर्म से जुड़ी अनेक सामग्रियां अशुद्ध, अपुष्ट अथवा बिना संदर्भ के प्रसारित होती हैं। <strong>{brandConfig.nameHi} ({brandConfig.name})</strong> का प्राथमिक उद्देश्य प्रत्येक सनातनी श्रद्धालु, जिज्ञासु और साधक तक वेद, पुराण, उपनिषद्, रामायण और गीता के शुद्ध मंत्र, भजन, आरती, चालीसा और दैनिक पंचांग को पूर्ण सांस्कृतिक प्रामाणिकता के साथ पहुँचाना है।
        </p>
        <p className="text-stone text-sm sm:text-base leading-relaxed">
          हमारा प्रयास है कि हमारी आने वाली पीढ़ी अपनी गौरवशाली संस्कृति, देवी-देवताओं के स्वरूप, पावन तीर्थों और त्योहारों के वैज्ञानिक व आध्यात्मिक महत्त्व को सहजता से समझ सके।
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-ivory rounded-2xl border border-gold/20 space-y-2.5">
          <ShieldCheck className="w-8 h-8 text-saffron" />
          <h3 className="font-serif font-bold text-lg text-maroon">शास्त्रीय प्रामाणिकता</h3>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            प्रत्येक मंत्र और कथा के साथ मूल ग्रंथ का संदर्भ व अध्याय संख्या प्रस्तुत करने का नियम।
          </p>
        </div>

        <div className="p-6 bg-ivory rounded-2xl border border-gold/20 space-y-2.5">
          <Sparkles className="w-8 h-8 text-saffron" />
          <h3 className="font-serif font-bold text-lg text-maroon">आधुनिक डिजिटल अनुभव</h3>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            तेज़, सुलभ, मोबाइल-फ्रेंडली और विज्ञापनों के आडंबर से मुक्त उच्च गुणवत्ता वाला इंटरफेस।
          </p>
        </div>

        <div className="p-6 bg-ivory rounded-2xl border border-gold/20 space-y-2.5">
          <Heart className="w-8 h-8 text-saffron" />
          <h3 className="font-serif font-bold text-lg text-maroon">सद्भाव एवं निष्काम सेवा</h3>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            सनातन धर्म के सार्वभौमिक सिद्धांतों — वसुधैव कुटुम्बकम् एवं सर्वे भवन्तु सुखिनः का संवर्धन।
          </p>
        </div>
      </div>

      {/* Technology & Development Company Distinction */}
      <div className="bg-ivory border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-xl font-bold text-maroon">
          प्रौद्योगिकी एवं विकास (Technology Partner)
        </h3>
        <p className="text-xs sm:text-sm text-stone leading-relaxed">
          <strong>{brandConfig.name} ({brandConfig.nameHi})</strong> एक पावन उत्पाद ब्रांड है। इस संपूर्ण डिजिटल इकोसिस्टम का तकनीकी वास्तुकला, मोबाइल ऐप्स, डेटाबेस और सॉफ्टवेयर विकास <strong>{brandConfig.companyName}</strong> ({brandConfig.companyCreditHi}) द्वारा समर्पित भाव से संचालित एवं प्रबंधित किया जाता है।
        </p>
      </div>
    </div>
  );
}
