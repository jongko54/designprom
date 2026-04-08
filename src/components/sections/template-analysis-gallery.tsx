import Link from "next/link";

import { ArchiveEntryCard } from "@/components/cards/archive-entry-card";
import { CopyButton } from "@/components/ui/copy-button";
import { PublishActions } from "@/components/ui/publish-actions";
import { PreviewSurface } from "@/components/ui/preview-surface";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import {
  brandDnaGalleryExamples,
  featuredDna,
  getArchiveBySlug,
  getCategoryHref,
  promptArchive,
  styleCategories
} from "@/data/site";
import {
  buildArchivePublishAssets,
  buildBrandGalleryPublishAssets,
  buildStitchExamplePublishAssets
} from "@/lib/publish-assets";

type ResearchCase = {
  slug: string;
  market: string;
  referenceName: string;
  referenceUrl: string;
  focus: string;
  cues: string[];
  structure: string;
  bestFor: string;
};

const kBeautyResearchCases: ResearchCase[] = [
  {
    slug: "sokoglam-editorial-commerce-case",
    market: "United States",
    referenceName: "Soko Glam",
    referenceUrl: "https://sokoglam.com/",
    focus: "Editorial curation, expert trust, and routine education before conversion.",
    cues: ["Editorial curation", "Routine learning", "Review-led proof"],
    structure: "Story-led hero, routine education band, shoppable expert picks, review proof.",
    bestFor: "Premium skincare stores that need guidance-first conversion."
  },
  {
    slug: "goka-social-commerce-case",
    market: "Latin America",
    referenceName: "Goka México",
    referenceUrl: "https://goka.mx/",
    focus: "Spanish-first commerce with WhatsApp trust and bright mobile-native campaign pacing.",
    cues: ["WhatsApp support", "Spanish-first copy", "Campaign bundles"],
    structure: "Mobile-first hero, campaign bundles, social proof tiles, support-heavy close.",
    bestFor: "Bright social-commerce homepages with strong community reassurance."
  },
  {
    slug: "miin-omnichannel-routine-case",
    market: "Europe",
    referenceName: "MiiN Cosmetics",
    referenceUrl: "https://miin-cosmetics.com/",
    focus: "Curated omnichannel discovery with compliance trust and structured education.",
    cues: ["EU trust blocks", "Glossary access", "Routine shelves"],
    structure: "Curated discovery hero, routine navigation, glossary or workshop access, retail shelves.",
    bestFor: "Omnichannel beauty stores that need education and credibility together."
  },
  {
    slug: "innisfree-ingredient-merchandising-case",
    market: "Southeast Asia",
    referenceName: "Innisfree Singapore",
    referenceUrl: "https://sg.innisfree.com/",
    focus: "Ingredient-led navigation and dense merchandising with local shipping and membership cues.",
    cues: ["Ingredient navigation", "Offer density", "Localized shipping"],
    structure: "Promo-led hero, ingredient category rails, bundle shelves, membership and shipping bar.",
    bestFor: "Dense merchandising homepages that still need clean product grouping."
  }
];

const ecommerceResearchCases: ResearchCase[] = [
  {
    slug: "aesop-editorial-commerce-case",
    market: "Premium Commerce",
    referenceName: "Aesop",
    referenceUrl: "https://www.aesop.com/",
    focus: "Literary premium commerce where product, atmosphere, and navigation stay restrained.",
    cues: ["Editorial hero", "Muted neutrals", "Cultural navigation"],
    structure: "Editorial hero, muted product shelves, quiet cultural navigation, calm footer close.",
    bestFor: "Luxury commerce brands that want restraint instead of sales noise."
  },
  {
    slug: "allbirds-friendly-dtc-case",
    market: "Direct to Consumer",
    referenceName: "Allbirds",
    referenceUrl: "https://www.allbirds.com/",
    focus: "Friendly DTC browsing with split audience paths, comfort cues, and easy merchandising.",
    cues: ["Audience split", "Collection shelves", "Benefit copy"],
    structure: "Friendly hero split, collection modules, best-seller rails, comfort and sustainability proof.",
    bestFor: "Easy-to-browse DTC homepages with broad audience entry points."
  },
  {
    slug: "gymshark-launch-commerce-case",
    market: "Launch Commerce",
    referenceName: "Gymshark",
    referenceUrl: "https://www.gymshark.com/",
    focus: "Campaign-led product drops with repeated shop cues and fast-scanning launch urgency.",
    cues: ["Drop energy", "New-in grid", "Repeated shop CTA"],
    structure: "Launch hero, new-in wall, strong CTA repetition, fast product metadata rhythm.",
    bestFor: "Drop-based ecommerce homepages that need event energy and direct conversion."
  }
];

const portfolioCategoryOrder = [
  "Graphic Design",
  "Photography",
  "Architecture",
  "Fashion",
  "Art Direction",
  "Typography",
  "Studio",
  "Creative Tech",
  "Creator"
];

const portfolioTemplateEntries = [...promptArchive]
  .filter((entry) => portfolioCategoryOrder.includes(entry.portfolioCategory))
  .sort(
    (left, right) =>
      portfolioCategoryOrder.indexOf(left.portfolioCategory) -
      portfolioCategoryOrder.indexOf(right.portfolioCategory)
  );

function ResearchStudyCard({ study }: { study: ResearchCase }) {
  const entry = getArchiveBySlug(study.slug);

  if (!entry) {
    return null;
  }

  const capture = getArchiveStitchExports(entry)[0];
  const builderHref = `/builder?prompt=${encodeURIComponent(entry.prompt)}`;
  const domainLabel = new URL(study.referenceUrl).hostname.replace(/^www\./, "");
  const promptLead = entry.prompt.split(". ")[0]?.trim() ?? entry.prompt;
  const promptTokens = Array.from(
    new Set([
      entry.useCase,
      ...entry.outputFocus.map((cue) => cue.split(" ").slice(0, 2).join(" "))
    ])
  ).slice(0, 5);
  const publishAssets = buildArchivePublishAssets(entry);

  return (
    <article className="analysis-study-card">
      <div className="micro-row">
        <span>{study.market}</span>
        <span>{study.referenceName}</span>
      </div>
      <div className="analysis-study-grid">
        <section className="analysis-step-card">
          <span className="analysis-step-label">01 Reference site</span>
          <div className="analysis-reference-header">
            <h3>{study.referenceName}</h3>
            <span>{domainLabel}</span>
          </div>
          <p>{study.focus}</p>
          <div className="analysis-reference-grid">
            <div className="analysis-reference-metric">
              <span>Market</span>
              <strong>{study.market}</strong>
            </div>
            <div className="analysis-reference-metric">
              <span>Best for</span>
              <strong>{study.bestFor}</strong>
            </div>
          </div>
          <div className="analysis-reference-structure">
            <span>Observed structure</span>
            <p>{study.structure}</p>
          </div>
          <div className="analysis-step-tags">
            {study.cues.map((cue) => (
              <span key={cue}>{cue}</span>
            ))}
          </div>
          <a
            className="ghost-button analysis-link"
            href={study.referenceUrl}
            rel="noreferrer"
            target="_blank"
          >
            Open reference site
          </a>
        </section>

        <section className="analysis-step-card">
          <span className="analysis-step-label">02 Prompt translation</span>
          <div className="analysis-reference-header">
            <h3>{entry.title}</h3>
            <span>{entry.useCase}</span>
          </div>
          <div className="analysis-reference-structure analysis-prompt-lead">
            <span>Lead prompt</span>
            <p>{promptLead}.</p>
          </div>
          <div className="analysis-reference-grid">
            <div className="analysis-reference-metric">
              <span>Prompt mode</span>
              <strong>{entry.previewTone}</strong>
            </div>
            <div className="analysis-reference-metric">
              <span>Linked capture</span>
              <strong>{capture?.runLabel ?? entry.title}</strong>
            </div>
          </div>
          <div className="analysis-step-tags">
            {promptTokens.map((cue) => (
              <span key={cue}>{cue}</span>
            ))}
          </div>
          <div className="analysis-reference-structure">
            <span>Output goals</span>
            <p>{entry.outputFocus.join(" / ")}</p>
          </div>
          <div className="card-actions">
            <CopyButton
              className="ghost-button button-reset"
              copiedLabel="Prompt copied"
              value={entry.prompt}
            />
            <Link className="ghost-button" href={builderHref}>
              Open in Builder
            </Link>
          </div>
        </section>

        <section className="analysis-step-card">
          <span className="analysis-step-label">03 Stitch result</span>
          <PreviewSurface
            image={capture?.image ?? entry.coverImage}
            label={entry.useCase}
            meta={capture?.runLabel ?? entry.title}
            objectPosition={capture?.objectPosition}
            size="card"
            tone={entry.previewTone}
          />
          <p>{entry.curatorNote}</p>
          <div className="card-actions">
            <Link className="primary-button" href={`/archive/${entry.slug}`}>
              Open case file
            </Link>
          </div>
          <PublishActions
            assets={publishAssets}
            className="publish-actions compact"
            shareText={`${entry.title} / ${entry.useCase}`}
            shareTitle={entry.title}
            shareUrl={`/archive/${entry.slug}`}
            zipName={entry.title}
          />
        </section>
      </div>
    </article>
  );
}

function CompanySystemCard({
  example
}: {
  example: (typeof brandDnaGalleryExamples)[number];
}) {
  const presetDna =
    featuredDna.find((entry) => entry.slug === example.dnaSlug) ?? featuredDna[0];
  const presetStyle =
    styleCategories.find((entry) => entry.slug === example.styleSlug) ??
    styleCategories[0];
  const builderHref = `/builder?dna=${encodeURIComponent(
    example.dnaSlug
  )}&style=${encodeURIComponent(example.styleSlug)}&pageType=${encodeURIComponent(
    example.pageType
  )}&tone=${encodeURIComponent(example.tone)}&medium=${encodeURIComponent(
    example.medium
  )}&motionLevel=${encodeURIComponent(
    example.motionLevel
  )}&colorDirection=${encodeURIComponent(example.colorDirection)}`;
  const publishAssets = buildBrandGalleryPublishAssets(example);
  const categoryHref = getCategoryHref(presetDna);

  return (
    <article className="builder-preset-card template-analysis-card" key={example.slug}>
      <div className="micro-row">
        <span>{example.pageType}</span>
        <span>{example.brandName}</span>
      </div>
      <h3>{example.title}</h3>
      <p>{example.summary}</p>
      <PreviewSurface
        image={example.captureImage}
        label={example.pageType}
        meta={example.captureMeta ?? `${example.brandName} / ${presetStyle.facet}`}
        size="card"
        tone={presetStyle.previewTone}
      />
      <div className="brand-example-strip">
        <span>
          {example.brandName} / {presetStyle.title}
        </span>
        <strong>{example.templateHint}</strong>
      </div>
      <div className="template-analysis-callout">
        <span>Prompt cue</span>
        <p>{example.stitchPrompt}</p>
      </div>
      <div className="card-actions">
        <Link className="primary-button" href={getCategoryHref(presetDna)}>
          Open Brand DNA
        </Link>
        <Link className="ghost-button" href={builderHref}>
          Use in Builder
        </Link>
      </div>
      <PublishActions
        assets={publishAssets}
        className="publish-actions compact"
        shareText={`${example.title} / ${example.pageType}`}
        shareTitle={example.title}
        shareUrl={categoryHref}
        zipName={example.title}
      />
    </article>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

export function TemplateAnalysisGallery() {
  return (
    <>
      <section className="content-section template-analysis-shell analysis-study-shell">
        <SectionHeader
          eyebrow="K-Beauty market studies"
          title="Reference site, translated prompt, and generated homepage in one view"
          body="These studies turn real regional K-beauty storefront patterns into prompt language, then show the resulting Stitch homepage that came back from that brief."
        />
        <div className="analysis-study-stack">
          {kBeautyResearchCases.map((study) => (
            <ResearchStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="content-section template-analysis-shell analysis-study-shell">
        <SectionHeader
          eyebrow="Ecommerce homepage studies"
          title="Three commerce archetypes translated into prompt-ready homepage systems"
          body="These examples focus on premium editorial commerce, friendly DTC browsing, and high-energy launch commerce so the prompt differences are easy to compare."
        />
        <div className="analysis-study-stack">
          {ecommerceResearchCases.map((study) => (
            <ResearchStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="content-section builder-presets-shell template-analysis-shell">
        <SectionHeader
          eyebrow="Company systems"
          title="Study how company-style prompts become concrete page structures"
          body="These examples focus on brand language translation: what to name in the prompt, what kind of page should come back, and which visual signals prove the direction is working."
        />
        <div className="builder-presets-grid">
          {brandDnaGalleryExamples.map((example) => (
            <CompanySystemCard example={example} key={example.slug} />
          ))}
        </div>
      </section>

      <section className="content-section archive-preview-shell template-analysis-shell">
        <SectionHeader
          eyebrow="Portfolio templates"
          title="Analyze Cargo-like portfolio structures by category"
          body="These examples focus on portfolio categories first: poster index, photography journal, architecture monograph, fashion lookbook, art direction board, type archive, studio directory, and related prompt structures."
        />
        <div className="archive-preview-grid archive-catalog-grid">
          {portfolioTemplateEntries.map((entry) => (
            <ArchiveEntryCard compact entry={entry} key={entry.slug} />
          ))}
        </div>
        <div className="card-actions">
          <Link className="primary-button" href="/archive">
            Open full archive
          </Link>
        </div>
      </section>
    </>
  );
}
