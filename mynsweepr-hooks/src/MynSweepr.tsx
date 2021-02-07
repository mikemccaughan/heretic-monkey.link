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
import {Scoreboard} from './Scoreboard';
import {
  Cell,
  fnArgs,
  clearAround,
  flagCell,
  generateBoard,
  revealCell,
  showAllCells,
  clearAroundArgs,
  revealCellArgs,
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
    const ref = useRef<string|number>();
    useEffect(() => {
      ref.current = value;
    })
    return ref.current;
  }

  useLayoutEffect(() => {
    setDifficulty(() => {
      if (difficulty !== prevDifficulty) {
        setWidth(w => difficulty === '?' ? w : +difficulty);
        setHeight(h => difficulty === '?' ? h : difficulty === '30' ? 16 : +difficulty);
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
    let board = generateBoard({width, height, density: 1 / 6});
    setCells(() => board.cells);
    setMineCount(() => board.mineCount);
  }, [width, height]);

  const handleDifficultyChange = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    const culty = e && (e.target as HTMLInputElement).value;
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
      onBlank: (args: fnArgs) => {
        console.log(`handleCellClick: onBlank: args: ${JSON.stringify(args)}`);
        args = clearAround(args as clearAroundArgs);
        setCells(args.cells);
        setMineCount(args.mineCount);
        console.log('onBlank: ', args);
        return args;
      },
      onLose: (args: fnArgs) => {
        setGameIsActive(false);
        setCells(showAllCells(args.cells));
        setMineCount(0);
        // TODO: show dialog
        console.log('onLose: ', args);
        return args;
      },
      onNearby: (args: fnArgs) => {
        console.log(`handleCellClick: onNearby: args: ${JSON.stringify(args)}`);
        return args;
      },
      onReveal: (args: fnArgs) => {
        console.log(`handleCellClick: onReveal: args: ${JSON.stringify(args)}`);
        return args;
      },
      onWin: (args: fnArgs) => {
        // TODO: show dialog
        setGameIsActive(false);
        console.log('onWin: ', args);
        return args;
      },
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
      onBlank: (args: fnArgs) => {
        args = clearAround(args as clearAroundArgs);
        setCells(args.cells);
        setMineCount(args.mineCount);
        console.log('onBlank: ', args);
        return args;
      },
      onLose: (args: fnArgs) => {
        setGameIsActive(false);
        setCells(showAllCells(args.cells));
        setMineCount(0);
        // TODO: show dialog
        console.log('onLose: ', args);
        return args;
      },
      onNearby: (args: fnArgs) => {
        console.log('onNearby: ', args);
        return args;
      },
      onReveal: (args: fnArgs) => {
        console.log('onReveal: ', args);
        return args;
      },
      onWin: (args: fnArgs) => {
        // TODO: show dialog
        setGameIsActive(false);
        console.log('onWin: ', args);
        return args;
      },
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
      onBlank: (args: fnArgs) => {
        args = clearAround(args as clearAroundArgs);
        setCells(args.cells);
        setMineCount(args.mineCount);
        console.log('onBlank: ', args);
        return args;
      },
      onLose: (args: fnArgs) => {
        setGameIsActive(false);
        setCells(showAllCells(args.cells));
        setMineCount(0);
        // TODO: show dialog
        console.log('onLose: ', args);
        return args;
      },
      onNearby: (args: fnArgs) => {
        console.log('onNearby: ', args);
        return args;
      },
      onReveal: (args: fnArgs) => {
        console.log('onReveal: ', args);
        return args;
      },
      onWin: (args: fnArgs) => {
        // TODO: show dialog
        setGameIsActive(false);
        console.log('onWin: ', args);
        return args;
      },
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
