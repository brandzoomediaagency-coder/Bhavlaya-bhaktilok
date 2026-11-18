import Link from "next/link";
import { WifiOff, RefreshCw, Home, Sparkles, BookOpen } from "lucide-react";
import { brandConfig } from "@/config/brand";

export const metadata = {
  title: `आप ऑफलाइन हैं | ${brandConfig.nameHi}`,
  description: "इंटरनेट कनेक्शन उपलब्ध नहीं है। कृपया अपना नेटवर्क कनेक्शन जांचें।",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-saffron/10 border border-saffron/30 text-saffron flex items-center justify-center mx-auto shadow-inner">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-saffron" />
            <span>नेटवर्क कनेक्शन अनुपलब्ध</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
            आप अभी ऑफलाइन हैं
          </h1>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            इंटरनेट कनेक्शन उपलब्ध नहीं है। आपके द्वारा पूर्व में देखी गई सामग्री तथा स्थानीय रूप से सहेजे गए साधना टूल्स अभी भी कार्य कर सकते हैं।
          </p>
        </div>

        {/* Retry & Home Controls */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="px-5 py-2.5 bg-saffron hover:bg-saffron-light text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>पुनः प्रयास करें</span>
          </a>

          <Link
            href="/"
            className="px-5 py-2.5 bg-white border border-gold/30 hover:border-saffron text-charcoal font-medium text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>होमपेज</span>
          </Link>
        </div>

        {/* Offline Accessible Tools */}
        <div className="pt-6 border-t border-gold/15 text-left space-y-2.5">
          <span className="text-[11px] font-semibold text-stone uppercase tracking-wider block">
            ऑफलाइन भी उपलब्ध साधना टूल्स:
          </span>
          <div className="grid grid-cols-1 gap-2">
            <Link
              href="/tools/108-jap-mala-counter"
              className="p-3 rounded-xl bg-ivory border border-gold/15 hover:border-saffron flex items-center justify-between text-xs font-medium text-charcoal transition-colors group"
            >
              <span>108 जप माला काउंटर</span>
              <BookOpen className="w-3.5 h-3.5 text-stone group-hover:text-saffron" />
            </Link>
            <Link
              href="/chalisa/hanuman-chalisa"
              className="p-3 rounded-xl bg-ivory border border-gold/15 hover:border-saffron flex items-center justify-between text-xs font-medium text-charcoal transition-colors group"
            >
              <span>श्री हनुमान चालीसा (सुरक्षित पाठ)</span>
              <BookOpen className="w-3.5 h-3.5 text-stone group-hover:text-saffron" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
