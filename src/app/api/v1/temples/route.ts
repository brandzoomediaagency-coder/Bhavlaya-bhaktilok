import { NextResponse } from "next/server";
import { TEMPLES } from "@/data/devotionalData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let data = [...TEMPLES];
  if (type) {
    data = data.filter((t) => t.type === type);
  }

  return NextResponse.json({
    status: "success",
    count: data.length,
    data,
  });
}
