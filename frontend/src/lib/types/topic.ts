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

export interface TopicSection {
  heading: string;
  body: string;
  code?: string;
  language?: string;
  examples?: TopicExample[];
  links?: TopicLink[];
  citation?: TopicCitation;
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
}
