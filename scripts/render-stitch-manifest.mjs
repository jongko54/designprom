#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const manifestPath = path.join(rootDir, "public", "stitch-exports", "real", "manifest.json");
const htmlDir = path.join(rootDir, "tmp", "stitch-html");
const sampleFilter = new Set(
  process.argv.slice(2).flatMap((value) => value.split(",")).filter(Boolean)
);

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true
});

async function downloadHtml(slug, htmlUrl) {
  const response = await fetch(htmlUrl);

  if (!response.ok) {
    throw new Error(`Failed to download HTML for ${slug}: ${response.status}`);
  }

  const html = await response.text();
  const filePath = path.join(htmlDir, `${slug}.html`);

  await writeFile(filePath, html);

  return filePath;
}

try {
  await mkdir(htmlDir, { recursive: true });

  const manifest = JSON.parse(await readFile(manifestPath, "utf8")).filter((entry) =>
    sampleFilter.size ? sampleFilter.has(entry.slug) : true
  );

  for (const entry of manifest) {
    const htmlPath = await downloadHtml(entry.slug, entry.htmlUrl);
    const page = await browser.newPage({
      deviceScaleFactor: 2,
      viewport: { width: 1440, height: 1600 }
    });

    await page.goto(`file://${htmlPath}`, {
      timeout: 120_000,
      waitUntil: "networkidle"
    });
    await page.screenshot({
      fullPage: true,
      path: path.join(rootDir, "public", "stitch-exports", "real", entry.fileName)
    });
    await page.close();

    console.log(`Rendered ${entry.slug} -> public/stitch-exports/real/${entry.fileName}`);
  }
} finally {
  await browser.close();
}
