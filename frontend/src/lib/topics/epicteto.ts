import { TopicData } from "@/lib/types/topic";

export const epicteto: TopicData = {
  slug: "epicteto",
  title: "Epicteto",
  subtitle: "O escravo que ensinou a liberdade",
  categorySlug: "estoicismo",
  accent: "#d97706",
  image: "/images/estoicismo.jpg",
  quote: {
    text: "Não busques que os acontecimentos se deem como queres, mas deseja que se deem como são — e encontrarás tranquilidade.",
    source: "Epicteto, Encheirídion",
  },
  intro:
    "Nascido escravo na Frígia por volta de 50 d.C., Epicteto tornou-se o filósofo estoico mais influente de sua época. Sua filosofia parte de uma distinção radical: há coisas que dependem de nós e coisas que não dependem. Confundir os dois é a raiz de todo sofrimento.",
  sections: [
    {
      heading: "A dicotomia do controle",
      body: "O núcleo do pensamento de Epicteto é simples: opiniões, impulsos, desejos e aversões estão em nosso poder. Corpo, reputação, riqueza e cargos não estão. Toda angústia humana nasce de tentar controlar o que não nos pertence.",
    },
    {
      heading: "A escola e o legado",
      body: "Após ser liberto, Epicteto fundou uma escola em Nicópolis. Suas lições foram registradas pelo discípulo Arriano nos Discursos e no Encheirídion. Marco Aurélio, o imperador-filósofo, foi profundamente moldado por seu pensamento.",
    },
    {
      heading: "Relevância contemporânea",
      body: "O estoicismo de Epicteto influenciou diretamente a Terapia Cognitivo-Comportamental (TCC). A ideia de que não são os eventos que nos perturbam, mas nossa interpretação deles, é a pedra fundamental tanto do estoicismo quanto da psicoterapia moderna.",
    },
  ],
  relatedSlugs: ["alma", "Deus", "paciencia-tribulacao"],
};