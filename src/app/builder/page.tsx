import type { Metadata } from "next";
import { Suspense } from "react";

import { FaqSection } from "@/components/sections/faq-section";
import { SiteHeader } from "@/components/layout/site-header";
import { SearchContentSection } from "@/components/sections/search-content-section";
import { BuilderWorkspace } from "@/components/sections/builder-workspace";
import { buildFaqSchema, buildMetadata } from "@/lib/seo";

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

const builderFaq = [
  {
    question: "How do I write a better AI website prompt?",
    answer:
      "Start with page type, audience, tone, visual system, and conversion goal. Strong prompts usually mention layout density, typography cues, motion level, and what should be avoided."
  },
  {
    question: "What is the free preview in the builder for?",
    answer:
      "The free preview interprets your prompt into a likely website direction before you spend time in external generators. It helps you catch whether the prompt reads like a landing page, portfolio, campaign, or ecommerce layout."
  },
  {
    question: "Should I use Brand DNA examples before writing prompts?",
    answer:
      "Yes. Brand DNA pages are the fastest way to borrow a known interface language such as Apple-like restraint, Figma-like tool density, or Airbnb-like hospitality rhythm."
  }
];

export default function BuilderPage() {
  return (
    <main className="page-frame">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(builderFaq)) }}
        suppressHydrationWarning
        type="application/ld+json"
      />
      <SiteHeader />
      <Suspense fallback={null}>
        <BuilderWorkspace />
      </Suspense>
      <SearchContentSection
        eyebrow="Prompt writing guide"
        intro="The builder is best used as a first-draft tool for AI landing pages, portfolio websites, ecommerce homepages, and campaign microsites. A useful prompt should explain page type, hierarchy, visual cues, and the conversion or reading goal."
        links={[
          {
            href: "/dna",
            label: "Open Brand DNA first",
            description:
              "Use company-inspired UI patterns when you need a stronger starting direction for product, tool, hospitality, or creator-style websites."
          },
          {
            href: "/archive",
            label: "Check archive examples",
            description:
              "Open finished prompt case files before writing from scratch so you can borrow prompt structure instead of only adjectives."
          }
        ]}
        points={[
          "Name the page type directly: landing page, portfolio, ecommerce homepage, campaign microsite, or documentation page.",
          "Describe hierarchy and rhythm: hero scale, section spacing, grid density, image pacing, and CTA placement.",
          "Describe what should not happen: avoid generic gradients, cluttered cards, weak hierarchy, or decorative UI noise."
        ]}
        title="How to write AI website prompts that generate stronger layouts"
      />
      <FaqSection
        eyebrow="Builder FAQ"
        items={builderFaq}
        title="Questions people ask before writing prompts"
      />
    </main>
  );
}
