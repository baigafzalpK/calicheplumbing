import { site, DISCLOSURE } from "@/content/site";
import { indexableUrls } from "@/lib/sitemap";

export const dynamic = "force-static";

export function GET() {
  const urls = indexableUrls();
  const section = (g: string, h: string) =>
    `## ${h}\n\n` + urls.filter((u) => u.group === g).map((u) => `- [${u.title}](${site.url}${u.path})`).join("\n");
  const body = `# ${site.name}

> Plumbing referral service for the Phoenix metro (Maricopa County, Arizona). Connects homeowners with independent, licensed plumbers for slab leaks, hard water treatment, repiping, water heaters, pressure regulators, backflow, drains and gas lines.

## Quick Facts
- **Phone:** ${site.phone} (${site.phoneE164})
- **Market:** ${site.marketLong}
- **Website:** ${site.url}
- **Contractor Licensing:** Connected contractors are licensed by the Arizona Registrar of Contractors (ROC).
- **Core Specialties:** Slab leak detection & attic PEX reroutes, hard water softeners & reverse osmosis, polybutylene pipe replacement & whole-house repipes, water heater repair & replacement, pressure reducing valves (PRVs).

${DISCLOSURE}

${section("services", "Services")}

${section("locations", "Service areas")}

${section("guides", "Guides")}

${section("pages", "Company")}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
