import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { TEMPLES } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { MapPin, Clock, Compass, BookOpen, ArrowLeft, Train, Car } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TEMPLES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const temple = TEMPLES.find((t) => t.slug === slug);
  if (!temple) return {};

  return {
    title: `${temple.name} (${temple.location}) दर्शन समय, इतिहास व आरती | ${brandConfig.nameHi}`,
    description: `${temple.name} का इतिहास, धार्मिक महत्त्व, मंगला व शयन आरती समय, दर्शन समय एवं पहुँचने का सम्पूर्ण मार्ग ${brandConfig.nameHi} पर जानें।`,
  };
}

export default async function MandirDetailPage({ params }: Props) {
  const { slug } = await params;
  const temple = TEMPLES.find((t) => t.slug === slug);
  if (!temple) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "मंदिर व तीर्थ दर्शन", href: "/mandir" },
          { label: temple.name },
        ]}
      />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          {temple.type === "jyotirlinga" ? "पावन द्वादश ज्योतिर्लिंग" : "प्रसिद्ध सनातन तीर्थ"} · {temple.state}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {temple.name}
        </h1>
        <div className="flex items-center justify-center gap-2 text-xs text-stone">
          <MapPin className="w-3.5 h-3.5 text-saffron" />
          <span>{temple.location}, {temple.state}</span>
          <span>·</span>
          <span>इष्टदेव: <strong>{temple.deity}</strong></span>
        </div>
      </div>

      <ContentActions
        title={temple.name}
        contentToCopy={`${temple.name}\nस्थान: ${temple.location}, ${temple.state}\nधार्मिक महत्त्व: ${temple.significance}\nदर्शन समय: ${temple.darshanTimings}\nआरती समय: ${temple.aartiTimings}\nपहुँचने का मार्ग: ${temple.howToReach}\n\n${getCitationString(temple.name, `/mandir/${temple.slug}`)}`}
      />

      {/* Significance Box */}
      <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-xl font-bold text-maroon flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-saffron" />
          <span>धार्मिक महत्त्व एवं पौराणिक मान्यता</span>
        </h3>
        <p className="text-charcoal text-sm sm:text-base leading-relaxed">
          {temple.significance}
        </p>
      </div>

      {/* History */}
      <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-xl font-bold text-maroon flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-saffron" />
          <span>ऐतिहासिक पृष्ठभूमि एवं मंदिर निर्माण</span>
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          {temple.history}
        </p>
      </div>

      {/* Darshan & Aarti Timings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cream border border-gold/25 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-maroon font-bold text-base mb-2">
            <Clock className="w-4 h-4 text-saffron" />
            <span>दर्शन समय सारिणी</span>
          </div>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            {temple.darshanTimings}
          </p>
        </div>

        <div className="bg-cream border border-gold/25 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-maroon font-bold text-base mb-2">
            <Clock className="w-4 h-4 text-saffron" />
            <span>आरती समय सारिणी</span>
          </div>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            {temple.aartiTimings}
          </p>
        </div>
      </div>

      {/* How to Reach */}
      <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-xl font-bold text-maroon flex items-center gap-2">
          <Car className="w-5 h-5 text-saffron" />
          <span>पहुँचने का मार्ग (How to Reach)</span>
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          {temple.howToReach}
        </p>
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/mandir"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य तीर्थ एवं मंदिर देखें
        </Link>
      </div>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}
