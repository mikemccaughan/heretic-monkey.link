import React, { MouseEvent, ChangeEventHandler, EventHandler } from 'react';
import PropTypes from 'prop-types';

interface DifficultyProps {
  difficulty?: string;
  width?: number;
  height?: number;
  difficultyChanged?: EventHandler<
    MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  >;
  widthChanged?: ChangeEventHandler;
  heightChanged?: ChangeEventHandler;
}

const Difficulty: React.FC<DifficultyProps> = ({
  difficulty,
  difficultyChanged,
  width,
  widthChanged,
  height,
  heightChanged
}: DifficultyProps) => {
  return (
    <fieldset>
      <legend>Select difficulty</legend>
      <ul>
        <li>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="9"
              defaultChecked={difficulty === '9'}
              onClick={difficultyChanged}
            />
            <span>Easy</span>
            <span>(9 x 9)</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="16"
              defaultChecked={difficulty === '16'}
              onClick={difficultyChanged}
            />
            <span>Medium</span>
            <span>(16 x 16)</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="30"
              defaultChecked={difficulty === '30'}
              onClick={difficultyChanged}
            />
            <span>Hard</span>
            <span>(30 x 16)</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="?"
              defaultChecked={difficulty === '?'}
              onClick={difficultyChanged}
            />
            <span>Custom</span>
            <span>
              (
              <input
                type="number"
                id="width"
                title="columns (width)"
                value={width}
                min="1"
                step="1"
                maxLength={5}
                onChange={widthChanged}
              />{' '}
              x{' '}
              <input
                type="number"
                id="height"
                title="rows (height)"
                value={height}
                min="1"
                maxLength={5}
                step="1"
                onChange={heightChanged}
              />
              )
            </span>
          </label>
        </li>
      </ul>
    </fieldset>
  );
};

Difficulty.propTypes = {
  difficulty: PropTypes.string,
  difficultyChanged: PropTypes.func,
  width: PropTypes.number,
  widthChanged: PropTypes.func,
  height: PropTypes.number,
  heightChanged: PropTypes.func
};

export default Difficulty;
