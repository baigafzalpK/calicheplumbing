import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "./routes";

// Contextual internal links: topic -> owning page, first mention only, no self-links, capped per page.
const TOPICS: [RegExp, string][] = [
  [/\bslab leaks?\b/i, routes.service("slab-leak-detection")],
  [/\breroute[sd]?\b/i, routes.service("slab-leak-repair")],
  [/\bpinhole(?: leaks?)?\b/i, routes.service("pinhole-leak-repair")],
  [/\bpolybutylene\b/i, routes.service("polybutylene-replacement")],
  [/\brepip(?:e|es|ing)\b/i, routes.service("whole-house-repiping")],
  [/\bsofteners?\b/i, routes.service("water-softener-installation")],
  [/\breverse osmosis\b|\bRO system\b/i, routes.service("reverse-osmosis-systems")],
  [/\bhard water\b/i, routes.guide("white-crust-on-faucets")],
  [/\btankless\b/i, routes.service("tankless-water-heaters")],
  [/\brecirculation\b/i, routes.service("hot-water-recirculation")],
  [/\bsediment\b/i, routes.service("water-heater-flush")],
  [/\bwater heaters?\b/i, routes.service("water-heater-replacement")],
  [/\bPRVs?\b|\bpressure regulators?\b/i, routes.service("pressure-regulator-valve")],
  [/\bmain lines?\b/i, routes.service("main-water-line-repair")],
  [/\bbackflow\b/i, routes.service("backflow-testing")],
  [/\birrigation\b/i, routes.service("irrigation-leak-repair")],
  [/\bcamera inspection\b/i, routes.service("sewer-camera-inspection")],
  [/\bcast iron\b/i, routes.service("sewer-line-repair")],
  [/\bclogs?\b/i, routes.service("drain-cleaning")],
  [/\bgas lines?\b/i, routes.service("gas-line-repair")],
  [/\bwater bill\b/i, routes.guide("why-is-my-water-bill-so-high")],
  [/\bwater pressure\b/i, routes.guide("water-pressure-too-high")],
];

const EXPLICIT = /\[([^\]]+)\]\(([^)]+)\)/g;

export function createLinker(currentPath: string, max = 6) {
  const used = new Set<string>([currentPath]);
  let count = 0;

  function auto(text: string, keyBase: string): ReactNode[] {
    if (count >= max) return [text];
    for (const [re, href] of TOPICS) {
      if (used.has(href)) continue;
      const m = re.exec(text);
      if (!m) continue;
      used.add(href);
      count++;
      const before = text.slice(0, m.index);
      const after = text.slice(m.index + m[0].length);
      return [
        before,
        <Link key={`${keyBase}-${href}`} href={href} className="link">
          {m[0]}
        </Link>,
        ...auto(after, keyBase + "a"),
      ];
    }
    return [text];
  }

  return function link(text: string): ReactNode[] {
    const out: ReactNode[] = [];
    let last = 0;
    let i = 0;
    for (const m of text.matchAll(EXPLICIT)) {
      out.push(...auto(text.slice(last, m.index), `t${i}`));
      const href = m[2];
      if (href === currentPath) out.push(m[1]);
      else {
        used.add(href);
        count++;
        out.push(
          <Link key={`x${i}`} href={href} className="link">
            {m[1]}
          </Link>,
        );
      }
      last = (m.index ?? 0) + m[0].length;
      i++;
    }
    out.push(...auto(text.slice(last), `t${i}`));
    return out;
  };
}

export function stripLinks(text: string) {
  return text.replace(EXPLICIT, "$1");
}
