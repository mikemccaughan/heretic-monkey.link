import {
  CELL_CLICKED,
  CELL_DOUBLE_CLICKED,
  CELL_RIGHT_CLICKED,
  NOTIFICATION_CONFIRMED,
  TIME_CHANGE,
  BOARD_CLICKED
} from "../actions/types";
import { Board, IMineCell } from "../utils/board";
import { getDifficultyWidthHeight, buildBoardState, BoardDifficulty } from ".";

const initialState: any = {
  mineBoard: {
    difficulty: "9",
    width: 9,
    height: 9,
    cells: []
  },
  scoreboard: {
    time: "00:00",
    timeRunning: false,
    remaining: 0
  },
  endGame: {
    status: ""
  }
};

function handleMineClick(newState: any, newCells: IMineCell[]) {
  return {
    ...newState,
    mineBoard: {
      ...newState.mineBoard,
      cells: newCells.map(cel => {
        return { ...cel, hidden: false };
      })
    },
    scoreboard: {
      ...newState.scoreboard,
      time: "00:00",
      timeRunning: false,
      remaining: 0
    },
    endGame: {
      status: "lost"
    }
  };
}

function handleNearbyClick(
  newState: any,
  newCells: IMineCell[],
  cell: IMineCell
) {
  newCells = newCells.map(cel =>
    cel.index === cell.index ? { ...cel, hidden: false } : cel
  );
  return {
    ...newState,
    mineBoard: {
      ...newState.mineBoard,
      cells: newCells
    },
    scoreboard: {
      ...newState.scoreboard,
      timeRunning: true,
      remaining: Board.getRemaining(newCells)
    },
    endGame: {
      status: ""
    },
    cell
  };
}

function cellCanShow(cellToShow: IMineCell, cellTested: IMineCell, state: any) {
  const anyUndefined =
    cellToShow === undefined ||
    cellTested === undefined ||
    state === undefined ||
    cellToShow.x === undefined ||
    cellTested.x === undefined ||
    cellToShow.y === undefined ||
    cellTested.y === undefined;
  if (anyUndefined || !cellToShow.hidden) {
    if (anyUndefined) {
      console.table([
        {
          message: "mineBoardReducer: cellCanShow: something undefined: "
        },
        {
          message: "cellToShow:",
          dataUndefined: cellToShow === undefined,
          cellHidden: cellToShow.hidden,
          data: JSON.stringify(cellToShow)
        },
        {
          message: "cellTested:",
          dataUndefined: cellTested === undefined,
          data: JSON.stringify(cellTested)
        },
        {
          message: "state:",
          dataUndefined: state === undefined
        }
      ]);
    }
    return false;
  }
  if (
    cellTested === undefined ||
    cellTested.x === undefined ||
    cellTested.y === undefined
  ) {
    return false;
  }

  const board = state.mineBoard || state;
  const sameX = cellToShow.x === cellTested.x;
  const sameY = cellToShow.y === cellTested.y;
  const hasLeft = (cellTested.x || -1) > 0;
  const hasRight = cellTested.x < board.width;
  const hasAbove = cellTested.y > 0;
  const hasBelow = cellTested.y < board.height;
  const isLeft = hasLeft && cellToShow.x === cellTested.x - 1;
  const isRight = hasRight && cellToShow.x === cellTested.x + 1;
  const isAbove = hasAbove && cellToShow.y === cellTested.y - 1;
  const isBelow = hasBelow && cellToShow.y === cellTested.y + 1;
  const cellCanShow: { [key: string]: boolean } = {
    b: sameX && isBelow,
    bl: isLeft && isBelow,
    br: isRight && isBelow,
    a: sameX && isAbove,
    al: isLeft && isAbove,
    ar: isRight && isAbove,
    l: isLeft && sameY,
    r: isRight && sameY
  };

  const anyAreTrue = Object.keys(cellCanShow).some(key => cellCanShow[key]);
  return anyAreTrue;
}

function handleEmptyClick(
  newState: any,
  newCells: IMineCell[],
  cell: IMineCell,
  clickedCell: IMineCell
) {
  let recursedCells: IMineCell[] = [];
  newCells = newCells.map(cel => {
    if (cel.index === clickedCell.index && cel.hidden) {
      return { ...cel, hidden: false };
    } else if (cellCanShow(cel, cell, newState)) {
      if (cel.value === 0) {
        recursedCells.push(cel);
      }
      return { ...cel, hidden: false };
    }

    return cel;
  });

  newState = {
    ...newState,
    mineBoard: {
      ...newState.mineBoard,
      cells: newCells
    },
    scoreboard: {
      ...newState.scoreboard,
      timeRunning: true,
      remaining: Board.getRemaining(newCells)
    },
    endGame: {
      status: ""
    },
    cell: clickedCell
  };
  if (recursedCells.length > 0) {
    newState = recursedCells.reduce((updatedState, cel) => {
      return handleEmptyClick(
        updatedState,
        updatedState.mineBoard.cells,
        cel,
        clickedCell
      );
    }, newState);
  }

  return newState;
}

function handleCellClick(
  state: any,
  action: any,
  { difficulty, height, width }: BoardDifficulty
) {
  let newCells = [
    ...(action.cells ?? state.mineBoard?.cells ?? [])
  ];
  let cell = newCells.find(cel => cel.index === action.cell.index);
  if (!cell) {
    return state;
  }
  let newState: any = {
    ...state,
    mineBoard: {
      ...state.mineBoard,
      difficulty,
      width,
      height,
      cells: newCells
    },
    scoreboard: {
      ...state.scoreboard,
      timeRunning: true,
      remaining: Board.getRemaining(newCells)
    },
    endGame: {
      status: ""
    },
    cell
  };

  if (!cell.hidden) {
    return newState;
  }

  let modifiedState: any = {
    ...newState,
    mineBoard: {
      ...state.mineBoard
    },
    scoreboard: {
      ...state.scoreboard
    },
    endGame: {
      ...state.endGame
    },
    cell
  };
  if (cell.value < 0) {
    modifiedState = handleMineClick(newState, newCells);
  } else if (cell.value === 0) {
    modifiedState = handleEmptyClick(newState, newCells, cell, cell);
  } else if (cell.value > 0) {
    modifiedState = handleNearbyClick(newState, newCells, cell);
  }

  if (hasWon(modifiedState)) {
    modifiedState.scoreboard.timeRunning = false;
    modifiedState.endGame.status = "won";
  }

  return modifiedState;
}

function handleCellRightClick(
  state: any,
  action: any,
  { difficulty, height, width }: BoardDifficulty
) {
  let newCells = [
    ...(action.cells ?? state?.mineBoard?.cells)
  ].map(cel =>
    cel.index === action.cell.index && cel.hidden
      ? { ...cel, flag: !cel.flag }
      : { ...cel }
  );
  let newState: any = {
    ...state,
    mineBoard: {
      ...state.mineBoard,
      difficulty,
      width,
      height,
      cells: newCells
    },
    scoreboard: {
      ...state.scoreboard,
      timeRunning: true,
      remaining: Board.getRemaining(newCells)
    },
    endGame: {
      status: ""
    },
    cell: action.cell
  };

  if (hasWon(newState)) {
    newState.scoreboard.timeRunning = false;
    newState.endGame.status = "won";
  }

  console.log(
    "mineBoardReducer: handleRightClick: newState: ",
    JSON.stringify(newState)
  );
  return newState;
}

function handleCellDoubleClick(
  state: any,
  action: any,
  { difficulty, height, width }: BoardDifficulty
) {
  let newCells = [
    ...(action.cells ?? state?.mineBoard?.cells)
  ];
  let cell = newCells.find(cel => cel.index === action.cell.index);
  let newState: any = {
    ...state,
    mineBoard: {
      ...state.mineBoard,
      difficulty,
      width,
      height,
      cells: newCells
    },
    scoreboard: {
      ...state.scoreboard,
      timeRunning: true,
      remaining: Board.getRemaining(newCells)
    },
    endGame: {
      status: ""
    },
    cell: action.cell
  };
  if (cell.hidden || cell.flag || cell.value <= 0) {
    return newState;
  }
  let lost = false;
  let empty: IMineCell | null = null;
  newCells = newCells.map(cel => {
    if (cellCanShow(cel, cell, newState) && !cel.flag) {
      if (cel.value < 0) {
        lost = true;
      } else if (cel.value === 0) {
        empty = cel;
      }
      return { ...cel, hidden: false };
    }
    return { ...cel };
  });
  newState.mineBoard.cells = newCells;
  newState.scoreboard.remaining = Board.getRemaining(newCells);
  if (lost) {
    return handleMineClick(newState, newCells);
  } else if (empty) {
    return handleEmptyClick(newState, newCells, empty, empty);
  }

  if (hasWon(newState)) {
    newState.scoreboard.timeRunning = false;
    newState.endGame.status = "won";
  }

  return newState;
}

function hasWon(state: any) {
  return (
    state.scoreboard.remaining === 0 &&
    !state.mineBoard.cells.some((cel: IMineCell) => cel.hidden && !cel.flag)
  );
}

function logState(
  initialMessage: string,
  wholeState: any,
  processedState: any,
  action: any
) {
  console.table([
    {
      message: initialMessage,
      data: undefined
    },
    {
      message: "original state of cell:",
      data: JSON.stringify(
        wholeState.mineBoard.cells.find(
          (cell: IMineCell) => cell.index === action.cell.index
        )
      )
    },
    {
      message: "whole state:",
      data: JSON.stringify(
        wholeState.mineBoard.cells.find(
          (cell: IMineCell) => cell.index === action.cell.index
        )
      )
    },
    {
      message: "post processing:",
      data: JSON.stringify(
        processedState.mineBoard.cells.find(
          (cell: IMineCell) => cell.index === action.cell.index
        )
      )
    },
    {
      message: "action:",
      data: JSON.stringify(action)
    }
  ]);
}

export function mineBoardReducer(state = initialState, action: any) {
  if (action.type !== TIME_CHANGE) {
    console.log("mineBoardReducer", state, action);
  }
  let { boardFromState, newState } = buildBoardState(state, action);
  const { difficulty, height, width } = getDifficultyWidthHeight(
    boardFromState ? newState : newState.mineBoard
  );
  const wholeState = boardFromState ? { mineBoard: { ...newState } } : newState;
  switch (action.type) {
    case CELL_CLICKED:
      const clickedState = handleCellClick(wholeState, action, {
        difficulty,
        height,
        width
      });
      logState("cell clicked", wholeState, clickedState, action);
      return boardFromState ? clickedState.mineBoard : clickedState;
    case CELL_DOUBLE_CLICKED:
      const doubleState = handleCellDoubleClick(wholeState, action, {
        difficulty,
        height,
        width
      });
      logState("cell double clicked", wholeState, doubleState, action);
      return boardFromState ? doubleState.mineBoard : doubleState;
    case CELL_RIGHT_CLICKED:
      const rightState = handleCellRightClick(wholeState, action, {
        difficulty,
        height,
        width
      });
      logState("cell right clicked", wholeState, rightState, action);
      return boardFromState ? rightState.mineBoard : rightState;
    case NOTIFICATION_CONFIRMED:
      if (boardFromState) {
        newState.cells = [];
      } else {
        newState.mineBoard.cells = [];
      }
      const bState = buildBoardState(newState, action);
      return bState.newState;
    case BOARD_CLICKED:
      if (boardFromState) {
        newState.cells = [];
      } else {
        newState.mineBoard.cells = [];
      }
      const cState = buildBoardState(newState, action);
      return cState.newState;
    default:
      if (action.type !== TIME_CHANGE) {
        console.log("mineBoardReducer: default: ", state, action);
      }
      return { ...state };
  }
}
