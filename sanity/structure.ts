import { UsersIcon } from "@sanity/icons/Users";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("内容")
    .items([
      S.listItem()
        .title("关于我们")
        .icon(UsersIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage").title("关于我们")),
      S.divider(),
      S.documentTypeListItem("solution").title("解决方案"),
      S.documentTypeListItem("faq").title("常见问题"),
    ]);
