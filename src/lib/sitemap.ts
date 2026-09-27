import "server-only";
import { routes } from "./routes";
import { publishedServices } from "@/content/services";
import { cities, cityServices, states, getCity } from "@/content/locations";
import { publishedArticles } from "@/content/articles";
import { dates } from "@/content/misc";
import { cityQuality, cityServiceQuality } from "./quality";

export type SitemapGroup = "pages" | "services" | "locations" | "guides";
export type IndexUrl = { path: string; lastmod: string; group: SitemapGroup; title: string };

export function indexableCities() {
  return cities.filter((c) => cityQuality(c).ok);
}
export function indexableCityServices() {
  return cityServices.filter((cs) => cityServiceQuality(cs).ok);
}

export function indexableUrls(): IndexUrl[] {
  const out: IndexUrl[] = [
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
    { path: routes.locations(), lastmod: dates.locations, group: "locations", title: "Service areas" },
    ...states.filter((s) => s.status === "PUBLISHED").map((s) => ({ path: routes.state(s.slug), lastmod: s.updated, group: "locations" as const, title: s.name })),
    ...indexableCities().map((c) => ({ path: routes.city(c.stateSlug, c.slug), lastmod: c.updated, group: "locations" as const, title: c.name })),
    ...indexableCityServices().map((cs) => {
      const c = getCity("arizona", cs.citySlug)!;
      return { path: routes.cityService(c.stateSlug, c.slug, cs.serviceSlug), lastmod: cs.updated, group: "locations" as const, title: cs.h1 };
    }),
    { path: routes.resources(), lastmod: dates.guides, group: "guides", title: "Resources" },
    ...publishedArticles.map((a) => ({ path: routes.guide(a.slug), lastmod: a.updated, group: "guides" as const, title: a.title })),
  ];
  return out;
}
