import Link from "next/link";

export function HomePhilosophy() {
  return (
    <section className="content-section home-philosophy-shell">
      <div className="section-heading">
        <div className="eyebrow">What this site does</div>
        <h2>A simple guide for AI website prompts</h2>
        <p>
          The homepage introduces the system. Brand DNA, Template Analysis, and
          Prompt Builder do the real work.
        </p>
      </div>
      <div className="home-philosophy-grid">
        <article className="home-philosophy-card philosophy-dna">
          <div className="micro-row">
            <span>Tab 01</span>
            <span>Brand DNA</span>
          </div>
          <h3>Company-inspired design systems</h3>
          <p>
            Explore Apple, Figma, Airbnb, IBM, and TikTok-like directions with
            template examples and prompt framing notes.
          </p>
          <Link className="primary-button" href="/dna">
            Open Brand DNA
          </Link>
        </article>
        <article className="home-philosophy-card philosophy-styles">
          <div className="micro-row">
            <span>Tab 02</span>
            <span>Template Analysis</span>
          </div>
          <h3>Real page examples and portfolio template studies</h3>
          <p>
            Study company-style sample pages and Cargo-like portfolio templates
            before you write or remix a prompt.
          </p>
          <Link className="primary-button" href="/analysis">
            Open analysis
          </Link>
        </article>
        <article className="home-philosophy-card philosophy-builder">
          <div className="micro-row">
            <span>Tab 03</span>
            <span>Prompt Builder</span>
          </div>
          <h3>The main tool for generating prompt direction</h3>
          <p>
            Start from curated presets, remix them, and move from visual taste
            to concrete AI design prompts much faster.
          </p>
          <Link className="primary-button" href="/builder">
            Open Builder
          </Link>
        </article>
      </div>
    </section>
  );
}
