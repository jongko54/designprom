import Link from "next/link";

import { CopyButton } from "@/components/ui/copy-button";
import { PreviewSurface } from "@/components/ui/preview-surface";
import { ToolGuide } from "@/data/tool-guides";

type ToolGuidePageProps = {
  guide: ToolGuide;
};

export function ToolGuidePage({ guide }: ToolGuidePageProps) {
  return (
    <>
      <section className="content-section tool-guide-shell">
        <div className="tool-guide-hero">
          <div className="tool-guide-copy">
            <div className="section-heading">
              <div className="eyebrow">Tool study</div>
              <h2>{guide.title}</h2>
              <p>{guide.summary}</p>
            </div>
            <div className="collection-card">
              <span className="builder-label">Why it matters here</span>
              <p>{guide.overview}</p>
            </div>
            <div className="card-actions">
              <a
                className="primary-button"
                href={guide.liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open live site
              </a>
              <Link className="ghost-button" href="/builder">
                Open prompt builder
              </Link>
            </div>
          </div>
          <div className="tool-guide-preview">
            <PreviewSurface
              image={guide.screenshot}
              label={guide.title}
              meta="Observed interface"
              size="board"
              tone="gradient"
            />
          </div>
        </div>
      </section>

      <section className="content-section tool-guide-shell">
        <div className="section-heading">
          <div className="eyebrow">Interface map</div>
          <h2>What the product actually does</h2>
          <p>
            These notes are written as a design-system readout so the tool can
            be translated into prompt language, not just described.
          </p>
        </div>
        <div className="card-grid compact tool-guide-grid">
          <article className="collection-card">
            <h3>Core features</h3>
            <ul className="tool-guide-list">
              {guide.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="collection-card">
            <h3>Workflow</h3>
            <ul className="tool-guide-list">
              {guide.workflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="collection-card">
            <h3>UI patterns</h3>
            <ul className="tool-guide-list">
              {guide.systemPatterns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="content-section tool-guide-shell">
        <div className="section-heading">
          <div className="eyebrow">Designprom fit</div>
          <h2>How this should translate into our prompt guide</h2>
          <p>
            These are the parts worth reusing inside a prompt-and-output
            library, rather than copying the interface literally.
          </p>
        </div>
        <div className="casefiles-grid tool-guide-fit-grid">
          {guide.designpromFit.map((item) => (
            <article className="collection-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section tool-guide-shell">
        <div className="section-heading">
          <div className="eyebrow">Prompt recipes</div>
          <h2>Prompt directions you can copy into the builder</h2>
          <p>
            Each recipe turns the observed tool behavior into a reusable prompt
            pattern for design exploration.
          </p>
        </div>
        <div className="card-grid tool-guide-recipe-grid">
          {guide.promptRecipes.map((recipe) => (
            <article className="collection-card tool-guide-recipe-card" key={recipe.title}>
              <h3>{recipe.title}</h3>
              <p>{recipe.note}</p>
              <div className="archive-entry-prompt">
                <span>Prompt</span>
                <p>{recipe.prompt}</p>
              </div>
              <div className="card-actions">
                <CopyButton value={recipe.prompt} />
                <Link
                  className="ghost-button"
                  href={`/builder?prompt=${encodeURIComponent(recipe.prompt)}`}
                >
                  Open in Builder
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section tool-guide-shell">
        <div className="section-heading">
          <div className="eyebrow">Sources</div>
          <h2>Where this analysis came from</h2>
          <p>Live product pages and linked official entry points.</p>
        </div>
        <div className="tool-guide-links">
          {guide.supportLinks.map((link) => (
            <a
              className="ghost-button tool-guide-link"
              href={link.href}
              key={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
