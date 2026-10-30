import React, { ReactNode } from "react";
import { Board } from "../model/Board";
import { MineCell } from "./MineCell";
import { Cell } from "../model/Cell";
import "./MineBoard.css";

export function MineBoard(board: Board): ReactNode {
  return (
    <div
      className="board"
      data-width={board.difficulty.width}
      data-height={board.difficulty.height}
    >
      {board.cells.map((cell: Cell, index: number) => (
        <MineCell key={index} cell={cell} />
      ))}
    </div>
  );
}
