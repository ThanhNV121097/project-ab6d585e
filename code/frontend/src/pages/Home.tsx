import { Link } from "react-router-dom";
import { Picture } from "../picture";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import PieceCard from "../components/PieceCard";
import ProductImage from "../components/ProductImage";
import SectionLabel from "../components/SectionLabel";
import Price from "../components/Price";
import Icon from "../components/Icon";
import Grid from "../components/Grid";
import { digits } from "../components/ContactDock";
import type { Piece } from "../types";

/**
 * The home page, as the owner chose it: a photograph of the studio running to
 * all four edges of the first screen, the name set over it at the left edge
 * with the village and the hours, and three pieces cut out along the bottom
 * band crossing the line between the photograph and the ground below it.
 * Picture first, goods second, nothing centred.
 */
export default function Home() {
  const { items: pieces, total } = useCollection<Piece>("pieces", {
    where: { status: "available" },
    pageSize: 11,
  });
  // The three in the hero band and the eight on the shelf are different
  // pieces: a page that shows one photograph twice has fewer than it looks.
  const three = pieces.slice(0, 3);
  const shelf = pieces.slice(3, 11);
  const phone = useContent("contact.phone");
  const hours = useContent("contact.hours");
  const tel = digits(phone);
  return (
    <>
      <Hero three={three} phone={phone} tel={tel} hours={hours} />

      {/* What is on the shelf — the goods, immediately under the fold. */}
      <section className="mx-auto max-w-page px-[var(--gutter)] pt-[calc(var(--space-16)+var(--space-16))]">
        <div className="flex flex-wrap items-end justify-between gap-[var(--space-6)]">
          <div>
            <SectionLabel k="home.shelf.label" />
            <T k="home.shelf.heading" as="h2" className="mt-[var(--space-4)] text-[length:var(--size-h2)] max-w-[18ch]" />
          </div>
          <p className="tabular text-sm text-ink-soft" data-testid="home-total">
            {total} <T k="home.shelf.count" />
          </p>
        </div>
        <Grid max={4} phone={2} className="mt-[var(--space-12)]">
          {shelf.map((p) => (
            <PieceCard key={p.id} piece={p} />
          ))}
        </Grid>
        <Link
          to="/pieces"
          data-testid="home-see-all"
          className="mt-[var(--space-12)] inline-flex items-center gap-[var(--space-3)] border-b border-accent pb-1 font-display text-lg text-ink hover:text-accent-strong"
        >
          <T k="home.shelf.all" />
          <Icon name="arrow" size={18} />
        </Link>
      </section>

      {/* The kiln: why it is theirs. One photograph, run off the right edge. */}
      <section className="mt-[calc(var(--space-16)+var(--space-16))] grid gap-[var(--space-12)] lg:grid-cols-[minmax(0,40rem)_1fr] lg:items-center lg:gap-[var(--space-16)]">
        <div className="mx-auto w-full max-w-page px-[var(--gutter)] lg:ml-auto lg:mr-0 lg:max-w-[40rem] lg:pl-[var(--gutter)] lg:pr-0">
          <SectionLabel k="home.kiln.label" />
          <T k="home.kiln.heading" as="h2" className="mt-[var(--space-4)] text-[length:var(--size-h2)] max-w-[16ch]" />
          <T k="home.kiln.body" as="p" className="mt-[var(--space-6)] max-w-[52ch] text-ink-soft" />
          <dl className="mt-[var(--space-8)] border-t border-line">
            {["clay", "glaze", "firing"].map((k) => (
              <div key={k} className="flex items-baseline justify-between gap-[var(--space-6)] border-b border-line py-[var(--space-4)]">
                <T k={`home.kiln.${k}.term`} as="dt" className="label text-ink-soft" />
                <T k={`home.kiln.${k}.value`} as="dd" className="text-right text-sm text-ink" />
              </div>
            ))}
          </dl>
        </div>
        {/* Runs off the right edge of the screen: no gutter on that side. */}
        <Picture
          src="/images/kiln.jpg"
          alt="The kiln at the studio in Thái Tân"
          className="h-[22rem] w-full object-cover lg:h-[34rem]"
          width={1280}
          height={853}
        />
      </section>

      {/* Ring about a piece. The one action this site exists for. */}
      <section className="mx-auto mt-[calc(var(--space-16)+var(--space-16))] max-w-page px-[var(--gutter)]">
        <SectionLabel k="home.ask.label" />
        <T k="home.ask.heading" as="h2" className="mt-[var(--space-4)] text-[length:var(--size-h2)] max-w-[20ch]" />
        <T k="home.ask.body" as="p" className="mt-[var(--space-6)] max-w-[52ch] text-ink-soft" />
        <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-4)] sm:flex-row">
          {tel && (
            <a
              href={`tel:${tel}`}
              data-testid="home-call"
              className="inline-flex items-center justify-center gap-[var(--space-3)] whitespace-nowrap bg-accent-strong px-[var(--space-8)] py-[var(--space-4)] text-accent-ink"
            >
              <Icon name="phone" size={18} />
              <span className="tabular">{phone}</span>
            </a>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-[var(--space-3)] whitespace-nowrap border border-field px-[var(--space-8)] py-[var(--space-4)] text-ink hover:border-accent hover:text-accent-strong"
          >
            <Icon name="chat" size={18} />
            <T k="home.ask.write" />
          </Link>
        </div>
      </section>
    </>
  );
}

/**
 * The first screen. The photograph is the screen; the words sit on its left
 * edge; the three pieces stand in a band at the foot, each crossing the line
 * between the photograph and the ground below.
 */
function Hero({ three, phone, tel, hours }: { three: Piece[]; phone: string; tel: string; hours: string }) {
  return (
    <section className="relative">
      <div className="relative h-[min(86svh,46rem)] min-h-[32rem] w-full overflow-hidden">
        <Picture
          src="/images/studio-hero.jpg"
          alt="The studio in Chu Đậu, Thái Tân, with finished pieces on the shelves"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          width={1280}
          height={853}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="rise absolute inset-x-0 bottom-[var(--space-16)] top-[var(--header-h)] mx-auto flex max-w-page flex-col justify-center px-[var(--gutter)]">
          <SectionLabel k="home.hero.label" />
          <T k="home.hero.headline" as="h1" className="mt-[var(--space-4)] max-w-[14ch] text-[length:var(--size-h1)] text-ink" />
          <T k="home.hero.sub" as="p" className="mt-[var(--space-4)] max-w-[44ch] text-ink-soft" />
          <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-x-[var(--space-6)] gap-y-[var(--space-2)] text-sm text-ink-soft">
            <span className="flex items-center gap-[var(--space-2)]">
              <Icon name="hours" size={15} className="text-accent" />
              {hours}
            </span>
            {tel && (
              <a href={`tel:${tel}`} data-testid="hero-call" className="flex items-center gap-[var(--space-2)] text-ink hover:text-accent-strong">
                <Icon name="phone" size={15} className="text-accent" />
                <span className="tabular">{phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* The band: three cut-out pieces standing half on the photograph and
          half on the ground, with the price set large under each. */}
      <div className="relative z-10 mx-auto -mt-[7rem] max-w-page px-[var(--gutter)] sm:-mt-[9rem] lg:-mt-[13rem]">
        <ul className="grid grid-cols-3 gap-[var(--space-4)] sm:gap-[var(--space-8)]">
          {three.map((p, i) => (
            <li key={p.id} data-record={`pieces:${p.id}`} className="flex">
              <Link to={`/pieces/${p.id}`} data-testid={`hero-piece-${i}`} className="group flex w-full flex-col">
                <ProductImage src={p.image} alt={p.name} aspect="1/1" eager slot={`/images/pieces-${p.id}.png`} />
                <span className="mt-auto flex flex-col gap-[var(--space-1)] border-t border-line pt-[var(--space-3)] [margin-top:var(--space-3)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-[var(--space-2)]">
                  <span className="min-w-0 font-display text-sm text-ink group-hover:text-accent sm:text-base">{p.name}</span>
                  <Price amount={p.price} size="large" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
