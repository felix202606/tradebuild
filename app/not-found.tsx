import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面不存在 | tradebuild",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="content" className="grid-glow flex min-h-dvh items-center">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-sm text-lime">404</p>
        <h1 className="mt-4 text-4xl font-semibold">页面不存在</h1>
        <p className="mt-4 leading-8 text-muted">这个地址没有对应的方案、机构或市场。</p>
        <a
          href="/solutions"
          className="mt-8 inline-flex rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-lime-ink"
        >
          查看全部方案
        </a>
      </div>
    </main>
  );
}
