import { VocabEntry } from "@/lib/types/topic";
import { inglesVerbos } from "./ingles-verbos";
import { inglesVocabularioGeral } from "./ingles-vocabulario-geral";

const vocabulary = [...inglesVerbos.sections, ...inglesVocabularioGeral.sections].flatMap(
  (section) => section.vocabList ?? []
);

export function pickVocabulary(terms: string[]): VocabEntry[] {
  return terms.map((term) => {
    const entry = vocabulary.find((item) => item.term === term);
    if (!entry) throw new Error(`Palavra sem entrada no vocabulário: ${term}`);
    return entry;
  });
}
