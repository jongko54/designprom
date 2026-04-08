import Link from "next/link";

type SearchContentSectionProps = {
  eyebrow: string;
  intro: string;
  links?: Array<{
    description: string;
    href: string;
    label: string;
  }>;
  points?: string[];
  title: string;
};

export function SearchContentSection({
  eyebrow,
  intro,
  links = [],
  points = [],
  title
}: SearchContentSectionProps) {
  return (
    <section className="content-section search-content-shell">
      <div className="section-heading">
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="search-content-grid">
        {points.length ? (
          <article className="search-content-card">
            <div className="micro-row">
              <span>Key points</span>
              <span>{points.length} items</span>
            </div>
            <ul className="bullet-list search-content-list">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ) : null}
        {links.length ? (
          <article className="search-content-card">
            <div className="micro-row">
              <span>Useful pages</span>
              <span>{links.length} links</span>
            </div>
            <div className="search-content-links">
              {links.map((link) => (
                <Link className="search-content-link" href={link.href} key={link.href}>
                  <strong>{link.label}</strong>
                  <p>{link.description}</p>
                </Link>
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
