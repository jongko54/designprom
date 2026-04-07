import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/sections/page-hero";
import { docsLibrary } from "@/data/docs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Internal docs",
  description:
    "Planning and repository documents for the designprom project.",
  noIndex: true,
  path: "/docs"
});

export default function DocsPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <PageHero
        eyebrow="Docs"
        title="Working documents behind the first designprom release"
        description="This route exists as a simple index for the planning and content docs currently living in the repository."
      />
      <section className="content-section">
        <div className="collection-grid">
          {docsLibrary.map((doc) => (
            <article className="collection-card" key={doc.slug}>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <Link className="primary-button" href={`/docs/${doc.slug}`}>
                Open doc
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
