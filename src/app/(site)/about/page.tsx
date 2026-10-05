import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { DISCLOSURE, site } from "@/content/site";
import { JsonLd } from "@/components/ui";
import { SimplePage } from "@/components/SimplePage";
import { CtaBand } from "@/components/CtaBand";

const title = "About Caliche Plumbing";
const description = "Caliche Plumbing connects homeowners in all 50 states with independent, licensed plumbers, and publishes plain-language guides to common plumbing problems.";
const path = routes.about();
export const metadata = pageMeta({ title, description, path });

export default function About() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path },
  ];
  return (
    <>
      <JsonLd data={graph(pageGraph({ path, name: title, description, type: "AboutPage", crumbs, about: [ids.org] }))} />
      <SimplePage title="About Caliche Plumbing" crumbs={crumbs} lead="A faster, clearer way to find a plumber, wherever you live.">
        <p>
          Caliche is named for the hard, cemented soil layer under much of the desert Southwest, where we started. It's a reminder that plumbing always has local rules: hardpan and hard water there, frost depth and basements in the North, clay soil and slab foundations across the South.
        </p>
        <h2>What we do</h2>
        <p>
          {site.name} is a referral service. When you call or send a request, we connect you with an independent, licensed plumbing contractor who serves your ZIP code. The plumber diagnoses the problem, quotes the work, and does the job directly with you.
        </p>
        <p>
          We also publish guides, state pages and city pages built from local housing data: <Link href={routes.guide("white-crust-on-faucets")} className="link">hard water</Link>,{" "}
          <Link href={routes.guide("warm-spot-on-floor")} className="link">slab leaks</Link>,{" "}
          <Link href={routes.guide("polybutylene-pipes")} className="link">polybutylene</Link> and the rest, so you know what you're dealing with before anyone arrives.
        </p>
        <h2>What we don't do</h2>
        <p>
          We don't perform plumbing work, employ plumbers, or set prices. We don't publish reviews we haven't verified, or claims we can't back up. Before hiring any contractor, check their license with your state or local licensing authority. Each of our state pages names it.
        </p>
        <h2>Disclosure</h2>
        <p>{DISCLOSURE}</p>
      </SimplePage>
      <CtaBand />
    </>
  );
}
