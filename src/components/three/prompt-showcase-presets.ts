export type PromptShowcaseSceneKind =
  | "monolith-drift"
  | "orbit-forge"
  | "petal-signal"
  | "tidal-beacon";

export type PromptShowcasePalette = {
  accent: string;
  accentSoft: string;
  background: string;
  card: string;
  floor: string;
  fog: string;
  glow: string;
  line: string;
  mist: string;
};

export type PromptShowcaseEntry = {
  id: PromptShowcaseSceneKind;
  index: string;
  prompt: string;
  stageLabel: string;
  title: string;
  palette: PromptShowcasePalette;
};

export const promptShowcaseEntries: PromptShowcaseEntry[] = [
  {
    id: "monolith-drift",
    index: "01",
    title: "Monolith Drift",
    stageLabel: "obsidian lacquer / monolith hall",
    prompt:
      "Design a premium 3D interactive landing page with monumental obsidian monoliths, smoked-black lacquer panels, brushed champagne metal trims, narrow amber light cuts, a reflective resin floor, and slow pointer-led camera drift. The scene should feel like a luxury installation prototype for a future design brand. Keep the UI minimal, let the surfaces read as expensive PBR materials, and avoid any playful gaming energy.",
    palette: {
      accent: "#ff9c63",
      accentSoft: "#ffd0af",
      background: "#07090f",
      card: "rgba(15, 18, 26, 0.82)",
      floor: "#111621",
      fog: "#1f2633",
      glow: "#ffbc8d",
      line: "#eef2ff",
      mist: "#2d3447"
    }
  },
  {
    id: "orbit-forge",
    index: "02",
    title: "Orbit Forge",
    stageLabel: "anodized cobalt / orbital forge",
    prompt:
      "Create a futuristic 3D hero webpage built around a suspended opaline core wrapped in anodized cobalt rings, satin titanium frames, cold signal light, and a deep midnight gradient. The interaction should feel engineered and premium, with restrained orbit motion, controlled bloom, and high-spec material contrast. Avoid toy-like forms and keep the scene closer to an enterprise product sculpture than a sci-fi game.",
    palette: {
      accent: "#74b8ff",
      accentSoft: "#d9efff",
      background: "#04101b",
      card: "rgba(9, 19, 31, 0.82)",
      floor: "#091928",
      fog: "#16314a",
      glow: "#8fd4ff",
      line: "#f4fbff",
      mist: "#17344d"
    }
  },
  {
    id: "petal-signal",
    index: "03",
    title: "Petal Signal",
    stageLabel: "pearlescent rose / signal bloom",
    prompt:
      "Build an atmospheric 3D web composition with a polished ivory signal tower, pearlescent translucent petals, frosted glass leaves, soft ivory light discs, and a calm cinematic camera. The mood should feel poetic but still controlled, like a luxury fashion technology installation. Keep the UI nearly silent and make the petals read as refined coated materials rather than cartoon flowers.",
    palette: {
      accent: "#ff84bc",
      accentSoft: "#ffe0ef",
      background: "#140911",
      card: "rgba(30, 15, 25, 0.84)",
      floor: "#24121d",
      fog: "#472032",
      glow: "#ffc5dd",
      line: "#fff0f6",
      mist: "#56233d"
    }
  },
  {
    id: "tidal-beacon",
    index: "04",
    title: "Tidal Beacon",
    stageLabel: "sea-glass beacon / tidal loop",
    prompt:
      "Create a coastal night 3D interaction page with a sculptural sea-glass beacon tower, oxidized metal details, layered tidal rings, fine sea-spray particles, and a mineral blue-green palette with pale highlights. The scene should feel cinematic and expensive, with motion led by slow wave cycles and cursor parallax instead of loud animation. Keep supporting UI understated and make the beacon materials feel production-ready for a premium web launch.",
    palette: {
      accent: "#82f2dc",
      accentSoft: "#d6fff6",
      background: "#051110",
      card: "rgba(10, 24, 24, 0.84)",
      floor: "#0c2021",
      fog: "#1a3d3b",
      glow: "#9ef5e4",
      line: "#effffb",
      mist: "#214c49"
    }
  }
];

export const promptShowcaseEntryById = new Map(
  promptShowcaseEntries.map((entry) => [entry.id, entry])
);
