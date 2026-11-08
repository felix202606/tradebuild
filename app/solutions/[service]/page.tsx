import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { pageForService } from "@/lib/seo/compose";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";

export const revalidate = 3600;

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const doc = pageForService(await getCatalog(), service);
  if (!doc) return { title: "页面不存在", robots: { index: false, follow: false } };
  return metadataFor(doc);
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const doc = pageForService(await getCatalog(), service);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
