import { notFound } from "next/navigation";
import { publishedServices, getService, getCategory, categories, servicesInCategory } from "@/content/services";
import { CategoryHub } from "@/components/templates/CategoryHub";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { site } from "@/content/site";
import { allStates, cityLabel } from "@/lib/geo";
import { indexableCities, indexableCityServices, indexableLocalServices } from "@/lib/sitemap";
import { JsonLd } from "@/components/ui";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";

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
    const towns = indexableLocalServices()
      .filter((x) => x.slug === cat.slug)
      .slice(0, 24)
      .map((x) => ({ name: x.h1.replace(`${cat.name} in `, ""), href: routes.cityService(x.stateSlug, x.citySlug, x.slug) }));
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
  // Local pages for this service first, then the largest cities where the service is a common call.
  const local = [
    ...indexableCityServices().filter((cs) => cs.serviceSlug === s.slug),
    ...indexableLocalServices()
      .filter((x) => x.slug === s.slug)
      .map((x) => ({ stateSlug: x.stateSlug, citySlug: x.citySlug, serviceSlug: x.slug })),
  ];
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
