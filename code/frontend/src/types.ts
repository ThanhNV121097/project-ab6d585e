/** A piece on the shelf, as src/data/pieces.json holds it. */
export interface Piece {
  id: string;
  name: string;
  kind: string;
  glaze: string;
  size: string;
  price: number;
  image: string;
  status: string;
  detail: string;
}
