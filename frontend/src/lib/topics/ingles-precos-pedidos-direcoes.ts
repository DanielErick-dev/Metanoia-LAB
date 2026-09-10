import { TopicData } from "@/lib/types/topic";

export const inglesPrecosPedidosDirecoes: TopicData = {
  slug: "precos-pedidos-direcoes",
  title: "Preços, pedidos e direções",
  subtitle: "Frases práticas pra preços, pedidos em restaurante e direções",
  categorySlug: "ingles",
  accent: "#f472b6",
  status: "em-construcao",
  intro:
    "Frases práticas pro dia a dia: perguntar preço, pedir algo num restaurante e perguntar como chegar a um lugar.",
  sections: [
    {
      heading: "Frases úteis: preços, pedidos e direções",
      body: "Frases práticas para o dia a dia — clima, preços, pedir algo num restaurante e perguntar como chegar a um lugar.",
      expressions: [
        {
          phrase: "it looks like it's gonna rain",
          translation: "parece que vai chover",
        },
        {
          phrase: "how much is this?",
          translation: "quanto custa isso?",
        },
        {
          phrase: "what is this",
          translation: "o que é isso?",
        },
        {
          phrase: "how much are these",
          translation: "quanto custam essas coisas?",
        },
        {
          phrase: "may I have a ... please",
          translation: "me dê um/uma ... por favor",
          explanation: "Pergunta para fazer em restaurantes.",
          example: "May I have a beer please.",
          exampleTranslation: "Me dê uma cerveja por favor.",
        },
        {
          phrase: "how do I get to Sobradinho?",
          translation: "como eu faço para chegar em Sobradinho?",
          explanation: "Pergunta para saber como chegar a um lugar.",
        },
      ],
    },
  ],
  relatedSlugs: ["conversas-informais", "vocabulario-geral"],
};
