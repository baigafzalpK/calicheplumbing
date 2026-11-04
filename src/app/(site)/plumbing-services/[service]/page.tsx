import { notFound } from "next/navigation";
import { publishedServices, getService, getCategory, categories, servicesInCategory } from "@/content/services";
import { CategoryHub } from "@/components/templates/CategoryHub";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { site } from "@/content/site";
import { stateFacts } from "@/content/stateFacts";
import { JsonLd } from "@/components/ui";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";

const TOP_CITIES = [
  { name: "Houston", slug: "houston", stateSlug: "texas", stateAbbr: "TX" },
  { name: "Chicago", slug: "chicago", stateSlug: "illinois", stateAbbr: "IL" },
  { name: "Brooklyn", slug: "brooklyn", stateSlug: "new-york", stateAbbr: "NY" },
  { name: "Los Angeles", slug: "los-angeles", stateSlug: "california", stateAbbr: "CA" },
  { name: "San Antonio", slug: "san-antonio", stateSlug: "texas", stateAbbr: "TX" },
  { name: "Miami", slug: "miami", stateSlug: "florida", stateAbbr: "FL" },
  { name: "Las Vegas", slug: "las-vegas", stateSlug: "nevada", stateAbbr: "NV" },
  { name: "New York", slug: "new-york", stateSlug: "new-york", stateAbbr: "NY" },
  { name: "Philadelphia", slug: "philadelphia", stateSlug: "pennsylvania", stateAbbr: "PA" },
  { name: "Phoenix", slug: "phoenix", stateSlug: "arizona", stateAbbr: "AZ" },
  { name: "Bronx", slug: "bronx", stateSlug: "new-york", stateAbbr: "NY" },
  { name: "Dallas", slug: "dallas", stateSlug: "texas", stateAbbr: "TX" },
  { name: "San Diego", slug: "san-diego", stateSlug: "california", stateAbbr: "CA" },
  { name: "Austin", slug: "austin", stateSlug: "texas", stateAbbr: "TX" },
  { name: "Minneapolis", slug: "minneapolis", stateSlug: "minnesota", stateAbbr: "MN" },
  { name: "Denver", slug: "denver", stateSlug: "colorado", stateAbbr: "CO" },
  { name: "Orlando", slug: "orlando", stateSlug: "florida", stateAbbr: "FL" },
  { name: "Atlanta", slug: "atlanta", stateSlug: "georgia", stateAbbr: "GA" },
  { name: "San Jose", slug: "san-jose", stateSlug: "california", stateAbbr: "CA" },
  { name: "Seattle", slug: "seattle", stateSlug: "washington", stateAbbr: "WA" },
  { name: "Fort Worth", slug: "fort-worth", stateSlug: "texas", stateAbbr: "TX" },
  { name: "Indianapolis", slug: "indianapolis", stateSlug: "indiana", stateAbbr: "IN" },
  { name: "Charlotte", slug: "charlotte", stateSlug: "north-carolina", stateAbbr: "NC" },
  { name: "Jacksonville", slug: "jacksonville", stateSlug: "florida", stateAbbr: "FL" },
];

export const dynamicParams = false;
export function generateStaticParams() {
  return [...publishedServices.map((s) => ({ service: s.slug })), ...categories.map((c) => ({ service: c.slug }))];
}

type P = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: P) {
  const slug = (await params).service;
  const cat = categories.find((c) => c.slug === slug);
  if (cat) return pageMeta({ title: `${cat.name}: Services, Signs & Local Plumbers`, description: `${cat.blurb} Every ${cat.name.toLowerCase()} service explained, warning signs, guides and licensed local plumbers in all 50 states.`.slice(0, 158), path: routes.category(cat.slug) });
  const s = getService(slug)!;
  return pageMeta({ title: s.seoTitle, description: s.metaDescription, path: routes.service(s.slug) });
}

export default async function ServicePage({ params }: P) {
  const slug = (await params).service;
  const cat = categories.find((c) => c.slug === slug);
  if (cat) {
    const path = routes.category(cat.slug);
    const crumbs = [
      { name: "Home", path: "/" },
      { name: "Services", path: routes.services() },
      { name: cat.name, path },
    ];
    const towns = TOP_CITIES.slice(0, 16).map((c) => ({
      name: `${c.name}, ${c.stateAbbr}`,
      href: routes.cityService(c.stateSlug, c.slug, cat.slug),
    }));
    const services = servicesInCategory(cat.slug);
    return (
      <>
        <JsonLd data={graph(pageGraph({ path, name: cat.name, description: cat.blurb, type: "CollectionPage", crumbs, about: services.map((s) => ids.service(s.slug)) }))} />
        <CategoryHub cat={cat} services={services} path={path} crumbs={crumbs} towns={towns} />
      </>
    );
  }
  const s = getService(slug);
  if (!s || s.status !== "PUBLISHED") notFound();
  const path = routes.service(s.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: routes.services() },
    { name: s.name, path },
  ];
  const service = {
    "@type": "Service",
    "@id": ids.service(s.slug),
    name: s.name,
    url: `${site.url}${path}`,
    description: s.answer,
    serviceType: s.name,
    category: getCategory(s.category).name,
    provider: { "@id": ids.org },
    broker: { "@id": ids.org },
    areaServed: { "@type": "Country", name: "United States" },
  };
  const towns = TOP_CITIES.slice(0, 16).map((c) => ({
    name: `${c.name}, ${c.stateAbbr}`,
    href: routes.cityService(c.stateSlug, c.slug, s.slug),
  }));
  const states = stateFacts.map((x) => ({ name: x.name, href: routes.state(x.slug) }));
  return (
    <>
      <JsonLd data={graph(pageGraph({ path, name: s.seoTitle, description: s.metaDescription, type: "ItemPage", crumbs, faqs: s.faqs, about: [ids.service(s.slug)], extra: [service] }))} />
      <ServiceTemplate s={s} path={path} crumbs={crumbs} faqs={s.faqs} towns={towns} states={states} />
    </>
  );
}
