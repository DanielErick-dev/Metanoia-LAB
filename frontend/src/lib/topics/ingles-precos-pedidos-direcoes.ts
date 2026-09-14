import { TopicData } from "@/lib/types/topic";

export const inglesPrecosPedidosDirecoes: TopicData = {
  slug: "precos-pedidos-direcoes",
  title: "Preços, pedidos e direções",
  subtitle: "Frases práticas pra preços, pedidos em restaurante e direções",
  categorySlug: "vocabulario",
  accent: "#fb7185",
  status: "em-construcao",
  intro:
    "Frases práticas pro dia a dia: perguntar preço, pedir algo num restaurante e perguntar como chegar a um lugar.",
  sections: [
    {
      heading: "Frases úteis: preços, pedidos e direções",
      body: "Frases práticas para o dia a dia — clima, preços, pedir algo num restaurante e perguntar como chegar a um lugar.",
      expressions: [
        {
          phrase: "how do I get to Sobradinho?",
          translation: "como eu faço para chegar em Sobradinho?",
          explanation: "Pergunta para saber como chegar a um lugar.",
          example: "Excuse me, how do I get to Sobradinho from here?",
          exampleTranslation: "Com licença, como eu faço para chegar em Sobradinho a partir daqui?",
        },
        {
          phrase: "how much are these",
          translation: "quanto custam essas coisas?",
          example: "How much are these shoes?",
          exampleTranslation: "Quanto custam esses sapatos?",
        },
        {
          phrase: "how much is this?",
          translation: "quanto custa isso?",
          example: "How much is this jacket?",
          exampleTranslation: "Quanto custa essa jaqueta?",
        },
        {
          phrase: "it looks like it's gonna rain",
          translation: "parece que vai chover",
          example: "Take an umbrella, it looks like it's gonna rain.",
          exampleTranslation: "Leva um guarda-chuva, parece que vai chover.",
        },
        {
          phrase: "may I have a ... please",
          translation: "me dê um/uma ... por favor",
          explanation: "Pergunta para fazer em restaurantes.",
          example: "May I have a beer, please?",
          exampleTranslation: "Me dê uma cerveja, por favor.",
        },
        {
          phrase: "what is this",
          translation: "o que é isso?",
          example: "What is this? I've never seen it before.",
          exampleTranslation: "O que é isso? Nunca vi isso antes.",
        },
      ],
    },
  ],
  relatedSlugs: ["conversas-informais", "geral"],
};
