import React from 'react';
import PropTypes from 'prop-types';
import DifficultySelector from '../containers/DifficultySelector';
import Scoreboard from '../containers/Scoreboard';
import MineBoard from '../containers/MineBoard';

const Mynsweepr = ({
    difficulty,
    width,
    height,
    time,
    remaining,
    status,
    cells,
    handleDifficultyChanged,
    handleHeightChanged,
    handleWidthChanged,
    handleCellClicked,
    handleCellDoubleClicked,
    handleCellRightClicked
  }) => (
    <main>
      <DifficultySelector
        difficulty={difficulty}
        width={width}
        height={height}
        handleDifficultyChanged={handleDifficultyChanged}
        handleHeightChanged={handleHeightChanged}
        handleWidthChanged={handleWidthChanged}
      />
      <Scoreboard time={time} remaining={remaining} />
      <MineBoard
        status={status}
        cells={cells}
        width={width}
        handleCellClicked={handleCellClicked}
        handleCellDoubleClicked={handleCellDoubleClicked}
        handleCellRightClicked={handleCellRightClicked}
      />
    </main>
  );

Mynsweepr.displayName = 'Mynsweepr';
Mynsweepr.propTypes = {
  difficulty: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};
Mynsweepr.defaultProps = {
  difficulty: '9',
  width: 9,
  height: 9
};
export default Mynsweepr;
