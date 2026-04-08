"use client";

import Link from "next/link";
import {
  CSSProperties,
  useState,
  type MouseEvent
} from "react";
import { siAirbnb, siApple, siFigma, siTiktok } from "simple-icons";

import { CopyButton } from "@/components/ui/copy-button";
import { PublishActions } from "@/components/ui/publish-actions";
import {
  PreviewTone,
  dnaStitchExamples,
  featuredDna,
  getCategoryHref
} from "@/data/site";
import { buildStitchExamplePublishAssets } from "@/lib/publish-assets";

const brandOrder = [
  "calm-precision-ui",
  "collaborative-canvas-system",
  "warm-global-hospitality",
  "enterprise-grid-system",
  "creator-velocity",
  "modular-research-surface"
] as const;

type BrandSlug = (typeof brandOrder)[number];

type BrandSceneState = {
  activeIndex: number;
  slug: BrandSlug;
  tiltX: number;
  tiltY: number;
};

function BrandSvgLogo({
  hex,
  path,
  title
}: {
  hex: string;
  path: string;
  title: string;
}) {
  return (
    <span className="brand-logo brand-logo-vector" aria-hidden="true">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path d={path} fill={`#${hex}`} />
      </svg>
    </span>
  );
}

function BrandGoogleLogo() {
  return (
    <span className="brand-logo brand-logo-google" aria-hidden="true">
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title>Google</title>
        <path
          d="M16 6c2.5 0 4.8.9 6.6 2.4l4.9-4.9C24.5 1.3 20.5 0 16 0 9.8 0 4.5 3.6 1.8 8.9l5.8 4.5C9 9 12.2 6 16 6Z"
          fill="#EA4335"
        />
        <path
          d="M31.5 16.4c0-1.1-.1-1.9-.3-2.8H16v5.4h8.7c-.5 2.5-2 4.2-4.2 5.5l5.3 4.1c3.1-2.8 5-6.9 5-12.2Z"
          fill="#4285F4"
        />
        <path
          d="M7.6 19.1c-.4-1.1-.7-2.3-.7-3.5 0-1.2.2-2.4.7-3.5L1.8 7.6C.7 9.8 0 12.6 0 15.6c0 3 .7 5.8 1.8 8l5.8-4.5Z"
          fill="#FBBC05"
        />
        <path
          d="M16 32c4.3 0 8-1.4 10.7-3.9l-5.3-4.1c-1.5 1-3.4 1.8-5.4 1.8-3.7 0-6.9-2.5-8.1-5.9l-5.8 4.5C4.5 28.4 9.8 32 16 32Z"
          fill="#34A853"
        />
      </svg>
    </span>
  );
}

function BrandLogo({ slug }: { slug: BrandSlug }) {
  if (slug === "calm-precision-ui") {
    return <BrandSvgLogo hex={siApple.hex} path={siApple.path} title={siApple.title} />;
  }

  if (slug === "collaborative-canvas-system") {
    return <BrandSvgLogo hex={siFigma.hex} path={siFigma.path} title={siFigma.title} />;
  }

  if (slug === "warm-global-hospitality") {
    return <BrandSvgLogo hex={siAirbnb.hex} path={siAirbnb.path} title={siAirbnb.title} />;
  }

  if (slug === "enterprise-grid-system") {
    return (
      <span className="brand-logo brand-logo-ibm" aria-hidden="true">
        IBM
      </span>
    );
  }

  if (slug === "modular-research-surface") {
    return <BrandGoogleLogo />;
  }

  return <BrandSvgLogo hex={siTiktok.hex} path={siTiktok.path} title={siTiktok.title} />;
}

function getBuilderHref(slug: BrandSlug, exampleIndex: number) {
  const category = featuredDna.find((entry) => entry.slug === slug) ?? featuredDna[0];
  const example = (dnaStitchExamples[slug] ?? [])[exampleIndex];

  if (!example) {
    return getCategoryHref(category);
  }

  return `/builder?dna=${encodeURIComponent(category.slug)}&style=${encodeURIComponent(
    example.styleSlug
  )}&pageType=${encodeURIComponent(example.pageType)}&tone=${encodeURIComponent(
    example.tone
  )}&medium=${encodeURIComponent(example.medium)}&motionLevel=${encodeURIComponent(
    example.motionLevel
  )}&colorDirection=${encodeURIComponent(example.colorDirection)}`;
}

function getStyleClass(tone: PreviewTone) {
  return `dna-tone-${tone}`;
}

function getStageSlot(index: number, activeIndex: number, length: number) {
  const relativeIndex = (index - activeIndex + length) % length;

  if (relativeIndex === 0) {
    return "slot-center";
  }

  if (relativeIndex === 1) {
    return "slot-right";
  }

  return "slot-left";
}

export function BrandDnaMotionHero() {
  const [scene, setScene] = useState<BrandSceneState>({
    slug: brandOrder[0],
    activeIndex: 0,
    tiltX: 0,
    tiltY: 0
  });

  const category = featuredDna.find((entry) => entry.slug === scene.slug) ?? featuredDna[0];
  const examples = dnaStitchExamples[scene.slug] ?? [];
  const activeExample = examples[scene.activeIndex] ?? examples[0];

  if (!activeExample) {
    return null;
  }

  const stageStyle = {
    "--dna-tilt-x": `${scene.tiltX}deg`,
    "--dna-tilt-y": `${scene.tiltY}deg`
  } as CSSProperties;
  const publishAssets = buildStitchExamplePublishAssets(activeExample);
  const categoryHref = getCategoryHref(category);

  function handleStageMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    setScene((current) => ({
      ...current,
      tiltX: (0.5 - py) * 8,
      tiltY: (px - 0.5) * 12
    }));
  }

  function resetStageTilt() {
    setScene((current) => ({ ...current, tiltX: 0, tiltY: 0 }));
  }

  return (
    <section className={`page-hero brand-dna-motion-hero ${getStyleClass(category.previewTone)}`}>
      <div className="brand-dna-hero-grid">
        <div className="brand-dna-logo-rail" aria-label="Brand DNA companies">
          {brandOrder.map((slug) => {
            const item = featuredDna.find((entry) => entry.slug === slug) ?? featuredDna[0];
            const isActive = scene.slug === slug;

            return (
              <button
                className={`brand-dna-logo-button ${isActive ? "active" : ""}`}
                key={slug}
                onClick={() =>
                  setScene((current) => ({
                    ...current,
                    activeIndex: 0,
                    slug
                  }))
                }
                onMouseEnter={() =>
                  setScene((current) => ({
                    ...current,
                    activeIndex: 0,
                    slug
                  }))
                }
                type="button"
              >
                <BrandLogo slug={slug} />
                <div className="brand-dna-logo-copy">
                  <strong>{item.referenceBrand ?? item.title}</strong>
                  <span>{item.facet}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="brand-dna-prompt-shell">
          <div className="brand-dna-prompt-meta">
            <span>{category.referenceBrand ?? category.title}</span>
            <span>{activeExample.pageType}</span>
          </div>
          <div className="brand-dna-prompt-copy">
            <p>{activeExample.stitchPrompt}</p>
          </div>
          <div className="brand-dna-prompt-notes">
            <article className="brand-dna-prompt-note">
              <span>Template hint</span>
              <strong>{category.templateExample ?? category.facet}</strong>
            </article>
            <article className="brand-dna-prompt-note">
              <span>Prompt language</span>
              <strong>{category.promptTip ?? activeExample.summary}</strong>
            </article>
            <article className="brand-dna-prompt-note">
              <span>Expected output</span>
              <strong>{activeExample.outputNotes[0] ?? activeExample.summary}</strong>
            </article>
          </div>
          <div className="card-actions">
            <CopyButton className="primary-button" value={activeExample.stitchPrompt} />
            <Link className="ghost-button" href={getBuilderHref(scene.slug, scene.activeIndex)}>
              Use in Builder
            </Link>
          </div>
          <PublishActions
            assets={publishAssets}
            className="publish-actions compact"
            shareText={`${activeExample.title} / ${activeExample.useCase}`}
            shareTitle={activeExample.title}
            shareUrl={categoryHref}
            zipName={activeExample.title}
          />
        </div>

        <div
          aria-label="Expected brand DNA output stage"
          className="brand-dna-stage-shell"
          onMouseLeave={resetStageTilt}
          onMouseMove={handleStageMove}
          style={stageStyle}
        >
          <div className="brand-dna-stage-world">
            <div className="brand-dna-stage-orbit orbit-a" />
            <div className="brand-dna-stage-orbit orbit-b" />
            <div className="brand-dna-stage-plane plane-a" />
            <div className="brand-dna-stage-plane plane-b" />
            <div className="brand-dna-stage-wordmark">{category.referenceBrand}</div>

            {examples.slice(0, 3).map((example, index) => {
              const isActive = index === scene.activeIndex;
              const slotClass = getStageSlot(index, scene.activeIndex, examples.length);

              return (
                <button
                  className={`brand-dna-stage-screen ${slotClass} ${
                    isActive ? "is-active" : ""
                  }`}
                  key={example.slug}
                  onClick={() =>
                    setScene((current) => ({
                      ...current,
                      activeIndex: index
                    }))
                  }
                  type="button"
                >
                  <div className="brand-dna-screen-top">
                    <span>{example.pageType}</span>
                    <span>{example.motionLevel}</span>
                  </div>
                  <div className="brand-dna-screen-canvas">
                    {example.captureImage ? (
                      <div className="brand-dna-screen-image-shell">
                        <img
                          alt={example.captureImage.alt}
                          className="brand-dna-screen-image"
                          height={example.captureImage.height}
                          loading="lazy"
                          src={example.captureImage.src}
                          width={example.captureImage.width}
                        />
                      </div>
                    ) : null}
                    <div className="brand-dna-screen-kicker">{example.useCase}</div>
                    <div className="brand-dna-screen-title">{example.title}</div>
                    {!example.captureImage ? (
                      <>
                        <div className="brand-dna-screen-lines">
                          <span className="long" />
                          <span className="short" />
                        </div>
                        <div className="brand-dna-screen-modules">
                          <span className="wide" />
                          <span />
                          <span />
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="brand-dna-screen-bottom">
                    <span>{example.colorDirection}</span>
                    <span>{example.tone}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
