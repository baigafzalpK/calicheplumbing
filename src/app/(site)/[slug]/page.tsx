import { notFound } from "next/navigation";
import { cityServiceSlug } from "@/lib/routes";
import { cityServiceKeys, cityServiceMetadata, CityServiceView, type CityServiceKey } from "@/components/templates/CityServiceView";

// Flat service + location landing pages: /{service-slug}-in-{city-slug}-{state-code}/.
// Only eligible, quality-gated combinations are generated; anything else is a real 404.
export const dynamicParams = false;

let index: Map<string, CityServiceKey> | null = null;
function bySlug() {
  if (index) return index;
  index = new Map();
  for (const k of cityServiceKeys()) {
    const slug = cityServiceSlug(k.state, k.city, k.service);
    if (index.has(slug)) throw new Error(`Flat URL collision: ${slug}`);
    index.set(slug, k);
  }
  return index;
}

export function generateStaticParams() {
  return [...bySlug().keys()].map((slug) => ({ slug }));
}

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  const k = bySlug().get((await params).slug);
  return k ? cityServiceMetadata(k) : {};
}

export default async function FlatCityServicePage({ params }: P) {
  const k = bySlug().get((await params).slug);
  if (!k) notFound();
  return <CityServiceView k={k} />;
}
