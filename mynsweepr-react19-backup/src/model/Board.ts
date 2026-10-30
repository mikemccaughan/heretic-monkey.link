import { CellCollection } from "./CellCollection";
import { Difficulty } from "./Difficulty";
import { Score } from "./Score";
import { Utils } from "./Utils";

export class Board {
  #difficulty: Difficulty;
  #score: Score;
  #cells: CellCollection;
  #onScoreTimerTick: ((elapsedMs: number) => void) | undefined;

  constructor(board: Partial<Board>) {
    this.#difficulty = board.difficulty ?? Difficulty.Easy;
    this.#cells = board.cells ?? new CellCollection(this.#difficulty);
    this.#score = new Score(board?.score?.elapsedTime ?? 0, this);
    this.#score.timer.onTick = (elapsedMs: number) => {
      this.#score = new Score(elapsedMs, this);
      if (Utils.isFunction(this.#onScoreTimerTick)) {
        this.#onScoreTimerTick(elapsedMs);
      }
    };
  }

  get onScoreTimerTick(): ((elapsedMs: number) => void) | undefined {
    return this.#onScoreTimerTick;
  }
  set onScoreTimerTick(value: ((elapsedMs: number) => void)) {
    if (this.#onScoreTimerTick !== value) {
        this.#onScoreTimerTick = value;
    }
  }

  get difficulty(): Difficulty {
    return this.#difficulty;
  }
  set difficulty(value: Difficulty) {
    this.#difficulty = value;
  }

  get score(): Score {
    return this.#score;
  }
  set score(value: Score) {
    this.#score = value;
  }

  get cells(): CellCollection {
    return this.#cells;
  }
  set cells(value: CellCollection) {
    this.#cells = value;
  }
}
