import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "五行分析与产品推荐 - 基于出生信息的个性化推荐",
  description: "输入您的国家、地区、出生年月日时，我们将分析您的五行属性，并推荐最适合您的产品。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
