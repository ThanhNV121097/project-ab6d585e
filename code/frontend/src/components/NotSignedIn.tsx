import { Link } from "react-router-dom";
import { T } from "../editable";
import Icon from "./Icon";
import { Picture } from "../picture";

/**
 * What the private area shows somebody who is not signed in: the studio's own
 * photograph beside the door, and what is behind it — not a sentence floating
 * in an empty screen.
 */
export default function NotSignedIn() {
  return (
    <div className="grid min-h-screen bg-ground font-body text-ink lg:grid-cols-2 lg:items-stretch">
      <div className="mx-auto flex w-full max-w-page flex-col justify-center px-[var(--gutter)] py-[var(--space-16)] lg:ml-auto lg:mr-0 lg:max-w-[34rem]">
        <T k="cms.locked.heading" as="h1" className="max-w-[18ch] text-[length:var(--size-h2)]" />
        <T k="cms.locked.sub" as="p" className="mt-[var(--space-4)] max-w-[44ch] text-ink-soft" />
        <ul className="mt-[var(--space-6)] flex flex-col gap-[var(--space-3)] text-sm text-ink-soft">
          {["add", "price", "sold"].map((k) => (
            <li key={k} className="flex items-start gap-[var(--space-3)]">
              <Icon name="check" size={15} className="mt-0.5 text-accent" />
              <T k={`pages.signin.can.${k}`} />
            </li>
          ))}
        </ul>
        <Link
          to="/sign-in"
          data-testid="cms-sign-in"
          className="mt-[var(--space-8)] inline-flex items-center gap-[var(--space-3)] self-start bg-accent-strong px-[var(--space-6)] py-[var(--space-3)] text-accent-ink"
        >
          <Icon name="lock" size={16} />
          <T k="cms.locked.signin" />
        </Link>
        <T k="cms.locked.note" as="p" className="mt-[var(--space-6)] max-w-[44ch] text-sm text-ink-soft" />
      </div>
      <Picture
        src="/images/shelf.jpg"
        alt="Finished pieces on the shelves at the studio"
        className="h-[18rem] w-full object-cover lg:h-full lg:min-h-[32rem]"
        width={1280}
        height={853}
      />
    </div>
  );
}
