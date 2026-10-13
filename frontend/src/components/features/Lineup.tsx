"use client";

import { useState } from "react";
import { LineupEntry } from "@/lib/types/topic";
import { SpeakButton } from "./SpeakButton";

interface LineupProps {
  entries: LineupEntry[];
  accent: string;
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function caseNumber(index: number): string {
  return `#${String(index + 1).padStart(3, "0")}`;
}

function cautionTape(accent: string): string {
  return `repeating-linear-gradient(-45deg, ${accent} 0 10px, #0f0e0d 10px 20px)`;
}

export function Lineup({ entries, accent }: LineupProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const allOpen = open.size === entries.length;

  function toggle(index: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function toggleAll() {
    setOpen(allOpen ? new Set() : new Set(entries.map((_, i) => i)));
  }

  function jumpTo(index: number) {
    setOpen((current) => new Set(current).add(index));
    document.getElementById(`suspect-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="mt-8">
      <div className="rounded-2xl overflow-hidden border border-stone-800">
        <div className="h-3" style={{ background: cautionTape(accent) }} />
        <div
          className="relative px-4 pt-6 pb-4"
          style={{
            backgroundColor: "#141210",
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 23px, ${accent}1f 23px 24px)`,
          }}
        >
          <p
            className="text-[0.65rem] tracking-[0.3em] uppercase text-center mb-5"
            style={{ color: accent, fontFamily: MONO }}
          >
            ★ Police line-up — do not cross ★
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {entries.map((entry, i) => (
              <button
                key={entry.word}
                type="button"
                onClick={() => jumpTo(i)}
                className="group flex flex-col items-center px-3 py-2 rounded-lg border border-stone-700 bg-[#0f0e0d]/80 hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <span className="text-[0.6rem] text-stone-600" style={{ fontFamily: MONO }}>
                  {caseNumber(i)}
                </span>
                <span
                  className="text-base font-semibold text-stone-100 group-hover:text-white"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
                >
                  {entry.word}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="h-3" style={{ background: cautionTape(accent) }} />
      </div>

      <div className="flex justify-end mt-6 mb-4">
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors cursor-pointer"
          style={{
            color: accent,
            borderColor: `${accent}40`,
            backgroundColor: `${accent}12`,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {allOpen ? "Fechar todas as fichas" : "Abrir todas as fichas"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {entries.map((entry, i) => {
          const isOpen = open.has(i);
          return (
            <div
              key={entry.word}
              id={`suspect-${i}`}
              className="rounded-xl border border-stone-800 bg-stone-900/40 overflow-hidden scroll-mt-24 self-start"
            >
              <div
                className="relative px-5 pt-4 pb-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 15px, ${accent}14 15px 16px)`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[0.65rem] tracking-widest text-stone-500" style={{ fontFamily: MONO }}>
                    CASE {caseNumber(i)}
                  </span>
                  <span
                    className="text-[0.6rem] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm font-bold text-[#0f0e0d]"
                    style={{ backgroundColor: accent, fontFamily: MONO }}
                  >
                    Wanted
                  </span>
                </div>
                <div className="rounded-md bg-[#0f0e0d] border border-stone-700 px-4 py-3">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-3xl font-semibold text-white break-words"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {entry.word}
                    </span>
                    <SpeakButton text={entry.word} accent={accent} />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-5 py-3 border-t border-stone-800 text-xs tracking-widest uppercase text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span>{isOpen ? "Fechar ficha" : "Abrir ficha"}</span>
                <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 space-y-4">
                  <div>
                    <p className="text-[0.65rem] tracking-widest uppercase text-stone-600 mb-1" style={{ fontFamily: MONO }}>
                      Known for
                    </p>
                    <p
                      className="text-[1.0625rem] font-semibold leading-snug"
                      style={{ color: accent, fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {entry.meaning}
                    </p>
                  </div>

                  {entry.details && entry.details.length > 0 && (
                    <ul className="space-y-1.5">
                      {entry.details.map((detail, k) => (
                        <li key={k} className="text-sm text-stone-400 leading-relaxed flex gap-2">
                          <span style={{ color: accent }}>›</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.forms && (
                    <div>
                      <p className="text-[0.65rem] tracking-widest uppercase text-stone-600 mb-2" style={{ fontFamily: MONO }}>
                        {entry.forms.label}
                      </p>
                      <div className="space-y-1">
                        {entry.forms.pairs.map(([base, past]) => (
                          <p key={base} className="text-sm text-stone-300" style={{ fontFamily: MONO }}>
                            {base} <span className="text-stone-600">→</span>{" "}
                            <span style={{ color: accent }}>{past}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.informal && (
                    <div className="rounded-lg border border-dashed px-4 py-3" style={{ borderColor: `${accent}50` }}>
                      <p className="text-[0.65rem] tracking-widest uppercase text-stone-600 mb-1" style={{ fontFamily: MONO }}>
                        Street name
                      </p>
                      <p className="text-sm text-stone-300 leading-relaxed">
                        <span className="font-semibold" style={{ color: accent, fontFamily: MONO }}>
                          {entry.informal.word}
                        </span>{" "}
                        — {entry.informal.note}
                      </p>
                    </div>
                  )}

                  {entry.examples && entry.examples.length > 0 && (
                    <div className="space-y-3">
                      {entry.examples.map((example) => (
                        <div key={example.en} className="pl-3 border-l-2" style={{ borderColor: `${accent}40` }}>
                          <p
                            className="italic text-stone-200 leading-relaxed flex items-baseline gap-2"
                            style={{ fontFamily: "'Lora', Georgia, serif" }}
                          >
                            <span>“{example.en}”</span>
                            <SpeakButton text={example.en} accent={accent} />
                          </p>
                          <p className="text-sm text-stone-500 mt-1">{example.pt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
