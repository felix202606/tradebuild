import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { aboutPage } from "@/lib/seo/company";
import { metadataFor } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return metadataFor(aboutPage());
}

export default function AboutPage() {
  return <DocPage doc={aboutPage()} />;
}
