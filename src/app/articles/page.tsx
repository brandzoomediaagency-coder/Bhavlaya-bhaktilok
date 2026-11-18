import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ARTICLES, AUTHORS } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { BookOpen, Clock, User, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: `सनातन आलेख एवं ज्ञान मंच (Spiritual Articles & Blog) | ${brandConfig.nameHi}`,
  description: `सनातन धर्म, दर्शन, पुराण, मंदिर इतिहास, उत्सव एवं आध्यात्मिक जीवन शैली पर प्रमाणिक एवं शोधपूर्ण आलेख ${brandConfig.nameHi} पर पढ़ें।`,
};

export default function ArticlesListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "सनातन ज्ञान आलेख" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-saffron" />
          <span>शोधपूर्ण सनातन विमर्श</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          सनातन धर्म एवं आध्यात्मिक आलेख
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          धर्मग्रंथों, पावन तीर्थों, जीवन दर्शन और सनातन परंपराओं के वैज्ञानिक व दार्शनिक पहलुओं पर विशेषज्ञों द्वारा लिखित प्रामाणिक आलेख।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARTICLES.map((art) => {
          const author = AUTHORS.find((a) => a.id === art.authorId);
          return (
            <article
              key={art.id}
              className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 hover:shadow-card-hover hover:border-gold/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between text-xs text-stone gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark font-medium">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-saffron" />
                      {art.readingTimeMinutes} मिनट पठन
                    </span>
                    <span>·</span>
                    <span>{art.publishedDate}</span>
                  </div>
                </div>

                <Link href={`/articles/${art.slug}`}>
                  <h2 className="font-serif text-2xl font-bold text-maroon hover:text-saffron transition-colors leading-snug">
                    {art.title}
                  </h2>
                </Link>

                <p className="text-stone text-sm leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>

                {author && (
                  <div className="flex items-center gap-2 pt-2 text-xs text-stone">
                    <User className="w-3.5 h-3.5 text-saffron" />
                    <span>लेखक: <strong className="text-charcoal">{author.name}</strong></span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-saffron mt-6">
                <div className="flex flex-wrap gap-1.5">
                  {art.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="bg-ivory px-2 py-0.5 rounded text-stone text-[11px]">
                      #{t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/articles/${art.slug}`}
                  className="inline-flex items-center gap-1 hover:text-saffron-dark transition-colors"
                >
                  <span>पूरा पढ़ें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
