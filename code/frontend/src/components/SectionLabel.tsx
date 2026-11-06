import { T } from "../editable";

/**
 * A section's label: 11px small-caps, letterspaced, with the accent hairline
 * under it. The rule is one of the three places the accent appears.
 */
export default function SectionLabel({ k, className = "" }: { k: string; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
      <T k={k} className="label text-ink-soft" />
      <span aria-hidden="true" className="block h-px w-10 bg-accent" />
    </span>
  );
}
