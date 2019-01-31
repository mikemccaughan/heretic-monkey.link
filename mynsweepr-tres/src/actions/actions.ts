import {
  DIFFICULTY_CHANGE,
  DIFFICULTY_WIDTH_CHANGE,
  DIFFICULTY_HEIGHT_CHANGE,
  REMAINING_CHANGE,
  TIME_CHANGE,
  CELL_CLICKED,
  CELL_DOUBLE_CLICKED,
  CELL_RIGHT_CLICKED,
  GAME_LOST,
  GAME_WON,
  NOTIFICATION_CONFIRMED,
  TIMER_START,
  TIMER_STOP
} from "./types";
import { IMineCell, Board } from "../utils/board";
import { Timer } from "..";
import { stat } from "fs";

export function difficultyChanged(difficulty: string | undefined) {
  return { type: DIFFICULTY_CHANGE, difficulty };
}
export function widthChanged(width: number | string | undefined) {
  return { type: DIFFICULTY_WIDTH_CHANGE, width };
}
export function heightChanged(height: number | string | undefined) {
  return { type: DIFFICULTY_HEIGHT_CHANGE, height };
}
export function remainingChanged(remaining: number | undefined) {
  return { type: REMAINING_CHANGE, remaining };
}
export function changeRemaining(remaining?: number) {
  return (dispatch: (...args: any[]) => void, getState: () => any) => {
    const state = getState();
    const remainFromState =
      state.mineBoard &&
      state.mineBoard.cells &&
      state.mineBoard.cells.length &&
      Board.getRemaining(state.mineBoard.cells);
    let remain = remaining;
    if (remain == null) {
      remain = remainFromState;
      if (remain == null) {
        remain = state.scoreboard.remaining;
      }
    }
    dispatch(remainingChanged(remain));
  };
}
export function timeChanged(
  time: number | string | undefined,
  status?: string
) {
  return { type: TIME_CHANGE, time, status };
}
export function startTimer(timerId?: number) {
  return { type: TIMER_START, timerId };
}
export function timerStart(timerId?: number) {
  return (
    dispatch: (...args: any[]) => void,
    getState: () => any,
    timer: Timer
  ) => {
    const state = getState();
    const existingTimerId = timerId || state.scoreboard.timerId;
    const newTimerId = timer.start(
      (time: string) => dispatch(timeChanged(time, state.endGame.status)),
      existingTimerId
    );
    dispatch(startTimer(newTimerId));
  };
}
export function stopTimer(timerId: number) {
  return { type: TIMER_STOP, timerId };
}
export function timerStop(timerId?: number) {
  return (
    dispatch: (...args: any[]) => void,
    getState: () => any,
    timer: Timer
  ) => {
    const state = getState();
    const existingTimerId = timerId || state.scoreboard.timerId;
    dispatch(timeChanged("00:00:00", state.endGame.status));
    timer.stop(existingTimerId);
  };
}
export function cellClicked(cell: IMineCell | undefined) {
  return { type: CELL_CLICKED, cell };
}
export function cellDoubleClicked(cell: IMineCell | undefined) {
  return { type: CELL_DOUBLE_CLICKED, cell };
}
export function cellRightClicked(cell: IMineCell | undefined) {
  return { type: CELL_RIGHT_CLICKED, cell };
}
export function changeGameStatus(status?: string) {
  return (dispatch: (...args: any[]) => void, getState: () => any) => {
    const state = getState();
    const remainFromState =
      state.mineBoard &&
      state.mineBoard.cells &&
      state.mineBoard.cells.length &&
      Board.getRemaining(state.mineBoard.cells);
    status = status || state.endGame.status;
    if (
      !status &&
      !state.mineBoard.cells.some((cell: IMineCell) => cell.hidden && !cell.flag)
    ) {
      status = remainFromState === 0 ? "won" : "lost";
    }

    switch (status) {
      case "lost":
        dispatch(gameLost());
        dispatch(timerStop());
        break;
      case "won":
        dispatch(gameWon());
        dispatch(timerStop());
        break;
    }
  };
}
export function gameLost() {
  return { type: GAME_LOST, status: "lost" };
}
export function gameWon() {
  return { type: GAME_WON, status: "won" };
}
export function notificationConfirmed() {
  return { type: NOTIFICATION_CONFIRMED };
}
