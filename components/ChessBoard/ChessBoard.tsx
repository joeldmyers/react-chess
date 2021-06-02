import React, { useState } from "react";
import ChessBoardTile from "../ChessBoardTile/ChessBoardTile";
import styles from "../styles/Home.module.css";

const ChessBoard = () => {
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
  return (
    <div className="my-chess-board">
      <h1>Test</h1>
      {chessBoardPosition.map((chessBoardRow, rowIndex) => {
        return (
          <div className={`chess-board-row chess-board-row-${rowIndex}`}>
            {chessBoardRow.map((_tile: any, tileIndex: number) => {
              const isDark =
                (rowIndex % 2 === 0 && tileIndex % 2 === 0) ||
                (rowIndex % 2 === 1 && tileIndex % 2 === 1);

              const currentPiece = chessBoardPosition[rowIndex][tileIndex];

              return (
                <ChessBoardTile
                  key={`${rowIndex}-${tileIndex}`}
                  isDark={isDark}
                  currentPiece={currentPiece}
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
