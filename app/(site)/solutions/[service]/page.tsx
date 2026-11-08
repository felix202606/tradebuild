import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { Portable } from "@/components/portable";
import { pageForService } from "@/lib/seo/compose";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";
import type { PageDoc } from "@/lib/seo/types";
import { getSolution, getSolutions, type SolutionDoc } from "@/sanity/client";

export const revalidate = 60;

export async function generateStaticParams() {
  const [catalog, solutions] = await Promise.all([getCatalog(), getSolutions()]);
  const slugs = new Set([...catalog.services.map((service) => service.slug), ...solutions.map((solution) => solution.slug)]);
  return [...slugs].map((service) => ({ service }));
}

function docFromSolution(solution: SolutionDoc): PageDoc {
  const path = `/solutions/${solution.slug}`;
  return {
    path,
    title: solution.seo?.title || `${solution.title} | tradebuild`,
    description: solution.seo?.description || solution.summary,
    h1: solution.title,
    kicker: "解决方案",
    answer: solution.summary,
    queries: [],
    facts: [],
    sections: [],
    faqs: [],
    related: [],
    crumbs: [
      { name: "首页", path: "/" },
      { name: "解决方案", path: "/solutions" },
      { name: solution.title, path },
    ],
    sources: [],
    serviceName: solution.title,
  };
}

async function load(slug: string) {
  const [catalog, solution] = await Promise.all([getCatalog(), getSolution(slug)]);
  const generated = pageForService(catalog, slug);
  if (!generated && !solution) return null;
  if (!generated) return { doc: docFromSolution(solution!), solution };
  if (!solution) return { doc: generated, solution };
  return {
    doc: {
      ...generated,
      title: solution.seo?.title || generated.title,
      description: solution.seo?.description || generated.description,
      h1: solution.title,
    },
    solution,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const result = await load(service);
  if (!result) return { title: "页面不存在", robots: { index: false, follow: false } };
  return metadataFor(result.doc);
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const result = await load(service);
  if (!result) notFound();
  const { doc, solution } = result;
  const features = solution?.features ?? [];

  return (
    <DocPage doc={doc}>
      {features.length ? (
        <section aria-labelledby="features" className="mb-14">
          <h2 id="features" className="text-2xl font-semibold tracking-tight">
            核心功能
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature._key} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold">{feature.title}</h3>
                {feature.description ? <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {solution?.body?.length ? (
        <div className="mb-14">
          <Portable value={solution.body} />
        </div>
      ) : null}
    </DocPage>
  );
}
