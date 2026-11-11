import type { ReactNode } from "react";

export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex min-h-8 items-center rounded-xl bg-secondary px-3.5 text-sm font-bold text-tag-ink ${className}`}>
      {children}
    </span>
  );
}

/** Numbered pointer into a page's "Nguồn" list. */
export function Ref({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <sup className={`ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-lg px-1.5 align-baseline text-xs font-bold ${dark ? "bg-card text-tag-ink" : "bg-secondary text-tag-ink"}`}>
      {n}
    </sup>
  );
}

export function PageHead({ tag, title }: { tag: string; title: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-6 pt-14 sm:px-6">
      <Tag>{tag}</Tag>
      <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
    </section>
  );
}

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Deep-ocean band for evidence sections (Warm Reef: light, dark, light rhythm). */
export function Band({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="bg-band-deep py-16 text-white">
      <Wrap>{children}</Wrap>
    </section>
  );
}

export function SectionTitle({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <h2 className={`text-[28px] ${dark ? "text-white" : ""}`}>{children}</h2>;
}

/** Simple text page (Hỏi đáp, Quyền riêng tư). */
export function Page({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>}
      <div className="mt-10 space-y-8">{children}</div>
    </div>
  );
}
