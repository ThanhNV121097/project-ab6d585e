import { formatPrice } from "../lib/format";

/**
 * A price, the most read word on this site: tabular, right-aligned, and in
 * the accent while the piece is still here. A sold piece keeps its price in
 * soft ink, because what it sold for is still the useful number.
 */
export default function Price({ amount, sold = false, size = "base", className = "" }: {
  amount: number;
  sold?: boolean;
  size?: "base" | "large";
  className?: string;
}) {
  return (
    <span
      className={`tabular whitespace-nowrap text-right ${sold ? "text-ink-soft line-through" : "text-accent"} ${className}`}
      style={size === "large" ? { fontSize: "var(--size-price)" } : undefined}
    >
      {formatPrice(amount)}
    </span>
  );
}
