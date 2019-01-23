import { REMAINING_CHANGE, TIME_CHANGE } from "../actions/types";

const initialState: any = {
  time: "00:00",
  timeRunning: false,
  remaining: 0
};

export function scoreboardReducer(state = initialState, action: any) {
  console.log("scoreboardReducer", state, action);
  let scoreboard = state.hasOwnProperty("time") ? state : state.scoreboard;
  switch (action.type) {
    case REMAINING_CHANGE:
      return {
        ...state,
        scoreboard: {
          ...scoreboard
        }
      };
    case TIME_CHANGE:
      return {
        ...state,
        scoreboard: {
          ...scoreboard
        }
      };
    default:
      return { ...state };
  }
}
