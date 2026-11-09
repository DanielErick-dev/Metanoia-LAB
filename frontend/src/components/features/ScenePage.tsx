import Link from "next/link";
import { TopicData } from "@/lib/types/topic";
import { getCategoryBySlug, getCategoryChain, getCategoryPath } from "@/lib/categories";
import { getFlashcardsPath, getTopicPath } from "@/lib/topics";
import { getFlashcardsForTopic } from "@/lib/flashcards";
import { Breadcrumb } from "./Breadcrumb";
import { SceneExperience } from "./SceneExperience";

const SANS = { fontFamily: "var(--font-dm-sans), sans-serif" };
const SERIF = { fontFamily: "var(--font-lora), Georgia, serif" };
const BACKGROUNDS = { kitchen: "#14100c", church: "#100e18" };

export function ScenePage({
  topic,
  kind,
  relatedTopics,
}: {
  topic: TopicData;
  kind: keyof typeof BACKGROUNDS;
  relatedTopics: TopicData[];
}) {
  const category = getCategoryBySlug(topic.categorySlug);
  const breadcrumbItems = [
    ...getCategoryChain(topic.categorySlug).map((c) => ({ label: c.title, href: `/${getCategoryPath(c.slug)}` })),
    { label: topic.title, href: `/${getTopicPath(topic)}` },
  ];
  const flashcardsCount = getFlashcardsForTopic(topic).length;

  return (
    <main className="min-h-screen text-stone-100" style={{ backgroundColor: BACKGROUNDS[kind] }}>
      <header className="px-4 sm:px-8 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-emerald-400 text-xl">◈</span>
          <span className="font-medium tracking-widest text-xs uppercase text-stone-400 group-hover:text-white transition-colors" style={SANS}>
            Metanoia Lab
          </span>
        </Link>
        <Link
          href={`/${getCategoryPath(topic.categorySlug)}`}
          className="text-xs text-stone-500 hover:text-stone-300 transition-colors tracking-wide"
          style={SANS}
        >
          ← {category?.title ?? "Biblioteca"}
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white" style={SERIF}>
              {topic.title}
            </h1>
            <p className="text-stone-400 mt-2" style={SANS}>
              {topic.subtitle}
            </p>
          </div>
          {flashcardsCount > 0 && (
            <Link
              href={`/${getFlashcardsPath(topic)}`}
              className="text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full border transition-opacity hover:opacity-80"
              style={{ ...SANS, color: topic.accent, borderColor: `${topic.accent}60`, backgroundColor: `${topic.accent}12` }}
            >
              Flashcards · {flashcardsCount}
            </Link>
          )}
        </div>

        <SceneExperience kind={kind} sections={topic.sections} accent={topic.accent} />

        {relatedTopics.length > 0 && (
          <nav className="mt-14 pt-6 border-t border-stone-800 flex flex-wrap items-center gap-x-5 gap-y-2" style={SANS}>
            <span className="text-xs uppercase tracking-widest text-stone-500">Veja também</span>
            {relatedTopics.map((related) => (
              <Link key={related.slug} href={`/${getTopicPath(related)}`} className="text-sm text-stone-300 hover:text-white transition-colors">
                {related.title} →
              </Link>
            ))}
          </nav>
        )}
      </div>
    </main>
  );
}
