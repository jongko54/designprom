import type { Metadata } from "next";

const fallbackSiteUrl = "https://designprom.vercel.app";

export const siteConfig = {
  description:
    "Prompt-first archive for AI design examples, brand DNA systems, website prompt templates, and generated output references.",
  name: "designprom",
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, "")
};

export type SeoFaqItem = {
  answer: string;
  question: string;
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

export function buildFaqSchema(items: SeoFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      },
      name: item.question
    }))
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(item.path),
      name: item.name,
      position: index + 1
    }))
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: siteConfig.description,
    name: siteConfig.name,
    url: siteConfig.url
  };
}
