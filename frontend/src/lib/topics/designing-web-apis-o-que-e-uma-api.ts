import { TopicData } from "@/lib/types/topic";

export const designingWebApisCap1: TopicData = {
  slug: "o-que-e-uma-api",
  title: "Capítulo 1 — O que é uma API?",
  subtitle: "Definição, motivação, público-alvo e o que faz uma API excelente",
  categorySlug: "designing-web-apis",
  accent: "#2dd4bf",
  intro:
    "O capítulo 1 começa definindo o que é uma API, por que ela existe, pra quem ela é pensada e o que caracteriza uma API excelente.",
  sections: [
    {
      heading: "O que é uma API?",
      body: "O autor inicia o capítulo explicando a definição de API. Segundo ele, a API é construída pensando em ser entendida tanto por outros programas quanto, principalmente, por pessoas — sua construção não pode ser feita de qualquer forma, precisa levar em conta o modelo de negócio, o público-alvo, as funcionalidades e os eventuais bugs que podem ocorrer.",
      citation: {
        lines: [
          "Uma API é a interface que um programa de software apresenta a outros programas, a humanos e, no caso de APIs web, ao mundo via internet.",
        ],
        source: "Designing Web APIs (O'Reilly)",
      },
    },
    {
      heading: "Por que usar uma API?",
      body: "Essas APIs existem para que as pessoas não precisem ficar toda hora criando algo novo — uma API é construída e nós a reutilizamos em nossos próprios programas e sistemas. Por exemplo, a API do Google Maps: em vez de você criar uma do zero, você usa uma pronta e adapta o que for necessário pro seu produto específico.",
    },
    {
      heading: "Para quem é a API?",
      body: "O livro explica que podemos ter diversos destinatários pra nossa API: ela pode ser de uso interno ou externo — isto é, pode começar apenas com os desenvolvedores de uma empresa pra só depois ser disponibilizada pro lado de fora, ou já nascer voltada diretamente ao público geral. Isso importa na hora de criar a API, porque mudar regras de negócio depois dela já pronta fica bem mais complicado. O objetivo da criação de uma API também pode variar bastante: pode ser pra melhorar algum problema interno da empresa, pra integração, ou pra gerar lucro direto, como assinaturas. Cada caso deve ser pensado individualmente, e cada dinâmica de construção tem suas vantagens e desvantagens.",
      table: {
        headers: ["Empresa", "Abordagem da API"],
        rows: [
          [
            "Slack",
            "Começou em uso interno, garantindo que os próprios clientes conseguissem usá-la, e foi expandindo até integrar com outros softwares e virar plataforma pra outros desenvolvedores.",
          ],
          [
            "GitHub",
            "Foi desenhada desde o início pensando no público externo, sem precisar se adaptar depois de pronta.",
          ],
          [
            "Stripe",
            "A API é o próprio produto — um processador de pagamentos — e não parte de algo maior, podendo ser usada por públicos internos e externos.",
          ],
        ],
      },
    },
    {
      heading: "O que seria uma API excelente?",
      body: "Uma resposta básica, mas precisa, seria: depende se a API cumpre bem o que se propõe a fazer. Chris Messina, da Uber, comenta que mesmo uma API confusa, inconsistente ou mal documentada ainda vale a pena ser usada se ela der acesso a algo único — uma funcionalidade complexa que só ela oferece, ou um dado exclusivo. Assim, o valor que uma API oferece pode compensar seus problemas de qualidade, mas, de forma geral, uma boa API equilibra estas características (é bem provável que, dependendo da intenção da API, algum ponto pese mais que os outros):",
      citation: {
        lines: [
          "Clareza.",
          "Flexibilidade — capacidade de se adaptar quando necessário.",
          "Poder — a API precisa ser completa no que se propõe a fazer.",
          "Hackability — facilidade de explorar a API, sem que ela seja um mistério.",
          "Documentação — essencial pro entendimento da própria API.",
          "Usabilidade.",
          "Escalabilidade.",
          "Performance.",
        ],
        source: "Características de uma API excelente, segundo o livro",
      },
    },
    {
      heading: "API e o tempo",
      body: "Uma API precisa ser capaz de resistir ao tempo, se adaptar quando necessário e evoluir conforme a necessidade. Em empresas muito grandes, as mudanças tendem a ser mais lentas; já em startups, elas podem ser bem mais voláteis. Assim termina o resumo do capítulo 1 — nos próximos capítulos, o autor fala sobre os paradigmas de design de uma API.",
    },
  ],
  relatedSlugs: [],
};
