import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT_URL } from "@/lib/site";

export function Page({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
      <div className="mt-10 space-y-10">{children}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}

export function Card({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link href={href} className="card-box block p-6 transition hover:border-accent">
      <h3 className="text-lg">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
      <span aria-hidden="true" className="mt-4 block text-accent">→</span>
    </Link>
  );
}

export function ContactCta({ text = "Hỏi trước, chưa cần quyết định ngay." }: { text?: string }) {
  return (
    <div className="rounded-xl bg-secondary p-6">
      <p className="font-medium">{text}</p>
      <a href={CONTACT_URL} className="btn btn-accent mt-3">
        Hỏi Hồng
      </a>
    </div>
  );
}
