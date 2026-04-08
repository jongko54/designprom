"use client";

import { useState } from "react";

import type { PublishAsset } from "@/lib/publish-assets";

type PublishActionsProps = {
  assets: PublishAsset[];
  className?: string;
  shareText?: string;
  shareTitle: string;
  shareUrl?: string;
  zipName: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function PublishActions({
  assets,
  className,
  shareText,
  shareTitle,
  shareUrl,
  zipName
}: PublishActionsProps) {
  const [status, setStatus] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  async function handleDownloadZip() {
    try {
      setIsPublishing(true);
      setStatus("Preparing ZIP package...");

      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      for (const asset of assets) {
        if (asset.kind === "text") {
          zip.file(asset.filename, asset.content);
          continue;
        }

        if (asset.kind === "json") {
          zip.file(asset.filename, `${JSON.stringify(asset.value, null, 2)}\n`);
          continue;
        }

        const response = await fetch(asset.url);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${asset.filename}`);
        }

        const blob = await response.blob();
        zip.file(asset.filename, blob);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = `${slugify(zipName) || "designprom-publish"}.zip`;
      anchor.click();
      URL.revokeObjectURL(href);
      setStatus("ZIP downloaded");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not prepare the ZIP package."
      );
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleShare() {
    const resolvedShareUrl = shareUrl
      ? new URL(shareUrl, window.location.origin).toString()
      : window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          text: shareText,
          title: shareTitle,
          url: resolvedShareUrl
        });
        setStatus("Share sheet opened");
        return;
      }

      await navigator.clipboard.writeText(resolvedShareUrl);
      setStatus("Page link copied");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not share this page."
      );
    }
  }

  return (
    <div className={className ? `publish-actions ${className}` : "publish-actions"}>
      <div className="card-actions">
        <button
          className="primary-button button-reset"
          disabled={isPublishing}
          onClick={handleDownloadZip}
          type="button"
        >
          {isPublishing ? "Packaging ZIP..." : "Download ZIP"}
        </button>
        <button className="ghost-button button-reset" onClick={handleShare} type="button">
          Share
        </button>
      </div>
      {status ? <p className="publish-status">{status}</p> : null}
    </div>
  );
}
