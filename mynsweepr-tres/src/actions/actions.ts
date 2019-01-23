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
  NOTIFICATION_CONFIRMED} from "./types";
import { IMineCell } from "../utils/board";

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
export function timeChanged(time: number | string | undefined) {
  return { type: TIME_CHANGE, time };
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
export function gameLost() {
  return { type: GAME_LOST, status: "lost" };
}
export function gameWon() {
  return { type: GAME_WON, status: "won" };
}
export function notificationConfirmed() {
  return { type: NOTIFICATION_CONFIRMED };
}
