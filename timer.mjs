/**
 * Provides a simple wrapper around setInterval for timing things. 
 * Optionally updates the DOM with the elapsed time (if given an 
 * HTMLElement in constructor)
 */
export default class Timer {
    /**
     * The HTML Element which takes the formatted elapsed time on every `tick`.
     * @type {HTMLElement | null | undefined}
     */
    #element;
    /**
     * The ID of the `setTimeout` call.
     * @type {number}
     */
    #timerId;
    /**
     * The Date (as the number of milliseconds since the epoch) when the last check
     * was performed.
     * @type {number}
     */
    #lastCheck;
    /**
     * The value of the elapsed time of this timer instance when it was last checked.
     * @type {number}
     */
    #lastElapsed;
    /**
     * The number of milliseconds that have occurred since `start()` was called on this instance.
     * @type {number}
     */
    #elapsed;
    /**
     * Indicates whether this timer is running.
     * @type {boolean}
     */
    #isRunning;
    /**
     * A reference to the function to be called whenever a `tick` occurs.
     * @type {(elapsed: number) => void}
     */
    #onTick;
    /**
     * The format to use for the elapsed value when output to #element or in the toString output.
     * @type {string}
     * @remarks Should be limited to H or HH (for 12 or 24 hours), M or MM (for minutes, with or without zero padding),
     * S or SS (for seconds, with or without zero padding), and zero to 3 Fs or fs indicating the number of fractional
     * digits of seconds to display. Note that the capital F signifies nothing different from f; same with the other letters.
     */
    #format;
    /**
     * The `Intl.DateTimeFormat` to use when formatting the elapsed time to human-readable time using format.
     * @type {Intl.DateTimeFormat}
     */
    #formatter;

    /**
     * Indicates whether this timer instance is running.
     */
    get isRunning() {
        return this.#isRunning;
    }

    /**
     * Gets or sets a reference to a function to call with the current number of milliseconds elapsed.
     */
    get onTick() {
        return this.#onTick;
    }
    set onTick(value) {
        if (typeof value === 'function') {
            this.#onTick = value;
        }
    }

    /**
     * Gets or sets the format to use for the elapsed value when output to #element or in the toString output.
     * @type {string}
     * @remarks Should be limited to H or HH (for 12 or 24 hours), M or MM (for minutes, with or without zero padding),
     * S or SS (for seconds, with or without zero padding), and zero to 3 Fs or fs indicating the number of fractional
     * digits of seconds to display. Note that the capital F signifies nothing different from f; same with the other letters.
     */
    get format() {
        return this.#format;
    }
    set format(value) {
        if (this.#format !== value) {
            this.#format = value;
        }
    }

    /**
     * @param {HTMLElement | null | undefined} timerElement The element which 
     * will take the output of the Timer, or null.
     */
    constructor(timerElement) {
        this.#element = timerElement;
        this.#timerId = -1;
        this.#lastCheck = Date.now();
        this.#lastElapsed = 0;
        this.#elapsed = 0;
        this.#isRunning = false;
        this.#onTick = () => {};
        this.#format = "MM:SS";
        this.#formatter = this.#getFormatter();
    }
    /**
     * Gets the Intl.DateTimeFormat used to format the elapsed time.
     * @returns {Intl.DateTimeFormat} The formatter, set up to format the elapsed time
     * according to the given format.
     */
    #getFormatter() {
        if (this.#formatter != null) {
            return this.#formatter;
        }

        /** @type {Intl.DateTimeFormatOptions} */
        let options = {
            hourCycle: 'h23',
        };
        if (this.#format.includes('HH') || this.#format.includes('hh')) {
            options.hour = '2-digit';
            if (this.#format.includes('h')) {
                options.hour12 = true;
                options.hourCycle = 'h12';
            }
        } else if (this.#format.includes('H') || this.#format.includes('h')) {
            options.hour = 'numeric';
            if (this.#format.includes('h')) {
                options.hour12 = true;
                options.hourCycle = 'h12';
            }
        } else {
            delete options.hour;
            delete options.hour12;
            delete options.hourCycle;4
        }
        if (this.#format.includes('MM') || this.#format.includes('mm')) {
            options.minute = '2-digit';
        } else if (this.#format.includes('M') || this.#format.includes('m')) {
            options.minute = 'numeric';
        } else {
            delete options.minute;
        }
        if (this.#format.includes('SS') || this.#format.includes('ss')) {
            options.second = '2-digit';
        } else if (this.#format.includes('S') || this.#format.includes('s')) {
            options.second = 'numeric';
        } else {
            delete options.second;
        }
        if (this.#format.includes('F') || this.#format.includes('f')) {
            const fractionCount = [...this.#format].filter(c => c === 'f' || c === 'F').length;
            /** @type {0|1|2|3} */
            const digitCount = fractionCount <= 0 ? 0 : 
                fractionCount === 1 ? 1 : 
                fractionCount === 2 ? 2 : 
                fractionCount >= 3 ? 3 : 
                /* It can never reach this, but supply 0 anyway */ 0;
            options.fractionalSecondDigits = digitCount === 0 ? undefined : digitCount;
        } else {
            options.fractionalSecondDigits = undefined;
        }
        return this.#formatter = new Intl.DateTimeFormat([], options);
    }
    /**
     * Run whenever the timer "ticks" (every ~100ms).
     */
    tick() {
        this.#isRunning = true;
        this.#elapsed = Date.now() - this.#lastCheck;
        // Because of the way setTimeout works, it is possible the tick() function
        // will be called twice in rapid succession, thereby defeating the purpose
        // of this class, which is to provide a somewhat more stable timing mechanism.
        // So this checks that the last time this function was called is not within 
        // the same millisecond as the last call. But that's it.
        if (this.#lastElapsed !== this.#elapsed) {
            if (this.#element != null) {
                this.#element.textContent = this.toString();
            }
            if (typeof this.#onTick === 'function') {
                this.#onTick(this.#elapsed);
            }
            this.#lastElapsed = this.#elapsed;
        }
    }
    /**
     * Stops the timer if it is already running. Clears the elapsed time and resets
     * the timer.
     */
    start() {
        this.stop();
        this.clear();
        this.#lastCheck = Date.now();
        // eslint-disable-next-line no-undef
        this.#timerId = window.setInterval(this.tick.bind(this), 100);
        if (this.#element != null) {
            this.#element.setAttribute("data-timer", this.#timerId.toString(10));
        }
    }
    /**
     * Stops the timer. Does not reset the elapsed time to 0.
     */
    stop() {
        if (this.#timerId > 0) {
            // eslint-disable-next-line no-undef
            window.clearInterval(this.#timerId);
        }
        if (this.#element != null) {
            this.#element.setAttribute("data-timer", null);
        }
        this.#isRunning = false;
    }
    /**
     * Resets the elapsed to 0, but continues the timer.
     */
    clear() {
        this.#elapsed = 0;
        if (this.#element != null) {
            this.#element.textContent = this.toString();
        }
    }
 
    /**
     * The elapsed time of the timer
     * @returns The number of milliseconds that have elapsed since `start()` was called until now, or 
     * when `stop()` was last called.
     */
     valueOf() {
        return this.#elapsed;
    }

    /**
     * Returns the time elapsed since `start()` or `clear()` was called; if `start()` was 
     * never called, or if `stop()` was called, returns "00:00". 
     * @returns The number of milliseconds that have elapsed, expressed in a MM:SS format by default. 
     * Maxes out at 99 minutes, 59 seconds.
     */
    toString() {
        // assumes this.elapsed is measured in milliseconds.
        const t = this.#elapsed;
        const formatter = this.#getFormatter();
        return formatter.format(t);
    }
}