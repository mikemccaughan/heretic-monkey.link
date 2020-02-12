import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

interface DifficultyProps {
  difficulty?: string;
  width?: number;
  height?: number;
  difficultyChanged?: (e: ChangeEvent<HTMLInputElement>) => void;
  widthChanged?: (e: ChangeEvent<HTMLInputElement>) => void;
  heightChanged?: (e: ChangeEvent<HTMLInputElement>) => void;
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
              onChange={difficultyChanged}
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
              onChange={difficultyChanged}
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
              onChange={difficultyChanged}
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
              onChange={difficultyChanged}
            />
            <span>Custom</span>
            <span>
              (
              <input
                type="number"
                id="width"
                defaultValue={width}
                min="1"
                step="1"
                maxLength={5}
                onChange={widthChanged}
              />{' '}
              x{' '}
              <input
                type="number"
                id="height"
                defaultValue={height}
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
