"use client";

import Link from "next/link";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import { type PromptArchiveEntry } from "@/data/site";

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
  }).reverse();

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
        <span>{visibleItems.length} preview thumbnails</span>
        <span>{activeFilter === "All" ? "All categories" : activeFilter}</span>
      </div>
      <div className="preview-thumbnail-grid">
        {visibleItems.map((entry) => {
          const stitchScreen = getArchiveStitchExports(entry)[0];
          const previewImage = stitchScreen?.image ?? entry.coverImage;
          const previewMeta = stitchScreen?.runLabel ?? entry.useCase;

          return (
            <article className="preview-thumbnail-card" key={entry.slug}>
              <div className="preview-thumbnail-browser">
                <div className="preview-thumbnail-chrome">
                  <div className="preview-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span>{previewMeta}</span>
                </div>
                <div className="preview-thumbnail-stage">
                  <ImageLightbox
                    alt={previewImage.alt}
                    className="preview-thumbnail-image"
                    modalClassName="preview-thumbnail-lightbox-image"
                    src={previewImage.src}
                  />
                </div>
              </div>
              <div className="preview-thumbnail-copy">
                <div className="micro-row">
                  <span>{entry.portfolioCategory}</span>
                  <span>{entry.useCase}</span>
                </div>
                <Link className="preview-thumbnail-title" href={`/archive/${entry.slug}`}>
                  {entry.title}
                </Link>
                <p>{entry.summary}</p>
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
