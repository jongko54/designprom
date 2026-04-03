export type DocEntry = {
  slug: string;
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export const docsLibrary: DocEntry[] = [
  {
    slug: "prd",
    title: "PRD",
    description: "Product framing, IA, MVP scope, and roadmap.",
    sections: [
      {
        heading: "Product definition",
        body: [
          "Designprom is a prompt-first design inspiration library for people who can recognize good taste but cannot yet translate it into reproducible prompt language.",
          "The core flow is design DNA to visual traits to prompt recipe to generated result."
        ]
      },
      {
        heading: "MVP scope",
        body: [
          "The first release centers on curated categories, prompt copy, compare views, and collections.",
          "Community uploads, bookmarks, and automated generation pipelines stay out of the initial build."
        ]
      },
      {
        heading: "Positioning",
        body: [
          "This should not behave like a generic gallery or template dump.",
          "It should feel like an editorial design lab that also functions as a practical prompt tool."
        ]
      }
    ]
  },
  {
    slug: "sitemap",
    title: "Sitemap and Flows",
    description: "Route map and primary user journeys.",
    sections: [
      {
        heading: "Current routes",
        body: [
          "Public routes are home, DNA, styles, collections, archive, compare, builder, and docs.",
          "Detail routes exist for DNA, styles, collections, docs, and prompt archive case files."
        ]
      },
      {
        heading: "Primary flows",
        body: [
          "Users can start from a brand-like design language, a medium like 3D or editorial, or a concrete goal such as an AI SaaS launch.",
          "All flows should converge on a prompt copy action and then continue into the builder."
        ]
      }
    ]
  },
  {
    slug: "seed-content",
    title: "Seed Content",
    description: "First 20 category cards and prompt recipes.",
    sections: [
      {
        heading: "Card structure",
        body: [
          "Each category card needs a summary, visual traits, do list, avoid list, Stitch prompt, and suggested outputs.",
          "The wording must stay concrete enough to affect layout, typography, motion, and tone."
        ]
      },
      {
        heading: "Initial card groups",
        body: [
          "The first content set is split across brand DNA, style categories, and use-case templates.",
          "This gives the product enough breadth to teach composition without becoming a bloated gallery."
        ]
      }
    ]
  },
  {
    slug: "homepage-copy",
    title: "Homepage Copy",
    description: "Landing page copy blocks for the first version.",
    sections: [
      {
        heading: "Hero message",
        body: [
          "The top message should frame the product as a way to find design language, not just screenshots.",
          "The tone needs to be sharp, editorial, and operational rather than generic startup marketing."
        ]
      },
      {
        heading: "Section rhythm",
        body: [
          "The copy moves from discovery to translation to comparison to action.",
          "This mirrors the actual user need: taste, understanding, selection, then generation."
        ]
      }
    ]
  }
];
