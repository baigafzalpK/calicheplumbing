import { NextResponse } from "next/server";
import { cities, cityServices } from "@/content/locations";
import { cityQuality, cityServiceQuality } from "@/lib/quality";

export const dynamic = "force-dynamic";

// Dev only: every location page and whether the quality gate allows indexing.
export function GET() {
  if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    cities: cities.map((c) => ({ slug: c.slug, ...cityQuality(c) })),
    cityServices: cityServices.map((cs) => ({ slug: `${cs.citySlug}/${cs.serviceSlug}`, ...cityServiceQuality(cs) })),
  });
}
