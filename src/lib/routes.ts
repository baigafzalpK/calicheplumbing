// Every URL builder. Single source of truth. Rename SERVICES for another trade.
import { stateBySlug } from "@/content/stateFacts";

export const SERVICES = "plumbing-services";

/** Flat service + location slug: "sewer-line-repair-in-cleveland-oh". The state code disambiguates same-named cities. */
export const cityServiceSlug = (s: string, c: string, svc: string) => `${svc}-in-${c}-${(stateBySlug.get(s)?.abbr ?? s).toLowerCase()}`;
/** Pre-2026-10-16 nested path, kept only as a 308 redirect source. */
export const legacyCityServicePath = (s: string, c: string, svc: string) => `/locations/${s}/${c}/${svc}/`;

export const routes = {
  home: () => "/",
  services: () => `/${SERVICES}/`,
  service: (slug: string) => `/${SERVICES}/${slug}/`,
  category: (slug: string) => `/${SERVICES}/${slug}/`,
  emergency: () => "/emergency-plumbing/",
  locations: () => "/locations/",
  state: (s: string) => `/locations/${s}/`,
  county: (s: string, c: string) => `/locations/${s}/county/${c}/`,
  city: (s: string, c: string) => `/locations/${s}/${c}/`,
  cityService: (s: string, c: string, svc: string) => `/${cityServiceSlug(s, c, svc)}/`,
  resources: () => "/resources/",
  guide: (slug: string) => `/resources/${slug}/`,
  about: () => "/about/",
  contact: () => "/contact/",
  faq: () => "/faq/",
  request: (q?: { service?: string; zip?: string }) => {
    const p = new URLSearchParams();
    if (q?.service) p.set("service", q.service);
    if (q?.zip) p.set("zip", q.zip);
    const s = p.toString();
    return `/request-service/${s ? `?${s}` : ""}`;
  },
  privacy: () => "/privacy/",
  terms: () => "/terms/",
  accessibility: () => "/accessibility/",
  thankYou: () => "/thank-you/",
  lp: (slug: string) => `/lp/${slug}/`,
};
