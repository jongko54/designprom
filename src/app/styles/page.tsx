import { SiteHeader } from "@/components/layout/site-header";
import { CompareStrip } from "@/components/sections/compare-strip";
import { ExperimentalShowcase } from "@/components/sections/experimental-showcase";
import { LibraryBrowser } from "@/components/sections/library-browser";
import { PageHero } from "@/components/sections/page-hero";
import { ResultWall } from "@/components/sections/result-wall";
import { buildCompareResultWall, styleCategories } from "@/data/site";

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
