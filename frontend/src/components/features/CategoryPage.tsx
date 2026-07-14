"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CategoryData } from "@/lib/types/category";
import {
  getCategoryBySlug,
  getChildCategories,
  getCategoryChain,
  getCategoryPath,
} from "@/lib/categories";
import { topics } from "@/lib/topics";
import { CategoryCard } from "./CategoryCard";
import { TopicCard } from "./TopicCard";
import { Breadcrumb } from "./Breadcrumb";

interface CategoryPageProps {
  category: CategoryData;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const [search, setSearch] = useState("");

  const childCategories = getChildCategories(category.slug);
  const childTopics = topics.filter((t) => t.categorySlug === category.slug);
  const chain = getCategoryChain(category.slug);
  const breadcrumbItems = chain.map((c) => ({
    label: c.title,
    href: `/${getCategoryPath(c.slug)}`,
  }));
  const parentCategory = category.parentSlug
    ? getCategoryBySlug(category.parentSlug)
    : undefined;
  const backHref = parentCategory ? `/${getCategoryPath(parentCategory.slug)}` : "/";
  const backLabel = parentCategory ? parentCategory.title : "Início";

  const filteredCategories = useMemo(
    () =>
      childCategories.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      ),
    [childCategories, search]
  );
  const filteredTopics = useMemo(
    () =>
      childTopics.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.subtitle.toLowerCase().includes(search.toLowerCase())
      ),
    [childTopics, search]
  );

  const isEmpty = filteredCategories.length === 0 && filteredTopics.length === 0;

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-emerald-400 text-xl">◈</span>
          <span className="font-semibold tracking-widest text-sm uppercase text-stone-300">
            Metanoia Lab
          </span>
        </Link>
        <nav className="flex gap-6 text-sm text-stone-500">
          <a href="#" className="hover:text-stone-200 transition-colors">
            Sobre
          </a>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb items={breadcrumbItems} />
          <Link
            href={backHref}
            className="text-xs text-stone-500 hover:text-stone-200 transition-colors flex items-center gap-2 tracking-wide shrink-0"
          >
            ← {backLabel}
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p
              className="text-xs tracking-widest uppercase font-medium mb-3"
              style={{ color: category.accent }}
            >
              {childCategories.length > 0 ? "Categoria" : "Biblioteca"}
            </p>
            <h1 className="text-4xl font-bold text-stone-100 leading-tight">
              {category.title}
            </h1>
            <p className="text-stone-500 mt-3 max-w-xl">{category.subtitle}</p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">
              Buscar
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-sm">
                ⌕
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="filtrar nesta categoria..."
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
        {!isEmpty ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
            {filteredTopics.map((t) => (
              <TopicCard key={t.slug} topic={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-stone-600">
            <p className="text-4xl mb-3">◌</p>
            <p className="text-sm">
              Nenhum item encontrado{search && ` para "${search}"`}
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
