import "server-only";
import { indexableUrls } from "./sitemap";
import { ogKeyFor } from "./seo";
import { getService, getCategory } from "@/content/services";
import { getCityPage, getStateView } from "./geo";
import { getArticle } from "@/content/articles";

export type OgCard = { key: string; eyebrow: string; title: string };

// Per-page Open Graph card definitions for every indexable URL.
export function ogCards(): OgCard[] {
  return indexableUrls().map((u) => {
    const parts = u.path.split("/").filter(Boolean);
    let eyebrow = "Plumbing help";
    let title = u.title;
    if (parts[0] === "plumbing-services" && parts[1]) {
      const s = getService(parts[1]);
      if (s) {
        eyebrow = getCategory(s.category).name;
        title = s.h1;
      }
    } else if (parts[0] === "locations" && parts[2]) {
      const c = getCityPage(parts[1], parts[2]);
      const st = getStateView(parts[1]);
      eyebrow = `Service area · ${st?.name}`;
      title = parts[3] ? u.title : `Plumbers in ${c?.name}, ${st?.abbr}`;
    } else if (parts[0] === "locations" && parts[1]) {
      eyebrow = "Service area";
      title = `Plumbers in ${u.title}`;
    } else if (parts[0] === "resources" && parts[1]) {
      const a = getArticle(parts[1]);
      eyebrow = `Guide · ${a?.category}`;
    } else if (u.path === "/") {
      title = "Plumbing help that knows your kind of house";
    }
    return { key: ogKeyFor(u.path), eyebrow, title };
  });
}
