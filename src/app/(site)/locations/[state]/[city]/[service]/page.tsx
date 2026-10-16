import { permanentRedirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { cityServiceKeys } from "@/components/templates/CityServiceView";

// Legacy nested URL. Service + location pages moved to flat URLs on 2026-10-16; this 308s to the canonical page.
export const dynamicParams = false;
export function generateStaticParams() {
  return cityServiceKeys();
}

type P = { params: Promise<{ state: string; city: string; service: string }> };

export default async function LegacyCityService({ params }: P) {
  const p = await params;
  permanentRedirect(routes.cityService(p.state, p.city, p.service));
}
