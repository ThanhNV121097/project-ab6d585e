import { Link } from "react-router-dom";
import { T, useContent, useList } from "../editable";
import Logo from "./Logo";
import Icon from "./Icon";
import SocialIcon from "./SocialIcon";
import PhotoCredits from "./PhotoCredits";
import { digits } from "./ContactDock";

/**
 * The footer: the studio's own details as the owner wrote them, each line led
 * by its icon, with the site's links beside them. Nothing invented and no
 * column without links under it.
 */
export default function SiteFooter() {
  const links = useList<{ label: string; href: string }>("nav.links");
  const phone = useContent("contact.phone");
  const zalo = useContent("contact.zalo");
  const email = useContent("contact.email");
  const address = useContent("contact.address");
  const hours = useContent("contact.hours");
  const zaloLabel = useContent("contact.dock.zalo");
  const tel = digits(phone);
  const chat = digits(zalo);
  return (
    <footer className="mt-[var(--space-16)] border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-[var(--space-12)] px-[var(--gutter)] py-[var(--space-16)] lg:flex-row lg:justify-between">
        <div className="max-w-[34ch]">
          <Logo />
          <T k="footer.line" as="p" className="mt-[var(--space-4)] text-sm text-ink-soft" />
          {chat && (
            <a
              href={`https://zalo.me/${chat}`}
              target="_blank"
              rel="noreferrer"
              aria-label={zaloLabel}
              className="mt-[var(--space-6)] inline-flex text-ink-soft hover:text-ink"
            >
              <SocialIcon network="zalo" size={22} />
            </a>
          )}
        </div>
        <div>
          <T k="footer.visit" as="h2" className="label text-ink-soft" />
          <ul className="mt-[var(--space-4)] flex flex-col gap-[var(--space-3)] text-sm">
            {tel && (
              <li className="flex items-center gap-[var(--space-3)]">
                <Icon name="phone" size={16} className="text-accent" />
                <a href={`tel:${tel}`} className="tabular text-ink hover:text-accent">{phone}</a>
              </li>
            )}
            {chat && (
              <li className="flex items-center gap-[var(--space-3)]">
                <Icon name="chat" size={16} className="text-accent" />
                <a href={`https://zalo.me/${chat}`} target="_blank" rel="noreferrer" className="tabular text-ink hover:text-accent">{zalo}</a>
              </li>
            )}
            {email && (
              <li className="flex items-center gap-[var(--space-3)]">
                <Icon name="mail" size={16} className="text-accent" />
                <a href={`mailto:${email}`} className="text-ink hover:text-accent">{email}</a>
              </li>
            )}
            {address && (
              <li className="flex items-start gap-[var(--space-3)]">
                <Icon name="address" size={16} className="mt-0.5 text-accent" />
                <span className="text-ink-soft">{address}</span>
              </li>
            )}
            {hours && (
              <li className="flex items-start gap-[var(--space-3)]">
                <Icon name="hours" size={16} className="mt-0.5 text-accent" />
                <span className="text-ink-soft">{hours}</span>
              </li>
            )}
          </ul>
        </div>
        <div>
          <T k="footer.pages" as="h2" className="label text-ink-soft" />
          <ul className="mt-[var(--space-4)] flex flex-col gap-[var(--space-3)] text-sm">
            {links.map((l, i) => (
              <li key={l.href}>
                <Link to={l.href} className="text-ink hover:text-accent">
                  <T k={`nav.links.${i}.label`} />
                </Link>
              </li>
            ))}
            <li>
              <Link to="/sign-in" className="text-ink-soft hover:text-accent">
                <T k="footer.signin" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-page border-t border-line px-[var(--gutter)] py-[var(--space-6)]">
        <PhotoCredits className="text-xs text-ink-soft" />
      </div>
    </footer>
  );
}
