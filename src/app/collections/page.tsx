import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { CollectionsAtlas } from "@/components/sections/collections-atlas";
import { CollectionsGrid } from "@/components/sections/collections-grid";
import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Prompt collections for launches, portfolios, and campaigns",
  description:
    "Browse prompt collections grouped by launch scenario, creative portfolio type, enterprise marketing, and campaign direction.",
  keywords: [
    "prompt collections",
    "launch page prompts",
    "creative portfolio prompts",
    "campaign microsite prompts"
  ],
  path: "/collections"
});

export default function CollectionsPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <PageHero
        eyebrow="Collections"
        title="Editorial prompt bundles for real launch briefs"
        description="Collections turn brand DNA, style systems, and motion directions into readable boards so people can browse by scenario instead of guessing from scratch."
      />
      <CollectionsAtlas />
      <CollectionsGrid />
    </main>
  );
}
