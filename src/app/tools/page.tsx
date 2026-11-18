import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TOOLS } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { Sparkles, ArrowRight, CircleDot, Bell, CheckSquare, Sunrise, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: `आध्यात्मिक डिजिटल साधन (Spiritual Tools Directory) | ${brandConfig.nameHi}`,
  description: `108 जप माला काउंटर, डिजिटल मंदिर घंटी, शंख नाद, दैनिक पूजा चेकलिस्ट, ब्रह्म मुहूर्त गणक, चौघड़िया एवं वैदिक नाम खोजक — ${brandConfig.nameHi} पर।`,
};

export default function ToolsListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "आध्यात्मिक डिजिटल साधन" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-saffron" />
          <span>साधना व दैनिक पूजा सहायक</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          आध्यात्मिक डिजिटल साधन निर्देशिका
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          दैनिक पूजा, मंत्र जप, मुहूर्त गणना और साधना को सुगम बनाने के लिए आधुनिक तकनीक और सनातन परंपरा का पावन संगम।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <article
            key={tool.id}
            className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center mb-4 group-hover:bg-saffron group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[11px] text-saffron font-semibold uppercase tracking-wider block mb-1">
                {tool.category}
              </span>
              <h2 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron-dark transition-colors mb-2">
                <Link href={`/tools/${tool.slug}`}>
                  {tool.name}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-stone leading-relaxed mb-4">
                {tool.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs">
              <span className="text-green-700 font-medium">✓ क्रियाशील साधन</span>
              <Link
                href={`/tools/${tool.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-maroon hover:bg-maroon-light text-white font-medium transition-colors inline-flex items-center gap-1 shadow-2xs"
              >
                <span>उपयोग करें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
