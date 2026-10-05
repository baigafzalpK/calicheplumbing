import { categories, servicesInCategory } from "@/content/services";
import { stateFacts, type Region } from "@/content/stateFacts";
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

const REGIONS: Region[] = ["Northeast", "Midwest", "South", "West"];

export function locationGroups(): NavGroup[] {
  return REGIONS.map((r) => ({
    title: r,
    href: `${routes.locations()}#${r.toLowerCase()}`,
    links: stateFacts.filter((s) => s.region === r).map((s) => ({ name: s.name, href: routes.state(s.slug) })),
  }));
}

export const companyLinks = [
  { name: "Resources", href: routes.resources() },
  { name: "About", href: routes.about() },
  { name: "FAQ", href: routes.faq() },
  { name: "Contact", href: routes.contact() },
];
