"use client";

import { useState } from "react";
import { Highlight, Prism, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-bash");
require("prismjs/components/prism-toml");

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative mt-5 rounded-xl border border-stone-800 bg-[#1e1e1e] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.03]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-200 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copiado</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      <Highlight code={code.trim()} language={language} theme={themes.oneDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} font-mono overflow-x-auto p-5 text-[0.85rem] leading-relaxed`}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
