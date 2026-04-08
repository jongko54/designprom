import { randomUUID } from "node:crypto";

import { chromium } from "playwright-core";

import { resolvePromptSemanticPreview } from "@/lib/prompt-semantic-preview";

export type ReferenceSiteMatch = {
  domain: string;
  id: string;
  query: string;
  snippet: string;
  source: "fallback" | "search";
  title: string;
  url: string;
};

type InternalReferenceSiteMatch = ReferenceSiteMatch & {
  expiresAt: number;
};

type ScreenshotCacheEntry = {
  body: Buffer;
  contentType: string;
  expiresAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __designpromReferenceSiteStore:
    | Map<string, InternalReferenceSiteMatch>
    | undefined;
  // eslint-disable-next-line no-var
  var __designpromReferenceScreenshotStore:
    | Map<string, ScreenshotCacheEntry>
    | undefined;
  // eslint-disable-next-line no-var
  var __designpromReferenceBrowserPromise:
    | Promise<Awaited<ReturnType<typeof chromium.launch>>>
    | undefined;
}

const RESULT_TTL_MS = 30 * 60 * 1000;
const SCREENSHOT_TTL_MS = 30 * 60 * 1000;
const DDG_RESULT_LIMIT = 12;
const REFERENCE_RESULT_LIMIT = 3;
const SCREENSHOT_WIDTH = 1440;
const SCREENSHOT_HEIGHT = 960;
const DEFAULT_CHROME_PATH =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const designDomainBoost = [
  "awwwards.com",
  "siteinspire.com",
  "godly.website",
  "land-book.com",
  "lapa.ninja",
  "cargo.site",
  "framer.com",
  "framer.university",
  "webflow.com"
];

const filteredDomains = [
  "duckduckgo.com",
  "google.com",
  "youtube.com",
  "reddit.com",
  "pinterest.com",
  "facebook.com",
  "instagram.com"
];

const curatedReferenceSites = [
  {
    snippet: "Portfolio and creative site templates with strong editorial structure and art-direction cues.",
    tags: ["portfolio", "editorial", "creative", "gallery", "template", "microsite", "brand"],
    title: "Cargo Templates",
    url: "https://cargo.site/templates"
  },
  {
    snippet: "Modern landing pages and creative product sites with premium motion and strong section rhythm.",
    tags: ["landing", "website", "framer", "motion", "saas", "portfolio", "design inspiration"],
    title: "Framer",
    url: "https://www.framer.com/"
  },
  {
    snippet: "Curated inspiration for high-end websites, immersive marketing pages, and interactive showcases.",
    tags: ["inspiration", "interactive", "award", "marketing", "portfolio", "art direction"],
    title: "Awwwards",
    url: "https://www.awwwards.com/"
  },
  {
    snippet: "Collections of web design inspiration with strong category coverage for product and portfolio work.",
    tags: ["inspiration", "landing", "portfolio", "minimal", "editorial", "ecommerce"],
    title: "SiteInspire",
    url: "https://www.siteinspire.com/"
  },
  {
    snippet: "Quiet premium product marketing with restrained color, strong device framing, and measured hierarchy.",
    tags: ["apple", "quiet premium", "product launch", "device", "glass", "minimal", "landing"],
    title: "Apple",
    url: "https://www.apple.com/"
  },
  {
    snippet: "Collaborative product tooling with pane layouts, rails, system-heavy interfaces, and dense utility patterns.",
    tags: ["figma", "dashboard", "tooling", "collaboration", "canvas", "workspace", "ui system"],
    title: "Figma",
    url: "https://www.figma.com/"
  },
  {
    snippet: "Warm travel and hospitality patterns with rounded modules, trust cues, and booking-friendly flows.",
    tags: ["airbnb", "hospitality", "booking", "travel", "warm", "discovery", "landing"],
    title: "Airbnb",
    url: "https://www.airbnb.com/"
  },
  {
    snippet: "Enterprise design language with modular proof sections, operational trust, and rigorous grid structure.",
    tags: ["ibm", "enterprise", "docs", "b2b", "grid", "systematic", "solution"],
    title: "IBM Design Language",
    url: "https://www.ibm.com/design/language/"
  },
  {
    snippet: "Creator-first social design language with punchy hooks, overlays, and high-immediacy campaign energy.",
    tags: ["tiktok", "creator", "campaign", "social", "kinetic type", "motion", "drop"],
    title: "TikTok",
    url: "https://www.tiktok.com/"
  },
  {
    snippet: "Google product ecosystem and design guidance with bright signal colors, modular cards, and utility-first UI.",
    tags: ["google", "product", "ai", "toolkit", "cards", "utility", "lab"],
    title: "Google",
    url: "https://about.google/"
  },
  {
    snippet: "Editorial commerce with premium product photography, soft palettes, and high-trust beauty merchandising.",
    tags: ["k-beauty", "beauty", "editorial commerce", "skincare", "ecommerce", "portfolio"],
    title: "Soko Glam",
    url: "https://sokoglam.com/"
  },
  {
    snippet: "Luxury editorial commerce with product rituals, typography-led hierarchy, and premium neutral surfaces.",
    tags: ["beauty", "luxury", "editorial", "ecommerce", "ritual", "premium"],
    title: "Aesop",
    url: "https://www.aesop.com/"
  },
  {
    snippet: "Friendly direct-to-consumer commerce with approachable copy, product-first blocks, and warm utility patterns.",
    tags: ["ecommerce", "dtc", "friendly", "product", "shop", "landing"],
    title: "Allbirds",
    url: "https://www.allbirds.com/"
  },
  {
    snippet: "Fashion-forward product launches with drop energy, campaign pacing, and strong photography-led storytelling.",
    tags: ["fashion", "streetwear", "campaign", "drop", "portfolio", "lookbook"],
    title: "Gymshark",
    url: "https://www.gymshark.com/"
  },
  {
    snippet: "Experimental and immersive storytelling with layered interaction, cinematic depth, and bold scene changes.",
    tags: ["interactive", "immersive", "3d", "science", "motion", "showcase", "modern art"],
    title: "Corn Revolution",
    url: "https://cornrevolution.resn.global/"
  }
] as const;

function getReferenceStore() {
  if (!globalThis.__designpromReferenceSiteStore) {
    globalThis.__designpromReferenceSiteStore = new Map();
  }

  return globalThis.__designpromReferenceSiteStore;
}

function getScreenshotStore() {
  if (!globalThis.__designpromReferenceScreenshotStore) {
    globalThis.__designpromReferenceScreenshotStore = new Map();
  }

  return globalThis.__designpromReferenceScreenshotStore;
}

function pruneExpiredEntries() {
  const now = Date.now();

  for (const [id, entry] of getReferenceStore()) {
    if (entry.expiresAt < now) {
      getReferenceStore().delete(id);
    }
  }

  for (const [id, entry] of getScreenshotStore()) {
    if (entry.expiresAt < now) {
      getScreenshotStore().delete(id);
    }
  }
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x27;/g, "'");
}

function stripHtml(value: string) {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function normalizeDuckDuckGoUrl(rawHref: string) {
  const href = decodeHtml(rawHref.trim());
  const normalizedHref = href.startsWith("//") ? `https:${href}` : href;

  try {
    const parsedUrl = new URL(normalizedHref, "https://html.duckduckgo.com");
    const redirectTarget = parsedUrl.searchParams.get("uddg");

    if (redirectTarget) {
      return decodeURIComponent(redirectTarget);
    }

    return parsedUrl.toString();
  } catch {
    return normalizedHref;
  }
}

function isValidReferenceUrl(urlValue: string) {
  try {
    const parsedUrl = new URL(urlValue);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return false;
    }

    if (
      hostname === "localhost" ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".lan")
    ) {
      return false;
    }

    if (filteredDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function domainFromUrl(urlValue: string) {
  try {
    return new URL(urlValue).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function buildSearchQuery(prompt: string) {
  const trimmedPrompt = prompt.trim();
  const visual = resolvePromptSemanticPreview(trimmedPrompt);
  const promptLower = trimmedPrompt.toLowerCase();
  const queryParts = [trimmedPrompt];

  if (!promptLower.includes("website") && !promptLower.includes("landing")) {
    queryParts.push(`${visual.pageType.toLowerCase()} website design`);
  }

  if (!promptLower.includes("inspiration")) {
    queryParts.push("design inspiration");
  }

  return queryParts.join(" ");
}

function rankReferenceResult(
  result: Pick<ReferenceSiteMatch, "domain" | "snippet" | "title" | "url">,
  prompt: string
) {
  const promptLower = prompt.toLowerCase();
  const haystack = `${result.title} ${result.snippet} ${result.url}`.toLowerCase();
  const promptWords = promptLower
    .split(/\s+/)
    .map((value) => value.trim())
    .filter((value) => value.length > 2);
  const matchedWords = promptWords.filter((word) => haystack.includes(word)).length;
  const domainBoost = designDomainBoost.some(
    (domain) => result.domain === domain || result.domain.endsWith(`.${domain}`)
  )
    ? 8
    : 0;

  return domainBoost + matchedWords;
}

function scorePromptWords(haystack: string, prompt: string) {
  const promptWords = prompt
    .toLowerCase()
    .split(/\s+/)
    .map((value) => value.trim())
    .filter((value) => value.length > 2);

  return promptWords.filter((word) => haystack.includes(word)).length;
}

function parseDuckDuckGoResults(html: string, query: string) {
  const anchorPattern =
    /<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  const results: Array<Pick<ReferenceSiteMatch, "domain" | "snippet" | "title" | "url">> = [];
  let match: RegExpExecArray | null = anchorPattern.exec(html);

  while (match && results.length < DDG_RESULT_LIMIT) {
    const rawUrl = normalizeDuckDuckGoUrl(match[1] ?? "");
    const title = stripHtml(match[2] ?? "");

    if (!title || !isValidReferenceUrl(rawUrl)) {
      match = anchorPattern.exec(html);
      continue;
    }

    const resultStart = match.index;
    const resultSlice = html.slice(resultStart, resultStart + 1400);
    const snippetMatch = resultSlice.match(
      /<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>|<div[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/div>/
    );
    const snippet = stripHtml(snippetMatch?.[1] ?? snippetMatch?.[2] ?? "");
    const domain = domainFromUrl(rawUrl);

    if (!domain) {
      match = anchorPattern.exec(html);
      continue;
    }

    results.push({
      domain,
      snippet,
      title,
      url: rawUrl
    });

    match = anchorPattern.exec(html);
  }

  return results
    .sort((left, right) => rankReferenceResult(right, query) - rankReferenceResult(left, query))
    .filter((result, index, array) => array.findIndex((entry) => entry.domain === result.domain) === index)
    .slice(0, REFERENCE_RESULT_LIMIT);
}

function buildStoredResults(
  results: Array<Pick<ReferenceSiteMatch, "domain" | "snippet" | "title" | "url">>,
  query: string,
  source: ReferenceSiteMatch["source"]
) {
  const expiresAt = Date.now() + RESULT_TTL_MS;

  return results.map((result) => {
    const id = randomUUID();
    const entry: InternalReferenceSiteMatch = {
      ...result,
      expiresAt,
      id,
      query,
      source
    };

    getReferenceStore().set(id, entry);

    return {
      domain: entry.domain,
      id: entry.id,
      query: entry.query,
      snippet: entry.snippet,
      source: entry.source,
      title: entry.title,
      url: entry.url
    };
  });
}

function buildFallbackResults(prompt: string, query: string) {
  const visual = resolvePromptSemanticPreview(prompt);

  return curatedReferenceSites
    .map((site) => {
      const domain = domainFromUrl(site.url);
      const haystack = `${site.title} ${site.snippet} ${site.tags.join(" ")}`.toLowerCase();
      let score = rankReferenceResult(
        {
          domain,
          snippet: site.snippet,
          title: site.title,
          url: site.url
        },
        prompt
      );

      score += scorePromptWords(haystack, prompt) * 2;

      if (haystack.includes(visual.brand.toLowerCase())) {
        score += 8;
      }

      if (haystack.includes(visual.pageType.toLowerCase())) {
        score += 5;
      }

      if (haystack.includes(visual.tone.toLowerCase())) {
        score += 4;
      }

      if (haystack.includes(visual.vibe.toLowerCase())) {
        score += 4;
      }

      return {
        domain,
        score,
        snippet: site.snippet,
        title: site.title,
        url: site.url
      };
    })
    .sort((left, right) => right.score - left.score)
    .filter((result, index, array) => array.findIndex((entry) => entry.domain === result.domain) === index)
    .slice(0, REFERENCE_RESULT_LIMIT)
    .map(({ score: _score, ...result }) => result);
}

export async function searchReferenceSites(prompt: string) {
  pruneExpiredEntries();

  const query = buildSearchQuery(prompt);
  try {
    const response = await fetch(
      `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        },
        next: { revalidate: 0 }
      }
    );

    if (response.ok) {
      const html = await response.text();
      const parsedResults = parseDuckDuckGoResults(html, query);

      if (parsedResults.length > 0) {
        return {
          query,
          results: buildStoredResults(parsedResults, query, "search"),
          source: "search" as const
        };
      }
    }
  } catch {
    // Fall through to curated matches.
  }

  return {
    query,
    results: buildStoredResults(buildFallbackResults(prompt, query), query, "fallback"),
    source: "fallback" as const
  };
}

export function getReferenceSiteById(id: string) {
  pruneExpiredEntries();
  return getReferenceStore().get(id);
}

async function getBrowser() {
  if (!globalThis.__designpromReferenceBrowserPromise) {
    globalThis.__designpromReferenceBrowserPromise = chromium.launch({
      executablePath: process.env.PLAYWRIGHT_CHROME_PATH || DEFAULT_CHROME_PATH,
      headless: true
    });
  }

  return globalThis.__designpromReferenceBrowserPromise;
}

function buildFallbackCaptureSvg(title: string, domain: string) {
  const safeTitle = title.replace(/[<&>"]/g, "");
  const safeDomain = domain.replace(/[<&>"]/g, "");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="960" viewBox="0 0 1440 960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1440" height="960" fill="#faf9f9"/>
  <rect x="44" y="44" width="1352" height="872" fill="#f5f3f3"/>
  <rect x="84" y="84" width="1272" height="64" fill="#e3e2e2"/>
  <rect x="84" y="190" width="620" height="44" fill="#000000"/>
  <rect x="84" y="264" width="892" height="20" fill="#7e7576"/>
  <rect x="84" y="302" width="712" height="20" fill="#7e7576"/>
  <rect x="84" y="380" width="400" height="260" fill="#ffffff"/>
  <rect x="522" y="380" width="400" height="260" fill="#ffffff"/>
  <rect x="960" y="380" width="312" height="260" fill="#ffffff"/>
  <text x="84" y="760" fill="#000000" font-family="Arial, sans-serif" font-size="46">${safeTitle}</text>
  <text x="84" y="818" fill="#7e7576" font-family="Arial, sans-serif" font-size="26">Capture unavailable. Open the live site: ${safeDomain}</text>
</svg>`;
}

export async function getReferenceSiteScreenshot(id: string) {
  pruneExpiredEntries();

  const cached = getScreenshotStore().get(id);

  if (cached && cached.expiresAt > Date.now()) {
    return cached;
  }

  const result = getReferenceSiteById(id);

  if (!result) {
    throw new Error("Reference site not found.");
  }

  try {
    const browser = await getBrowser();
    const page = await browser.newPage({
      deviceScaleFactor: 1.75,
      viewport: {
        height: SCREENSHOT_HEIGHT,
        width: SCREENSHOT_WIDTH
      }
    });

    await page.goto(result.url, {
      timeout: 35_000,
      waitUntil: "domcontentloaded"
    });
    await page.waitForTimeout(2200);

    const body = await page.screenshot({
      fullPage: false,
      quality: 84,
      type: "jpeg"
    });

    await page.close();

    const entry = {
      body,
      contentType: "image/jpeg",
      expiresAt: Date.now() + SCREENSHOT_TTL_MS
    };

    getScreenshotStore().set(id, entry);

    return entry;
  } catch {
    const fallback = Buffer.from(buildFallbackCaptureSvg(result.title, result.domain));
    const entry = {
      body: fallback,
      contentType: "image/svg+xml",
      expiresAt: Date.now() + SCREENSHOT_TTL_MS
    };

    getScreenshotStore().set(id, entry);

    return entry;
  }
}
