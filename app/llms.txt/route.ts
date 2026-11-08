import { getCatalog } from "@/lib/seo/load";
import { SITE } from "@/lib/site";

export async function GET() {
  const catalog = await getCatalog();
  const lines = [
    "# tradebuild",
    "",
    "> tradebuild 说明虚拟币交易所、股票、期货、外汇、白标、钱包和电商系统的交付范围。内容不是投资建议，也不提供牌照、虚假交易或绕过身份识别的功能。",
    "",
    "## URL pattern",
    `- ${SITE}/solutions/{service}`,
    `- ${SITE}/solutions/{service}/{audience}`,
    `- ${SITE}/solutions/{service}/{audience}/{market}`,
    `- ${SITE}/markets/{market}`,
    `- ${SITE}/audiences/{audience}`,
    "",
    "## Services",
    ...catalog.services.map((service) => `- ${service.name}: ${SITE}/solutions/${service.slug}`),
    "",
    "## Markets",
    ...catalog.markets.map((market) => `- ${market.name} (${market.regulator}): ${SITE}/markets/${market.slug}`),
    "",
    "## Audiences",
    ...catalog.audiences.map((audience) => `- ${audience.name}: ${SITE}/audiences/${audience.slug}`),
    "",
    `## Full URL list`,
    `${SITE}/sitemap.xml`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
