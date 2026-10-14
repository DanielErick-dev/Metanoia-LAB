import { TopicData } from "@/lib/types/topic";

export const designingWebApisCap2: TopicData = {
  slug: "paradigmas-de-api",
  title: "Capítulo 2 — Paradigmas de API",
  subtitle: "REST, RPC e os demais paradigmas: como escolher o certo para a sua API",
  categorySlug: "designing-web-apis",
  accent: "#2dd4bf",
  status: "em-construcao",
  intro:
    "Este capítulo mostra a importância de escolher um bom paradigma para a API desde o começo, e apresenta os paradigmas mais populares.",
  sections: [
    {
      heading: "Escolher o paradigma desde o começo",
      body: "O livro mostra a importância de escolher um bom paradigma para a sua API desde o começo, e apresenta a seguinte definição de API:",
      citation: {
        lines: [
          "Interface que expõe os dados do backend para outras aplicações.",
        ],
        source: "Designing Web APIs (O'Reilly)",
      },
    },
    {
      heading: "Por que pensar nisso no início?",
      body: "O autor mostra que muitas vezes as empresas constroem suas APIs sem pensar em futuras funcionalidades. Depois que a API já está em uso, fica difícil mudá-la para acrescentar uma nova funcionalidade — às vezes quase impossível, dependendo da mudança. Isso demonstra a importância de pensar bem nos protocolos, padrões e boas práticas de desenvolvimento de uma API desde o começo.",
    },
    {
      heading: "Os paradigmas mais populares",
      body: "Alguns dos paradigmas mais populares são: REST, RPC, GraphQL, Webhooks e WebSockets.",
    },
    {
      heading: "APIs de request-response",
      body: "APIs desse tipo costumam expor uma interface através de um servidor web baseado em HTTP. Por meio de alguns endpoints definidos nessa API, os clientes fazem requisições HTTPS para esses endpoints (request) e recebem uma resposta (response), que geralmente vem em formato JSON ou XML.",
    },
    {
      heading: "REST (Representational State Transfer)",
      body: "É de longe a escolha mais popular no desenvolvimento de APIs, usada por empresas como Google, Stripe, Twitter (hoje X), GitHub e outras. O REST opera em torno de recursos (resources), entidades que podem ser identificadas na web. Assim, a API REST expõe esses dados como recursos, utilizando métodos HTTP para representar operações que chamamos de CRUD (Create, Read, Update e Delete).",
    },
    {
      heading: "Regras gerais do REST",
      body: "Algumas regras básicas definem como uma API REST deve ser desenhada:",
      table: {
        headers: ["Regra", "Exemplo"],
        rows: [
          ["Recursos fazem parte da URL", "/users"],
          [
            "Cada recurso geralmente tem duas URLs: uma para a coleção geral e outra para acessar um elemento específico",
            "/users (coleção geral de usuários) e /users/123 (um usuário específico)",
          ],
          [
            "Usamos substantivos no lugar de verbos nas URLs",
            "/getUserInfo/U123 → /users/U123",
          ],
        ],
      },
    },
    {
      heading: "Métodos HTTP e operações CRUD",
      body: "Os métodos HTTP indicam para o servidor qual ação será realizada. Geralmente usamos GET, POST, PUT, PATCH e DELETE.",
      table: {
        headers: ["Operação", "Método", "Uso"],
        rows: [
          ["Create", "POST", "Cria novos recursos."],
          [
            "Read",
            "GET",
            "Lê os recursos. É idempotente: não altera os dados do servidor, independente de quantas vezes a chamada se repita — por isso também permite fazer cache dessas chamadas.",
          ],
          ["Update", "PUT", "Substitui um recurso inteiro."],
          ["Update", "PATCH", "Faz alterações parciais de um recurso que já existe."],
          ["Delete", "DELETE", "Deleta um recurso existente."],
        ],
      },
    },
    {
      heading: "Códigos de resposta e formato",
      body: "As respostas vêm com um código que indica o resultado da requisição. No geral, as APIs REST retornam principalmente JSON; algumas ainda podem retornar XML, por causa de clientes que ainda usam esse formato.",
      table: {
        headers: ["Código", "Significado"],
        rows: [
          ["2xx", "Sucesso."],
          ["3xx", "Recurso movido."],
          ["4xx", "Erro do lado do cliente, como parâmetros enviados a mais ou excesso de requisições."],
          ["5xx", "Erro do lado do servidor."],
        ],
      },
    },
    {
      heading: "Recursos dentro de outro recurso",
      body: "Às vezes temos um recurso da API que só existe dentro de outro. Nesse caso, podemos formar uma URL lógica que indica um recurso dentro do outro, como o GitHub faz. Essa requisição cria uma issue:",
      code: "POST /repos/:owner/:repo/issues",
      language: "bash",
    },
    {
      heading: "Operações não CRUD",
      body: "Às vezes temos operações que não são exatamente um CRUD simples. Por exemplo, para arquivar um repositório, o GitHub envia dentro do corpo de um PATCH o campo archived com valor true:",
      code: `{ "archived": true }`,
      language: "json",
      examples: [
        {
          title: "Query direta na URL",
          body: "Outra forma é usar uma query direta na própria URL, como na busca de código do GitHub:",
          code: "GET /search/code?q=:query",
          language: "bash",
        },
      ],
    },
    {
      heading: "RPC (Remote Procedure Call)",
      body: "RPC é a chamada de procedimento remoto, que permite que um programa execute uma função de outro programa ou servidor. O RPC é mais focado em verbos ou ações, ao contrário do padrão REST, que foca mais em substantivos e na manipulação de recursos (alteração, leitura, criação e deleção). O RPC chama diretamente a função ou método pela própria URL.",
      examples: [
        {
          title: "Servidor (RPC)",
          body: "Exemplo de servidor em Python:",
          code: `from fastapi import FastAPI, Form

app = FastAPI()

@app.post("/repos.archive")
def archive_repo(owner: str = Form(...), repo: str = Form(...)):
    # lógica para arquivar o repositório
    return {"status": "archived", "repo": f"{owner}/{repo}"}`,
          language: "python",
        },
        {
          title: "Requisição (RPC)",
          body: "Montaríamos uma requisição assim: fazemos um POST diretamente para repos.archive, indicando que queremos arquivar o repositório.",
          code: `POST /repos.archive
Host: api.exemplo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer SEU_TOKEN_AQUI

owner=danieldev&repo=meu-projeto`,
          language: "bash",
        },
        {
          title: "Servidor (REST)",
          body: "Em uma requisição PATCH padrão REST, ficaria assim:",
          code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class RepoUpdate(BaseModel):
    archived: bool

@app.patch("/repos/{owner}/{repo}")
def update_repo(owner: str, repo: str, body: RepoUpdate):
    return {"status": "updated", "archived": body.archived}`,
          language: "python",
        },
        {
          title: "Requisição (REST)",
          body: "E a requisição:",
          code: `PATCH /repos/danieldev/meu-projeto
Content-Type: application/json

{"archived": true}`,
          language: "bash",
        },
      ],
    },
    {
      heading: "RPC x REST na prática",
      body: "Observe que passamos o owner e o nome do repositório, e no corpo da requisição PATCH passamos apenas o campo archived com valor true. Enquanto no RPC a ação archive está diretamente no nome do endpoint, no REST ela é apenas o valor de um campo, fazendo com que a ação fique mais escondida dentro do update.",
    },
    {
      heading: "GraphQL",
      body: "Outro paradigma é o GraphQL, que o autor define como uma linguagem de consulta para APIs. De forma resumida, o próprio cliente define a estrutura de resposta que deseja. Imagine que você faz uma requisição para uma API REST buscando um usuário: GET /users/123. Aí ela retorna todos os campos associados a esse usuário, mas você só queria 2, e a resposta vem com tudo caso você não filtre. No GraphQL, você busca exatamente aquilo que quer, montando a requisição da forma que espera receber. Exemplo, em que o retorno vem apenas com name e company, mesmo que existam outros dados a serem acessados:",
      code: `{
  user(login: "saurabhsahni") {
    name
    company
  }
}`,
      language: "graphql",
    },
    {
      heading: "Vantagens do GraphQL",
      body: "Segundo o livro, algumas vantagens são:",
      citation: {
        lines: [
          "Aninhamento de queries, diminuindo a quantidade de requisições ao servidor.",
          "Evita versionamento: através de logs dá para investigar quais campos se tornaram obsoletos e removê-los, enquanto no REST e no RPC isso seria mais complicado de saber.",
          "Por devolver exatamente aquilo que o cliente deseja, o payload se torna menor, comparado ao REST e ao RPC, que trazem dados que muitas vezes nem são utilizados.",
          "É uma linguagem fortemente tipada.",
          "Tem uma IDE no navegador própria, chamada GraphiQL, para escrever e testar queries.",
        ],
        source: "Vantagens segundo o livro",
      },
    },
    {
      heading: "Desvantagens do GraphQL",
      body: "Como nem tudo são flores, o GraphQL também tem desvantagens, como a dificuldade na otimização de queries e o esforço extra do servidor para interpretar queries complexas.",
    },
    {
      heading: "Comparativo entre os paradigmas",
      body: "Para facilitar, o autor faz uma tabela comparativa excelente (Tabela 2-2. Comparação dos paradigmas de API request–response):",
      table: {
        headers: ["", "REST", "RPC", "GraphQL"],
        rows: [
          [
            "O que é?",
            "Expõe dados como recursos e usa os métodos HTTP padrão para representar operações CRUD",
            "Expõe métodos de API baseados em ações — o cliente envia o nome do método e os argumentos",
            "Uma linguagem de consulta para APIs — o cliente define a estrutura da resposta",
          ],
          [
            "Exemplos de serviços",
            "Stripe, GitHub, Twitter (hoje X), Google",
            "Slack, Flickr",
            "Facebook, GitHub, Yelp",
          ],
          [
            "Exemplo de uso",
            "GET /users/<id>",
            "GET /users.get?id=<id>",
            `query ($id: String!) {
  user(login: $id) {
    name
    company
    createdAt
  }
}`,
          ],
          ["Verbos HTTP usados", "GET, POST, PUT, PATCH, DELETE", "GET, POST", "GET, POST"],
          [
            "Vantagens",
            "• Nomes de métodos, formato de argumentos e códigos de status padronizados\n• Usa os recursos do HTTP\n• Fácil de manter\n• Fácil de entender",
            "• Payloads leves\n• Alta performance",
            "• Economiza várias requisições ao servidor\n• Evita versionamento\n• Payload menor\n• Fortemente tipado\n• Introspecção embutida",
          ],
          [
            "Desvantagens",
            "• Payloads grandes\n• Múltiplas requisições HTTP\n• Descoberta da API é difícil",
            "• Padronização limitada\n• Pode levar a uma explosão de funções",
            "• Exige processamento extra para interpretar as queries\n• Otimização de performance no backend é difícil\n• Complicado demais para uma API simples",
          ],
          [
            "Quando usar?",
            "Para APIs que fazem operações do tipo CRUD",
            "Para APIs que expõem várias ações",
            "Quando você precisa de flexibilidade nas consultas; ótimo para oferecer essa flexibilidade mantendo a consistência",
          ],
        ],
        stackOnMobile: true,
        monoRows: [2],
      },
    },
    {
      heading: "Event-driven APIs",
      body: "Um outro padrão é conhecido como event-driven APIs. Imagine que temos um servidor e que precisamos ter em mãos as informações desse servidor em tempo real. Em vez de ficarmos mandando N requisições sem parar para o servidor, correndo o risco de várias requisições perdidas sem receber nada novo, a melhor forma é usando event-driven APIs. O livro cita 3 exemplos: webhooks, WebSockets e HTTP streaming.",
    },
    {
      heading: "Webhooks",
      body: "Imagine que agora o próprio servidor te avisa assim que ocorre algo: essa é a ideia do webhook. Você define uma URL para quando um determinado serviço ocorrer — por exemplo, um aluno foi criado — ele enviar uma mensagem para você (para a sua API, por exemplo): “Opa, recebi um aluno novo aqui, viu? Aqui estão os dados dele…”. Assim fica parecendo simples, mas o autor alerta sobre alguns problemas que nascem junto:",
      citation: {
        lines: [
          "Quantas vezes o webhook vai avisar caso ocorra uma falha? Como vai lidar com as retentativas?",
          "Para o webhook chegar na API, ele precisa de acesso. Como se defender de alguém que finge ser o seu webhook? Isso abre uma brecha de segurança.",
          "Se o app tiver firewall, como a resposta vai chegar no app?",
        ],
        source: "Problemas apontados pelo autor",
      },
    },
    {
      heading: "O outro lado do webhook",
      body: "O autor deixa claro aquilo que o webhook resolve, mas mostra também que, resolvendo um lado, surgem complexidades e novas responsabilidades do outro lado.",
    },
    {
      heading: "WebSockets",
      body: "Se antes o servidor avisava quando tinha algo novo, agora, usando WebSockets, é estabelecida uma chamada bidirecional, isto é, tanto um lado fala quanto o outro: uma comunicação entre ambos, tanto de servidor para navegador quanto de servidor para servidor. Funcionam na porta 80 ou 443, então isso ajuda muito na questão do firewall, que era um empecilho no uso de webhooks. A sua desvantagem é que é necessário ter uma conexão estável para poder manter a comunicação viva a todo instante, e, em termos de escalabilidade, pode ficar difícil manter milhares de conexões simultaneamente.",
    },
    {
      heading: "HTTP streaming",
      body: "O HTTP streaming eu diria que é um primo do WebSockets, com a diferença de que o cliente pede uma única vez para o servidor, e o servidor vai enviando a resposta em pedaços, aos poucos. Então apenas o servidor fica “falando” dentro dessa comunicação.",
    },
    {
      heading: "Como escolher o paradigma",
      body: "Na prática, o paradigma que vamos escolher depende da complexidade da nossa API. Se nossa API for 90% CRUD, por exemplo, um padrão REST pode ser a melhor escolha. Mas se o que estamos desenvolvendo foge muito do CRUD, então talvez o REST não seja a melhor escolha. Da mesma forma, se precisamos manter uma conexão ativa o tempo inteiro, WebSockets pode ser melhor; mas se envolve mobile e não há a necessidade de conexão ativa a todo momento, então um webhook pode ser melhor. Cada caso é um caso a ser avaliado, e em alguns casos pode haver até mais de um paradigma junto, de acordo com o problema.",
    },
  ],
  relatedSlugs: ["o-que-e-uma-api"],
};
