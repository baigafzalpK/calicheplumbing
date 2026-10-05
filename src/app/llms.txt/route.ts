import { site, DISCLOSURE } from "@/content/site";
import { indexableUrls } from "@/lib/sitemap";

export const dynamic = "force-static";

export function GET() {
  const urls = indexableUrls();
  const section = (g: string, h: string) =>
    `## ${h}\n\n` + urls.filter((u) => u.group === g).map((u) => `- [${u.title}](${site.url}${u.path})`).join("\n");
  const body = `# ${site.name}

> Nationwide plumbing referral service covering all 50 states and Washington, DC. Connects homeowners with independent, licensed local plumbers for leaks, frozen and burst pipes, repiping, water heaters, sump pumps, hard water treatment, drains, sewer lines and gas lines.

## Quick Facts
- **Phone:** ${site.phone} (${site.phoneE164})
- **Market:** ${site.marketLong}
- **Website:** ${site.url}
- **Contractor Licensing:** Connected contractors hold the licenses their state or city requires; each state page names the licensing authority.
- **Location data:** City pages use US Census ACS 2023 5-year estimates for the covered ZIP codes.
- **Core Topics:** Leak detection and slab leaks, frozen and burst pipes, galvanized and polybutylene repiping, water heaters, sump pumps, hard water treatment, drains and sewer lines, gas lines.

${DISCLOSURE}

${section("services", "Services")}

${section("states", "States")}

${section("cities", "City pages")}

${section("city-services", "Local service pages")}

${section("guides", "Guides")}

${section("pages", "Company")}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
