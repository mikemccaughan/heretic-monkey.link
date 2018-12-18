import React from 'react';
import PropTypes from 'prop-types';
import MineCell from './mineCell';

const MineBoard = ({
  status,
  cells,
  confirm,
  width,
  height,
  buildBoard,
  doBuildBoard,
  handleCellClicked,
  handleCellDoubleClicked,
  handleCellRightClicked
}) => {
  if (!cells || cells.length === 0 || buildBoard) {
    doBuildBoard(width, height);
  }
  return (
    <div
      data-width={width}
      className={'board' + (status ? ` ${status}` : '')}
      style={{ width: `${width * 42}px` }}
    >
      <div className="dialog won">
        <div className="dialog-content">
          You win!{' '}
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
          You lose!{' '}
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
      {cells.map(cell => (
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
MineBoard.displayName = 'MineBoard';
MineBoard.propTypes = {
  status: PropTypes.string,
  cells: PropTypes.array,
  confirm: PropTypes.func,
  width: PropTypes.number,
  handleCellClicked: PropTypes.func,
  handleCellDoubleClicked: PropTypes.func,
  handleCellRightClicked: PropTypes.func
};
MineBoard.defaultProps = {
  status: '',
  cells: [],
  width: 9
};

export default MineBoard;
