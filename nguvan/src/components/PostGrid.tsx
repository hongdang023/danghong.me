"use client";

import { useState } from "react";
import { MediaCard } from "@/components/Ui";
import { POSTS, TOPICS } from "@/lib/posts";

export function PostGrid() {
  const [topic, setTopic] = useState<string>("Tất cả");
  const list = topic === "Tất cả" ? POSTS : POSTS.filter((p) => p.topic === topic);
  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-3" role="group" aria-label="Phân loại bài viết">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/50">Phân loại:</span>
        {["Tất cả", ...TOPICS].map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={t === topic}
            onClick={() => setTopic(t)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${t === topic ? "bg-accent text-on-accent shadow-lg shadow-accent/30" : "bg-surface text-foreground/70 hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <MediaCard key={p.slug} external href={p.url} image={p.image} tags={[p.topic]} title={p.title} text={p.summary} cta="Đọc trên Newsletter" />
        ))}
      </div>
    </>
  );
}
