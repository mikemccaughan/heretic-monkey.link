import {
  DIFFICULTY_CHANGE,
  DIFFICULTY_HEIGHT_CHANGE,
  DIFFICULTY_WIDTH_CHANGE,
  REMAINING_CHANGE,
  TIME_CHANGE,
  CELL_CLICKED,
  CELL_DOUBLE_CLICKED,
  CELL_RIGHT_CLICKED,
  NOTIFICATION_CONFIRMED,
  GAME_LOST,
  GAME_WON,
  BUILD_BOARD
} from './types';
import { BoardBuilder } from '../../boardBuilder';
export {
  difficultyChanged,
  heightChanged,
  widthChanged,
  remainingChanged,
  timeChanged,
  cellClicked,
  cellDoubleClicked,
  cellRightClicked,
  notificationConfirmed,
  buildBoard
} from './actions';

const initialState = {
  difficulty: '9',
  width: 9,
  height: 9,
  time: '00:00',
  timeRunning: false,
  remaining: 0,
  status: '',
  buildBoard: true,
  cells: []
};

function handleMineClick(newState, newCells) {
  return Object.assign({}, newState, {
    timeRunning: false,
    cells: newCells.map(cel => Object.assign({}, cel, { hidden: false })),
    remaining: 0,
    status: 'lost'
  });
}

function handleNearbyClick(newState, newCells, cell) {
  newCells = newCells.map(cel =>
    cel.index === cell.index ? Object.assign({}, cel, { hidden: false }) : cel
  );
  return Object.assign({}, newState, {
    timeRunning: true,
    cells: newCells,
    remaining: BoardBuilder.getRemaining(newCells),
    status: ''
  });
}

function cellCanShow(cel, cell, state) {
  if (!cel.hidden) {
    return false;
  }
  const sameX = cel.x === cell.x;
  const sameY = cel.y === cell.y;
  const hasLeft = cell.x > 0;
  const hasRight = cell.x < state.width;
  const hasAbove = cell.y > 0;
  const hasBelow = cell.y < state.height;
  const isLeft = hasLeft && cel.x === cell.x - 1;
  const isRight = hasRight && cel.x === cell.x + 1;
  const isAbove = hasAbove && cel.y === cell.y - 1;
  const isBelow = hasBelow && cel.y === cell.y + 1;
  const cellBelow = sameX && isBelow;
  const cellBelowLeft = isLeft && isBelow;
  const cellBelowRight = isRight && isBelow;
  const cellAbove = sameX && isAbove;
  const cellAboveLeft = isLeft && isAbove;
  const cellAboveRight = isRight && isAbove;
  const cellLeft = isLeft && sameY;
  const cellRight = isRight && sameY;

  return (
    cellLeft ||
    cellRight ||
    cellBelow ||
    cellBelowLeft ||
    cellBelowRight ||
    cellAbove ||
    cellAboveLeft ||
    cellAboveRight
  );
}

function handleEmptyClick(newState, newCells, cell, clickedCell) {
  let recursedCells = [];
  newCells = newCells.map(cel => {
    if (cel.index === clickedCell.index && cel.hidden) {
      return Object.assign({}, cel, { hidden: false });
    } else if (cellCanShow(cel, cell, newState)) {
      if (cel.value === 0) recursedCells.push(cel);
      return Object.assign({}, cel, { hidden: false });
    }

    return cel;
  });

  newState = Object.assign({}, newState, {
    cells: newCells,
    remaining: BoardBuilder.getRemaining(newCells),
    timeRunning: true
  });
  if (recursedCells.length > 0) {
    newState = recursedCells.reduce((updatedState, cel) => {
      return handleEmptyClick(
        updatedState,
        updatedState.cells,
        cel,
        clickedCell
      );
    }, newState);
  }

  return newState;
}

function handleCellClick(state, action, { difficulty, height, width }) {
  let newCells = [...(action.cells || state.cells)];
  let cell = newCells.find(cel => cel.index === action.cell.index);
  let newState = {
    difficulty: difficulty,
    height: height,
    width: width,
    time: state.time,
    timeRunning: true,
    cells: newCells,
    remaining: BoardBuilder.getRemaining(newCells),
    cell: action.cell
  };

  if (!cell.hidden) {
    return newState;
  }
  if (cell.value < 0) {
    return handleMineClick(newState, newCells);
  } else if (cell.value === 0) {
    return handleEmptyClick(newState, newCells, cell, cell);
  } else if (cell.value > 0) {
    return handleNearbyClick(newState, newCells, cell);
  }

  if (hasWon(newState)) {
    newState.timeRunning = false;
    newState.status = 'won';
  }

  return newState;
}

function handleCellRightClick(state, action, { difficulty, height, width }) {
  let newCells = [...(action.cells || state.cells)].map(cel =>
    cel.index === action.cell.index && cel.hidden
      ? Object.assign({}, cel, { flag: !cel.flag })
      : Object.assign({}, cel)
  );
  let newState = {
    difficulty: difficulty,
    height: height,
    width: width,
    time: state.time,
    timeRunning: true,
    cells: newCells,
    remaining: BoardBuilder.getRemaining(newCells),
    cell: action.cell
  };

  if (hasWon(newState)) {
    newState.timeRunning = false;
    newState.status = 'won';
  }

  return newState;
}

function handleCellDoubleClick(state, action, { difficulty, height, width }) {
  let newCells = [...(action.cells || state.cells)];
  let cell = newCells.find(cel => cel.index === action.cell.index);
  let newState = {
    difficulty: difficulty,
    height: height,
    width: width,
    time: state.time,
    timeRunning: true,
    cells: newCells,
    remaining: BoardBuilder.getRemaining(newCells),
    cell: action.cell
  };
  if (cell.hidden || cell.flag || cell.value <= 0) {
    return newState;
  }
  let lost = false;
  let empty = null;
  newCells = newCells.map(cel => {
    if (cellCanShow(cel, cell, newState) && !cel.flag) {
      if (cel.value < 0) {
        lost = true;
      } else if (cel.value === 0) {
        empty = cel;
      }
      return Object.assign({}, cel, { hidden: false });
    }
    return Object.assign({}, cel);
  });
  newState.cells = newCells;
  newState.remaining = BoardBuilder.getRemaining(newCells);
  if (lost) {
    return handleMineClick(newState, newCells);
  } else if (empty) {
    return handleEmptyClick(newState, newCells, empty, empty);
  }

  if (hasWon(newState)) {
    newState.timeRunning = false;
    newState.status = 'won';
  }

  return newState;
}

function hasWon(state) {
  return (
    state.remaining === 0 && !state.cells.some(cel => cel.hidden && !cel.flag)
  );
}

export function mynreducer(state = initialState, action) {
  const difficulty = action.difficulty || state.difficulty;
  const height =
    difficulty === '?'
      ? action.height || state.height
      : difficulty === '30'
      ? 16
      : +difficulty;
  const width = difficulty === '?' ? action.width || state.width : +difficulty;
  const cells = [...(action.cells || state.cells)];
  switch (action.type) {
    case DIFFICULTY_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        cells: cells,
        remaining: BoardBuilder.getRemaining(cells)
      };
    case DIFFICULTY_WIDTH_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        cells: cells,
        remaining: BoardBuilder.getRemaining(cells)
      };
    case DIFFICULTY_HEIGHT_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        cells: cells,
        remaining: BoardBuilder.getRemaining(cells)
      };
    case REMAINING_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: state.time,
        timeRunning: state.timeRunning,
        cells: cells,
        remaining: BoardBuilder.getRemaining(cells)
      };
    case TIME_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: action.time,
        timeRunning: state.timeRunning,
        cells: cells,
        remaining: BoardBuilder.getRemaining(cells)
      };
    case CELL_CLICKED:
      return handleCellClick(state, action, {
        difficulty,
        height,
        width
      });
    case CELL_DOUBLE_CLICKED:
      return handleCellDoubleClick(state, action, {
        difficulty,
        height,
        width
      });
    case CELL_RIGHT_CLICKED:
      return handleCellRightClick(state, action, {
        difficulty,
        height,
        width
      });
    case NOTIFICATION_CONFIRMED:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        buildBoard: true
      };
    case GAME_LOST:
      return Object.assign({}, state, {
        difficulty,
        height,
        width,
        timeRunning: false,
        status: 'lost'
      });
    case GAME_WON:
      return Object.assign({}, state, {
        difficulty,
        height,
        width,
        timeRunning: false,
        status: 'won'
      });
    case BUILD_BOARD:
      return Object.assign({}, state, {
        buildBoard: false,
        cells: cells,
        remaining: BoardBuilder.getRemaining(cells)
      });
    default:
      return state;
  }
}
