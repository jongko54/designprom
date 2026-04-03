import Link from "next/link";

import { CategoryCard } from "@/components/cards/category-card";
import { ResultWall } from "@/components/sections/result-wall";
import { CopyButton } from "@/components/ui/copy-button";
import { GeneratedPreviewMock } from "@/components/ui/generated-preview-mock";
import {
  CollectionCard,
  buildCollectionResultWall,
  getCollectionEntries
} from "@/data/site";

type CollectionDetailProps = {
  collection: CollectionCard;
};

export function CollectionDetail({ collection }: CollectionDetailProps) {
  const entries = getCollectionEntries(collection);
  const wallItems = buildCollectionResultWall(collection);
  const collectionPrompt = `Design a ${collection.title.toLowerCase()} web direction using ${entries
    .map((entry) => entry.title)
    .join(", ")}. ${collection.artDirection} Keep the result coherent across hero, supporting proof sections, and conversion zones while preserving a clear editorial hierarchy.`;

  return (
    <>
      <section className="detail-hero archive-detail-hero">
        <Link className="tertiary-link inline-button" href="/collections">
          Back to collections
        </Link>
        <div className="detail-grid archive-detail-grid">
          <div className="detail-main">
            <div className="micro-meta">
              <span>{collection.microNote}</span>
              <span>collection board</span>
            </div>
            <div className="eyebrow">Collection</div>
            <h1>{collection.title}</h1>
            <p className="detail-summary">{collection.description}</p>
            <div className="signal-row">
              {entries.map((entry) => (
                <span key={entry.slug}>{entry.title}</span>
              ))}
            </div>
            <div className="detail-dossier-grid">
              <article className="detail-dossier-card">
                <div className="micro-row">
                  <span>Collection prompt</span>
                  <span>{entries.length} directions</span>
                </div>
                <div className="archive-prompt">
                  <span>Use this prompt bundle</span>
                  <p>{collectionPrompt}</p>
                </div>
                <div className="card-actions">
                  <CopyButton
                    className="primary-button button-reset"
                    copiedLabel="Prompt copied"
                    value={collectionPrompt}
                  />
                  <Link className="ghost-button" href="/builder">
                    Open builder
                  </Link>
                </div>
              </article>
              <article className="detail-dossier-card detail-dossier-note">
                <div className="micro-row">
                  <span>Bundle logic</span>
                  <span>{collection.resultMood}</span>
                </div>
                <ul className="bullet-list detail-bullet-list">
                  <li>{collection.artDirection}</li>
                  {entries.map((entry) => (
                    <li key={entry.slug}>
                      {entry.title}: {entry.summary}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
          <article className="detail-preview-panel">
            <div className="micro-row">
              <span>Collection output board</span>
              <span>{collection.resultMood}</span>
            </div>
            <GeneratedPreviewMock
              label={collection.title.split(" ")[0]}
              meta={collection.microNote}
              size="board"
              tone={collection.previewTone}
            />
            <div className="detail-preview-notes">
              <div>
                <span>Art direction</span>
                <p>{collection.artDirection}</p>
              </div>
              <div>
                <span>Included</span>
                <p>{entries.map((entry) => entry.facet).join(" / ")}</p>
              </div>
              <div>
                <span>Expected mood</span>
                <p>{collection.resultMood}</p>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div className="eyebrow">Included directions</div>
          <h2>Prompt examples already grouped for one concrete brief</h2>
        </div>
        <div className="card-grid">
          {entries.map((entry) => (
            <CategoryCard item={entry} key={entry.slug} />
          ))}
        </div>
      </section>
      <ResultWall
        eyebrow="Result wall"
        intro="These tiles show how one collection-level prompt can branch into compatible hero, type, and supporting layouts."
        items={wallItems}
        title="Generated boards inside this collection"
      />
    </>
  );
}
