import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContent } from "../editable";
import { useRecord } from "../data";
import { useSession } from "../lib/session";
import { savePiece, setStatus, emptyPiece, type PieceDraft } from "../lib/mock/pieces";
import DashboardLayout from "../components/DashboardLayout";
import NotSignedIn from "../components/NotSignedIn";
import ProductImage from "../components/ProductImage";
import Select from "../components/Select";
import Icon from "../components/Icon";
import Logo from "../components/Logo";
import { formatPrice } from "../lib/format";
import { usePageMeta } from "../seo";
import { cmsNav } from "./cmsNav";
import type { Piece } from "../types";

const KINDS = ["Bowl", "Plate", "Vase", "Tea set"];
const GLAZES = ["Hoa lam blue-and-white", "Men ngọc celadon", "Men rạn crackle"];

const FIELD =
  "w-full appearance-none rounded border border-field bg-ground px-[var(--space-4)] py-[var(--space-3)] text-ink";

/**
 * Add a piece, or change the one the owner opened: its photograph, its price,
 * and the switch that takes it off the site when it sells. The three things
 * the brief asks the private area for, on one screen.
 */
export default function CmsPiece() {
  usePageMeta("pages.cmspiece.title");
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useSession();
  const { item } = useRecord<Piece>("pieces", id);
  const [draft, setDraft] = useState<PieceDraft>(emptyPiece);
  const [saved, setSaved] = useState("");
  const words = {
    add: useContent("cms.pieces.add"),
    list: useContent("cms.pieces.title"),
    name: useContent("cms.pieces.name"),
    kind: useContent("pieces.kind"),
    glaze: useContent("pieces.glaze"),
    size: useContent("pieces.size"),
    price: useContent("pieces.price"),
    detail: useContent("cms.piece.detail"),
    photo: useContent("cms.piece.photo"),
    photoNote: useContent("cms.piece.photonote"),
    save: useContent("cms.piece.save"),
    sold: useContent("pieces.sold"),
    here: useContent("pieces.here"),
    markSold: useContent("cms.piece.marksold"),
    markHere: useContent("cms.piece.markhere"),
    back: useContent("cms.piece.back"),
    priceNote: useContent("cms.piece.pricenote"),
    intro: useContent("cms.piece.intro"),
    noPhoto: useContent("cms.piece.nophoto"),
  };

  useEffect(() => {
    if (item) setDraft(item);
    else if (!id) setDraft(emptyPiece);
  }, [item, id]);

  if (!session) return <NotSignedIn />;

  const editing = Boolean(id && item);

  function set<K extends keyof PieceDraft>(key: K, value: PieceDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const piece = savePiece(draft);
    setSaved(piece.name);
    if (!id) navigate(`/cms/${piece.id}`, { replace: true });
  }

  function flip() {
    if (!draft.id) return;
    const next = draft.status === "sold" ? "available" : "sold";
    const piece = setStatus(draft.id, next);
    if (piece) {
      setDraft(piece);
      setSaved(next === "sold" ? words.sold : words.here);
    }
  }

  return (
    <DashboardLayout
      title={editing ? draft.name || words.add : words.add}
      nav={cmsNav(words.list, words.add)}
      brand={<Logo />}
      actions={
        <Link to="/cms" className="inline-flex items-center gap-2 border border-line px-[var(--space-4)] py-[var(--space-2)] text-sm text-ink">
          <Icon name="back" size={16} />
          {words.back}
        </Link>
      }
    >
      {saved && (
        <p data-testid="piece-saved" className="flex items-center gap-[var(--space-2)] border border-line bg-surface px-[var(--space-4)] py-[var(--space-3)] text-sm text-ink">
          <Icon name="done" size={16} className="text-accent" />
          {saved}
        </p>
      )}

      <p className="max-w-[68ch] text-sm text-ink-soft">{words.intro}</p>

      <form onSubmit={submit} className="grid max-w-[64rem] gap-[var(--space-8)] lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="flex flex-col gap-[var(--space-4)]">
          <label className="flex flex-col gap-[var(--space-2)] text-sm">
            <span className="text-ink-soft">{words.name}</span>
            <input id="piece-name" value={draft.name} onChange={(e) => set("name", e.target.value)} className={FIELD} required />
          </label>

          <div className="grid gap-[var(--space-4)] sm:grid-cols-2">
            <label className="flex flex-col gap-[var(--space-2)] text-sm">
              <span className="text-ink-soft">{words.kind}</span>
              <Select
                id="piece-kind"
                value={draft.kind}
                onChange={(v) => set("kind", v)}
                aria-label={words.kind}
                options={KINDS.map((k) => ({ value: k, label: k }))}
              />
            </label>
            <label className="flex flex-col gap-[var(--space-2)] text-sm">
              <span className="text-ink-soft">{words.glaze}</span>
              <Select
                id="piece-glaze"
                value={draft.glaze}
                onChange={(v) => set("glaze", v)}
                aria-label={words.glaze}
                options={GLAZES.map((g) => ({ value: g, label: g }))}
              />
            </label>
          </div>

          <div className="grid gap-[var(--space-4)] sm:grid-cols-2">
            <label className="flex flex-col gap-[var(--space-2)] text-sm">
              <span className="text-ink-soft">{words.size}</span>
              <input id="piece-size" value={draft.size} onChange={(e) => set("size", e.target.value)} className={FIELD} />
            </label>
            <label className="flex flex-col gap-[var(--space-2)] text-sm">
              <span className="text-ink-soft">{words.price}</span>
              <input
                id="piece-price"
                type="number"
                inputMode="numeric"
                min={0}
                step={1000}
                value={draft.price || ""}
                onChange={(e) => set("price", Number(e.target.value))}
                className={`${FIELD} tabular text-right`}
              />
              <span className="tabular text-xs text-ink-soft" data-testid="piece-price-preview">
                {formatPrice(draft.price)}
              </span>
              {words.priceNote && <span className="text-xs text-ink-soft">{words.priceNote}</span>}
            </label>
          </div>

          <label className="flex flex-col gap-[var(--space-2)] text-sm">
            <span className="text-ink-soft">{words.detail}</span>
            <textarea id="piece-detail" rows={4} value={draft.detail} onChange={(e) => set("detail", e.target.value)} className={FIELD} />
          </label>

          <div className="flex flex-wrap items-center gap-[var(--space-3)]">
            <button type="submit" data-testid="piece-save" className="bg-accent-strong px-[var(--space-8)] py-[var(--space-3)] text-accent-ink">
              {words.save}
            </button>
            {editing && (
              <button
                type="button"
                onClick={flip}
                data-testid={draft.status === "sold" ? "mark-here" : "mark-sold"}
                className="inline-flex items-center gap-2 border border-field px-[var(--space-6)] py-[var(--space-3)] text-ink hover:border-accent hover:text-accent-strong"
              >
                <Icon name={draft.status === "sold" ? "check" : "tag"} size={16} />
                {draft.status === "sold" ? words.markHere : words.markSold}
              </button>
            )}
          </div>
        </div>

        <div>
          <p className="label text-ink-soft">{words.photo}</p>
          <div className="mt-[var(--space-3)]">
            {draft.image ? (
              <ProductImage src={draft.image} alt={draft.name || words.photo} aspect="1/1" />
            ) : (
              <p className="border border-line bg-surface px-[var(--space-4)] py-[var(--space-6)] text-sm text-ink-soft">
                {words.noPhoto}
              </p>
            )}
          </div>
          <label className="mt-[var(--space-4)] flex flex-col gap-[var(--space-2)] text-sm">
            <span className="text-ink-soft">{words.photoNote}</span>
            <input id="piece-image" value={draft.image} onChange={(e) => set("image", e.target.value)} className={FIELD} />
          </label>
        </div>
      </form>
    </DashboardLayout>
  );
}
