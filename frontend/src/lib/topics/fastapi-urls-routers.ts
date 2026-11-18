import { TopicData } from "@/lib/types/topic";

export const fastapiUrlsRouters: TopicData = {
  slug: "organizacao-schemas-e-routers",
  title: "Capítulo 5 — Organização inicial: Schemas e Routers",
  subtitle: "Separando o mission.py em pastas, APIRouter com prefix e tags, importações e o include_router",
  categorySlug: "fastapi",
  accent: "#009688",
  status: "em-construcao",
  intro:
    "Antes fizemos um único arquivo mission.py com os nossos schemas, o nosso app diretamente do FastAPI e as nossas rotas CRUD completas, mas em projetos grandes não é assim: cada parte fica separada de forma organizada, as rotas vão para um arquivo dentro da pasta routers e a mesma coisa para os schemas.",
  objectives: {
    style: "tree",
    items: [
      "Separar schemas e rotas em pastas próprias",
      "Criar as rotas com APIRouter, prefix e tags",
      "Escolher entre importação absoluta e relativa",
      "Conectar os routers no main.py com include_router",
      "Entender para que serve o __init__.py",
    ],
  },
  sections: [
    {
      heading: "A estrutura de pastas",
      body: "Vejamos um exemplo. Em texto, a estrutura fica assim:",
      code: `app/
├── __init__.py
├── main.py
├── routers/
│   ├── __init__.py
│   └── missions.py
└── schemas/
    ├── __init__.py
    └── missions.py`,
      language: "text",
    },
    {
      heading: "O papel de cada pasta",
      body: "Criamos uma pasta app, que é a base do nosso projeto, uma pasta routers, onde vão ficar as rotas do nosso projeto, e a pasta schemas, onde vão ficar os schemas do nosso projeto.",
    },
    {
      heading: "Os schemas (schemas/missions.py)",
      body: "Vejamos o arquivo missions.py da pasta schemas:",
      code: `from pydantic import BaseModel, Field

class CreateMission(BaseModel):
    title: str = Field(min_length=5, max_length=50)
    reward: float = Field(gt=0)
    difficulty: int = Field(default=1, ge=1, le=5)

class ResponseMission(CreateMission):
    id: int`,
      language: "python",
    },
    {
      heading: "Só Pydantic, nada de FastAPI",
      body: "Esse arquivo fica responsável pela estrutura dos dados e pelas validações dos campos. Ele não se preocupa com status code, nomes de rotas, HTTP, nada disso, ele é apenas o schema separado. Por isso ele só importa do pydantic, e nada do fastapi.",
    },
    {
      heading: "As rotas (routers/missions.py)",
      body: "Agora vejamos o missions.py de routers:",
      code: `from typing import Annotated

from fastapi import APIRouter, HTTPException, Path

from app.schemas.missions import CreateMission, ResponseMission

router = APIRouter(prefix="/missions", tags=["missions"])

missions: list[ResponseMission] = []
MissionId = Annotated[int, Path(ge=1, le=1000)]
contador: int = 0

@router.post("/", status_code=201)
async def create_mission(mission: CreateMission) -> ResponseMission:
    global contador
    contador += 1

    new_mission = ResponseMission(id=contador, **mission.model_dump())
    missions.append(new_mission)
    return new_mission

@router.get("/", status_code=200)
async def response_mission() -> list[ResponseMission]:
    return missions

@router.get("/{mission_id}", status_code=200)
async def response_one_mission(mission_id: MissionId) -> ResponseMission:
    for mission in missions:
        if mission.id == mission_id:
            return mission
    raise HTTPException(status_code=404, detail="Mission not found")

@router.put("/{mission_id}", status_code=200)
async def update_mission(mission_id: MissionId, new_item: CreateMission) -> ResponseMission:
    for position, mission in enumerate(missions):
        if mission.id == mission_id:
            updated_mission = ResponseMission(id=mission.id, **new_item.model_dump())
            missions[position] = updated_mission
            return updated_mission
    raise HTTPException(status_code=404, detail="Mission not found")

@router.delete("/{mission_id}", status_code=204)
async def delete_mission(mission_id: MissionId):
    for position, mission in enumerate(missions):
        if mission.id == mission_id:
            del missions[position]
            return
    raise HTTPException(status_code=404, detail="Mission not found")`,
      language: "python",
    },
    {
      heading: "O APIRouter, o prefix e as tags",
      body: "No lugar do app = FastAPI(), agora usamos o APIRouter, e as rotas passam a ser @router em vez de @app. O prefix=\"/missions\" define o prefixo. Então, ao passar / no caminho, ele já coloca o missions automaticamente pra gente (\"/\" vira /missions/ e \"/{mission_id}\" vira /missions/{mission_id}). Já o tags=[\"missions\"] agrupa essas rotas numa seção com esse nome no /docs. Dessa forma, esse arquivo fica responsável pelas rotas em si.",
    },
    {
      heading: "Importação absoluta ou relativa",
      body: "Observe que importamos os schemas já prontos do nosso missions.py aqui dentro do arquivo de rotas. Tem 2 formas de fazer as importações: na importação absoluta, a gente passa o caminho completo, app.schemas.missions, e importa o que quer. Ou podemos usar a importação relativa, que usa pontos (cada ponto é um nível de pasta: . é a pasta atual, routers, e .. é a pasta de cima, app). Ambas estão corretas, então escolha uma de acordo com o que preferir (eu prefiro a importação absoluta, me parece mais limpa).",
      code: `from app.schemas.missions import CreateMission, ResponseMission

from ..schemas.missions import CreateMission, ResponseMission`,
      language: "python",
    },
    {
      heading: "Conectando tudo no main.py",
      body: "Até aqui montamos os schemas e as rotas, mas falta conectar tudo. No nosso arquivo main.py principal faremos:",
      code: `from fastapi import FastAPI

from app.routers import missions

app = FastAPI(title="Taverna API")

app.include_router(missions.router)`,
      language: "python",
    },
    {
      heading: "O include_router",
      body: "Aqui montamos o nosso app e usamos a função include_router para incluir as rotas. Caso tivéssemos outros arquivos de rotas, também puxaríamos todos aqui (um include_router para cada um).",
    },
    {
      heading: "Rodando o projeto",
      body: "Em seguida podemos testar no navegador da mesma forma que sempre fizemos, só que agora o caminho do arquivo muda:",
      code: `uv run fastapi dev app/main.py`,
      language: "bash",
    },
    {
      heading: "O __init__.py",
      body: "O arquivo __init__.py serve para o Python entender que aquela pasta é um pacote, o que permite importar coisas de dentro dela (from app.routers import missions). Ele pode ficar vazio.",
    },
    {
      heading: "Por que separar",
      body: "A separação de pastas nos ajuda a escalar o projeto, manter tudo organizado e facilita a manutenção, a compreensão do código e a separação de responsabilidades, aquele código limpo, sabe?",
      links: [
        {
          text: "Documentação do FastAPI — Aplicações maiores",
          url: "https://fastapi.tiangolo.com/pt/tutorial/bigger-applications/",
        },
      ],
    },
  ],
  relatedSlugs: [],
};
