import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-lime">
      <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-lg leading-8 text-muted">{lead}</p> : null}
    </div>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-lime-ink transition hover:bg-lime/90"
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium transition hover:border-fg/40"
    >
      {children}
    </a>
  );
}

export function FaqList({ items }: { items: { id: string; question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <details key={item.id} className="group py-5" open={index === 0}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 text-lg font-medium">
            <h3>{item.question}</h3>
            <span className="mt-1 text-lime transition group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-8 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">
      <div className="grid-glow overflow-hidden rounded-3xl border border-line bg-surface px-8 py-14 md:px-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">搭建、增长、扩展你的数字资产业务</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              从交易引擎、托管到合规工具，一个团队对接全部基础设施。告诉我们你的市场和业务模式，我们给出可落地的方案。
            </p>
          </div>
          <PrimaryLink href="/contact">预约演示</PrimaryLink>
        </div>
      </div>
    </section>
  );
}
