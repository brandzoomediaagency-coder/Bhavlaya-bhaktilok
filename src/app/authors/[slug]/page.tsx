import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AUTHORS, ARTICLES } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { User, BookOpen, Clock, ArrowRight, ArrowLeft, Award } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) return {};

  return {
    title: `${author.name} (संपादकीय लेखक प्रोफाइल) | ${brandConfig.nameHi}`,
    description: author.bio,
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) notFound();

  const authorArticles = ARTICLES.filter((a) => a.authorId === author.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[
          { label: "संपादकीय मंडल", href: "/authors" },
          { label: author.name },
        ]}
      />

      <div className="bg-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="w-20 h-20 rounded-full bg-saffron/15 text-saffron-dark font-serif text-4xl font-bold flex items-center justify-center shrink-0">
          {author.name.charAt(0)}
        </div>
        <div className="space-y-2">
          <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
            {author.role}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
            {author.name}
          </h1>
          <p className="text-stone text-sm leading-relaxed">{author.bio}</p>
          <div className="flex items-center gap-2 text-xs text-stone-light pt-1">
            <Award className="w-4 h-4 text-saffron" />
            <span>शैक्षणिक योग्यता: {author.credentials}</span>
          </div>
        </div>
      </div>

      {/* Author's Articles */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-maroon border-b border-gold/20 pb-3">
          {author.name} द्वारा लिखित आलेख
        </h2>

        <div className="space-y-4">
          {authorArticles.map((art) => (
            <Link
              key={art.id}
              href={`/articles/${art.slug}`}
              className="group block bg-cream border border-gold/20 rounded-2xl p-6 hover:shadow-card hover:border-gold/50 transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <span className="text-xs text-saffron font-medium">{art.category}</span>
                  <h3 className="font-serif text-xl font-bold text-maroon group-hover:text-saffron transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-stone text-xs sm:text-sm line-clamp-2">{art.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-stone-light pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readingTimeMinutes} मिनट
                    </span>
                    <span>·</span>
                    <span>{art.publishedDate}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-saffron group-hover:translate-x-1 transition-transform shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-gold/20">
        <Link
          href="/authors"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          सभी संपादकीय लेखक देखें
        </Link>
      </div>
    </div>
  );
}
