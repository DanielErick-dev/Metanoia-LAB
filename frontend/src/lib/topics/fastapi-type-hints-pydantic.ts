import { TopicData } from "@/lib/types/topic";

export const fastapiTypeHintsPydantic: TopicData = {
  slug: "type-hints-annotations-pydantic",
  title: "Capítulo 3 — Type Hints, Annotations e Pydantic",
  subtitle: "Tipagem no Python e como o FastAPI e o Pydantic usam os tipos em runtime",
  categorySlug: "fastapi",
  accent: "#009688",
  status: "em-construcao",
  intro:
    "Antes de avançar no FastAPI, precisamos entender a tipagem no Python: os tipos de tipagem, os type hints e o Pydantic, que usa esses tipos para validar e converter dados.",
  sections: [
    {
      heading: "Tipagem dinâmica",
      body: "A tipagem é verificada em tempo de execução, e a variável pode mudar de tipo livremente. Linguagens: Python, JavaScript, Ruby…",
      code: `x = 10       # int
x = 'Python' # agora é str`,
      language: "python",
      table: {
        headers: ["Vantagens", "Desvantagens"],
        rows: [
          ["Flexível", "Erros aparecem somente em runtime"],
          ["Rápido de escrever", "Mais difícil dar manutenção em projetos grandes"],
        ],
      },
    },
    {
      heading: "Tipagem estática",
      body: "A tipagem é verificada antes da execução (na compilação). As variáveis têm tipos fixos, e o compilador detecta inconsistências antes de rodar o código. Linguagens: Java, C#, Pascal…",
      code: `int x = 10;
x = "Python"; // erro na hora de compilar`,
      language: "clike",
      table: {
        headers: ["Vantagens", "Desvantagens"],
        rows: [
          ["Menos erros em produção", "Mais verboso"],
          ["Melhor previsibilidade e manutenção", "Exige declarar tudo antes"],
          ["Ferramentas conseguem inferir e otimizar melhor", ""],
        ],
      },
    },
    {
      heading: "Tipagem gradual",
      body: "É o meio-termo: você pode declarar tipos, mas não é obrigatório. A linguagem continua dinâmica, mas permite adicionar tipos para ganhar segurança. Python é uma linguagem de tipagem dinâmica com suporte a tipagem gradual.",
      code: `def soma(a: int, b: int) -> int:
    return a + b

soma(10, 20)       # OK -> 30
soma("10", "20")   # NÃO dá erro: retorna "1020" (concatena strings)

# Só mypy/pyright/IDE avisam -> bug silencioso que os type hints ajudam a pegar`,
      language: "python",
    },
    {
      heading: "Type Hints e Annotations no Python",
      body: "São anotações de tipo opcionais, adicionadas ao código para indicar o tipo dos dados. O interpretador do Python ignora os type hints: eles não mudam o comportamento da linguagem. Mas bibliotecas como o FastAPI e o Pydantic leem os type hints em runtime e usam essa informação para validar e converter dados. É isso que faz o FastAPI funcionar.",
      table: {
        headers: ["Quem usa", "Para quê"],
        rows: [
          ["Ferramentas de análise (mypy, pyright)", "Antes de rodar"],
          ["IDEs (VS Code, PyCharm)", "Autocomplete e avisos"],
          ["Frameworks (FastAPI, Pydantic)", "Em runtime, para validar/converter"],
          ["Documentação automática", "Swagger em /docs"],
        ],
      },
    },
    {
      heading: "Por que usar type hints?",
      body: "Reduzem erros antes de rodar o código, melhoram o autocomplete da IDE, documentam melhor o seu código e permitem que ferramentas detectem inconsistências. E, principalmente, o FastAPI e o Pydantic dependem disso. Exemplos de uso e tipos:",
      code: `from dataclasses import dataclass

# funções
def saudacao(name: str) -> str:
    return f"Olá, {name}"

# variáveis
idade: int = 25
precos: list[float] = [10.5, 20.3]

# dataclasses
# Sem o @dataclass, a classe NÃO ganha __init__ e User(name=..., age=...) dá erro
@dataclass
class User:
    name: str
    age: int

u = User(name="Felipe", age=30)`,
      language: "python",
    },
    {
      heading: "Tipos de coleções e opcionais (estilo moderno, Python 3.10+)",
      body: "Não precisa importar nada do typing para isso:",
      code: `# Variáveis com type hints
nome: str = "Felipe"
idade: int = 30
altura: float = 1.75
ativo: bool = True

# Coleções tipadas
numeros: list[int] = [1, 2, 3, 4, 5]
usuario: dict[str, str] = {"nome": "Felipe", "email": "felipe@pycode.br"}
tags: set[str] = {"python", "fastapi"}
ponto: tuple[int, int] = (10, 20)

# Função com type hints completos
def criar_usuario(
    nome: str,
    idade: int,
    email: str | None = None,       # str ou None
) -> dict[str, str | int]:          # valores podem ser str ou int
    """Cria um dicionário com dados do usuário"""
    usuario: dict[str, str | int] = {
        "nome": nome,
        "idade": idade,
    }
    if email:
        usuario["email"] = email
    return usuario`,
      language: "python",
      examples: [
        {
          title: "Estilo antigo",
          body: "Vai aparecer em código legado, cursos e internet, e significa a mesma coisa: List[int] virou list[int], Dict[str, int] virou dict[str, int], Set[str] e Tuple[int, int] viraram set[str] e tuple[int, int], Optional[str] virou str | None e Union[int, str] virou int | str. O que ainda se importa do typing:",
          code: `from typing import (
    Annotated,  # tipo + metadados (muito usado no FastAPI)
    Any,        # qualquer tipo
    Callable,   # funções
    Literal,    # valores específicos: Literal["admin", "user"]
    TypeVar,    # tipos genéricos
)`,
          language: "python",
        },
      ],
    },
    {
      heading: "Optional ≠ opcional (pegadinha)",
      body: "str | None significa \"aceita None\", não \"pode omitir\". Quem torna o campo opcional é o valor default.",
      code: `from pydantic import BaseModel

class X(BaseModel):
    a: str | None          # OBRIGATÓRIO (precisa enviar, mas pode ser null)
    b: str | None = None   # opcional (se não enviar, vira None)
    c: str = "padrão"      # opcional (se não enviar, vira "padrão")`,
      language: "python",
    },
    {
      heading: "Annotated",
      body: "Annotated[tipo, metadados]: o tipo continua o mesmo, e o resto é informação extra que ferramentas (como o FastAPI) leem. É o jeito moderno e recomendado de declarar validações e dependências no FastAPI.",
      code: `from typing import Annotated
from fastapi import FastAPI, Path, Query

app = FastAPI()

@app.get("/items/{item_id}")
def read_item(
    item_id: Annotated[int, Path(gt=0)],                    # int maior que 0
    q: Annotated[str | None, Query(max_length=50)] = None,  # str opcional, até 50 chars
):
    return {"item_id": item_id, "q": q}`,
      language: "python",
    },
    {
      heading: "Pydantic: o que é e para que serve",
      body: "Pydantic é uma biblioteca Python que valida dados automaticamente (em runtime), converte tipos e cria modelos estruturados usando type hints. É extremamente usada no FastAPI, que já instala o Pydantic junto. Serve para validar dados de entrada (de APIs, formulários, JSON etc.), converter tipos automaticamente (str → int, str → datetime…), garantir que sua aplicação receba dados consistentes e criar schemas para documentação (OpenAPI/Swagger).",
    },
    {
      heading: "O que o FastAPI faz com type hints e Pydantic",
      body: "Detecção de erros antes do runtime é papel da IDE e do mypy/pyright, não do Pydantic.",
      table: {
        headers: ["Recurso", "Como"],
        rows: [
          ["Validação automática de requisições", "Em runtime → erro 422 se inválido"],
          ["Documentação automática", "Swagger/OpenAPI em /docs"],
          ["Serialização/Deserialização de dados", "JSON ↔ objetos Python"],
          ["Autocompletion", "Na IDE"],
          ["Filtrar a resposta", "Com response_model (ex.: nunca devolver a senha)"],
        ],
      },
    },
    {
      heading: "Instalação",
      body: "Com o uv. O fastapi[standard] já traz o Pydantic e o email-validator, então normalmente nem precisa:",
      code: `uv add pydantic

# EmailStr precisa do email-validator
uv add "pydantic[email]"`,
      language: "bash",
    },
    {
      heading: "Exemplos de uso",
      body: "Um modelo do Pydantic é parecido com um type/interface do TypeScript, mas o TS some em runtime, e o Pydantic valida de verdade em runtime.",
      examples: [
        {
          title: "Conversões automáticas",
          body: "O age chega como str e é convertido para int:",
          code: `from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int
    email: str

u = User(name="Felipe", age="30", email="f@pycode.com")
print(u.age)           # 30 (foi convertido de str para int)
print(u.model_dump())  # {'name': 'Felipe', 'age': 30, 'email': 'f@pycode.com'} (antigo: .dict())`,
          language: "python",
        },
        {
          title: "Validação automática",
          body: "Um email inválido levanta ValidationError:",
          code: `from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: EmailStr

User(email="email_invalido")  # Levanta ValidationError`,
          language: "python",
        },
        {
          title: "Defaults e opcionais",
          body: "Campos sem default são obrigatórios:",
          code: `from pydantic import BaseModel

class Produto(BaseModel):
    nome: str                      # obrigatório
    preco: float = 0.0             # opcional, default 0.0
    descricao: str | None = None   # opcional, default None`,
          language: "python",
        },
        {
          title: "Validações com Field",
          body: "O Field adiciona regras ao campo:",
          code: `from pydantic import BaseModel, Field

class Produto(BaseModel):
    nome: str = Field(min_length=3, max_length=50)
    preco: float = Field(gt=0)            # maior que 0
    estoque: int = Field(default=0, ge=0) # maior ou igual a 0`,
          language: "python",
        },
      ],
    },
    {
      heading: "Exemplo com herança (padrão Base → Create / Update / Response)",
      body: "Um modelo base com os campos comuns, e modelos filhos para criação, atualização parcial, o registro completo e a resposta da API:",
      code: `from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr

# Modelo base: campos comuns
class PessoaBase(BaseModel):
    nome: str
    email: EmailStr
    telefone: str | None = None

# Modelo para criação (POST): sem ID, com senha
class PessoaCreate(PessoaBase):
    senha: str

# Modelo para atualização parcial (PATCH): tudo opcional
class PessoaUpdate(BaseModel):
    nome: str | None = None
    email: EmailStr | None = None
    telefone: str | None = None

# Modelo completo (com ID e timestamps)
class Pessoa(PessoaBase):
    id: int
    criado_em: datetime
    atualizado_em: datetime | None = None

# Modelo para resposta: SEM senha
# Usado como response_model na rota, o FastAPI filtra a saída e a senha nunca vaza
class PessoaResponse(PessoaBase):
    id: int
    criado_em: datetime

    # Permite criar o schema a partir de objetos do ORM (SQLAlchemy)
    # (antigo, Pydantic v1: class Config: orm_mode = True)
    model_config = ConfigDict(from_attributes=True)`,
      language: "python",
    },
  ],
  relatedSlugs: [],
};
