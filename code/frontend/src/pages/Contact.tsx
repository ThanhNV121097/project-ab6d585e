import type { ReactNode } from "react";
import { T, useContent } from "../editable";
import ContactForm from "../components/ContactForm";
import MapEmbed from "../components/MapEmbed";
import SectionLabel from "../components/SectionLabel";
import Icon from "../components/Icon";
import SocialIcon from "../components/SocialIcon";
import { digits } from "../components/ContactDock";
import { usePageMeta } from "../seo";

/**
 * How to reach the studio: the owner's own details as they wrote them, the
 * three ways they chose — ring, Zalo, or write — and the map of the village.
 */
export default function Contact() {
  usePageMeta("pages.contact.title", "pages.contact.description");
  const phone = useContent("contact.phone");
  const zalo = useContent("contact.zalo");
  const email = useContent("contact.email");
  const address = useContent("contact.address");
  const hours = useContent("contact.hours");
  const zaloLabel = useContent("contact.dock.zalo");
  const tel = digits(phone);
  const chat = digits(zalo);
  return (
    <div className="mx-auto max-w-page px-[var(--gutter)]">
      <SectionLabel k="pages.contact.label" />
      <T k="pages.contact.heading" as="h1" className="mt-[var(--space-4)] max-w-[16ch] text-[length:var(--size-h1)]" />
      <T k="pages.contact.sub" as="p" className="mt-[var(--space-4)] max-w-[52ch] text-ink-soft" />

      <div className="mt-[var(--space-16)] grid gap-[var(--space-16)] lg:grid-cols-[22rem_1fr] lg:gap-[calc(var(--space-16)+var(--space-8))]">
        <div>
          <dl className="border-t border-line">
            {tel && (
              <Line icon="phone" term={<T k="contact.labels.phone" />}>
                <a href={`tel:${tel}`} data-testid="contact-call" className="tabular text-ink hover:text-accent">{phone}</a>
              </Line>
            )}
            {chat && (
              <Line icon="chat" term={<T k="contact.labels.zalo" />}>
                <a href={`https://zalo.me/${chat}`} target="_blank" rel="noreferrer" data-testid="contact-zalo" className="tabular text-ink hover:text-accent">{zalo}</a>
              </Line>
            )}
            {email && (
              <Line icon="mail" term={<T k="contact.labels.email" />}>
                <a href={`mailto:${email}`} className="text-ink hover:text-accent">{email}</a>
              </Line>
            )}
            {address && (
              <Line icon="address" term={<T k="contact.labels.address" />}>
                <span className="text-ink">{address}</span>
              </Line>
            )}
            {hours && (
              <Line icon="hours" term={<T k="contact.labels.hours" />}>
                <span className="text-ink">{hours}</span>
              </Line>
            )}
          </dl>
          {chat && (
            <a
              href={`https://zalo.me/${chat}`}
              target="_blank"
              rel="noreferrer"
              aria-label={zaloLabel}
              className="mt-[var(--space-8)] inline-flex items-center gap-[var(--space-3)] border border-field px-[var(--space-6)] py-[var(--space-3)] text-ink hover:border-accent hover:text-accent"
            >
              <SocialIcon network="zalo" size={18} />
              <T k="contact.labels.openzalo" />
            </a>
          )}
        </div>

        <div>
          <T k="contact.heading" as="h2" className="text-[length:var(--size-h2)]" />
          <T k="contact.intro" as="p" className="mt-[var(--space-4)] max-w-[48ch] text-ink-soft" />
          <ContactForm className="mt-[var(--space-8)] max-w-[34rem]" />
        </div>
      </div>

      {address && (
        <div className="mt-[calc(var(--space-16)+var(--space-8))]">
          <SectionLabel k="pages.contact.map" />
          <MapEmbed className="mt-[var(--space-6)] h-[24rem] w-full" />
        </div>
      )}
    </div>
  );
}

function Line({ icon, term, children }: { icon: "phone" | "chat" | "mail" | "address" | "hours"; term: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-[var(--space-6)] border-b border-line py-[var(--space-4)]">
      <dt className="label flex items-center gap-[var(--space-2)] text-ink-soft">
        <Icon name={icon} size={14} className="text-accent" />
        {term}
      </dt>
      <dd className="text-right text-sm">{children}</dd>
    </div>
  );
}
