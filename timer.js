export default class Timer {
    constructor(timerElement) {
        this.element = timerElement;
        this.timerId = -1;
        this.lastCheck = Date.now();
        this.lastElapsed = 0;
        this.elapsed = 0;
        this.isRunning = false;
    }
    tick() {
        this.isRunning = true;
        this.elapsed = Date.now() - this.lastCheck;
        if (this.lastElapsed !== this.elapsed) {
            this.element.innerHTML = this.toString();
            this.lastElapsed = this.elapsed;
        }
    }
    start() {
        this.stop();
        this.clear();
        this.lastCheck = Date.now();
        this.timerId = setInterval(this.tick.bind(this), 100);
        this.element.setAttribute("data-timer", this.timerId);
    }
    stop() {
        clearInterval(this.timerId);
        this.element.setAttribute("data-timer", null);
        this.isRunning = false;
    }
    clear() {
        this.elapsed = 0;
        this.element.innerHTML = this.toString();
    }
    toString() {
        let t = this.elapsed;
        let m = Math.floor(t / 60000);
        t = t % 60000;
        let s = Math.floor(t / 1000);
        return `${`00${m}`.slice(-2)}:${`00${s}`.slice(-2)}`;
    }
}