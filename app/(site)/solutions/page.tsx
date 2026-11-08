import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { solutionsIndex } from "@/lib/seo/indexes";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";
import { getSolutions, type SolutionDoc } from "@/sanity/client";

export const revalidate = 60;

const groups: { tier: SolutionDoc["tier"]; title: string }[] = [
  { tier: "core", title: "核心方案" },
  { tier: "service", title: "全链路能力" },
  { tier: "market", title: "更多交易系统" },
];

export async function generateMetadata(): Promise<Metadata> {
  return metadataFor(solutionsIndex(await getCatalog()));
}

export default async function SolutionsPage() {
  const [catalog, solutions] = await Promise.all([getCatalog(), getSolutions()]);
  return (
    <DocPage doc={solutionsIndex(catalog)}>
      {groups.map(({ tier, title }) => {
        const items = solutions.filter((solution) => solution.tier === tier);
        if (!items.length) return null;
        return (
          <section key={tier} className="mb-14" aria-labelledby={`tier-${tier}`}>
            <h2 id={`tier-${tier}`} className="text-2xl font-semibold tracking-tight">
              {title}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {items.map((solution) => (
                <li key={solution._id}>
                  <a
                    href={`/solutions/${solution.slug}`}
                    className="block h-full rounded-2xl border border-line bg-surface p-6 transition hover:border-lime/50"
                  >
                    <span className="block text-lg font-semibold">{solution.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted">{solution.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </DocPage>
  );
}
