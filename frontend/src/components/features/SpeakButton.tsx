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
      🔊
    </button>
  );
}
