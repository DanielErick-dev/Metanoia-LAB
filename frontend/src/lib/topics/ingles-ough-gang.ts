import { TopicData } from "@/lib/types/topic";

export const inglesOughGang: TopicData = {
  slug: "the-ough-gang",
  title: "The OUGH Gang",
  subtitle: "Through, though, thought, tough & cia — os suspeitos mais parecidos do inglês",
  categorySlug: "vocabulario",
  accent: "#facc15",
  status: "em-construcao",
  intro:
    "Through, throughout, thought, although, though, thorough e tough: sete palavras com quase a mesma cara, que vivem sendo confundidas. Primeiro você conhece cada suspeito pela ficha, depois coloca os parecidos frente a frente na acareação e, no final, encara o interrogatório pra ver se sabe quem é quem.",
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
      heading: "Acareação",
      body: "Acareação é quando a polícia coloca dois suspeitos frente a frente pra ver a diferença entre eles. Aqui é igual: os parecidos lado a lado, e o que entrega cada um é o contexto da frase.",
      confrontation: [
        {
          title: "A família through",
          suspects: [
            {
              word: "through",
              context: "Passar por algo, atravessar. Tem movimento: entra de um lado e sai do outro.",
              example: {
                en: "I went through a really difficult time last year.",
                pt: "Eu passei por um momento difícil ano passado.",
              },
            },
            {
              word: "throughout",
              context: "Durante todo / por toda a parte. Fala de tempo ou espaço do começo ao fim.",
              example: {
                en: "She was calm throughout her visit to the dentist.",
                pt: "Ela ficou calma durante toda sua visita no dentista.",
              },
            },
          ],
          hook: "Throughout é literalmente through + out: atravessar até sair do outro lado. Por isso é o \"do começo ao fim\". Pensa no drive-thru: você atravessa o restaurante inteiro — throughout é isso esticado pelo tempo todo.",
        },
        {
          title: "Os gêmeos de cara",
          suspects: [
            {
              word: "though",
              context: "Contraste: mas, embora. Aparece ligando ideias, geralmente no fim da frase.",
              example: {
                en: "I'm busy today, we could meet tomorrow though.",
                pt: "Eu estou ocupado hoje, mas poderíamos nos encontrar amanhã.",
              },
            },
            {
              word: "through",
              context: "Movimento: através de, passar por. Vem antes do lugar ou da situação atravessada.",
              example: {
                en: "I went through a really difficult time last year.",
                pt: "Eu passei por um momento difícil ano passado.",
              },
            },
            {
              word: "thorough",
              context: "Qualidade: completo, minucioso. Descreve algo, então vem colado num substantivo.",
              example: {
                en: "thorough cleaning",
                pt: "limpeza detalhada (completa)",
              },
            },
          ],
          hook: "Thorough é through com um \"o\" a mais — e as duas palavras têm a mesma origem. Uma limpeza thorough é a que passa por tudo, sem pular nenhum canto.",
        },
        {
          title: "Os dois embora",
          suspects: [
            {
              word: "although",
              context: "Embora. Abre a frase, antes da ideia que vai ser contrariada.",
              example: {
                en: "Although I was hungry, I didn't eat anything.",
                pt: "Embora eu estivesse com fome, eu não comi nada.",
              },
            },
            {
              word: "though",
              context: "Mesmo sentido, mas no fim da frase. Também pode abrir a frase como although.",
              example: {
                en: "I'm busy today, we could meet tomorrow though.",
                pt: "Eu estou ocupado hoje, mas poderíamos nos encontrar amanhã.",
              },
            },
          ],
          hook: "Although é o irmão mais velho (all + though): chega primeiro e abre a frase. Though é o caçula que fecha a frase. No final da frase só cabe though — although nunca.",
        },
        {
          title: "O T de Think",
          suspects: [
            {
              word: "thought",
              context: "Passado de think (pensei, achei) ou um pensamento, uma ideia.",
              example: {
                en: "I thought you were busy.",
                pt: "Eu achei que você estava ocupado.",
              },
            },
            {
              word: "though",
              context: "Contraste: mas, embora. Não tem nada a ver com pensar.",
              example: {
                en: "I'm busy today, we could meet tomorrow though.",
                pt: "Eu estou ocupado hoje, mas poderíamos nos encontrar amanhã.",
              },
            },
          ],
          hook: "Thought termina com T — o T de Think. Se a frase fala de pensar ou achar no passado, é ele. A mesma família: think → thought, buy → bought, bring → brought.",
        },
        {
          title: "O durão",
          suspects: [
            {
              word: "tough",
              context: "Difícil, duro, resistente. É uma característica, então aparece depois de is / very.",
              example: {
                en: "Her father is very tough.",
                pt: "Seu pai é muito durão.",
              },
            },
            {
              word: "though",
              context: "Contraste: mas, embora. Nunca vem depois de very.",
              example: {
                en: "I'm busy today, we could meet tomorrow though.",
                pt: "Eu estou ocupado hoje, mas poderíamos nos encontrar amanhã.",
              },
            },
          ],
          hook: "Tough termina com som de F — de Forte. Se a frase descreve algo ou alguém como difícil ou durão (very ___), é o tough.",
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
          sentence: "I ___ you were busy.",
          answer: "thought",
          translation: "Eu achei que você estava ocupado.",
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
