import { TopicData } from "@/lib/types/topic";

export const inglesReacoesInterjeicoes: TopicData = {
  slug: "reacoes-interjeicoes",
  title: "Reações e interjeições",
  subtitle: "Reações curtas comuns em conversas",
  categorySlug: "vocabulario",
  accent: "#fb7185",
  status: "em-construcao",
  intro:
    "Reações curtas e interjeições que aparecem o tempo todo em conversas.",
  sections: [
    {
      heading: "Reações e interjeições",
      body: "Reações curtas comuns em conversas.",
      expressions: [
        {
          phrase: "i see",
          translation: "tá, aham",
          example: "I see, that makes sense now.",
          exampleTranslation: "Tá, aham, agora faz sentido.",
        },
        {
          phrase: "no way",
          translation: "não acredito, sério?",
          example: "No way! You got the job?",
          exampleTranslation: "Não acredito! Você conseguiu o emprego?",
        },
        {
          phrase: "really?",
          translation: "sério?",
          example: "Really? I had no idea.",
          exampleTranslation: "Sério? Eu não fazia ideia.",
        },
        {
          phrase: "sorry?",
          translation: "opa, não ouvi, pode repetir?",
          explanation: "Por mais que 'sorry' geralmente signifique desculpa, aqui é usado quando não entendi algo que alguém disse.",
          example: "Sorry? Could you say that again?",
          exampleTranslation: "Opa, pode repetir?",
        },
        {
          phrase: "that's amazing",
          translation: "que incrível",
          example: "You finished the marathon? That's amazing!",
          exampleTranslation: "Você terminou a maratona? Que incrível!",
        },
        {
          phrase: "that's ok",
          translation: "está ok, tranquilo",
          example: "Don't worry, that's ok.",
          exampleTranslation: "Não se preocupa, tá tranquilo.",
        },
      ],
    },
  ],
  relatedSlugs: ["conversas-informais", "expressoes-girias"],
};
