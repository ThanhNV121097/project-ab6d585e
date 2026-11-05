import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { T, useContent } from "../editable";
import { signIn, useSession } from "../lib/session";
import SectionLabel from "../components/SectionLabel";
import Icon from "../components/Icon";
import { Picture } from "../picture";
import { usePageMeta } from "../seo";

/**
 * Where the owner signs in to manage the pieces. One account — theirs — which
 * is what the brief left open and what the Studio's Check asks them to
 * confirm; the empty row for it is src/data/accounts.json.
 *
 * Not a bare form in white space: the studio's own photograph takes half the
 * screen, and the page says plainly what is behind the door.
 */
export default function SignIn() {
  usePageMeta("pages.signin.title", "pages.signin.description");
  const navigate = useNavigate();
  const session = useSession();
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const needEmail = useContent("signin.problem");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      setProblem(needEmail);
      return;
    }
    signIn(email.trim(), email.trim().split("@")[0], "owner");
    navigate("/cms");
  }

  const field =
    "w-full appearance-none rounded border border-field bg-surface px-[var(--space-4)] py-[var(--space-3)] text-ink";

  return (
    <div className="grid gap-[var(--space-12)] lg:grid-cols-2 lg:items-stretch lg:gap-0">
      <div className="mx-auto w-full max-w-page px-[var(--gutter)] lg:ml-auto lg:mr-0 lg:max-w-[34rem] lg:py-[var(--space-16)]">
        <SectionLabel k="pages.signin.label" />
        <T k="pages.signin.heading" as="h1" className="mt-[var(--space-4)] max-w-[14ch] text-[length:var(--size-h2)]" />
        <T k="pages.signin.sub" as="p" className="mt-[var(--space-4)] max-w-[44ch] text-ink-soft" />
        <ul className="mt-[var(--space-6)] flex flex-col gap-[var(--space-3)] text-sm text-ink-soft">
          {["add", "price", "sold"].map((k) => (
            <li key={k} className="flex items-start gap-[var(--space-3)]">
              <Icon name="check" size={15} className="mt-0.5 text-accent" />
              <T k={`pages.signin.can.${k}`} />
            </li>
          ))}
        </ul>

        {session ? (
          <Link
            to="/cms"
            data-testid="go-to-cms"
            className="mt-[var(--space-8)] inline-flex items-center gap-[var(--space-3)] bg-accent px-[var(--space-6)] py-[var(--space-3)] text-accent-ink"
          >
            <T k="pages.signin.continue" />
            <Icon name="arrow" size={16} />
          </Link>
        ) : (
          <form onSubmit={submit} className="mt-[var(--space-8)] flex max-w-[26rem] flex-col gap-[var(--space-4)]">
            <label className="flex flex-col gap-[var(--space-2)] text-sm">
              <T k="signin.email" className="text-ink-soft" />
              <input
                id="signin-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
              />
            </label>
            <label className="flex flex-col gap-[var(--space-2)] text-sm">
              <T k="signin.password" className="text-ink-soft" />
              <input id="signin-password" name="password" type="password" autoComplete="current-password" className={field} />
            </label>
            {problem && <p role="alert" className="text-sm text-accent">{problem}</p>}
            <button
              type="submit"
              data-testid="signin-submit"
              className="self-start bg-accent px-[var(--space-8)] py-[var(--space-3)] text-accent-ink"
            >
              <T k="signin.submit" />
            </button>
            <T k="signin.note" as="p" className="text-sm text-ink-soft" />
          </form>
        )}
      </div>
      <Picture
        src="/images/hands.jpg"
        alt="A piece being thrown at the studio"
        className="h-[18rem] w-full object-cover lg:h-full lg:min-h-[32rem]"
        width={1280}
        height={914}
      />
    </div>
  );
}
