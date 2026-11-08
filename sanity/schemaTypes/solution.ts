import { RocketIcon } from "@sanity/icons/Rocket";
import { defineArrayMember, defineField, defineType } from "sanity";
import { seoField } from "./seo";

export const solution = defineType({
  name: "solution",
  title: "解决方案",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "title",
      title: "名称",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "网址",
      type: "slug",
      description: "页面地址为 /solutions/网址。与系统长尾页同名时，两者合并在同一页。",
      options: { source: "title", maxLength: 64 },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return "必填";
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current) || "只能用小写字母、数字和连字符";
        }),
    }),
    defineField({
      name: "tier",
      title: "首页位置",
      type: "string",
      options: {
        list: [
          { title: "核心方案（首页大卡片）", value: "core" },
          { title: "配套服务（首页小卡片）", value: "service" },
          { title: "更多交易系统（首页列表）", value: "market" },
          { title: "不在首页展示", value: "hidden" },
        ],
        layout: "radio",
      },
      initialValue: "service",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "排序",
      type: "number",
      description: "数字越小越靠前",
      initialValue: 100,
    }),
    defineField({
      name: "summary",
      title: "一句话简介",
      type: "text",
      rows: 3,
      description: "用于卡片和页面开头的直接回答",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "features",
      title: "能力要点",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "说明", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "正文",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    seoField,
  ],
  orderings: [{ title: "排序", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "tier" } },
});
