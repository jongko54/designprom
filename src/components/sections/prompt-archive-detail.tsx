import Link from "next/link";

import { ArchiveEntryCard } from "@/components/cards/archive-entry-card";
import { CategoryCard } from "@/components/cards/category-card";
import { FaqSection } from "@/components/sections/faq-section";
import { ResultWall } from "@/components/sections/result-wall";
import { SearchContentSection } from "@/components/sections/search-content-section";
import { CopyButton } from "@/components/ui/copy-button";
import { PublishActions } from "@/components/ui/publish-actions";
import { PreviewSurface } from "@/components/ui/preview-surface";
import { getArchiveStitchExports, getStitchExports } from "@/data/stitch-exports";
import {
  PromptArchiveEntry,
  buildArchiveResultWall,
  getArchiveCategories,
  getArchiveCollection,
  getStitchExampleBySlug,
  getStitchExampleOwner,
  promptArchive
} from "@/data/site";

type PromptArchiveDetailProps = {
  entry: PromptArchiveEntry;
};

export function PromptArchiveDetail({ entry }: PromptArchiveDetailProps) {
  const categories = getArchiveCategories(entry);
  const collection = getArchiveCollection(entry);
  const stitchCaptures = getArchiveStitchExports(entry);
  const primaryCapture = stitchCaptures[0];
  const linkedSources = entry.stitchExampleSlugs.map((slug) => {
    const example = getStitchExampleBySlug(slug);
    const owner = getStitchExampleOwner(slug);
    const screen = getStitchExports(slug)[0];

    return {
      slug,
      example,
      owner,
      screen
    };
  });
  const relatedEntries = promptArchive
    .filter((candidate) => candidate.slug !== entry.slug)
    .filter((candidate) =>
      candidate.categorySlugs.some((slug) => entry.categorySlugs.includes(slug))
    )
    .slice(0, 2);
  const publishImageAssets = Array.from(
    new Map(
      [
        {
          filename: `${entry.slug}-cover${entry.coverImage.src.endsWith(".svg") ? ".svg" : ".png"}`,
          kind: "url" as const,
          url: entry.coverImage.src
        },
        ...entry.outputs
          .filter((output) => output.image)
          .map((output, index) => ({
            filename: `${entry.slug}-output-${index + 1}${output.image?.src.endsWith(".svg") ? ".svg" : ".png"}`,
            kind: "url" as const,
            url: output.image!.src
          })),
        ...stitchCaptures.map((screen, index) => ({
          filename: `${entry.slug}-stitch-${index + 1}${screen.image.src.endsWith(".svg") ? ".svg" : ".png"}`,
          kind: "url" as const,
          url: screen.image.src
        }))
      ].map((asset) => [asset.url, asset])
    ).values()
  );
  const publishAssets = [
    {
      content: `${entry.prompt}\n`,
      filename: "prompt.txt",
      kind: "text" as const
    },
    {
      content: `${entry.remixPrompt}\n`,
      filename: "remix-prompt.txt",
      kind: "text" as const
    },
    {
      filename: "manifest.json",
      kind: "json" as const,
      value: {
        categories: categories.map((category) => category.title),
        outputFocus: entry.outputFocus,
        slug: entry.slug,
        stitchExampleSlugs: entry.stitchExampleSlugs,
        summary: entry.summary,
        title: entry.title,
        useCase: entry.useCase
      }
    },
    ...publishImageAssets
  ];
  const faqItems = [
    {
      question: `What should this ${entry.useCase.toLowerCase()} prompt get right first?`,
      answer: `Start with ${entry.outputFocus.slice(0, 3).join(", ").toLowerCase()}. If those parts are clear, the first draft usually lands close to the intended direction.`
    },
    {
      question: `How do I remix ${entry.title} without losing the core direction?`,
      answer: `Keep the core section rhythm and hierarchy, then rewrite the subject matter, audience, and call to action. The remix prompt in this case file is the safest place to start.`
    },
    {
      question: `Where should I go after reading this prompt example?`,
      answer: `Open the builder to rewrite the prompt for your own project, or open the related Brand DNA pages to borrow a more specific interface language.`
    }
  ];

  return (
    <>
      <section className="detail-hero archive-detail-hero">
        <Link className="tertiary-link inline-button" href="/archive">
          Back to archive
        </Link>
        <div className="detail-grid archive-detail-grid">
          <div className="detail-main">
            <div className="micro-meta">
              <span>{entry.useCase}</span>
              <span>{collection?.title ?? "case file"}</span>
            </div>
            <div className="eyebrow archive-detail-eyebrow">Prompt case file</div>
            <h1>{entry.title}</h1>
            <p className="detail-summary">{entry.summary}</p>
            <div className="signal-row">
              {categories.map((category) => (
                <span key={category.slug}>{category.title}</span>
              ))}
            </div>
            <div className="detail-dossier-grid">
              <article className="detail-dossier-card">
                <div className="micro-row">
                  <span>Original prompt</span>
                  <span>{entry.useCase}</span>
                </div>
                <div className="archive-prompt">
                  <span>Prompt</span>
                  <p>{entry.prompt}</p>
                </div>
                <div className="card-actions">
                  <CopyButton
                    className="primary-button button-reset"
                    copiedLabel="Prompt copied"
                    value={entry.prompt}
                  />
                </div>
              </article>
              <article className="detail-dossier-card">
                <div className="micro-row">
                  <span>Remix prompt</span>
                  <span>variant</span>
                </div>
                <div className="archive-prompt">
                  <span>Prompt remix</span>
                  <p>{entry.remixPrompt}</p>
                </div>
                <div className="card-actions">
                  <CopyButton
                    className="ghost-button button-reset"
                    copiedLabel="Remix copied"
                    idleLabel="Copy remix"
                    value={entry.remixPrompt}
                  />
                </div>
              </article>
            </div>
          </div>
          <article className="detail-preview-panel">
            <div className="micro-row">
              <span>Expected output board</span>
              <span>{entry.useCase}</span>
            </div>
            <PreviewSurface
              image={primaryCapture?.image ?? entry.coverImage}
              label={entry.title.split(" ")[0]}
              meta={primaryCapture?.runLabel ?? entry.brief}
              objectPosition={primaryCapture?.objectPosition}
              size="board"
              tone={entry.previewTone}
            />
            <div className="detail-preview-notes">
              <div>
                <span>Curator note</span>
                <p>{entry.curatorNote}</p>
              </div>
              <div>
                <span>Output focus</span>
                <p>{entry.outputFocus.join(" / ")}</p>
              </div>
              {stitchCaptures.length ? (
                <div>
                  <span>Stitch capture set</span>
                  <p>{stitchCaptures.length} linked output screens attached to this case file.</p>
                </div>
              ) : null}
              <div>
                <span>Publishing</span>
                <p>Download this case as a ZIP package or share the current case file link.</p>
              </div>
              <PublishActions
                assets={publishAssets}
                shareText={`${entry.title} / ${entry.useCase}`}
                shareTitle={entry.title}
                zipName={entry.title}
              />
            </div>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div className="eyebrow">Brief and outcome</div>
          <h2>What the prompt is trying to produce</h2>
          <p>
            The brief sets the user goal. The output focus explains what the
            first generated draft should get right before any visual polish.
          </p>
        </div>
        <div className="detail-dossier-grid">
          <article className="detail-dossier-card detail-dossier-note">
            <div className="micro-row">
              <span>Creative brief</span>
              <span>{entry.useCase}</span>
            </div>
            <p>{entry.brief}</p>
          </article>
          <article className="detail-dossier-card detail-dossier-note">
            <div className="micro-row">
              <span>Output checklist</span>
              <span>{entry.outputs.length} panels</span>
            </div>
            <ul className="bullet-list detail-bullet-list">
              {entry.outputFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <SearchContentSection
        eyebrow="How to use this prompt"
        intro={`This case file is meant to rank for searches around ${entry.useCase.toLowerCase()}, ${entry.portfolioCategory.toLowerCase()} prompts, and reusable website prompt examples. Treat it as a working reference rather than a one-line prompt snippet.`}
        links={[
          {
            href: "/builder",
            label: "Rewrite this in the builder",
            description:
              "Use the prompt builder to adapt this case for your own offer, audience, and page structure."
          },
          {
            href: "/dna",
            label: "Open Brand DNA directions",
            description:
              "Move into company-style UI directions if you want the same brief translated into Apple-like, Figma-like, or Airbnb-like language."
          }
        ]}
        points={[
          `Use the original prompt when you need a first draft for ${entry.useCase.toLowerCase()} work.`,
          `Use the remix prompt when you want the same layout logic but a different brand tone or audience fit.`,
          `Check the output checklist before generating so the first pass emphasizes ${entry.outputFocus.slice(0, 2).join(" and ").toLowerCase()}.`
        ]}
        title={`${entry.title} as a reusable AI website prompt example`}
      />

      {stitchCaptures.length ? (
        <section className="content-section">
          <div className="section-heading">
            <div className="eyebrow">Stitch outputs</div>
            <h2>Real output captures connected to this case file</h2>
            <p>
              These screens are tied to the same direction family, so the archive
              page shows the prompt and the generated output side by side.
            </p>
          </div>
          <div className="archive-stitch-source-grid">
            {linkedSources.map(({ slug, example, owner, screen }) => {
              const builderHref = example
                ? `/builder?${owner ? `dna=${encodeURIComponent(owner.slug)}&` : ""}style=${encodeURIComponent(example.styleSlug)}&pageType=${encodeURIComponent(example.pageType)}&tone=${encodeURIComponent(example.tone)}&medium=${encodeURIComponent(example.medium)}&motionLevel=${encodeURIComponent(example.motionLevel)}&colorDirection=${encodeURIComponent(example.colorDirection)}`
                : "/builder";

              return (
                <article className="collection-card archive-stitch-source-card" key={slug}>
                  <div className="micro-row">
                    <span>{example?.useCase ?? screen?.runLabel ?? "Stitch source"}</span>
                    <span>{example?.pageType ?? "output capture"}</span>
                  </div>
                  <h3>{example?.title ?? screen?.runLabel ?? slug}</h3>
                  <p>
                    {example?.summary ??
                      "This archive entry links directly to a Stitch output capture rather than a Brand DNA example page."}
                  </p>
                  <div className="card-actions">
                    {owner ? (
                      <Link className="ghost-button" href={`/dna/${owner.slug}`}>
                        Open Brand DNA
                      </Link>
                    ) : (
                      <span className="ghost-button static-chip">Archive linked output</span>
                    )}
                    <Link className="ghost-button" href={builderHref}>
                      Open in Builder
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="stitch-screen-grid archive-stitch-grid">
            {stitchCaptures.slice(0, 6).map((screen) => {
              const sourceExample = getStitchExampleBySlug(screen.sourceSlug);

              return (
                <article className="stitch-screen-card archive-stitch-card" key={`${screen.sourceSlug}-${screen.label}`}>
                  <PreviewSurface
                    image={screen.image}
                    label={screen.label}
                    meta={screen.runLabel}
                    objectPosition={screen.objectPosition}
                    size="card"
                    tone={entry.previewTone}
                  />
                  <div className="stitch-screen-copy">
                    <strong>{screen.label}</strong>
                    <p>{screen.note}</p>
                    <div className="stitch-screen-meta">
                      <span>{sourceExample?.title ?? screen.sourceSlug}</span>
                      <span>{screen.tool}</span>
                      <span>{screen.promptVersion}</span>
                      <span>{screen.generatedAt}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <ResultWall
        eyebrow="Result wall"
        title="Mock outputs from this prompt case"
        intro="Treat these as the intended family of first-pass results this prompt should generate."
        items={buildArchiveResultWall(entry)}
      />

      <section className="content-section">
        <div className="section-heading">
          <div className="eyebrow">Connected systems</div>
          <h2>The design directions supporting this case file</h2>
        </div>
        <div className="card-grid">
          {categories.map((category) => (
            <CategoryCard item={category} key={category.slug} showPrompt={false} />
          ))}
        </div>
        {collection ? (
          <div className="archive-collection-link">
            <div>
              <div className="eyebrow">Collection source</div>
              <p>{collection.title}</p>
            </div>
            <Link className="primary-button" href={`/collections/${collection.slug}`}>
              Open collection
            </Link>
          </div>
        ) : null}
      </section>

      {relatedEntries.length ? (
        <section className="content-section archive-preview-shell">
          <div className="section-heading">
            <div className="eyebrow">Related case files</div>
            <h2>More prompt examples nearby</h2>
          </div>
          <div className="archive-preview-grid">
            {relatedEntries.map((relatedEntry) => (
              <ArchiveEntryCard compact entry={relatedEntry} key={relatedEntry.slug} />
            ))}
          </div>
        </section>
      ) : null}

      <FaqSection
        eyebrow="Case file FAQ"
        items={faqItems}
        title={`Questions people ask about the ${entry.title} prompt`}
      />
    </>
  );
}
