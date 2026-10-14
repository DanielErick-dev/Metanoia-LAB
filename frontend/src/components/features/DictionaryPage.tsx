"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CategoryData } from "@/lib/types/category";
import { getCategoryBySlug, getCategoryChain, getCategoryPath } from "@/lib/categories";
import { DictionaryEntry, dictionary, searchDictionary } from "@/lib/dictionary";
import { Breadcrumb } from "./Breadcrumb";
import { SpeakButton } from "./SpeakButton";
import { ScrollToTopButton } from "./ScrollToTopButton";

interface DictionaryPageProps {
  category: CategoryData;
}

type Kind = "todas" | "palavras" | "expressoes";

const KINDS: { value: Kind; label: string }[] = [
  { value: "todas", label: "Tudo" },
  { value: "palavras", label: "Palavras" },
  { value: "expressoes", label: "Expressões" },
];

const SANS = { fontFamily: "var(--font-dm-sans), sans-serif" };
const SERIF = { fontFamily: "var(--font-lora), Georgia, serif" };
const AUTO_OPEN_LIMIT = 3;

function groupByLetter(entries: DictionaryEntry[]): [string, DictionaryEntry[]][] {
  const groups = new Map<string, DictionaryEntry[]>();
  for (const entry of entries) {
    groups.set(entry.letter, [...(groups.get(entry.letter) ?? []), entry]);
  }
  return [...groups.entries()];
}

export function DictionaryPage({ category }: DictionaryPageProps) {
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<Kind>("todas");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const accent = category.accent;

  const parent = category.parentSlug ? getCategoryBySlug(category.parentSlug) : undefined;
  const backHref = parent ? `/${getCategoryPath(parent.slug)}` : "/";
  const breadcrumbItems = getCategoryChain(category.slug).map((c) => ({
    label: c.title,
    href: `/${getCategoryPath(c.slug)}`,
  }));

  const byKind = useMemo(
    () =>
      dictionary.filter((e) =>
        kind === "todas" ? true : kind === "expressoes" ? e.isPhrase : !e.isPhrase
      ),
    [kind]
  );
  const results = useMemo(() => searchDictionary(byKind, search), [byKind, search]);
  const searching = search.trim().length > 0;
  const groups = useMemo(() => (searching ? [] : groupByLetter(results)), [results, searching]);
  const letters = useMemo(() => new Set(byKind.map((e) => e.letter)), [byKind]);
  const autoOpen = searching && results.length <= AUTO_OPEN_LIMIT;

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function renderEntry(entry: DictionaryEntry) {
    const expanded = autoOpen || open.has(entry.id);
    return (
      <li key={entry.id} id={entry.id} className="border-b border-stone-800/80 scroll-mt-24">
        <div className="flex items-baseline gap-3 py-4">
          <button
            type="button"
            onClick={() => toggle(entry.id)}
            aria-expanded={expanded}
            className="flex-1 min-w-0 text-left cursor-pointer group flex flex-wrap items-baseline gap-x-3 gap-y-1"
          >
            <span
              className="text-xl font-semibold text-stone-100 group-hover:text-white break-words"
              style={SERIF}
            >
              {entry.term}
            </span>
            <span className="text-stone-400 text-[0.95rem]" style={SERIF}>
              {entry.senses.map((s) => s.meaning).join(" · ")}
            </span>
          </button>
          <SpeakButton text={entry.term} accent={accent} />
          <button
            type="button"
            onClick={() => toggle(entry.id)}
            aria-label={expanded ? "Fechar detalhes" : "Abrir detalhes"}
            className={`text-stone-500 hover:text-stone-200 cursor-pointer transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            ▾
          </button>
        </div>

        {expanded && (
          <div className="pb-6 space-y-6 animate-in fade-in duration-300">
            {entry.senses.map((sense, i) => (
              <div key={i} className="pl-4 border-l-2" style={{ borderColor: `${sense.source.accent}50` }}>
                {entry.senses.length > 1 && (
                  <p className="text-[0.95rem] font-semibold mb-2" style={{ ...SERIF, color: accent }}>
                    {i + 1}. {sense.meaning}
                  </p>
                )}

                {sense.notes.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {sense.notes.map((note) => (
                      <li key={note} className="text-[0.95rem] text-stone-300 leading-relaxed" style={SERIF}>
                        {note}
                      </li>
                    ))}
                  </ul>
                )}

                {sense.informal && (
                  <p className="text-[0.95rem] text-stone-300 leading-relaxed mb-3" style={SERIF}>
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-500 mr-2" style={SANS}>
                      Informal
                    </span>
                    <span className="font-semibold" style={{ color: accent }}>
                      {sense.informal.word}
                    </span>{" "}
                    — {sense.informal.note}
                  </p>
                )}

                {sense.forms && (
                  <div className="mb-3">
                    <p className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-2" style={SANS}>
                      {sense.forms.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sense.forms.pairs.map(([base, past]) => (
                        <span key={base} className="text-sm px-3 py-1 rounded-md border border-stone-700 text-stone-300">
                          {base} → <span style={{ color: accent }}>{past}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {sense.examples.length > 0 && (
                  <div className="space-y-2.5 mb-3">
                    {sense.examples.map((example) => (
                      <div key={example.en}>
                        <p className="italic text-stone-200 leading-relaxed flex items-baseline gap-2" style={SERIF}>
                          <span>“{example.en}”</span>
                          <SpeakButton text={example.en} accent={accent} />
                        </p>
                        {example.pt && <p className="text-sm text-stone-400 mt-0.5">{example.pt}</p>}
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={sense.source.href}
                  className="inline-flex items-center gap-1.5 text-xs tracking-wide text-stone-500 hover:text-stone-200 transition-colors"
                  style={SANS}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sense.source.accent }} />
                  Anotada em {sense.source.title} →
                </Link>
              </div>
            ))}
          </div>
        )}
      </li>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0e0d] text-stone-100">
      <header className="px-8 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-emerald-400 text-xl">◈</span>
          <span
            className="font-medium tracking-widest text-xs uppercase text-stone-400 group-hover:text-white transition-colors"
            style={SANS}
          >
            Metanoia Lab
          </span>
        </Link>
        <Link
          href={backHref}
          className="text-xs text-stone-600 hover:text-stone-300 transition-colors flex items-center gap-2 tracking-wide"
          style={SANS}
        >
          ← {parent?.title ?? "Início"}
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-24">
        <div className="pb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <p className="text-xs tracking-widest uppercase font-medium mb-3" style={{ ...SANS, color: accent }}>
          {dictionary.length} verbetes
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-3" style={SERIF}>
          {category.title}
        </h1>
        <p className="text-stone-400 mb-10" style={SANS}>
          {category.subtitle}
        </p>

        <div className="sticky top-0 z-10 -mx-4 sm:-mx-8 px-4 sm:px-8 pt-4 pb-3 bg-[#0f0e0d]/95 backdrop-blur-sm border-b border-stone-800">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar em inglês ou português..."
              autoFocus
              className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-10 pr-10 py-3 text-stone-100 placeholder-stone-500 focus:outline-none transition-colors"
              style={{ ...SANS, borderColor: searching ? `${accent}80` : undefined }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-200 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <div className="flex gap-2">
              {KINDS.map((k) => (
                <button
                  key={k.value}
                  type="button"
                  onClick={() => setKind(k.value)}
                  className="text-xs tracking-wide px-3 py-1.5 rounded-full border cursor-pointer transition-colors"
                  style={{
                    ...SANS,
                    color: kind === k.value ? accent : "#a8a29e",
                    borderColor: kind === k.value ? `${accent}70` : "#44403c",
                    backgroundColor: kind === k.value ? `${accent}14` : "transparent",
                  }}
                >
                  {k.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone-500" style={SANS}>
              {results.length} {results.length === 1 ? "resultado" : "resultados"}
            </p>
          </div>

          {!searching && (
            <nav className="flex flex-wrap gap-x-1 gap-y-1 mt-3" style={SANS}>
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) =>
                letters.has(letter) ? (
                  <a
                    key={letter}
                    href={`#letra-${letter}`}
                    className="w-6 text-center text-xs font-semibold text-stone-300 hover:text-white rounded"
                  >
                    {letter}
                  </a>
                ) : (
                  <span key={letter} className="w-6 text-center text-xs text-stone-700">
                    {letter}
                  </span>
                )
              )}
            </nav>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20 text-stone-500" style={SANS}>
            <p className="text-sm">Nada encontrado para “{search}”.</p>
          </div>
        ) : searching ? (
          <ul>{results.map(renderEntry)}</ul>
        ) : (
          groups.map(([letter, entries]) => (
            <section key={letter} id={`letra-${letter}`} className="scroll-mt-44">
              <h2 className="text-2xl font-semibold mt-10 mb-1" style={{ ...SERIF, color: accent }}>
                {letter}
              </h2>
              <ul>{entries.map(renderEntry)}</ul>
            </section>
          ))
        )}
      </div>

      <ScrollToTopButton />
    </main>
  );
}
