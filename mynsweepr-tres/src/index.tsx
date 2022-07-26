import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import {
  difficultySelectorReducer,
  mineBoardReducer,
  endGameReducer,
  scoreboardReducer
} from "./reducers";
import { Board } from "./utils/board";
import thunk from "redux-thunk";

const preloadedState: any = {
  scoreboard: {
    time: "00:00",
    timer: 0,
    timeRunning: false,
    remaining: 0
  },
  difficultySelector: {
    difficulty: "9",
    width: 9,
    height: 9
  },
  mineBoard: {
    difficulty: "9",
    width: 9,
    height: 9,
    cells: []
  },
  endGame: {
    status: ""
  }
};
const board = new Board(
  preloadedState.mineBoard.width,
  preloadedState.mineBoard.height
);
board.buildBoard();
preloadedState.mineBoard = { ...preloadedState.mineBoard, ...board };
preloadedState.difficultySelector = preloadedState.mineBoard;

export class Timer {
  private timerId: number;
  private initial: number;
  private formatter: Intl.DateTimeFormat;
  constructor(public timeout: number) {
    this.timerId = 0;
    this.initial = 0;
    const formatOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
      hourCycle: "h23"
    };
    this.formatter = new Intl.DateTimeFormat("en-US", formatOptions);
  }
  formatElapsed(elapsed: number): string {
    const date = new Date(elapsed);
    return this.formatter.format(date);
  }
  start(fn: (time: string) => void, timerId?: number): number {
    // if the timerId given is the same as the one we've already started,
    // do nothing, so that it keeps going.
    if ((timerId != null && timerId === this.timerId) || (timerId == null && this.timerId != null)) {
      return this.timerId;
    }
    // if the timerId given is not the same as the one we've already started,
    // clear it and start a new one.
    if (timerId != null && timerId !== this.timerId) {
      window.clearInterval(timerId);
    }
    this.initial = Date.now();
    this.timerId = window.setInterval(() => {
      const now = Date.now();
      const elapsed = now - this.initial;
      const formatted = this.formatElapsed(elapsed);
      fn(formatted);
    }, this.timeout);
    return this.timerId;
  }
  stop(timerId?: number): number {
    // if the timerId given is the same as the one we've already started,
    // clear it.
    if (timerId != null && timerId === this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = 0;
    }
    if (timerId != null) {
      window.clearInterval(timerId);
    }
    return 0;
  }
}

const timer = new Timer(1000);

const store = createStore(
  combineReducers({
    endGame: endGameReducer,
    difficultySelector: difficultySelectorReducer,
    mineBoard: mineBoardReducer,
    scoreboard: scoreboardReducer
  }),
  preloadedState,
  applyMiddleware(thunk.withExtraArgument(timer))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
