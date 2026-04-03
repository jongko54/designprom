import { SiteHeader } from "@/components/layout/site-header";
import { BrandDnaMotionHero } from "@/components/sections/brand-dna-motion-hero";
import { LibraryBrowser } from "@/components/sections/library-browser";
import { featuredDna } from "@/data/site";

export default function DnaPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <BrandDnaMotionHero />
      <LibraryBrowser
        items={featuredDna}
        introDescription="Study the design language itself here: layout behavior, hierarchy, palette, and prompt wording. Example pages now live in the Template Analysis tab."
        introLabel="Brand language index"
        metaLabel="brand systems"
        searchPlaceholder="Search Apple, Figma, Airbnb, IBM, TikTok, Google, Meta, Instagram..."
        visibleLabel="visible brand systems"
      />
    </main>
  );
}
