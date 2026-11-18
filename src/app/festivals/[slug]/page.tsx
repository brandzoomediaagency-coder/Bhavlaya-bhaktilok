import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { FESTIVALS } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { Calendar, BookOpen, CheckSquare, Sparkles, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FESTIVALS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const festival = FESTIVALS.find((f) => f.slug === slug);
  if (!festival) return {};

  return {
    title: `${festival.name} 2026 तारीख, पूजा विधि, सामग्री व मंत्र | ${brandConfig.nameHi}`,
    description: `${festival.name} 2026 की सही तारीख, पावन तिथि, पूजा सामग्री, चरणबद्ध पूजा विधि, शुभ मुहूर्त और मंत्र ${brandConfig.nameHi} पर पढ़ें।`,
  };
}

export default async function FestivalDetailPage({ params }: Props) {
  const { slug } = await params;
  const festival = FESTIVALS.find((f) => f.slug === slug);
  if (!festival) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "त्योहार एवं पर्व", href: "/festivals" },
          { label: festival.name },
        ]}
      />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          दिनांक: {festival.date2026} · तिथि: {festival.tithi}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {festival.name}
        </h1>
      </div>

      <ContentActions
        title={festival.name}
        contentToCopy={`${festival.name}\nदिनांक: ${festival.date2026}\nतिथि: ${festival.tithi}\nधार्मिक महत्त्व: ${festival.significance}\nपूजा विधि: ${festival.pujaVidhi}\nपूजा सामग्री: ${festival.pujaSamagri.join(", ")}\nमंत्र: ${festival.mantra}\n\n${getCitationString(festival.name, `/festivals/${festival.slug}`)}`}
      />

      {/* Significance Box */}
      <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-xl font-bold text-maroon flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-saffron" />
          <span>पर्व का धार्मिक एवं आध्यात्मिक महत्त्व</span>
        </h3>
        <p className="text-charcoal text-sm sm:text-base leading-relaxed">
          {festival.significance}
        </p>
      </div>

      {/* Puja Vidhi */}
      <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-xl font-bold text-maroon flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-saffron" />
          <span>चरणबद्ध पूजा विधि (Step-by-Step Puja Vidhi)</span>
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          {festival.pujaVidhi}
        </p>
      </div>

      {/* Puja Samagri List */}
      <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-xl font-bold text-maroon flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-saffron" />
          <span>आवश्यक पूजा सामग्री सूची (Puja Samagri Checklist)</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {festival.pujaSamagri.map((item, idx) => (
            <div key={idx} className="p-3 bg-ivory rounded-xl border border-gold/15 text-xs text-charcoal font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-saffron" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Puja Mantra */}
      <div className="bg-amber-50/80 border border-gold/30 rounded-2xl p-6 text-center space-y-2">
        <span className="text-xs text-saffron font-bold uppercase tracking-wider block">
          पावन पूजा एवं ध्यान मंत्र
        </span>
        <p className="font-serif text-maroon text-lg sm:text-xl font-bold leading-relaxed text-sanskrit">
          {festival.mantra}
        </p>
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/festivals"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य सभी त्योहार व पर्व देखें
        </Link>
      </div>
    </div>
  );
}
