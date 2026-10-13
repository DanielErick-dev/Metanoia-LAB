"use client";

import { useState, type CSSProperties } from "react";
import { InterrogationEntry } from "@/lib/types/topic";

interface InterrogationProps {
  entries: InterrogationEntry[];
  suspects: string[];
  accent: string;
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function shuffledIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

function isCorrect(entry: InterrogationEntry, guess: string): boolean {
  return [entry.answer, ...(entry.accept ?? [])].includes(guess);
}

function fillBlank(sentence: string, word: string): string {
  const filled = sentence.replace("___", word);
  return sentence.startsWith("___") ? filled.charAt(0).toUpperCase() + filled.slice(1) : filled;
}

export function Interrogation({ entries, suspects, accent }: InterrogationProps) {
  const [order, setOrder] = useState<number[] | null>(null);
  const [step, setStep] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  function start() {
    setOrder(shuffledIndices(entries.length));
    setStep(0);
    setGuess(null);
    setScore(0);
  }

  function answer(word: string) {
    if (guess !== null || !order) return;
    setGuess(word);
    if (isCorrect(entries[order[step]], word)) setScore((s) => s + 1);
  }

  const finished = order !== null && step >= order.length;
  const entry = order && !finished ? entries[order[step]] : null;
  const [before, after] = entry ? entry.sentence.split("___") : ["", ""];

  return (
    <div className="mt-8 rounded-2xl border border-stone-800 overflow-hidden" style={{ backgroundColor: "#141210" }}>
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-stone-800"
        style={{ fontFamily: MONO }}
      >
        <span className="text-[0.65rem] tracking-[0.25em] uppercase text-stone-500">Interrogation room</span>
        <span className="flex items-center gap-2 text-[0.65rem] tracking-widest uppercase" style={{ color: accent }}>
          <span className="w-2 h-2 rounded-full animate-pulse bg-red-500" />
          Rec
        </span>
      </div>

      {order === null && (
        <div className="px-6 py-10 text-center">
          <p className="text-4xl mb-4">🕵️</p>
          <p className="text-stone-300 mb-6" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            {entries.length} frases, {suspects.length} suspeitos. Descubra quem completa cada uma.
          </p>
          <button
            type="button"
            onClick={start}
            className="text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full text-[#0f0e0d] hover:opacity-90 transition-opacity cursor-pointer"
            style={{ backgroundColor: accent, fontFamily: "'DM Sans', sans-serif" }}
          >
            Começar interrogatório
          </button>
        </div>
      )}

      {entry && order && (
        <div className="px-6 py-8">
          <p className="text-[0.65rem] tracking-widest uppercase text-stone-600 mb-4" style={{ fontFamily: MONO }}>
            Pergunta {step + 1} de {order.length} · {score} confissões
          </p>
          <p className="text-xl sm:text-2xl text-stone-100 leading-relaxed mb-2" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            {before}
            <span
              className="inline-block min-w-20 px-2 mx-1 border-b-2 text-center"
              style={{
                borderColor: accent,
                color: guess === null ? "transparent" : isCorrect(entry, guess) ? accent : "#f87171",
              }}
            >
              {guess ?? "____"}
            </span>
            {after}
          </p>
          <p className="text-sm text-stone-500 mb-7">Pista: {entry.translation}</p>

          <div className="flex flex-wrap gap-2">
            {suspects.map((word) => {
              const answered = guess !== null;
              const right = isCorrect(entry, word);
              const picked = guess === word;
              let style: CSSProperties = { borderColor: "#44403c", color: "#d6d3d1" };
              if (answered && right && (picked || word === entry.answer)) {
                style = { borderColor: accent, color: "#0f0e0d", backgroundColor: accent };
              } else if (answered && picked) {
                style = { borderColor: "#f87171", color: "#f87171", backgroundColor: "#f8717115" };
              } else if (answered) {
                style = { borderColor: "#292524", color: "#57534e" };
              }
              return (
                <button
                  key={word}
                  type="button"
                  onClick={() => answer(word)}
                  disabled={answered}
                  className="px-4 py-2 rounded-lg border text-sm font-semibold transition-colors enabled:hover:border-stone-400 enabled:cursor-pointer"
                  style={{ ...style, fontFamily: "'Lora', Georgia, serif" }}
                >
                  {word}
                </button>
              );
            })}
          </div>

          {guess !== null && (
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm" style={{ color: isCorrect(entry, guess) ? accent : "#f87171" }}>
                {isCorrect(entry, guess)
                  ? "Confessou! 🎯"
                  : `Suspeito errado — era ${entry.answer}: “${fillBlank(entry.sentence, entry.answer)}”`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep((s) => s + 1);
                  setGuess(null);
                }}
                className="text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-colors cursor-pointer"
                style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}12`, fontFamily: "'DM Sans', sans-serif" }}
              >
                {step === order.length - 1 ? "Ver veredito →" : "Próximo →"}
              </button>
            </div>
          )}
        </div>
      )}

      {finished && order && (
        <div className="px-6 py-10 text-center">
          <p
            className="inline-block text-2xl font-bold tracking-[0.2em] uppercase px-5 py-2 border-4 rounded-md -rotate-6 mb-6"
            style={{ color: accent, borderColor: accent, fontFamily: MONO }}
          >
            Case closed
          </p>
          <p className="text-stone-300 mb-6" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            Você acertou {score} de {order.length}.{" "}
            {score === order.length ? "Detetive de primeira. 🏆" : "Volte pro line-up e tente de novo."}
          </p>
          <button
            type="button"
            onClick={start}
            className="text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-colors cursor-pointer"
            style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}12`, fontFamily: "'DM Sans', sans-serif" }}
          >
            Reabrir o caso
          </button>
        </div>
      )}
    </div>
  );
}
