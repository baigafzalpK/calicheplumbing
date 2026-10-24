import "server-only";
import { routes } from "./routes";
import { publishedServices, categories } from "@/content/services";
import { publishedArticles } from "@/content/articles";
import { dates } from "@/content/misc";
import { cityQuality, cityServiceQuality } from "./quality";
import { allCityPages, allCityServices, getCityPage } from "./geo";
import { stateFacts } from "@/content/stateFacts";
import { allCounties } from "./counties";
import { allLocalServicePages } from "./localServices";

export type SitemapGroup = "pages" | "services" | "states" | "counties" | "cities" | "city-services" | "guides";
export const sitemapGroups: SitemapGroup[] = ["pages", "services", "states", "counties", "cities", "city-services", "guides"];
export type IndexUrl = { path: string; lastmod: string; group: SitemapGroup; title: string };

let citiesMemo: ReturnType<typeof allCityPages> | null = null;
export function indexableCities() {
  return (citiesMemo ??= allCityPages().filter((c) => cityQuality(c).ok));
}
let csMemo: ReturnType<typeof allCityServices> | null = null;
export function indexableCityServices() {
  return (csMemo ??= allCityServices().filter((cs) => cityServiceQuality(cs, getCityPage(cs.stateSlug, cs.citySlug)).ok));
}

/** Data-driven service + location and sub-service + location pages (never a duplicate of a hand-written one). */
let lsMemo: ReturnType<typeof allLocalServicePages> | null = null;
export function indexableLocalServices() {
  if (lsMemo) return lsMemo;
  const curated = new Set(indexableCityServices().map((cs) => `${cs.stateSlug}/${cs.citySlug}/${cs.serviceSlug}`));
  return (lsMemo = allLocalServicePages(indexableCities()).filter((x) => !curated.has(`${x.stateSlug}/${x.citySlug}/${x.slug}`)));
}

export function urlsForGroup(group: SitemapGroup): IndexUrl[] {
  switch (group) {
    case "pages":
      return [
        { path: routes.home(), lastmod: dates.site, group: "pages", title: "Home" },
        { path: routes.about(), lastmod: dates.site, group: "pages", title: "About" },
        { path: routes.contact(), lastmod: dates.site, group: "pages", title: "Contact" },
        { path: routes.faq(), lastmod: dates.site, group: "pages", title: "FAQ" },
        { path: routes.privacy(), lastmod: dates.legal, group: "pages", title: "Privacy" },
        { path: routes.terms(), lastmod: dates.legal, group: "pages", title: "Terms" },
        { path: routes.accessibility(), lastmod: dates.legal, group: "pages", title: "Accessibility" },
      ];
    case "services":
      return [
        { path: routes.services(), lastmod: dates.services, group: "services", title: "Plumbing services" },
        { path: routes.emergency(), lastmod: dates.services, group: "services", title: "Emergency plumbing" },
        ...categories.map((c) => ({ path: routes.category(c.slug), lastmod: "2026-10-14", group: "services" as const, title: c.name })),
        ...publishedServices.map((s) => ({ path: routes.service(s.slug), lastmod: s.updated, group: "services" as const, title: s.name })),
      ];
    case "states":
      return [
        { path: routes.locations(), lastmod: dates.locations, group: "states", title: "Service areas" },
        ...stateFacts.map((s) => ({ path: routes.state(s.slug), lastmod: dates.locations, group: "states" as const, title: s.name })),
      ];
    case "counties":
      return allCounties().map((c) => ({ path: routes.county(c.stateSlug, c.slug), lastmod: "2026-10-06", group: "counties" as const, title: `${c.name}, ${c.state.abbr}` }));
    case "cities":
      return indexableCities().map((c) => ({ path: routes.city(c.stateSlug, c.slug), lastmod: c.updated, group: "cities" as const, title: c.name }));
    case "city-services":
      return [
        ...indexableCityServices().map((cs) => ({
          path: routes.cityService(cs.stateSlug, cs.citySlug, cs.serviceSlug),
          lastmod: cs.updated,
          group: "city-services" as const,
          title: cs.h1,
        })),
        ...indexableLocalServices().map((x) => ({
          path: routes.cityService(x.stateSlug, x.citySlug, x.slug),
          lastmod: x.updated,
          group: "city-services" as const,
          title: x.h1,
        })),
      ];
    case "guides":
      return [
        { path: routes.resources(), lastmod: dates.guides, group: "guides", title: "Resources" },
        ...publishedArticles.map((a) => ({ path: routes.guide(a.slug), lastmod: a.updated, group: "guides" as const, title: a.title })),
      ];
  }
}

export function indexableUrls(): IndexUrl[] {
  return sitemapGroups.flatMap(urlsForGroup);
}
