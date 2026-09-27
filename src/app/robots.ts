import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!site.isProduction) return { rules: [{ userAgent: "*", disallow: "/" }] };
  const params = ["utm_", "gclid", "gbraid", "wbraid", "fbclid", "msclkid", "kw", "ref"];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you/", ...params.flatMap((p) => [`/*?${p}`, `/*&${p}`])],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
