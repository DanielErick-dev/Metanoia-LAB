import { topics, getTopicPath } from "./topics";
import { LineupEntry, LineupExample } from "./types/topic";

export const DICTIONARY_CATEGORY = "vocabulario";

export interface DictionarySense {
  meaning: string;
  notes: string[];
  informal?: LineupEntry["informal"];
  forms?: LineupEntry["forms"];
  examples: LineupExample[];
  source: {
    title: string;
    href: string;
    accent: string;
  };
}

export interface DictionaryEntry {
  id: string;
  term: string;
  letter: string;
  isPhrase: boolean;
  senses: DictionarySense[];
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function slugify(text: string): string {
  return normalize(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function example(en?: string, pt?: string): LineupExample[] {
  return en ? [{ en, pt: pt ?? "" }] : [];
}

function buildDictionary(): DictionaryEntry[] {
  const byTerm = new Map<string, DictionaryEntry>();

  function add(term: string, sense: DictionarySense) {
    const key = normalize(term);
    const existing = byTerm.get(key);
    if (existing) {
      existing.senses.push(sense);
      return;
    }
    const first = key.match(/[a-z]/)?.[0] ?? "#";
    byTerm.set(key, {
      id: slugify(term),
      term,
      letter: first.toUpperCase(),
      isPhrase: /\s/.test(term.trim()),
      senses: [sense],
    });
  }

  for (const topic of topics.filter((t) => t.categorySlug === DICTIONARY_CATEGORY)) {
    const source = { title: topic.title, href: `/${getTopicPath(topic)}`, accent: topic.accent };
    for (const section of topic.sections) {
      for (const entry of section.vocabList ?? []) {
        add(entry.term, {
          meaning: entry.translation,
          notes: entry.note ? [entry.note] : [],
          examples: example(entry.example, entry.exampleTranslation),
          source,
        });
      }
      for (const entry of section.lineup ?? []) {
        add(entry.word, {
          meaning: entry.meaning,
          notes: entry.details ?? [],
          informal: entry.informal,
          forms: entry.forms,
          examples: entry.examples ?? [],
          source,
        });
      }
      for (const entry of section.expressions ?? []) {
        add(entry.phrase, {
          meaning: entry.translation,
          notes: entry.explanation ? [entry.explanation] : [],
          examples: example(entry.example, entry.exampleTranslation),
          source,
        });
      }
    }
  }

  return [...byTerm.values()].sort((a, b) => normalize(a.term).localeCompare(normalize(b.term)));
}

export const dictionary = buildDictionary();

export function searchDictionary(entries: DictionaryEntry[], query: string): DictionaryEntry[] {
  const q = normalize(query);
  if (!q) return entries;
  const startsWith = entries.filter((e) => normalize(e.term).startsWith(q));
  const inTerm = entries.filter((e) => !startsWith.includes(e) && normalize(e.term).includes(q));
  const inMeaning = entries.filter(
    (e) =>
      !startsWith.includes(e) &&
      !inTerm.includes(e) &&
      e.senses.some((s) => normalize(s.meaning).includes(q))
  );
  return [...startsWith, ...inTerm, ...inMeaning];
}
