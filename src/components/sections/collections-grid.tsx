import Link from "next/link";

import { GeneratedPreviewMock } from "@/components/ui/generated-preview-mock";
import { collections, getCategoryHref, getCollectionEntries } from "@/data/site";

export function CollectionsGrid() {
  return (
    <section className="content-section collections-editorial-shell">
      <div className="collections-index-rail">
        <div className="eyebrow">Editorial index</div>
        <h2>Scenario-first bundles with visible curation logic</h2>
        <p>
          Each collection mixes one dominant mood, one structural system, and
          one tension layer. The point is not just to browse references, but to
          understand why a bundle works before sending it into Stitch.
        </p>
        <div className="collections-rail-note">
          <span>Selection method</span>
          <p>
            Pick a brief, inspect the supporting directions, then remix the
            prompt instead of starting from zero.
          </p>
        </div>
      </div>
      <div className="collections-editorial-list">
        {collections.map((collection, index) => (
          <article
            className={`collections-editorial-card ${index % 2 === 1 ? "reverse" : ""}`}
            key={collection.slug}
          >
            <div className="collections-editorial-overline">
              <span className="collections-index-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="micro-row">
                <span>{collection.resultMood}</span>
                <span>{getCollectionEntries(collection).length} directions</span>
              </div>
            </div>
            <div className="collections-editorial-grid">
              <div className="collections-editorial-preview">
                <GeneratedPreviewMock
                  label={collection.title.split(" ")[0]}
                  meta={collection.microNote}
                  size="board"
                  tone={collection.previewTone}
                />
              </div>
              <div className="collections-editorial-copy">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <div className="collections-editorial-note">
                  <span>Art direction</span>
                  <p>{collection.artDirection}</p>
                </div>
                <div className="collections-editorial-links">
                  {getCollectionEntries(collection).map((item) => (
                    <Link
                      className="collections-entry-link"
                      href={getCategoryHref(item)}
                      key={item.slug}
                    >
                      <span>{item.facet}</span>
                      <strong>{item.title}</strong>
                    </Link>
                  ))}
                </div>
                <div className="card-actions">
                  <Link
                    className="primary-button"
                    href={`/collections/${collection.slug}`}
                  >
                    Open collection
                  </Link>
                  <span className="collections-micro-caption">
                    {collection.microNote}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
