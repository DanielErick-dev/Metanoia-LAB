import { TopicData } from "@/lib/types/topic";

export const fastapiTestesPytest: TopicData = {
  slug: "testes-com-pytest",
  title: "Capítulo 6 — Testes com pytest",
  subtitle: "Instalando o pytest, o client como fixture no conftest.py, with e yield, os primeiros testes das missões, fixtures com dados prontos, o isolamento com autouse e a cobertura de todas as rotas",
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
      "Escrever os primeiros testes das rotas de missões",
      "Validar o status code e o conteúdo com response.json()",
      "Criar uma fixture com missões prontas",
      "Isolar os testes com uma fixture autouse",
      "Cobrir todas as rotas, incluindo os casos de erro",
      "Organizar os testes para quem vai ler depois",
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
    {
      heading: "O primeiro teste",
      body: "Agora que estamos com os testes prontos, vamos fazer um teste simples para ver se está tudo funcionando. Seguindo a estrutura do nosso app, criamos dentro da pasta tests o arquivo routers/test_missions.py (não esqueça que precisa começar com test_ e ficar no plural, igual ao missions.py):",
      code: `def test_response_mission(client):
    response = client.get("/missions/")
    assert response.status_code == 200`,
      language: "python",
    },
    {
      heading: "O client chegando por parâmetro",
      body: "Lembra do client (a fixture) que eu falei? Aqui está: recebemos ele por parâmetro, e faremos isso com todos os outros testes também. Usamos ele para fazer uma requisição GET diretamente para /missions/. O esperado é retornar as missões disponíveis e o status code 200. Por ser o primeiro teste, o mais simples, não verificamos o conteúdo da resposta, só se o status code é 200. Agora rodamos para ver se está funcionando:",
      code: `uv run pytest -v`,
      language: "bash",
    },
    {
      heading: "O resultado",
      body: "O resultado será algo como:",
      code: `============================= test session starts ==============================
platform linux -- Python 3.14.3, pytest-9.2.0, pluggy-1.7.0 -- /home/dan/projects/project_fastapi/novo_projet_fastapi/.venv/bin/python3
cachedir: .pytest_cache
rootdir: /home/dan/projects/project_fastapi/novo_projet_fastapi
configfile: pyproject.toml
plugins: anyio-4.15.1
collected 1 item

tests/routers/test_missions.py::test_response_mission PASSED             [100%]

============================== 1 passed in 0.01s ===============================`,
      language: "text",
    },
    {
      heading: "Validando o conteúdo da resposta",
      body: "Mas fica a pergunta: como validar o conteúdo de verdade? Esse é o próximo passo:",
      code: `def test_create_mission(client):
    response = client.post(
        "/missions/",
        json={"title": "Missão Escarlate", "reward": 2, "difficulty": 3}
    )
    assert response.status_code == 201
    assert response.json() == {
        "id": 1,
        "title": "Missão Escarlate",
        "reward": 2,
        "difficulty": 3
    }`,
      language: "python",
    },
    {
      heading: "O POST e o json=",
      body: "Observe que dessa vez fizemos uma requisição POST criando uma nova missão. Para isso passamos o caminho /missions/ junto com o json=, que transforma o dicionário Python em JSON e manda no corpo da requisição, como o front faria. Os campos precisam seguir o schema CreateMission (o difficulty tem default, então poderia ficar de fora; campos extras são ignorados). Se passarmos valores errados, o teste quebra, porque a validação do Pydantic entra em ação: a API devolve 422 em vez de 201 e o assert falha.",
    },
    {
      heading: "Comparando com response.json()",
      body: "Mandamos essa Missão Escarlate de exemplo, com recompensa e dificuldade, e verificamos a resposta 201 e o conteúdo dela. A resposta tem que trazer os mesmos dados que mandamos, junto com o ID automático (lembra do contador?). O response.json() é um método, então leva parênteses: ele converte o corpo da resposta de volta para dicionário Python, e aí dá para comparar com ==. Um detalhe: como o reward é float no schema, a API devolve 2.0, e não 2. Mesmo assim o teste passa, porque no Python 2 == 2.0 é True.",
    },
    {
      heading: "Rodando só um teste",
      body: "Para rodar só esse teste, passamos o caminho do arquivo, dois pontos duas vezes e o nome da função:",
      code: `uv run pytest -v tests/routers/test_missions.py::test_create_mission`,
      language: "bash",
    },
    {
      heading: "Só um passou",
      body: "Repare que agora ele coletou só 1 item, o que pedimos:",
      code: `collected 1 item

tests/routers/test_missions.py::test_create_mission PASSED               [100%]

============================== 1 passed in 0.01s ===============================`,
      language: "text",
    },
    {
      heading: "Testes que precisam de dados prontos",
      body: "Agora pensando nos próximos testes: muitos deles precisam de dados pré-existentes, por exemplo o GET de todas as missões, o GET de uma missão específica e o PUT para atualizar uma missão específica. Então em cada teste vamos criar uma missão manualmente? Definitivamente não. Vamos usar uma fixture que nos fornece 2 missões automaticamente, no próprio test_missions.py (lembre do import pytest no topo do arquivo):",
      code: `import pytest

@pytest.fixture()
def seeded_missions(client):
    data = [
        {"title": "Missão Escarlate", "reward": 2, "difficulty": 3},
        {"title": "Missão SuperNova", "reward": 5, "difficulty": 2}
    ]

    for mission in data:
        response = client.post("/missions/", json=mission)
        assert response.status_code == 201`,
      language: "python",
    },
    {
      heading: "Como a fixture funciona",
      body: "Observe que eu montei 2 dicionários dentro de uma lista data para fazer 2 requisições POST. Isso porque o nosso endpoint espera um CreateMission só; se mandarmos os 2 de uma vez, ele não aceita. Então, com essa fixture, quem a receber por parâmetro já encontra esses dados populados para fazer os testes. Ela recebe o client porque também precisa fazer requisições: uma fixture pode usar outra. Ela fica no arquivo de teste, e não no conftest.py, porque só os testes de missões usam ela. E ela roda de novo para cada teste que a pede (escopo padrão function). Para as diferenças entre os scopes, consulte:",
      links: [
        {
          text: "Fixture usando outra fixture (guia de pytest)",
          url: "/programacao/backend/pytest#section-10",
        },
        {
          text: "Documentação do pytest — scopes de fixture",
          url: "https://docs.pytest.org/en/stable/how-to/fixtures.html#scope-sharing-fixtures-across-classes-modules-packages-or-session",
        },
      ],
    },
    {
      heading: "Usando a fixture num teste",
      body: "Agora usamos a fixture num teste:",
      code: `def test_response_one_mission(client, seeded_missions):
    response = client.get("/missions/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "title": "Missão Escarlate",
        "reward": 2,
        "difficulty": 3
    }`,
      language: "python",
    },
    {
      heading: "Basta pedir por parâmetro",
      body: "Basta colocar seeded_missions nos parâmetros: o pytest roda a fixture antes do teste, e o teste não precisa saber como as missões foram criadas.",
    },
    {
      heading: "O vazamento de estado",
      body: "Mas, mesmo usando as fixtures, ainda surge um problema: o vazamento de estado. A fixture garante que terá pelo menos 2 missões ali prontas, mas não garante que não ocorra vazamento de um teste para o outro. A lista missions e o contador moram no módulo do router e continuam vivos entre um teste e outro. Então o test_create_mission cria uma nova missão, e os testes que vêm depois acabam recebendo 3 missões em vez de 2, o que não é o ideal. Agora vamos trabalhar no isolamento dos nossos testes.",
    },
    {
      heading: "Isolando os testes",
      body: "Cada teste precisa começar com a lista vazia e o contador zerado, independente da ordem em que rodam. Para isso podemos criar outra fixture no nosso conftest.py:",
      code: `from app.routers import missions as missions_router

@pytest.fixture(autouse=True)
def reset_missions():
    missions_router.missions.clear()
    missions_router.contador = 0
    yield`,
      language: "python",
    },
    {
      heading: "autouse=True",
      body: "O autouse=True faz a fixture rodar automaticamente antes de todo teste, sem a necessidade de ficar passando por parâmetro. Como ela está no conftest.py, fica disponível para todos os testes da pasta. E o pytest roda as fixtures autouse antes das outras do mesmo escopo, então a limpeza acontece antes de a seeded_missions criar as missões.",
    },
    {
      heading: "Por que .clear() e não missions = []",
      body: "O .clear() esvazia a lista que já existe. Se fizéssemos missions = [], criaríamos outra lista, e o router continuaria usando a antiga.",
    },
    {
      heading: "Por que importar o módulo",
      body: "Para o contador importamos o módulo, e não a variável: from app.routers.missions import contador criaria uma cópia local, e zerar a cópia não muda o contador do router. Por isso usamos missions_router.contador = 0, mexendo direto na variável que mora lá dentro.",
    },
    {
      heading: "O yield na limpeza",
      body: "O yield separa o antes do depois do teste; aqui só limpamos antes.",
    },
    {
      heading: "Testes isolados",
      body: "Agora o test_response_one_mission passa sozinho, junto com os outros e em qualquer ordem, porque o id 1 vem sempre da fixture seeded_missions, e não de outro teste. Então, até aqui, entendemos que o isolamento de testes é crucial: não pode sobrar dados de um teste para o outro, cada teste deve começar limpo.",
    },
    {
      heading: "Cobrindo todos os casos",
      body: "Agora podemos aumentar a nossa cobertura de testes, cobrindo todos os casos, e junto com isso faremos uma organização que explico melhor logo abaixo. O test_missions.py completo fica assim:",
      code: `import pytest

@pytest.fixture()
def seeded_missions(client):
    data = [
        {"title": "Missão Escarlate", "reward": 2, "difficulty": 3},
        {"title": "Missão SuperNova", "reward": 5, "difficulty": 2}
    ]

    for mission in data:
        response = client.post("/missions/", json=mission)
        assert response.status_code == 201

# POST /missions/
def test_create_mission(client):
    response = client.post(
        "/missions/",
        json={"title": "Missão Escarlate", "reward": 2, "difficulty": 3}
    )
    assert response.status_code == 201
    assert response.json() == {
        "id": 1,
        "title": "Missão Escarlate",
        "reward": 2,
        "difficulty": 3
    }

def test_create_mission_with_negative_reward_returns_422(client):
    response = client.post(
        "/missions/",
        json={"title": "Mission Test Error 422", "reward": -1, "difficulty": 3}
    )
    assert response.status_code == 422

# GET /missions/
def test_list_missions(client, seeded_missions):
    response = client.get("/missions/")
    assert response.status_code == 200
    assert response.json() == [
        {"title": "Missão Escarlate", "reward": 2, "difficulty": 3, "id": 1},
        {"title": "Missão SuperNova", "reward": 5, "difficulty": 2, "id": 2}
    ]

# GET /missions/{mission_id}
def test_get_mission_by_id(client, seeded_missions):
    response = client.get("/missions/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "title": "Missão Escarlate",
        "reward": 2,
        "difficulty": 3
    }

def test_get_missing_mission_returns_404(client, seeded_missions):
    response = client.get("/missions/3")
    assert response.status_code == 404

# PUT /missions/{mission_id}
def test_update_mission(client, seeded_missions):
    updated_data = {"title": "Missão SuperMan", "reward": 5, "difficulty": 5}

    response = client.put("/missions/1", json=updated_data)
    assert response.status_code == 200
    assert response.json() == {"id": 1, **updated_data}

    get_response = client.get("/missions/1")
    assert get_response.json() == {"id": 1, **updated_data}

def test_update_missing_mission_returns_404(client, seeded_missions):
    response = client.put(
        "/missions/3",
        json={"title": "Missão Escarlate", "reward": 5, "difficulty": 5}
    )
    assert response.status_code == 404

# DELETE /missions/{mission_id}
def test_delete_mission(client, seeded_missions):
    response = client.delete("/missions/1")
    assert response.status_code == 204

    response_get = client.get("/missions/1")
    assert response_get.status_code == 404`,
      language: "python",
    },
    {
      heading: "Organizando os testes",
      body: "É sempre bom organizarmos os nossos testes. Não se trata apenas de rodar e funcionar, mas de pensar em quem vai ler e dar manutenção futuramente. Por isso o arquivo de teste segue uma lógica de leitura de cima para baixo, indo do POST até o DELETE, com cada rota separada por um comentário.",
    },
    {
      heading: "Nomes que dizem o que o teste faz",
      body: "Cada teste tem um nome que descreve exatamente aquilo que está testando: se quero testar que uma missão é deletada, o nome do meu teste é test_delete_mission. Sempre coloque nomes que expliquem o que o próprio teste faz. Repare que os testes de erro também dizem o resultado esperado no nome, como test_get_missing_mission_returns_404.",
    },
    {
      heading: "Não confira só o status code",
      body: "Nos seus testes, não veja apenas o status code, mas também se o conteúdo está realmente voltando. Dependendo da API, pode ter um erro passando despercebido em que o status code é 200, mas o retorno está errado. Por isso o test_update_mission confere a resposta do PUT e depois faz um GET para garantir que a missão ficou salva de verdade, e o test_delete_mission confere que, depois de deletar, o GET da mesma missão devolve 404.",
    },
    {
      heading: "Cada teste recebe o que precisa",
      body: "Cada teste recebe só aquilo que precisa: se precisa de dados prontos, recebe o seeded_missions, a nossa fixture. Os testes de criação recebem só o client, porque começam com a lista vazia.",
    },
    {
      heading: "Inglês ou português, mas um só",
      body: "Também é uma boa forma de organizar o código deixá-lo todo em inglês ou todo em português. Eu opto por manter sempre tudo em inglês. Se você começou com nomes em português nas fixtures, vale a pena trocá-los: aqui elas se chamam seeded_missions (as missões prontas) e reset_missions (a limpeza antes de cada teste).",
    },
    {
      heading: "A base para o que vem",
      body: "O que aprendemos aqui servirá de base fundamental para as próximas partes, como Banco de Dados e Alembic, entre outras coisas. Algumas coisas mudarão, mas a base sempre permanece.",
    },
  ],
  relatedSlugs: ["pytest", "organizacao-schemas-e-routers"],
};
