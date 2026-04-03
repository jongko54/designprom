export function Hero() {
  return (
    <section className="hero-panel science-guide-hero">
      <div className="hero-grid science-guide-grid">
        <div className="hero-copy-column science-guide-copy science-guide-copy-minimal">
          <h1 className="science-guide-title">AI Design Guide</h1>
        </div>

        <div className="hero-stage science-stage" aria-hidden="true">
          <div className="science-stage-world">
            <div className="science-stage-grid" />
            <div className="science-stage-glow science-glow-a" />
            <div className="science-stage-glow science-glow-b" />
            <div className="science-stage-ring science-ring-a" />
            <div className="science-stage-ring science-ring-b" />
            <div className="science-stage-core">
              <div className="science-core-shell">
                <div className="science-core-orb" />
                <div className="science-core-lens" />
              </div>
            </div>
            <div className="science-preview-stack">
              <div className="science-preview-plate plate-back" />
              <div className="science-preview-plate plate-mid" />
              <figure className="science-preview-screen">
                <img
                  alt="Stitch-generated AI design guide landing page inspired by cinematic science exhibit staging."
                  className="science-preview-image"
                  height={7200}
                  loading="lazy"
                  src="/stitch-exports/real/ai-design-guide-science-hero.png"
                  width={2880}
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
