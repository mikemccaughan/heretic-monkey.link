import React, { useState } from "react";
import "./cell.css";
import { CellProps } from "../models/cell";
import { ShowCellEvent } from "../models/events";
import { TokenList } from "../models/tokenlist";

function Cell(props: CellProps) {
  const [isMine, _setIsMine] = useState(props.value < 0);
  const [nearby, _setNearby] = useState(props.value >= 0 ? props.value : -1);
  const [hidden, setHidden] = useState(props.hidden);
  const [flagged, setFlagged] = useState(props.flagged);
  const [value, _setValue] = useState(props.value);
  const [board, setBoard] = useState(props.board);

  const handleClick = () => {
    if (hidden && !flagged) {
      setBoard(board?.alterCellByIndex(props.index, "hidden", false));
      setHidden(false);
      if (board) {
        const args = new ShowCellEvent(board, props.index);
        // Logic to reveal the cell and check for mines
        if (!isMine && value === 0) {
          // Logic to reveal adjacent cells
          setBoard(board.showCell(args));
        } else if (isMine) {
          // Logic to handle mine hit
          setBoard(board.showLoss());
        } else {
          // Logic to reveal the cell value
          setBoard(board.showCell(args));
        }
      }
    }
  };

  const handleDoubleClick = () => {
    if (!hidden && !flagged) {
      // Logic to reveal adjacent cells
      if (value > 0) {
        if (board) {
          const args = new ShowCellEvent(board, props.index);
          setBoard(board.showCell(args));
        }
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Logic to flag the cell
    if (hidden) {
      setBoard(board?.alterCellByIndex(props.index, "flagged", !flagged));
      setFlagged(!flagged);
    }
  };

  const buttonClasses = new TokenList('cell');
  buttonClasses.toggle('hidden', hidden);
  buttonClasses.toggle('flagged', flagged);
  buttonClasses.toggle('mine', isMine);
  buttonClasses.toggle('nearby', nearby >= 0);
  buttonClasses.toggle(`nearby-${value}`, nearby >= 0);

  return (
    <button
      type="button"
      data-index={props.index}
      data-row={props.row}
      data-col={props.col}
      className={buttonClasses.value}
      title={`${hidden ? "Hidden" : "Visible"}, ${
        flagged ? "Flagged" : "Unflagged"
      } Cell${nearby >= 1 ? ` with ${nearby} mine(s) nearby` : ""}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
    >
      {flagged
        ? "🚩"
        : hidden
        ? " "
        : isMine
        ? "💣"
        : nearby > 0
        ? nearby.toString()
        : " "}
    </button>
  );
}

export default Cell;
