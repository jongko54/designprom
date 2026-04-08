"use client";

import { useDeferredValue, useEffect, useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PublishActions } from "@/components/ui/publish-actions";
import { resolvePromptSemanticPreview } from "@/lib/prompt-semantic-preview";

type PromptMotionHeroProps = {
  onApplyPrompt?: (prompt: string) => void;
};

type MotionRenderState = {
  error?: string;
  imageUrl?: string | null;
  jobId?: string;
  model?: string | null;
  progress: number;
  queuePosition?: number;
  seed?: string | null;
  status: "idle" | "loading" | "done" | "error";
  waitTime?: number;
};

type ReferenceSearchResult = {
  domain: string;
  id: string;
  query: string;
  snippet: string;
  source: "fallback" | "search";
  title: string;
  url: string;
};

type ReferenceSearchState = {
  error?: string;
  query?: string;
  results: ReferenceSearchResult[];
  source?: "fallback" | "search";
  status: "idle" | "loading" | "done" | "error";
};

const HERO_MODEL = "AlbedoBase XL (SDXL)";
const HERO_WIDTH = 1024;
const HERO_HEIGHT = 576;

function slugifyFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function buildPromptPreviewHtml({
  brand,
  imageUrl,
  pageType,
  prompt,
  scenes,
  tone,
  vibe
}: {
  brand: string;
  imageUrl?: string;
  pageType: string;
  prompt: string;
  scenes: Array<{
    caption: string;
    meta: string;
    title: string;
  }>;
  tone: string;
  vibe: string;
}) {
  const escapedPrompt = prompt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const sceneMarkup = scenes
    .map(
      (scene) => `
        <article class="scene-card">
          <div class="scene-meta">
            <span>${scene.meta}</span>
            <span>${pageType}</span>
          </div>
          <h2>${scene.title}</h2>
          <p>${scene.caption}</p>
        </article>
      `
    )
    .join("");

  const imageBlock = imageUrl
    ? `<img class="hero-image" src="${imageUrl}" alt="Generated preview" />`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${brand} ${pageType} Preview</title>
  <style>
    :root {
      color-scheme: light;
      --surface: #faf9f9;
      --surface-low: #f5f3f3;
      --surface-high: #ffffff;
      --text: #000000;
      --muted: #7e7576;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 40px;
      background: var(--surface);
      color: var(--text);
      font-family: Inter, Arial, sans-serif;
    }
    main {
      display: grid;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .topline, .scene-meta {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      color: var(--muted);
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
    .hero {
      display: grid;
      gap: 18px;
      padding: 24px;
      background: var(--surface-high);
    }
    h1 {
      margin: 0;
      font-family: "Space Grotesk", Inter, Arial, sans-serif;
      font-size: 48px;
      line-height: 0.94;
      letter-spacing: -0.05em;
    }
    .hero p, .scene-card p {
      margin: 0;
      color: var(--muted);
      line-height: 1.7;
      white-space: pre-wrap;
    }
    .hero-image {
      display: block;
      width: 100%;
      background: var(--surface-low);
    }
    .scene-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }
    .scene-card {
      display: grid;
      gap: 10px;
      padding: 18px;
      background: var(--surface-low);
    }
    .scene-card h2 {
      margin: 0;
      font-family: "Space Grotesk", Inter, Arial, sans-serif;
      font-size: 28px;
      line-height: 0.96;
      letter-spacing: -0.04em;
    }
    @media (max-width: 900px) {
      body { padding: 20px; }
      .scene-grid { grid-template-columns: 1fr; }
      h1 { font-size: 36px; }
    }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <div class="topline">
        <span>${brand}</span>
        <span>${pageType}</span>
        <span>${tone} / ${vibe}</span>
      </div>
      <h1>Prompt preview export</h1>
      <p>${escapedPrompt}</p>
      ${imageBlock}
    </section>
    <section class="scene-grid">
      ${sceneMarkup}
    </section>
  </main>
</body>
</html>`;
}

export function PromptMotionHero({ onApplyPrompt }: PromptMotionHeroProps) {
  const [draftPrompt, setDraftPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [renderState, setRenderState] = useState<MotionRenderState>({
    progress: 0,
    status: "idle"
  });
  const [referenceState, setReferenceState] = useState<ReferenceSearchState>({
    results: [],
    status: "idle"
  });
  const deferredPrompt = useDeferredValue(submittedPrompt);
  const visual = resolvePromptSemanticPreview(deferredPrompt);
  const normalizedPrompt = draftPrompt.trim();
  const submittedNormalizedPrompt = submittedPrompt.trim();
  const isDirty = normalizedPrompt !== submittedNormalizedPrompt;
  const publishImageUrl = renderState.jobId
    ? `/api/horde/generate/${renderState.jobId}/image`
    : undefined;
  const publishHtml = buildPromptPreviewHtml({
    brand: visual.brand,
    imageUrl: publishImageUrl
      ? `${typeof window !== "undefined" ? window.location.origin : ""}${publishImageUrl}`
      : undefined,
    pageType: visual.pageType,
    prompt: submittedPrompt || normalizedPrompt,
    scenes: visual.scenes,
    tone: visual.tone,
    vibe: visual.vibe
  });

  useEffect(() => {
    if (!renderState.jobId || renderState.status !== "loading") {
      return;
    }

    const intervalId = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/horde/generate/${renderState.jobId}`, {
          cache: "no-store"
        });
        const payload = (await response.json()) as {
          done?: boolean;
          error?: string;
          faulted?: boolean;
          imageUrl?: string | null;
          model?: string | null;
          queuePosition?: number;
          seed?: string | null;
          waitTime?: number;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Failed to poll prompt render status.");
        }

        if (payload.done && payload.imageUrl) {
          setRenderState((current) => ({
            ...current,
            imageUrl: payload.imageUrl,
            model: payload.model,
            progress: 100,
            queuePosition: payload.queuePosition,
            seed: payload.seed,
            status: "done",
            waitTime: payload.waitTime
          }));
          window.clearInterval(intervalId);
          return;
        }

        if (payload.done && !payload.imageUrl) {
          throw new Error("Image generation finished without a result image.");
        }

        setRenderState((current) => {
          const etaProgress =
            typeof payload.waitTime === "number"
              ? Math.max(22, Math.min(88, 92 - payload.waitTime * 4))
              : current.progress + 6;

          return {
            ...current,
            model: payload.model ?? current.model,
            progress: Math.max(current.progress + 4, etaProgress),
            queuePosition: payload.queuePosition,
            seed: payload.seed,
            status: "loading",
            waitTime: payload.waitTime
          };
        });
      } catch (error) {
        window.clearInterval(intervalId);
        setRenderState({
          error:
            error instanceof Error
              ? error.message
              : "Failed to generate the prompt example image.",
          progress: 0,
          status: "error"
        });
      }
    }, 2500);

    return () => window.clearInterval(intervalId);
  }, [renderState.jobId, renderState.status]);

  async function handleApplyPrompt() {
    if (!normalizedPrompt) {
      return;
    }

    setSubmittedPrompt(normalizedPrompt);
    onApplyPrompt?.(normalizedPrompt);
    setRenderState({
      model: HERO_MODEL,
      progress: 8,
      status: "loading",
      waitTime: 0
    });
    setReferenceState({
      results: [],
      status: "loading"
    });

    document.getElementById("builder-panel")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    try {
      const response = await fetch("/api/horde/generate", {
        body: JSON.stringify({
          height: HERO_HEIGHT,
          model: HERO_MODEL,
          prompt: normalizedPrompt,
          width: HERO_WIDTH
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
        throw new Error(payload.error ?? "Failed to submit the prompt render job.");
      }

      setRenderState({
        jobId: payload.id,
        model: HERO_MODEL,
        progress: 18,
        status: "loading"
      });
    } catch (error) {
      setRenderState({
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit the prompt render job.",
        progress: 0,
        status: "error"
      });
    }

    void (async () => {
      try {
        const referenceResponse = await fetch("/api/reference-sites/search", {
          body: JSON.stringify({
            prompt: normalizedPrompt
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        });
        const referencePayload = (await referenceResponse.json()) as {
          error?: string;
          query?: string;
          results?: ReferenceSearchResult[];
          source?: "fallback" | "search";
        };

        if (!referenceResponse.ok) {
          throw new Error(
            referencePayload.error ?? "Failed to search for reference websites."
          );
        }

        setReferenceState({
          query: referencePayload.query,
          results: referencePayload.results ?? [],
          source: referencePayload.source,
          status: "done"
        });
      } catch (error) {
        setReferenceState({
          error:
            error instanceof Error
              ? error.message
              : "Failed to search for reference websites.",
          results: [],
          status: "error"
        });
      }
    })();
  }

  function handleDownloadCode() {
    const fileStem = slugifyFileName(submittedPrompt || visual.headline || "prompt-preview");
    const html = buildPromptPreviewHtml({
      brand: visual.brand,
      imageUrl: publishImageUrl ? `${window.location.origin}${publishImageUrl}` : undefined,
      pageType: visual.pageType,
      prompt: submittedPrompt || normalizedPrompt,
      scenes: visual.scenes,
      tone: visual.tone,
      vibe: visual.vibe
    });
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `${fileStem || "designprom-preview"}.html`;
    anchor.click();
    URL.revokeObjectURL(href);
  }

  function handleClearPrompt() {
    setDraftPrompt("");
    setSubmittedPrompt("");
    setRenderState({
      progress: 0,
      status: "idle"
    });
    setReferenceState({
      results: [],
      status: "idle"
    });
    onApplyPrompt?.("");
  }

  return (
    <section className={`page-hero prompt-motion-hero-shell prompt-tone-${visual.tone}`}>
      <div className="prompt-motion-grid">
        <div className="prompt-motion-input-shell">
          <label>
            <span className="sr-only">Prompt preview input</span>
            <textarea
              className="prompt-motion-input"
              onChange={(event) => setDraftPrompt(event.target.value)}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && normalizedPrompt) {
                  event.preventDefault();
                  handleApplyPrompt();
                }
              }}
              placeholder="Type a prompt. The preview updates live, then submit it to the builder..."
              spellCheck={false}
              value={draftPrompt}
            />
          </label>
          <div className="prompt-motion-actions">
            <div className="prompt-motion-note">
              <span>
                {submittedPrompt
                  ? isDirty
                    ? "Draft changed"
                    : "Submitted"
                  : "Waiting for submit"}
              </span>
              <span>
                {submittedPrompt
                  ? isDirty
                    ? "Submit again to update the motion reel and builder."
                    : "Motion reel and builder are showing the submitted prompt."
                  : "Submit the prompt to render an example image and update the builder."}
              </span>
            </div>
            <p className="prompt-motion-helper">
              For more reliable image generation, using Stitchd is recommended.
            </p>
            <div className="card-actions">
              <button
                className="primary-button button-reset"
                disabled={!normalizedPrompt}
                onClick={handleApplyPrompt}
                type="button"
              >
                Submit prompt
              </button>
              <button
                className="ghost-button button-reset"
                disabled={!draftPrompt && !submittedPrompt}
                onClick={handleClearPrompt}
                type="button"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="prompt-motion-stage" aria-hidden="true">
          <div className="prompt-motion-timeline">
            <span />
            <span />
            <span />
          </div>
          {renderState.status === "loading" ? (
            <div className="prompt-motion-generated-shell is-loading">
              <div className="prompt-motion-generated-top">
                <span>{visual.brand}</span>
                <span>{visual.pageType}</span>
              </div>
              <div className="prompt-motion-loading-copy">
                <strong>Rendering prompt example</strong>
                <p>{submittedPrompt || normalizedPrompt || "Waiting for a submitted prompt."}</p>
              </div>
              <div className="prompt-motion-progress-shell">
                <div className="prompt-motion-progress-bar">
                  <span style={{ width: `${Math.min(renderState.progress, 100)}%` }} />
                </div>
                <div className="prompt-motion-progress-meta">
                  <span>{Math.round(Math.min(renderState.progress, 100))}%</span>
                  <span>
                    {typeof renderState.waitTime === "number"
                      ? `ETA ${renderState.waitTime}s`
                      : renderState.model ?? HERO_MODEL}
                  </span>
                </div>
              </div>
            </div>
          ) : renderState.status === "done" && renderState.imageUrl ? (
            <div className="prompt-motion-generated-shell">
              <div className="prompt-motion-generated-top">
                <span>{visual.brand}</span>
                <span>{visual.pageType}</span>
              </div>
              <div className="prompt-motion-generated-image-shell">
                <img
                  alt="Generated prompt example preview"
                  className="prompt-motion-generated-image"
                  src={renderState.imageUrl}
                />
              </div>
              <div className="prompt-motion-generated-bottom">
                <span>{renderState.model ?? HERO_MODEL}</span>
                <span>{renderState.seed ? `Seed ${renderState.seed}` : visual.vibe}</span>
              </div>
              <div className="prompt-motion-downloads">
                <button
                  className="ghost-button button-reset"
                  onClick={handleDownloadCode}
                  type="button"
                >
                  Download code
                </button>
                {renderState.jobId ? (
                  <a
                    className="primary-button"
                    href={`/api/horde/generate/${renderState.jobId}/image`}
                  >
                    Download image
                  </a>
                ) : null}
              </div>
              <PublishActions
                assets={[
                  {
                    content: `${submittedPrompt || normalizedPrompt}\n`,
                    filename: "prompt.txt",
                    kind: "text"
                  },
                  {
                    content: publishHtml,
                    filename: "index.html",
                    kind: "text"
                  },
                  {
                    filename: "manifest.json",
                    kind: "json",
                    value: {
                      brand: visual.brand,
                      model: renderState.model ?? HERO_MODEL,
                      pageType: visual.pageType,
                      prompt: submittedPrompt || normalizedPrompt,
                      scenes: visual.scenes,
                      seed: renderState.seed,
                      tone: visual.tone,
                      vibe: visual.vibe
                    }
                  },
                  ...(publishImageUrl
                    ? [
                        {
                          filename: `${slugifyFileName(
                            submittedPrompt || visual.headline || "prompt-preview"
                          )}.png`,
                          kind: "url" as const,
                          url: publishImageUrl
                        }
                      ]
                    : [])
                ]}
                shareText={submittedPrompt || normalizedPrompt}
                shareTitle={`${visual.brand} ${visual.pageType} prompt preview`}
                zipName={`${visual.brand}-${visual.pageType}-preview`}
              />
            </div>
          ) : renderState.status === "error" ? (
            <div className="prompt-motion-generated-shell is-error">
              <div className="prompt-motion-generated-top">
                <span>{visual.brand}</span>
                <span>{visual.pageType}</span>
              </div>
              <div className="prompt-motion-loading-copy">
                <strong>Render failed</strong>
                <p>{renderState.error}</p>
              </div>
            </div>
          ) : (
            <div className="prompt-motion-reel">
              {visual.scenes.map((scene, index) => (
                <article
                  className={`prompt-motion-frame frame-${index + 1}`}
                  key={`${scene.title}-${index}`}
                >
                  <div className="prompt-motion-frame-top">
                    <span>{visual.brand}</span>
                    <span>{visual.pageType}</span>
                  </div>
                  <div className="prompt-motion-frame-canvas">
                    <div className="prompt-motion-headline">{scene.title}</div>
                    <div className="prompt-motion-bars">
                      <span className="long" />
                      <span className="short" />
                      <span className="medium" />
                    </div>
                    <div className="prompt-motion-panel-grid">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="prompt-motion-frame-bottom">
                    <span>{scene.meta}</span>
                    <span>{visual.vibe}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      {referenceState.status !== "idle" ? (
        <div className="prompt-reference-shell">
          <div className="prompt-reference-head">
            <div className="micro-row">
              <span>Reference websites</span>
              <span>
                {referenceState.status === "loading"
                  ? "searching live websites"
                  : referenceState.query ?? "live website matches"}
              </span>
            </div>
            <p>
              {referenceState.status === "loading"
                ? "Searching the web for matching sites and preparing capture previews."
                : referenceState.source === "fallback"
                  ? "Live search was unavailable, so these curated reference sites were matched to the submitted prompt."
                  : "These live website references were matched from web search to make the prompt direction more concrete."}
            </p>
          </div>
          {referenceState.status === "error" ? (
            <div className="prompt-reference-empty">
              <strong>Reference search failed</strong>
              <p>{referenceState.error}</p>
            </div>
          ) : null}
          {referenceState.status === "loading" ? (
            <div className="prompt-reference-grid">
              {Array.from({ length: 3 }).map((_, index) => (
                <article className="prompt-reference-card is-loading" key={index}>
                  <div className="prompt-reference-image-skeleton" />
                  <div className="prompt-reference-copy">
                    <strong>Searching reference site</strong>
                    <span>Matching the prompt to live websites...</span>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
          {referenceState.status === "done" ? (
            <div className="prompt-reference-grid">
              {referenceState.results.map((result) => (
                <article className="prompt-reference-card" key={result.id}>
                  <ImageLightbox
                    alt={`${result.title} website capture`}
                    className="prompt-reference-image"
                    src={`/api/reference-sites/screenshot/${result.id}`}
                  />
                  <div className="prompt-reference-copy">
                    <strong>{result.title}</strong>
                    <span>{result.domain}</span>
                    <p>{result.snippet || "Captured from a live website result related to the submitted prompt."}</p>
                  </div>
                  <div className="prompt-reference-actions">
                    <span>
                      {result.source === "fallback" ? "Curated reference" : "Live reference"}
                    </span>
                    <a
                      className="ghost-button"
                      href={result.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open site
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
