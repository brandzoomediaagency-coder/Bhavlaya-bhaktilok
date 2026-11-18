import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { RASHIS } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { Sparkles, ShieldAlert, ArrowLeft, Star, Heart, Compass } from "lucide-react";

interface Props {
  params: Promise<{ rashi: string }>;
}

export async function generateStaticParams() {
  return RASHIS.map((r) => ({ rashi: r.id }));
}

export async function generateMetadata({ params }: Props) {
  const { rashi: rashiId } = await params;
  const rashi = RASHIS.find((r) => r.id === rashiId);
  if (!rashi) return {};

  return {
    title: `${rashi.name} आज का राशिफल · शुभ अंक, रंग व आराधना मंत्र | ${brandConfig.nameHi}`,
    description: `${rashi.name} का आज का दैनिक वैदिक राशिफल, करियर, स्वास्थ्य, प्रेम संबंध, शुभ अंक, शुभ रंग और राशि स्वामी मंत्र ${brandConfig.nameHi} पर पढ़ें।`,
  };
}

export default async function RashifalDetailPage({ params }: Props) {
  const { rashi: rashiId } = await params;
  const rashi = RASHIS.find((r) => r.id === rashiId);
  if (!rashi) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "वैदिक राशिफल", href: "/rashifal" },
          { label: rashi.name },
        ]}
      />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="text-5xl block mb-2">{rashi.symbol}</span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {rashi.name} दैनिक राशिफल
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-stone">
          <span>स्वामी: <strong>{rashi.lord}</strong></span>
          <span>·</span>
          <span>तत्त्व: <strong>{rashi.element}</strong></span>
          <span>·</span>
          <span>शुभ अंक: <strong>{rashi.luckyNum}</strong></span>
          <span>·</span>
          <span>शुभ रंग: <strong>{rashi.luckyColor}</strong></span>
        </div>
      </div>

      <ContentActions
        title={`${rashi.name} दैनिक राशिफल`}
        contentToCopy={`${rashi.name} दैनिक राशिफल\nस्वामी: ${rashi.lord}\nशुभ अंक: ${rashi.luckyNum}\nशुभ रंग: ${rashi.luckyColor}\nइष्ट मंत्र: ${rashi.mantra}\n\n${getCitationString(`${rashi.name} दैनिक राशिफल`, `/rashifal/${rashi.id}`)}`}
      />

      {/* Daily Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-cream rounded-2xl border border-gold/25 space-y-2">
          <div className="flex items-center gap-2 text-maroon font-bold text-sm">
            <Star className="w-4 h-4 text-saffron" />
            <span>कार्यक्षेत्र एवं वित्त</span>
          </div>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            आज आपके प्रयासों में सकारात्मक ऊर्जा रहेगी। नए कार्यों की योजना के लिए दिन अनुकूल है। धैर्य एवं वाणी पर संयम रखें।
          </p>
        </div>

        <div className="p-5 bg-cream rounded-2xl border border-gold/25 space-y-2">
          <div className="flex items-center gap-2 text-maroon font-bold text-sm">
            <Heart className="w-4 h-4 text-saffron" />
            <span>पारिवारिक व संबंध</span>
          </div>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            परिजनों का स्नेह एवं सहयोग प्राप्त होगा। वरिष्ठों के परामर्श से घरेलू विषयों में शांति बनी रहेगी।
          </p>
        </div>

        <div className="p-5 bg-cream rounded-2xl border border-gold/25 space-y-2">
          <div className="flex items-center gap-2 text-maroon font-bold text-sm">
            <Compass className="w-4 h-4 text-saffron" />
            <span>स्वास्थ्य एवं मानसिक शांति</span>
          </div>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            प्रातःकाल ध्यान एवं सूर्य नमस्कार से ऊर्जा में वृद्धि होगी। खान-पान में सात्विकता बनाए रखें।
          </p>
        </div>
      </div>

      {/* Lucky Mantra Box */}
      <div className="p-6 bg-amber-50/80 border border-gold/30 rounded-2xl text-center space-y-2">
        <span className="text-xs text-saffron font-bold uppercase tracking-wider block">
          आज का राशि स्वामी इष्ट मंत्र
        </span>
        <p className="font-serif text-maroon text-xl sm:text-2xl font-bold leading-relaxed text-sanskrit">
          {rashi.mantra}
        </p>
        <p className="text-xs text-stone italic">
          प्रातः स्नान के उपरांत 11 या 108 बार इस मंत्र का स्मरण करें।
        </p>
      </div>

      {/* Astrology Responsible Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>धार्मिक व ज्योतिषीय अस्वीकरण:</strong> ज्योतिषीय भविष्यफल ग्रहों के सामान्य गोचर पर आधारित पारंपरिक मार्गदर्शन है। व्यक्तिगत निर्णय अपने विवेक से लें।
        </p>
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/rashifal"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          सभी 12 राशियां देखें
        </Link>
      </div>
    </div>
  );
}
