import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "常见问题",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "问题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "回答",
      type: "text",
      rows: 5,
      description: "第一句直接给结论，便于搜索和 AI 摘录",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "string",
      options: {
        list: [
          { title: "产品与交付", value: "product" },
          { title: "合规与牌照", value: "compliance" },
          { title: "合作与费用", value: "business" },
        ],
        layout: "radio",
      },
      initialValue: "product",
    }),
    defineField({
      name: "order",
      title: "排序",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [{ title: "排序", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "category" } },
});
