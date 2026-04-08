import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { PromptArchiveDetail } from "@/components/sections/prompt-archive-detail";
import { getArchiveBySlug, promptArchive } from "@/data/site";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata
} from "@/lib/seo";

type ArchiveDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return promptArchive.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params
}: ArchiveDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getArchiveBySlug(slug);

  if (!entry) {
    return buildMetadata({
      title: "Prompt archive",
      description: "Prompt example archive for AI design and portfolio websites.",
      path: "/archive"
    });
  }

  return buildMetadata({
    title: `${entry.title} prompt example`,
    description: `${entry.summary} Use case: ${entry.useCase}. Category: ${entry.portfolioCategory}.`,
    images: [{ alt: entry.coverImage.alt, url: entry.coverImage.src }],
    keywords: [
      entry.title,
      entry.useCase,
      entry.portfolioCategory,
      ...entry.outputFocus
    ],
    path: `/archive/${entry.slug}`,
    type: "article"
  });
}

function buildArchiveFaq(entry: NonNullable<ReturnType<typeof getArchiveBySlug>>) {
  return [
    {
      question: `What kind of website is ${entry.title} meant to generate?`,
      answer: `${entry.title} is designed for ${entry.useCase.toLowerCase()} work. The prompt focuses on ${entry.outputFocus.slice(0, 3).join(", ").toLowerCase()}.`
    },
    {
      question: `How should I adapt the ${entry.title} prompt for my own project?`,
      answer: `Keep the main layout and hierarchy cues, then replace the subject matter, offers, imagery references, and calls to action so the page fits your own audience and product.`
    },
    {
      question: `What should I preserve from this ${entry.portfolioCategory.toLowerCase()} prompt example?`,
      answer: `Preserve the structural cues that make the page readable: the use case framing, the section rhythm, and the output checklist. Those parts usually matter more than surface adjectives alone.`
    }
  ];
}

export default async function ArchiveDetailPage({
  params
}: ArchiveDetailPageProps) {
  const { slug } = await params;
  const entry = getArchiveBySlug(slug);

  if (!entry) {
    notFound();
  }

  const faq = buildArchiveFaq(entry);
  const schemas = [
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Archive", path: "/archive" },
      { name: entry.title, path: `/archive/${entry.slug}` }
    ]),
    buildFaqSchema(faq),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      description: entry.summary,
      headline: `${entry.title} prompt example`,
      image: [entry.coverImage.src],
      mainEntityOfPage: absoluteUrl(`/archive/${entry.slug}`),
      url: absoluteUrl(`/archive/${entry.slug}`)
    }
  ];

  return (
    <main className="page-frame">
      {schemas.map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={`archive-schema-${index}`}
          suppressHydrationWarning
          type="application/ld+json"
        />
      ))}
      <SiteHeader />
      <PromptArchiveDetail entry={entry} />
    </main>
  );
}
