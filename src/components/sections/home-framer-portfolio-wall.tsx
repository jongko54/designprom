import Image from "next/image";
import Link from "next/link";

import { PublishActions } from "@/components/ui/publish-actions";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import { promptArchive } from "@/data/site";
import { buildArchivePublishAssets } from "@/lib/publish-assets";

const showcaseSlugs = [
  "editorial-portfolio-casefile",
  "creator-portfolio-archive",
  "studio-showcase-system",
  "creative-tech-portfolio-grid",
  "neo-tokyo-night-drive-portfolio-case",
  "shibuya-replicant-archive-case",
  "graphic-design-template-index",
  "type-specimen-archive-template",
  "architecture-monograph-template",
  "fashion-lookbook-template",
  "luxury-runway-house-template",
  "streetwear-drop-journal-template",
  "quiet-ai-launch-board",
  "enterprise-proof-stack"
] as const;

const tileSizes = ["tall", "medium", "short"] as const;
const showcaseImageSizes = "(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 25vw";

function chunkIntoColumns<T>(items: T[], count: number) {
  return Array.from({ length: count }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % count === columnIndex)
  );
}

const showcaseEntries = showcaseSlugs
  .map((slug) => promptArchive.find((entry) => entry.slug === slug))
  .filter((entry): entry is (typeof promptArchive)[number] => Boolean(entry));

const showcaseColumns = chunkIntoColumns(showcaseEntries, 4);

export function HomeFramerPortfolioWall() {
  return (
    <section className="hero-panel framer-portfolio-wall">
      <div className="framer-portfolio-layout">
        <div className="framer-portfolio-copy">
          <div className="micro-row">
            <span>Portfolio wall</span>
            <span>{showcaseEntries.length} stitched directions</span>
          </div>
          <h1>Check prompt examples for AI design.</h1>
          <p className="hero-copy">
            The home page now works like a Framer-style portfolio wall: many
            finished directions visible at once, each tied back to a prompt,
            a category, and a reusable structure.
          </p>
          <div className="framer-portfolio-stat-grid">
            <article>
              <span>View mode</span>
              <strong>Portfolio-first discovery</strong>
            </article>
            <article>
              <span>Best for</span>
              <strong>Studios, creators, art direction, design systems</strong>
            </article>
            <article>
              <span>Next move</span>
              <strong>Open Archive or Builder to inspect prompts and outputs</strong>
            </article>
          </div>
          <div className="hero-actions">
            <Link className="primary-button" href="/archive" prefetch={false}>
              Open archive
            </Link>
            <Link className="tertiary-link" href="/builder" prefetch={false}>
              Open prompt builder
            </Link>
          </div>
        </div>

        <div aria-label="Portfolio showcase wall" className="framer-portfolio-columns">
          {showcaseColumns.map((column, columnIndex) => (
            <div
              className={`framer-portfolio-column column-${columnIndex + 1}`}
              key={`column-${columnIndex + 1}`}
            >
              {column.map((entry, itemIndex) => {
                const capture = getArchiveStitchExports(entry)[0];
                const image = capture?.image ?? entry.coverImage;
                const size = tileSizes[(columnIndex + itemIndex) % tileSizes.length];
                const publishAssets = buildArchivePublishAssets(entry);

                return (
                  <article className={`framer-portfolio-tile ${size}`} key={entry.slug}>
                    <Link
                      className="framer-portfolio-tile-link"
                      href={`/archive/${entry.slug}`}
                      prefetch={false}
                    >
                      <div className="framer-portfolio-image-shell">
                        <Image
                          alt={image.alt}
                          className="framer-portfolio-image"
                          fill
                          quality={70}
                          sizes={showcaseImageSizes}
                          src={image.src}
                          style={
                            capture?.objectPosition
                              ? { objectFit: "cover", objectPosition: capture.objectPosition }
                              : { objectFit: "cover" }
                          }
                        />
                      </div>
                      <div className="framer-portfolio-tile-copy">
                        <div className="micro-row">
                          <span>{entry.portfolioCategory}</span>
                          <span>{entry.useCase}</span>
                        </div>
                        <h2>{entry.title}</h2>
                        <p>{entry.summary}</p>
                      </div>
                    </Link>
                    <PublishActions
                      assets={publishAssets}
                      className="publish-actions compact"
                      shareText={`${entry.title} / ${entry.useCase}`}
                      shareTitle={entry.title}
                      shareUrl={`/archive/${entry.slug}`}
                      zipName={entry.title}
                    />
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
