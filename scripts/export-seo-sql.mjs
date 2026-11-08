import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("../data/dimensions.json", import.meta.url)));

function quote(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function textArray(values) {
  return `array[${values.map(quote).join(", ")}]::text[]`;
}

function values(rows) {
  return rows.map((row) => `  (${row.join(", ")})`).join(",\n");
}

const services = data.services.map((row, index) => [
  quote(row.slug),
  index,
  quote(row.name),
  quote(row.keyword),
  quote(row.definition),
  textArray(row.modules),
  textArray(row.excludes),
  quote(row.outcome),
]);

const audiences = data.audiences.map((row, index) => [
  quote(row.slug),
  index,
  quote(row.name),
  quote(row.job),
  quote(row.need),
  quote(row.focus),
]);

const markets = data.markets.map((row, index) => [
  quote(row.slug),
  index,
  quote(row.name),
  quote(row.areaServed),
  quote(row.regulator),
  quote(row.framework),
  quote(row.check),
  quote(row.sourceName),
  quote(row.sourceUrl),
]);

const sql = `-- Programmatic SEO dimensions. Adding a row multiplies the other two dimensions
-- into new pages on the next generation. The site falls back to data/dimensions.json
-- when Supabase is not configured or these tables are empty.

create table if not exists seo_services (
  slug text primary key,
  sort integer not null,
  name text not null,
  keyword text not null,
  definition text not null,
  modules text[] not null,
  excludes text[] not null,
  outcome text not null,
  updated_at timestamptz not null default now()
);

create table if not exists seo_audiences (
  slug text primary key,
  sort integer not null,
  name text not null,
  job text not null,
  need text not null,
  focus text not null,
  updated_at timestamptz not null default now()
);

create table if not exists seo_markets (
  slug text primary key,
  sort integer not null,
  name text not null,
  area_served text not null,
  regulator text not null,
  framework text not null,
  check_note text not null,
  source_name text not null,
  source_url text not null,
  updated_at timestamptz not null default now()
);

alter table seo_services enable row level security;
alter table seo_audiences enable row level security;
alter table seo_markets enable row level security;

grant select on seo_services, seo_audiences, seo_markets to anon, authenticated;

drop policy if exists "public read seo_services" on seo_services;
create policy "public read seo_services" on seo_services for select using (true);

drop policy if exists "public read seo_audiences" on seo_audiences;
create policy "public read seo_audiences" on seo_audiences for select using (true);

drop policy if exists "public read seo_markets" on seo_markets;
create policy "public read seo_markets" on seo_markets for select using (true);

insert into seo_services (slug, sort, name, keyword, definition, modules, excludes, outcome)
values
${values(services)}
on conflict (slug) do update set
  sort = excluded.sort,
  name = excluded.name,
  keyword = excluded.keyword,
  definition = excluded.definition,
  modules = excluded.modules,
  excludes = excluded.excludes,
  outcome = excluded.outcome,
  updated_at = now();

insert into seo_audiences (slug, sort, name, job, need, focus)
values
${values(audiences)}
on conflict (slug) do update set
  sort = excluded.sort,
  name = excluded.name,
  job = excluded.job,
  need = excluded.need,
  focus = excluded.focus,
  updated_at = now();

insert into seo_markets (slug, sort, name, area_served, regulator, framework, check_note, source_name, source_url)
values
${values(markets)}
on conflict (slug) do update set
  sort = excluded.sort,
  name = excluded.name,
  area_served = excluded.area_served,
  regulator = excluded.regulator,
  framework = excluded.framework,
  check_note = excluded.check_note,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  updated_at = now();
`;

writeFileSync(new URL("../supabase/migrations/001_programmatic_seo.sql", import.meta.url), sql);
const pages = data.services.length * data.audiences.length * data.markets.length;
console.log(`services ${data.services.length}, audiences ${data.audiences.length}, markets ${data.markets.length}, triples ${pages}`);
