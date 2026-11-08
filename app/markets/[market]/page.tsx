import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { pageForMarket } from "@/lib/seo/compose";
import { getCatalog } from "@/lib/seo/load";
import { metadataFor } from "@/lib/seo/metadata";

export const revalidate = 3600;

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.markets.map((market) => ({ market: market.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}): Promise<Metadata> {
  const { market } = await params;
  const doc = pageForMarket(await getCatalog(), market);
  if (!doc) return { title: "页面不存在", robots: { index: false, follow: false } };
  return metadataFor(doc);
}

export default async function MarketPage({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  const doc = pageForMarket(await getCatalog(), market);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
