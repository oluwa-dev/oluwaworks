/** @format */

import { useState } from "react";

export default function Chip({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(label);
          setCopied(true);
          setTimeout(() => setCopied(false), 900);
        } catch {}
      }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 capitalize text-blue-200/90 transition hover:border-blue-400/40 hover:text-blue-100"
      aria-label={`Copy ${label}`}
    >
      #{copied ? "copied" : label}
    </button>
  );
}
