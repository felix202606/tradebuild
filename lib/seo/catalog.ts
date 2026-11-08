import raw from "@/data/dimensions.json";
import type { Audience, Catalog, Market, Service } from "@/lib/seo/types";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function uniqueSlugs(items: { slug: string }[], label: string) {
  const seen = new Set<string>();
  for (const item of items) {
    if (!SLUG.test(item.slug)) {
      throw new Error(`Invalid ${label} slug: ${item.slug}`);
    }
    if (seen.has(item.slug)) {
      throw new Error(`Duplicate ${label} slug: ${item.slug}`);
    }
    seen.add(item.slug);
  }
}

export function asCatalog(input: {
  services: Service[];
  audiences: Audience[];
  markets: Market[];
}): Catalog {
  uniqueSlugs(input.services, "service");
  uniqueSlugs(input.audiences, "audience");
  uniqueSlugs(input.markets, "market");
  if (!input.services.length || !input.audiences.length || !input.markets.length) {
    throw new Error("Catalog dimensions cannot be empty");
  }
  return input;
}

export const seedCatalog = asCatalog(raw as Catalog);

export function findService(catalog: Catalog, slug: string) {
  return catalog.services.find((item) => item.slug === slug);
}

export function findAudience(catalog: Catalog, slug: string) {
  return catalog.audiences.find((item) => item.slug === slug);
}

export function findMarket(catalog: Catalog, slug: string) {
  return catalog.markets.find((item) => item.slug === slug);
}
