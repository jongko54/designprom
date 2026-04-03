"use client";

import { useDeferredValue, useState } from "react";

import { CategoryCard } from "@/components/cards/category-card";
import { CategoryCard as CategoryCardType, getFacetFilters } from "@/data/site";

type LibraryBrowserProps = {
  items: CategoryCardType[];
  searchPlaceholder: string;
  introLabel?: string;
  introDescription?: string;
  metaLabel?: string;
  visibleLabel?: string;
  showPrompt?: boolean;
};

export function LibraryBrowser({
  items,
  searchPlaceholder,
  introLabel = "Library index",
  introDescription = "Filter by facet and search the prompt library by title, summary, tags, or use case. Every result keeps the prompt and expected output preview visible.",
  metaLabel = "prompt systems",
  visibleLabel = "visible categories",
  showPrompt = true
}: LibraryBrowserProps) {
  const filters = ["All", ...getFacetFilters(items)];
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const deferredSearch = useDeferredValue(search);
  const normalizedQuery = deferredSearch.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const matchesFilter =
      activeFilter === "All" ||
      item.facet === activeFilter ||
      item.tags.includes(activeFilter) ||
      item.useCases.includes(activeFilter);

    if (!matchesFilter) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      item.title,
      item.summary,
      item.mood,
      item.referenceBrand,
      item.templateExample,
      item.promptTip,
      item.facet,
      item.medium,
      ...item.tags,
      ...item.traits,
      ...item.useCases
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  return (
    <section className="content-section">
      <div className="browser-controls">
        <div className="browser-archive-note">
          <div className="micro-row">
            <span>{introLabel}</span>
            <span>{items.length} {metaLabel}</span>
          </div>
          <p>{introDescription}</p>
        </div>
        <label className="search-shell">
          <span className="builder-label">Search</span>
          <input
            aria-label="Search library"
            className="search-input"
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
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
        <span>{filteredItems.length} {visibleLabel}</span>
        <span>
          Search across title, summary, traits, tags, and use cases.
        </span>
      </div>
      <div className="card-grid">
        {filteredItems.map((item) => (
          <CategoryCard key={item.slug} item={item} showPrompt={showPrompt} />
        ))}
      </div>
    </section>
  );
}
