"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-1 rounded-md border border-violet-200 bg-white px-2 py-0.5 text-[11px] font-medium text-violet-700 shadow-xs transition hover:bg-violet-50 hover:text-violet-800 focus:outline-hidden"
      title="Copy license key to clipboard"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-emerald-600" />
          <span className="text-emerald-700 font-semibold">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3 text-violet-500" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
