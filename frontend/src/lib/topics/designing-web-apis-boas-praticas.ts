import { TopicData } from "@/lib/types/topic";

export const designingWebApisCap4: TopicData = {
  slug: "boas-praticas-de-design",
  title: "Capítulo 4 — Boas práticas de design",
  subtitle: "Definir os casos de uso, não expor a arquitetura interna, não tentar resolver problemas demais de uma vez, cuidar da experiência do desenvolvedor e oferecer uma boa documentação",
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
    {
      heading: "A experiência do desenvolvedor",
      body: "Em seguida o autor fala sobre a importância da experiência que o desenvolvedor precisa ter. Da mesma forma que cuidamos da interface para que o usuário final tenha uma boa experiência, a nossa API também precisa oferecer uma boa experiência ao desenvolvedor, senão os desenvolvedores tenderão a nunca mais voltar a usar essa API. (Se for boa, é provável que além de voltarem ainda indiquem a API a outros devs. Isso é uma observação minha, o livro não fala disso.) Além disso, o autor fala que o dev precisa ser capaz de entender e usar a API rapidamente, isso porque muitos devs usam essas APIs para não precisar construir uma suíte secundária de produtos para sustentar o produto principal. Sendo assim, usam a API para ganhar tempo e, se ela for difícil ou ruim de usar, podem acabar se arrependendo da decisão.",
    },
    {
      heading: "Os devs sempre criam o inesperado",
      body: "O autor também comenta, citando Romain Huet (Stripe), que por mais cuidado que se tenha ao desenhar a API, os devs sempre criam produtos inesperados. Desenhar uma API é como desenhar um caminho inicial que possibilita aos devs ampliar de acordo com o que eles quiserem, sem ficar engessados demais.",
    },
    {
      heading: "Documentação",
      body: "A documentação ajuda muito a começar. Além das informações gerais, é bom ter os tutoriais ensinando a usar a sua API e também os famosos Getting Started, para quem está começando ou quer ver algo mais contextual. O autor fala também dos SDKs (os kits que vimos antes), que ajudam nas configurações iniciais.",
    },
    {
      heading: "Testar a API sem barreiras",
      body: "Além dessas informações, é sempre bom ter uma área onde o usuário possa interagir com a API sem a necessidade de fazer login. Caso não seja possível testar a API sem login, ou caso seja apenas por OAuth, o ideal é que o cadastro seja o mínimo possível para poder usar, ou, no caso do OAuth, talvez gerar um access token pela própria interface. Se ficar complicado demais, existe uma chance alta de os devs desistirem e optarem por outra API.",
    },
  ],
  relatedSlugs: ["seguranca-de-api", "paradigmas-de-api"],
};
