# Gốm Chu Đậu — moodboard

The direction is already chosen: **Fired in Thái Tân**. This file records what was
looked at while building it, and ends in the commitments the pull request is held to.

## What was watched

| Site | What it is built with | What is taken |
|---|---|---|
| [land-book.com](https://land-book.com/) (gallery) | Inter, no motion library, 31 CSS animations, 2 sticky elements | The dense card grid whose meta row is a single hairline line of small type under the picture — no card chrome, no border, no shadow. The catalogue's cards are built this way: the picture is the card, the words sit under it on one rule. |
| [heathceramics.com/collections/dinnerware](https://www.heathceramics.com/collections/dinnerware) | BentonSans, Shopify, 6 sticky elements, Swiper on scroll | The filter rail that stays on the screen while the grid scrolls past it, and the discipline of one photographic treatment across every tile. Taken as the catalogue's sticky left filter column at ≥1024px; the treatment becomes cut-outs on the card's own ground, which is stricter than theirs. |
| [mudaustralia.com](https://www.mudaustralia.com/) | NeueHaasUnicaPro, 8 sticky elements, no motion library | Pieces shown as objects, not as styled scenes: one piece, one frame, a lot of air inside the frame, the glaze doing all the colour work. Taken as the 8% margin inside every product tile and as the decision to let the glaze be the only colour on a dark page. |
| [nickfouquet.com](https://nickfouquet.com/) | Automatic Typewriter, 7 looping videos, 10,765px page | The full-bleed photograph hero with the name set over it at the left edge rather than centred, and a maker's site that sells the hand before the object. Taken as the first screen. Their looping video and their typewriter face are not taken — this studio has photographs, not film. |
| [linear.app](https://linear.app/) | Inter Variable + Berkeley Mono, 82 CSS animations, no sticky, no GSAP | How a dark page stays legible: a near-black ground, a second surface a few per cent lighter for every tile, hairlines at real hairline opacity, and reveals done in plain CSS with short durations. Taken as the motion budget (fade + 16px rise, 600ms, staggered 60ms) and the two-tone dark ground. Their palette and their product-screenshot hero are not taken. |

## The direction for this business

**Fired in Thái Tân.** A kiln-dark site: the ground is `#16110E`, tiles `#221A15`, text
`#F2EBE3` over soft `#A79687`, and the only colour on the page is `#C9521F` — the heat
in the mouth of a wood kiln — used on one button, one rule and the price of a piece and
nowhere else. The glazes in the photographs are therefore the second colour, which is the
whole argument: on a cream page a celadon bowl is decoration, on this one it is the light
source. Headings are **Bricolage Grotesque** (Google Fonts, OFL) at weight 400–500 — the
house style's one unlock, taken deliberately: it is a grotesk with a drawn, slightly
irregular hand, and Inter would say nothing about thirty pieces thrown by one person;
body text is **Inter**. The scale is h1 56px, h2 40px, prices 28px tabular, labels 11px
small-caps at 0.18em tracking — h1 is held at 56px rather than the 76px ceiling because
the first screen has to carry the goods and a phone number, not one sentence. The grid
is asymmetric: a 12-column grid where the text column starts at column 1 and the
photographs run past column 12 off the edge of the screen. Motion is moderate and
CSS-cheap, as Linear's is: one 500ms load moment on the hero, sections that fade and rise
16px as they enter, a tile whose picture lifts 2% on hover; native scrolling, nothing
pinned, and all of it off under `prefers-reduced-motion`.

## COMMITMENTS

1. The home page's first screen is a photograph of the studio running to all four edges of the screen — no gutter, no margin, no rounded corner — and the whole screen is in view at 1440×790.
2. The name, the village and the opening hours sit over that photograph on the left edge of the grid; nothing on the home page's first screen is centred.
3. Three pieces, cut out on a transparent ground, stand in a band across the foot of the first screen, each crossing the edge between the photograph and the dark ground below it, with its price under it at 28px tabular.
4. The ground is `#16110E` and the only non-neutral colour is `#C9521F`, used on an available piece's price, the primary button and the rule under a section label, and nowhere else.
5. Headings are set in Bricolage Grotesque at weight 400–500, h1 56px and h2 40px at 1440, tracking −0.03em — never bolder, never larger.
6. Every price is tabular and right-aligned: in a catalogue card it sits at the right end of the hairline meta row, so a column of cards lines its digits up.
7. A piece's own page gives the photograph the left half of the screen, bled off the left edge, with size, glaze, kind and price beside it as a hairline-ruled spec list — no card, no shadow, no centring.
8. The private area has no marketing header, no hero and no footer: a menu down the left at every width from 1024px up, and the pieces as a real sortable table with its total under it.
