import { getCatalog } from "@/lib/seo/load";
import { DISCLAIMER, EMAIL, UPDATED } from "@/lib/site";

export async function Footer() {
  const catalog = await getCatalog();
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl text-pine">tradebuild</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">{DISCLAIMER}</p>
          <p className="mt-4 text-sm text-muted">内容整理于 {UPDATED}</p>
        </div>
        <nav aria-label="系统">
          <p className="text-sm font-medium">系统</p>
          <ul className="mt-3 space-y-2 text-sm">
            {catalog.services.map((service) => (
              <li key={service.slug}>
                <a href={`/solutions/${service.slug}`} className="hover:text-pine">
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="站点">
          <p className="text-sm font-medium">站点</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/solutions" className="hover:text-pine">全部方案</a></li>
            <li><a href="/markets" className="hover:text-pine">市场</a></li>
            <li><a href="/audiences" className="hover:text-pine">机构类型</a></li>
            <li><a href="/faq" className="hover:text-pine">问答</a></li>
            <li><a href="/about" className="hover:text-pine">关于</a></li>
            <li><a href="/contact" className="hover:text-pine">联系</a></li>
            <li><a href="/privacy" className="hover:text-pine">隐私</a></li>
            <li><a href="/terms" className="hover:text-pine">条款</a></li>
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-pine">
                {EMAIL}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
