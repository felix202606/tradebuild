import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { termsPage } from "@/lib/seo/company";
import { metadataFor } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return metadataFor(termsPage());
}

export default function TermsPage() {
  return <DocPage doc={termsPage()} />;
}