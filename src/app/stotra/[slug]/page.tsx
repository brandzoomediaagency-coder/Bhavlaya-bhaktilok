import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { STOTRAS } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { BookOpen, Sparkles, ArrowLeft, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return STOTRAS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const stotra = STOTRAS.find((s) => s.slug === slug);
  if (!stotra) return {};

  return {
    title: `${stotra.title} शुद्ध संस्कृत पाठ व हिंदी अर्थ | ${brandConfig.nameHi}`,
    description: `${stotra.title} का मूल संस्कृत पाठ, अन्वय, हिंदी अनुवाद, रचयिता एवं फलश्रुति ${brandConfig.nameHi} पर पढ़ें।`,
  };
}

export default async function StotraDetailPage({ params }: Props) {
  const { slug } = await params;
  const stotra = STOTRAS.find((s) => s.slug === slug);
  if (!stotra) notFound();

  const fullTextToCopy = stotra.verses
    .map((v) => `श्लोक ${v.verseNum}:\n${v.sanskrit}\n\nभावार्थ:\n${v.meaning}`)
    .join("\n\n");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "स्तोत्र संग्रह", href: "/stotra" },
          { label: stotra.title },
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          इष्टदेव: {stotra.deity} · रचयिता: {stotra.composer}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {stotra.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-xl mx-auto">
          स्रोत: {stotra.scriptureSource}
        </p>
      </div>

      <ContentActions
        title={stotra.title}
        contentToCopy={`${stotra.title}\nरचयिता: ${stotra.composer}\n\n${fullTextToCopy}\n\nफलश्रुति:\n${stotra.phalaShruti}\n\n${getCitationString(stotra.title, `/stotra/${stotra.slug}`)}`}
      />

      {/* Significance Box */}
      <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-2">
        <h3 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-saffron" />
          <span>स्तोत्र का आध्यात्मिक महत्त्व</span>
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          {stotra.significance}
        </p>
      </div>

      {/* Verses */}
      <div id="devotional-content-body" className="space-y-6">
        {stotra.verses.map((v) => (
          <div key={v.verseNum} className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <span className="text-xs font-bold text-saffron tracking-wider block">
              ॥ श्लोक {v.verseNum} ॥
            </span>
            <p className="font-serif text-maroon text-lg sm:text-xl font-bold leading-loose whitespace-pre-line text-devanagari">
              {v.sanskrit}
            </p>
            <div className="text-xs text-stone-light italic">
              {v.transliteration}
            </div>
            <div className="pt-3 border-t border-gold/15">
              <span className="text-xs font-semibold text-charcoal block mb-1">हिंदी भावार्थ:</span>
              <p className="text-charcoal text-sm leading-relaxed">
                {v.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Phala Shruti (Benefits) */}
      <div className="bg-ivory border-2 border-gold/30 rounded-2xl p-6 sm:p-8 space-y-2">
        <h3 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-saffron" />
          <span>शास्त्रीय फलश्रुति (Benefits of Recitation)</span>
        </h3>
        <p className="text-charcoal text-sm leading-relaxed">
          {stotra.phalaShruti}
        </p>
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/stotra"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य पावन स्तोत्र देखें
        </Link>
      </div>
    </div>
  );
}
