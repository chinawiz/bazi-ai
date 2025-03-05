import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "八字分析",
  description: "八字命理分析工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
