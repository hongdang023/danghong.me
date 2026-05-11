import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { User, Menu } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hồng Đặng | The Learning Architect",
  description: "Xây dựng hệ thống giáo dục thực chứng để giải phóng trí tuệ. Triết lý Thực dụng - Gần gũi - Tinh gọn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full selection:bg-orange-100/30`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased text-foreground bg-background">
        {children}
      </body>
    </html>
  );
}
