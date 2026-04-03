import { CategoryCard } from "@/components/cards/category-card";
import type { CategoryCard as CategoryCardType } from "@/data/site";

type CategoryGridProps = {
  title: string;
  intro: string;
  items: CategoryCardType[];
  compact?: boolean;
};

export function CategoryGrid({
  title,
  intro,
  items,
  compact = false
}: CategoryGridProps) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <div className="eyebrow">Curated library</div>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className={compact ? "card-grid compact" : "card-grid"}>
        {items.map((item) => (
          <CategoryCard item={item} key={item.slug} />
        ))}
      </div>
    </section>
  );
}
