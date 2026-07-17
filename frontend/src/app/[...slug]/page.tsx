import { notFound } from "next/navigation";
import {
  getPresentationPath,
  getTopicByPath,
  getTopicByPresentationPath,
  getTopicPath,
  topics,
} from "@/lib/topics";
import { categories, getCategoryPath } from "@/lib/categories";
import { TopicPage } from "@/components/features/TopicPage";
import { CategoryPage } from "@/components/features/CategoryPage";
import { SlidesPage } from "@/components/features/SlidesPage";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export function generateStaticParams() {
  const topicParams = topics.map((t) => ({ slug: getTopicPath(t).split("/") }));
  const categoryParams = categories.map((c) => ({
    slug: getCategoryPath(c.slug).split("/"),
  }));
  const presentationParams = topics
    .filter((t) => t.slides)
    .map((t) => ({ slug: getPresentationPath(t).split("/") }));
  return [...topicParams, ...categoryParams, ...presentationParams];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");

  const topic = getTopicByPath(path);
  if (topic) {
    return {
      title: `${topic.title} — Metanoia Lab`,
      description: topic.intro,
    };
  }

  const category = categories.find((c) => getCategoryPath(c.slug) === path);
  if (category) {
    return {
      title: `${category.title} — Metanoia Lab`,
      description: category.subtitle,
    };
  }

  return {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");

  const presentationTopic = getTopicByPresentationPath(path);
  if (presentationTopic) {
    return <SlidesPage topic={presentationTopic} />;
  }

  const topic = getTopicByPath(path);
  if (topic) {
    const relatedTopics = topic.relatedSlugs
      .map((s) => topics.find((t) => t.slug === s))
      .filter(Boolean) as typeof topics;

    return <TopicPage topic={topic} relatedTopics={relatedTopics} />;
  }

  const category = categories.find((c) => getCategoryPath(c.slug) === path);
  if (category) {
    return <CategoryPage category={category} />;
  }

  notFound();
}
