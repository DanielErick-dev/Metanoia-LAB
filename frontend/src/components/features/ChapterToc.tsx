"use client";

import { useEffect, useRef, useState } from "react";

interface ChapterTocItem {
  id: string;
  label: string;
}

interface ChapterTocProps {
  items: ChapterTocItem[];
  accent: string;
}

export function ChapterToc({ items, accent }: ChapterTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) current = item.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-toc="${activeId}"]`);
    if (!list || !link) return;
    const top = link.offsetTop - list.clientHeight / 2;
    list.scrollTo({ top, behavior: "smooth" });
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <p className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-4">Nesta página</p>
      <div
        ref={listRef}
        className="relative max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide border-l border-stone-800"
      >
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-toc={item.id}
              className="block -ml-px border-l py-1.5 pl-4 text-[0.8125rem] leading-snug transition-colors hover:text-stone-200"
              style={{
                borderColor: active ? accent : "transparent",
                color: active ? "#f5f5f4" : "#78716c",
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
