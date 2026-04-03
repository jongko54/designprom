import Link from "next/link";

import { CategoryCard } from "@/components/cards/category-card";
import { ResultWall } from "@/components/sections/result-wall";
import { CopyButton } from "@/components/ui/copy-button";
import { GeneratedPreviewMock } from "@/components/ui/generated-preview-mock";
import { PreviewSurface } from "@/components/ui/preview-surface";
import { getStitchExports } from "@/data/stitch-exports";
import {
  CategoryCard as CategoryCardType,
  buildCategoryResultWall,
  buildPromptVariations,
  getCategoryBySlug,
  getCategoryStitchExamples,
  getRelatedCategories
} from "@/data/site";

type CategoryDetailProps = {
  category: CategoryCardType;
};

export function CategoryDetail({ category }: CategoryDetailProps) {
  const variations = buildPromptVariations(category);
  const related = getRelatedCategories(category);
  const stitchExamples = getCategoryStitchExamples(category);
  const primaryStitchExample = stitchExamples[0];
  const wallItems = buildCategoryResultWall(category);
  const backHref = category.kind === "dna" ? "/dna" : "/styles";
  const backLabel = category.kind === "dna" ? "Back to DNA" : "Back to styles";
  const outputChecklist = [
    category.visualTraits.layout,
    category.visualTraits.typography,
    category.visualTraits.color
  ];

  function buildExpectedScreens(pageType: string, notes: string[]) {
    const normalized = pageType.toLowerCase();

    if (normalized.includes("marketplace") || normalized.includes("category")) {
      return ["Hero browse", "Listing system", "Detail handoff"].map(
        (label, index) => ({
          label,
          note: notes[index] ?? notes[notes.length - 1] ?? ""
        })
      );
    }

    if (
      normalized.includes("workspace") ||
      normalized.includes("product tour") ||
      normalized.includes("architecture") ||
      normalized.includes("docs")
    ) {
      return ["Hero frame", "Product system", "Flow section"].map(
        (label, index) => ({
          label,
          note: notes[index] ?? notes[notes.length - 1] ?? ""
        })
      );
    }

    if (
      normalized.includes("campaign") ||
      normalized.includes("challenge") ||
      normalized.includes("commerce")
    ) {
      return ["Hook screen", "Momentum section", "Action close"].map(
        (label, index) => ({
          label,
          note: notes[index] ?? notes[notes.length - 1] ?? ""
        })
      );
    }

    return ["Hero screen", "Feature section", "CTA close"].map((label, index) => ({
      label,
      note: notes[index] ?? notes[notes.length - 1] ?? ""
    }));
  }

  return (
    <>
      <section className="detail-hero archive-detail-hero">
        <Link className="tertiary-link inline-button" href={backHref}>
          {backLabel}
        </Link>
        <div className="detail-grid archive-detail-grid">
          <div className="detail-main">
            <div className="micro-meta">
              <span>{category.kind}</span>
              <span>{category.mood}</span>
            </div>
            <div className="eyebrow archive-detail-eyebrow">
              {category.kind === "dna" ? "Brand DNA" : "Visual style"}
            </div>
            <h1>{category.title}</h1>
            <p className="detail-summary">{category.summary}</p>
            <div className="signal-row">
              <span>{category.facet}</span>
              <span>{category.medium}</span>
              {category.useCases.map((useCase) => (
                <span key={useCase}>{useCase}</span>
              ))}
            </div>
            {category.referenceBrand && category.templateExample && category.promptTip ? (
              <article className="detail-dossier-card detail-brand-card">
                <div className="micro-row">
                  <span>Brand reference</span>
                  <span>{category.referenceBrand}</span>
                </div>
                <div className="brand-dna-note">
                  <span>{category.referenceBrand} template example</span>
                  <strong>{category.templateExample}</strong>
                  <p>{category.promptTip}</p>
                </div>
              </article>
            ) : null}
            <div className="detail-dossier-grid">
              <article className="detail-dossier-card">
                <div className="micro-row">
                  <span>Stitch prompt</span>
                  <span>{category.facet}</span>
                </div>
                <div className="archive-prompt">
                  <span>Use this prompt</span>
                  <p>{category.prompt}</p>
                </div>
                <div className="card-actions">
                  <CopyButton
                    className="primary-button button-reset"
                    copiedLabel="Prompt copied"
                    value={category.prompt}
                  />
                  <Link className="ghost-button" href="/builder">
                    Remix in builder
                  </Link>
                </div>
              </article>
              <article className="detail-dossier-card detail-dossier-note">
                <div className="micro-row">
                  <span>Expected output</span>
                  <span>{category.medium}</span>
                </div>
                <ul className="bullet-list detail-bullet-list">
                  {outputChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
          <article className="detail-preview-panel">
            <div className="micro-row">
              <span>{primaryStitchExample?.captureImage ? "Stitch output board" : "Mock output board"}</span>
              <span>{primaryStitchExample?.pageType ?? category.mood}</span>
            </div>
            {primaryStitchExample?.captureImage ? (
              <PreviewSurface
                image={primaryStitchExample.captureImage}
                label={primaryStitchExample.title}
                meta={primaryStitchExample.captureMeta ?? primaryStitchExample.pageType}
                size="board"
                tone={category.previewTone}
              />
            ) : (
              <GeneratedPreviewMock
                label={category.title.split(" ")[0]}
                meta={category.facet}
                size="board"
                tone={category.previewTone}
              />
            )}
            <div className="detail-preview-notes">
              <div>
                <span>Layout</span>
                <p>{category.visualTraits.layout}</p>
              </div>
              <div>
                <span>Type</span>
                <p>{category.visualTraits.typography}</p>
              </div>
              <div>
                <span>Motion</span>
                <p>{category.visualTraits.motion}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {stitchExamples.length ? (
        <section className="content-section">
          <div className="section-heading">
            <div className="eyebrow">Stitch example pages</div>
            <h2>Example pages this brand DNA can generate in Stitch</h2>
            <p>
              These are practical page directions for the same company-inspired
              system. Open one in the builder or copy the prompt directly into
              Stitch.
            </p>
          </div>
          <div className="stitch-example-grid">
            {stitchExamples.map((example) => {
              const exampleStyle = getCategoryBySlug("style", example.styleSlug);
              const capturedScreens = getStitchExports(example.slug);
              const expectedScreens = buildExpectedScreens(
                example.pageType,
                example.outputNotes
              );
              const builderHref = `/builder?dna=${encodeURIComponent(category.slug)}&style=${encodeURIComponent(example.styleSlug)}&pageType=${encodeURIComponent(example.pageType)}&tone=${encodeURIComponent(example.tone)}&medium=${encodeURIComponent(example.medium)}&motionLevel=${encodeURIComponent(example.motionLevel)}&colorDirection=${encodeURIComponent(example.colorDirection)}`;

              return (
                <article className="library-card stitch-example-card" key={example.slug}>
                  <div className="card-topline">
                    <span>{example.useCase}</span>
                    <span>{category.referenceBrand ?? category.title}</span>
                  </div>
                  <PreviewSurface
                    image={example.captureImage}
                    label={example.pageType}
                    meta={example.captureMeta ?? `${category.facet} / ${exampleStyle?.facet ?? category.facet}`}
                    size="card"
                    tone={exampleStyle?.previewTone ?? category.previewTone}
                  />
                  <div className="card-heading">
                    <h3>{example.title}</h3>
                    <p>{example.summary}</p>
                  </div>
                  <div className="prompt-panel">
                    <span>Stitch prompt</span>
                    <p>{example.stitchPrompt}</p>
                  </div>
                  <div className="stitch-screen-shell">
                    <span className="stitch-screen-label">
                      {capturedScreens.length
                        ? "Stitch output captures"
                        : "Expected Stitch screens"}
                    </span>
                    <div className="stitch-screen-grid">
                      {capturedScreens.length
                        ? capturedScreens.map((screen) => (
                            <div className="stitch-screen-card" key={screen.label}>
                              <PreviewSurface
                                image={screen.image}
                                label={screen.label}
                                meta={screen.runLabel}
                                objectPosition={screen.objectPosition}
                                size="card"
                                tone={exampleStyle?.previewTone ?? category.previewTone}
                              />
                              <div className="stitch-screen-copy">
                                <strong>{screen.label}</strong>
                                <p>{screen.note}</p>
                                <div className="stitch-screen-meta">
                                  <span>{screen.tool}</span>
                                  <span>{screen.promptVersion}</span>
                                  <span>{screen.generatedAt}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        : expectedScreens.map((screen) => (
                            <div className="stitch-screen-card" key={screen.label}>
                              <GeneratedPreviewMock
                                label={screen.label}
                                meta={example.pageType}
                                size="card"
                                tone={exampleStyle?.previewTone ?? category.previewTone}
                              />
                              <div className="stitch-screen-copy">
                                <strong>{screen.label}</strong>
                                <p>{screen.note}</p>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                  <ul className="bullet-list stitch-output-list">
                    {example.outputNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                  <div className="card-actions">
                    <CopyButton
                      className="primary-button button-reset"
                      copiedLabel="Prompt copied"
                      value={example.stitchPrompt}
                    />
                    <Link className="ghost-button" href={builderHref}>
                      Use in builder
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="content-section">
        <div className="section-heading">
          <div className="eyebrow">Visual trait index</div>
          <h2>Make the result legible before anyone generates it</h2>
          <p>
            Each direction is translated into concrete layout, type, color, and
            pacing notes so the prompt has a visible design consequence.
          </p>
        </div>
        <div className="insight-grid detail-trait-grid">
          <article className="collection-card">
            <h3>Layout</h3>
            <p>{category.visualTraits.layout}</p>
          </article>
          <article className="collection-card">
            <h3>Typography</h3>
            <p>{category.visualTraits.typography}</p>
          </article>
          <article className="collection-card">
            <h3>Color</h3>
            <p>{category.visualTraits.color}</p>
          </article>
          <article className="collection-card">
            <h3>Motion</h3>
            <p>{category.visualTraits.motion}</p>
          </article>
          <article className="collection-card">
            <h3>Imagery</h3>
            <p>{category.visualTraits.imagery}</p>
          </article>
          <article className="collection-card">
            <h3>Density</h3>
            <p>{category.visualTraits.density}</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div className="eyebrow">Prompt guardrails</div>
          <h2>What to push and what to keep out of the frame</h2>
        </div>
        <div className="checklist-grid">
          <article className="collection-card">
            <h3>Do</h3>
            <ul className="bullet-list">
              {category.doList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="collection-card">
            <h3>Avoid</h3>
            <ul className="bullet-list">
              {category.avoidList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div className="eyebrow">Prompt remixes</div>
          <h2>Variation prompts that keep the same design DNA</h2>
          <p>
            These keep the same underlying direction but change how aggressively
            the page scans, moves, or compresses for mobile.
          </p>
        </div>
        <div className="variation-grid">
          {variations.map((variation) => (
            <article className="library-card variation-card" key={variation.slug}>
              <div className="card-topline">
                <span>{variation.label}</span>
                <span>{category.title}</span>
              </div>
              <GeneratedPreviewMock
                label={variation.label.split(" ")[0]}
                meta={category.medium}
                size="card"
                tone={category.previewTone}
              />
              <div className="card-heading">
                <h3>{variation.label}</h3>
                <p>{variation.note}</p>
              </div>
              <div className="prompt-panel">
                <span>Stitch prompt</span>
                <p>{variation.prompt}</p>
              </div>
              <div className="card-actions">
                <CopyButton
                  className="primary-button button-reset"
                  copiedLabel="Prompt copied"
                  value={variation.prompt}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <ResultWall
        eyebrow="Generated outcomes"
        intro="Use these as visual anchors for how the same prompt family can express itself across hero, type, and flow."
        items={wallItems}
        title="Mock outputs for this direction"
      />

      {related.length ? (
        <section className="content-section">
          <div className="section-heading">
            <div className="eyebrow">Related directions</div>
            <h2>Nearby categories worth exploring next</h2>
          </div>
          <div className="card-grid">
            {related.map((item) => (
              <CategoryCard item={item} key={item.slug} showPrompt={false} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
