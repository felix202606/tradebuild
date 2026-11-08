import { absolute } from "@/lib/seo/metadata";
import { EMAIL, ORG_ID, SITE, UPDATED, WEBSITE_ID } from "@/lib/site";
import type { PageDoc } from "@/lib/seo/types";

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "tradebuild",
        url: SITE,
        email: EMAIL,
        description:
          "tradebuild 说明虚拟币、股票、期货、外汇交易系统以及白标、钱包和电商系统的交付范围。",
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "tradebuild",
        url: SITE,
        inLanguage: "zh-CN",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function pageGraph(doc: PageDoc) {
  const url = absolute(doc.path);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: doc.h1,
      description: doc.description,
      inLanguage: "zh-CN",
      dateModified: UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#direct-answer"],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: doc.crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absolute(crumb.path),
      })),
    },
  ];

  if (doc.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: doc.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  if (doc.serviceName) {
    graph.push({
      "@type": "Service",
      name: doc.h1,
      serviceType: doc.serviceName,
      description: doc.answer,
      url,
      areaServed: doc.areaServed,
      provider: { "@id": ORG_ID },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
