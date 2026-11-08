import { PortableText } from "@portabletext/react";
import type { PortableBlock } from "@/sanity/client";

export function Portable({ value }: { value?: PortableBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="prose-dark">
      <PortableText value={value as Parameters<typeof PortableText>[0]["value"]} />
    </div>
  );
}
