import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BHAJANS, MANTRAS, CHALISAS, AARTIS, TEMPLES, FESTIVALS, TOOLS, STOTRAS, ARTICLES, ENCYCLOPEDIA_ENTRIES } from "@/data/devotionalData";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function SearchResults({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  const results: { title: string; href: string; type: string; desc: string }[] = [];

  if (query) {
    BHAJANS.forEach((b) => {
      if (b.title.toLowerCase().includes(query) || b.lyrics.toLowerCase().includes(query) || b.deity.toLowerCase().includes(query)) {
        results.push({ title: b.title, href: `/bhajan/${b.slug}`, type: "भजन", desc: `${b.deity} · ${b.singer}` });
      }
    });

    MANTRAS.forEach((m) => {
      if (m.title.toLowerCase().includes(query) || m.sanskritText.toLowerCase().includes(query) || m.meaning.toLowerCase().includes(query)) {
        results.push({ title: m.title, href: `/mantra/${m.slug}`, type: "मंत्र", desc: `${m.deity} · ${m.meaning.slice(0, 80)}...` });
      }
    });

    CHALISAS.forEach((c) => {
      if (c.title.toLowerCase().includes(query) || c.deity.toLowerCase().includes(query)) {
        results.push({ title: c.title, href: `/chalisa/${c.slug}`, type: "चालीसा", desc: c.significance });
      }
    });

    AARTIS.forEach((a) => {
      if (a.title.toLowerCase().includes(query) || a.lyrics.toLowerCase().includes(query) || a.deity.toLowerCase().includes(query)) {
        results.push({ title: a.title, href: `/aarti/${a.slug}`, type: "आरती", desc: a.significance });
      }
    });

    TEMPLES.forEach((t) => {
      if (t.name.toLowerCase().includes(query) || t.location.toLowerCase().includes(query) || t.deity.toLowerCase().includes(query)) {
        results.push({ title: t.name, href: `/mandir/${t.slug}`, type: "मंदिर", desc: `${t.location}, ${t.state} · ${t.deity}` });
      }
    });

    FESTIVALS.forEach((f) => {
      if (f.name.toLowerCase().includes(query) || f.significance.toLowerCase().includes(query)) {
        results.push({ title: f.name, href: `/festivals/${f.slug}`, type: "त्योहार", desc: `${f.date2026} · ${f.tithi}` });
      }
    });

    TOOLS.forEach((tool) => {
      if (tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query)) {
        results.push({ title: tool.name, href: `/tools/${tool.slug}`, type: "साधन", desc: tool.description });
      }
    });

    STOTRAS.forEach((st) => {
      if (st.title.toLowerCase().includes(query) || st.significance.toLowerCase().includes(query) || st.deity.toLowerCase().includes(query)) {
        results.push({ title: st.title, href: `/stotra/${st.slug}`, type: "स्तोत्र", desc: `${st.deity} · ${st.composer}` });
      }
    });

    ARTICLES.forEach((art) => {
      if (art.title.toLowerCase().includes(query) || art.excerpt.toLowerCase().includes(query)) {
        results.push({ title: art.title, href: `/articles/${art.slug}`, type: "आलेख", desc: art.excerpt });
      }
    });

    ENCYCLOPEDIA_ENTRIES.forEach((enc) => {
      if (enc.title.toLowerCase().includes(query) || enc.summary.toLowerCase().includes(query)) {
        results.push({ title: enc.title, href: `/encyclopedia/${enc.slug}`, type: "ज्ञानकोश", desc: enc.summary });
      }
    });
  }

  if (!query) {
    return (
      <div className="text-center py-8 text-stone text-sm">
        कृपया कोई खोज शब्द दर्ज करें।
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs text-stone pb-2 border-b border-gold/15">
        <span>&ldquo;{q}&rdquo; के लिए परिणाम:</span>
        <span className="font-bold text-maroon">{results.length} परिणाम प्राप्त हुए</span>
      </div>

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((res, idx) => (
            <Link
              key={idx}
              href={res.href}
              className="p-5 rounded-2xl bg-cream border border-gold/20 hover:border-saffron hover:shadow-card transition-all flex items-start justify-between group block"
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded-md bg-saffron/10 text-saffron-dark text-[10px] font-semibold mb-1">
                  {res.type}
                </span>
                <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-maroon">
                  {res.title}
                </h3>
                <p className="text-xs text-stone mt-1 leading-relaxed line-clamp-2">
                  {res.desc}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-stone group-hover:text-saffron transition-transform group-hover:translate-x-1 shrink-0 ml-4 mt-2" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-cream rounded-2xl border border-gold/20">
          <p className="text-stone text-sm">
            &ldquo;{q}&rdquo; के लिए कोई सामग्री नहीं मिली। कृपया वर्तनी जांचें अथवा अन्य शब्द से खोजें।
          </p>
        </div>
      )}
    </div>
  );
}
