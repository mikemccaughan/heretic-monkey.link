// Still no reliable import of JSON files; zone1970.mjs is a copy of zone1970.json as
// an ESM file (basically tacking `export default` before the data).
import tzdb from './zone1970.mjs';
/**
 * Provides an enumeration of the possible granularities by which dates can be compared.
 */
 export class DateComparisonGranularity {
  static Era = "era";
  static Year = "y";
  static Quarter = "q";
  static Month = "mo";
  static Week = "w";
  static Day = "d";
  static Hour = "h";
  static Minute = "mn";
  static Second = "s";
  static Millisecond = "ms";
  static Default = "ms";
  static Custom = "?";
}
/**
 * Provides basic instance and static date and time formatting functionality.
 */
export default class DateHelper {
  // Basic constants of time.
  /**
   * Number of milliseconds per second
   */
  static msPerSecond = 1000;
  /**
   * Number of milliseconds per minute
   */
  static msPerMinute = DateHelper.msPerSecond * 60;
  /**
   * Number of milliseconds per hour
   */
  static msPerHour = DateHelper.msPerMinute * 60;
  /**
   * Number of milliseconds per day
   */
  static msPerDay = DateHelper.msPerHour * 24;
  /**
   * Number of milliseconds per week
   */
  static msPerWeek = DateHelper.msPerDay * 7;
  /**
   * Number of milliseconds per standard year
   */
  static msPerYear = DateHelper.msPerDay * 365;
  /**
   * Number of milliseconds per leap year
   */
  static msPerLeapYear = DateHelper.msPerDay * 366;
  /***
   * Regular expression for validating BCP 47 language tags, for use as a locale.
   */
  static bcp47re =
    /^((?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(?<privateUse>x(-[A-Za-z0-9]{1,8})+))?)|(?<privateUse1>x(-[A-Za-z0-9]{1,8})+))$/;
  /**
   * A map between a format string and the option(s) to pass to Intl.DateTimeFormat.
   */
  static stringsToFormatMap = {
    /**
     * Formats to ISO 8601 format (using UTC; same as calling toISOString)
     */
    iso: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      hour12: false,
      hourCycle: 'h23',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecond: null,
      fractionalSecondDigits: 3,
      timeZone: 'UTC',
      name: 'iso',
    },
    /**
     * Formats a date in a "full" format; cannot be combined with other formatting strings except times with named formats.
     */
    ud: {
      dateStyle: 'full',
      name: 'date-full',
    },
    /**
     * Formats a time in a "full" format; cannot be combined with other formatting strings except dates with named formats.
     */
    ut: {
      timeStyle: 'full',
      name: 'time-full',
    },
    /**
     * Formats a date and time in a "full" format; cannot be combined with other formatting strings.
     */
    u: {
      dateStyle: 'full',
      timeStyle: 'full',
      name: 'date-time-full',
    },
    /**
     * Formats a date in a "long" format; cannot be combined with other formatting strings except times with named formats.
     */
    ld: {
      dateStyle: 'long',
      name: 'date-long',
    },
    /**
     * Formats a time in a "long" format; cannot be combined with other formatting strings except dates with named formats.
     */
    lt: {
      timeStyle: 'long',
      name: 'time-long',
    },
    /**
     * Formats a date and time in a "long" format; cannot be combined with other formatting strings.
     */
    l: {
      dateStyle: 'long',
      timeStyle: 'long',
      name: 'date-time-long',
    },
    /**
     * Formats a date in a "medium" format; cannot be combined with other formatting strings except times with named formats.
     */
    ed: {
      dateStyle: 'medium',
      name: 'date-medium',
    },
    /**
     * Formats a time in a "medium" format; cannot be combined with other formatting strings except dates with named formats.
     */
    et: {
      timeStyle: 'medium',
      name: 'time-medium',
    },
    /**
     * Formats a date and time in a "medium" format; cannot be combined with other formatting strings.
     */
    eu: {
      dateStyle: 'medium',
      timeStyle: 'medium',
      name: 'date-time-medium',
    },
    /**
     * Formats a date in a "short" format; cannot be combined with other formatting strings except times with named formats.
     */
    rd: {
      dateStyle: 'short',
      name: 'date-time-short',
    },
    /**
     * Formats a time in a "short" format; cannot be combined with other formatting strings except dates with named formats.
     */
    rt: {
      timeStyle: 'short',
      name: 'time-short',
    },
    /**
     * Formats a date and time in a "short" format; cannot be combined with other formatting strings.
     */
    r: {
      dateStyle: 'short',
      timeStyle: 'short',
      name: 'date-time-short',
    },
    /**
     * Formats the era in a "long" format; e.g. Anno Domini
     */
    GGG: {
      era: 'long',
      name: 'era-long',
    },
    /**
     * Formats the era in a "short" format; e.g. AD
     */
    GG: {
      era: 'short',
      name: 'era-short',
    },
    /**
     * Formats the era in a "narrow" format; e.g. A
     */
    G: {
      era: 'narrow',
      name: 'era-narrow',
    },
    /**
     * Formats the year using the minimum number of digits needed; e.g., 2021, 12 (for the year 12 AD), -12 (for the year 12 BC)
     * Note that while it has four letters, it won't necessarily use four digits.
     */
    yyyy: {
      year: 'numeric',
      name: 'year-4-digit',
    },
    /**
     * Formats the year using 2 digits; e.g., 00 refers to any year that ends in 00 (100, 1100, 1900, 2000, etc.)
     */
    yy: {
      year: '2-digit',
      name: 'year-2-digit',
    },
    /**
     * Formats the year using the minimum number of digits needed; e.g., 2021, 12 (for the year 12 AD), -12 (for the year 12 BC)
     */
    y: {
      year: 'numeric',
      name: 'year-numeric',
    },
    /**
     * Formats the month name in a "narrow" format; e.g., J, M, D (note that two months can share a narrow name; March is also formatted as M)
     */
    MMMMM: {
      month: 'narrow',
      name: 'month-narrow',
    },
    /**
     * Formats the month name in a "long" format; e.g., January, May, December
     */
    MMMM: {
      month: 'long',
      name: 'month-long',
    },
    /**
     * Formats the month name in a "short" format; e.g., Jan, May, Dec
     */
    MMM: {
      month: 'short',
      name: 'month-short',
    },
    /**
     * Formats the month number using two digits; e.g., 01, 05, 12
     */
    MM: {
      month: '2-digit',
      name: 'month-2-digit',
    },
    /**
     * Formats the month number using the minimum number of digits needed; e.g., 1, 5, 12
     */
    M: {
      month: 'numeric',
      name: 'month-numeric',
    },
    /**
     * Formats the weekday name in a "long" format; e.g., Sunday, Thursday, Saturday
     */
    EEEE: {
      weekday: 'long',
      name: 'weekday-long',
    },
    /**
     * Formats the weekday name in a "short" format; e.g., Sun, Thu, Sat
     */
    EEE: {
      weekday: 'short',
      name: 'weekday-short',
    },
    /**
     * Formats the weekday name in a "narrow" format; e.g., S, T, S (note that two different days can share a narrow name)
     */
    EEEEE: {
      weekday: 'narrow',
      name: 'weekday-narrow',
    },
    /**
     * Formats the day using two digits; e.g., 01, 05, 12
     */
    dd: {
      day: '2-digit',
      name: 'day-2-digit',
    },
    /**
     * Formats the day using the minimum number of digits needed; e.g., 1, 5, 12
     */
    d: {
      day: 'numeric',
      name: 'day-numeric',
    },
    /**
     * Formats the hour using two digits, on a 24 hour cycle; e.g., 00, 12, 23
     */
    HH: {
      hour: '2-digit',
      hour12: false,
      hourCycle: 'h23',
      name: 'hour-h23-2-digit',
    },
    /**
     * Formats the hour using two digits, on a 12 hour cycle; e.g., 12, 12, 11
     */
    hh: {
      hour: '2-digit',
      hour12: true,
      hourCycle: 'h12',
      name: 'hour-h12-2-digit',
    },
    /**
     * Formats the hour using the minimum number of digits needed, on a 24 hour cycle; e.g., 0, 12, 23
     */
    H: {
      hour: 'numeric',
      hour12: false,
      hourCycle: 'h23',
      name: 'hour-h23-numeric',
    },
    /**
     * Formats the hour using the minimum number of digits needed, on a 12 hour cycle; e.g., 12, 12, 11
     */
    h: {
      hour: 'numeric',
      hour12: true,
      hourCycle: 'h12',
      name: 'hour-h12-numeric',
    },
    /**
     * Formats the minute using two digits; e.g., 01, 05, 12
     */
    mm: {
      minute: '2-digit',
      name: 'minute-2-digit',
    },
    /**
     * Formats the minute using the minimum number of digits needed; e.g., 1, 5, 12
     */
    m: {
      minute: 'numeric',
      name: 'minute-numeric',
    },
    /**
     * Formats the second using two digits; e.g., 01, 05, 12
     */
    ss: {
      second: '2-digit',
      name: 'second-2-digit',
    },
    /**
     * Formats the second using the minimum number of digits needed; e.g., 1, 5, 12
     */
    s: {
      second: 'numeric',
      name: 'second-numeric',
    },
    /**
     * Formats the number of milliseconds using 3 digits; e.g., 001, 012, 235
     */
    fff: {
      fractionalSecond: null,
      fractionalSecondDigits: 3,
      name: 'millisecond-3-digit',
    },
    /**
     * Formats the number of decaseconds using 2 digits; e.g., 00, 01, 24
     */
    ff: {
      fractionalSecond: null,
      fractionalSecondDigits: 2,
      name: 'millisecond-2-digit',
    },
    /**
     * Formats the number of centiseconds using 2 digits; e.g., 0, 0, 2
     */
    f: {
      fractionalSecond: null,
      fractionalSecondDigits: 1,
      name: 'millisecond-1-digit',
    },
    /**
     * Formats the time zone used for formatting using a "long" format (implementation-dependent); e.g., GMT-05:00, GMT-01:01:36, Coordinated Universal Time
     */
    kk: {
      timeZoneName: 'long',
      name: 'timeZoneName-long',
    },
    /**
     * Formats the time zone used for formatting using a "short" format (implementation-dependent); e.g., GMT-5, GMT-01:01:36, UTC
     */
    k: {
      timeZoneName: 'short',
      name: 'timeZoneName-short',
    },
    /**
     * Formats the time of day using a "long" format (implementation-dependent); e.g., "in the night", "in the evening", "PM"
     */
    aaa: {
      dayPeriod: 'long',
      name: 'dayPeriod-long',
    },
    /**
     * Formats the time of day using a "short" format (implementation-dependent); e.g., "in the night", "in the evening", "PM"
     */
    aa: {
      dayPeriod: 'short',
      name: 'dayPeriod-short',
    },
    /**
     * Formats the time of day using a "short" format (implementation-dependent); e.g., "in the night", "in the evening", "P"
     */
    a: {
      dayPeriod: 'narrow',
      name: 'dayPeriod-narrow',
    },
  };

  #locales;
  #formats;
  #timeZone;

  /**
   * Creates a new instance of the DateHelper class, so that options do not need to be passed in every call.
   * @param locales The locale in which to format the date (must be a valid BCP 47 language tag), or an array of such strings, or undefined or null (to use the browser's default)
   * @param formats The format in which to format the date (must be a valid format string), or an array of such strings, or undefined or null (to use the locale's default format)
   * @param timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC', or undefined or null to use 'UTC')
   */
  constructor(locales, formats, timeZone) {
    this.locales = locales;
    this.formats = formats;
    this.timeZone = timeZone;
  }
  /**
   * The locale in which to format dates (must be a valid BCP 47 language tag), or an array of such strings, or undefined or null (to use the browser's default)
   * @returns {string|string[]|undefined|null} The locale, or an array of such
   */
  get locales() {
    return this.#locales;
  }
  set locales(value) {
    const localeResult = DateHelper.parseLocales(value);
    if (!localeResult.valid) {
      throw new Error(localeResult.error);
    }
    this.#locales = localeResult.value;
  }
  /**
   * The format in which to format the date (must be a valid format string), or an array of such strings, or undefined or null (to use the locale's default format)
   * @returns {string|string[]|undefined|null} The format for the date/time, or an array of such
   */
  get formats() {
    return this.#formats;
  }
  set formats(value) {
    let formatsResult = DateHelper.parseFormats(value);
    if (!formatsResult.valid) {
      throw new Error(formatsResult.error);
    }
    if (this.#formats !== formatsResult.value) {
      this.#formats = formatsResult.value;
    }
  }
  /**
   * The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC', or undefined or null to use 'UTC')
   * @returns {string|string[]|undefined|null} The time zone name, or an array of such
   */
  get timeZone() {
    return this.#timeZone;
  }
  set timeZone(value) {
    const timeZoneResult = DateHelper.parseTimeZone(value);
    if (!timeZoneResult.valid) {
      throw new Error(timeZoneResult.error);
    }
    if (this.#timeZone !== timeZoneResult.value) {
      this.#timeZone = timeZoneResult.value;
    }
  }
  /**
   * Returns a Date object representing the current date and time with the options given.
   * @param {object} options An object with locale, format, and timeZone properties
   * @param {undefined} options.locale Will be ignored if present.
   * @param {undefined} options.format Will be ignored if present.
   * @param {string|string[]} options.timeZone A valid IANA Time Zone name string or array of such 
   *  representing the time zone(s) to use when creating the date.
   * @returns {Date} a new Date instance, representing the current date and time in the given time zone.
   */
  static now(options) {
    const { timeZone } = this.validateOptions(options);
    const isoFormat = this.formatDate(new Date(), { format: 'y-MM-ddTHH:mm:ss.fffZ', timeZone });
    return new Date(isoFormat);
  }
  /**
   * Returns a Date object representing the current date at midnight with the options given.
   * @param {object} options An object with locale, format, and timeZone properties
   * @param {undefined} options.locale Will be ignored if present.
   * @param {undefined} options.format Will be ignored if present.
   * @param {string|string[]} options.timeZone A valid IANA Time Zone name string or array of such 
   *  representing the time zone(s) to use when creating the date.
   * @returns {Date} a new Date instance, representing the current date at midnight in the given time zone.
   */
  static today(options) {
    const { timeZone } = this.validateOptions(options);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const isoFormat = this.formatDate(now, { format: 'y-MM-ddTHH:mm:ss.fffZ', timeZone });
    return new Date(isoFormat);
  }
  static unitToAdder = {
    'y': (value, amount, useUTC = true) => useUTC ? value.setUTCFullYear(value.getUTCFullYear() + amount) : value.setFullYear(value.getFullYear() + amount),
    'q': (value, amount, useUTC = true) => useUTC ? value.setUTCMonth(value.getUTCMonth() + amount * 3) : value.setMonth(value.getMonth() + amount * 3),
    'M': (value, amount, useUTC = true) => useUTC ? value.setUTCMonth(value.getUTCMonth() + amount) : value.setMonth(value.getMonth() + amount),
    'd': (value, amount, useUTC = true) => useUTC ? value.setUTCDate(value.getUTCDate() + amount) : value.setDate(value.getDate() + amount),
    'w': (value, amount, useUTC = true) => useUTC ? value.setUTCDate(value.getUTCDate() + amount * 7) : value.setDate(value.getDate() + amount * 7),
    'H': (value, amount, useUTC = true) => useUTC ? value.setUTCHours(value.getUTCHours() + amount) : value.setHours(value.getHours() + amount),
    'm': (value, amount, useUTC = true) => useUTC ? value.setUTCMinutes(value.getUTCMinutes() + amount) : value.setMinutes(value.getMinutes() + amount),
    's': (value, amount, useUTC = true) => useUTC ? value.setUTCSeconds(value.getUTCSeconds() + amount) : value.setSeconds(value.getSeconds() + amount),
    'f': (value, amount, useUTC = true) => useUTC ? value.setUTCMilliseconds(value.getUTCMilliseconds() + amount) : value.setMilliseconds(value.getMilliseconds() + amount),
  };
  static unitToSetter = {
    'y': (date, value, useUTC = true) => useUTC ? date.setUTCFullYear(value) : date.setFullYear(value),
    'M': (date, value, useUTC = true) => useUTC ? date.setUTCMonth(value) : date.setMonth(value),
    'd': (date, value, useUTC = true) => useUTC ? date.setUTCDate(value) : date.setDate(value),
    'H': (date, value, useUTC = true) => useUTC ? date.setUTCHours(value) : date.setHours(value),
    'm': (date, value, useUTC = true) => useUTC ? date.setUTCMinutes(value) : date.setMinutes(value),
    's': (date, value, useUTC = true) => useUTC ? date.setUTCSeconds(value) : date.setSeconds(value),
    'f': (date, value, useUTC = true) => useUTC ? date.setUTCMilliseconds(value) : date.setMilliseconds(value),
  };
  /**
   * Adds a given amount of a unit to a Date.
   * @param {Date|string|number} value The Date to which to add the amount of the given unit
   * @param {number} amount The amount to add (may be negative to subtract)
   * @param {string} unit The unit to add (must be one of 'y' (year), 'q' (quarter), 'M' (month), 'w' (week), 'd' (day), 'H' (hour), 'm' (minute), 's' (second), 'f' (millisecond))
   * @param {boolean} useUTC true (default) to use UTC methods to add the amount; otherwise false to use local methods
   * @returns {Date} A new Date instance with the amount added.
   */
  static add(value, amount, unit, useUTC = true) {
    if (!['y', 'q', 'M', 'w', 'd', 'H', 'm', 's', 'f'].includes(unit)) {
      console.warn(`unit passed to DateHelper.add was not in the list; "${unit}" is not one of 'y','q','M','w','d','H','m','s','f'.`);
      return value;
    }
    const newValue = typeof value === 'number' || (typeof value === 'object' && value instanceof Date) ? 
      new Date(value.valueOf()) : DateHelper.parseDate(value, {});
    if (unit !== 'M') {
      DateHelper.unitToAdder[unit](newValue, amount, useUTC);
    } else {
      newValue = DateHelper.setClosestDayInMonth(value, value.getMonth() + amount, null, useUTC);
    }
    return newValue;
  }
  /**
   * Sets the month on value to month, keeping the date as close to the same as possible.
   * @param {Date} value The date which will have its month set to month.
   * @param {number} month The month (0-indexed, so 0 = January, 11 = December)
   * @param {number|null|undefined} targetDay The target day to hit, if not the same as the date in value
   * @param {boolean} useUTC true (default) to use UTC functions; otherwise, false
   * @returns {Date} The date, now with month set appropriately, and the date set as close to 
   * the same as value's, while staying in the same month.
   */
  static setClosestDayInMonth(value, month, targetDay, useUTC = true) {
    const originalDay = targetDay ?? (useUTC ? value.getUTCDate() : value.getDate());
    const newValue = typeof value === 'number' || (typeof value === 'object' && value instanceof Date) ? 
      new Date(value.valueOf()) : DateHelper.parseDate(value, {});
    month = month === -1 ? 0 : month === 12 ? 11 : month;
    DateHelper.unitToSetter['M'](newValue, month, useUTC);
    // Setting the month to, say, February when the date is March 30th will result in a date of March 2nd 
    // (non-leap year) or March 1st (leap year). If such a thing happens, subtract days until the original
    // month is achieved.
    if (useUTC) {
      if (newValue.getUTCMonth() > month) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" is not in the month desired`);
      }
      while (newValue.getUTCMonth() > month) {
        newValue.setUTCDate(newValue.getUTCDate() - 1);
      }
      //
      if (newValue.getUTCDate() !== originalDay && DateHelper.getLastDayOfMonth(newValue) >= originalDay) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" does not have the day desired (${originalDay})`);
        newValue.setUTCDate(originalDay);
      }  
    } else {
      if (newValue.getMonth() > month) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" is not in the month desired`);
      }
      while (newValue.getMonth() > month) {
        newValue.setDate(newValue.getDate() - 1);
      }
      //
      if (newValue.getDate() !== originalDay && DateHelper.getLastDayOfMonth(newValue) >= originalDay) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" does not have the day desired (${originalDay})`);
        newValue.setDate(originalDay);
      }  
    }
    return newValue;
  }
  /**
   * Sets the year on value to year, keeping the date as close to the same as possible.
   * @param {Date} value The date which will have its year set to year.
   * @param {number} year The year
   * @param {number|null|undefined} targetDay The target day to hit, if not the same as the date in value
   * @param {boolean} useUTC true (default) to use UTC functions; otherwise, false
   * @returns {Date} The date, now with year set appropriately, and the date set as close to 
   * the same as value's, while staying in the same year.
   */
  static setClosestDayInYear(value, year, targetDay, useUTC = true) {
    const originalDay = targetDay ?? (useUTC ? value.getUTCDate() : value.getDate());
    const newValue = typeof value === 'number' || (typeof value === 'object' && value instanceof Date) ? 
      new Date(value.valueOf()) : DateHelper.parseDate(value, {});
    DateHelper.unitToSetter['y'](newValue, year, useUTC);
    if (useUTC) {
      if (newValue.getUTCFullYear() > year) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" is not in the year desired`);
      }
      while (newValue.getUTCFullYear() > year) {
        newValue.setUTCDate(newValue.getUTCDate() - 1);
      }
    // Setting the year to, say, 2021 when the date is Feb 29, 2020, will cause the date to be
    // March 1, 2021 instead of Feb 2021. This makes it Feb 28, 2021.
    if (newValue.getUTCMonth() > month) {
      console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" is not in the month desired`);
    }
      while (newValue.getUTCMonth() > month) {
        newValue.setUTCDate(newValue.getUTCDate() - 1);
      }
      //
      if (newValue.getUTCDate() !== originalDay && DateHelper.getLastDayOfMonth(newValue) >= originalDay) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" does not have the day desired (${originalDay})`);
        newValue.setUTCDate(originalDay);
      } 
    } else {
      if (newValue.getFullYear() > year) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" is not in the year desired`);
      }
      while (newValue.getFullYear() > year) {
        newValue.setDate(newValue.getDate() - 1);
      }
      if (newValue.getMonth() > month) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" is not in the month desired`);
      }
      while (newValue.getMonth() > month) {
        newValue.setDate(newValue.getDate() - 1);
      }
      //
      if (newValue.getDate() !== originalDay && DateHelper.getLastDayOfMonth(newValue) >= originalDay) {
        console.warn(`The date set, "${newValue.toISOString().substring(0, 10)}" does not have the day desired (${originalDay})`);
        newValue.setDate(originalDay);
      }  
    }

    return newValue;
  }
  /**
   * Validates that the options specified are indeed valid.
   * @param {object} options An object with locale, format, and timeZone properties
   * @param {string|string[]} options.locale A valid BCP47 string or array of such 
   *  representing the "locales" to use when formatting or parsing dates.
   * @param {string|string[]} options.format A string or array of strings
   *  representing the format(s) to use when formatting or parsing dates.
   * @param {string|string[]} options.timeZone A valid IANA Time Zone name string or array of such 
   *  representing the time zone(s) to use when formatting or parsing dates.
   * @returns an object of the same shape as its argument, but now with known-good
   *  values.
   * @throws Error when any one of the properties are invalid
   */
  static validateOptions(options) {
    let { locale, format, timeZone } = options ?? {};
    const localeResult = DateHelper.parseLocales(locale);
    if (!localeResult.valid) {
      throw new Error(localeResult.error);
    }
    locale = localeResult.value;
    const formatResult = DateHelper.parseFormats(format);
    if (!formatResult.valid) {
      throw new Error(formatResult.error);
    }
    format = formatResult.value;
    const timeZoneResult = DateHelper.parseTimeZone(timeZone);
    if (!timeZoneResult.valid) {
      throw new Error(timeZoneResult.error);
    }
    timeZone = timeZoneResult.value;
    return { locale, format, timeZone };
  }
  /**
   * Parses the format(s) to ensure it/they are correct
   * @param {string|string[]} formats The format in which to format the date,
   *  or an array of such strings, or undefined or null (to use the locale's 
   *  default format)
   * @returns an object with possibly three properties; 
   *  "valid", a Boolean indicating if the value(s) are correct;
   *  "value", a string or array of strings with the valid value(s);
   *  "error", a string, containing the errors that have occurred, if any;
   */
  static parseFormats(formats) {
    if (typeof formats === 'undefined') {
      return {
        valid: true,
        value: [DateHelper.getDefaultFormatForLocale(this.locales)],
      };
    } else if (Array.isArray(formats)) {
      while (formats.some(f => Array.isArray(f))) {
        formats = formats.flat();
      }
      const aggregateResult = formats.reduce(
        (agg, cur) => {
          const curResult = DateHelper.parseFormats(cur);
          agg.valid = agg.valid && curResult.valid;
          agg.value = [...agg.value, curResult.value];
          agg.error = `${agg.error}\n${curResult.error}`;
          return agg;
        },
        { valid: true, value: [], error: '' }
      );
      return aggregateResult;
    } else if (typeof formats === 'string') {
      if (!Object.keys(DateHelper.stringsToFormatMap).some(k => formats.includes(k))) {
        return {
          valid: false,
          error: `The format provided, "${formats}", does not contain any valid format strings`
        };
      }
      return { valid: true, value: [formats] };
    } else {
      return {
        valid: false,
        error: `The format provided, "${formats}", is not a valid format`,
      };
    }
  }
  /**
   * Parses locales as BCP47 strings
   * @param {string|string[]} locales A valid BCP47 string or array of such 
   *  representing the "locales" to use when formatting or parsing dates.
   * @returns an object with possibly three properties; 
   *  "valid", a Boolean indicating if the value(s) are correct;
   *  "value", a string or array of strings with the valid value(s);
   *  "error", a string, containing the errors that have occurred, if any;
   */
  static parseLocales(locales) {
    if (typeof locales === 'undefined' || locales === null) {
      return { valid: true, value: [] };
    } else if (Array.isArray(locales)) {
      const aggregateResult = locales.reduce(
        (agg, cur) => {
          const curResult = DateHelper.parseLocales(cur);
          agg.valid = agg.valid && curResult.valid;
          agg.value = [...agg.value, curResult.value];
          agg.error = `${agg.error}\n${curResult.error}`;
          return agg;
        },
        { valid: true, value: [], error: '' }
      );
      return aggregateResult;
    } else if (typeof locales === 'string') {
      if (DateHelper.bcp47re.test(locales)) {
        return { valid: true, value: [locales] };
      } else {
        return {
          valid: false,
          error: `The locale specified, "${locales}", is not a valid BCP 47 language tag`,
          value: [],
        };
      }
    } else {
      return {
        valid: false,
        error: `The locale specified, "${locales}", is not a valid BCP 47 language tag`,
        value: [],
      };
    }
  }
  /**
   * Parses timeZone as IANA Time Zone names.
   * @param {string|string[]} timeZone A valid IANA Time Zone name string or array of such 
   *  representing the time zone(s) to use when formatting or parsing dates.
   * @returns an object with possibly three properties; 
   *  "valid", a Boolean indicating if the value(s) are correct;
   *  "value", a string or array of strings with the valid value(s);
   *  "error", a string, containing the errors that have occurred, if any;
   */
  static parseTimeZone(timeZone) {
    if (typeof timeZone === 'undefined' || (typeof timeZone === 'object' && timeZone === null)) {
      return { valid: true, value: 'UTC' };
    } else if (typeof timeZone === 'string' && tzdb.find((tz) => tz.timeZoneName.trim() === timeZone.trim())) {
      return { valid: true, value: timeZone.trim() };
    }
    return {
      valid: false,
      error: `The time zone specified, "${timeZone}", is not a valid time zone name`,
      value: 'UTC',
    };
  }
  /**
   * Returns a list of time zones provided by the IANA tzdb.
   * @returns {object[]} timeZoneInfo an array of time zone information
   * @returns {string} timeZoneInfo.countryCodes The comma-delimited list of ISO 3166 2-character country codes which the time zone covers
   * @returns {string} timeZoneInfo.coords The latitude and longitude of the timezone's principal location in ISO 6709 sign-degrees-minutes-seconds format
   * @returns {string} timeZoneInfo.timeZoneName The name of the time zone as provided by IANA
   * @returns {string} timeZoneInfo.comments Present if and only if a country has multiple timezones
   */
  static validTimeZones() {
    return tzdb;
  }
  /**
   * Returns a list of time zone names provided by the IANA tzdb.
   * @returns {string[]} an array of time zone names
   */
  static validTimeZoneNames() {
    return tzdb.map((tz) => tz.timeZoneName).sort();
  }
  /**
   * Gets data about the likely time zone from the IANA Time Zone database
   * @param {string|string[]|undefined|null} locales The locale "A string with a BCP 47 language tag,
   * or an array of such strings. To use the browser's default locale, pass
   * an empty array."
   * @returns The time zone object, if found in the IANA Time Zone database.
   */
  static getProbableClientTimeZone(locales) {
    const probableClientTimeZoneName = getProbableClientTimeZoneName(locales);
    return tzdb.find((tz) => tz.timeZoneName === probableClientTimeZoneName);
  }
  /**
   * Gets the name of the time zone of the current environment.
   * @param {string|string[]|undefined|null} locales The locale "A string with a BCP 47 language tag,
   * or an array of such strings. To use the browser's default locale, pass
   * an empty array."
   * @returns The time zone name, from the resolved options given by Intl.DateTimeFormat. Contrast with
   * getPossibleClientTimeZoneNames which guesses based on offset from UTC. However, there is nothing
   * forcing implementations to provide `timeZone` with the resolvedOptions.
   */
  static getProbableClientTimeZoneName(locales) {
    const localesResult = DateHelper.parseLocales(locales);
    if (!localesResult.valid) {
      throw new Error(localesResult.error);
    }
    const defaultFormat = new Intl.DateTimeFormat(localesResult.value);
    const options = defaultFormat.resolvedOptions();
    return options?.timeZone;
  }
  /**
   * Gets an array of IANA time zones that match the offset from UTC returned by getTimezoneOffset.
   * @returns {string[]} The array of IANA time zones.
   */
  static getPossibleClientTimeZones() {
    let rawOffset = new Date().getTimezoneOffset();
    const rawOffsetIsNegative = rawOffset < 0;
    rawOffset = Math.abs(rawOffset);
    // raw offset is the number of minutes less then UTC the current time zone is, so, say, EST is -05:00,
    // so raw offset will be 300 (not -300). The following creates a Date that number of hours past midnight
    // on the epoch, such that toISOString returns the formatted hours:minutes (new Date(0).toISOString()
    // would return 1970-01-01T00:00:00.000Z)
    const rawOffsetAsDate = new Date(rawOffset * 60000);
    const rawOffsetFormatted = rawOffsetAsDate.toISOString().substring(11, 16);
    // Note: the negative symbol below does not map to the standard US keyboard layout; it is
    // Unicode 2212(hex) MINUS SIGN.
    const offset = `${rawOffsetIsNegative ? '+' : '−'}${rawOffsetFormatted}`;
    return tzdb.filter((tz) => tz.utcOffsetStandard === offset || tz.utcOffsetDST === offset);
  }
  /**
   * Same as getPossibleClientTimeZones, only just the names
   */
  static getPossibleClientTimeZoneNames() {
    return DateHelper.getPossibleClientTimeZones()
      .map((tz) => tz.timeZoneName)
      .sort();
  }
  /**
   * Gets the default format for dates and times.
   * @param {object} options An object with locale, format, and timeZone properties
   * @param {undefined} options.locale The locale which will be used for generating the format. Must be a valid BCP47 string.
   * @param {undefined} options.format Will be ignored if present.
   * @param {string|string[]} options.timeZone A valid IANA Time Zone name string or array of such 
   *  representing the time zone(s) to use when creating the date.
   * @returns {string} The default format for dates and times for the given locale and time zone.
   */
  static getDefaultFormatForDateAndTime(options) {
    const { locale, timeZone } = DateHelper.validateOptions(options);
    if ((locale && Array.isArray(locale)) || (timeZone && Array.isArray(timeZone))) {
      throw new Error('getDefaultFormatForDateAndTime does not support arrays for locales or time zones');
    }
    const defaultFormat = new Intl.DateTimeFormat(locale, { timeZone });
    const resolved = defaultFormat.resolvedOptions();
    const parts = defaultFormat.formatToParts(Date.now());
    const formatParts = Object.fromEntries(parts.map((part) => ([part.type, resolved[part.type]])));
    //console.log(formatParts);
    return formatParts;
  }
  /**
   * Gets the default format string for the specified locale (date only)
   * @param {string} locales The locale "A string with a BCP 47 language tag,
   * or an array of such strings. To use the browser's default locale, pass
   * an empty array."
   * @returns {string} The date format for the locale.
   */
  static getDefaultFormatForLocale(locales) {
    const localesResult = DateHelper.parseLocales(locales);
    if (!localesResult.valid) {
      throw new Error(localesResult.error);
    }
    const defaultFormat = new Intl.DateTimeFormat(localesResult.value);
    // resolvedOptions should theoretically contain information about at least year, month, and day formatting rules
    const options = defaultFormat.resolvedOptions();
    const referenceDate = new Date();
    // formatToParts generates an array of parts, each of which have a type and a value
    const formatted = defaultFormat.formatToParts(referenceDate);
    let format = '';
    for (let i = 0, z = formatted.length; i < z; i++) {
      let part = formatted[i];
      // part.type is going to be 'year', 'month', 'day', 'literal', ...
      let type = options[part.type];
      // type will have the formatting options for the given type (likely undefined for literal)
      switch (part.type) {
        case 'year':
          switch (type) {
            case 'numeric':
              format += 'y';
              break;
            case '2-digit':
              format += 'yy';
              break;
          }
          break;
        case 'month':
          switch (type) {
            case 'numeric':
              format += 'M';
              break;
            case '2-digit':
              format += 'MM';
              break;
            case 'long':
              format += 'MMMM';
              break;
            case 'short':
              format += 'MMM';
              break;
            case 'narrow':
              // needed a symbol for a single letter month; o is common to both month and narrow
              // and not shared with other date parts.
              format += 'o';
              break;
          }
          break;
        case 'day':
          switch (type) {
            case 'numeric':
              format += 'd';
              break;
            case '2-digit':
              format += 'dd';
              break;
          }
          break;
        case 'literal':
          format += part.value;
          break;
      }
    }
    return format;
  }
  /**
   * Gets the first date of the month.
   * @param {Date} value The date whose year and month information will be used to retried the first day
   * @param {boolean} useUTC true (default) to use UTC values from value; otherwise, false
   * @returns {Date} The Date at the first day of the month, with the same UTC (if useUTC is true) or local time as value.
   */
  static getFirstDateOfMonth(value, useUTC = true) {
    if (useUTC) {
      return new Date(
        value.getUTCFullYear(),
        value.getUTCMonth(),
        1,
        value.getUTCHours(),
        value.getUTCMinutes(),
        value.getUTCSeconds(),
        value.getUTCMilliseconds()
      );
    }
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      1,
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds()
    );
  }
  /**
   * Gets the last date of the month.
   * @param {Date} value The date whose year and month information will be used to retried the last day
   * @param {boolean} useUTC true (default) to use UTC values from value; otherwise, false
   * @returns {Date} The Date at the last day of the month, with the same UTC (if useUTC is true) or local time as value.
   */
  static getLastDateOfMonth(value, useUTC = true) {
    if (useUTC) {
      return new Date(
        value.getUTCFullYear(),
        value.getUTCMonth() + 1,
        0,
        value.getUTCHours(),
        value.getUTCMinutes(),
        value.getUTCSeconds(),
        value.getUTCMilliseconds()
      );
    }
    return new Date(
      value.getFullYear(),
      value.getMonth() + 1,
      0,
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds()
    );
  }
  /**
   * Gets the last day of the month (also the number of days in the month)
   * @param {Date} value The date from which to get the month and year
   * @param {boolean} useUTC true (default) to use UTC functions; otherwise, false
   * @returns {number} The number indicating the last day of the month.
   */
  static getLastDayOfMonth(value, useUTC = true) {
    return DateHelper.getLastDateOfMonth(value, useUTC).getDate();
  }
  /**
   * Gets the first Sunday of the month.
   * @param {Date} value The date whose year and month information will be used to retried the first Sunday 
   * @param {boolean} useUTC true (default) to use UTC values from value; otherwise, false
   * @returns {Date} The Date at the first Sunday of the month, with the same UTC (if useUTC is true) or local time as value.
   */
  static getFirstSunday(value, useUTC = true) {
    const firstOfMonth = DateHelper.getFirstDateOfMonth(value, useUTC);
    if (useUTC) {
      return new Date(
        firstOfMonth.getUTCFullYear(),
        firstOfMonth.getUTCMonth(),
        firstOfMonth.getUTCDate() - firstOfMonth.getDay(),
        value.getUTCHours(),
        value.getUTCMinutes(),
        value.getUTCSeconds(),
        value.getUTCMilliseconds()
      );
    }
    return new Date(
      firstOfMonth.getFullYear(),
      firstOfMonth.getMonth(),
      firstOfMonth.getDate() - firstOfMonth.getDay(),
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds()
    );
  }
  /**
   * Gets the last Saturday of the month.
   * @param {Date} value The date whose year and month information will be used to retried the last Saturday
   * @param {boolean} useUTC true (default) to use UTC values from value; otherwise, false
   * @returns {Date} The Date at the last Saturday of the month, with the same UTC (if useUTC is true) or local time as value.
   */
  static getLastSaturday(value) {
    const lastOfMonth = DateHelper.getLastDateOfMonth(value, useUTC);
    if (useUTC) {
      return new Date(
        lastOfMonth.getUTCFullYear(),
        lastOfMonth.getUTCMonth() + 1,
        6 + lastOfMonth.getDay(),
        value.getUTCHours(),
        value.getUTCMinutes(),
        value.getUTCSeconds(),
        value.getUTCMilliseconds()
      );
    }
    return new Date(
      lastOfMonth.getFullYear(),
      lastOfMonth.getMonth() + 1,
      6 + lastOfMonth.getDay(),
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds()
    );
  }
  /**
   * Gets the differences between two date objects.
   * @param {Date} a The first date to compare
   * @param {Date} b The second date to compare
   * @param {DateComparisonGranularity} dateGranularity The granularity at which to compare the dates
   * @param {(Date a, Date b) => {amount: number, unit: string})} dateGranularityCustom A custom function by which to compare the dates
   * @returns {} An object containing the amount and unit by which the two values differ
   */
   static diffDates(a, b,
    dateGranularity = DateComparisonGranularity.Default,
    dateGranularityCustom = (a, b) => ({ amount: a.valueOf() - b.valueOf(), unit: "ms" })) {
    const diff = Math.abs(b.valueOf() - a.valueOf());
    switch (dateGranularity) {
      case DateComparisonGranularity.Custom:
        return dateGranularityCustom(a, b);
      case DateComparisonGranularity.Millisecond:
        return { amount: diff, unit: DateComparisonGranularity.Millisecond };
      case DateComparisonGranularity.Second:
        return { amount: diff / DateHelper.msPerSecond, unit: DateComparisonGranularity.Second };
      case DateComparisonGranularity.Minute:
        return { amount: diff / DateHelper.msPerMinute, unit: DateComparisonGranularity.Minute };
      case DateComparisonGranularity.Hour:
        return { amount: diff / DateHelper.msPerHour, unit: DateComparisonGranularity.Hour };
      case DateComparisonGranularity.Day:
        return { amount: diff / DateHelper.msPerDay, unit: DateComparisonGranularity.Day };
      case DateComparisonGranularity.Week:
        return { amount: diff / DateHelper.msPerWeek, unit: DateComparisonGranularity.Week };
      case DateComparisonGranularity.Month:
        {
          // Counting months is a PITA
          let monthDays = [];
          const aDate = a.getDate();
          const aMonth = a.getMonth();
          const aYear = a.getFullYear();
          let aDayCount = new Date(aYear, aMonth + 1, 0).getDate();
          const bDate = b.getDate();
          const bMonth = b.getMonth();
          const bYear = b.getFullYear();
          let bDayCount = new Date(bYear, bMonth + 1, 0).getDate();
          if (aYear === bYear && aMonth === bMonth) {
            // e.g. a like 2021-01-01; b like 2021-01-23
            // -1 to take into account partial days (added back afterwards)
            monthDays = [{ month: aMonth, dayCount: Math.abs(bDate - aDate) - 1 }];
          } else if (aYear === bYear && (bMonth - aMonth) === 1) {
            // e.g. a like 2021-01-01; b like 2021-02-23
            // -1 to take into account partial days (added back afterwards)
            aDayCount = aDayCount - aDate - 1;
            bDayCount = bDate - 1;
            monthDays = [{ month: aMonth, dayCount: aDayCount }, { month: bMonth, dayCount: bDayCount }];
          } else if (aYear === bYear && (aMonth - bMonth) === 1) {
            // e.g. a like 2021-02-01; b like 2021-01-23
            // -1 to take into account partial days (added back afterwards)
            aDayCount = aDate - 1;
            bDayCount = bDayCount - bDate - 1;
            monthDays = [{ month: aMonth, dayCount: aDayCount }, { month: bMonth, dayCount: bDayCount }];
          } else if (aYear === bYear && bMonth > aMonth) {
            // e.g. a like 2021-01-01; b like 2021-04-23
            // -1 to take into account partial days (added back afterwards)
            // Make an array of months with the number of days in that month that were used
            monthDays = Array.from(new Array(bMonth - aMonth), (_, i) => aMonth + i)
              .map((m) => (
                m === aMonth ?
                  // For the month of the earlier date passed in, that's the number of days from that date to
                  // the end of that month.
                  { month: m, dayCount: new Date(aYear, m + 1, 0).getDate() - aDate } :
                  m === bMonth ?
                    // For the month of the later date passed in, that's the date of that month
                    { month: m, dayCount: bDate - 1 } :
                    // For every other year and month, it's the total number of days in the month for that year
                    { month: m, dayCount: new Date(aYear, m + 1, 0).getDate() }
              ));
          } else if (aYear === bYear && aMonth > bMonth) {
            monthDays = Array.from(new Array(aMonth - bMonth), (_, i) => bMonth + i)
              .map((m) => (
                m === bMonth ?
                  { month: m, dayCount: new Date(bYear, m + 1, 0).getDate() - bDate } :
                  m === aMonth ?
                    { month: m, dayCount: aDate - 1 } :
                    { month: m, dayCount: new Date(bYear, m + 1, 0).getDate() }
              ));
          } else if (bYear > aYear) {
            monthDays = Array.from(new Array(bYear - aYear + 1), (_, i) => aYear + i)
              .map((y) => {
                if (y === aYear) {
                  // If it's the year of the earlier date passed in, get the year, plus an array of months 
                  // from the month passed in to the end of that year
                  return [y, Array.from(new Array(12 - aMonth), (_, i) => aMonth + i)];
                } else if (y !== aYear && y !== bYear) {
                  // If it's one of the years between the earlier and later dates, get the year, plus an
                  // array of 12 months.
                  return [y, Array.from(new Array(12), (_, i) => i)];
                }

                // Otherwise, it's the year of the later date passed in, so get the yet, plus an array of
                // months from the month of the later date to the beginning of the year.
                return [y, Array.from(new Array(bMonth + 1), (_, i) => bMonth - i)];
              })
              // Reorganize data from a 2d array to a flat array of objects with year and month properties
              .map(([year, months]) => [...months.map((month) => ({ year, month }))])
              .flat()
              // Sort the array of object by year then month
              .sort((x, y) => x.year - y.year === 0 ? (x.month - y.month) : (x.year - y.year))
              // Then add a dayCount property counting the number of days used in that year and month
              .map(({ y, m }) => (
                y === aYear && m === aMonth ?
                  // For the month of the first date passed in, that's the number of days from that date to
                  // the end of that month.
                  { year: y, month: m, dayCount: new Date(aYear, m + 1, 0).getDate() - aDate } :
                  y === bYear && m === bMonth ?
                    // For the month of the second date passed in, that's the date of that month
                    { year: y, month: m, dayCount: bDate - 1 } :
                    // For every other year and month, it's the total number of days in the month for that year
                    { year: y, month: m, dayCount: new Date(y, m + 1, 0).getDate() }
              ));
          } else if (aYear > bYear) {
            monthDays = Array.from(new Array(aYear - bYear + 1), (_, i) => bYear + i)
              .map((y) => {
                if (y === bYear) {
                  return [y, Array.from(new Array(12 - bMonth), (_, i) => bMonth + i)];
                } else if (y !== aYear && y !== bYear) {
                  return [y, Array.from(new Array(12), (_, i) => i)];
                }

                return [y, Array.from(new Array(aMonth + 1), (_, i) => aMonth - i)];
              })
              .map(([year, months]) => [...months.map((month) => ({ year, month }))])
              .flat()
              .sort((x, y) => x.year - y.year === 0 ? (x.month - y.month) : (x.year - y.year))
              .map(({ y, m }) => (
                y === bYear && m === bMonth ?
                  { year: y, month: m, dayCount: new Date(bYear, m + 1, 0).getDate() - bDate } :
                  y === aYear && m === aMonth ?
                    { year: y, month: m, dayCount: aDate - 1 } :
                    { year: y, month: m, dayCount: new Date(y, m + 1, 0).getDate() }
              ));
          }
          // Got total number of days, need to add on number of ms difference
          let addOnTime = 0;
          // Creates four variables with the number of milliseconds from one of the Dates specified to midnight of the same day,
          // and to midnight of the next day. BOD = Beginning of Day = midnight on the date given. EOD = End of Day = midnight on the next day.
          const aTimeFromBOD = a.valueOf() - (new Date(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0, 0).valueOf());
          const aTimeToEOD = (new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1, 0, 0, 0, 0).valueOf()) - a.valueOf();
          const bTimeFromBOD = b.valueOf() - (new Date(b.getFullYear(), b.getMonth(), b.getDate(), 0, 0, 0, 0).valueOf());
          const bTimeToEOD = (new Date(b.getFullYear(), b.getMonth(), b.getDate() + 1, 0, 0, 0, 0).valueOf()) - b.valueOf();
          if (a.valueOf() > b.valueOf()) {
            addOnTime = aTimeFromBOD + bTimeToEOD;
          } else if (a.valueOf() < b.valueOf()) {
            addOnTime = aTimeToEOD + bTimeFromBOD;
          }
          monthDays = monthDays.map(({ dayCount, month, year }) => ({
            totalMs: new Date(year ?? aYear, month + 1, 0).getDate() * DateHelper.msPerDay,
            year: (year ?? aYear),
            ms: dayCount * DateHelper.msPerDay,
            month
          }));
          // The additional time is added to the first month's number of milliseconds because a) there could be only one month and
          // b) it seemed like a good idea at the time.
          return {
            amount: monthDays.reduce((agg, cur, idx) => agg + ((cur.ms + (idx === 0 ? addOnTime : 0)) / cur.totalMs), 0),
            unit: DateComparisonGranularity.Month
          };
        }
      case DateComparisonGranularity.Quarter:
        return {
          amount: DateHelper.diffDates(a, b, DateComparisonGranularity.Month).amount / 3,
          unit: DateComparisonGranularity.Quarter,
        };
      case DateComparisonGranularity.Year:
        {
          const aYear = a.getFullYear();
          const bYear = b.getFullYear();
          const mod4 = (y) => y % 4 === 0;
          const mod100 = (y) => y % 100 === 0;
          const mod400 = (y) => y % 400 === 0;
          const isLeap = (year) => mod4(year) && !mod100(year) || mod400(year);
          // years will be an array of all of the years between a and b (might be one year)
          const years = bYear > aYear ?
            Array.from(new Array(bYear - aYear + 1), (_, i) => aYear + i) :
            bYear === aYear ?
              [bYear] :
              Array.from(new Array(aYear - bYear + 1), (_, i) => bYear + i);
          const hasLeap = years.some(y => isLeap(y));
          if (!hasLeap) {
            return { amount: diff / DateHelper.msPerYear, unit: DateComparisonGranularity.Year };
          } else {
            const yearCounts = years.map(y => ({
              year: y,
              ms: isLeap(y) ?
                DateHelper.msPerLeapYear :
                DateHelper.msPerYear
            }))
            .map(({ year, ms }) =>
              year === aYear ?
                ({
                  year,
                  ms,
                  message: `diff "${a.toISOString()}" and "${new Date(aYear + 1, 0, 1, 0, 0, 0, 0).toISOString()}"`,
                  amt: DateHelper.diffDates(a, new Date(aYear + 1, 0, 1, 0, 0, 0, 0)).amount,
                  count: DateHelper.diffDates(a, new Date(aYear + 1, 0, 1, 0, 0, 0, 0)).amount / ms
                }) :
                year === bYear ?
                  ({
                    year,
                    ms,
                    message: `diff "${new Date(bYear - 1, 11, 32, 0, 0, 0, 0).toISOString()}" and "${b.toISOString()}"`,
                    amt: DateHelper.diffDates(new Date(bYear - 1, 11, 32, 0, 0, 0, 0), b).amount,
                    count: DateHelper.diffDates(new Date(bYear - 1, 11, 32, 0, 0, 0, 0), b).amount / ms
                  }) :
                  ({
                    year,
                    ms,
                    message: 'whole year',
                    amt: ms,
                    count: ms / ms
                  })
            );
            return {
              amount: yearCounts.reduce((agg, cur) => agg + cur.count, 0),
              unit: DateComparisonGranularity.Year
            };
          }
        }
      case DateComparisonGranularity.Era:
        // Era in this case is defined the same as in Intl.DateTimeFormat, i.e., are both dates in AD or BC?
        const eraFormatter = new Intl.DateTimeFormat([], { era: 'short' });
        const eraIsTheSame = eraFormatter.formatToParts(a).find(p => p.type === 'era').value === 
          eraFormatter.formatToParts(b).find(p => p.type === 'era').value;
        return { 
            amount: eraIsTheSame ? 0 : Number.POSITIVE_INFINITY, 
            unit: DateComparisonGranularity.Era 
          };
    }
    return diff;
  }
  /**
   * Indicates whether a is the same date as b at the specified granularity.
   * @param {Date} a The Date that may be the same as a
   * @param {Date} b The Date that is the subject of comparison
   * @param {DateComparisonGranularity} granularity The granularity at which the specified values can be considered the same.
   * @returns {boolean} true of a and b have the same date at the specified granularity. Uses local time.
   */
  static isSame(a, b, granularity) {
    var similarity = DateHelper.diffDates(a, b, granularity);
    console.log('isSame: similarity: ', JSON.stringify(similarity));
    return similarity.amount <= 1 && similarity.unit === granularity;
  }
  /**
   * Indicates whether a is the same date as b.
   * @param {Date} a The Date that may be the same as a
   * @param {Date} b The Date that is the subject of comparison
   * @returns {boolean} true of a and b have the same date, irrespective of the time. Uses local time.
   */
  static isSameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
  /**
   * Indicates whether a is before b.
   * @param {Date} a The Date that may be before b
   * @param {Date} b The Date that is the subject of comparison
   * @param {DateComparisonGranularity} granularity The granularity at which the specified values are to be compared.
   * @returns {boolean} true if a is before b at the specified granularity. Uses local time.
   */
  static isBefore(a, b, granularity) {
    var similarity = DateHelper.diffDates(a, b, granularity);
    return similarity.amount <= 1 && similarity.unit === granularity;
  }
  /**
   * Indicates whether a is before b.
   * @param {Date} a The Date that may be before b
   * @param {Date} b The Date that is the subject of comparison
   * @returns {boolean} true if a is before b, irrespective of time. Uses local time.
   */
  static isBeforeDay(a, b) {
    return (
      a.getFullYear() < b.getFullYear() ||
      (a.getFullYear() === b.getFullYear() && a.getMonth() < b.getMonth()) ||
      (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() < b.getDate())
    );
  }
  /**
   * Indicates whether a is after b.
   * @param {Date} a The Date that may be after b
   * @param {Date} b The Date that is the subject of comparison
   * @param {DateComparisonGranularity} granularity The granularity at which the specified values are to be compared.
   * @returns {boolean} true if a is after b at the specified granularity. Uses local time.
   */
  static isAfter(a, b, granularity) {
    var similarity = DateHelper.diffDates(a, b, granularity);
    return similarity.amount > 1 && similarity.unit === granularity;
  }
  /**
   * Indicates whether a is after b.
   * @param {Date} a The Date that may be after b
   * @param {Date} b The Date that is the subject of comparison
   * @returns {boolean} true if a is after b, irrespective of time. Uses local time.
   */
  static isAfterDay(a, b) {
    return (
      a.getFullYear() > b.getFullYear() ||
      (a.getFullYear() === b.getFullYear() && a.getMonth() > b.getMonth()) ||
      (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() > b.getDate())
    );
  }
  /**
   * Formats a given date according to a specified locale and format string, in an optional time zone
   * @param {Date} date The Date object to format
   * @param {object} options Optional hash of overrides for the properties set on the object.
   * @param {string} options.locale The locale in which to format the date (must be a valid BCP 47 language tag)
   * @param {string} options.format The format in which to format the date (must be a valid format string, or 'iso')
   * @param {string} options.timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC')
   * @returns {string} The formatted date.
   */
  static formatDate(date, options) {
    let { locale, format, timeZone } = DateHelper.validateOptions(options);
    if (isNaN(date.valueOf())) {
      throw new Error(`The date given, "${date}", is not a valid Date.`);
    }
    while (Array.isArray(locale)) {
      locale = locale[0];
    }
    while (Array.isArray(format)) {
      format = format[0];
    }
    const dateFormat = {
      timeZone,
    };
    const stringsToFind = Object.keys(DateHelper.stringsToFormatMap);
    const styles = ['full', 'long', 'medium', 'short'];
    let done = [];
    let formatted = format;
    let hadStyle = false;
    for (let s of stringsToFind) {
      if (formatted.includes(s) && !done.includes(formatted.indexOf(s))) {
        // console.log(`"${formatted}" had "${s}" and ${done} did not have ${formatted.indexOf(s)}`);
        const isStyle = styles.some((style) => s.includes(style));
        let value = null;
        if (s === 'iso') {
          value = DateHelper.formatDate(date, {
            locale: undefined,
            format: 'y-MM-ddTHH:mm:ss.fffZ',
            timeZone: 'UTC',
          });
        } else {
          const options = Object.assign({}, dateFormat, DateHelper.stringsToFormatMap[s]);
          // v8 and others require the entire time to be formatted to override individual
          // elements of the time, so this code fills in the higher units of time.
          if (options.hasOwnProperty('minute') && !options.hasOwnProperty('hour')) {
            options.hour = options.minute;
            options.hour12 = options.hour !== '2-digit';
          }
          if (options.hasOwnProperty('second') && !options.hasOwnProperty('minute') && !options.hasOwnProperty('hour')) {
            options.minute = options.second;
            options.hour = options.minute;
            options.hour12 = options.hour !== '2-digit';
          }
          if (options.hasOwnProperty('dayPeriod') && !options.hasOwnProperty('minute') && !options.hasOwnProperty('hour')) {
            options.hour = options.minute = 'numeric';
            options.hour12 = true;
          }
          const formatter = new Intl.DateTimeFormat(locale, options);
          const parts = formatter.formatToParts(date);
          const partType = Object.keys(DateHelper.stringsToFormatMap[s])[0];
          let optionName = partType;
          let option = options[optionName];
          const resolvedOptions = formatter.resolvedOptions();
          let resolvedOption = resolvedOptions[optionName];
          if (option === null) {
            optionName = Object.keys(DateHelper.stringsToFormatMap[s])[1];
            option = options[optionName];
            resolvedOption = resolvedOptions[optionName];
          }
          value = parts.find((part) => part.type === partType).value;
          // v8 resolves hourCycle as 'h24' even when set as 'h23'
          // so this code checks for those mismatches and accounts for them, where it can
          if ((resolvedOption !== option && value && value.length) || (optionName === 'hour' && value && value.length)) {
            if (optionName === 'hour' && options.hourCycle === 'h23' && resolvedOptions.hourCycle === 'h24') {
              optionName = 'hourCycle';
              option = options[optionName];
              resolvedOption = resolvedOptions[optionName];
            }
            //console.warn(`Option "${optionName}" was set as "${option}" but resolved as "${resolvedOption}". Attempting to correct...`);
            // While the code above might fix the problem in v8 & SpiderMonkey,
            // I have doubts about JavaScriptCore so I'm leaving this in.
            if (resolvedOption === 'numeric' && option === '2-digit') {
              value = `00${value}`.slice(-2);
            } else if (resolvedOption === '2-digit' && option === 'numeric') {
              value = parseInt(value).toString();
            } else if (resolvedOption === 'h24' && option === 'h23' && value === '24') {
              value = '00';
            }
          }
        }
        if (value && value.length) {
          // Keeps a running list of indexes of strings that have been replaced in the formatted string so that later
          // iterations don't try and replace format strings in the replacement text (e.g., the h, r, & d in Thursday)
          let last = 0;
          let shift = 0;
          while (formatted.indexOf(s, last) !== -1) {
            last = formatted.indexOf(s, last);
            shift = [...value].length - [...s].length;
            done = [
              ...done.map(i => i + shift),
              ...Array(value.length)
                .fill(0)
                .map((_, i) => i + last),
            ];
            last += value.length;
          }
          formatted = formatted.replace(new RegExp(`${s}`, 'g'), value);
        }
        hadStyle = hadStyle || isStyle;
      }
    }
    return formatted;
  }
  static #trySetDatePartFromPart(value, part, date, options) {
    if (!part || part.index == null) {
      console.error(`The part specified, ${part?JSON.stringify(part):part}, is not valid`);
      return { success: false };
    }
    const indexOfPartEndByAlphaNum = options.indexesOfNonAlphaNumChars.find((i) => i > part.index);
    const indexOfPartEndByNum = options.indexesOfNonNumChars.find((i) => i > part.index);
    //console.log('indexOfPartEndByAlphaNum',indexOfPartEndByAlphaNum);
    //console.log('indexOfPartEndByNum',indexOfPartEndByNum);
    //console.log('part.index + part.length',part.index + part.length);
    const endingIndex = Math.max(Math.min(
      indexOfPartEndByAlphaNum ?? Number.POSITIVE_INFINITY, 
      indexOfPartEndByNum ?? Number.POSITIVE_INFINITY), 
      part.index + part.length);
    part.end = endingIndex;
    let partValue = value.slice(part.index, part.end).replace(/[^\p{N}]/ug, '');
    //console.log(partValue);
    if (!Number.isNaN(+partValue) && +partValue !== 0) {
      if (part.name.startsWith('month')) {
        partValue = +partValue - 1;
      }
      part.setter(date, +partValue, options.timeZone === 'UTC');
      return { success: true, value: partValue };
    } else {
      console.warn(`The ${part.name} portion, "${value.slice(part.index, part.end)}" was not able to be parsed as a number; #trySetDatePartFromPart`);
    }

    return { success: false };
  }
  /**
   * Uses parts pulled from a format to create a Date from a string value, using options.
   * @param {string} value The original string getting parsed
   * @param {any[]} parts An array of objects representing the parts of a Date that have been parsed from value
   * @param {number} parts[0].index The index of the date part in the format (and, theoretically, value)
   * @param {number} parts[0].length The length of the date part in the format (and, theoretically, value)
   * @param {any} parts[0]['?'] Various part-specific information (e.g., month: '2-digit' tells us that the 
   * month part will be a two-digit number)
   * @param {object} options Optional hash of overrides for the properties set on the object.
   * @param {string} options.locale The locale in which to format the date (must be a valid BCP 47 language tag)
   * @param {string} options.format The format in which to format the date (must be a valid format string, or 'iso')
   * @param {string} options.timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC')
   * @returns {Date} The Date value parsed by using the parts to extract data from value.
   */
  static #getDateFromParts(value, parts, options) {
    // Currently only parsing numeric values and month names, but not weekdays; not sure what to do with a weekday even if I did
    // parse it successfully; Given a year, a month, and a day, I'd already know the weekday, so what if the parsed one is 
    // different? If I get a year, a month, and a weekday, I'd need a week number to know what day it is, and there currently is no
    // token for week number.
    const nonAlphaNumChars = new Set([...value].filter((c) => /[^\p{L}\p{N}]/u.test(c)));
    const indexesOfNonAlphaNumChars = [...value].map((c, i) => (nonAlphaNumChars.has(c) ? i : null)).filter((i) => i !== null);
    options.indexesOfNonAlphaNumChars = indexesOfNonAlphaNumChars;
    const nonNumChars = new Set([...value].filter((c) => /[^\p{N}]/u.test(c)));
    const indexesOfNonNumChars = [...value].map((c, i) => (nonNumChars.has(c) ? i : null)).filter((i) => i !== null);
    options.indexesOfNonNumChars = indexesOfNonNumChars;
    //let indexOfPartEnd = undefined;
    //let hasNonAlphaNumCharAfter = false;
    //let endingIndex = indexOfPartEnd;
    let month;
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const yearPart = parts.find((p) => p.year?.length);
    if (!DateHelper.#trySetDatePartFromPart(value, yearPart, date, options).success) {
      console.warn(`Did not set the year portion of the date in "${value}", keeping as ${date.getFullYear()}...`);
    }
    /*
    if (yearPart) {
      indexOfPartEnd = indexesOfNonAlphaNumChars.find((i) => i > yearPart.index);
      hasNonAlphaNumCharAfter = indexOfPartEnd !== undefined;
      endingIndex = hasNonAlphaNumCharAfter ? indexOfPartEnd : value.length
      year = value.slice(yearPart.index, endingIndex).replace(/\D/g, '');
      if (!Number.isNaN(+year) && +year !== 0) {
        // console.log('year', year);
        setter = options.timeZone === 'UTC' ? 'setUTCFullYear' : 'setFullYear';
        date[setter](+year);
      } else {
        console.warn(`The year portion, "${value.slice(yearPart.index, endingIndex)}" was not able to be parsed as a number`);
      }
    }
    */
    const monthPart = parts.find((p) => p.month?.length);
    if (!DateHelper.#trySetDatePartFromPart(value, monthPart, date, options).success) {
        // map month names
        const form = monthPart.month;
        const months = new Array(12)
          .fill(0)
          .map((_, i) => new Date(2021, i, 1))
          .map((d) => d.toLocaleString(options.locale, { month: form }));
        month = months.indexOf(value.slice(monthPart.index, monthPart.end));
        if (month > -1) {
          //console.log('month', month);
          monthPart.setter(date, month, options.timeZone === 'UTC');
        } else {
          console.warn(`The month portion, "${value.slice(monthPart.index, monthPart.end)}" was not able to be parsed as a month name`);
        }
    }
    /*
    if (monthPart) {
      indexOfPartEnd = indexesOfNonAlphaNumChars.find((i) => i > monthPart.index);
      hasNonAlphaNumCharAfter = indexOfPartEnd !== undefined;
      endingIndex = hasNonAlphaNumCharAfter ? indexOfPartEnd : value.length
      month = value.slice(monthPart.index, endingIndex).replace(/\D/g, '');
      if (!Number.isNaN(+month) && +month !== 0) {
        // console.log('month', month);
        setter = options.timeZone === 'UTC' ? 'setUTCMonth' : 'setMonth';
        date[setter](+month - 1);
      } else {
      }
    }
    */
    const dayPart = parts.find((p) => p.day?.length);
    if (!DateHelper.#trySetDatePartFromPart(value, dayPart, date, options).success) {
      console.warn(`Did not set the day portion of the date in "${value}", keeping as ${date.getDate()}...`);
    }
    /*
    if (dayPart) {
      indexOfPartEnd = indexesOfNonAlphaNumChars.find((i) => i > dayPart.index);
      hasNonAlphaNumCharAfter = indexOfPartEnd !== undefined;
      endingIndex = hasNonAlphaNumCharAfter ? Math.min(indexOfPartEnd, dayPart.index + 2) : value.length;
      day = value.slice(dayPart.index, endingIndex).replace(/\D/g, '');
      if (!Number.isNaN(+day) && +day !== 0) {
        // console.log('day', day);
        setter = options.timeZone === 'UTC' ? 'setUTCDate' : 'setDate';
        date[setter](+day);
      } else {
        console.warn(`The day portion, "${value.slice(dayPart.index, endingIndex)}" was not able to be parsed as a number`);
      }
    }
    */
    const hourPart = parts.find((p) => p.hour?.length);
    if (!DateHelper.#trySetDatePartFromPart(value, hourPart, date, options).success) {
      console.warn(`Did not set the hour portion of the date in "${value}", keeping as ${date.getHours()}...`);
    }
    /*
    if (hourPart) {
      indexOfPartEnd = indexesOfNonAlphaNumChars.find((i) => i > hourPart.index);
      hasNonAlphaNumCharAfter = indexOfPartEnd !== undefined;
      endingIndex = hasNonAlphaNumCharAfter ? indexOfPartEnd : value.length
      hour = value.slice(hourPart.index, endingIndex).replace(/\D/g, '');
      if (!Number.isNaN(+hour) && +hour !== 0) {
        // console.log('hour', hour);
        setter = options.timeZone === 'UTC' ? 'setUTCHours' : 'setHours';
        date[setter](+hour);
      } else {
        console.warn(`The hour portion, "${hour}" was not able to be parsed as a number`);
      }
    }
    */
    const minutePart = parts.find((p) => p.minute?.length);
    if (!DateHelper.#trySetDatePartFromPart(value, minutePart, date, options).success) {
      console.warn(`Did not set the minute portion of the date in "${value}", keeping as ${date.getMinutes()}...`);
    }
    /*
    if (minutePart) {
      indexOfPartEnd = indexesOfNonAlphaNumChars.find((i) => i > minutePart.index);
      hasNonAlphaNumCharAfter = indexOfPartEnd !== undefined;
      endingIndex = hasNonAlphaNumCharAfter ? indexOfPartEnd : value.length
      minute = value.slice(minutePart.index, endingIndex).replace(/\D/g, '');
      if (!Number.isNaN(+minute) && +minute !== 0) {
        // console.log('minute', minute);
        setter = options.timeZone === 'UTC' ? 'setUTCMinutes' : 'setMinutes';
        date[setter](+minute);
      } else {
        console.warn(`The minute portion, "${minute}" was not able to be parsed as a number`);
      }
    }
    */
    const secondPart = parts.find((p) => p.second?.length);
    if (!DateHelper.#trySetDatePartFromPart(value, secondPart, date, options).success) {
      console.warn(`Did not set the second portion of the date in "${value}", keeping as ${date.getSeconds()}...`);
    }
    /*
    if (secondPart) {
      indexOfPartEnd = indexesOfNonAlphaNumChars.find((i) => i > secondPart.index);
      hasNonAlphaNumCharAfter = indexOfPartEnd !== undefined;
      endingIndex = hasNonAlphaNumCharAfter ? indexOfPartEnd : value.length
      second = value.slice(secondPart.index, endingIndex).replace(/\D/g, '');
      if (!Number.isNaN(+second) && +second !== 0) {
        // console.log('second', second);
        setter = options.timeZone === 'UTC' ? 'setUTCSeconds' : 'setSeconds';
        date[setter](+second);
      } else {
        console.warn(`The second portion, "${second}" was not able to be parsed as a number`);
      }
    }
    */
    const millisecondPart = parts.find((p) => p.fractionalSecondDigits);
    if (!DateHelper.#trySetDatePartFromPart(value, millisecondPart, date, options).success) {
      console.warn(`Did not set the millisecond portion of the date in "${value}", keeping as ${date.getMilliseconds()}...`);
    }
    /*
    if (millisecondPart) {
      indexOfPartEnd = indexesOfNonAlphaNumChars.find((i) => i > millisecondPart.index);
      hasNonAlphaNumCharAfter = indexOfPartEnd !== undefined;
      endingIndex = hasNonAlphaNumCharAfter ? indexOfPartEnd : value.length
      millisecond = value.slice(millisecondPart.index, endingIndex).replace(/\D/g, '');
      if (!Number.isNaN(+millisecond) && +millisecond !== 0) {
        // console.log('millisecond', millisecond);
        setter = options.timeZone === 'UTC' ? 'setUTCMilliseconds' : 'setMilliseconds';
        date[setter](+millisecond);
      } else {
        console.warn(`The millisecond portion, "${millisecond}" was not able to be parsed as a number`);
      }
    }
    */
    return date;
  }
  /**
   * Parses a value as a Date object using the provided options.
   * @param {Date|string|number|undefined|null} value The value to parse.
   * @param {object} options Hash of properties to use when parsing a string. Only relevant when value is a string.
   * @param {string|string[]} options.locale The locales in which to parse the date (must be valid BCP 47 language tags). Only relevant when value is a string.
   * @param {string|string[]} options.format The format in which to parse the date (must be valid format strings). Only relevant when value is a string.
   * @param {string|string[]} options.timeZone The time zone in which to parse the date (must be valid IANA time zone names, or 'UTC'). Only relevant when value is a string.
   * @returns {Date|undefined|null} The parsed Date, or undefined/null if passed in.
   */
  static parseDate(value, options) {
    let { format } = DateHelper.validateOptions(options);
    let result = new Date(undefined);
    if (value == null) {
      console.warn('parseDate: value is undefined or null');
      return value;
    }
    if (value instanceof Date) {
      console.warn('parseDate: value is Date object');
      value = DateHelper.formatDate(value, options);
    }
    if (typeof value === 'number' && !Number.isNaN(value)) {
      console.warn('parseDate: value is number');
      value = DateHelper.formatDate(new Date(value), options);
    }
    // value is string
    if (value.length === 0) {
      console.warn('parseDate: value is empty string');
      // Invalid Date
      return result;
    }
    // Figure out how to carve up format(s) into parts and parse the parts from the value...
    const stringsToFind = Object.keys(DateHelper.stringsToFormatMap);
    let parts = [];
    format = Array.isArray(format) ? format : [format];
    while (format.some(f => Array.isArray(f))) {
      format = format.flat();
    }
    let formatUsed = format[0];
    let date;
    for (let f of format) {
      formatUsed = f;
      f = f === 'iso' ? 'y-MM-ddTHH:mm:ss.fffZ' : f;
      for (let stringToFind of stringsToFind) {
        while (f.includes(stringToFind)) {
          let part = { ...DateHelper.stringsToFormatMap[stringToFind] };
          part.setter = DateHelper.unitToSetter[stringToFind.at(0)];
          part.index = f.indexOf(stringToFind);
          part.length = ['y','yyyy'].includes(stringToFind) ? 4 /* Have to put a number on it */ : stringToFind.length;
          parts.push(part);
          f = f.replace(stringToFind, '_'.repeat(part.length));
        }
        if (!stringsToFind.some((s) => f.includes(s))) {
          break;
        }
      }
      if (!stringsToFind.some((s) => f.includes(s))) {
        date = DateHelper.#getDateFromParts(value, parts, options);
        // now format it back to see if we get the same thing back
        const reformatted = DateHelper.formatDate(date, options);
        if (reformatted === value) {
          break;
        }

        continue;
      }
    }


    return date;
  }
  /**
   * Gets the default format string for the current locale
   */
  getDefaultFormat() {
    return DateHelper.getDefaultFormatForLocale(this.locales);
  }
  /**
   * Formats a date using the properties of the current instance.
   * @param {Date} date The Date object to format
   * @param {object} options Optional hash of overrides for the properties set on the object. Note that it's probably easier to just use the static function in this case.
   * @param {string} options.locale The locale in which to format the date (must be a valid BCP 47 language tag)
   * @param {string} options.format The format in which to format the date (must be a valid format string)
   * @param {string} options.timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC')
   * @returns {string} The formatted date.
   */
  formatDate(date, options) {
    let { locale, format, timeZone } = DateHelper.validateOptions(options);
    return DateHelper.formatDate(date, {
      locale: locale ?? this.locales,
      format: format ?? this.formats,
      timeZone: timeZone ?? this.timeZone,
    });
  }
  /**
   * Parses a value as a Date object using the provided options.
   * @param {Date} value The value to parse
   * @param {object} options Optional hash of overrides for the properties set on the object. Note that it's probably easier to just use the static function in this case.
   * @param {string} options.locale The locale in which to parse the value (must be a valid BCP 47 language tag)
   * @param {string} options.format The format in which to parse the value (must be a valid format string)
   * @param {string} options.timeZone The time zone in which to parse the value (must be a valid IANA time zone name, or 'UTC')
   * @returns {Date|undefined|null} The parsed Date, or undefined/null if passed in as value.
   */
  parseDate(value, options) {
    let { locale, format, timeZone } = DateHelper.validateOptions(options);
    return DateHelper.parseDate(value, {
      locale: locale ?? this.locales,
      format: format ?? this.formats,
      timeZone: timeZone ?? this.timeZone,
    });
  }
}
