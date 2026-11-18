import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: `धार्मिक एवं पौराणिक कथाएं (Puranic & Vrat Katha) | ${brandConfig.nameHi}`,
  description: `शिव पुराण, कृष्ण लीला, सत्यनारायण व्रत कथा, एकादशी व्रत कथा, रामायण प्रसंग एवं सनातन धर्म की पावन पौराणिक कथाएं ${brandConfig.nameHi} पर पढ़ें।`,
};

const KATHAS = [
  {
    id: "k1",
    slug: "shiv-parvati-vivah-katha",
    title: "भगवान शिव एवं माता पार्वती का दिव्य विवाह प्रसंग",
    category: "शिव महापुराण",
    excerpt: "सती के आत्मदाह के उपरांत माता पार्वती की घोर तपस्या और देवाधिदेव महादेव के साथ उनके पावन विवाह की अलौकिक अमर कथा।",
    source: "शिव महापुराण (रुद्र संहिता)",
  },
  {
    id: "k2",
    slug: "samudra-manthan-amrit-katha",
    title: "समुद्र मंथन एवं 14 दिव्य रत्नों का प्राकट्य",
    category: "श्रीमद्भागवत महापुराण",
    excerpt: "क्षीरसागर में देवताओं और असुरों द्वारा वासुकि नाग और मंदराचल पर्वत से किए गए मंथन और भगवान धन्वंतरि के अमृत कलश प्राकट्य की कथा।",
    source: "श्रीमद्भागवत महापुराण (अष्टम स्कन्ध)",
  },
  {
    id: "k3",
    slug: "satyanarayan-vrat-katha",
    title: "श्री सत्यनारायण भगवान की पावन व्रत कथा",
    category: "स्कन्द पुराण",
    excerpt: "कलियुग में सबसे सरल और सर्व-मनोकामना पूर्ण करने वाले भगवान श्री सत्यनारायण के व्रत, पूजन एवं पांचों अध्यायों की कथा।",
    source: "स्कन्द पुराण (रेवा खण्ड)",
  },
  {
    id: "k4",
    slug: "bhakt-prahlad-narasimha-avatar",
    title: "भक्त प्रह्लाद की अनन्य भक्ति एवं नृसिंह अवतार",
    category: "विष्णु पुराण",
    excerpt: "अहंकारी हिरण्यकशिपु के अत्याचारों से बालक प्रह्लाद की रक्षा हेतु भगवान श्री हरि के खंभे से नृसिंह रूप में प्राकट्य की कथा।",
    source: "विष्णु पुराण एवं श्रीमद्भागवत",
  },
];

export default function KathaListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "धार्मिक कथाएं" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-saffron" />
          <span>अमृत कथाएं</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन पौराणिक एवं व्रत कथाएं
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          पुराणों, इतिहास एवं उपनिषदों से संकलित प्रेरणादायी धार्मिक कथाएं, व्रत कथाएं एवं उनके आध्यात्मिक रहस्य।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {KATHAS.map((katha) => (
          <article
            key={katha.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-center text-xs text-saffron font-medium mb-2">
                <span>{katha.category}</span>
                <span className="text-[11px] text-stone">स्रोत: {katha.source}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-3">
                <Link href={`/katha/${katha.slug}`}>
                  {katha.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-stone leading-relaxed mb-4">
                {katha.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs">
              <span className="text-stone">सत्यापित शास्त्रीय संदर्भ</span>
              <Link
                href={`/katha/${katha.slug}`}
                className="px-4 py-2 rounded-xl bg-maroon hover:bg-maroon-light text-white font-medium transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span>सम्पूर्ण कथा पढ़ें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
