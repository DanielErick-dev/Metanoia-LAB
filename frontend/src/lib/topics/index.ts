import { TopicData } from "../types/topic";
import { getCategoryPath } from "../categories";
import { getFlashcardsForTopic } from "../flashcards";
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
import { inglesVerbos } from "./ingles-verbos";
import { inglesVocabularioGeral } from "./ingles-vocabulario-geral";
import { inglesGramaticaIfOnlySuperlativo } from "./ingles-gramatica-if-only-superlativo";
import { inglesExpressoesGirias } from "./ingles-expressoes-girias";
import { inglesEmocoesSensacoes } from "./ingles-emocoes-sensacoes";
import { inglesConversasInformais } from "./ingles-conversas-informais";
import { inglesPrecosPedidosDirecoes } from "./ingles-precos-pedidos-direcoes";
import { inglesReacoesInterjeicoes } from "./ingles-reacoes-interjeicoes";
import { ingles50ExpressoesCurtas } from "./ingles-50-expressoes-curtas";
import { inglesVocabularioTecnicoProgramacao } from "./ingles-vocabulario-tecnico-programacao";
import { pytestDjangoConfiguracao } from "./pytest-django-configuracao";
import { pytestDjangoMarcacaoDb } from "./pytest-django-marcacao-db";
import { pytestDjangoParametroDb } from "./pytest-django-parametro-db";
import { pytestDjangoConftest } from "./pytest-django-conftest";
import { inglesOughGang } from "./ingles-ough-gang";
import { someAnyNo } from "./some-any-no";
import { designingWebApisCap1 } from "./designing-web-apis-o-que-e-uma-api";
import { designingWebApisCap2 } from "./designing-web-apis-paradigmas";

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
  inglesVerbos,
  inglesVocabularioGeral,
  inglesGramaticaIfOnlySuperlativo,
  inglesExpressoesGirias,
  inglesEmocoesSensacoes,
  inglesConversasInformais,
  inglesPrecosPedidosDirecoes,
  inglesReacoesInterjeicoes,
  ingles50ExpressoesCurtas,
  inglesVocabularioTecnicoProgramacao,
  inglesOughGang,
  pytestDjangoConfiguracao,
  pytestDjangoMarcacaoDb,
  pytestDjangoParametroDb,
  pytestDjangoConftest,
  someAnyNo,
  designingWebApisCap1,
  designingWebApisCap2,
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

const FLASHCARDS_SUFFIX = "/flashcards";

export function getFlashcardsPath(topic: TopicData): string {
  return `${getTopicPath(topic)}${FLASHCARDS_SUFFIX}`;
}

export function getTopicByFlashcardsPath(path: string): TopicData | undefined {
  if (!path.endsWith(FLASHCARDS_SUFFIX)) return undefined;
  const topicPath = path.slice(0, -FLASHCARDS_SUFFIX.length);
  const topic = getTopicByPath(topicPath);
  return topic && getFlashcardsForTopic(topic).length > 0 ? topic : undefined;
}