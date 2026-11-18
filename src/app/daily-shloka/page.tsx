import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { brandConfig, getCitationString } from "@/config/brand";
import { Sparkles, BookOpen, Share2, ArrowLeft } from "lucide-react";

export const metadata = {
  title: `आज का पावन श्लोक (Daily Vedic Shloka) | ${brandConfig.nameHi}`,
  description: `प्रतिदिन एक पावन संस्कृत श्लोक, पदच्छेद, शब्दार्थ एवं जीवनोपयोगी हिंदी भावार्थ ${brandConfig.nameHi} पर।`,
};

export default function DailyShlokaPage() {
  const shloka = {
    title: "कर्मण्येवाधिकारस्ते (निष्काम कर्मयोग)",
    source: "श्रीमद्भगवद्गीता (अध्याय 2, श्लोक 47)",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "Karmaṇyevādhikāraste mā phaleṣu kadācana।\nMā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi॥",
    wordMeanings: [
      { word: "कर्मणि", meaning: "कर्म में" },
      { word: "एव", meaning: "ही" },
      { word: "अधिकारः", meaning: "अधिकार" },
      { word: "ते", meaning: "तुम्हारा" },
      { word: "मा", meaning: "नहीं" },
      { word: "फलेषु", meaning: "फलों में" },
      { word: "कदाचन", meaning: "कभी भी" },
      { word: "सङ्गः", meaning: "आसक्ति" },
      { word: "अकर्मणि", meaning: "अकर्म में" },
    ],
    meaning: "तुम्हारा अधिकार केवल कर्म करने में ही है, उसके फलों में कभी नहीं। इसलिए तुम कर्म के फल की वासना वाले मत बनो और न ही तुम्हारी आसक्ति कर्म न करने (अकर्मण्यता) में हो।",
    guidance: "आज के दिन अपने कार्य को पूर्ण एकाग्रता और ईमानदारी से करें, परिणाम की अनावश्यक चिंता को ईश्वर के चरणों में समर्पित कर दें।",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "आज का श्लोक" }]} />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          दैनिक स्वाध्याय · {shloka.source}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon">
          आज का पावन गीता श्लोक
        </h1>
      </div>

      <ContentActions
        title={shloka.title}
        contentToCopy={`${shloka.title}\n${shloka.source}\n\n${shloka.sanskrit}\n\nभावार्थ:\n${shloka.meaning}\n\n${getCitationString(shloka.title, "/daily-shloka")}`}
      />

      {/* Shloka Sacred Container */}
      <div className="bg-cream border-2 border-gold/40 rounded-3xl p-6 sm:p-10 shadow-card text-center space-y-4">
        <span className="text-xs font-bold text-saffron uppercase tracking-widest block">
          मूल संस्कृत श्लोक
        </span>
        <div className="font-serif text-maroon text-xl sm:text-2xl font-bold leading-loose whitespace-pre-line text-devanagari">
          {shloka.sanskrit}
        </div>
        <div className="text-xs sm:text-sm text-stone italic">
          {shloka.transliteration}
        </div>
      </div>

      {/* Word Meanings */}
      <div className="bg-cream border border-gold/25 rounded-2xl p-6 space-y-3">
        <h3 className="font-serif text-lg font-bold text-maroon">पदच्छेद एवं शब्दार्थ</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          {shloka.wordMeanings.map((wm, i) => (
            <div key={i} className="p-2 bg-ivory rounded-lg border border-gold/15">
              <strong className="text-saffron-dark">{wm.word}:</strong> <span className="text-stone">{wm.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full Meaning & Spiritual Guidance */}
      <div className="bg-cream border border-gold/30 rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-maroon mb-1">सम्पूर्ण भावार्थ:</h3>
          <p className="text-charcoal text-sm sm:text-base leading-relaxed">{shloka.meaning}</p>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-gold/20 text-xs sm:text-sm text-stone">
          <strong className="text-maroon block mb-1">आज का जीवन संदेश:</strong>
          {shloka.guidance}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm pt-4">
        <Link
          href="/granth/bhagavad-gita"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          सम्पूर्ण श्रीमद्भगवद्गीता पढ़ें
        </Link>
        <Link
          href="/status-maker"
          className="px-4 py-2 bg-saffron text-white rounded-xl text-xs font-semibold hover:bg-saffron-dark transition-colors"
        >
          श्लोक स्टेटस बनाएं
        </Link>
      </div>
    </div>
  );
}
