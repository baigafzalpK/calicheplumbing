import "server-only";
import type { City, CityService } from "@/content/types";
import { getService } from "@/content/services";

// Programmatic-SEO quality gate. Fix failures by adding real local content or data, never by lowering thresholds.
// Curated pages are judged on hand-written local copy. Data-composed pages are judged on whether the data
// gives them something specific to say: a full Census profile, data-driven issues and real nearby links.
const words = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;

export function cityQuality(c: City) {
  const localWords =
    words(c.intro) + words(c.housingNotes) + c.localIssues.reduce((n, i) => n + words(i.body), 0) + words(c.water ?? "") + words(c.permits ?? "");
  const reasons: string[] = [];
  if (localWords < 180) reasons.push(`local copy ${localWords} < 180 words`);
  if (c.zips.length < 1) reasons.push("no ZIPs");
  if (c.popularServices.filter((s) => getService(s)).length < 3) reasons.push("fewer than 3 services");
  if (c.curated !== false) {
    if (c.localIssues.length < 2) reasons.push("fewer than 2 local issues");
    if (c.nearby.length < 1) reasons.push("no nearby links");
  } else {
    if (!c.profile || c.profile.units < 3000) reasons.push("Census profile missing or too small");
    if (c.localIssues.length < 3) reasons.push("fewer than 3 data-driven issues");
    if (c.faqs.length < 3) reasons.push("fewer than 3 FAQs");
    if (c.nearby.length + (c.alsoCovered?.length ?? 0) < 2) reasons.push("not enough nearby places");
  }
  return { ok: reasons.length === 0 && c.status === "PUBLISHED", localWords, reasons };
}

export function cityServiceQuality(cs: CityService, parent: City | undefined) {
  const localWords = cs.localAngle.reduce((n, p) => n + words(p), 0) + words(cs.answer);
  const reasons: string[] = [];
  if (localWords < 90) reasons.push(`local copy ${localWords} < 90 words`);
  if (!parent || !cityQuality(parent).ok) reasons.push("parent city not published");
  if (!getService(cs.serviceSlug)) reasons.push("unknown service");
  if (parent && !parent.popularServices.includes(cs.serviceSlug) && parent.curated === false) reasons.push("service not supported by the city's data");
  return { ok: reasons.length === 0 && cs.status === "PUBLISHED", localWords, reasons };
}
