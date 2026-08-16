export interface CategoryData {
  slug: string;
  title: string;
  subtitle: string;
  accent: string;
  image?: string;
  /** CSS object-position (ex: "top", "center", "center 25%"). Padrão: "top". */
  imagePosition?: string;
  parentSlug?: string;
  /** Selo de status exibido no card. Omitir quando o conteúdo já estiver pronto. */
  status?: "em-breve" | "em-construcao";
}
