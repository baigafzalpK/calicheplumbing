import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { site } from "@/content/site";
import { SimplePage } from "@/components/SimplePage";

const path = routes.privacy();
export const metadata = pageMeta({ title: "Privacy Policy", description: "How Caliche Plumbing collects, uses and shares information when you call or request plumbing service, including sharing with independent plumbers.", path });

export default function Privacy() {
  return (
    <SimplePage title="Privacy Policy" crumbs={[{ name: "Home", path: "/" }, { name: "Privacy", path }]} lead="Last updated September 30, 2026. Draft pending legal review.">
      <h2>Who operates this site</h2>
      <p>This website is owned and operated by Muhammad Afzal. This policy was last updated on September 30, 2026.</p>
      <h2>What we collect</h2>
      <p>When you submit a request, we collect what you enter: the service you need, ZIP code, timing, name, phone, optional email and notes. We also collect how you found us (for example ad campaign parameters and the page you landed on), basic device type, and a one-way hash of your IP address for spam prevention.</p>
      <h2>Calls</h2>
      <p>Phone numbers on this site may be call-tracking numbers. Calls may be routed through a third-party provider and may be recorded for quality and billing purposes, where permitted by law, with notice at the start of the call.</p>
      <h2>How we share it</h2>
      <p>{site.name} is a referral service. We share your request with up to three independent, licensed plumbing contractors or lead partners who serve your area so they can contact you about the job. We don't sell your information for unrelated marketing.</p>
      <h2>Texts and calls</h2>
      <p>If you agree on the form, we and the contractors may call or text you about your request, including by automated means. Consent isn't required to buy anything. Reply STOP to opt out of texts.</p>
      <h2>Cookies and analytics</h2>
      <p>We store attribution details in your browser for 30 days. If analytics are enabled, we use Google Tag Manager and Google Analytics, subject to your consent choices.</p>
      <h2>Your choices</h2>
      <p>To ask what we hold about you, or to have it deleted, contact us{site.email ? ` at ${site.email}` : " using the phone number on this site"}.</p>
    </SimplePage>
  );
}
