/**
 * Provides an easy API for dealing with spans of time.
 */
export default class TimeSpan {
  #isProcessing;
  #totalDays;
  #totalHours;
  #totalMinutes;
  #totalSeconds;
  #totalMilliseconds;
  #days;
  #hours;
  #minutes;
  #seconds;
  #milliseconds;
  #ms;
  static #zero;
  static #minValue;
  static #maxValue;
  /**
   * A TimeSpan representing no elapsed time.
   */
  static get Zero() {
    return TimeSpan.#zero ?? (TimeSpan.#zero = new TimeSpan(0));
  }
  /**
   * A TimeSpan representing the minimum amount of time representable by this type.
   */
  static get MinValue() {
    return TimeSpan.#minValue ?? (TimeSpan.#minValue = new TimeSpan(-8640000000000000));
  }
  /**
   * A TimeSpan representing the maximum amount of time representable by this type.
   */
   static get MaxValue() {
    return TimeSpan.#maxValue ?? (TimeSpan.#maxValue = new TimeSpan(8640000000000000));
  }
  /**
   * The number of "ms" units per millisecond of time.
   */
  static get msPerMillisecond() {
    return 1;
  }
  /**
   * The number of "ms" units per second of time.
   */
  static get msPerSecond() {
    return 1000;
  }
  /**
   * The number of seconds per minute.
   */
  static get secondPerMinute() {
    return 60;
  }
  /**
   * The number of "ms" units per minute of time.
   */
  static get msPerMinute() {
    return TimeSpan.secondPerMinute * TimeSpan.msPerSecond;
  }
  /**
   * The number of minutes per hour.
   */
  static get minutePerHour() {
    return 60;
  }
  /**
   * The number of "ms" units per hour of time.
   */
  static get msPerHour() {
    return TimeSpan.minutePerHour * TimeSpan.msPerMinute;
  }
  /**
   * The number of hours per day.
   */
  static get hourPerDay() {
    return 24;
  }
  /**
   * The number of "ms" units per day of time.
   */
  static get msPerDay() {
    return TimeSpan.hourPerDay * TimeSpan.msPerHour;
  }
  /**
   * Initializes the TimeSpan instance with a specified number of days, hours, minutes, seconds, and milliseconds.
   * @param {number} days The total number of days represented in the TimeSpan
   * @param {number} hours The total number of hours represented in the TimeSpan
   * @param {number} minutes The total number of minutes represented in the TimeSpan
   * @param {number} seconds The total number of seconds represented in the TimeSpan
   * @param {number} milliseconds The total number of milliseconds represented in the TimeSpan
   */
  /**
   * Initializes the TimeSpan instance with a specified number of hours, minutes, and seconds.
   * @param {number} hours The total number of hours represented in the TimeSpan
   * @param {number} minutes The total number of minutes represented in the TimeSpan
   * @param {number} seconds The total number of seconds represented in the TimeSpan
   */
  /**
   * Initializes the TimeSpan instance with a specified number of "ms" units.
   * @param {number} ms The total number of "ms" units represented in the TimeSpan
   */
  constructor(msOrHigher, ...args) {
    this.#isProcessing = true;
    if (args.length > 5) {
      throw new Error('The TimeSpan constructor only takes 5 or fewer arguments');
    } else if (args.length > 3) {
      [this.#totalDays, this.#totalHours, this.#totalMinutes, this.#totalSeconds, this.#totalMilliseconds] = [msOrHigher, ...args];
    } else if (args.length <= 3 && args.length > 1) {
      [this.#totalHours, this.#totalMinutes, this.#totalSeconds] = [msOrHigher, ...args];
    } else {
      this.#ms = msOrHigher ?? 0;
    }
    if (this.#totalDays != null || this.#totalHours != null || this.#totalMinutes != null || this.#totalSeconds != null || this.#totalMilliseconds != null) {
      // Got more than one argument
      this.#totalMilliseconds =
        (this.#totalMilliseconds ?? 0) +
        ((this.#totalDays ?? 0) * TimeSpan.msPerDay) / TimeSpan.msPerMillisecond +
        ((this.#totalHours ?? 0) * TimeSpan.msPerHour) / TimeSpan.msPerMillisecond +
        ((this.#totalMinutes ?? 0) * TimeSpan.msPerMinute) / TimeSpan.msPerMillisecond +
        ((this.#totalSeconds ?? 0) * TimeSpan.msPerSecond) / TimeSpan.msPerMillisecond;
      this.#ms = this.#totalMilliseconds * TimeSpan.msPerMillisecond;
    }
    this.process();
  }
  /**
   * Processes any input given to the TimeSpan, populating properties with their intended values.
   */
  process() {
    this.#isProcessing = true;
    console.time('process');
    this.#totalMilliseconds = this.#ms / TimeSpan.msPerMillisecond;
    this.#totalSeconds = this.#ms / TimeSpan.msPerSecond;
    this.#totalMinutes = this.#ms / TimeSpan.msPerMinute;
    this.#totalHours = this.#ms / TimeSpan.msPerHour;
    this.#totalDays = this.#ms / TimeSpan.msPerDay;
    this.#milliseconds = this.asDate.getUTCMilliseconds();
    this.#seconds = this.asDate.getUTCSeconds();
    this.#minutes = this.asDate.getUTCMinutes();
    this.#hours = this.asDate.getUTCHours();
    let tempDate = new Date(this.asDate.valueOf());
    let days = 0;
    while (tempDate.getUTCMonth() > 0) {
      days += tempDate.getUTCDate();
      tempDate.setUTCDate(0);
    }
    this.#days = days + this.asDate.getUTCDate() - 1;
    console.timeEnd('process');
    this.#isProcessing = false;
  }
  /**
   * Adds the amount of time represented by this TimeSpan to the given Date.
   * @param {Date} date The Date object to which to add the current TimeSpan`
   * @returns {Date} The date value, with the amount of time represented by this TimeSpan added to it.
   */
  addToDate(date) {
    if (date == null || typeof date !== 'object' || !(date instanceof Date) || Number.isNaN(date.valueOf())) {
      throw new TypeError(`The date passed to addToDate must be a Date object; ${date} is not.`);
    }
    return new Date(date.valueOf() + this.totalMilliseconds);
  }
  /**
   * Removes the amount of time represented by this TimeSpan to the given Date.
   * @param {Date} date The Date object from which to remove the current TimeSpan`
   * @returns {Date} The date value, with the amount of time represented by this TimeSpan removed from it.
   */
   subtractFromDate(date) {
    if (date == null || typeof date !== 'object' || !(date instanceof Date) || Number.isNaN(date.valueOf())) {
      throw new TypeError(`The date passed to subtractFromDate must be a Date object; ${date} is not.`);
    }
    return new Date(date.valueOf() - this.totalMilliseconds);
  }
  /**
   * Provides the amount of time as a Date value (essentially the same as `this.addToDate(new Date(0))`).
   */
  get asDate() {
    return new Date(this.#totalMilliseconds);
  }
  /**
   * Provides the total number of days represented by this TimeSpan.
   */
  get totalDays() {
    return this.#totalDays;
  }
  /**
   * Provides the total number of hours represented by this TimeSpan.
   */
   get totalHours() {
    return this.#totalHours;
  }
  /**
   * Provides the total number of minutes represented by this TimeSpan.
   */
   get totalMinutes() {
    return this.#totalMinutes;
  }
  /**
   * Provides the total number of seconds represented by this TimeSpan.
   */
   get totalSeconds() {
    return this.#totalSeconds;
  }
  /**
   * Provides the total number of milliseonds represented by this TimeSpan.
   */
   get totalMilliseconds() {
    return this.#totalMilliseconds;
  }
  /**
   * Provides the number of days represented by this TimeSpan. Unless the TimeSpan represents 
   * exactly a whole number of days, likely needs to be combined with other properties.
   */
   get days() {
    return this.#days;
  }
  /**
   * Provides the number of hours represented by this TimeSpan. Unless the TimeSpan represents 
   * exactly a whole number of hours, likely needs to be combined with other properties.
   */
   get hours() {
    return this.#hours;
  }
  /**
   * Provides the number of minutes represented by this TimeSpan. Unless the TimeSpan represents 
   * exactly a whole number of minutes, likely needs to be combined with other properties.
   */
   get minutes() {
    return this.#minutes;
  }
  /**
   * Provides the number of seconds represented by this TimeSpan. Unless the TimeSpan represents 
   * exactly a whole number of seconds, likely needs to be combined with other properties.
   */
   get seconds() {
    return this.#seconds;
  }
  /**
   * Provides the number of milliseconds represented by this TimeSpan. Unless the TimeSpan represents 
   * exactly a whole number of milliseconds, likely needs to be combined with other properties.
   */
   get milliseconds() {
    return this.#milliseconds;
  }
  /**
   * Creates a TimeSpan from the number of milliseconds since the Unix epoch (1970-01-01T090:00:00.000Z)
   * @param {Date} value The Date from which to create a TimeSpan value.
   * @returns The TimeSpan generated by the value of the Date object.
   */
  static fromDate(value) {
    if (value == null || typeof value !== 'object' || !(value instanceof Date) || Number.isNaN(value.valueOf())) {
      throw new TypeError(`The value passed to fromDate must be a Date object; ${value} is not.`);
    }
    return new TimeSpan(value.valueOf() * TimeSpan.msPerMillisecond);
  }
  /**
   * Creates a TimeSpan representing the number of days given.
   * @param {number} value The number of days from which to create a TimeSpan value.
   * @returns The TimeSpan generated by the number of days specified.
   */
  static fromDays(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerDay);
  }
  /**
   * Creates a TimeSpan representing the number of hours given.
   * @param {number} value The number of hours from which to create a TimeSpan value.
   * @returns The TimeSpan generated by the number of hours specified.
   */
  static fromHours(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerHour);
  }
  /**
   * Creates a TimeSpan representing the number of minutes given.
   * @param {number} value The number of minutes from which to create a TimeSpan value.
   * @returns The TimeSpan generated by the number of minutes specified.
   */
  static fromMinutes(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerMinute);
  }
  /**
   * Creates a TimeSpan representing the number of seconds given.
   * @param {number} value The number of seconds from which to create a TimeSpan value.
   * @returns The TimeSpan generated by the number of seconds specified.
   */
   static fromSeconds(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerSecond);
  }
  /**
   * Creates a TimeSpan representing the number of milliseconds given.
   * @param {number} value The number of milliseconds from which to create a TimeSpan value.
   * @returns The TimeSpan generated by the number of milliseconds specified.
   */
   static fromMilliseconds(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerMillisecond);
  }
  /**
   * Creates a TimeSpan representing the number of "ms" units given.
   * @param {number} value The number of "ms" units from which to create a TimeSpan value.
   * @returns The TimeSpan generated by the number of "ms" units specified.
   */
   static fromMs(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value);
  }
  /**
   * Creates a TimeSpan representing the number of milliseconds between the two Date objects given.
   * @param {Date} earlierDate The earlier of the two Dates
   * @param {Date} laterDate The later of the two Dates
   * @returns The TimeSpan generated by the number of milliseconds between the two Date objects given.
   */
   static fromSubtractingTwoDates(earlierDate, laterDate) {
    if (earlierDate == null || typeof earlierDate !== 'object' || !(earlierDate instanceof Date) || Number.isNaN(earlierDate.valueOf())) {
      throw new TypeError(`The earlierDate passed to fromSubtractingTwoDates must be a Date object; ${earlierDate} is not.`);
    }
    if (laterDate == null || typeof laterDate !== 'object' || !(laterDate instanceof Date) || Number.isNaN(laterDate.valueOf())) {
      throw new TypeError(`The laterDate passed to fromSubtractingTwoDates must be a Date object; ${laterDate} is not.`);
    }
    return TimeSpan.fromMilliseconds(laterDate.valueOf() - earlierDate.valueOf());
  }
  /**
   * The current value of the TimeSpan, as an object with days, hours, minutes, and seconds properties, stringified.
   * @returns The value of the TimeSpan, as an object with days, hours, minutes, and seconds properties, stringified.
   */
  toJson() {
    return JSON.stringify({
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds+ (this.milliseconds * TimeSpan.msPerMillisecond / TimeSpan.msPerSecond)
    });
  }
  /**
   * The current value of the TimeSpan, as a duration in ISO 8601 format.
   * @returns The value of the TimeSpan formatted as a Date in ISO format.
   */
   toString() {
    return `P${this.days}DT${this.hours}H${this.minutes}M${this.seconds + (this.milliseconds * TimeSpan.msPerMillisecond / TimeSpan.msPerSecond)}S`
  }
}
