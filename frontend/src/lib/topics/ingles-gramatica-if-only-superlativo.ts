import { TopicData } from "@/lib/types/topic";

export const inglesGramaticaIfOnlySuperlativo: TopicData = {
  slug: "gramatica-if-only-superlativo",
  title: "Gramática: if only e superlativo",
  subtitle: "Arrependimento com 'if only' e o grau superlativo dos adjetivos",
  categorySlug: "ingles",
  accent: "#f472b6",
  status: "em-construcao",
  intro:
    "Duas estruturas gramaticais que anotei separadamente: o 'if only' para falar de arrependimento e desejo, e o superlativo, o grau máximo de um adjetivo.",
  sections: [
    {
      heading: "Estrutura de arrependimento (if only...)",
      body: "'If only' funciona como 'se eu tivesse/estivesse', pra expressar arrependimento ou desejo sobre algo que não aconteceu.",
      vocabList: [
        { term: "if only I had studied", translation: "se eu tivesse estudado" },
        { term: "were", translation: "verbo to be no subjuntivo" },
        { term: "if only I were there", translation: "se eu estivesse lá" },
      ],
    },
    {
      heading: "Superlativo",
      body: "O superlativo é o grau máximo de um adjetivo — em português, algo como 'bonito → belíssimo' ou 'sincero → o mais sincero'.",
      vocabList: [
        { term: "sincere", translation: "sincero" },
        { term: "sincerest", translation: "o mais sincero" },
      ],
    },
  ],
  relatedSlugs: ["vocabulario-geral", "some-any-no"],
};
