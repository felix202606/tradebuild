import type { MetadataRoute } from "next";
import { allPaths } from "@/lib/seo/compose";
import { getCatalog } from "@/lib/seo/load";
import { SITE, UPDATED } from "@/lib/site";
import { getSolutions } from "@/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [catalog, solutions] = await Promise.all([getCatalog(), getSolutions()]);
  const paths = new Set(allPaths(catalog));
  for (const solution of solutions) paths.add(`/solutions/${solution.slug}`);
  const lastModified = new Date(UPDATED);
  return [...paths].map((path) => ({
    url: new URL(path, SITE).toString(),
    lastModified,
  }));
}
