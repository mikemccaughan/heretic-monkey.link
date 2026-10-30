import React, { ReactNode } from "react";
import { Cell } from "../model/Cell";

interface MineCellProps {
  cell: Cell;
}

export function MineCell({ cell }: MineCellProps): ReactNode {
  const classes: string[] = ["cell"];
  if (cell.isFlagged) {
    classes.push("flag");
  }
  if (cell.adjacentMines >= 0) {
    classes.push("nearby", `nearby-${cell.adjacentMines}`);
  }
  if (cell.isMine && !cell.isFlagged) {
    classes.push("mine");
  }
  if (!cell.isRevealed) {
    classes.push("hidden");
  }
  return (
    <button type="button" className={classes.join(" ")} data-index={cell.index}>
      <span className="overlay">&nbsp;</span>
      <span className="flag">🚩</span>
      <span className="mine">💣</span>
      <span className="nearby">{cell.adjacentMines}</span>
    </button>
  );
}
