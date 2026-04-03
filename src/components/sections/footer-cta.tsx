import Link from "next/link";

export function FooterCta() {
  return (
    <section className="footer-cta">
      <div>
        <div className="eyebrow">Archive principle</div>
        <h2>Start from a case file, not a blank canvas.</h2>
        <p>
          The product should help users read a prompt like a design artifact,
          inspect the likely outcome, and then move into generation with less
          guesswork.
        </p>
      </div>
      <div className="hero-actions">
        <Link className="primary-button" href="/collections">
          Browse Collections
        </Link>
        <Link className="tertiary-link" href="/docs">
          Review Docs
        </Link>
      </div>
    </section>
  );
}
