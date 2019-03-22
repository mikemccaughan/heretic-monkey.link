import {
  NOTIFICATION_CONFIRMED,
  GAME_LOST,
  GAME_WON,
  TIME_CHANGE
} from "../actions/types";

const initialState: any = {
  status: ""
};

export function endGameReducer(state = initialState, action: any) {
  if (action.type !== TIME_CHANGE) {
    console.log("endGameReducer", state, action);
  }
  switch (action.type) {
    case NOTIFICATION_CONFIRMED:
      return {
        ...state,
        status: ""
      };
    case GAME_LOST:
      return {
        ...state,
        status: "lost"
      };
    case GAME_WON:
      return {
        ...state,
        status: "won"
      };
    default:
      return { ...state };
  }
}
