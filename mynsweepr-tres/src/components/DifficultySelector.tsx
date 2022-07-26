import React from "react";

import {
  SyntheticEventHandler,
  SyntheticEventWithDataHandler
} from "../utils/events";
import { IBoard } from "../utils/board";

export interface DifficultySelectorProps {
  mineBoard?: IBoard;
  boards?: { key: string }[];
  handleDifficultyChanged?: SyntheticEventHandler<HTMLInputElement>;
  handleHeightChanged?: SyntheticEventHandler<HTMLInputElement>;
  handleWidthChanged?: SyntheticEventHandler<HTMLInputElement>;
  handleSaveClicked?: SyntheticEventWithDataHandler<HTMLButtonElement, IBoard>;
  handleLoadClicked?: SyntheticEventWithDataHandler<HTMLButtonElement, IBoard>;
  handleBoardLoad?: SyntheticEventWithDataHandler<
    HTMLButtonElement,
    { key: string }
  >;
}

const DifficultySelector: React.FunctionComponent<DifficultySelectorProps> = ({
  mineBoard,
  boards,
  handleDifficultyChanged,
  handleWidthChanged,
  handleHeightChanged,
  handleSaveClicked,
  handleLoadClicked,
  handleBoardLoad
}) => (
  <form>
    <div className="fieldset">
      <div className="legend">Select difficulty</div>
      <label className="radio">
        <input
          type="radio"
          name="difficulty"
          value="9"
          defaultChecked={mineBoard?.difficulty === "9"}
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
          defaultChecked={mineBoard?.difficulty === "16"}
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
          defaultChecked={mineBoard?.difficulty === "30"}
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
            (mineBoard?.difficulty === "?") ||
            (mineBoard?.difficulty === null)
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
            value={mineBoard?.width}
            disabled={mineBoard?.difficulty !== "?"}
            onChange={handleWidthChanged}
            maxLength={3}
          />
          x
          <input
            type="number"
            name="custom-height"
            className="custom-unit"
            value={mineBoard?.height}
            disabled={mineBoard?.difficulty !== "?"}
            onChange={handleHeightChanged}
            maxLength={3}
          />
          )
        </span>
      </label>
    </div>
    <div className="buttons">
      <button
        id="save"
        type="button"
        onClick={e => {
          handleSaveClicked?.(mineBoard!, e);
        }}
      >
        Save Board
      </button>
      <button
        id="load"
        type="button"
        onClick={e => {
          handleLoadClicked?.(mineBoard!, e);
        }}
      >
        Load Board
      </button>
      <dialog style={{ display: (boards?.length ?? 0) ? "flex" : "none" }}>
        <ul>
          {boards?.map((b: { key: string }) => (
              <li key={b.key}>
                <button
                  type="button"
                  onClick={e => handleBoardLoad?.(b, e)}
                >
                  {b.key}
                </button>
              </li>
            ))}
        </ul>
      </dialog>
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
  }
};
export default DifficultySelector;
