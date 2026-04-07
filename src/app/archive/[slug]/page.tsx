import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { PromptArchiveDetail } from "@/components/sections/prompt-archive-detail";
import { getArchiveBySlug, promptArchive } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

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

export default async function ArchiveDetailPage({
  params
}: ArchiveDetailPageProps) {
  const { slug } = await params;
  const entry = getArchiveBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="page-frame">
      <SiteHeader />
      <PromptArchiveDetail entry={entry} />
    </main>
  );
}
