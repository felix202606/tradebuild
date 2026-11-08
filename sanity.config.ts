"use client";

import { zhHansLocale } from "@sanity/locale-zh-hans";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "tradebuild",
  title: "内容后台",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => template.schemaType !== "aboutPage"),
  },
  document: {
    actions: (actions, context) =>
      context.schemaType === "aboutPage"
        ? actions.filter((action) => !["duplicate", "delete", "unpublish"].includes(action.action ?? ""))
        : actions,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    zhHansLocale({ title: "简体中文" }),
  ],
});
