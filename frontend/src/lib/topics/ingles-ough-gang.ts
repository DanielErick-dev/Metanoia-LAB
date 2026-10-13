import { TopicData } from "@/lib/types/topic";

export const inglesOughGang: TopicData = {
  slug: "the-ough-gang",
  title: "The OUGH Gang",
  subtitle: "Through, though, thought, tough & cia — os suspeitos mais parecidos do inglês",
  categorySlug: "vocabulario",
  accent: "#facc15",
  status: "em-construcao",
  intro:
    "Through, throughout, thought, although, though, thorough e tough: sete palavras com quase a mesma cara, que vivem sendo confundidas. Cada uma tem sua ficha com pronúncia, significado e exemplos — e no final tem um interrogatório pra ver se você sabe quem é quem.",
  sections: [
    {
      heading: "The Lineup",
      body: "Sete suspeitos, quase o mesmo rosto. Tente lembrar o que cada um significa antes de abrir a ficha.",
      lineup: [
        {
          word: "through",
          meaning: "por meio de, através",
          details: ["Também pode ter o sentido de passar por algo."],
          informal: {
            word: "thru",
            note: "Ex.: drive-thru — thru é uma forma informal de falar through. Na expressão drive-thru traz o sentido de dirigir através do restaurante.",
          },
          examples: [
            {
              en: "I went through a really difficult time last year.",
              pt: "Eu passei por um momento difícil ano passado.",
            },
          ],
        },
        {
          word: "throughout",
          meaning: "inteiramente, por toda a parte",
          details: ["Traz o sentido de totalidade, de começo ao fim."],
          examples: [
            {
              en: "She was calm throughout her visit to the dentist.",
              pt: "Ela ficou calma durante toda sua visita no dentista.",
            },
          ],
        },
        {
          word: "thought",
          meaning: "pensar ou achar no passado",
          details: [
            "É exatamente o passado de think.",
            "Pode também se referir a ideias ou pensamentos.",
          ],
          forms: {
            label: "Outros exemplos que se repetem dessa mesma forma",
            pairs: [
              ["think", "thought"],
              ["buy", "bought"],
              ["bring", "brought"],
            ],
          },
        },
        {
          word: "although",
          meaning: "apesar de, mas, porém, embora, todavia, entretanto",
          details: ["É uma conjunção."],
          examples: [
            {
              en: "Although I was hungry, I didn't eat anything.",
              pt: "Embora eu estivesse com fome, eu não comi nada.",
            },
          ],
        },
        {
          word: "though",
          meaning: "mesmo sentido de although, mas no final da frase",
          informal: {
            word: "tho",
            note: "A versão informal de though, da mesma forma que o thru deriva de through.",
          },
          examples: [
            {
              en: "I'm busy today, we could meet tomorrow though.",
              pt: "Eu estou ocupado hoje, mas poderíamos nos encontrar amanhã.",
            },
          ],
        },
        {
          word: "thorough",
          meaning: "usado para descrever algo bem detalhado, minucioso, completo",
          examples: [
            {
              en: "thorough cleaning",
              pt: "limpeza detalhada (completa)",
            },
          ],
        },
        {
          word: "tough",
          meaning: "difícil, complicado",
          details: [
            "Pode ser usado para falar de objetos rígidos e resistentes também.",
            "Pode ser usado também para expressar dureza em uma pessoa, não no sentido negativo, mas no sentido positivo (aquela pessoa durona).",
          ],
          examples: [
            {
              en: "This is very tough.",
              pt: "Isso é muito difícil.",
            },
            {
              en: "Her father is very tough.",
              pt: "Seu pai é muito durão.",
            },
          ],
        },
      ],
    },
    {
      heading: "Interrogatório",
      body: "Complete a frase com o suspeito certo. A tradução é a sua pista.",
      interrogation: [
        {
          sentence: "I went ___ a really difficult time last year.",
          answer: "through",
          translation: "Eu passei por um momento difícil ano passado.",
        },
        {
          sentence: "She was calm ___ her visit to the dentist.",
          answer: "throughout",
          translation: "Ela ficou calma durante toda sua visita no dentista.",
        },
        {
          sentence: "think → ___",
          answer: "thought",
          translation: "o passado de think",
        },
        {
          sentence: "___ I was hungry, I didn't eat anything.",
          answer: "although",
          accept: ["though"],
          translation: "Embora eu estivesse com fome, eu não comi nada.",
        },
        {
          sentence: "I'm busy today, we could meet tomorrow ___.",
          answer: "though",
          translation: "Eu estou ocupado hoje, mas poderíamos nos encontrar amanhã.",
        },
        {
          sentence: "a ___ cleaning",
          answer: "thorough",
          translation: "uma limpeza detalhada (completa)",
        },
        {
          sentence: "Her father is very ___.",
          answer: "tough",
          translation: "Seu pai é muito durão.",
        },
      ],
    },
  ],
  relatedSlugs: ["verbos", "expressoes-girias"],
};
