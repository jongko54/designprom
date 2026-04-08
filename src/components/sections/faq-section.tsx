import type { SeoFaqItem } from "@/lib/seo";

type FaqSectionProps = {
  eyebrow: string;
  intro?: string;
  items: SeoFaqItem[];
  title: string;
};

export function FaqSection({
  eyebrow,
  intro,
  items,
  title
}: FaqSectionProps) {
  return (
    <section className="content-section faq-shell">
      <div className="section-heading">
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      <div className="faq-grid">
        {items.map((item) => (
          <article className="faq-card" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
