import { notFound } from "next/navigation";
import { publishedServices, getService, getCategory } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { site } from "@/content/site";
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
    broker: { "@id": ids.org },
    areaServed: { "@id": ids.county },
  };
  return (
    <>
      <JsonLd data={graph(pageGraph({ path, name: s.seoTitle, description: s.metaDescription, type: "ItemPage", crumbs, faqs: s.faqs, about: [ids.service(s.slug)], extra: [service] }))} />
      <ServiceTemplate s={s} path={path} crumbs={crumbs} faqs={s.faqs} />
    </>
  );
}
