import { TopicData } from "@/lib/types/topic";
import { getCategoryBySlug } from "@/lib/categories";
import { getTopicPath } from "@/lib/topics";
import { EntryCard } from "./EntryCard";

interface TopicCardProps {
  topic: TopicData;
  priority?: boolean;
}

export function TopicCard({ topic, priority }: TopicCardProps) {
  const category = getCategoryBySlug(topic.categorySlug);

  return (
    <EntryCard
      href={`/${getTopicPath(topic)}`}
      title={topic.title}
      subtitle={topic.subtitle}
      badge={category?.title ?? ""}
      accent={topic.accent}
      image={topic.image}
      imagePosition={topic.cardImagePosition ?? topic.imagePosition}
      priority={priority}
      status={topic.status}
    />
  );
}
