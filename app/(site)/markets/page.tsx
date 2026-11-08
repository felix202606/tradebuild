import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { marketsIndex } from "@/lib/seo/indexes";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return metadataFor(marketsIndex(await getCatalog()));
}

export default async function MarketsPage() {
  return <DocPage doc={marketsIndex(await getCatalog())} />;
}
