import Link from "next/link";
import { publishedArticles } from "@/content/articles";
import { pageMeta } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { graph, ids, pageGraph } from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";

const title = "Plumbing Guides for Homeowners";
const description =
  "Plain-language plumbing guides: high water bills, slab leaks, hard water, polybutylene, water heaters, pressure, frozen backflows, burst pipes and gas.";
const path = routes.resources();

export const metadata = pageMeta({ title, description, path });

export default function Resources() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path },
  ];
  const cats = [...new Set(publishedArticles.map((a) => a.category))];
  return (
    <main id="main">
      <JsonLd data={graph(pageGraph({ path, name: title, description, type: "CollectionPage", crumbs, about: [ids.org] }))} />
      <Hero crumbs={crumbs} eyebrow="Resources" title="Straight answers about home plumbing" lead={<p>Each guide opens with the short answer, then explains the why, what you can check yourself, and when to call a plumber.</p>} />
      <section className="py-14">
        <div className="container-x space-y-12">
          {cats.map((cat) => (
            <div key={cat}>
              <h2 className="text-3xl font-semibold">{cat}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {publishedArticles
                  .filter((a) => a.category === cat)
                  .map((a) => (
                    <Link key={a.slug} href={routes.guide(a.slug)} className="card group p-6">
                      <h3 className="text-lg font-semibold group-hover:text-teal-deep">{a.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm text-muted">{a.answer}</p>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
