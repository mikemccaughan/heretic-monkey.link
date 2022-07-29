/**
 * Provides a simple wrapper around setInterval for timing things. 
 * Optionally updates the DOM with the elapsed time (if given an 
 * HTMLElement in constructor)
 */
export default class Timer {
    /**
     * @param {HTMLElement | null | undefined} timerElement The element which 
     * will take the output of the Timer, or null.
     */
    constructor(timerElement) {
        this.element = timerElement;
        this.timerId = -1;
        this.lastCheck = Date.now();
        this.lastElapsed = 0;
        this.elapsed = 0;
        this.isRunning = false;
        this.onTick = null;
        this.format = "MM:SS";
        this.formatter = null;
    }
    #getFormatter() {
        if (this.formatter != null) {
            return this.formatter;
        }

        /** @type {Intl.DateTimeFormatOptions} */
        let options = {
            hourCycle: 'h23',
        };
        if (this.format.includes('HH') || this.format.includes('hh')) {
            options.hour = '2-digit';
        } else if (this.format.includes('H') || this.format.includes('h')) {
            options.hour = 'numeric';
        } else {
            delete options.hour;
            delete options.hourCycle;
        }
        if (this.format.includes('MM') || this.format.includes('mm')) {
            options.minute = '2-digit';
        } else if (this.format.includes('M') || this.format.includes('m')) {
            options.minute = 'numeric';
        } else {
            delete options.minute;
        }
        if (this.format.includes('SS') || this.format.includes('ss')) {
            options.second = '2-digit';
        } else if (this.format.includes('S') || this.format.includes('s')) {
            options.second = 'numeric';
        } else {
            delete options.second;
        }
        if (this.format.includes('F') || this.format.includes('f')) {
            const fractionCount = [...this.format].filter(c => c === 'f' || c === 'F').length;
            /** @type {0|1|2|3} */
            const digitCount = fractionCount == 0 ? 0 : 
                fractionCount === 1 ? 1 : 
                fractionCount === 2 ? 2 : 
                fractionCount >= 3 ? 3 : 
                /* It can never reach this, but supply 0 anyway */ 0;
            options.fractionalSecondDigits = digitCount;
        } else {
            options.fractionalSecondDigits = 0;
        }
        return this.formatter = new Intl.DateTimeFormat([], options);
    }
    /**
     * Run whenever the timer "ticks" (every ~100ms).
     */
    tick() {
        this.isRunning = true;
        this.elapsed = Date.now() - this.lastCheck;
        // Because of the way setTimeout works, it is possible the tick() function
        // will be called twice in rapid succession, thereby defeating the purpose
        // of this class, which is to provide a somewhat more stable timing mechanism.
        // So this checks that the last time this function was called is not within 
        // the same millisecond as the last call. But that's it.
        if (this.lastElapsed !== this.elapsed) {
            if (this.element != null) {
                this.element.textContent = this.toString();
            }
            if (typeof this.onTick === 'function') {
                this.onTick(this.elapsed);
            }
            this.lastElapsed = this.elapsed;
        }
    }
    /**
     * Stops the timer if it is already tunning. Clears the elapsed time and resets
     * the timer.
     */
    start() {
        this.stop();
        this.clear();
        this.lastCheck = Date.now();
        // eslint-disable-next-line no-undef
        this.timerId = window.setInterval(this.tick.bind(this), 100);
        if (this.element != null) {
            this.element.setAttribute("data-timer", this.timerId.toString(10));
        }
    }
    /**
     * Stops the timer. Does not reset the elapsed time to 0.
     */
    stop() {
        if (this.timerId > 0) {
            // eslint-disable-next-line no-undef
            window.clearInterval(this.timerId);
        }
        if (this.element != null) {
            this.element.setAttribute("data-timer", null);
        }
        this.isRunning = false;
    }
    /**
     * Resets the elapsed to 0, but continues the timer.
     */
    clear() {
        this.elapsed = 0;
        if (this.element != null) {
            this.element.textContent = this.toString();
        }
    }
    /**
     * Returns the time elapsed since `start()` or `clear()` was called; if `start()` was 
     * never called, or if `stop()` was called, returns "00:00". 
     * @returns The number of milliseconds that have elapsed, expressed in a MM:SS format. 
     * Maxes out at 99 minutes, 59 seconds.
     */
    toString() {
        // assumes this.elapsed is measured in milliseconds.
        const t = this.elapsed;
        const formatter = this.#getFormatter();
        return formatter.format(t);
    }
}