import { TopicData } from "@/lib/types/topic";

export const designingWebApisCap3: TopicData = {
  slug: "seguranca-de-api",
  title: "Capítulo 3 — Segurança de API",
  subtitle: "Autenticação, autorização, os problemas do Basic Authentication e o OAuth 2.0",
  categorySlug: "designing-web-apis",
  accent: "#2dd4bf",
  status: "em-construcao",
  intro:
    "Neste capítulo o autor fala sobre a parte de segurança das APIs, desde as práticas de segurança padrão contra ataques CSRF e XSS até algumas técnicas adicionais para tornar uma API mais segura.",
  sections: [
    {
      heading: "Autenticação x autorização",
      body: "O autor apresenta a distinção entre autenticação e autorização. De forma resumida: autenticação é o processo para verificar se você realmente é quem diz ser, enquanto autorização é garantir que você realmente possa realizar determinada ação. Por exemplo, se você tem permissão apenas para visualizar uma página, o certo é que você não possa editar ou deletar essa página — isso é autorização.",
    },
    {
      heading: "Basic Authentication",
      body: "O autor fala também sobre o método de autenticação básico que as empresas usavam antes, o Basic Authentication. Nele é passado um header Authorization com a palavra Basic e o texto usuario:senha codificado em base64, o que abre várias brechas de segurança.",
    },
    {
      heading: "As brechas do Basic Authentication",
      body: "Algumas das brechas que esse método abre:",
      table: {
        headers: ["Brecha", "Consequência"],
        rows: [
          [
            "Senha em base64",
            "É facilmente decodificada, tornando a senha pública para um hacker, o que por sua vez dá acesso total ao atacante",
          ],
          [
            "Senha armazenada em texto puro ou de forma recuperável",
            "Em caso de vazamento ou bug, entrega tudo",
          ],
          [
            "Não é possível cortar o acesso de um único app",
            "Só trocando a senha, o que por sua vez derruba todos os outros",
          ],
          [
            "O app recebe a conta inteira",
            "Não é possível limitar o acesso a certos recursos",
          ],
        ],
      },
    },
    {
      heading: "O fim do Basic Auth no Twitter",
      body: "O autor também conta que o Twitter abandonou o Basic Authentication em 2010.",
    },
    {
      heading: "OAuth 2.0: a analogia do app X e do app Y",
      body: "O autor dá o exemplo do Facebook e do TripAdvisor, e vou explicar da maneira que entendi com uma analogia. Imagine uma aplicação Y, uma aplicação X e você, o usuário. A aplicação X é onde você faz login, é onde ficam seus dados: ela é o provedor. Já a aplicação Y quer os seus dados (o que a aplicação Y vai fazer não é necessário nessa analogia, apenas que determinada aplicação deseja os seus dados). No livro, o X seria o Facebook e o Y, o TripAdvisor.",
    },
    {
      heading: "O registro do Y no X",
      body: "O primeiro passo que ocorre é uma conexão entre a aplicação Y e a aplicação X. O app Y se registra no app X, e o app X entrega a ele um client ID (uma identificação, que pode ser pública e visível) e um client secret (aqui seria mais uma senha, então privada, não visível como o client ID). Com isso, o app Y informa também uma URL de redirecionamento, para onde a aplicação X deve te retornar.",
    },
    {
      heading: "Continuar com X",
      body: "Aí você, usuário, acessa a aplicação Y e, em vez de fazer login lá, clica em algo como “Continuar com X” e é redirecionado para o seu provedor X, onde você tem sua conta e sempre faz login. Nessa URL de redirecionamento, o próprio app Y já vai informando ao app X:",
      table: {
        headers: ["O que o Y diz", "Parâmetro"],
        rows: [
          ["“Aqui é o app tal”", "client ID"],
          ["“Gostaria de acessar esses dados do usuário”", "scope"],
          ["“Devolve o usuário nessa rota depois do login”", "redirect URL"],
          ["“Anota aí esse código aleatório e me devolve junto na volta”", "state"],
        ],
      },
    },
    {
      heading: "O login e o authorization code",
      body: "Você faz login normalmente no X e permite que o Y acesse os dados solicitados. A senha vai só pro X, nunca pro Y. O X te redireciona de volta pro Y entregando um authorization code de uso único e devolvendo o mesmo state. Caso o state que voltou seja diferente do que o Y enviou, o Y descarta. Essa é uma forma de proteção contra ataques CSRF (Cross-Site Request Forgery, ou Falsificação de Solicitação Entre Sites).",
    },
    {
      heading: "Trocando o code pelo access token",
      body: "O servidor do Y manda pro servidor do X: “recebi esse authorization code, aqui está meu documento de apresentação (client ID) e minha senha (client secret)”. O X verifica se o code é válido, se ainda não foi usado e se o secret confere. Se tudo estiver certo, devolve o access token.",
    },
    {
      heading: "Usando o access token",
      body: "Sempre que o Y precisa de algo, ele envia o token pro X: “estou acessando em nome do usuário tal, aqui está o token”. O X verifica se o token é válido e se o scope permite aquele dado. Se puder, devolve. Se não, nega.",
    },
    {
      heading: "Resumo em 5 linhas",
      body: "O fluxo inteiro do OAuth 2.0:",
      table: {
        headers: ["Passo", "O que acontece"],
        rows: [
          ["1", "Y redireciona o usuário pro X (com client ID, scope e state)"],
          ["2", "Usuário faz login no X e autoriza"],
          ["3", "X redireciona de volta pro Y com um code"],
          ["4", "Y troca o code por um access token direto com o X, usando o client secret"],
          ["5", "Y usa o token pra acessar os dados do usuário no X"],
        ],
      },
    },
  ],
  relatedSlugs: ["paradigmas-de-api"],
};
