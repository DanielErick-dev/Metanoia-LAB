export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizData {
  slug: string;
  title: string;
  subtitle: string;
  categorySlug: string;
  accent: string;
  questions: QuizQuestion[];
}
