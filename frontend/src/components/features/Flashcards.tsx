"use client";

import { CSSProperties, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Flame, Image as ImageIcon, Keyboard, Layers, ListChecks, Volume2, VolumeX, X } from "lucide-react";
import { Flashcard } from "@/lib/flashcards";
import { TopicData } from "@/lib/types/topic";
import { AnswerVerdict, checkAnswer } from "@/lib/answer-match";
import { normalize } from "@/lib/text-match";
import { SCENES, SceneConfig, sceneObjectFor } from "./scenes";
import { SpeakButton } from "./SpeakButton";
import { SceneZoom } from "./SceneZoom";
import { Fireworks } from "./Fireworks";
import styles from "./Flashcards.module.css";

interface FlashcardsProps {
  cards: Flashcard[];
  accent: string;
  storageKey: string;
  scene?: TopicData["scene"];
}

interface CardState {
  box: number;
  due: string;
}

type Progress = Record<string, CardState>;

type Mode = "choice" | "type" | "flip";

type Difficulty = "easy" | "hard";

interface Option {
  value: string;
  hint: string;
}

interface QueueItem {
  card: Flashcard;
  options: Option[];
}

interface SessionRecord {
  date: string;
  mode: Mode;
  difficulty?: Difficulty;
  correct: number;
  total: number;
}

interface Answer {
  picked?: string;
  typed?: string;
  skipped?: boolean;
  verdict: AnswerVerdict;
  previousBox: number;
}

const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 30];
const AUDIO_KEY = "metanoia:flashcards:audio";
const MODE_KEY = "metanoia:flashcards:mode";
const DIFFICULTY_KEY = "metanoia:flashcards:difficulty";
const HISTORY_LIMIT = 10;
const RIGHT = "#4ade80";
const WRONG = "#f87171";
const SANS = { fontFamily: "var(--font-dm-sans), sans-serif" };
const SERIF = { fontFamily: "var(--font-lora), Georgia, serif" };

const MODES: { id: Mode; label: string; hint: string; Icon: typeof ListChecks }[] = [
  { id: "choice", label: "Múltipla escolha", hint: "Escolha a resposta entre 4 opções", Icon: ListChecks },
  { id: "type", label: "Digitar", hint: "Escreva a resposta de memória", Icon: Keyboard },
  { id: "flip", label: "Virar cartão", hint: "Vire e diga se lembrou", Icon: Layers },
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

function sameImage(config: SceneConfig | undefined, a: Flashcard, b: Flashcard): boolean {
  if (!config) return false;
  if (config.actions.has(a.front) || config.actions.has(b.front)) return false;
  return sceneObjectFor(config, a.front) === sceneObjectFor(config, b.front);
}

function buildEasyOptions(card: Flashcard, all: Flashcard[]): Option[] {
  const seen = new Set([normalize(card.translation)]);
  const distractors: Option[] = [];
  for (const other of shuffle(all)) {
    const key = normalize(other.translation);
    if (seen.has(key)) continue;
    seen.add(key);
    distractors.push({ value: other.translation, hint: other.front });
    if (distractors.length === 3) break;
  }
  return shuffle([{ value: card.translation, hint: card.front }, ...distractors]);
}

function buildHardOptions(card: Flashcard, all: Flashcard[], config: SceneConfig | undefined): Option[] {
  const blockedTranslation = normalize(card.translation);
  const tiers: Flashcard[][] = [[], [], [], []];
  for (const other of shuffle(all)) {
    if (other.id === card.id) continue;
    if (normalize(other.translation) === blockedTranslation) continue;
    if (sameImage(config, card, other)) continue;
    const closeness = (Boolean(other.verb) === Boolean(card.verb) ? 2 : 0) + (other.group === card.group ? 1 : 0);
    tiers[3 - closeness].push(other);
  }
  const seen = new Set([normalize(card.front)]);
  const distractors: Option[] = [];
  for (const other of tiers.flat()) {
    const key = normalize(other.front);
    if (seen.has(key)) continue;
    seen.add(key);
    distractors.push({ value: other.front, hint: other.translation });
    if (distractors.length === 3) break;
  }
  return shuffle([{ value: card.front, hint: card.translation }, ...distractors]);
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

function sessionLabel(mode: Mode, difficulty: Difficulty | undefined): string {
  return difficulty === "hard" ? `${MODE_LABEL[mode]} · Difícil` : MODE_LABEL[mode];
}

export function Flashcards({ cards, accent, storageKey, scene }: FlashcardsProps) {
  const historyKey = `${storageKey}:history`;
  const sceneConfig = scene ? SCENES[scene] : undefined;
  const [started, setStarted] = useState(false);
  const [caughtUp, setCaughtUp] = useState(false);
  const [finished, setFinished] = useState(false);
  const [mode, setMode] = useState<Mode>("choice");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
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
  const [streak, setStreak] = useState(0);
  const [celebrations, setCelebrations] = useState(0);
  const [noImage, setNoImage] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fireworkColors = useMemo(() => [accent, "#fde68a", RIGHT, "#f5f5f4"], [accent]);

  const current = queue[index];
  const currentId = current?.card.id;
  const hard = difficulty === "hard";
  const revealed = answer !== null || (mode === "flip" && flipped);

  const markNoImage = useCallback(() => {
    if (!currentId) return;
    setNoImage((value) => ({ ...value, [currentId]: true }));
  }, [currentId]);

  useEffect(() => {
    const savedMode = readStorage<Mode>(MODE_KEY, "choice");
    const savedDifficulty = readStorage<Difficulty>(DIFFICULTY_KEY, "easy");
    const savedAudio = readStorage<boolean>(AUDIO_KEY, false);
    const savedHistory = readStorage<SessionRecord[]>(historyKey, []);
    queueMicrotask(() => {
      setMode(MODES.some((m) => m.id === savedMode) ? savedMode : "choice");
      setDifficulty(savedDifficulty === "hard" ? "hard" : "easy");
      setAutoAudio(savedAudio);
      setHistory(savedHistory);
      setLoaded(true);
    });
  }, [historyKey]);

  useEffect(() => {
    if (!autoAudio || !started || finished || caughtUp || !current) return;
    if (hard !== revealed) return;
    speak(current.card.front);
  }, [autoAudio, started, finished, caughtUp, current, hard, revealed]);

  useEffect(() => {
    if (!started || finished || !current) return;
    if (mode === "type" && !answer) inputRef.current?.focus();
    if (answer) nextRef.current?.focus();
  }, [started, finished, current, mode, answer]);

  function chooseMode(next: Mode) {
    setMode(next);
    writeStorage(MODE_KEY, next);
  }

  function chooseDifficulty(next: Difficulty) {
    setDifficulty(next);
    writeStorage(DIFFICULTY_KEY, next);
  }

  function toggleAudio() {
    const next = !autoAudio;
    setAutoAudio(next);
    writeStorage(AUDIO_KEY, next);
    if (next && started && !finished && current && hard === revealed) speak(current.card.front);
    if (!next && typeof window !== "undefined") window.speechSynthesis?.cancel();
  }

  function expectedOf(card: Flashcard): string {
    return hard ? card.front : card.translation;
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
    setQueue(
      shuffle(pool).map((card) => ({
        card,
        options: hard ? buildHardOptions(card, cards, sceneConfig) : buildEasyOptions(card, cards),
      }))
    );
    setIndex(0);
    setFlipped(false);
    setAnswer(null);
    setTyped("");
    setFirstTry({});
    setStreak(0);
    setCaughtUp(false);
  }

  function saveSession(results: Record<string, boolean>) {
    const total = Object.keys(results).length;
    if (total === 0) return;
    const correct = Object.values(results).filter(Boolean).length;
    const record: SessionRecord = { date: new Date().toISOString(), mode, difficulty, correct, total };
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
    if (remembered) {
      setStreak((s) => s + 1);
      setCelebrations((c) => c + 1);
    } else {
      setStreak(0);
    }
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
    const verdict: AnswerVerdict = option === expectedOf(current.card) ? "correct" : "wrong";
    setAnswer({ picked: option, verdict, previousBox: progress[current.card.id]?.box ?? 0 });
    grade(verdict === "correct");
  }

  function handleSkip() {
    if (!current || answer) return;
    setAnswer({ skipped: true, verdict: "wrong", previousBox: progress[current.card.id]?.box ?? 0 });
    grade(false);
  }

  function handleType(e: FormEvent) {
    e.preventDefault();
    if (!current || answer || !typed.trim()) return;
    const card = current.card;
    const accepted = hard
      ? [card.front, ...cards.filter((other) => other.id !== card.id && sameImage(sceneConfig, card, other)).map((other) => other.front)]
      : [card.translation];
    const verdicts = accepted.map((expected) => checkAnswer(typed, expected));
    const verdict: AnswerVerdict = verdicts.includes("correct") ? "correct" : verdicts.includes("close") ? "close" : "wrong";
    setAnswer({ typed, verdict, previousBox: progress[card.id]?.box ?? 0 });
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
      if (e.key === "0") {
        handleSkip();
        return;
      }
      const n = Number(e.key);
      if (n >= 1 && n <= current.options.length) handlePick(current.options[n - 1].value);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const pillStyle = {
    color: accent,
    borderColor: `${accent}55`,
    backgroundColor: `${accent}14`,
  };
  const pillClass =
    "cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors hover:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed";
  const solidStyle = { color: "#17110c", backgroundColor: accent, borderColor: accent };
  const ghostStyle = { color: "#a8a29e", borderColor: "#3a3430" };
  const stageStyle: CSSProperties = {
    borderColor: "#2a2420",
    background: `radial-gradient(120% 70% at 50% 0%, ${accent}16, transparent 60%), linear-gradient(180deg, #17130f, #110f0d)`,
  };

  const audioButton = (
    <button
      type="button"
      onClick={toggleAudio}
      aria-pressed={autoAudio}
      title={autoAudio ? "Desligar áudio automático" : "Ligar áudio automático"}
      className="cursor-pointer inline-flex items-center gap-2 text-xs tracking-wide px-3 py-1.5 rounded-full border transition-colors"
      style={autoAudio ? pillStyle : { color: "#78716c", borderColor: "#2e2925", backgroundColor: "transparent" }}
    >
      {autoAudio ? <Volume2 size={14} /> : <VolumeX size={14} />}
      Áudio automático {autoAudio ? "ligado" : "desligado"}
    </button>
  );

  if (!started) {
    const best = history
      .filter((h) => h.mode === mode && (h.difficulty ?? "easy") === difficulty)
      .reduce<SessionRecord | null>((acc, h) => {
        if (!acc) return h;
        return h.correct / h.total > acc.correct / acc.total ? h : acc;
      }, null);
    const difficulties: { id: Difficulty; label: string; hint: string }[] = [
      { id: "easy", label: "Fácil", hint: "Palavra em inglês, opções em português" },
      {
        id: "hard",
        label: "Difícil",
        hint: sceneConfig
          ? "Só a imagem da cena; opções em inglês parecidas entre si"
          : "Só a tradução; opções em inglês parecidas entre si",
      },
    ];
    return (
      <div className="rounded-3xl border p-5 sm:p-8" style={{ ...stageStyle, ...SANS }}>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-4xl font-semibold text-white" style={SERIF}>
              {cards.length}
              <span className="text-lg text-stone-400 font-normal ml-2">{cards.length === 1 ? "cartão" : "cartões"}</span>
            </p>
            <p className="text-stone-500 text-sm mt-2 max-w-md">
              Repetição espaçada: você revê cada cartão pouco antes de esquecer. O que você erra volta mais cedo.
            </p>
          </div>
          {audioButton}
        </div>

        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: accent }}>
          Como praticar
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {MODES.map((m) => {
            const active = loaded && mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => chooseMode(m.id)}
                aria-pressed={active}
                className={`${styles.option} cursor-pointer text-left p-4 rounded-2xl border flex sm:flex-col gap-3`}
                style={
                  active
                    ? { borderColor: accent, backgroundColor: `${accent}14` }
                    : { borderColor: "#2e2925", backgroundColor: "#1a161380" }
                }
              >
                <span
                  className="shrink-0 w-9 h-9 rounded-xl grid place-items-center"
                  style={{ color: active ? "#17110c" : accent, backgroundColor: active ? accent : `${accent}18` }}
                >
                  <m.Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-medium" style={{ color: active ? accent : "#e7e5e4" }}>
                    {m.label}
                  </span>
                  <span className="block text-xs text-stone-500 mt-1">{m.hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: accent }}>
          Dificuldade
        </p>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl border border-[#2e2925] bg-[#120f0d] mb-8" role="radiogroup" aria-label="Dificuldade">
          {difficulties.map((d) => {
            const active = loaded && difficulty === d.id;
            return (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => chooseDifficulty(d.id)}
                className="cursor-pointer text-left px-4 py-3 rounded-xl transition-colors"
                style={active ? { backgroundColor: `${accent}1f`, boxShadow: `inset 0 0 0 1px ${accent}70` } : undefined}
              >
                <span className="flex items-center gap-2 text-sm font-medium" style={{ color: active ? accent : "#e7e5e4" }}>
                  {d.id === "hard" && sceneConfig && <ImageIcon size={14} />}
                  {d.label}
                </span>
                <span className="block text-xs text-stone-500 mt-1 leading-relaxed">{d.hint}</span>
              </button>
            );
          })}
        </div>

        <button onClick={() => handleStart()} className={`${pillClass} w-full sm:w-auto`} style={solidStyle}>
          Começar
        </button>

        {history.length > 0 && (
          <div className="border-t border-[#2a2420] mt-8 pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <p className="text-xs text-stone-500 tracking-widest uppercase">Seus resultados</p>
              {best && (
                <p className="text-xs text-stone-500">
                  Melhor em {sessionLabel(mode, difficulty)}:{" "}
                  <span style={{ color: accent }}>{Math.round((best.correct / best.total) * 100)}%</span>
                </p>
              )}
            </div>
            <ul className="space-y-2">
              {history.slice(0, 5).map((h) => {
                const pct = Math.round((h.correct / h.total) * 100);
                return (
                  <li key={h.date} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 text-sm">
                    <span className="text-stone-500 truncate">
                      {formatDate(h.date)} · {sessionLabel(h.mode, h.difficulty)}
                    </span>
                    <span className="text-stone-300 tabular-nums">
                      {h.correct}/{h.total} · {pct}%
                    </span>
                    <span className="col-span-2 h-1 rounded-full bg-[#221d19] overflow-hidden">
                      <span className="block h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: `${accent}90` }} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (caughtUp) {
    return (
      <div className="text-center rounded-3xl border px-5 py-14" style={{ ...stageStyle, ...SANS }}>
        <p className="text-2xl text-stone-100 mb-3" style={SERIF}>
          Tudo em dia! 🎉
        </p>
        <p className="text-stone-500 mb-10 max-w-md mx-auto">
          Nenhum cartão está no prazo de revisão agora. Volte mais tarde, ou revise tudo de novo mesmo assim.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => handleStart(true)} className={pillClass} style={solidStyle}>
            Revisar tudo mesmo assim
          </button>
          <button onClick={() => setStarted(false)} className={pillClass} style={ghostStyle}>
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
      <div className="rounded-3xl border p-5 sm:p-8" style={{ ...stageStyle, ...SANS }}>
        <div className="text-center">
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: accent }}>
            Resultado · {sessionLabel(mode, difficulty)}
          </p>
          <div
            className={`${styles.pop} mx-auto mb-5 w-36 h-36 rounded-full grid place-items-center`}
            style={{ background: `conic-gradient(${accent} ${percentage * 3.6}deg, #2a2420 0deg)` }}
          >
            <div className="w-[7.75rem] h-[7.75rem] rounded-full bg-[#14110e] grid place-items-center">
              <span className="text-4xl font-semibold text-white" style={SERIF}>
                {percentage}%
              </span>
            </div>
          </div>
          <p className="text-stone-300 mb-1">
            {correct} de {total} de primeira
          </p>
          <p className="text-xs text-stone-600 mb-10">Resultado salvo neste navegador.</p>
        </div>

        {missed.length > 0 && (
          <div className="mb-10">
            <p className="text-xs text-stone-500 tracking-widest uppercase mb-3">Pra revisar</p>
            <ul className="divide-y divide-[#2a2420] border border-[#2a2420] rounded-2xl bg-[#14110e80]">
              {missed.map((card) => (
                <li key={card.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="flex items-center gap-2 text-stone-200" style={SERIF}>
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
          <button onClick={() => handleStart(true)} className={pillClass} style={solidStyle}>
            Praticar de novo
          </button>
          <button
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
            className={pillClass}
            style={ghostStyle}
          >
            Trocar modo
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const card = current.card;
  const correctCount = Object.values(firstTry).filter(Boolean).length;
  const showImage = hard && sceneConfig && scene && !noImage[card.id];
  const result = answer ? (answer.verdict === "wrong" ? "wrong" : "right") : undefined;
  const expected = expectedOf(card);

  return (
    <div style={SANS}>
      <Fireworks trigger={celebrations} anchor={stageRef} colors={fireworkColors} />
      <div ref={stageRef} className="relative z-10 rounded-3xl border p-4 sm:p-7" style={stageStyle}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-[#221d19] text-stone-400 tabular-nums">
              {index + 1} / {queue.length}
            </span>
            <span className="px-2.5 py-1 rounded-full tabular-nums inline-flex items-center gap-1" style={{ color: RIGHT, backgroundColor: `${RIGHT}14` }}>
              <Check size={12} /> {correctCount}
            </span>
            {streak >= 2 && (
              <span
                key={streak}
                className={`${styles.pop} px-2.5 py-1 rounded-full tabular-nums inline-flex items-center gap-1`}
                style={{ color: accent, backgroundColor: `${accent}18` }}
                title="Acertos seguidos"
              >
                <Flame size={12} /> {streak}
              </span>
            )}
            {hard && <span className="px-2.5 py-1 rounded-full bg-[#221d19] text-stone-400">Difícil</span>}
          </div>
          <button
            type="button"
            onClick={handleExit}
            className="cursor-pointer inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-200 transition-colors tracking-wide"
          >
            <X size={14} />
            Sair
          </button>
        </div>
        <div className="h-1.5 rounded-full bg-[#221d19] mb-6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(index / queue.length) * 100}%`,
              background: `linear-gradient(90deg, ${accent}90, ${accent})`,
              boxShadow: `0 0 12px ${accent}80`,
            }}
          />
        </div>

        <div
          key={`${index}-${card.id}`}
          data-result={result}
          className={`${styles.card} rounded-2xl border p-4 sm:p-8 min-h-56 flex flex-col items-center justify-center text-center`}
          style={{
            borderColor: result === "right" ? `${RIGHT}70` : result === "wrong" ? `${WRONG}60` : "#2e2925",
            background: "linear-gradient(180deg, #1c1814, #161310)",
            boxShadow: "inset 0 1px 0 #ffffff08",
          }}
        >
          {showImage ? (
            <div className="w-full max-w-xl">
              <SceneZoom kind={scene} term={card.front} onMissing={markNoImage} />
              {!revealed && <p className="mt-4 text-sm text-stone-400">Que palavra é essa em inglês?</p>}
            </div>
          ) : hard ? (
            <div className={styles.rise}>
              <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">Em inglês</p>
              <p className="text-2xl sm:text-3xl text-stone-100 break-words" style={SERIF}>
                {card.translation}
              </p>
            </div>
          ) : (
            <div className={`${styles.rise} flex items-center gap-3`}>
              <p className="text-3xl sm:text-4xl text-stone-50 break-words" style={SERIF}>
                {card.front}
              </p>
              <SpeakButton text={card.front} accent={accent} />
            </div>
          )}

          {revealed && (
            <div className={`${styles.rise} w-full border-t border-[#2e2925] pt-5 mt-5 space-y-4`}>
              {hard ? (
                <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
                  <span className="text-3xl text-stone-50" style={SERIF}>
                    {card.front}
                  </span>
                  <SpeakButton text={card.front} accent={accent} />
                  <span className="text-lg" style={{ color: accent, ...SERIF }}>
                    {card.translation}
                  </span>
                </div>
              ) : (
                <p className="text-xl" style={{ color: accent, ...SERIF }}>
                  {card.translation}
                </p>
              )}
              {card.note && <p className="text-sm text-stone-500 leading-relaxed">{card.note}</p>}
              {card.example && (
                <div className="pl-4 border-l-2 text-left" style={{ borderColor: `${accent}50` }}>
                  <p className="italic text-stone-300 leading-relaxed flex items-baseline gap-2">
                    <span>“{card.example}”</span>
                    <SpeakButton text={card.example} accent={accent} />
                  </p>
                  {card.exampleTranslation && <p className="text-sm text-stone-500 mt-1">{card.exampleTranslation}</p>}
                </div>
              )}
            </div>
          )}
        </div>

        {answer && mode !== "flip" && (
          <div
            className={`${styles.rise} mt-4 rounded-xl px-4 py-3 text-sm flex flex-wrap items-center gap-x-4 gap-y-2`}
            style={
              answer.verdict === "wrong"
                ? { color: WRONG, backgroundColor: `${WRONG}10` }
                : { color: RIGHT, backgroundColor: `${RIGHT}10` }
            }
          >
            {answer.verdict === "correct" && (
              <span className="inline-flex items-center gap-2">
                <Check size={16} /> Acertou!
              </span>
            )}
            {answer.verdict === "close" && <span>Quase perfeito, conta como acerto. Confira a grafia acima.</span>}
            {answer.verdict === "wrong" && answer.skipped && (
              <span className="text-stone-300">Sem problema: era «{expected}». Esse volta daqui a pouco.</span>
            )}
            {answer.verdict === "wrong" && !answer.skipped && <span>Não foi dessa vez: era «{expected}».</span>}
            {answer.verdict === "wrong" && !answer.skipped && mode === "type" && (
              <button
                type="button"
                onClick={overrideAsCorrect}
                className="cursor-pointer text-xs text-stone-400 hover:text-stone-100 underline underline-offset-4"
              >
                Minha resposta também está certa
              </button>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-end">{audioButton}</div>

        {mode === "choice" && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((option, i) => {
              const isCorrect = option.value === expected;
              const isPicked = answer?.picked === option.value;
              let style: CSSProperties = { borderColor: "#2e2925", color: "#e7e5e4", backgroundColor: "#1a161399" };
              if (answer && isCorrect) style = { borderColor: RIGHT, color: RIGHT, backgroundColor: `${RIGHT}12` };
              else if (answer && isPicked) style = { borderColor: WRONG, color: WRONG, backgroundColor: `${WRONG}12` };
              else if (answer) style = { borderColor: "#26211d", color: "#6b635c", backgroundColor: "transparent" };
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={answer !== null}
                  onClick={() => handlePick(option.value)}
                  className={`${styles.option} cursor-pointer disabled:cursor-default text-left px-4 py-3 rounded-xl border hover:enabled:border-stone-500 flex items-center gap-3`}
                  style={style}
                >
                  <span
                    className="shrink-0 w-6 h-6 rounded-md border grid place-items-center text-[11px] tabular-nums"
                    style={{ borderColor: "currentColor", opacity: 0.55 }}
                  >
                    {answer && isCorrect ? <Check size={13} /> : answer && isPicked ? <X size={13} /> : i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm leading-relaxed" style={hard ? SERIF : undefined}>
                      {option.value}
                    </span>
                    {answer && <span className="block text-xs text-stone-500 mt-0.5">{option.hint}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {mode === "type" && (
          <form onSubmit={handleType} className="mt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                disabled={answer !== null}
                placeholder={hard ? "Palavra em inglês" : "Tradução em português"}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="flex-1 min-w-0 bg-[#120f0d] border rounded-xl px-4 py-3 text-stone-100 placeholder:text-stone-600 outline-none transition-colors focus:border-stone-500"
                style={{ borderColor: answer?.verdict === "wrong" ? WRONG : answer ? RIGHT : "#3a3430" }}
              />
              {!answer && (
                <button type="submit" disabled={!typed.trim()} className={pillClass} style={solidStyle}>
                  Responder
                </button>
              )}
            </div>
          </form>
        )}

        {mode !== "flip" && !answer && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleSkip}
              className="cursor-pointer text-sm text-stone-500 hover:text-stone-200 transition-colors px-4 py-2 rounded-full border border-transparent hover:border-[#3a3430]"
            >
              Não sei
              {mode === "choice" && <span className="hidden sm:inline text-xs text-stone-600 ml-2">(tecla 0)</span>}
            </button>
          </div>
        )}

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {mode === "flip" && !flipped && (
            <button onClick={() => setFlipped(true)} className={pillClass} style={solidStyle}>
              Virar cartão
            </button>
          )}
          {mode === "flip" && flipped && (
            <>
              <button
                onClick={() => handleFlipGrade(false)}
                className={pillClass}
                style={{ color: WRONG, borderColor: `${WRONG}40`, backgroundColor: `${WRONG}12` }}
              >
                Não lembrei
              </button>
              <button
                onClick={() => handleFlipGrade(true)}
                className={pillClass}
                style={{ color: RIGHT, borderColor: `${RIGHT}40`, backgroundColor: `${RIGHT}12` }}
              >
                Lembrei
              </button>
            </>
          )}
          {mode !== "flip" && answer && (
            <button ref={nextRef} onClick={() => advance(answer.verdict !== "wrong")} className={pillClass} style={solidStyle}>
              Próximo →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
