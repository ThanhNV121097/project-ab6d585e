import { collections, setCollection, type Row } from "../../data";
import type { Piece } from "../../types";

/**
 * What the owner does to a piece, in the browser: add one, change its price,
 * take it off the site when it sells. The design has no backend, so the edits
 * live in the loaded records and last as long as the tab; the backend story
 * replaces this module with the real calls.
 */
export type PieceDraft = Omit<Piece, "id"> & { id?: string };

function rows(): Piece[] {
  return (collections().pieces ?? []) as unknown as Piece[];
}

/** A kebab-case id from the name, unique against what is already there. */
function idFor(name: string): string {
  const base =
    name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "piece";
  const taken = new Set(rows().map((p) => p.id));
  if (!taken.has(base)) return base;
  for (let n = 2; ; n += 1) {
    if (!taken.has(`${base}-${n}`)) return `${base}-${n}`;
  }
}

/** Adds a piece, or writes over the one whose id this is. Returns it. */
export function savePiece(draft: PieceDraft): Piece {
  const all = rows();
  const at = draft.id ? all.findIndex((p) => p.id === draft.id) : -1;
  const piece: Piece = { ...(draft as Piece), id: draft.id ?? idFor(draft.name) };
  const next = at >= 0 ? all.map((p, i) => (i === at ? { ...p, ...piece } : p)) : [piece, ...all];
  setCollection("pieces", next as unknown as Row[]);
  return piece;
}

/** Takes a piece off the site, or puts it back on. Returns it. */
export function setStatus(id: string, status: "available" | "sold"): Piece | undefined {
  const all = rows();
  const piece = all.find((p) => p.id === id);
  if (!piece) return undefined;
  setCollection("pieces", all.map((p) => (p.id === id ? { ...p, status } : p)) as unknown as Row[]);
  return { ...piece, status };
}

/** A piece the owner has not filled in yet, for the "add" form. */
export const emptyPiece: PieceDraft = {
  name: "",
  kind: "Bowl",
  glaze: "Men ng\u1ecdc celadon",
  size: "",
  price: 0,
  image: "",
  status: "available",
  detail: "",
};
