import React, { Fragment } from 'react';
import { MineBoard } from './MineBoard';
import Difficulty from './Difficulty';
import Board from './Board';

const MynSweepr: React.FC = () => {
  const board = new MineBoard();
  board.buildBoard();
  return (
    <Fragment>
      <header>
        <Difficulty
          difficulty="board.difficulty"
          width={board.width}
          height={board.height}
        ></Difficulty>
      </header>
      <main>
        <Board cells={board.cells}></Board>
      </main>
      <footer></footer>
    </Fragment>
  );
};

export default MynSweepr;
