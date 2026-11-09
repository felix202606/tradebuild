import { findAudience, findMarket, findService } from "@/lib/seo/catalog";
import { UPDATED } from "@/lib/site";
import type {
  Audience,
  Catalog,
  Crumb,
  LinkItem,
  Market,
  PageDoc,
  Service,
} from "@/lib/seo/types";

export function servicePath(service: Service) {
  return `/solutions/${service.slug}`;
}

export function pairPath(service: Service, audience: Audience) {
  return `/solutions/${service.slug}/${audience.slug}`;
}

export function triplePath(service: Service, audience: Audience, market: Market) {
  return `/solutions/${service.slug}/${audience.slug}/${market.slug}`;
}

function hash(value: string) {
  return [...value].reduce((sum, char) => (sum * 33 + char.charCodeAt(0)) >>> 0, 7);
}

function windowOf<T>(items: T[], start: number, count: number, skip: (item: T) => boolean) {
  const picked: T[] = [];
  for (let index = 0; index < items.length && picked.length < count; index += 1) {
    const item = items[(start + index) % items.length];
    if (skip(item)) continue;
    picked.push(item);
  }
  return picked;
}

function homeCrumb(): Crumb {
  return { name: "首页", path: "/" };
}

export function composeService(catalog: Catalog, service: Service): PageDoc {
  const related: LinkItem[] = catalog.audiences.map((audience) => ({
    href: pairPath(service, audience),
    title: `${audience.name}${service.keyword}`,
    note: audience.focus,
  }));
  return {
    path: servicePath(service),
    title: `${service.keyword}搭建 | tradebuild`,
    description: `${service.definition}模块包括${service.modules.slice(0, 3).join("、")}。本页说明交付范围，不是投资建议。`,
    h1: `${service.name}搭建`,
    kicker: "系统交付范围",
    answer: `${service.name}是 tradebuild 说明的一类交付对象。${service.definition}${service.outcome}`,
    queries: [
      `${service.keyword}怎么搭建`,
      `${service.keyword}包含哪些模块`,
      `${service.keyword}不包含什么`,
    ],
    facts: [
      { label: "系统", value: service.name },
      { label: "更新", value: UPDATED },
      { label: "页面性质", value: "交付说明，不是牌照或投资建议" },
    ],
    sections: [
      {
        heading: `${service.name}包含哪些模块`,
        paragraphs: [service.definition, service.outcome],
        bullets: service.modules,
      },
      {
        heading: "明确不包含的范围",
        paragraphs: [
          "下列事项不因页面存在而被承诺。机构如果需要这些范围之外的能力，应单独评估法律和运营责任。",
        ],
        bullets: service.excludes,
      },
      {
        heading: "按机构类型继续看",
        paragraphs: [
          "同一种系统接到不同机构，开户、授权、对账和牌照边界都不一样。下一层页面按机构类型写实施重点，并继续拆到具体市场。",
        ],
      },
    ],
    faqs: [
      {
        question: `${service.keyword}搭建时先交付什么？`,
        answer: `${service.name}的交付围绕这些模块：${service.modules.join("、")}。${service.outcome}`,
      },
      {
        question: `${service.keyword}是否包含牌照？`,
        answer: `不包含。${service.excludes[0]}。系统上线前，运营机构要自行取得业务发生地要求的许可。`,
      },
      {
        question: `不同机构使用${service.keyword}有什么差别？`,
        answer: `模块清单可以相同，但接入方式不同。${catalog.audiences[0].name}关注${catalog.audiences[0].focus}${catalog.audiences[1].name}则要${catalog.audiences[1].focus}`,
      },
    ],
    related,
    crumbs: [homeCrumb(), { name: "方案", path: "/solutions" }, { name: service.name, path: servicePath(service) }],
    sources: [],
    serviceName: service.name,
  };
}

export function composePair(catalog: Catalog, service: Service, audience: Audience): PageDoc {
  return {
    path: pairPath(service, audience),
    title: `${audience.name}${service.keyword}搭建 | tradebuild`,
    description: `${audience.name}交付${service.keyword}时，${audience.focus}模块含${service.modules.slice(0, 2).join("、")}。非投资建议。`,
    h1: `${audience.name}${service.keyword}搭建`,
    kicker: audience.name,
    answer: `${audience.name}交付${service.name}时，应先处理机构自身的约束。${audience.job}${audience.focus}${service.definition}`,
    queries: [
      `${audience.name}${service.keyword}怎么搭建`,
      `${audience.name}需要哪些${service.name}模块`,
      `${audience.name}做${service.keyword}不包含什么`,
    ],
    facts: [
      { label: "系统", value: service.name },
      { label: "机构", value: audience.name },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: `${audience.name}的实施重点`,
        paragraphs: [audience.job, audience.need, audience.focus, service.outcome],
      },
      {
        heading: "模块与排除项",
        paragraphs: [service.definition],
        bullets: [...service.modules, ...service.excludes],
      },
      {
        heading: "按市场核对监管框架",
        paragraphs: [
          "同一机构和同一系统，换一个市场，监管入口就不同。下面每个市场页都写明该市场的监管机构和上线前要核对的问题。",
        ],
      },
    ],
    faqs: [
      {
        question: `${audience.name}搭建${service.keyword}，和通用白标有什么不同？`,
        answer: `${audience.job}${audience.focus}白标只替换品牌和配置，不改变${audience.name}自己的牌照和客户责任。`,
      },
      {
        question: `${audience.name}的${service.keyword}包含哪些模块？`,
        answer: `包含${service.modules.join("、")}。${service.outcome}`,
      },
      {
        question: `为什么还要再按市场拆开？`,
        answer: `因为许可按活动和客户所在地判断，不按系统品牌判断。${catalog.markets[0].name}看${catalog.markets[0].regulator}，${catalog.markets[1].name}看${catalog.markets[1].regulator}。`,
      },
    ],
    related: catalog.markets.map((market) => ({
      href: triplePath(service, audience, market),
      title: `${market.name}${audience.name}${service.keyword}`,
      note: market.regulator,
    })),
    crumbs: [
      homeCrumb(),
      { name: "方案", path: "/solutions" },
      { name: service.name, path: servicePath(service) },
      { name: audience.name, path: pairPath(service, audience) },
    ],
    sources: [],
    serviceName: service.name,
  };
}

export function composeTriple(
  catalog: Catalog,
  service: Service,
  audience: Audience,
  market: Market,
): PageDoc {
  const seed = hash(`${service.slug}:${audience.slug}:${market.slug}`);
  const markets = windowOf(catalog.markets, seed, 4, (item) => item.slug === market.slug);
  const audiences = windowOf(catalog.audiences, seed, 3, (item) => item.slug === audience.slug);
  const services = windowOf(catalog.services, seed, 3, (item) => item.slug === service.slug);
  const related: LinkItem[] = [
    ...markets.map((item) => ({
      href: triplePath(service, audience, item),
      title: `${item.name}${audience.name}${service.keyword}`,
      note: item.regulator,
    })),
    ...audiences.map((item) => ({
      href: triplePath(service, item, market),
      title: `${market.name}${item.name}${service.keyword}`,
      note: item.focus,
    })),
    ...services.map((item) => ({
      href: triplePath(item, audience, market),
      title: `${market.name}${audience.name}${item.keyword}`,
      note: item.outcome,
    })),
  ];

  return {
    path: triplePath(service, audience, market),
    title: `${market.name}${audience.name}${service.keyword} | tradebuild`,
    description: `${market.name}${audience.name}的${service.keyword}：核对${market.regulator}，包含${service.modules.slice(0, 3).join("、")}。不构成投资建议或持牌承诺。`,
    h1: `${market.name}${audience.name}${service.keyword}搭建`,
    kicker: `${market.regulator} · ${audience.name}`,
    answer: `${market.name}的${audience.name}若要交付${service.name}，先核对${market.regulator}框架下的要求。${market.framework}${audience.job}${service.outcome}`,
    queries: [
      `${market.name}${audience.name}${service.keyword}怎么搭建`,
      `${market.name}${service.keyword}要符合${market.regulator}哪些框架`,
      `${audience.name}${service.keyword}包含哪些模块`,
    ],
    facts: [
      { label: "系统", value: service.name },
      { label: "机构", value: audience.name },
      { label: "市场", value: market.name },
      { label: "监管机构", value: market.regulator },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: `${service.name}包含哪些模块`,
        paragraphs: [service.definition, service.outcome],
        bullets: service.modules,
      },
      {
        heading: `在${market.name}要先核对什么`,
        paragraphs: [
          `公开监管入口是${market.regulator}。${market.framework}`,
          market.check,
          "本页引用该机构的公开网站，便于核对职责范围。引用不是认证，也不表示 tradebuild 或阅读本页的机构已经获得许可。",
        ],
      },
      {
        heading: `${audience.name}的实施重点`,
        paragraphs: [audience.job, audience.need, `${audience.focus}${service.outcome}`],
      },
      {
        heading: "明确不包含的范围",
        paragraphs: [
          `这些边界在${market.name}同样适用。${audience.name}不能靠系统功能替代牌照、客户资产隔离或真实业务记录。`,
        ],
        bullets: service.excludes,
      },
    ],
    faqs: [
      {
        question: `${market.name}的${audience.name}搭建${service.keyword}，要先准备什么？`,
        answer: `先确认${market.regulator}框架下，${audience.name}是否已经具备或正在申请对应资格。${market.check}系统可以配置${service.modules[0]}和${service.modules[1]}，但不能代替许可本身。`,
      },
      {
        question: `${service.keyword}给${audience.name}交付时包含哪些模块？`,
        answer: `包含${service.modules.join("、")}。${service.definition}`,
      },
      {
        question: `在${market.name}做${service.keyword}，明确不包含什么？`,
        answer: `${service.excludes.join("。")}。${audience.name}若需要这些范围之外的能力，应单独评估，而不是把本页理解成全包承诺。`,
      },
      {
        question: `${audience.name}为什么不能直接套用另一个机构的方案？`,
        answer: `${audience.job}${audience.need}所以同一套${service.name}在权限、对账和审计上要按${audience.name}调整，并同时满足${market.name}的监管框架：${market.framework}`,
      },
    ],
    related,
    crumbs: [
      homeCrumb(),
      { name: "方案", path: "/solutions" },
      { name: service.name, path: servicePath(service) },
      { name: audience.name, path: pairPath(service, audience) },
      { name: market.name, path: triplePath(service, audience, market) },
    ],
    sources: [{ name: market.sourceName, url: market.sourceUrl }],
    serviceName: service.name,
    areaServed: market.areaServed,
  };
}

export function composeMarket(catalog: Catalog, market: Market): PageDoc {
  const related = catalog.services.flatMap((service) =>
    catalog.audiences.map((audience) => ({
      href: triplePath(service, audience, market),
      title: `${market.name}${audience.name}${service.keyword}`,
      note: service.name,
    })),
  );
  return {
    path: `/markets/${market.slug}`,
    title: `${market.name}交易系统搭建的监管框架 | tradebuild`,
    description: `在${market.name}交付交易系统，先核对${market.regulator}。${market.check}本页不是法律意见。`,
    h1: `${market.name}交易系统搭建`,
    kicker: market.regulator,
    answer: `在${market.name}交付${catalog.services.map((service) => service.name).join("、")}之前，先核对${market.regulator}。${market.framework}${market.check}`,
    queries: [
      `${market.name}交易系统搭建要看哪家监管机构`,
      `${market.name}虚拟币交易所系统牌照框架`,
      `${market.name}白标交易系统能否直接展业`,
    ],
    facts: [
      { label: "市场", value: market.name },
      { label: "监管机构", value: market.regulator },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: `${market.name}要先核对的框架`,
        paragraphs: [market.framework, market.check],
      },
      {
        heading: "系统不会改变牌照主体",
        paragraphs: [
          "服务器位置、域名和白标标识都不能代替持牌主体。下面按系统和机构类型列出交付说明，便于把业务实质对上监管类别。",
        ],
      },
    ],
    faqs: [
      {
        question: `在${market.name}搭建交易系统，监管入口是哪里？`,
        answer: `${market.name}的公开监管入口是${market.regulator}。${market.framework}`,
      },
      {
        question: `只把系统部署在${market.name}，是否就已经合规？`,
        answer: `不是。${market.check}部署地点不是牌照。`,
      },
    ],
    related,
    crumbs: [homeCrumb(), { name: "市场", path: "/markets" }, { name: market.name, path: `/markets/${market.slug}` }],
    sources: [{ name: market.sourceName, url: market.sourceUrl }],
    areaServed: market.areaServed,
  };
}

export function composeAudience(catalog: Catalog, audience: Audience): PageDoc {
  return {
    path: `/audiences/${audience.slug}`,
    title: `${audience.name}交易系统搭建 | tradebuild`,
    description: `${audience.name}做交易系统：${audience.focus}本页按系统类型展开，不是投资建议。`,
    h1: `${audience.name}交易系统搭建`,
    kicker: "机构类型",
    answer: `${audience.name}选型时，先看机构本身的约束。${audience.job}${audience.need}${audience.focus}`,
    queries: [
      `${audience.name}交易系统怎么搭建`,
      `${audience.name}需要白标还是完整交易栈`,
      `${audience.name}交易系统不包含什么`,
    ],
    facts: [
      { label: "机构", value: audience.name },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: `${audience.name}的实施重点`,
        paragraphs: [audience.job, audience.need, audience.focus],
      },
      {
        heading: "按系统继续看",
        paragraphs: ["每种系统的模块和排除项不同。进入系统页后，可以再按市场核对监管机构。"],
      },
    ],
    faqs: [
      {
        question: `${audience.name}搭建交易系统，最先决定什么？`,
        answer: `${audience.focus}${audience.need}`,
      },
      {
        question: `${audience.name}能否用白标代替牌照？`,
        answer: `不能。白标只配置品牌、费率和模块。${audience.job}`,
      },
    ],
    related: catalog.services.map((service) => ({
      href: pairPath(service, audience),
      title: `${audience.name}${service.keyword}`,
      note: service.outcome,
    })),
    crumbs: [
      homeCrumb(),
      { name: "机构", path: "/audiences" },
      { name: audience.name, path: `/audiences/${audience.slug}` },
    ],
    sources: [],
  };
}

export function pageForService(catalog: Catalog, slug: string) {
  const service = findService(catalog, slug);
  return service ? composeService(catalog, service) : null;
}

export function pageForPair(catalog: Catalog, serviceSlug: string, audienceSlug: string) {
  const service = findService(catalog, serviceSlug);
  const audience = findAudience(catalog, audienceSlug);
  if (!service || !audience) return null;
  return composePair(catalog, service, audience);
}

export function pageForTriple(
  catalog: Catalog,
  serviceSlug: string,
  audienceSlug: string,
  marketSlug: string,
) {
  const service = findService(catalog, serviceSlug);
  const audience = findAudience(catalog, audienceSlug);
  const market = findMarket(catalog, marketSlug);
  if (!service || !audience || !market) return null;
  return composeTriple(catalog, service, audience, market);
}

export function pageForMarket(catalog: Catalog, slug: string) {
  const market = findMarket(catalog, slug);
  return market ? composeMarket(catalog, market) : null;
}

export function pageForAudience(catalog: Catalog, slug: string) {
  const audience = findAudience(catalog, slug);
  return audience ? composeAudience(catalog, audience) : null;
}

export function allPaths(catalog: Catalog) {
  const paths = [
    "/",
    "/solutions",
    "/markets",
    "/audiences",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ];
  for (const service of catalog.services) {
    paths.push(servicePath(service));
    for (const audience of catalog.audiences) {
      paths.push(pairPath(service, audience));
      for (const market of catalog.markets) {
        paths.push(triplePath(service, audience, market));
      }
    }
  }
  for (const market of catalog.markets) paths.push(`/markets/${market.slug}`);
  for (const audience of catalog.audiences) paths.push(`/audiences/${audience.slug}`);
  return paths;
}
