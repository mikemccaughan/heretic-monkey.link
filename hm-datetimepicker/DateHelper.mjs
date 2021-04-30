/**
 * Provides basic instance and static date and time formatting functionality.
 */
export class DateHelper {
  /***
   * Regular expression for validating BCP 47 language tags, for use as a locale.
   */
  static bcp47re = /^((?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(?<privateUse>x(-[A-Za-z0-9]{1,8})+))?)|(?<privateUse1>x(-[A-Za-z0-9]{1,8})+))$/;
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
      fractionalSecondDigits: 3,
      timeZone: 'UTC',
    },
    /**
     * Formats a date in a "full" format; cannot be combined with other formatting strings except times with named formats.
     */
    ud: {
      dateStyle: 'full',
    },
    /**
     * Formats a time in a "full" format; cannot be combined with other formatting strings except dates with named formats.
     */
    ut: {
      timeStyle: 'full',
    },
    /**
     * Formats a date and time in a "full" format; cannot be combined with other formatting string.
     */
    u: {
      dateStyle: 'full',
      timeStyle: 'full',
    },
    /**
     * Formats a date in a "long" format; cannot be combined with other formatting strings except times with named formats.
     */
    ld: {
      dateStyle: 'long',
    },
    /**
     * Formats a time in a "long" format; cannot be combined with other formatting strings except dates with named formats.
     */
    lt: {
      timeStyle: 'long',
    },
    /**
     * Formats a date and time in a "long" format; cannot be combined with other formatting string.
     */
    l: {
      dateStyle: 'long',
      timeStyle: 'long',
    },
    /**
     * Formats a date in a "medium" format; cannot be combined with other formatting strings except times with named formats.
     */
    ed: {
      dateStyle: 'medium',
    },
    /**
     * Formats a time in a "medium" format; cannot be combined with other formatting strings except dates with named formats.
     */
    et: {
      timeStyle: 'medium',
    },
    /**
     * Formats a date and time in a "medium" format; cannot be combined with other formatting string.
     */
    eu: {
      dateStyle: 'medium',
      timeStyle: 'medium',
    },
    /**
     * Formats a date in a "short" format; cannot be combined with other formatting strings except times with named formats.
     */
    rd: {
      dateStyle: 'short',
    },
    /**
     * Formats a time in a "short" format; cannot be combined with other formatting strings except dates with named formats.
     */
    rt: {
      timeStyle: 'short',
    },
    /**
     * Formats a date and time in a "short" format; cannot be combined with other formatting string.
     */
    r: {
      dateStyle: 'short',
      timeStyle: 'short',
    },
    /**
     * Formats the era in a "long" format; e.g. Anno Domini
     */
    GGG: {
      era: 'long',
    },
    /**
     * Formats the era in a "short" format; e.g. AD
     */
    GG: {
      era: 'short',
    },
    /**
     * Formats the era in a "narrow" format; e.g. A
     */
    G: {
      era: 'narrow',
    },
    /**
     * Formats the year using 2 digits; e.g., 00 refers to any year that ends in 00 (100, 1100, 1900, 2000, etc.)
     */
    yy: {
      year: '2-digit',
    },
    /**
     * Formats the year using the minimum number of digits needed; e.g., 2021, 12 (for the year 12 AD), -12 (for the year 12 BC)
     */
    y: {
      year: 'numeric',
    },
    /**
     * Formats the month name in a "narrow" format; e.g., J, M, D (note that two months can share a narrow name; March is also formatted as M)
     */
    MMMMM: {
      month: 'narrow',
    },
    /**
     * Formats the month name in a "long" format; e.g., January, May, December
     */
    MMMM: {
      month: 'long',
    },
    /**
     * Formats the month name in a "short" format; e.g., Jan, May, Dec
     */
    MMM: {
      month: 'short',
    },
    /**
     * Formats the month number using two digits; e.g., 01, 05, 12
     */
    MM: {
      month: '2-digit',
    },
    /**
     * Formats the month number using the minimum number of digits needed; e.g., 1, 5, 12
     */
    M: {
      month: 'numeric',
    },
    /**
     * Formats the weekday name in a "long" format; e.g., Sunday, Thursday, Saturday
     */
    EEEE: {
      weekday: 'long',
    },
    /**
     * Formats the weekday name in a "short" format; e.g., Sun, Thu, Sat
     */
    EEE: {
      weekday: 'short',
    },
    /**
     * Formats the weekday name in a "narrow" format; e.g., S, T, S (note that two days can share a narrow name)
     */
    EEEEE: {
      weekday: 'narrow',
    },
    /**
     * Formats the day using two digits; e.g., 01, 05, 12
     */
    dd: {
      day: '2-digit',
    },
    /**
     * Formats the day using the minimum number of digits needed; e.g., 1, 5, 12
     */
    d: {
      day: 'numeric',
    },
    /**
     * Formats the hour using two digits, on a 24 hour cycle; e.g., 00, 12, 23
     */
    HH: {
      hour: '2-digit',
      hour12: false,
      hourCycle: 'h23',
    },
    /**
     * Formats the hour using two digits, on a 12 hour cycle; e.g., 12, 12, 11
     */
    hh: {
      hour: '2-digit',
      hour12: true,
      hourCycle: 'h12',
    },
    /**
     * Formats the hour using the minimum number of digits needed, on a 24 hour cycle; e.g., 0, 12, 23
     */
    H: {
      hour: 'numeric',
      hour12: false,
      hourCycle: 'h23',
    },
    /**
     * Formats the hour using the minimum number of digits needed, on a 12 hour cycle; e.g., 12, 12, 11
     */
    h: {
      hour: 'numeric',
      hour12: true,
      hourCycle: 'h12',
    },
    /**
     * Formats the minute using two digits; e.g., 01, 05, 12
     */
    mm: {
      minute: '2-digit',
    },
    /**
     * Formats the minute using the minimum number of digits needed; e.g., 1, 5, 12
     */
    m: {
      minute: 'numeric',
    },
    /**
     * Formats the second using two digits; e.g., 01, 05, 12
     */
    ss: {
      second: '2-digit',
    },
    /**
     * Formats the second using the minimum number of digits needed; e.g., 1, 5, 12
     */
    s: {
      second: 'numeric',
    },
    /**
     * Formats the number of milliseconds using 3 digits; e.g., 001, 012, 235
     */
    fff: {
      fractionalSecond: null,
      fractionalSecondDigits: 3,
    },
    /**
     * Formats the number of decaseconds using 2 digits; e.g., 00, 01, 24
     */
    ff: {
      fractionalSecond: null,
      fractionalSecondDigits: 2,
    },
    /**
     * Formats the number of centiseconds using 2 digits; e.g., 0, 0, 2
     */
    f: {
      fractionalSecond: null,
      fractionalSecondDigits: 1,
    },
    /**
     * Formats the time zone used for formatting using a "long" format (implementation-dependent); e.g., GMT-05:00, GMT-01:01:36, Coordinated Universal Time
     */
    kk: {
      timeZoneName: 'long',
    },
    /**
     * Formats the time zone used for formatting using a "long" format (implementation-dependent); e.g., GMT-5, GMT-01:01:36, UTC
     */
    k: {
      timeZoneName: 'short',
    },
    /**
     * Formats the time of day using a "long" format (implementation-dependent); e.g., "in the night", "in the evening", "PM"
     */
    aaa: {
      dayPeriod: 'long',
    },
    /**
     * Formats the time of day using a "short" format (implementation-dependent); e.g., "in the night", "in the evening", "PM"
     */
    aa: {
      dayPeriod: 'short',
    },
    /**
     * Formats the time of day using a "short" format (implementation-dependent); e.g., "in the night", "in the evening", "P"
     */
    a: {
      dayPeriod: 'narrow',
    },
  };

  _locales;
  _formats;
  _timeZone;

  /**
   *
   * @param locales The locale in which to format the date (must be a valid BCP 47 language tag), or an array of such strings, or undefined or null (to use the browser's default)
   * @param formats The format in which to format the date (must be a valid format string), or an array of such strings, or undefined or null (to use the locale's default format)
   * @param timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC', or undefined or null to use 'UTC')
   */
  constructor(locales, formats, timeZone) {
    this.locales = locales;
    this.formats = formats;
    this.timeZone = timeZone;
  }
  get locales() {
    return this._locales;
  }
  set locales(value) {
    const localeResult = DateHelper.parseLocales(value);
    if (!localeResult.valid) {
      throw new Error(localeResult.error);
    }
    this._locales = localeResult.value;
  }
  get formats() {
    return this._formats;
  }
  set formats(value) {
    let formatsResult = DateHelper.parseFormats(value);
    if (!formatsResult.valid) {
      throw new Error(formatsResult.error);
    }
    this._formats = formatsResult.value;
  }
  get timeZone() {
    return this._timeZone;
  }
  set timeZone(value) {
    if (this._timeZone !== value) {
      this._timeZone = value;
    }
  }
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
    if (timeZone == null || timeZone.length === 0) {
      timeZone = 'UTC';
    }
    return { locale, format, timeZone };
  }
  static parseFormats(formats) {
    if (typeof formats === 'undefined') {
      return {
        valid: true,
        value: [DateHelper.getDefaultFormatForLocale(this.locales)],
      };
    } else if (Array.isArray(formats)) {
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
      // TODO: Figure out how to determine what a valid format string is
      return { valid: true, value: [formats] };
    } else {
      return {
        valid: false,
        error: `The format provided, "${formats}", is not a valid format`,
      };
    }
  }
  static parseLocales(locales) {
    if (typeof locales === 'undefined') {
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
   * Gets the default format string for the specified locale
   * @param {string} locales The locale "A string with a BCP 47 language tag,
   * or an array of such strings. To use the browser's default locale, pass
   * an empty array."
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
   * Formats a given date according to a specified locale and format string, in an optional time zone
   * @param {Date} date The Date object to format
   * @param {object} options Optional hash of overrides for the properties set on the object.
   * @param {string} options.locale The locale in which to format the date (must be a valid BCP 47 language tag)
   * @param {string} options.format The format in which to format the date (must be a valid format string)
   * @param {string} options.timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC')
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
        const isStyle = styles.some((style) => s.includes(style));
        let value = null;
        if (s === 'iso') {
          value = DateHelper.formatDate(date, {
            locale: undefined,
            format: 'y-MM-ddTHH:mm:ss.fffZ',
            timeZone: 'UTC',
          });
        } else {
          const options = Object.assign(
            {},
            dateFormat,
            DateHelper.stringsToFormatMap[s]
          );
          // v8 and others require the entire time to be formatted to override individual
          // elements of the time, so this code fills in the higher units of time.
          if (
            options.hasOwnProperty('minute') &&
            !options.hasOwnProperty('hour')
          ) {
            options.hour = options.minute;
            options.hour12 = options.hour !== '2-digit';
          }
          if (
            options.hasOwnProperty('second') &&
            !options.hasOwnProperty('minute') &&
            !options.hasOwnProperty('hour')
          ) {
            options.minute = options.second;
            options.hour = options.minute;
            options.hour12 = options.hour !== '2-digit';
          }
          if (
            options.hasOwnProperty('dayPeriod') &&
            !options.hasOwnProperty('minute') &&
            !options.hasOwnProperty('hour')
          ) {
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
          if (
            (resolvedOption !== option && value && value.length) ||
            (optionName === 'hour' && value && value.length)
          ) {
            if (
              optionName === 'hour' &&
              options.hourCycle === 'h23' &&
              resolvedOptions.hourCycle === 'h24'
            ) {
              optionName = 'hourCycle';
              option = options[optionName];
              resolvedOption = resolvedOptions[optionName];
            }
            console.warn(
              `Option "${optionName}" was set as "${option}" but resolved as "${resolvedOption}". Attempting to correct...`
            );
            // While the code above might fix the problem in v8 & SpiderMonkey,
            // I have doubts about JavaScriptCore so I'm leaving this in.
            if (resolvedOption === 'numeric' && option === '2-digit') {
              value = `00${value}`.slice(-2);
            } else if (resolvedOption === '2-digit' && option === 'numeric') {
              value = parseInt(value).toString();
            } else if (
              resolvedOption === 'h24' &&
              option === 'h23' &&
              value === '24'
            ) {
              value = '00';
            }
          }
        }
        if (value && value.length) {
          // Keeps a running list of indexes of strings that have been replaced in the formatted string so that later
          // iterations don't try and replace format strings in the replacement text (e.g., the h, r, & d in Thursday)
          let last = 0;
          while (formatted.indexOf(s, last) !== -1) {
            last = formatted.indexOf(s, last);
            done = [
              ...done,
              ...Array(value.length)
                .fill(0)
                .map((_, i) => i + last),
            ];
            last += 1;
          }
          formatted = formatted.replace(new RegExp(`${s}`, 'g'), value);
        }
        hadStyle = hadStyle || isStyle;
      }
    }
    return formatted;
  }
  /**
   *
   * @param {Date|string|number|undefined|null} value The value to parse.
   * @param {object} options Optional hash of overrides for the properties set on the object. Only relevant when value is a string.
   * @param {string|string[]} options.locale The locales in which to format the date (must be valid BCP 47 language tags). Only relevant when value is a string.
   * @param {string|string[]} options.format The format in which to format the date (must be valid format strings). Only relevant when value is a string.
   * @param {string|string[]} options.timeZone The time zone in which to format the date (must be valid IANA time zone names, or 'UTC'). Only relevant when value is a string.
   */
  static parseDate(value, options) {
    let { locale, format, timeZone } = DateHelper.validateOptions(options);
    let result = new Date(undefined);
    if (value == null) {
      return value;
    }
    if (value instanceof Date) {
      result = new Date(value.valueOf());
      return result;
    }
    if (value === Number(value)) {
      result = new Date(+value);
      return result;
    }
    // value is string
    if (value.length === 0) {
      // Invalid Date
      return result;
    }
    // Figure out how to carve up format(s) into parts and parse the parts from the value...
    const stringsToFind = Object.keys(DateHelper.stringsToFormatMap);
    let parts = [];
    let formatUsed = format[0];
    for (let f of format) {
      formatUsed = f;
      for (let stringToFind of stringsToFind) {
        while (f.includes(stringToFind)) {
          let part = { ...DateHelper.stringsToFormatMap[stringToFind] };
          part.index = f.indexOf(stringToFind);
          part.length
          parts.push(part);
          f = f.replace(stringToFind, '_'.repeat(stringToFind.length));
        }
        if (!stringsToFind.some((s) => f.includes(s))) {
          break;
        }
      }
      if (!stringsToFind.some((s) => f.includes(s))) {
        break;
      }
    }

    // Currently only working with numeric replacements, not things like month names
    const nonDigitChars = new Set([...value].filter((c) => /\D/.test(c)));
    const indexesOfNonDigitChars = [...value]
      .map((c, i) => (nonDigitChars.has(c) ? i : null))
      .filter((i) => i !== null);
    let hasNonDigitCharAfter = false;
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const yearPart = parts.find((p) => p.year?.length);
    if (yearPart) {
      hasNonDigitCharAfter =
        indexesOfNonDigitChars.findIndex((i) => i > yearPart.index) !== -1;
      const year = value.slice(
        yearPart.index + 1,
        hasNonDigitCharAfter
          ? indexesOfNonDigitChars.findIndex((i) => i > yearPart.index)
          : value.length
      );
      date.setFullYear(+year);
    }
    const monthPart = parts.find((p) => p.month?.length);
    if (monthPart) {
      hasNonDigitCharAfter =
        indexesOfNonDigitChars.findIndex((i) => i > monthPart.index) !== -1;
      const month = value.slice(
        monthPart.index,
        hasNonDigitCharAfter
          ? indexesOfNonDigitChars.find((i) => i > monthPart.index)
          : value.length
      );
      date.setMonth(+month - 1);
    }
    const dayPart = parts.find((p) => p.day?.length);
    if (dayPart) {
      hasNonDigitCharAfter =
        indexesOfNonDigitChars.findIndex((i) => i > dayPart.index) !== -1;
      const day = value.slice(
        dayPart.index,
        hasNonDigitCharAfter
          ? indexesOfNonDigitChars.find((i) => i > dayPart.index)
          : value.length
      );
      date.setDate(+day);
    }

    return date;
  }
  /**
   * Formats a date using the properties of the current instance.
   * @param {Date} date The Date object to format
   * @param {object} options Optional hash of overrides for the properties set on the object. Note that it's probably easier to just use the static function in this case.
   * @param {string} options.locale The locale in which to format the date (must be a valid BCP 47 language tag)
   * @param {string} options.format The format in which to format the date (must be a valid format string)
   * @param {string} options.timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC')
   */
  formatDate(date, options) {
    let { locale, format, timeZone } = DateHelper.validateOptions(options);
    return DateHelper.formatDate(date, {
      locale: locale || this.locales,
      format: format || this.formats,
      timeZone: timeZone || this.timeZone,
    });
  }
}
