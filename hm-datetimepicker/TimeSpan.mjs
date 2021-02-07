export default class TimeSpan {
  static Zero = new TimeSpan(0);
  static MinValue = new TimeSpan(-8640000000000000);
  static MaxValue = new TimeSpan(8640000000000000);
  static msPerMillisecond = 1;
  static msPerSecond = 1000;
  static secondPerMinute = 60;
  static msPerMinute = TimeSpan.secondPerMinute * TimeSpan.msPerSecond;
  static minutePerHour = 60;
  static msPerHour = TimeSpan.minutePerHour * TimeSpan.msPerMinute;
  static hourPerDay = 24;
  static msPerDay = TimeSpan.hourPerDay * TimeSpan.msPerHour;
  constructor(msOrHigher, ...args) {
    this._isProcessing = true;
    if (args.length > 4) {
      throw new Error(
        'The TimeSpan constructor only takes 5 or fewer arguments'
      );
    } else if (args.length > 2) {
      [
        this._totalDays,
        this._totalHours,
        this._totalMinutes,
        this._totalSeconds,
        this._totalMilliseconds,
      ] = [msOrHigher, ...args];
    } else if (args.length <= 2 && args.length > 0) {
      [this._totalHours, this._totalMinutes, this._totalSeconds] = [
        msOrHigher,
        ...args,
      ];
    } else {
      this._ms = msOrHigher;
    }
    if (
      this._totalDays != null ||
      this._totalHours != null ||
      this._totalMinutes != null ||
      this._totalSeconds != null ||
      this._totalMilliseconds != null
    ) {
      // Got more than one argument
      this._totalMilliseconds =
        (this._totalMilliseconds ?? 0) +
        ((this._totalDays ?? 0) * TimeSpan.msPerDay) /
          TimeSpan.msPerMillisecond +
        ((this._totalHours ?? 0) * TimeSpan.msPerHour) /
          TimeSpan.msPerMillisecond +
        ((this._totalMinutes ?? 0) * TimeSpan.msPerMinute) /
          TimeSpan.msPerMillisecond +
        ((this._totalSeconds ?? 0) * TimeSpan.msPerSecond) /
          TimeSpan.msPerMillisecond;
      this._ms = this._totalMilliseconds * TimeSpan.msPerMillisecond;
    }
    this.process();
  }
  process() {
    this._isProcessing = true;
    console.time('process');
    this._totalMilliseconds = this._ms / TimeSpan.msPerMillisecond;
    this._totalSeconds = this._ms / TimeSpan.msPerSecond;
    this._totalMinutes = this._ms / TimeSpan.msPerMinute;
    this._totalHours = this._ms / TimeSpan.msPerHour;
    this._totalDays = this._ms / TimeSpan.msPerDay;
    this._milliseconds = this._asDate.getUTCMilliseconds();
    this._seconds = this._asDate.getUTCSeconds();
    this._minutes = this._asDate.getUTCMinutes();
    this._hours = this._asDate.getUTCHours();
    let tempDate = new Date(this._asDate.valueOf());
    let days = 0;
    while (tempDate.getUTCMonth() > 0) {
      days += tempDate.getUTCDate();
      tempDate.setUTCDate(0);
    }
    this._days = days + this._asDate.getUTCDate() - 1;
    console.timeEnd('process');
    this._isProcessing = false;
  }
  get asDate() {
    return new Date(this._totalMilliseconds);
  }
  get totalDays() {
    return this._totalDays;
  }
  get totalHours() {
    return this._totalHours;
  }
  get totalMinutes() {
    return this._totalMinutes;
  }
  get totalSeconds() {
    return this._totalSeconds;
  }
  get totalMillieconds() {
    return this._totalMillieconds;
  }
  get days() {
    return this._days;
  }
  get hours() {
    return this._hours;
  }
  get minutes() {
    return this._minutes;
  }
  get seconds() {
    return this._seconds;
  }
  get milliseconds() {
    return this._milliseconds;
  }
  fromDate(value) {
    if (!this._isProcessing) {
      this._ms = value.valueOf() * TimeSpan.msPerMillisecond;
      this.process();
    }
  }
  fromDays(value) {
    if (!this._isProcessing) {
      this._ms = value * TimeSpan.msPerDay;
      this.process();
    }
  }
  fromHours(value) {
    if (!this._isProcessing) {
      this._ms = value * TimeSpan.msPerHour;
      this.process();
    }
  }
  fromMinutes(value) {
    if (!this._isProcessing) {
      this._ms = value * TimeSpan.msPerMinute;
      this.process();
    }
  }
  fromSeconds(value) {
    if (!this._isProcessing) {
      this._ms = value * TimeSpan.msPerSecond;
      this.process();
    }
  }
  fromMilliseconds(value) {
    if (!this._isProcessing) {
      this._ms = value * TimeSpan.msPerMillisecond;
      this.process();
    }
  }
  fromMs(value) {
    if (!this._isProcessing) {
      this._ms = value;
      this.process();
    }
  }
}
