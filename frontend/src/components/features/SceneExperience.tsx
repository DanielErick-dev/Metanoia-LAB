"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TopicSection, VocabEntry, VocabMore } from "@/lib/types/topic";
import { SCENES, SceneConfig, sceneObjectFor } from "./scenes";
import { SceneContext } from "./SceneSpot";
import { VocabDetails } from "./VocabDetails";
import { SpeakButton } from "./SpeakButton";
import { BritishTag } from "./BritishTag";
import styles from "./Scene.module.css";

const SANS = { fontFamily: "var(--font-dm-sans), sans-serif" };
const SERIF = { fontFamily: "var(--font-lora), Georgia, serif" };

function detailsOf(entry: VocabEntry): VocabMore[] {
  const example: VocabMore[] = entry.example
    ? [{ label: "Exemplo", example: entry.example, exampleTranslation: entry.exampleTranslation }]
    : [];
  return [...example, ...(entry.more ?? [])];
}

function stationOf(sections: TopicSection[], term: string): string {
  const owner = sections.find((section) => section.vocabList?.some((item) => item.term === term));
  return owner?.heading ?? sections[0].heading;
}

function centerOn(scroller: HTMLDivElement | null, config: SceneConfig, term: string, smooth: boolean) {
  if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
  const target = scroller.querySelector(`[aria-label="${sceneObjectFor(config, term)}"]`);
  if (!target) return;
  const box = target.getBoundingClientRect();
  const frame = scroller.getBoundingClientRect();
  const left = scroller.scrollLeft + box.left + box.width / 2 - frame.left - frame.width / 2;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  scroller.scrollTo({ left, behavior: smooth && !calm ? "smooth" : "auto" });
}

export function SceneExperience({
  kind,
  sections,
  accent,
}: {
  kind: keyof typeof SCENES;
  sections: TopicSection[];
  accent: string;
}) {
  const config = SCENES[kind];
  const { Scene } = config;
  const entries = useMemo(() => sections.flatMap((section) => section.vocabList ?? []), [sections]);
  const [selected, setSelected] = useState(config.firstWord);
  const [station, setStation] = useState(() => stationOf(sections, config.firstWord));
  const [showLabels, setShowLabels] = useState(true);
  const scroller = useRef<HTMLDivElement>(null);
  const entry = entries.find((item) => item.term === selected) ?? entries[0];

  useEffect(() => {
    centerOn(scroller.current, config, config.firstWord, false);
  }, [config]);

  function select(term: string) {
    setSelected(term);
    setStation(stationOf(sections, term));
    centerOn(scroller.current, config, term, true);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <p className="text-sm text-stone-400" style={SANS}>
          <span className="lg:hidden">Arraste a cena pros lados e toque num objeto. </span>
          <span className="hidden lg:inline">Clique num objeto. </span>
          {config.hint}
        </p>
        <button
          type="button"
          onClick={() => setShowLabels((value) => !value)}
          aria-pressed={showLabels}
          className="text-xs tracking-wide px-3 py-1.5 rounded-full border border-stone-700 text-stone-300 hover:border-stone-500 cursor-pointer transition-colors"
          style={SANS}
        >
          {showLabels ? "Esconder os nomes" : "Mostrar os nomes"}
        </button>
      </div>

      <div className="rounded-3xl overflow-hidden border border-stone-800">
        <div ref={scroller} className={styles.scroller}>
          <SceneContext.Provider value={{ active: entry.term, showLabels, standIns: config.standIns, onSelect: select }}>
            <Scene action={config.actions.has(entry.term) ? entry.term : null} />
          </SceneContext.Provider>
        </div>
        <div className="lg:hidden flex flex-wrap items-baseline gap-x-2 gap-y-0.5 px-4 py-3 border-t border-stone-800 bg-stone-900/70">
          <span className="text-xl font-semibold text-white" style={SERIF}>
            {entry.term}
          </span>
          <SpeakButton text={entry.term} accent={accent} />
          {entry.british && <BritishTag />}
          <span className="text-stone-300" style={SERIF}>
            {entry.translation}
          </span>
        </div>
      </div>

      <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-6 lg:gap-10 items-start">
        <section aria-live="polite" className="order-2 lg:order-1 lg:sticky lg:top-6 rounded-2xl border border-stone-800 bg-stone-900/40 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
            <h2 className="text-3xl font-semibold text-white" style={SERIF}>
              {entry.term}
            </h2>
            <SpeakButton text={entry.term} accent={accent} />
            {entry.british && <BritishTag />}
          </div>
          <p className="text-stone-300 text-lg mb-5" style={SERIF}>
            {entry.translation}
          </p>
          <VocabDetails key={entry.term} conjugation={entry.conjugation} items={detailsOf(entry)} accent={accent} filterable />
        </section>

        <div className="order-1 lg:order-2 min-w-0 space-y-3 lg:space-y-7">
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" role="tablist" aria-label={config.ariaAreas}>
            {sections.map((section) => {
              const open = section.heading === station;
              return (
                <button
                  key={section.heading}
                  type="button"
                  role="tab"
                  aria-selected={open}
                  onClick={() => setStation(section.heading)}
                  className="shrink-0 text-xs font-bold tracking-[0.1em] uppercase px-3 py-2 rounded-lg border cursor-pointer transition-colors"
                  style={{
                    ...SANS,
                    color: open ? "#14100c" : "#d6d3d1",
                    borderColor: open ? accent : "#44403c",
                    backgroundColor: open ? accent : "transparent",
                  }}
                >
                  {section.heading}
                </button>
              );
            })}
          </div>

          {sections.map((section) => (
            <section key={section.heading} className={section.heading === station ? undefined : "hidden lg:block"}>
              <h3 className="hidden lg:block text-xs font-bold tracking-[0.16em] uppercase mb-1" style={{ ...SANS, color: accent }}>
                {section.heading}
              </h3>
              <p className="text-sm text-stone-500 mb-3" style={SANS}>
                {section.body}
              </p>
              <ul className="flex flex-wrap gap-2">
                {(section.vocabList ?? []).map((item) => {
                  const active = item.term === entry.term;
                  return (
                    <li key={item.term}>
                      <button
                        type="button"
                        onClick={() => select(item.term)}
                        aria-pressed={active}
                        className="text-[0.95rem] px-3 py-1.5 rounded-full border cursor-pointer transition-colors"
                        style={{
                          ...SERIF,
                          color: active ? accent : "#d6d3d1",
                          borderColor: active ? `${accent}90` : "#44403c",
                          backgroundColor: active ? `${accent}18` : "transparent",
                        }}
                      >
                        {config.actions.has(item.term) && <span className="mr-1 text-xs">▸</span>}
                        {item.term}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
