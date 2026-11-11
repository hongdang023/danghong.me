"use client";

import { Moon, Sun } from "lucide-react";

// Hai chế độ sáng/tối. Mặc định theo hệ thống (CSS), bấm để chọn tay và nhớ trong localStorage.
// Biểu tượng hiển thị bằng CSS (.t-sun, .t-moon) nên không cần state và không nhấp nháy khi tải.
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const cur = root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* chế độ riêng tư: bỏ qua */ }
  }
  return (
    <button type="button" onClick={toggle} aria-label="Đổi giao diện sáng hoặc tối" title="Đổi giao diện sáng hoặc tối" className="rounded-full border border-line bg-surface p-2.5 transition hover:-translate-y-0.5">
      <Sun size={17} className="t-sun" aria-hidden />
      <Moon size={17} className="t-moon" aria-hidden />
    </button>
  );
}
