import Link from "next/link";
import { CategoryData } from "@/lib/types/category";
import { TopicData } from "@/lib/types/topic";
import { getCategoryBySlug, getCategoryChain, getCategoryPath } from "@/lib/categories";
import { getTopicPath } from "@/lib/topics";
import { Breadcrumb } from "./Breadcrumb";
import { TopicSections } from "./TopicSections";
import { ScrollToTopButton } from "./ScrollToTopButton";

interface GuidePageProps {
  category: CategoryData;
  chapters: TopicData[];
  activeChapter: TopicData;
  relatedTopics: TopicData[];
}

export function GuidePage({ category, chapters, activeChapter, relatedTopics }: GuidePageProps) {
  const parentCategory = category.parentSlug ? getCategoryBySlug(category.parentSlug) : undefined;
  const categoryChain = getCategoryChain(category.slug);
  const breadcrumbItems = [
    ...categoryChain.map((c) => ({ label: c.title, href: `/${getCategoryPath(c.slug)}` })),
    { label: activeChapter.title, href: `/${getTopicPath(activeChapter)}` },
  ];
  const backHref = parentCategory ? `/${getCategoryPath(parentCategory.slug)}` : "/";
  const backLabel = parentCategory?.title ?? "Início";

  return (
    <main className="min-h-screen bg-[#0f0e0d] text-stone-100">
      <header className="px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
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

      <div className="max-w-7xl mx-auto px-8 pb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-24">
        <div className="flex gap-12 items-start">
          <aside
            className="w-72 shrink-0 hidden lg:block sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide pb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <p
              className="text-xs font-medium tracking-widest uppercase mb-1"
              style={{ color: category.accent }}
            >
              {category.title}
            </p>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">{category.subtitle}</p>

            <nav className="space-y-1">
              {chapters.map((chapter) => {
                const active = chapter.slug === activeChapter.slug;
                return (
                  <Link
                    key={chapter.slug}
                    href={`/${getTopicPath(chapter)}`}
                    className="block rounded-lg px-3 py-2.5 border-l-2 transition-colors"
                    style={{
                      borderColor: active ? category.accent : "transparent",
                      backgroundColor: active ? `${category.accent}12` : "transparent",
                    }}
                  >
                    <span
                      className="text-sm leading-snug"
                      style={{ color: active ? "#f5f5f4" : "#78716c" }}
                    >
                      {chapter.title}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <article className="flex-1 min-w-0 max-w-170">
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border mb-5 lg:hidden"
              style={{
                color: category.accent,
                borderColor: `${category.accent}40`,
                backgroundColor: `${category.accent}12`,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {category.title}
            </span>

            <h1
              className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-3"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              {activeChapter.title}
            </h1>
            <p
              className="text-base text-stone-400 tracking-wide mb-10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {activeChapter.subtitle}
            </p>

            {activeChapter.quote && (
              <>
                <blockquote className="mb-14">
                  <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: activeChapter.accent }} />
                  <p
                    className="text-2xl text-stone-200 leading-relaxed font-normal italic"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                  >
                    “{activeChapter.quote.text}”
                  </p>
                  <cite
                    className="text-sm mt-5 block not-italic tracking-widest uppercase"
                    style={{ color: activeChapter.accent, fontFamily: "'DM Sans', sans-serif", opacity: 0.8 }}
                  >
                    {activeChapter.quote.source}
                  </cite>
                </blockquote>
                <div className="border-t border-stone-800 mb-14" />
              </>
            )}

            <p
              className="text-xl text-stone-300 leading-[1.85] font-normal mb-14"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              {activeChapter.intro}
            </p>

            <TopicSections sections={activeChapter.sections} accent={activeChapter.accent} />

            <div className="flex items-center justify-between pt-6 border-t border-stone-800/60 gap-4">
              {(() => {
                const index = chapters.findIndex((c) => c.slug === activeChapter.slug);
                const prev = index > 0 ? chapters[index - 1] : undefined;
                const next = index < chapters.length - 1 ? chapters[index + 1] : undefined;
                return (
                  <>
                    {prev ? (
                      <Link
                        href={`/${getTopicPath(prev)}`}
                        className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
                      >
                        ← {prev.title}
                      </Link>
                    ) : (
                      <span />
                    )}
                    {next && (
                      <Link
                        href={`/${getTopicPath(next)}`}
                        className="text-sm text-right ml-auto hover:opacity-80 transition-opacity"
                        style={{ color: activeChapter.accent }}
                      >
                        {next.title} →
                      </Link>
                    )}
                  </>
                );
              })()}
            </div>

            {relatedTopics.length > 0 && (
              <div className="mt-14 pt-10 border-t border-stone-800/60">
                <p className="text-xs text-stone-600 tracking-widest uppercase mb-5">Ver também</p>
                <div className="flex gap-3 flex-wrap">
                  {relatedTopics.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/${getTopicPath(related)}`}
                      className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-800 hover:border-stone-600 transition-all"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: related.accent }}
                      />
                      <span
                        className="text-sm text-stone-400 group-hover:text-stone-200 transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {related.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>

      <footer className="border-t border-stone-800/60 py-8 text-center text-stone-700 text-xs tracking-wide">
        <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Metanoia Lab —{" "}
          <span className="text-emerald-800">transformação pela verdade</span>
        </span>
      </footer>

      <ScrollToTopButton />
    </main>
  );
}
