import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { contactPage } from "@/lib/seo/company";
import { metadataFor } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return metadataFor(contactPage());
}

export default function ContactPage() {
  return <DocPage doc={contactPage()} />;
}
