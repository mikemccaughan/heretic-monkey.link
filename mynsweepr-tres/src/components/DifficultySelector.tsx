import React from "react";

import { SyntheticEventHandler } from "../utils/events";
import { IBoard } from "../utils/board";

export interface DifficultySelectorProps {
  mineBoard?: IBoard;
  difficulty?: string;
  width?: string | number;
  height?: string | number;
  handleDifficultyChanged?: SyntheticEventHandler<HTMLInputElement>;
  handleHeightChanged?: SyntheticEventHandler<HTMLInputElement>;
  handleWidthChanged?: SyntheticEventHandler<HTMLInputElement>;
}

const DifficultySelector: React.FunctionComponent<DifficultySelectorProps> = ({
  mineBoard,
  difficulty,
  width,
  height,
  handleDifficultyChanged,
  handleWidthChanged,
  handleHeightChanged
}) => (
  <form>
    <div className="fieldset">
      <div className="legend">Select difficulty</div>
      <label className="radio">
        <input
          type="radio"
          name="difficulty"
          value="9"
          defaultChecked={mineBoard && mineBoard.difficulty === "9"}
          onChange={handleDifficultyChanged}
          onClick={handleDifficultyChanged}
        />
        <span className="radio-name">Easy</span>
        <span className="radio-size">(9x9)</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="difficulty"
          value="16"
          defaultChecked={mineBoard && mineBoard.difficulty === "16"}
          onChange={handleDifficultyChanged}
          onClick={handleDifficultyChanged}
        />
        <span className="radio-name">Medium</span>
        <span className="radio-size">(16x16)</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="difficulty"
          value="30"
          defaultChecked={mineBoard && mineBoard.difficulty === "30"}
          onChange={handleDifficultyChanged}
          onClick={handleDifficultyChanged}
        />
        <span className="radio-name">Expert</span>
        <span className="radio-size">(30x16)</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="difficulty"
          value="?"
          defaultChecked={
            (mineBoard && mineBoard.difficulty === "?") ||
            (mineBoard && mineBoard.difficulty === null)
          }
          onChange={handleDifficultyChanged}
          onClick={handleDifficultyChanged}
        />
        <span className="radio-name">Custom</span>
        <span className="radio-size">
          (
          <input
            type="number"
            name="custom-width"
            className="custom-unit"
              value={mineBoard && mineBoard.width}
              disabled={mineBoard && mineBoard.difficulty !== "?"}
            onChange={handleWidthChanged}
            maxLength={3}
          />
          x
          <input
            type="number"
            name="custom-height"
            className="custom-unit"
              value={mineBoard && mineBoard.height}
              disabled={mineBoard && mineBoard.difficulty !== "?"}
            onChange={handleHeightChanged}
            maxLength={3}
          />
          )
        </span>
      </label>
    </div>
  </form>
);
DifficultySelector.displayName = "DifficultySelector";
DifficultySelector.defaultProps = {
  mineBoard: {
    difficulty: "9",
    width: 9,
    height: 9, 
    cells: []
  },
  difficulty: "9",
  width: 9,
  height: 9
};
export default DifficultySelector;
