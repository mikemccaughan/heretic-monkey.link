import React, {
  Fragment,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  useEffect,
  EventHandler,
  SyntheticEvent
} from 'react';
import Difficulty from './Difficulty';
import Board from './Board';
import { 
  Cell,
  fnArgs, 
  clearAround, 
  flagCell, 
  generateBoard, 
  revealCell, 
  showAllCells, 
  clearAroundArgs, 
  revealCellArgs 
} from './fn-mineboard';

const MynSweepr: React.FC = () => {
  const [difficulty, setDifficulty] = useState('9');
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [cells, setCells] = useState([] as Cell[]);
  const [mineCount, setMineCount] = useState(0);

  // const setRowsAndColumns = () => {
  //   setRows();
  //   setColumns();
  // };

  const setRows = () => {
    document.documentElement.style.setProperty('--rows', height.toString());
  };

  const setColumns = () => {
    document.documentElement.style.setProperty('--columns', width.toString());
  };

  useEffect(() => {
    let prevDifficulty = '9';
    let difficultySet = false;
    setDifficulty(prev => {
      if (difficulty !== prevDifficulty) {
        prevDifficulty = difficulty;
        difficultySet = true;
      }
      return difficulty;
    });
    if (difficultySet) {
      setWidth(w => difficulty === '?' ? w : +difficulty);
      setHeight(h => difficulty === '?' ? h : difficulty === '30' ? 16 : +difficulty);
    }
  }, [difficulty]);

  useEffect(() => {
    let prevWidth = 9;
    setWidth(_ => {
      if (width !== prevWidth) {
        prevWidth = width;
        setColumns();
      }
      return width;
    });
  }, [width]);

  useEffect(() => {
    let prevHeight = 9;
    setHeight(prev => {
      if (height !== prevHeight) {
        prevHeight = height;
        setRows();
      }
      return height;
    });
  }, [height]);

  useEffect(() => {
    const board = generateBoard(width, height, 1 / 6);
    setCells(() => board.cells);
    setMineCount(() => board.mineCount);
  }, [width, height]);

  const handleDifficultyChange = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    const culty = e && (e.target as HTMLInputElement).value;
    setDifficulty(culty);
  };

  const handleWidthChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const dth = +e.target.value;
    setWidth(dth);
  };

  const handleHeightChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const ght = +e.target.value;
    setHeight(ght);
  };

  const handleCellClick: EventHandler<SyntheticEvent> = (e: SyntheticEvent) => {
    console.log('click', e);
    let args: fnArgs = {
      cells,
      mineCount,
      index: +((e.target as HTMLElement)?.dataset?.index ?? 0),
      hadOverlay: (e.target as HTMLElement)?.classList?.contains('hidden') ?? false,
      wasClicked: true,
      onBlank: (args: fnArgs) => {
        args = clearAround(args as clearAroundArgs);
        setCells(args.cells);
        setMineCount(args.mineCount);
        console.log('onBlank: ', args);
      },
      onLose: (args: fnArgs) => {
        setCells(showAllCells(args.cells));
        setMineCount(0);
        // TODO: show dialog
        console.log('onLose: ', args);
      },
      onNearby: (args: fnArgs) => {
        console.log('onNearby: ', args);
      },
      onReveal: (args: fnArgs) => {
        console.log('onReveal: ', args);
      },
      onWin: (args: fnArgs) => {
        // TODO: show dialog
        console.log('onWin: ', args);
      }
    };
    const result = revealCell(args as revealCellArgs);
    setCells(result.cells);
    setMineCount(result.mineCount);
  };

  const handleCellDoubleClick: EventHandler<SyntheticEvent> = (
    e: SyntheticEvent
  ) => {
    console.log('double-click', e);
    let args: fnArgs = {
      cells,
      mineCount,
      index: +((e.target as HTMLElement)?.dataset?.index ?? 0),
      hadOverlay: (e.target as HTMLElement)?.classList?.contains('hidden') ?? false,
      wasClicked: true,
      onBlank: (args: fnArgs) => {
        args = clearAround(args as clearAroundArgs);
        setCells(args.cells);
        setMineCount(args.mineCount);
        console.log('onBlank: ', args);
      },
      onLose: (args: fnArgs) => {
        setCells(showAllCells(args.cells));
        setMineCount(0);
        // TODO: show dialog
        console.log('onLose: ', args);
      },
      onNearby: (args: fnArgs) => {
        console.log('onNearby: ', args);
      },
      onReveal: (args: fnArgs) => {
        console.log('onReveal: ', args);
      },
      onWin: (args: fnArgs) => {
        // TODO: show dialog
        console.log('onWin: ', args);
      }
    };
    const result = clearAround(args as clearAroundArgs);
    setCells(result.cells);
    setMineCount(result.mineCount);
  };

  const handleCellRightClick: EventHandler<SyntheticEvent> = (
    e: SyntheticEvent
  ) => {
    e.preventDefault();
    console.log('right-click', e);
    let args: fnArgs = {
      cells,
      mineCount,
      index: +((e.target as HTMLElement)?.dataset?.index ?? 0),
      hadOverlay: (e.target as HTMLElement)?.classList?.contains('hidden') ?? false,
      wasClicked: true,
      onBlank: (args: fnArgs) => {
        args = clearAround(args as clearAroundArgs);
        setCells(args.cells);
        setMineCount(args.mineCount);
        console.log('onBlank: ', args);
      },
      onLose: (args: fnArgs) => {
        setCells(showAllCells(args.cells));
        setMineCount(0);
        // TODO: show dialog
        console.log('onLose: ', args);
      },
      onNearby: (args: fnArgs) => {
        console.log('onNearby: ', args);
      },
      onReveal: (args: fnArgs) => {
        console.log('onReveal: ', args);
      },
      onWin: (args: fnArgs) => {
        // TODO: show dialog
        console.log('onWin: ', args);
      }
    };
    const result = flagCell(args as clearAroundArgs);
    setCells(result.cells);
    setMineCount(result.mineCount);
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
        <Board
          cells={cells}
          cellClick={handleCellClick}
          cellDoubleClick={handleCellDoubleClick}
          cellRightClick={handleCellRightClick}
        ></Board>
      </main>
      <footer></footer>
    </Fragment>
  );
};

export default MynSweepr;
