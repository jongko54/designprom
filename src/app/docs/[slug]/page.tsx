import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/sections/page-hero";
import { docsLibrary } from "@/data/docs";

type DocPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return docsLibrary.map((doc) => ({ slug: doc.slug }));
}

export default async function DocDetailPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = docsLibrary.find((entry) => entry.slug === slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="page-frame">
      <SiteHeader />
      <PageHero
        eyebrow="Docs"
        title={doc.title}
        description={doc.description}
      />
      <section className="content-section">
        <div className="doc-stack">
          {doc.sections.map((section) => (
            <article className="collection-card" key={section.heading}>
              <h3>{section.heading}</h3>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="ghost-button" href="/docs">
            Back to docs
          </Link>
        </div>
      </section>
    </main>
  );
}
