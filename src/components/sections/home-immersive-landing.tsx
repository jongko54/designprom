"use client";

import Link from "next/link";
import { CSSProperties, useState, type MouseEvent } from "react";

const landingScenes = [
  {
    slug: "quiet-premium",
    label: "Quiet premium",
    shortLabel: "Apple / Glass",
    pageType: "Landing page",
    medium: "2D",
    accent: "#5da8ff",
    accentSoft: "rgba(93, 168, 255, 0.22)",
    secondary: "#cfe4ff",
    glow: "rgba(93, 168, 255, 0.34)",
    prompt:
      "Design a quiet premium AI workspace landing page with crisp typography, disciplined spacing, soft product depth, restrained monochrome surfaces, and one cobalt proof lens.",
    supporting:
      "Start with a design prompt that already knows its spacing, material, and hierarchy.",
    dna: "Calm Precision UI",
    style: "Glass Lens Interface",
    output: "Premium product hero / proof sections / CTA close"
  },
  {
    slug: "spatial-bauhaus",
    label: "Spatial Bauhaus",
    shortLabel: "Google / Bauhaus 3D",
    pageType: "Microsite",
    medium: "3D",
    accent: "#ffba2e",
    accentSoft: "rgba(255, 186, 46, 0.24)",
    secondary: "#ffe7a8",
    glow: "rgba(255, 186, 46, 0.36)",
    prompt:
      "Create a Bauhaus-inspired AI lab microsite with primary color geometry, 3D sculptural objects, modular storytelling, and sharp editorial pacing for experimental product demos.",
    supporting:
      "Switch the scene and the builder shifts from polished launch language into spatial, color-blocked direction.",
    dna: "Collaborative Canvas System",
    style: "Bauhaus Color Block 3D",
    output: "3D hero object / modular story frames / research demo flow"
  },
  {
    slug: "kinetic-campaign",
    label: "Kinetic campaign",
    shortLabel: "TikTok / Motion",
    pageType: "Campaign",
    medium: "Animation",
    accent: "#ff5a72",
    accentSoft: "rgba(255, 90, 114, 0.2)",
    secondary: "#ffd3da",
    glow: "rgba(255, 90, 114, 0.32)",
    prompt:
      "Build a creator campaign microsite with kinetic typography, vertical-media framing, high-contrast black surfaces, and immediate social-native rhythm that converts on first scroll.",
    supporting:
      "The same builder can move from calm product language into motion-heavy launch systems without rebuilding the prompt structure.",
    dna: "Creator Velocity",
    style: "Kinetic Type Signal",
    output: "Hook screen / motion sequence / action drop"
  }
] as const;

type LandingScene = (typeof landingScenes)[number];

function buildPromptFragments(prompt: string) {
  return prompt
    .split(",")
    .map((fragment) => fragment.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export function HomeImmersiveLanding() {
  const [activeScene, setActiveScene] = useState<LandingScene>(landingScenes[0]);
  const [prompt, setPrompt] = useState<string>(landingScenes[0].prompt);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const promptFragments = buildPromptFragments(prompt);
  const stageStyle = {
    "--home-tilt-x": `${tilt.x}deg`,
    "--home-tilt-y": `${tilt.y}deg`,
    "--home-accent": activeScene.accent,
    "--home-accent-soft": activeScene.accentSoft,
    "--home-secondary": activeScene.secondary,
    "--home-glow": activeScene.glow
  } as CSSProperties;

  function handleSceneSelect(sceneSlug: LandingScene["slug"]) {
    const nextScene = landingScenes.find((scene) => scene.slug === sceneSlug);

    if (!nextScene) {
      return;
    }

    setActiveScene(nextScene);
    setPrompt(nextScene.prompt);
  }

  function handleStageMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - py) * 10,
      y: (px - 0.5) * 14
    });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section className="page-hero home-immersive-landing" style={stageStyle}>
      <div className="home-immersive-grid">
        <div className="home-immersive-console">
          <div className="micro-row">
            <span>design prompt builder</span>
            <span>css depth / scene motion / output staging</span>
          </div>
          <div className="eyebrow">Landing page</div>
          <h1>Build the look before you build the page.</h1>
          <p className="home-immersive-copy">{activeScene.supporting}</p>

          <div className="home-immersive-scene-switch" aria-label="Prompt directions">
            {landingScenes.map((scene) => (
              <button
                className={
                  scene.slug === activeScene.slug
                    ? "home-immersive-scene-button button-reset active"
                    : "home-immersive-scene-button button-reset"
                }
                key={scene.slug}
                onClick={() => handleSceneSelect(scene.slug)}
                type="button"
              >
                <span>{scene.label}</span>
                <strong>{scene.shortLabel}</strong>
              </button>
            ))}
          </div>

          <label className="home-immersive-prompt-shell">
            <span className="builder-label">Prompt draft</span>
            <textarea
              className="home-immersive-prompt-input"
              onChange={(event) => setPrompt(event.target.value)}
              spellCheck={false}
              value={prompt}
            />
          </label>

          <div className="home-immersive-fragments">
            {promptFragments.map((fragment) => (
              <span key={fragment}>{fragment}</span>
            ))}
          </div>

          <div className="home-immersive-dossier">
            <article>
              <span>Brand DNA</span>
              <strong>{activeScene.dna}</strong>
            </article>
            <article>
              <span>Style layer</span>
              <strong>{activeScene.style}</strong>
            </article>
            <article>
              <span>Expected output</span>
              <strong>{activeScene.output}</strong>
            </article>
          </div>

          <div className="hero-actions">
            <Link className="primary-button" href="/builder">
              Open Prompt Builder
            </Link>
            <Link className="ghost-button" href="/dna">
              Explore Brand DNA
            </Link>
            <Link className="tertiary-link" href="/archive">
              Open archive
            </Link>
          </div>
        </div>

        <div
          aria-label="CSS 3D landing stage"
          className="home-immersive-stage-shell"
          onMouseLeave={resetTilt}
          onMouseMove={handleStageMove}
        >
          <div className="home-immersive-stage-world">
            <div className="home-immersive-stage-wordmark">prompt</div>
            <div className="home-immersive-grid-floor" />
            <div className="home-immersive-ring ring-a" />
            <div className="home-immersive-ring ring-b" />
            <div className="home-immersive-beam beam-a" />
            <div className="home-immersive-beam beam-b" />
            <div className="home-immersive-core">
              <div className="home-immersive-core-sphere" />
              <div className="home-immersive-core-halo" />
            </div>

            <article className="home-immersive-screen screen-a">
              <div className="micro-row">
                <span>{activeScene.pageType}</span>
                <span>{activeScene.medium}</span>
              </div>
              <h2>Prompt source</h2>
              <div className="home-immersive-lines">
                {promptFragments.map((fragment) => (
                  <span key={fragment}>{fragment}</span>
                ))}
              </div>
            </article>

            <article className="home-immersive-screen screen-b">
              <div className="micro-row">
                <span>Output board</span>
                <span>{activeScene.label}</span>
              </div>
              <h2>Expected screens</h2>
              <div className="home-immersive-artboards">
                <span className="wide" />
                <span />
                <span />
                <span className="tall" />
                <span className="tall" />
              </div>
            </article>

            <article className="home-immersive-screen screen-c">
              <div className="micro-row">
                <span>Site map</span>
                <span>designprom</span>
              </div>
              <h2>Builder structure</h2>
              <div className="home-immersive-map">
                <span>Brand DNA</span>
                <span>Styles</span>
                <span>Prompt Builder</span>
                <span>Archive</span>
              </div>
            </article>

            <div className="home-immersive-marquee">
              <span>{activeScene.shortLabel}</span>
              <span>{activeScene.output}</span>
              <span>{activeScene.label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
