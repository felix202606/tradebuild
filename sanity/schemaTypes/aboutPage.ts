import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";
import { seoField } from "./seo";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "关于我们",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "title", title: "标题", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "intro",
      title: "导语",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stats",
      title: "数字",
      type: "array",
      description: "只填可以核实的数字",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "数值", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", title: "说明", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "values",
      title: "原则",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "title", title: "标题", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "说明", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "team",
      title: "团队",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "member",
          fields: [
            defineField({ name: "name", title: "姓名", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "role", title: "职位", type: "string" }),
            defineField({ name: "bio", title: "简介", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
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
});
