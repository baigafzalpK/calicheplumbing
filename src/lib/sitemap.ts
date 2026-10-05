import "server-only";
import { routes } from "./routes";
import { publishedServices } from "@/content/services";
import { publishedArticles } from "@/content/articles";
import { dates } from "@/content/misc";
import { cityQuality, cityServiceQuality } from "./quality";
import { allCityPages, allCityServices, allStates, getCityPage } from "./geo";
import { allCounties } from "./counties";

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

export function indexableUrls(): IndexUrl[] {
  return [
    { path: routes.home(), lastmod: dates.site, group: "pages", title: "Home" },
    { path: routes.about(), lastmod: dates.site, group: "pages", title: "About" },
    { path: routes.contact(), lastmod: dates.site, group: "pages", title: "Contact" },
    { path: routes.faq(), lastmod: dates.site, group: "pages", title: "FAQ" },
    { path: routes.privacy(), lastmod: dates.legal, group: "pages", title: "Privacy" },
    { path: routes.terms(), lastmod: dates.legal, group: "pages", title: "Terms" },
    { path: routes.accessibility(), lastmod: dates.legal, group: "pages", title: "Accessibility" },
    { path: routes.services(), lastmod: dates.services, group: "services", title: "Plumbing services" },
    { path: routes.emergency(), lastmod: dates.services, group: "services", title: "Emergency plumbing" },
    ...publishedServices.map((s) => ({ path: routes.service(s.slug), lastmod: s.updated, group: "services" as const, title: s.name })),
    { path: routes.locations(), lastmod: dates.locations, group: "states", title: "Service areas" },
    ...allStates().map((s) => ({ path: routes.state(s.slug), lastmod: dates.locations, group: "states" as const, title: s.name })),
    ...allCounties().map((c) => ({ path: routes.county(c.stateSlug, c.slug), lastmod: "2026-10-06", group: "counties" as const, title: `${c.name}, ${c.state.abbr}` })),
    ...indexableCities().map((c) => ({ path: routes.city(c.stateSlug, c.slug), lastmod: c.updated, group: "cities" as const, title: c.name })),
    ...indexableCityServices().map((cs) => ({
      path: routes.cityService(cs.stateSlug, cs.citySlug, cs.serviceSlug),
      lastmod: cs.updated,
      group: "city-services" as const,
      title: cs.h1,
    })),
    { path: routes.resources(), lastmod: dates.guides, group: "guides", title: "Resources" },
    ...publishedArticles.map((a) => ({ path: routes.guide(a.slug), lastmod: a.updated, group: "guides" as const, title: a.title })),
  ];
}
