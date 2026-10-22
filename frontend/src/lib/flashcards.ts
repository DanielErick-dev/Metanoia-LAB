import { TopicData } from "./types/topic";

export interface Flashcard {
  id: string;
  front: string;
  translation: string;
  note?: string;
  example?: string;
  exampleTranslation?: string;
}

function slugifyId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getFlashcardsForTopic(topic: TopicData): Flashcard[] {
  const cards: Flashcard[] = [];
  for (const section of topic.sections) {
    for (const entry of section.vocabList ?? []) {
      cards.push({
        id: slugifyId(entry.term),
        front: entry.term,
        translation: entry.translation,
        example: entry.example,
        exampleTranslation: entry.exampleTranslation,
      });
    }
    for (const entry of section.lineup ?? []) {
      cards.push({
        id: slugifyId(entry.word),
        front: entry.word,
        translation: entry.meaning,
        example: entry.examples?.[0]?.en,
        exampleTranslation: entry.examples?.[0]?.pt,
      });
    }
    for (const entry of section.expressions ?? []) {
      cards.push({
        id: slugifyId(entry.phrase),
        front: entry.phrase,
        translation: entry.translation,
        note: entry.explanation,
        example: entry.example,
        exampleTranslation: entry.exampleTranslation,
      });
    }
  }
  return cards;
}
