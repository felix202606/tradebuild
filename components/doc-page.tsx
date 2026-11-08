import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, Eyebrow, FaqList, PrimaryLink } from "@/components/ui";
import { pageGraph } from "@/lib/seo/schema";
import type { PageDoc } from "@/lib/seo/types";
import { DISCLAIMER } from "@/lib/site";

function Breadcrumbs({ crumbs }: { crumbs: PageDoc["crumbs"] }) {
  return (
    <nav aria-label="面包屑" className="text-sm text-muted">
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex gap-2">
              {last ? (
                <span aria-current="page" className="text-fg">
                  {crumb.name}
                </span>
              ) : (
                <a href={crumb.path} className="hover:text-fg">
                  {crumb.name}
                </a>
              )}
              {last ? null : <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function DocPage({ doc, lead, children }: { doc: PageDoc; lead?: ReactNode; children?: ReactNode }) {
  const relatedLabel = doc.related.length > 12 ? "继续阅读" : "相关页面";
  return (
    <main id="content">
      <JsonLd data={pageGraph(doc)} />
      <section className="grid-glow border-b border-line">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20">
          <Breadcrumbs crumbs={doc.crumbs} />
          <div className="mt-12 max-w-4xl">
            <Eyebrow>{doc.kicker}</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">{doc.h1}</h1>
            <p id="direct-answer" className="mt-6 text-lg leading-8 text-muted">
              {doc.answer}
            </p>
            {lead}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {children}

          {doc.queries.length ? (
            <section aria-labelledby="queries" className="rounded-2xl border border-line bg-surface p-7">
              <h2 id="queries" className="text-lg font-semibold">
                本页回答的问题
              </h2>
              <ul className="mt-4 space-y-2 text-muted">
                {doc.queries.map((query) => (
                  <li key={query} className="flex gap-3">
                    <span className="text-lime" aria-hidden="true">›</span>
                    {query}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {doc.sections.map((section) => (
            <section key={section.heading} className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-8 text-muted">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {doc.sources.length ? (
            <section className="mt-14" aria-labelledby="sources">
              <h2 id="sources" className="text-2xl font-semibold tracking-tight">
                监管公开入口
              </h2>
              <p className="mt-4 leading-8 text-muted">规则以该机构当时公布的文本为准。链接只方便核对，不是认证或背书。</p>
              <ul className="mt-4 space-y-2">
                {doc.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} className="text-lime underline" rel="noopener noreferrer">
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {doc.faqs.length ? (
            <section className="mt-14" aria-labelledby="faq">
              <h2 id="faq" className="mb-6 text-2xl font-semibold tracking-tight">
                常见问题
              </h2>
              <FaqList items={doc.faqs.map((faq) => ({ id: faq.question, ...faq }))} />
            </section>
          ) : null}

          {doc.related.length ? (
            <section className="mt-14" aria-labelledby="related">
              <h2 id="related" className="text-2xl font-semibold tracking-tight">
                {relatedLabel}
              </h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {doc.related.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block h-full rounded-xl border border-line bg-surface p-5 transition hover:border-lime/50"
                    >
                      <span className="block font-medium">{item.title}</span>
                      <span className="mt-2 block text-sm leading-6 text-muted">{item.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-14 text-xs leading-6 text-muted/80">{DISCLAIMER}</p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {doc.facts.length ? (
            <dl className="rounded-2xl border border-line bg-surface p-6">
              {doc.facts.map((fact) => (
                <div key={fact.label} className="border-b border-line py-3 first:pt-0 last:border-0 last:pb-0">
                  <dt className="text-xs text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="mt-5 rounded-2xl border border-lime/30 bg-lime/5 p-6">
            <p className="font-medium">需要一份针对你业务的方案？</p>
            <p className="mt-2 text-sm leading-6 text-muted">告诉我们市场、机构类型和要上线的系统。</p>
            <div className="mt-5">
              <PrimaryLink href="/contact">预约演示</PrimaryLink>
            </div>
          </div>
        </aside>
      </div>

      <CtaBand />
    </main>
  );
}
