import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { FaqSection } from "@/components/sections/faq-section";
import { HomeFramerPortfolioWall } from "@/components/sections/home-framer-portfolio-wall";
import { SearchContentSection } from "@/components/sections/search-content-section";
import {
  buildFaqSchema,
  buildMetadata,
  buildWebsiteSchema
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI design prompt examples and website inspiration archive",
  description:
    "Browse AI design prompt examples, brand-inspired website directions, and portfolio-style archive pages built around reusable prompt language.",
  keywords: [
    "ai design prompts",
    "website prompt examples",
    "design inspiration archive",
    "portfolio prompt examples"
  ],
  path: "/"
});

const homeFaq = [
  {
    question: "What can I find on designprom?",
    answer:
      "designprom collects AI design prompt examples for landing pages, portfolios, ecommerce websites, campaigns, and brand-inspired interface directions. Each case connects prompt language to expected output."
  },
  {
    question: "How do I use the examples on this site?",
    answer:
      "Start from the archive to inspect finished prompt examples, then open the prompt builder to remix the language for your own website, portfolio, or brand direction."
  },
  {
    question: "Does designprom include real generated outputs?",
    answer:
      "Yes. Many archive entries and Brand DNA pages include linked Stitch output captures so you can compare prompt wording with generated layout results."
  }
];

const homeSchema = [buildWebsiteSchema(), buildFaqSchema(homeFaq)];

export default function HomePage() {
  return (
    <main className="page-frame">
      {homeSchema.map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={`home-schema-${index}`}
          suppressHydrationWarning
          type="application/ld+json"
        />
      ))}
      <SiteHeader />
      <HomeFramerPortfolioWall />
      <SearchContentSection
        eyebrow="Search guide"
        intro="designprom works best when each page explains what kind of AI design prompt it solves. Use the archive for finished prompt examples, Brand DNA for company-style UI direction, and the builder for first-draft prompt writing."
        links={[
          {
            href: "/archive",
            label: "Archive prompt examples",
            description:
              "Browse finished prompt case files for portfolios, ecommerce homepages, AI product launches, and art direction websites."
          },
          {
            href: "/dna",
            label: "Brand DNA examples",
            description:
              "Study Apple, Figma, Airbnb, IBM, TikTok, Google, and other brand-inspired website prompt directions."
          },
          {
            href: "/builder",
            label: "AI prompt builder",
            description:
              "Write a landing page, portfolio, campaign, or ecommerce prompt and preview the likely direction before using external generators."
          }
        ]}
        points={[
          "Use category pages to target specific searches such as fashion portfolio prompts, ecommerce homepage prompts, or AI product landing page prompts.",
          "Open archive case files to see prompt text, remix text, output goals, and linked generated screens on one page.",
          "Use the builder when you need a new prompt draft for a website hero, portfolio grid, campaign microsite, or ecommerce homepage."
        ]}
        title="AI design prompts for websites, portfolios, ecommerce, and landing pages"
      />
      <FaqSection
        eyebrow="FAQ"
        intro="These answers help first-time visitors understand how the archive and builder work, which also gives search engines more context about the site."
        items={homeFaq}
        title="What people usually want to know before using designprom"
      />
    </main>
  );
}
