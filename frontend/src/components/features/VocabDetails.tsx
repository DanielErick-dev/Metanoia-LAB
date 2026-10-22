import { VocabConjugation, VocabMore } from "@/lib/types/topic";
import { SpeakButton } from "./SpeakButton";

interface VocabDetailsProps {
  conjugation?: VocabConjugation;
  items: VocabMore[];
  accent: string;
  size?: "sm" | "md";
}

const SANS = { fontFamily: "var(--font-dm-sans), sans-serif" };
const SERIF = { fontFamily: "var(--font-lora), Georgia, serif" };

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
};

function groupByLabel(items: VocabMore[]): [string, VocabMore[]][] {
  const groups = new Map<string, VocabMore[]>();
  for (const item of items) {
    groups.set(item.label, [...(groups.get(item.label) ?? []), item]);
  }
  return [...groups.entries()];
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.7rem] font-bold tracking-widest uppercase text-stone-500 mb-1.5" style={SANS}>
      {children}
    </p>
  );
}

export function VocabDetails({ conjugation, items, accent, size = "md" }: VocabDetailsProps) {
  const sm = size === "sm";
  const textClass = sm ? "text-sm text-stone-400" : "text-[0.95rem] text-stone-300";
  const exampleClass = sm ? "text-sm text-stone-300" : "text-stone-200";
  const translationClass = sm ? "text-xs text-stone-500" : "text-sm text-stone-400";

  return (
    <div className={sm ? "space-y-3" : "space-y-4"}>
      {conjugation && (
        <div>
          <Label>Conjugação · verbo {conjugation.irregular ? "irregular" : "regular"}</Label>
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

      {groupByLabel(items).map(([label, group]) => (
        <div key={label}>
          <Label>{group.length > 1 ? (PLURALS[label] ?? label) : label}</Label>
          <ul className="space-y-2">
            {group.map((item, i) => (
              <li key={i}>
                {item.text && (
                  <p className={`${textClass} leading-relaxed`} style={SERIF}>
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
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
