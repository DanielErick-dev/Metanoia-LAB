import { TopicData } from "@/lib/types/topic";

export const comentarioDanielProblemaEvidencial: TopicData = {
  slug: "problema-evidencial-teismo-cetico",
  title: "Parte 3 — O Problema Evidencial do Mal",
  subtitle: "Mal gratuito, William Rowe e o teísmo cético de Wykstra",
  categorySlug: "comentario-daniel",
  accent: "#94a3b8",
  status: "em-construcao",
  intro:
    "Fechando este primeiro bloco: a virada do debate para o argumento evidencial, a distinção entre mal justificável e mal gratuito segundo William Rowe, e a resposta do teísmo cético de Stephen Wykstra através do princípio CORNEA.",
  sections: [
    {
      heading: "A virada para o problema evidencial",
      body: "Como a versão lógica é, na prática, respondida pela defesa do livre-arbítrio, o debate filosófico contemporâneo se deslocou para a versão evidencial: aceita-se que Deus e o mal são logicamente compatíveis, mas argumenta-se que a existência de determinados males — especialmente os que parecem não servir a propósito nenhum — torna a existência de Deus improvável.",
    },
    {
      heading: "Mal justificável e mal gratuito",
      body: "Mal justificável é aquele que ocorre para que um mal pior não ocorra, ou que ocorre para que um bem maior possa ocorrer. Vejamos um caso real para exemplificar essa definição: imagine que Paulo machuca a perna e vai ao médico. A dor é ruim, um sofrimento com certeza. O médico diz a Paulo que pode amputar a perna para acabar com a dor, ou esperar um certo tempo até que a dor cesse sem a necessidade de amputação. Observamos que permitir que esse mal (a dor na perna) continue por um tempo é melhor do que ter uma perna amputada pelo resto da vida — um mal passageiro em vez de um mal definitivo. Em contrapartida, o mal gratuito, ou injustificável, seria um mal que simplesmente não tem propósito nenhum (ou não enxergamos uma razão para sua existência) — um mal sem justificativa, portanto gratuito, como bem foi formulado por William Rowe:",
      citation: {
        lines: [
          "Provavelmente, há instâncias de mal gratuito.",
          "Se o Deus teísta existe, então não há instâncias de mal gratuito.",
          "Logo, provavelmente, o Deus teísta não existe.",
        ],
        source: "William Rowe",
      },
    },
    {
      heading: "O raciocínio de Rowe",
      body: "Rowe argumenta assim:",
      citation: {
        lines: [
          "Após uma séria reflexão, não conseguimos ver ou discernir qualquer razão para Deus permitir males como o exemplo do cervo na floresta ou de crianças que sofrem abusos.",
          "Logo, provavelmente, não há qualquer razão para Deus permitir tais males — ou seja, provavelmente há instâncias de mal gratuito.",
          "E, se existem males gratuitos, podemos concluir ou que Deus não existe, ou que é um ser extremamente cruel e não piedoso.",
        ],
        source: "William Rowe",
      },
    },
    {
      heading: "Teísmo cético: a resposta de Wykstra",
      body: "Analisemos essa inferência a partir da ótica da fundamentação de Wykstra: concluímos que não há 'X' com base na premissa de que não vemos 'X'. Essa conclusão só é boa caso a condição de acesso epistêmico seja razoável — melhor formulada como CORNEA:",
      citation: {
        lines: [
          "Um sujeito S está justificado a inferir 'provavelmente não ϕ' a partir de 'não consigo ver ou detectar ϕ' apenas se é razoável para S acreditar que, se houvesse um ϕ, é provável que ele veria ou detectaria ϕ.",
        ],
        source: "CORNEA — Stephen Wykstra",
      },
      links: [
        {
          text: "Domingos Faria — \"O Problema do Mal\" (Compêndio em Linha de Problemas de Filosofia Analítica)",
          url: "https://compendioemlinha.letras.ulisboa.pt/wp-content/uploads/2020/10/Problema_Mal_DFaria_DOI.pdf",
        },
      ],
    },
    {
      heading: "As analogias de Wykstra: a moeda e o micróbio",
      body: "Para facilitar essa fundamentação, imagine que eu afirme: 'não vejo uma moeda na minha mão, logo posso concluir que realmente não existe nenhuma moeda na minha mão' — se de fato existisse uma moeda na minha mão, eu conseguiria vê-la; tenho acesso epistêmico a essa situação. Outro caso seria: 'não vejo um micróbio na minha mão, logo posso concluir que não existe um micróbio na minha mão' — nesse último caso, estou numa posição epistêmica desfavorável, incapaz de, a olho nu, averiguar tal informação. Da mesma forma, quanto a Deus, simplesmente estamos numa posição desconfortável, dado que, se Deus existe, ele está em outro nível de compreensão da realidade, e não podemos simplesmente afirmar que, pelo fato de não visualizarmos razões e motivos para a existência de tais males, Deus não as possua. No que diz respeito a possíveis males injustificados ou gratuitos, devemos e podemos tomar uma visão mais cética ou agnóstica quanto à existência desses males, de forma que o problema evidencial do mal não comprova a inexistência do Deus teísta. Como coloca Wykstra:",
      citation: {
        lines: [
          "O fato de os seres humanos serem incapazes de conceber qualquer razão justificativa para Deus permitir um determinado mal não torna mais provável a inexistência de tais razões, pois, se Deus existe, a mente de Deus seria muito maior do que a nossa, de tal modo que não seria surpreendente se Deus tivesse razões que não somos capazes de conceber.",
        ],
        source: "Stephen Wykstra",
      },
    },
    {
      heading: "A analogia das pulgas na garagem",
      body: "A partir dessa visão, podemos levar em conta que, se Deus existe, ele está em um nível cognitivo completamente distante do nosso, de forma que, por meio da nossa incapacidade, não podemos comprovar que Deus não tenha boas razões — e, nesse sentido, nós simplesmente não estamos em boa posição epistêmica para dizer que Deus não possua bons motivos para a existência do mal, pois somos imensamente limitados cognitivamente. Para exemplificar isso, podemos trazer a seguinte analogia:",
      citation: {
        lines: [
          "Não podemos usar a nossa incapacidade de ver quaisquer pulgas numa garagem — quando estamos olhando da rua — para concluir que é improvável que haja pulgas na garagem.",
        ],
      },
    },
  ],
  relatedSlugs: ["problema-logico-livre-arbitrio", "traducao-tooley"],
};
