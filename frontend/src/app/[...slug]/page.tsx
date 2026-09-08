import { notFound, redirect } from "next/navigation";
import {
  getPresentationPath,
  getTopicByPath,
  getTopicByPresentationPath,
  getTopicPath,
  topics,
} from "@/lib/topics";
import { categories, getCategoryBySlug, getCategoryPath } from "@/lib/categories";
import { getQuizByPath, getQuizPath, quizzes } from "@/lib/quizzes";
import { TopicPage } from "@/components/features/TopicPage";
import { CategoryPage } from "@/components/features/CategoryPage";
import { GuidePage } from "@/components/features/GuidePage";
import { QuizPage } from "@/components/features/QuizPage";
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
  const quizParams = quizzes.map((q) => ({ slug: getQuizPath(q).split("/") }));
  return [...topicParams, ...categoryParams, ...presentationParams, ...quizParams];
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

  const quiz = getQuizByPath(path);
  if (quiz) {
    return {
      title: `${quiz.title} — Metanoia Lab`,
      description: quiz.subtitle,
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

  const quiz = getQuizByPath(path);
  if (quiz) {
    return <QuizPage quiz={quiz} />;
  }

  const topic = getTopicByPath(path);
  if (topic) {
    const relatedTopics = topic.relatedSlugs
      .map((s) => topics.find((t) => t.slug === s))
      .filter(Boolean) as typeof topics;

    const topicCategory = getCategoryBySlug(topic.categorySlug);
    if (topicCategory?.layout === "guide") {
      const chapters = topics.filter((t) => t.categorySlug === topicCategory.slug);
      const guideRelated = relatedTopics.filter(
        (t) => !chapters.some((c) => c.slug === t.slug)
      );
      return (
        <GuidePage
          category={topicCategory}
          chapters={chapters}
          activeChapter={topic}
          relatedTopics={guideRelated}
        />
      );
    }

    return <TopicPage topic={topic} relatedTopics={relatedTopics} />;
  }

  const category = categories.find((c) => getCategoryPath(c.slug) === path);
  if (category) {
    if (category.layout === "guide") {
      const firstChapter = topics.find((t) => t.categorySlug === category.slug);
      if (firstChapter) redirect(`/${getTopicPath(firstChapter)}`);
    }
    return <CategoryPage category={category} />;
  }

  notFound();
}
