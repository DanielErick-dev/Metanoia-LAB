"use client";

import { useState } from "react";
import { TopicSection, VocabEntry, ExpressionEntry } from "@/lib/types/topic";
import { CodeBlock } from "./CodeBlock";
import { SpeakButton } from "./SpeakButton";
import { Lineup } from "./Lineup";
import { Interrogation } from "./Interrogation";
import { Confrontation } from "./Confrontation";

interface TopicSectionsProps {
  sections: TopicSection[];
  accent: string;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function vocabMatches(entry: VocabEntry, query: string): boolean {
  return [
    entry.term,
    entry.translation,
    entry.note,
    entry.example,
    entry.exampleTranslation,
    ...(entry.more ?? []).flatMap((item) => [item.text, item.example, item.exampleTranslation]),
  ]
    .filter((value): value is string => Boolean(value))
    .some((text) => normalize(text).includes(query));
}

function expressionMatches(entry: ExpressionEntry, query: string): boolean {
  return [entry.phrase, entry.translation, entry.explanation, entry.example, entry.exampleTranslation]
    .filter((value): value is string => Boolean(value))
    .some((text) => normalize(text).includes(query));
}

export function TopicSections({ sections, accent }: TopicSectionsProps) {
  const [search, setSearch] = useState("");
  const query = normalize(search.trim());
  const isFiltering = query.length > 0;
  const suspects = sections.flatMap((section) => section.lineup?.map((entry) => entry.word) ?? []);

  const hasVocab = sections.some(
    (section) => (section.vocabList?.length ?? 0) > 0 || (section.expressions?.length ?? 0) > 0
  );

  const totalMatches = isFiltering
    ? sections.reduce((sum, section) => {
        const vocabCount = section.vocabList?.filter((entry) => vocabMatches(entry, query)).length ?? 0;
        const exprCount = section.expressions?.filter((entry) => expressionMatches(entry, query)).length ?? 0;
        return sum + vocabCount + exprCount;
      }, 0)
    : 0;

  return (
    <div className="space-y-0">
      {hasVocab && (
        <div className="mb-12">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-sm">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar palavras e expressões..."
              className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-10 py-3 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-600 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
          {isFiltering && (
            <p className="text-xs text-stone-600 mt-2">
              {totalMatches === 0
                ? `Nenhum resultado para “${search}”.`
                : `${totalMatches} ${totalMatches === 1 ? "resultado" : "resultados"}`}
            </p>
          )}
        </div>
      )}

      {sections.map((section, i) => {
        const vocabList = isFiltering
          ? section.vocabList?.filter((entry) => vocabMatches(entry, query))
          : section.vocabList;
        const expressions = isFiltering
          ? section.expressions?.filter((entry) => expressionMatches(entry, query))
          : section.expressions;

        return (
          <div key={i} className="mb-14">
            <h2
              id={`section-${i}`}
              className="text-2xl font-semibold text-stone-100 leading-snug mb-6 scroll-mt-8"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {section.heading}
            </h2>

            <p
              className="text-[1.125rem] text-stone-400 leading-[1.9]"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {section.body}
            </p>

            {section.table && section.table.stackOnMobile && (
              <>
                <div className="mt-6 space-y-5 md:hidden">
                  {section.table.headers.slice(1).map((paradigm, p) => {
                    const column = p + 1;
                    return (
                      <div key={column} className="rounded-xl border border-stone-800 p-5">
                        <p
                          className="text-xl font-semibold mb-4"
                          style={{ color: accent, fontFamily: "var(--font-lora), Georgia, serif" }}
                        >
                          {paradigm}
                        </p>
                        <dl className="space-y-4">
                          {section.table!.rows.map((row, r) => (
                            <div key={r}>
                              <dt className="text-[0.7rem] uppercase tracking-widest text-stone-500 mb-1">
                                {row[0]}
                              </dt>
                              <dd
                                className={`text-sm text-stone-300 leading-relaxed break-words ${
                                  section.table!.monoRows?.includes(r)
                                    ? "font-mono text-xs whitespace-pre overflow-x-auto"
                                    : "whitespace-pre-line"
                                }`}
                                style={
                                  section.table!.monoRows?.includes(r)
                                    ? undefined
                                    : { fontFamily: "var(--font-lora), Georgia, serif" }
                                }
                              >
                                {row[column]}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 hidden overflow-x-auto rounded-xl border border-stone-800 md:block">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        {section.table.headers.map((header, k) => (
                          <th
                            key={k}
                            className="text-left px-4 py-3 font-semibold tracking-wide uppercase text-xs border-b border-stone-800"
                            style={{ color: accent, fontFamily: "var(--font-dm-sans), sans-serif" }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, r) => (
                        <tr key={r} className="border-b border-stone-800/60 last:border-0">
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className={`px-4 py-3 text-stone-400 leading-relaxed align-top ${
                                section.table!.monoRows?.includes(r) ? "font-mono text-xs whitespace-pre" : "whitespace-pre-line"
                              }`}
                              style={
                                section.table!.monoRows?.includes(r)
                                  ? undefined
                                  : { fontFamily: "var(--font-lora), Georgia, serif" }
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {section.table && !section.table.stackOnMobile && (
              <div className="mt-6 overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      {section.table.headers.map((header, k) => (
                        <th
                          key={k}
                          className="text-left px-4 py-3 font-semibold tracking-wide uppercase text-xs border-b border-stone-800"
                          style={{ color: accent, fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, r) => (
                      <tr key={r} className="border-b border-stone-800/60 last:border-0">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="px-4 py-3 text-stone-400 leading-relaxed align-top"
                            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.citation && (
              <div
                className="mt-6 pl-5 py-1 border-l-2 space-y-3"
                style={{ borderColor: `${accent}80` }}
              >
                {section.citation.lines.map((line, k) => (
                  <p
                    key={k}
                    className="text-[1.0625rem] text-stone-300 italic leading-relaxed"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {section.citation!.lines.length > 1 && (
                      <span className="not-italic font-semibold mr-2" style={{ color: accent }}>
                        {k + 1}.
                      </span>
                    )}
                    {line}
                  </p>
                ))}
                {section.citation.source && (
                  <p
                    className="text-xs text-stone-500 tracking-widest uppercase not-italic"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    — {section.citation.source}
                  </p>
                )}
              </div>
            )}

            {section.lineup && section.lineup.length > 0 && (
              <Lineup entries={section.lineup} accent={accent} />
            )}

            {section.confrontation && section.confrontation.length > 0 && (
              <Confrontation entries={section.confrontation} accent={accent} />
            )}

            {section.interrogation && section.interrogation.length > 0 && (
              <Interrogation entries={section.interrogation} suspects={suspects} accent={accent} />
            )}

            {section.code && <CodeBlock code={section.code} language={section.language} />}

            {section.links && section.links.length > 0 && (
              <ul className="mt-6 space-y-2">
                {section.links.map((link, k) => (
                  <li key={k}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline underline-offset-4 decoration-1 hover:text-stone-300 transition-colors"
                      style={{ color: accent, fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {link.text} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {vocabList && vocabList.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {vocabList.map((entry, k) => (
                  <div key={k}>
                    <p className="text-[1.0625rem]" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                      <span className="font-semibold" style={{ color: accent }}>
                        {entry.term}
                      </span>{" "}
                      <SpeakButton text={entry.term} accent={accent} />
                      <span className="text-stone-400"> — {entry.translation}</span>
                    </p>
                    {entry.note && (
                      <p className="text-sm text-stone-600 mt-1 leading-relaxed">{entry.note}</p>
                    )}
                    {entry.example && (
                      <div className="mt-2 pl-3 border-l-2" style={{ borderColor: `${accent}40` }}>
                        <p className="text-sm italic text-stone-400 leading-relaxed flex items-baseline gap-2">
                          <span>“{entry.example}”</span>
                          <SpeakButton text={entry.example} accent={accent} />
                        </p>
                        {entry.exampleTranslation && (
                          <p className="text-xs text-stone-600 mt-1">{entry.exampleTranslation}</p>
                        )}
                      </div>
                    )}
                    {entry.more && entry.more.length > 0 && (
                      <details className="group mt-2">
                        <summary
                          className="cursor-pointer select-none list-none text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                          style={{ color: accent, fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                          <span className="transition-transform group-open:rotate-90">›</span>
                          mais usos ({entry.more.length})
                        </summary>
                        <ul className="mt-2 space-y-2 pl-3 border-l-2" style={{ borderColor: `${accent}40` }}>
                          {entry.more.map((item, m) => (
                            <li key={m}>
                              {item.text && <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>}
                              {item.example && (
                                <p className="text-sm italic text-stone-400 leading-relaxed flex items-baseline gap-2">
                                  <span>“{item.example}”</span>
                                  <SpeakButton text={item.example} accent={accent} />
                                </p>
                              )}
                              {item.exampleTranslation && (
                                <p className="text-xs text-stone-600 mt-1">{item.exampleTranslation}</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            )}

            {expressions && expressions.length > 0 && (
              <div className="mt-6 space-y-5">
                {expressions.map((entry, k) => (
                  <div key={k} className="border border-stone-800 rounded-xl p-5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className="font-semibold text-stone-100"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        {entry.phrase}
                      </span>
                      <SpeakButton text={entry.phrase} accent={accent} />
                      <span className="text-sm" style={{ color: accent }}>
                        {entry.translation}
                      </span>
                    </div>
                    {entry.explanation && (
                      <p className="text-sm text-stone-500 leading-relaxed mt-2">
                        {entry.explanation}
                      </p>
                    )}
                    {entry.example && (
                      <div className="mt-3 pl-4 border-l-2" style={{ borderColor: `${accent}40` }}>
                        <p
                          className="italic text-stone-300 leading-relaxed flex items-baseline gap-2"
                          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                        >
                          <span>“{entry.example}”</span>
                          <SpeakButton text={entry.example} accent={accent} />
                        </p>
                        {entry.exampleTranslation && (
                          <p className="text-sm text-stone-500 mt-1">{entry.exampleTranslation}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.examples && section.examples.length > 0 && (
              <div className="mt-10 space-y-10">
                {section.examples.map((example, j) => (
                  <div key={j}>
                    {example.title && (
                      <h3
                        className="text-base font-semibold text-stone-200 mb-3"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        {example.title}
                      </h3>
                    )}
                    <p
                      className="text-[1.0625rem] text-stone-400 leading-[1.9]"
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    >
                      {example.body}
                    </p>
                    <CodeBlock code={example.code} language={example.language} />
                    {example.note && (
                      <p
                        className="text-sm text-stone-500 leading-relaxed mt-4"
                        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      >
                        {example.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {i < sections.length - 1 && (
              <div className="flex items-center gap-3 mt-14">
                <div className="h-px flex-1 bg-stone-800/60" />
                <span className="text-xs opacity-30" style={{ color: accent }}>
                  ✦
                </span>
                <div className="h-px flex-1 bg-stone-800/60" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
