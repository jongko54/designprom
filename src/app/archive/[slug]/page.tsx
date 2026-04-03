import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { PromptArchiveDetail } from "@/components/sections/prompt-archive-detail";
import { getArchiveBySlug, promptArchive } from "@/data/site";

type ArchiveDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return promptArchive.map((entry) => ({ slug: entry.slug }));
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
