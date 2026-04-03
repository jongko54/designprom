"use client";

import { useEffect, useState } from "react";

import { CopyButton } from "@/components/ui/copy-button";
import { PreviewSurface } from "@/components/ui/preview-surface";
import {
  clearSavedRoughDrafts,
  readSavedRoughDrafts,
  removeSavedRoughDraft,
  subscribeToSavedRoughDrafts,
  type SavedRoughDraft
} from "@/lib/rough-draft-archive";

type SortMode = "latest" | "oldest" | "title";

export function SavedRoughDrafts() {
  const [items, setItems] = useState<SavedRoughDraft[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("latest");

  useEffect(() => {
    setItems(readSavedRoughDrafts());

    return subscribeToSavedRoughDrafts(() => {
      setItems(readSavedRoughDrafts());
    });
  }, []);

  const sortedItems = [...items].sort((left, right) => {
    if (sortMode === "oldest") {
      return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
    }

    if (sortMode === "title") {
      return left.title.localeCompare(right.title);
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="content-section saved-rough-shell">
      <div className="browser-archive-note">
        <div className="micro-row">
          <span>Saved rough drafts</span>
          <span>{items.length} local captures</span>
        </div>
        <p>
          These drafts stay in session cache only. They are useful as mood references
          and quick prompt checkpoints, and they clear when the page session ends.
        </p>
      </div>
      <div className="saved-rough-controls">
        <div className="filter-shell">
          <span className="builder-label">Sort</span>
          <div className="chip-row">
            <button
              className={sortMode === "latest" ? "filter-chip active" : "filter-chip"}
              onClick={() => setSortMode("latest")}
              type="button"
            >
              Latest
            </button>
            <button
              className={sortMode === "oldest" ? "filter-chip active" : "filter-chip"}
              onClick={() => setSortMode("oldest")}
              type="button"
            >
              Oldest
            </button>
            <button
              className={sortMode === "title" ? "filter-chip active" : "filter-chip"}
              onClick={() => setSortMode("title")}
              type="button"
            >
              A-Z
            </button>
          </div>
        </div>
        <button
          className="ghost-button button-reset"
          onClick={() => {
            clearSavedRoughDrafts();
            setItems([]);
          }}
          type="button"
        >
          Clear all
        </button>
      </div>
      <div className="archive-preview-grid archive-catalog-grid">
        {sortedItems.map((item) => (
          <article className="archive-entry-card compact resource-card archive-catalog-card" key={item.id}>
            <div className="micro-row">
              <span>{item.pageType}</span>
              <span>{item.model}</span>
            </div>
            <div className="archive-entry-preview">
              <PreviewSurface
                image={{
                  alt: item.title,
                  height: item.imageHeight,
                  src: item.imageUrl,
                  width: item.imageWidth
                }}
                label={item.title}
                meta={`${item.dnaLabel} / ${item.styleLabel}`}
                size="card"
                tone="gradient"
              />
            </div>
            <div className="card-heading">
              <h3>{item.title}</h3>
              <p>
                {item.tone} / {item.medium} / {item.motionLevel}
              </p>
            </div>
            <div className="archive-entry-prompt compact-prompt">
              <span>{new Date(item.createdAt).toLocaleDateString("en-CA")}</span>
              <p>{item.prompt}</p>
            </div>
            <div className="archive-entry-tags">
              <span>{item.colorDirection}</span>
              {item.seed ? <span>Seed {item.seed}</span> : null}
            </div>
            <div className="card-actions">
              <a
                className="primary-button"
                href={item.imageUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open image
              </a>
              <CopyButton
                className="ghost-button button-reset"
                copiedLabel="Prompt copied"
                value={item.prompt}
              />
              <button
                className="ghost-button button-reset"
                onClick={() => removeSavedRoughDraft(item.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
