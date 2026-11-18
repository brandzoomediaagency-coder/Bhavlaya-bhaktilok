import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { AARTIS } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { Flame, ArrowLeft, BookOpen } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AARTIS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const aarti = AARTIS.find((a) => a.slug === slug);
  if (!aarti) return {};

  return {
    title: `${aarti.title} लिरिक्स व पूजा विधि | ${brandConfig.nameHi}`,
    description: `${aarti.title} के शुद्ध व प्रामाणिक बोल, आरती का महत्त्व एवं आरती करने की शास्त्रीय विधि ${brandConfig.nameHi} पर पढ़ें।`,
  };
}

export default async function AartiDetailPage({ params }: Props) {
  const { slug } = await params;
  const aarti = AARTIS.find((a) => a.slug === slug);
  if (!aarti) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "आरती संग्रह", href: "/aarti" },
          { label: aarti.title },
        ]}
      />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          इष्टदेव: {aarti.deity}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {aarti.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-xl mx-auto">
          {aarti.significance}
        </p>
      </div>

      <ContentActions
        title={aarti.title}
        contentToCopy={`${aarti.title}\n\n${aarti.lyrics}\n\n${getCitationString(aarti.title, `/aarti/${aarti.slug}`)}`}
      />

      {/* Aarti Lyrics Body */}
      <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-card">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-xl font-bold text-maroon pb-3 mb-6 border-b border-gold/15 inline-block">
            आरती के पावन बोल (Aarti Lyrics in Hindi)
          </h2>
          <div
            id="devotional-content-body"
            className="font-devanagari text-charcoal text-lg sm:text-xl font-medium leading-loose whitespace-pre-line select-text"
          >
            {aarti.lyrics}
          </div>
        </div>
      </div>

      {/* Worship Guidance */}
      <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-saffron font-semibold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>आरती करने की पारंपरिक शास्त्रीय विधि</span>
        </div>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          आरती सदैव खड़े होकर दोनों हाथों से थाली को दक्षिणावर्त (घड़ी की सुई की दिशा में) भगवान के चारों ओर 4 बार चरणों में, 2 बार नाभि में, 1 बार मुखमंडल पर और 7 बार सम्पूर्ण श्रीविग्रह के सामने घुमाना चाहिए। आरती के उपरांत कर्पूरगौरं मंत्र बोलकर आरती पर जल फेरकर स्वयं और उपस्थित भक्तों को आरती लेनी चाहिए।
        </p>
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/aarti"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य सभी आरतियां देखें
        </Link>
      </div>
    </div>
  );
}
