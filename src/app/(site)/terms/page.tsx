import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { DISCLOSURE } from "@/content/site";
import { SimplePage } from "@/components/SimplePage";

const path = routes.terms();
export const metadata = pageMeta({ title: "Terms of Use", description: "Terms for using the Caliche Plumbing website and referral service, including the role of independent plumbing contractors.", path });

export default function Terms() {
  return (
    <SimplePage title="Terms of Use" crumbs={[{ name: "Home", path: "/" }, { name: "Terms", path }]} lead="Last updated September 27, 2026.">
      <h2>Referral service</h2>
      <p>{DISCLOSURE}</p>
      <h2>No guarantee of availability</h2>
      <p>Coverage and response times depend on which contractors are active in your area. Submitting a request doesn't guarantee a contractor will be available.</p>
      <h2>Contractor work</h2>
      <p>Any agreement for plumbing work is between you and the contractor. The contractor is responsible for pricing, permits, workmanship and warranties.</p>
      <h2>Information on this site</h2>
      <p>Guides are general information for homeowners and aren't a substitute for an on-site diagnosis by a licensed professional. In an emergency involving gas, call 911 or your gas utility.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Arizona.</p>
    </SimplePage>
  );
}
