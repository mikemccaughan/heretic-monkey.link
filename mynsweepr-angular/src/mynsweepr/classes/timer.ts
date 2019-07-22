import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ITimer {
  elapsed: Observable<string>;
  start(): number;
  stop(id: number): void;
}

@Injectable({
  providedIn: 'root'
})
export class Timer implements ITimer {
  private elapsedSource: BehaviorSubject<string>;
  public elapsed: Observable<string>;
  private timeFormatter: Intl.DateTimeFormat;
  private offsetAtEpoch: number = new Date(0).getTimezoneOffset() * 60000;
  private zeroTime: string;
  private started: number = Date.now();
  constructor() {
    this.timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    } as Intl.DateTimeFormatOptions);
    this.zeroTime = this.timeFormatter.format(this.offsetAtEpoch);
    this.elapsedSource = new BehaviorSubject<string>(this.zeroTime);
    this.elapsed = this.elapsedSource.asObservable();
  }
  start(): number {
    this.started = Date.now();
    return window.setInterval(() => this.updateElapsed(), 500);
  }
  updateElapsed(): void {
    const elapsedMs = Date.now() - this.started;
    this.elapsedSource.next(this.timeFormatter.format(this.offsetAtEpoch + elapsedMs));
  }
  stop(timerId: number): void {
    window.clearInterval(timerId);
    this.elapsedSource.next(this.zeroTime);
  }
}
