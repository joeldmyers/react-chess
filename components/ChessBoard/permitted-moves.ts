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

export type PieceCoordinate = [number, number];

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

export const rookPermittedMoves = (
  color: string,
  currentPosition: PieceCoordinate
): PieceCoordinate[] => {
  let permittedMoves: PieceCoordinate[] = [];
  const [row, column] = currentPosition;
  for (var i = 0; i < 8; i++) {
    if (i !== row) {
      permittedMoves.push([i, column]);
    }
  }

  for (var j = 0; j < 8; j++) {
    if (j !== column) {
      permittedMoves.push([row, j]);
    }
  }

  return permittedMoves;
};

export const bishopPermittedMoves = (
  color: string,
  currentPosition: PieceCoordinate
): PieceCoordinate[] => {
  let permittedMoves: PieceCoordinate[] = [];
  const [row, column] = currentPosition;

  /**
   * up and right
   */

  let newPosition: PieceCoordinate = [row - 1, column + 1];

  while (newPosition[0] >= 0 && newPosition[1] <= 7) {
    permittedMoves.push(newPosition);
    newPosition = [newPosition[0] - 1, newPosition[1] + 1];
  }

  /**
   * up and left
   */
  newPosition = [row - 1, column - 1];

  while (newPosition[0] >= 0 && newPosition[1] >= 0) {
    permittedMoves.push(newPosition);
    newPosition = [newPosition[0] - 1, newPosition[1] - 1];
  }

  // down and right

  newPosition = [row + 1, column + 1];

  while (newPosition[0] <= 7 && newPosition[1] <= 7) {
    permittedMoves.push(newPosition);
    newPosition = [newPosition[0] + 1, newPosition[1] + 1];
  }

  // down and left

  newPosition = [row + 1, column - 1];

  while (newPosition[0] <= 7 && newPosition[1] >= 0) {
    permittedMoves.push(newPosition);
    newPosition = [newPosition[0] + 1, newPosition[1] - 1];
  }

  return permittedMoves;
};

export const queenPermittedMoves = (
  color: string,
  currentPosition: PieceCoordinate
): PieceCoordinate[] => {
  return [
    ...bishopPermittedMoves(color, currentPosition),
    ...rookPermittedMoves(color, currentPosition),
  ];
};

export const knightPermittedMoves = (
  color: string,
  currentPosition: PieceCoordinate
): PieceCoordinate[] => {
  const [row, column] = currentPosition;

  const possibleKnightMoves: PieceCoordinate[] = [
    [row - 2, column + 1],
    [row - 1, column + 2],
    [row + 1, column + 2],
    [row + 2, column + 1],
    [row + 2, column - 1],
    [row + 1, column - 2],
    [row - 1, column - 2],
    [row - 2, column - 1],
  ];

  const permittedMoves = getOnlyInBoundsMoves(possibleKnightMoves);
  return permittedMoves;
};

export const kingPermittedMoves = (
  color: string,
  currentPosition: PieceCoordinate
): PieceCoordinate[] => {
  const [row, column] = currentPosition;

  const possibleKingMoves: PieceCoordinate[] = [
    [row - 1, column],
    [row - 1, column + 1],
    [row, column + 1],
    [row + 1, column + 1],
    [row + 1, column],
    [row + 1, column - 1],
    [row, column - 1],
    [row - 1, column - 1],
  ];

  const permittedMoves = getOnlyInBoundsMoves(possibleKingMoves);

  return permittedMoves;
};

const getOnlyInBoundsMoves = (
  pieceCoordinates: PieceCoordinate[]
): PieceCoordinate[] => {
  let possibleMoves: PieceCoordinate[] = [];

  for (var i = 0; i < pieceCoordinates.length; i++) {
    const proposedMove: PieceCoordinate = pieceCoordinates[i];
    const [currentRow, currentColumn] = proposedMove;
    if (
      currentRow <= 7 &&
      currentRow >= 0 &&
      currentColumn <= 7 &&
      currentColumn >= 0
    ) {
      possibleMoves.push(proposedMove);
    }
  }

  return possibleMoves;
};

export const getPermittedMoves = (
  pieceType: string,
  pieceColor: string,
  currentPosition: [number, number]
): PieceCoordinate[] => {
  let permittedMoves: [number, number][] = [];

  if (pieceType === "pawn") {
    permittedMoves = pawnPermittedMoves(pieceColor, currentPosition);
  }

  if (pieceType === "rook") {
    permittedMoves = rookPermittedMoves(pieceColor, currentPosition);
  }

  if (pieceType === "bishop") {
    permittedMoves = bishopPermittedMoves(pieceColor, currentPosition);
  }

  if (pieceType === "knight") {
    permittedMoves = knightPermittedMoves(pieceColor, currentPosition);
  }

  if (pieceType === "queen") {
    permittedMoves = queenPermittedMoves(pieceColor, currentPosition);
  }

  if (pieceType === "king") {
    permittedMoves = kingPermittedMoves(pieceColor, currentPosition);
  }
  return permittedMoves;
};
