import type { Metadata } from "next";

import { FaqSection } from "@/components/sections/faq-section";
import { SiteHeader } from "@/components/layout/site-header";
import { ArchiveLibraryBrowser } from "@/components/sections/archive-library-browser";
import { SearchContentSection } from "@/components/sections/search-content-section";
import { SavedRoughDrafts } from "@/components/sections/saved-rough-drafts";
import { promptArchive } from "@/data/site";
import { buildFaqSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Prompt example archive for AI design and portfolio websites",
  description:
    "Explore prompt case files for fashion portfolios, K-beauty ecommerce, product launches, art direction archives, and AI website inspiration.",
  keywords: [
    "prompt archive",
    "ai website prompts",
    "fashion portfolio prompts",
    "ecommerce prompt examples"
  ],
  path: "/archive"
});

const archiveFaq = [
  {
    question: "What kinds of prompt examples are in the archive?",
    answer:
      "The archive includes portfolio prompts, AI product landing pages, fashion case studies, K-beauty ecommerce homepages, creative tech portfolios, and campaign microsite examples."
  },
  {
    question: "How should I use an archive case file?",
    answer:
      "Open a case file to copy the original prompt, inspect the remix prompt, review the output checklist, and compare the prompt against linked generated screens."
  },
  {
    question: "Can I search by industry or page type?",
    answer:
      "Yes. The archive browser lets you search by category, brief, prompt language, and output focus so you can find examples for industries like beauty, fashion, ecommerce, or B2B products."
  }
];

export default function ArchivePage() {
  return (
    <main className="page-frame">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(archiveFaq)) }}
        suppressHydrationWarning
        type="application/ld+json"
      />
      <SiteHeader />
      <SavedRoughDrafts />
      <ArchiveLibraryBrowser items={promptArchive} />
      <SearchContentSection
        eyebrow="Archive use cases"
        intro="Archive pages are built to rank for long-tail searches around AI design prompts, portfolio website prompts, ecommerce homepage prompts, and brand-inspired landing page examples."
        links={[
          {
            href: "/archive/quiet-ai-launch-board",
            label: "AI product landing page prompt example",
            description:
              "Use this case when you want a restrained product launch page with premium spacing and a calm hierarchy."
          },
          {
            href: "/archive/luxury-runway-house-template",
            label: "Fashion portfolio prompt example",
            description:
              "Open a couture-facing prompt example built around runway pacing, editorial image pull, and brand storytelling."
          },
          {
            href: "/archive/sokoglam-editorial-commerce-case",
            label: "K-beauty ecommerce prompt example",
            description:
              "Study an ingredient-led beauty commerce prompt with merchandising, education, and routine-building language."
          }
        ]}
        points={[
          "Search by industry when you need a beauty, fashion, studio, or ecommerce prompt example.",
          "Search by page goal when you need a landing page, campaign microsite, portfolio index, or B2B proof page.",
          "Use linked Stitch captures to compare prompt language with real generated layout outputs."
        ]}
        title="Prompt case files for portfolios, ecommerce, campaigns, and AI product websites"
      />
      <FaqSection
        eyebrow="Archive FAQ"
        items={archiveFaq}
        title="How the prompt archive works"
      />
    </main>
  );
}
