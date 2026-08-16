import Link from "next/link";
import Image from "next/image";
import { TopicData } from "@/lib/types/topic";
import { getCategoryBySlug, getCategoryChain, getCategoryPath } from "@/lib/categories";
import { getPresentationPath, getTopicPath } from "@/lib/topics";
import { Breadcrumb } from "./Breadcrumb";
import { CodeBlock } from "./CodeBlock";

interface TopicPageProps {
  topic: TopicData;
  relatedTopics: TopicData[];
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function estimateReadingMinutes(topic: TopicData): number {
  let words = countWords(topic.intro);
  for (const section of topic.sections) {
    words += countWords(section.body);
    for (const example of section.examples ?? []) {
      words += countWords(example.body);
      if (example.note) words += countWords(example.note);
    }
  }
  return Math.max(1, Math.ceil(words / 200));
}

export function TopicPage({ topic, relatedTopics }: TopicPageProps) {
  const category = getCategoryBySlug(topic.categorySlug);
  const categoryChain = getCategoryChain(topic.categorySlug);
  const breadcrumbItems = [
    ...categoryChain.map((c) => ({ label: c.title, href: `/${getCategoryPath(c.slug)}` })),
    { label: topic.title, href: `/${getTopicPath(topic)}` },
  ];
  const readingMinutes = estimateReadingMinutes(topic);
  const backHref = `/${getCategoryPath(topic.categorySlug)}`;
  const backLabel = category?.title ?? "Biblioteca";

  return (
    <main className="min-h-screen bg-[#0f0e0d] text-stone-100">
      <header className="px-8 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-emerald-400 text-xl">◈</span>
          <span
            className="font-medium tracking-widest text-xs uppercase text-stone-400 group-hover:text-white transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Metanoia Lab
          </span>
        </Link>
        <Link
          href={backHref}
          className="text-xs text-stone-600 hover:text-stone-300 transition-colors flex items-center gap-2 tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          ← {backLabel}
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-8 pb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <section className="max-w-6xl mx-auto px-8">
        <div className="relative h-125 overflow-hidden rounded-3xl">
          {topic.image ? (
            <Image
              src={topic.image}
              alt={topic.title}
              fill
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="object-cover"
              style={{ objectPosition: topic.imagePosition ?? "top" }}
              priority
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${topic.accent}25, #0f0e0d 75%)` }}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#0f0e0d] via-[#0f0e0d]/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0f0e0d]/30 via-transparent to-[#0f0e0d]/30" />

          {topic.slides && (
            <Link
              href={`/${getPresentationPath(topic)}`}
              className="absolute top-8 right-8 md:top-12 md:right-12 flex items-center gap-2 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full border backdrop-blur-sm transition-colors"
              style={{
                color: topic.accent,
                borderColor: `${topic.accent}40`,
                backgroundColor: `${topic.accent}12`,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Ver apresentação →
            </Link>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-2xl">
              <span
                className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border mb-5"
                style={{
                  color: topic.accent,
                  borderColor: `${topic.accent}40`,
                  backgroundColor: `${topic.accent}12`,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {category?.title}
              </span>
              <h1
                className="text-5xl md:text-6xl font-semibold text-white leading-tight mb-3"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              >
                {topic.title}
              </h1>
              <p
                className="text-base text-stone-400 tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {topic.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex gap-16 items-start">
          <article className="flex-1 min-w-0 max-w-170">
            {topic.quote && (
              <>
                <blockquote className="mb-14">
                  <div
                    className="w-8 h-0.5 mb-6"
                    style={{ backgroundColor: topic.accent }}
                  />
                  <p
                    className="text-2xl text-stone-200 leading-relaxed font-normal italic"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                  >
                    “{topic.quote.text}”
                  </p>
                  <cite
                    className="text-sm mt-5 block not-italic tracking-widest uppercase"
                    style={{
                      color: topic.accent,
                      fontFamily: "'DM Sans', sans-serif",
                      opacity: 0.8,
                    }}
                  >
                    {topic.quote.source}
                  </cite>
                </blockquote>

                <div className="border-t border-stone-800 mb-14" />
              </>
            )}

            <p
              className={`text-xl text-stone-300 leading-[1.85] font-normal ${
                topic.quote?.sourceUrl ? "mb-3" : "mb-14"
              }`}
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              {topic.intro}
            </p>

            {topic.quote?.sourceUrl && (
              <p
                className="text-sm text-stone-500 mb-14"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Fonte original:{" "}
                <a
                  href={topic.quote.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-1 hover:text-stone-300 transition-colors"
                  style={{ color: topic.accent }}
                >
                  {topic.quote.source} ↗
                </a>
              </p>
            )}

            <div className="space-y-0">
              {topic.sections.map((section, i) => (
                <div key={i} className="mb-14">
                  <h2
                    id={`section-${i}`}
                    className="text-2xl font-semibold text-stone-100 leading-snug mb-6 scroll-mt-8"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                  >
                    {section.heading}
                  </h2>

                  <p
                    className="text-[1.125rem] text-stone-400 leading-[1.9]"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                  >
                    {section.body}
                  </p>

                  {section.code && (
                    <CodeBlock code={section.code} language={section.language} />
                  )}

                  {section.links && section.links.length > 0 && (
                    <ul className="mt-6 space-y-2">
                      {section.links.map((link, k) => (
                        <li key={k}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm underline underline-offset-4 decoration-1 hover:text-stone-300 transition-colors"
                            style={{ color: topic.accent, fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {link.text} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.examples && section.examples.length > 0 && (
                    <div className="mt-10 space-y-10">
                      {section.examples.map((example, j) => (
                        <div key={j}>
                          {example.title && (
                            <h3
                              className="text-base font-semibold text-stone-200 mb-3"
                              style={{ fontFamily: "'Lora', Georgia, serif" }}
                            >
                              {example.title}
                            </h3>
                          )}
                          <p
                            className="text-[1.0625rem] text-stone-400 leading-[1.9]"
                            style={{ fontFamily: "'Lora', Georgia, serif" }}
                          >
                            {example.body}
                          </p>
                          <CodeBlock code={example.code} language={example.language} />
                          {example.note && (
                            <p
                              className="text-sm text-stone-500 leading-relaxed mt-4"
                              style={{ fontFamily: "'Lora', Georgia, serif" }}
                            >
                              {example.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {i < topic.sections.length - 1 && (
                    <div className="flex items-center gap-3 mt-14">
                      <div className="h-px flex-1 bg-stone-800/60" />
                      <span
                        className="text-xs opacity-30"
                        style={{ color: topic.accent }}
                      >
                        ✦
                      </span>
                      <div className="h-px flex-1 bg-stone-800/60" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

          <aside
            className="w-64 shrink-0 hidden lg:block sticky top-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <div className="mb-10">
              <p className="text-xs text-stone-600 tracking-widest uppercase mb-5">
                Neste artigo
              </p>
              <nav className="space-y-3">
                {topic.sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <span
                      className="text-xs font-medium tabular-nums mt-0.5 opacity-30"
                      style={{ color: topic.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-stone-500 leading-relaxed group-hover:text-stone-300 transition-colors">
                      {section.heading}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="border-t border-stone-800 mb-10" />

            <div className="space-y-5">
              <div>
                <p className="text-xs text-stone-700 tracking-widest uppercase mb-1">
                  Categoria
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: topic.accent }}
                >
                  {category?.title}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-700 tracking-widest uppercase mb-1">
                  Leitura estimada
                </p>
                <p className="text-sm text-stone-400">{readingMinutes} min</p>
              </div>
              <div>
                <p className="text-xs text-stone-700 tracking-widest uppercase mb-1">
                  Seções
                </p>
                <p className="text-sm text-stone-400">{topic.sections.length}</p>
              </div>
            </div>

            <div className="border-t border-stone-800 mt-10 mb-10" />

            {relatedTopics.length > 0 && (
              <div>
                <p className="text-xs text-stone-600 tracking-widest uppercase mb-5">
                  Ver também
                </p>
                <div className="space-y-3">
                  {relatedTopics.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/${getTopicPath(related)}`}
                      className="flex items-center gap-3 group"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: related.accent }}
                      />
                      <span className="text-xs text-stone-500 group-hover:text-stone-200 transition-colors leading-relaxed">
                        {related.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {relatedTopics.length > 0 && (
        <section className="border-t border-stone-800/60 py-14 lg:hidden">
          <div className="max-w-6xl mx-auto px-8">
            <p
              className="text-xs text-stone-600 tracking-widest uppercase mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Ver também
            </p>
            <div className="flex gap-3 flex-wrap">
              {relatedTopics.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${getTopicPath(related)}`}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-800 hover:border-stone-600 transition-all"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: related.accent }}
                  />
                  <span
                    className="text-sm text-stone-400 group-hover:text-stone-200 transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {related.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-stone-800/60 py-8 text-center text-stone-700 text-xs tracking-wide">
        <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Metanoia Lab —{" "}
          <span className="text-emerald-800">transformação pela verdade</span>
        </span>
      </footer>
    </main>
  );
}
