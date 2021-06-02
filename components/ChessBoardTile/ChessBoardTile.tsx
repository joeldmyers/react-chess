import React, { FC } from "react";
import Img from "next/image";
import styles from "../../styles/ChessBoardTile.module.css";

interface IProps {
  isDark: boolean;
  currentPiece: string | null;
}

const ChessBoardTile: FC<IProps> = ({ isDark, currentPiece }) => {
  return (
    <div className={[styles.tile, isDark ? styles.dark : []].join(" ")}>
      {currentPiece && (
        <Img
          src={`/${currentPiece}.png`}
          width={60}
          height={60}
          layout="responsive"
        />
      )}
    </div>
  );
};

export default ChessBoardTile;
