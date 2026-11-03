import { TopicData } from "@/lib/types/topic";

export const designingWebApisCap4: TopicData = {
  slug: "boas-praticas-de-design",
  title: "Capítulo 4 — Boas práticas de design",
  subtitle: "Definir os casos de uso, conferir se os desenvolvedores conseguem cumpri-los, não expor a arquitetura interna e não tentar resolver problemas demais de uma vez",
  categorySlug: "designing-web-apis",
  accent: "#2dd4bf",
  status: "em-construcao",
  intro:
    "No capítulo 4 o autor vai falar sobre boas práticas de desenvolvimento de APIs.",
  sections: [
    {
      heading: "As perguntas que definem a API",
      body: "No início do capítulo ele fala sobre algumas dessas práticas, como levantar perguntas como: “quais tarefas os desenvolvedores que usam a API devem conseguir fazer?” ou “que tipos de apps eles devem conseguir construir?”. A resposta é diferente para cada API específica. Para algumas empresas pode ser algo simples como: “o desenvolvedor deve conseguir cobrar o cartão de crédito dos clientes com facilidade, só isso”. Para outras pode ser algo muito mais complexo, envolvendo gerenciamento de milhares de usuários, pagamentos, transações financeiras etc.",
    },
    {
      heading: "Casos de uso",
      body: "Com essas perguntas e respostas definimos corretamente os casos de uso da nossa API. Depois de defini-los, é crucial conferir se os desenvolvedores realmente conseguem fazer o que queremos usando a API: se uma API é responsável por fazer um pagamento, então ela deve conseguir fazer esse pagamento com sucesso.",
    },
    {
      heading: "Não desenhe a partir da arquitetura interna",
      body: "O autor também alerta para um erro comum: desenhar a API a partir da arquitetura interna da aplicação, o que vaza detalhes de implementação, confunde os desenvolvedores de fora e piora a experiência deles. O foco deve ser a experiência de quem usa a API, e não expor a infraestrutura interna da empresa.",
    },
    {
      heading: "Cuidado com os “e se...”",
      body: "Outro cuidado é com os “e se...”: na fase de brainstorm eles ajudam, mas podem desviar o design por tentar resolver problemas demais de uma vez. Por isso é melhor escolher um fluxo ou caso de uso específico, focar nele e depois testar se funciona para os usuários.",
    },
    {
      heading: "Fazer uma coisa muito bem",
      body: "Por fim, o autor relata um comentário de um especialista do Google (Ido Green), que diz que a API deve permitir fazer uma coisa muito bem e deixar claro exatamente aquilo que ela não faz, reforçando o que foi citado anteriormente.",
    },
  ],
  relatedSlugs: ["seguranca-de-api", "paradigmas-de-api"],
};
