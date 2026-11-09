import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { organizationGraph } from "@/lib/seo/schema";
import "../globals.css";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg font-sans text-fg antialiased">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-lime focus:px-3 focus:py-2 focus:text-lime-ink"
      >
        跳到正文
      </a>
      <JsonLd data={organizationGraph()} />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
