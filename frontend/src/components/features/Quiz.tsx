"use client";

import { useEffect, useState } from "react";
import { QuizData } from "@/lib/types/quiz";

interface QuizProps {
  quiz: QuizData;
}

interface ToastState {
  type: "correct" | "incorrect";
  message: string;
}

function shuffledIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export function Quiz({ quiz }: QuizProps) {
  const [started, setStarted] = useState(false);
  const [order, setOrder] = useState<number[]>(() =>
    Array.from({ length: quiz.questions.length }, (_, i) => i)
  );
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  function handleStart() {
    setOrder(shuffledIndices(quiz.questions.length));
    setStarted(true);
  }

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const question = quiz.questions[order[step]];
  const isLast = step === order.length - 1;

  function handleAnswer(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === question.correctIndex;
    if (correct) setScore((s) => s + 1);
    setToast({
      type: correct ? "correct" : "incorrect",
      message: correct ? "Certo! 🎉" : `Errado — a resposta era: ${question.options[question.correctIndex]}`,
    });
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
  }

  function handleRestart() {
    setOrder(shuffledIndices(quiz.questions.length));
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setToast(null);
  }

  if (!started) {
    return (
      <div className="text-center py-16">
        <p
          className="text-2xl text-stone-100 mb-3"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {quiz.questions.length} perguntas de múltipla escolha
        </p>
        <p className="text-stone-500 mb-10">As perguntas aparecem em ordem aleatória.</p>
        <button
          onClick={handleStart}
          className="cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
          style={{
            color: quiz.accent,
            borderColor: `${quiz.accent}40`,
            backgroundColor: `${quiz.accent}12`,
          }}
        >
          Começar quiz
        </button>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="text-center py-16">
        <p className="text-sm text-stone-600 tracking-widest uppercase mb-4">Resultado</p>
        <p
          className="text-5xl font-semibold text-white mb-3"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {score} / {quiz.questions.length}
        </p>
        <p className="text-stone-400 mb-10">Você acertou {percentage}% das perguntas.</p>
        <button
          onClick={handleRestart}
          className="cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
          style={{
            color: quiz.accent,
            borderColor: `${quiz.accent}40`,
            backgroundColor: `${quiz.accent}12`,
          }}
        >
          Refazer o quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs text-stone-600 tracking-widest uppercase">
          Pergunta {step + 1} de {order.length}
        </p>
        <p className="text-xs text-stone-600 tracking-widest uppercase">
          Pontos: {score}
        </p>
      </div>

      <p
        className="text-2xl text-stone-100 leading-relaxed mb-8"
        style={{ fontFamily: "'Lora', Georgia, serif" }}
      >
        {question.question}
      </p>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isCorrectOption = i === question.correctIndex;
          const isSelectedOption = i === selected;
          const answered = selected !== null;

          let borderColor = "#292524";
          let bgColor = "transparent";
          if (answered && isCorrectOption) {
            borderColor = "#4ade80";
            bgColor = "#4ade8015";
          } else if (answered && isSelectedOption && !isCorrectOption) {
            borderColor = "#f87171";
            bgColor = "#f8717115";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className="w-full text-left px-5 py-4 rounded-xl border transition-colors disabled:cursor-default cursor-pointer"
              style={{
                borderColor,
                backgroundColor: bgColor,
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              <span className="text-stone-200">{option}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && question.explanation && (
        <p className="text-sm text-stone-500 leading-relaxed mt-6">{question.explanation}</p>
      )}

      {selected !== null && (
        <button
          onClick={handleNext}
          className="mt-8 cursor-pointer text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full border transition-colors"
          style={{
            color: quiz.accent,
            borderColor: `${quiz.accent}40`,
            backgroundColor: `${quiz.accent}12`,
          }}
        >
          {isLast ? "Ver resultado" : "Próxima pergunta →"}
        </button>
      )}

      {toast && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl border animate-toast-in text-sm font-medium"
          style={{
            borderColor: toast.type === "correct" ? "#4ade8060" : "#f8717160",
            backgroundColor: toast.type === "correct" ? "#052e16f0" : "#450a0af0",
            color: toast.type === "correct" ? "#86efac" : "#fca5a5",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
