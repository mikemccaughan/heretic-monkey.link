import React from 'react';
import PropTypes from 'prop-types';

const MineCell = ({
  index,
  hidden,
  flag,
  value,
  handleCellClicked,
  handleCellDoubleClicked,
  handleCellRightClicked
}) => {
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
        'cell' +
        (isHidden ? ' hidden' : '') +
        (hasFlag ? ' flag' : '') +
        (hasNearby ? ` nearby ${nearbyClassName}` : '') +
        (hasMine ? ' mine' : '')
      }
      onClick={handleCellClicked}
      onDoubleClick={handleCellDoubleClicked}
      onContextMenu={handleCellRightClicked}
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

MineCell.displayName = 'MineCell';
MineCell.propTypes = {
  hidden: PropTypes.bool,
  flag: PropTypes.bool,
  value: PropTypes.number,
  handleCellClicked: PropTypes.func,
  handleCellDoubleClicked: PropTypes.func,
  handleCellRightClicked: PropTypes.func
};
MineCell.defaultProps = {
  hidden: true,
  flag: false,
  value: 0
};

export default MineCell;
