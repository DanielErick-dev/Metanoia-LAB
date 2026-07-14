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
  };
  intro: string;
  sections: TopicSection[];
  relatedSlugs: string[];
}