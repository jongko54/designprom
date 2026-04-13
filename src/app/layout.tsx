import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { absoluteUrl, siteConfig } from "@/lib/seo";

import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "designprom",
    template: "%s | designprom"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: absoluteUrl("/")
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    title: siteConfig.name
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          content="eZ0QmYFlHwM3o-uAXMoatDsRjZmdrkTtz3UQ_Cju1Yo"
          name="google-site-verification"
        />
        <meta
          content="096d79cdf7bda615229bc7cd80afdf51eaa2b375"
          name="naver-site-verification"
        />
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        {children}
        <Script
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3907699207711762"
          strategy="lazyOnload"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
