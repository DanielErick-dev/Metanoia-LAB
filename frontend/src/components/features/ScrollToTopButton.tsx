"use client";

import { useEffect, useState } from "react";

const GOLD = "#eab308";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="fixed top-28 z-40 w-11 h-11 rounded-full border backdrop-blur-sm flex items-center justify-center animate-scroll-top-btn cursor-pointer transition-colors hover:brightness-125"
      style={{
        left: "max(1rem, calc((100vw - 1152px) / 2 - 2.5rem))",
        color: GOLD,
        borderColor: `${GOLD}55`,
        backgroundColor: `${GOLD}1f`,
      }}
    >
      <span className="text-lg leading-none">↑</span>
    </button>
  );
}
