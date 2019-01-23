import "../react-app-env";
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
} from "./types";
import {
  cellClicked,
  cellDoubleClicked,
  cellRightClicked,
  difficultyChanged,
  gameLost,
  gameWon,
  heightChanged,
  notificationConfirmed,
  remainingChanged,
  timeChanged,
  widthChanged
} from "./actions";
import { IMineCell } from "../utils/board";

describe("redux-modules", () => {
  describe("Mynsweepr", () => {
    describe("actions", () => {
      it("difficultyChanged returns the appropriate object", () => {
        const actual = difficultyChanged("9");
        expect(actual).toEqual({
          type: DIFFICULTY_CHANGE,
          difficulty: "9"
        });
      });
      it("widthChanged returns the appropriate object", () => {
        const actual = widthChanged(9);
        expect(actual).toEqual({
          type: DIFFICULTY_WIDTH_CHANGE,
          width: 9
        });
      });
      it("heightChanged returns the appropriate object", () => {
        const actual = heightChanged(9);
        expect(actual).toEqual({
          type: DIFFICULTY_HEIGHT_CHANGE,
          height: 9
        });
      });
      it("remainingChanged returns the appropriate object", () => {
        const actual = remainingChanged(9);
        expect(actual).toEqual({
          type: REMAINING_CHANGE,
          remaining: 9
        });
      });
      it("timeChanged returns the appropriate object", () => {
        const actual = timeChanged("99:99");
        expect(actual).toEqual({
          type: TIME_CHANGE,
          time: "99:99"
        });
      });
      it("cellClicked returns the appropriate1 object", () => {
        const cell: IMineCell = { value: 0, index: 0, hidden: false };
        const actual = cellClicked(cell);
        expect(actual).toEqual({
          type: CELL_CLICKED,
          cell: cell
        });
      });
      it("cellDoubleClicked returns the appropriate1 object", () => {
        const cell: IMineCell = { value: 0, index: 0, hidden: false };
        const actual = cellDoubleClicked(cell);
        expect(actual).toEqual({
          type: CELL_DOUBLE_CLICKED,
          cell: cell
        });
      });
      it("cellRightClicked returns the appropriate1 object", () => {
        const cell: IMineCell = { value: 0, index: 0, hidden: false };
        const actual = cellRightClicked(cell);
        expect(actual).toEqual({
          type: CELL_RIGHT_CLICKED,
          cell: cell
        });
      });
      it("gameLost returns the appropriate object", () => {
        const actual = gameLost();
        expect(actual).toEqual({ type: GAME_LOST, status: "lost" });
      });
      it("gameWon returns the appropriate object", () => {
        const actual = gameWon();
        expect(actual).toEqual({
          type: GAME_WON,
          status: "won"
        });
      });
      it("notificationConfirmed returns the appropriate object", () => {
        const actual = notificationConfirmed();
        expect(actual).toEqual({ type: NOTIFICATION_CONFIRMED });
      });
    });
  });
});
