import { Suspense } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/config/brand";
import { Search } from "lucide-react";
import { SearchResults } from "./SearchResults";

export const metadata = {
  title: `खोजें (Search) · भजन, मंत्र, आरती, चालीसा, मंदिर एवं पंचांग | ${brandConfig.nameHi}`,
  description: `${brandConfig.nameHi} संपूर्ण सर्च इंजन। भजन, मंत्र, आरती, चालीसा, मंदिर, ग्रंथ, त्योहार एवं पंचांग सामग्री में तत्काल खोजें।`,
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "खोज परिणाम" }]} />

      {/* Search Header Form */}
      <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-card">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon mb-4">
          {brandConfig.nameHi} सर्वव्यापी खोज
        </h1>
        <form method="GET" action="/search" className="relative">
          <Search className="w-5 h-5 text-stone absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            name="q"
            placeholder="भजन, मंत्र, आरती, चालीसा, मंदिर या त्योहार खोजें..."
            className="w-full pl-12 pr-28 py-3.5 bg-ivory border border-gold/30 rounded-2xl text-charcoal text-base focus:outline-none focus:ring-2 focus:ring-saffron"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-saffron hover:bg-saffron-light text-white font-medium text-sm rounded-xl transition-all shadow-xs"
          >
            खोजें
          </button>
        </form>

        {/* Popular Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone">लोकप्रिय खोजें:</span>
          {["हनुमान चालीसा", "गायत्री मंत्र", "काशी विश्वनाथ", "महाशिवरात्रि", "अच्युतम केशवं", "जप माला"].map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="px-3 py-1 bg-saffron/10 text-saffron-dark rounded-full hover:bg-saffron hover:text-white transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      {/* Results wrapped in Suspense */}
      <Suspense fallback={<div className="text-center py-8 text-stone">खोज जारी है...</div>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
