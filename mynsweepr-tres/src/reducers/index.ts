import { Board } from "../utils/board";
import { TIME_CHANGE } from "../actions/types";

export {
  difficultyChanged,
  heightChanged,
  widthChanged,
  remainingChanged,
  changeRemaining,
  timeChanged,
  timerStart,
  startTimer,
  timerStop,
  stopTimer,
  cellClicked,
  cellDoubleClicked,
  cellRightClicked,
  notificationConfirmed,
  changeGameStatus,
  saveClicked,
  loadClicked,
  boardLoad
} from "../actions/actions";
export { difficultySelectorReducer } from "./difficultySelectorReducer";
export { endGameReducer } from "./endGameReducer";
export { mineBoardReducer } from "./mineBoardReducer";
export { scoreboardReducer } from "./scoreboardReducer";

export function logCells(cells: any): void {
  if (cells?.mineBoard?.cells) {
    return logCells(cells.mineBoard.cells);
  }
  if (cells?.cells) {
    return logCells(cells.cells);
  }
  if (Array.isArray(cells) && cells.length) {
    console.table(cells);
  }
}

const originalLog = console.log;
console.log = (...args: any[]) => {
  originalLog.apply(null, ["", ...args.filter(arg => typeof arg !== "object")]);
  args.filter(arg => typeof arg === "object").forEach(arg => logCells(arg));
};

export interface BoardDifficulty {
  difficulty: string;
  width: number | string;
  height: number | string;
}

export function getDifficultyWidthHeight({
  difficulty,
  width,
  height
}: BoardDifficulty): BoardDifficulty {
  const pheight =
    difficulty === "?" ? +height : difficulty === "30" ? 16 : +difficulty;
  const pwidth = difficulty === "?" ? +width : +difficulty;
  return {
    difficulty,
    width: pwidth,
    height: pheight
  };
}

export function buildBoardState(
  state: any,
  action: any
): { boardFromState: boolean; newState: any } {
  let board = action.mineBoard ?? state.mineBoard ?? state;
  const boardFromState = !action.mineBoard && !state.mineBoard;
  const { difficulty, width, height } = getDifficultyWidthHeight({
    difficulty: action?.difficulty ?? board?.difficulty,
    height: action?.height ?? board?.height,
    width: action?.width ?? board?.width
  });
  let cells = [...board.cells];
  if (difficulty !== board.difficulty || cells.length === 0) {
    const newBoard = new Board(width, height);
    newBoard.buildBoard();
    cells = newBoard.cells;
  }
  const stateFromBoard = {
    ...state,
    cells,
    mineBoard: {
      ...state.mineBoard,
      cells
    }
  };
  const boardState = {
    ...state,
    cells,
    mineBoard: {
      difficulty,
      width,
      height,
      cells
    }
  };
  if (action.type !== TIME_CHANGE) {
    console.log(
      "buildBoardState: ",
      boardFromState,
      { ...stateFromBoard, cells: [],  },
      boardState
    );
  }
  const newState = boardFromState ? stateFromBoard : boardState;
  return { boardFromState, newState };
}
