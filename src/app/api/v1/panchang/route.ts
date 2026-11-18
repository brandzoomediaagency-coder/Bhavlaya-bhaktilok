import { NextResponse } from "next/server";
import { calculatePanchang, CITIES } from "@/lib/panchangEngine";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityParam = searchParams.get("city") || "New Delhi";
  const dateParam = searchParams.get("date");

  const city = CITIES.find((c) => c.name.toLowerCase() === cityParam.toLowerCase() || c.nameHi === cityParam) || CITIES[0];
  const date = dateParam ? new Date(dateParam) : new Date();

  const panchang = calculatePanchang(date, city);

  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    data: panchang,
  });
}
