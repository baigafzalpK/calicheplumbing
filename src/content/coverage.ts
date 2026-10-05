import "server-only";
import zips from "@/data/geo/zips.json";

// Plumbing coverage for all states, from the LeadSmart coverage export (see scripts/build-geo.mjs).
// Server-side only: the ZIP checker and lead form ask /api/zip/ instead of shipping 24k ZIPs to the browser.
export const coverageDate = "2026-10-04";

const index = zips as Record<string, string>;

export function zipCoverage(zip: string) {
  const hit = index[zip];
  if (!hit) return null;
  const [city, state] = hit.split("|");
  return { city, state };
}
