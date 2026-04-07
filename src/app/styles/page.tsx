import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { CompareStrip } from "@/components/sections/compare-strip";
import { ExperimentalShowcase } from "@/components/sections/experimental-showcase";
import { LibraryBrowser } from "@/components/sections/library-browser";
import { PageHero } from "@/components/sections/page-hero";
import { ResultWall } from "@/components/sections/result-wall";
import { buildCompareResultWall, styleCategories } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Visual style prompts for 3D, Bauhaus, editorial, motion, and glass UI",
  description:
    "Compare style systems for AI design prompts across 3D, Bauhaus color, editorial grids, kinetic type, monochrome UI, and glass interfaces.",
  keywords: [
    "3d website prompt",
    "bauhaus website prompt",
    "editorial website prompt",
    "style prompt examples"
  ],
  path: "/styles"
});

export default function StylesPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <PageHero
        eyebrow="Styles"
        title="Browse broader visual languages and compare how they alter the same brief"
        description="Styles now carry the visual exploration layer: 3D, Bauhaus, modern art, kinetic type, glass systems, and more, along with compare-style education."
      />
      <ExperimentalShowcase />
      <CompareStrip />
      <ResultWall
        eyebrow="Style compare"
        intro="Treat the same brief as a style test. These sample boards make the contrast between different visual languages much easier to read."
        items={buildCompareResultWall()}
        title="How one brief changes across style systems"
      />
      <LibraryBrowser
        items={styleCategories}
        searchPlaceholder="Search 3D, Bauhaus, modern art, motion, monochrome, glass..."
      />
    </main>
  );
}
