import type { Metadata } from "next";
import Link from "next/link";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import MegaNav from "@/components/MegaNav";
import { PARENT_SITE } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin", "latin-ext"], weight: "600" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ielts.danghong.me"),
  title: { default: "Hồng Đặng · IELTS", template: "%s | Hồng Đặng · IELTS" },
  description:
    "Hồng Đặng, IELTS Teacher tại Nemo12: cách học IELTS chậm mà chắc, và công cụ tra cứu chuẩn đầu ra ngoại ngữ theo trường cho phụ huynh, học sinh cấp 3 và sinh viên.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${inter.variable} ${caveat.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <MegaNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line text-sm text-muted">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-6 sm:px-6">
            <Link href="/hoi-dap/">Hỏi đáp</Link>
            <Link href="/quyen-rieng-tu/">Quyền riêng tư</Link>
            <span className="sm:ml-auto">
              Một phần của <a href={PARENT_SITE} className="underline">danghong.me</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
