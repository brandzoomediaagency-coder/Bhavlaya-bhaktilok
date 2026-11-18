import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { ShieldCheck, FileText, Music, Sparkles, BookOpen, MapPin, Users, Settings, Database, CheckCircle, Clock } from "lucide-react";

export const metadata = {
  title: `प्रशासनिक नियंत्रण कक्ष (Admin CMS Dashboard) | ${brandConfig.nameHi}`,
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  const stats = [
    { label: "कुल भजन सामग्री", count: "10,232", icon: Music, status: "सत्यापित" },
    { label: "सिद्ध मंत्र", count: "93", icon: Sparkles, status: "सत्यापित" },
    { label: "चालीसा व स्तोत्र", count: "24", icon: BookOpen, status: "सत्यापित" },
    { label: "मंदिर व तीर्थ", count: "91", icon: MapPin, status: "सत्यापित" },
    { label: "पर्व व व्रत", count: "47", icon: Clock, status: "सत्यापित" },
    { label: "डिजिटल साधन", count: "12", icon: Settings, status: "सक्रिय" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gold/20 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-saffron uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-maroon" />
            <span>{brandConfig.nameHi} CMS & संपादकीय नियंत्रण कक्ष</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-maroon">
            प्रशासनिक नियंत्रण कक्ष (Admin Dashboard)
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            प्रणाली सक्रिय (Production Ready)
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-4 bg-cream rounded-2xl border border-gold/20 shadow-xs">
              <Icon className="w-5 h-5 text-saffron mb-2" />
              <span className="text-2xl font-bold font-serif text-maroon block leading-none">
                {s.count}
              </span>
              <span className="text-xs text-stone font-medium block mt-1">
                {s.label}
              </span>
              <span className="text-[10px] text-green-700 font-semibold block mt-1">
                ✓ {s.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Workflow & Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Content Modules */}
        <div className="lg:col-span-8 bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
          <h2 className="font-serif text-xl font-bold text-maroon pb-2 border-b border-gold/15">
            सामग्री प्रबंधन मॉड्यूल (Content Management)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-ivory rounded-xl border border-gold/15 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-maroon">भजन प्रबंधन</h3>
                <span className="text-xs text-saffron font-medium">10,232 प्रविष्टियां</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                गीत के बोल, रचयिता, गायक, श्रेणी, देवता संबंध एवं यूट्यूब ऑडियो लिंक।
              </p>
            </div>

            <div className="p-4 bg-ivory rounded-xl border border-gold/15 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-maroon">मंत्र व स्तोत्र</h3>
                <span className="text-xs text-saffron font-medium">93 मंत्र</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                संस्कृत श्लोक, पदच्छेद, शब्द-दर-शब्द अर्थ, जप संख्या एवं वेद संदर्भ।
              </p>
            </div>

            <div className="p-4 bg-ivory rounded-xl border border-gold/15 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-maroon">पंचांग एवं मुहूर्त</h3>
                <span className="text-xs text-green-700 font-medium">खगोलीय गणना सक्रिय</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                दृक गणित आधारित सूर्योदय, सूर्यास्त, राहुकाल एवं चौघड़िया समय सारिणी।
              </p>
            </div>

            <div className="p-4 bg-ivory rounded-xl border border-gold/15 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-maroon">तीर्थ एवं मंदिर</h3>
                <span className="text-xs text-saffron font-medium">91 मंदिर</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                द्वादश ज्योतिर्लिंग, शक्तिपीठ, चार धाम, दर्शन समय, आरती समय एवं मार्ग।
              </p>
            </div>
          </div>
        </div>

        {/* Roles & Editorial Workflow */}
        <div className="lg:col-span-4 bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
          <h2 className="font-serif text-xl font-bold text-maroon pb-2 border-b border-gold/15">
            संपादकीय कार्यप्रवाह (Workflow)
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-ivory rounded-xl border border-gold/15">
              <span className="font-bold text-stone">1. प्रारूप (Draft)</span>
              <span className="text-stone">लेखक द्वारा रचना</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-gold/25">
              <span className="font-bold text-amber-900">2. समीक्षा (Review)</span>
              <span className="text-amber-800">शास्त्रीय सत्यापन</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="font-bold text-blue-900">3. स्वीकृत (Approved)</span>
              <span className="text-blue-800">संपादक अनुमोदन</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
              <span className="font-bold text-green-900">4. प्रकाशित (Published)</span>
              <span className="text-green-800">सार्वजनिक व अनुक्रमित</span>
            </div>
          </div>

          <div className="pt-2 text-xs text-stone/80">
            <p><strong>प्रौद्योगिकी संरचना:</strong> Supabase PostgreSQL + Row Level Security (RLS) सक्षम।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
