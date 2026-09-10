import { TopicData } from "@/lib/types/topic";

export const inglesDizerQueEstaCansado: TopicData = {
  slug: "dizer-que-esta-cansado",
  title: "Jeitos de dizer que está cansado",
  subtitle: "Alternativas a 'I'm tired' pra variar no dia a dia",
  categorySlug: "ingles",
  accent: "#f472b6",
  status: "em-construcao",
  intro:
    "Algumas formas de dizer que você está cansado sem repetir sempre 'I'm tired'.",
  sections: [
    {
      heading: "Formas de dizer que está cansado sem usar 'I'm tired'",
      body: "Algumas alternativas pra variar na hora de dizer que você está cansado.",
      expressions: [
        {
          phrase: "I'm exhausted",
          translation: "estou exausto",
          explanation: "Cansaço intenso, exaustão.",
          example: "I'm exhausted, I barely slept last night.",
          exampleTranslation: "Estou exausto, mal dormi ontem à noite.",
        },
        {
          phrase: "I'm dog tired",
          translation: "estou cansado pra cachorro",
          explanation: "Expressão informal, geralmente usada depois de fazer algo muito cansativo.",
          example: "I'm dog tired after moving all that furniture.",
          exampleTranslation: "Estou cansado pra cachorro depois de mover todos aqueles móveis.",
        },
        {
          phrase: "I feel drained",
          translation: "estou esgotado",
          explanation: "Sensação de estar drenado, esgotado — geralmente além do cansaço físico, também emocional ou psicológico.",
          example: "After that meeting, I feel completely drained.",
          exampleTranslation: "Depois daquela reunião, eu me sinto completamente esgotado.",
        },
        {
          phrase: "I'm a little spent / I'm spent",
          translation: "eu estou um pouco cansado / sem energia",
          explanation: "Muito utilizado no dia a dia.",
          example: "It's only 9pm but I'm spent.",
          exampleTranslation: "São só 9 horas da noite, mas eu tô sem energia.",
        },
      ],
    },
  ],
  relatedSlugs: ["expressoes-girias", "conversas-informais"],
};
