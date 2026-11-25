import { TopicData } from "@/lib/types/topic";

export const fastapiTestesPytest: TopicData = {
  slug: "testes-com-pytest",
  title: "Capítulo 6 — Testes com pytest",
  subtitle: "Instalando o pytest, organizando a pasta tests, o client como fixture no conftest.py, with e yield, pythonpath e .gitignore",
  categorySlug: "fastapi",
  accent: "#009688",
  status: "em-construcao",
  intro:
    "Agora que temos algo básico montado, precisamos garantir que tudo funciona não somente com testes manuais, mas com testes automatizados. Para isso usaremos o nosso querido pytest.",
  objectives: {
    style: "pytest",
    items: [
      "Instalar o pytest como dependência de desenvolvimento",
      "Organizar a pasta tests espelhando a estrutura do app",
      "Criar o client como fixture no conftest.py",
      "Entender o with e o yield dentro da fixture",
      "Configurar o pythonpath e rodar os testes",
    ],
  },
  sections: [
    {
      heading: "Instalando o pytest",
      body: "Para a instalação usamos --dev, porque o pytest é uma ferramenta de desenvolvimento e não de produção:",
      code: `uv add --dev pytest`,
      language: "bash",
    },
    {
      heading: "Lembrete: o httpx e o TestClient",
      body: "Se você instalou no começo apenas o fastapi, sem o standard, será necessário instalar também o httpx para poder usar o TestClient (confira na documentação abaixo). Mas se você seguiu o passo a passo daqui, pode prosseguir normalmente.",
      code: `uv add --dev httpx`,
      language: "bash",
      links: [
        {
          text: "Documentação do FastAPI — Testando",
          url: "https://fastapi.tiangolo.com/pt/tutorial/testing/",
        },
      ],
    },
    {
      heading: "A organização dos testes",
      body: "Primeiro, a organização dos nossos testes: criamos uma pasta tests na raiz do projeto e, dentro dela, espelhamos a estrutura exata do nosso app. Seguindo o nosso exemplo, a arquitetura dos testes poderia ficar assim:",
      code: `app/
├── main.py
└── routers/
    └── missions.py
tests/
├── conftest.py
└── routers/
    └── test_missions.py`,
      language: "text",
    },
    {
      heading: "O prefixo test_",
      body: "Lembrando: os arquivos e as funções de teste precisam começar com test_, porque é assim que o pytest os encontra sozinho.",
    },
    {
      heading: "conftest.py e fixtures",
      body: "O conftest.py é um arquivo especial que o pytest carrega automaticamente antes dos testes. Ele serve para evitar ficar repetindo código: quando temos algo que queremos utilizar em vários testes, em vez de reescrever manualmente, colocamos no conftest.py, e assim fica disponível para todos os testes da pasta, sem a necessidade de ficar importando. Dentro dele colocaremos o nosso client, por exemplo:",
      code: `import pytest
from fastapi.testclient import TestClient

from app.main import app

@pytest.fixture()
def client():
    with TestClient(app) as test_client:
        yield test_client`,
      language: "python",
    },
    {
      heading: "O que esse código faz",
      body: "Importamos o pytest, o TestClient (nosso cliente de teste) e o app principal do projeto (o mesmo que realmente roda no projeto, e não um novo). Em seguida criamos uma função client e a marcamos como uma fixture. Resumidamente, uma fixture é uma função especial que prepara um “estado” pronto e entrega para quem precisar, isto é: quando formos rodar os nossos outros testes, basta colocar o client como parâmetro e recebemos o retorno dessa função automaticamente. Para mais informações sobre fixtures, veja o material abaixo:",
      links: [
        {
          text: "Fixture: evitando repetição entre testes (guia de pytest)",
          url: "/programacao/backend/pytest#section-9",
        },
      ],
    },
    {
      heading: "with",
      body: "O with abre um recurso e garante que ele seja fechado no final, mesmo se der erro no meio. É tipo um try/finally pronto. Por exemplo, para abrir arquivos:",
      code: `with open("notas.txt") as arquivo:
    conteudo = arquivo.read()

# aqui o arquivo já foi fechado sozinho`,
      language: "python",
    },
    {
      heading: "O with no TestClient",
      body: "No nosso caso, o with TestClient(app) “liga” o app (roda o que ele tem de inicialização) e, no final, “desliga”. Hoje o nosso app não tem nada de inicialização, então ainda não faz diferença. Mas quando tivermos banco de dados (abrir a conexão ao ligar, fechar ao desligar), o with vai ser necessário, então já deixamos assim.",
    },
    {
      heading: "yield",
      body: "O yield parece um return, mas em vez de encerrar a função ele a pausa. Dentro de uma fixture funciona assim:",
      code: `@pytest.fixture()
def exemplo():
    print("ANTES do teste")   # preparação
    yield "valor"             # entrega "valor" pro teste e pausa aqui
    print("DEPOIS do teste")  # limpeza, roda quando o teste termina`,
      language: "python",
    },
    {
      heading: "Prepara, entrega e limpa",
      body: "Ou seja, tudo antes do yield prepara, o yield entrega e tudo depois limpa. Na nossa fixture, o “depois” é o with terminando e fechando o client. Se fosse return, a função acabaria ali, o with fecharia o client antes de o teste usá-lo, e não teria como limpar nada depois.",
    },
    {
      heading: "Configurando o pythonpath",
      body: "Antes de rodar, precisamos avisar o pytest de onde ficam os nossos imports. Sem isso ele não acha o app e dá ModuleNotFoundError: No module named 'app'. No pyproject.toml adicionamos o trecho abaixo, em que o '.' é a raiz do projeto, ou seja, o lugar onde está o nosso pyproject.toml:",
      code: `[tool.pytest.ini_options]
pythonpath = '.'`,
      language: "toml",
    },
    {
      heading: "Rodando os testes",
      body: "Para rodar os testes, pode usar uv run pytest. Com -v ele mostra o nome de cada teste e se passou ou falhou:",
      code: `uv run pytest
uv run pytest -v`,
      language: "bash",
    },
    {
      heading: ".gitignore",
      body: "Quando roda, o pytest cria a pasta .pytest_cache (com coisas como a lista de testes que falharam na última vez). Ela é gerada automaticamente e não deve ir para o git, então a adicionamos no .gitignore:",
      code: `.pytest_cache`,
      language: "text",
    },
  ],
  relatedSlugs: ["pytest", "organizacao-schemas-e-routers"],
};
