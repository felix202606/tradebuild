import type { MetadataRoute } from "next";
import { allPaths } from "@/lib/seo/compose";
import { getCatalog } from "@/lib/seo/load";
import { SITE, UPDATED } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalog();
  const lastModified = new Date(UPDATED);
  return allPaths(catalog).map((path) => ({
    url: new URL(path, SITE).toString(),
    lastModified,
  }));
}
