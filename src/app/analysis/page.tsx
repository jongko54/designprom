import type { Metadata } from "next";

import { FaqSection } from "@/components/sections/faq-section";
import { SiteHeader } from "@/components/layout/site-header";
import { SearchContentSection } from "@/components/sections/search-content-section";
import { TemplateAnalysisGallery } from "@/components/sections/template-analysis-gallery";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Template analysis for portfolio, ecommerce, and brand websites",
  description:
    "Study template structures and prompt translations for portfolio sites, K-beauty commerce, ecommerce homepages, and brand-inspired layouts.",
  keywords: [
    "template analysis",
    "portfolio website examples",
    "ecommerce homepage inspiration",
    "k-beauty website examples"
  ],
  path: "/analysis"
});

const analysisFaq = [
  {
    question: "What is Template Analysis for?",
    answer:
      "Template Analysis breaks down real website structures into prompt-ready language. It shows the reference site, the translated prompt, and the generated output so you can see what changed."
  },
  {
    question: "Does Template Analysis only cover portfolios?",
    answer:
      "No. It includes portfolio websites, K-beauty ecommerce homepages, premium commerce pages, direct-to-consumer stores, and company-style homepage systems."
  },
  {
    question: "How do I use a template analysis page to write better prompts?",
    answer:
      "Focus on the structural cues first: hero type, product rails, trust blocks, editorial pacing, CTA rhythm, and category navigation. Those patterns are more reusable than copying adjectives alone."
  }
];

const analysisSchemas = [
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Template Analysis", path: "/analysis" }
  ]),
  buildFaqSchema(analysisFaq)
];

export default function AnalysisPage() {
  return (
    <main className="page-frame">
      {analysisSchemas.map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={`analysis-schema-${index}`}
          suppressHydrationWarning
          type="application/ld+json"
        />
      ))}
      <SiteHeader />
      <TemplateAnalysisGallery />
      <SearchContentSection
        eyebrow="Analysis guide"
        intro="Template Analysis is designed for searches around portfolio website inspiration, ecommerce homepage examples, K-beauty site structure, and company-style UI prompt translation. It helps people move from reference sites to prompt wording without guessing."
        links={[
          {
            href: "/archive",
            label: "Open the prompt archive",
            description:
              "Use the archive when you want the cleaned-up prompt case file after seeing the analysis breakdown."
          },
          {
            href: "/dna",
            label: "Study Brand DNA systems",
            description:
              "Open Brand DNA when you want broader Apple-like, Figma-like, Airbnb-like, or IBM-like design directions."
          },
          {
            href: "/builder",
            label: "Rewrite the prompt in Builder",
            description:
              "Use the builder after analysis if you want to turn the observed structure into a new prompt draft for your own site."
          }
        ]}
        points={[
          "Use this page to study how real sites translate into prompt-ready layout instructions.",
          "Compare region-specific ecommerce patterns when writing beauty, fashion, or DTC homepage prompts.",
          "Use the generated output side to check whether the translated prompt preserved the original site structure."
        ]}
        title="Website template analysis for portfolios, K-beauty, ecommerce, and brand-inspired layouts"
      />
      <FaqSection
        eyebrow="Template Analysis FAQ"
        items={analysisFaq}
        title="What visitors usually want to know about the analysis tab"
      />
    </main>
  );
}
