import { TopicData } from "@/lib/types/topic";

export const vocabularioExpressoes: TopicData = {
  slug: "vocabulario-expressoes",
  title: "Vocabulário e Expressões",
  subtitle: "Palavras, estruturas gramaticais e expressões que estou aprendendo",
  categorySlug: "ingles",
  accent: "#f472b6",
  status: "em-construcao",
  intro:
    "Este espaço reúne palavras, expressões e estruturas gramaticais que vou aprendendo aos poucos, principalmente através de leitura (atualmente lendo Fate: A Saga Winx, em inglês). Não segue uma ordem de curso — é mais um caderno de anotações organizado por categoria, que vai crescendo conforme eu avanço.",
  sections: [
    {
      heading: "Verbos",
      body: "Verbos que fui anotando ao longo da leitura.",
      vocabList: [
        { term: "shall", translation: "significa a mesma coisa que will, porém num sentido mais formal" },
        { term: "ensured", translation: "garantido", note: "Passado de ensure (garantir)." },
        { term: "regret", translation: "arrepender-se" },
        { term: "hope", translation: "esperar / esperança" },
        { term: "rise again", translation: "erguer-se novamente" },
        { term: "yielded", translation: "empunhado / portado" },
        {
          term: "running",
          translation: "correndo",
          note: "Também pode significar administrando ou dirigindo. Ex.: run a business = dirigir um negócio.",
        },
        { term: "appoint", translation: "nomear alguém para uma função" },
        { term: "appointed", translation: "nomeado" },
        { term: "take over", translation: "assumir o controle de algo", note: "Geralmente substituindo alguém ou algo." },
        { term: "hire", translation: "contratar", note: "hired = contratado." },
        { term: "doubt", translation: "duvido" },
        { term: "seem", translation: "parecer" },
        { term: "plan", translation: "planejar" },
        { term: "evolve", translation: "evoluir" },
        { term: "bear", translation: "aguentar, suportar" },
        { term: "offer", translation: "oferecer" },
      ],
      expressions: [
        {
          phrase: "to last",
          translation: "durar",
          explanation: "Usado em contextos de duração.",
          example: "The movie lasted 2 hours.",
          exampleTranslation: "O filme durou 2 horas.",
        },
      ],
    },
    {
      heading: "Lugares",
      body: "Palavras que se referem a lugares.",
      vocabList: [
        { term: "loo", translation: "banheiro", note: "Gíria britânica." },
        { term: "lecture hall", translation: "sala de aula / diretório" },
        { term: "garden", translation: "jardim" },
      ],
    },
    {
      heading: "Palavras gerais",
      body: "Substantivos, adjetivos, pronomes e conectores soltos.",
      vocabList: [
        { term: "though", translation: "embora", note: "Em início de frase, funciona como 'embora'." },
        { term: "kind", translation: "espécie, raça ou tipo" },
        { term: "those", translation: "aqueles / aquelas", note: "Retorna algo já mencionado." },
        { term: "mighty", translation: "poderoso / majestoso" },
        { term: "loo roll", translation: "papel higiênico" },
        { term: "plumbing", translation: "encanamento" },
        { term: "nothing but", translation: "nada além de / somente" },
        { term: "headmistress", translation: "diretora" },
        { term: "headmaster", translation: "diretor" },
        {
          term: "myself",
          translation: "eu mesmo",
          note: "Usado pra indicar você mesmo dentro de uma frase. Ex.: students like myself and Gabriel = estudantes como eu e Gabriel; I did it myself = eu mesmo fiz isso.",
        },
        { term: "duties", translation: "deveres, funções ou obrigações" },
        { term: "sincere", translation: "sincero" },
        { term: "sincerest", translation: "o mais sincero" },
        { term: "spring", translation: "primavera" },
        { term: "as for", translation: "com relação a / quanto a" },
        { term: "aforementioned", translation: "mencionado anteriormente" },
        { term: "now that", translation: "agora que" },
        { term: "nearly", translation: "quase" },
        { term: "lunch", translation: "almoço" },
        { term: "dinner", translation: "janta" },
        { term: "meal", translation: "refeição" },
        { term: "till", translation: "até", note: "Mesma coisa que until, porém mais informal e comum." },
        { term: "schedule", translation: "agenda" },
        { term: "mistress", translation: "mestra" },
        { term: "threats", translation: "ameaças" },
        { term: "as such", translation: "sendo assim, portanto" },
        { term: "each", translation: "cada" },
        { term: "with no", translation: "sem" },
        { term: "current", translation: "atual" },
        { term: "leadership", translation: "liderança" },
        { term: "trouble", translation: "problema" },
        { term: "in fact", translation: "de fato" },
        { term: "bold", translation: "ousado / corajoso / atrevido" },
        { term: "fairy", translation: "fada" },
        {
          term: "between",
          translation: "entre",
          note: "Usado num grupo de 2 pessoas — diferente de among, usado quando o grupo tem 3 ou mais.",
        },
        {
          term: "among",
          translation: "entre",
          note: "Usado quando o grupo tem 3 pessoas ou mais — diferente de between, usado num grupo de 2.",
        },
        { term: "shame", translation: "pena" },
        { term: "which is why", translation: "por isso que, razão pela qual" },
        { term: "my dear", translation: "minha querida" },
      ],
      expressions: [
        {
          phrase: "about / around",
          translation: "sobre / acerca de / cerca de",
          explanation: "About pode se traduzir como 'sobre', mas também pode ser usado em outros contextos, como 'cerca de'.",
          example: "I sleep about 7 hours.",
          exampleTranslation: "Eu durmo cerca de 7 horas.",
        },
        {
          phrase: "Therefore",
          translation: "portanto, por isso",
          example: "Therefore, I decided to study.",
          exampleTranslation: "Portanto, eu decidi estudar.",
        },
        {
          phrase: "Although",
          translation: "embora, apesar de",
          example: "Although it's late, I'll study.",
          exampleTranslation: "Embora esteja tarde, eu vou estudar.",
        },
        {
          phrase: "Throughout",
          translation: "ao longo de, por todo",
          example: "Throughout the day, I worked hard.",
          exampleTranslation: "Ao longo do dia eu trabalhei bastante.",
        },
      ],
    },
    {
      heading: "Estrutura de arrependimento (if only...)",
      body: "'If only' funciona como 'se eu tivesse/estivesse', pra expressar arrependimento ou desejo sobre algo que não aconteceu.",
      vocabList: [
        { term: "if only I had studied", translation: "se eu tivesse estudado" },
        { term: "were", translation: "verbo to be no subjuntivo" },
        { term: "if only I were there", translation: "se eu estivesse lá" },
      ],
    },
    {
      heading: "Superlativo",
      body: "O superlativo é o grau máximo de um adjetivo — em português, algo como 'bonito → belíssimo' ou 'sincero → o mais sincero'.",
      vocabList: [
        { term: "sincere", translation: "sincero" },
        { term: "sincerest", translation: "o mais sincero" },
      ],
    },
    {
      heading: "Expressões e gírias",
      body: "Expressões e gírias soltas, com explicação e exemplo quando eu tinha anotado.",
      expressions: [
        {
          phrase: "quick as a bullet",
          translation: "rápido como uma bala",
        },
        {
          phrase: "there you are",
          translation: "aí está você",
        },
        {
          phrase: "bugger",
          translation: "droga, caramba",
          explanation: "Xingamento leve, comum na gíria britânica.",
        },
        {
          phrase: "giant shocker",
          translation: "grande surpresa",
          explanation: "Geralmente usado de forma debochada, tipo 'ahh, novidade essa, né?'.",
        },
        {
          phrase: "keepie uppies",
          translation: "altinha",
          explanation: "Refere-se à altinha de futebol, deixar a bola no ar sem cair.",
          example: "He was practicing his keepie uppies in the backyard before the game.",
          exampleTranslation: "Ele estava praticando suas embaixadinhas no quintal antes do jogo.",
        },
        {
          phrase: "to go skateboarding",
          translation: "andar de skate",
          example: "I love to go skateboarding in the park on weekends.",
          exampleTranslation: "Eu amo andar de skate no parque aos fins de semana.",
        },
        {
          phrase: "a little / a bit",
          translation: "um pouco",
          explanation: "Usamos quando queremos dizer que temos, sabemos ou queremos um pouco de algo.",
          example: "I speak a little English.",
          exampleTranslation: "Eu falo um pouco de inglês.",
        },
        {
          phrase: "then / after that",
          translation: "em seguida, depois",
          example: "We had dinner and, after that, we went to the movies.",
          exampleTranslation: "Nós jantamos e, depois disso, fomos ao cinema.",
        },
        {
          phrase: "in a little while",
          translation: "daqui a pouco",
          explanation: "Usado pra designar um 'daqui a pouco' ou 'em pouco tempo'.",
          example: "I'll be ready in a little while.",
          exampleTranslation: "Eu vou estar pronto daqui a pouco.",
        },
        {
          phrase: "the workout",
          translation: "o treino",
          explanation: "Geralmente usado pra se referir a treinos de maneira geral.",
          example: "The workout was insane.",
          exampleTranslation: "O treino foi insano.",
        },
        {
          phrase: "nice of you",
          translation: "que gentil da sua parte",
          explanation: "Também pode ser 'que legal da sua parte'.",
        },
        {
          phrase: "shut it",
          translation: "cala boca",
        },
        {
          phrase: "will you",
          translation: "beleza? tá bom?",
          explanation: "Comum como confirmação depois de uma ordem ou pedido.",
        },
        {
          phrase: "throuple",
          translation: "trisal",
          explanation: "Gíria para relacionamento a três.",
        },
        {
          phrase: "oh come",
          translation: "ah qual é",
        },
        {
          phrase: "a real shame",
          translation: "uma pena e tanto, ou que desperdício",
        },
        {
          phrase: "damn right",
          translation: "com certeza",
        },
        {
          phrase: "coming",
          translation: "já vou, vindo",
          explanation: "Usado quando alguém te chama e você está indo: 'yes, coming'.",
        },
        {
          phrase: "more strong then ever",
          translation: "mais forte do que nunca",
        },
      ],
    },
    {
      heading: "Formas de dizer que está cansado sem usar 'I'm tired'",
      body: "Algumas alternativas pra variar na hora de dizer que você está cansado.",
      expressions: [
        {
          phrase: "I'm exhausted",
          translation: "estou exausto",
          explanation: "Cansaço intenso, exaustão.",
          example: "I'm exhausted, I barely slept last night.",
          exampleTranslation: "Estou exausto, mal dormi ontem à noite.",
        },
        {
          phrase: "I'm dog tired",
          translation: "estou cansado pra cachorro",
          explanation: "Expressão informal, geralmente usada depois de fazer algo muito cansativo.",
          example: "I'm dog tired after moving all that furniture.",
          exampleTranslation: "Estou cansado pra cachorro depois de mover todos aqueles móveis.",
        },
        {
          phrase: "I feel drained",
          translation: "estou esgotado",
          explanation: "Sensação de estar drenado, esgotado — geralmente além do cansaço físico, também emocional ou psicológico.",
          example: "After that meeting, I feel completely drained.",
          exampleTranslation: "Depois daquela reunião, eu me sinto completamente esgotado.",
        },
        {
          phrase: "I'm a little spent / I'm spent",
          translation: "eu estou um pouco cansado / sem energia",
          explanation: "Muito utilizado no dia a dia.",
          example: "It's only 9pm but I'm spent.",
          exampleTranslation: "São só 9 horas da noite, mas eu tô sem energia.",
        },
      ],
    },
    {
      heading: "Outras expressões úteis",
      body: "Expressões que aparecem bastante em conversas do dia a dia.",
      expressions: [
        {
          phrase: "it's not a big deal",
          translation: "não é grande coisa",
          explanation: "Geralmente usada de forma positiva, pra acalmar ou despreocupar alguém de que aquilo não é um problema tão grande.",
          example: "Don't worry about being late, it's not a big deal.",
          exampleTranslation: "Não se preocupe em estar atrasado, não é grande coisa.",
        },
        {
          phrase: "I'm looking forward to it",
          translation: "eu estou ansioso esperando algo",
          explanation: "Usado como ânimo, ou ansiedade positiva, pra algum evento futuro.",
          example: "I'm looking forward to my English class tomorrow.",
          exampleTranslation: "Estou ansioso pela minha aula de inglês amanhã.",
        },
        {
          phrase: "I ran out of time",
          translation: "o tempo acabou",
          explanation: "Expressão comum pra indicar que algo acabou — tempo, café, paciência, ou uma tarefa específica que não deu tempo.",
          example: "I ran out of time to finish the report.",
          exampleTranslation: "O tempo acabou para eu terminar o relatório.",
        },
        {
          phrase: "let me think about it",
          translation: "deixa eu pensar sobre isso",
          example: "Can I think about it and give you an answer tomorrow?",
          exampleTranslation: "Posso pensar sobre isso e te dar uma resposta amanhã?",
        },
      ],
    },
    {
      heading: "Frases com objetos comuns de casa e do dia a dia",
      body: "Frases simples pra fixar vocabulário de objetos do cotidiano.",
      expressions: [
        {
          phrase: "I'm writing in my notebook",
          translation: "eu estou escrevendo no meu caderno",
        },
        {
          phrase: "I'm drinking water from this glass",
          translation: "eu estou bebendo água desse copo",
          explanation: "Glass é copo de vidro; se for copo de plástico, usamos cup.",
        },
        {
          phrase: "I'm holding a pen",
          translation: "eu estou segurando uma caneta",
        },
      ],
    },
    {
      heading: "Cumprimentos, despedidas e conversas informais",
      body: "Expressões comuns pra puxar e encerrar uma conversa em contextos informais.",
      expressions: [
        {
          phrase: "hey, what's up",
          translation: "eai, que que tá pegando",
          explanation: "Usada em contextos informais. A resposta costuma ser not much ou nothing much, que significa nada demais, tranquilo ou de boa.",
        },
        {
          phrase: "what have you been up to",
          translation: "como você está (de forma mais aprofundada)",
          explanation: "Pede uma resposta menos genérica. Pode responder, por exemplo, 'I'm really busy' (estou muito ocupado), e devolver a pergunta com 'and how about you' ou 'and what about you'.",
        },
        {
          phrase: "see you later",
          translation: "vejo você depois, até mais",
        },
        {
          phrase: "take care",
          translation: "se cuida",
        },
        {
          phrase: "have a nice day",
          translation: "tenha um bom dia",
        },
        {
          phrase: "did you get it",
          translation: "você entendeu?",
        },
      ],
    },
    {
      heading: "Perguntas e respostas do dia a dia",
      body: "Perguntas comuns sobre o dia e o que a pessoa está fazendo, com possíveis respostas.",
      expressions: [
        {
          phrase: "how's your day going",
          translation: "como está indo seu dia?",
        },
        {
          phrase: "how's your day going so far",
          translation: "como está indo seu dia até agora (por enquanto)",
          explanation: "Uma resposta possível seria: pretty good, thanks (tudo bem, obrigado); ou not so good (não tá muito bem); ou not bad (nada mal).",
        },
        {
          phrase: "when did you get in",
          translation: "quando você chegou?",
        },
        {
          phrase: "what are you up to?",
          translation: "o que você está fazendo?",
          explanation: "É parecido com what are you doing. Uma resposta possível seria: nothing much, just paying some bills (nada demais, só pagando umas contas).",
        },
      ],
    },
    {
      heading: "Frases úteis: preços, pedidos e direções",
      body: "Frases práticas para o dia a dia — clima, preços, pedir algo num restaurante e perguntar como chegar a um lugar.",
      expressions: [
        {
          phrase: "it looks like it's gonna rain",
          translation: "parece que vai chover",
        },
        {
          phrase: "how much is this?",
          translation: "quanto custa isso?",
        },
        {
          phrase: "what is this",
          translation: "o que é isso?",
        },
        {
          phrase: "how much are these",
          translation: "quanto custam essas coisas?",
        },
        {
          phrase: "may I have a ... please",
          translation: "me dê um/uma ... por favor",
          explanation: "Pergunta para fazer em restaurantes.",
          example: "May I have a beer please.",
          exampleTranslation: "Me dê uma cerveja por favor.",
        },
        {
          phrase: "how do I get to Sobradinho?",
          translation: "como eu faço para chegar em Sobradinho?",
          explanation: "Pergunta para saber como chegar a um lugar.",
        },
      ],
    },
    {
      heading: "Reações e interjeições",
      body: "Reações curtas comuns em conversas.",
      expressions: [
        {
          phrase: "no way",
          translation: "não acredito, sério?",
        },
        {
          phrase: "that's amazing",
          translation: "que incrível",
        },
        {
          phrase: "really?",
          translation: "sério?",
        },
        {
          phrase: "i see",
          translation: "tá, aham",
        },
        {
          phrase: "that's ok",
          translation: "está ok, tranquilo",
        },
        {
          phrase: "sorry?",
          translation: "opa, não ouvi, pode repetir?",
          explanation: "Por mais que 'sorry' geralmente signifique desculpa, aqui é usado quando não entendi algo que alguém disse.",
        },
      ],
    },
  ],
  relatedSlugs: ["some-any-no"],
};
