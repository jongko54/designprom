import Link from "next/link";

import { GeneratedPreviewMock } from "@/components/ui/generated-preview-mock";
import { collections, getCategoryHref, getCollectionEntries } from "@/data/site";

export function CollectionsAtlas() {
  const [leadCollection, ...supportCollections] = collections;
  const leadEntries = getCollectionEntries(leadCollection);

  return (
    <section className="content-section atlas-shell atlas-shell-editorial">
      <div className="section-heading atlas-heading">
        <div className="eyebrow">Collection atlas</div>
        <h2>
          Editorial prompt boards,
          <span className="heading-mix"> built around live briefs</span>
        </h2>
        <p>
          The homepage should read like a curator's desk: one lead board, a
          clear point of view, and supporting collections that feel distinct
          instead of interchangeable.
        </p>
      </div>
      <div className="collections-spread">
        <article className="atlas-lead-card" key={leadCollection.slug}>
          <div className="micro-row">
            <span>Issue 04 / launch board</span>
            <span>{leadCollection.microNote}</span>
          </div>
          <div className="atlas-lead-grid">
            <div className="atlas-lead-copy">
              <div className="atlas-marker">Lead collection</div>
              <h3>{leadCollection.title}</h3>
              <p>{leadCollection.description}</p>
              <p className="atlas-note">{leadCollection.artDirection}</p>
              <div className="atlas-entry-links">
                {leadEntries.map((entry) => (
                  <Link
                    className="atlas-entry-chip"
                    href={getCategoryHref(entry)}
                    key={entry.slug}
                  >
                    <span>{entry.kind === "dna" ? "DNA" : "Style"}</span>
                    <strong>{entry.title}</strong>
                  </Link>
                ))}
              </div>
              <div className="atlas-actions">
                <Link
                  className="primary-button"
                  href={`/collections/${leadCollection.slug}`}
                >
                  Open board
                </Link>
                <div className="micro-row atlas-footnote">
                  <span>{leadCollection.resultMood}</span>
                  <span>{leadEntries.length} prompt directions</span>
                </div>
              </div>
            </div>
            <div className="atlas-lead-stage">
              <GeneratedPreviewMock
                label={leadCollection.title.split(" ")[0]}
                meta={leadCollection.microNote}
                size="board"
                tone={leadCollection.previewTone}
              />
              <pre className="atlas-ascii" aria-hidden="true">
                {`[BOARD SIGNAL]
== lead brief
:: prompt rhythm
// visual stack`}
              </pre>
            </div>
          </div>
        </article>
        <div className="atlas-side-column">
          {supportCollections.map((collection, index) => (
            <article className="atlas-side-card" key={collection.slug}>
              <div className="micro-row">
                <span>{String(index + 2).padStart(2, "0")}</span>
                <span>{collection.microNote}</span>
              </div>
              <div className="atlas-side-head">
                <h3>{collection.title}</h3>
                <p>{collection.artDirection}</p>
              </div>
              <GeneratedPreviewMock
                label={collection.title.split(" ")[0]}
                meta={collection.resultMood}
                size="card"
                tone={collection.previewTone}
              />
              <div className="atlas-side-tags">
                {getCollectionEntries(collection).map((entry) => (
                  <span key={entry.slug}>{entry.title}</span>
                ))}
              </div>
              <Link
                className="ghost-button inline-button"
                href={`/collections/${collection.slug}`}
              >
                Open board
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
