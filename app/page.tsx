import { JsonLd } from "@/components/json-ld";
import { getCatalog } from "@/lib/seo/load";
import { pageGraph } from "@/lib/seo/schema";
import { DISCLAIMER, UPDATED } from "@/lib/site";
import type { PageDoc } from "@/lib/seo/types";

export default async function HomePage() {
  const catalog = await getCatalog();
  const doc: PageDoc = {
    path: "/",
    title: "虚拟币、股票、期货与外汇交易系统搭建 | tradebuild",
    description:
      "按系统、机构类型和市场说明虚拟币交易所、股票、期货、外汇、白标、钱包和电商的交付范围。不是投资建议或持牌承诺。",
    h1: "虚拟币、股票、期货与外汇交易系统搭建",
    kicker: "交付说明",
    answer:
      "tradebuild 为机构整理七类系统的交付范围：虚拟币交易所、股票、期货、外汇、白标、钱包，以及面向真实商品的电商。页面按机构类型和市场拆开，直接写出模块、排除项和要核对的监管机构。",
    queries: [],
    facts: [],
    sections: [],
    faqs: [
      {
        question: "tradebuild 提供的是什么？",
        answer: "提供交易、白标、钱包和电商系统的交付说明，用来对照模块和监管入口。它不是经纪账户，也不提供投资建议。",
      },
      {
        question: "白标能否代替牌照？",
        answer: "不能。白标只配置品牌、费率和模块。谁对客、谁持牌、谁保管资产，必须由运营机构单独承担。",
      },
      {
        question: "如何找到某一个市场的说明？",
        answer: "从市场索引进入监管框架，或从某一系统进入机构类型，再进入具体市场。每个组合都有独立页面。",
      },
    ],
    related: [],
    crumbs: [{ name: "首页", path: "/" }],
    sources: [],
  };

  return (
    <main id="content">
      <JsonLd data={pageGraph(doc)} />
      <section className="bg-pine text-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-sm tracking-wide text-paper/80">tradebuild · 内容整理于 {UPDATED}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-balance md:text-6xl">{doc.h1}</h1>
          <p id="direct-answer" className="mt-6 max-w-3xl text-lg leading-8 text-paper/90">
            {doc.answer}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-8" aria-labelledby="systems">
        <h2 id="systems" className="font-serif text-3xl">
          七类系统
        </h2>
        <ol className="mt-4 border-b border-line">
          {catalog.services.map((service, index) => (
            <li key={service.slug} className="border-t border-line">
              <a
                href={`/solutions/${service.slug}`}
                className="grid gap-3 py-7 md:grid-cols-[5rem_14rem_1fr] md:items-baseline"
              >
                <span className="font-serif text-2xl text-pine">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl">{service.name}</span>
                <span className="leading-7 text-muted">{service.definition}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">
            <a href="/markets" className="hover:text-pine">
              市场
            </a>
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {catalog.markets.map((market) => (
              <li key={market.slug}>
                <a href={`/markets/${market.slug}`} className="flex items-baseline justify-between gap-4 py-3">
                  <span>{market.name}</span>
                  <span className="text-right text-sm text-muted">{market.regulator}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl">
            <a href="/audiences" className="hover:text-pine">
              机构
            </a>
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {catalog.audiences.map((audience) => (
              <li key={audience.slug}>
                <a href={`/audiences/${audience.slug}`} className="block py-3">
                  <span className="block">{audience.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{audience.focus}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-8" aria-labelledby="home-faq">
        <h2 id="home-faq" className="font-serif text-3xl">
          常见问题
        </h2>
        <div className="mt-4 divide-y divide-line border-y border-line">
          {doc.faqs.map((faq) => (
            <div key={faq.question} className="py-5">
              <h3 className="text-lg">{faq.question}</h3>
              <p className="mt-2 max-w-3xl leading-8">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-muted">{DISCLAIMER}</p>
      </section>
    </main>
  );
}
