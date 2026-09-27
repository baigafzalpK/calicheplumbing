import { sitemapIndex } from "@/lib/sitemapXml";

export const dynamic = "force-static";
export function GET() {
  return sitemapIndex();
}
