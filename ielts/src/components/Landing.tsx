"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { usePersona } from "@/components/PersonaProvider";
import { CONTACT_URL, MEDIA } from "@/lib/site";
import { GOALS, PERSONAS, ROLES, goalLabel, personaKey, roleLabel, type Choice } from "@/lib/persona";
import Link from "next/link";

function Pick({ items, onPick }: { items: Choice[]; onPick: (id: string) => void }) {
  return (
    <div className={`mt-10 grid w-full gap-5 ${items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 md:px-[12%]"}`}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => onPick(it.id)}
          className="group rounded-3xl border border-line bg-card px-6 py-9 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
        >
          <span className="block text-[26px] font-extrabold leading-snug transition group-hover:text-accent">{it.title}</span>
          <span className="mt-2 block text-[17px] text-muted">{it.sub}</span>
        </button>
      ))}
    </div>
  );
}

function Gate() {
  const p = usePersona();
  const role = p.role;
  const showGoals = !!role;
  return (
    <section className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-5xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6">
      <h1 className="text-xl sm:text-2xl">Cô Hồng dạy IELTS tại Nemo12, có mentor đi cùng</h1>
      <p className="mt-3 text-[17px] text-muted">Chọn đúng việc bạn cần. Cô nói đúng điều bạn đang lo.</p>
      <span className="mt-9 inline-flex items-center gap-2 rounded-full border border-line bg-secondary px-4 py-1.5 text-sm font-bold tracking-widest text-tag-ink">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-tag-ink" />
        BƯỚC {showGoals ? 2 : 1} / 2
      </span>
      <h2 className="mt-5 text-4xl sm:text-5xl">{showGoals ? "Mục tiêu của bạn?" : "Bạn là ai?"}</h2>
      {!showGoals && (
        <Pick
          items={ROLES}
          onPick={(id) => p.setRole(id as typeof ROLES[number]["id"])}
        />
      )}
      {showGoals && (
        <>
          <Pick items={GOALS[role!]} onPick={(id) => p.setGoal(id as "admission")} />
          <button type="button" onClick={p.reset} className="mt-7 text-[15px] font-semibold text-muted underline">← Chọn lại vai trò</button>
        </>
      )}
    </section>
  );
}

function PersonaHero() {
  const p = usePersona();
  const [copied, setCopied] = useState(false);
  if (!p.role || !p.goal) return null;
  const d = PERSONAS[personaKey(p.role, p.goal)];
  const copy = async () => {
    try { await navigator.clipboard.writeText(d.template); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ }
  };
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-start gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[7fr_5fr] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex min-h-8 items-center rounded-xl bg-secondary px-3.5 text-sm font-bold text-tag-ink">IELTS Mentor tại Nemo12</span>
            <span className="inline-flex min-h-8 items-center rounded-xl border border-line bg-card px-3.5 text-sm font-semibold">{roleLabel(p.role)} · {goalLabel(p.role, p.goal)}</span>
            <button type="button" onClick={p.reset} className="text-sm font-semibold text-accent underline">Đổi lựa chọn</button>
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl">{d.promise}</h1>
          <p className="mt-4 max-w-xl text-[19px] text-muted">{d.empathy}</p>

          <div className="mt-8 rounded-xl border border-line bg-card p-6">
            <div className="text-sm font-bold text-tag-ink">Điều đang làm khó</div>
            <ul className="mt-3 flex flex-col gap-2.5">
              {d.pains.map((t) => (
                <li key={t} className="flex gap-3 text-[16px]"><span aria-hidden="true" className="mt-2 h-2 w-2 flex-none rounded-full bg-accent" />{t}</li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href={CONTACT_URL} className="btn btn-accent">Hỏi cô Hồng</a>
            <Link href={d.proof.href} className="text-[15px] font-bold text-accent">{d.proof.label} →</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${MEDIA}/photos/avatar.png`} alt="Cô Hồng Đặng" className="h-[420px] w-full object-cover object-[50%_18%] lg:h-[560px]" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="text-[28px]">Cô Hồng làm gì cho {p.role === "parent" ? "bố mẹ" : p.role === "student" ? "em" : "bạn"}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {d.does.map((x) => (
            <div key={x.title} className="card-box flex flex-col gap-3 p-6">
              <Icon name={x.icon} size={28} />
              <h3 className="text-xl">{x.title}</h3>
              <span className="text-[15px] text-muted">{x.text}</span>
            </div>
          ))}
        </div>
        {d.note && <p className="mt-4 max-w-3xl rounded-xl bg-secondary px-4 py-3 text-[15px] text-tag-ink">{d.note}</p>}
        <div className="mt-6 rounded-xl border border-dashed border-line bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-tag-ink">Mẫu tin nhắn gửi cô</span>
            <button type="button" onClick={copy} className="btn btn-outline text-sm">{copied ? "Đã chép" : "Chép mẫu"}</button>
          </div>
          <p className="mt-2 text-[16px]">{d.template}</p>
        </div>
      </section>
    </>
  );
}

export default function Landing() {
  const p = usePersona();
  return p.role && p.goal ? <PersonaHero /> : <Gate />;
}
