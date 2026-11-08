import { HeroTerminal } from "@/components/hero-terminal";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, Eyebrow, FaqList, GhostLink, PrimaryLink, SectionHeading } from "@/components/ui";
import { getCatalog } from "@/lib/seo/load";
import { pageGraph } from "@/lib/seo/schema";
import type { PageDoc } from "@/lib/seo/types";
import { getAbout, getFaqs, getSolutions } from "@/sanity/client";

export const revalidate = 60;

const ANSWER =
  "tradebuild 为交易所、券商、支付机构和金融科技公司提供数字资产与传统金融交易基础设施：白标虚拟币交易所、RWA 代币化交易所、MPC 托管钱包，以及股票、期货、外汇和电商系统，配套流动性、KYT 与合规工具。";

export default async function HomePage() {
  const [catalog, solutions, faqs, about] = await Promise.all([
    getCatalog(),
    getSolutions(),
    getFaqs(),
    getAbout(),
  ]);
  const core = solutions.filter((solution) => solution.tier === "core");
  const services = solutions.filter((solution) => solution.tier === "service");
  const markets = solutions.filter((solution) => solution.tier === "market");
  const topFaqs = faqs.slice(0, 6);

  const doc: PageDoc = {
    path: "/",
    title: "数字资产交易所与交易系统搭建 | tradebuild",
    description: ANSWER,
    h1: "安全、合规、可扩展的数字资产与交易系统",
    kicker: "首页",
    answer: ANSWER,
    queries: [],
    facts: [],
    sections: [],
    faqs: topFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    related: [],
    crumbs: [{ name: "首页", path: "/" }],
    sources: [],
  };

  const stats = [
    { value: String(catalog.services.length), label: "类核心交易系统" },
    { value: String(catalog.markets.length), label: "个市场的监管框架" },
    { value: String(catalog.audiences.length), label: "类机构实施路径" },
    { value: "MPC", label: "机构级资产托管" },
    { value: "7×24", label: "运维与技术支持" },
  ];

  return (
    <main id="content">
      <JsonLd data={pageGraph(doc)} />

      <section className="grid-glow border-b border-line">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>交易 · 托管 · 合规基础设施</Eyebrow>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-balance md:text-6xl">
              安全、合规、可扩展的
              <span className="text-lime">数字资产</span>与交易系统
            </h1>
            <p id="direct-answer" className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {ANSWER}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryLink href="/contact">预约演示</PrimaryLink>
              <GhostLink href="/solutions">查看全部方案</GhostLink>
            </div>
          </div>
          <HeroTerminal />
        </div>
      </section>

      <section aria-label="能力概览" className="border-b border-line bg-surface">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 md:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse py-8 md:px-4">
              <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {core.length ? (
        <section className="mx-auto max-w-7xl px-6 pt-24" aria-labelledby="core">
          <SectionHeading
            id="core"
            eyebrow="核心方案"
            title="合规就绪的数字资产解决方案"
            lead="安全、可扩展的基础设施，帮你加速业务增长，同时把运营与监管的复杂度降到最低。"
          />
          <div className="mt-14 space-y-6">
            {core.map((solution, index) => (
              <article
                key={solution._id}
                className="grid gap-10 rounded-3xl border border-line bg-surface p-8 md:p-12 lg:grid-cols-[1fr_1.1fr]"
              >
                <div>
                  <p className="font-mono text-sm text-lime">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{solution.title}</h3>
                  <p className="mt-4 leading-8 text-muted">{solution.summary}</p>
                  <a
                    href={`/solutions/${solution.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-lime hover:underline"
                  >
                    了解{solution.title} <span aria-hidden="true">→</span>
                  </a>
                </div>
                {solution.features?.length ? (
                  <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                    {solution.features.map((feature) => (
                      <li key={feature._key} className="bg-raised p-5">
                        <p className="font-medium">{feature.title}</p>
                        {feature.description ? (
                          <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {services.length ? (
        <section className="mx-auto max-w-7xl px-6 pt-24" aria-labelledby="services">
          <SectionHeading
            id="services"
            eyebrow="全链路能力"
            title="覆盖数字资产全生命周期的端到端方案"
            lead="从交易引擎、安全托管到流动性与合规工具，一套集成能力撑起你的整个数字资产业务。"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((solution) => (
              <a
                key={solution._id}
                href={`/solutions/${solution.slug}`}
                className="group rounded-2xl border border-line bg-surface p-7 transition hover:border-lime/50 hover:bg-raised"
              >
                <h3 className="text-xl font-semibold">{solution.title}</h3>
                <p className="mt-3 leading-7 text-muted">{solution.summary}</p>
                <span className="mt-6 inline-block text-sm text-lime opacity-70 transition group-hover:opacity-100">
                  查看详情 →
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {markets.length ? (
        <section className="mx-auto max-w-7xl px-6 pt-24" aria-labelledby="more-systems">
          <SectionHeading
            id="more-systems"
            eyebrow="更多交易系统"
            title="传统金融市场与电商系统"
            lead="同一套工程能力也覆盖股票、期货、外汇经纪和真实商品电商。"
          />
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {markets.map((solution) => (
              <li key={solution._id}>
                <a
                  href={`/solutions/${solution.slug}`}
                  className="grid gap-2 py-6 transition hover:bg-surface md:grid-cols-[18rem_1fr_auto] md:items-center md:px-4"
                >
                  <span className="text-lg font-medium">{solution.title}</span>
                  <span className="leading-7 text-muted">{solution.summary}</span>
                  <span className="text-lime" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 pt-24" aria-labelledby="markets">
        <SectionHeading
          id="markets"
          eyebrow="全球市场"
          title={`${catalog.markets.length} 个市场的监管框架，一页看清`}
          lead="每个市场页都写明监管机构和上线前要核对的问题，并按系统和机构类型展开。"
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {catalog.markets.map((market) => (
            <a
              key={market.slug}
              href={`/markets/${market.slug}`}
              className="rounded-xl border border-line bg-surface px-5 py-4 transition hover:border-lime/50"
            >
              <span className="block font-medium">{market.name}</span>
              <span className="mt-1 block text-xs leading-5 text-muted">{market.regulator}</span>
            </a>
          ))}
        </div>
      </section>

      {about?.values?.length ? (
        <section className="mx-auto max-w-7xl px-6 pt-24" aria-labelledby="why">
          <SectionHeading id="why" eyebrow="为什么选择 tradebuild" title="一站式、安全、合规的基础设施" lead={about.intro} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value) => (
              <div key={value._key} className="rounded-2xl border border-line bg-surface p-7">
                <h3 className="text-lg font-semibold">{value.title}</h3>
                {value.description ? <p className="mt-3 leading-7 text-muted">{value.description}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {topFaqs.length ? (
        <section className="mx-auto grid max-w-7xl gap-12 px-6 pt-24 lg:grid-cols-[0.8fr_1.2fr]" aria-labelledby="home-faq">
          <div>
            <SectionHeading id="home-faq" eyebrow="常见问题" title="上线前最常被问到的问题" />
            <a href="/faq" className="mt-6 inline-block text-sm text-lime hover:underline">
              查看全部问题 →
            </a>
          </div>
          <FaqList items={topFaqs.map((faq) => ({ id: faq._id, question: faq.question, answer: faq.answer }))} />
        </section>
      ) : null}

      <CtaBand />
    </main>
  );
}
