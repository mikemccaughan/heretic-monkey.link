export class RelativeDateParser {
  static canParse(value) {
    return (
      value != null &&
      value.length &&
      (['yesterday', 'today', 'tomorrow'].includes(value.toLowerCase()) ||
        /^([+-]*)(\d+)([yqmwdhnsl]?$)/.test(value))
    );
  }
  static parse(value, useUTC) {
    var now = new Date();
    value = value.trim().toLowerCase();
    if (value === 'yesterday') {
      now.setDate(now.getDate() - 1);
      return new Date(now.valueOf());
    }
    if (value === 'today') {
      return new Date(now.valueOf());
    }
    if (value === 'tomorrow') {
      now.setDate(now.getDate() + 1);
      return new Date(now.valueOf());
    }
    // if it doesn't start with +, -, or a digit, return invalid date
    if (
      !value.startsWith('+') &&
      !value.startsWith('-') &&
      !/^\d/.test(value)
    ) {
      return new Date('Invalid Date');
    }
    // if it doesn't end with a unit identifier or a digit, return invalid date
    if (
      !['y', 'q', 'm', 'w', 'd', 'h', 'n', 's', 'l'].some((ending) =>
        value.endsWith(ending)
      ) &&
      !/\d$/.test(value)
    ) {
      return new Date('Invalid Date');
    }
    // Get the first character and the last character
    const avalue = [...value];
    const start = avalue.splice(0, 1)[0];
    const end = avalue.slice(-1)[0];
    let hasSign = true;
    let hasUnit = true;
    if (Number.isInteger(start)) {
      avalue.unshift(start);
      hasSign = false;
    }
    if (Number.isInteger(end)) {
      avalue.push(end);
      hasUnit = false;
    }

    if (!hasUnit) {
      return new Date('Invalid Date');
    }

    value = parseInt(avalue.join(''));
    if (hasSign && start === '-') {
      value = -value;
    }
    var getter = null;
    var setter = null;
    switch (end) {
      case 'y':
        getter = useUTC ? now.getUTCFullYear : now.getFullYear;
        setter = useUTC
          ? (old, value) => now.setUTCFullYear(old + value)
          : (old, value) => now.setFullYear(old + value);
        break;
      case 'q':
        getter = useUTC ? now.getUTCMonth : now.getMonth;
        setter = useUTC
          ? (old, value) => now.setUTCMonth(old + value * 3)
          : (old, value) => now.setMonth(old + value * 3);
        break;
      case 'm':
        getter = useUTC ? now.getUTCMonth : now.getMonth;
        setter = useUTC
          ? (old, value) => now.setUTCMonth(old + value)
          : (old, value) => now.setMonth(old + value);
        break;
      case 'w':
        getter = useUTC ? now.getUTCDate : now.getDate;
        setter = useUTC
          ? (old, value) => now.setUTCDate(old + value * 7)
          : (old, value) => now.setDate(old + value * 7);
        break;
      case 'h':
        getter = useUTC ? now.getUTCHours : now.getHours;
        setter = useUTC
          ? (old, value) => now.setUTCHours(old + value)
          : (old, value) => now.setHours(old + value);
        break;
      case 'n':
        getter = useUTC ? now.getUTCMinutes : now.getMinutes;
        setter = useUTC
          ? (old, value) => now.setUTCMinutes(old + value)
          : (old, value) => now.setMinutes(old + value);
        break;
      case 's':
        getter = useUTC ? now.getUTCSeconds : now.getSeconds;
        setter = useUTC
          ? (old, value) => now.setUTCSeconds(old + value)
          : (old, value) => now.setSeconds(old + value);
        break;
      case 'l':
        getter = useUTC ? now.getUTCMilliseconds : now.getMilliseconds;
        setter = useUTC
          ? (old, value) => now.setUTCMilliseconds(old + value)
          : (old, value) => now.setMilliseconds(old + value);
        break;
      case 'd':
      default:
        getter = useUTC ? now.getUTCDate : now.getDate;
        setter = useUTC
          ? (old, value) => now.setUTCDate(old + value)
          : (old, value) => now.setDate(old + value);
        break;
    }
    if (getter && setter) {
      const old = getter();
      setter(old, value);
    }
    return new Date(now.valueOf());
  }
}
