import Link from "next/link";
import { ArrowRight, Sparkles, Search, Compass, BookOpen } from "lucide-react";
import { searchDevotionalContent } from "@/lib/searchEngine";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

const CATEGORIES = [
  { id: "all", label: "सभी (All)" },
  { id: "bhajan", label: "भजन (Bhajan)" },
  { id: "mantra", label: "मंत्र (Mantra)" },
  { id: "aarti", label: "आरती (Aarti)" },
  { id: "chalisa", label: "चालीसा (Chalisa)" },
  { id: "stotra", label: "स्तोत्र (Stotra)" },
  { id: "mandir", label: "मंदिर (Mandir)" },
  { id: "festivals", label: "त्योहार व व्रत (Festivals)" },
  { id: "granth", label: "धर्म ग्रंथ (Granth)" },
  { id: "encyclopedia", label: "ज्ञानकोश (Encyclopedia)" },
  { id: "tools", label: "साधना टूल (Tools)" },
  { id: "rashifal", label: "राशिफल (Rashifal)" },
];

export async function SearchResults({ searchParams }: Props) {
  const { q = "", category = "all" } = await searchParams;
  const rawQuery = q.trim();

  const results = rawQuery ? searchDevotionalContent(rawQuery, category) : [];

  if (!rawQuery) {
    return (
      <div className="text-center py-12 bg-cream rounded-2xl border border-gold/20 p-8">
        <Search className="w-10 h-10 text-saffron/40 mx-auto mb-3" />
        <h3 className="font-serif text-lg font-bold text-maroon">
          खोज प्रारंभ करने के लिए कोई शब्द दर्ज करें
        </h3>
        <p className="text-stone text-sm mt-1 max-w-md mx-auto">
          आप हिन्दी (देवनागरी), हिंग्लिश अथवा अंग्रेजी में खोज सकते हैं। जैसे: &ldquo;हनुमान चालीसा&rdquo;, &ldquo;shiv aarti&rdquo;, &ldquo;mahadev&rdquo;, &ldquo;krishna bhajan&rdquo;।
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["हनुमान चालीसा", "शिव आरती", "महामृत्युंजय मंत्र", "कृष्ण भजन", "निर्जला एकादशी", "ब्रह्म मुहूर्त"].map((popular) => (
            <Link
              key={popular}
              href={`/search?q=${encodeURIComponent(popular)}`}
              className="px-3 py-1.5 rounded-full bg-ivory border border-gold/30 text-xs text-charcoal hover:border-saffron hover:text-saffron transition-colors"
            >
              {popular}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {CATEGORIES.map((cat) => {
          const isActive = (category || "all") === cat.id;
          return (
            <Link
              key={cat.id}
              href={`/search?q=${encodeURIComponent(rawQuery)}&category=${cat.id}`}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors border ${
                isActive
                  ? "bg-saffron text-white border-saffron font-medium shadow-xs"
                  : "bg-cream text-stone hover:text-charcoal border-gold/20 hover:border-saffron/50"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* Result Count Status */}
      <div className="flex justify-between items-center text-xs text-stone pb-2 border-b border-gold/15">
        <span>
          &ldquo;<strong className="text-charcoal">{rawQuery}</strong>&rdquo; {category !== "all" ? `(${category}) ` : ""}के परिणाम:
        </span>
        <span className="font-bold text-maroon">
          {results.length} प्रामाणिक परिणाम प्राप्त हुए
        </span>
      </div>

      {/* Results List */}
      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((res) => (
            <Link
              key={res.id}
              href={res.href}
              className="p-5 rounded-2xl bg-cream border border-gold/20 hover:border-saffron hover:shadow-card transition-all flex items-start justify-between group block"
            >
              <div className="space-y-1.5 pr-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-saffron/10 text-saffron-dark text-[11px] font-semibold">
                    {res.categoryHi}
                  </span>
                  {res.deity && (
                    <span className="text-[11px] text-stone">
                      देवता: <strong className="text-charcoal font-medium">{res.deity}</strong>
                    </span>
                  )}
                  {res.score > 200 && (
                    <span className="flex items-center gap-1 text-[10px] text-amber-700 font-semibold px-2 py-0.5 rounded-full bg-amber-100">
                      <Sparkles className="w-2.5 h-2.5" /> सटीक मिलान
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-maroon group-hover:text-saffron transition-colors">
                  {res.titleHi}
                  {res.title && res.title !== res.titleHi && (
                    <span className="ml-2 font-sans text-xs text-stone font-normal">
                      ({res.title})
                    </span>
                  )}
                </h3>

                <p className="text-xs sm:text-sm text-stone line-clamp-2 leading-relaxed">
                  {res.snippet || res.description}
                </p>
              </div>

              <div className="w-9 h-9 rounded-full bg-ivory border border-gold/25 flex items-center justify-center shrink-0 group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-all">
                <ArrowRight className="w-4 h-4 text-stone group-hover:text-white transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-cream rounded-2xl border border-gold/20 p-8">
          <p className="font-serif text-base font-bold text-maroon">
            &ldquo;{rawQuery}&rdquo; के लिए कोई सीधा परिणाम नहीं मिला।
          </p>
          <p className="text-stone text-xs sm:text-sm mt-2 max-w-md mx-auto">
            कृपया वर्तनी की जाँच करें अथवा सामान्य शब्द का प्रयोग करें। आप नीचे दिए गए लोकप्रिय विषयों में से चुन सकते हैं:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["हनुमान चालीसा", "शिव आरती", "महामृत्युंजय मंत्र", "कृष्ण भजन", "निर्जला एकादशी", "ब्रह्म मुहूर्त"].map((popular) => (
              <Link
                key={popular}
                href={`/search?q=${encodeURIComponent(popular)}`}
                className="px-3 py-1.5 rounded-full bg-ivory border border-gold/30 text-xs text-charcoal hover:border-saffron hover:text-saffron transition-colors"
              >
                {popular}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
