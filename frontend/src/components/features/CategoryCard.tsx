import { CategoryData } from "@/lib/types/category";
import { getCategoryPath, getChildCategories } from "@/lib/categories";
import { topics } from "@/lib/topics";
import { EntryCard } from "./EntryCard";

interface CategoryCardProps {
  category: CategoryData;
  priority?: boolean;
}

export function CategoryCard({ category, priority }: CategoryCardProps) {
  const childCount = getChildCategories(category.slug).length;
  const topicCount = topics.filter((t) => t.categorySlug === category.slug).length;
  const total = childCount + topicCount;
  const badge = `${total} ${total === 1 ? "item" : "itens"}`;

  return (
    <EntryCard
      href={`/${getCategoryPath(category.slug)}`}
      title={category.title}
      subtitle={category.subtitle}
      badge={badge}
      accent={category.accent}
      image={category.image}
      imagePosition={category.imagePosition}
      priority={priority}
      status={category.status}
    />
  );
}
