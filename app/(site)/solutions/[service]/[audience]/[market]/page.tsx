import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { pageForTriple } from "@/lib/seo/compose";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";

export const revalidate = 3600;

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.services.flatMap((service) =>
    catalog.audiences.flatMap((audience) =>
      catalog.markets.map((market) => ({
        service: service.slug,
        audience: audience.slug,
        market: market.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; audience: string; market: string }>;
}): Promise<Metadata> {
  const { service, audience, market } = await params;
  const doc = pageForTriple(await getCatalog(), service, audience, market);
  if (!doc) return { title: "页面不存在", robots: { index: false, follow: false } };
  return metadataFor(doc);
}

export default async function TriplePage({
  params,
}: {
  params: Promise<{ service: string; audience: string; market: string }>;
}) {
  const { service, audience, market } = await params;
  const doc = pageForTriple(await getCatalog(), service, audience, market);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
