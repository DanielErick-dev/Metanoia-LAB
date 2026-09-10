import { TopicData } from "@/lib/types/topic";

export const inglesConversasInformais: TopicData = {
  slug: "conversas-informais",
  title: "Conversas informais",
  subtitle: "Cumprimentos, despedidas e as perguntas mais comuns do dia a dia",
  categorySlug: "ingles",
  accent: "#f472b6",
  status: "em-construcao",
  intro:
    "Expressões pra puxar e encerrar uma conversa em contextos informais, e as perguntas mais comuns sobre o dia da pessoa — com as respostas possíveis.",
  sections: [
    {
      heading: "Cumprimentos, despedidas e conversas informais",
      body: "Expressões comuns pra puxar e encerrar uma conversa em contextos informais.",
      expressions: [
        {
          phrase: "hey, what's up",
          translation: "eai, que que tá pegando",
          explanation: "Usada em contextos informais. A resposta costuma ser not much ou nothing much, que significa nada demais, tranquilo ou de boa.",
        },
        {
          phrase: "what have you been up to",
          translation: "como você está (de forma mais aprofundada)",
          explanation: "Pede uma resposta menos genérica. Pode responder, por exemplo, 'I'm really busy' (estou muito ocupado), e devolver a pergunta com 'and how about you' ou 'and what about you'.",
        },
        {
          phrase: "see you later",
          translation: "vejo você depois, até mais",
        },
        {
          phrase: "take care",
          translation: "se cuida",
        },
        {
          phrase: "have a nice day",
          translation: "tenha um bom dia",
        },
        {
          phrase: "did you get it",
          translation: "você entendeu?",
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
        },
        {
          phrase: "how's your day going so far",
          translation: "como está indo seu dia até agora (por enquanto)",
          explanation: "Uma resposta possível seria: pretty good, thanks (tudo bem, obrigado); ou not so good (não tá muito bem); ou not bad (nada mal).",
        },
        {
          phrase: "when did you get in",
          translation: "quando você chegou?",
        },
        {
          phrase: "what are you up to?",
          translation: "o que você está fazendo?",
          explanation: "É parecido com what are you doing. Uma resposta possível seria: nothing much, just paying some bills (nada demais, só pagando umas contas).",
        },
      ],
    },
  ],
  relatedSlugs: ["precos-pedidos-direcoes", "reacoes-interjeicoes"],
};
