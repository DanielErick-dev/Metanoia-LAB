import { TopicData } from "@/lib/types/topic";

export const inglesConversasInformais: TopicData = {
  slug: "conversas-informais",
  title: "Conversas informais",
  subtitle: "Cumprimentos, despedidas e as perguntas mais comuns do dia a dia",
  categorySlug: "vocabulario",
  accent: "#fb7185",
  status: "em-construcao",
  intro:
    "Expressões pra puxar e encerrar uma conversa em contextos informais, e as perguntas mais comuns sobre o dia da pessoa — com as respostas possíveis.",
  sections: [
    {
      heading: "Cumprimentos, despedidas e conversas informais",
      body: "Expressões comuns pra puxar e encerrar uma conversa em contextos informais.",
      expressions: [
        {
          phrase: "did you get it",
          translation: "você entendeu?",
          example: "I explained it twice, did you get it?",
          exampleTranslation: "Eu expliquei duas vezes, você entendeu?",
        },
        {
          phrase: "have a nice day",
          translation: "tenha um bom dia",
          example: "Thanks for coming in, have a nice day!",
          exampleTranslation: "Obrigado por vir, tenha um bom dia!",
        },
        {
          phrase: "hey, what's up",
          translation: "eai, que que tá pegando",
          explanation: "Usada em contextos informais. A resposta costuma ser not much ou nothing much, que significa nada demais, tranquilo ou de boa.",
          example: "Hey, what's up? Long time no see!",
          exampleTranslation: "E aí, que que tá pegando? Quanto tempo!",
        },
        {
          phrase: "see you later",
          translation: "vejo você depois, até mais",
          example: "I'm heading out now, see you later!",
          exampleTranslation: "Já vou indo, até mais!",
        },
        {
          phrase: "take care",
          translation: "se cuida",
          example: "It was great talking to you, take care!",
          exampleTranslation: "Foi ótimo falar com você, se cuida!",
        },
        {
          phrase: "what have you been up to",
          translation: "como você está (de forma mais aprofundada)",
          explanation: "Pede uma resposta menos genérica. Pode responder, por exemplo, 'I'm really busy' (estou muito ocupado), e devolver a pergunta com 'and how about you' ou 'and what about you'.",
          example: "Hey! What have you been up to lately?",
          exampleTranslation: "Ei! O que você andou fazendo ultimamente?",
        },
      ],
    },
    {
      heading: "Perguntas e respostas do dia a dia",
      body: "Perguntas comuns sobre o dia e o que a pessoa está fazendo, com possíveis respostas.",
      expressions: [
        {
          phrase: "how's your day going",
          translation: "como está indo seu dia?",
          example: "Hi! How's your day going?",
          exampleTranslation: "Oi! Como está indo seu dia?",
        },
        {
          phrase: "how's your day going so far",
          translation: "como está indo seu dia até agora (por enquanto)",
          explanation: "Uma resposta possível seria: pretty good, thanks (tudo bem, obrigado); ou not so good (não tá muito bem); ou not bad (nada mal).",
          example: "Hey, how's your day going so far?",
          exampleTranslation: "Ei, como está indo seu dia até agora?",
        },
        {
          phrase: "what are you up to?",
          translation: "o que você está fazendo?",
          explanation: "É parecido com what are you doing. Uma resposta possível seria: nothing much, just paying some bills (nada demais, só pagando umas contas).",
          example: "What are you up to right now?",
          exampleTranslation: "O que você está fazendo agora?",
        },
        {
          phrase: "when did you get in",
          translation: "quando você chegou?",
          example: "When did you get in? I didn't hear you arrive.",
          exampleTranslation: "Quando você chegou? Não te ouvi chegar.",
        },
      ],
    },
  ],
  relatedSlugs: ["precos-pedidos-direcoes", "reacoes-interjeicoes"],
};
