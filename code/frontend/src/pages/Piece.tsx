import { Link, useParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection, useRecord } from "../data";
import ProductImage from "../components/ProductImage";
import PieceCard from "../components/PieceCard";
import SectionLabel from "../components/SectionLabel";
import Price from "../components/Price";
import Icon from "../components/Icon";
import Grid from "../components/Grid";
import { digits } from "../components/ContactDock";
import { usePageMeta } from "../seo";
import type { Piece } from "../types";

/**
 * One piece. The photograph takes the left half of the screen and bleeds off
 * the left edge; the spec list and the two ways to ring sit beside it, on one
 * edge, with the price set large. Everything a caller decides on is in the
 * first screen.
 */
export default function PiecePage() {
  usePageMeta("pages.piece.title", "pages.piece.description");
  const { id } = useParams();
  const { item } = useRecord<Piece>("pieces", id);
  const phone = useContent("contact.phone");
  const zalo = useContent("contact.zalo");
  const tel = digits(phone);
  const chat = digits(zalo);
  const words = {
    kind: useContent("pieces.kind"),
    glaze: useContent("pieces.glaze"),
    size: useContent("pieces.size"),
    state: useContent("pieces.state"),
    sold: useContent("pieces.sold"),
    here: useContent("pieces.here"),
  };
  const { items: others } = useCollection<Piece>("pieces", {
    where: { kind: item?.kind ?? "", status: "available" },
    pageSize: 8,
  });

  if (!item) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)]">
        <T k="pieces.missing" as="h1" className="text-[length:var(--size-h2)]" />
        <Link to="/pieces" className="mt-[var(--space-6)] inline-flex items-center gap-2 text-accent-strong">
          <Icon name="back" size={16} />
          <T k="pieces.back" />
        </Link>
      </div>
    );
  }

  const sold = item.status === "sold";
  const rest = others.filter((p) => p.id !== item.id).slice(0, 3);

  return (
    <div data-record={`pieces:${item.id}`}>
      <div className="grid gap-[var(--space-12)] lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-[var(--space-16)]">
        {/* Bled off the left edge: no gutter on that side at lg and up. */}
        <div className="lg:pr-0">
          <ProductImage src={item.image} alt={item.name} aspect="1/1" eager slot={`/images/pieces-${item.id}.png`} />
        </div>

        <div className="mx-auto w-full max-w-page px-[var(--gutter)] lg:mx-0 lg:pl-0 lg:pr-[var(--gutter)]">
          <Link to="/pieces" className="label inline-flex items-center gap-2 text-ink-soft hover:text-ink">
            <Icon name="back" size={14} />
            <T k="pieces.back" />
          </Link>
          <h1 className="mt-[var(--space-6)] max-w-[18ch] text-[length:var(--size-h2)]">{item.name}</h1>
          <p className="mt-[var(--space-4)] max-w-[48ch] text-ink-soft">{item.detail}</p>

          <div className="mt-[var(--space-8)] flex items-baseline justify-between gap-[var(--space-4)] border-t border-line pt-[var(--space-4)]">
            <T k="pieces.price" className="label text-ink-soft" />
            <span data-testid="piece-price">
              <Price amount={item.price} sold={sold} size="large" className="font-display" />
            </span>
          </div>
          <dl className="border-b border-line">
            <Row term={words.kind} value={item.kind} icon="tag" />
            <Row term={words.glaze} value={item.glaze} icon="quality" />
            <Row term={words.size} value={item.size} icon="package" />
            <Row term={words.state} value={sold ? words.sold : words.here} icon={sold ? "info" : "check"} />
          </dl>

          <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-3)] sm:flex-row">
            {tel && (
              <a
                href={`tel:${tel}`}
                data-testid="piece-call"
                className="inline-flex items-center justify-center gap-[var(--space-3)] whitespace-nowrap bg-accent-strong px-[var(--space-6)] py-[var(--space-4)] text-accent-ink"
              >
                <Icon name="phone" size={18} />
                <span className="tabular">{phone}</span>
              </a>
            )}
            {chat && (
              <a
                href={`https://zalo.me/${chat}`}
                target="_blank"
                rel="noreferrer"
                data-testid="piece-zalo"
                className="inline-flex items-center justify-center gap-[var(--space-3)] whitespace-nowrap border border-field px-[var(--space-6)] py-[var(--space-4)] text-ink hover:border-accent hover:text-accent-strong"
              >
                <Icon name="chat" size={18} />
                <T k="pieces.zalo" />
              </a>
            )}
          </div>
          <T k="pieces.ask" as="p" className="mt-[var(--space-4)] max-w-[44ch] text-sm text-ink-soft" />
        </div>
      </div>

      {rest.length >= 3 && (
        <section className="mx-auto mt-[calc(var(--space-16)+var(--space-16))] max-w-page px-[var(--gutter)]">
          <SectionLabel k="pieces.also" />
          <Grid max={3} phone={2} className="mt-[var(--space-8)]">
            {rest.map((p) => (
              <PieceCard key={p.id} piece={p} />
            ))}
          </Grid>
        </section>
      )}
    </div>
  );
}

function Row({ term, value, icon }: { term: string; value: string; icon: "tag" | "quality" | "package" | "check" | "info" }) {
  return (
    <div className="flex items-baseline justify-between gap-[var(--space-6)] border-t border-line py-[var(--space-3)]">
      <dt className="label flex items-center gap-[var(--space-2)] text-ink-soft">
        <Icon name={icon} size={14} className="text-accent" />
        {term}
      </dt>
      <dd className="text-right text-sm text-ink">{value}</dd>
    </div>
  );
}
