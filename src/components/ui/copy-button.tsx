"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  className?: string;
  idleLabel?: string;
  copiedLabel?: string;
};

export function CopyButton({
  value,
  className,
  idleLabel = "Copy prompt",
  copiedLabel = "Copied"
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      className={className ?? "ghost-button"}
      type="button"
      onClick={handleCopy}
    >
      {copied ? copiedLabel : idleLabel}
    </button>
  );
}
