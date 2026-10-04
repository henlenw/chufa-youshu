import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "出发有数 · 把远行准备得明明白白",
  description: "留学与长期出国的行前清单、行李整理和落地预算。选好场景，即刻开始准备。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
