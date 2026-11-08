import { EMAIL, UPDATED } from "@/lib/site";
import type { PageDoc } from "@/lib/seo/types";

const home = { name: "首页", path: "/" };

export function aboutPage(): PageDoc {
  return {
    path: "/about",
    title: "关于 tradebuild | tradebuild",
    description: "tradebuild 发布交易系统、白标、钱包和电商系统的交付说明，供机构选型时对照模块和监管入口。",
    h1: "关于 tradebuild",
    kicker: "关于",
    answer:
      "tradebuild 发布虚拟币、股票、期货、外汇交易系统以及白标、钱包和电商系统的交付说明。这些页面用来对照模块、机构约束和监管入口，不销售投资产品，也不提供牌照。",
    queries: ["tradebuild 是做什么的", "tradebuild 是否提供牌照", "交付说明和系统实施是什么关系"],
    facts: [
      { label: "站点", value: "tradebuild.dev" },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: "页面如何组织",
        paragraphs: [
          "每篇长尾页只回答一种系统、一类机构和一个市场。这样检索“新加坡券商虚拟币交易所系统”时，打开的页面就只讨论这个组合。",
          "维度数据可以放在 Supabase。新增一个市场或机构类型后，站点按现有系统自动组合成新的页面。",
        ],
      },
      {
        heading: "不提供的内容",
        paragraphs: [
          "不提供投资建议、收益承诺、牌照代办结果，也不提供虚假成交、虚假用户、虚假订单或绕过身份识别和制裁筛查的功能。",
        ],
      },
    ],
    faqs: [
      {
        question: "tradebuild 和持牌机构是什么关系？",
        answer: "页面描述软件交付范围。对客法律主体、牌照和客户资产责任属于运营机构，不因使用本站或购买实施而自动转移。",
      },
    ],
    related: [
      { href: "/solutions", title: "按系统查看", note: "七类交付对象" },
      { href: "/contact", title: "联系选型", note: EMAIL },
    ],
    crumbs: [home, { name: "关于", path: "/about" }],
    sources: [],
  };
}

export function contactPage(): PageDoc {
  return {
    path: "/contact",
    title: "联系选型 | tradebuild",
    description: `把机构类型、目标市场、系统种类和现有牌照状态发到 ${EMAIL}。tradebuild 据此对照模块范围。`,
    h1: "联系选型",
    kicker: "联系",
    answer: `把机构类型、目标市场、准备交付的系统，以及现有或正在申请的牌照状态发给 ${EMAIL}。回复会对照模块范围，不在邮件里承诺牌照结果或收益。`,
    queries: ["如何联系 tradebuild", "选型邮件要写什么", "能否在邮件里确认牌照"],
    facts: [
      { label: "邮箱", value: EMAIL },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: "邮件里写这四件事",
        paragraphs: ["信息越具体，模块范围就越不会被写成一套空泛的全包系统。"],
        bullets: ["机构的法律角色，例如券商、银行、托管或只做技术", "客户和推广所在的市场", "要交付的系统：交易所、股票、期货、外汇、白标、钱包或电商", "已经持有或正在申请的许可，没有则直接写没有"],
      },
    ],
    faqs: [
      {
        question: "发邮件是否表示已经委托？",
        answer: "不表示。在双方书面确认范围之前，通信只用于整理问题，不构成实施合同或顾问关系。",
      },
    ],
    related: [{ href: `mailto:${EMAIL}`, title: EMAIL, note: "写明机构、市场、系统和牌照状态" }],
    crumbs: [home, { name: "联系", path: "/contact" }],
    sources: [],
  };
}

export function faqPage(): PageDoc {
  return {
    path: "/faq",
    title: "交易系统搭建常见问题 | tradebuild",
    description: "关于交付范围、牌照、白标、钱包和电商边界的直接回答。不构成投资建议或法律意见。",
    h1: "常见问题",
    kicker: "问答",
    answer:
      "tradebuild 的页面说明软件怎么交付，不说明某项投资是否值得购买。牌照、客户资产和真实业务记录始终由运营机构负责。",
    queries: ["交易系统搭建是否包含牌照", "白标能否无牌展业", "电商系统是否包含虚假订单"],
    facts: [{ label: "更新", value: UPDATED }],
    sections: [
      {
        heading: "如何使用这些回答",
        paragraphs: ["每条回答都只覆盖交付边界。涉及具体牌照申请时，以监管文本和合格法律意见为准。"],
      },
    ],
    faqs: [
      {
        question: "tradebuild 交付的是软件还是牌照？",
        answer: "交付说明针对软件模块。牌照由运营机构向业务发生地的监管机构申请，不能随系统一起交付。",
      },
      {
        question: "这些内容是不是投资建议？",
        answer: "不是。页面不评价任何代币、股票、期货或外汇是否应该买卖，也不承诺收益。",
      },
      {
        question: "白标是否等于可以开始展业？",
        answer: "不等于。白标配置品牌、域名、费率和模块。谁对客、谁持牌、谁保管资产，必须单独写明。",
      },
      {
        question: "钱包系统是否包含混币或绕过筛查？",
        answer: "不包含。提现审核和名单筛查是范围的一部分，不提供混币、匿名跨链或关闭筛查的通道。",
      },
      {
        question: "电商系统是否包含任务刷单或虚假订单？",
        answer: "不包含。电商系统只处理真实商品的库存、支付和履约，不提供虚假订单、虚假评价、任务刷单或操纵销量的功能。",
      },
      {
        question: "监管信息过时了怎么办？",
        answer: "每页都链接监管机构的公开网站，并写明规则以其当时文本为准。页面日期只表示内容整理日期，不表示规则在该日之后没有变化。",
      },
    ],
    related: [
      { href: "/solutions", title: "系统方案", note: "按七类系统进入" },
      { href: "/markets", title: "市场", note: "按监管机构进入" },
      { href: "/contact", title: "联系", note: EMAIL },
    ],
    crumbs: [home, { name: "问答", path: "/faq" }],
    sources: [],
  };
}

export function privacyPage(): PageDoc {
  return {
    path: "/privacy",
    title: "隐私 | tradebuild",
    description: "tradebuild.dev 不设账户。你主动发送的邮件用于回复选型问题，站点日志由托管方处理。",
    h1: "隐私",
    kicker: "隐私",
    answer:
      "tradebuild.dev 是公开的说明站点，不设账户，也不要求你在站内提交订单。你如果发邮件，邮件内容只用于回复选型问题。",
    queries: ["tradebuild 收集哪些信息", "站点是否有账户", "邮件会如何使用"],
    facts: [
      { label: "联系", value: EMAIL },
      { label: "更新", value: UPDATED },
    ],
    sections: [
      {
        heading: "站点本身",
        paragraphs: [
          "阅读公开页面不需要注册。托管方可能按运行需要保留服务器访问日志，例如地址、时间和请求路径。本站不接入第三方广告。",
        ],
      },
      {
        heading: "你主动发来的邮件",
        paragraphs: [
          "邮件里的机构、市场和牌照信息用于整理交付范围。不要在首次邮件里发送客户身份证件、私钥或完整的客户名单。",
        ],
      },
    ],
    faqs: [
      {
        question: "如何要求删除邮件中的信息？",
        answer: `回信到 ${EMAIL} 说明要删除的内容。已经形成实施合同的记录，按其约定的保存期限处理。`,
      },
    ],
    related: [{ href: "/contact", title: "联系", note: EMAIL }],
    crumbs: [home, { name: "隐私", path: "/privacy" }],
    sources: [],
  };
}

export function termsPage(): PageDoc {
  return {
    path: "/terms",
    title: "使用条款 | tradebuild",
    description: "使用 tradebuild.dev 不构成投资顾问关系、实施合同或持牌承诺。监管内容以官方文本为准。",
    h1: "使用条款",
    kicker: "条款",
    answer:
      "使用本站表示你理解页面是交付说明。它不构成投资建议、募资要约、实施合同或对任何许可结果的承诺。",
    queries: ["使用网站是否构成委托", "内容能否当作法律意见", "白标页面是否授予展业权利"],
    facts: [{ label: "更新", value: UPDATED }],
    sections: [
      {
        heading: "内容的边界",
        paragraphs: [
          "监管描述可能滞后。引用监管机构网站只为方便核对，不表示该机构认可本站。业务决策前请阅读官方文本并取得合格法律意见。",
        ],
      },
      {
        heading: "禁止从页面推断的事项",
        paragraphs: ["不能从某一页的存在推断 tradebuild 承诺接入任何交易所、保证牌照获批，或允许虚假交易和绕过筛查。"],
      },
    ],
    faqs: [
      {
        question: "实施合同在哪里形成？",
        answer: "只在双方另行书面确认范围、责任和费用之后形成。浏览页面或发送问询邮件本身不构成合同。",
      },
    ],
    related: [
      { href: "/privacy", title: "隐私", note: "邮件与日志" },
      { href: "/about", title: "关于", note: "站点做什么" },
    ],
    crumbs: [home, { name: "条款", path: "/terms" }],
    sources: [],
  };
}
