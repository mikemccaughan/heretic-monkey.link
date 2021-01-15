export class DateFormatter {
  static bcp47re = /^((?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(?<privateUse>x(-[A-Za-z0-9]{1,8})+))?)|(?<privateUse1>x(-[A-Za-z0-9]{1,8})+))$/;
  static stringsToFormatMap = {
    iso: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    },
    ud: {
      dateStyle: 'full',
    },
    ut: {
      timeStyle: 'full',
    },
    u: {
      dateStyle: 'full',
      timeStyle: 'full',
    },
    ld: {
      dateStyle: 'long',
    },
    lt: {
      timeStyle: 'long',
    },
    l: {
      dateStyle: 'long',
      timeStyle: 'long',
    },
    ed: {
      dateStyle: 'medium',
    },
    et: {
      timeStyle: 'medium',
    },
    eu: {
      dateStyle: 'medium',
      timeStyle: 'medium',
    },
    rd: {
      dateStyle: 'short',
    },
    rt: {
      timeStyle: 'short',
    },
    r: {
      dateStyle: 'short',
      timeStyle: 'short',
    },
    ggg: {
      era: 'long',
    },
    gg: {
      era: 'short',
    },
    g: {
      era: 'narrow',
    },
    yyyyy: {
      year: 'numeric',
    },
    yyyy: {
      year: 'numeric',
    },
    yy: {
      year: '2-digit',
    },
    MMMM: {
      month: 'long',
    },
    MMM: {
      month: 'short',
    },
    MM: {
      month: '2-digit',
    },
    M: {
      month: 'numeric',
    },
    o: {
      month: 'narrow',
    },
    wwww: {
      weekday: 'long',
    },
    www: {
      weekday: 'short',
    },
    w: {
      weekday: 'narrow',
    },
    dd: {
      day: '2-digit',
    },
    d: {
      day: 'numeric',
    },
    HH: {
      hour: '2-digit',
      hour12: false,
      hourCycle: 'h23',
    },
    hh: {
      hour: '2-digit',
      hour12: true,
      hourCycle: 'h12',
    },
    H: {
      hour: 'numeric',
      hour12: false,
      hourCycle: 'h23',
    },
    h: {
      hour: 'numeric',
      hour12: true,
      hourCycle: 'h12',
    },
    mm: {
      minute: '2-digit',
    },
    m: {
      minute: 'numeric',
    },
    ss: {
      second: '2-digit',
    },
    s: {
      second: 'numeric',
    },
    fff: {
      fractionalSecond: '',
      fractionalSecondDigits: 3,
    },
    ff: {
      fractionalSecond: '',
      fractionalSecondDigits: 2,
    },
    f: {
      fractionalSecond: '',
      fractionalSecondDigits: 1,
    },
    kk: {
      timeZoneName: 'long',
    },
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
          console.log(formatter.resolvedOptions());
          const parts = formatter.formatToParts(date);
          const partType = Object.keys(DateFormatter.stringsToFormatMap[s])[0];
          value = parts.find((part) => part.type === partType).value;
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
   *
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
