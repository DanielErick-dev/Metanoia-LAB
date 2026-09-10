import { TopicData } from "@/lib/types/topic";

export const inglesReacoesInterjeicoes: TopicData = {
  slug: "reacoes-interjeicoes",
  title: "Reações e interjeições",
  subtitle: "Reações curtas comuns em conversas",
  categorySlug: "ingles",
  accent: "#f472b6",
  status: "em-construcao",
  intro:
    "Reações curtas e interjeições que aparecem o tempo todo em conversas.",
  sections: [
    {
      heading: "Reações e interjeições",
      body: "Reações curtas comuns em conversas.",
      expressions: [
        {
          phrase: "no way",
          translation: "não acredito, sério?",
        },
        {
          phrase: "that's amazing",
          translation: "que incrível",
        },
        {
          phrase: "really?",
          translation: "sério?",
        },
        {
          phrase: "i see",
          translation: "tá, aham",
        },
        {
          phrase: "that's ok",
          translation: "está ok, tranquilo",
        },
        {
          phrase: "sorry?",
          translation: "opa, não ouvi, pode repetir?",
          explanation: "Por mais que 'sorry' geralmente signifique desculpa, aqui é usado quando não entendi algo que alguém disse.",
        },
      ],
    },
  ],
  relatedSlugs: ["conversas-informais", "expressoes-girias"],
};
