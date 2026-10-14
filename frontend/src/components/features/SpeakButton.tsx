"use client";

interface SpeakButtonProps {
  text: string;
  accent: string;
}

export function SpeakButton({ text, accent }: SpeakButtonProps) {
  const speak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={`Ouvir pronúncia: ${text}`}
      className="inline-flex items-center justify-center text-sm leading-none cursor-pointer hover:opacity-70 transition-opacity align-middle"
      style={{ color: accent }}
    >
      <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    </button>
  );
}
