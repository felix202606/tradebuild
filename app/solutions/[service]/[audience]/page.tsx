import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { pageForPair } from "@/lib/seo/compose";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";

export const revalidate = 3600;

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.services.flatMap((service) =>
    catalog.audiences.map((audience) => ({
      service: service.slug,
      audience: audience.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; audience: string }>;
}): Promise<Metadata> {
  const { service, audience } = await params;
  const doc = pageForPair(await getCatalog(), service, audience);
  if (!doc) return { title: "页面不存在", robots: { index: false, follow: false } };
  return metadataFor(doc);
}

export default async function PairPage({
  params,
}: {
  params: Promise<{ service: string; audience: string }>;
}) {
  const { service, audience } = await params;
  const doc = pageForPair(await getCatalog(), service, audience);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
