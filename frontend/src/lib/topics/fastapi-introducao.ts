import { TopicData } from "@/lib/types/topic";

export const fastapiIntroducao: TopicData = {
  slug: "o-que-e-fastapi",
  title: "Capítulo 1 — O que é o FastAPI?",
  subtitle: "Uvicorn, ASGI e a diferença entre FastAPI, Django e Flask",
  categorySlug: "fastapi",
  accent: "#009688",
  status: "em-construcao",
  intro:
    "O FastAPI é um framework Python para criação de APIs de alta performance, que suporta programação assíncrona nativamente e é baseado nos type hints/annotations do Python, com compatibilidade com o Pydantic, que será explicado em breve.",
  sections: [
    {
      heading: "Uvicorn, ASGI e uvloop",
      body: "Parte do desempenho do FastAPI vem do Uvicorn, que é um servidor ASGI: ele recebe as conexões e entrega as requisições para a aplicação, enquanto o FastAPI cuida das rotas e da validação. O FastAPI, por sua vez, é construído sobre o Starlette, responsável pela parte web, e o Pydantic, responsável pela parte de dados. Ao instalar o fastapi[standard], o uvicorn[standard] já vem junto, trazendo o uvloop e o httptools. O uvloop substitui o event loop padrão do asyncio e é construído sobre a libuv, a mesma biblioteca em C que o Node.js e o Julia usam para programação assíncrona. Ele não roda no Windows nativo (lá o Uvicorn volta para o asyncio padrão), mas funciona normalmente no Linux, no macOS e no WSL.",
    },
    {
      heading: "Diferença entre os 3 frameworks",
      body: "A principal diferença técnica é que o Django e o Flask nasceram WSGI, que é síncrono, enquanto o FastAPI é ASGI, assíncrono desde o início. Os dois primeiros ganharam suporte parcial a async depois.",
    },
    {
      heading: "FastAPI",
      body: "O FastAPI é muito utilizado na criação de APIs performáticas e ficou popular no avanço das IAs por dois motivos: é Python, a língua do ecossistema de machine learning, e seu assincronismo nativo ajuda em trabalho de I/O, como chamar APIs de LLM, fazer streaming de respostas ou atender muitas requisições ao mesmo tempo. Vale lembrar que o async não deixa a inferência de um modelo mais rápida, já que esse trabalho é pesado na CPU ou na GPU.",
    },
    {
      heading: "Django",
      body: "O Django, por sua vez, é um verdadeiro ecossistema web, com diversas integrações e mecanismos prontos adicionados ao próprio framework, o que permite um desenvolvimento muito mais rápido, porém com menos flexibilidade para se adaptar junto a outros ecossistemas.",
    },
    {
      heading: "Flask",
      body: "O Flask, por sua vez, é considerado um micro-framework, com mais facilidade de aprendizado, menos recursos e mais flexível, assim como o FastAPI.",
    },
  ],
  relatedSlugs: [],
};
