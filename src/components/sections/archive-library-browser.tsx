"use client";

import { useDeferredValue, useState } from "react";

import { ArchiveEntryCard } from "@/components/cards/archive-entry-card";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import { PromptArchiveEntry } from "@/data/site";

type ArchiveLibraryBrowserProps = {
  items: PromptArchiveEntry[];
};

const categoryOrder = [
  "Beauty Commerce",
  "K-Beauty",
  "Ecommerce",
  "Graphic Design",
  "Photography",
  "Architecture",
  "Fashion",
  "Art Direction",
  "Typography",
  "Studio",
  "Creative Tech",
  "Product Design"
];

function getArchiveFilters(items: PromptArchiveEntry[]) {
  const values = new Set<string>();

  items.forEach((item) => {
    values.add(item.portfolioCategory);
  });

  const sorted = Array.from(values).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });

  return ["All", ...sorted];
}

export function ArchiveLibraryBrowser({ items }: ArchiveLibraryBrowserProps) {
  const filters = getArchiveFilters(items);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const deferredSearch = useDeferredValue(search);
  const normalizedQuery = deferredSearch.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const matchesFilter = activeFilter === "All" || item.portfolioCategory === activeFilter;

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
      item.curatorNote,
      ...item.outputFocus
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  const totalCaptures = filteredItems.reduce(
    (count, item) => count + getArchiveStitchExports(item).length,
    0
  );

  return (
    <section className="content-section archive-cargo-shell">
      <div className="browser-controls">
        <div className="browser-archive-note">
          <div className="micro-row">
            <span>Archive browser</span>
            <span>{totalCaptures} linked stitch captures</span>
          </div>
          <p>
            Search by portfolio type, output goal, or prompt wording. Each case
            file opens like a template detail page with prompt copy, remix text,
            and linked real output.
          </p>
        </div>
        <label className="search-shell">
          <span className="builder-label">Search</span>
          <input
            aria-label="Search archive"
            className="search-input"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search beauty commerce, k-beauty, ecommerce, studio portfolio, creative tech..."
            type="search"
            value={search}
          />
        </label>
        <div className="filter-shell">
          <span className="builder-label">Filter</span>
          <div className="chip-row">
            {filters.map((filter) => (
              <button
                className={
                  filter === activeFilter ? "filter-chip active" : "filter-chip"
                }
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="browser-meta">
        <span>{filteredItems.length} visible case files</span>
        <span>Search across category, brief, prompt, remix, and output focus.</span>
      </div>
      <div className="archive-preview-grid archive-catalog-grid">
        {filteredItems.map((entry) => (
          <ArchiveEntryCard compact entry={entry} key={entry.slug} />
        ))}
      </div>
    </section>
  );
}
