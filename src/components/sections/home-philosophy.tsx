import Link from "next/link";

export function HomePhilosophy() {
  return (
    <section className="content-section home-philosophy-shell">
      <div className="section-heading">
        <div className="eyebrow">What this site does</div>
        <h2>A simple guide for AI website prompts</h2>
        <p>
          The homepage introduces the system. Brand DNA, 3D Preview, and
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
            <span>3D Preview</span>
          </div>
          <h3>React Three Fiber previews and material system studies</h3>
          <p>
            Study glassmorphism, neo brutalism, claymorphism, and liquid glass
            directions inside an actual 3D preview workflow before you build.
          </p>
          <Link className="primary-button" href="/analysis">
            Open 3D Preview
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
