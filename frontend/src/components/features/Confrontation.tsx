"use client";

import { Fragment } from "react";
import { ConfrontationEntry } from "@/lib/types/topic";
import { SpeakButton } from "./SpeakButton";
import { handwriting, typewriter } from "./caseFonts";

interface ConfrontationProps {
  entries: ConfrontationEntry[];
  accent: string;
}

const NOTE_PAPER = "#fde68a";
const NOTE_INK = "#3b2f12";
const NOTE_TILT = ["rotate-[1.5deg]", "-rotate-[1.2deg]", "rotate-[0.8deg]", "-rotate-[1.8deg]", "rotate-[1.2deg]"];

export function Confrontation({ entries, accent }: ConfrontationProps) {
  return (
    <div className="mt-10 space-y-16">
      {entries.map((entry, i) => (
        <div key={entry.title}>
          <div className="flex items-baseline gap-3 mb-4">
            <span className={`${typewriter.className} text-sm`} style={{ color: accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-semibold text-stone-100" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              {entry.title}
            </h3>
          </div>

          <div className="relative rounded-2xl border border-stone-800 overflow-hidden" style={{ backgroundColor: "#141210" }}>
            <div
              className={`grid grid-cols-1 ${
                entry.suspects.length === 3 ? "md:grid-cols-[1fr_auto_1fr_auto_1fr]" : "md:grid-cols-[1fr_auto_1fr]"
              }`}
            >
              {entry.suspects.map((suspect, k) => (
                <Fragment key={suspect.word}>
                  {k > 0 && (
                    <div className="relative flex items-center justify-center md:w-0">
                      <div className="absolute left-6 right-6 top-1/2 border-t border-dashed border-stone-700 md:hidden" />
                      <div className="absolute top-6 bottom-6 left-1/2 border-l border-dashed border-stone-700 hidden md:block" />
                      <span
                        className={`${typewriter.className} relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm text-[#0f0e0d] -my-5 md:my-0 -rotate-12`}
                        style={{ backgroundColor: accent }}
                      >
                        VS
                      </span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold" style={{ color: accent, fontFamily: "var(--font-lora), Georgia, serif" }}>
                        {suspect.word}
                      </span>
                      <SpeakButton text={suspect.word} accent={accent} />
                    </div>
                    <p className="text-[0.95rem] text-stone-300 leading-relaxed" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                      {suspect.context}
                    </p>
                    <div className="mt-auto pt-2">
                      <p className="italic text-stone-100 leading-relaxed flex items-baseline gap-2" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                        <span>“{suspect.example.en}”</span>
                        <SpeakButton text={suspect.example.en} accent={accent} />
                      </p>
                      <p className="text-sm text-stone-500 mt-1">{suspect.example.pt}</p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className={`relative -mt-3 ml-auto mr-2 sm:mr-6 w-[92%] sm:w-[78%] ${NOTE_TILT[i % NOTE_TILT.length]}`}>
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[-3deg] opacity-70"
              style={{ backgroundColor: "#f5f0e1" }}
            />
            <div
              className="px-6 pt-6 pb-5 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.9)]"
              style={{ backgroundColor: NOTE_PAPER, color: NOTE_INK }}
            >
              <p className={`${handwriting.className} text-[1.45rem] leading-[1.3]`}>{entry.hook}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
