import { normalize } from "./text-match";

export type AnswerVerdict = "correct" | "close" | "wrong";

const ARTICLES = /^(o|a|os|as|um|uma|uns|umas|to|the)\s+/;

function clean(text: string): string {
  return normalize(text)
    .replace(/\([^)]*\)/g, " ")
    .replace(/[.!?¿¡"“”'’]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(ARTICLES, "");
}

export function acceptedAnswers(translation: string): string[] {
  const main = translation.split(/\bmas tambem\b|\bmas também\b/i)[0];
  const parts = main
    .split(/[,;/]|\s+ou\s+/)
    .map(clean)
    .filter((p) => p.length > 0);
  const whole = clean(main);
  return Array.from(new Set([whole, ...parts]));
}

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = temp;
    }
  }
  return row[b.length];
}

function tolerance(length: number): number {
  if (length >= 9) return 2;
  if (length >= 4) return 1;
  return 0;
}

export function checkAnswer(typed: string, translation: string): AnswerVerdict {
  const answer = clean(typed);
  if (!answer) return "wrong";
  const accepted = acceptedAnswers(translation);
  if (accepted.includes(answer)) return "correct";
  const close = accepted.some((option) => distance(answer, option) <= tolerance(option.length));
  return close ? "close" : "wrong";
}
