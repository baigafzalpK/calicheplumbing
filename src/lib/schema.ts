import "server-only";
import { site } from "@/content/site";
import { publishedServices, categories } from "@/content/services";
import { allStates } from "./geo";
import { routes } from "./routes";
import type { Faq } from "@/content/types";

// Connected JSON-LD graph with stable @ids. Every @id referenced on a page is defined on that page.
const U = site.url;
export const ids = {
  org: `${U}/#organization`,
  website: `${U}/#website`,
  logo: `${U}/#logo`,
  service: (slug: string) => `${U}${routes.service(slug)}#service`,
  place: (state: string, city: string) => `${U}${routes.city(state, city)}#place`,
  state: (s: string) => `${U}/#place-${s}`,
  page: (path: string) => `${U}${path}#webpage`,
  breadcrumb: (path: string) => `${U}${path}#breadcrumb`,
  faq: (path: string) => `${U}${path}#faq`,
};

export function siteGraph() {
  const states = allStates();
  const org: Record<string, unknown> = {
    "@type": "Organization",
    "@id": ids.org,
    name: site.name,
    alternateName: site.shortName,
    url: `${U}/`,
    logo: { "@id": ids.logo },
    description:
      "Caliche Plumbing is a nationwide plumbing referral service. It connects homeowners in all 50 states and Washington, DC with independent, licensed plumbing contractors for leaks, repiping, water heaters, frozen pipes, sump pumps, hard water treatment, drains, sewer lines and gas lines.",
    areaServed: states.map((s) => ({ "@id": ids.state(s.slug) })),
    knowsAbout: ["Slab leaks", "Frozen pipes", "Sump pumps", "Hard water", "Water softeners", "Repiping", "Galvanized pipe", "Polybutylene pipe", "Water heaters", "Sewer lines", "Backflow testing", "Gas lines"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing services",
      itemListElement: categories.map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.name,
        itemListElement: publishedServices
          .filter((s) => s.category === cat.slug)
          .map((s) => ({ "@type": "Offer", itemOffered: { "@id": ids.service(s.slug) } })),
      })),
    },
  };
  if (site.phoneIsReal) org.telephone = site.phoneE164;
  if (site.email) org.email = site.email;
  if (site.googleProfileUrl) org.sameAs = [site.googleProfileUrl];

  return [
    org,
    { "@type": "ImageObject", "@id": ids.logo, url: `${U}/brand/logo.png`, width: 970, height: 345, caption: site.name },
    { "@type": "WebSite", "@id": ids.website, url: `${U}/`, name: site.name, publisher: { "@id": ids.org }, inLanguage: "en-US" },
    ...publishedServices.map((s) => ({ "@type": "Service", "@id": ids.service(s.slug), name: s.name, url: `${U}${routes.service(s.slug)}` })),
    ...states.map((s) => ({ "@type": s.abbr === "DC" ? "AdministrativeArea" : "State", "@id": ids.state(s.slug), name: s.name, url: `${U}${routes.state(s.slug)}` })),
  ];
}

export type Crumb = { name: string; path: string };

export function pageGraph(opts: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "ItemPage" | "AboutPage" | "ContactPage" | "FAQPage";
  crumbs: Crumb[];
  faqs?: Faq[];
  about?: string[];
  extra?: Record<string, unknown>[];
}) {
  const { path, name, description, crumbs, faqs, about, extra } = opts;
  const type = opts.type ?? "WebPage";
  const pageTypes = faqs?.length && type !== "FAQPage" ? [type, "FAQPage"] : type;
  const page: Record<string, unknown> = {
    "@type": pageTypes,
    "@id": ids.page(path),
    url: `${U}${path}`,
    name,
    description,
    isPartOf: { "@id": ids.website },
    publisher: { "@id": ids.org },
    breadcrumb: { "@id": ids.breadcrumb(path) },
    inLanguage: "en-US",
  };
  if (about?.length) page.about = about.map((id) => ({ "@id": id }));
  if (faqs?.length)
    page.mainEntity = faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }));
  const bc = {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb(path),
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${U}${c.path}` })),
  };
  return [page, bc, ...(extra ?? [])];
}

export function graph(nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** A City node for one location page, contained in its county (when known) and state. */
export function cityNodes(c: { slug: string; name: string; stateSlug: string; county: string }, stateAbbr: string) {
  const id = ids.place(c.stateSlug, c.slug);
  const city: Record<string, unknown> = { "@type": "City", "@id": id, name: `${c.name}, ${stateAbbr}`, containedInPlace: { "@id": ids.state(c.stateSlug) } };
  if (!c.county) return [city];
  const countyName = /(County|Parish|Borough|Area|city)$/i.test(c.county) ? c.county : `${c.county} County`;
  const countyId = `${id}-county`;
  city.containedInPlace = { "@id": countyId };
  return [city, { "@type": "AdministrativeArea", "@id": countyId, name: `${countyName}, ${stateAbbr}`, containedInPlace: { "@id": ids.state(c.stateSlug) } }];
}
