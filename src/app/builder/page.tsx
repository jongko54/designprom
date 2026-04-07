import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { BuilderWorkspace } from "@/components/sections/builder-workspace";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI design prompt builder with free preview",
  description:
    "Write AI website prompts, preview design direction locally, and generate rough image drafts for landing pages, portfolios, campaigns, and ecommerce layouts.",
  keywords: [
    "ai prompt builder",
    "website prompt builder",
    "landing page prompts",
    "portfolio prompt generator"
  ],
  path: "/builder"
});

export default function BuilderPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <Suspense fallback={null}>
        <BuilderWorkspace />
      </Suspense>
    </main>
  );
}
