import { urlset } from "@/lib/sitemapXml";

export const dynamic = "force-static";
export function GET() {
  return urlset("pages");
}
