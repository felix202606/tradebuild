import { DocPage } from "@/components/doc-page";
import { solutionsIndex } from "@/lib/seo/indexes";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return metadataFor(solutionsIndex(await getCatalog()));
}

export default async function SolutionsPage() {
  return <DocPage doc={solutionsIndex(await getCatalog())} />;
}
