import {
  REMAINING_CHANGE,
  TIME_CHANGE,
  TIMER_START,
  TIMER_STOP
} from "../actions/types";

const initialState: any = {
  time: "00:00",
  timerId: -1,
  timeRunning: false,
  remaining: 0
};

export function scoreboardReducer(state = initialState, action: any) {
  if (action.type !== TIME_CHANGE) {
    console.log("scoreboardReducer", state, action);
  }
  const scoreboardFromState = state.hasOwnProperty("time");
  let scoreboard = scoreboardFromState ? state : state.scoreboard;
  switch (action.type) {
    case REMAINING_CHANGE:
      return scoreboardFromState
        ? { ...scoreboard, remaining: action.remaining }
        : {
            ...state,
            scoreboard: {
              ...scoreboard,
              remaining: action.remaining
            }
          };
    case TIME_CHANGE:
      return scoreboardFromState
        ? {
            ...scoreboard,
            time: action.time,
            timeRunning: true
          }
        : {
            ...state,
            endGame: {
              ...state.endGame,
              status: action.status
            },
            scoreboard: {
              ...scoreboard,
              time: action.time,
              timeRunning: true
            }
          };
    case TIMER_START:
      return scoreboardFromState
        ? {
            ...scoreboard,
            timeRunning: true,
            timerId: action.timerId
          }
        : {
            ...state,
            scoreboard: {
              ...scoreboard,
              timeRunning: true,
              timerId: action.timerId
            }
          };
    case TIMER_STOP:
      return scoreboardFromState
        ? { ...scoreboard, timeRunning: false }
        : {
            ...state,
            scoreboard: {
              ...scoreboard,
              timeRunning: false,
              timerId: action.timerId
            }
          };
    default:
      return { ...state };
  }
}
