import "server-only";
import { site } from "@/content/site";
import { indexableUrls, type SitemapGroup } from "./sitemap";

export const groups: SitemapGroup[] = ["pages", "services", "locations", "guides"];

const xml = (body: string) =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}`, { headers: { "content-type": "application/xml; charset=utf-8" } });

export function urlset(group: SitemapGroup) {
  const rows = indexableUrls()
    .filter((u) => u.group === group)
    .map((u) => `  <url><loc>${site.url}${u.path}</loc><lastmod>${u.lastmod}</lastmod></url>`)
    .join("\n");
  return xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>`);
}

export function sitemapIndex() {
  const all = indexableUrls();
  const rows = groups
    .map((g) => {
      const last = all.filter((u) => u.group === g).map((u) => u.lastmod).sort().at(-1);
      return `  <sitemap><loc>${site.url}/sitemap-${g}.xml</loc><lastmod>${last}</lastmod></sitemap>`;
    })
    .join("\n");
  return xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</sitemapindex>`);
}
