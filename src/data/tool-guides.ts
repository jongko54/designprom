import { ArchiveImageAsset } from "@/data/site";

export type ToolGuide = {
  slug: "alembic" | "photogradient";
  title: string;
  summary: string;
  liveUrl: string;
  supportLinks: Array<{ label: string; href: string }>;
  screenshot: ArchiveImageAsset;
  overview: string;
  features: string[];
  workflow: string[];
  systemPatterns: string[];
  designpromFit: string[];
  promptRecipes: Array<{
    title: string;
    prompt: string;
    note: string;
  }>;
};

export const toolGuides: Record<ToolGuide["slug"], ToolGuide> = {
  alembic: {
    slug: "alembic",
    title: "Alembic",
    summary:
      "A text-first visual maker for turning one sentence into a styled editorial asset with minimal controls.",
    liveUrl: "https://alembic.space/editor",
    supportLinks: [
      { label: "Open editor", href: "https://alembic.space/editor" },
      { label: "Open changelog", href: "https://alembic.space/changelog" }
    ],
    screenshot: {
      src: "/research-alembic-editor.png",
      alt: "Alembic editor screenshot showing text-focused toolbar, font picker, and styled output workspace.",
      width: 1440,
      height: 1200
    },
    overview:
      "Alembic compresses the workflow into one canvas: type a phrase, style it through a small toolbar, and export a graphic-like text surface without opening a heavy design app.",
    features: [
      "Single-screen text canvas with live preview",
      "Typeface picker, line-height control, contrast toggle, and hyphenation",
      "Text shape, theme colors, padding, kaomoji, and decorations shortcuts",
      "Draft saving flow with sign-in and cloud sync messaging",
      "Minimal save actions instead of multi-panel export complexity"
    ],
    workflow: [
      "Enter text directly into the main canvas instead of opening a modal or sidebar editor",
      "Adjust type and decoration controls from one compact toolbar above the content",
      "See the styled result immediately in the output area with no page transition",
      "Save or sync drafts only after the composition feels right"
    ],
    systemPatterns: [
      "Text is the product, so the interface removes secondary chrome aggressively",
      "Controls are named with direct language, not abstract design-system jargon",
      "Formatting options are grouped as creative moves rather than application menus",
      "The drafts sidebar stays separate from the composition zone, preserving focus"
    ],
    designpromFit: [
      "Use the Alembic tab as a reference for prompt-driven typography assets and text poster directions",
      "Translate its control vocabulary into prompt tokens like typeface mood, line height, decoration, or padding behavior",
      "Show users how to prompt for quote cards, campaign title plates, and editorial headers without asking for a full website first"
    ],
    promptRecipes: [
      {
        title: "Editorial quote plate",
        prompt:
          "Create a text-first editorial cover image with high-contrast serif typography, tight line height, wide margins, gentle hyphenation, sparse decoration, and one restrained accent color. Make it feel like a literary poster rather than a social template.",
        note:
          "Good for archive covers, manifesto cards, and cultural launch captions."
      },
      {
        title: "Campaign title card",
        prompt:
          "Design a cinematic campaign title graphic using one oversized display line, compact supporting metadata, monochrome surfaces, and a single dramatic decorative mark. Keep the composition centered and legible at thumbnail scale.",
        note:
          "Useful when a landing page needs a bold opening still before building the full site."
      },
      {
        title: "Design system heading study",
        prompt:
          "Generate a typographic heading study with strong font personality, visible spacing rhythm, hard-edged framing, and three hierarchy levels that can later translate into a web hero, section header, and caption system.",
        note:
          "Useful for moving from text image experiments into full UI prompt language."
      }
    ]
  },
  photogradient: {
    slug: "photogradient",
    title: "Photogradient",
    summary:
      "A gradient generator that exposes mesh-like color controls, warp settings, and downloadable outputs in one tiny interface.",
    liveUrl: "https://photogradient.com/",
    supportLinks: [
      { label: "Open tool", href: "https://photogradient.com/" },
      {
        label: "Open Figma plugin",
        href: "https://www.figma.com/community/plugin/1438020299097238961/photo-gradient"
      }
    ],
    screenshot: {
      src: "/research-photogradient-home.png",
      alt: "Photogradient screenshot showing gradient style, warp controls, color stop list, and download button.",
      width: 1425,
      height: 1320
    },
    overview:
      "Photogradient treats gradients as controllable image systems: pick a gradient style, change the warp field, adjust dimensions, refine color stops, and export immediately.",
    features: [
      "Gradient style selector and warp-shape selector",
      "Width and height inputs for quick output sizing",
      "Warp, warp size, and noise sliders for mesh behavior",
      "Editable color-stop list with direct hex control",
      "One-click download plus a linked Figma plugin path"
    ],
    workflow: [
      "Choose a base gradient behavior first, then change the warp model",
      "Set output size before polishing the final mesh movement",
      "Tune distortion through warp and noise rather than adding extra visual effects",
      "Refine the palette through editable stops, then export the image"
    ],
    systemPatterns: [
      "The interface is parameter-first and makes every visual change explicit",
      "Controls are grouped by visual outcome: structure, warp, size, and color",
      "The palette list behaves like a design token panel rather than a decorative picker",
      "The product feels useful because download is always near the core controls"
    ],
    designpromFit: [
      "Use the Photogradient tab as a palette and background-study reference for landing page prompts",
      "Teach users to extract color direction first, then describe mesh behavior, softness, and distortion in the prompt",
      "Turn gradient controls into prompt language for hero atmospheres, poster backdrops, and product launch surfaces"
    ],
    promptRecipes: [
      {
        title: "Mesh gradient hero background",
        prompt:
          "Create a hero background with a soft mesh gradient, controlled warp distortion, six carefully spaced color stops, and smooth noise that keeps the image premium rather than chaotic. The gradient should feel ready for a modern landing page, not a random wallpaper.",
        note:
          "Best when the page needs atmosphere without relying on 3D objects."
      },
      {
        title: "Photo-derived color system",
        prompt:
          "Build a UI color study from a photo-derived palette with one dark anchor, one bright highlight, and four supporting mid-tones. Translate it into a smooth warped gradient for a product hero while preserving enough contrast for readable type.",
        note:
          "Useful for turning reference photography into a usable landing-page color direction."
      },
      {
        title: "Art direction backdrop",
        prompt:
          "Generate a gallery-grade gradient backdrop with visible color-stop discipline, light warp movement, and low-noise transitions. Make it suitable for an art direction archive, title treatment, or premium editorial microsite.",
        note:
          "Good when the background itself needs to look designed, not default."
      }
    ]
  }
};

export function getToolGuide(slug: ToolGuide["slug"]) {
  return toolGuides[slug];
}
