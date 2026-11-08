import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { privacyPage } from "@/lib/seo/company";
import { metadataFor } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return metadataFor(privacyPage());
}

export default function PrivacyPage() {
  return <DocPage doc={privacyPage()} />;
}
