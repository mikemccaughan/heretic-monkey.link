import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import {
  difficultySelectorReducer,
  mineBoardReducer,
  endGameReducer,
  scoreboardReducer
} from "./reducers";
import { Board } from "./utils/board";

const preloadedState: any = {
  scoreboard: {
    time: "00:00",
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

const store = createStore(
  combineReducers({
    endGame: endGameReducer,
    difficultySelector: difficultySelectorReducer,
    mineBoard: mineBoardReducer,
    scoreboard: scoreboardReducer
  }),
  preloadedState
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
