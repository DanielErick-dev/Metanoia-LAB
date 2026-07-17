"use client";

import { useState, useMemo } from "react";
import { CategoryCard } from "@/components/features/CategoryCard";
import { getChildCategories } from "@/lib/categories";

export default function Home() {
  const [search, setSearch] = useState("");
  const rootCategories = useMemo(() => getChildCategories(undefined), []);

  const filtered = useMemo(
    () =>
      rootCategories.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.subtitle.toLowerCase().includes(search.toLowerCase())
      ),
    [rootCategories, search]
  );

  const isEmpty = filtered.length === 0;

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

      <section className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-emerald-400 text-xs tracking-widest uppercase font-medium mb-3">
              Laboratório de conhecimento
            </p>
            <h1 className="text-4xl font-bold text-stone-100 leading-tight">
              Conhecimento em
              <br />constante expansão
            </h1>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">
              Buscar categoria
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-sm">
                ⌕
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ex: programação, teologia..."
                className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-4 py-3 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-600 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="flex items-center justify-end pb-6">
          <span className="text-xs text-stone-600 whitespace-nowrap">
            {filtered.length} {filtered.length === 1 ? "categoria" : "categorias"}
          </span>
        </div>

        {!isEmpty ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((category, i) => (
              <CategoryCard key={category.slug} category={category} priority={i === 0} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-stone-600">
            <p className="text-4xl mb-3">◌</p>
            <p className="text-sm">
              Nenhuma categoria encontrada
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
