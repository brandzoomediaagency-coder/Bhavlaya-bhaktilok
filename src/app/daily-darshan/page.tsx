import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { Sparkles, Heart, Share2, Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: `आज का दिव्य दर्शन (Daily Darshan & Inspiration) | ${brandConfig.nameHi}`,
  description: `आज का पावन देव दर्शन, प्रमुख मंदिरों के मंगला दर्शन एवं दैनिक आध्यात्मिक प्रेरणा ${brandConfig.nameHi} पर।`,
};

export default function DailyDarshanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "दैनिक दिव्य दर्शन" }]} />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          आज का मंगल दर्शन · बुधवार, 18 नवंबर 2026
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon">
          श्री काशी विश्वनाथ ज्योतिर्लिंग प्रातः दर्शन
        </h1>
        <p className="text-stone text-sm sm:text-base max-w-xl mx-auto">
          &ldquo;सत्यं शिवं सुन्दरम् — देवाधिदेव महादेव आपके जीवन में शांति, सुख और आरोग्य प्रदान करें।&rdquo;
        </p>
      </div>

      {/* Main Darshan Display Card */}
      <div className="bg-cream border-2 border-gold/40 rounded-3xl p-6 sm:p-10 shadow-card text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-saffron/15 text-saffron-dark font-serif text-5xl font-bold flex items-center justify-center mx-auto shadow-inner">
          🕉️
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-saffron tracking-widest uppercase block">
            प्रातः मंगला आरती दर्शन
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
            श्री विश्वेश्वर महादेव (वाराणसी)
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs text-stone">
            <MapPin className="w-3.5 h-3.5 text-saffron" />
            <span>दशाश्वमेध घाट, वाराणसी, उत्तर प्रदेश</span>
          </div>
        </div>

        <div className="bg-ivory border border-gold/20 rounded-2xl p-6 max-w-lg mx-auto space-y-3">
          <span className="text-xs font-bold text-saffron block">॥ दैनिक शिव संकल्प मंत्र ॥</span>
          <p className="font-serif text-maroon text-lg font-bold leading-relaxed">
            ॐ नमः शम्भवाय च मयोभवाय च नमः शङ्कराय च मयस्कराय च नमः शिवाय च शिवतराय च॥
          </p>
          <p className="text-stone text-xs leading-relaxed">
            भावार्थ: सुख और आनंद के दाता, कल्याण करने वाले परम पावन शिव और अत्यंत मंगलकारी महादेव को बारंबार नमस्कार है।
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/status-maker"
            className="px-5 py-2.5 rounded-xl bg-saffron text-white text-xs font-semibold hover:bg-saffron-dark transition-colors shadow-xs"
          >
            दर्शन स्टेटस बनाएं
          </Link>
          <Link
            href="/mandir/shri-kashi-vishwanath-varanasi"
            className="px-5 py-2.5 rounded-xl bg-ivory border border-gold/40 text-maroon text-xs font-semibold hover:border-gold transition-colors"
          >
            मंदिर इतिहास व आरती समय
          </Link>
        </div>
      </div>
    </div>
  );
}
