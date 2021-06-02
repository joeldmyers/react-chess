import React, { FC } from "react";
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
        <img
          src={`/${currentPiece}.png`}
          width={60}
          height={60}
          onClick={onClick}
          className={styles.piece}
        />
      )}
      {shouldShowMoveIndicator && (
        <img
          src="/gray-circle.png"
          width={40}
          height={40}
          className={styles.dot}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default ChessBoardTile;
