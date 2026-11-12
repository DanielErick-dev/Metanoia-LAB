"use client";

import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { Flashcard } from "@/lib/flashcards";
import { AnswerVerdict, checkAnswer } from "@/lib/answer-match";
import { normalize } from "@/lib/text-match";
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

type Mode = "choice" | "type" | "flip";

interface QueueItem {
  card: Flashcard;
  options: string[];
}

interface SessionRecord {
  date: string;
  mode: Mode;
  correct: number;
  total: number;
}

interface Answer {
  picked?: string;
  typed?: string;
  verdict: AnswerVerdict;
  previousBox: number;
}

const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 30];
const AUDIO_KEY = "metanoia:flashcards:audio";
const MODE_KEY = "metanoia:flashcards:mode";
const HISTORY_LIMIT = 10;

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "choice", label: "Múltipla escolha", hint: "Escolha a tradução entre 4 opções" },
  { id: "type", label: "Digitar", hint: "Escreva a tradução em português" },
  { id: "flip", label: "Virar cartão", hint: "Vire e diga se lembrou" },
];

const MODE_LABEL: Record<Mode, string> = {
  choice: "Múltipla escolha",
  type: "Digitar",
  flip: "Virar cartão",
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

function shuffle<T>(list: T[]): T[] {
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

function buildOptions(card: Flashcard, all: Flashcard[]): string[] {
  const seen = new Set([normalize(card.translation)]);
  const distractors: string[] = [];
  for (const other of shuffle(all)) {
    const key = normalize(other.translation);
    if (seen.has(key)) continue;
    seen.add(key);
    distractors.push(other.translation);
    if (distractors.length === 3) break;
  }
  return shuffle([card.translation, ...distractors]);
}

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export function Flashcards({ cards, accent, storageKey }: FlashcardsProps) {
  const historyKey = `${storageKey}:history`;
  const [started, setStarted] = useState(false);
  const [caughtUp, setCaughtUp] = useState(false);
  const [finished, setFinished] = useState(false);
  const [mode, setMode] = useState<Mode>("choice");
  const [autoAudio, setAutoAudio] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [typed, setTyped] = useState("");
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<Progress>({});
  const [history, setHistory] = useState<SessionRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const current = queue[index];

  useEffect(() => {
    const savedMode = readStorage<Mode>(MODE_KEY, "choice");
    const savedAudio = readStorage<boolean>(AUDIO_KEY, false);
    const savedHistory = readStorage<SessionRecord[]>(historyKey, []);
    queueMicrotask(() => {
      setMode(MODES.some((m) => m.id === savedMode) ? savedMode : "choice");
      setAutoAudio(savedAudio);
      setHistory(savedHistory);
      setLoaded(true);
    });
  }, [historyKey]);

  useEffect(() => {
    if (!autoAudio || !started || finished || caughtUp || !current) return;
    speak(current.card.front);
  }, [autoAudio, started, finished, caughtUp, current]);

  useEffect(() => {
    if (!started || finished || !current) return;
    if (mode === "type" && !answer) inputRef.current?.focus();
    if (answer) nextRef.current?.focus();
  }, [started, finished, current, mode, answer]);

  function chooseMode(next: Mode) {
    setMode(next);
    writeStorage(MODE_KEY, next);
  }

  function toggleAudio() {
    const next = !autoAudio;
    setAutoAudio(next);
    writeStorage(AUDIO_KEY, next);
    if (next && started && !finished && current) speak(current.card.front);
    if (!next && typeof window !== "undefined") window.speechSynthesis?.cancel();
  }

  function handleStart(forceAll = false) {
    const saved = readStorage<Progress>(storageKey, {});
    const due = dueCards(cards, saved);
    const pool = due.length > 0 ? due : forceAll ? cards : [];
    setProgress(saved);
    setFinished(false);
    setStarted(true);
    if (pool.length === 0) {
      setCaughtUp(true);
      return;
    }
    setQueue(shuffle(pool).map((card) => ({ card, options: buildOptions(card, cards) })));
    setIndex(0);
    setFlipped(false);
    setAnswer(null);
    setTyped("");
    setFirstTry({});
    setCaughtUp(false);
  }

  function saveSession(results: Record<string, boolean>) {
    const total = Object.keys(results).length;
    if (total === 0) return;
    const correct = Object.values(results).filter(Boolean).length;
    const record: SessionRecord = { date: new Date().toISOString(), mode, correct, total };
    const nextHistory = [record, ...history].slice(0, HISTORY_LIMIT);
    setHistory(nextHistory);
    writeStorage(historyKey, nextHistory);
  }

  function grade(remembered: boolean) {
    if (!current) return;
    const id = current.card.id;
    const existing = progress[id] ?? { box: 0, due: new Date(0).toISOString() };
    const newBox = remembered ? Math.min(existing.box + 1, BOX_INTERVAL_DAYS.length - 1) : 0;
    const due = new Date(Date.now() + BOX_INTERVAL_DAYS[newBox] * 86400000).toISOString();
    const nextProgress = { ...progress, [id]: { box: newBox, due } };
    setProgress(nextProgress);
    writeStorage(storageKey, nextProgress);
    if (!(id in firstTry)) setFirstTry((f) => ({ ...f, [id]: remembered }));
  }

  function advance(remembered: boolean) {
    if (!current) return;
    let nextQueue = queue;
    if (!remembered) {
      nextQueue = [...queue];
      const reinsertAt = Math.min(index + 4, nextQueue.length);
      nextQueue.splice(reinsertAt, 0, { card: current.card, options: shuffle(current.options) });
    }
    const nextIndex = index + 1;
    setFlipped(false);
    setAnswer(null);
    setTyped("");
    if (nextIndex >= nextQueue.length) {
      const results = current.card.id in firstTry ? firstTry : { ...firstTry, [current.card.id]: remembered };
      saveSession(results);
      setFinished(true);
      return;
    }
    setQueue(nextQueue);
    setIndex(nextIndex);
  }

  function handleFlipGrade(remembered: boolean) {
    grade(remembered);
    advance(remembered);
  }

  function handlePick(option: string) {
    if (!current || answer) return;
    const verdict: AnswerVerdict = option === current.card.translation ? "correct" : "wrong";
    setAnswer({ picked: option, verdict, previousBox: progress[current.card.id]?.box ?? 0 });
    grade(verdict === "correct");
  }

  function handleType(e: FormEvent) {
    e.preventDefault();
    if (!current || answer || !typed.trim()) return;
    const verdict = checkAnswer(typed, current.card.translation);
    setAnswer({ typed, verdict, previousBox: progress[current.card.id]?.box ?? 0 });
    grade(verdict !== "wrong");
  }

  function overrideAsCorrect() {
    if (!current || !answer) return;
    const id = current.card.id;
    const restoredBox = Math.min(answer.previousBox + 1, BOX_INTERVAL_DAYS.length - 1);
    const due = new Date(Date.now() + BOX_INTERVAL_DAYS[restoredBox] * 86400000).toISOString();
    const nextProgress = { ...progress, [id]: { box: restoredBox, due } };
    setProgress(nextProgress);
    writeStorage(storageKey, nextProgress);
    setFirstTry((f) => ({ ...f, [id]: true }));
    setAnswer({ ...answer, verdict: "correct" });
  }

  function handleExit() {
    window.speechSynthesis?.cancel();
    if (Object.keys(firstTry).length > 0) {
      saveSession(firstTry);
      setFinished(true);
      return;
    }
    setStarted(false);
    setCaughtUp(false);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!started || finished || caughtUp || !current) return;
      if (e.target instanceof HTMLInputElement) return;
      if (mode !== "choice" || answer) return;
      const n = Number(e.key);
      if (n >= 1 && n <= current.options.length) handlePick(current.options[n - 1]);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const pillStyle = {
    color: accent,
    borderColor: `${accent}40`,
    backgroundColor: `${accent}12`,
  };
  const pillClass =
    "cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  const audioButton = (
    <button
      type="button"
      onClick={toggleAudio}
      aria-pressed={autoAudio}
      title={autoAudio ? "Desligar áudio automático" : "Ligar áudio automático"}
      className="cursor-pointer inline-flex items-center gap-2 text-xs tracking-wide px-3 py-1.5 rounded-full border transition-colors"
      style={
        autoAudio
          ? pillStyle
          : { color: "#78716c", borderColor: "#292524", backgroundColor: "transparent" }
      }
    >
      {autoAudio ? <Volume2 size={14} /> : <VolumeX size={14} />}
      Áudio automático {autoAudio ? "ligado" : "desligado"}
    </button>
  );

  const titleFont = { fontFamily: "var(--font-lora), Georgia, serif" };

  if (!started) {
    const best = history.filter((h) => h.mode === mode).reduce<SessionRecord | null>((acc, h) => {
      if (!acc) return h;
      return h.correct / h.total > acc.correct / acc.total ? h : acc;
    }, null);
    return (
      <div className="py-10">
        <p className="text-2xl text-stone-100 mb-2 text-center" style={titleFont}>
          {cards.length} {cards.length === 1 ? "cartão" : "cartões"}
        </p>
        <p className="text-stone-500 mb-8 text-center text-sm">
          Repetição espaçada: você revê cada cartão pouco antes de esquecer. O que você erra volta
          mais cedo.
        </p>

        <p className="text-xs text-stone-600 tracking-widest uppercase mb-3">Como praticar</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {MODES.map((m) => {
            const active = loaded && mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => chooseMode(m.id)}
                aria-pressed={active}
                className="cursor-pointer text-left p-4 rounded-xl border transition-colors"
                style={
                  active
                    ? { borderColor: accent, backgroundColor: `${accent}12` }
                    : { borderColor: "#292524" }
                }
              >
                <span className="block text-sm font-medium" style={{ color: active ? accent : "#e7e5e4" }}>
                  {m.label}
                </span>
                <span className="block text-xs text-stone-500 mt-1">{m.hint}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {audioButton}
          <button onClick={() => handleStart()} className={pillClass} style={pillStyle}>
            Começar
          </button>
        </div>

        {history.length > 0 && (
          <div className="border-t border-stone-800 pt-6">
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-xs text-stone-600 tracking-widest uppercase">Seus resultados</p>
              {best && (
                <p className="text-xs text-stone-500">
                  Melhor em {MODE_LABEL[mode]}: {Math.round((best.correct / best.total) * 100)}%
                </p>
              )}
            </div>
            <ul className="space-y-2">
              {history.slice(0, 5).map((h) => (
                <li key={h.date} className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">
                    {formatDate(h.date)} · {MODE_LABEL[h.mode]}
                  </span>
                  <span className="text-stone-300 tabular-nums">
                    {h.correct}/{h.total} · {Math.round((h.correct / h.total) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (caughtUp) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-stone-100 mb-3" style={titleFont}>
          Tudo em dia! 🎉
        </p>
        <p className="text-stone-500 mb-10">
          Nenhum cartão está no prazo de revisão agora. Volte mais tarde, ou revise tudo de novo
          mesmo assim.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => handleStart(true)} className={pillClass} style={pillStyle}>
            Revisar tudo mesmo assim
          </button>
          <button
            onClick={() => setStarted(false)}
            className={pillClass}
            style={{ color: "#a8a29e", borderColor: "#292524" }}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const total = Object.keys(firstTry).length;
    const correct = Object.values(firstTry).filter(Boolean).length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const missed = queue
      .map((item) => item.card)
      .filter((card, i, arr) => firstTry[card.id] === false && arr.findIndex((c) => c.id === card.id) === i);
    return (
      <div className="py-12">
        <div className="text-center">
          <p className="text-sm text-stone-600 tracking-widest uppercase mb-4">
            Resultado · {MODE_LABEL[mode]}
          </p>
          <p className="text-5xl font-semibold text-white mb-3" style={titleFont}>
            {correct} / {total}
          </p>
          <p className="text-stone-400 mb-2">
            Você acertou {percentage}% de primeira.
          </p>
          <p className="text-xs text-stone-600 mb-10">Resultado salvo neste navegador.</p>
        </div>

        {missed.length > 0 && (
          <div className="mb-10">
            <p className="text-xs text-stone-600 tracking-widest uppercase mb-3">Pra revisar</p>
            <ul className="divide-y divide-stone-800 border border-stone-800 rounded-xl">
              {missed.map((card) => (
                <li key={card.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="flex items-center gap-2 text-stone-200">
                    {card.front}
                    <SpeakButton text={card.front} accent={accent} />
                  </span>
                  <span className="text-sm text-right" style={{ color: accent }}>
                    {card.translation}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => handleStart(true)} className={pillClass} style={pillStyle}>
            Praticar de novo
          </button>
          <button
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
            className={pillClass}
            style={{ color: "#a8a29e", borderColor: "#292524" }}
          >
            Trocar modo
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const card = current.card;
  const answered = answer !== null || (mode === "flip" && flipped);
  const correctCount = Object.values(firstTry).filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-xs text-stone-600 tracking-widest uppercase">
          Cartão {index + 1} de {queue.length}
        </p>
        <div className="flex items-center gap-4">
          <p className="text-xs text-stone-600 tracking-widest uppercase">Acertos: {correctCount}</p>
          <button
            type="button"
            onClick={handleExit}
            className="cursor-pointer inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-200 transition-colors tracking-wide"
          >
            <X size={14} />
            Sair
          </button>
        </div>
      </div>
      <div className="h-1 rounded-full bg-stone-800 mb-8 overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${(index / queue.length) * 100}%`, backgroundColor: accent }}
        />
      </div>

      <div className="border border-stone-800 rounded-2xl p-6 sm:p-10 min-h-60 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-3">
          <p className="text-3xl text-stone-100 break-words" style={titleFont}>
            {card.front}
          </p>
          <SpeakButton text={card.front} accent={accent} />
        </div>

        {answered && (
          <div className="w-full border-t border-stone-800 pt-6 mt-6 space-y-4">
            <p className="text-xl" style={{ color: accent, ...titleFont }}>
              {card.translation}
            </p>
            {card.note && <p className="text-sm text-stone-500 leading-relaxed">{card.note}</p>}
            {card.example && (
              <div className="pl-4 border-l-2 text-left" style={{ borderColor: `${accent}40` }}>
                <p className="italic text-stone-300 leading-relaxed flex items-baseline gap-2">
                  <span>“{card.example}”</span>
                  <SpeakButton text={card.example} accent={accent} />
                </p>
                {card.exampleTranslation && (
                  <p className="text-sm text-stone-500 mt-1">{card.exampleTranslation}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">{audioButton}</div>

      {mode === "choice" && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.options.map((option, i) => {
            const isCorrect = option === card.translation;
            const isPicked = answer?.picked === option;
            let style: CSSProperties = { borderColor: "#292524", color: "#e7e5e4" };
            if (answer && isCorrect) style = { borderColor: "#4ade80", color: "#4ade80", backgroundColor: "#4ade8012" };
            else if (answer && isPicked) style = { borderColor: "#f87171", color: "#f87171", backgroundColor: "#f8717112" };
            else if (answer) style = { borderColor: "#292524", color: "#57534e" };
            return (
              <button
                key={option}
                type="button"
                disabled={answer !== null}
                onClick={() => handlePick(option)}
                className="cursor-pointer disabled:cursor-default text-left px-4 py-3 rounded-xl border transition-colors hover:enabled:border-stone-600 flex items-start gap-3"
                style={style}
              >
                <span className="text-xs text-stone-600 mt-0.5 tabular-nums">{i + 1}</span>
                <span className="text-sm leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>
      )}

      {mode === "type" && (
        <form onSubmit={handleType} className="mt-6">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={answer !== null}
              placeholder="Tradução em português"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 min-w-0 bg-transparent border rounded-xl px-4 py-3 text-stone-100 placeholder:text-stone-600 outline-none transition-colors"
              style={{
                borderColor:
                  answer?.verdict === "wrong" ? "#f87171" : answer ? "#4ade80" : "#44403c",
              }}
            />
            {!answer && (
              <button type="submit" disabled={!typed.trim()} className={pillClass} style={pillStyle}>
                Responder
              </button>
            )}
          </div>
          {answer && (
            <div className="mt-3 text-sm flex flex-wrap items-center gap-x-4 gap-y-2">
              {answer.verdict === "correct" && <span className="text-green-400">Acertou!</span>}
              {answer.verdict === "close" && (
                <span className="text-green-400">Quase perfeito, conta como acerto. Confira a grafia acima.</span>
              )}
              {answer.verdict === "wrong" && (
                <>
                  <span className="text-red-400">Não foi dessa vez. A resposta está acima.</span>
                  <button
                    type="button"
                    onClick={overrideAsCorrect}
                    className="cursor-pointer text-xs text-stone-500 hover:text-stone-200 underline underline-offset-4"
                  >
                    Minha resposta também está certa
                  </button>
                </>
              )}
            </div>
          )}
        </form>
      )}

      <div className="mt-6 flex justify-center gap-4">
        {mode === "flip" && !flipped && (
          <button onClick={() => setFlipped(true)} className={pillClass} style={pillStyle}>
            Virar cartão
          </button>
        )}
        {mode === "flip" && flipped && (
          <>
            <button
              onClick={() => handleFlipGrade(false)}
              className={pillClass}
              style={{ color: "#f87171", borderColor: "#f8717140", backgroundColor: "#f8717112" }}
            >
              Não lembrei
            </button>
            <button
              onClick={() => handleFlipGrade(true)}
              className={pillClass}
              style={{ color: "#4ade80", borderColor: "#4ade8040", backgroundColor: "#4ade8012" }}
            >
              Lembrei
            </button>
          </>
        )}
        {mode !== "flip" && answer && (
          <button
            ref={nextRef}
            onClick={() => advance(answer.verdict !== "wrong")}
            className={pillClass}
            style={pillStyle}
          >
            Próximo →
          </button>
        )}
      </div>
    </div>
  );
}
