import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { CHALISAS } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { BookOpen, Sparkles, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CHALISAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const chalisa = CHALISAS.find((c) => c.slug === slug);
  if (!chalisa) return {};

  return {
    title: `${chalisa.title} हिंदी अर्थ सहित | ${brandConfig.nameHi}`,
    description: `सम्पूर्ण ${chalisa.title} का शुद्ध पाठ, दोहे, चौपाई हिंदी अर्थ और पारंपरिक पाठ विधि ${brandConfig.nameHi} पर पढ़ें।`,
  };
}

export default async function ChalisaDetailPage({ params }: Props) {
  const { slug } = await params;
  const chalisa = CHALISAS.find((c) => c.slug === slug);
  if (!chalisa) notFound();

  const fullTextToCopy = chalisa.verses
    .map((v) => `${v.text}\nभावार्थ: ${v.meaning}`)
    .join("\n\n");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "चालीसा संग्रह", href: "/chalisa" },
          { label: chalisa.title },
        ]}
      />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          इष्टदेव: {chalisa.deity}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {chalisa.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-xl mx-auto">
          {chalisa.significance}
        </p>
      </div>

      <ContentActions
        title={chalisa.title}
        contentToCopy={`${chalisa.title}\n\n${fullTextToCopy}\n\n${getCitationString(chalisa.title, `/chalisa/${chalisa.slug}`)}`}
      />

      {/* Verses Container */}
      <div id="devotional-content-body" className="space-y-6">
        {chalisa.verses.map((verse, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 sm:p-8 border shadow-xs ${
              verse.type === "doha"
                ? "bg-amber-50/70 border-gold/40 text-center"
                : "bg-cream border-gold/20"
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs text-saffron font-bold">
              <span>{verse.type === "doha" ? "॥ दोहा ॥" : `॥ चौपाई ${idx - 1} ॥`}</span>
              <span className="text-stone-light text-[11px]">{brandConfig.nameHi} प्रामाणिक पाठ</span>
            </div>

            <p className="font-serif text-maroon text-lg sm:text-xl font-bold leading-loose whitespace-pre-line text-devanagari">
              {verse.text}
            </p>

            <div className="mt-4 pt-3 border-t border-gold/15 text-xs sm:text-sm text-stone leading-relaxed">
              <strong className="text-charcoal block mb-0.5">सरल हिंदी अर्थ:</strong>
              {verse.meaning}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/chalisa"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य सभी चालीसा देखें
        </Link>
      </div>
    </div>
  );
}
