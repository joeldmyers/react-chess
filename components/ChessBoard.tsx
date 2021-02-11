import React, { useState } from "react";
import ChessBoardTile from "./ChessBoardTile";
import styles from "../styles/Home.module.css";

const ChessBoard = () => {
  const [chessBoardPositionState, setChessBoardPositionState] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  return (
    <div className="my-chess-board">
      <h1>Test</h1>
      {chessBoardPositionState.map((chessBoardRow, rowIndex) => {
        return (
          <div className={`chess-board-row chess-board-row-${rowIndex}`}>
            {chessBoardRow.map((tile, tileIndex) => {
              return <ChessBoardTile key={`${rowIndex}-${tileIndex}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
