import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import type { PageDoc } from "@/lib/seo/types";

export function metadataFor(doc: PageDoc): Metadata {
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: doc.path,
      languages: {
        "zh-CN": doc.path,
        "x-default": doc.path,
      },
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: doc.path,
      type: "website",
      locale: "zh_CN",
      siteName: "tradebuild",
    },
    robots: { index: true, follow: true },
  };
}

export function absolute(path: string) {
  return new URL(path, SITE).toString();
}
