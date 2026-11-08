import { Logo } from "@/components/header";
import { getCatalog } from "@/lib/seo/load";
import { DISCLAIMER, EMAIL } from "@/lib/site";
import { getSolutions } from "@/sanity/client";

export async function Footer() {
  const [catalog, solutions] = await Promise.all([getCatalog(), getSolutions()]);
  const visible = solutions.filter((solution) => solution.tier !== "hidden");
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
            为交易所、券商与金融机构提供交易、托管与合规基础设施。
          </p>
          <a href={`mailto:${EMAIL}`} className="mt-5 inline-block text-sm text-lime hover:underline">
            {EMAIL}
          </a>
        </div>
        <nav aria-label="解决方案">
          <p className="text-sm font-medium">解决方案</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {visible.slice(0, 9).map((solution) => (
              <li key={solution._id}>
                <a href={`/solutions/${solution.slug}`} className="hover:text-fg">
                  {solution.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="全球市场">
          <p className="text-sm font-medium">全球市场</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {catalog.markets.slice(0, 9).map((market) => (
              <li key={market.slug}>
                <a href={`/markets/${market.slug}`} className="hover:text-fg">
                  {market.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="公司">
          <p className="text-sm font-medium">公司</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><a href="/about" className="hover:text-fg">关于我们</a></li>
            <li><a href="/faq" className="hover:text-fg">常见问题</a></li>
            <li><a href="/audiences" className="hover:text-fg">适用机构</a></li>
            <li><a href="/contact" className="hover:text-fg">联系我们</a></li>
            <li><a href="/privacy" className="hover:text-fg">隐私政策</a></li>
            <li><a href="/terms" className="hover:text-fg">使用条款</a></li>
            <li><a href="/studio" rel="nofollow" className="hover:text-fg">内容后台</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs leading-6 text-muted/80">
          <p>{DISCLAIMER}</p>
          <p className="mt-2">© {new Date().getFullYear()} tradebuild</p>
        </div>
      </div>
    </footer>
  );
}
