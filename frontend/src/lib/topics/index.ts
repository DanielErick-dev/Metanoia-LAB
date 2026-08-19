import { TopicData } from "../types/topic";
import { getCategoryPath } from "../categories";
import  { trindade } from "./trindade";
import { epicteto } from "./epicteto";
import {
  romanos,
  soteriologia,
  alma,
  confiabilidadeBiblia,
  imaculadaConceicao,
  escatologia,
  deus,
} from "./others";
import { pacienciaTribulacao } from "./paciencia-tribulacao";
import { tessalonicenses2 } from "./2tessalonicenses2";
import { ruff } from "./ruff";
import { pytest } from "./pytest";
import { problemaDoMal } from "./problema-do-mal";
import { comentarioDanielIntroducao } from "./comentario-daniel-introducao";
import { comentarioDanielProblemaLogico } from "./comentario-daniel-problema-logico";
import { comentarioDanielProblemaEvidencial } from "./comentario-daniel-problema-evidencial";

export const topics: TopicData[] = [
  trindade,
  epicteto,
  romanos,
  soteriologia,
  alma,
  confiabilidadeBiblia,
  imaculadaConceicao,
  escatologia,
  deus,
  pacienciaTribulacao,
  tessalonicenses2,
  ruff,
  pytest,
  problemaDoMal,
  comentarioDanielIntroducao,
  comentarioDanielProblemaLogico,
  comentarioDanielProblemaEvidencial,
];

export function getTopicBySlug(slug: string): TopicData | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getTopicPath(topic: TopicData): string {
  return `${getCategoryPath(topic.categorySlug)}/${topic.slug}`;
}

export function getTopicByPath(path: string): TopicData | undefined {
  return topics.find((t) => getTopicPath(t) === path);
}

const PRESENTATION_SUFFIX = "/apresentacao";

export function getPresentationPath(topic: TopicData): string {
  return `${getTopicPath(topic)}${PRESENTATION_SUFFIX}`;
}

export function getTopicByPresentationPath(path: string): TopicData | undefined {
  if (!path.endsWith(PRESENTATION_SUFFIX)) return undefined;
  const topicPath = path.slice(0, -PRESENTATION_SUFFIX.length);
  const topic = getTopicByPath(topicPath);
  return topic?.slides ? topic : undefined;
}