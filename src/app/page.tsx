import { SiteHeader } from "@/components/layout/site-header";
import { HomeFramerPortfolioWall } from "@/components/sections/home-framer-portfolio-wall";

export default function HomePage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <HomeFramerPortfolioWall />
    </main>
  );
}
