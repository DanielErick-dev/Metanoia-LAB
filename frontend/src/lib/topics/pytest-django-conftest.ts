import { TopicData } from "@/lib/types/topic";

export const pytestDjangoConftest: TopicData = {
  slug: "conftest",
  title: "Capítulo 4 — Compartilhando fixtures com conftest.py",
  subtitle: "Evitando repetir a mesma fixture em vários arquivos de teste",
  categorySlug: "pytest-django",
  accent: "#eab308",
  status: "em-construcao",
  intro:
    "Imagine que possuamos 5 arquivos de testes e queremos, dentro dos testes dos 5 arquivos, utilizar a mesma fixture. Imagine ter que repetir a mesma fixture dentro dos 5 arquivos.",
  sections: [
    {
      heading: "A convenção conftest.py",
      body: "Para isso, o pytest tem uma convenção de arquivo chamado conftest.py: basicamente podemos criar uma fixture lá e, nos outros arquivos de testes, apenas colocar como parâmetro — o próprio pytest já vai resolver pra gente, sem necessariamente ter que colocar a fixture em cada arquivo repetidamente.",
    },
    {
      heading: "Mais de um conftest.py",
      body: "Lembrando que podemos utilizar mais de um arquivo conftest.py, inclusive uma fixture sobrescrever outra. Isso geralmente é utilizado em projetos maiores, onde temos um conftest.py global de toda a aplicação e um conftest.py mais próximo de um determinado teste — nesse caso, o que vai valer na concorrência de fixtures será a do conftest.py mais próximo do teste.",
    },
  ],
  relatedSlugs: ["parametro-db", "pytest"],
};
