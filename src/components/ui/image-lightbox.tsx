"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type ImageLightboxProps = {
  alt: string;
  className?: string;
  height?: number;
  src: string;
  style?: CSSProperties;
  width?: number;
};

export function ImageLightbox({
  alt,
  className,
  height,
  src,
  style,
  width
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <>
      <button
        aria-label={`Open ${alt}`}
        className="lightbox-trigger button-reset"
        onClick={() => setOpen(true)}
        type="button"
      >
        <img
          alt={alt}
          className={className}
          height={height}
          loading="lazy"
          src={src}
          style={style}
          width={width}
        />
      </button>
      {open ? (
        <div
          className="lightbox-overlay"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="lightbox-dialog"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Close image preview"
              className="lightbox-close button-reset"
              onClick={() => setOpen(false)}
              type="button"
            >
              Close
            </button>
            <img
              alt={alt}
              className="lightbox-image"
              height={height}
              src={src}
              style={style}
              width={width}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
