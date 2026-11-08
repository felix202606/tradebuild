const links = [
  { href: "/solutions", label: "方案" },
  { href: "/markets", label: "市场" },
  { href: "/audiences", label: "机构" },
  { href: "/faq", label: "问答" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export function Header() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href="/" className="font-serif text-2xl tracking-tight text-pine">
          tradebuild
        </a>
        <nav className="hidden items-center gap-5 text-sm md:flex" aria-label="主导航">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-pine">
              {link.label}
            </a>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none text-sm">菜单</summary>
          <nav
            aria-label="移动导航"
            className="absolute right-0 z-10 mt-3 w-40 border border-line bg-card p-3"
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} className="block py-2 text-sm">
                {link.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
