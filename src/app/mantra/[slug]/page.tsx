import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { JapMalaCounter } from "@/components/features/JapMalaCounter";
import { MANTRAS } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { Sparkles, BookOpen, Clock, ShieldAlert, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MANTRAS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const mantra = MANTRAS.find((m) => m.slug === slug);
  if (!mantra) return {};

  return {
    title: `${mantra.title} शुद्ध पाठ, शब्दार्थ व जप विधि | ${brandConfig.nameHi}`,
    description: `${mantra.title} का शुद्ध संस्कृत श्लोक, हिंदी भावार्थ, शब्द-दर-शब्द अर्थ, जप विधि और आध्यात्मिक लाभ ${brandConfig.nameHi} पर पढ़ें।`,
  };
}

export default async function MantraDetailPage({ params }: Props) {
  const { slug } = await params;
  const mantra = MANTRAS.find((m) => m.slug === slug);
  if (!mantra) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "सिद्ध मंत्र साधना", href: "/mantra" },
          { label: mantra.title },
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          {mantra.deity} · स्रोत: {mantra.scriptureSource}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {mantra.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone">
          शास्त्रीय विधि अनुसार जप समय: <strong className="text-charcoal">{mantra.bestTime}</strong>
        </p>
      </div>

      <ContentActions
        title={mantra.title}
        contentToCopy={`${mantra.title}\n\nमूल मंत्र:\n${mantra.sanskritText}\n\nलिप्यंतरण:\n${mantra.transliteration}\n\nसम्पूर्ण अर्थ:\n${mantra.meaning}\n\nशब्दार्थ:\n${mantra.wordMeaning}\n\nजप विधि:\n${mantra.japaMethod}\n\n${getCitationString(mantra.title, `/mantra/${mantra.slug}`)}`}
      />

      {/* Main Mantra Sacred Box */}
      <div className="bg-cream border-2 border-gold/40 rounded-3xl p-6 sm:p-10 shadow-card text-center space-y-4">
        <span className="text-xs font-semibold text-saffron uppercase tracking-widest block">
          मूल संस्कृत श्लोक (Vedic Sanskrit)
        </span>
        <div
          id="devotional-content-body"
          className="p-6 bg-amber-50/70 rounded-2xl border border-gold/30"
        >
          <p className="font-serif text-maroon text-2xl sm:text-3xl font-bold leading-loose text-sanskrit">
            {mantra.sanskritText}
          </p>
        </div>

        {/* Transliteration */}
        <div className="pt-2 text-stone text-xs sm:text-sm italic font-mono">
          {mantra.transliteration}
        </div>
      </div>

      {/* Word-by-Word Meaning (पदच्छेद व शब्दार्थ) */}
      <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-saffron" />
          <span>प्रत्येक शब्द का सरल अर्थ (Word-by-Word Meaning)</span>
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          {mantra.wordMeaning}
        </p>
      </div>

      {/* Complete Hindi Meaning */}
      <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-lg font-bold text-maroon">
          सम्पूर्ण हिंदी भावार्थ (Complete Hindi Meaning)
        </h3>
        <p className="text-charcoal text-sm sm:text-base leading-relaxed">
          {mantra.meaning}
        </p>
      </div>

      {/* Traditional Japa Guidance */}
      <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
          <Clock className="w-4 h-4 text-saffron" />
          <span>पारंपरिक जप विधि एवं साधना निर्देश</span>
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          {mantra.japaMethod}
        </p>
      </div>

      {/* Responsible Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>संपादकीय स्पष्टीकरण:</strong> मंत्र साधना अंतःकरण की शुद्धि, एकाग्रता एवं आध्यात्मिक शांति का साधन है। {brandConfig.nameHi} किसी भी प्रकार के अंधविश्वास अथवा अलौकिक चमत्कारों का दावा नहीं करता।
        </p>
      </div>

      {/* Interactive 108 Mala Counter */}
      <div className="pt-4">
        <h3 className="font-serif text-xl font-bold text-maroon text-center mb-6">
          मंत्र साधना करें (डिजिटल जप काउंटर)
        </h3>
        <JapMalaCounter />
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/mantra"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य सिद्ध मंत्र देखें
        </Link>
      </div>
    </div>
  );
}
