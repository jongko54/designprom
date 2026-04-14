import Link from "next/link";

export function ExperimentalShowcase() {
  return (
    <section className="content-section showcase-shell">
      <div className="section-heading">
        <div className="eyebrow">Styles lab</div>
        <h2>
          From Bauhaus geometry to
          <span className="heading-mix"> kinetic type and modern-art color</span>
        </h2>
        <p>
          This tab is where the broader visual language lives. Use it to compare
          3D depth, Bauhaus color blocks, micrographics, modern-art modularity,
          and motion-driven type systems before you write a prompt.
        </p>
      </div>
      <div className="showcase-grid">
        <article className="showcase-card ascii-card">
          <div className="card-topline">
            <span>01</span>
            <span>Bauhaus Grid</span>
          </div>
          <pre>{String.raw`[:: prompt field ::]
< type > < motion >
< mood > < density >`}</pre>
        </article>
        <article className="showcase-card micro-card">
          <div className="card-topline">
            <span>02</span>
            <span>Micrographic</span>
          </div>
          <div className="micrographic-grid compact-grid">
            <span>axis</span>
            <span>001</span>
            <span>tone</span>
            <span>002</span>
            <span>scan</span>
            <span>003</span>
          </div>
        </article>
        <article className="showcase-card mixed-card">
          <div className="card-topline">
            <span>03</span>
            <span>Modern Art</span>
          </div>
          <h3 className="mixed-stack">
            Color
            <span>systems</span>
            <em>with rhythm</em>
          </h3>
        </article>
        <article className="showcase-card kinetic-card">
          <div className="card-topline">
            <span>04</span>
            <span>Kinetic Type</span>
          </div>
          <div className="kinetic-stack" aria-hidden="true">
            <span>move</span>
            <span>scan</span>
            <span>repeat</span>
          </div>
        </article>
        <article className="showcase-card sculpture-card">
          <div className="card-topline">
            <span>05</span>
            <span>3D Sculpture</span>
          </div>
          <div className="sculpture-mini" aria-hidden="true">
            <span>DNA</span>
            <span>FORM</span>
          </div>
        </article>
      </div>
      <div className="card-actions showcase-lab-actions">
        <Link className="primary-button" href="/analysis" prefetch={false}>
          Open 3D Preview
        </Link>
        <p>
          Use the live React Three Fiber demo when you need an actual 3D hero instead of
          a flat mock or prompt-only direction.
        </p>
      </div>
    </section>
  );
}
