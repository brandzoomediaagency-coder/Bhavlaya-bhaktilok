import { NextResponse } from "next/server";
import { MANTRAS } from "@/data/devotionalData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deity = searchParams.get("deity");

  let data = [...MANTRAS];
  if (deity) {
    data = data.filter((m) => m.deityId === deity || m.deity.includes(deity));
  }

  return NextResponse.json({
    status: "success",
    count: data.length,
    data,
  });
}
