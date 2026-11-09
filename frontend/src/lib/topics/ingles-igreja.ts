import { TopicData } from "@/lib/types/topic";
import { pickVocabulary as pick } from "./vocabulary-pick";

export const inglesIgreja: TopicData = {
  slug: "igreja",
  title: "Igreja",
  subtitle: "Entre no culto e aprenda o inglês de quem prega, canta e serve",
  categorySlug: "vocabulario",
  accent: "#a78bfa",
  status: "em-construcao",
  scene: "church",
  intro:
    "Vocabulário ligado à igreja: quem prega, quem lidera, o que acontece no culto. Vou completando conforme aparecerem palavras novas.",
  sections: [
    {
      heading: "Pessoas",
      body: "Quem lidera, quem prega e quem participa.",
      vocabList: [
        {
          term: "pastor",
          translation: "pastor",
          example: "Our pastor is very kind.",
          exampleTranslation: "Nosso pastor é muito gentil.",
        },
        {
          term: "preacher",
          translation: "pregador",
          example: "The preacher spoke about faith.",
          exampleTranslation: "O pregador falou sobre fé.",
          more: [
            { label: "Origem", text: "preach + -er (quem faz)." },
            { label: "Uso", text: "Não precisa ser pastor." },
          ],
        },
        {
          term: "minister",
          translation: "ministro, pastor (em algumas igrejas)",
          example: "The minister welcomed everyone.",
          exampleTranslation: "O ministro deu as boas-vindas a todos.",
          more: [
            { label: "Outro sentido", text: "ministro de governo. O contexto diz qual.", example: "A government minister visited the hospital.", exampleTranslation: "Um ministro do governo visitou o hospital." },
          ],
        },
        {
          term: "church leader",
          translation: "líder da igreja",
          example: "A church leader meets with me every morning.",
          exampleTranslation: "Um líder da igreja se encontra comigo toda manhã.",
          more: [
            { label: "Uso", text: "Serve pra qualquer função de liderança, mesmo sem ser pastor." },
          ],
        },
        {
          term: "congregation",
          translation: "congregação, os membros da igreja",
          example: "The congregation sang together.",
          exampleTranslation: "A congregação cantou junta.",
        },
      ],
    },
    {
      heading: "A mensagem",
      body: "O que acontece no púlpito.",
      vocabList: [
        {
          term: "preach",
          translation: "pregar",
          example: "He preaches every Sunday.",
          exampleTranslation: "Ele prega todo domingo.",
          conjugation: { base: "preach", past: "preached", participle: "preached", irregular: false },
          more: [
            { label: "Exemplo", example: "I preached at church yesterday.", exampleTranslation: "Eu preguei na igreja ontem." },
            { label: "Expressão", text: "practice what you preach = fazer o que você ensina.", example: "You should practice what you preach.", exampleTranslation: "Você devia fazer o que ensina." },
          ],
        },
        {
          term: "preaching",
          translation: "pregação / pregando",
          example: "The preaching was powerful.",
          exampleTranslation: "A pregação foi poderosa.",
          more: [
            { label: "Forma", text: "Também é a forma -ing de preach (pregando).", example: "He is preaching right now.", exampleTranslation: "Ele tá pregando agora." },
          ],
        },
        {
          term: "sermon",
          translation: "sermão, mensagem pregada",
          example: "The sermon was about creation.",
          exampleTranslation: "O sermão foi sobre a criação.",
          more: [
            { label: "Uso", text: "Em inglês, sermon não tem tom negativo." },
            { label: "Diferença", text: "“dar um sermão” (bronca) é give someone a lecture.", example: "She gave me a lecture about being late.", exampleTranslation: "Ela me deu um sermão por causa do atraso." },
          ],
        },
      ],
    },
    {
      heading: "Cerimônias",
      body: "Momentos especiais.",
      vocabList: [
        {
          term: "ceremony",
          translation: "cerimônia",
          example: "The ceremony begins at noon.",
          exampleTranslation: "A cerimônia começa ao meio-dia.",
          more: [
            { label: "Expressão", text: "wedding ceremony = cerimônia de casamento.", example: "The wedding ceremony begins at noon.", exampleTranslation: "A cerimônia de casamento começa ao meio-dia." },
          ],
        },
        {
          term: "anointment",
          translation: "unção, ato de ungir",
          example: "The anointment of the new queen.",
          exampleTranslation: "A unção da nova rainha.",
          more: [
            { label: "Verbo", text: "anoint = ungir.", example: "They anointed the new queen.", exampleTranslation: "Eles ungiram a nova rainha." },
          ],
        },
      ],
    },
    {
      heading: "O lugar",
      body: "A igreja em si.",
      vocabList: [
        {
          term: "church",
          translation: "igreja",
          example: "We go to church every Sunday.",
          exampleTranslation: "A gente vai à igreja todo domingo.",
          more: [
            { label: "Expressão", text: "church leader = líder da igreja.", example: "A church leader meets with me every morning.", exampleTranslation: "Um líder da igreja se encontra comigo toda manhã." },
            { label: "Uso", text: "church leader serve pra qualquer função de liderança, mesmo sem ser pastor." },
          ],
        },
      ],
    },
    {
      heading: "O culto",
      body: "Palavras que aparecem em volta da igreja.",
      reusesVocabulary: true,
      vocabList: pick(["sing","welcome","anoint","faith","wedding","Sunday","leader"]),
    },
  ],
  relatedSlugs: ["verbos", "geral"],
};
