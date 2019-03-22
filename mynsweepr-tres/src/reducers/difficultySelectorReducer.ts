import {
  DIFFICULTY_CHANGE,
  DIFFICULTY_HEIGHT_CHANGE,
  DIFFICULTY_WIDTH_CHANGE,
  SAVE_CLICKED,
  LOAD_CLICKED,
  BOARD_CLICKED,
  TIME_CHANGE
} from "../actions/types";
import { buildBoardState } from ".";
import { TypedStorage } from "../utils/storage";
import { IBoard } from "../utils/board";

const initialState: any = {
  boards: [],
  mineBoard: {
    difficulty: "9",
    width: 9,
    height: 9,
    cells: []
  }
};

let store = new TypedStorage<IBoard>();

export function difficultySelectorReducer(state = initialState, action: any) {
  if (action.type !== TIME_CHANGE) {
    console.log(
      "difficultySelectorReducer",
      { ...state, cells: [], mineBoard: { cells: [] } },
      action
    );
  }
  let { boardFromState, newState } = buildBoardState(state, action);
  switch (action.type) {
    case DIFFICULTY_CHANGE:
    case DIFFICULTY_WIDTH_CHANGE:
    case DIFFICULTY_HEIGHT_CHANGE:
      if (boardFromState && newState.difficulty !== state.difficulty) {
        return newState;
      }
      return { ...state };
    case SAVE_CLICKED:
      store.save(null, newState);
      return newState;
    case LOAD_CLICKED:
      newState.boards = Array.from(store.keys.values())
        .filter(key => /^board\d{5}$/.test(key))
        .map((k: string) => {
          return {
            key: k
          };
        });
      return newState;
    case BOARD_CLICKED:
      action.mineBoard = store.get(action.key.key) as IBoard;
      let board = buildBoardState(state, action);
      board.newState.boards = null;
      return { ...state, ...board.newState };
    default:
      if (newState.boards && newState.boards.length) {
        if (action.type !== TIME_CHANGE) {
          console.log("difficultySelectorReducer: default: ", newState, action);
        }
        return newState;
      }
      if (action.type !== TIME_CHANGE) {
        console.log(
          "difficultySelectorReducer: default: ",
          { ...state },
          action
        );
      }
      return { ...state };
  }
}
