"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { CONTACT_URL, MENUS, type NavItem } from "@/lib/site";

function Item({ i }: { i: NavItem }) {
  const inner = (
    <>
      <Icon name={i.icon} />
      <span>
        {i.title}
        <small>{i.sub}</small>
      </span>
    </>
  );
  return i.external ? (
    <a className="it" href={i.href} rel="noopener">{inner}</a>
  ) : (
    <Link className="it" href={i.href}>{inner}</Link>
  );
}

export default function MegaNav() {
  const path = usePathname() ?? "/";
  return (
    <header className="mega sticky top-0 z-20 border-b border-line bg-card">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="text-[22px] font-extrabold">Hồng Đặng</Link>
        <nav aria-label="Điều hướng chính" className="hidden flex-1 justify-center gap-1 lg:flex">
          {MENUS.map((m) => {
            const active = path.startsWith(m.href.replace(/\/$/, ""));
            return (
              <div key={m.key} className="mm">
                <Link href={m.href} className={`top${active ? " on" : ""}`}>
                  {m.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                </Link>
                <div className="panel">
                  <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className={`pg ${m.groups.length > 1 ? "c3" : "c2"}`}>
                      {m.groups.map((g, gi) => (
                        <div key={gi}>
                          {g.label && <div className="grp">{g.label}</div>}
                          <div className="flex flex-col gap-0.5">
                            {g.items.map((i) => <Item key={i.title} i={i} />)}
                          </div>
                        </div>
                      ))}
                      <div className="feat">
                        <span className="self-start rounded-lg bg-card px-3 py-1 text-[13px] font-bold text-tag-ink">{m.feature.tag}</span>
                        <h3 className="text-[21px]">{m.feature.title}</h3>
                        {m.feature.sub && <span className="text-sm text-muted">{m.feature.sub}</span>}
                        <Link href={m.feature.href} className="mt-auto font-bold text-accent">{m.feature.cta}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="flex-1 lg:hidden" />
        <details className="relative lg:hidden">
          <summary className="btn btn-outline cursor-pointer list-none text-sm">Menu</summary>
          <div className="absolute right-0 top-14 z-30 w-[min(92vw,360px)] rounded-xl border border-line bg-card p-3 shadow-xl">
            {MENUS.map((m) => (
              <div key={m.key} className="border-b border-line py-2 last:border-0">
                <Link href={m.href} className="block px-2 py-1.5 text-lg font-extrabold">{m.label}</Link>
                <div className="flex flex-col pb-1">
                  {m.groups.flatMap((g) => g.items).map((i) => (
                    i.external
                      ? <a key={i.title} href={i.href} rel="noopener" className="px-2 py-1.5 text-[15px] font-semibold text-muted">{i.title}</a>
                      : <Link key={i.title} href={i.href} className="px-2 py-1.5 text-[15px] font-semibold text-muted">{i.title}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
        <a href={CONTACT_URL} className="btn btn-outline hidden sm:inline-flex">Hỏi cô Hồng</a>
      </div>
    </header>
  );
}
