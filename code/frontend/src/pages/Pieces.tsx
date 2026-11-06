import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { useTableQuery } from "../lib/table";
import PieceCard from "../components/PieceCard";
import SectionLabel from "../components/SectionLabel";
import Grid from "../components/Grid";
import Icon from "../components/Icon";
import { usePageMeta } from "../seo";
import type { Piece } from "../types";

const KINDS = ["Bowl", "Plate", "Vase", "Tea set"] as const;
const GLAZES = ["Hoa lam blue-and-white", "Men ngọc celadon", "Men rạn crackle", "Men màu painted colour"] as const;

/**
 * Everything on the shelf. The filters stand in a rail down the left at
 * 1024px and up — as a catalogue's do — and the grid runs beside them.
 */
export default function Pieces() {
  usePageMeta("pages.pieces.title", "pages.pieces.description");
  const t = useTableQuery();
  const kind = t.get("kind");
  const glaze = t.get("glaze");
  const showing = useContent("pieces.showing");
  const kindTitle = useContent("pieces.filter.kind");
  const glazeTitle = useContent("pieces.filter.glaze");
  const { items, total, hasMore, loading, loadMore } = useCollection<Piece>("pieces", {
    where: { kind, glaze, status: "available" },
    sort: t.sort || "price",
    pageSize: 12,
  });
  return (
    <div className="mx-auto max-w-page px-[var(--gutter)]">
      <SectionLabel k="pages.pieces.label" />
      <T k="pages.pieces.heading" as="h1" className="mt-[var(--space-4)] max-w-[16ch] text-[length:var(--size-h1)]" />
      <T k="pages.pieces.sub" as="p" className="mt-[var(--space-4)] max-w-[52ch] text-ink-soft" />

      <div className="mt-[var(--space-16)] grid gap-[var(--space-12)] lg:grid-cols-[14rem_1fr] lg:gap-[var(--space-16)]">
        <div className="lg:sticky lg:top-[var(--space-8)] lg:self-start">
          <Filters
            title={kindTitle}
            values={KINDS}
            chosen={kind}
            onChoose={(v) => t.set("kind", v)}
            testid={(v) => `kind-${v.toLowerCase().replace(/\s+/g, "-")}`}
          />
          <Filters
            title={glazeTitle}
            values={GLAZES}
            chosen={glaze}
            onChoose={(v) => t.set("glaze", v)}
            testid={(v) => `glaze-${v.split(" ")[1] ?? v}`}
            className="mt-[var(--space-8)]"
          />
          {t.filtering && (
            <button
              type="button"
              onClick={t.clear}
              data-testid="clear-filters"
              className="mt-[var(--space-8)] flex items-center gap-2 text-sm text-ink-soft underline hover:text-ink"
            >
              <Icon name="close" size={14} />
              <T k="pieces.filter.clear" />
            </button>
          )}
        </div>

        <div>
          <p className="tabular border-b border-line pb-[var(--space-3)] text-sm text-ink-soft" data-testid="pieces-total">
            {total} {showing}
            {kind ? ` · ${kind.toLowerCase()}` : ""}
            {glaze ? ` · ${glaze.toLowerCase()}` : ""}
          </p>
          {total === 0 && !loading ? (
            <T k="pieces.none" as="p" className="mt-[var(--space-12)] text-ink-soft" />
          ) : (
            <Grid max={3} phone={2} className="mt-[var(--space-8)]">
              {items.map((p) => (
                <PieceCard key={p.id} piece={p} />
              ))}
            </Grid>
          )}
          {loading && <T k="pieces.loading" as="p" className="mt-[var(--space-8)] text-sm text-ink-soft" />}
          {hasMore && (
            <button
              type="button"
              onClick={loadMore}
              data-testid="pieces-more"
              className="mt-[var(--space-12)] border border-field px-[var(--space-8)] py-[var(--space-3)] text-ink hover:border-accent hover:text-accent-strong"
            >
              <T k="pieces.more" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** One filter: a column of words with a rule, not a dropdown. */
function Filters({ title, values, chosen, onChoose, testid, className = "" }: {
  title: string;
  values: readonly string[];
  chosen: string;
  onChoose: (value: string) => void;
  testid: (value: string) => string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="label border-b border-line pb-[var(--space-2)] text-ink-soft">{title}</h2>
      <ul className="mt-[var(--space-3)] flex flex-wrap gap-x-[var(--space-4)] gap-y-[var(--space-2)] lg:flex-col">
        {values.map((v) => {
          const on = chosen === v;
          return (
            <li key={v}>
              <button
                type="button"
                onClick={() => onChoose(on ? "" : v)}
                data-testid={testid(v)}
                aria-pressed={on}
                className={`text-left text-sm ${on ? "text-accent-strong" : "text-ink-soft"} hover:text-ink`}
              >
                {v}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
