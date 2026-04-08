import type { Metadata } from "next";

import { FaqSection } from "@/components/sections/faq-section";
import { SiteHeader } from "@/components/layout/site-header";
import { BrandDnaMotionHero } from "@/components/sections/brand-dna-motion-hero";
import { LibraryBrowser } from "@/components/sections/library-browser";
import { SearchContentSection } from "@/components/sections/search-content-section";
import { featuredDna } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata
} from "@/lib/seo";

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

const dnaFaq = [
  {
    question: "What does Brand DNA mean on designprom?",
    answer:
      "Brand DNA pages translate recognizable interface behavior into reusable prompt language. Instead of copying a company directly, the page explains what kind of layout, hierarchy, tone, and interaction cues make the direction work."
  },
  {
    question: "Which companies are covered in Brand DNA?",
    answer:
      "The Brand DNA tab focuses on Apple, Figma, Airbnb, IBM, TikTok, Google, Meta, and Instagram-style website directions."
  },
  {
    question: "How should I use a Brand DNA example?",
    answer:
      "Start with the company-like direction that matches your project, copy the relevant prompt structure, then adapt the audience, page type, and conversion goal in the builder."
  }
];

const dnaSchemas = [
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Brand DNA", path: "/dna" }
  ]),
  buildFaqSchema(dnaFaq)
];

export default function DnaPage() {
  return (
    <main className="page-frame">
      {dnaSchemas.map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={`dna-schema-${index}`}
          suppressHydrationWarning
          type="application/ld+json"
        />
      ))}
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
      <SearchContentSection
        eyebrow="Brand prompt guide"
        intro="Brand DNA pages help people search for Apple-style landing page prompts, Figma-like dashboard prompts, Airbnb-style hospitality layouts, IBM-like systems pages, and creator-native campaign prompts. These pages explain the interface language, not just the surface style."
        links={[
          {
            href: "/analysis",
            label: "Open template analysis",
            description:
              "See how company-style prompt directions connect to reference websites, translated prompts, and generated outputs."
          },
          {
            href: "/builder",
            label: "Write a prompt from Brand DNA",
            description:
              "Move from a company-inspired design language into a prompt you can adapt for your own product, portfolio, or ecommerce homepage."
          },
          {
            href: "/archive",
            label: "Browse finished prompt case files",
            description:
              "Open prompt examples that already connect the wording, remix prompt, and generated outputs in one place."
          }
        ]}
        points={[
          "Use Brand DNA when you need a known interface language before writing your prompt from scratch.",
          "Name behavior, not just brand names: layout density, trust rhythm, modular proof, creator overlays, or tool-like rails.",
          "Use Template Analysis when you want to see how those brand-like directions turn into real page structures."
        ]}
        title="Company-inspired website prompt directions for AI design"
      />
      <FaqSection
        eyebrow="Brand DNA FAQ"
        items={dnaFaq}
        title="Questions people ask when searching for company-style prompts"
      />
    </main>
  );
}
