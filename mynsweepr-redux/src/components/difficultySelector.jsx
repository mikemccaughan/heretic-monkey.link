import React from 'react';
import PropTypes from 'prop-types';

const DifficultySelector = ({
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
          checked={difficulty === '9'}
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
          checked={difficulty === '16'}
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
          checked={difficulty === '30'}
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
          checked={difficulty === '?' || difficulty === null}
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
            value={width}
            disabled={difficulty !== '?'}
            onChange={handleWidthChanged}
            maxLength="3"
          />
          x
          <input
            type="number"
            name="custom-height"
            className="custom-unit"
            value={height}
            disabled={difficulty !== '?'}
            onChange={handleHeightChanged}
            maxLength="3"
          />
          )
        </span>
      </label>
    </div>
  </form>
);
DifficultySelector.displayName = "DifficultySelector";
DifficultySelector.propTypes = {
  difficulty: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  handleDifficultyChanged: PropTypes.func,
  handleWidthChanged: PropTypes.func,
  handleHeightChanged: PropTypes.func
};
DifficultySelector.defaultProps = {
  difficulty: '9',
  width: 9,
  height: 9
};
export default DifficultySelector;