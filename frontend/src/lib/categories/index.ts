import { CategoryData } from "../types/category";

export const categories: CategoryData[] = [
  {
    slug: "teologia",
    title: "Teologia",
    subtitle: "Doutrina cristã, escrituras e evidências da fé",
    accent: "#a78bfa",
    image: "/images/trindade.jpg",
  },
  {
    slug: "escatologia",
    title: "Escatologia",
    subtitle: "O estudo bíblico do fim dos tempos",
    accent: "#f59e0b",
    image: "/images/escatologia.jpg",
    parentSlug: "teologia",
    status: "em-breve",
  },
  {
    slug: "estoicismo",
    title: "Estoicismo",
    subtitle: "Filosofia estoica clássica e prática",
    accent: "#d97706",
    image: "/images/estoicismo.jpg",
    parentSlug: "filosofia",
    status: "em-breve",
  },
  {
    slug: "filosofia",
    title: "Filosofia",
    subtitle: "Correntes de pensamento e grandes questões",
    accent: "#818cf8",
    image: "/images/filosofia.jpg",
    status: "em-breve",
  },
  {
    slug: "historia",
    title: "História",
    subtitle: "Eventos, contextos e civilizações",
    accent: "#fb923c",
    image: "/images/historia.jpg",
    status: "em-breve",
  },
  {
    slug: "ingles",
    title: "Inglês",
    subtitle: "Estudo e prática do idioma",
    accent: "#f472b6",
    image: "/images/ingles.jpg",
    status: "em-breve",
  },
  {
    slug: "programacao",
    title: "Programação",
    subtitle: "Ferramentas, boas práticas e ecossistema de desenvolvimento",
    accent: "#38bdf8",
    image: "/images/programacao.jpg",
  },
  {
    slug: "backend",
    title: "Backend",
    subtitle: "Servidores, APIs e ferramentas server-side",
    accent: "#22d3ee",
    image: "/images/backend.jpg",
    imagePosition: "center",
    parentSlug: "programacao",
  },
  {
    slug: "problema-do-mal",
    title: "O Problema do Mal",
    subtitle: "Tradução acadêmica, comentários e referências sobre o problema do mal",
    accent: "#94a3b8",
    parentSlug: "teologia",
  },
  {
    slug: "comentario-daniel",
    title: "Comentário Daniel",
    subtitle: "Reflexões pessoais sobre o problema do mal, capítulo por capítulo",
    accent: "#94a3b8",
    parentSlug: "problema-do-mal",
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getChildCategories(parentSlug?: string): CategoryData[] {
  return categories.filter((c) => c.parentSlug === parentSlug);
}

export function getCategoryChain(slug: string): CategoryData[] {
  const chain: CategoryData[] = [];
  let current = getCategoryBySlug(slug);
  while (current) {
    chain.unshift(current);
    current = current.parentSlug ? getCategoryBySlug(current.parentSlug) : undefined;
  }
  return chain;
}

export function getCategoryPath(slug: string): string {
  return getCategoryChain(slug)
    .map((c) => c.slug)
    .join("/");
}
