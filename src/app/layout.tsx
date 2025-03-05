import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "八字分析",
  description: "八字命理分析工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <title>八字分析</title>
        <meta name="description" content="八字命理分析工具" />
      </head>
      <body>{children}</body>
    </html>
  );
}
