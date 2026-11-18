import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { ENCYCLOPEDIA_ENTRIES } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { Library, BookOpen, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ENCYCLOPEDIA_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = ENCYCLOPEDIA_ENTRIES.find((e) => e.slug === slug);
  if (!entry) return {};

  return {
    title: `${entry.title} सम्पूर्ण ज्ञान व इतिहास | ${brandConfig.nameHi}`,
    description: entry.summary,
  };
}

export default async function EncyclopediaDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = ENCYCLOPEDIA_ENTRIES.find((e) => e.slug === slug);
  if (!entry) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "विश्वकोश", href: "/encyclopedia" },
          { label: entry.title },
        ]}
      />

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          {entry.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {entry.title}
        </h1>
        <p className="text-stone text-sm sm:text-base leading-relaxed">
          {entry.summary}
        </p>
      </div>

      <ContentActions
        title={entry.title}
        contentToCopy={`${entry.title}\n\n${entry.summary}\n\n${entry.content}\n\n${getCitationString(entry.title, `/encyclopedia/${entry.slug}`)}`}
      />

      {/* Key Attributes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(entry.keyAttributes).map(([key, val], idx) => (
          <div key={idx} className="bg-cream border border-gold/25 rounded-xl p-3 text-center space-y-1">
            <span className="text-[11px] font-semibold text-saffron uppercase block">{key}</span>
            <span className="font-serif text-sm font-bold text-maroon block">{val}</span>
          </div>
        ))}
      </div>

      {/* Main Content Body */}
      <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-card">
        <h2 className="font-serif text-xl font-bold text-maroon mb-4 pb-2 border-b border-gold/15">
          विस्तृत ज्ञान एवं शास्त्रीय विवेचन
        </h2>
        <div
          id="devotional-content-body"
          className="font-devanagari text-charcoal text-base sm:text-lg leading-loose space-y-4 whitespace-pre-line select-text"
        >
          {entry.content}
        </div>
      </div>

      {/* Source Scriptures */}
      {entry.sourceScriptures.length > 0 && (
        <div className="bg-ivory border border-gold/25 rounded-2xl p-6 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-maroon">
            <ShieldCheck className="w-4 h-4 text-saffron" />
            <span>शास्त्रीय ग्रंथ संदर्भ (Scriptural Sources)</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-stone">
            {entry.sourceScriptures.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/encyclopedia"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य ज्ञानकोश विषय देखें
        </Link>
      </div>
    </div>
  );
}
