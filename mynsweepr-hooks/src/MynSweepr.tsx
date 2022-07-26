import React, {
  Fragment,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  EventHandler,
  SyntheticEvent,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';
import Difficulty from './Difficulty';
import Board from './Board';
import { Scoreboard } from './Scoreboard';
import {
  Cell,
  fnArgs,
  clearAround,
  flagCell,
  generateBoard,
  revealCell,
  showCell,
  showAllCells,
  clearAroundArgs,
  revealCellArgs,
  showCellArgs,
} from './fn-mineboard';

const MynSweepr: React.FC = () => {
  const [difficulty, setDifficulty] = useState('9');
  const prevDifficulty = usePrevious(difficulty);
  const [width, setWidth] = useState(9);
  const prevWidth = usePrevious(width);
  const [height, setHeight] = useState(9);
  const prevHeight = usePrevious(height);
  const [cells, setCells] = useState([] as Cell[]);
  const [mineCount, setMineCount] = useState(0);
  const [gameIsActive, setGameIsActive] = useState(false);

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

  function usePrevious(value: string | number) {
    const ref = useRef<string | number>();
    useEffect(() => {
      ref.current = value;
    })
    return ref.current;
  }

  useLayoutEffect(() => {
    setDifficulty(() => {
      if (difficulty !== prevDifficulty) {
        setWidth((w: number) => difficulty === '?' ? w : +difficulty);
        setHeight((h: number) => difficulty === '?' ? h : difficulty === '30' ? 16 : +difficulty);
      }
      return difficulty;
    });
  }, [difficulty, prevDifficulty]);

  useLayoutEffect(() => {
    setWidth(() => {
      if (width !== prevWidth) {
        setColumns();
      }
      return width;
    });
    // eslint-disable-next-line
  }, [width, prevWidth]);

  useLayoutEffect(() => {
    setHeight(() => {
      if (height !== prevHeight) {
        setRows();
      }
      return height;
    });
    // eslint-disable-next-line
  }, [height, prevHeight]);

  useLayoutEffect(() => {
    let board = generateBoard({ width, height, density: 1 / 6 });
    setCells(() => board.cells);
    setMineCount(() => board.mineCount);
  }, [width, height]);

  const handleDifficultyChange = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    const culty: string = e && (e.target as HTMLInputElement).value;
    setGameIsActive(false);
    setDifficulty(culty);
  };

  const handleWidthChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const dth = +e.target.value;
    setGameIsActive(false);
    setWidth(dth);
  };

  const handleHeightChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const ght = +e.target.value;
    setGameIsActive(false);
    setHeight(ght);
  };

  const makeStandardOnBlank = (extraToLog: string) => (args: fnArgs) => {
    console.log(`${extraToLog} onBlank: args: ${JSON.stringify(args)}`);
    args = clearAround(args as clearAroundArgs);
    setCells(args.cells);
    return args;
  };

  const makeStandardOnLose = (extraToLog: string) => (args: fnArgs) => {
    setGameIsActive(false);
    args.cells = showAllCells(args.cells);
    // TODO: show dialog
    console.log(`${extraToLog} onLose: args: ${JSON.stringify(args)}`);
    setCells(args.cells);
    return args;
  };

  const makeStandardOnWin = (extraToLog: string) => (args: fnArgs) => {
    setGameIsActive(false);
    args.cells = showAllCells(args.cells);
    // TODO: show dialog
    console.log(`${extraToLog} onWin: args: ${JSON.stringify(args)}`);
    setCells(args.cells);
    return args;
  };

  const makeStandardOnNearby = (extraToLog: string) => (args: fnArgs) => {
    console.log(`${extraToLog} onNearby: args: ${JSON.stringify(args)}`);
    args = clearAround(args as clearAroundArgs);
    setCells(args.cells);
    return args;
  };

  const makeStandardOnReveal = (extraToLog: string) => (args: fnArgs) => {
    console.log(`${extraToLog} onReveal: args: ${JSON.stringify(args)}`);
    const cellToUpdate = args.cells[args.index];
    const newCells = [
      ...args.cells.filter((c, i) => i < args.index),
      {
        ...cellToUpdate,
        hadOverlay: args.hadOverlay ?? false
      },
      ...args.cells.filter((c, i) => i > args.index)
    ];
    args = {
      ...args,
      cells: newCells
    };
    if (!cellToUpdate.hadOverlay) {
      args = showCell(args as showCellArgs);
    }
    setCells(args.cells);
    return args;
  };

  const handleCellClick: EventHandler<SyntheticEvent> = (e: SyntheticEvent) => {
    console.log('click', e);
    setGameIsActive(true);
    let args: fnArgs = {
      cells,
      mineCount,
      index: +((e.target as HTMLElement)?.dataset?.index ?? 0),
      hadOverlay:
        (e.target as HTMLElement)?.classList?.contains('hidden') ?? false,
      wasClicked: true,
      onBlank: makeStandardOnBlank('handleCellClick:'),
      onLose: makeStandardOnLose('handleCellClick:'),
      onNearby: makeStandardOnNearby('handleCellClick:'),
      onReveal: makeStandardOnReveal('handleCellClick:'),
      onWin: makeStandardOnWin('handleCellClick:'),
    };
    const result = revealCell(args as revealCellArgs);
    setCells(result.cells);
    setMineCount(result.mineCount);
  };

  const handleCellDoubleClick: EventHandler<SyntheticEvent> = (
    e: SyntheticEvent
  ) => {
    console.log('double-click', e);
    setGameIsActive(true);
    let args: fnArgs = {
      cells,
      mineCount,
      index: +((e.target as HTMLElement)?.dataset?.index ?? 0),
      hadOverlay:
        (e.target as HTMLElement)?.classList?.contains('hidden') ?? false,
      wasClicked: true,
      onBlank: makeStandardOnBlank('handleCellDoubleClick:'),
      onLose: makeStandardOnLose('handleCellDoubleClick:'),
      onNearby: makeStandardOnNearby('handleCellDoubleClick:'),
      onReveal: makeStandardOnReveal('handleCellDoubleClick:'),
      onWin: makeStandardOnWin('handleCellDoubleClick:'),
    };
    const result = clearAround(args as clearAroundArgs);
    setCells(result.cells);
    setMineCount(result.mineCount);
  };

  const handleCellRightClick: EventHandler<SyntheticEvent> = (
    e: SyntheticEvent
  ) => {
    e.preventDefault();
    setGameIsActive(true);
    console.log('right-click', e);
    let args: fnArgs = {
      cells,
      mineCount,
      index: +((e.target as HTMLElement)?.dataset?.index ?? 0),
      hadOverlay:
        (e.target as HTMLElement)?.classList?.contains('hidden') ?? false,
      wasClicked: true,
      onBlank: makeStandardOnBlank('handleCellRightClick:'),
      onLose: makeStandardOnLose('handleCellRightClick:'),
      onNearby: makeStandardOnNearby('handleCellRightClick:'),
      onReveal: makeStandardOnReveal('handleCellRightClick:'),
      onWin: makeStandardOnWin('handleCellRightClick:'),
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
        <Scoreboard
          isActive={gameIsActive}
          remaining={mineCount}
        ></Scoreboard>
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
