import { NextResponse } from "next/server";
import { BHAJANS } from "@/data/devotionalData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deity = searchParams.get("deity");
  const query = searchParams.get("q")?.toLowerCase();

  let data = [...BHAJANS];

  if (deity) {
    data = data.filter((b) => b.deityId === deity || b.deity.includes(deity));
  }

  if (query) {
    data = data.filter((b) => b.title.toLowerCase().includes(query) || b.lyrics.toLowerCase().includes(query));
  }

  return NextResponse.json({
    status: "success",
    count: data.length,
    data,
  });
}
