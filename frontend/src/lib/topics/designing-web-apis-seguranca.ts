import { TopicData } from "@/lib/types/topic";

export const designingWebApisCap3: TopicData = {
  slug: "seguranca-de-api",
  title: "Capítulo 3 — Segurança de API",
  subtitle: "Autenticação, autorização, os problemas do Basic Authentication, o OAuth 2.0, os scopes, a expiração e renovação de tokens, a revogação de acessos, as boas práticas de um servidor OAuth e a segurança de webhooks (tokens, assinaturas, Mutual TLS e thin payloads)",
  categorySlug: "designing-web-apis",
  accent: "#2dd4bf",
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
    {
      heading: "Scope: o limite de acesso",
      body: "O scope é basicamente o escopo daquilo que a aplicação Y pode fazer ou receber por parte da aplicação X, é basicamente um limite de acesso a dados do usuário. Se, por exemplo, o app precisa apenas de um nome e eu passo pra ele diversas informações, não é a melhor prática, é provavelmente desnecessário e em alguns casos até mesmo perigoso. Então o scope serve justamente para limitar isso, passar apenas o necessário e inclusive separar os scopes. Por exemplo, um scope para dados públicos e sem problemas de segurança e um scope apenas para dados sensíveis que não podem ser compartilhados abertamente.",
    },
    {
      heading: "Scopes sensíveis: Heroku e Twitter",
      body: "Quando um app pede esse scope sensível, o usuário precisa receber um aviso claro do que está sendo compartilhado, pra saber direitinho o que está liberando. O autor do livro cita de exemplo o Heroku, que fez isso com as variáveis de configuração, que guardam segredos como a conexão do banco, e cita o Twitter, que também fez o mesmo com as mensagens diretas, porque vários apps estavam lendo mensagens diretas sem precisar.",
    },
    {
      heading: "Scope colocado às pressas",
      body: "O autor fala de como muitas APIs são construídas sem se preocupar com os scopes e que, com o tempo, conforme a necessidade, começam a colocar de forma apressada, gerando várias complicações. Por exemplo: imagine que uma aplicação tem um scope bem aberto, com vários dados sendo transmitidos, aí o dono da aplicação decide limitar o scope. Como ele faz essa limitação correndo o risco de quebrar vários aplicativos que se acostumaram com o scope aberto? É esse tipo de problema que deve ser evitado.",
    },
    {
      heading: "Granular, mas sem exagero",
      body: "Muitas aplicações começam também apenas com scopes mais simples, como: scope de apenas leitura, scope de escrita, scope de leitura e escrita e assim por diante. A montagem de um scope deve ser sempre de acordo com o contexto e os casos de uso do aplicativo. Só que também não adianta sair criando scope pra tudo, porque scopes demais acabam confundindo tanto o usuário quanto o desenvolvedor, então tem que ter equilíbrio entre ser granular e ser simples.",
    },
    {
      heading: "O caso do Slack",
      body: "O autor cita também o caso do Slack, que no começo tinha scopes bem amplos: autorizar o scope de leitura dava acesso a tudo — mensagens, canais, reações, arquivos e por aí vai —, muito mais do que os apps precisavam. No fim de 2015 eles lançaram 27 scopes granulares, com leitura e escrita separadas pra cada tipo de recurso. Com isso os apps passaram a receber só o essencial pra funcionar.",
    },
    {
      heading: "Benefício: mais confiança, mais instalações",
      body: "Imagine que você vai acessar esse aplicativo Y e, na hora de habilitar as permissões, o app tá pedindo um monte de permissão pra diversas coisas. Você tem o hábito de estranhar e ficar se perguntando: “rapaz, pra que tudo isso, hein?”. Agora, se esse app tem limites de scope, diminui a quantidade de permissões, o que aumenta a confiança do usuário, convertendo dessa forma em mais instalações com menos entraves. Isso acontece porque o usuário vê na hora da autorização exatamente o que está concedendo, e quando o pedido é pequeno e faz sentido, ele confia e aceita.",
    },
    {
      heading: "O princípio do menor privilégio",
      body: "Assim cada aplicação recebe apenas o que é necessário para o seu funcionamento, nada além. Dessa forma protege mais o usuário e também o provedor da API. Geralmente chama-se essa prática de princípio do menor privilégio (least privilege).",
    },
    {
      heading: "As duas verificações do access token",
      body: "Outro ponto: o app, tendo o access_token em mãos, passa a colocar o token de acesso nas suas requisições, enviando de volta para a API, que por sua vez faz 2 verificações:",
      table: {
        headers: ["Verificação", "Como funciona"],
        rows: [
          ["1. O access_token é válido?", "Pra isso, a API compara o token recebido com o token que está guardado no banco de dados."],
          ["2. O token tem o scope que a ação exige?", "Por exemplo, postar uma mensagem exige um scope de escrita, e a API confere se o que o token carrega coincide com isso. O token pode ser válido, mas não ter permissão para uma determinada ação."],
        ],
      },
    },
    {
      heading: "401 ou 403",
      body: "Se qualquer uma das duas falhar, o servidor deve responder com um erro. Nós vimos essa explicação antes com autenticação e autorização: o servidor pode responder com um 401 para token inválido (não autenticado) e pode responder com 403 (não tem permissão), que é não autorizado. São coisas distintas. (Esse detalhe dos códigos 401 e 403 é um complemento meu, o livro não cita nesse trecho.)",
    },
    {
      heading: "O erro precisa dizer qual é o problema",
      body: "É importante isso estar explícito na API. Não pode um usuário estar fazendo uma ação e tomar um erro genérico sem saber qual o problema: “é erro de token ou de permissão?”. O código deve fornecer esse indício.",
    },
    {
      heading: "Os cabeçalhos de scope do GitHub e do Slack",
      body: "Pra ajudar nisso, o livro cita que muitas APIs, como GitHub e Slack, mandam na resposta dois cabeçalhos: o X-OAuth-Scopes, que mostra os scopes que o token tem, e o X-Accepted-OAuth-Scopes, que mostra os scopes que a ação exige. E quando falta scope, o Slack devolve um erro detalhado (missing_scope) dizendo o que era necessário (needed) e o que foi fornecido (provided), o que economiza muito tempo de quem está debugando.",
      code: `{
  "ok": false,
  "error": "missing_scope",
  "needed": "chat:write",
  "provided": "channels:read"
}`,
      language: "json",
    },
    {
      heading: "Expiração de token",
      body: "O livro cita que, além das APIs disponibilizarem os tokens de acesso, elas devem disponibilizar uma forma de renovar esse token, visto que, por segurança, um token de acesso não deve ficar disponível por muito tempo (algumas horas ou dias), para que, em casos de vazamento, os danos sejam reduzidos.",
    },
    {
      heading: "Refresh token",
      body: "Então, para evitar a necessidade de fazer login toda hora para renovar o token de acesso, usa-se o refresh token: a aplicação passa o client ID, o client secret e o refresh token e, com isso, consegue obter um novo access token. Lembrando que ter o refresh token sozinho não adianta de nada sem o client secret, que é a senha guardada, então o atacante teria que roubar tanto o refresh token quanto a senha para poder fazer alguma coisa.",
    },
    {
      heading: "Listar e revogar autorizações",
      body: "O livro fala que vários provedores montam uma página listando todos os aplicativos e suas devidas permissões habilitadas, com a possibilidade de revogar acesso (cancelar um acesso) pela própria interface. Assim, por exemplo, posso cancelar o meu acesso ao app Y através do meu provedor X (poderia ser o Google, por exemplo).",
    },
    {
      heading: "Revogação pela API",
      body: "Junto com isso, é uma boa prática oferecer também via API a capacidade de revogar access tokens e refresh tokens, pra que o desenvolvedor consiga revogar por código, em casos de vazamento de tokens, sem depender da interface.",
    },
    {
      heading: "10 boas práticas para um servidor OAuth 2.0",
      body: "Em seguida ele lista 10 boas práticas para quem está construindo um servidor OAuth 2.0:",
      table: {
        headers: ["#", "Boa prática"],
        rows: [
          ["1", "Ter suporte ao parâmetro state."],
          ["2", "Authorization codes de vida curta e de um único uso."],
          ["3", "Em casos de dados muito sensíveis, utilizar refresh token de uso único."],
          ["4", "Permitir que o desenvolvedor resete o client secret, pra que, se o secret e os refresh tokens vazarem, o app consiga cortar o atacante gerando um secret novo."],
          ["5", "Colocar scopes dedicados para informações sensíveis."],
          ["6", "Todos os endpoints em HTTPS, para uma segurança maior."],
          ["7", "Verificar a redirect URL para garantir que é uma URL registrada no app, evitando ataques. Se a URL que veio na requisição não bater com nenhuma das registradas, o servidor mostra um erro sem nem exibir a tela de autorização, pra que os segredos não sejam devolvidos pro endereço de um atacante."],
          ["8", "Proibir a tela de autorização em iframes através do uso do header X-Frame-Options, contra ataques de clickjacking."],
          ["9", "Manter o usuário informado: por exemplo, quando uma nova autorização é concedida, ele receber um email avisando."],
          ["10", "Proibir nomes enganosos. O livro cita que em 2017 um atacante usou o logo do Google num app chamado Google Docs e um milhão de contas caíram no phishing."],
        ],
      },
    },
    {
      heading: "A lição do Facebook",
      body: "O livro conta que, entre 2016 e 2018, o Facebook foi muito criticado porque desenvolvedores de apps de terceiros conseguiram minerar dados de clientes em grande escala. Tecnicamente estava tudo dentro das permissões da API e o usuário tinha autorizado, mas violava os termos de serviço da plataforma. Não foi traição de dentro do Facebook, foram apps de fora usando o acesso que receberam de forma abusiva.",
    },
    {
      heading: "O que o autor tira disso",
      body: "Os pontos que o autor tira desse caso:",
      table: {
        headers: ["Ponto", "O que significa"],
        rows: [
          ["Saber o que está aceitando", "O cliente precisa saber exatamente o que está aceitando. Scopes granulares ajudam, mas é um equilíbrio: se forem longos demais, o usuário acaba não lendo tudo, então o texto tem que ser claro e fácil de entender."],
          ["Monitorar os apps de terceiros", "A plataforma precisa monitorar os apps de terceiros e procurar violações dos termos de serviço, podendo desligar o app ou limitar o uso dele (rate limit)."],
          ["A confiança é com a plataforma", "O usuário autorizou, mas a confiança dele é com a plataforma, e não com o app de terceiros. No fim das contas, quem mais perde com a má reputação é a plataforma."],
        ],
        stackOnMobile: true,
      },
    },
    {
      heading: "Conclusão sobre as boas práticas",
      body: "Esse trecho é basicamente um checklist de como não virar manchete de vazamento kkkkkk.",
    },
    {
      heading: "Segurança de webhooks",
      body: "O autor do livro volta a falar sobre webhooks, agora voltado para segurança. Ele diz que a segurança dos webhooks é levemente diferente da segurança das APIs web, isso porque geralmente as URLs dos webhooks são acessíveis publicamente pela internet. Então fica a pergunta: como garantir que a requisição está vindo realmente do servidor certo e não de alguém fingindo ser o app confiável, fazendo request pro webhook?",
    },
    {
      heading: "Não existe um padrão único",
      body: "O autor também avisa que não existe um padrão único, como o OAuth, pra proteger webhooks, mas existem alguns padrões comuns que os provedores seguem. Vejamos.",
    },
    {
      heading: "Verification tokens",
      body: "O livro cita a verificação por tokens, que de forma simples consiste em um token de verificação emitido pelo provedor da API. Esse token é único pra cada aplicação, ou seja, é um segredo compartilhado entre o app e o provedor. O autor cita o Slack como exemplo: a cada requisição, o Slack envia o token de verificação, e a aplicação compara o que recebeu com o valor que ela guardou. Caso não bata, a aplicação ignora a requisição. Dessa forma, a aplicação consegue garantir que a requisição vem do Slack e não de uma aplicação maliciosa.",
    },
    {
      heading: "A fragilidade do verification token",
      body: "É fácil de implementar e verificar, no entanto é frágil pelo fato de o token ser enviado em texto puro em toda requisição, o que possibilita que atacantes o roubem e simulem várias requisições para esse webhook.",
    },
    {
      heading: "Request signing e webhook signatures",
      body: "Aqui a diferença pro verification token é o que viaja na requisição. No token, o próprio segredo viaja. Na assinatura, o segredo nunca viaja: o provedor usa o segredo junto com o corpo da requisição pra calcular um HMAC (hash-based message authentication code, ou código de autenticação de mensagem baseado em hash), e envia só o resultado desse cálculo num header.",
    },
    {
      heading: "O que é o HMAC",
      body: "De forma simples e resumida, o HMAC é o resultado de um cálculo que combina o corpo da requisição com o segredo compartilhado do webhook (signing secret). A aplicação faz o mesmo cálculo com o segredo que ela guardou e compara. Se o hash calculado bater com o recebido, libera. Se não bater, ignora.",
    },
    {
      heading: "O segredo não viaja",
      body: "Stripe e GitHub usam esse mecanismo para proteger seus webhooks. Como o segredo não viaja, interceptar a requisição não entrega a chave pro atacante.",
    },
    {
      heading: "Mutual Transport Layer Security",
      body: "Quando a gente se conecta a uma URL https://, o servidor envia um certificado dele para o cliente, e o cliente, antes de confiar na resposta, verifica a integridade desse certificado. Nesse caso é uma comunicação com TLS normal (TLS é o protocolo que cria a conexão criptografada, o “S” do HTTPS).",
    },
    {
      heading: "O certificado vai pros 2 lados",
      body: "No caso do Mutual Transport Layer Security, corta pros 2 lados: não é somente o servidor que envia o certificado e o cliente apenas valida antes de receber. É mútuo: o próprio cliente envia de volta um certificado também, e o servidor valida a autenticidade dele antes de confiar.",
    },
    {
      heading: "Antes mesmo de chegar no código",
      body: "Diferente do request signing que vimos anteriormente, que é feito dentro do próprio código, o Mutual TLS é implementado num nível mais baixo, antes mesmo de chegar no código. Lembrando que, no nosso caso dos webhooks, o cliente é o próprio provedor (Stripe, por exemplo) e o servidor é o seu app. Com essa medida garantimos segurança mesmo que o desenvolvedor da aplicação deixe a desejar na segurança.",
    },
    {
      heading: "Mais complexidade, mais segurança",
      body: "Aumenta um pouco mais a complexidade, mas aumenta a segurança. (Esse ponto é um complemento meu, não do livro.)",
    },
    {
      heading: "Onde o Mutual TLS aparece",
      body: "O autor do livro cita como exemplo aplicações business-to-business e o DocuSign, que é um provedor que oferece esse tipo de suporte, além de dizer que esse tipo de medida de segurança geralmente é muito útil para desenvolvedores corporativos.",
    },
    {
      heading: "As vulnerabilidades dos webhooks",
      body: "Primeiramente, o autor demonstra as vulnerabilidades de se utilizar webhooks: alguns métodos dependem do desenvolvedor fazer a coisa certa (verification tokens e assinaturas só protegem se o dev realmente fizer a verificação, e ninguém o obriga), além de existirem N formas de tentar alcançar segurança.",
    },
    {
      heading: "Thin payloads e API retrieval",
      body: "Depois, ele diz que uma ótima forma de segurança é limitar as informações no payload. Em vez de mandar o evento completo (full event), o webhook manda só um aviso mínimo de que algo mudou. Pra descobrir o que mudou, a aplicação precisa fazer uma requisição autenticada à API do provedor. Assim, mesmo que o dev não verifique o webhook, a informação real só chega por um canal autenticado.",
    },
    {
      heading: "O exemplo do Gmail",
      body: "Em seguida, ele cita o exemplo do Google e do Gmail: o Gmail permite que o app acompanhe mudanças na caixa de entrada via webhook. Quando algo muda, ele manda só o e-mail da conta e um ID da mudança, e o app chama a API history.list pra buscar os detalhes completos. Então o fluxo fica, por exemplo:",
      table: {
        headers: ["Passo", "O que acontece"],
        rows: [
          ["1", "O Gmail diz para o app: “a conta X mudou, viu? A mudança foi #tal_mudança.”"],
          ["2", "O app então recebe isso e manda uma requisição com o token OAuth: “opa, me passa os detalhes aí da #tal_mudança, por gentileza.”"],
          ["3", "O Gmail então vai lá e devolve os detalhes somente para quem está autenticado."],
        ],
      },
    },
    {
      heading: "Se vazar, vaza pouco",
      body: "Dessa forma, por mais que vaze alguma informação do webhook, continua sendo mínima: o app ainda precisa fazer outra requisição pra pegar os dados, e aí tem que estar autenticado.",
    },
    {
      heading: "Segurança x eficiência",
      body: "Aumenta a segurança, porém diminui a eficiência, porque aumenta a quantidade de requisições. Mas é aquilo: não podemos ter tudo ao mesmo tempo, sempre que amplificamos um ponto o outro pode diminuir, é o que o autor do livro cita lá no começo, no capítulo 1. (Esse ponto é um complemento meu, não do livro.)",
    },
    {
      heading: "Boas práticas de segurança em webhooks",
      body: "O autor do livro diz que forçar padrões de segurança em webhooks é complicado, mas que existem algumas boas práticas que vale ter em mente na hora de construir o seu webhook. São elas:",
      table: {
        headers: ["#", "Boa prática"],
        rows: [
          ["1", "Nunca envie dados sensíveis, como segredos ou senhas, no meio dos payloads. Sempre use requisições autenticadas."],
          ["2", "Caso esteja assinando webhooks, inclua o timestamp dentro do que é assinado, para evitar replay attacks."],
          ["3", "Permita que o desenvolvedor regenere (rotacione) os segredos compartilhados, para que, em casos de segredo comprometido, a aplicação consiga manter as requisições futuras seguras."],
          ["4", "Forneça aos desenvolvedores SDKs (software development kit) e códigos de exemplo que verifiquem a autenticidade das requisições e rejeitem as inválidas, para que os devs corram menos riscos de esquecer alguma configuração de segurança importante."],
        ],
      },
    },
    {
      heading: "Conclusão do capítulo 3",
      body: "A conclusão do autor é que segurança é difícil, mas deve ser pensada desde o início das APIs, porque depois que a API está em uso pode ser difícil fazer essas mudanças sem atrapalhar algum fluxo ou funcionamento.",
    },
    {
      heading: "Não crie seu próprio mecanismo de segurança",
      body: "O autor também fala sobre o perigo de criar seu próprio mecanismo de segurança: vale mais a pena usar algo testado por especialistas e hackers ao longo dos anos do que algo criado por você, que pode ser muito mais suscetível a erros e vulnerabilidades.",
    },
  ],
  relatedSlugs: ["o-que-e-uma-api", "paradigmas-de-api"],
};
