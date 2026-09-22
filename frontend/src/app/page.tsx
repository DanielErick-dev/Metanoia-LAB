"use client";

import { useState, useMemo } from "react";
import { CategoryCard } from "@/components/features/CategoryCard";
import { TopicCard } from "@/components/features/TopicCard";
import { categories, getChildCategories } from "@/lib/categories";
import { topics } from "@/lib/topics";

export default function Home() {
  const [search, setSearch] = useState("");
  const rootCategories = useMemo(() => getChildCategories(undefined), []);
  const query = search.trim().toLowerCase();
  const isSearching = query.length > 0;

  const matchedCategories = useMemo(
    () =>
      isSearching
        ? categories.filter(
            (c) =>
              c.title.toLowerCase().includes(query) ||
              c.subtitle.toLowerCase().includes(query)
          )
        : rootCategories,
    [isSearching, query, rootCategories]
  );
  const matchedTopics = useMemo(
    () =>
      isSearching
        ? topics.filter(
            (t) =>
              t.title.toLowerCase().includes(query) ||
              t.subtitle.toLowerCase().includes(query)
          )
        : [],
    [isSearching, query]
  );

  const isEmpty = matchedCategories.length === 0 && matchedTopics.length === 0;
  const resultCount = matchedCategories.length + matchedTopics.length;
  const publishedCount = useMemo(() => topics.filter((t) => t.status !== "em-breve").length, []);
  const activeAreas = useMemo(
    () => rootCategories.filter((c) => c.status !== "em-breve").length,
    [rootCategories]
  );

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 text-xl">◈</span>
          <span className="font-semibold tracking-widest text-sm uppercase text-stone-300">
            Metanoia Lab
          </span>
        </div>
        <nav className="flex gap-6 text-sm text-stone-500">
          <a href="#" className="hover:text-stone-200 transition-colors">
            Sobre
          </a>
        </nav>
      </header>

      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 90% at 12% 0%, rgba(52,211,153,0.16), transparent 70%), radial-gradient(ellipse 45% 70% at 92% 10%, rgba(129,140,248,0.11), transparent 70%)",
          }}
        />
        <section className="relative max-w-7xl mx-auto px-8 pt-14 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-4xl">
              <p className="text-emerald-400 text-xs tracking-widest uppercase font-semibold mb-5">
                Laboratório de conhecimento
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-50 leading-[1.05] tracking-tight break-words">
                Conhecimento em
                <br className="hidden md:block" />{" "}
                constante{" "}
                <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-4 underline-offset-8">
                  expansão
                </span>
              </h1>
              <p className="mt-6 text-lg text-stone-400 leading-relaxed max-w-xl">
                Uma biblioteca de estudos, traduções e anotações —{" "}
                <span className="text-stone-200 font-medium whitespace-nowrap">{publishedCount} conteúdos</span> em{" "}
                <span className="text-stone-200 font-medium whitespace-nowrap">{activeAreas} áreas</span>, e crescendo.
              </p>
            </div>

            <div className="w-full md:w-96 shrink-0">
              <label className="block text-xs text-stone-400 tracking-widest uppercase mb-2">
                Buscar em todo o site
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-base">
                  ⌕
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ex: problema do mal, pytest..."
                  className="w-full bg-stone-900/80 border border-stone-700 rounded-xl pl-10 pr-10 py-3.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="flex items-center justify-end pb-6">
          <span className="text-xs text-stone-500 whitespace-nowrap">
            {isSearching
              ? `${resultCount} ${resultCount === 1 ? "resultado" : "resultados"}`
              : `${matchedCategories.length} ${matchedCategories.length === 1 ? "categoria" : "categorias"}`}
          </span>
        </div>

        {!isEmpty ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchedCategories.map((category, i) => (
              <CategoryCard key={category.slug} category={category} priority={i === 0} />
            ))}
            {matchedTopics.map((topic, i) => (
              <TopicCard
                key={topic.slug}
                topic={topic}
                priority={matchedCategories.length === 0 && i === 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-stone-600">
            <p className="text-4xl mb-3">◌</p>
            <p className="text-sm">
              Nenhum resultado encontrado
              {search && ` para "${search}"`}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-xs text-emerald-600 hover:text-emerald-400 transition-colors underline underline-offset-2"
              >
                Limpar busca
              </button>
            )}
          </div>
        )}
      </section>

      <footer className="border-t border-stone-800 py-8 text-center text-stone-600 text-sm">
        <span>Metanoia Lab — </span>
        <span className="text-emerald-700">transformação pela verdade</span>
      </footer>
    </main>
  );
}
