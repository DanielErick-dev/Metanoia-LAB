import { QuizData } from "@/lib/types/quiz";

export const someAnyNoQuiz: QuizData = {
  slug: "some-any-no-quiz",
  title: "Quiz — Some, Any e No",
  subtitle: "Teste o que você aprendeu sobre some, any e no",
  categorySlug: "ingles",
  accent: "#f472b6",
  questions: [
    {
      question: "I have ___ money.",
      options: ["some", "any", "no"],
      correctIndex: 0,
      explanation: "Afirmativa simples → some.",
    },
    {
      question: "Would you like ___ coffee?",
      options: ["some", "any", "no"],
      correctIndex: 0,
      explanation: "Pergunta que é uma oferta → some, mesmo sendo interrogativa.",
    },
    {
      question: "Do you have ___ pets?",
      options: ["some", "any", "no"],
      correctIndex: 1,
      explanation: "Pergunta genérica (não é pedido nem oferta) → any.",
    },
    {
      question: "She doesn't have ___ friends here.",
      options: ["some", "any", "no"],
      correctIndex: 1,
      explanation: "A negação já está no doesn't, então usa any (não duas negações).",
    },
    {
      question: "He has ___ friends.",
      options: ["some", "any", "no"],
      correctIndex: 2,
      explanation: "No já é negação por si só — equivale a 'he doesn't have any friends'.",
    },
    {
      question: "___ person can solve this puzzle — it's easy.",
      options: ["Some", "Any", "No"],
      correctIndex: 1,
      explanation: "Afirmativa com sentido de 'qualquer' → any.",
    },
    {
      question: "Is ___ home right now?",
      options: ["somebody", "anybody", "nobody"],
      correctIndex: 1,
      explanation: "Composto em pergunta genérica → anybody.",
    },
    {
      question: "I want ___ to eat.",
      options: ["something", "anything", "nothing"],
      correctIndex: 0,
      explanation: "Afirmativa simples → something.",
    },
    {
      question: "There's ___ in the fridge.",
      options: ["something", "anything", "nothing"],
      correctIndex: 2,
      explanation: "Negação direta, sem don't/doesn't → nothing.",
    },
    {
      question: "Let's go ___ nice this weekend.",
      options: ["somewhere", "anywhere", "nowhere"],
      correctIndex: 0,
      explanation: "Afirmativa (sugestão/plano) → somewhere.",
    },
    {
      question: "I don't know ___ here.",
      options: ["somebody", "anybody", "nobody"],
      correctIndex: 1,
      explanation: "A negação já está no don't, então usa anybody.",
    },
    {
      question: "___ can join the club, it's open to everyone.",
      options: ["Somebody", "Anybody", "Nobody"],
      correctIndex: 1,
      explanation: "Afirmativa com sentido de 'qualquer pessoa' → anybody.",
    },
  ],
};
