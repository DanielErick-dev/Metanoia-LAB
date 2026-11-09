export function BritishTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block px-1.5 py-px rounded border border-sky-500/40 bg-sky-500/10 text-sky-300 text-[0.625rem] font-bold uppercase tracking-wider align-middle not-italic ${className}`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      Britânico
    </span>
  );
}
