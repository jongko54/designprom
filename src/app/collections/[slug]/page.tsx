import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { CollectionDetail } from "@/components/sections/collection-detail";
import { collections, getCollectionBySlug } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

type CollectionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params
}: CollectionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return buildMetadata({
      title: "Prompt collections",
      description: "Collections of prompt directions grouped by design scenario.",
      path: "/collections"
    });
  }

  return buildMetadata({
    title: `${collection.title} prompt collection`,
    description: `${collection.description} Art direction: ${collection.artDirection}.`,
    keywords: [collection.title, collection.resultMood, ...collection.includes],
    path: `/collections/${collection.slug}`
  });
}

export default async function CollectionDetailPage({
  params
}: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <main className="page-frame">
      <SiteHeader />
      <CollectionDetail collection={collection} />
    </main>
  );
}
