import { TopicData } from "@/lib/types/topic";

export const fastapiBasico: TopicData = {
  slug: "fastapi-basico",
  title: "Capítulo 4 — FastAPI básico",
  subtitle: "BaseModel, Field, Schemas, criando e listando missões e testando tudo pelo /docs",
  categorySlug: "fastapi",
  accent: "#009688",
  status: "em-construcao",
  intro:
    "Agora que já temos tudo instalado na nossa máquina, vamos iniciar um código simples.",
  sections: [
    {
      heading: "Criando o mission.py",
      body: "Crie um arquivo mission.py na raiz do projeto contendo:",
      code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class CreateMission(BaseModel):
    title: str
    reward: float
    difficulty: int`,
      language: "python",
    },
    {
      heading: "Entendendo o código",
      body: "Nós importamos o FastAPI que acabamos de instalar junto com o BaseModel do Pydantic (já explico), instanciamos o FastAPI chamando de app, que geralmente é um padrão no FastAPI, e criamos a nossa classe CreateMission herdando do nosso BaseModel. O BaseModel é uma classe pronta do Pydantic que irá validar e converter os dados que chegam e também nos traz algumas configurações default.",
    },
    {
      heading: "Tipando os campos",
      body: "Em seguida nós criamos os campos title, reward e difficulty (campos relacionados à missão). Perceba que estamos dizendo que tipo de campo cada um é: o title é do tipo string, logo usamos str; reward é ponto flutuante, então float; e difficulty é inteiro, então int. Lembrando: não estamos atribuindo valor, apenas tipando o que é cada campo. Se você já mexeu com TypeScript, entende bem o que estou falando aqui haha. Caso queira ver na documentação oficial do FastAPI um pouco mais sobre o BaseModel:",
      links: [
        {
          text: "Documentação do FastAPI — Request Body",
          url: "https://fastapi.tiangolo.com/tutorial/body/",
        },
      ],
    },
    {
      heading: "Validando valores com o Field",
      body: "Mas, por mais que tenhamos adicionado tipagem ao nosso código, nada impede que ele receba valores que não fazem sentido (uma recompensa negativa, por exemplo). Então, para esse tipo de validação, podemos usar o Field, também do Pydantic, e faríamos algo como, por exemplo:",
      code: `from pydantic import BaseModel, Field

class CreateMission(BaseModel):
    title: str = Field(min_length=5, max_length=50)
    reward: float = Field(gt=0)
    difficulty: int = Field(default=1, ge=1, le=5)`,
      language: "python",
    },
    {
      heading: "Os parâmetros mais comuns do Field",
      body: "Veja que agora, além de dizermos “o title é do tipo texto, viu?”, estamos configurando o que cada campo espera receber. Explicarei os parâmetros mais comuns do Field, vejamos:",
      table: {
        headers: ["Parâmetro", "O que faz"],
        rows: [
          ["min_length e max_length", "Servem para dizer o tamanho mínimo e máximo de uma string."],
          ["gt", "Vem de greater than, que significa maior que. Então gt=0 significa que o valor tem que ser maior do que 0."],
          ["ge", "greater than or equal, que significa maior ou igual. Então ge=1 significa que o valor tem que ser 1 ou maior que 1."],
          ["lt e le", "Fazem exatamente a mesma coisa que o gt e o ge, só que ao contrário: se gt = greater than, então lt = less than (menor que) e le = less than or equal (menor ou igual a)."],
          ["default", "É o valor do campo quando um valor não é enviado. No nosso caso colocamos a dificuldade sendo default 1: se ninguém mandar nada nela, o valor padrão dela é 1."],
        ],
      },
    },
    {
      heading: "Validação automática",
      body: "O lado bom disso é que o próprio Pydantic já faz essa validação automática se alguém enviar algo errado nesses campos, explicando qual campo está errado, sem a necessidade de ficar escrevendo ifs. Uma coisa interessante do Pydantic é que, se você enviar, por exemplo, ali no difficulty um valor \"3\" (em texto), ele vai tentar converter para int (já que definimos como int) e conseguirá converter. Vale se atentar quanto a isso.",
    },
    {
      heading: "Schemas",
      body: "Imagine agora que para cada missão dessa nós tenhamos um ID, como se fosse um “CPF” de cada missão, que identifica ela. Não podemos simplesmente criar um campo vazio para o usuário digitar o ID da missão, isso porque o próprio servidor (ou seja, nós) cria o ID automaticamente sempre que uma missão é criada. Sendo assim, começamos a introduzir o assunto: Schemas. Schemas são basicamente esquemas de dados: eles definem a estrutura e os dados que serão recebidos ou enviados. No nosso caso do CreateMission, nós definimos que uma missão precisa ter título, recompensa e dificuldade. Então, quando um usuário for criar uma missão, ele enviará esses campos e receberá de volta os mesmos campos que enviou junto com o seu ID. Podemos a partir disso criar um Schema (nossa estrutura, lembra?) de resposta, por exemplo:",
      code: `class ResponseMission(CreateMission):
    id: int`,
      language: "python",
    },
    {
      heading: "A herança de novo",
      body: "Observe a herança aparecendo de novo: estamos herdando de CreateMission, sendo assim herdamos todos os seus respectivos campos (título, recompensa e dificuldade) e apenas adicionamos o id, que é do tipo inteiro (assim não precisamos herdar novamente o BaseModel nem escrever todos os demais campos repetidamente).",
    },
    {
      heading: "Banco de dados em memória",
      body: "Certo, então temos um Schema para criação e um Schema para resposta. Vamos criar um banco de dados em memória agora (não é um banco de dados de verdade, viu? É apenas uma imitação bem fuleira):",
      code: `missions: list[ResponseMission] = []`,
      language: "python",
    },
    {
      heading: "Entendendo a lista tipada",
      body: "Apenas para relembrar alguns pontos: criamos uma variável missions do tipo lista (esse list é nativo do Python, então não precisa ser importado nem nada). Mas missions é uma lista de quê? O que ela guarda? Aí vem o ResponseMission: essa lista guarda Schemas do tipo ResponseMission, que nós vimos agora pouco e que são os 4 campos (title, reward, difficulty e id). E apenas no final, com o =, atribuímos à variável uma lista vazia. Pronto, esse é o nosso banco de dados em memória devidamente tipado.",
    },
    {
      heading: "Criando uma missão (POST)",
      body: "Agora vamos de fato criar uma missão:",
      code: `@app.post("/missions", status_code=201)
async def create_mission(mission: CreateMission) -> ResponseMission:
    new_id = len(missions) + 1
    new_mission = ResponseMission(id=new_id, **mission.model_dump())
    missions.append(new_mission)
    return new_mission`,
      language: "python",
    },
    {
      heading: "Explicando por partes",
      body: "Agora vamos por partes nas explicações:",
      table: {
        headers: ["Trecho", "O que faz"],
        rows: [
          ["@app.post(\"/missions\")", "O @ é o decorator que diz: “olha, essa função Python aqui não é apenas uma função, é uma rota, viu?”. O post indica que estamos recebendo dados, enquanto /missions indica o caminho: na URL iremos bater exatamente em /missions."],
          ["status_code=201", "Esse é o código de status padrão de APIs REST para algo que foi criado."],
          ["async def create_mission(mission: CreateMission)", "Criamos a função com async def (função assíncrona) passando como parâmetro o mission, que é o que esperamos receber. Mas não esperamos receber uma missão qualquer, esperamos uma missão do tipo CreateMission. Caso seja enviado um campo com valor errado, o Pydantic vai levantar um erro; e caso seja enviado um campo extra, por exemplo, o Pydantic vai simplesmente ignorar sem levantar erros, porque ele não faz parte do schema."],
          ["-> ResponseMission", "Essa -> é usada para indicar o tipo de retorno da função. O que vamos retornar em uma função POST? Lembra que recebemos os 3 campos e retornamos 4 campos, que é exatamente o que o ResponseMission faz? Justo, por isso estamos indicando que a resposta é um ResponseMission."],
          ["new_id = len(missions) + 1", "Na parte de geração do ID entra um pouco mais de lógica: precisamos que o ID seja sempre diferente, porque os IDs não podem se repetir. Então pegamos o tamanho da lista + 1 e atribuímos à variável new_id. Como a lista estará sempre crescendo, o ID será sempre incremental (lembrando, isso é apenas um exemplo básico)."],
          ["ResponseMission(id=new_id, **mission.model_dump())", "Criamos uma variável new_mission que recebe o tipo ResponseMission, passando para ela exatamente o id que acabamos de gerar (lembra que o ResponseMission espera um ID?) e, junto com ele, passamos por parâmetro o **mission.model_dump(), que vou explicar abaixo."],
        ],
      },
    },
    {
      heading: "O model_dump e o **",
      body: "O model_dump é uma mão na roda. De forma resumida, ele pega um objeto Pydantic completo e transforma em dict. Por exemplo, no nosso caso estamos recebendo do cliente (quem estiver usando a nossa rota) alguns dados para criação da missão, que precisam bater com o que está definido no CreateMission. Esse objeto Pydantic, através do model_dump, é transformado num dicionário normal do Python, algo como:",
      code: `{"title": "titulo teste", "reward": 3.5, "difficulty": 2}`,
      language: "python",
    },
    {
      heading: "Desempacotando o dicionário",
      body: "Aí você se pergunta para que serve o **. Bem, ele é nativo do próprio Python e estamos usando ele para desempacotar. Até o momento apenas tínhamos transformado em dict; agora estamos passando todos esses campos com valores para dentro do Pydantic ResponseMission, que espera exatamente os campos que estão no dicionário. E assim, no final, temos um único objeto ResponseMission contendo todos os campos. Caso você queira consultar a documentação do FastAPI sobre o model_dump:",
      links: [
        {
          text: "Documentação do FastAPI — Unpacking a dict and extra keywords",
          url: "https://fastapi.tiangolo.com/tutorial/extra-models/#unpacking-a-dict-and-extra-keywords",
        },
      ],
    },
    {
      heading: "Salvando e retornando",
      body: "Em seguida, usando nosso banco de dados em memória, adicionamos a nova missão dentro dessa variável missions, que está esperando o ResponseMission. Viu como tudo está batendo exatamente como o esperado? E por último retornamos essa nova missão, que é exatamente um ResponseMission também.",
    },
    {
      heading: "Aviso",
      body: "Esse ID incremental que fizemos não funcionará futuramente, então deixo avisado aqui que é apenas um exemplo bem básico de utilização do FastAPI, e por isso estou repetindo várias vezes alguns conceitos.",
    },
    {
      heading: "Listando as missões (GET)",
      body: "Agora que finalmente temos a criação de missões, precisamos também exibir e retornar essas missões, então vamos fazer isso:",
      code: `@app.get("/missions")
async def list_missions() -> list[ResponseMission]:
    return missions`,
      language: "python",
    },
    {
      heading: "O mesmo caminho, métodos diferentes",
      body: "Esse é bem mais simples: uma rota GET no mesmo caminho /missions que devolve a lista inteira de missões. Não precisamos colocar status_code=200, porque já é o padrão. Perceba que o mesmo caminho pode ter métodos diferentes (POST cria, GET lista), e é o método HTTP que diferencia as duas rotas. Observe que aqui retornamos uma lista contendo vários ResponseMission: cada elemento da lista é um ResponseMission (vimos ali em cima do que é formado esse ResponseMission), e retornamos a nossa lista completa de missões com return missions.",
    },
    {
      heading: "def ou async def?",
      body: "As duas formas funcionam no FastAPI. Use async def quando a função faz algo com await, como consultar um banco assíncrono ou chamar outra API. Se a função faz algo que bloqueia e não tem versão com await, use def normal, porque aí o FastAPI roda essa função numa thread separada e não trava o resto. No nosso caso, com a lista em memória, tanto faz.",
    },
    {
      heading: "Rodando o projeto",
      body: "Agora vamos finalmente testar tudo que fizemos. Inicialize o servidor (ou numa porta específica, com --port):",
      code: `uv run fastapi dev mission.py

uv run fastapi dev mission.py --port 8001`,
      language: "bash",
    },
    {
      heading: "Testando pelo /docs",
      body: "Agora acesse no seu navegador http://localhost:8000/docs (ou http://localhost:8001/docs, se usou a porta 8001). Aqui dentro do docs você vai ver as 2 rotas criadas, a rota de GET e a rota de POST. Você pode testar suas rotas aqui dentro e validar que realmente os campos estão funcionando, e que, se passar um valor errado, o Pydantic está validando. Por exemplo: clicando em Try it out, você escreve o JSON que vai enviar, por exemplo:",
      code: `{
  "title": "Teste",
  "reward": 10,
  "difficulty": 2
}`,
      language: "json",
    },
    {
      heading: "Missão criada",
      body: "Eu coloquei, por exemplo, escarlate com recompensa 100 e dificuldade 4, e a saída foi esta. Perceba que ele criou o ID 2:",
      image: {
        src: "/images/fastapi/missao-criada.png",
        alt: "Resposta 201 no /docs com a missão escarlate criada com id 2",
        width: 502,
        height: 539,
      },
    },
    {
      heading: "Erro de validação",
      body: "Se colocarmos, por exemplo, um nível de dificuldade 10, ultrapassando o máximo, que é 5, vejamos. Perceba que ele levanta um erro imediatamente:",
      image: {
        src: "/images/fastapi/missao-erro-422.png",
        alt: "Resposta 422 no /docs dizendo que difficulty deve ser menor ou igual a 5",
        width: 511,
        height: 695,
      },
    },
  ],
  relatedSlugs: [],
};
