import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { SCRIPTURES } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { BookOpen, Sparkles, ArrowLeft, Bookmark } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SCRIPTURES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const scripture = SCRIPTURES.find((s) => s.slug === slug);
  if (!scripture) return {};

  return {
    title: `${scripture.title} सम्पूर्ण अध्याय व श्लोक हिंदी अनुवाद सहित | ${brandConfig.nameHi}`,
    description: `${scripture.title} के सभी अध्याय, मूल संस्कृत श्लोक, पदच्छेद, शब्दार्थ एवं प्रामाणिक हिंदी व्याख्या ${brandConfig.nameHi} पर पढ़ें।`,
  };
}

export default async function GranthDetailPage({ params }: Props) {
  const { slug } = await params;
  const scripture = SCRIPTURES.find((s) => s.slug === slug);
  if (!scripture) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "सनातन ग्रंथालय", href: "/granth" },
          { label: scripture.title },
        ]}
      />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          {scripture.category} · {scripture.chaptersCount} अध्याय · {scripture.versesCount} श्लोक
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {scripture.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-xl mx-auto">
          रचयिता / उपदेशक: <strong>{scripture.author}</strong>
        </p>
      </div>

      <ContentActions
        title={scripture.title}
        contentToCopy={`${scripture.title}\n${scripture.description}\n\n${getCitationString(scripture.title, `/granth/${scripture.slug}`)}`}
      />

      {/* Scripture Overview */}
      <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-xl font-bold text-maroon flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-saffron" />
          <span>ग्रंथ परिचय एवं आध्यात्मिक महत्त्व</span>
        </h3>
        <p className="text-charcoal text-sm sm:text-base leading-relaxed">
          {scripture.description}
        </p>
      </div>

      {/* Famous Verses Section */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-maroon">
          प्रमुख एवं सार्वकालिक कल्याणकारी श्लोक
        </h3>

        {scripture.famousVerses.map((item, idx) => (
          <div
            key={idx}
            className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 shadow-card space-y-4"
          >
            <div className="flex items-center justify-between text-xs text-saffron font-bold">
              <span>{item.verse}</span>
              <span className="text-stone text-[11px]">मूल श्लोक</span>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-xl border border-gold/20 text-center">
              <p className="font-serif text-maroon text-lg sm:text-xl font-bold leading-loose text-sanskrit whitespace-pre-line">
                {item.sanskrit}
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div>
                <strong className="text-charcoal block mb-0.5">सरल हिंदी अनुवाद:</strong>
                <p className="text-stone leading-relaxed">{item.hindi}</p>
              </div>
              <div className="pt-2 border-t border-gold/15">
                <strong className="text-charcoal block mb-0.5">आध्यात्मिक व्याख्या:</strong>
                <p className="text-stone leading-relaxed italic">{item.meaning}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/granth"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य सभी ग्रंथ देखें
        </Link>
      </div>
    </div>
  );
}
