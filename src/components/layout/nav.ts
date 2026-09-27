import { categories, servicesInCategory } from "@/content/services";
import { regions, publishedCities } from "@/content/locations";
import { routes } from "@/lib/routes";
import type { IconName } from "@/content/types";

export type NavGroup = { title: string; href: string; icon?: IconName; links: { name: string; href: string }[] };

export function serviceGroups(): NavGroup[] {
  return categories.map((c) => ({
    title: c.name,
    href: routes.category(c.slug),
    icon: c.icon,
    links: servicesInCategory(c.slug).map((s) => ({ name: s.shortName ?? s.name, href: routes.service(s.slug) })),
  }));
}

export function locationGroups(): NavGroup[] {
  return regions.map((r) => ({
    title: r.name,
    href: `${routes.locations()}#${r.slug}`,
    links: publishedCities.filter((c) => c.region === r.slug).map((c) => ({ name: c.name, href: routes.city(c.stateSlug, c.slug) })),
  }));
}

export const companyLinks = [
  { name: "Resources", href: routes.resources() },
  { name: "About", href: routes.about() },
  { name: "FAQ", href: routes.faq() },
  { name: "Contact", href: routes.contact() },
];
