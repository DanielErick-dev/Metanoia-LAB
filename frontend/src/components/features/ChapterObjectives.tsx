import { TopicObjectives } from "@/lib/types/topic";

interface ChapterObjectivesProps {
  objectives: TopicObjectives;
  accent: string;
}

const sans = { fontFamily: "var(--font-dm-sans), sans-serif" };
const serif = { fontFamily: "var(--font-lora), Georgia, serif" };

function Checklist({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{ borderColor: `${accent}40`, background: `linear-gradient(135deg, ${accent}14, transparent 60%)` }}
    >
      <p className="text-xs font-medium tracking-widest uppercase mb-5" style={{ ...sans, color: accent }}>
        Objetivos deste capítulo
      </p>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-4">
            <span
              className="mt-1 w-5 h-5 shrink-0 rounded-md border flex items-center justify-center text-[0.7rem]"
              style={{ borderColor: `${accent}80`, color: accent, backgroundColor: `${accent}1a` }}
            >
              ✓
            </span>
            <span className="text-[1.0625rem] text-stone-300 leading-relaxed" style={serif}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Terminal({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="rounded-xl border border-stone-800 bg-[#0a0a09] overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-800 bg-stone-900/60">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-stone-500 font-mono">objetivos.sh</span>
      </div>
      <div className="p-5 sm:p-6 font-mono text-sm leading-relaxed space-y-3">
        <p className="text-stone-500">
          <span style={{ color: accent }}>$</span> cat objetivos.txt
        </p>
        {items.map((item, i) => (
          <p key={i} className="flex gap-3 text-stone-300">
            <span className="shrink-0 text-stone-600">[{String(i + 1).padStart(2, "0")}]</span>
            <span>{item}</span>
          </p>
        ))}
        <p className="text-stone-500">
          <span style={{ color: accent }}>$</span>{" "}
          <span className="inline-block w-2 h-4 align-middle animate-pulse" style={{ backgroundColor: accent }} />
        </p>
      </div>
    </div>
  );
}

function Roadmap({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-widest uppercase mb-8" style={{ ...sans, color: accent }}>
        O caminho deste capítulo
      </p>
      <ol className="relative">
        <span
          className="absolute left-[0.9375rem] top-2 bottom-2 w-px"
          style={{ background: `linear-gradient(to bottom, ${accent}, ${accent}10)` }}
        />
        {items.map((item, i) => (
          <li key={i} className="relative flex items-start gap-5 pb-7 last:pb-0">
            <span
              className="relative z-10 w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-semibold bg-[#0f0e0d]"
              style={{ ...sans, borderColor: accent, color: accent }}
            >
              {i + 1}
            </span>
            <span className="pt-1 text-[1.0625rem] text-stone-300 leading-relaxed" style={serif}>
              {item}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Cards({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-5">
        <p className="text-2xl font-semibold text-stone-100" style={serif}>
          Ao final, você vai saber
        </p>
        <span className="text-xs text-stone-600 tracking-widest uppercase shrink-0" style={sans}>
          {items.length} metas
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-xl border border-stone-800 p-5 transition-colors hover:border-stone-600 ${
              items.length % 2 === 1 && i === items.length - 1 ? "sm:col-span-2" : ""
            }`}
          >
            <span
              className="absolute right-4 top-2 text-5xl font-bold leading-none opacity-15 select-none transition-opacity group-hover:opacity-30"
              style={{ ...serif, color: accent }}
            >
              {i + 1}
            </span>
            <span className="block w-6 h-0.5 mb-4" style={{ backgroundColor: accent }} />
            <p className="relative pr-10 text-[0.9375rem] text-stone-300 leading-relaxed" style={sans}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tree({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-5 sm:p-7">
      <div className="flex items-center gap-3 mb-4 font-mono text-sm">
        <span style={{ color: accent }}>▾</span>
        <span className="text-stone-200">objetivos/</span>
        <span className="ml-auto text-xs text-stone-600" style={sans}>
          {items.length} arquivos
        </span>
      </div>
      <ul className="font-mono text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-stretch">
              <span className="relative w-6 shrink-0">
                <span
                  className={`absolute left-1.5 top-0 w-px ${last ? "h-1/2" : "h-full"}`}
                  style={{ backgroundColor: `${accent}55` }}
                />
                <span
                  className="absolute left-1.5 top-1/2 w-3.5 h-px"
                  style={{ backgroundColor: `${accent}55` }}
                />
              </span>
              <span className="flex items-baseline gap-3 py-2 pl-2">
                <span className="text-xs shrink-0" style={{ color: accent }}>
                  ◆
                </span>
                <span className="text-[0.9375rem] text-stone-300 leading-relaxed" style={sans}>
                  {item}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Pytest({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="rounded-xl border border-stone-800 bg-[#0a0a09] p-5 sm:p-6 font-mono text-[0.8125rem] leading-relaxed">
      <p className="text-stone-500 mb-1">
        <span style={{ color: accent }}>$</span> uv run pytest -v
      </p>
      <p className="flex items-center gap-3 text-stone-400 mb-4">
        <span className="h-px flex-1 bg-stone-700" />
        objetivos do capítulo
        <span className="h-px flex-1 bg-stone-700" />
      </p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-baseline gap-3">
            <span className="flex-1 min-w-0 text-stone-300" style={sans}>
              <span className="text-stone-600 font-mono text-xs mr-2">test_{String(i + 1).padStart(2, "0")}</span>
              {item}
            </span>
            <span className="shrink-0 font-semibold text-xs" style={{ color: accent }}>
              PASSED
            </span>
            <span className="shrink-0 w-12 text-right text-xs text-stone-600">
              [{Math.round(((i + 1) / items.length) * 100)}%]
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 h-1 rounded-full overflow-hidden bg-stone-800">
        <div className="h-full w-full" style={{ backgroundColor: accent }} />
      </div>
      <p className="mt-3 text-center text-xs font-semibold" style={{ color: accent }}>
        {items.length} passed
      </p>
    </div>
  );
}

export function ChapterObjectives({ objectives, accent }: ChapterObjectivesProps) {
  const { style, items } = objectives;
  return (
    <section id="objetivos" className="mb-14 scroll-mt-8">
      {style === "checklist" && <Checklist items={items} accent={accent} />}
      {style === "terminal" && <Terminal items={items} accent={accent} />}
      {style === "roadmap" && <Roadmap items={items} accent={accent} />}
      {style === "cards" && <Cards items={items} accent={accent} />}
      {style === "tree" && <Tree items={items} accent={accent} />}
      {style === "pytest" && <Pytest items={items} accent={accent} />}
    </section>
  );
}
