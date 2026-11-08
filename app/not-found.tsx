import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面不存在 | tradebuild",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="content" className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl">页面不存在</h1>
      <p className="mt-4 leading-8">这个地址没有对应的系统、机构或市场。从方案索引重新选择。</p>
      <a href="/solutions" className="mt-6 inline-block text-pine underline">
        查看全部方案
      </a>
    </main>
  );
}
