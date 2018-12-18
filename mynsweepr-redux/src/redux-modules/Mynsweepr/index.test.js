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
} from './types';
import { BoardBuilder } from '../../boardBuilder';
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
} from './actions';
import {mynreducer} from './index';

const initialState = {
  difficulty: '9',
  width: 9,
  height: 9,
  time: '00:00',
  timeRunning: false,
  remaining: 0,
  status: '',
  buildBoard: true,
  cells: []
};

describe('redux-modules', () => {
    describe('Mynsweepr', () => {
        describe('index (reducer)', () => {
            it('returns default state when called with nothing', () => {
                const actual = mynreducer(undefined, {});
                expect(actual).toEqual(initialState);
            });
        });
    });
});