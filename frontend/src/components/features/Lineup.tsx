"use client";

import { useState } from "react";
import { LineupEntry } from "@/lib/types/topic";
import { SpeakButton } from "./SpeakButton";
import { typewriter } from "./caseFonts";

interface LineupProps {
  entries: LineupEntry[];
  accent: string;
}

const PAPER = "#e9dfc6";
const INK = "#2b2418";
const RED_INK = "#a3261f";
const LABEL_STYLE = { fontFamily: "var(--font-dm-sans), sans-serif", color: "#5b4a30" };
const LABEL = "text-[0.72rem] font-bold tracking-[0.18em] uppercase";
const STATURE = [10, 26, 4, 18, 30, 0, 14];
const CHART_MARKS = ["7'", "6'6\"", "6'", "5'6\"", "5'", "4'6\""];

function caseNumber(index: number): string {
  return `#${String(index + 1).padStart(3, "0")}`;
}

function cautionTape(accent: string): string {
  return `repeating-linear-gradient(-45deg, ${accent} 0 10px, #0f0e0d 10px 20px)`;
}

export function Lineup({ entries, accent }: LineupProps) {
  const [selected, setSelected] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const allRevealed = revealed.size === entries.length;
  const entry = entries[selected];
  const isRevealed = revealed.has(selected);

  function reveal(index: number) {
    setRevealed((current) => new Set(current).add(index));
  }

  function toggleAll() {
    setRevealed(allRevealed ? new Set() : new Set(entries.map((_, i) => i)));
  }

  function go(step: number) {
    setSelected((current) => (current + step + entries.length) % entries.length);
  }

  return (
    <div className="mt-8">
      <div className="rounded-2xl overflow-hidden border border-stone-800">
        <div className="h-3" style={{ background: cautionTape(accent) }} />
        <div className="relative overflow-x-auto" style={{ backgroundColor: "#16140f" }}>
          <div className="relative min-w-[640px] h-[290px] px-6">
            <div className="absolute inset-x-0 top-6 bottom-0 flex flex-col justify-between pointer-events-none">
              {CHART_MARKS.map((mark) => (
                <div key={mark} className="flex items-center gap-2">
                  <span className={`${typewriter.className} w-8 text-right text-[0.65rem] text-stone-600`}>{mark}</span>
                  <div className="h-px flex-1" style={{ backgroundColor: `${accent}22` }} />
                </div>
              ))}
            </div>

            <div className="relative h-full flex items-end justify-center gap-3 pl-8">
              {entries.map((suspect, i) => {
                const active = i === selected;
                return (
                  <button
                    key={suspect.word}
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={active}
                    aria-label={`Suspeito ${caseNumber(i)}: ${suspect.word}`}
                    className="group relative flex flex-col items-center w-[72px] cursor-pointer focus-visible:outline-none"
                  >
                    <span
                      className="absolute -inset-x-3 bottom-0 top-[-40px] rounded-t-full transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(ellipse at 50% 30%, ${accent}40, transparent 70%)`,
                        opacity: active ? 1 : 0,
                      }}
                    />
                    <span
                      className="relative w-10 h-11 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: active ? `${accent}cc` : "#3a352c", marginBottom: 4 }}
                    />
                    <span
                      className="relative w-[64px] rounded-t-[32px] transition-colors duration-300 group-hover:brightness-125 group-focus-visible:ring-2"
                      style={{
                        height: 110 + STATURE[i % STATURE.length],
                        backgroundColor: active ? `${accent}99` : "#2c2822",
                      }}
                    />
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 bottom-6 w-[78px] rounded-sm border px-1 py-1.5 text-center shadow-lg transition-transform duration-300 ${
                        active ? "-translate-y-1 scale-105" : "group-hover:-translate-y-0.5"
                      }`}
                      style={{ backgroundColor: "#0b0a08", borderColor: active ? accent : "#4a443a" }}
                    >
                      <span className={`${typewriter.className} block text-[0.5rem] tracking-wider text-stone-500`}>
                        METANOIA PD
                      </span>
                      <span
                        className="block text-[0.82rem] font-semibold leading-tight text-white"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        {suspect.word}
                      </span>
                      <span className={`${typewriter.className} block text-[0.6rem]`} style={{ color: accent }}>
                        {caseNumber(i)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-3" style={{ background: cautionTape(accent) }} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 mb-6">
        <p className={`${typewriter.className} text-xs text-stone-400`}>
          <span className="sm:hidden">Arraste o line-up pro lado e toque num suspeito pra puxar a ficha dele.</span>
          <span className="hidden sm:inline">Clique num suspeito pra puxar a ficha dele.</span>
        </p>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors cursor-pointer"
          style={{
            color: accent,
            borderColor: `${accent}40`,
            backgroundColor: `${accent}12`,
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          {allRevealed ? "Esconder significados" : "Revelar todos"}
        </button>
      </div>

      <div className="relative pt-5">
        <div
          className={`${typewriter.className} absolute top-0 left-6 px-4 pt-1.5 pb-3 rounded-t-md text-xs tracking-widest`}
          style={{ backgroundColor: "#d8cba9", color: INK }}
        >
          CASE FILE {caseNumber(selected)}
        </div>

        <div
          key={entry.word}
          className="relative rounded-md rounded-tl-none px-6 py-7 sm:px-8 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{
            backgroundColor: PAPER,
            color: INK,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 27px, ${INK}14 27px 28px)`,
          }}
        >
          <span
            className={`${typewriter.className} absolute top-5 right-5 sm:right-8 text-lg sm:text-xl tracking-[0.2em] px-3 py-1 border-[3px] rounded-sm rotate-[8deg] opacity-80 select-none`}
            style={{ color: RED_INK, borderColor: RED_INK }}
          >
            WANTED
          </span>

          <p style={LABEL_STYLE} className={`${LABEL} mb-1`}>
            SUSPEITO {selected + 1} DE {entries.length}
          </p>
          <div className="flex items-baseline gap-3 mb-6 pr-28">
            <h3
              className="text-4xl sm:text-5xl font-semibold break-words"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {entry.word}
            </h3>
            <SpeakButton text={entry.word} accent={RED_INK} />
          </div>

          <div className="space-y-6 max-w-xl">
            <div>
              <p style={LABEL_STYLE} className={`${LABEL} mb-1.5`}>KNOWN FOR</p>
              {isRevealed ? (
                <p
                  className="text-xl font-semibold leading-snug animate-in fade-in duration-500"
                  style={{ fontFamily: "var(--font-lora), Georgia, serif", color: RED_INK }}
                >
                  {entry.meaning}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => reveal(selected)}
                  className={`${typewriter.className} group w-full text-left rounded-sm px-4 py-3 cursor-pointer transition-transform hover:-rotate-[0.6deg]`}
                  style={{ backgroundColor: INK, color: PAPER }}
                >
                  <span className="flex items-center gap-3 tracking-[0.3em]">
                    <span className="h-3 flex-1 max-w-16 rounded-[1px]" style={{ backgroundColor: PAPER }} />
                    CLASSIFIED
                    <span className="h-3 flex-1 max-w-16 rounded-[1px]" style={{ backgroundColor: PAPER }} />
                  </span>
                  <span className="block text-[0.7rem] opacity-80 mt-0.5 group-hover:opacity-100">
                    Lembra o que significa? Clique pra conferir.
                  </span>
                </button>
              )}
            </div>

            {entry.details && entry.details.length > 0 && (
              <ul className="space-y-2">
                {entry.details.map((detail) => (
                  <li key={detail} className="text-[0.95rem] leading-relaxed flex gap-2.5" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                    <span style={{ color: RED_INK }}>✎</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}

            {entry.forms && (
              <div>
                <p style={LABEL_STYLE} className={`${LABEL} mb-2`}>
                  {entry.forms.label.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.forms.pairs.map(([base, past]) => (
                    <span
                      key={base}
                      className={`${typewriter.className} text-sm px-3 py-1 rounded-sm border`}
                      style={{ borderColor: `${INK}40` }}
                    >
                      {base} → <span style={{ color: RED_INK }}>{past}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {entry.informal && (
              <div className="rounded-sm border-2 border-dashed px-4 py-3" style={{ borderColor: `${INK}55` }}>
                <p style={LABEL_STYLE} className={`${LABEL} mb-1`}>STREET NAME</p>
                <p className="text-[0.95rem] leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                  <span className={`${typewriter.className} text-lg`} style={{ color: RED_INK }}>
                    {entry.informal.word}
                  </span>{" "}
                  — {entry.informal.note}
                </p>
              </div>
            )}

            {entry.examples && entry.examples.length > 0 && (
              <div>
                <p style={LABEL_STYLE} className={`${LABEL} mb-2`}>FLAGRANTES</p>
                <div className="space-y-3">
                  {entry.examples.map((example) => (
                    <div key={example.en} className="pl-4 border-l-[3px]" style={{ borderColor: RED_INK }}>
                      <p
                        className="text-lg italic leading-relaxed flex items-baseline gap-2"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        <span>“{example.en}”</span>
                        <SpeakButton text={example.en} accent={RED_INK} />
                      </p>
                      <p className="text-sm opacity-85 mt-0.5">{example.pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8 pt-4 border-t border-dashed" style={{ borderColor: `${INK}40` }}>
            <button
              type="button"
              onClick={() => go(-1)}
              className={`${typewriter.className} text-sm px-3 py-1.5 rounded-sm cursor-pointer hover:bg-black/10 transition-colors`}
            >
              ← {entries[(selected - 1 + entries.length) % entries.length].word}
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={`${typewriter.className} text-sm px-3 py-1.5 rounded-sm cursor-pointer hover:bg-black/10 transition-colors`}
            >
              {entries[(selected + 1) % entries.length].word} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
