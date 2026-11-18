import { NextResponse } from "next/server";
import { searchDevotionalContent, getLiveSuggestions } from "@/lib/searchEngine";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";
  const category = searchParams.get("category") || "all";
  const mode = searchParams.get("mode") || "full"; // "full" or "suggest"
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  if (!q) {
    return NextResponse.json({
      status: "success",
      query: "",
      count: 0,
      results: [],
    });
  }

  if (mode === "suggest") {
    const suggestions = getLiveSuggestions(q, Math.min(limit, 8));
    return NextResponse.json({
      status: "success",
      query: q,
      count: suggestions.length,
      suggestions,
    });
  }

  const results = searchDevotionalContent(q, category);
  const pagedResults = results.slice(0, limit);

  return NextResponse.json({
    status: "success",
    query: q,
    category,
    totalCount: results.length,
    count: pagedResults.length,
    results: pagedResults,
  });
}
