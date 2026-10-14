import Link from "next/link";
import { TopicData } from "@/lib/types/topic";
import { getCategoryBySlug, getCategoryChain, getCategoryPath } from "@/lib/categories";
import { getFlashcardsForTopic, Flashcard } from "@/lib/flashcards";
import { getFlashcardsPath, getTopicPath } from "@/lib/topics";
import { Breadcrumb } from "./Breadcrumb";
import { Flashcards } from "./Flashcards";

interface FlashcardsPageProps {
  topic: TopicData;
}

export function FlashcardsPage({ topic }: FlashcardsPageProps) {
  const category = getCategoryBySlug(topic.categorySlug);
  const categoryChain = getCategoryChain(topic.categorySlug);
  const breadcrumbItems = [
    ...categoryChain.map((c) => ({ label: c.title, href: `/${getCategoryPath(c.slug)}` })),
    { label: topic.title, href: `/${getTopicPath(topic)}` },
    { label: "Flashcards", href: `/${getFlashcardsPath(topic)}` },
  ];
  const backHref = `/${getTopicPath(topic)}`;
  const cards: Flashcard[] = getFlashcardsForTopic(topic);
  const storageKey = `metanoia:flashcards:${topic.categorySlug}:${topic.slug}`;

  return (
    <main className="min-h-screen bg-[#0f0e0d] text-stone-100">
      <header className="px-8 py-5 flex items-center justify-between max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-emerald-400 text-xl">◈</span>
          <span
            className="font-medium tracking-widest text-xs uppercase text-stone-400 group-hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Metanoia Lab
          </span>
        </Link>
        <Link
          href={backHref}
          className="text-xs text-stone-600 hover:text-stone-300 transition-colors flex items-center gap-2 tracking-wide"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          ← {topic.title}
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-8 pb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="max-w-3xl mx-auto px-8 pb-24">
        <span
          className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border mb-5"
          style={{
            color: topic.accent,
            borderColor: `${topic.accent}40`,
            backgroundColor: `${topic.accent}12`,
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          {category?.title}
        </span>
        <h1
          className="text-3xl sm:text-4xl font-semibold text-white leading-tight mb-3 break-words"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          Flashcards — {topic.title}
        </h1>
        <p
          className="text-base text-stone-400 tracking-wide mb-12"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          {topic.subtitle}
        </p>

        <Flashcards cards={cards} accent={topic.accent} storageKey={storageKey} />
      </div>

      <footer className="border-t border-stone-800/60 py-8 text-center text-stone-700 text-xs tracking-wide">
        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Metanoia Lab —{" "}
          <span className="text-emerald-800">transformação pela verdade</span>
        </span>
      </footer>
    </main>
  );
}
