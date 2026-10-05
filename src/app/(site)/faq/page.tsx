import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { generalFaqs } from "@/content/misc";
import { FaqList, JsonLd } from "@/components/ui";
import { SimplePage } from "@/components/SimplePage";
import { CtaBand } from "@/components/CtaBand";

const title = "Plumbing FAQ: Coverage, Licensing & Permits";
const description = "Answers about how Caliche Plumbing works, where we cover, how plumber licensing and permits work by state, and what to expect from a plumber visit.";
const path = routes.faq();
export const metadata = pageMeta({ title, description, path });

export default function Faq() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "FAQ", path },
  ];
  const faqs = [
    ...generalFaqs,
    { q: "Who issues plumbing permits?", a: "Your city or county building department. In unincorporated areas it's usually the county. A licensed plumber normally pulls the permit as part of the job for work like water heater replacement, repiping, sewer repair and gas lines." },
    { q: "Do all states license plumbers?", a: "Most do, through a state board or agency. A few, including New York, Pennsylvania, Missouri, Kansas, Nebraska and Wyoming, leave plumber licensing to cities and counties. Each state page on this site says who to check with." },
  ];
  return (
    <>
      <JsonLd data={graph(pageGraph({ path, name: title, description, type: "FAQPage", crumbs, faqs, about: [ids.org] }))} />
      <SimplePage title="Frequently asked questions" crumbs={crumbs}>
        <FaqList faqs={faqs} title="How it works, coverage and licensing" />
      </SimplePage>
      <CtaBand />
    </>
  );
}
