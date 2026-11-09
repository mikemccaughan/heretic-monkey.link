/**
 * Timer class to manage elapsed time.
 * It provides methods to start, stop, reset the timer and get the elapsed time in seconds or formatted as mm:ss.
 * 
 * NB: Implemented in whole by whatever AI model was running in VSCode at the time (Copilot? Gemini?).
 */
export class Timer {
    private _startTime: number = 0;
    private _elapsedTime: number = 0;
    private _intervalId: number | null = null;

    constructor() {
        this._startTime = Date.now();
    }

    public start(): void {
        if (this._intervalId) return;
        this._startTime = Date.now() - this._elapsedTime;
        this._intervalId = setInterval(() => {
            this._elapsedTime = Date.now() - this._startTime;
        }, 1000);
    }

    public stop(): void {
        if (!this._intervalId) return;
        clearInterval(this._intervalId);
        this._intervalId = null;
    }

    public reset(): void {
        this.stop();
        this._elapsedTime = 0;
        this._startTime = Date.now();
    }

    public get elapsedTime(): number {
        return Math.floor(this._elapsedTime / 1000);
    }

    public get formattedTime(): string {
        const totalSeconds = this.elapsedTime;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}