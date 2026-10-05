import { notFound } from "next/navigation";
import { publishedServices, getService, getCategory } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { site } from "@/content/site";
import { allStates, cityLabel } from "@/lib/geo";
import { indexableCities, indexableCityServices } from "@/lib/sitemap";
import { JsonLd } from "@/components/ui";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";

export const dynamicParams = false;
export function generateStaticParams() {
  return publishedServices.map((s) => ({ service: s.slug }));
}

type P = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: P) {
  const s = getService((await params).service)!;
  return pageMeta({ title: s.seoTitle, description: s.metaDescription, path: routes.service(s.slug) });
}

export default async function ServicePage({ params }: P) {
  const s = getService((await params).service);
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
  // Local pages for this service first, then the largest cities where the service is a common call.
  const local = indexableCityServices().filter((cs) => cs.serviceSlug === s.slug);
  const localHrefs = new Set(local.map((cs) => routes.city(cs.stateSlug, cs.citySlug)));
  const cities = indexableCities()
    .filter((c) => c.popularServices.includes(s.slug) && !localHrefs.has(routes.city(c.stateSlug, c.slug)))
    .sort((a, b) => (b.profile?.pop ?? 0) - (a.profile?.pop ?? 0))
    .slice(0, Math.max(0, 16 - local.length));
  const towns = [
    ...local.slice(0, 16).map((cs) => {
      const c = indexableCities().find((x) => x.stateSlug === cs.stateSlug && x.slug === cs.citySlug)!;
      return { name: `${cityLabel(c)}`, href: routes.cityService(cs.stateSlug, cs.citySlug, cs.serviceSlug) };
    }),
    ...cities.map((c) => ({ name: cityLabel(c), href: routes.city(c.stateSlug, c.slug) })),
  ];
  const states = allStates().map((x) => ({ name: x.name, href: routes.state(x.slug) }));
  return (
    <>
      <JsonLd data={graph(pageGraph({ path, name: s.seoTitle, description: s.metaDescription, type: "ItemPage", crumbs, faqs: s.faqs, about: [ids.service(s.slug)], extra: [service] }))} />
      <ServiceTemplate s={s} path={path} crumbs={crumbs} faqs={s.faqs} towns={towns} states={states} />
    </>
  );
}
