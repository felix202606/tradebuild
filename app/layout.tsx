import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "数字资产交易所与交易系统搭建 | tradebuild",
    template: "%s",
  },
  description:
    "tradebuild 提供白标虚拟币交易所、RWA 代币化、MPC 托管钱包，以及股票、期货、外汇和电商系统，帮助机构安全、合规、快速上线。",
  applicationName: "tradebuild",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "tradebuild",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06080c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
