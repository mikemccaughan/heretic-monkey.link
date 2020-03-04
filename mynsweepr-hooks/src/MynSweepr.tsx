import React, {
  Fragment,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  useEffect
} from 'react';
import { MineBoard, IMineCell } from './MineBoard';
import Difficulty from './Difficulty';
import Board from './Board';

const MynSweepr: React.FC = () => {
  
  const [difficulty, setDifficulty] = useState('9');
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [cells, setCells] = useState([] as IMineCell[]);

  useEffect(() => {
    const board = new MineBoard(width, height);
    board.buildBoard(setCells);
  }, [width, height]);

  const setRowsAndColumns = () => {
    setRows();
    setColumns();
  };

  const setRows = () => {
    document.documentElement.style.setProperty('--rows', height.toString());
  };

  const setColumns = () => {
    document.documentElement.style.setProperty('--columns', width.toString());
  };

  const handleDifficultyChange = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    const culty = e && (e.target as HTMLInputElement).value;
    setDifficulty(culty);
    switch (culty) {
      case '9':
      case '16':
        setWidth(+culty);
        setHeight(+culty);
        break;
      case '30':
        setWidth(30);
        setHeight(16);
        break;
      case '?':
        setWidth(width);
        setHeight(height);
        break;
    }
    setRowsAndColumns();
  };

  const handleWidthChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const dth = +e.target.value;
    setWidth(dth);
    setColumns();
  };

  const handleHeightChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const ght = +e.target.value;
    setHeight(ght);
    setRows();
  };

  return (
    <Fragment>
      <header>
        <Difficulty
          difficulty={difficulty}
          difficultyChanged={handleDifficultyChange}
          width={width}
          widthChanged={handleWidthChange}
          height={height}
          heightChanged={handleHeightChange}
        ></Difficulty>
      </header>
      <main>
        <Board cells={cells}></Board>
      </main>
      <footer></footer>
    </Fragment>
  );
};

export default MynSweepr;
