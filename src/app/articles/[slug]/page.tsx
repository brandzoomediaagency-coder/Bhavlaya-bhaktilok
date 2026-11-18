import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { ARTICLES, AUTHORS } from "@/data/devotionalData";
import { brandConfig, getCitationString } from "@/config/brand";
import { Clock, User, BookOpen, ArrowLeft, ShieldCheck, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | ${brandConfig.nameHi}`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const author = AUTHORS.find((a) => a.id === article.authorId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "सनातन आलेख", href: "/articles" },
          { label: article.title },
        ]}
      />

      {/* Article Header */}
      <div className="space-y-4 pb-6 border-b border-gold/20">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark font-semibold uppercase tracking-wider">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-stone">
            <Clock className="w-3.5 h-3.5 text-saffron" />
            {article.readingTimeMinutes} मिनट पठन समय
          </span>
          <span className="text-stone">·</span>
          <span className="text-stone">प्रकाशित: {article.publishedDate}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon leading-tight">
          {article.title}
        </h1>

        {author && (
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center text-saffron font-bold">
              {author.name.charAt(0)}
            </div>
            <div>
              <Link href={`/authors/${author.slug}`} className="font-semibold text-charcoal text-sm hover:text-saffron block">
                {author.name}
              </Link>
              <span className="text-xs text-stone">{author.role}</span>
            </div>
          </div>
        )}
      </div>

      <ContentActions
        title={article.title}
        contentToCopy={`${article.title}\n\n${article.excerpt}\n\n${article.content}\n\n${getCitationString(article.title, `/articles/${article.slug}`)}`}
      />

      {/* Table of Contents */}
      {article.tableOfContents.length > 0 && (
        <div className="bg-cream border border-gold/25 rounded-2xl p-6 space-y-3">
          <span className="font-serif text-sm font-bold text-maroon uppercase tracking-wider block">
            विषय सूची (Table of Contents)
          </span>
          <ul className="space-y-2 text-xs sm:text-sm">
            {article.tableOfContents.map((toc, idx) => (
              <li key={idx} className="flex items-center gap-2 text-stone hover:text-saffron transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                <a href={`#${toc.id}`}>{toc.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Body */}
      <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-card">
        <div
          id="devotional-content-body"
          className="prose-bhavlaya font-devanagari text-charcoal text-base sm:text-lg leading-loose space-y-6 whitespace-pre-line select-text"
        >
          {article.content}
        </div>
      </div>

      {/* Sources & Citations */}
      {article.sources.length > 0 && (
        <div className="bg-ivory border border-gold/25 rounded-2xl p-6 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-maroon">
            <ShieldCheck className="w-4 h-4 text-saffron" />
            <span>शास्त्रीय संदर्भ एवं शोध स्रोत (Citations)</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-stone">
            {article.sources.map((src, idx) => (
              <li key={idx}>{src}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Author Bio Box */}
      {author && (
        <div className="p-6 bg-cream rounded-2xl border border-gold/30 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-14 h-14 rounded-full bg-saffron/15 text-saffron-dark font-serif text-2xl font-bold flex items-center justify-center shrink-0">
            {author.name.charAt(0)}
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="text-[11px] font-semibold text-saffron uppercase tracking-wider block">लेखक परिचय</span>
            <h4 className="font-serif text-lg font-bold text-maroon">{author.name}</h4>
            <p className="text-stone leading-relaxed">{author.bio}</p>
            <span className="text-stone-light text-xs block pt-1">योग्यता: {author.credentials}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य आलेख देखें
        </Link>
      </div>
    </div>
  );
}
