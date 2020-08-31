import { Difficulty } from './difficulty';

export class Scoreboard {
  minesRemaining: number;
  datePart: string;
  timeElapsed: string;
  highScore: string;
  highScores: Map<Difficulty, string>;
  constructor() {
    this.minesRemaining = 0;
    this.datePart = '1970-01-01T';
    this.timeElapsed = '00:00:00';
    this.highScore = '--:--:--';
    this.highScores = new Map<Difficulty, string>();
    this.loadScores();
  }
  saveElapsed(difficulty: Difficulty) {
    this.loadScores();
    const currentScore = this.highScores.get(difficulty);
    const highScoreDate = new Date(`${this.datePart}${this.timeElapsed}Z`);
    const currentScoreDate = new Date(`${this.datePart}${currentScore ?? '23:59:59'}Z`);
    if (highScoreDate.valueOf() < currentScoreDate.valueOf()) {
      this.highScores.set(difficulty, this.timeElapsed);
      const highScoreEntries = Array.from(this.highScores.entries());
      const highScoreMap = highScoreEntries.map(([diff, score]) => [diff, score]);
      window.localStorage.setItem('high-scores', JSON.stringify(highScoreMap));
    }
  }
  loadScores() {
    const scores = JSON.parse(window.localStorage.getItem('high-scores'));
    if (scores) {
      const parsedScores = scores.map(([key, value]) => [JSON.parse(key) as Difficulty, value as string] as [Difficulty, string]);
      this.highScores = new Map<Difficulty, string>(parsedScores);
    }
  }
}
