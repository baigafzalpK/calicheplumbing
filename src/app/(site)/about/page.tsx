import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { DISCLOSURE, site } from "@/content/site";
import { JsonLd } from "@/components/ui";
import { SimplePage } from "@/components/SimplePage";
import { CtaBand } from "@/components/CtaBand";

const title = "About Caliche Plumbing";
const description = "Caliche Plumbing connects Phoenix-area homeowners with independent, licensed plumbers, and publishes plain-language guides to desert plumbing problems.";
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
      <SimplePage title="About Caliche Plumbing" crumbs={crumbs} lead="A faster, clearer way to find a plumber in the Valley.">
        <p>
          Caliche is named for the hard, cemented soil layer under much of the Phoenix metro. It's the reason digging a trench here takes longer than you'd think, and a reminder that plumbing in the desert has its own rules.
        </p>
        <h2>What we do</h2>
        <p>
          {site.name} is a referral service. When you call or send a request, we connect you with an independent, licensed plumbing contractor who serves your ZIP code. The plumber diagnoses the problem, quotes the work, and does the job directly with you.
        </p>
        <p>
          We also publish guides and service pages written specifically for Valley homes: <Link href={routes.guide("white-crust-on-faucets")} className="link">hard water</Link>,{" "}
          <Link href={routes.guide("warm-spot-on-floor")} className="link">slab leaks</Link>,{" "}
          <Link href={routes.guide("polybutylene-pipes-arizona")} className="link">polybutylene</Link> and the rest, so you know what you're dealing with before anyone arrives.
        </p>
        <h2>What we don't do</h2>
        <p>
          We don't perform plumbing work, employ plumbers, or set prices. We don't publish reviews we haven't verified, or claims we can't back up. Before hiring any contractor, you can check their license on the Arizona Registrar of Contractors website.
        </p>
        <h2>Disclosure</h2>
        <p>{DISCLOSURE}</p>
      </SimplePage>
      <CtaBand />
    </>
  );
}
