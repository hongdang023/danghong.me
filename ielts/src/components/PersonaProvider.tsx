"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { GOALS, type Goal, type Role } from "@/lib/persona";

interface State { role: Role | null; goal: Goal | null }
interface Ctx extends State {
  ready: boolean;
  setRole: (r: Role) => void;
  setGoal: (g: Goal) => void;
  reset: () => void;
}

const KEY = "ielts.persona";
const listeners = new Set<() => void>();

// The choice lives only in this browser's localStorage; nothing is sent anywhere.
function read(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => { listeners.delete(cb); window.removeEventListener("storage", cb); };
}
function write(next: State | null) {
  try {
    if (next) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
  } catch { /* storage unavailable: choice lasts for this page view only */ }
  listeners.forEach((l) => l());
}

function parse(raw: string | null): State {
  if (!raw) return { role: null, goal: null };
  try {
    const v = JSON.parse(raw) as State;
    if (v.role && GOALS[v.role]) {
      const goal = v.goal && GOALS[v.role].some((g) => g.id === v.goal) ? v.goal : null;
      return { role: v.role, goal };
    }
  } catch { /* fall through */ }
  return { role: null, goal: null };
}

const PersonaCtx = createContext<Ctx | null>(null);

export function usePersona(): Ctx {
  const c = useContext(PersonaCtx);
  if (!c) throw new Error("usePersona must be used inside PersonaProvider");
  return c;
}

const noopSubscribe = () => () => {};

export default function PersonaProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, read, () => null);
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const s = useMemo(() => parse(raw), [raw]);
  const value = useMemo<Ctx>(() => ({
    ...s,
    ready,
    setRole: (r) => write({ role: r, goal: null }),
    setGoal: (g) => write({ role: s.role, goal: g }),
    reset: () => write(null),
  }), [s, ready]);
  return <PersonaCtx.Provider value={value}>{children}</PersonaCtx.Provider>;
}
