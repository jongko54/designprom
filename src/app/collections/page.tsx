import { SiteHeader } from "@/components/layout/site-header";
import { CollectionsAtlas } from "@/components/sections/collections-atlas";
import { CollectionsGrid } from "@/components/sections/collections-grid";
import { PageHero } from "@/components/sections/page-hero";

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
