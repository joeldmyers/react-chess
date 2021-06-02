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
  currentPosition: PieceCoordinate,
  boardIsFlipped: boolean
): PieceCoordinate[] => {
  let permittedMoves: PieceCoordinate[] = [];
  let rowIncrementForBlack = 1;
  if (boardIsFlipped) {
    rowIncrementForBlack = -1;
  }

  if (color === "white") {
    const [row, column] = currentPosition;

    permittedMoves.push([row - rowIncrementForBlack, column]);

    if (
      (row === 6 && boardIsFlipped === false) ||
      (row === 1 && boardIsFlipped === true)
    ) {
      permittedMoves.push([row - rowIncrementForBlack * 2, column]);
    }
  }

  if (color === "black") {
    const [row, column] = currentPosition;
    permittedMoves.push([row + rowIncrementForBlack, column]);

    if (
      (row === 1 && boardIsFlipped === false) ||
      (row === 6 && boardIsFlipped === true)
    ) {
      permittedMoves.push([row + rowIncrementForBlack * 2, column]);
    }
  }

  return permittedMoves;
};
