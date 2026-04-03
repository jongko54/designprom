import { PreviewSurface } from "@/components/ui/preview-surface";
import { ResultWallItem } from "@/data/site";

type ResultWallProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  items: ResultWallItem[];
};

export function ResultWall({
  eyebrow,
  title,
  intro,
  items
}: ResultWallProps) {
  return (
    <section className="content-section result-wall-shell">
      <div className="section-heading">
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      <div className="result-wall">
        {items.map((item) => (
          <article className={`result-tile ${item.size}`} key={item.id}>
            <div className="micro-row">
              <span>{item.meta}</span>
              <span>{item.size}</span>
            </div>
            <PreviewSurface
              image={item.image}
              label={item.title.split(" ")[0]}
              meta={item.meta}
              size="board"
              tone={item.tone}
            />
            <div className="card-heading">
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
