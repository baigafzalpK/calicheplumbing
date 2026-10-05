import { NextResponse } from "next/server";
import { allCityPages, allCityServices, getCityPage } from "@/lib/geo";
import { cityQuality, cityServiceQuality } from "@/lib/quality";

export const dynamic = "force-dynamic";

// Dev only: every location page and whether the quality gate allows indexing.
export function GET() {
  if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    cities: allCityPages().map((c) => ({ slug: `${c.stateSlug}/${c.slug}`, curated: c.curated !== false, ...cityQuality(c) })),
    cityServices: allCityServices().map((cs) => ({
      slug: `${cs.stateSlug}/${cs.citySlug}/${cs.serviceSlug}`,
      ...cityServiceQuality(cs, getCityPage(cs.stateSlug, cs.citySlug)),
    })),
  });
}
