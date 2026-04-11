"use client";

import Link from "next/link";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import { type PromptArchiveEntry } from "@/data/site";

type PreviewLibraryBrowserProps = {
  items: PromptArchiveEntry[];
};

const previewPriority = new Map(
  [
    "web3-creator-broadcast-case",
    "scarlet-runway-house-case",
    "orange-soundstage-portal-case",
    "solar-editorial-playground-case",
    "verdant-digital-garden-case"
  ].map((slug, index) => [slug, index])
);

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
  const itemOrder = new Map(items.map((item, index) => [item.slug, index]));
  const visibleItems = items
    .filter((item) => {
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
    })
    .sort((left, right) => {
      const leftPriority = previewPriority.get(left.slug);
      const rightPriority = previewPriority.get(right.slug);

      if (leftPriority !== undefined || rightPriority !== undefined) {
        return (leftPriority ?? Number.MAX_SAFE_INTEGER) - (rightPriority ?? Number.MAX_SAFE_INTEGER);
      }

      return (itemOrder.get(right.slug) ?? 0) - (itemOrder.get(left.slug) ?? 0);
    });

  return (
    <section className="preview-browser-shell site-shell">
      <div className="preview-browser-controls">
        <label className="preview-search-field">
          <span>Search</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search portfolios, fashion, beauty, ecommerce, game launches, art direction..."
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
                    browserLabel={entry.title}
                    browserUrl={`https://designprom.vercel.app/archive/${entry.slug}`}
                    caption={entry.summary}
                    className="preview-thumbnail-image"
                    modalClassName="preview-thumbnail-website-lightbox"
                    modalImageClassName="preview-thumbnail-website-image"
                    src={previewImage.src}
                    viewer="website"
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
