import { TopicData } from "@/lib/types/topic";

export const inglesGramaticaIfOnlySuperlativo: TopicData = {
  slug: "if-only-superlativo",
  title: "If only e superlativo",
  subtitle: "Arrependimento com 'if only' e o grau superlativo dos adjetivos",
  categorySlug: "gramatica",
  accent: "#f472b6",
  status: "em-construcao",
  intro:
    "Duas estruturas gramaticais que anotei separadamente: o 'if only' para falar de arrependimento e desejo, e o superlativo, o grau máximo de um adjetivo.",
  sections: [
    {
      heading: "Estrutura de arrependimento (if only...)",
      body: "'If only' funciona como 'se eu tivesse/estivesse', pra expressar arrependimento ou desejo sobre algo que não aconteceu.",
      vocabList: [
        {
          term: "if only I had studied",
          translation: "se eu tivesse estudado",
          example: "If only I had studied, I would have passed the exam.",
          exampleTranslation: "Se eu tivesse estudado, eu teria passado no exame.",
        },
        {
          term: "if only I were there",
          translation: "se eu estivesse lá",
          example: "If only I were there to help you.",
          exampleTranslation: "Se eu estivesse lá pra te ajudar.",
        },
        {
          term: "were",
          translation: "verbo to be no subjuntivo",
          example: "If I were you, I would apologize.",
          exampleTranslation: "Se eu fosse você, eu pediria desculpas.",
        },
      ],
    },
    {
      heading: "Superlativo",
      body: "O superlativo é o grau máximo de um adjetivo — em português, algo como 'bonito → belíssimo' ou 'sincero → o mais sincero'.",
      vocabList: [
        {
          term: "sincere",
          translation: "sincero",
          example: "She seemed sincere about her apology.",
          exampleTranslation: "Ela pareceu sincera sobre o pedido de desculpas dela.",
        },
        {
          term: "sincerest",
          translation: "o mais sincero",
          example: "These are my sincerest thanks.",
          exampleTranslation: "Esses são meus agradecimentos mais sinceros.",
        },
      ],
    },
  ],
  relatedSlugs: ["geral", "some-any-no"],
};
