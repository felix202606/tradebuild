import { createClient, defineQuery } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export type Feature = { _key: string; title: string; description?: string };
export type PortableBlock = { _key: string; _type: string; [key: string]: unknown };

export type SolutionDoc = {
  _id: string;
  title: string;
  slug: string;
  tier: "core" | "service" | "market" | "hidden";
  summary: string;
  features?: Feature[];
  body?: PortableBlock[];
  seo?: { title?: string; description?: string };
};

export type FaqDoc = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
};

export type AboutDoc = {
  title: string;
  intro: string;
  stats?: { _key: string; value: string; label: string }[];
  values?: { _key: string; title: string; description?: string }[];
  team?: { _key: string; name: string; role?: string; bio?: string }[];
  body?: PortableBlock[];
  seo?: { title?: string; description?: string };
};

const SOLUTIONS_QUERY = defineQuery(`
  *[_type == "solution" && defined(slug.current)] | order(order asc, title asc) {
    _id, title, "slug": slug.current, tier, summary, features[]{_key, title, description}, seo
  }
`);

const SOLUTION_QUERY = defineQuery(`
  *[_type == "solution" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, tier, summary, features[]{_key, title, description}, body, seo
  }
`);

const FAQS_QUERY = defineQuery(`
  *[_type == "faq"] | order(order asc, question asc) { _id, question, answer, category }
`);

const ABOUT_QUERY = defineQuery(`
  *[_id == "aboutPage"][0] {
    title, intro, stats[]{_key, value, label}, values[]{_key, title, description},
    team[]{_key, name, role, bio}, body, seo
  }
`);

const options = { next: { revalidate: 60, tags: ["sanity"] } };

async function safeFetch<T>(query: string, params: Record<string, string>, fallback: T): Promise<T> {
  try {
    return ((await client.fetch<T>(query, params, options)) ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export function getSolutions() {
  return safeFetch<SolutionDoc[]>(SOLUTIONS_QUERY, {}, []);
}

export function getSolution(slug: string) {
  return safeFetch<SolutionDoc | null>(SOLUTION_QUERY, { slug }, null);
}

export function getFaqs() {
  return safeFetch<FaqDoc[]>(FAQS_QUERY, {}, []);
}

export function getAbout() {
  return safeFetch<AboutDoc | null>(ABOUT_QUERY, {}, null);
}
