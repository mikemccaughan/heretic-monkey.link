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
  NOTIFICATION_CONFIRMED
} from './types';

export function difficultyChanged(difficulty) {
  return { type: DIFFICULTY_CHANGE, difficulty };
}
export function widthChanged(width) {
  return { type: DIFFICULTY_WIDTH_CHANGE, width };
}
export function heightChanged(height) {
  return { type: DIFFICULTY_HEIGHT_CHANGE, height };
}
export function remainingChanged(remaining) {
  return { type: REMAINING_CHANGE, remaining };
}
export function timeChanged(time) {
  return { type: TIME_CHANGE, time };
}
export function cellClicked(cell) {
  return { type: CELL_CLICKED, cell };
}
export function cellDoubleClicked(cell) {
  return { type: CELL_DOUBLE_CLICKED, cell };
}
export function cellRightClicked(cell) {
  return { type: CELL_RIGHT_CLICKED, cell };
}
export function gameLost() {
  return { type: GAME_LOST };
}
export function gameWon() {
  return { type: GAME_WON };
}
export function notificationConfirmed() {
  return { type: NOTIFICATION_CONFIRMED };
}