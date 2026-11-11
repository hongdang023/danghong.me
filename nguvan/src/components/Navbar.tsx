"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { CONTACT_URL, MENU, NEWSLETTER_URL } from "@/lib/site";

export function Navbar() {
  const path = usePathname();
  // Trạng thái gắn với đường dẫn: đổi trang thì menu tự đóng, không cần effect.
  const [st, setSt] = useState<{ path: string; open: string | null; mobile: boolean }>({ path, open: null, mobile: false });
  const fresh = st.path === path;
  const open = fresh ? st.open : null;
  const mobile = fresh ? st.mobile : false;
  const setOpen = (o: string | null) => setSt({ path, open: o, mobile: false });
  const setMobile = (f: (m: boolean) => boolean) => setSt({ path, open: null, mobile: f(mobile) });
  const ref = useRef<HTMLElement>(null);
  const active = MENU.find((g) => open === g.id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSt({ path, open: null, mobile: false });
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setSt({ path, open: null, mobile: false }); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [path]);

  const pill = (isOpen: boolean, isCurrent: boolean) =>
    `flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-bold uppercase tracking-wide transition ${
      isOpen || isCurrent ? "bg-rose/70 text-accent" : "text-foreground/70 hover:text-foreground"
    }`;

  return (
    <header ref={ref} className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-xl" onMouseLeave={() => setOpen(null)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-baseline gap-2 whitespace-nowrap leading-none">
          <span className="font-display text-2xl font-normal tracking-tight">Ngữ Văn</span>
          <span className="font-hand text-xl text-accent">cùng cô Hồng</span>
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 xl:flex">
          {MENU.map((g) => {
            const current = path.startsWith(g.href);
            return g.items ? (
              <button
                key={g.id}
                type="button"
                aria-expanded={open === g.id}
                onMouseEnter={() => setOpen(g.id)}
                onClick={() => setOpen(open === g.id ? null : g.id)}
                className={pill(open === g.id, current)}
              >
                {g.label}
                <ChevronDown size={14} className={`transition ${open === g.id ? "rotate-180" : ""}`} />
              </button>
            ) : (
              <Link key={g.id} href={g.href} onMouseEnter={() => setOpen(null)} className={pill(false, current)}>
                {g.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a href={NEWSLETTER_URL} className="rounded-full border border-line bg-white/[.06] px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide shadow-sm transition hover:-translate-y-0.5">
            Newsletter
          </a>
          <a href={CONTACT_URL} className="rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-background shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 active:scale-95">
            Nhắn cô Hồng
          </a>
        </div>

        <button type="button" aria-label="Mở menu" aria-expanded={mobile} onClick={() => setMobile((m) => !m)} className="rounded-full p-2 xl:hidden">
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {active?.items && (
        <div className="absolute inset-x-0 top-full hidden border-b border-line bg-background shadow-xl xl:block" onMouseEnter={() => setOpen(active.id)}>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-16 px-5 py-10">
            <ul className="space-y-1">
              {active.items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="block rounded-2xl px-4 py-3 text-lg font-bold transition hover:bg-rose/50 hover:text-accent">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
            {active.featured && (
              <div className="relative overflow-hidden rounded-3xl border border-line bg-white/[.05] p-8">
                <span className="wash wash-peach -right-10 -top-10 h-40 w-40" />
                <span className="relative inline-block rounded-full bg-rose/70 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent">{active.featured.tag}</span>
                <h3 className="relative mt-4 font-display text-2xl font-normal tracking-tight">{active.featured.title}</h3>
                <p className="relative mt-2 text-foreground/70">{active.featured.text}</p>
                <Link href={active.featured.href} className="relative mt-5 inline-flex items-center gap-1.5 font-bold text-accent">
                  {active.featured.cta} <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {mobile && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-line bg-background px-5 pb-6 xl:hidden">
          {MENU.map((g) => (
            <div key={g.id} className="border-b border-line py-3">
              <Link href={g.href} className="font-display text-lg font-normal">{g.label}</Link>
              {g.items && (
                <ul className="mt-2 space-y-1 pl-3">
                  {g.items.map((it) => (
                    <li key={it.href}><Link href={it.href} className="block py-1 text-foreground/70">{it.label}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={NEWSLETTER_URL} className="btn-ghost">Newsletter</a>
            <a href={CONTACT_URL} className="btn-primary">Nhắn cô Hồng</a>
          </div>
        </div>
      )}
    </header>
  );
}
