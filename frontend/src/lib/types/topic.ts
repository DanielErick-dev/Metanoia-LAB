export interface TopicExample {
  title?: string;
  body: string;
  code: string;
  language?: string;
  note?: string;
}

export interface TopicSection {
  heading: string;
  body: string;
  code?: string;
  language?: string;
  examples?: TopicExample[];
}

export interface Slide {
  heading?: string;
  body?: string;
  quote?: {
    text: string;
    source: string;
  };
  image?: string;
  /** URL de embed (ex: https://www.youtube.com/embed/ID). */
  video?: string;
}

export interface TopicData {
  slug: string;
  title: string;
  subtitle: string;
  categorySlug: string;
  accent: string;
  image?: string;
  /** CSS object-position (ex: "top", "center", "center 25%"). Padrão: "top". */
  imagePosition?: string;
  quote: {
    text: string;
    source: string;
    sourceUrl?: string;
  };
  intro: string;
  sections: TopicSection[];
  relatedSlugs: string[];
  slides?: Slide[];
}