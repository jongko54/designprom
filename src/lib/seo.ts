import type { Metadata } from "next";

const fallbackSiteUrl = "https://designprom.vercel.app";

export const siteConfig = {
  description:
    "Prompt-first archive for AI design examples, brand DNA systems, website prompt templates, and generated output references.",
  name: "designprom",
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, "")
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

type BuildMetadataInput = {
  description: string;
  images?: Array<{ alt?: string; url: string }>;
  keywords?: string[];
  noIndex?: boolean;
  path?: string;
  title: string;
  type?: "article" | "website";
};

export function buildMetadata({
  description,
  images,
  keywords = [],
  noIndex = false,
  path = "/",
  title,
  type = "website"
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const openGraphImages = images?.map((image) => ({
    alt: image.alt,
    url: image.url.startsWith("http") ? image.url : absoluteUrl(image.url)
  }));

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical
    },
    openGraph: {
      description,
      images: openGraphImages,
      siteName: siteConfig.name,
      title,
      type,
      url: canonical
    },
    robots: noIndex
      ? {
          follow: true,
          index: false
        }
      : {
          follow: true,
          index: true
        },
    twitter: {
      card: openGraphImages?.length ? "summary_large_image" : "summary",
      description,
      images: openGraphImages?.map((image) => image.url),
      title
    }
  };
}
