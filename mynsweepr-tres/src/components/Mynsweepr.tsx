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
  handleSaveClicked?: (
    mineBoard: IBoard
  ) => SyntheticEventHandler<HTMLButtonElement>;
  handleLoadClicked?: (
    mineBoard: IBoard
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
  handleCellRightClicked,
  handleSaveClicked,
  handleLoadClicked
}) => {
  return (
    <main>
      <DifficultySelector
        mineBoard={mineBoard}
        handleDifficultyChanged={handleDifficultyChanged}
        handleHeightChanged={handleHeightChanged}
        handleWidthChanged={handleWidthChanged}
        handleSaveClicked={handleSaveClicked}
        handleLoadClicked={handleLoadClicked}
      />
      <Scoreboard
        time={scoreboard?.time}
        remaining={scoreboard?.remaining}
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
