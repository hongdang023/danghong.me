"use client";

import { useMemo, useState } from "react";
import type { School } from "@/lib/schools";

const fold = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase();

export default function SchoolLookup({ schools }: { schools: School[] }) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("");
  const groups = useMemo(() => [...new Set(schools.map((s) => s.group).filter(Boolean))] as string[], [schools]);
  const shown = useMemo(
    () => schools.filter((s) => (!group || s.group === group) && fold(`${s.name} ${s.requirement}`).includes(fold(q))),
    [schools, q, group],
  );

  if (schools.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-card p-6 text-muted">
        Danh sách trường đang được cập nhật. Mỗi trường chỉ được đăng khi có link quy chế gốc và ngày kiểm chứng.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <label className="flex-1 min-w-56">
          <span className="sr-only">Tìm trường</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nhập tên trường…"
            className="w-full rounded-xl border border-line bg-card px-4 py-2.5"
          />
        </label>
        {groups.length > 0 && (
          <label>
            <span className="sr-only">Nhóm trường</span>
            <select value={group} onChange={(e) => setGroup(e.target.value)} className="rounded-xl border border-line bg-card px-4 py-2.5">
              <option value="">Tất cả nhóm</option>
              {groups.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {shown.length} trường
      </p>
      <ul className="mt-4 space-y-3">
        {shown.map((s) => (
          <li key={s.id} className="rounded-xl border border-line bg-card p-5">
            <h3 className="">{s.name}</h3>
            <p className="mt-1 text-lg">{s.requirement}</p>
            {s.applies && <p className="mt-1 text-sm text-muted">Áp dụng cho: {s.applies}</p>}
            {s.accepted && <p className="mt-1 text-sm text-muted">Chứng chỉ được chấp nhận: {s.accepted}</p>}
            {s.note && <p className="mt-1 text-sm text-muted">{s.note}</p>}
            <p className="mt-3 text-sm">
              <a href={s.sourceUrl} className="text-accent underline" rel="noopener">Quy chế gốc ↗</a>
              <span className="text-muted"> · kiểm chứng {s.verifiedAt}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
