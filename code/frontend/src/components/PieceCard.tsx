import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import Price from "./Price";
import { useContent } from "../editable";
import type { Piece } from "../types";

/**
 * One piece in a grid: the picture IS the card — a cut-out on its own warm
 * tile, edge to edge — and under it a single hairline row with the name and
 * the glaze on the left and the price on the right, so a column of cards
 * lines its digits up. No border round the card, no shadow, no label chip.
 */
export default function PieceCard({ piece, eager = false }: { piece: Piece; eager?: boolean }) {
  const sold = piece.status === "sold";
  const soldWord = useContent("pieces.sold");
  return (
    <Link
      to={`/pieces/${piece.id}`}
      data-record={`pieces:${piece.id}`}
      data-testid={`piece-${piece.id}`}
      className="group block focus:outline-none"
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-[1.02] group-focus-visible:scale-[1.02]">
          <ProductImage src={piece.image} alt={piece.name} aspect="1/1" eager={eager} slot={`/images/pieces-${piece.id}.png`} />
        </div>
      </div>
      <div className="mt-[var(--space-3)] flex items-baseline justify-between gap-[var(--space-4)] border-t border-line pt-[var(--space-3)]">
        <span className="min-w-0">
          <span className="block truncate font-display text-base text-ink group-hover:text-accent-strong">{piece.name}</span>
          <span className="mt-1 block truncate text-sm text-ink-soft">{sold ? soldWord : piece.glaze}</span>
        </span>
        <Price amount={piece.price} sold={sold} />
      </div>
    </Link>
  );
}
