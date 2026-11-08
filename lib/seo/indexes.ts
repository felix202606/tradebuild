import { UPDATED } from "@/lib/site";
import type { Catalog, PageDoc } from "@/lib/seo/types";

export function solutionsIndex(catalog: Catalog): PageDoc {
  return {
    path: "/solutions",
    title: "交易系统与白标方案 | tradebuild",
    description:
      "按虚拟币、股票、期货、外汇、白标、钱包和电商查看交付模块。每套系统再按机构类型和市场拆开。不是投资建议。",
    h1: "按系统查看交付范围",
    kicker: "方案索引",
    answer:
      "tradebuild 把交付说明分成七类系统：虚拟币交易所、股票、期货、外汇、白标、钱包和电商。先选系统，再选机构类型和市场，才能对上模块和监管入口。",
    queries: ["交易系统搭建包含哪些系统", "白标方案和交易所系统有什么差别", "如何按市场查看交付范围"],
    facts: [
      { label: "系统数", value: String(catalog.services.length) },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: "为什么按系统拆开",
        paragraphs: [
          "撮合、经纪路由、保证金、托管钱包和商品订单不是同一个交付对象。混在一个页面里，回答不了具体的选型问题。",
        ],
      },
    ],
    faqs: [
      {
        question: "应该从系统、机构还是市场进入？",
        answer: "如果已经知道要买哪类系统，从系统进入。如果只知道机构类型或目标市场，从对应索引进入，再落到具体组合。",
      },
    ],
    related: catalog.services.map((service) => ({
      href: `/solutions/${service.slug}`,
      title: service.name,
      note: service.definition,
    })),
    crumbs: [
      { name: "首页", path: "/" },
      { name: "方案", path: "/solutions" },
    ],
    sources: [],
  };
}

export function marketsIndex(catalog: Catalog): PageDoc {
  return {
    path: "/markets",
    title: "按市场核对交易系统监管框架 | tradebuild",
    description: "每个市场页写明监管机构和上线前要核对的问题，并链到该市场的系统和机构组合。不是法律意见。",
    h1: "按市场核对监管框架",
    kicker: "市场索引",
    answer:
      "交易系统部署在哪里，不等于可以在哪里展业。每个市场页只做一件事：指出公开监管入口，以及上线前必须先回答的问题。",
    queries: ["交易系统搭建如何按市场看牌照", "白标部署地是否等于展业地", "监管框架写在哪一页"],
    facts: [
      { label: "市场数", value: String(catalog.markets.length) },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: "这些页面不是牌照查询结果",
        paragraphs: [
          "页面根据监管机构的公开职责整理，方便选型时知道该去看谁。它不查询某家公司是否已经获批，也不能代替法律意见。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么市场页不直接说需要哪一张牌？",
        answer: "牌照类别取决于活动、客户所在地和资产性质。未确定这三件事时，给出一个牌照名称会造成错误结论。",
      },
    ],
    related: catalog.markets.map((market) => ({
      href: `/markets/${market.slug}`,
      title: `${market.name}交易系统搭建`,
      note: market.regulator,
    })),
    crumbs: [
      { name: "首页", path: "/" },
      { name: "市场", path: "/markets" },
    ],
    sources: [],
  };
}

export function audiencesIndex(catalog: Catalog): PageDoc {
  return {
    path: "/audiences",
    title: "按机构类型看交易系统交付 | tradebuild",
    description: "券商、银行、资管、支付、托管和集成商的实施重点不同。先看机构约束，再选系统模块。",
    h1: "按机构类型看交付重点",
    kicker: "机构索引",
    answer:
      "同一套交易系统接到券商、银行、做市商或矿池，开户、授权和对账的重点不同。机构页先写清这个约束，再进入具体系统。",
    queries: ["券商和交易所创业团队的系统差别", "银行接入交易系统要保留什么", "自营机构的系统是否对公众开放"],
    facts: [
      { label: "机构类型", value: String(catalog.audiences.length) },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: "机构类型决定默认不做什么",
        paragraphs: ["有些模块对一类机构是核心，对另一类机构则不应该默认打开。例如面向公众的开户，不应出现在纯自营或纯托管的范围里。"],
      },
    ],
    faqs: [
      {
        question: "找不到对应机构类型怎么办？",
        answer: "用最接近的法律角色对照：对客并持牌、只做技术、只做托管，或只用自有资金交易。角色不清时，不要先定模块。",
      },
    ],
    related: catalog.audiences.map((audience) => ({
      href: `/audiences/${audience.slug}`,
      title: `${audience.name}交易系统搭建`,
      note: audience.focus,
    })),
    crumbs: [
      { name: "首页", path: "/" },
      { name: "机构", path: "/audiences" },
    ],
    sources: [],
  };
}
