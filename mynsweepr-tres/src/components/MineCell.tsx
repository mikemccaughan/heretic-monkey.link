import React from "react";
import { SyntheticEventHandler } from "../utils/events";
import { IMineCell } from "../utils/board";

interface MineCellProps {
  index?: number;
  hidden?: boolean;
  flag?: boolean;
  value?: number;
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

const MineCell: React.FunctionComponent<MineCellProps> = ({
  index,
  hidden,
  flag,
  value,
  handleCellClicked,
  handleCellDoubleClicked,
  handleCellRightClicked
}) => {
  value = value || 0;
  let nearby = value >= 0 ? value : 0;
  let nearbyClassName = `nearby-${nearby}`;
  let isHidden = hidden;
  let hasFlag = flag;
  let hasMine = !isHidden && !hasFlag && value < 0;
  let hasNearby = !isHidden && !hasFlag && !hasMine && nearby !== 0;
  let cell = {
    value,
    hidden,
    flag,
    index
  };
  return (
    <button
      data-cell={JSON.stringify(cell)}
      className={
        "cell" +
        (isHidden ? " hidden" : "") +
        (hasFlag ? " flag" : "") +
        (hasNearby ? ` nearby ${nearbyClassName}` : "") +
        (hasMine ? " mine" : "")
      }
      onClick={handleCellClicked && handleCellClicked(cell)}
      onDoubleClick={handleCellDoubleClicked && handleCellDoubleClicked(cell)}
      onContextMenu={handleCellRightClicked && handleCellRightClicked(cell)}
    >
      <span className="overlay">
        <span className="flag" role="img" aria-label="flag">
          🚩
        </span>
        <span className="mine" role="img" aria-label="boom!">
          💣
        </span>
        <span
          className="nearby"
          role="img"
          aria-label="number of nearby cells that have a mine"
        >
          {nearby}
        </span>
      </span>
    </button>
  );
};

MineCell.displayName = "MineCell";
MineCell.defaultProps = {
  hidden: true,
  flag: false,
  value: 0
};

export default MineCell;
