export type PieceType =
  | "pawn"
  | "bishop"
  | "rook"
  | "queen"
  | "king"
  | "knight";
export type PieceColor = "black" | "white";
export type PieceName =
  | "black-bishop"
  | "black-king"
  | "black-knight"
  | "black-pawn"
  | "black-queen"
  | "black-rook"
  | "white-bishop"
  | "white-king"
  | "white-knight"
  | "white-pawn"
  | "white-queen"
  | "white-rook";

type PieceCoordinate = [number, number];

export const pawnPermittedMoves = (
  color: string,
  currentPosition: PieceCoordinate
): PieceCoordinate[] => {
  let permittedMoves: PieceCoordinate[] = [];

  if (color === "white") {
    const [row, column] = currentPosition;

    permittedMoves.push([row - 1, column]);

    if (row === 6) {
      permittedMoves.push([row - 2, column]);
    }
  }

  if (color === "black") {
    const [row, column] = currentPosition;
    permittedMoves.push([row + 1, column]);

    if (row === 1) {
      permittedMoves.push([row + 2, column]);
    }
  }

  return permittedMoves;
};
