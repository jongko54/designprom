import type { Metadata } from "next";

import { ImmersivePromptShowcase } from "@/components/sections/immersive-prompt-showcase";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Interactive 3D prompt showcase",
  description:
    "A rebuilt 3D showcase with four interactive prompt-led scenes presented as finished work instead of explanatory UI.",
  keywords: [
    "3d interaction website",
    "react three fiber showcase",
    "interactive prompt gallery",
    "3d landing page design"
  ],
  path: "/"
});

export default function HomePage() {
  return <ImmersivePromptShowcase initialScene="monolith-drift" routeLabel="home" />;
}
