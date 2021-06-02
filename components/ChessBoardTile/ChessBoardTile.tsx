import React, { FC } from "react";
import Img from "next/image";
import styles from "../../styles/ChessBoardTile.module.css";

interface IProps {
  isDark: boolean;
  currentPiece: string | null;
  rowIndex: number;
  tileIndex: number;
  shouldShowMoveIndicator: boolean;
  onClick: () => void;
}

const ChessBoardTile: FC<IProps> = ({
  isDark,
  currentPiece,
  rowIndex,
  tileIndex,
  shouldShowMoveIndicator,
  onClick,
}) => {
  return (
    <div className={[styles.tile, isDark ? styles.dark : []].join(" ")}>
      {currentPiece && (
        <Img
          src={`/${currentPiece}.png`}
          width={60}
          height={60}
          layout="responsive"
          onClick={onClick}
        />
      )}
      {shouldShowMoveIndicator && (
        <img
          src="/gray-circle.png"
          width={40}
          height={40}
          className={styles.dot}
        />
      )}
    </div>
  );
};

export default ChessBoardTile;
