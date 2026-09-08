import { QuizData } from "../types/quiz";
import { getCategoryPath } from "../categories";
import { someAnyNoQuiz } from "./some-any-no";

export const quizzes: QuizData[] = [someAnyNoQuiz];

export function getQuizPath(quiz: QuizData): string {
  return `${getCategoryPath(quiz.categorySlug)}/${quiz.slug}`;
}

export function getQuizByPath(path: string): QuizData | undefined {
  return quizzes.find((q) => getQuizPath(q) === path);
}
