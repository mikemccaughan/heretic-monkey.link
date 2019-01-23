import {
  DIFFICULTY_CHANGE,
  DIFFICULTY_HEIGHT_CHANGE,
  DIFFICULTY_WIDTH_CHANGE
} from "../actions/types";
import { buildBoardState } from ".";

const initialState: any = {
  mineBoard: {
    difficulty: "9",
    width: 9,
    height: 9,
    cells: []
  }
};

export function difficultySelectorReducer(state = initialState, action: any) {
  console.log("difficultySelectorReducer", state, action);
  const { boardFromState, newState } = buildBoardState(state, action);
  switch (action.type) {
    case DIFFICULTY_CHANGE:
    case DIFFICULTY_WIDTH_CHANGE:
    case DIFFICULTY_HEIGHT_CHANGE:
      if (boardFromState && newState.difficulty !== state.difficulty) {
        return newState;
      }
      return { ...state };
    default:
      return { ...state };
  }
}
