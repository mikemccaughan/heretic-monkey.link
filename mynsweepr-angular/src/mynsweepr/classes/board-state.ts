import { Difficulty } from './difficulty';
import { Mineboard } from './mineboard';
import { Scoreboard } from './scoreboard';
import { ITimer, Timer } from './timer';

export class BoardState {
  difficulty?: Difficulty;
  mineboard?: Mineboard;
  scoreboard?: Scoreboard;
  timer?: ITimer;
  status?: string;
  constructor() {
    this.difficulty = new Difficulty();
    this.mineboard = new Mineboard();
    this.scoreboard = new Scoreboard();
    this.timer = new Timer();
    this.timer.elapsed.subscribe(elapsed => this.scoreboard.timeElapsed = elapsed);
    this.mineboard.remainingChanged.subscribe(remaining => this.scoreboard.minesRemaining = remaining);
    this.difficulty.heightChanged.subscribe(height => {
      this.mineboard.difficulty = {
        ...this.mineboard.difficulty,
        height
      };
      this.mineboard.buildBoard();
    });
    this.difficulty.widthChanged.subscribe(width => {
      this.mineboard.difficulty = {
        ...this.mineboard.difficulty,
        width
      };
      this.mineboard.buildBoard();
    });
    this.difficulty.typeChanged.subscribe(type => {
      const w = isNaN(parseInt(type, 10)) ? 30 : parseInt(type, 10);
      const h = type === '9' ? 9 : type === '16' ? 16 : type === '30' ? 16 : 16;
      this.mineboard.difficulty = {
        type,
        width: w,
        height: h
      };
      this.difficulty.width = w;
      this.difficulty.height = h;
      this.mineboard.buildBoard();
    });
  }
}
