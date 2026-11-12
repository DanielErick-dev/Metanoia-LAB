import { TopicData } from "@/lib/types/topic";

export const inglesPresentPerfectContinuous: TopicData = {
  slug: "present-perfect-continuous",
  title: "Have been e has been",
  subtitle: "Present perfect continuous: o que começou no passado e continua até agora",
  categorySlug: "gramatica",
  accent: "#f472b6",
  status: "em-construcao",
  intro:
    "O have been / has been + verbo com -ing tem nome: present perfect continuous. Usamos sempre que algo começou no passado e se manteve constante até o momento presente. Aqui também aparece o irmão dele, o present perfect (have/has sem o been), pra ver a diferença.",
  sections: [
    {
      heading: "A estrutura",
      body: "O have vai com I, you, we e they; o has vai com he, she e it (terceira pessoa do singular). Depois vem o been e o verbo principal com -ing.",
      table: {
        headers: ["Forma", "Estrutura", "Exemplo"],
        rows: [
          ["Afirmativa", "sujeito + have/has been + verbo-ing", "I have been walking a lot."],
          ["Negativa", "sujeito + haven't/hasn't been + verbo-ing", "I haven't been reading a lot."],
          ["Pergunta", "have/has + sujeito + been + verbo-ing?", "Have you been reading a lot?"],
        ],
      },
    },
    {
      heading: "Afirmativa",
      body: "Usamos o have/has been sempre que algo começou no passado e se manteve constante até o momento presente. O I have geralmente vira I've (e he has vira he's, she has vira she's).",
      expressions: [
        {
          phrase: "I have been doing so many things.",
          translation: "Eu tenho feito muitas coisas.",
        },
        {
          phrase: "I've been walking a lot.",
          translation: "Eu tenho caminhado bastante.",
          explanation: "I have → I've.",
        },
      ],
    },
    {
      heading: "Com been e sem been",
      body: "Caso algo tenha ocorrido em algum momento do passado, mas não tenha se perpetuado até o momento presente, usamos apenas o have, sem o been, e o verbo vai pro particípio. Esse é o present perfect, que fala de algo que já aconteceu, sem dizer quando. Se você disser quando foi (yesterday, last week), o inglês pede o passado simples: I talked to Daniel yesterday. Então quem indica continuidade é o been junto com o verbo no -ing, como em 'eu tenho caminhado bastante'. O been sozinho não basta: I've been to Paris quer dizer 'eu já estive em Paris', e não é contínuo.",
      expressions: [
        {
          phrase: "I've talked to Daniel.",
          translation: "Eu já conversei com o Daniel.",
          explanation: "Present perfect: já aconteceu, sem momento definido, e não continua.",
        },
        {
          phrase: "I've been walking a lot.",
          translation: "Eu tenho caminhado bastante.",
          explanation: "Present perfect continuous: começou antes e continua.",
        },
      ],
    },
    {
      heading: "Pergunta",
      body: "Repare que o have (verbo auxiliar) foi para trás do sujeito: na frase afirmativa diz you have been, na pergunta inverte e fica have you been. Na terceira pessoa, o mesmo acontece com o has.",
      expressions: [
        {
          phrase: "What have you been doing?",
          translation: "O que você tem feito?",
        },
        {
          phrase: "Have you been reading a lot recently?",
          translation: "Você tem lido muito recentemente?",
        },
        {
          phrase: "Has your mom been cooking at home?",
          translation: "Sua mãe tem cozinhado em casa?",
          explanation: "Terceira pessoa → has.",
        },
      ],
    },
    {
      heading: "Negativa",
      body: "Na negativa, have not vira haven't, assim como has not vira hasn't, que é o mais comum.",
      expressions: [
        {
          phrase: "I haven't been reading a lot.",
          translation: "Eu não tenho lido muito.",
          explanation: "have not → haven't.",
        },
        {
          phrase: "My mom hasn't been cooking at home.",
          translation: "Minha mãe não tem cozinhado em casa.",
          explanation: "has not → hasn't.",
        },
      ],
    },
    {
      heading: "Foco na duração",
      body: "Resumindo, o have been foca na repetição de um evento que começou no passado e continua se perpetuando no presente: foca na duração. O passado se conecta com o presente de forma contínua. Por isso, em português, muitas vezes a tradução fica no presente ('estou esperando há uma hora').",
      expressions: [
        {
          phrase: "I've been waiting for you for one hour.",
          translation: "Eu estou esperando por você tem 1 hora.",
        },
      ],
    },
  ],
  relatedSlugs: ["if-only-superlativo", "verbos"],
};
