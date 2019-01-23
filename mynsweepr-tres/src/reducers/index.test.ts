import "../react-app-env";
import {
  DIFFICULTY_CHANGE,
  DIFFICULTY_HEIGHT_CHANGE,
  DIFFICULTY_WIDTH_CHANGE,
  REMAINING_CHANGE,
  TIME_CHANGE,
  CELL_CLICKED,
  CELL_DOUBLE_CLICKED,
  CELL_RIGHT_CLICKED,
  NOTIFICATION_CONFIRMED,
  GAME_LOST,
  GAME_WON
} from "../actions/types";
import { Board } from "../utils/board";
export {
  difficultyChanged,
  heightChanged,
  widthChanged,
  remainingChanged,
  timeChanged,
  cellClicked,
  cellDoubleClicked,
  cellRightClicked,
  notificationConfirmed
} from "../actions/actions";

const initialState: any = {
  difficulty: "9",
  width: 9,
  height: 9,
  time: "00:00",
  timeRunning: false,
  remaining: 0,
  status: "",
  cells: []
};

