import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { BHAJANS } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { Music, User, BookOpen, Sparkles, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BHAJANS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const bhajan = BHAJANS.find((b) => b.slug === slug);
  if (!bhajan) return {};

  return {
    title: `${bhajan.title} लिरिक्स व हिंदी अर्थ | ${brandConfig.nameHi}`,
    description: `${bhajan.title} के शुद्ध व प्रामाणिक लिरिक्स, हिंदी भावार्थ, गायन विधि एवं आध्यात्मिक संदर्भ ${brandConfig.nameHi} पर पढ़ें।`,
  };
}

export default async function BhajanDetailPage({ params }: Props) {
  const { slug } = await params;
  const bhajan = BHAJANS.find((b) => b.slug === slug);
  if (!bhajan) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "भजन संग्रह", href: "/bhajan" },
          { label: bhajan.title },
        ]}
      />

      {/* Header Info */}
      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          {bhajan.category} · {bhajan.deity}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {bhajan.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-xs text-stone pt-1">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-saffron" />
            गायक/रचयिता: {bhajan.singer}
          </span>
          <span>·</span>
          <span>संपादकीय समीक्षा द्वारा सत्यापित</span>
        </div>
      </div>

      {/* Content Action Bar (Font Resize, Copy, Share, Print, Bookmark) */}
      <ContentActions
        title={bhajan.title}
        contentToCopy={`${bhajan.title}\n\n${bhajan.lyrics}\n\nभावार्थ:\n${bhajan.meaning}\n\n${getCitationString(bhajan.title, `/bhajan/${bhajan.slug}`)}`}
      />

      {/* Bhajan Lyrics Body */}
      <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-card">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-xl font-bold text-maroon pb-3 mb-6 border-b border-gold/15 inline-block">
            सम्पूर्ण भजन लिरिक्स (Lyrics in Hindi)
          </h2>
          <div
            id="devotional-content-body"
            className="font-devanagari text-charcoal text-lg sm:text-xl font-medium leading-loose whitespace-pre-line select-text"
          >
            {bhajan.lyrics}
          </div>
        </div>
      </div>

      {/* Spiritual Meaning & Context */}
      <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-saffron font-semibold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>भजन का दिव्य भावार्थ एवं आध्यात्मिक संदेश</span>
        </div>
        <p className="text-stone text-sm sm:text-base leading-relaxed">
          {bhajan.meaning}
        </p>
      </div>

      {/* Back to list */}
      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/bhajan"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य सभी भजन देखें
        </Link>
      </div>
    </div>
  );
}
