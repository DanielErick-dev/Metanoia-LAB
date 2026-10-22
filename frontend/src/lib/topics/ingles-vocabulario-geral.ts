import { TopicData } from "@/lib/types/topic";

export const inglesVocabularioGeral: TopicData = {
  slug: "geral",
  title: "Vocabulário geral",
  subtitle: "Lugares, substantivos, adjetivos, pronomes e conectores soltos",
  categorySlug: "vocabulario",
  accent: "#fb7185",
  status: "em-construcao",
  intro:
    "Palavras que não são verbos nem expressões inteiras — lugares, substantivos, adjetivos, pronomes e conectores que vou encontrando na leitura e anotando por aqui.",
  sections: [
    {
      heading: "Lugares",
      body: "Palavras que se referem a lugares.",
      vocabList: [
        {
          term: "garden",
          translation: "jardim",
          example: "We had a picnic in the garden.",
          exampleTranslation: "Fizemos um piquenique no jardim.",
        },
        {
          term: "hall",
          translation: "salão",
          example: "Everyone gathered in the announcement hall.",
          exampleTranslation: "Todos se reuniram no salão de anúncios.",
        },
        {
          term: "lecture hall",
          translation: "sala de aula / auditório",
          example: "The lecture hall was full today.",
          exampleTranslation: "O auditório estava cheio hoje.",
        },
        {
          term: "loo",
          translation: "banheiro",
          example: "Where's the loo?",
          exampleTranslation: "Onde fica o banheiro?",
          more: [
            { label: "Observação", text: "Gíria britânica." },
          ],
        },
      ],
    },
    {
      heading: "Palavras gerais",
      body: "Substantivos, adjetivos, pronomes e conectores soltos.",
      vocabList: [
        {
          term: "accomplishment",
          translation: "conquista",
        },
        {
          term: "ado",
          translation: "agitação, rebuliço",
          more: [
            { label: "Uso", text: "Quase só existe em without further ado e em much ado about nothing (muito barulho por nada)." },
            { label: "Expressão", text: "without further ado = sem mais delongas.", example: "Without further ado, let’s start the meeting.", exampleTranslation: "Sem mais delongas, vamos começar a reunião." },
          ],
        },
        {
          term: "adoption",
          translation: "adoção",
        },
        {
          term: "advantages over",
          translation: "vantagens sobre, em relação a",
          example: "GraphQL has advantages over REST.",
          exampleTranslation: "O GraphQL tem vantagens em relação ao REST.",
          more: [
            { label: "Uso", text: "over, aqui, no sentido de comparação." },
          ],
        },
        {
          term: "aforementioned",
          translation: "mencionado anteriormente",
          example: "The aforementioned rules apply to everyone.",
          exampleTranslation: "As regras mencionadas anteriormente se aplicam a todos.",
        },
        {
          term: "after all",
          translation: "afinal, no final das contas",
          example: "We decided to stay after all.",
          exampleTranslation: "Decidimos ficar afinal.",
        },
        {
          term: "against",
          translation: "contra",
          example: "It’s against the rules.",
          exampleTranslation: "Isso é contra as regras.",
          more: [
            { label: "Expressão", text: "protect against attacks = proteger contra ataques." },
            { label: "Expressão", text: "checked against = conferido com, comparado com.", example: "Validate the input against a schema.", exampleTranslation: "Valide a entrada com base em um schema." },
          ],
        },
        {
          term: "also",
          translation: "também",
          example: "I also like coffee.",
          exampleTranslation: "Eu também gosto de café.",
        },
        {
          term: "among",
          translation: "entre",
          example: "The prize was divided among the three winners.",
          exampleTranslation: "O prêmio foi dividido entre os três vencedores.",
          more: [
            { label: "Diferença", text: "Usado quando o grupo tem 3 pessoas ou mais — diferente de between, usado num grupo de 2." },
          ],
        },
        {
          term: "announcement",
          translation: "anúncio",
          example: "Everyone gathered in the announcement hall.",
          exampleTranslation: "Todos se reuniram no salão de anúncios.",
        },
        {
          term: "application",
          translation: "aplicação, candidatura",
        },
        {
          term: "approaches",
          translation: "abordagens",
          example: "There are three approaches to this problem.",
          exampleTranslation: "Existem três abordagens para esse problema.",
          more: [
            { label: "Forma", text: "Plural de approach." },
          ],
        },
        {
          term: "around",
          translation: "ao redor, por volta de, por aí",
          example: "They sat around the table.",
          exampleTranslation: "Eles sentaram ao redor da mesa.",
          more: [
            { label: "Exemplo", example: "I’ll be there around 8.", exampleTranslation: "Chego por volta das 8." },
            { label: "Expressão", text: "hang around = ficar por aí." },
            { label: "Expressão", text: "around here = por aqui." },
          ],
        },
        {
          term: "as for",
          translation: "com relação a / quanto a",
          example: "As for the meeting, it's been postponed.",
          exampleTranslation: "Quanto à reunião, ela foi adiada.",
        },
        {
          term: "as such",
          translation: "sendo assim, portanto",
          example: "He is the manager, and as such, he makes the final decisions.",
          exampleTranslation: "Ele é o gerente e, sendo assim, toma as decisões finais.",
        },
        {
          term: "as well",
          translation: "também",
          example: "I study English, and I read comics as well.",
          exampleTranslation: "Eu estudo inglês e também leio quadrinhos.",
          more: [
            { label: "Uso", text: "Costuma ir no fim da frase." },
            { label: "Expressão", text: "as well as = assim como, além de.", example: "loss of data as well as revenue.", exampleTranslation: "perda de dados, assim como de receita." },
            { label: "Diferença", text: "too e as well ficam no fim; also costuma ir antes do verbo." },
          ],
        },
        {
          term: "at least",
          translation: "pelo menos",
          example: "At least I did something.",
          exampleTranslation: "Pelo menos eu fiz alguma coisa.",
        },
        {
          term: "at some point",
          translation: "em algum momento",
          example: "At some point, you’ll need to revoke access.",
          exampleTranslation: "Em algum momento, você vai precisar revogar o acesso.",
          more: [
            { label: "Expressão", text: "at this point = a essa altura." },
            { label: "Expressão", text: "at one point = em certo momento do passado." },
          ],
        },
        {
          term: "awfully",
          translation: "muito, extremamente (intensificador)",
          example: "That's awfully kind of you.",
          exampleTranslation: "Isso é muita gentileza sua.",
          more: [
            { label: "Diferença", text: "Antes de um adjetivo, não tem sentido negativo — diferente de awful sozinho, que é 'horrível'." },
          ],
        },
        {
          term: "balmy",
          translation: "ameno, agradável (clima)",
          example: "It was a balmy summer evening.",
          exampleTranslation: "Foi uma noite de verão amena.",
        },
        {
          term: "barmy",
          translation: "maluco, doidão",
          example: "Are you barmy?",
          exampleTranslation: "Você é maluco?",
          more: [
            { label: "Observação", text: "Gíria britânica." },
          ],
        },
        {
          term: "behalf",
          translation: "lado, nome",
          more: [
            { label: "Uso", text: "Só existe em expressões." },
            { label: "Expressão", text: "on behalf of = em nome de.", example: "The app acts on behalf of the user.", exampleTranslation: "O app age em nome do usuário." },
            { label: "Expressão", text: "on my behalf = em meu nome.", example: "She spoke on my behalf.", exampleTranslation: "Ela falou em meu nome." },
          ],
        },
        {
          term: "behavior",
          translation: "comportamento",
          example: "His behavior surprised everyone.",
          exampleTranslation: "O comportamento dele surpreendeu todo mundo.",
          more: [
            { label: "Variação", text: "behaviour (britânico)." },
            { label: "Em tecnologia", text: "Behavior-Driven Development (BDD)." },
          ],
        },
        {
          term: "behind",
          translation: "atrás de",
          example: "The cat is hiding behind the sofa.",
          exampleTranslation: "O gato está escondido atrás do sofá.",
          more: [
            { label: "Exemplo", example: "We’re behind schedule.", exampleTranslation: "Estamos atrasados." },
            { label: "Expressão", text: "leave something behind = deixar algo pra trás." },
          ],
        },
        {
          term: "beloved",
          translation: "amado, querido",
          example: "She wrote to her beloved sister.",
          exampleTranslation: "Ela escreveu à sua amada irmã.",
          more: [
            { label: "Expressão", text: "my beloved country = meu amado país." },
            { label: "Substantivo", text: "the beloved." },
          ],
        },
        {
          term: "bespoke",
          translation: "feito sob medida, personalizado",
          example: "A bespoke suit.",
          exampleTranslation: "Um terno feito sob medida.",
          more: [
            { label: "Uso", text: "Geralmente pra algo feito especificamente pra aquele fim." },
            { label: "Expressão", text: "bespoke apps = aplicativos feitos sob medida." },
          ],
        },
        {
          term: "between",
          translation: "entre",
          example: "There's a strong bond between the two friends.",
          exampleTranslation: "Existe um laço forte entre os dois amigos.",
          more: [
            { label: "Diferença", text: "Usado num grupo de 2 pessoas — diferente de among, usado quando o grupo tem 3 ou mais." },
          ],
        },
        {
          term: "beyond",
          translation: "além de",
          example: "Beyond CRUD, APIs need other actions.",
          exampleTranslation: "Além do CRUD, APIs precisam de outras ações.",
          more: [
            { label: "Expressão", text: "beyond my control = fora do meu controle." },
          ],
        },
        {
          term: "blazing",
          translation: "flamejante, ardente",
          example: "A blazing fire lit the room.",
          exampleTranslation: "Uma fogueira ardente iluminou a sala.",
          more: [
            { label: "Expressão", text: "blazing sun = sol escaldante." },
            { label: "Em tecnologia", text: "blazing fast = absurdamente rápido." },
          ],
        },
        {
          term: "bloody",
          translation: "maldito, “droga de” (britânico, intensificador)",
          example: "This is a bloody mess!",
          exampleTranslation: "Isso é uma bagunça dos infernos!",
          more: [
            { label: "Expressão", text: "Bloody hell! = Que droga!" },
            { label: "Observação", text: "Sentido literal: sangrento. Na fala britânica é palavrão leve." },
          ],
        },
        {
          term: "bold",
          translation: "ousado / corajoso / atrevido",
          example: "That was a bold decision.",
          exampleTranslation: "Aquela foi uma decisão ousada.",
        },
        {
          term: "breach",
          translation: "violação, brecha",
          more: [
            { label: "Expressão", text: "security breach = violação de segurança." },
            { label: "Expressão", text: "data breach = vazamento/violação de dados.", example: "The company suffered a data breach last year.", exampleTranslation: "A empresa sofreu um vazamento de dados no ano passado." },
            { label: "Verbo", example: "Hackers breached the server.", exampleTranslation: "Hackers invadiram o servidor." },
            { label: "Expressão", text: "breach of contract = quebra de contrato." },
          ],
        },
        {
          term: "brief",
          translation: "breve",
          example: "We took a few brief trips last year.",
          exampleTranslation: "Fizemos algumas viagens curtas no ano passado.",
          more: [
            { label: "Expressão", text: "in brief = resumindo." },
            { label: "Substantivo", text: "briefing = reunião rápida de instruções." },
          ],
        },
        {
          term: "briefing",
          translation: "reunião rápida de instruções",
        },
        {
          term: "broad",
          translation: "amplo, abrangente",
          example: "The scopes were broad.",
          exampleTranslation: "Os scopes eram amplos.",
          more: [
            { label: "Expressão", text: "a broad range of options = uma ampla gama de opções." },
            { label: "Expressão", text: "in broad terms = em linhas gerais." },
            { label: "Oposto", text: "narrow = estreito." },
            { label: "Parecido", text: "wide." },
          ],
        },
        {
          term: "buzz",
          translation: "zumbido, e também “burburinho”",
        },
        {
          term: "buzzing",
          translation: "zumbindo / agitado",
          example: "The bees were buzzing around the flowers.",
          exampleTranslation: "As abelhas zumbiam em volta das flores.",
          more: [
            { label: "Exemplo", example: "The school is buzzing with news.", exampleTranslation: "A escola está agitada com as notícias." },
            { label: "Substantivo", text: "buzz = zumbido, e também “burburinho”." },
          ],
        },
        {
          term: "by means of",
          translation: "por meio de, através de",
          example: "You can log in by means of a token.",
          exampleTranslation: "Você pode entrar por meio de um token.",
          more: [
            { label: "Exemplo", example: "He escaped by means of a rope.", exampleTranslation: "Ele escapou por meio de uma corda." },
            { label: "Uso", text: "Formal. Aparece bastante em livro técnico; no dia a dia, usa-se by + -ing ou through." },
          ],
        },
        {
          term: "chaos",
          translation: "caos",
          example: "The room was total chaos.",
          exampleTranslation: "O quarto estava um caos total.",
        },
        {
          term: "company",
          translation: "empresa",
          example: "She works at a tech company.",
          exampleTranslation: "Ela trabalha em uma empresa de tecnologia.",
          more: [
            { label: "Outro sentido", text: "companhia: keep someone company = fazer companhia a alguém.", example: "Thanks for keeping me company.", exampleTranslation: "Obrigado por me fazer companhia." },
          ],
        },
        {
          term: "conversion rate",
          translation: "taxa de conversão",
          example: "The conversion rate improved after the change.",
          exampleTranslation: "A taxa de conversão melhorou depois da mudança.",
          more: [
            { label: "Observação", text: "É a porcentagem de pessoas que fazem a ação desejada (instalar, comprar, cadastrar). Muito usado em marketing e produto." },
            { label: "Exemplo", example: "Our signup conversion rate is 5%.", exampleTranslation: "Nossa taxa de conversão de cadastro é de 5%." },
            { label: "Verbo", text: "convert = converter." },
          ],
        },
        {
          term: "countenance",
          translation: "semblante, expressão do rosto (literário)",
          example: "His countenance was stern.",
          exampleTranslation: "O semblante dele era severo.",
          more: [
            { label: "Observação", text: "Palavra formal e de livros. Hoje se usa mais expression." },
          ],
        },
        {
          term: "crap",
          translation: "porcaria",
          example: "I’m tired of this crap job.",
          exampleTranslation: "Estou cansado desse trabalho de merda.",
          more: [
            { label: "Observação", text: "Informal e meio vulgar." },
            { label: "Exemplo", example: "That movie was crap.", exampleTranslation: "Aquele filme foi uma porcaria." },
          ],
        },
        {
          term: "curfew",
          translation: "toque de recolher",
          example: "The students must be in the dorms by 10 pm because of the curfew.",
          exampleTranslation: "Os alunos precisam estar nos dormitórios às 22h por causa do toque de recolher.",
          more: [
            { label: "Exemplo", example: "My parents set a curfew for me.", exampleTranslation: "Meus pais definiram um horário pra eu voltar pra casa." },
            { label: "Expressão", text: "break curfew = desrespeitar o toque de recolher." },
          ],
        },
        {
          term: "current",
          translation: "atual",
          example: "What is your current address?",
          exampleTranslation: "Qual é o seu endereço atual?",
        },
        {
          term: "cute",
          translation: "fofo",
          example: "Their new puppy is so cute.",
          exampleTranslation: "O novo cachorrinho deles é tão fofo.",
        },
        {
          term: "damned",
          translation: "maldito, condenado",
          example: "This damned door won’t open!",
          exampleTranslation: "Essa maldita porta não abre!",
          more: [
            { label: "Expressão", text: "Damn it! = Droga!" },
            { label: "Substantivo", text: "the damned = os condenados." },
          ],
        },
        {
          term: "delivery",
          translation: "entrega",
        },
        {
          term: "denial",
          translation: "negação",
        },
        {
          term: "dinner",
          translation: "janta",
          example: "We're having dinner at 8pm.",
          exampleTranslation: "Vamos jantar às 8 da noite.",
        },
        {
          term: "direct",
          translation: "direto",
        },
        {
          term: "direction",
          translation: "direção",
          more: [
            { label: "Expressão", text: "directions = instruções de como chegar." },
          ],
        },
        {
          term: "disaster",
          translation: "desastre",
        },
        {
          term: "disastrous",
          translation: "desastroso",
          example: "A weak password policy can be disastrous.",
          exampleTranslation: "Uma política de senhas fraca pode ser desastrosa.",
          more: [
            { label: "Origem", text: "Vem de disaster (desastre)." },
            { label: "Advérbio", text: "disastrously." },
          ],
        },
        {
          term: "disastrously",
          translation: "desastrosamente",
        },
        {
          term: "discoverable",
          translation: "que dá pra descobrir, explorável",
          example: "GraphQL is natively discoverable.",
          exampleTranslation: "O GraphQL é nativamente explorável.",
        },
        {
          term: "discovery",
          translation: "descoberta",
        },
        {
          term: "disrespectful",
          translation: "desrespeitoso",
          example: "His tone was disrespectful.",
          exampleTranslation: "O tom dele foi desrespeitoso.",
          more: [
            { label: "Origem", text: "Sufixo -ful = cheio de. Ex.: respectful, helpful." },
          ],
        },
        {
          term: "dumb",
          translation: "burro, bobo",
          example: "That was a dumb mistake.",
          exampleTranslation: "Aquele foi um erro burro.",
        },
        {
          term: "duties",
          translation: "deveres, funções ou obrigações",
          example: "Cleaning the kitchen is one of my duties.",
          exampleTranslation: "Limpar a cozinha é um dos meus deveres.",
        },
        {
          term: "each",
          translation: "cada",
          example: "Each student got a book.",
          exampleTranslation: "Cada aluno recebeu um livro.",
        },
        {
          term: "early on",
          translation: "logo no início, nos primeiros tempos",
          example: "Early on, we used Basic Authentication.",
          exampleTranslation: "No início, nós usávamos Basic Authentication.",
          more: [
            { label: "Parecido", text: "at first e in the beginning." },
            { label: "Oposto", text: "later on." },
          ],
        },
        {
          term: "effort",
          translation: "esforço",
          example: "It takes a lot of effort.",
          exampleTranslation: "Dá muito trabalho.",
        },
        {
          term: "either",
          translation: "também (em frases negativas)",
          example: "I don't like it either.",
          exampleTranslation: "Eu também não gosto disso.",
          more: [
            { label: "Expressão", text: "either... or = ou... ou." },
          ],
        },
        {
          term: "enforcement",
          translation: "aplicação, fiscalização (de regras)",
          more: [
            { label: "Expressão", text: "law enforcement = autoridades policiais." },
          ],
        },
        {
          term: "engineers",
          translation: "engenheiros",
          example: "Engineers reviewed the code.",
          exampleTranslation: "Os engenheiros revisaram o código.",
          more: [
            { label: "Em tecnologia", text: "software engineer, DevOps engineer." },
            { label: "Verbo", text: "to engineer = projetar, construir." },
          ],
        },
        {
          term: "enterprise",
          translation: "corporativo",
        },
        {
          term: "enterprises",
          translation: "empresas",
          example: "Small enterprises often struggle to compete with big corporations.",
          exampleTranslation: "Pequenas empresas costumam ter dificuldade de competir com grandes corporações.",
        },
        {
          term: "entire",
          translation: "inteiro, todo",
          example: "The entire team worked on it.",
          exampleTranslation: "A equipe inteira trabalhou nisso.",
          more: [
            { label: "Uso", text: "Vem antes do substantivo." },
          ],
        },
        {
          term: "error-prone",
          translation: "propenso a erros",
          example: "Manual deployments are error-prone.",
          exampleTranslation: "Deploys manuais são propensos a erros.",
          more: [
            { label: "Palavra relacionada", text: "prone = propenso." },
          ],
        },
        {
          term: "even",
          translation: "até mesmo",
          example: "Even a child can do it.",
          exampleTranslation: "Até uma criança consegue fazer isso.",
          more: [
            { label: "Expressão", text: "even if = mesmo se." },
            { label: "Expressão", text: "not even = nem sequer." },
            { label: "Outro sentido", text: "par (número), plano, igual." },
          ],
        },
        {
          term: "every single one of",
          translation: "cada um, sem exceção",
          example: "Every single one of the tests passed.",
          exampleTranslation: "Cada um dos testes passou, sem exceção.",
        },
        {
          term: "exposure",
          translation: "exposição",
        },
        {
          term: "fairy",
          translation: "fada",
          example: "The story is about a fairy who grants wishes.",
          exampleTranslation: "A história é sobre uma fada que realiza desejos.",
        },
        {
          term: "far",
          translation: "longe / muito",
          example: "This went far beyond what apps needed.",
          exampleTranslation: "Isso foi muito além do que os apps precisavam.",
          more: [
            { label: "Expressão", text: "far beyond = muito além." },
            { label: "Expressão", text: "so far = até agora." },
            { label: "Expressão", text: "as far as I know = pelo que eu sei." },
            { label: "Forma", text: "Comparativo: farther/further." },
          ],
        },
        {
          term: "far more",
          translation: "muito mais",
          example: "I did far more than all of you.",
          exampleTranslation: "Eu fiz muito mais que todos vocês.",
        },
        {
          term: "fellow",
          translation: "colega, companheiro",
          more: [
            { label: "Expressão", text: "fellow students = colegas de classe." },
          ],
        },
        {
          term: "fellowship",
          translation: "irmandade, companheirismo",
          example: "The fellowship traveled together to the mountains.",
          exampleTranslation: "A irmandade viajou junta até as montanhas.",
          more: [
            { label: "Exemplo", example: "There was a strong sense of fellowship among the students.", exampleTranslation: "Havia um forte senso de companheirismo entre os alunos." },
            { label: "Outro sentido", text: "bolsa de estudos acadêmica.", example: "She won a research fellowship.", exampleTranslation: "Ela ganhou uma bolsa de pesquisa." },
            { label: "Palavra relacionada", text: "fellow = colega, companheiro." },
            { label: "Expressão", text: "fellow students = colegas de classe." },
          ],
        },
        {
          term: "flow",
          translation: "fluxo",
          example: "Checkout is a multistep flow: cart, address, payment.",
          exampleTranslation: "O checkout é um fluxo em várias etapas: carrinho, endereço, pagamento.",
        },
        {
          term: "for a while",
          translation: "por um tempo",
          example: "I’ve been gone for a while.",
          exampleTranslation: "Fiquei fora por um tempo.",
        },
        {
          term: "for instance",
          translation: "por exemplo",
          example: "For instance, Twitter offers three scope levels.",
          exampleTranslation: "Por exemplo, o Twitter oferece três níveis de scope.",
          more: [
            { label: "Parecido", text: "for example." },
            { label: "Uso", text: "Costuma abrir a frase, seguido de vírgula." },
          ],
        },
        {
          term: "for that matter",
          translation: "aliás, pra falar a verdade",
          example: "I don't use Windows, or Mac for that matter.",
          exampleTranslation: "Eu não uso Windows, nem Mac, aliás.",
          more: [
            { label: "Diferença", text: "Diferente de speaking of (por falar nisso)." },
          ],
        },
        {
          term: "freedom",
          translation: "liberdade",
          example: "They fought for freedom.",
          exampleTranslation: "Eles lutaram por liberdade.",
          more: [
            { label: "Origem", text: "free + -dom." },
            { label: "Expressão", text: "freedom of speech = liberdade de expressão." },
          ],
        },
        {
          term: "freshers",
          translation: "calouros (alunos do primeiro ano)",
          example: "Freshers' week starts on Monday.",
          exampleTranslation: "A semana dos calouros começa na segunda-feira.",
          more: [
            { label: "Variação", text: "Termo britânico." },
          ],
        },
        {
          term: "freshman",
          translation: "calouro (1º ano)",
          example: "She’s a freshman at the academy.",
          exampleTranslation: "Ela é caloura na academia.",
          more: [
            { label: "Exemplo", example: "Freshmen live in the old building.", exampleTranslation: "Os calouros moram no prédio antigo." },
            { label: "Plural", text: "freshmen." },
            { label: "Variação", text: "Forma neutra: first-year student." },
          ],
        },
        {
          term: "frightened of",
          translation: "com medo de",
          example: "She is frightened of heights.",
          exampleTranslation: "Ela tem medo de altura.",
          more: [
            { label: "Parecido", text: "afraid of." },
          ],
        },
        {
          term: "from time to time",
          translation: "de vez em quando",
          example: "I check the logs from time to time.",
          exampleTranslation: "Eu confiro os logs de vez em quando.",
        },
        {
          term: "further",
          translation: "além disso, também; adicional; no sentido de distância",
          example: "I can't go any further.",
          exampleTranslation: "Não consigo ir mais longe.",
          more: [
            { label: "Parecido", text: "No sentido de além disso, é igual a also." },
            { label: "Outro sentido", text: "adicional.", example: "For further information, contact us.", exampleTranslation: "Para mais informações, entre em contato." },
            { label: "Verbo", text: "to further = promover ou fazer avançar." },
          ],
        },
        {
          term: "gathering",
          translation: "reunião, encontro",
        },
        {
          term: "gists",
          translation: "trechos de código compartilhados (GitHub)",
          example: "A gist is a simple way to share code.",
          exampleTranslation: "Um gist é uma forma simples de compartilhar código.",
          more: [
            { label: "Em tecnologia", text: "No GitHub, gist é um snippet ou arquivo rápido, versionado." },
            { label: "Outro sentido", text: "gist = essência.", example: "I get the gist.", exampleTranslation: "Entendi a ideia geral." },
          ],
        },
        {
          term: "grain",
          translation: "grão",
        },
        {
          term: "granular",
          translation: "granular, detalhado, com controle fino",
          example: "Granular scopes give more control.",
          exampleTranslation: "Scopes granulares dão mais controle.",
          more: [
            { label: "Origem", text: "Vem de grain (grão). Granular = dividido em pequenas partes." },
            { label: "Em tecnologia", text: "permissões, logs e dados granulares." },
          ],
        },
        {
          term: "guilt",
          translation: "culpa",
          example: "She felt guilt after lying.",
          exampleTranslation: "Ela sentiu culpa depois de mentir.",
          more: [
            { label: "Adjetivo", text: "guilty = culpado.", example: "I feel guilty.", exampleTranslation: "Eu me sinto culpado." },
          ],
        },
        {
          term: "guilty",
          translation: "culpado",
          more: [
            { label: "Exemplo", example: "I feel guilty.", exampleTranslation: "Eu me sinto culpado." },
          ],
        },
        {
          term: "half",
          translation: "metade",
          example: "I ate half of the pizza.",
          exampleTranslation: "Comi metade da pizza.",
          more: [
            { label: "Expressão", text: "half an hour = meia hora." },
            { label: "Expressão", text: "half past two = duas e meia." },
            { label: "Plural", text: "halves." },
          ],
        },
        {
          term: "headmaster",
          translation: "diretor",
          example: "The headmaster called a meeting.",
          exampleTranslation: "O diretor convocou uma reunião.",
        },
        {
          term: "headmistress",
          translation: "diretora",
          example: "The headmistress welcomed the new students.",
          exampleTranslation: "A diretora deu boas-vindas aos novos alunos.",
        },
        {
          term: "highness",
          translation: "alteza",
          example: "Your Highness, please forgive me.",
          exampleTranslation: "Vossa Alteza, perdoe-me.",
        },
        {
          term: "hopefully",
          translation: "com sorte, espero que",
          example: "This is what will hopefully be a great year.",
          exampleTranslation: "Isso é o que espero que seja um ótimo ano.",
        },
        {
          term: "huge",
          translation: "enorme",
          more: [
            { label: "Parecido", text: "big, porém mais forte." },
          ],
        },
        {
          term: "impersonation",
          translation: "imitação, ato de se passar por alguém",
        },
        {
          term: "improvement",
          translation: "melhoria",
        },
        {
          term: "in a matter of days",
          translation: "em questão de dias",
          example: "We'll be done in a matter of days.",
          exampleTranslation: "Vamos terminar em questão de dias.",
          more: [
            { label: "Expressão", text: "in a matter of minutes = em questão de minutos." },
          ],
        },
        {
          term: "in fact",
          translation: "de fato",
          example: "In fact, I already finished the report.",
          exampleTranslation: "De fato, eu já terminei o relatório.",
        },
        {
          term: "in light of",
          translation: "à luz de, considerando",
          example: "In light of the recent events, the meeting was cancelled.",
          exampleTranslation: "Considerando os eventos recentes, a reunião foi cancelada.",
        },
        {
          term: "increasingly",
          translation: "cada vez mais",
          example: "The problem is becoming increasingly complex.",
          exampleTranslation: "O problema está ficando cada vez mais complexo.",
        },
        {
          term: "incredible",
          translation: "incrível",
          example: "The view was incredible.",
          exampleTranslation: "A vista era incrível.",
          more: [
            { label: "Origem", text: "in- + credible = não crível." },
            { label: "Parecido", text: "unbelievable (inacreditável)." },
          ],
        },
        {
          term: "inexcusable",
          translation: "imperdoável, sem desculpa",
          example: "That behavior is inexcusable.",
          exampleTranslation: "Esse comportamento é imperdoável.",
          more: [
            { label: "Origem", text: "in- (não) + excuse + -able." },
          ],
        },
        {
          term: "infamous",
          translation: "infame, de má fama",
          example: "He is an infamous hacker.",
          exampleTranslation: "Ele é um hacker infame.",
          more: [
            { label: "Observação", text: "Famoso por algo ruim." },
            { label: "Oposto", text: "O oposto de famous não é infamous, e sim unknown." },
          ],
        },
        {
          term: "instead of",
          translation: "em vez de",
          example: "Instead of complaining, help me.",
          exampleTranslation: "Em vez de reclamar, me ajude.",
          more: [
            { label: "Uso", text: "Seguido de verbo-ing." },
          ],
        },
        {
          term: "into",
          translation: "para dentro de, em",
          example: "He walked into the room.",
          exampleTranslation: "Ele entrou na sala.",
          more: [
            { label: "Uso", text: "Também aparece em phrasal verbs, tipo delve into." },
          ],
        },
        {
          term: "introspection",
          translation: "introspecção",
          example: "With introspection, you can ask the API which fields exist.",
          exampleTranslation: "Com introspecção, você pode perguntar à API quais campos existem.",
          more: [
            { label: "Em tecnologia", text: "Numa API: ela descreve a própria estrutura." },
          ],
        },
        {
          term: "issues",
          translation: "problemas, questões",
          example: "We have a performance issue.",
          exampleTranslation: "Nós temos um problema de performance.",
          more: [
            { label: "Em tecnologia", text: "issue no GitHub = tarefa ou bug registrado.", example: "Open an issue on GitHub.", exampleTranslation: "Abra uma issue no GitHub." },
            { label: "Verbo", text: "issue = emitir.", example: "The provider issues a client ID.", exampleTranslation: "O provedor emite um client ID." },
          ],
        },
        {
          term: "job",
          translation: "trabalho",
          example: "I’m tired of this crap job.",
          exampleTranslation: "Estou cansado desse trabalho de merda.",
        },
        {
          term: "kind",
          translation: "espécie, raça ou tipo",
          example: "What kind of music do you like?",
          exampleTranslation: "Que tipo de música você gosta?",
        },
        {
          term: "king",
          translation: "rei",
        },
        {
          term: "kingdom",
          translation: "reino",
          example: "The queen ruled the kingdom for years.",
          exampleTranslation: "A rainha governou o reino por anos.",
          more: [
            { label: "Origem", text: "king = rei + -dom." },
            { label: "Parecido", text: "realm." },
          ],
        },
        {
          term: "label",
          translation: "rótulo, etiqueta",
        },
        {
          term: "ladies",
          translation: "moças, senhoras",
          example: "Good evening, ladies.",
          exampleTranslation: "Boa noite, moças.",
          more: [
            { label: "Singular", text: "lady." },
            { label: "Expressão", text: "ladies and gentlemen = senhoras e senhores." },
          ],
        },
        {
          term: "laws",
          translation: "leis",
          example: "New laws were passed last year.",
          exampleTranslation: "Novas leis foram aprovadas no ano passado.",
          more: [
            { label: "Expressão", text: "the laws of physics = as leis da física." },
          ],
        },
        {
          term: "leadership",
          translation: "liderança",
          example: "She has strong leadership skills.",
          exampleTranslation: "Ela tem fortes habilidades de liderança.",
        },
        {
          term: "leaky",
          translation: "que vaza, com vazamento",
        },
        {
          term: "loo roll",
          translation: "papel higiênico",
          example: "We ran out of loo roll.",
          exampleTranslation: "Ficamos sem papel higiênico.",
        },
        {
          term: "lunch",
          translation: "almoço",
          example: "Let's have lunch together.",
          exampleTranslation: "Vamos almoçar juntos.",
        },
        {
          term: "meal",
          translation: "refeição",
          example: "That was a delicious meal.",
          exampleTranslation: "Aquela foi uma refeição deliciosa.",
        },
        {
          term: "means",
          translation: "meio, forma",
          example: "He got access by other means.",
          exampleTranslation: "Ele conseguiu acesso por outros meios.",
          more: [
            { label: "Uso", text: "Fica igual no singular e no plural." },
            { label: "Expressão", text: "via a bug or other means = por um bug ou outros meios." },
            { label: "Expressão", text: "by all means = com certeza, fique à vontade." },
            { label: "Expressão", text: "a means to an end = um meio para um fim." },
            { label: "Verbo", text: "means também é o verbo mean (significa).", example: "What does this mean?", exampleTranslation: "O que isso significa?" },
          ],
        },
        {
          term: "meanwhile",
          translation: "enquanto isso",
          example: "I was cooking, meanwhile, she was cleaning.",
          exampleTranslation: "Eu estava cozinhando; enquanto isso, ela estava limpando.",
          more: [
            { label: "Uso", text: "Traz o sentido de que, enquanto uma coisa acontece, outra ocorre ao mesmo tempo — parecido com while." },
          ],
        },
        {
          term: "mighty",
          translation: "poderoso / majestoso",
          example: "The mighty river flows through the valley.",
          exampleTranslation: "O rio majestoso flui pelo vale.",
        },
        {
          term: "mistress",
          translation: "mestra",
          example: "The mistress taught them a new spell.",
          exampleTranslation: "A mestra ensinou a eles um novo feitiço.",
        },
        {
          term: "misunderstanding",
          translation: "mal-entendido",
          example: "It was just a misunderstanding.",
          exampleTranslation: "Foi só um mal-entendido.",
          more: [
            { label: "Verbo", text: "misunderstand." },
          ],
        },
        {
          term: "moreover",
          translation: "além disso, ademais (formal)",
          example: "Moreover, users felt more comfortable.",
          exampleTranslation: "Além disso, usuários se sentiram mais confortáveis.",
          more: [
            { label: "Parecido", text: "furthermore e also no começo da frase. Mais formal que besides." },
            { label: "Uso", text: "Costuma ter vírgula depois. Aparece bastante em livro técnico; na conversa do dia a dia o natural é also ou plus." },
          ],
        },
        {
          term: "multistep",
          translation: "em várias etapas",
          example: "Checkout is a multistep flow: cart, address, payment.",
          exampleTranslation: "O checkout é um fluxo em várias etapas: carrinho, endereço, pagamento.",
          more: [
            { label: "Origem", text: "multi- = vários; step = etapa/passo." },
            { label: "Variação", text: "O hífen é opcional (multi-step)." },
            { label: "Parecido", text: "multi-factor, multiplayer." },
          ],
        },
        {
          term: "my dear",
          translation: "minha querida",
          example: "Come here, my dear.",
          exampleTranslation: "Venha aqui, minha querida.",
        },
        {
          term: "myself",
          translation: "eu mesmo",
          example: "I did it myself.",
          exampleTranslation: "Eu mesmo fiz isso.",
          more: [
            { label: "Uso", text: "Usado pra indicar você mesmo dentro de uma frase." },
            { label: "Expressão", text: "students like myself and Gabriel = estudantes como eu e Gabriel." },
            { label: "Expressão", text: "I did it myself = eu mesmo fiz isso." },
          ],
        },
        {
          term: "narrow",
          translation: "estreito",
        },
        {
          term: "nearly",
          translation: "quase",
          example: "I nearly forgot my keys.",
          exampleTranslation: "Eu quase esqueci minhas chaves.",
        },
        {
          term: "nicely",
          translation: "bem, de forma agradável",
          example: "It doesn't fit into REST nicely.",
          exampleTranslation: "Isso não se encaixa bem no REST.",
        },
        {
          term: "noise",
          translation: "ruído ou barulho",
        },
        {
          term: "noisy",
          translation: "barulhento",
        },
        {
          term: "nothing but",
          translation: "nada além de / somente",
          example: "He wants nothing but the truth.",
          exampleTranslation: "Ele quer nada além da verdade.",
        },
        {
          term: "now that",
          translation: "agora que",
          example: "Now that you're here, we can start.",
          exampleTranslation: "Agora que você está aqui, podemos começar.",
        },
        {
          term: "often",
          translation: "frequentemente, muitas vezes",
        },
        {
          term: "onus",
          translation: "ônus ou responsabilidade",
        },
        {
          term: "out with it",
          translation: "desembucha, fala logo",
          example: "Something’s wrong. Out with it!",
          exampleTranslation: "Tem algo errado. Desembucha!",
          more: [
            { label: "Exemplo", example: "Come on, out with it, what happened?", exampleTranslation: "Vamos, desembucha, o que aconteceu?" },
          ],
        },
        {
          term: "outside",
          translation: "fora de",
          example: "Developers outside the company use our API.",
          exampleTranslation: "Desenvolvedores de fora da empresa usam a nossa API.",
          more: [
            { label: "Oposto", text: "inside." },
            { label: "Expressão", text: "outside your company = fora da sua empresa." },
            { label: "Substantivo", text: "outsider = quem é de fora." },
            { label: "Variação", text: "Também vale outside of." },
          ],
        },
        {
          term: "outsider",
          translation: "quem é de fora",
        },
        {
          term: "overall",
          translation: "em geral, no todo, em suma",
          example: "Overall, the trip was great.",
          exampleTranslation: "No geral, a viagem foi ótima.",
        },
        {
          term: "overhead",
          translation: "custo extra",
        },
        {
          term: "pattern",
          translation: "padrão",
          example: "This is a common design pattern in software.",
          exampleTranslation: "Esse é um padrão de projeto comum em software.",
          more: [
            { label: "Expressão", text: "design pattern = padrão de projeto." },
          ],
        },
        {
          term: "pawn",
          translation: "peão (xadrez) / alguém manipulado",
          example: "He was just a pawn in their plan.",
          exampleTranslation: "Ele era só uma peça no plano deles.",
          more: [
            { label: "Expressão", text: "move a pawn = mover um peão." },
            { label: "Verbo", text: "penhorar." },
          ],
        },
        {
          term: "pendant",
          translation: "pingente",
          example: "She wore a silver pendant.",
          exampleTranslation: "Ela usava um pingente de prata.",
          more: [
            { label: "Exemplo", example: "The pendant glowed.", exampleTranslation: "O pingente brilhou." },
          ],
        },
        {
          term: "plumbing",
          translation: "encanamento",
          example: "The plumbing in this house is old.",
          exampleTranslation: "O encanamento dessa casa é velho.",
        },
        {
          term: "poor",
          translation: "pobre, mas também ruim, fraco",
          example: "The app has poor performance.",
          exampleTranslation: "O app tem um desempenho ruim.",
          more: [
            { label: "Exemplo", example: "We have a poor connection.", exampleTranslation: "Nossa conexão está ruim." },
            { label: "Outro sentido", text: "pobre: a poor family = uma família pobre." },
            { label: "Expressão", text: "Poor guy! = coitado!" },
            { label: "Oposto", text: "good (em qualidade)." },
          ],
        },
        {
          term: "prevalence",
          translation: "prevalência",
        },
        {
          term: "prevalent",
          translation: "predominante, comum, muito difundido",
          example: "SQL injection is a prevalent attack.",
          exampleTranslation: "SQL injection é um ataque muito comum.",
          more: [
            { label: "Substantivo", text: "prevalence." },
            { label: "Parecido", text: "common, widespread." },
          ],
        },
        {
          term: "pride",
          translation: "orgulho",
        },
        {
          term: "prison",
          translation: "prisão",
        },
        {
          term: "prisoner",
          translation: "prisioneiro",
          example: "The prisoner escaped last night.",
          exampleTranslation: "O prisioneiro fugiu ontem à noite.",
          more: [
            { label: "Exemplo", example: "They took her prisoner.", exampleTranslation: "Eles a capturaram." },
            { label: "Palavra relacionada", text: "prison = prisão." },
            { label: "Expressão", text: "take someone prisoner = capturar alguém." },
            { label: "Expressão", text: "prisoner of war = prisioneiro de guerra." },
          ],
        },
        {
          term: "procedure",
          translation: "procedimento",
          example: "RPC stands for Remote Procedure Call.",
          exampleTranslation: "RPC significa Remote Procedure Call (chamada de procedimento remoto).",
          more: [
            { label: "Em tecnologia", text: "Remote Procedure Call (RPC)." },
          ],
        },
        {
          term: "profit",
          translation: "lucro",
          example: "The company made a huge profit this year.",
          exampleTranslation: "A empresa teve um lucro enorme esse ano.",
        },
        {
          term: "prone",
          translation: "propenso",
        },
        {
          term: "proud",
          translation: "orgulhoso",
          example: "I’m so proud of you.",
          exampleTranslation: "Estou muito orgulhoso de você.",
          more: [
            { label: "Uso", text: "proud of + algo/alguém." },
            { label: "Substantivo", text: "pride = orgulho." },
          ],
        },
        {
          term: "providers",
          translation: "provedores",
          example: "The provider issues a token.",
          exampleTranslation: "O provedor emite um token.",
          more: [
            { label: "Forma", text: "Plural de provider." },
            { label: "Expressão", text: "API provider = quem oferece a API." },
            { label: "Expressão", text: "cloud provider = provedor de nuvem." },
            { label: "Verbo", text: "provide." },
          ],
        },
        {
          term: "pulse",
          translation: "pulso, pulsação",
          example: "I could feel his pulse.",
          exampleTranslation: "Eu conseguia sentir o pulso dele.",
          more: [
            { label: "Exemplo", example: "Her pulse was racing.", exampleTranslation: "O coração dela estava disparado." },
            { label: "Verbo", text: "to pulse = pulsar." },
          ],
        },
        {
          term: "putrid",
          translation: "podre",
          example: "A putrid smell came from the trash.",
          exampleTranslation: "Um cheiro podre vinha do lixo.",
          more: [
            { label: "Observação", text: "Cheiro de coisa apodrecendo." },
          ],
        },
        {
          term: "queen",
          translation: "rainha",
          example: "The queen addressed the nation.",
          exampleTranslation: "A rainha se dirigiu à nação.",
        },
        {
          term: "queries",
          translation: "consultas",
          example: "The server parses complex queries.",
          exampleTranslation: "O servidor interpreta consultas complexas.",
          more: [
            { label: "Forma", text: "Plural de query (y → ies)." },
          ],
        },
        {
          term: "ranks",
          translation: "fileiras, posições",
          example: "Join our ranks!",
          exampleTranslation: "Junte-se às nossas fileiras!",
          more: [
            { label: "Expressão", text: "rise through the ranks = subir de cargo." },
            { label: "Verbo", text: "rank = classificar." },
          ],
        },
        {
          term: "rash",
          translation: "precipitado (adjetivo); assadura, erupção na pele (substantivo)",
          example: "You are so rash.",
          exampleTranslation: "Você é muito precipitado.",
          more: [
            { label: "Uso", text: "so much acompanha verbo (I like it so much = eu gosto muito disso); com adjetivo usa-se so ou very." },
          ],
        },
        {
          term: "rate",
          translation: "taxa, ritmo ou velocidade (depende do contexto)",
          example: "The rate of change in this industry is high.",
          exampleTranslation: "O ritmo de mudança nessa indústria é alto.",
          more: [
            { label: "Expressão", text: "interest rate = taxa de juros." },
            { label: "Expressão", text: "heart rate = frequência cardíaca." },
          ],
        },
        {
          term: "rather",
          translation: "bastante (intensificador)",
          example: "I'd rather stay home.",
          exampleTranslation: "Eu prefiro ficar em casa.",
          more: [
            { label: "Uso", text: "Pra 'preferir': would rather + verbo base, sem to.", example: "I'd rather stay home.", exampleTranslation: "Eu prefiro ficar em casa." },
            { label: "Expressão", text: "rather than = em vez de." },
          ],
        },
        {
          term: "realm",
          translation: "reino",
          example: "He lives in the dark realm.",
          exampleTranslation: "Ele vive no reino sombrio.",
        },
        {
          term: "record",
          translation: "registro (substantivo) / gravar, registrar (verbo)",
          more: [
            { label: "Substantivo", text: "Em banco de dados é uma linha de dados.", example: "The database has 1,000 records.", exampleTranslation: "O banco de dados tem 1.000 registros." },
            { label: "Verbo", example: "We record all requests in a log.", exampleTranslation: "Nós registramos todas as requisições em um log." },
            { label: "Expressão", text: "break a record = bater um recorde." },
            { label: "Expressão", text: "on record = oficialmente registrado." },
          ],
        },
        {
          term: "relationship",
          translation: "relação, relacionamento",
          example: "The relationship between users and orders is clear.",
          exampleTranslation: "A relação entre usuários e pedidos é clara.",
        },
        {
          term: "replacement",
          translation: "substituição, substituto",
          example: "I need a replacement for this broken part.",
          exampleTranslation: "Eu preciso de uma substituição para essa peça quebrada.",
        },
        {
          term: "revenue",
          translation: "receita, faturamento",
          example: "The company’s annual revenue grew 20%.",
          exampleTranslation: "O faturamento anual da empresa cresceu 20%.",
          more: [
            { label: "Observação", text: "É o dinheiro que entra, antes de descontar custos." },
            { label: "Diferença", text: "profit = lucro (depois dos custos)." },
            { label: "Expressão", text: "revenue stream = fonte de receita." },
          ],
        },
        {
          term: "revocation",
          translation: "revogação",
        },
        {
          term: "room",
          translation: "cômodo; espaço, margem",
          example: "There's room for improvement.",
          exampleTranslation: "Há espaço para melhorias.",
          more: [
            { label: "Observação", text: "Não é só 'quarto' (isso é bedroom). Room é qualquer cômodo, e também espaço/margem." },
          ],
        },
        {
          term: "round trip",
          translation: "ida e volta",
          example: "Each request is a round trip to the server.",
          exampleTranslation: "Cada requisição é uma ida e volta até o servidor.",
          more: [
            { label: "Expressão", text: "round-trip ticket = passagem de ida e volta." },
          ],
        },
        {
          term: "rousing",
          translation: "empolgante, que levanta o ânimo",
          example: "She gave a rousing speech.",
          exampleTranslation: "Ela fez um discurso empolgante.",
          more: [
            { label: "Verbo", text: "rouse = despertar, agitar." },
          ],
        },
        {
          term: "rubbish fire",
          translation: "desastre total (literalmente “fogueira de lixo”)",
          example: "The launch was a rubbish fire.",
          exampleTranslation: "O lançamento foi um desastre total.",
          more: [
            { label: "Parecido", text: "dumpster fire (americano)." },
            { label: "Variação", text: "No Reino Unido a forma mais comum é bin fire." },
          ],
        },
        {
          term: "sacred",
          translation: "sagrado",
          example: "It is his sacred duty to protect the kingdom.",
          exampleTranslation: "É seu dever sagrado proteger o reino.",
        },
        {
          term: "safe",
          translation: "seguro",
          example: "Is it safe here?",
          exampleTranslation: "É seguro aqui?",
        },
        {
          term: "safety",
          translation: "segurança",
          example: "Safety comes first.",
          exampleTranslation: "Segurança em primeiro lugar.",
        },
        {
          term: "schedule",
          translation: "agenda",
          example: "I need to check my schedule.",
          exampleTranslation: "Preciso checar minha agenda.",
        },
        {
          term: "scope",
          translation: "escopo, alcance",
          example: "The scope of the project changed.",
          exampleTranslation: "O escopo do projeto mudou.",
          more: [
            { label: "Exemplo", example: "That’s outside the scope of this task.", exampleTranslation: "Isso está fora do escopo desta tarefa." },
            { label: "Em tecnologia", text: "Em OAuth: permissão que limita o acesso do app." },
            { label: "Expressão", text: "scope creep = escopo crescendo sem controle (parecido com payload creep)." },
          ],
        },
        {
          term: "shame",
          translation: "pena",
          example: "It's a shame you can't come.",
          exampleTranslation: "É uma pena que você não possa vir.",
        },
        {
          term: "shining",
          translation: "brilhante",
          example: "Her shining smile lit up the room.",
          exampleTranslation: "O sorriso brilhante dela iluminou a sala.",
        },
        {
          term: "shortly",
          translation: "em breve, logo (tempo curto)",
          example: "I'll be there shortly.",
          exampleTranslation: "Eu estarei lá em breve (logo).",
        },
        {
          term: "silly",
          translation: "bobo, bobagem",
          example: "Don’t be silly, it’s just a game.",
          exampleTranslation: "Não seja bobo, é só um jogo.",
          more: [
            { label: "Exemplo", example: "That’s a silly question.", exampleTranslation: "Essa é uma pergunta boba." },
          ],
        },
        {
          term: "simultaneously",
          translation: "simultaneamente",
        },
        {
          term: "sincere",
          translation: "sincero",
          example: "He gave a sincere apology.",
          exampleTranslation: "Ele fez um pedido de desculpas sincero.",
        },
        {
          term: "sincerest",
          translation: "o mais sincero",
          example: "Please accept my sincerest apologies.",
          exampleTranslation: "Por favor, aceite minhas mais sinceras desculpas.",
        },
        {
          term: "sis",
          translation: "maninha",
          example: "Thanks, sis!",
          exampleTranslation: "Valeu, maninha!",
          more: [
            { label: "Observação", text: "Abreviação de sister, como bro é de brother." },
          ],
        },
        {
          term: "slight",
          translation: "leve, pequeno",
          example: "There is a slight chance of rain.",
          exampleTranslation: "Há uma leve chance de chuva.",
          more: [
            { label: "Expressão", text: "not in the slightest = de jeito nenhum." },
            { label: "Advérbio", text: "slightly." },
          ],
        },
        {
          term: "slightly",
          translation: "levemente, um pouco",
        },
        {
          term: "sophomore",
          translation: "aluno do 2º ano",
          example: "He’s a sophomore, so he already knows the rules.",
          exampleTranslation: "Ele é do 2º ano, então já conhece as regras.",
          more: [
            { label: "Observação", text: "Sequência (EUA): freshman → sophomore → junior → senior." },
          ],
        },
        {
          term: "speech",
          translation: "discurso, fala",
          example: "The queen gave a long speech.",
          exampleTranslation: "A rainha fez um longo discurso.",
          more: [
            { label: "Verbo", text: "speak." },
            { label: "Expressão", text: "freedom of speech = liberdade de expressão." },
          ],
        },
        {
          term: "spirit",
          translation: "espírito",
          example: "The spirit of the forest protects us.",
          exampleTranslation: "O espírito da floresta nos protege.",
          more: [
            { label: "Outro sentido", text: "ânimo." },
            { label: "Expressão", text: "team spirit = espírito de equipe." },
          ],
        },
        {
          term: "spring",
          translation: "primavera",
          example: "Flowers bloom in spring.",
          exampleTranslation: "As flores desabrocham na primavera.",
        },
        {
          term: "stale",
          translation: "velho, desatualizado",
        },
        {
          term: "standard",
          translation: "padrão",
          example: "OAuth 2.0 is the industry-standard protocol.",
          exampleTranslation: "O OAuth 2.0 é o protocolo padrão da indústria.",
          more: [
            { label: "Observação", text: "Substantivo e adjetivo." },
            { label: "Expressão", text: "industry-standard = padrão da indústria." },
            { label: "Expressão", text: "open standard = padrão aberto." },
            { label: "Expressão", text: "standard library = biblioteca padrão." },
            { label: "Expressão", text: "high standards = alto nível de exigência." },
            { label: "Verbo", text: "standardize." },
          ],
        },
        {
          term: "step",
          translation: "etapa, passo",
        },
        {
          term: "subresource",
          translation: "subrecurso",
          example: "Issues are a subresource of a repository.",
          exampleTranslation: "Issues são um subrecurso de um repositório.",
        },
        {
          term: "such",
          translation: "tal, tão, desse tipo",
          example: "Users felt comfortable giving such access.",
          exampleTranslation: "Usuários se sentiram confortáveis em dar tal acesso.",
          more: [
            { label: "Expressão", text: "such as = tal como, como. Aparece pra listar exemplos." },
            { label: "Expressão", text: "such a good idea = uma ideia tão boa." },
          ],
        },
        {
          term: "sweetie",
          translation: "querida, fofa",
          example: "Thanks, sweetie!",
          exampleTranslation: "Valeu, querida!",
          more: [
            { label: "Observação", text: "Carinhoso, serve pra qualquer pessoa." },
          ],
        },
        {
          term: "tendency",
          translation: "tendência",
        },
        {
          term: "that one",
          translation: "essa, esse",
          example: "I don't want this one, I want that one.",
          exampleTranslation: "Eu não quero esse, eu quero aquele.",
          more: [
            { label: "Uso", text: "Sentido de 'isso aí' — retorna algo específico já mencionado." },
          ],
        },
        {
          term: "the one who",
          translation: "aquele que",
          example: "The one who rules is the queen.",
          exampleTranslation: "Aquele que governa é a rainha.",
        },
        {
          term: "thereby",
          translation: "desse modo, com isso",
          example: "He signed the paper, thereby accepting the terms.",
          exampleTranslation: "Ele assinou o papel, aceitando assim os termos.",
          more: [
            { label: "Observação", text: "Formal, aparece em textos escritos." },
          ],
        },
        {
          term: "those",
          translation: "aqueles / aquelas",
          example: "Those are my books.",
          exampleTranslation: "Aqueles são meus livros.",
          more: [
            { label: "Uso", text: "Retorna algo já mencionado." },
          ],
        },
        {
          term: "though",
          translation: "embora",
          example: "Though it's raining, we'll go out.",
          exampleTranslation: "Embora esteja chovendo, vamos sair.",
          more: [
            { label: "Uso", text: "Em início de frase, funciona como 'embora'." },
          ],
        },
        {
          term: "threats",
          translation: "ameaças",
          example: "The company received several threats.",
          exampleTranslation: "A empresa recebeu várias ameaças.",
        },
        {
          term: "through",
          translation: "através de, por meio de",
          example: "You access everything through a single endpoint.",
          exampleTranslation: "Você acessa tudo através de um único endpoint.",
        },
        {
          term: "till",
          translation: "até",
          example: "I'll wait till you arrive.",
          exampleTranslation: "Vou esperar até você chegar.",
          more: [
            { label: "Parecido", text: "Mesma coisa que until, porém mais informal e comum." },
          ],
        },
        {
          term: "trash can",
          translation: "lata de lixo",
          example: "Put it in the trash can.",
          exampleTranslation: "Coloque na lata de lixo.",
          more: [
            { label: "Variação", text: "Trash can é americano; rubbish bin é britânico." },
          ],
        },
        {
          term: "trip",
          translation: "viagem",
          example: "We took a few brief trips last year.",
          exampleTranslation: "Fizemos algumas viagens curtas no ano passado.",
        },
        {
          term: "troops",
          translation: "tropas",
          example: "The troops marched toward the castle.",
          exampleTranslation: "As tropas marcharam em direção ao castelo.",
          more: [
            { label: "Uso", text: "troop no singular é uma unidade. Em geral, usa-se no plural." },
          ],
        },
        {
          term: "trouble",
          translation: "problema",
          example: "We had trouble finding the address.",
          exampleTranslation: "Tivemos problema para encontrar o endereço.",
        },
        {
          term: "two-way",
          translation: "mão dupla",
        },
        {
          term: "unable",
          translation: "incapaz, sem conseguir fazer algo",
          example: "I was unable to attend the meeting.",
          exampleTranslation: "Eu não consegui comparecer à reunião.",
          more: [
            { label: "Oposto", text: "able (capaz)." },
          ],
        },
        {
          term: "unbelievable",
          translation: "inacreditável",
        },
        {
          term: "under attack",
          translation: "sob ataque",
          example: "The server is under attack.",
          exampleTranslation: "O servidor está sob ataque.",
        },
        {
          term: "unfortunately",
          translation: "infelizmente",
          example: "Unfortunately, the server is down.",
          exampleTranslation: "Infelizmente, o servidor está fora do ar.",
        },
        {
          term: "unlike",
          translation: "diferente de",
          example: "Unlike REST, GraphQL has one endpoint.",
          exampleTranslation: "Diferente do REST, o GraphQL tem um único endpoint.",
        },
        {
          term: "unwilling",
          translation: "relutante, sem vontade de fazer algo",
          example: "He was unwilling to help.",
          exampleTranslation: "Ele estava relutante em ajudar (ele não queria ajudar).",
          more: [
            { label: "Oposto", text: "willing (disposto)." },
          ],
        },
        {
          term: "upon",
          translation: "ao, assim que",
          example: "Upon receiving the request, the server responds.",
          exampleTranslation: "Ao receber a requisição, o servidor responde.",
          more: [
            { label: "Uso", text: "Formal. upon + substantivo/-ing descreve algo que acontece logo em seguida. É a versão formal de on e when." },
            { label: "Expressão", text: "once upon a time = era uma vez." },
          ],
        },
        {
          term: "vast",
          translation: "vasto",
          example: "The realm is as vast as the Otherworld.",
          exampleTranslation: "O reino é tão vasto quanto o Outro Mundo.",
          more: [
            { label: "Expressão", text: "as vast as = tão vasto quanto." },
          ],
        },
        {
          term: "volition",
          translation: "vontade própria",
          example: "He left of his own volition.",
          exampleTranslation: "Ele saiu por vontade própria.",
          more: [
            { label: "Observação", text: "Formal." },
          ],
        },
        {
          term: "wall",
          translation: "parede, muro",
          example: "The firewall blocks the attack.",
          exampleTranslation: "O firewall bloqueia o ataque.",
          more: [
            { label: "Em tecnologia", text: "firewall." },
          ],
        },
        {
          term: "warriors",
          translation: "guerreiros",
          example: "The warriors protected the kingdom.",
          exampleTranslation: "Os guerreiros protegeram o reino.",
          more: [
            { label: "Singular", text: "warrior." },
            { label: "Expressão", text: "a brave warrior = um guerreiro corajoso." },
          ],
        },
        {
          term: "wary",
          translation: "cuidadoso, cauteloso, desconfiado",
        },
        {
          term: "waste",
          translation: "desperdício",
        },
        {
          term: "weird",
          translation: "estranho",
          example: "It felt weird being back home.",
          exampleTranslation: "Foi estranho estar de volta em casa.",
        },
        {
          term: "what it's about",
          translation: "sobre o que é? do que se trata?",
          example: "I don't know what it's about.",
          exampleTranslation: "Eu não sei do que se trata.",
        },
        {
          term: "whatsoever",
          translation: "de forma alguma, nenhum (reforço de negação)",
          example: "There is no reason whatsoever to panic.",
          exampleTranslation: "Não existe motivo algum pra entrar em pânico.",
          more: [
            { label: "Exemplo", example: "I have no interest whatsoever.", exampleTranslation: "Não tenho interesse nenhum." },
            { label: "Uso", text: "Vai depois de no + substantivo ou none, pra dar ênfase." },
            { label: "Parecido", text: "at all." },
          ],
        },
        {
          term: "whenever",
          translation: "sempre que",
        },
        {
          term: "whereas",
          translation: "enquanto que, ao passo que",
          example: "REST is about resources, whereas RPC is about actions.",
          exampleTranslation: "O REST gira em torno de recursos, enquanto o RPC gira em torno de ações.",
        },
        {
          term: "which is why",
          translation: "por isso que, razão pela qual",
          example: "I was sick, which is why I missed class.",
          exampleTranslation: "Eu estava doente, por isso que perdi a aula.",
        },
        {
          term: "whilst",
          translation: "enquanto (britânico, formal)",
          example: "Whilst waiting, she read a book.",
          exampleTranslation: "Enquanto esperava, ela leu um livro.",
          more: [
            { label: "Parecido", text: "while (mesmo sentido)." },
          ],
        },
        {
          term: "whom",
          translation: "quem (objeto), formal",
          example: "To whom did you give the key?",
          exampleTranslation: "A quem você deu a chave?",
          more: [
            { label: "Expressão", text: "To whom it may concern = A quem possa interessar." },
            { label: "Uso", text: "who = sujeito, whom = objeto." },
          ],
        },
        {
          term: "wide",
          translation: "largo",
        },
        {
          term: "widely",
          translation: "amplamente",
          example: "The API is widely used.",
          exampleTranslation: "A API é amplamente usada.",
          more: [
            { label: "Expressão", text: "widely known = amplamente conhecido." },
            { label: "Expressão", text: "widely adopted = amplamente adotado." },
            { label: "Adjetivo", text: "wide = largo." },
          ],
        },
        {
          term: "with no",
          translation: "sem",
          example: "She left with no explanation.",
          exampleTranslation: "Ela saiu sem explicação.",
        },
        {
          term: "within",
          translation: "dentro de",
          example: "A comment exists within an issue.",
          exampleTranslation: "Um comentário existe dentro de uma issue.",
          more: [
            { label: "Parecido", text: "Mais formal que inside." },
          ],
        },
        {
          term: "wonderful",
          translation: "maravilhoso",
          example: "We had a wonderful time.",
          exampleTranslation: "Nós tivemos um tempo maravilhoso.",
        },
        {
          term: "worthwhile",
          translation: "que vale a pena",
          example: "Learning Docker was worthwhile.",
          exampleTranslation: "Aprender Docker valeu a pena.",
          more: [
            { label: "Parecido", text: "worth it e worth + -ing (it's worth reading = vale a pena ler)." },
          ],
        },
        {
          term: "wrath",
          translation: "ira, fúria",
          example: "He feared the king's wrath.",
          exampleTranslation: "Ele temia a ira do rei.",
        },
      ],
      expressions: [
        {
          phrase: "a bunch of",
          translation: "um bando de, um grupo de",
          example: "A bunch of friends.",
          exampleTranslation: "Um bando de amigos.",
        },
        {
          phrase: "about / around",
          translation: "sobre / acerca de / cerca de",
          explanation: "About pode se traduzir como 'sobre', mas também pode ser usado em outros contextos, como 'cerca de'.",
          example: "I sleep about 7 hours.",
          exampleTranslation: "Eu durmo cerca de 7 horas.",
        },
        {
          phrase: "across",
          translation: "através de, ao longo de, do outro lado de",
          example: "Identity is created and maintained across cloud software accounts.",
          exampleTranslation: "Identidade é criada e mantida através de contas de software na nuvem.",
        },
        {
          phrase: "Although",
          translation: "embora, apesar de",
          example: "Although it's late, I'll study.",
          exampleTranslation: "Embora esteja tarde, eu vou estudar.",
        },
        {
          phrase: "and yet",
          translation: "e mesmo assim",
          example: "He studied all night, and yet he failed.",
          exampleTranslation: "Ele estudou a noite toda, e mesmo assim foi reprovado.",
        },
        {
          phrase: "appears as though",
          translation: "parece que (formal)",
          explanation: "Sinônimo mais informal: it seems like. As though = como se.",
          example: "It appears as though the server is down.",
          exampleTranslation: "Parece que o servidor está fora do ar.",
        },
        {
          phrase: "business",
          translation: "negócio, empresa",
          example: "I have my own business.",
          exampleTranslation: "Eu tenho meu próprio negócio.",
        },
        {
          phrase: "kinda / kind of",
          translation: "meio, tipo",
          example: "I think they are kinda cute.",
          exampleTranslation: "Eu acho eles meio fofos.",
        },
        {
          phrase: "seamlessly",
          translation: "perfeitamente, sem falhas, sem emendas visíveis",
          explanation: "Literalmente 'sem costura' (seam = costura).",
          example: "The two pieces fit together seamlessly.",
          exampleTranslation: "As duas peças se encaixam perfeitamente.",
        },
        {
          phrase: "supposed to",
          translation: "deveria, é pra",
          explanation: "Indica obrigação ou expectativa. Também aparece em perguntas: what is it supposed to do? = o que é pra isso fazer? / o que isso deveria fazer?",
          example: "You are supposed to be here at 9am.",
          exampleTranslation: "Você deveria estar aqui às 9h.",
        },
        {
          phrase: "Therefore",
          translation: "portanto, por isso",
          example: "Therefore, I decided to study.",
          exampleTranslation: "Portanto, eu decidi estudar.",
        },
        {
          phrase: "Throughout",
          translation: "ao longo de, por todo",
          example: "Throughout the day, I worked hard.",
          exampleTranslation: "Ao longo do dia eu trabalhei bastante.",
        },
      ],
    },
  ],
  relatedSlugs: ["verbos", "if-only-superlativo"],
};
