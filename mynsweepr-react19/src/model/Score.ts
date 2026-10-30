import { Board } from "./Board";
import { Cell } from "./Cell";
import { Timer } from "./Timer";
import { Utils } from "./Utils";

export class Score {
  #elapsedTime: number;
  #board: Board | undefined;
  #timer: Timer = new Timer(this.elapsedTime, this.onTimerTick.bind(this));

  static timeFormatter: Intl.DateTimeFormat = Intl.DateTimeFormat([], {
    hour: "2-digit",
    hour12: false,
    hourCycle: "h23",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });

  constructor(
    elapsedTime: number = 0,
    board: Board | undefined = undefined
  ) {
    this.#elapsedTime = elapsedTime;
    if (Utils.isUndefined(board)) {
      this.#board = board;
    } else {
      this.board = board;
    }
  }

  get elapsedTime(): number {
    return this.#elapsedTime;
  }
  set elapsedTime(value: number) {
    this.#elapsedTime = value;
  }

  get formattedElapsed(): string {
    return Score.timeFormatter.format(this.elapsedTime);
  }

  get minesRemaining(): number {
    return this.#board?.cells.filter((cel: Cell) => cel.isMine && !cel.isFlagged).length ?? 0;
  }

  get board(): Board | undefined {
    return this.#board;
  }
  set board(value: Board) {
    this.#board = value;
  }

  get timer(): Timer {
    return this.#timer;
  }
  set timer(value: Timer) {
    this.#timer = value;
    this.#timer.onTick = this.onTimerTick.bind(this);
  }

  onTimerTick(elapsedMs: number): void {
    this.elapsedTime = elapsedMs;
  }

  static Initial = new Score();
}
