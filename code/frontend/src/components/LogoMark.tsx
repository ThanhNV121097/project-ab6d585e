/**
 * The studio's mark: three thrown rings seen from above — a bowl's rim, its
 * wall and its foot — drawn in currentColor so it follows the one palette.
 * The same shape is public/favicon.svg.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <circle cx="14" cy="14" r="12.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="2.75" fill="currentColor" />
    </svg>
  );
}
