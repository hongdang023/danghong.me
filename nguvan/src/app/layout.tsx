import type { Metadata } from "next";
import Link from "next/link";
import { Be_Vietnam_Pro, Fraunces, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { NEWSLETTER_URL, PARENT_SITE } from "@/lib/site";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin", "vietnamese"] });
const hand = Patrick_Hand({ variable: "--font-hand", subsets: ["latin", "vietnamese"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nguvan.danghong.me"),
  title: { default: "Ngữ Văn cùng cô Hồng", template: "%s | Ngữ Văn cùng cô Hồng" },
  description:
    "Hồng Đặng, cô giáo Ngữ Văn tại Nemo12: giúp các em bớt sợ, xích lại gần Văn hơn, không học thuộc lòng. Dành cho phụ huynh và các em học sinh.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${body.variable} ${display.variable} ${hand.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line bg-secondary/60 text-sm text-muted">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-5 py-7">
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
