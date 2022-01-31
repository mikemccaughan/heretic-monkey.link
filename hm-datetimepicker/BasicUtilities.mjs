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

export class NumberComparisonGranularity {
  static Thousands = 1000;
  static Hundreds = 100;
  static Tens = 10;
  static Integer = 1;
  static Tenths = 0.1;
  static Hundredths = 0.01;
  static Thousandths = 0.001;
  static Default = -1;
  static Custom = 0;
}

export class DateComparisonResult {
  amount = 0;
  units = "ms";
}
export class DeepEqualityArgs {
  /**
   * Validates the order of the elements in the two arrays. Defaults to false.
   */
  validateElementOrder = false;
  /**
   * Validates the order of the own properties in the two objects. Defaults to false.
   */
  validatePropertyOrder = false;
  /**
   * The granularity with which to compare Date objects. Defaults to "ms", milliseconds. 
   * Other possible values are expressed as members of the DateComparisonGranularity class.
   */
  dateGranularity = DateComparisonGranularity.Default;
  /**
   * The function to use when dateGranularity is set to "?" (Custom). Defaults to a function
   * that does the same thing as the default; that is, one that returns whether the value of
   * the Date objects are equal.
   * @param {Date} a The first date to compare.
   * @param {Date} b The second date to compare.
   * @returns {number} A string that specifies
   */
  dateGranularityCustom = (a, b) => a.valueOf() === b.valueOf();
  /**
   * The granularity with which to compare numbers. This is essentially the maximum value 
   * by which the two numbers may differ. Defaults to Number.EPSILON (essentially 0).
   */
  numberGranularity = NumberComparisonGranularity.Default;
  /**
   * The function to use when numberGranularity is set to -1 (Custom). Defaults to a function
   * that does the same thing as the default; that is, one that takes the absolute value of the
   * difference between the two numbers and returns whether it is less than Number.EPSILON.
   * @param {number} a The first number to compare.
   * @param {number} b The second number to compare.
   * @returns true if the numbers are the same at the custom granularity; otherwise, false.
   */
  numberGranularityCustom = (a, b) => Math.abs(a - b) < Number.EPSILON;
}
export default class BasicUtilities {
  /**
   * Checks if both items specified have the same value.
   * @param {unknown} a The first item to compare
   * @param {unknown} b The second item to compare
   * @param {boolean} deep true to use deep comparison (same as calling deepEquals);
   *  otherwise (default), don't use deep comparison
   * @param {DeepEqualityArgs} deepArgs The DeepEqualityArgs instance to use when deep = true.
   * @returns {boolean} true, if a and b have the same base value (for objects, share the
   *  same keys and values; for arrays, share the same elements; for both, in any order, 
   *  unless both deep and validatePropertyOrder are true)
   * @remarks Throws custom Error if JSON.stringify throws.
   */
  static areTheSame(a, b, deep = false,
    deepArgs = new DeepEqualityArgs) {
    if (deep) {
      // Passing deep == true calls deepEquals
      return BasicUtilities.deepEquals(a, b, deepArgs);
    }
    if (typeof a !== typeof b) {
      // Essentially preempting any === vs == typos. Also checks for one being 
      // undefined and the other not.
      return false;
    }
    if (typeof a === 'undefined' && typeof b === 'undefined') {
      // If both are undefined, then they are the same.
      return true;
    }
    if ((a === null && b !== null) || (a !== null && b === null)) {
      // If one's null and the other isn't, they are not equal, but may have the same typeof ('object').
      // If one's undefined and the other isn't, that will be caught by the typeof check above.
      return false;
    }
    if (
      (Array.isArray(a) && !Array.isArray(b)) ||
      (!Array.isArray(a) && Array.isArray(b))
    ) {
      // If one's an array and the other isn't, they are not the same.
      return false;
    }
    if (
      (a instanceof Date && !(b instanceof Date)) ||
      (!(a instanceof Date) && b instanceof Date)
    ) {
      // If one's a Date and the other isn't, they are not the same.
      return false;
    }
    if (a instanceof Date) {
      // Just checks the value, so the dates must be the same down to the millisecond.
      // To use dateGranularity, deep must be true.
      return a.valueOf() === b.valueOf();
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      // Check arrays at a surface level (if deep === true, we never get here)
      // difference between this and deepEquals: this compares dates by value only in arrays
      return (
        a.length === b.length &&
        a.every((aItem) =>
          b.some((bItem) =>
            BasicUtilities.areTheSame(aItem, bItem)
          )
        )
      );
    }
    if (
      typeof a !== 'object' &&
      typeof a !== 'function' &&
      !Array.isArray(a) &&
      !(a instanceof Date)
    ) {
      // if it's not a special type (i.e. it's a number, string, Boolean, BigInt, etc.), just use equality
      return a === b;
    }
    if (typeof a === 'object') {
      if (a === null && b === null) {
        // Since typeof null === 'object', but running Object.keys(null) throws a TypeError.
        return true;
      }
      // difference between this and deepEquals: this compares object references
      return a === b;
    }
    if (typeof a === 'function') {
      // for functions, we're just checking their "toString" output and "name" values.
      return a.name === b.name && a.toString() === b.toString();
    }
  }
  /**
   * Does a deep comparison of two arrays.
   * @param {unknown[]} a The first array to compare.
   * @param {unknown[]} b The second array to compare.
   * @param {DeepEqualityArgs} deepArgs The arguments to the function.
   * @returns {boolean} true if the two arrays are the same; otherwise false.
   */
  static deepEqualsArrays(a, b, deepArgs = new DeepEqualityArgs) {
    if (typeof a !== typeof b) {
      return false;
    }
    if ((a === null && b !== null) || (a !== null && b === null)) {
      return false;
    }
    if (!Array.isArray(b) || !Array.isArray(a)) {
      throw new Error(`Both values specified must be arrays according to the Array.isArray function.`);
    }
    return (
      a.length === b.length &&
        deepArgs.validateElementOrder ?
        a.every((aItem, index) => BasicUtilities.deepEquals(aItem, b[index], deepArgs)) :
        a.every((aItem) => b.some((bItem) => BasicUtilities.deepEquals(aItem, bItem, deepArgs)))
    );
  }
  /**
   * 
   * @param {unknown} a The first item to compare
   * @param {unknown} b The second item to compare
   * @param {DeepEqualityArgs} deepArgs The arguments to the function.
   * @returns {boolean} true, if a and b have the same base value (for objects, share the
   *  same keys and values; for arrays, share the same elements; for both, in any order, 
   *  unless both validatePropertyOrder are true)
   */
  static deepEquals(a, b, deepArgs) {
    if (typeof a !== typeof b) {
      return false;
    }
    if ((a === null && b !== null) || (a !== null && b === null)) {
      return false;
    }
    if (
      (Array.isArray(a) && !Array.isArray(b)) ||
      (!Array.isArray(a) && Array.isArray(b))
    ) {
      return false;
    }
    if (
      typeof a !== 'object' &&
      typeof a !== 'function' &&
      typeof a !== 'number' &&
      !Array.isArray(a) &&
      !(a instanceof Date)
    ) {
      return a === b;
    }
    if (typeof a === 'number') {
      if (deepArgs.numberGranularity === NumberComparisonGranularity.Custom) {
        return deepArgs.numberGranularityCustom(a, b);
      } else if (deepArgs.numberGranularity === NumberComparisonGranularity.Default) {
        return Math.abs(a - b) <= Number.EPSILON;
      } else {
        return Math.abs(a - b) <= deepArgs.numberGranularity
          /* Frickin IEEE754 floating point */
          || (deepArgs.numberGranularity === 0.1 && Math.abs(a - b).toFixed(18).localeCompare('0.100000000000000089') === 0)
          || (deepArgs.numberGranularity === 0.01 && Math.abs(a - b).toFixed(18).localeCompare('0.010000000000000009') === 0)
          ;
      }
    }
    if (a instanceof Date) {
      return BasicUtilities.diffDates(a, b, deepArgs.dateGranularity, deepArgs.dateGranularityCustom).amount === 0;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      // Note that unlike areTheSame, deepEquals checks order of array items also
      return (
        a.length === b.length &&
        a.every((aItem, index) => BasicUtilities.deepEquals(aItem, b[index], deepArgs))
      );
    }
    if (typeof a === 'object') {
      if (a === null && b === null) {
        // Since typeof null === 'object', but running Object.entries(null) throws a TypeError.
        return true;
      }
      // Deep equals compares the entries of each object
      if (deepArgs.validatePropertyOrder) {
        // Uses an array comparison of the result of Object.entries using a deepEquals with validateElementOrder = true
        const aEntries = Object.entries(a);
        const bEntries = Object.entries(b);
        deepArgs.validateElementOrder = true;
        return BasicUtilities.deepEqualsArrays(aEntries, bEntries, deepArgs);
      }
      // Uses for...in so that all properties in the prototype chain are considered if validatePropertyOrder is false
      let isSame = true;
      for (const key in a) {
        isSame = isSame && (key in b) && BasicUtilities.deepEquals(a[key], b[key], deepArgs);
        if (!isSame) {
          return false;
        }
      }
      return isSame;
    }
    if (typeof a === 'function') {
      // for functions, we're just checking their "toString" output and "name" values.
      return a.name === b.name && a.toString() === b.toString();
    }
  }
  static msPerSecond = 1000;
  static msPerMinute = BasicUtilities.msPerSecond * 60;
  static msPerHour = BasicUtilities.msPerMinute * 60;
  static msPerDay = BasicUtilities.msPerHour * 24;
  static msPerWeek = BasicUtilities.msPerDay * 7;
  static msPerYear = BasicUtilities.msPerDay * 365;
  static msPerLeapYear = BasicUtilities.msPerDay * 366;
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
        return { amount: diff / BasicUtilities.msPerSecond, unit: DateComparisonGranularity.Second };
      case DateComparisonGranularity.Minute:
        return { amount: diff / BasicUtilities.msPerMinute, unit: DateComparisonGranularity.Minute };
      case DateComparisonGranularity.Hour:
        return { amount: diff / BasicUtilities.msPerHour, unit: DateComparisonGranularity.Hour };
      case DateComparisonGranularity.Day:
        return { amount: diff / BasicUtilities.msPerDay, unit: DateComparisonGranularity.Day };
      case DateComparisonGranularity.Week:
        return { amount: diff / BasicUtilities.msPerWeek, unit: DateComparisonGranularity.Week };
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
            totalMs: new Date(year ?? aYear, month + 1, 0).getDate() * BasicUtilities.msPerDay,
            year: (year ?? aYear),
            ms: dayCount * BasicUtilities.msPerDay,
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
          amount: BasicUtilities.diffDates(a, b, DateComparisonGranularity.Month).amount / 3,
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
            return { amount: diff / BasicUtilities.msPerYear, unit: DateComparisonGranularity.Year };
          } else {
            const yearCounts = years.map(y => ({
              year: y,
              ms: isLeap(y) ?
                BasicUtilities.msPerLeapYear :
                BasicUtilities.msPerYear
            }))
            .map(({ year, ms }) =>
              year === aYear ?
                ({
                  year,
                  ms,
                  message: `diff "${a.toISOString()}" and "${new Date(aYear + 1, 0, 1, 0, 0, 0, 0).toISOString()}"`,
                  amt: BasicUtilities.diffDates(a, new Date(aYear + 1, 0, 1, 0, 0, 0, 0)).amount,
                  count: BasicUtilities.diffDates(a, new Date(aYear + 1, 0, 1, 0, 0, 0, 0)).amount / ms
                }) :
                year === bYear ?
                  ({
                    year,
                    ms,
                    message: `diff "${new Date(bYear - 1, 11, 32, 0, 0, 0, 0).toISOString()}" and "${b.toISOString()}"`,
                    amt: BasicUtilities.diffDates(new Date(bYear - 1, 11, 32, 0, 0, 0, 0), b).amount,
                    count: BasicUtilities.diffDates(new Date(bYear - 1, 11, 32, 0, 0, 0, 0), b).amount / ms
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
    }
    return diff;
  }
}
