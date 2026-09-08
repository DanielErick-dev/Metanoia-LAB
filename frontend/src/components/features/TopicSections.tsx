import { TopicSection } from "@/lib/types/topic";
import { CodeBlock } from "./CodeBlock";
import { SpeakButton } from "./SpeakButton";

interface TopicSectionsProps {
  sections: TopicSection[];
  accent: string;
}

export function TopicSections({ sections, accent }: TopicSectionsProps) {
  return (
    <div className="space-y-0">
      {sections.map((section, i) => (
        <div key={i} className="mb-14">
          <h2
            id={`section-${i}`}
            className="text-2xl font-semibold text-stone-100 leading-snug mb-6 scroll-mt-8"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {section.heading}
          </h2>

          <p
            className="text-[1.125rem] text-stone-400 leading-[1.9]"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {section.body}
          </p>

          {section.table && (
            <div className="mt-6 overflow-x-auto rounded-xl border border-stone-800">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    {section.table.headers.map((header, k) => (
                      <th
                        key={k}
                        className="text-left px-4 py-3 font-semibold tracking-wide uppercase text-xs border-b border-stone-800"
                        style={{ color: accent, fontFamily: "'DM Sans', sans-serif" }}
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
                          style={{ fontFamily: "'Lora', Georgia, serif" }}
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
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
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
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  — {section.citation.source}
                </p>
              )}
            </div>
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
                    style={{ color: accent, fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.text} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}

          {section.vocabList && section.vocabList.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {section.vocabList.map((entry, k) => (
                <div key={k}>
                  <p className="text-[1.0625rem]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                    <span className="font-semibold" style={{ color: accent }}>
                      {entry.term}
                    </span>{" "}
                    <SpeakButton text={entry.term} accent={accent} />
                    <span className="text-stone-400"> — {entry.translation}</span>
                  </p>
                  {entry.note && (
                    <p className="text-sm text-stone-600 mt-1 leading-relaxed">{entry.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.expressions && section.expressions.length > 0 && (
            <div className="mt-6 space-y-5">
              {section.expressions.map((entry, k) => (
                <div key={k} className="border border-stone-800 rounded-xl p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className="font-semibold text-stone-100"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
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
                        style={{ fontFamily: "'Lora', Georgia, serif" }}
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
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {example.title}
                    </h3>
                  )}
                  <p
                    className="text-[1.0625rem] text-stone-400 leading-[1.9]"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                  >
                    {example.body}
                  </p>
                  <CodeBlock code={example.code} language={example.language} />
                  {example.note && (
                    <p
                      className="text-sm text-stone-500 leading-relaxed mt-4"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
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
      ))}
    </div>
  );
}
