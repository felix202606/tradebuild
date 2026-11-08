import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { organizationGraph } from "@/lib/seo/schema";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "虚拟币、股票、期货与外汇交易系统搭建 | tradebuild",
    template: "%s",
  },
  description:
    "tradebuild 说明虚拟币交易所、股票、期货、外汇、白标、钱包和电商系统的交付范围，并按机构和市场拆开。不是投资建议。",
  applicationName: "tradebuild",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "tradebuild",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14382f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-dvh flex-col bg-paper font-sans text-ink antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-card focus:px-3 focus:py-2"
        >
          跳到正文
        </a>
        <JsonLd data={organizationGraph()} />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
