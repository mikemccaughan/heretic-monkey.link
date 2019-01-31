import { Board } from "../utils/board";

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
  changeGameStatus
} from "../actions/actions";
export { difficultySelectorReducer } from "./difficultySelectorReducer";
export { endGameReducer } from "./endGameReducer";
export { mineBoardReducer } from "./mineBoardReducer";
export { scoreboardReducer } from "./scoreboardReducer";

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
  const board = action.mineBoard || state.mineBoard || state;
  const boardFromState = !action.mineBoard && !state.mineBoard;
  const { difficulty, width, height } = getDifficultyWidthHeight({
    difficulty: (action && action.difficulty) || (board && board.difficulty),
    height: (action && action.height) || (board && board.height),
    width: (action && action.width) || (board && board.width)
  });
  let cells = [...board.cells];
  if (difficulty !== board.difficulty || cells.length === 0) {
    const newBoard = new Board(width, height);
    newBoard.buildBoard();
    cells = newBoard.cells;
  }
  const newState = boardFromState
    ? { ...state, difficulty, height, width, cells }
    : { ...state, mineBoard: { ...board, difficulty, height, width, cells } };
  return { boardFromState, newState };
}
