import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { CollectionDetail } from "@/components/sections/collection-detail";
import { collections, getCollectionBySlug } from "@/data/site";

type CollectionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
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
