import React from "react";
import MineCell from "./MineCell";
import { IMineCell, IBoard } from "../utils/board";
import { SyntheticEventHandler } from "../utils/events";

export interface MineBoardProps {
  endGame?: { status?: string };
  mineBoard?: IBoard;
  confirm?: SyntheticEventHandler<HTMLButtonElement>;
  handleCellClicked?: (
    cell: IMineCell
  ) => SyntheticEventHandler<HTMLButtonElement>;
  handleCellDoubleClicked?: (
    cell: IMineCell
  ) => SyntheticEventHandler<HTMLButtonElement>;
  handleCellRightClicked?: (
    cell: IMineCell
  ) => SyntheticEventHandler<HTMLButtonElement>;
}

const MineBoard: React.FunctionComponent<MineBoardProps> = ({
  endGame,
  confirm,
  mineBoard,
  handleCellClicked,
  handleCellDoubleClicked,
  handleCellRightClicked
}) => {
  return (
    <div
      data-width={mineBoard?.width}
      className={
        "board" + (endGame?.status ? ` ${endGame.status}` : "")
      }
      style={{ width: `${+(mineBoard?.width ?? 9) * 42}px` }}
    >
      <div className="dialog won">
        <div className="dialog-content">
          You win!{" "}
          <span role="img" aria-label="party time">
            🎉
          </span>
        </div>
        <div className="dialog-buttons">
          <button type="button" onClick={confirm}>
            Super!
          </button>
        </div>
      </div>
      <div className="dialog lost">
        <div className="dialog-content">
          You lose!{" "}
          <span role="img" aria-label="sad">
            😞
          </span>
        </div>
        <div className="dialog-buttons">
          <button type="button" onClick={confirm}>
            Fake news!
          </button>
        </div>
      </div>
      {mineBoard?.cells?.map((cell: IMineCell) => (
          <MineCell
            key={cell.key}
            index={cell.index}
            hidden={cell.hidden}
            flag={cell.flag}
            value={cell.value}
            handleCellClicked={handleCellClicked}
            handleCellDoubleClicked={handleCellDoubleClicked}
            handleCellRightClicked={handleCellRightClicked}
          />
        ))}
    </div>
  );
};
MineBoard.displayName = "MineBoard";
MineBoard.defaultProps = {
  endGame: { status: "" },
  mineBoard: { difficulty: "9", width: 9, height: 9, cells: [] }
};

export default MineBoard;
