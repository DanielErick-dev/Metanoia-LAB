"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { TopicData } from "@/lib/types/topic";
import { getTopicPath } from "@/lib/topics";

interface SlidesPageProps {
  topic: TopicData;
}

export function SlidesPage({ topic }: SlidesPageProps) {
  const slides = topic.slides ?? [];
  const [index, setIndex] = useState(0);
  const articleHref = `/${getTopicPath(topic)}`;

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, slides.length - 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <main className="fixed inset-0 bg-[#0f0e0d] text-stone-100 flex flex-col">
      <header className="flex items-center justify-between px-8 py-5 shrink-0">
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: topic.accent }}
        >
          {topic.title}
        </span>
        <Link
          href={articleHref}
          className="text-stone-500 hover:text-stone-200 transition-colors"
        >
          <X size={20} />
        </Link>
      </header>

      <div
        className="relative flex-1 flex items-center justify-center px-8 md:px-24 cursor-pointer select-none overflow-hidden"
        onClick={(e) => {
          const isRightHalf = e.clientX > window.innerWidth / 2;
          if (isRightHalf) goNext();
          else goPrev();
        }}
      >
        {slide.image && (
          <>
            <Image
              src={slide.image}
              alt={slide.heading ?? topic.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}

        {slide.video ? (
          <div
            className="relative w-full max-w-4xl aspect-video cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={slide.video}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative max-w-3xl text-center">
            {slide.heading && (
              <h1
                className="text-4xl md:text-6xl font-semibold text-white leading-tight mb-8"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              >
                {slide.heading}
              </h1>
            )}
            {slide.body && (
              <p
                className="text-xl md:text-2xl text-stone-300 leading-relaxed"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              >
                {slide.body}
              </p>
            )}
            {slide.quote && (
              <blockquote>
                <p
                  className="text-2xl md:text-3xl text-stone-200 italic leading-relaxed"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
                >
                  “{slide.quote.text}”
                </p>
                <cite
                  className="block not-italic text-sm tracking-widest uppercase mt-6"
                  style={{ color: topic.accent }}
                >
                  {slide.quote.source}
                </cite>
              </blockquote>
            )}
          </div>
        )}
      </div>

      <footer className="flex items-center justify-center gap-6 px-8 py-6 shrink-0">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="text-stone-500 hover:text-stone-200 disabled:opacity-20 disabled:hover:text-stone-500 transition-colors cursor-pointer disabled:cursor-default"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{
                backgroundColor: i === index ? topic.accent : "#44403c",
              }}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={index === slides.length - 1}
          className="text-stone-500 hover:text-stone-200 disabled:opacity-20 disabled:hover:text-stone-500 transition-colors cursor-pointer disabled:cursor-default"
        >
          <ChevronRight size={20} />
        </button>
      </footer>
    </main>
  );
}
