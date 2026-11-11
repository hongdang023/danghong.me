import type { Metadata } from "next";
import Link from "next/link";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import { CONTACT_URL, NAV, NEWSLETTER_URL, PARENT_SITE } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin", "latin-ext"], weight: "600" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ielts.danghong.me"),
  title: { default: "IELTS cùng Hồng", template: "%s | IELTS cùng Hồng" },
  description:
    "Hồng Đặng, IELTS Teacher tại Nemo12: cách học IELTS chậm mà chắc, và công cụ tra cứu chuẩn đầu ra ngoại ngữ theo trường cho phụ huynh, học sinh cấp 3 và sinh viên.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${inter.variable} ${caveat.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <header className="border-b border-line bg-card">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
            <Link href="/" className="">
              IELTS cùng Hồng
            </Link>
            <nav aria-label="Điều hướng chính" className="flex flex-1 flex-wrap gap-x-4 gap-y-1 text-sm">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="py-1 text-muted hover:text-foreground">
                  {n.label}
                </Link>
              ))}
            </nav>
            <a href={CONTACT_URL} className="btn btn-outline text-sm">
              Hỏi Hồng
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line text-sm text-muted">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-6 sm:px-6">
            <a href={NEWSLETTER_URL}>Newsletter</a>
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
