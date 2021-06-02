import React, { useState, FC } from "react";
import ChessBoardTile from "../ChessBoardTile/ChessBoardTile";
import {
  pawnPermittedMoves,
  PieceType,
  PieceColor,
  PieceName,
} from "./permitted-moves";
import _ from "lodash";

const ChessBoard: FC = () => {
  /**
   * State
   */

  const [chessBoardPosition, setChessBoardPosition] = useState([
    [
      "black-rook",
      "black-knight",
      "black-bishop",
      "black-queen",
      "black-king",
      "black-bishop",
      "black-knight",
      "black-rook",
    ],
    [
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
    ],
    [
      "white-rook",
      "white-knight",
      "white-bishop",
      "white-queen",
      "white-king",
      "white-bishop",
      "white-knight",
      "white-rook",
    ],
  ]);

  const [permittedMovesIndicators, setPermittedMovesIndicators] = useState(
    new Array(8).fill(new Array(8).fill(false))
  );

  const [isShowingMovesIndicators, setIsShowingMovesIndicators] =
    useState(false);

  const [boardIsFlipped, setBoardIsFlipped] = useState(false);

  const [currentPieceClickedPosition, setCurrentPieceClickedPosition] =
    useState([0, 0]);

  const [pieceIsBeingMoved, setPieceIsBeingMoved] = useState(false);

  /**
   * End State
   */

  const updatePermittedMovesIndicators = (positions: [number, number][]) => {
    const newState: boolean[][] = [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
    ];

    for (var i = 0; i < positions.length; i++) {
      const position = positions[i];
      newState[position[0]][position[1]] = true;
    }
    setPermittedMovesIndicators(newState);
  };

  const resetPermittedMovesIndicators = () => {
    const newState: boolean[][] = new Array(8).fill(new Array(8).fill(false));
    setPermittedMovesIndicators(newState);
    setIsShowingMovesIndicators(false);
  };

  const handleTileClick = (
    currentPiece: string | null,
    currentPosition: [number, number]
  ) => {
    if (!currentPiece) {
      // handle if is moving piece
      if (pieceIsBeingMoved) {
        const [row, column] = currentPieceClickedPosition;
        const pieceToMove = chessBoardPosition[row][column];
        console.log(currentPieceClickedPosition, pieceToMove);

        const newChessBoardPosition = _.cloneDeep(chessBoardPosition);
        newChessBoardPosition[currentPosition[0]][currentPosition[1]] =
          pieceToMove;
        newChessBoardPosition[row][column] = null;
        setChessBoardPosition(newChessBoardPosition);

        resetPermittedMovesIndicators();
        setPieceIsBeingMoved(false);
      }
      return;
    }

    if (isShowingMovesIndicators) {
      resetPermittedMovesIndicators();
      setPieceIsBeingMoved(false);
      return;
    }

    const splitPieceName = currentPiece.split("-");
    const [pieceColor, pieceType] = currentPiece.split("-");

    let permittedMoves: [number, number][] = [];

    if (pieceType === "pawn") {
      permittedMoves = pawnPermittedMoves(
        pieceColor,
        currentPosition,
        boardIsFlipped
      );
    }

    updatePermittedMovesIndicators(permittedMoves);
    setIsShowingMovesIndicators(true);
    setPieceIsBeingMoved(true);
    setCurrentPieceClickedPosition([...currentPosition]);
  };

  const transposeBoardPosition = (): (string | null)[][] => {
    if (!boardIsFlipped) return chessBoardPosition;
    return chessBoardPosition
      .map((arr) => {
        return arr.slice().reverse();
      })
      .reverse();
  };

  const transposedBoardPosition = transposeBoardPosition();

  return (
    <div className="my-chess-board">
      <h1>Chess board</h1>
      <button onClick={() => setBoardIsFlipped(!boardIsFlipped)}>
        Flip Board
      </button>

      {transposedBoardPosition.map((chessBoardRow, rowIndex) => {
        return (
          <div
            key={`chess-board-row-${rowIndex}`}
            className={`chess-board-row chess-board-row-${rowIndex}`}
          >
            {chessBoardRow.map((_tile: any, tileIndex: number) => {
              const isDark =
                (rowIndex % 2 === 0 && tileIndex % 2 === 0) ||
                (rowIndex % 2 === 1 && tileIndex % 2 === 1);

              const currentPiece = transposedBoardPosition[rowIndex][tileIndex];

              const shouldShowMoveIndicator =
                permittedMovesIndicators[rowIndex][tileIndex];

              const currentPosition: [number, number] = [rowIndex, tileIndex];

              return (
                <ChessBoardTile
                  key={`${rowIndex}-${tileIndex}`}
                  isDark={isDark}
                  currentPiece={currentPiece}
                  rowIndex={rowIndex}
                  tileIndex={tileIndex}
                  shouldShowMoveIndicator={shouldShowMoveIndicator}
                  onClick={() => handleTileClick(currentPiece, currentPosition)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
