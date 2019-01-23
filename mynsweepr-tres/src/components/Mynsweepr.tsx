import React from "react";
import DifficultySelector from "./DifficultySelector-connect";
import Scoreboard from "./Scoreboard-connect";
import MineBoard from "./MineBoard-connect";
import { IMineCell, IBoard } from "../utils/board";
import { SyntheticEventHandler } from "../utils/events";

interface MynsweeprProps {
  endGame?: { status?: string };
  scoreboard?: {
    time?: string;
    remaining?: number;
  };
  mineBoard?: IBoard;
  handleDifficultyChanged?: SyntheticEventHandler<HTMLInputElement>;
  handleHeightChanged?: SyntheticEventHandler<HTMLInputElement>;
  handleWidthChanged?: SyntheticEventHandler<HTMLInputElement>;
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

const MynsweeprDefaultProps = {};

const Mynsweepr: React.FunctionComponent<MynsweeprProps> = ({
  mineBoard,
  handleDifficultyChanged,
  handleHeightChanged,
  handleWidthChanged,
  endGame,
  scoreboard,
  handleCellClicked,
  handleCellDoubleClicked,
  handleCellRightClicked
}) => {
  return (
    <main>
      <DifficultySelector
        difficulty={mineBoard && mineBoard.difficulty}
        width={mineBoard && mineBoard.width}
        height={mineBoard && mineBoard.height}
        handleDifficultyChanged={handleDifficultyChanged}
        handleHeightChanged={handleHeightChanged}
        handleWidthChanged={handleWidthChanged}
      />
      <Scoreboard
        time={scoreboard && scoreboard.time}
        remaining={scoreboard && scoreboard.remaining}
      />
      <MineBoard
        endGame={endGame}
        mineBoard={mineBoard}
        handleCellClicked={handleCellClicked}
        handleCellDoubleClicked={handleCellDoubleClicked}
        handleCellRightClicked={handleCellRightClicked}
      />
    </main>
  );
};

Mynsweepr.displayName = "Mynsweepr";
Mynsweepr.defaultProps = MynsweeprDefaultProps;
export default Mynsweepr;
