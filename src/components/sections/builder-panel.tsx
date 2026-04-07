"use client";

import { type ChangeEvent, useEffect, useRef, startTransition, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { CopyButton } from "@/components/ui/copy-button";
import { PublishActions } from "@/components/ui/publish-actions";
import { PreviewSurface } from "@/components/ui/preview-surface";
import { SemanticPreviewBoard } from "@/components/ui/semantic-preview-board";
import {
  builderOptions,
  builderPresets,
  featuredDna,
  getArchiveBySlug,
  styleCategories
} from "@/data/site";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import { extractPaletteFromFile } from "@/lib/palette-extractor";
import { resolveBuilderSemanticPreview } from "@/lib/prompt-semantic-preview";
import { saveRoughDraft } from "@/lib/rough-draft-archive";

type HordeDraftState = {
  done: boolean;
  error?: string;
  imageUrl?: string | null;
  isPossible?: boolean;
  jobId?: string;
  loading: boolean;
  model?: string | null;
  queuePosition?: number;
  seed?: string | null;
  waitTime?: number;
};

type BuilderPanelProps = {
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
};

type PaletteState = {
  applied: boolean;
  colors: string[];
  description: string;
  error?: string;
  imageUrl?: string;
  loading: boolean;
  name?: string;
};

export function BuilderPanel({
  externalPrompt = "",
  onClearExternalPrompt
}: BuilderPanelProps) {
  const searchParams = useSearchParams();
  const defaultPreset = builderPresets[0];
  const [pageType, setPageType] = useState(defaultPreset.pageType);
  const [tone, setTone] = useState(defaultPreset.tone);
  const [medium, setMedium] = useState(defaultPreset.medium);
  const [motionLevel, setMotionLevel] = useState(defaultPreset.motionLevel);
  const [colorDirection, setColorDirection] = useState(defaultPreset.colorDirection);
  const [dnaSlug, setDnaSlug] = useState(defaultPreset.dnaSlug);
  const [styleSlug, setStyleSlug] = useState(defaultPreset.styleSlug);
  const [hordeModel, setHordeModel] = useState(builderOptions.hordeModels[0]);
  const [hordeSize, setHordeSize] = useState(builderOptions.hordeSizes[0]);
  const [paletteState, setPaletteState] = useState<PaletteState>({
    applied: false,
    colors: [],
    description: "",
    loading: false
  });
  const [hordeDraft, setHordeDraft] = useState<HordeDraftState>({
    done: false,
    loading: false
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const selectedDna =
    featuredDna.find((entry) => entry.slug === dnaSlug) ?? featuredDna[0];
  const selectedStyle =
    styleCategories.find((entry) => entry.slug === styleSlug) ??
    styleCategories[0];
  const isSeededFromLink =
    Boolean(searchParams.get("dna")) ||
    Boolean(searchParams.get("style")) ||
    Boolean(searchParams.get("pageType"));
  const builderSourceLabel =
    isSeededFromLink ? "Brand DNA example" : defaultPreset.title;
  const dnaDirection = selectedDna.referenceBrand
    ? `${selectedDna.referenceBrand}-like`
    : selectedDna.title.toLowerCase();
  const paletteClause =
    paletteState.applied && paletteState.description
      ? ` Use a reference-derived palette with ${paletteState.description}.`
      : "";
  const composedPrompt = `Create a ${tone.toLowerCase()} ${pageType.toLowerCase()} page with ${dnaDirection} direction, ${selectedStyle.title.toLowerCase()} styling, ${colorDirection.toLowerCase()} color, and ${motionLevel.toLowerCase()} motion. Keep the hierarchy clean, the sections measured, and the CTA obvious.`;
  const customPrompt = externalPrompt.trim();
  const generatedPrompt = `${customPrompt || composedPrompt}${paletteClause}`.trim();
  const displayedColorDirection = paletteState.applied ? "Reference palette" : colorDirection;
  const semanticPreview = resolveBuilderSemanticPreview({
    colorDirection: displayedColorDirection,
    dna: selectedDna,
    medium,
    motionLevel,
    pageType,
    prompt: generatedPrompt,
    style: selectedStyle,
    tone
  });
  const matchedArchive = semanticPreview.archiveMatchSlug
    ? getArchiveBySlug(semanticPreview.archiveMatchSlug)
    : undefined;
  const matchedArchiveImage = matchedArchive
    ? getArchiveStitchExports(matchedArchive)[0]?.image ?? matchedArchive.coverImage
    : undefined;

  useEffect(() => {
    const dna = searchParams.get("dna");
    const style = searchParams.get("style");
    const nextPageType = searchParams.get("pageType");
    const nextTone = searchParams.get("tone");
    const nextMedium = searchParams.get("medium");
    const nextMotionLevel = searchParams.get("motionLevel");
    const nextColorDirection = searchParams.get("colorDirection");

    if (
      !dna &&
      !style &&
      !nextPageType &&
      !nextTone &&
      !nextMedium &&
      !nextMotionLevel &&
      !nextColorDirection
    ) {
      return;
    }

    startTransition(() => {
      if (dna && featuredDna.some((entry) => entry.slug === dna)) {
        setDnaSlug(dna);
      }

      if (style && styleCategories.some((entry) => entry.slug === style)) {
        setStyleSlug(style);
      }

      if (nextPageType) {
        setPageType(nextPageType);
      }

      if (nextTone) {
        setTone(nextTone);
      }

      if (nextMedium) {
        setMedium(nextMedium);
      }

      if (nextMotionLevel) {
        setMotionLevel(nextMotionLevel);
      }

      if (nextColorDirection) {
        setColorDirection(nextColorDirection);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    setHordeDraft({
      done: false,
      loading: false
    });
  }, [generatedPrompt]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hordeDraft.jobId || hordeDraft.done || hordeDraft.error) {
      return;
    }

    const intervalId = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/horde/generate/${hordeDraft.jobId}`, {
          cache: "no-store"
        });
        const payload = (await response.json()) as {
          done?: boolean;
          error?: string;
          faulted?: boolean;
          imageUrl?: string | null;
          isPossible?: boolean;
          model?: string | null;
          queuePosition?: number;
          seed?: string | null;
          waitTime?: number;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Failed to poll AI Horde status.");
        }

        if (payload.done) {
          setHordeDraft((current) => ({
            ...current,
            done: true,
            error: payload.faulted ? "AI Horde could not complete this rough draft." : undefined,
            imageUrl: payload.imageUrl,
            isPossible: payload.isPossible,
            loading: false,
            model: payload.model,
            queuePosition: payload.queuePosition,
            seed: payload.seed,
            waitTime: payload.waitTime
          }));

          window.clearInterval(intervalId);
          return;
        }

        setHordeDraft((current) => ({
          ...current,
          imageUrl: payload.imageUrl,
          isPossible: payload.isPossible,
          loading: true,
          model: payload.model,
          queuePosition: payload.queuePosition,
          seed: payload.seed,
          waitTime: payload.waitTime
        }));
      } catch (error) {
        window.clearInterval(intervalId);

        setHordeDraft((current) => ({
          ...current,
          error:
            error instanceof Error
              ? error.message
              : "Failed to poll AI Horde status.",
          loading: false
        }));
      }
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [hordeDraft.done, hordeDraft.error, hordeDraft.jobId]);

  async function handleGenerateRoughDraft() {
    setHordeDraft({
      done: false,
      loading: true
    });

    try {
      const [width, height] = hordeSize.split("x").map((value) => Number(value));
      const response = await fetch("/api/horde/generate", {
        body: JSON.stringify({
          height,
          model: hordeModel,
          prompt: generatedPrompt,
          width
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });
      const payload = (await response.json()) as {
        error?: string;
        id?: string;
      };

      if (!response.ok || !payload.id) {
        throw new Error(payload.error ?? "Failed to request an AI Horde rough draft.");
      }

      setHordeDraft({
        done: false,
        jobId: payload.id,
        loading: true
      });
    } catch (error) {
      setHordeDraft({
        done: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to request an AI Horde rough draft.",
        loading: false
      });
    }
  }

  function handleSaveRoughDraft() {
    if (!hordeDraft.imageUrl) {
      return;
    }

    const [width, height] = hordeSize.split("x").map((value) => Number(value));

    saveRoughDraft({
      colorDirection,
      createdAt: new Date().toISOString(),
      dnaLabel: selectedDna.referenceBrand ?? selectedDna.title,
      id: `${Date.now()}-${selectedDna.slug}-${selectedStyle.slug}`,
      imageHeight: height,
      imageUrl: hordeDraft.imageUrl,
      imageWidth: width,
      medium,
      model: hordeDraft.model ?? hordeModel,
      motionLevel,
      pageType,
      prompt: generatedPrompt,
      seed: hordeDraft.seed,
      styleLabel: selectedStyle.title,
      title: `${selectedDna.title} ${pageType}`,
      tone
    });
  }

  async function handlePaletteFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPaletteState({
      applied: false,
      colors: [],
      description: "",
      loading: true,
      name: file.name
    });

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const nextObjectUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextObjectUrl;

    try {
      const extracted = await extractPaletteFromFile(file);

      setPaletteState({
        applied: true,
        colors: extracted.colors,
        description: extracted.description,
        imageUrl: nextObjectUrl,
        loading: false,
        name: file.name
      });
    } catch (error) {
      setPaletteState({
        applied: false,
        colors: [],
        description: "",
        error:
          error instanceof Error
            ? error.message
            : "Could not extract a palette from that image.",
        imageUrl: nextObjectUrl,
        loading: false,
        name: file.name
      });
    } finally {
      event.target.value = "";
    }
  }

  function handleClearPalette() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setPaletteState({
      applied: false,
      colors: [],
      description: "",
      loading: false
    });
  }

  return (
    <section className="builder-shell builder-archive-shell" id="builder-panel">
      <div className="builder-controls archive-builder-controls">
        <BuilderChoice
          label="Page type"
          onSelect={setPageType}
          options={builderOptions.pageTypes}
          selected={pageType}
        />
        <BuilderChoice
          label="Tone"
          onSelect={setTone}
          options={builderOptions.tones}
          selected={tone}
        />
        <BuilderChoice
          label="Medium"
          onSelect={setMedium}
          options={builderOptions.mediums}
          selected={medium}
        />
        <BuilderChoice
          label="Motion"
          onSelect={setMotionLevel}
          options={builderOptions.motionLevels}
          selected={motionLevel}
        />
        <BuilderChoice
          label="Color direction"
          onSelect={setColorDirection}
          options={builderOptions.colorDirections}
          selected={colorDirection}
        />
        <BuilderChoice
          label="Rough draft model"
          onSelect={setHordeModel}
          options={builderOptions.hordeModels}
          selected={hordeModel}
        />
        <BuilderChoice
          label="Rough draft size"
          onSelect={setHordeSize}
          options={builderOptions.hordeSizes}
          selected={hordeSize}
        />
        <BuilderChoice
          label="DNA base"
          onSelect={setDnaSlug}
          options={featuredDna.map((item) => item.slug)}
          renderLabel={(value) =>
            featuredDna.find((item) => item.slug === value)?.title ?? value
          }
          selected={dnaSlug}
        />
        <BuilderChoice
          label="Style layer"
          onSelect={setStyleSlug}
          options={styleCategories.map((item) => item.slug)}
          renderLabel={(value) =>
            styleCategories.find((item) => item.slug === value)?.title ?? value
          }
          selected={styleSlug}
        />
        <article className="builder-brief-card">
          <div className="micro-row">
            <span>Archive builder</span>
            <span>free local preview first</span>
          </div>
          <p>
            This builder resolves your prompt into a free local preview before you
            send it to any external generation tool. Start here, then bend the
            structure toward a different DNA, style, motion level, or color system.
          </p>
          <div className="signal-row">
            <span>{builderSourceLabel}</span>
            <span>{pageType}</span>
            <span>{tone}</span>
          </div>
        </article>
        <article className="collection-card builder-palette-shell">
          <div className="micro-row">
            <span>Photogradient palette extractor</span>
            <span>reference image to color tokens</span>
          </div>
          <p>
            Upload a reference image and turn it into palette language the builder
            can immediately add to the generated prompt.
          </p>
          <input
            accept="image/*"
            className="sr-only"
            onChange={handlePaletteFileChange}
            ref={fileInputRef}
            type="file"
          />
          <div className="card-actions">
            <button
              className="primary-button button-reset"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              {paletteState.loading ? "Extracting palette..." : "Upload reference image"}
            </button>
            {paletteState.imageUrl ? (
              <button
                className="ghost-button button-reset"
                onClick={handleClearPalette}
                type="button"
              >
                Remove palette
              </button>
            ) : null}
          </div>
          <div className="builder-palette-grid">
            <div className="builder-palette-preview">
              {paletteState.imageUrl ? (
                <img
                  alt={paletteState.name ?? "Uploaded reference"}
                  className="builder-palette-image"
                  src={paletteState.imageUrl}
                />
              ) : (
                <div className="builder-palette-placeholder">
                  <p>
                    Drop in a poster, product photo, or site screenshot. The
                    builder will extract anchor colors and use them as prompt
                    language.
                  </p>
                </div>
              )}
            </div>
            <div className="builder-palette-output">
              <div className="builder-palette-swatches">
                {paletteState.colors.length ? (
                  paletteState.colors.map((color) => (
                    <div className="builder-palette-swatch" key={color}>
                      <span style={{ backgroundColor: color }} />
                      <strong>{color}</strong>
                    </div>
                  ))
                ) : (
                  <div className="builder-palette-empty">
                    <span>No extracted colors yet</span>
                  </div>
                )}
              </div>
              <div className="archive-prompt">
                <span>Palette note</span>
                <p>
                  {paletteState.error
                    ? paletteState.error
                    : paletteState.description || "Extracted palette language will appear here."}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="builder-stage">
        <article className="builder-output builder-dossier">
          <div className="micro-row">
            <span>Generated prompt</span>
            <span>
              {customPrompt ? "Custom prompt mode" : `${pageType} / ${medium}`}
            </span>
          </div>
          <h2>
            {customPrompt ? "Custom Prompt Override" : `${selectedDna.title} x ${selectedStyle.title}`}
          </h2>
          <div className="archive-prompt">
            <p>{generatedPrompt}</p>
          </div>
          {customPrompt ? (
            <div className="builder-custom-note">
              <span>Applied from prompt input</span>
              <p>
                The builder is using the submitted freeform prompt instead of the
                composed prompt from the controls.
              </p>
            </div>
          ) : null}
          <div className="signal-row">
            <span>{selectedDna.referenceBrand ?? selectedDna.title}</span>
            <span>{selectedStyle.title}</span>
            <span>{motionLevel}</span>
            <span>{displayedColorDirection}</span>
          </div>
          <div className="card-actions">
            <CopyButton
              className="primary-button button-reset"
              copiedLabel="Prompt copied"
              value={generatedPrompt}
            />
            {customPrompt ? (
              <button
                className="ghost-button button-reset"
                onClick={onClearExternalPrompt}
                type="button"
              >
                Use builder prompt
              </button>
            ) : null}
            <button
              className="ghost-button button-reset"
              onClick={handleGenerateRoughDraft}
              type="button"
            >
              {hordeDraft.loading ? "Generating rough draft..." : "Generate rough draft"}
            </button>
            {hordeDraft.imageUrl ? (
              <button
                className="ghost-button button-reset"
                onClick={handleSaveRoughDraft}
                type="button"
              >
                Save to archive
              </button>
            ) : null}
          </div>
        </article>
        <article className="builder-preview-shell">
          <div className="micro-row">
            <span>Free local preview</span>
            <span>{tone}</span>
          </div>
          <SemanticPreviewBoard spec={semanticPreview} />
          <div className="builder-preview-notes">
            {semanticPreview.notes.map((note) => (
              <div key={note.label}>
                <span>{note.label}</span>
                <p>{note.value}</p>
              </div>
            ))}
            {paletteState.applied ? (
              <div>
                <span>Palette</span>
                <p>{paletteState.description}</p>
              </div>
            ) : null}
          </div>
          {matchedArchive ? (
            <div className="builder-reference-shell">
              <div className="micro-row">
                <span>Closest archive sample</span>
                <Link href={`/archive/${matchedArchive.slug}`}>Open archive</Link>
              </div>
              <PreviewSurface
                image={matchedArchiveImage}
                label={matchedArchive.title}
                meta={matchedArchive.useCase}
                size="board"
                tone={matchedArchive.previewTone}
              />
            </div>
          ) : null}
          <div className="builder-rough-shell">
            <div className="micro-row">
              <span>AI Horde rough draft</span>
              <span>
                {hordeDraft.loading
                  ? "running"
                  : hordeDraft.done
                    ? "done"
                    : "optional"}
              </span>
            </div>
            {hordeDraft.imageUrl ? (
              <PreviewSurface
                image={{
                  alt: "AI Horde rough draft preview",
                  height: Number(hordeSize.split("x")[1] ?? "576"),
                  src: hordeDraft.imageUrl,
                  width: Number(hordeSize.split("x")[0] ?? "1024")
                }}
                label="Rough draft"
                meta={hordeDraft.model ?? "AI Horde"}
                size="board"
                tone={semanticPreview.tone}
              />
            ) : (
              <div className="builder-rough-placeholder">
                <p>
                  Generate one best-effort mood draft from the current prompt. This
                  is useful for atmosphere and color, not exact UI fidelity.
                </p>
              </div>
            )}
            <div className="builder-preview-notes builder-rough-notes">
              <div>
                <span>Request</span>
                <p>
                  {hordeModel} / {hordeSize}
                </p>
              </div>
              {hordeDraft.error ? (
                <div>
                  <span>Status</span>
                  <p>{hordeDraft.error}</p>
                </div>
              ) : null}
              {typeof hordeDraft.waitTime === "number" ? (
                <div>
                  <span>Queue</span>
                  <p>
                    Position {hordeDraft.queuePosition ?? 0} / ETA {hordeDraft.waitTime}s
                  </p>
                </div>
              ) : null}
              {hordeDraft.seed ? (
                <div>
                  <span>Seed</span>
                  <p>{hordeDraft.seed}</p>
                </div>
              ) : null}
              <div>
                <span>Mode</span>
                <p>
                  Anonymous AI Horde request with rate limiting. Treat the image as a
                  rough concept, not a finished webpage.
                </p>
              </div>
            </div>
            {hordeDraft.imageUrl ? (
              <PublishActions
                assets={[
                  {
                    content: `${generatedPrompt}\n`,
                    filename: "prompt.txt",
                    kind: "text"
                  },
                  {
                    filename: "manifest.json",
                    kind: "json",
                    value: {
                      colorDirection: displayedColorDirection,
                      dna: selectedDna.title,
                      model: hordeDraft.model ?? hordeModel,
                      motionLevel,
                      pageType,
                      prompt: generatedPrompt,
                      size: hordeSize,
                      style: selectedStyle.title,
                      tone
                    }
                  },
                  {
                    filename: "rough-draft.png",
                    kind: "url",
                    url: hordeDraft.imageUrl
                  }
                ]}
                shareText={`${selectedDna.title} / ${pageType} / ${tone}`}
                shareTitle={`${selectedDna.title} ${pageType} rough draft`}
                zipName={`${selectedDna.title}-${pageType}-rough-draft`}
              />
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}

type BuilderChoiceProps = {
  label: string;
  onSelect: (value: string) => void;
  options: string[];
  renderLabel?: (value: string) => string;
  selected: string;
};

function BuilderChoice({
  label,
  onSelect,
  options,
  renderLabel,
  selected
}: BuilderChoiceProps) {
  return (
    <div>
      <span className="builder-label">{label}</span>
      <div className="chip-row">
        {options.map((option) => (
          <button
            className={option === selected ? "filter-chip active" : "filter-chip"}
            key={option}
            onClick={() => onSelect(option)}
            type="button"
          >
            {renderLabel ? renderLabel(option) : option}
          </button>
        ))}
      </div>
    </div>
  );
}
