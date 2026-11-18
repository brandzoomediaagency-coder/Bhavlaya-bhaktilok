import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { STOTRAS } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { BookOpen, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: `पावन स्तोत्र संग्रह (Sacred Stotra Library) | ${brandConfig.nameHi}`,
  description: `शिव ताण्डव स्तोत्रम्, श्री महालक्ष्मी अष्टकम्, आदित्य हृदय स्तोत्र एवं अन्य सिद्ध स्तोत्रों का शुद्ध संस्कृत पाठ, अन्वय व भावार्थ ${brandConfig.nameHi} पर।`,
};

export default function StotraListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "स्तोत्र संग्रह" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-saffron" />
          <span>दिव्य स्तुति एवं फलश्रुति</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन पावन स्तोत्र संग्रह
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          ऋषि-मुनियों एवं देवताओं द्वारा रचित दिव्य स्तोत्रों का शुद्ध देवनागरी पाठ, पदच्छेद, शब्दार्थ, भावार्थ एवं शास्त्रीय फलश्रुति।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STOTRAS.map((stotra) => (
          <Link
            key={stotra.id}
            href={`/stotra/${stotra.slug}`}
            className="group bg-cream border border-gold/25 rounded-2xl p-6 hover:shadow-card-hover hover:border-gold/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark font-medium">
                  {stotra.deity}
                </span>
                <span className="text-stone-light">रचयिता: {stotra.composer}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron transition-colors">
                {stotra.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone line-clamp-3 leading-relaxed">
                {stotra.significance}
              </p>
            </div>

            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron mt-4">
              <span>सम्पूर्ण स्तोत्र व फलश्रुति</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
