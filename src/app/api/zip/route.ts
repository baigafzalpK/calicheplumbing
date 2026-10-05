import { NextResponse } from "next/server";
import { zipCoverage } from "@/content/coverage";

// GET /api/zip/?zip=12345 -> { covered, city?, state? }
export function GET(req: Request) {
  const zip = new URL(req.url).searchParams.get("zip") ?? "";
  if (!/^\d{5}$/.test(zip)) return NextResponse.json({ error: "Enter a 5-digit ZIP code." }, { status: 400 });
  const hit = zipCoverage(zip);
  return NextResponse.json(hit ? { covered: true, ...hit } : { covered: false }, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
