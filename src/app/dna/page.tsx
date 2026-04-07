import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { BrandDnaMotionHero } from "@/components/sections/brand-dna-motion-hero";
import { LibraryBrowser } from "@/components/sections/library-browser";
import { featuredDna } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brand DNA prompts inspired by Apple, Figma, Airbnb, IBM, and TikTok",
  description:
    "Study brand-like design systems and prompt wording for Apple-style landing pages, Figma dashboards, Airbnb hospitality flows, IBM systems pages, and TikTok campaign layouts.",
  keywords: [
    "apple style prompt",
    "figma website prompt",
    "airbnb landing page prompt",
    "brand dna prompts"
  ],
  path: "/dna"
});

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
