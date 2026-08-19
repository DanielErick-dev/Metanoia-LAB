import { TopicData } from "@/lib/types/topic";

export const comentarioDanielIntroducao: TopicData = {
  slug: "introducao-epicuro",
  title: "Parte 1 — Introdução ao Problema do Mal",
  subtitle: "A formulação de Epicuro, as categorias do mal e os dois argumentos",
  categorySlug: "comentario-daniel",
  accent: "#94a3b8",
  status: "em-construcao",
  quote: {
    text: "É Deus capaz de impedir o mal, mas não deseja? Então é malévolo. É capaz e deseja? Então de onde vem o mal? Não é capaz nem deseja? Então por que chamá-lo de Deus?",
    source: "Atribuído a Epicuro (via Lactâncio)",
  },
  intro:
    "Este é o primeiro bloco de comentários pessoais sobre o problema do mal — uma introdução ao tema, cobrindo a formulação clássica de Epicuro, as categorias do mal e os dois principais argumentos, o lógico e o evidencial.",
  sections: [
    {
      heading: "A formulação de Epicuro",
      body: "Quando olhamos para o mundo em que vivemos, não podemos deixar de notar que coisas muito ruins acontecem — sejam esses males causados por agentes morais (pessoas) ou pela própria natureza (terremotos, acidentes naturais). Isso é, sem dúvida, uma realidade observável: o mal existe. Ao longo da história da humanidade, questionou-se a existência de um Deus bom simultaneamente à existência de grandes males — o que ficou conhecido como o problema do mal. Um filósofo chamado Epicuro é conhecido por ter iniciado uma formulação do problema do mal, o chamado 'teorema de Epicuro', que consiste basicamente em algumas premissas e algumas conclusões dedutivas e lógicas:",
      citation: {
        lines: [
          "Se Deus é onisciente, então ele sabe que o mal existe e sabe como acabar com o mal.",
          "Se Deus é onipotente, então ele tem capacidade de acabar com o mal.",
          "Se Deus é onibenevolente, então ele deseja acabar com o mal.",
          "Mas o mal existe.",
        ],
        source: "O teorema de Epicuro",
      },
    },
    {
      heading: "A conclusão do argumento",
      body: "A conclusão lógica a partir dessas premissas é que Deus não existe, ou então a perda de alguma dessas propriedades mencionadas. Vejamos dois exemplos de como isso poderia acontecer:",
      citation: {
        lines: [
          "Deus pode saber do mal e desejar o bem, mas não ter capacidade de acabar com ele — logo, ele não é onipotente.",
          "Deus pode saber do mal e ter capacidade de acabar com ele, mas não desejar fazê-lo — logo, esse Deus não é bom.",
        ],
      },
    },
    {
      heading: "Categorias do mal: moral e natural",
      body: "Ao tratarmos deste assunto tão complexo, é importante primeiro definirmos alguns termos iniciais. Vejamos, primeiramente, o que exatamente seria o mal e como podemos categorizá-lo. Mal moral: é o sofrimento causado intencionalmente por um agente moral, um agente livre — crueldades, violências e injustiças praticadas no mundo. Mal natural: sofrimento que não é causado por uma escolha humana, mas de forma natural, como doenças, tsunamis, terremotos etc.",
    },
    {
      heading: "Duas versões do argumento: lógico e evidencial",
      body: "As versões, de forma bem resumida, dos principais argumentos são: o argumento lógico do problema do mal diz que é logicamente impossível a existência simultânea de Deus e do mal. Já o argumento evidencial mostra que, dada a quantidade enorme de males e sofrimento observável no mundo, isso seria uma evidência extremamente forte contra a existência de Deus.",
    },
  ],
  relatedSlugs: ["problema-logico-livre-arbitrio", "traducao-tooley"],
};
