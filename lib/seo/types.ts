export type Service = {
  slug: string;
  name: string;
  keyword: string;
  definition: string;
  modules: string[];
  excludes: string[];
  outcome: string;
};

export type Audience = {
  slug: string;
  name: string;
  job: string;
  need: string;
  focus: string;
};

export type Market = {
  slug: string;
  name: string;
  areaServed: string;
  regulator: string;
  framework: string;
  check: string;
  sourceName: string;
  sourceUrl: string;
};

export type Catalog = {
  services: Service[];
  audiences: Audience[];
  markets: Market[];
};

export type Fact = { label: string; value: string };
export type Section = { heading: string; paragraphs: string[]; bullets?: string[] };
export type Faq = { question: string; answer: string };
export type LinkItem = { href: string; title: string; note: string };
export type Crumb = { name: string; path: string };
export type Source = { name: string; url: string };

export type PageDoc = {
  path: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  answer: string;
  queries: string[];
  facts: Fact[];
  sections: Section[];
  faqs: Faq[];
  related: LinkItem[];
  crumbs: Crumb[];
  sources: Source[];
  serviceName?: string;
  areaServed?: string;
};
