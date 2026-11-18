import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AUTHORS, ARTICLES } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { Users, Award, BookOpen, ArrowRight } from "lucide-react";

export const metadata = {
  title: `संपादकीय मंडल एवं विद्वान लेखक (Editorial Board & Authors) | ${brandConfig.nameHi}`,
  description: `${brandConfig.nameHi} के विद्वान लेखक, संस्कृत शोधकर्ता एवं संपादकीय सलाहकार मंडल का परिचय।`,
};

export default function AuthorsListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "संपादकीय मंडल" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Users className="w-3.5 h-3.5 text-saffron" />
          <span>प्रामाणिक विद्वान मंडल</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {brandConfig.nameHi} संपादकीय मंडल व लेखक
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          हमारे समस्त आलेख, मंत्र, श्लोक और कथाएं संस्कृत एवं वैदिक संस्कृति के आधिकारिक विद्वानों और शोधकर्ताओं द्वारा परीक्षित व सत्यापित हैं।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {AUTHORS.map((author) => {
          const authorArticles = ARTICLES.filter((a) => a.authorId === author.id);
          return (
            <div
              key={author.id}
              className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-5 shadow-card"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-saffron/15 text-saffron-dark font-serif text-3xl font-bold flex items-center justify-center shrink-0">
                  {author.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-maroon">{author.name}</h3>
                  <p className="text-saffron-dark text-xs font-semibold">{author.role}</p>
                  <p className="text-xs text-stone-light">योग्यता: {author.credentials}</p>
                </div>
              </div>

              <p className="text-stone text-sm leading-relaxed">
                {author.bio}
              </p>

              <div className="pt-4 border-t border-gold/15 flex items-center justify-between text-xs">
                <span className="font-medium text-charcoal">
                  कुल प्रकाशित आलेख: <strong className="text-saffron">{author.articlesCount}</strong>
                </span>
                <Link
                  href={`/authors/${author.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-saffron hover:text-saffron-dark"
                >
                  <span>आलेख देखें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
