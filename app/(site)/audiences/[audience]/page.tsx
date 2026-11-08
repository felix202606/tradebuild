import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { pageForAudience } from "@/lib/seo/compose";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";

export const revalidate = 3600;

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.audiences.map((audience) => ({ audience: audience.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  const doc = pageForAudience(await getCatalog(), audience);
  if (!doc) return { title: "页面不存在", robots: { index: false, follow: false } };
  return metadataFor(doc);
}

export default async function AudiencePage({ params }: { params: Promise<{ audience: string }> }) {
  const { audience } = await params;
  const doc = pageForAudience(await getCatalog(), audience);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
