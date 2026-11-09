"use client";

import { useState } from "react";
import { VocabConjugation, VocabMore } from "@/lib/types/topic";
import { matchesQuery } from "@/lib/text-match";
import { SpeakButton } from "./SpeakButton";
import { BritishTag } from "./BritishTag";

interface VocabDetailsProps {
  conjugation?: VocabConjugation;
  items: VocabMore[];
  accent: string;
  size?: "sm" | "md";
  filterable?: boolean;
  query?: string;
}

const SANS = { fontFamily: "var(--font-dm-sans), sans-serif" };
const SERIF = { fontFamily: "var(--font-lora), Georgia, serif" };
const MIN_GROUPS_FOR_FILTER = 3;
const ALL = "__tudo";
const FOUND = "__encontrados";
const CONJUGATION = "__conjugacao";

const PLURALS: Record<string, string> = {
  Exemplo: "Exemplos",
  Expressão: "Expressões",
  Substantivo: "Substantivos",
  Adjetivo: "Adjetivos",
  Advérbio: "Advérbios",
  Verbo: "Verbos",
  Forma: "Formas",
  "Outro sentido": "Outros sentidos",
  "Palavra relacionada": "Palavras relacionadas",
  Diferença: "Diferenças",
  Observação: "Observações",
  Parecido: "Parecidos",
  Variação: "Variações",
  "Phrasal verb": "Phrasal verbs",
};

function groupByLabel(items: VocabMore[]): [string, VocabMore[]][] {
  const groups = new Map<string, VocabMore[]>();
  for (const item of items) {
    groups.set(item.label, [...(groups.get(item.label) ?? []), item]);
  }
  return [...groups.entries()];
}

function groupTitle(label: string, count: number): string {
  return count > 1 ? (PLURALS[label] ?? label) : label;
}

function Label({ children, accent, sm }: { children: React.ReactNode; accent: string; sm: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${sm ? "mb-1.5" : "mb-2.5"}`}>
      <span
        className={`${sm ? "text-[0.7rem]" : "text-xs"} font-bold tracking-[0.16em] uppercase shrink-0`}
        style={{ ...SANS, color: accent }}
      >
        {children}
      </span>
      <span className="flex-1 h-px" style={{ backgroundColor: `${accent}33` }} />
    </div>
  );
}

function Chip({
  active,
  accent,
  onClick,
  children,
}: {
  active: boolean;
  accent: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs tracking-wide px-2.5 py-1 rounded-full border cursor-pointer transition-colors"
      style={{
        ...SANS,
        color: active ? accent : "#a8a29e",
        borderColor: active ? `${accent}70` : "#44403c",
        backgroundColor: active ? `${accent}14` : "transparent",
      }}
    >
      {children}
    </button>
  );
}

export function VocabDetails({ conjugation, items, accent, size = "md", filterable = false, query = "" }: VocabDetailsProps) {
  const sm = size === "sm";
  const textClass = sm ? "text-sm text-stone-400" : "text-[0.95rem] text-stone-300";
  const exampleClass = sm ? "text-sm text-stone-300" : "text-stone-200";
  const translationClass = sm ? "text-xs text-stone-500" : "text-sm text-stone-400";

  const groups = groupByLabel(items);
  const found = new Set(
    query.trim() ? items.filter((item) => matchesQuery(`${item.text ?? ""} ${item.example ?? ""}`, query)) : []
  );
  const groupCount = groups.length + (conjugation ? 1 : 0);
  const showFilters = filterable && (groupCount >= MIN_GROUPS_FOR_FILTER || found.size > 0);
  const [filter, setFilter] = useState(found.size > 0 ? FOUND : ALL);

  const visibleGroups = groups
    .map(([label, group]): [string, VocabMore[]] => [
      label,
      filter === FOUND ? group.filter((item) => found.has(item)) : group,
    ])
    .filter(([label, group]) => group.length > 0 && (filter === ALL || filter === FOUND || filter === label));
  const showConjugation = conjugation && (filter === ALL || filter === CONJUGATION);

  return (
    <div className={sm ? "space-y-3" : "space-y-5"}>
      {showFilters && (
        <div className="flex flex-wrap gap-1.5">
          {found.size > 0 && (
            <Chip active={filter === FOUND} accent={accent} onClick={() => setFilter(FOUND)}>
              Encontrados · {found.size}
            </Chip>
          )}
          <Chip active={filter === ALL} accent={accent} onClick={() => setFilter(ALL)}>
            Tudo
          </Chip>
          {conjugation && (
            <Chip active={filter === CONJUGATION} accent={accent} onClick={() => setFilter(CONJUGATION)}>
              Conjugação
            </Chip>
          )}
          {groups.map(([label, group]) => (
            <Chip key={label} active={filter === label} accent={accent} onClick={() => setFilter(label)}>
              {groupTitle(label, group.length)}
              {group.length > 1 && <span className="ml-1 text-stone-500">{group.length}</span>}
            </Chip>
          ))}
        </div>
      )}

      {showConjugation && (
        <div>
          <Label accent={accent} sm={sm}>
            Conjugação · verbo {conjugation.irregular ? "irregular" : "regular"}
          </Label>
          <div className="inline-grid grid-cols-3 rounded-md border border-stone-700 divide-x divide-stone-700">
            {[
              ["Presente", conjugation.base],
              ["Passado", conjugation.past],
              ["Particípio", conjugation.participle],
            ].map(([name, form]) => (
              <div key={name} className="px-3 py-1.5">
                <p className="text-[0.65rem] uppercase tracking-wider text-stone-500" style={SANS}>
                  {name}
                </p>
                <p className="text-sm" style={{ ...SERIF, color: accent }}>
                  {form}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleGroups.map(([label, group]) => (
        <div key={label}>
          <Label accent={accent} sm={sm}>
            {groupTitle(label, group.length)}
          </Label>
          <ul className="space-y-2.5">
            {group.map((item, i) => {
              const highlighted = filter !== FOUND && found.has(item);
              return (
                <li
                  key={i}
                  className={highlighted ? "-ml-3 pl-3 border-l-2 rounded-r" : undefined}
                  style={highlighted ? { borderColor: accent, backgroundColor: `${accent}0d` } : undefined}
                >
                  {item.text && (
                    <p className={`${textClass} leading-relaxed`} style={SERIF}>
                      {item.british && <BritishTag className="mr-2" />}
                      {item.text}
                    </p>
                  )}
                  {item.example && (
                    <p className={`${exampleClass} italic leading-relaxed flex items-baseline gap-2`} style={SERIF}>
                      <span>“{item.example}”</span>
                      <SpeakButton text={item.example} accent={accent} />
                    </p>
                  )}
                  {item.exampleTranslation && <p className={`${translationClass} mt-0.5`}>{item.exampleTranslation}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
