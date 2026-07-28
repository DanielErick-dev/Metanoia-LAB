import { TopicData } from "@/lib/types/topic";

export const romanos: TopicData = {
  slug: "romanos",
  title: "Romanos",
  subtitle: "A carta magna do Evangelho",
  categorySlug: "teologia",
  accent: "#f87171",
  image: "/images/carta_aos_romanos.jpg",
  imagePosition: "center",
  quote: {
    text: "Porque não me envergonho do evangelho, pois é o poder de Deus para a salvação de todo aquele que crê.",
    source: "Romanos 1:16",
  },
  intro:
    "Escrita pelo apóstolo Paulo por volta de 57 d.C., a Carta aos Romanos é a exposição mais sistemática do Evangelho cristão na Bíblia. Em 16 capítulos, Paulo trata da condição humana, da justiça de Deus, da fé, da graça, da eleição e da vida nova em Cristo.",
  sections: [
    {
      heading: "Estrutura da carta",
      body: "Romanos 1-3 diagnostica a condição de todos os seres humanos — judeus e gentios — diante de Deus: todos pecaram. Romanos 3-5 apresenta a solução: justificação pela fé em Cristo. Romanos 6-8 trata da vida no Espírito. Romanos 9-11 aborda o plano de Deus para Israel. Romanos 12-16 aplica tudo à vida prática.",
    },
    {
      heading: "O coração da carta: Romanos 3:21-26",
      body: "Esses seis versículos concentram o núcleo do Evangelho paulino: Deus é ao mesmo tempo justo e justificador. Ele não simplesmente ignora o pecado — ele o julga em Cristo, no sacrifício expiatório da cruz. A fé une o crente a Cristo e sua justiça.",
    },
    {
      heading: "Impacto histórico",
      body: "A Carta aos Romanos mudou o curso da história pelo menos duas vezes: quando Agostinho a leu no jardim de Milão (386 d.C.) e quando Martinho Lutero pregava sobre ela em Wittenberg (1515). Ambas as experiências desencadearam transformações civilizacionais.",
    },
  ],
  relatedSlugs: ["trindade", "soteriologia", "confiabilidade-biblia"],
};

export const soteriologia: TopicData = {
  slug: "soteriologia",
  title: "Soteriologia",
  subtitle: "A doutrina da salvação",
  categorySlug: "teologia",
  accent: "#34d399",
  image: "/images/soteriologia.jpg",
  quote: {
    text: "Porque pela graça sois salvos, por meio da fé; e isso não vem de vós, é dom de Deus.",
    source: "Efésios 2:8",
  },
  intro:
    "Soteriologia é o ramo da teologia que estuda a salvação. Do grego soter (salvador), ela responde à pergunta central da existência humana: como pode um ser humano pecador estar em paz com um Deus santo? A resposta cristã envolve um arco completo: eleição, chamado, regeneração, fé, justificação, adoção, santificação e glorificação.",
  sections: [
    {
      heading: "Justificação",
      body: "Justificação é o ato forense pelo qual Deus declara o pecador justo com base na obra de Cristo imputada ao crente pela fé. Não é tornar alguém justo moralmente, mas declará-lo justo juridicamente. É o coração da Reforma Protestante: sola fide, sola gratia.",
    },
    {
      heading: "Santificação",
      body: "Enquanto a justificação é um evento pontual, a santificação é um processo contínuo. O Espírito Santo opera na vida do crente, conformando-o progressivamente à imagem de Cristo. Não é um esforço humano solitário, mas uma cooperação entre a ação divina e a responsabilidade humana.",
    },
    {
      heading: "Glorificação",
      body: "A glorificação é o estágio final: a ressurreição do corpo e a entrada definitiva na presença de Deus. Paulo a descreve como certa — 'a quem justificou, a esses também glorificou' (Rm 8:30) — usando o passado profético para indicar uma certeza absoluta.",
    },
  ],
  relatedSlugs: ["trindade", "romanos", "Escatologia"],
};

export const alma: TopicData = {
  slug: "alma",
  title: "Alma",
  subtitle: "Imortalidade da alma",
  categorySlug: "teologia",
  accent: "#38bdf8",
  image: "/images/imortalidade_da_alma.jpg",
  quote: {
    text: "E não temais os que matam o corpo e não podem matar a alma; temei antes aquele que pode fazer perecer no inferno tanto a alma como o corpo.",
    source: "Mateus 10:28",
  },
  intro:
    "A questão da imortalidade da alma atravessa filosofia e teologia há milênios. Platão argumentou por ela a partir da natureza imaterial da alma. O Novo Testamento a pressupõe, mas com uma perspectiva diferente: a esperança cristã não é a fuga do corpo, mas a ressurreição corporal.",
  sections: [
    {
      heading: "A visão platônica",
      body: "Para Platão, o corpo é a prisão da alma. A morte é libertação. A alma, sendo imaterial e simples, não pode se desfazer como o corpo composto. O Fédon apresenta múltiplos argumentos para a imortalidade, culminando na descrição do destino das almas após a morte.",
    },
    {
      heading: "A perspectiva bíblica",
      body: "A Bíblia não deprecia o corpo como Platão. O ser humano é uma unidade psicossomática. A esperança não é sair do corpo, mas ter o corpo ressurreto e glorificado. Paulo chama o corpo de 'templo do Espírito Santo' e a ressurreição de Cristo de garantia da nossa.",
    },
    {
      heading: "Estado intermediário",
      body: "O que acontece entre a morte e a ressurreição? A tradição cristã fala de um 'estado intermediário' — a alma consciente na presença de Deus, aguardando a ressurreição. Paulo descreve esse estado como 'estar com Cristo, o que é muito melhor' (Fp 1:23), sem ainda ser o estado final.",
    },
  ],
  relatedSlugs: ["soteriologia", "Escatologia", "Deus"],
};

export const confiabilidadeBiblia: TopicData = {
  slug: "confiabilidade-biblia",
  title: "Bíblia",
  subtitle: "Confiabilidade e evidências bíblicas",
  categorySlug: "teologia",
  accent: "#a78bfa",
  image: "/images/biblia.jpg",
  quote: {
    text: "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a educação na justiça.",
    source: "2 Timóteo 3:16",
  },
  intro:
    "A Bíblia é o livro mais copiado, traduzido e estudado da história humana. Mas é confiável? Temos o texto original? Os eventos narrados aconteceram? Estas perguntas não são ameaças à fé — são perguntas legítimas que merecem respostas sérias.",
  sections: [
    {
      heading: "Confiabilidade textual",
      body: "O Novo Testamento é o documento da Antiguidade com maior número de manuscritos: mais de 5.800 em grego, mais de 10.000 em latim. A comparação entre eles permite reconstruir o texto original com altíssima precisão. Nenhum documento da Antiguidade se aproxima dessa evidência manuscrita.",
    },
    {
      heading: "Arqueologia e história",
      body: "Escavações ao longo dos séculos XIX e XX confirmaram repetidamente detalhes geográficos, políticos e culturais da narrativa bíblica. O pool de Betesda (Jo 5), considerado simbólico por críticos, foi escavado e confirmado. A inscrição de Pôncio Pilatos foi encontrada em Cesareia.",
    },
    {
      heading: "Os evangelhos como fontes históricas",
      body: "Historiadores como Richard Bauckham argumentam que os evangelhos preservam testemunho ocular. Os critérios de autenticidade histórica aplicados a outras fontes antigas — atestação múltipla, critério da dificuldade, coerência contextual — apontam para um núcleo histórico robusto.",
    },
  ],
  relatedSlugs: ["trindade", "romanos", "Deus"],
};

export const imaculadaConceicao: TopicData = {
  slug: "imaculada-conceicao",
  title: "Imaculada Conceição",
  subtitle: "Refutando o dogma",
  categorySlug: "teologia",
  accent: "#d97706",
  image: "/images/imaculada_conceicao.jpg",
  imagePosition: "center 30%",
  quote: {
    text: "Porque todos pecaram e carecem da glória de Deus.",
    source: "Romanos 3:23",
  },
  intro:
    "O dogma da Imaculada Conceição, definido por Pio IX em 1854, afirma que Maria foi concebida sem pecado original, em antecipação dos méritos de Cristo. É um dogma romano relativamente recente, rejeitado por protestantes e — historicamente — discutido até dentro do próprio catolicismo.",
  sections: [
    {
      heading: "O que o dogma afirma exatamente",
      body: "É importante distinguir: a Imaculada Conceição não se refere ao nascimento virginal de Jesus, mas à concepção de Maria no ventre de sua mãe Ana. O dogma afirma que Maria, desde o primeiro instante de sua existência, foi preservada da mancha do pecado original.",
    },
    {
      heading: "Ausência de base bíblica",
      body: "Nenhum versículo bíblico afirma ou implica a Imaculada Conceição de Maria. Romanos 3:23 ('todos pecaram') não faz exceções. Lucas 1:47 mostra Maria chamando Deus de 'meu Salvador' — o que pressupõe que ela precisava de salvação, como qualquer ser humano.",
    },
    {
      heading: "A discordância interna da tradição",
      body: "Tomás de Aquino — o maior teólogo medieval — rejeitou a Imaculada Conceição, argumentando que Maria foi santificada depois de concebida, não antes. Bernardo de Claraval também se opôs. O dogma foi contestado internamente por séculos antes de ser definido como artigo de fé em 1854.",
    },
  ],
  relatedSlugs: ["trindade", "confiabilidade-biblia", "soteriologia"],
};

export const escatologia: TopicData = {
  slug: "Escatologia",
  title: "Escatologia",
  subtitle: "O estudo do fim dos tempos",
  categorySlug: "escatologia",
  accent: "#f87171",
  image: "/images/escatologia.jpg",
  imagePosition: "center",
  quote: {
    text: "E ouvi uma grande voz do trono, dizendo: Eis o tabernáculo de Deus com os homens.",
    source: "Apocalipse 21:3",
  },
  intro:
    "Escatologia é o estudo das últimas coisas: morte, julgamento, ressurreição, retorno de Cristo e o estado final. Longe de ser especulação irrelevante, a escatologia molda como vivemos agora — nossa esperança, nossa ética, nossa visão de história.",
  sections: [
    {
      heading: "As principais visões do milênio",
      body: "A interpretação de Apocalipse 20 divide os cristãos em três campos. O premilenismo ensina que Cristo retorna antes do milênio literal. O pós-milenismo entende que a Igreja expande o Reino antes do retorno. O amilenismo, posição histórica de Agostinho e da Reforma, vê o milênio como simbólico, descrevendo o reinado presente de Cristo.",
    },
    {
      heading: "Ressurreição e julgamento",
      body: "Consenso entre todas as tradições cristãs: haverá ressurreição corporal dos mortos e julgamento final. Cristo julgará vivos e mortos. A base do julgamento dos crentes é a obra de Cristo; para os demais, suas obras. O estado final é eterno — céu e inferno são realidades permanentes, não provisórias.",
    },
    {
      heading: "A nova criação",
      body: "A esperança cristã não é escapar do mundo material para um céu etéreo. É a restauração e glorificação de toda a criação. Paulo fala da criação 'gemendo' à espera da redenção (Rm 8:22). João vê 'nova terra' (Ap 21). A escatologia bíblica é profundamente material e cósmica.",
    },
  ],
  relatedSlugs: ["soteriologia", "alma", "confiabilidade-biblia"],
};

export const deus: TopicData = {
  slug: "Deus",
  title: "Deus Existe?",
  subtitle: "Argumentos a favor da existência de Deus",
  categorySlug: "teologia",
  accent: "#34d399",
  image: "/images/existencia_de_Deus.jpg",
  quote: {
    text: "Os céus declaram a glória de Deus, e o firmamento anuncia a obra das suas mãos.",
    source: "Salmos 19:1",
  },
  intro:
    "A existência de Deus é a questão filosófica mais fundamental. Não é apenas uma questão religiosa — ela determina o fundamento da moralidade, o significado da existência e a natureza da realidade. Os argumentos clássicos continuam sendo debatidos com rigor por filósofos analíticos contemporâneos.",
  sections: [
    {
      heading: "Argumento cosmológico de Kalām",
      body: "Tudo que começa a existir tem uma causa. O universo começou a existir (confirmado pela cosmologia moderna: Big Bang). Portanto, o universo tem uma causa. Essa causa deve ser atemporal, aespacial, imaterial e imensamente poderosa — o que corresponde ao conceito teísta de Deus. Defendido contemporaneamente por William Lane Craig.",
    },
    {
      heading: "Argumento do ajuste fino",
      body: "As constantes físicas do universo — a força gravitacional, a massa do elétron, a constante cosmológica — estão calibradas com precisão absurda para permitir vida. Uma variação mínima em qualquer delas tornaria o universo inóspito. A probabilidade de isso ocorrer por acaso é astronomicamente pequena. Esse 'ajuste fino' é melhor explicado por um Ajustador inteligente.",
    },
    {
      heading: "Argumento moral",
      body: "Se Deus não existe, valores morais objetivos não existem — apenas preferências evolutivas. Mas agimos como se tortura infantil fosse objetivamente errada, não apenas culturalmente indesejada. A existência de moralidade objetiva pressupõe um fundamento transcendente. C.S. Lewis desenvolveu essa linha de raciocínio de forma acessível em Mere Christianity.",
    },
    {
      heading: "Argumento ontológico",
      body: "Anselmo de Cantuária define Deus como 'aquele do qual nada maior pode ser concebido'. Se esse ser existisse apenas na mente, seria possível conceber um ser ainda maior — que existisse também na realidade. Logo, o ser máximo precisa existir de fato, não só como ideia, sob pena de contradição. Alvin Plantinga reformulou o argumento em termos de lógica modal: se é possível que um ser maximamente grande exista, e a grandeza máxima implica existência necessária em todos os mundos possíveis, então esse ser existe no mundo atual também.",
    },
  ],
  relatedSlugs: ["trindade", "confiabilidade-biblia", "imaculada-conceicao", "problema-do-mal"],
  slides: [
    {
      heading: "Deus Existe?",
      body: "Argumentos filosóficos a favor da existência de Deus",
    },
    {
      heading: "Por que isso importa",
      body: "Não é só uma questão religiosa. Determina o fundamento da moralidade, o significado da existência e a natureza da realidade.",
    },
    {
      heading: "Argumento cosmológico de Kalām",
      body: "Tudo que começa a existir tem uma causa. O universo começou a existir. Logo, o universo tem uma causa — atemporal, imaterial e poderosa.",
    },
    {
      heading: "Argumento do ajuste fino",
      body: "As constantes físicas do universo estão calibradas com precisão absurda para permitir vida. Acaso é astronomicamente improvável.",
    },
    {
      heading: "Argumento moral",
      body: "Agimos como se houvesse moralidade objetiva — não apenas preferência cultural. Isso pressupõe um fundamento transcendente.",
    },
    {
      heading: "Argumento ontológico",
      body: "Deus é 'aquele do qual nada maior pode ser concebido'. Um ser assim, para ser o maior possível, precisa existir de fato — não só como ideia.",
    },
    {
      quote: {
        text: "Os céus declaram a glória de Deus, e o firmamento anuncia a obra das suas mãos.",
        source: "Salmos 19:1",
      },
    },
  ],
};