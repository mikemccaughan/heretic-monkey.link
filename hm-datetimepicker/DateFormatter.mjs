/**
 * Provides basic instance and static date and time formatting functionality.
 */
export class DateFormatter {
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
    ggg: {
      era: 'long',
    },
    /**
     * Formats the era in a "short" format; e.g. AD
     */
    gg: {
      era: 'short',
    },
    /**
     * Formats the era in a "narrow" format; e.g. A
     */
    g: {
      era: 'narrow',
    },
    /**
     * Formats the year using the minimum number of digits needed; e.g., 2021, 12 (for the year 12 AD), -12 (for the year 12 BC)
     */
    yyyy: {
      year: 'numeric',
    },
    /**
     * Formats the year using 2 digits; e.g., 00 refers to any year that ends in 00 (100, 1100, 1900, 2000, etc.)
     */
    yy: {
      year: '2-digit',
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
     * Formats the month name in a "narrow" format; e.g., J, M, D (note that two months can share a narrow name; March is also formatted as M)
     */
    o: {
      month: 'narrow',
    },
    /**
     * Formats the weekday name in a "long" format; e.g., Sunday, Thursday, Saturday
     */
    wwww: {
      weekday: 'long',
    },
    /**
     * Formats the weekday name in a "short" format; e.g., Sun, Thu, Sat
     */
    www: {
      weekday: 'short',
    },
    /**
     * Formats the weekday name in a "narrow" format; e.g., S, T, S (note that two days can share a narrow name)
     */
    w: {
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
    const localeResult = DateFormatter.parseLocales(value);
    if (!localeResult.valid) {
      throw new Error(localeResult.error);
    }
    this._locales = localeResult.value;
  }
  get formats() {
    return this._formats;
  }
  set formats(value) {
    let formatsResult = DateFormatter.parseFormats(value);
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
  static parseFormats(formats) {
    if (typeof formats === 'undefined') {
      return {
        valid: true,
        value: [DateFormatter.getDefaultFormatForLocale(this.locales)],
      };
    } else if (Array.isArray(formats)) {
      const aggregateResult = formats.reduce(
        (agg, cur) => {
          const curResult = DateFormatter.parseFormats(cur);
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
          const curResult = DateFormatter.parseLocales(cur);
          agg.valid = agg.valid && curResult.valid;
          agg.value = [...agg.value, curResult.value];
          agg.error = `${agg.error}\n${curResult.error}`;
          return agg;
        },
        { valid: true, value: [], error: '' }
      );
      return aggregateResult;
    } else if (typeof locales === 'string') {
      if (DateFormatter.bcp47re.test(locales)) {
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
    const localesResult = DateFormatter.parseLocales(locales);
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
              format += 'yyyy';
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
   * @param {string} locale The locale in which to format the date (must be a valid BCP 47 language tag)
   * @param {string} format The format in which to format the date (must be a valid format string)
   * @param {string} timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC')
   */
  static formatDate(date, locale, format, timeZone) {
    if (isNaN(date.valueOf())) {
      throw new Error(`The date given, "${date}", is not a valid Date.`);
    }
    const localeResult = DateFormatter.parseLocales(locale);
    if (!localeResult.valid) {
      throw new Error(localeResult.error);
    }
    locale = localeResult.value[0];
    const formatResult = DateFormatter.parseFormats(format);
    if (!formatResult.valid) {
      throw new Error(formatResult.error);
    }
    format = formatResult.value[0];
    while (Array.isArray(format) && typeof format !== 'string') {
      format = format[0];
    }
    if (timeZone == null || timeZone.length === 0) {
      timeZone = 'UTC';
    }
    const dateFormat = {
      timeZone,
    };
    const stringsToFind = Object.keys(DateFormatter.stringsToFormatMap);
    const styles = ['full', 'long', 'medium', 'short'];
    let formatted = format;
    let hadStyle = false;
    for (let s of stringsToFind) {
      if (formatted.includes(s)) {
        const isStyle = styles.some((style) => s.includes(style));
        let value = null;
        if (s === 'iso') {
          value = DateFormatter.formatDate(
            date,
            undefined,
            'yyyy-MM-ddTHH:mm:ss.fffZ',
            'UTC'
          );
        } else {
          const options = Object.assign(
            {},
            dateFormat,
            DateFormatter.stringsToFormatMap[s]
          );
          const formatter = new Intl.DateTimeFormat(locale, options);
          const parts = formatter.formatToParts(date);
          const partType = Object.keys(DateFormatter.stringsToFormatMap[s])[0];
          let optionName = partType;
          let option = options[optionName];
          const resolvedOptions = formatter.resolvedOptions();
          let resolvedOption = resolvedOptions[optionName];
          if (option === null) {
            optionName = Object.keys(DateFormatter.stringsToFormatMap[s])[1];
            option = options[optionName];
            resolvedOption = resolvedOptions[optionName];
          }
          value = parts.find((part) => part.type === partType).value;
          // v8 resolves minute and second as 'numeric' even when set as '2-digit'
          // it also resolves hourCycle as 'h24' even when set as 'h23'
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
          formatted = formatted.replace(new RegExp(`${s}`, 'g'), value);
        }
        hadStyle = hadStyle || isStyle;
      }
    }
    return formatted;
  }
  /**
   * Formats a date using the properties of the current instance.
   * @param date The Date object to format
   * @param options Optional hash of overrides for the properties set on the object. Note that it's probably easier to just use the static function in this case.
   * @param options.locale The locale in which to format the date (must be a valid BCP 47 language tag)
   * @param options.format The format in which to format the date (must be a valid format string)
   * @param options.timeZone The time zone in which to format the date (must be a valid IANA time zone name, or 'UTC')
   */
  formatDate(date, options) {
    let { locale, format, timeZone } = options ?? {};
    return DateFormatter.formatDate(
      date,
      locale || this.locales,
      format || this.formats,
      timeZone || this.timeZone
    );
  }
}
