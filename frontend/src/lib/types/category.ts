export interface CategoryData {
  slug: string;
  title: string;
  subtitle: string;
  accent: string;
  image?: string;
  imagePosition?: string;
  parentSlug?: string;
  status?: "em-breve" | "em-construcao";
}
