import { Difficulty } from './difficulty';
import { EventEmitter } from '@angular/core';

export class Scoreboard {
  minesRemaining: number;
  datePart: string;
  timeElapsed: string;
  highScore: string;
  highScores: { [key: string]: string };
  highScoreChanged: EventEmitter<string>;
  constructor() {
    this.minesRemaining = 0;
    this.datePart = '1970-01-01T';
    this.timeElapsed = '00:00:00';
    this.highScore = '--:--:--';
    this.highScores = {};
    this.highScoreChanged = new EventEmitter<string>();
    this.loadScores();
  }
  saveElapsed(difficulty: Difficulty) {
    this.loadScores();
    const currentScore = this.highScores[JSON.stringify(difficulty)];
    const highScoreDate = new Date(`${this.datePart}${this.timeElapsed}Z`);
    const currentScoreDate = new Date(`${this.datePart}${currentScore ?? '23:59:59'}Z`);
    if (highScoreDate.valueOf() < currentScoreDate.valueOf()) {
      this.highScores[JSON.stringify(difficulty)] = this.timeElapsed;
      window.localStorage.setItem('high-scores', JSON.stringify(this.highScores));
      this.highScore = this.timeElapsed;
      this.highScoreChanged.emit(this.timeElapsed);
    }
  }
  loadScores() {
    this.highScores = JSON.parse(window.localStorage.getItem('high-scores')) ?? {};
  }
}
