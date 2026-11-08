import { asCatalog, seedCatalog } from "@/lib/seo/catalog";
import type { Audience, Catalog, Market, Service } from "@/lib/seo/types";

type ServiceRow = {
  slug: string;
  sort: number;
  name: string;
  keyword: string;
  definition: string;
  modules: string[];
  excludes: string[];
  outcome: string;
};

type AudienceRow = {
  slug: string;
  sort: number;
  name: string;
  job: string;
  need: string;
  focus: string;
};

type MarketRow = {
  slug: string;
  sort: number;
  name: string;
  area_served: string;
  regulator: string;
  framework: string;
  check_note: string;
  source_name: string;
  source_url: string;
};

let pending: Promise<Catalog> | null = null;

function bySort<T extends { sort: number }>(rows: T[]) {
  return [...rows].sort((a, b) => a.sort - b.sort);
}

function mapService(row: ServiceRow): Service {
  return {
    slug: row.slug,
    name: row.name,
    keyword: row.keyword,
    definition: row.definition,
    modules: row.modules,
    excludes: row.excludes,
    outcome: row.outcome,
  };
}

function mapAudience(row: AudienceRow): Audience {
  return {
    slug: row.slug,
    name: row.name,
    job: row.job,
    need: row.need,
    focus: row.focus,
  };
}

function mapMarket(row: MarketRow): Market {
  return {
    slug: row.slug,
    name: row.name,
    areaServed: row.area_served,
    regulator: row.regulator,
    framework: row.framework,
    check: row.check_note,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
  };
}

async function readTable<T>(base: string, key: string, table: string): Promise<T[] | null> {
  const response = await fetch(`${base}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    signal: AbortSignal.timeout(4000),
    next: { revalidate: 3600 },
  });
  if (!response.ok) return null;
  return (await response.json()) as T[];
}

async function resolveCatalog(): Promise<Catalog> {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!base || !key) return seedCatalog;

  try {
    const [services, audiences, markets] = await Promise.all([
      readTable<ServiceRow>(base, key, "seo_services"),
      readTable<AudienceRow>(base, key, "seo_audiences"),
      readTable<MarketRow>(base, key, "seo_markets"),
    ]);
    if (!services?.length || !audiences?.length || !markets?.length) return seedCatalog;
    return asCatalog({
      services: bySort(services).map(mapService),
      audiences: bySort(audiences).map(mapAudience),
      markets: bySort(markets).map(mapMarket),
    });
  } catch {
    return seedCatalog;
  }
}

export function getCatalog() {
  if (!pending) pending = resolveCatalog();
  return pending;
}
