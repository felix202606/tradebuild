import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { audiencesIndex } from "@/lib/seo/indexes";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return metadataFor(audiencesIndex(await getCatalog()));
}

export default async function AudiencesPage() {
  return <DocPage doc={audiencesIndex(await getCatalog())} />;
}
