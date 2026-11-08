import { defineField } from "sanity";

export const seoField = defineField({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "SEO 标题",
      type: "string",
      validation: (rule) => rule.max(60).warning("建议不超过 60 个字符"),
    }),
    defineField({
      name: "description",
      title: "SEO 描述",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160).warning("建议不超过 160 个字符"),
    }),
  ],
});
