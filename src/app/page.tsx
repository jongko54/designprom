import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { HomeFramerPortfolioWall } from "@/components/sections/home-framer-portfolio-wall";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI design prompt examples and website inspiration archive",
  description:
    "Browse AI design prompt examples, brand-inspired website directions, and portfolio-style archive pages built around reusable prompt language.",
  keywords: [
    "ai design prompts",
    "website prompt examples",
    "design inspiration archive",
    "portfolio prompt examples"
  ],
  path: "/"
});

export default function HomePage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <HomeFramerPortfolioWall />
    </main>
  );
}
