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
  static get Zero() {
    return TimeSpan.#zero ?? (TimeSpan.#zero = new TimeSpan(0));
  }
  static get MinValue() {
    return TimeSpan.#minValue ?? (TimeSpan.#minValue = new TimeSpan(-8640000000000000));
  }
  static get MaxValue() {
    return TimeSpan.#maxValue ?? (TimeSpan.#maxValue = new TimeSpan(8640000000000000));
  }
  static get msPerMillisecond() {
    return 1;
  }
  static get msPerSecond() {
    return 1000;
  }
  static get secondPerMinute() {
    return 60;
  }
  static get msPerMinute() {
    return TimeSpan.secondPerMinute * TimeSpan.msPerSecond;
  }
  static get minutePerHour() {
    return 60;
  }
  static get msPerHour() {
    return TimeSpan.minutePerHour * TimeSpan.msPerMinute;
  }
  static get hourPerDay() {
    return 24;
  }
  static get msPerDay() {
    return TimeSpan.hourPerDay * TimeSpan.msPerHour;
  }
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
  addToDate(date) {
    if (date == null || typeof date !== 'object' || !(date instanceof Date) || Number.isNaN(date.valueOf())) {
      throw new TypeError(`The date passed to addToDate must be a Date object; ${date} is not.`);
    }
    return new Date(date.valueOf() + this.totalMilliseconds);
  }
  subtractFromDate(date) {
    if (date == null || typeof date !== 'object' || !(date instanceof Date) || Number.isNaN(date.valueOf())) {
      throw new TypeError(`The date passed to subtractFromDate must be a Date object; ${date} is not.`);
    }
    return new Date(date.valueOf() - this.totalMilliseconds);
  }
  get asDate() {
    return new Date(this.#totalMilliseconds);
  }
  get totalDays() {
    return this.#totalDays;
  }
  get totalHours() {
    return this.#totalHours;
  }
  get totalMinutes() {
    return this.#totalMinutes;
  }
  get totalSeconds() {
    return this.#totalSeconds;
  }
  get totalMilliseconds() {
    return this.#totalMilliseconds;
  }
  get days() {
    return this.#days;
  }
  get hours() {
    return this.#hours;
  }
  get minutes() {
    return this.#minutes;
  }
  get seconds() {
    return this.#seconds;
  }
  get milliseconds() {
    return this.#milliseconds;
  }
  static fromDate(value) {
    if (value == null || typeof value !== 'object' || !(value instanceof Date) || Number.isNaN(value.valueOf())) {
      throw new TypeError(`The value passed to fromDate must be a Date object; ${value} is not.`);
    }
    return new TimeSpan(value.valueOf() * TimeSpan.msPerMillisecond);
  }
  static fromDays(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerDay);
  }
  static fromHours(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerHour);
  }
  static fromMinutes(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerMinute);
  }
  static fromSeconds(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerSecond);
  }
  static fromMilliseconds(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value * TimeSpan.msPerMillisecond);
  }
  static fromMs(value) {
    if (value == null || typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`The value passed to fromDate must be a number value; ${value} is not.`);
    }
    return new TimeSpan(value);
  }
  static fromSubtractingTwoDates(earlierDate, laterDate) {
    if (earlierDate == null || typeof earlierDate !== 'object' || !(earlierDate instanceof Date) || Number.isNaN(earlierDate.valueOf())) {
      throw new TypeError(`The earlierDate passed to fromSubtractingTwoDates must be a Date object; ${earlierDate} is not.`);
    }
    if (laterDate == null || typeof laterDate !== 'object' || !(laterDate instanceof Date) || Number.isNaN(laterDate.valueOf())) {
      throw new TypeError(`The laterDate passed to fromSubtractingTwoDates must be a Date object; ${laterDate} is not.`);
    }
    return TimeSpan.fromMilliseconds(laterDate.valueOf() - earlierDate.valueOf());
  }
  toJson() {
    return this.asDate.toISOString();
  }
  toString() {
    return this.toJson();
  }
}
