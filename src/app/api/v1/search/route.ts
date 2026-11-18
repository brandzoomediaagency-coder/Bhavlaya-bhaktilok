import { NextResponse } from "next/server";
import {
  BHAJANS,
  MANTRAS,
  CHALISAS,
  AARTIS,
  TEMPLES,
  FESTIVALS,
  TOOLS,
  STOTRAS,
  ARTICLES,
  ENCYCLOPEDIA_ENTRIES,
} from "@/data/devotionalData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() || "";

  if (!q) {
    return NextResponse.json({ status: "success", count: 0, results: [] });
  }

  const results: { title: string; href: string; type: string; desc: string }[] = [];

  BHAJANS.forEach((b) => {
    if (b.title.toLowerCase().includes(q) || b.lyrics.toLowerCase().includes(q) || b.deity.toLowerCase().includes(q)) {
      results.push({ title: b.title, href: `/bhajan/${b.slug}`, type: "bhajan", desc: `${b.deity} · ${b.singer}` });
    }
  });

  MANTRAS.forEach((m) => {
    if (m.title.toLowerCase().includes(q) || m.sanskritText.toLowerCase().includes(q) || m.meaning.toLowerCase().includes(q)) {
      results.push({ title: m.title, href: `/mantra/${m.slug}`, type: "mantra", desc: `${m.deity} · ${m.meaning.slice(0, 80)}...` });
    }
  });

  CHALISAS.forEach((c) => {
    if (c.title.toLowerCase().includes(q) || c.deity.toLowerCase().includes(q)) {
      results.push({ title: c.title, href: `/chalisa/${c.slug}`, type: "chalisa", desc: c.significance });
    }
  });

  AARTIS.forEach((a) => {
    if (a.title.toLowerCase().includes(q) || a.lyrics.toLowerCase().includes(q) || a.deity.toLowerCase().includes(q)) {
      results.push({ title: a.title, href: `/aarti/${a.slug}`, type: "aarti", desc: a.significance });
    }
  });

  TEMPLES.forEach((t) => {
    if (t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) || t.deity.toLowerCase().includes(q)) {
      results.push({ title: t.name, href: `/mandir/${t.slug}`, type: "temple", desc: `${t.location}, ${t.state} · ${t.deity}` });
    }
  });

  FESTIVALS.forEach((f) => {
    if (f.name.toLowerCase().includes(q) || f.significance.toLowerCase().includes(q)) {
      results.push({ title: f.name, href: `/festivals/${f.slug}`, type: "festival", desc: `${f.date2026} · ${f.tithi}` });
    }
  });

  TOOLS.forEach((tool) => {
    if (tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q)) {
      results.push({ title: tool.name, href: `/tools/${tool.slug}`, type: "tool", desc: tool.description });
    }
  });

  STOTRAS.forEach((st) => {
    if (st.title.toLowerCase().includes(q) || st.significance.toLowerCase().includes(q) || st.deity.toLowerCase().includes(q)) {
      results.push({ title: st.title, href: `/stotra/${st.slug}`, type: "stotra", desc: `${st.deity} · ${st.composer}` });
    }
  });

  ARTICLES.forEach((art) => {
    if (art.title.toLowerCase().includes(q) || art.excerpt.toLowerCase().includes(q)) {
      results.push({ title: art.title, href: `/articles/${art.slug}`, type: "article", desc: art.excerpt });
    }
  });

  ENCYCLOPEDIA_ENTRIES.forEach((enc) => {
    if (enc.title.toLowerCase().includes(q) || enc.summary.toLowerCase().includes(q)) {
      results.push({ title: enc.title, href: `/encyclopedia/${enc.slug}`, type: "encyclopedia", desc: enc.summary });
    }
  });

  return NextResponse.json({
    status: "success",
    count: results.length,
    results,
  });
}
