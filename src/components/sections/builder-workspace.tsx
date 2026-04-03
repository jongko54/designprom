"use client";

import { useState } from "react";

import { BuilderPanel } from "@/components/sections/builder-panel";
import { PromptMotionHero } from "@/components/sections/prompt-motion-hero";

export function BuilderWorkspace() {
  const [appliedPrompt, setAppliedPrompt] = useState("");

  return (
    <>
      <PromptMotionHero
        onApplyPrompt={(prompt) => setAppliedPrompt(prompt)}
      />
      <BuilderPanel
        externalPrompt={appliedPrompt}
        onClearExternalPrompt={() => setAppliedPrompt("")}
      />
    </>
  );
}
