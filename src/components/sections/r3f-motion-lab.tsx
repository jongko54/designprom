"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { CopyButton } from "@/components/ui/copy-button";

const R3FSignalBloomScene = dynamic(
  () =>
    import("@/components/three/r3f-signal-bloom-scene").then(
      (module) => module.R3FSignalBloomScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="r3f-scene-loading">
        <span>Loading WebGL scene</span>
        <strong>Signal Bloom</strong>
        <p>React Three Fiber hero with looped motion bands and floating glass panels.</p>
      </div>
    )
  }
);

const workflowSteps = [
  {
    label: "01 Layout first",
    title: "Write the information architecture before touching 3D.",
    body:
      "Use a UI prompt to decide the hero message, section order, CTA placement, and copy density. Do not ask the 3D scene to solve hierarchy by itself."
  },
  {
    label: "02 Scene thesis",
    title: "Translate one visual thesis into 3D primitives.",
    body:
      "Pick one dominant object family, one accent pair, and one loop rhythm. In this demo that means a glowing core, floating panels, cyan-magenta signal light, and broadcast-like scan lines."
  },
  {
    label: "03 Loop system",
    title: "Replace GIF thinking with looped layers.",
    body:
      "Use shader drift, particle fields, orbiting lights, or short WebM overlays for the repeated motion feeling. The goal is perpetual energy, not literal GIF files."
  },
  {
    label: "04 Ship discipline",
    title: "Build fallbacks from the start.",
    body:
      "Keep `next/image` for posters, give mobile a calmer camera path, and prepare a reduced-motion mode or static frame so the page still reads without constant movement."
  }
];

const promptPackets = [
  {
    title: "Layout Prompt",
    tool: "Use in Stitch, Framer AI, or any UI generator",
    prompt:
      "Create a premium launch landing page for a futuristic motion product. Use a split hero with a 3D stage on one side, short high-contrast copy on the other, a strong primary CTA, a compact proof row, a workflow section, and a prompt toolkit section. Keep the layout dark, cinematic, and highly scannable instead of default SaaS.",
    note:
      "This prompt defines the page structure. It should not try to describe low-level mesh behavior."
  },
  {
    title: "3D Scene Prompt",
    tool: "Use as an implementation brief for R3F / three.js",
    prompt:
      "Build a React Three Fiber hero scene with one luminous geometric core, two orbiting rings, floating translucent panels, cyan and magenta signal lights, additive glow bands, and a slow camera drift reacting to pointer movement. The scene should loop cleanly and feel like a premium broadcast ident rather than a game HUD.",
    note:
      "This is the part that becomes code. Give the engineer object families, light logic, and motion tempo."
  },
  {
    title: "Motion Prompt",
    tool: "Use for shader, VFX, or short loop overlays",
    prompt:
      "Add a gif-like motion layer through repeated scan bands, particle drift, soft pulse scaling, and orbiting highlights. Keep the loop under control: no random explosions, no chaotic lens flares, and no more than one high-energy beat every two seconds.",
    note:
      "Use this when you want continuous movement without shipping an actual GIF."
  }
];

const implementationNotes = [
  "Use `@react-three/fiber` for scene composition and `three` materials directly for control.",
  "Treat the 3D hero like one section of the page, not the whole product. The HTML copy still needs to carry the CTA and proof.",
  "For heavy art direction, add a poster image and switch to a paused or lighter scene on smaller screens.",
  "If you truly need raster loops, export WebM or MP4, not GIF. Let 3D and video each do one job."
];

const productionRules = [
  "Keep one visual thesis. Do not mix cyberpunk fog, glassmorphism, and brutalist type unless they support the same story.",
  "Cap the hero scene to a few reusable motifs so the motion feels authored instead of noisy.",
  "Use prompt tooling for structure and mood, then hand off the hero to code when depth, lighting, and loop precision matter.",
  "Profile performance on first load. Large media and over-eager prefetches will destroy the effect faster than weak art direction."
];

export function R3FMotionLab() {
  return (
    <>
      <section className="hero-panel r3f-lab-hero">
        <div className="r3f-lab-grid">
          <div className="r3f-lab-copy">
            <div className="micro-row">
              <span>R3F motion lab</span>
              <span>3D plus gif-like looping workflow</span>
            </div>
            <div className="eyebrow">Signal Bloom Broadcast</div>
            <h1>Build the page in layers: layout, 3D scene, loop system, then production fallback.</h1>
            <p className="hero-copy">
              If you want a web page that feels 3D and gif-like, the right move is
              not one giant prompt. Split the job. Prompt the layout, implement the
              hero in React Three Fiber, and treat the looped motion as its own
              system with explicit performance constraints.
            </p>
            <div className="signal-row">
              <span>React Three Fiber</span>
              <span>three.js lights and materials</span>
              <span>Looped motion bands</span>
              <span>Prompt packet workflow</span>
            </div>
            <div className="r3f-lab-stat-grid">
              <article>
                <span>Visual thesis</span>
                <strong>Dark broadcast stage with floating signal glass</strong>
              </article>
              <article>
                <span>Best use</span>
                <strong>Launch pages, game drops, motion-heavy brand heroes</strong>
              </article>
              <article>
                <span>Fallback rule</span>
                <strong>Always ship poster, mobile calm mode, and reduced motion</strong>
              </article>
            </div>
            <div className="card-actions">
              <Link className="primary-button" href="#r3f-workflow" prefetch={false}>
                See workflow
              </Link>
              <Link className="ghost-button" href="/builder" prefetch={false}>
                Open builder
              </Link>
            </div>
          </div>

          <article className="r3f-scene-card">
            <div className="micro-row">
              <span>Live scene</span>
              <span>WebGL hero</span>
            </div>
            <div className="r3f-scene-shell">
              <R3FSignalBloomScene />
              <div className="r3f-scene-overlay">
                <span>Looped motion stack</span>
                <strong>Core pulse / floating panels / signal bands</strong>
                <p>Pointer-reactive camera drift with a controlled broadcast rhythm.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="content-section r3f-workflow-shell" id="r3f-workflow">
        <div className="section-heading">
          <div className="eyebrow">Workflow</div>
          <h2>Where the prompt goes, and where code has to take over</h2>
          <p>
            Use prompts to define structure and mood. Use React Three Fiber when the
            hero needs actual depth, lighting, and reliable loop control.
          </p>
        </div>
        <div className="r3f-workflow-grid">
          {workflowSteps.map((step) => (
            <article className="showcase-card r3f-step-card" key={step.label}>
              <div className="card-topline">
                <span>{step.label}</span>
                <span>Ship order</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section r3f-prompt-shell">
        <div className="section-heading">
          <div className="eyebrow">Prompt packet</div>
          <h2>Three prompts instead of one overloaded brief</h2>
          <p>
            Copy these as a starting point and rewrite the subject matter for your
            brand, product, or campaign.
          </p>
        </div>
        <div className="detail-dossier-grid r3f-prompt-grid">
          {promptPackets.map((packet) => (
            <article className="detail-dossier-card r3f-prompt-card" key={packet.title}>
              <div className="micro-row">
                <span>{packet.title}</span>
                <span>{packet.tool}</span>
              </div>
              <div className="prompt-panel">
                <span>Prompt</span>
                <p>{packet.prompt}</p>
              </div>
              <p className="r3f-prompt-note">{packet.note}</p>
              <div className="card-actions">
                <CopyButton value={packet.prompt} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section r3f-system-shell">
        <div className="section-heading">
          <div className="eyebrow">Production notes</div>
          <h2>Implementation rules that keep the effect usable</h2>
          <p>
            The page only feels premium if the motion remains legible, the copy still
            converts, and the hero degrades cleanly on weaker devices.
          </p>
        </div>
        <div className="detail-dossier-grid">
          <article className="detail-dossier-card detail-dossier-note">
            <div className="micro-row">
              <span>Stack blueprint</span>
              <span>Code-first hero</span>
            </div>
            <ul className="bullet-list detail-bullet-list">
              {implementationNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-dossier-card detail-dossier-note">
            <div className="micro-row">
              <span>Art direction rules</span>
              <span>Keep the page coherent</span>
            </div>
            <ul className="bullet-list detail-bullet-list">
              {productionRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="card-actions r3f-lab-footer">
          <Link className="primary-button" href="/styles" prefetch={false}>
            Back to styles
          </Link>
          <Link className="ghost-button" href="/archive" prefetch={false}>
            Open archive
          </Link>
        </div>
      </section>
    </>
  );
}
