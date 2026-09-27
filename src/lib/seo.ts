import type { Metadata } from "next";
import { site } from "@/content/site";

type Opts = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  canonical?: string;
  ogKey?: string;
};

const MAX = 62;

export function fullTitle(title: string) {
  const withBrand = `${title} | ${site.name}`;
  return withBrand.length <= MAX ? withBrand : title;
}

export function ogKeyFor(path: string) {
  const k = path.replace(/^\/|\/$/g, "").replace(/\//g, "--");
  return k || "home";
}

export function pageMeta({ title, description, path, noindex, canonical, ogKey }: Opts): Metadata {
  const t = fullTitle(title);
  const url = `${site.url}${canonical ?? path}`;
  const img = `${site.url}/og/${ogKey ?? ogKeyFor(path)}.png`;
  return {
    title: { absolute: t },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title: t,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: t, description, images: [img] },
  };
}
