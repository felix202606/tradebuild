import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { faqPage } from "@/lib/seo/company";
import { metadataFor } from "@/lib/seo/metadata";
import type { PageDoc } from "@/lib/seo/types";
import { getFaqs } from "@/sanity/client";

export const revalidate = 60;

async function load(): Promise<PageDoc> {
  const base = faqPage();
  const faqs = await getFaqs();
  if (!faqs.length) return base;
  return { ...base, faqs: faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) };
}

export async function generateMetadata(): Promise<Metadata> {
  return metadataFor(await load());
}

export default async function FaqPage() {
  return <DocPage doc={await load()} />;
}
