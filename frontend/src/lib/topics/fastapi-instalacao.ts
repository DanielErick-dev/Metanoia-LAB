import { TopicData } from "@/lib/types/topic";

export const fastapiInstalacao: TopicData = {
  slug: "instalacao-e-primeiros-passos",
  title: "Capítulo 2 — Instalação e primeiros passos com uv",
  subtitle: "Criando o projeto, o primeiro main.py e subindo o servidor",
  categorySlug: "fastapi",
  accent: "#009688",
  status: "em-construcao",
  intro:
    "Instalação e passos iniciais: vamos criar o projeto com o uv, instalar o FastAPI e subir o nosso primeiro servidor.",
  sections: [
    {
      heading: "Validando o uv",
      body: "Primeiro, garanta que o seu uv está instalado. Se não sabe o que é o uv ou como instalar, consulte a documentação oficial. Rode o comando abaixo para validar que seu uv está funcionando:",
      code: `uv --version`,
      language: "bash",
      links: [
        {
          text: "Documentação do uv — instalação",
          url: "https://docs.astral.sh/uv/getting-started/installation/",
        },
      ],
    },
    {
      heading: "Iniciando o projeto",
      body: "Agora que está funcionando, rode uv init dentro da sua pasta para inicializar o nosso gerenciador e, em seguida, adicione o FastAPI. O uv se responsabilizará por criar o nosso ambiente virtual .venv e instalar o FastAPI dentro dele.",
      code: `uv init
uv add "fastapi[standard]"`,
      language: "bash",
    },
    {
      heading: "O primeiro main.py",
      body: "O uv init já cria um main.py com um print de exemplo. Substitua o conteúdo dele pelo que a documentação sugere:",
      code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return 'Hello, World!'

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {'item_id': item_id, 'q': q}`,
      language: "python",
    },
    {
      heading: "Rodando o servidor",
      body: "Em seguida, inicializamos o servidor no terminal e acessamos http://127.0.0.1:8000/ no navegador. Caso a porta esteja ocupada, você pode rodar com --port (8001 ou a porta que você quiser) e acessar http://127.0.0.1:8001/.",
      code: `uv run fastapi dev

uv run fastapi dev --port 8001`,
      language: "bash",
    },
    {
      heading: "O resultado",
      body: "O resultado será esse, com aspas, porque o FastAPI converte o retorno da função em JSON. Isso significa que você definitivamente está com um servidor FastAPI rodando e já aceitando requisições. Vamos avançar!",
      code: `"Hello, World!"`,
      language: "json",
    },
  ],
  relatedSlugs: [],
};
