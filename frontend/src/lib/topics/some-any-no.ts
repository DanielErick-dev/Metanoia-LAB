import { TopicData } from "@/lib/types/topic";

export const someAnyNo: TopicData = {
  slug: "some-any-no",
  title: "Some, Any e No",
  subtitle: "Regras de uso e quando usar cada uma",
  categorySlug: "ingles",
  accent: "#f472b6",
  quizUrl: "/ingles/some-any-no-quiz",
  intro:
    "Some, any e no são três das palavras mais confusas pra quem está aprendendo inglês, porque a lógica de uso não segue exatamente o português. Aqui vai a regra completa, com os compostos (somebody, anything, nowhere etc.) e bastante exemplo.",
  sections: [
    {
      heading: "Regra geral",
      body: "Regra de ouro: o inglês usa apenas uma negação por frase. Diferente do português, que costuma negar duas vezes ('não tem nenhum'), o inglês nega só uma vez — ou no verbo (don't/doesn't + any) ou na própria palavra (no).",
      table: {
        headers: ["Palavra", "Usada em...", "Significado"],
        rows: [
          ["SOME", "Afirmativas / Pedidos e ofertas (mesmo sendo pergunta)", "algum, alguma, um pouco de"],
          ["ANY", "Afirmativas", "qualquer"],
          ["ANY", "Interrogativas", "algum(a)"],
          ["ANY", "Negativas", "nenhum(a)"],
          ["NO", "Negativas (substitui o 'not... any')", "nenhum(a)"],
        ],
      },
    },
    {
      heading: "Some — afirmativas, pedidos e ofertas",
      body: "Usado em frases afirmativas normalmente, e também em perguntas quando é um pedido ou uma oferta — porque nesses casos você já espera uma resposta positiva. Se a pergunta não for pedido nem oferta, usa-se any (mais genérico) — não some.",
      expressions: [
        {
          phrase: "I have some money.",
          translation: "Eu tenho um pouco de dinheiro.",
          explanation: "Afirmativo.",
        },
        {
          phrase: "Would you like some water?",
          translation: "Você gostaria de um pouco de água?",
          explanation: "Interrogativo (oferta).",
        },
        {
          phrase: "Can I have some coffee, please?",
          translation: "Posso tomar um pouco de café, por favor?",
          explanation: "Interrogativo (pedido).",
        },
      ],
    },
    {
      heading: "Any — interrogativas, negativas e 'qualquer' nas afirmativas",
      body: "Repara: em português diríamos 'ela não tem nenhum dinheiro' (duas negações). Em inglês, a negação já está no does not, então 'dinheiro algum' fica só com any.",
      expressions: [
        {
          phrase: "If you need any help, just call me.",
          translation: "Se você precisar de qualquer ajuda, é só me ligar.",
          explanation: "Afirmativo (= qualquer).",
        },
        {
          phrase: "This game is easy, any person can play.",
          translation: "Esse jogo é fácil, qualquer pessoa pode jogar.",
          explanation: "Afirmativo (= qualquer).",
        },
        {
          phrase: "Do you have any money?",
          translation: "Você tem algum dinheiro?",
          explanation: "Interrogativo (= algum).",
        },
        {
          phrase: "Are you allergic to any medicine?",
          translation: "Você é alérgico a algum medicamento?",
          explanation: "Interrogativo (= algum).",
        },
        {
          phrase: "She does not have any money.",
          translation: "Ela não tem dinheiro algum.",
          explanation: "Negativo (= nenhum).",
        },
        {
          phrase: "We don't have any pencils left.",
          translation: "Nós não temos nenhum lápis sobrando.",
          explanation: "Negativo (= nenhum).",
        },
        {
          phrase: "He does not have any friends.",
          translation: "Ele não tem nenhum amigo.",
          explanation: "Negativo (= nenhum).",
        },
      ],
    },
    {
      heading: "No — outra forma de negar",
      body: "O no já é negação por si só, então dispensa o don't/doesn't.",
      expressions: [
        {
          phrase: "He has no friends.",
          translation: "Ele não tem amigos.",
          explanation: "= He does not have any friends.",
        },
        {
          phrase: "We have no pencils left.",
          translation: "Não temos mais lápis.",
          explanation: "= We don't have any pencils left.",
        },
      ],
    },
    {
      heading: "Os compostos: some / any / no + body / thing / where",
      body: "A mesma lógica de cima se aplica aqui — só que agora especificando pessoa, coisa ou lugar.",
      table: {
        headers: ["", "Pessoa", "Coisa", "Lugar"],
        rows: [
          ["SOME", "somebody / someone", "something", "somewhere"],
          ["ANY", "anybody / anyone", "anything", "anywhere"],
          ["NO", "nobody / no one", "nothing", "nowhere"],
        ],
      },
    },
    {
      heading: "Some + composto (afirmativas / pedidos e ofertas)",
      body: "Mesma regra do some sozinho, agora com os compostos.",
      expressions: [
        {
          phrase: "Somebody called you.",
          translation: "Alguém ligou pra você.",
        },
        {
          phrase: "I want something to eat.",
          translation: "Eu quero alguma coisa pra comer.",
        },
        {
          phrase: "Let's go somewhere nice.",
          translation: "Vamos pra algum lugar legal.",
        },
        {
          phrase: "Would you like something to drink?",
          translation: "Você gostaria de algo pra beber?",
          explanation: "Oferta → usa some mesmo em pergunta.",
        },
      ],
    },
    {
      heading: "Any + composto (interrogativas / negativas / 'qualquer' nas afirmativas)",
      body: "Mesma regra do any sozinho, agora com os compostos.",
      expressions: [
        {
          phrase: "Is anybody home?",
          translation: "Tem alguém em casa?",
          explanation: "Interrogativo.",
        },
        {
          phrase: "Did you go anywhere yesterday?",
          translation: "Você foi a algum lugar ontem?",
          explanation: "Interrogativo.",
        },
        {
          phrase: "I don't want anything.",
          translation: "Eu não quero nada.",
          explanation: "Negativo.",
        },
        {
          phrase: "You can sit anywhere.",
          translation: "Você pode sentar em qualquer lugar.",
          explanation: "Afirmativo (= qualquer).",
        },
      ],
    },
    {
      heading: "No + composto (negação direta, sem don't/doesn't)",
      body: "Assim como no sozinho, o composto com no já carrega a negação.",
      expressions: [
        {
          phrase: "Nobody is here.",
          translation: "Ninguém está aqui.",
        },
        {
          phrase: "There's nothing in the fridge.",
          translation: "Não tem nada na geladeira.",
        },
        {
          phrase: "I'm going nowhere.",
          translation: "Eu não vou a lugar nenhum.",
        },
      ],
    },
    {
      heading: "Duas formas, mesmo resultado",
      body: "Assim como 'he has no friends' = 'he doesn't have any friends', o mesmo vale pros compostos.",
      expressions: [
        {
          phrase: "I don't know anybody here.",
          translation: "Eu não conheço ninguém aqui.",
          explanation: "= I know nobody here.",
        },
      ],
    },
    {
      heading: "Resumo rápido pra fixar",
      body: "SOME → afirmativa, ou pergunta que é pedido/oferta. ANY → pergunta genérica, negativa, ou afirmativa com sentido de 'qualquer'. NO → negativa direta, sem precisar de don't/doesn't. E, acima de tudo: uma única negação por frase em inglês — nunca duas.",
    },
  ],
  relatedSlugs: ["vocabulario-expressoes"],
};
