import { Link } from "react-router-dom";
import { T } from "../editable";
import Icon from "./Icon";

/** What the private area shows somebody who is not signed in. */
export default function NotSignedIn() {
  return (
    <div className="flex min-h-screen items-center bg-ground px-[var(--gutter)] font-body text-ink">
      <div className="mx-auto w-full max-w-page">
        <T k="cms.locked.heading" as="h1" className="max-w-[18ch] text-[length:var(--size-h2)]" />
        <T k="cms.locked.sub" as="p" className="mt-[var(--space-4)] max-w-[44ch] text-ink-soft" />
        <Link
          to="/sign-in"
          data-testid="cms-sign-in"
          className="mt-[var(--space-8)] inline-flex items-center gap-[var(--space-3)] bg-accent px-[var(--space-6)] py-[var(--space-3)] text-accent-ink"
        >
          <Icon name="lock" size={16} />
          <T k="cms.locked.signin" />
        </Link>
      </div>
    </div>
  );
}
