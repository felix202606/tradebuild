const links = [
  { href: "/solutions", label: "解决方案" },
  { href: "/markets", label: "全球市场" },
  { href: "/audiences", label: "适用机构" },
  { href: "/faq", label: "常见问题" },
  { href: "/about", label: "关于我们" },
];

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
      <img src="/logo-mark.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
      <span className="tracking-tight">
        <span className="text-[#3ee0a0]">trade</span>
        <span className="text-[#ff6a2b]">build</span>
      </span>
    </a>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted lg:flex" aria-label="主导航">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-fg">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden rounded-full bg-lime px-4 py-2 text-sm font-medium text-lime-ink transition hover:bg-lime/90 sm:inline-flex"
          >
            预约演示
          </a>
          <details className="relative lg:hidden">
            <summary className="cursor-pointer rounded-full border border-line px-3 py-1.5 text-sm">菜单</summary>
            <nav
              aria-label="移动导航"
              className="absolute right-0 z-10 mt-3 w-48 rounded-xl border border-line bg-surface p-2 shadow-2xl"
            >
              {links.map((link) => (
                <a key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-raised">
                  {link.label}
                </a>
              ))}
              <a href="/contact" className="mt-1 block rounded-lg bg-lime px-3 py-2 text-sm font-medium text-lime-ink">
                预约演示
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
