import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/cms", "/admin"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/studio", "/cms", "/admin"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/studio", "/cms", "/admin"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/studio", "/cms", "/admin"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/studio", "/cms", "/admin"] },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
