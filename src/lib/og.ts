import "server-only";
import { indexableUrls } from "./sitemap";
import { ogKeyFor } from "./seo";
import { getService, getCategory } from "@/content/services";
import { cityBySlug } from "@/content/locations";
import { getArticle } from "@/content/articles";

export type OgCard = { key: string; eyebrow: string; title: string };

// Per-page Open Graph card definitions for every indexable URL.
export function ogCards(): OgCard[] {
  return indexableUrls().map((u) => {
    const parts = u.path.split("/").filter(Boolean);
    let eyebrow = "Phoenix metro plumbing";
    let title = u.title;
    if (parts[0] === "plumbing-services" && parts[1]) {
      const s = getService(parts[1]);
      if (s) {
        eyebrow = getCategory(s.category).name;
        title = s.h1;
      }
    } else if (parts[0] === "locations" && parts[2]) {
      const c = cityBySlug(parts[2]);
      eyebrow = "Service area · Maricopa County";
      title = parts[3] ? u.title : `Plumbing help in ${c?.name}, AZ`;
    } else if (parts[0] === "resources" && parts[1]) {
      const a = getArticle(parts[1]);
      eyebrow = `Guide · ${a?.category}`;
    } else if (u.path === "/") {
      title = "Plumbing help built for desert homes";
    }
    return { key: ogKeyFor(u.path), eyebrow, title };
  });
}
