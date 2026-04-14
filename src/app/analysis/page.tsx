import type { Metadata } from "next";

import { ImmersivePromptShowcase } from "@/components/sections/immersive-prompt-showcase";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "3D prompt scene set",
  description:
    "Four rebuilt interactive 3D prompt scenes shown as a single-canvas showcase with prompt selection.",
  keywords: [
    "3d prompt scene",
    "interactive 3d showcase",
    "single canvas webgl",
    "react three fiber prompt"
  ],
  path: "/analysis"
});

export default function AnalysisPage() {
  return <ImmersivePromptShowcase initialScene="orbit-forge" routeLabel="analysis" />;
}
