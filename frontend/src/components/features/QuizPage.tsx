import Link from "next/link";
import { QuizData } from "@/lib/types/quiz";
import { getCategoryBySlug, getCategoryChain, getCategoryPath } from "@/lib/categories";
import { getQuizPath } from "@/lib/quizzes";
import { Breadcrumb } from "./Breadcrumb";
import { Quiz } from "./Quiz";

interface QuizPageProps {
  quiz: QuizData;
}

export function QuizPage({ quiz }: QuizPageProps) {
  const category = getCategoryBySlug(quiz.categorySlug);
  const categoryChain = getCategoryChain(quiz.categorySlug);
  const breadcrumbItems = [
    ...categoryChain.map((c) => ({ label: c.title, href: `/${getCategoryPath(c.slug)}` })),
    { label: quiz.title, href: `/${getQuizPath(quiz)}` },
  ];
  const backHref = `/${getCategoryPath(quiz.categorySlug)}`;
  const backLabel = category?.title ?? "Biblioteca";

  return (
    <main className="min-h-screen bg-[#0f0e0d] text-stone-100">
      <header className="px-8 py-5 flex items-center justify-between max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-emerald-400 text-xl">◈</span>
          <span
            className="font-medium tracking-widest text-xs uppercase text-stone-400 group-hover:text-white transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Metanoia Lab
          </span>
        </Link>
        <Link
          href={backHref}
          className="text-xs text-stone-600 hover:text-stone-300 transition-colors flex items-center gap-2 tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          ← {backLabel}
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-8 pb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="max-w-3xl mx-auto px-8 pb-24">
        <span
          className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border mb-5"
          style={{
            color: quiz.accent,
            borderColor: `${quiz.accent}40`,
            backgroundColor: `${quiz.accent}12`,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {category?.title}
        </span>
        <h1
          className="text-3xl sm:text-4xl font-semibold text-white leading-tight mb-3 break-words"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {quiz.title}
        </h1>
        <p
          className="text-base text-stone-400 tracking-wide mb-12"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {quiz.subtitle}
        </p>

        <Quiz quiz={quiz} />
      </div>

      <footer className="border-t border-stone-800/60 py-8 text-center text-stone-700 text-xs tracking-wide">
        <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Metanoia Lab —{" "}
          <span className="text-emerald-800">transformação pela verdade</span>
        </span>
      </footer>
    </main>
  );
}
