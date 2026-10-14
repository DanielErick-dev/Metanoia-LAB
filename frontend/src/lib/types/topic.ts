export interface TopicExample {
  title?: string;
  body: string;
  code: string;
  language?: string;
  note?: string;
}

export interface TopicLink {
  text: string;
  url: string;
}

export interface TopicCitation {
  lines: string[];
  source?: string;
}

export interface VocabEntry {
  term: string;
  translation: string;
  note?: string;
  example?: string;
  exampleTranslation?: string;
}

export interface ExpressionEntry {
  phrase: string;
  translation: string;
  explanation?: string;
  example?: string;
  exampleTranslation?: string;
}

export interface LineupExample {
  en: string;
  pt: string;
}

export interface LineupEntry {
  word: string;
  meaning: string;
  details?: string[];
  informal?: {
    word: string;
    note: string;
  };
  forms?: {
    label: string;
    pairs: [string, string][];
  };
  examples?: LineupExample[];
}

export interface ConfrontationSuspect {
  word: string;
  context: string;
  example: LineupExample;
}

export interface ConfrontationEntry {
  title: string;
  suspects: ConfrontationSuspect[];
  hook: string;
}

export interface InterrogationEntry {
  sentence: string;
  answer: string;
  accept?: string[];
  translation: string;
}

export interface TopicTable {
  headers: string[];
  rows: string[][];
  stackOnMobile?: boolean;
  monoRows?: number[];
}

export interface TopicSection {
  heading: string;
  body: string;
  code?: string;
  language?: string;
  examples?: TopicExample[];
  links?: TopicLink[];
  citation?: TopicCitation;
  vocabList?: VocabEntry[];
  expressions?: ExpressionEntry[];
  table?: TopicTable;
  lineup?: LineupEntry[];
  confrontation?: ConfrontationEntry[];
  interrogation?: InterrogationEntry[];
}

export interface Slide {
  heading?: string;
  body?: string;
  quote?: {
    text: string;
    source: string;
  };
  image?: string;
  video?: string;
}

export interface TopicData {
  slug: string;
  title: string;
  subtitle: string;
  categorySlug: string;
  accent: string;
  image?: string;
  imagePosition?: string;
  cardImagePosition?: string;
  quote?: {
    text: string;
    source: string;
    sourceUrl?: string;
  };
  intro: string;
  sections: TopicSection[];
  relatedSlugs: string[];
  slides?: Slide[];
  status?: "em-breve" | "em-construcao";
  quizUrl?: string;
}
