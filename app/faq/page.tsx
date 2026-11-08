import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { faqPage } from "@/lib/seo/company";
import { metadataFor } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return metadataFor(faqPage());
}

export default function FaqPage() {
  return <DocPage doc={faqPage()} />;
}
