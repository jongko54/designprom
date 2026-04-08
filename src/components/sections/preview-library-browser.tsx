"use client";

import Link from "next/link";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PublishActions } from "@/components/ui/publish-actions";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import { type PromptArchiveEntry } from "@/data/site";
import { buildArchivePublishAssets } from "@/lib/publish-assets";

type PreviewLibraryBrowserProps = {
  items: PromptArchiveEntry[];
};

function getPreviewFilters(items: PromptArchiveEntry[]) {
  return Array.from(new Set(items.map((item) => item.portfolioCategory))).sort((left, right) =>
    left.localeCompare(right)
  );
}

export function PreviewLibraryBrowser({ items }: PreviewLibraryBrowserProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filters = getPreviewFilters(items);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = items.filter((item) => {
    const matchesFilter =
      activeFilter === "All" || item.portfolioCategory === activeFilter;

    if (!matchesFilter) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      item.title,
      item.summary,
      item.brief,
      item.useCase,
      item.portfolioCategory,
      item.prompt,
      item.remixPrompt,
      item.outputFocus.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  return (
    <section className="preview-browser-shell site-shell">
      <div className="preview-browser-controls">
        <label className="preview-search-field">
          <span>Search</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search portfolios, fashion, beauty, ecommerce, art direction..."
            type="search"
            value={query}
          />
        </label>
        <div className="preview-filter-row" role="tablist" aria-label="Preview category filters">
          <button
            className={activeFilter === "All" ? "is-active" : undefined}
            onClick={() => setActiveFilter("All")}
            type="button"
          >
            All
          </button>
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? "is-active" : undefined}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="preview-browser-meta micro-row">
        <span>{visibleItems.length} live-style previews</span>
        <span>{activeFilter === "All" ? "All categories" : activeFilter}</span>
      </div>
      <div className="preview-stream">
        {visibleItems.map((entry) => {
          const stitchScreen = getArchiveStitchExports(entry)[0];
          const previewImage = stitchScreen?.image ?? entry.coverImage;
          const previewMeta = stitchScreen?.runLabel ?? entry.useCase;
          const previewNote = stitchScreen?.note ?? entry.summary;

          return (
            <article className="preview-stream-card" key={entry.slug}>
              <div className="preview-stream-browser">
                <div className="preview-stream-chrome">
                  <div className="preview-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span>{previewMeta}</span>
                  <span>{entry.portfolioCategory}</span>
                </div>
                <div className="preview-stream-stage">
                  <ImageLightbox
                    alt={previewImage.alt}
                    className="preview-stream-image"
                    modalClassName="preview-stream-lightbox-image"
                    src={previewImage.src}
                  />
                </div>
              </div>
              <div className="preview-stream-copy">
                <div className="micro-row">
                  <span>{entry.portfolioCategory}</span>
                  <span>{entry.useCase}</span>
                </div>
                <h2>{entry.title}</h2>
                <p>{entry.summary}</p>
                <div className="preview-stream-focus">
                  {entry.outputFocus.slice(0, 4).map((focus) => (
                    <span key={focus}>{focus}</span>
                  ))}
                </div>
                <p className="preview-stream-note">{previewNote}</p>
                <div className="preview-stream-actions">
                  <Link className="ghost-button" href={`/archive/${entry.slug}`}>
                    Open case file
                  </Link>
                  <PublishActions
                    assets={buildArchivePublishAssets(entry)}
                    className="publish-actions compact"
                    shareText={entry.title}
                    shareTitle={entry.title}
                    shareUrl={`/archive/${entry.slug}`}
                    zipName={entry.slug}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {visibleItems.length === 0 ? (
        <div className="preview-browser-empty">
          <strong>No previews matched the current search.</strong>
          <p>Try a broader keyword or switch back to All.</p>
        </div>
      ) : null}
    </section>
  );
}
