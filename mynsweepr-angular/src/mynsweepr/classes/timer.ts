import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ITimer {
  elapsed: Observable<string>;
  start(): number;
  stop(id: number): void;
  reset(): void;
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
  private timerId = -1;
  constructor() {
    this.timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    } as Intl.DateTimeFormatOptions);
    this.zeroTime = this.timeFormatter.format(this.offsetAtEpoch).replace(/^24/, '00');
    this.elapsedSource = new BehaviorSubject<string>(this.zeroTime);
    this.elapsed = this.elapsedSource.asObservable();
  }
  start(): number {
    if (this.timerId === -1) {
      this.started = Date.now();
      this.timerId = window.setInterval(() => this.updateElapsed(), 500);
    }
    return this.timerId;
  }
  updateElapsed(): void {
    const elapsedMs = Date.now() - this.started;
    this.elapsedSource.next(this.timeFormatter.format(this.offsetAtEpoch + elapsedMs).replace(/^24/, '00'));
  }
  stop(timerId: number): void {
    window.clearInterval(timerId);
    this.timerId = -1;
  }
  reset(): void {
    if (this.timerId !== -1) {
      this.stop(this.timerId);
    }
    this.elapsedSource.next(this.zeroTime);
  }
}
