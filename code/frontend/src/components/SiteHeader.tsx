import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { T, useContent, useList } from "../editable";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";
import MobileMenu from "./MobileMenu";
import Icon from "./Icon";
import { digits } from "./ContactDock";

/**
 * The header: the mark and the name on the left edge, the links on the right,
 * and the studio's own telephone number as the one button — what every
 * visitor to this site is here to do. It sits over the home page's hero
 * photograph and on the ground everywhere else.
 */
export default function SiteHeader({ over = false }: { over?: boolean }) {
  const links = useList<{ label: string; href: string }>("nav.links");
  const name = useContent("site.name");
  const phone = useContent("contact.phone");
  const [open, setOpen] = useState(false);
  const tel = digits(phone);
  return (
    <header
      className={`${over ? "absolute inset-x-0 top-0 z-30" : "relative border-b border-line"} h-[var(--header-h)]`}
    >
      <div className="mx-auto flex h-full max-w-page items-center justify-between gap-[var(--space-6)] px-[var(--gutter)]">
        <Link to="/" aria-label={name} className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-[var(--space-8)] lg:flex">
          {links.map((l, i) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) =>
                `label whitespace-nowrap ${isActive ? "text-ink" : "text-ink-soft"} hover:text-ink`
              }
            >
              <T k={`nav.links.${i}.label`} />
            </NavLink>
          ))}
          {tel && (
            <a
              href={`tel:${tel}`}
              data-testid="header-call"
              className="flex items-center gap-2 whitespace-nowrap bg-accent-strong px-[var(--space-4)] py-[var(--space-2)] text-sm text-accent-ink"
            >
              <Icon name="phone" size={16} />
              <span className="tabular">{phone}</span>
            </a>
          )}
        </nav>
        <div className="lg:hidden">
          <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)}>
        {links.map((l, i) => (
          <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="font-display text-3xl text-ink">
            <T k={`nav.links.${i}.label`} />
          </Link>
        ))}
        {tel && (
          <a href={`tel:${tel}`} className="mt-[var(--space-4)] flex items-center gap-2 self-start bg-accent-strong px-[var(--space-6)] py-[var(--space-3)] text-accent-ink">
            <Icon name="phone" size={18} />
            <span className="tabular">{phone}</span>
          </a>
        )}
      </MobileMenu>
    </header>
  );
}
