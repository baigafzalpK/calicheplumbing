import "server-only";
import type { City, CityService } from "@/content/types";
import { getService } from "@/content/services";
import { cityBySlug } from "@/content/locations";

// Programmatic-SEO quality gate. Fix failures by writing real local content, never by lowering thresholds.
const words = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;

export function cityQuality(c: City) {
  const localWords =
    words(c.intro) + words(c.housingNotes) + c.localIssues.reduce((n, i) => n + words(i.body), 0) + words(c.water) + words(c.permits);
  const reasons: string[] = [];
  if (localWords < 180) reasons.push(`local copy ${localWords} < 180 words`);
  if (c.localIssues.length < 2) reasons.push("fewer than 2 local issues");
  if (c.zips.length < 1) reasons.push("no ZIPs");
  if (c.popularServices.filter((s) => getService(s)).length < 3) reasons.push("fewer than 3 services");
  if (c.nearby.length < 1) reasons.push("no nearby links");
  return { ok: reasons.length === 0 && c.status === "PUBLISHED", localWords, reasons };
}

export function cityServiceQuality(cs: CityService) {
  const localWords = cs.localAngle.reduce((n, p) => n + words(p), 0) + words(cs.answer);
  const parent = cityBySlug(cs.citySlug);
  const reasons: string[] = [];
  if (localWords < 90) reasons.push(`local copy ${localWords} < 90 words`);
  if (!parent || !cityQuality(parent).ok) reasons.push("parent city not published");
  if (!getService(cs.serviceSlug)) reasons.push("unknown service");
  return { ok: reasons.length === 0 && cs.status === "PUBLISHED", localWords, reasons };
}
