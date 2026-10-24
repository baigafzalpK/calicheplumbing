import "server-only";
import { site } from "@/content/site";
import { sitemapGroups as groups, urlsForGroup, type SitemapGroup } from "./sitemap";
import { dates } from "@/content/misc";

const xml = (body: string) =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}`, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=604800",
    },
  });

const groupLastmod: Record<SitemapGroup, string> = {
  pages: dates.site,
  services: dates.services,
  states: dates.locations,
  counties: "2026-10-06",
  cities: dates.locations,
  "city-services": dates.locations,
  guides: dates.guides,
};

const xmlCache = new Map<string, string>();

export function urlset(group: SitemapGroup) {
  let cached = xmlCache.get(group);
  if (!cached) {
    const rows = urlsForGroup(group)
      .map((u) => `  <url><loc>${site.url}${u.path}</loc><lastmod>${u.lastmod}</lastmod></url>`)
      .join("\n");
    cached = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>`;
    xmlCache.set(group, cached);
  }
  return xml(cached);
}

export function sitemapIndex() {
  let cached = xmlCache.get("index");
  if (!cached) {
    const rows = groups
      .map((g) => `  <sitemap><loc>${site.url}/sitemap-${g}.xml</loc><lastmod>${groupLastmod[g] || dates.site}</lastmod></sitemap>`)
      .join("\n");
    cached = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</sitemapindex>`;
    xmlCache.set("index", cached);
  }
  return xml(cached);
}
