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
  GAME_WON
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
  notificationConfirmed
} from './actions';

const board = BoardBuilder.initializeBoard(9, 9);
const initialState = {
  difficulty: '9',
  width: 9,
  height: 9,
  time: '00:00',
  timeRunning: false,
  remaining: getRemaining(board),
  status: '',
  cells: board
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
    remaining: getRemaining(newCells),
    status: ''
  });
}

function cellCanShow(cel, cell, clickedCell, state) {
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
  console.log(
    `handleEmptyClick: before map: hidden: ${
      newCells.filter(cel => cel.hidden).length
    }`
  );
  newCells = newCells.map(cel => {
    if (cel.index === clickedCell.index && cel.hidden) {
      return Object.assign({}, cel, { hidden: false });
    } else if (cellCanShow(cel, cell, clickedCell, newState)) {
      if (cel.value === 0) recursedCells.push(cel);
      return Object.assign({}, cel, { hidden: false });
    }

    return cel;
  });
  console.log(
    `handleEmptyClick: after map: hidden: ${
      newCells.filter(cel => cel.hidden).length
    }`
  );
  newState = Object.assign({}, newState, {
    cells: newCells,
    remaining: getRemaining(newCells),
    timeRunning: true
  });
  console.log(
    `handleEmptyClick: before recurs: hidden: ${
      newState.cells.filter(cel => cel.hidden).length
    }`
  );
  if (recursedCells.length > 0) {
    newState = recursedCells.reduce((updatedState, cel) => {
      console.log(
        `handleEmptyClick: inside recurs: hidden: ${
          updatedState.cells.filter(cel => cel.hidden).length
        }`
      );
      return handleEmptyClick(
        updatedState,
        updatedState.cells,
        cel,
        clickedCell
      );
    }, newState);
  }

  console.log(
    `handleEmptyClick: after recurs: hidden: ${
      newState.cells.filter(cel => cel.hidden).length
    }`
  );
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
    remaining: getRemaining(newCells),
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
    remaining: getRemaining(newCells),
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
    remaining: getRemaining(newCells),
    cell: action.cell
  };
  if (cell.hidden || cell.flag || cell.value <= 0) {
    return newState;
  }
  let lost = false;
  let empty = null;
  newCells = newCells.map(cel => {
    if (cellCanShow(cel, cell, cell, newState) && !cel.flag) {
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
  newState.remaining = getRemaining(newCells);
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

function getRemaining(cells) {
  let mines = cells.filter(cell => cell.value < 0 && !cell.flag);
  console.log('mines remaining: ', JSON.stringify(mines));
  return mines.length;
}

function hasWon(state) {
  return (
    state.remaining === 0 && !state.cells.some(cel => cel.hidden && !cel.flag)
  );
}

export function mynreducer(state = initialState, action) {
  console.log('mynreducer state: ', JSON.stringify(state));
  console.log('mynreducer action: ', JSON.stringify(action));
  const difficulty = action.difficulty || state.difficulty;
  const height =
    difficulty === '?'
      ? action.height || state.height
      : difficulty === '30'
      ? 16
      : +difficulty;
  const width = difficulty === '?' ? action.width || state.width : +difficulty;
  const cells = BoardBuilder.initializeBoard(width, height);
  switch (action.type) {
    case DIFFICULTY_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        cells: cells,
        remaining: getRemaining(cells)
      };
    case DIFFICULTY_WIDTH_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        cells: cells,
        remaining: getRemaining(cells)
      };
    case DIFFICULTY_HEIGHT_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        cells: cells,
        remaining: getRemaining(cells)
      };
    case REMAINING_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: state.time,
        timeRunning: state.timeRunning,
        cells: state.cells,
        remaining: getRemaining(state.cells)
      };
    case TIME_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: action.time,
        timeRunning: state.timeRunning,
        cells: state.cells,
        remaining: getRemaining(state.cells)
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
        cells: cells,
        remaining: getRemaining(cells)
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
    default:
      return state;
  }
}
