import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { site } from "@/content/site";
import { SimplePage } from "@/components/SimplePage";

const path = routes.accessibility();
export const metadata = pageMeta({ title: "Accessibility Statement", description: "Caliche Plumbing's commitment to an accessible website, the standards we follow, and how to report a barrier or get help by phone.", path });

export default function Accessibility() {
  return (
    <SimplePage title="Accessibility" crumbs={[{ name: "Home", path: "/" }, { name: "Accessibility", path }]}>
      <p>We aim to meet WCAG 2.2 Level AA. The site uses semantic headings, labeled form fields, visible focus states, sufficient color contrast and keyboard-operable menus.</p>
      <h2>Need help?</h2>
      <p>If anything on the site is hard to use, call {site.phone} and we'll take your request by phone{site.email ? `, or email ${site.email}` : ""}. Please tell us the page and the problem so we can fix it.</p>
    </SimplePage>
  );
}
