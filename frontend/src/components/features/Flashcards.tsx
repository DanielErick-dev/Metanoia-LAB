"use client";

import { useEffect, useState } from "react";
import { Flashcard } from "@/lib/flashcards";
import { SpeakButton } from "./SpeakButton";

interface FlashcardsProps {
  cards: Flashcard[];
  accent: string;
  storageKey: string;
}

interface CardState {
  box: number;
  due: string;
}

type Progress = Record<string, CardState>;

const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 30];

function loadProgress(storageKey: string): Progress {
  try {
    if (typeof window === "undefined") return {};
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

function saveProgress(storageKey: string, progress: Progress) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    return;
  }
}

function shuffleCards(list: Flashcard[]): Flashcard[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function dueCards(cards: Flashcard[], progress: Progress): Flashcard[] {
  const now = Date.now();
  return cards.filter((card) => {
    const state = progress[card.id];
    if (!state) return true;
    return new Date(state.due).getTime() <= now;
  });
}

export function Flashcards({ cards, accent, storageKey }: FlashcardsProps) {
  const [started, setStarted] = useState(false);
  const [caughtUp, setCaughtUp] = useState(false);
  const [queue, setQueue] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });
  const [finished, setFinished] = useState(false);
  const [autoAudio, setAutoAudio] = useState(false);
  const [progress, setProgress] = useState<Progress>({});

  const current = queue[index];

  useEffect(() => {
    if (!autoAudio || !started || finished || caughtUp || !current) return;
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(current.front);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [autoAudio, started, finished, caughtUp, current]);

  function handleStart(forceAll = false) {
    const loaded = loadProgress(storageKey);
    const due = dueCards(cards, loaded);
    const pool = due.length > 0 ? due : forceAll ? cards : [];
    setProgress(loaded);
    if (pool.length === 0) {
      setStarted(true);
      setCaughtUp(true);
      return;
    }
    setQueue(shuffleCards(pool));
    setIndex(0);
    setFlipped(false);
    setResults({ correct: 0, incorrect: 0 });
    setFinished(false);
    setCaughtUp(false);
    setStarted(true);
  }

  function handleGrade(remembered: boolean) {
    if (!current) return;
    const existing = progress[current.id] ?? { box: 0, due: new Date(0).toISOString() };
    const newBox = remembered
      ? Math.min(existing.box + 1, BOX_INTERVAL_DAYS.length - 1)
      : 0;
    const due = new Date(Date.now() + BOX_INTERVAL_DAYS[newBox] * 86400000).toISOString();
    const nextProgress = { ...progress, [current.id]: { box: newBox, due } };
    setProgress(nextProgress);
    saveProgress(storageKey, nextProgress);

    setResults((r) => ({
      correct: r.correct + (remembered ? 1 : 0),
      incorrect: r.incorrect + (remembered ? 0 : 1),
    }));

    let nextQueue = queue;
    if (!remembered) {
      nextQueue = [...queue];
      const reinsertAt = Math.min(index + 4, nextQueue.length);
      nextQueue.splice(reinsertAt, 0, current);
    }
    const nextIndex = index + 1;
    if (nextIndex >= nextQueue.length) {
      setFinished(true);
    } else {
      setQueue(nextQueue);
      setIndex(nextIndex);
    }
    setFlipped(false);
  }

  const toggleAudio = (
    <label className="flex items-center gap-2 text-xs text-stone-500 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={autoAudio}
        onChange={(e) => setAutoAudio(e.target.checked)}
        className="cursor-pointer"
      />
      Ouvir áudio automaticamente
    </label>
  );

  if (!started) {
    return (
      <div className="text-center py-16">
        <p
          className="text-2xl text-stone-100 mb-3"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {cards.length} {cards.length === 1 ? "cartão" : "cartões"}
        </p>
        <p className="text-stone-500 mb-6">
          Repetição espaçada: você revê cada cartão pouco antes de esquecer. O que você erra
          volta mais cedo.
        </p>
        <div className="flex justify-center mb-8">{toggleAudio}</div>
        <button
          onClick={() => handleStart()}
          className="cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
          style={{
            color: accent,
            borderColor: `${accent}40`,
            backgroundColor: `${accent}12`,
          }}
        >
          Começar revisão
        </button>
      </div>
    );
  }

  if (caughtUp) {
    return (
      <div className="text-center py-16">
        <p
          className="text-2xl text-stone-100 mb-3"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          Tudo em dia! 🎉
        </p>
        <p className="text-stone-500 mb-10">
          Nenhum cartão está no prazo de revisão agora. Volte mais tarde, ou revise tudo de
          novo mesmo assim.
        </p>
        <button
          onClick={() => handleStart(true)}
          className="cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
          style={{
            color: accent,
            borderColor: `${accent}40`,
            backgroundColor: `${accent}12`,
          }}
        >
          Revisar tudo mesmo assim
        </button>
      </div>
    );
  }

  if (finished) {
    const total = results.correct + results.incorrect;
    const percentage = total > 0 ? Math.round((results.correct / total) * 100) : 0;
    return (
      <div className="text-center py-16">
        <p className="text-sm text-stone-600 tracking-widest uppercase mb-4">Resultado</p>
        <p
          className="text-5xl font-semibold text-white mb-3"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {results.correct} / {total}
        </p>
        <p className="text-stone-400 mb-10">Você lembrou {percentage}% dos cartões.</p>
        <button
          onClick={() => handleStart()}
          className="cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
          style={{
            color: accent,
            borderColor: `${accent}40`,
            backgroundColor: `${accent}12`,
          }}
        >
          Revisar de novo
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs text-stone-600 tracking-widest uppercase">
          Cartão {index + 1} de {queue.length}
        </p>
        <p className="text-xs text-stone-600 tracking-widest uppercase">
          Acertos: {results.correct}
        </p>
      </div>

      <div className="border border-stone-800 rounded-2xl p-10 min-h-75 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <p
            className="text-3xl text-stone-100"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {current.front}
          </p>
          <SpeakButton text={current.front} accent={accent} />
        </div>

        {flipped && (
          <div className="w-full border-t border-stone-800 pt-6 mt-2 space-y-4">
            <p className="text-xl" style={{ color: accent, fontFamily: "'Lora', Georgia, serif" }}>
              {current.translation}
            </p>
            {current.note && (
              <p className="text-sm text-stone-500 leading-relaxed">{current.note}</p>
            )}
            {current.example && (
              <div className="pl-4 border-l-2 text-left" style={{ borderColor: `${accent}40` }}>
                <p className="italic text-stone-300 leading-relaxed flex items-baseline gap-2">
                  <span>“{current.example}”</span>
                  <SpeakButton text={current.example} accent={accent} />
                </p>
                {current.exampleTranslation && (
                  <p className="text-sm text-stone-500 mt-1">{current.exampleTranslation}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        {toggleAudio}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {!flipped ? (
          <button
            onClick={() => setFlipped(true)}
            className="cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
            style={{
              color: accent,
              borderColor: `${accent}40`,
              backgroundColor: `${accent}12`,
            }}
          >
            Virar cartão
          </button>
        ) : (
          <>
            <button
              onClick={() => handleGrade(false)}
              className="cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
              style={{ color: "#f87171", borderColor: "#f8717140", backgroundColor: "#f8717112" }}
            >
              Não lembrei
            </button>
            <button
              onClick={() => handleGrade(true)}
              className="cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
              style={{ color: "#4ade80", borderColor: "#4ade8040", backgroundColor: "#4ade8012" }}
            >
              Lembrei
            </button>
          </>
        )}
      </div>
    </div>
  );
}
