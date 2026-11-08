import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/studio" },
      { userAgent: "GPTBot", allow: "/", disallow: "/studio" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/studio" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/studio" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/studio" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
