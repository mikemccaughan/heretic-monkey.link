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
  remaining: board.filter(cell => cell.value < 0).length,
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
    remaining: newCells.filter(cell => cell.value < 0).length,
    status: ''
  });
}

function handleEmptyClick(newState, newCells, cell, clickedCell) {
  let recursedCells = [];
  let doRecurse = false;
  newCells = newCells.map(cel => {
    console.log('examining cell: ', JSON.stringify(cel));
    if (cel.index === clickedCell.index) {
      console.log('same cell: ', JSON.stringify(cel));
      doRecurse = doRecurse || false;
      return Object.assign({}, cel, { hidden: false });
    } else if (
      cel.x === cell.x &&
      cell.y > 0 &&
      cel.y === cell.y - 1 &&
      cel.index !== clickedCell.index
    ) {
      console.log('cell above: ', JSON.stringify(cel));
      doRecurse = doRecurse || (cel.hidden && cel.value === 0);
      if (cel.hidden && cel.value === 0) recursedCells.push(cel);
      return Object.assign({}, cel, { hidden: false });
    } else if (
      cel.x === cell.x &&
      cell.y < newState.height &&
      cel.y === cell.y + 1 &&
      cel.index !== clickedCell.index
    ) {
      console.log('cell below: ', JSON.stringify(cel));
      doRecurse = doRecurse || (cel.hidden && cel.value === 0);
      if (cel.hidden && cel.value === 0) recursedCells.push(cel);
      return Object.assign({}, cel, { hidden: false });
    } else if (
      cel.y === cell.y &&
      cell.x > 0 &&
      cel.x === cell.x - 1 &&
      cel.index !== clickedCell.index
    ) {
      console.log('cell left: ', JSON.stringify(cel));
      doRecurse = doRecurse || (cel.hidden && cel.value === 0);
      if (cel.hidden && cel.value === 0) recursedCells.push(cel);
      return Object.assign({}, cel, { hidden: false });
    } else if (
      cel.y === cell.y &&
      cell.x < newState.width &&
      cel.x === cell.x + 1 &&
      cel.index !== clickedCell.index
    ) {
      console.log('cell right: ', JSON.stringify(cel));
      doRecurse = doRecurse || (cel.hidden && cel.value === 0);
      if (cel.hidden && cel.value === 0) recursedCells.push(cel);
      return Object.assign({}, cel, { hidden: false });
    }
    return cel;
  });
  console.log('handleEmptyClick: newCells: ', JSON.stringify(newCells));
  Object.assign(newState, {
    cells: newCells,
    remaining: newCells.filter(cell => cell.value < 0).length,
    timeRunning: true
  });
  console.log('handleEmptyClick: newState: ', JSON.stringify(newState));
  console.log('handleEmptyClick: doRecurse: ', doRecurse);
  if (doRecurse) {
    console.log('handleEmptyClick: recursedCells: ', JSON.stringify(recursedCells));
    newState = recursedCells.reduce((updatedState, cel) => handleEmptyClick(updatedState, newCells, cel, clickedCell), newState);
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
    remaining: newCells.filter(cell => cell.value < 0).length,
    cell: action.cell
  };
  console.log('handleCellClick: newState: ', JSON.stringify(newState));
  if (cell.value < 0) {
    return handleMineClick(newState, newCells);
  } else if (cell.value === 0) {
    return handleEmptyClick(newState, newCells, cell, cell);
  } else if (cell.value > 0) {
    return handleNearbyClick(newState, newCells, cell);
  }

  console.log('handleCellClick: newState: ', JSON.stringify(newState));
  return newState;
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
        remaining: cells.filter(cell => cell.value < 0).length
      };
    case DIFFICULTY_WIDTH_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        cells: cells,
        remaining: cells.filter(cell => cell.value < 0).length
      };
    case DIFFICULTY_HEIGHT_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: '00:00',
        timeRunning: false,
        cells: cells,
        remaining: cells.filter(cell => cell.value < 0).length
      };
    case REMAINING_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: state.time,
        timeRunning: state.timeRunning,
        cells: state.cells,
        remaining: state.cells.filter(cell => cell.value < 0).length
      };
    case TIME_CHANGE:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: action.time,
        timeRunning: state.timeRunning,
        cells: state.cells,
        remaining: state.cells.filter(cell => cell.value < 0).length
      };
    case CELL_CLICKED:
      return handleCellClick((state = initialState), action, {
        difficulty,
        height,
        width
      });
    case CELL_DOUBLE_CLICKED:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: action.time,
        timeRunning: true,
        cells: state.cells,
        remaining: state.cells.filter(cell => cell.value < 0).length,
        cell: action.cell
      };
    case CELL_RIGHT_CLICKED:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: action.time,
        timeRunning: true,
        cells: state.cells,
        remaining: state.cells.filter(cell => cell.value < 0).length,
        cell: action.cell
      };
    case NOTIFICATION_CONFIRMED:
      return {
        difficulty: difficulty,
        height: height,
        width: width,
        time: action.time,
        timeRunning: state.timeRunning,
        cells: state.cells,
        remaining: state.cells.filter(cell => cell.value < 0).length,
        cell: action.cell
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
