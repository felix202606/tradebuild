import { JsonLd } from "@/components/json-ld";
import { pageGraph } from "@/lib/seo/schema";
import { DISCLAIMER } from "@/lib/site";
import type { PageDoc } from "@/lib/seo/types";

export function DocPage({ doc }: { doc: PageDoc }) {
  const relatedLabel = doc.related.length > 12 ? "继续阅读" : "相邻页面";
  return (
    <main id="content" className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd data={pageGraph(doc)} />
      <nav aria-label="面包屑" className="text-sm text-muted">
        <ol className="flex flex-wrap gap-x-2 gap-y-1">
          {doc.crumbs.map((crumb, index) => {
            const last = index === doc.crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex gap-2">
                {last ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <a href={crumb.path} className="hover:text-pine">
                    {crumb.name}
                  </a>
                )}
                {last ? null : <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <p className="mt-8 text-sm text-clay">{doc.kicker}</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance md:text-5xl">{doc.h1}</h1>
      <p id="direct-answer" className="mt-6 text-lg leading-8">
        {doc.answer}
      </p>
      <dl className="mt-8 grid gap-4 border-y border-line py-6 sm:grid-cols-2">
        {doc.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-sm text-muted">{fact.label}</dt>
            <dd className="mt-1">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <section className="mt-10" aria-labelledby="queries">
        <h2 id="queries" className="font-serif text-2xl">
          本页回答的问题
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {doc.queries.map((query) => (
            <li key={query}>{query}</li>
          ))}
        </ul>
      </section>
      {doc.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-serif text-2xl">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-8">
              {paragraph}
            </p>
          ))}
          {section.bullets ? (
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      {doc.sources.length ? (
        <section className="mt-10" aria-labelledby="sources">
          <h2 id="sources" className="font-serif text-2xl">
            监管公开入口
          </h2>
          <p className="mt-4 leading-8">规则以该机构当时公布的文本为准。链接只方便核对，不是认证或背书。</p>
          <ul className="mt-4 space-y-2">
            {doc.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} className="text-pine underline" rel="noopener noreferrer">
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="mt-10" aria-labelledby="faq">
        <h2 id="faq" className="font-serif text-2xl">
          常见问题
        </h2>
        <div className="mt-4 divide-y divide-line border-y border-line">
          {doc.faqs.map((faq) => (
            <div key={faq.question} className="py-5">
              <h3 className="text-lg">{faq.question}</h3>
              <p className="mt-2 leading-8">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10" aria-labelledby="related">
        <h2 id="related" className="font-serif text-2xl">
          {relatedLabel}
        </h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {doc.related.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="block py-4 hover:text-pine">
                <span className="block">{item.title}</span>
                <span className="mt-1 block text-sm text-muted">{item.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <p className="mt-10 text-sm leading-6 text-muted">{DISCLAIMER}</p>
    </main>
  );
}
