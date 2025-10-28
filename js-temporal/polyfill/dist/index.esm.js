function assert(condition, message) {
    if (!condition)
        throw new Error(`assertion failure: ${message}`);
}
function assertNotReached(message) {
    const reason = message ? ` because ${message}` : '';
    throw new Error(`assertion failure: code should not be reached${reason}`);
}

const ZERO = 0n;
const ONE = 1n;
const TWO = 2n;
const TEN = 10n;
const TWENTY_FOUR = 24n;
const SIXTY = 60n;
const THOUSAND = 1000n;
const MILLION = 1000000n;
const BILLION = 1000000000n;
const HOUR_SECONDS = 3600n;
const HOUR_NANOS = HOUR_SECONDS * BILLION;
const MINUTE_NANOS$1 = SIXTY * BILLION;
const DAY_NANOS$1 = HOUR_NANOS * TWENTY_FOUR;
function isEven(value) {
    return value % 2n === 0n;
}
function abs(x) {
    return x < 0n ? -x : x;
}
function compare(x, y) {
    return x < y ? -1 : x > y ? 1 : 0;
}
function divmod(x, y) {
    const quotient = x / y;
    const remainder = x % y;
    return { quotient, remainder };
}

var _a, _b;
// Instant
const EPOCHNANOSECONDS = 'slot-epochNanoSeconds';
// DateTime, Date, Time, YearMonth, MonthDay
const ISO_DATE = 'slot-iso-date';
const ISO_DATE_TIME = 'slot-iso-date-time';
const TIME = 'slot-time';
const CALENDAR = 'slot-calendar';
// Date, YearMonth, and MonthDay all have the same slots, disambiguation needed:
const DATE_BRAND = 'slot-date-brand';
const YEAR_MONTH_BRAND = 'slot-year-month-brand';
const MONTH_DAY_BRAND = 'slot-month-day-brand';
// ZonedDateTime
const TIME_ZONE = 'slot-time-zone';
// Duration
const YEARS = 'slot-years';
const MONTHS = 'slot-months';
const WEEKS = 'slot-weeks';
const DAYS = 'slot-days';
const HOURS = 'slot-hours';
const MINUTES = 'slot-minutes';
const SECONDS = 'slot-seconds';
const MILLISECONDS = 'slot-milliseconds';
const MICROSECONDS = 'slot-microseconds';
const NANOSECONDS = 'slot-nanoseconds';
// DateTimeFormatImpl
const DATE = 'date';
const YM = 'ym';
const MD = 'md';
const TIME_FMT = 'time';
const DATETIME = 'datetime';
const INST = 'instant';
const ORIGINAL = 'original';
const TZ_CANONICAL = 'timezone-canonical';
const TZ_ORIGINAL = 'timezone-original';
const CAL_ID = 'calendar-id';
const LOCALE = 'locale';
const OPTIONS = 'options';
const globalSlots = new WeakMap();
function _GetSlots(container) {
    return globalSlots.get(container);
}
const GetSlotsSymbol = Symbol.for('@@Temporal__GetSlots');
// expose GetSlots to avoid dual package hazards
(_a = globalThis)[GetSlotsSymbol] || (_a[GetSlotsSymbol] = _GetSlots);
const GetSlots = globalThis[GetSlotsSymbol];
function _CreateSlots(container) {
    globalSlots.set(container, Object.create(null));
}
const CreateSlotsSymbol = Symbol.for('@@Temporal__CreateSlots');
// expose CreateSlots to avoid dual package hazards
(_b = globalThis)[CreateSlotsSymbol] || (_b[CreateSlotsSymbol] = _CreateSlots);
const CreateSlots = globalThis[CreateSlotsSymbol];
function HasSlot(container, ...ids) {
    if (!container || 'object' !== typeof container)
        return false;
    const myslots = GetSlots(container);
    return !!myslots && ids.every((id) => id in myslots);
}
function GetSlot(container, id) {
    const value = GetSlots(container)?.[id];
    if (value === undefined)
        throw new TypeError(`Missing internal slot ${id}`);
    return value;
}
function SetSlot(container, id, value) {
    const slots = GetSlots(container);
    if (slots === undefined)
        throw new TypeError('Missing slots for the given container');
    const existingSlot = slots[id];
    if (existingSlot)
        throw new TypeError(`${id} already has set`);
    slots[id] = value;
}
function ResetSlot(container, id, value) {
    const slots = GetSlots(container);
    if (slots === undefined)
        throw new TypeError('Missing slots for the given container');
    const existingSlot = slots[id];
    if (existingSlot === undefined)
        throw new TypeError(`tried to reset ${id} which was not set`);
    slots[id] = value;
}

const INTRINSICS = {};
const customUtilInspectFormatters = {
    ['Intl.DateTimeFormat'](depth, options, inspect) {
        return inspect(GetSlot(this, ORIGINAL), { depth, ...options });
    },
    ['Temporal.Duration'](depth, options) {
        const descr = options.stylize(this._repr_, 'special');
        if (depth < 1)
            return descr;
        const entries = [];
        const props = [
            'years',
            'months',
            'weeks',
            'days',
            'hours',
            'minutes',
            'seconds',
            'milliseconds',
            'microseconds',
            'nanoseconds'
        ];
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            if (this[prop] !== 0) {
                entries.push(`  ${prop}: ${options.stylize(this[prop], 'number')}`);
            }
        }
        return descr + ' {\n' + entries.join(',\n') + '\n}';
    }
};
function defaultUtilInspectFormatter(depth, options) {
    return options.stylize(this._repr_, 'special');
}
function MakeIntrinsicClass(Class, name) {
    Object.defineProperty(Class.prototype, Symbol.toStringTag, {
        value: name,
        writable: false,
        enumerable: false,
        configurable: true
    });
    {
        Object.defineProperty(Class.prototype, Symbol.for('nodejs.util.inspect.custom'), {
            value: customUtilInspectFormatters[name] || defaultUtilInspectFormatter,
            writable: false,
            enumerable: false,
            configurable: true
        });
    }
    const staticNames = Object.getOwnPropertyNames(Class);
    for (let i = 0; i < staticNames.length; i++) {
        const prop = staticNames[i];
        // we know that `prop` is present, so the descriptor is never undefined
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const desc = Object.getOwnPropertyDescriptor(Class, prop);
        if (!desc.configurable || !desc.enumerable)
            continue;
        desc.enumerable = false;
        Object.defineProperty(Class, prop, desc);
    }
    const protoNames = Object.getOwnPropertyNames(Class.prototype);
    for (let i = 0; i < protoNames.length; i++) {
        const prop = protoNames[i];
        // we know that `prop` is present, so the descriptor is never undefined
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const desc = Object.getOwnPropertyDescriptor(Class.prototype, prop);
        if (!desc.configurable || !desc.enumerable)
            continue;
        desc.enumerable = false;
        Object.defineProperty(Class.prototype, prop, desc);
    }
    DefineIntrinsic(name, Class);
    DefineIntrinsic(`${name}.prototype`, Class.prototype);
}
function DefineIntrinsic(name, value) {
    const key = `%${name}%`;
    if (INTRINSICS[key] !== undefined)
        throw new Error(`intrinsic ${name} already exists`);
    INTRINSICS[key] = value;
}
function GetIntrinsic(intrinsic) {
    return INTRINSICS[intrinsic];
}

// Computes trunc(x / 10**p) and x % 10**p, returning { div, mod }, with
// precision loss only once in the quotient, by string manipulation. If the
// quotient and remainder are safe integers, then they are exact. x must be an
// integer. p must be a non-negative integer. Both div and mod have the sign of
// x.
function TruncatingDivModByPowerOf10(xParam, p) {
    let x = xParam;
    if (x === 0)
        return { div: x, mod: x }; // preserves signed zero
    const sign = Math.sign(x);
    x = Math.abs(x);
    const xDigits = Math.trunc(1 + Math.log10(x));
    if (p >= xDigits)
        return { div: sign * 0, mod: sign * x };
    if (p === 0)
        return { div: sign * x, mod: sign * 0 };
    // would perform nearest rounding if x was not an integer:
    const xStr = x.toPrecision(xDigits);
    const div = sign * Number.parseInt(xStr.slice(0, xDigits - p), 10);
    const mod = sign * Number.parseInt(xStr.slice(xDigits - p), 10);
    return { div, mod };
}
// Computes x * 10**p + z with precision loss only at the end, by string
// manipulation. If the result is a safe integer, then it is exact. x must be
// an integer. p must be a non-negative integer. z must have the same sign as
// x and be less than 10**p.
function FMAPowerOf10(xParam, p, zParam) {
    let x = xParam;
    let z = zParam;
    if (x === 0)
        return z;
    const sign = Math.sign(x) || Math.sign(z);
    x = Math.abs(x);
    z = Math.abs(z);
    const xStr = x.toPrecision(Math.trunc(1 + Math.log10(x)));
    if (z === 0)
        return sign * Number.parseInt(xStr + '0'.repeat(p), 10);
    const zStr = z.toPrecision(Math.trunc(1 + Math.log10(z)));
    const resStr = xStr + zStr.padStart(p, '0');
    return sign * Number.parseInt(resStr, 10);
}
function GetUnsignedRoundingMode(mode, sign) {
    const isNegative = sign === 'negative';
    switch (mode) {
        case 'ceil':
            return isNegative ? 'zero' : 'infinity';
        case 'floor':
            return isNegative ? 'infinity' : 'zero';
        case 'expand':
            return 'infinity';
        case 'trunc':
            return 'zero';
        case 'halfCeil':
            return isNegative ? 'half-zero' : 'half-infinity';
        case 'halfFloor':
            return isNegative ? 'half-infinity' : 'half-zero';
        case 'halfExpand':
            return 'half-infinity';
        case 'halfTrunc':
            return 'half-zero';
        case 'halfEven':
            return 'half-even';
    }
}
// Omits first step from spec algorithm so that it can be used both for
// RoundNumberToIncrement and RoundTimeDurationToIncrement
function ApplyUnsignedRoundingMode(r1, r2, cmp, evenCardinality, unsignedRoundingMode) {
    if (unsignedRoundingMode === 'zero')
        return r1;
    if (unsignedRoundingMode === 'infinity')
        return r2;
    if (cmp < 0)
        return r1;
    if (cmp > 0)
        return r2;
    if (unsignedRoundingMode === 'half-zero')
        return r1;
    if (unsignedRoundingMode === 'half-infinity')
        return r2;
    return evenCardinality ? r1 : r2;
}

class TimeDuration {
    constructor(totalNs) {
        const typeoftotalNs = typeof totalNs;
        assert(typeoftotalNs == "bigint", `big integer required; got '${typeoftotalNs}'`);
        this.totalNs = totalNs;
        assert(abs(this.totalNs) <= TimeDuration.MAX, 'integer too big');
        this.sec = Number(this.totalNs / BILLION);
        this.subsec = Number(this.totalNs % BILLION);
        assert(Number.isSafeInteger(this.sec), 'seconds too big');
        assert(Math.abs(this.subsec) <= 999999999, 'subseconds too big');
    }
    static validateNew(totalNs, operation) {
        if (abs(totalNs) > TimeDuration.MAX) {
            throw new RangeError(`${operation} of duration time units cannot exceed ${TimeDuration.MAX} s`);
        }
        return new TimeDuration(totalNs);
    }
    static fromEpochNsDiff(epochNs1, epochNs2) {
        const diff = epochNs1 - epochNs2;
        // No extra validate step. Should instead fail assertion if too big
        return new TimeDuration(diff);
    }
    static fromComponents(h, min, s, ms, µs, ns) {
        const totalNs = BigInt(ns) +
            BigInt(µs) * THOUSAND +
            BigInt(ms) * MILLION +
            BigInt(s) * BILLION +
            BigInt(min) * MINUTE_NANOS$1 +
            BigInt(h) * HOUR_NANOS;
        return TimeDuration.validateNew(totalNs, 'total');
    }
    abs() {
        return new TimeDuration(abs(this.totalNs));
    }
    add(other) {
        return TimeDuration.validateNew(this.totalNs + other.totalNs, 'sum');
    }
    add24HourDays(days) {
        assert(Number.isInteger(days), 'days must be an integer');
        return TimeDuration.validateNew(this.totalNs + BigInt(days) * DAY_NANOS$1, 'sum');
    }
    addToEpochNs(epochNs) {
        return epochNs + this.totalNs;
    }
    cmp(other) {
        return compare(this.totalNs, other.totalNs);
    }
    divmod(n) {
        assert(n !== 0, 'division by zero');
        const { quotient, remainder } = divmod(this.totalNs, BigInt(n));
        const q = quotient;
        const r = new TimeDuration(remainder);
        return { quotient: q, remainder: r };
    }
    fdiv(nParam) {
        const n = nParam;
        assert(n !== ZERO, 'division by zero');
        const nBigInt = BigInt(n);
        let { quotient, remainder } = divmod(this.totalNs, nBigInt);
        // Perform long division to calculate the fractional part of the quotient
        // remainder / n with more accuracy than 64-bit floating point division
        const precision = 50;
        const decimalDigits = [];
        let digit;
        const sign = (this.totalNs < 0n ? -1 : 1) * Math.sign(Number(n));
        while (remainder !== 0n && decimalDigits.length < precision) {
            remainder = remainder * TEN;
            ({ quotient: digit, remainder } = divmod(remainder, nBigInt));
            decimalDigits.push(Math.abs(Number(digit)));
        }
        return sign * Number(abs(quotient).toString() + '.' + decimalDigits.join(''));
    }
    isZero() {
        return this.totalNs === ZERO;
    }
    round(incrementParam, mode) {
        const increment = incrementParam;
        if (increment === ONE)
            return this;
        const { quotient, remainder } = divmod(this.totalNs, increment);
        const sign = this.totalNs < 0n ? 'negative' : 'positive';
        const r1 = abs(quotient) * increment;
        const r2 = r1 + increment;
        const cmp = compare(abs(remainder * TWO), increment);
        const unsignedRoundingMode = GetUnsignedRoundingMode(mode, sign);
        const rounded = remainder === 0n ? r1 : ApplyUnsignedRoundingMode(r1, r2, cmp, isEven(quotient), unsignedRoundingMode);
        const result = sign === 'positive' ? rounded : -rounded;
        return TimeDuration.validateNew(result, 'rounding');
    }
    sign() {
        return this.cmp(new TimeDuration(ZERO));
    }
    subtract(other) {
        return TimeDuration.validateNew(this.totalNs - other.totalNs, 'difference');
    }
}
TimeDuration.MAX = 9007199254740991999999999n;
TimeDuration.ZERO = new TimeDuration(ZERO);

const offsetIdentifierNoCapture = /(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/;
const tzComponent = /[A-Za-z._][A-Za-z._0-9+-]*/;
const timeZoneID = new RegExp(`(?:${offsetIdentifierNoCapture.source}|(?:${tzComponent.source})(?:\\/(?:${tzComponent.source}))*)`);
const yearpart = /(?:[+-]\d{6}|\d{4})/;
const monthpart = /(?:0[1-9]|1[0-2])/;
const daypart = /(?:0[1-9]|[12]\d|3[01])/;
const datesplit = new RegExp(`(${yearpart.source})(?:-(${monthpart.source})-(${daypart.source})|(${monthpart.source})(${daypart.source}))`);
const timesplit = /(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/;
const offsetWithParts = /([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/;
const offset = /((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/;
const offsetpart = new RegExp(`([zZ])|${offset.source}?`);
const offsetIdentifier = /([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/;
const annotation = /\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g;
const zoneddatetime = new RegExp([
    `^${datesplit.source}`,
    `(?:(?:[tT]|\\s+)${timesplit.source}(?:${offsetpart.source})?)?`,
    `(?:\\[!?(${timeZoneID.source})\\])?`,
    `((?:${annotation.source})*)$`
].join(''));
const time = new RegExp([
    `^[tT]?${timesplit.source}`,
    `(?:${offsetpart.source})?`,
    `(?:\\[!?${timeZoneID.source}\\])?`,
    `((?:${annotation.source})*)$`
].join(''));
// The short forms of YearMonth and MonthDay are only for the ISO calendar, but
// annotations are still allowed, and will throw if the calendar annotation is
// not ISO.
// Non-ISO calendar YearMonth and MonthDay have to parse as a Temporal.PlainDate,
// with the reference fields.
// YYYYMM forbidden by ISO 8601 because ambiguous with YYMMDD, but allowed by
// RFC 3339 and we don't allow 2-digit years, so we allow it.
// Not ambiguous with HHMMSS because that requires a 'T' prefix
// UTC offsets are not allowed, because they are not allowed with any date-only
// format; also, YYYY-MM-UU is ambiguous with YYYY-MM-DD
const yearmonth = new RegExp(`^(${yearpart.source})-?(${monthpart.source})(?:\\[!?${timeZoneID.source}\\])?((?:${annotation.source})*)$`);
const monthday = new RegExp(`^(?:--)?(${monthpart.source})-?(${daypart.source})(?:\\[!?${timeZoneID.source}\\])?((?:${annotation.source})*)$`);
const fraction = /(\d+)(?:[.,](\d{1,9}))?/;
const durationDate = /(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/;
const durationTime = new RegExp(`(?:${fraction.source}H)?(?:${fraction.source}M)?(?:${fraction.source}S)?`);
const duration = new RegExp(`^([+-])?P${durationDate.source}(?:T(?!$)${durationTime.source})?$`, 'i');

const DAY_MS = 86400000;
const DAY_NANOS = DAY_MS * 1e6;
const DAY_NANOS_BI = BigInt(DAY_NANOS);
const MINUTE_NANOS = 60e9;
// Instant range is 100 million days (inclusive) before or after epoch.
const MS_MAX = DAY_MS * 1e8;
const NS_MAX = epochMsToNs(MS_MAX);
const NS_MIN = -NS_MAX;
// PlainDateTime range is 24 hours wider (exclusive) than the Instant range on
// both ends, to allow for valid Instant=>PlainDateTime conversion for all
// built-in time zones (whose offsets must have a magnitude less than 24 hours).
const DATETIME_NS_MIN = DAY_NANOS_BI - NS_MIN + ONE;
const DATETIME_NS_MAX = DAY_NANOS_BI + NS_MAX - ONE;
// The pattern of leap years in the ISO 8601 calendar repeats every 400 years.
// The constant below is the number of nanoseconds in 400 years. It is used to
// avoid overflows when dealing with values at the edge legacy Date's range.
const MS_IN_400_YEAR_CYCLE = (400 * 365 + 97) * DAY_MS;
const YEAR_MIN = -271821;
const YEAR_MAX = 275760;
const BEFORE_FIRST_DST = Date.UTC(1847, 0, 1); // 1847-01-01T00:00:00Z
const BUILTIN_CALENDAR_IDS = [
    'iso8601',
    'hebrew',
    'islamic',
    'islamic-umalqura',
    'islamic-tbla',
    'islamic-civil',
    'islamic-rgsa',
    'islamicc',
    'persian',
    'ethiopic',
    'ethioaa',
    'ethiopic-amete-alem',
    'coptic',
    'chinese',
    'dangi',
    'roc',
    'indian',
    'buddhist',
    'japanese',
    'gregory'
];
const ICU_LEGACY_TIME_ZONE_IDS = new Set([
    'ACT',
    'AET',
    'AGT',
    'ART',
    'AST',
    'BET',
    'BST',
    'CAT',
    'CNT',
    'CST',
    'CTT',
    'EAT',
    'ECT',
    'IET',
    'IST',
    'JST',
    'MIT',
    'NET',
    'NST',
    'PLT',
    'PNT',
    'PRT',
    'PST',
    'SST',
    'VST'
]);
/* eslint-enable */
/**
 * In debug builds, this function verifies that the given argument "exists" (is not
 * null or undefined). This function becomes a no-op in the final bundles distributed via NPM.
 * @param arg
 */
function assertExists(arg) {
    {
        if (arg == null) {
            throw new Error('Expected arg to be set.');
        }
    }
}
/** Similar to assertExists, but returns the argument. */
function castExists(arg) {
    assertExists(arg);
    return arg;
}
function IsObject(value) {
    return (typeof value === 'object' && value !== null) || typeof value === 'function';
}
function ToNumber(value) {
    // ES 2022's es-abstract made minor changes to ToNumber, but polyfilling these
    // changes adds zero benefit to Temporal and brings in a lot of extra code. So
    // we'll leave ToNumber as-is.
    // See https://github.com/ljharb/es-abstract/blob/main/2022/ToNumber.js
    if (typeof value === 'bigint') {
        if (value > BigInt(Number.MAX_SAFE_INTEGER) || value < BigInt(Number.MIN_SAFE_INTEGER)) {
            throw new TypeError('Cannot convert BigInt to number');
        }
    }
    return Number(value);
}
function IsIntegralNumber(argument) {
    if (typeof argument !== 'number' || Number.isNaN(argument) || argument === Infinity || argument === -Infinity) {
        return false;
    }
    const absValue = Math.abs(argument);
    return Math.floor(absValue) === absValue;
}
function ToString(value) {
    if (typeof value === 'symbol') {
        throw new TypeError('Cannot convert a Symbol value to a String');
    }
    return String(value);
}
function ToIntegerWithTruncation(value) {
    const number = ToNumber(value);
    if (number === 0)
        return 0;
    if (Number.isNaN(number) || number === Infinity || number === -Infinity) {
        throw new RangeError('invalid number value');
    }
    const integer = Math.trunc(number);
    if (integer === 0)
        return 0; // ℝ(value) in spec text; converts -0 to 0
    return integer;
}
function ToPositiveIntegerWithTruncation(valueParam, property) {
    const integer = ToIntegerWithTruncation(valueParam);
    if (integer <= 0) {
        if (property !== undefined) {
            throw new RangeError(`property '${property}' cannot be a a number less than one`);
        }
        throw new RangeError('Cannot convert a number less than one to a positive integer');
    }
    return integer;
}
function ToIntegerIfIntegral(valueParam) {
    const number = ToNumber(valueParam);
    if (Number.isNaN(number))
        throw new RangeError('not a number');
    if (number === Infinity || number === -Infinity)
        throw new RangeError('infinity is out of range');
    if (!IsIntegralNumber(number))
        throw new RangeError(`unsupported fractional value ${valueParam}`);
    if (number === 0)
        return 0; // ℝ(value) in spec text; converts -0 to 0
    return number;
}
function ToZeroPaddedDecimalString(n, minLength) {
    {
        if (!IsIntegralNumber(n) || n < 0) {
            throw new RangeError('Assertion failed: `${n}` must be a non-negative integer');
        }
        if (!IsIntegralNumber(minLength) || minLength < 1) {
            throw new RangeError('Assertion failed: `${minLength}` must be a positive integer');
        }
    }
    const s = String(n);
    return s.padStart(minLength, '0');
}
// This convenience function isn't in the spec, but is useful in the polyfill
// for DRY and better error messages.
function RequireString(value) {
    if (typeof value !== 'string') {
        // Use String() to ensure that Symbols won't throw
        throw new TypeError(`expected a string, not ${String(value)}`);
    }
    return value;
}
function ToSyntacticallyValidMonthCode(valueParam) {
    const value = RequireString(ToPrimitive(valueParam, String));
    if (value.length < 3 ||
        value.length > 4 ||
        value[0] !== 'M' ||
        '0123456789'.indexOf(value[1]) === -1 ||
        '0123456789'.indexOf(value[2]) === -1 ||
        (value[1] + value[2] === '00' && value[3] !== 'L') ||
        (value[3] !== 'L' && value[3] !== undefined)) {
        throw new RangeError(`bad month code ${value}; must match M01-M99 or M00L-M99L`);
    }
    return value;
}
function ToOffsetString(valueParam) {
    const value = RequireString(ToPrimitive(valueParam, String));
    ParseDateTimeUTCOffset(value);
    return value;
}
// Limited implementation of ToPrimitive that only handles the string case,
// because that's all that's used in this polyfill.
function ToPrimitive(value, preferredType) {
    assertExists(preferredType === String);
    if (IsObject(value)) {
        const result = value?.toString();
        if (typeof result === 'string' || typeof result === 'number')
            return result;
        throw new TypeError('Cannot convert object to primitive value');
    }
    return value;
}
const CALENDAR_FIELD_KEYS = [
    'era',
    'eraYear',
    'year',
    'month',
    'monthCode',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond',
    'microsecond',
    'nanosecond',
    'offset',
    'timeZone'
];
const BUILTIN_CASTS = {
    era: ToString,
    eraYear: ToIntegerWithTruncation,
    year: ToIntegerWithTruncation,
    month: ToPositiveIntegerWithTruncation,
    monthCode: ToSyntacticallyValidMonthCode,
    day: ToPositiveIntegerWithTruncation,
    hour: ToIntegerWithTruncation,
    minute: ToIntegerWithTruncation,
    second: ToIntegerWithTruncation,
    millisecond: ToIntegerWithTruncation,
    microsecond: ToIntegerWithTruncation,
    nanosecond: ToIntegerWithTruncation,
    offset: ToOffsetString,
    timeZone: ToTemporalTimeZoneIdentifier
};
const BUILTIN_DEFAULTS = {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0
};
// each item is [plural, singular, category, (length in ns)]
const TEMPORAL_UNITS = [
    ['years', 'year', 'date'],
    ['months', 'month', 'date'],
    ['weeks', 'week', 'date'],
    ['days', 'day', 'date'],
    ['hours', 'hour', 'time'],
    ['minutes', 'minute', 'time'],
    ['seconds', 'second', 'time'],
    ['milliseconds', 'millisecond', 'time'],
    ['microseconds', 'microsecond', 'time'],
    ['nanoseconds', 'nanosecond', 'time']
];
const SINGULAR_FOR = Object.fromEntries(TEMPORAL_UNITS.map((e) => [e[0], e[1]]));
const PLURAL_FOR = Object.fromEntries(TEMPORAL_UNITS.map(([p, s]) => [s, p]));
const UNITS_DESCENDING = TEMPORAL_UNITS.map(([, s]) => s);
const NS_PER_TIME_UNIT = {
    day: DAY_NANOS,
    hour: 3600e9,
    minute: 60e9,
    second: 1e9,
    millisecond: 1e6,
    microsecond: 1e3,
    nanosecond: 1
};
const DURATION_FIELDS = [
    'days',
    'hours',
    'microseconds',
    'milliseconds',
    'minutes',
    'months',
    'nanoseconds',
    'seconds',
    'weeks',
    'years'
];
// Save the original Intl.DateTimeFormat, it will likely be overwritten with the
// one from this polyfill. Caching the formatter below may be reentrant, so we
// need to use the original one
const OriginalIntlDateTimeFormat$1 = Intl.DateTimeFormat;
const IntlDateTimeFormatEnUsCache = new Map();
function getIntlDateTimeFormatEnUsForTimeZone(timeZoneIdentifier) {
    const lowercaseIdentifier = ASCIILowercase(timeZoneIdentifier);
    let instance = IntlDateTimeFormatEnUsCache.get(lowercaseIdentifier);
    if (instance === undefined) {
        instance = new OriginalIntlDateTimeFormat$1('en-us', {
            timeZone: lowercaseIdentifier,
            hour12: false,
            era: 'short',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        IntlDateTimeFormatEnUsCache.set(lowercaseIdentifier, instance);
    }
    return instance;
}
function ToObject(value) {
    if (typeof value === 'undefined' || value === null) {
        throw new TypeError(`Expected object not ${value}`);
    }
    return Object(value);
}
// Adapted from https://github.com/ljharb/es-abstract/blob/main/2022/CopyDataProperties.js
// but simplified (e.g. removed assertions) for this polyfill to reduce bundle size.
function CopyDataProperties(target, source, excludedKeys, excludedValues) {
    if (typeof source === 'undefined' || source === null)
        return;
    const keys = Reflect.ownKeys(source);
    for (let index = 0; index < keys.length; index++) {
        const nextKey = keys[index];
        if (excludedKeys.some((e) => Object.is(e, nextKey)))
            continue;
        if (Object.prototype.propertyIsEnumerable.call(source, nextKey)) {
            const propValue = source[nextKey];
            if (excludedValues && excludedValues.some((e) => Object.is(e, propValue)))
                continue;
            target[nextKey] = propValue;
        }
    }
}
function IsTemporalInstant(item) {
    return HasSlot(item, EPOCHNANOSECONDS) && !HasSlot(item, TIME_ZONE, CALENDAR);
}
function IsTemporalDuration(item) {
    return HasSlot(item, YEARS, MONTHS, DAYS, HOURS, MINUTES, SECONDS, MILLISECONDS, MICROSECONDS, NANOSECONDS);
}
function IsTemporalDate(item) {
    return HasSlot(item, DATE_BRAND);
}
function IsTemporalTime(item) {
    return HasSlot(item, TIME);
}
function IsTemporalDateTime(item) {
    return HasSlot(item, ISO_DATE_TIME);
}
function IsTemporalYearMonth(item) {
    return HasSlot(item, YEAR_MONTH_BRAND);
}
function IsTemporalMonthDay(item) {
    return HasSlot(item, MONTH_DAY_BRAND);
}
function IsTemporalZonedDateTime(item) {
    return HasSlot(item, EPOCHNANOSECONDS, TIME_ZONE, CALENDAR);
}
function CheckReceiver(item, test) {
    if (!test(item))
        throw new TypeError('invalid receiver: method called with the wrong type of this-object');
}
function RejectTemporalLikeObject(item) {
    if (HasSlot(item, CALENDAR) || HasSlot(item, TIME_ZONE)) {
        throw new TypeError('with() does not support a calendar or timeZone property');
    }
    if (IsTemporalTime(item)) {
        throw new TypeError('with() does not accept Temporal.PlainTime, use withPlainTime() instead');
    }
    if (item.calendar !== undefined) {
        throw new TypeError('with() does not support a calendar property');
    }
    if (item.timeZone !== undefined) {
        throw new TypeError('with() does not support a timeZone property');
    }
}
function FormatCalendarAnnotation(id, showCalendar) {
    if (showCalendar === 'never')
        return '';
    if (showCalendar === 'auto' && id === 'iso8601')
        return '';
    const flag = showCalendar === 'critical' ? '!' : '';
    return `[${flag}u-ca=${id}]`;
}
// Not a separate abstract operation in the spec, because it only occurs in one
// place: ParseISODateTime. In the code it's more convenient to split up
// ParseISODateTime for the YYYY-MM, MM-DD, and THH:MM:SS parse goals, so it's
// repeated four times.
function processAnnotations(annotations) {
    let calendar;
    let calendarWasCritical = false;
    // Avoid the user code minefield of matchAll.
    let match;
    annotation.lastIndex = 0;
    while ((match = annotation.exec(annotations))) {
        const { 1: critical, 2: key, 3: value } = match;
        if (key === 'u-ca') {
            if (calendar === undefined) {
                calendar = value;
                calendarWasCritical = critical === '!';
            }
            else if (critical === '!' || calendarWasCritical) {
                throw new RangeError(`Invalid annotations in ${annotations}: more than one u-ca present with critical flag`);
            }
        }
        else if (critical === '!') {
            throw new RangeError(`Unrecognized annotation: !${key}=${value}`);
        }
    }
    return calendar;
}
function ParseISODateTime(isoString) {
    // ZDT is the superset of fields for every other Temporal type
    const match = zoneddatetime.exec(isoString);
    if (!match)
        throw new RangeError(`invalid RFC 9557 string: ${isoString}`);
    const calendar = processAnnotations(match[16]);
    let yearString = match[1];
    if (yearString === '-000000')
        throw new RangeError(`invalid RFC 9557 string: ${isoString}`);
    const year = +yearString;
    const month = +(match[2] ?? match[4] ?? 1);
    const day = +(match[3] ?? match[5] ?? 1);
    const hasTime = match[6] !== undefined;
    const hour = +(match[6] ?? 0);
    const minute = +(match[7] ?? match[10] ?? 0);
    let second = +(match[8] ?? match[11] ?? 0);
    if (second === 60)
        second = 59;
    const fraction = (match[9] ?? match[12] ?? '') + '000000000';
    const millisecond = +fraction.slice(0, 3);
    const microsecond = +fraction.slice(3, 6);
    const nanosecond = +fraction.slice(6, 9);
    let offset;
    let z = false;
    if (match[13]) {
        offset = undefined;
        z = true;
    }
    else if (match[14]) {
        offset = match[14];
    }
    const tzAnnotation = match[15];
    RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    return {
        year,
        month,
        day,
        time: hasTime ? { hour, minute, second, millisecond, microsecond, nanosecond } : 'start-of-day',
        tzAnnotation,
        offset,
        z,
        calendar
    };
}
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalInstantString(isoString) {
    const result = ParseISODateTime(isoString);
    if (!result.z && !result.offset)
        throw new RangeError('Temporal.Instant requires a time zone offset');
    return result;
}
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalZonedDateTimeString(isoString) {
    const result = ParseISODateTime(isoString);
    if (!result.tzAnnotation)
        throw new RangeError('Temporal.ZonedDateTime requires a time zone ID in brackets');
    return result;
}
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalDateTimeString(isoString) {
    return ParseISODateTime(isoString);
}
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalDateString(isoString) {
    return ParseISODateTime(isoString);
}
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalTimeString(isoString) {
    const match = time.exec(isoString);
    let hour, minute, second, millisecond, microsecond, nanosecond, calendar;
    if (match) {
        calendar = processAnnotations(match[10]);
        hour = +(match[1] ?? 0);
        minute = +(match[2] ?? match[5] ?? 0);
        second = +(match[3] ?? match[6] ?? 0);
        if (second === 60)
            second = 59;
        const fraction = (match[4] ?? match[7] ?? '') + '000000000';
        millisecond = +fraction.slice(0, 3);
        microsecond = +fraction.slice(3, 6);
        nanosecond = +fraction.slice(6, 9);
        if (match[8])
            throw new RangeError('Z designator not supported for PlainTime');
    }
    else {
        let time, z;
        ({ time, z, calendar } = ParseISODateTime(isoString));
        if (time === 'start-of-day')
            throw new RangeError(`time is missing in string: ${isoString}`);
        if (z)
            throw new RangeError('Z designator not supported for PlainTime');
        ({ hour, minute, second, millisecond, microsecond, nanosecond } = time);
    }
    RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
    // if it's a date-time string, OK
    if (/[tT ][0-9][0-9]/.test(isoString)) {
        return { hour, minute, second, millisecond, microsecond, nanosecond, calendar };
    }
    try {
        const { month, day } = ParseTemporalMonthDayString(isoString);
        RejectISODate(1972, month, day);
    }
    catch {
        try {
            const { year, month } = ParseTemporalYearMonthString(isoString);
            RejectISODate(year, month, 1);
        }
        catch {
            return { hour, minute, second, millisecond, microsecond, nanosecond, calendar };
        }
    }
    throw new RangeError(`invalid RFC 9557 time-only string ${isoString}; may need a T prefix`);
}
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalYearMonthString(isoString) {
    const match = yearmonth.exec(isoString);
    let year, month, calendar, referenceISODay;
    if (match) {
        calendar = processAnnotations(match[3]);
        let yearString = match[1];
        if (yearString === '-000000')
            throw new RangeError(`invalid RFC 9557 string: ${isoString}`);
        year = +yearString;
        month = +match[2];
        referenceISODay = 1;
        if (calendar !== undefined && calendar !== 'iso8601') {
            throw new RangeError('YYYY-MM format is only valid with iso8601 calendar');
        }
    }
    else {
        let z;
        ({ year, month, calendar, day: referenceISODay, z } = ParseISODateTime(isoString));
        if (z)
            throw new RangeError('Z designator not supported for PlainYearMonth');
    }
    return { year, month, calendar, referenceISODay };
}
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalMonthDayString(isoString) {
    const match = monthday.exec(isoString);
    let month, day, calendar, referenceISOYear;
    if (match) {
        calendar = processAnnotations(match[3]);
        month = +match[1];
        day = +match[2];
        if (calendar !== undefined && calendar !== 'iso8601') {
            throw new RangeError('MM-DD format is only valid with iso8601 calendar');
        }
    }
    else {
        let z;
        ({ month, day, calendar, year: referenceISOYear, z } = ParseISODateTime(isoString));
        if (z)
            throw new RangeError('Z designator not supported for PlainMonthDay');
    }
    return { month, day, calendar, referenceISOYear };
}
const TIMEZONE_IDENTIFIER = new RegExp(`^${timeZoneID.source}$`, 'i');
const OFFSET_IDENTIFIER = new RegExp(`^${offsetIdentifier.source}$`);
function throwBadTimeZoneStringError(timeZoneString) {
    // Offset identifiers only support minute precision, but offsets in ISO
    // strings support nanosecond precision. If the identifier is invalid but
    // it's a valid ISO offset, then it has sub-minute precision. Show a clearer
    // error message in that case.
    const msg = OFFSET.test(timeZoneString) ? 'Seconds not allowed in offset time zone' : 'Invalid time zone';
    throw new RangeError(`${msg}: ${timeZoneString}`);
}
function ParseTimeZoneIdentifier(identifier) {
    if (!TIMEZONE_IDENTIFIER.test(identifier)) {
        throwBadTimeZoneStringError(identifier);
    }
    if (OFFSET_IDENTIFIER.test(identifier)) {
        const offsetNanoseconds = ParseDateTimeUTCOffset(identifier);
        // The regex limits the input to minutes precision, so we know that the
        // division below will result in an integer.
        return { offsetMinutes: offsetNanoseconds / 60e9 };
    }
    return { tzName: identifier };
}
// This operation doesn't exist in the spec, but in the polyfill it's split from
// ParseTemporalTimeZoneString so that parsing can be tested separately from the
// logic of converting parsed values into a named or offset identifier.
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalTimeZoneStringRaw(timeZoneString) {
    if (TIMEZONE_IDENTIFIER.test(timeZoneString)) {
        return { tzAnnotation: timeZoneString, offset: undefined, z: false };
    }
    try {
        // Try parsing ISO string instead
        const { tzAnnotation, offset, z } = ParseISODateTime(timeZoneString);
        if (z || tzAnnotation || offset) {
            return { tzAnnotation, offset, z };
        }
    }
    catch {
        // fall through
    }
    throwBadTimeZoneStringError(timeZoneString);
}
function ParseTemporalTimeZoneString(stringIdent) {
    const { tzAnnotation, offset, z } = ParseTemporalTimeZoneStringRaw(stringIdent);
    if (tzAnnotation)
        return ParseTimeZoneIdentifier(tzAnnotation);
    if (z)
        return ParseTimeZoneIdentifier('UTC');
    if (offset)
        return ParseTimeZoneIdentifier(offset);
    /* c8 ignore next */ assertNotReached();
}
// ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
function ParseTemporalDurationStringRaw(isoString) {
    const match = duration.exec(isoString);
    if (!match)
        throw new RangeError(`invalid duration: ${isoString}`);
    if (match.every((part, i) => i < 2 || part === undefined)) {
        throw new RangeError(`invalid duration: ${isoString}`);
    }
    const sign = match[1] === '-' ? -1 : 1;
    const years = match[2] === undefined ? 0 : ToIntegerWithTruncation(match[2]) * sign;
    const months = match[3] === undefined ? 0 : ToIntegerWithTruncation(match[3]) * sign;
    const weeks = match[4] === undefined ? 0 : ToIntegerWithTruncation(match[4]) * sign;
    const days = match[5] === undefined ? 0 : ToIntegerWithTruncation(match[5]) * sign;
    const hours = match[6] === undefined ? 0 : ToIntegerWithTruncation(match[6]) * sign;
    const fHours = match[7];
    const minutesStr = match[8];
    const fMinutes = match[9];
    const secondsStr = match[10];
    const fSeconds = match[11];
    let minutes = 0;
    let seconds = 0;
    // fractional hours, minutes, or seconds, expressed in whole nanoseconds:
    let excessNanoseconds = 0;
    if (fHours !== undefined) {
        if (minutesStr ?? fMinutes ?? secondsStr ?? fSeconds ?? false) {
            throw new RangeError('only the smallest unit can be fractional');
        }
        excessNanoseconds = ToIntegerWithTruncation((fHours + '000000000').slice(0, 9)) * 3600 * sign;
    }
    else {
        minutes = minutesStr === undefined ? 0 : ToIntegerWithTruncation(minutesStr) * sign;
        if (fMinutes !== undefined) {
            if (secondsStr ?? fSeconds ?? false) {
                throw new RangeError('only the smallest unit can be fractional');
            }
            excessNanoseconds = ToIntegerWithTruncation((fMinutes + '000000000').slice(0, 9)) * 60 * sign;
        }
        else {
            seconds = secondsStr === undefined ? 0 : ToIntegerWithTruncation(secondsStr) * sign;
            if (fSeconds !== undefined) {
                excessNanoseconds = ToIntegerWithTruncation((fSeconds + '000000000').slice(0, 9)) * sign;
            }
        }
    }
    const nanoseconds = excessNanoseconds % 1000;
    const microseconds = Math.trunc(excessNanoseconds / 1000) % 1000;
    const milliseconds = Math.trunc(excessNanoseconds / 1e6) % 1000;
    seconds += Math.trunc(excessNanoseconds / 1e9) % 60;
    minutes += Math.trunc(excessNanoseconds / 60e9);
    RejectDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    return { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds };
}
function ParseTemporalDurationString(isoString) {
    const { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = ParseTemporalDurationStringRaw(isoString);
    const TemporalDuration = GetIntrinsic('%Temporal.Duration%');
    return new TemporalDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
}
function RegulateISODate(yearParam, monthParam, dayParam, overflow) {
    let year = yearParam;
    let month = monthParam;
    let day = dayParam;
    switch (overflow) {
        case 'reject':
            RejectISODate(year, month, day);
            break;
        case 'constrain':
            ({ year, month, day } = ConstrainISODate(year, month, day));
            break;
    }
    return { year, month, day };
}
function RegulateTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam, overflow) {
    let hour = hourParam;
    let minute = minuteParam;
    let second = secondParam;
    let millisecond = millisecondParam;
    let microsecond = microsecondParam;
    let nanosecond = nanosecondParam;
    switch (overflow) {
        case 'reject':
            RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
            break;
        case 'constrain':
            hour = ConstrainToRange(hour, 0, 23);
            minute = ConstrainToRange(minute, 0, 59);
            second = ConstrainToRange(second, 0, 59);
            millisecond = ConstrainToRange(millisecond, 0, 999);
            microsecond = ConstrainToRange(microsecond, 0, 999);
            nanosecond = ConstrainToRange(nanosecond, 0, 999);
            break;
    }
    return { hour, minute, second, millisecond, microsecond, nanosecond };
}
function ToTemporalPartialDurationRecord(temporalDurationLike) {
    if (!IsObject(temporalDurationLike)) {
        throw new TypeError('invalid duration-like');
    }
    const result = {
        years: undefined,
        months: undefined,
        weeks: undefined,
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
        milliseconds: undefined,
        microseconds: undefined,
        nanoseconds: undefined
    };
    let any = false;
    for (let index = 0; index < DURATION_FIELDS.length; index++) {
        const property = DURATION_FIELDS[index];
        const value = temporalDurationLike[property];
        if (value !== undefined) {
            any = true;
            result[property] = ToIntegerIfIntegral(value);
        }
    }
    if (!any) {
        throw new TypeError('invalid duration-like');
    }
    return result;
}
function AdjustDateDurationRecord({ years, months, weeks, days }, newDays, newWeeks, newMonths) {
    return {
        years,
        months: newMonths ?? months,
        weeks: newWeeks ?? weeks,
        days: newDays ?? days
    };
}
function ZeroDateDuration() {
    return { years: 0, months: 0, weeks: 0, days: 0 };
}
function CombineISODateAndTimeRecord(isoDate, time) {
    return { isoDate, time };
}
function MidnightTimeRecord() {
    return { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
}
function NoonTimeRecord() {
    return { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
}
function GetTemporalOverflowOption(options) {
    return GetOption(options, 'overflow', ['constrain', 'reject'], 'constrain');
}
function GetTemporalDisambiguationOption(options) {
    return GetOption(options, 'disambiguation', ['compatible', 'earlier', 'later', 'reject'], 'compatible');
}
function GetRoundingModeOption(options, fallback) {
    return GetOption(options, 'roundingMode', ['ceil', 'floor', 'expand', 'trunc', 'halfCeil', 'halfFloor', 'halfExpand', 'halfTrunc', 'halfEven'], fallback);
}
function NegateRoundingMode(roundingMode) {
    switch (roundingMode) {
        case 'ceil':
            return 'floor';
        case 'floor':
            return 'ceil';
        case 'halfCeil':
            return 'halfFloor';
        case 'halfFloor':
            return 'halfCeil';
        default:
            return roundingMode;
    }
}
function GetTemporalOffsetOption(options, fallback) {
    return GetOption(options, 'offset', ['prefer', 'use', 'ignore', 'reject'], fallback);
}
function GetTemporalShowCalendarNameOption(options) {
    return GetOption(options, 'calendarName', ['auto', 'always', 'never', 'critical'], 'auto');
}
function GetTemporalShowTimeZoneNameOption(options) {
    return GetOption(options, 'timeZoneName', ['auto', 'never', 'critical'], 'auto');
}
function GetTemporalShowOffsetOption(options) {
    return GetOption(options, 'offset', ['auto', 'never'], 'auto');
}
function GetDirectionOption(options) {
    return GetOption(options, 'direction', ['next', 'previous'], REQUIRED);
}
function GetTemporalRoundingIncrementOption(options) {
    let increment = options.roundingIncrement;
    if (increment === undefined)
        return 1;
    const integerIncrement = ToIntegerWithTruncation(increment);
    if (integerIncrement < 1 || integerIncrement > 1e9) {
        throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${increment}`);
    }
    return integerIncrement;
}
function ValidateTemporalRoundingIncrement(increment, dividend, inclusive) {
    const maximum = inclusive ? dividend : dividend - 1;
    if (increment > maximum) {
        throw new RangeError(`roundingIncrement must be at least 1 and less than ${maximum}, not ${increment}`);
    }
    if (dividend % increment !== 0) {
        throw new RangeError(`Rounding increment must divide evenly into ${dividend}`);
    }
}
function GetTemporalFractionalSecondDigitsOption(normalizedOptions) {
    const digitsValue = normalizedOptions.fractionalSecondDigits;
    if (digitsValue === undefined)
        return 'auto';
    if (typeof digitsValue !== 'number') {
        if (ToString(digitsValue) !== 'auto') {
            throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${digitsValue}`);
        }
        return 'auto';
    }
    const digitCount = Math.floor(digitsValue);
    if (!Number.isFinite(digitCount) || digitCount < 0 || digitCount > 9) {
        throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${digitsValue}`);
    }
    return digitCount;
}
function ToSecondsStringPrecisionRecord(smallestUnit, precision) {
    switch (smallestUnit) {
        case 'minute':
            return { precision: 'minute', unit: 'minute', increment: 1 };
        case 'second':
            return { precision: 0, unit: 'second', increment: 1 };
        case 'millisecond':
            return { precision: 3, unit: 'millisecond', increment: 1 };
        case 'microsecond':
            return { precision: 6, unit: 'microsecond', increment: 1 };
        case 'nanosecond':
            return { precision: 9, unit: 'nanosecond', increment: 1 };
    }
    switch (precision) {
        case 'auto':
            return { precision, unit: 'nanosecond', increment: 1 };
        case 0:
            return { precision, unit: 'second', increment: 1 };
        case 1:
        case 2:
        case 3:
            return { precision, unit: 'millisecond', increment: 10 ** (3 - precision) };
        case 4:
        case 5:
        case 6:
            return { precision, unit: 'microsecond', increment: 10 ** (6 - precision) };
        case 7:
        case 8:
        case 9:
            return { precision, unit: 'nanosecond', increment: 10 ** (9 - precision) };
        default:
            throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${precision}`);
    }
}
const REQUIRED = Symbol('~required~');
// This signature of the function is NOT used in type-checking, so restricting
// the default value via generic binding like the other overloads isn't
// necessary.
function GetTemporalUnitValuedOption(options, key, unitGroup, requiredOrDefault, extraValues = []) {
    let allowedSingular = [];
    for (let index = 0; index < TEMPORAL_UNITS.length; index++) {
        const unitInfo = TEMPORAL_UNITS[index];
        const singular = unitInfo[1];
        const category = unitInfo[2];
        if (unitGroup === 'datetime' || unitGroup === category) {
            allowedSingular.push(singular);
        }
    }
    allowedSingular = allowedSingular.concat(extraValues);
    let defaultVal = requiredOrDefault;
    if (defaultVal === REQUIRED) {
        defaultVal = undefined;
    }
    else if (defaultVal !== undefined) {
        allowedSingular.push(defaultVal);
    }
    let allowedValues = [];
    allowedValues = allowedValues.concat(allowedSingular);
    for (let index = 0; index < allowedSingular.length; index++) {
        const singular = allowedSingular[index];
        const plural = PLURAL_FOR[singular];
        if (plural !== undefined)
            allowedValues.push(plural);
    }
    let retval = GetOption(options, key, allowedValues, defaultVal);
    if (retval === undefined && requiredOrDefault === REQUIRED) {
        throw new RangeError(`${key} is required`);
    }
    // Coerce any plural units into their singular form
    return (retval && retval in SINGULAR_FOR ? SINGULAR_FOR[retval] : retval);
}
function GetTemporalRelativeToOption(options) {
    const relativeTo = options.relativeTo;
    if (relativeTo === undefined)
        return {};
    let offsetBehaviour = 'option';
    let matchMinutes = false;
    let isoDate, time, calendar, timeZone, offset;
    if (IsObject(relativeTo)) {
        if (IsTemporalZonedDateTime(relativeTo)) {
            return { zonedRelativeTo: relativeTo };
        }
        if (IsTemporalDate(relativeTo))
            return { plainRelativeTo: relativeTo };
        if (IsTemporalDateTime(relativeTo)) {
            return {
                plainRelativeTo: CreateTemporalDate(GetSlot(relativeTo, ISO_DATE_TIME).isoDate, GetSlot(relativeTo, CALENDAR))
            };
        }
        calendar = GetTemporalCalendarIdentifierWithISODefault(relativeTo);
        const fields = PrepareCalendarFields(calendar, relativeTo, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'offset', 'timeZone'], []);
        ({ isoDate, time } = InterpretTemporalDateTimeFields(calendar, fields, 'constrain'));
        ({ offset, timeZone } = fields);
        if (offset === undefined)
            offsetBehaviour = 'wall';
    }
    else {
        let tzAnnotation, z, year, month, day;
        ({ year, month, day, time, calendar, tzAnnotation, offset, z } = ParseISODateTime(RequireString(relativeTo)));
        if (tzAnnotation) {
            timeZone = ToTemporalTimeZoneIdentifier(tzAnnotation);
            if (z) {
                offsetBehaviour = 'exact';
            }
            else if (!offset) {
                offsetBehaviour = 'wall';
            }
            matchMinutes = true;
        }
        else if (z) {
            throw new RangeError('Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone');
        }
        if (!calendar)
            calendar = 'iso8601';
        calendar = CanonicalizeCalendar(calendar);
        isoDate = { year, month, day };
    }
    if (timeZone === undefined) {
        return { plainRelativeTo: CreateTemporalDate(isoDate, calendar) };
    }
    const offsetNs = offsetBehaviour === 'option' ? ParseDateTimeUTCOffset(castExists(offset)) : 0;
    const epochNanoseconds = InterpretISODateTimeOffset(isoDate, time, offsetBehaviour, offsetNs, timeZone, 'compatible', 'reject', matchMinutes);
    return { zonedRelativeTo: CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar) };
}
function DefaultTemporalLargestUnit(duration) {
    if (GetSlot(duration, YEARS) !== 0)
        return 'year';
    if (GetSlot(duration, MONTHS) !== 0)
        return 'month';
    if (GetSlot(duration, WEEKS) !== 0)
        return 'week';
    if (GetSlot(duration, DAYS) !== 0)
        return 'day';
    if (GetSlot(duration, HOURS) !== 0)
        return 'hour';
    if (GetSlot(duration, MINUTES) !== 0)
        return 'minute';
    if (GetSlot(duration, SECONDS) !== 0)
        return 'second';
    if (GetSlot(duration, MILLISECONDS) !== 0)
        return 'millisecond';
    if (GetSlot(duration, MICROSECONDS) !== 0)
        return 'microsecond';
    return 'nanosecond';
}
function LargerOfTwoTemporalUnits(unit1, unit2) {
    const i1 = UNITS_DESCENDING.indexOf(unit1);
    const i2 = UNITS_DESCENDING.indexOf(unit2);
    if (i1 > i2) {
        return unit2;
    }
    return unit1;
}
function IsCalendarUnit(unit) {
    return unit === 'year' || unit === 'month' || unit === 'week';
}
function TemporalUnitCategory(unit) {
    if (IsCalendarUnit(unit) || unit === 'day')
        return 'date';
    return 'time';
}
function calendarImplForID(calendar) {
    return GetIntrinsic('%calendarImpl%')(calendar);
}
function calendarImplForObj(temporalObj) {
    return GetIntrinsic('%calendarImpl%')(GetSlot(temporalObj, CALENDAR));
}
function ISODateToFields(calendar, isoDate, type = 'date') {
    const fields = Object.create(null);
    const calendarImpl = calendarImplForID(calendar);
    const calendarDate = calendarImpl.isoToDate(isoDate, { year: true, monthCode: true, day: true });
    fields.monthCode = calendarDate.monthCode;
    if (type === 'month-day' || type === 'date') {
        fields.day = calendarDate.day;
    }
    if (type === 'year-month' || type === 'date') {
        fields.year = calendarDate.year;
    }
    return fields;
}
function PrepareCalendarFields(calendar, bag, calendarFieldNames, nonCalendarFieldNames, requiredFields) {
    const extraFieldNames = calendarImplForID(calendar).extraFields(calendarFieldNames);
    const fields = calendarFieldNames.concat(nonCalendarFieldNames, extraFieldNames);
    const result = Object.create(null);
    let any = false;
    fields.sort();
    for (let index = 0; index < fields.length; index++) {
        const property = fields[index];
        const value = bag[property];
        if (value !== undefined) {
            any = true;
            result[property] = castExists(BUILTIN_CASTS[property])(value);
        }
        else if (requiredFields !== 'partial') {
            if (requiredFields.includes(property)) {
                throw new TypeError(`required property '${property}' missing or undefined`);
            }
            result[property] = BUILTIN_DEFAULTS[property];
        }
    }
    if (requiredFields === 'partial' && !any) {
        throw new TypeError('no supported properties found');
    }
    return result;
}
function ToTemporalTimeRecord(bag, completeness = 'complete') {
    // NOTE: Field order is sorted to make the sort in PrepareTemporalFields more efficient.
    const fields = ['hour', 'microsecond', 'millisecond', 'minute', 'nanosecond', 'second'];
    let any = false;
    const result = Object.create(null);
    for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        const value = bag[field];
        if (value !== undefined) {
            result[field] = ToIntegerWithTruncation(value);
            any = true;
        }
        else if (completeness === 'complete') {
            result[field] = 0;
        }
    }
    if (!any)
        throw new TypeError('invalid time-like');
    return result;
}
function ToTemporalDate(item, options) {
    if (IsObject(item)) {
        if (IsTemporalDate(item)) {
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalDate(GetSlot(item, ISO_DATE), GetSlot(item, CALENDAR));
        }
        if (IsTemporalZonedDateTime(item)) {
            const isoDateTime = GetISODateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, EPOCHNANOSECONDS));
            GetTemporalOverflowOption(GetOptionsObject(options)); // validate and ignore
            const isoDate = isoDateTime.isoDate;
            return CreateTemporalDate(isoDate, GetSlot(item, CALENDAR));
        }
        if (IsTemporalDateTime(item)) {
            GetTemporalOverflowOption(GetOptionsObject(options)); // validate and ignore
            return CreateTemporalDate(GetSlot(item, ISO_DATE_TIME).isoDate, GetSlot(item, CALENDAR));
        }
        const calendar = GetTemporalCalendarIdentifierWithISODefault(item);
        const fields = PrepareCalendarFields(calendar, item, ['year', 'month', 'monthCode', 'day'], [], []);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        const isoDate = CalendarDateFromFields(calendar, fields, overflow);
        return CreateTemporalDate(isoDate, calendar);
    }
    let { year, month, day, calendar, z } = ParseTemporalDateString(RequireString(item));
    if (z)
        throw new RangeError('Z designator not supported for PlainDate');
    if (!calendar)
        calendar = 'iso8601';
    calendar = CanonicalizeCalendar(calendar);
    GetTemporalOverflowOption(GetOptionsObject(options)); // validate and ignore
    return CreateTemporalDate({ year, month, day }, calendar);
}
function InterpretTemporalDateTimeFields(calendar, fields, overflow) {
    const isoDate = CalendarDateFromFields(calendar, fields, overflow);
    const time = RegulateTime(fields.hour, fields.minute, fields.second, fields.millisecond, fields.microsecond, fields.nanosecond, overflow);
    return CombineISODateAndTimeRecord(isoDate, time);
}
function ToTemporalDateTime(item, options) {
    let isoDate, time, calendar;
    if (IsObject(item)) {
        if (IsTemporalDateTime(item)) {
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalDateTime(GetSlot(item, ISO_DATE_TIME), GetSlot(item, CALENDAR));
        }
        if (IsTemporalZonedDateTime(item)) {
            const isoDateTime = GetISODateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, EPOCHNANOSECONDS));
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalDateTime(isoDateTime, GetSlot(item, CALENDAR));
        }
        if (IsTemporalDate(item)) {
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalDateTime(CombineISODateAndTimeRecord(GetSlot(item, ISO_DATE), MidnightTimeRecord()), GetSlot(item, CALENDAR));
        }
        calendar = GetTemporalCalendarIdentifierWithISODefault(item);
        const fields = PrepareCalendarFields(calendar, item, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond'], []);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        ({ isoDate, time } = InterpretTemporalDateTimeFields(calendar, fields, overflow));
    }
    else {
        let z, year, month, day;
        ({ year, month, day, time, calendar, z } = ParseTemporalDateTimeString(RequireString(item)));
        if (z)
            throw new RangeError('Z designator not supported for PlainDateTime');
        if (time === 'start-of-day')
            time = MidnightTimeRecord();
        RejectDateTime(year, month, day, time.hour, time.minute, time.second, time.millisecond, time.microsecond, time.nanosecond);
        if (!calendar)
            calendar = 'iso8601';
        calendar = CanonicalizeCalendar(calendar);
        GetTemporalOverflowOption(GetOptionsObject(options));
        isoDate = { year, month, day };
    }
    const isoDateTime = CombineISODateAndTimeRecord(isoDate, time);
    return CreateTemporalDateTime(isoDateTime, calendar);
}
function ToTemporalDuration(item) {
    const TemporalDuration = GetIntrinsic('%Temporal.Duration%');
    if (IsTemporalDuration(item)) {
        return new TemporalDuration(GetSlot(item, YEARS), GetSlot(item, MONTHS), GetSlot(item, WEEKS), GetSlot(item, DAYS), GetSlot(item, HOURS), GetSlot(item, MINUTES), GetSlot(item, SECONDS), GetSlot(item, MILLISECONDS), GetSlot(item, MICROSECONDS), GetSlot(item, NANOSECONDS));
    }
    if (!IsObject(item)) {
        return ParseTemporalDurationString(RequireString(item));
    }
    const result = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        microseconds: 0,
        nanoseconds: 0
    };
    let partial = ToTemporalPartialDurationRecord(item);
    for (let index = 0; index < DURATION_FIELDS.length; index++) {
        const property = DURATION_FIELDS[index];
        const value = partial[property];
        if (value !== undefined) {
            result[property] = value;
        }
    }
    return new TemporalDuration(result.years, result.months, result.weeks, result.days, result.hours, result.minutes, result.seconds, result.milliseconds, result.microseconds, result.nanoseconds);
}
function ToTemporalInstant(itemParam) {
    let item;
    if (IsObject(itemParam)) {
        if (IsTemporalInstant(itemParam) || IsTemporalZonedDateTime(itemParam)) {
            return CreateTemporalInstant(GetSlot(itemParam, EPOCHNANOSECONDS));
        }
        item = ToPrimitive(itemParam, String);
    }
    else {
        item = itemParam;
    }
    const { year, month, day, time, offset, z } = ParseTemporalInstantString(RequireString(item));
    const { hour = 0, minute = 0, second = 0, millisecond = 0, microsecond = 0, nanosecond = 0 } = time === 'start-of-day' ? {} : time;
    // ParseTemporalInstantString ensures that either `z` is true or or `offset` is non-undefined
    const offsetNanoseconds = z ? 0 : ParseDateTimeUTCOffset(castExists(offset));
    const balanced = BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond - offsetNanoseconds);
    CheckISODaysRange(balanced.isoDate);
    const epochNanoseconds = GetUTCEpochNanoseconds(balanced);
    return CreateTemporalInstant(epochNanoseconds);
}
function ToTemporalMonthDay(item, options) {
    if (IsObject(item)) {
        if (IsTemporalMonthDay(item)) {
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalMonthDay(GetSlot(item, ISO_DATE), GetSlot(item, CALENDAR));
        }
        let calendar;
        if (HasSlot(item, CALENDAR)) {
            calendar = GetSlot(item, CALENDAR);
        }
        else {
            calendar = item.calendar;
            if (calendar === undefined)
                calendar = 'iso8601';
            calendar = ToTemporalCalendarIdentifier(calendar);
        }
        const fields = PrepareCalendarFields(calendar, item, ['year', 'month', 'monthCode', 'day'], [], []);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        const isoDate = CalendarMonthDayFromFields(calendar, fields, overflow);
        return CreateTemporalMonthDay(isoDate, calendar);
    }
    let { month, day, referenceISOYear, calendar } = ParseTemporalMonthDayString(RequireString(item));
    if (calendar === undefined)
        calendar = 'iso8601';
    calendar = CanonicalizeCalendar(calendar);
    GetTemporalOverflowOption(GetOptionsObject(options));
    if (calendar === 'iso8601') {
        const isoCalendarReferenceYear = 1972; // First leap year after Unix epoch
        return CreateTemporalMonthDay({ year: isoCalendarReferenceYear, month, day }, calendar);
    }
    assertExists(referenceISOYear);
    let isoDate = { year: referenceISOYear, month, day };
    RejectDateRange(isoDate);
    const result = ISODateToFields(calendar, isoDate, 'month-day');
    isoDate = CalendarMonthDayFromFields(calendar, result, 'constrain');
    return CreateTemporalMonthDay(isoDate, calendar);
}
function ToTemporalTime(item, options) {
    let time;
    if (IsObject(item)) {
        if (IsTemporalTime(item)) {
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalTime(GetSlot(item, TIME));
        }
        if (IsTemporalDateTime(item)) {
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalTime(GetSlot(item, ISO_DATE_TIME).time);
        }
        if (IsTemporalZonedDateTime(item)) {
            const isoDateTime = GetISODateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, EPOCHNANOSECONDS));
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalTime(isoDateTime.time);
        }
        const { hour, minute, second, millisecond, microsecond, nanosecond } = ToTemporalTimeRecord(item);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        time = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, overflow);
    }
    else {
        time = ParseTemporalTimeString(RequireString(item));
        GetTemporalOverflowOption(GetOptionsObject(options));
    }
    return CreateTemporalTime(time);
}
function ToTimeRecordOrMidnight(item) {
    if (item === undefined)
        return MidnightTimeRecord();
    return GetSlot(ToTemporalTime(item), TIME);
}
function ToTemporalYearMonth(item, options) {
    if (IsObject(item)) {
        if (IsTemporalYearMonth(item)) {
            GetTemporalOverflowOption(GetOptionsObject(options));
            return CreateTemporalYearMonth(GetSlot(item, ISO_DATE), GetSlot(item, CALENDAR));
        }
        const calendar = GetTemporalCalendarIdentifierWithISODefault(item);
        const fields = PrepareCalendarFields(calendar, item, ['year', 'month', 'monthCode'], [], []);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        const isoDate = CalendarYearMonthFromFields(calendar, fields, overflow);
        return CreateTemporalYearMonth(isoDate, calendar);
    }
    let { year, month, referenceISODay, calendar } = ParseTemporalYearMonthString(RequireString(item));
    if (calendar === undefined)
        calendar = 'iso8601';
    calendar = CanonicalizeCalendar(calendar);
    GetTemporalOverflowOption(GetOptionsObject(options));
    let isoDate = { year, month, day: referenceISODay };
    RejectYearMonthRange(isoDate);
    const result = ISODateToFields(calendar, isoDate, 'year-month');
    isoDate = CalendarYearMonthFromFields(calendar, result, 'constrain');
    return CreateTemporalYearMonth(isoDate, calendar);
}
function InterpretISODateTimeOffset(isoDate, time, offsetBehaviour, offsetNs, timeZone, disambiguation, offsetOpt, matchMinute) {
    // start-of-day signifies that we had a string such as YYYY-MM-DD[Zone]. It is
    // grammatically not possible to specify a UTC offset in that string, so the
    // behaviour collapses into ~WALL~, which is equivalent to offset: "ignore".
    if (time === 'start-of-day') {
        assert(offsetBehaviour === 'wall', 'offset cannot be provided in YYYY-MM-DD[Zone] string');
        assert(offsetNs === 0, 'offset cannot be provided in YYYY-MM-DD[Zone] string');
        return GetStartOfDay(timeZone, isoDate);
    }
    const dt = CombineISODateAndTimeRecord(isoDate, time);
    if (offsetBehaviour === 'wall' || offsetOpt === 'ignore') {
        // Simple case: ISO string without a TZ offset (or caller wants to ignore
        // the offset), so just convert DateTime to Instant in the given time zone
        return GetEpochNanosecondsFor(timeZone, dt, disambiguation);
    }
    // The caller wants the offset to always win ('use') OR the caller is OK
    // with the offset winning ('prefer' or 'reject') as long as it's valid
    // for this timezone and date/time.
    if (offsetBehaviour === 'exact' || offsetOpt === 'use') {
        // Calculate the instant for the input's date/time and offset
        const balanced = BalanceISODateTime(isoDate.year, isoDate.month, isoDate.day, time.hour, time.minute, time.second, time.millisecond, time.microsecond, time.nanosecond - offsetNs);
        CheckISODaysRange(balanced.isoDate);
        const epochNs = GetUTCEpochNanoseconds(balanced);
        ValidateEpochNanoseconds(epochNs);
        return epochNs;
    }
    CheckISODaysRange(isoDate);
    const utcEpochNs = GetUTCEpochNanoseconds(dt);
    // "prefer" or "reject"
    const possibleEpochNs = GetPossibleEpochNanoseconds(timeZone, dt);
    for (let index = 0; index < possibleEpochNs.length; index++) {
        const candidate = possibleEpochNs[index];
        const candidateOffset = ToNumber(utcEpochNs - candidate);
        const roundedCandidateOffset = RoundNumberToIncrement(candidateOffset, 60e9, 'halfExpand');
        if (candidateOffset === offsetNs || (matchMinute && roundedCandidateOffset === offsetNs)) {
            return candidate;
        }
    }
    // the user-provided offset doesn't match any instants for this time
    // zone and date/time.
    if (offsetOpt === 'reject') {
        const offsetStr = FormatUTCOffsetNanoseconds(BigInt(offsetNs));
        const dtStr = ISODateTimeToString(dt, 'iso8601', 'auto');
        throw new RangeError(`Offset ${offsetStr} is invalid for ${dtStr} in ${timeZone}`);
    }
    // fall through: offsetOpt === 'prefer', but the offset doesn't match
    // so fall back to use the time zone instead.
    return DisambiguatePossibleEpochNanoseconds(possibleEpochNs, timeZone, dt, disambiguation);
}
function ToTemporalZonedDateTime(item, options) {
    let isoDate, time, timeZone, offset, calendar;
    let matchMinute = false;
    let offsetBehaviour = 'option';
    let disambiguation, offsetOpt;
    if (IsObject(item)) {
        if (IsTemporalZonedDateTime(item)) {
            const resolvedOptions = GetOptionsObject(options);
            GetTemporalDisambiguationOption(resolvedOptions); // validate and ignore
            GetTemporalOffsetOption(resolvedOptions, 'reject');
            GetTemporalOverflowOption(resolvedOptions);
            return CreateTemporalZonedDateTime(GetSlot(item, EPOCHNANOSECONDS), GetSlot(item, TIME_ZONE), GetSlot(item, CALENDAR));
        }
        calendar = GetTemporalCalendarIdentifierWithISODefault(item);
        const fields = PrepareCalendarFields(calendar, item, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'offset', 'timeZone'], ['timeZone']);
        ({ offset, timeZone } = fields);
        if (offset === undefined) {
            offsetBehaviour = 'wall';
        }
        const resolvedOptions = GetOptionsObject(options);
        disambiguation = GetTemporalDisambiguationOption(resolvedOptions);
        offsetOpt = GetTemporalOffsetOption(resolvedOptions, 'reject');
        const overflow = GetTemporalOverflowOption(resolvedOptions);
        ({ isoDate, time } = InterpretTemporalDateTimeFields(calendar, fields, overflow));
    }
    else {
        let tzAnnotation, z, year, month, day;
        ({ year, month, day, time, tzAnnotation, offset, z, calendar } = ParseTemporalZonedDateTimeString(RequireString(item)));
        timeZone = ToTemporalTimeZoneIdentifier(tzAnnotation);
        if (z) {
            offsetBehaviour = 'exact';
        }
        else if (!offset) {
            offsetBehaviour = 'wall';
        }
        if (!calendar)
            calendar = 'iso8601';
        calendar = CanonicalizeCalendar(calendar);
        matchMinute = true; // ISO strings may specify offset with less precision
        const resolvedOptions = GetOptionsObject(options);
        disambiguation = GetTemporalDisambiguationOption(resolvedOptions);
        offsetOpt = GetTemporalOffsetOption(resolvedOptions, 'reject');
        GetTemporalOverflowOption(resolvedOptions); // validate and ignore
        isoDate = { year, month, day };
    }
    let offsetNs = 0;
    if (offsetBehaviour === 'option')
        offsetNs = ParseDateTimeUTCOffset(castExists(offset));
    const epochNanoseconds = InterpretISODateTimeOffset(isoDate, time, offsetBehaviour, offsetNs, timeZone, disambiguation, offsetOpt, matchMinute);
    return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar);
}
function CreateTemporalDateSlots(result, isoDate, calendar) {
    RejectDateRange(isoDate);
    CreateSlots(result);
    SetSlot(result, ISO_DATE, isoDate);
    SetSlot(result, CALENDAR, calendar);
    SetSlot(result, DATE_BRAND, true);
    {
        const repr = TemporalDateToString(result, 'auto');
        Object.defineProperty(result, '_repr_', {
            value: `Temporal.PlainDate <${repr}>`,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}
function CreateTemporalDate(isoDate, calendar) {
    const TemporalPlainDate = GetIntrinsic('%Temporal.PlainDate%');
    const result = Object.create(TemporalPlainDate.prototype);
    CreateTemporalDateSlots(result, isoDate, calendar);
    return result;
}
function CreateTemporalDateTimeSlots(result, isoDateTime, calendar) {
    RejectDateTimeRange(isoDateTime);
    CreateSlots(result);
    SetSlot(result, ISO_DATE_TIME, isoDateTime);
    SetSlot(result, CALENDAR, calendar);
    {
        let repr = ISODateTimeToString(isoDateTime, calendar, 'auto');
        Object.defineProperty(result, '_repr_', {
            value: `Temporal.PlainDateTime <${repr}>`,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}
function CreateTemporalDateTime(isoDateTime, calendar) {
    const TemporalPlainDateTime = GetIntrinsic('%Temporal.PlainDateTime%');
    const result = Object.create(TemporalPlainDateTime.prototype);
    CreateTemporalDateTimeSlots(result, isoDateTime, calendar);
    return result;
}
function CreateTemporalMonthDaySlots(result, isoDate, calendar) {
    RejectDateRange(isoDate);
    CreateSlots(result);
    SetSlot(result, ISO_DATE, isoDate);
    SetSlot(result, CALENDAR, calendar);
    SetSlot(result, MONTH_DAY_BRAND, true);
    {
        const repr = TemporalMonthDayToString(result, 'auto');
        Object.defineProperty(result, '_repr_', {
            value: `Temporal.PlainMonthDay <${repr}>`,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}
function CreateTemporalMonthDay(isoDate, calendar) {
    const TemporalPlainMonthDay = GetIntrinsic('%Temporal.PlainMonthDay%');
    const result = Object.create(TemporalPlainMonthDay.prototype);
    CreateTemporalMonthDaySlots(result, isoDate, calendar);
    return result;
}
function CreateTemporalTimeSlots(result, time) {
    CreateSlots(result);
    SetSlot(result, TIME, time);
    {
        Object.defineProperty(result, '_repr_', {
            value: `Temporal.PlainTime <${TimeRecordToString(time, 'auto')}>`,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}
function CreateTemporalTime(time) {
    const TemporalPlainTime = GetIntrinsic('%Temporal.PlainTime%');
    const result = Object.create(TemporalPlainTime.prototype);
    CreateTemporalTimeSlots(result, time);
    return result;
}
function CreateTemporalYearMonthSlots(result, isoDate, calendar) {
    RejectYearMonthRange(isoDate);
    CreateSlots(result);
    SetSlot(result, ISO_DATE, isoDate);
    SetSlot(result, CALENDAR, calendar);
    SetSlot(result, YEAR_MONTH_BRAND, true);
    {
        const repr = TemporalYearMonthToString(result, 'auto');
        Object.defineProperty(result, '_repr_', {
            value: `Temporal.PlainYearMonth <${repr}>`,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}
function CreateTemporalYearMonth(isoDate, calendar) {
    const TemporalPlainYearMonth = GetIntrinsic('%Temporal.PlainYearMonth%');
    const result = Object.create(TemporalPlainYearMonth.prototype);
    CreateTemporalYearMonthSlots(result, isoDate, calendar);
    return result;
}
function CreateTemporalInstantSlots(result, epochNanoseconds) {
    ValidateEpochNanoseconds(epochNanoseconds);
    CreateSlots(result);
    SetSlot(result, EPOCHNANOSECONDS, epochNanoseconds);
    {
        const iso = GetISOPartsFromEpoch(epochNanoseconds);
        const repr = ISODateTimeToString(iso, 'iso8601', 'auto', 'never') + 'Z';
        Object.defineProperty(result, '_repr_', {
            value: `${result[Symbol.toStringTag]} <${repr}>`,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}
function CreateTemporalInstant(epochNanoseconds) {
    const TemporalInstant = GetIntrinsic('%Temporal.Instant%');
    const result = Object.create(TemporalInstant.prototype);
    CreateTemporalInstantSlots(result, epochNanoseconds);
    return result;
}
function CreateTemporalZonedDateTimeSlots(result, epochNanoseconds, timeZone, calendar) {
    ValidateEpochNanoseconds(epochNanoseconds);
    CreateSlots(result);
    SetSlot(result, EPOCHNANOSECONDS, epochNanoseconds);
    SetSlot(result, TIME_ZONE, timeZone);
    SetSlot(result, CALENDAR, calendar);
    {
        const repr = TemporalZonedDateTimeToString(result, 'auto');
        Object.defineProperty(result, '_repr_', {
            value: `Temporal.ZonedDateTime <${repr}>`,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}
function CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar = 'iso8601') {
    const TemporalZonedDateTime = GetIntrinsic('%Temporal.ZonedDateTime%');
    const result = Object.create(TemporalZonedDateTime.prototype);
    CreateTemporalZonedDateTimeSlots(result, epochNanoseconds, timeZone, calendar);
    return result;
}
function CalendarFieldKeysPresent(fields) {
    return CALENDAR_FIELD_KEYS.filter((key) => fields[key] !== undefined);
}
function CalendarMergeFields(calendar, fields, additionalFields) {
    const additionalKeys = CalendarFieldKeysPresent(additionalFields);
    const overriddenKeys = calendarImplForID(calendar).fieldKeysToIgnore(additionalKeys);
    const merged = Object.create(null);
    const fieldsKeys = CalendarFieldKeysPresent(fields);
    for (let ix = 0; ix < CALENDAR_FIELD_KEYS.length; ix++) {
        let propValue = undefined;
        const key = CALENDAR_FIELD_KEYS[ix];
        if (fieldsKeys.includes(key) && !overriddenKeys.includes(key)) {
            propValue = fields[key];
        }
        if (additionalKeys.includes(key)) {
            propValue = additionalFields[key];
        }
        if (propValue !== undefined)
            merged[key] = propValue;
    }
    return merged;
}
function CalendarDateAdd(calendar, isoDate, dateDuration, overflow) {
    const result = calendarImplForID(calendar).dateAdd(isoDate, dateDuration, overflow);
    RejectDateRange(result);
    return result;
}
function CalendarDateUntil(calendar, isoDate, isoOtherDate, largestUnit) {
    return calendarImplForID(calendar).dateUntil(isoDate, isoOtherDate, largestUnit);
}
function ToTemporalCalendarIdentifier(calendarLike) {
    if (IsObject(calendarLike)) {
        if (HasSlot(calendarLike, CALENDAR))
            return GetSlot(calendarLike, CALENDAR);
    }
    const identifier = RequireString(calendarLike);
    try {
        // Fast path: identifier is a calendar type, no ISO string parsing needed
        return CanonicalizeCalendar(identifier);
    }
    catch {
        // fall through
    }
    let calendar;
    try {
        ({ calendar } = ParseISODateTime(identifier));
    }
    catch {
        try {
            ({ calendar } = ParseTemporalTimeString(identifier));
        }
        catch {
            try {
                ({ calendar } = ParseTemporalYearMonthString(identifier));
            }
            catch {
                ({ calendar } = ParseTemporalMonthDayString(identifier));
            }
        }
    }
    if (!calendar)
        calendar = 'iso8601';
    return CanonicalizeCalendar(calendar);
}
function GetTemporalCalendarIdentifierWithISODefault(item) {
    if (HasSlot(item, CALENDAR))
        return GetSlot(item, CALENDAR);
    const { calendar } = item;
    if (calendar === undefined)
        return 'iso8601';
    return ToTemporalCalendarIdentifier(calendar);
}
function CalendarEquals(one, two) {
    return CanonicalizeCalendar(one) === CanonicalizeCalendar(two);
}
function CalendarDateFromFields(calendar, fields, overflow) {
    const calendarImpl = calendarImplForID(calendar);
    calendarImpl.resolveFields(fields, 'date');
    const result = calendarImpl.dateToISO(fields, overflow);
    RejectDateRange(result);
    return result;
}
function CalendarYearMonthFromFields(calendar, fields, overflow) {
    const calendarImpl = calendarImplForID(calendar);
    calendarImpl.resolveFields(fields, 'year-month');
    fields.day = 1;
    const result = calendarImpl.dateToISO(fields, overflow);
    RejectYearMonthRange(result);
    return result;
}
function CalendarMonthDayFromFields(calendar, fields, overflow) {
    const calendarImpl = calendarImplForID(calendar);
    calendarImpl.resolveFields(fields, 'month-day');
    const result = calendarImpl.monthDayToISOReferenceDate(fields, overflow);
    RejectDateRange(result);
    return result;
}
function ToTemporalTimeZoneIdentifier(temporalTimeZoneLike) {
    if (IsObject(temporalTimeZoneLike)) {
        if (IsTemporalZonedDateTime(temporalTimeZoneLike))
            return GetSlot(temporalTimeZoneLike, TIME_ZONE);
    }
    const timeZoneString = RequireString(temporalTimeZoneLike);
    if (timeZoneString === 'UTC')
        return 'UTC'; // UTC fast path
    const { tzName, offsetMinutes } = ParseTemporalTimeZoneString(timeZoneString);
    if (offsetMinutes !== undefined) {
        return FormatOffsetTimeZoneIdentifier(offsetMinutes);
    }
    // if offsetMinutes is undefined, then tzName must be present
    const record = GetAvailableNamedTimeZoneIdentifier(castExists(tzName));
    if (!record)
        throw new RangeError(`Unrecognized time zone ${tzName}`);
    return record.identifier;
}
function TimeZoneEquals(one, two) {
    if (one === two)
        return true;
    const offsetMinutes1 = ParseTimeZoneIdentifier(one).offsetMinutes;
    const offsetMinutes2 = ParseTimeZoneIdentifier(two).offsetMinutes;
    if (offsetMinutes1 === undefined && offsetMinutes2 === undefined) {
        // Calling GetAvailableNamedTimeZoneIdentifier is costly, so (unlike the
        // spec) the polyfill will early-return if one of them isn't recognized. Try
        // the second ID first because it's more likely to be unknown, because it
        // can come from the argument of TimeZone.p.equals as opposed to the first
        // ID which comes from the receiver.
        const idRecord2 = GetAvailableNamedTimeZoneIdentifier(two);
        if (!idRecord2)
            return false;
        const idRecord1 = GetAvailableNamedTimeZoneIdentifier(one);
        if (!idRecord1)
            return false;
        return idRecord1.primaryIdentifier === idRecord2.primaryIdentifier;
    }
    else {
        return offsetMinutes1 === offsetMinutes2;
    }
}
function GetOffsetNanosecondsFor(timeZone, epochNs) {
    const offsetMinutes = ParseTimeZoneIdentifier(timeZone).offsetMinutes ?? 0;
    if (offsetMinutes !== undefined)
        return offsetMinutes * 60000000000; //60*1e9
    return GetNamedTimeZoneOffsetNanoseconds(timeZone, epochNs);
}
function FormatUTCOffsetNanoseconds(offsetNs) {
    const sign = offsetNs < 0n ? '-' : '+';
    const absoluteNs = offsetNs < 0n ? -offsetNs : offsetNs;
    const hour = Number(absoluteNs / 3600000000000n);
    const minute = Number(absoluteNs / 60000000000n) % 60;
    const second = Number(absoluteNs / 1000000000n) % 60;
    const subSecondNs = Number(absoluteNs % 1000000000n);
    const precision = second === 0 && subSecondNs === 0 ? 'minute' : 'auto';
    const timeString = FormatTimeString(hour, minute, second, subSecondNs, precision);
    return `${sign}${timeString}`;
}
function GetISODateTimeFor(timeZone, epochNs) {
    const offsetNs = GetOffsetNanosecondsFor(timeZone, epochNs);
    let { isoDate: { year, month, day }, time: { hour, minute, second, millisecond, microsecond, nanosecond } } = GetISOPartsFromEpoch(epochNs);
    return BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond + offsetNs);
}
function GetEpochNanosecondsFor(timeZone, isoDateTime, disambiguation) {
    const possibleEpochNs = GetPossibleEpochNanoseconds(timeZone, isoDateTime);
    return DisambiguatePossibleEpochNanoseconds(possibleEpochNs, timeZone, isoDateTime, disambiguation);
}
// TODO: See if this logic can be removed in favour of GetNamedTimeZoneEpochNanoseconds
function DisambiguatePossibleEpochNanoseconds(possibleEpochNs, timeZone, isoDateTime, disambiguation) {
    const numInstants = possibleEpochNs.length;
    if (numInstants === 1)
        return possibleEpochNs[0];
    if (numInstants) {
        switch (disambiguation) {
            case 'compatible':
            // fall through because 'compatible' means 'earlier' for "fall back" transitions
            case 'earlier':
                return possibleEpochNs[0];
            case 'later':
                return possibleEpochNs[numInstants - 1];
            case 'reject': {
                throw new RangeError('multiple instants found');
            }
        }
    }
    if (disambiguation === 'reject')
        throw new RangeError('multiple instants found');
    const utcns = GetUTCEpochNanoseconds(isoDateTime);
    const dayBefore = utcns - DAY_NANOS_BI;
    ValidateEpochNanoseconds(dayBefore);
    const offsetBefore = GetOffsetNanosecondsFor(timeZone, dayBefore);
    const dayAfter = DAY_NANOS_BI + utcns;
    ValidateEpochNanoseconds(dayAfter);
    const offsetAfter = GetOffsetNanosecondsFor(timeZone, dayAfter);
    const nanoseconds = offsetAfter - offsetBefore;
    assert(Math.abs(nanoseconds) <= DAY_NANOS, 'UTC offset shift longer than 24 hours');
    switch (disambiguation) {
        case 'earlier': {
            const timeDuration = TimeDuration.fromComponents(0, 0, 0, 0, 0, -nanoseconds);
            const earlierTime = AddTime(isoDateTime.time, timeDuration);
            const earlierDate = BalanceISODate(isoDateTime.isoDate.year, isoDateTime.isoDate.month, isoDateTime.isoDate.day + earlierTime.deltaDays);
            const earlier = CombineISODateAndTimeRecord(earlierDate, earlierTime);
            return GetPossibleEpochNanoseconds(timeZone, earlier)[0];
        }
        case 'compatible':
        // fall through because 'compatible' means 'later' for "spring forward" transitions
        case 'later': {
            const timeDuration = TimeDuration.fromComponents(0, 0, 0, 0, 0, nanoseconds);
            const laterTime = AddTime(isoDateTime.time, timeDuration);
            const laterDate = BalanceISODate(isoDateTime.isoDate.year, isoDateTime.isoDate.month, isoDateTime.isoDate.day + laterTime.deltaDays);
            const later = CombineISODateAndTimeRecord(laterDate, laterTime);
            const possible = GetPossibleEpochNanoseconds(timeZone, later);
            return possible[possible.length - 1];
        }
    }
}
function GetPossibleEpochNanoseconds(timeZone, isoDateTime) {
    // UTC fast path
    if (timeZone === 'UTC') {
        CheckISODaysRange(isoDateTime.isoDate);
        return [GetUTCEpochNanoseconds(isoDateTime)];
    }
    const offsetMinutes = ParseTimeZoneIdentifier(timeZone).offsetMinutes;
    if (offsetMinutes !== undefined) {
        const balanced = BalanceISODateTime(isoDateTime.isoDate.year, isoDateTime.isoDate.month, isoDateTime.isoDate.day, isoDateTime.time.hour, isoDateTime.time.minute - offsetMinutes, isoDateTime.time.second, isoDateTime.time.millisecond, isoDateTime.time.microsecond, isoDateTime.time.nanosecond);
        CheckISODaysRange(balanced.isoDate);
        const epochNs = GetUTCEpochNanoseconds(balanced);
        ValidateEpochNanoseconds(epochNs);
        return [epochNs];
    }
    CheckISODaysRange(isoDateTime.isoDate);
    return GetNamedTimeZoneEpochNanoseconds(timeZone, isoDateTime);
}
function GetStartOfDay(timeZone, isoDate) {
    const isoDateTime = CombineISODateAndTimeRecord(isoDate, MidnightTimeRecord());
    const possibleEpochNs = GetPossibleEpochNanoseconds(timeZone, isoDateTime);
    // If not a DST gap, return the single or earlier epochNs
    if (possibleEpochNs.length)
        return possibleEpochNs[0];
    // Otherwise, 00:00:00 lies within a DST gap. Compute an epochNs that's
    // guaranteed to be before the transition
    assert(!IsOffsetTimeZoneIdentifier(timeZone), 'should only be reached with named time zone');
    const utcns = GetUTCEpochNanoseconds(isoDateTime);
    const dayBefore = utcns - DAY_NANOS_BI;
    ValidateEpochNanoseconds(dayBefore);
    return castExists(GetNamedTimeZoneNextTransition(timeZone, dayBefore));
}
function ISOYearString(year) {
    let yearString;
    if (year < 0 || year > 9999) {
        const sign = year < 0 ? '-' : '+';
        const yearNumber = Math.abs(year);
        yearString = sign + ToZeroPaddedDecimalString(yearNumber, 6);
    }
    else {
        yearString = ToZeroPaddedDecimalString(year, 4);
    }
    return yearString;
}
function ISODateTimePartString(part) {
    return ToZeroPaddedDecimalString(part, 2);
}
function FormatFractionalSeconds(subSecondNanoseconds, precision) {
    let fraction;
    if (precision === 'auto') {
        if (subSecondNanoseconds === 0)
            return '';
        const fractionFullPrecision = ToZeroPaddedDecimalString(subSecondNanoseconds, 9);
        // now remove any trailing zeroes
        fraction = fractionFullPrecision.replace(/0+$/, '');
    }
    else {
        if (precision === 0)
            return '';
        const fractionFullPrecision = ToZeroPaddedDecimalString(subSecondNanoseconds, 9);
        fraction = fractionFullPrecision.slice(0, precision);
    }
    return `.${fraction}`;
}
function FormatTimeString(hour, minute, second, subSecondNanoseconds, precision) {
    let result = `${ISODateTimePartString(hour)}:${ISODateTimePartString(minute)}`;
    if (precision === 'minute')
        return result;
    result += `:${ISODateTimePartString(second)}`;
    result += FormatFractionalSeconds(subSecondNanoseconds, precision);
    return result;
}
function TemporalInstantToString(instant, timeZone, precision) {
    let outputTimeZone = timeZone;
    if (outputTimeZone === undefined)
        outputTimeZone = 'UTC';
    const epochNs = GetSlot(instant, EPOCHNANOSECONDS);
    const iso = GetISODateTimeFor(outputTimeZone, epochNs);
    const dateTimeString = ISODateTimeToString(iso, 'iso8601', precision, 'never');
    let timeZoneString = 'Z';
    if (timeZone !== undefined) {
        const offsetNs = GetOffsetNanosecondsFor(outputTimeZone, epochNs);
        timeZoneString = FormatDateTimeUTCOffsetRounded(offsetNs);
    }
    return `${dateTimeString}${timeZoneString}`;
}
function TemporalDurationToString(duration, precision) {
    const years = GetSlot(duration, YEARS);
    const months = GetSlot(duration, MONTHS);
    const weeks = GetSlot(duration, WEEKS);
    const days = GetSlot(duration, DAYS);
    const hours = GetSlot(duration, HOURS);
    const minutes = GetSlot(duration, MINUTES);
    const sign = DurationSign(duration);
    let datePart = '';
    if (years !== 0)
        datePart += `${Math.abs(years)}Y`;
    if (months !== 0)
        datePart += `${Math.abs(months)}M`;
    if (weeks !== 0)
        datePart += `${Math.abs(weeks)}W`;
    if (days !== 0)
        datePart += `${Math.abs(days)}D`;
    let timePart = '';
    if (hours !== 0)
        timePart += `${Math.abs(hours)}H`;
    if (minutes !== 0)
        timePart += `${Math.abs(minutes)}M`;
    // Keeping sub-second units separate avoids losing precision after resolving
    // any overflows from rounding
    const secondsDuration = TimeDuration.fromComponents(0, 0, GetSlot(duration, SECONDS), GetSlot(duration, MILLISECONDS), GetSlot(duration, MICROSECONDS), GetSlot(duration, NANOSECONDS));
    if (!secondsDuration.isZero() ||
        ['second', 'millisecond', 'microsecond', 'nanosecond'].includes(DefaultTemporalLargestUnit(duration)) ||
        precision !== 'auto') {
        const secondsPart = Math.abs(secondsDuration.sec);
        const subSecondsPart = FormatFractionalSeconds(Math.abs(secondsDuration.subsec), precision);
        timePart += `${secondsPart}${subSecondsPart}S`;
    }
    let result = `${sign < 0 ? '-' : ''}P${datePart}`;
    if (timePart)
        result = `${result}T${timePart}`;
    return result;
}
function TemporalDateToString(date, showCalendar = 'auto') {
    const { year, month, day } = GetSlot(date, ISO_DATE);
    const yearString = ISOYearString(year);
    const monthString = ISODateTimePartString(month);
    const dayString = ISODateTimePartString(day);
    const calendar = FormatCalendarAnnotation(GetSlot(date, CALENDAR), showCalendar);
    return `${yearString}-${monthString}-${dayString}${calendar}`;
}
function TimeRecordToString({ hour, minute, second, millisecond, microsecond, nanosecond }, precision) {
    const subSecondNanoseconds = millisecond * 1e6 + microsecond * 1e3 + nanosecond;
    return FormatTimeString(hour, minute, second, subSecondNanoseconds, precision);
}
function ISODateTimeToString(isoDateTime, calendar, precision, showCalendar = 'auto') {
    const { isoDate: { year, month, day }, time: { hour, minute, second, millisecond, microsecond, nanosecond } } = isoDateTime;
    const yearString = ISOYearString(year);
    const monthString = ISODateTimePartString(month);
    const dayString = ISODateTimePartString(day);
    const subSecondNanoseconds = millisecond * 1e6 + microsecond * 1e3 + nanosecond;
    const timeString = FormatTimeString(hour, minute, second, subSecondNanoseconds, precision);
    const calendarString = FormatCalendarAnnotation(calendar, showCalendar);
    return `${yearString}-${monthString}-${dayString}T${timeString}${calendarString}`;
}
function TemporalMonthDayToString(monthDay, showCalendar = 'auto') {
    const { year, month, day } = GetSlot(monthDay, ISO_DATE);
    const monthString = ISODateTimePartString(month);
    const dayString = ISODateTimePartString(day);
    let resultString = `${monthString}-${dayString}`;
    const calendar = GetSlot(monthDay, CALENDAR);
    if (showCalendar === 'always' || showCalendar === 'critical' || calendar !== 'iso8601') {
        const yearString = ISOYearString(year);
        resultString = `${yearString}-${resultString}`;
    }
    const calendarString = FormatCalendarAnnotation(calendar, showCalendar);
    if (calendarString)
        resultString += calendarString;
    return resultString;
}
function TemporalYearMonthToString(yearMonth, showCalendar = 'auto') {
    const { year, month, day } = GetSlot(yearMonth, ISO_DATE);
    const yearString = ISOYearString(year);
    const monthString = ISODateTimePartString(month);
    let resultString = `${yearString}-${monthString}`;
    const calendar = GetSlot(yearMonth, CALENDAR);
    if (showCalendar === 'always' || showCalendar === 'critical' || calendar !== 'iso8601') {
        const dayString = ISODateTimePartString(day);
        resultString += `-${dayString}`;
    }
    const calendarString = FormatCalendarAnnotation(calendar, showCalendar);
    if (calendarString)
        resultString += calendarString;
    return resultString;
}
function TemporalZonedDateTimeToString(zdt, precision, showCalendar = 'auto', showTimeZone = 'auto', showOffset = 'auto', options = undefined) {
    let epochNs = GetSlot(zdt, EPOCHNANOSECONDS);
    if (options) {
        const { unit, increment, roundingMode } = options;
        epochNs = RoundTemporalInstant(epochNs, increment, unit, roundingMode);
    }
    const tz = GetSlot(zdt, TIME_ZONE);
    const offsetNs = GetOffsetNanosecondsFor(tz, epochNs);
    const iso = GetISODateTimeFor(tz, epochNs);
    let dateTimeString = ISODateTimeToString(iso, 'iso8601', precision, 'never');
    if (showOffset !== 'never') {
        dateTimeString += FormatDateTimeUTCOffsetRounded(offsetNs);
    }
    if (showTimeZone !== 'never') {
        const flag = showTimeZone === 'critical' ? '!' : '';
        dateTimeString += `[${flag}${tz}]`;
    }
    dateTimeString += FormatCalendarAnnotation(GetSlot(zdt, CALENDAR), showCalendar);
    return dateTimeString;
}
function IsOffsetTimeZoneIdentifier(string) {
    return OFFSET_IDENTIFIER.test(string);
}
function ParseDateTimeUTCOffset(string) {
    const match = OFFSET_WITH_PARTS.exec(string);
    if (!match) {
        throw new RangeError(`invalid time zone offset: ${string}; must match ±HH:MM[:SS.SSSSSSSSS]`);
    }
    const sign = match[1] === '-' ? -1 : +1;
    const hours = +match[2];
    const minutes = +(match[3] || 0);
    const seconds = +(match[4] || 0);
    const nanoseconds = +((match[5] || 0) + '000000000').slice(0, 9);
    const offsetNanoseconds = sign * (((hours * 60 + minutes) * 60 + seconds) * 1e9 + nanoseconds);
    return offsetNanoseconds;
}
let canonicalTimeZoneIdsCache = undefined;
const isTZIDSep = Object.assign(Object.create(null), { '/': true, '-': true, _: true });
function GetAvailableNamedTimeZoneIdentifier(identifier) {
    // The most common case is when the identifier is a canonical time zone ID.
    // Fast-path that case by caching all canonical IDs. For old ECMAScript
    // implementations lacking this API, set the cache to `null` to avoid retries.
    if (canonicalTimeZoneIdsCache === undefined) {
        const canonicalTimeZoneIds = Intl.supportedValuesOf?.('timeZone');
        if (canonicalTimeZoneIds) {
            canonicalTimeZoneIdsCache = new Map();
            for (let ix = 0; ix < canonicalTimeZoneIds.length; ix++) {
                const id = canonicalTimeZoneIds[ix];
                canonicalTimeZoneIdsCache.set(ASCIILowercase(id), id);
            }
        }
        else {
            canonicalTimeZoneIdsCache = null;
        }
    }
    const lower = ASCIILowercase(identifier);
    let primaryIdentifier = canonicalTimeZoneIdsCache?.get(lower);
    if (primaryIdentifier)
        return { identifier: primaryIdentifier, primaryIdentifier };
    // It's not already a primary identifier, so get its primary identifier (or
    // return if it's not an available named time zone ID).
    try {
        const formatter = getIntlDateTimeFormatEnUsForTimeZone(identifier);
        primaryIdentifier = formatter.resolvedOptions().timeZone;
    }
    catch {
        return undefined;
    }
    // Special case this legacy identifier that is listed both in `backzone` and
    // `backward` in the TZDB. Work around implementations that incorrectly use
    // the `backward` data.
    if (lower === 'antarctica/south_pole')
        primaryIdentifier = 'Antarctica/McMurdo';
    // Some legacy identifiers are aliases in ICU but not legal IANA identifiers.
    // Reject them even if the implementation's Intl supports them, as they are
    // not present in the IANA time zone database.
    if (ICU_LEGACY_TIME_ZONE_IDS.has(identifier)) {
        throw new RangeError(`${identifier} is a legacy time zone identifier from ICU. Use ${primaryIdentifier} instead`);
    }
    // The identifier is an alias (a deprecated identifier that's a synonym for a
    // primary identifier), so we need to case-normalize the identifier to match
    // the IANA TZDB, e.g. america/new_york => America/New_York. There's no
    // built-in way to do this using Intl.DateTimeFormat, but the we can normalize
    // almost all aliases (modulo a few special cases) using the TZDB's basic
    // capitalization pattern:
    // 1. capitalize the first letter of the identifier
    // 2. capitalize the letter after every slash, dash, or underscore delimiter
    const chars = [...lower].map((c, i) => (i === 0 || isTZIDSep[lower[i - 1]] ? c.toUpperCase() : c));
    const standardCase = chars.join('');
    const segments = standardCase.split('/');
    if (segments.length === 1) {
        // If a single-segment legacy ID is 2-3 chars or contains a number or dash, then
        // (except for the "GB-Eire" special case) the case-normalized form is uppercase.
        // These are: GMT+0, GMT-0, GB, NZ, PRC, ROC, ROK, UCT, GMT, GMT0, CET, CST6CDT,
        // EET, EST, HST, MET, MST, MST7MDT, PST8PDT, WET, NZ-CHAT, and W-SU.
        // Otherwise it's standard form: first letter capitalized, e.g. Iran, Egypt, Hongkong
        if (lower === 'gb-eire')
            return { identifier: 'GB-Eire', primaryIdentifier };
        return {
            identifier: lower.length <= 3 || /[-0-9]/.test(lower) ? lower.toUpperCase() : segments[0],
            primaryIdentifier
        };
    }
    // All Etc zone names are uppercase except three exceptions.
    if (segments[0] === 'Etc') {
        const etcName = ['Zulu', 'Greenwich', 'Universal'].includes(segments[1]) ? segments[1] : segments[1].toUpperCase();
        return { identifier: `Etc/${etcName}`, primaryIdentifier };
    }
    // Legacy US identifiers like US/Alaska or US/Indiana-Starke are 2 segments and use standard form.
    if (segments[0] === 'Us')
        return { identifier: `US/${segments[1]}`, primaryIdentifier };
    // For multi-segment IDs, there's a few special cases in the second/third segments
    const specialCases = new Map([
        ['Act', 'ACT'],
        ['Lhi', 'LHI'],
        ['Nsw', 'NSW'],
        ['Dar_Es_Salaam', 'Dar_es_Salaam'],
        ['Port_Of_Spain', 'Port_of_Spain'],
        ['Port-Au-Prince', 'Port-au-Prince'],
        ['Isle_Of_Man', 'Isle_of_Man'],
        ['Comodrivadavia', 'ComodRivadavia'],
        ['Knox_In', 'Knox_IN'],
        ['Dumontdurville', 'DumontDUrville'],
        ['Mcmurdo', 'McMurdo'],
        ['Denoronha', 'DeNoronha'],
        ['Easterisland', 'EasterIsland'],
        ['Bajanorte', 'BajaNorte'],
        ['Bajasur', 'BajaSur']
    ]);
    segments[1] = specialCases.get(segments[1]) ?? segments[1];
    if (segments.length > 2)
        segments[2] = specialCases.get(segments[2]) ?? segments[2];
    return { identifier: segments.join('/'), primaryIdentifier };
}
function GetNamedTimeZoneOffsetNanosecondsImpl(id, epochMilliseconds) {
    const { year, month, day, hour, minute, second } = GetFormatterParts(id, epochMilliseconds);
    let millisecond = epochMilliseconds % 1000;
    if (millisecond < 0)
        millisecond += 1000;
    const utc = GetUTCEpochMilliseconds({ isoDate: { year, month, day }, time: { hour, minute, second, millisecond } });
    return (utc - epochMilliseconds) * 1e6;
}
function GetNamedTimeZoneOffsetNanoseconds(id, epochNanoseconds) {
    // Optimization: We get the offset nanoseconds only with millisecond
    // resolution, assuming that time zone offset changes don't happen in the
    // middle of a millisecond
    return GetNamedTimeZoneOffsetNanosecondsImpl(id, epochNsToMs(epochNanoseconds, 'floor'));
}
function FormatOffsetTimeZoneIdentifier(offsetMinutes) {
    const sign = offsetMinutes < 0 ? '-' : '+';
    const absoluteMinutes = Math.abs(offsetMinutes);
    const hour = Math.floor(absoluteMinutes / 60);
    const minute = absoluteMinutes % 60;
    const timeString = FormatTimeString(hour, minute, 0, 0, 'minute');
    return `${sign}${timeString}`;
}
function FormatDateTimeUTCOffsetRounded(offsetNanosecondsParam) {
    const offsetNanoseconds = RoundNumberToIncrement(offsetNanosecondsParam, MINUTE_NANOS, 'halfExpand');
    return FormatOffsetTimeZoneIdentifier(offsetNanoseconds / 60e9);
}
function GetUTCEpochMilliseconds({ isoDate: { year, month, day }, time: { hour, minute, second, millisecond } }) {
    // The pattern of leap years in the ISO 8601 calendar repeats every 400
    // years. To avoid overflowing at the edges of the range, we reduce the year
    // to the remainder after dividing by 400, and then add back all the
    // nanoseconds from the multiples of 400 years at the end.
    const reducedYear = year % 400;
    const yearCycles = (year - reducedYear) / 400;
    // Note: Date.UTC() interprets one and two-digit years as being in the
    // 20th century, so don't use it
    const legacyDate = new Date();
    legacyDate.setUTCHours(hour, minute, second, millisecond);
    legacyDate.setUTCFullYear(reducedYear, month - 1, day);
    const ms = legacyDate.getTime();
    return ms + MS_IN_400_YEAR_CYCLE * yearCycles;
}
function GetUTCEpochNanoseconds(isoDateTime) {
    const ms = GetUTCEpochMilliseconds(isoDateTime);
    const subMs = isoDateTime.time.microsecond * 1e3 + isoDateTime.time.nanosecond;
    return epochMsToNs(ms) + BigInt(subMs);
}
function GetISOPartsFromEpoch(epochNanoseconds) {
    let epochMilliseconds = epochNsToMs(epochNanoseconds, 'trunc');
    let nanos = Number(epochNanoseconds % BigInt(MILLION));
    if (nanos < 0) {
        nanos += 1e6;
        epochMilliseconds -= 1;
    }
    const microsecond = Math.floor(nanos / 1e3) % 1e3;
    const nanosecond = nanos % 1e3;
    const item = new Date(epochMilliseconds);
    const year = item.getUTCFullYear();
    const month = item.getUTCMonth() + 1;
    const day = item.getUTCDate();
    const hour = item.getUTCHours();
    const minute = item.getUTCMinutes();
    const second = item.getUTCSeconds();
    const millisecond = item.getUTCMilliseconds();
    return {
        epochMilliseconds,
        isoDate: { year, month, day },
        time: { hour, minute, second, millisecond, microsecond, nanosecond }
    };
}
// ts-prune-ignore-next TODO: remove this after tests are converted to TS
function GetNamedTimeZoneDateTimeParts(id, epochNanoseconds) {
    const { epochMilliseconds, time: { millisecond, microsecond, nanosecond } } = GetISOPartsFromEpoch(epochNanoseconds);
    const { year, month, day, hour, minute, second } = GetFormatterParts(id, epochMilliseconds);
    return BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
}
// Most time zones never transition twice within a short span of days. We still
// accommodate twitchy zones, albeit at a performance penalty. 19 days is the
// default window, past which we'd need to start adding many more special cases.
function searchWindowForTransitions(id) {
    if (id === 'Africa/El_Aaiun')
        return DAY_MS * 17;
    if (id === 'America/Argentina/Tucuman')
        return DAY_MS * 12;
    if (id === 'Europe/Tirane')
        return DAY_MS * 11;
    if (id === 'Europe/Riga')
        return DAY_MS * 10;
    if (id === 'Europe/Simferopol' || id === 'Europe/Vienna')
        return DAY_MS * 9;
    if (id === 'Africa/Tunis')
        return DAY_MS * 8;
    if (id === 'America/Boa_Vista' ||
        id === 'America/Fortaleza' ||
        id === 'America/Maceio' ||
        id === 'America/Noronha' ||
        id === 'America/Recife' ||
        id === 'Asia/Gaza' || // dubious, only in future calculations
        id === 'Asia/Hebron' || // ditto
        id === 'Brazil/DeNoronha') {
        return DAY_MS * 6;
    }
    return DAY_MS * 19;
}
function GetNamedTimeZoneNextTransition(id, epochNanoseconds) {
    if (id === 'UTC')
        return null; // UTC fast path
    // Optimization: we floor the instant to the previous millisecond boundary
    // so that we can do Number math instead of BigInt math. This assumes that
    // time zone transitions don't happen in the middle of a millisecond.
    const epochMilliseconds = epochNsToMs(epochNanoseconds, 'floor');
    if (epochMilliseconds < BEFORE_FIRST_DST) {
        return GetNamedTimeZoneNextTransition(id, epochMsToNs(BEFORE_FIRST_DST));
    }
    // Optimization: the farthest that we'll look for a next transition is 3 years
    // after the later of epochNanoseconds or the current time. If there are no
    // transitions found before then, we'll assume that there will not be any more
    // transitions after that.
    const now = Date.now();
    const base = Math.max(epochMilliseconds, now);
    const uppercap = base + DAY_MS * 366 * 3;
    let leftMs = epochMilliseconds;
    let leftOffsetNs = GetNamedTimeZoneOffsetNanosecondsImpl(id, leftMs);
    let rightMs = leftMs;
    let rightOffsetNs = leftOffsetNs;
    const searchWindow = searchWindowForTransitions(id);
    while (leftOffsetNs === rightOffsetNs && leftMs < uppercap) {
        rightMs = leftMs + searchWindow;
        if (rightMs > MS_MAX)
            return null;
        rightOffsetNs = GetNamedTimeZoneOffsetNanosecondsImpl(id, rightMs);
        if (leftOffsetNs === rightOffsetNs) {
            leftMs = rightMs;
        }
    }
    if (leftOffsetNs === rightOffsetNs)
        return null;
    const result = bisect((epochMs) => GetNamedTimeZoneOffsetNanosecondsImpl(id, epochMs), leftMs, rightMs, leftOffsetNs, rightOffsetNs);
    return epochMsToNs(result);
}
function GetNamedTimeZonePreviousTransition(id, epochNanoseconds) {
    if (id === 'UTC')
        return null; // UTC fast path
    // Optimization: we raise the instant to the next millisecond boundary so
    // that we can do Number math instead of BigInt math. This assumes that time
    // zone transitions don't happen in the middle of a millisecond.
    const epochMilliseconds = epochNsToMs(epochNanoseconds, 'ceil');
    // Optimization: if the instant is more than 3 years in the future and there
    // are no transitions between the present day and 3 years from now, assume
    // there are none after.
    const now = Date.now();
    const lookahead = now + DAY_MS * 366 * 3;
    if (epochMilliseconds > lookahead) {
        const prevBeforeLookahead = GetNamedTimeZonePreviousTransition(id, epochMsToNs(lookahead));
        if (prevBeforeLookahead === null || prevBeforeLookahead < epochMsToNs(now)) {
            return prevBeforeLookahead;
        }
    }
    // We assume most time zones either have regular DST rules that extend
    // indefinitely into the future, or they have no DST transitions between now
    // and next year. Africa/Casablanca and Africa/El_Aaiun are unique cases
    // that fit neither of these. Their irregular DST transitions are
    // precomputed until 2087 in the current time zone database, so requesting
    // the previous transition for an instant far in the future may take an
    // extremely long time as it loops backward 2 weeks at a time.
    if (id === 'Africa/Casablanca' || id === 'Africa/El_Aaiun') {
        const lastPrecomputed = Date.UTC(2088, 0, 1); // 2088-01-01T00Z
        if (lastPrecomputed < epochMilliseconds) {
            return GetNamedTimeZonePreviousTransition(id, epochMsToNs(lastPrecomputed));
        }
    }
    let rightMs = epochMilliseconds - 1;
    if (rightMs < BEFORE_FIRST_DST)
        return null;
    let rightOffsetNs = GetNamedTimeZoneOffsetNanosecondsImpl(id, rightMs);
    let leftMs = rightMs;
    let leftOffsetNs = rightOffsetNs;
    const searchWindow = searchWindowForTransitions(id);
    while (rightOffsetNs === leftOffsetNs && rightMs > BEFORE_FIRST_DST) {
        leftMs = rightMs - searchWindow;
        if (leftMs < BEFORE_FIRST_DST)
            return null;
        leftOffsetNs = GetNamedTimeZoneOffsetNanosecondsImpl(id, leftMs);
        if (rightOffsetNs === leftOffsetNs) {
            rightMs = leftMs;
        }
    }
    if (rightOffsetNs === leftOffsetNs)
        return null;
    const result = bisect((epochMs) => GetNamedTimeZoneOffsetNanosecondsImpl(id, epochMs), leftMs, rightMs, leftOffsetNs, rightOffsetNs);
    return epochMsToNs(result);
}
// ts-prune-ignore-next TODO: remove this after tests are converted to TS
function parseFromEnUsFormat(datetime) {
    const splits = datetime.split(/[^\w]+/);
    if (splits.length !== 7) {
        throw new RangeError(`expected 7 parts in "${datetime}`);
    }
    const month = +splits[0];
    const day = +splits[1];
    let year = +splits[2];
    const era = splits[3];
    if (era[0] === 'b' || era[0] === 'B') {
        year = -year + 1;
    }
    else if (era[0] !== 'a' && era[0] !== 'A') {
        throw new RangeError(`Unknown era ${era} in "${datetime}`);
    }
    const hour = splits[4] === '24' ? 0 : +splits[4]; // bugs.chromium.org/p/chromium/issues/detail?id=1045791
    const minute = +splits[5];
    const second = +splits[6];
    if (!Number.isFinite(year) ||
        !Number.isFinite(month) ||
        !Number.isFinite(day) ||
        !Number.isFinite(hour) ||
        !Number.isFinite(minute) ||
        !Number.isFinite(second)) {
        throw new RangeError(`Invalid number in "${datetime}`);
    }
    return { year, month, day, hour, minute, second };
}
// ts-prune-ignore-next TODO: remove this after tests are converted to TS
function GetFormatterParts(timeZone, epochMilliseconds) {
    const formatter = getIntlDateTimeFormatEnUsForTimeZone(timeZone);
    // Using `format` instead of `formatToParts` for compatibility with older
    // clients and because it is twice as fast
    const datetime = formatter.format(epochMilliseconds);
    return parseFromEnUsFormat(datetime);
}
// The goal of this function is to find the exact time(s) that correspond to a
// calendar date and clock time in a particular time zone. Normally there will
// be only one match. But for repeated clock times after backwards transitions
// (like when DST ends) there may be two matches. And for skipped clock times
// after forward transitions, there will be no matches.
function GetNamedTimeZoneEpochNanoseconds(id, isoDateTime) {
    // Get the offset of one day before and after the requested calendar date and
    // clock time, avoiding overflows if near the edge of the Instant range.
    let ns = GetUTCEpochNanoseconds(isoDateTime);
    let nsEarlier = ns - BigInt(DAY_NANOS);
    if (nsEarlier < NS_MIN)
        nsEarlier = ns;
    let nsLater = ns + BigInt(DAY_NANOS);
    if (nsLater > NS_MAX)
        nsLater = ns;
    const earlierOffsetNs = GetNamedTimeZoneOffsetNanoseconds(id, nsEarlier);
    const laterOffsetNs = GetNamedTimeZoneOffsetNanoseconds(id, nsLater);
    // If before and after offsets are the same, then we assume there was no
    // offset transition in between, and therefore only one exact time can
    // correspond to the provided calendar date and clock time. But if they're
    // different, then there was an offset transition in between, so test both
    // offsets to see which one(s) will yield a matching exact time.
    const found = earlierOffsetNs === laterOffsetNs ? [earlierOffsetNs] : [earlierOffsetNs, laterOffsetNs];
    const candidates = found.map((offsetNanoseconds) => {
        const epochNanoseconds = ns - BigInt(offsetNanoseconds);
        const parts = GetNamedTimeZoneDateTimeParts(id, epochNanoseconds);
        if (CompareISODateTime(isoDateTime, parts) !== 0)
            return undefined;
        ValidateEpochNanoseconds(epochNanoseconds);
        return epochNanoseconds;
    });
    return candidates.filter((x) => x !== undefined);
}
function LeapYear(year) {
    if (undefined === year)
        return false;
    const isDiv4 = year % 4 === 0;
    const isDiv100 = year % 100 === 0;
    const isDiv400 = year % 400 === 0;
    return isDiv4 && (!isDiv100 || isDiv400);
}
function ISODaysInMonth(year, month) {
    const DoM = {
        standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    };
    return DoM[LeapYear(year) ? 'leapyear' : 'standard'][month - 1];
}
function DurationSign(duration) {
    const fields = [
        GetSlot(duration, YEARS),
        GetSlot(duration, MONTHS),
        GetSlot(duration, WEEKS),
        GetSlot(duration, DAYS),
        GetSlot(duration, HOURS),
        GetSlot(duration, MINUTES),
        GetSlot(duration, SECONDS),
        GetSlot(duration, MILLISECONDS),
        GetSlot(duration, MICROSECONDS),
        GetSlot(duration, NANOSECONDS)
    ];
    for (let index = 0; index < fields.length; index++) {
        const prop = fields[index];
        if (prop !== 0)
            return prop < 0 ? -1 : 1;
    }
    return 0;
}
function DateDurationSign(dateDuration) {
    const fieldNames = ['years', 'months', 'weeks', 'days'];
    for (let index = 0; index < fieldNames.length; index++) {
        const prop = dateDuration[fieldNames[index]];
        if (prop !== 0)
            return prop < 0 ? -1 : 1;
    }
    return 0;
}
function InternalDurationSign(duration) {
    const dateSign = DateDurationSign(duration.date);
    if (dateSign !== 0)
        return dateSign;
    return duration.time.sign();
}
function BalanceISOYearMonth(yearParam, monthParam) {
    let year = yearParam;
    let month = monthParam;
    if (!Number.isFinite(year) || !Number.isFinite(month))
        throw new RangeError('infinity is out of range');
    month -= 1;
    year += Math.floor(month / 12);
    month %= 12;
    if (month < 0)
        month += 12;
    month += 1;
    return { year, month };
}
function BalanceISODate(yearParam, monthParam, dayParam) {
    let year = yearParam;
    let month = monthParam;
    let day = dayParam;
    if (!Number.isFinite(day))
        throw new RangeError('infinity is out of range');
    ({ year, month } = BalanceISOYearMonth(year, month));
    // The pattern of leap years in the ISO 8601 calendar repeats every 400
    // years. So if we have more than 400 years in days, there's no need to
    // convert days to a year 400 times. We can convert a multiple of 400 all at
    // once.
    const daysIn400YearCycle = 400 * 365 + 97;
    if (Math.abs(day) > daysIn400YearCycle) {
        const nCycles = Math.trunc(day / daysIn400YearCycle);
        year += 400 * nCycles;
        day -= nCycles * daysIn400YearCycle;
    }
    let daysInYear = 0;
    let testYear = month > 2 ? year : year - 1;
    while (((daysInYear = LeapYear(testYear) ? 366 : 365), day < -daysInYear)) {
        year -= 1;
        testYear -= 1;
        day += daysInYear;
    }
    testYear += 1;
    while (((daysInYear = LeapYear(testYear) ? 366 : 365), day > daysInYear)) {
        year += 1;
        testYear += 1;
        day -= daysInYear;
    }
    while (day < 1) {
        ({ year, month } = BalanceISOYearMonth(year, month - 1));
        day += ISODaysInMonth(year, month);
    }
    while (day > ISODaysInMonth(year, month)) {
        day -= ISODaysInMonth(year, month);
        ({ year, month } = BalanceISOYearMonth(year, month + 1));
    }
    return { year, month, day };
}
function BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    const time = BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);
    const isoDate = BalanceISODate(year, month, day + time.deltaDays);
    return CombineISODateAndTimeRecord(isoDate, time);
}
function BalanceTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam) {
    let hour = hourParam;
    let minute = minuteParam;
    let second = secondParam;
    let millisecond = millisecondParam;
    let microsecond = microsecondParam;
    let nanosecond = nanosecondParam;
    let div;
    ({ div, mod: nanosecond } = TruncatingDivModByPowerOf10(nanosecond, 3));
    microsecond += div;
    if (nanosecond < 0) {
        microsecond -= 1;
        nanosecond += 1000;
    }
    ({ div, mod: microsecond } = TruncatingDivModByPowerOf10(microsecond, 3));
    millisecond += div;
    if (microsecond < 0) {
        millisecond -= 1;
        microsecond += 1000;
    }
    second += Math.trunc(millisecond / 1000);
    millisecond %= 1000;
    if (millisecond < 0) {
        second -= 1;
        millisecond += 1000;
    }
    minute += Math.trunc(second / 60);
    second %= 60;
    if (second < 0) {
        minute -= 1;
        second += 60;
    }
    hour += Math.trunc(minute / 60);
    minute %= 60;
    if (minute < 0) {
        hour -= 1;
        minute += 60;
    }
    let deltaDays = Math.trunc(hour / 24);
    hour %= 24;
    if (hour < 0) {
        deltaDays -= 1;
        hour += 24;
    }
    // Results are possibly -0 at this point, but these are mathematical values in
    // the spec. Force -0 to +0.
    deltaDays += 0;
    hour += 0;
    minute += 0;
    second += 0;
    millisecond += 0;
    microsecond += 0;
    nanosecond += 0;
    return { deltaDays, hour, minute, second, millisecond, microsecond, nanosecond };
}
function DateDurationDays(dateDuration, plainRelativeTo) {
    const yearsMonthsWeeksDuration = AdjustDateDurationRecord(dateDuration, 0);
    if (DateDurationSign(yearsMonthsWeeksDuration) === 0)
        return dateDuration.days;
    // balance years, months, and weeks down to days
    const isoDate = GetSlot(plainRelativeTo, ISO_DATE);
    const later = CalendarDateAdd(GetSlot(plainRelativeTo, CALENDAR), isoDate, yearsMonthsWeeksDuration, 'constrain');
    const epochDaysEarlier = ISODateToEpochDays(isoDate.year, isoDate.month - 1, isoDate.day);
    const epochDaysLater = ISODateToEpochDays(later.year, later.month - 1, later.day);
    const yearsMonthsWeeksInDays = epochDaysLater - epochDaysEarlier;
    return dateDuration.days + yearsMonthsWeeksInDays;
}
function CreateNegatedTemporalDuration(duration) {
    const TemporalDuration = GetIntrinsic('%Temporal.Duration%');
    return new TemporalDuration(-GetSlot(duration, YEARS), -GetSlot(duration, MONTHS), -GetSlot(duration, WEEKS), -GetSlot(duration, DAYS), -GetSlot(duration, HOURS), -GetSlot(duration, MINUTES), -GetSlot(duration, SECONDS), -GetSlot(duration, MILLISECONDS), -GetSlot(duration, MICROSECONDS), -GetSlot(duration, NANOSECONDS));
}
function ConstrainToRange(value, min, max) {
    // Math.Max accepts undefined values and returns NaN. Undefined values are
    // used for optional params in the method below.
    return Math.min(max, Math.max(min, value));
}
function ConstrainISODate(year, monthParam, dayParam) {
    const month = ConstrainToRange(monthParam, 1, 12);
    const day = ConstrainToRange(dayParam, 1, ISODaysInMonth(year, month));
    return { year, month, day };
}
function RejectToRange(value, min, max) {
    if (value < min || value > max)
        throw new RangeError(`value out of range: ${min} <= ${value} <= ${max}`);
}
function RejectISODate(year, month, day) {
    RejectToRange(month, 1, 12);
    RejectToRange(day, 1, ISODaysInMonth(year, month));
}
function RejectDateRange(isoDate) {
    // Noon avoids trouble at edges of DateTime range (excludes midnight)
    RejectDateTimeRange(CombineISODateAndTimeRecord(isoDate, NoonTimeRecord()));
}
function RejectTime(hour, minute, second, millisecond, microsecond, nanosecond) {
    RejectToRange(hour, 0, 23);
    RejectToRange(minute, 0, 59);
    RejectToRange(second, 0, 59);
    RejectToRange(millisecond, 0, 999);
    RejectToRange(microsecond, 0, 999);
    RejectToRange(nanosecond, 0, 999);
}
function RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    RejectISODate(year, month, day);
    RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
}
function RejectDateTimeRange(isoDateTime) {
    const ns = GetUTCEpochNanoseconds(isoDateTime);
    if (ns < DATETIME_NS_MIN || ns > DATETIME_NS_MAX) {
        // Because PlainDateTime's range is wider than Instant's range, the line
        // below will always throw. Calling `ValidateEpochNanoseconds` avoids
        // repeating the same error message twice.
        ValidateEpochNanoseconds(ns);
    }
}
// Same as above, but throws a different, non-user-facing error
function AssertISODateTimeWithinLimits(isoDateTime) {
    const ns = GetUTCEpochNanoseconds(isoDateTime);
    let assetError = `${ISODateTimeToString(isoDateTime, 'iso8601', 'auto')} is outside the representable range`;
    if (ns < DATETIME_NS_MIN || ns > DATETIME_NS_MAX) {
        const dtMinStr = CreateTemporalZonedDateTime(DATETIME_NS_MIN, 'UTC', 'iso8601').toString();
        const dtMaxStr = CreateTemporalZonedDateTime(DATETIME_NS_MAX, 'UTC', 'iso8601').toString();
        assetError += ` (${dtMinStr} to ${dtMaxStr})`;
    }
    assert(ns >= DATETIME_NS_MIN && ns <= DATETIME_NS_MAX, assetError);
}
// In the spec, IsValidEpochNanoseconds returns a boolean and call sites are
// responsible for throwing. In the polyfill, ValidateEpochNanoseconds takes its
// place so that we can DRY the throwing code.
function ValidateEpochNanoseconds(epochNanoseconds) {
    if (epochNanoseconds < NS_MIN || epochNanoseconds > NS_MAX) {
        throw new RangeError('date/time value is outside of supported range');
    }
}
function RejectYearMonthRange({ year, month }) {
    RejectToRange(year, YEAR_MIN, YEAR_MAX);
    if (year === YEAR_MIN) {
        RejectToRange(month, 4, 12);
    }
    else if (year === YEAR_MAX) {
        RejectToRange(month, 1, 9);
    }
}
function RejectDuration(y, mon, w, d, h, min, s, ms, µs, ns) {
    let sign = 0;
    const fields = [y, mon, w, d, h, min, s, ms, µs, ns];
    for (let index = 0; index < fields.length; index++) {
        const prop = fields[index];
        if (prop === Infinity || prop === -Infinity)
            throw new RangeError('infinite values not allowed as duration fields');
        if (prop !== 0) {
            const propSign = prop < 0 ? -1 : 1;
            if (sign !== 0 && propSign !== sign)
                throw new RangeError('mixed-sign values not allowed as duration fields');
            sign = propSign;
        }
    }
    if (Math.abs(y) >= 2 ** 32 || Math.abs(mon) >= 2 ** 32 || Math.abs(w) >= 2 ** 32) {
        throw new RangeError('years, months, and weeks must be < 2³²');
    }
    const msResult = TruncatingDivModByPowerOf10(ms, 3);
    const µsResult = TruncatingDivModByPowerOf10(µs, 6);
    const nsResult = TruncatingDivModByPowerOf10(ns, 9);
    const remainderSec = TruncatingDivModByPowerOf10(msResult.mod * 1e6 + µsResult.mod * 1e3 + nsResult.mod, 9).div;
    const totalSec = d * 86400 + h * 3600 + min * 60 + s + msResult.div + µsResult.div + nsResult.div + remainderSec;
    if (!Number.isSafeInteger(totalSec)) {
        throw new RangeError('total of duration time units cannot exceed 9007199254740991.999999999 s');
    }
}
function ToInternalDurationRecord(duration) {
    const date = {
        years: GetSlot(duration, YEARS),
        months: GetSlot(duration, MONTHS),
        weeks: GetSlot(duration, WEEKS),
        days: GetSlot(duration, DAYS)
    };
    const time = TimeDuration.fromComponents(GetSlot(duration, HOURS), GetSlot(duration, MINUTES), GetSlot(duration, SECONDS), GetSlot(duration, MILLISECONDS), GetSlot(duration, MICROSECONDS), GetSlot(duration, NANOSECONDS));
    return { date, time };
}
function ToInternalDurationRecordWith24HourDays(duration) {
    const time = TimeDuration.fromComponents(GetSlot(duration, HOURS), GetSlot(duration, MINUTES), GetSlot(duration, SECONDS), GetSlot(duration, MILLISECONDS), GetSlot(duration, MICROSECONDS), GetSlot(duration, NANOSECONDS)).add24HourDays(GetSlot(duration, DAYS));
    const date = {
        years: GetSlot(duration, YEARS),
        months: GetSlot(duration, MONTHS),
        weeks: GetSlot(duration, WEEKS),
        days: 0
    };
    return { date, time };
}
function ToDateDurationRecordWithoutTime(duration) {
    const internalDuration = ToInternalDurationRecordWith24HourDays(duration);
    const days = Math.trunc(internalDuration.time.sec / 86400);
    RejectDuration(internalDuration.date.years, internalDuration.date.months, internalDuration.date.weeks, days, 0, 0, 0, 0, 0, 0);
    return { ...internalDuration.date, days };
}
function TemporalDurationFromInternal(internalDuration, largestUnit) {
    const sign = internalDuration.time.sign();
    let nanoseconds = internalDuration.time.abs().subsec;
    let microseconds = 0;
    let milliseconds = 0;
    let seconds = internalDuration.time.abs().sec;
    let minutes = 0;
    let hours = 0;
    let days = 0;
    switch (largestUnit) {
        case 'year':
        case 'month':
        case 'week':
        case 'day':
            microseconds = Math.trunc(nanoseconds / 1000);
            nanoseconds %= 1000;
            milliseconds = Math.trunc(microseconds / 1000);
            microseconds %= 1000;
            seconds += Math.trunc(milliseconds / 1000);
            milliseconds %= 1000;
            minutes = Math.trunc(seconds / 60);
            seconds %= 60;
            hours = Math.trunc(minutes / 60);
            minutes %= 60;
            days = Math.trunc(hours / 24);
            hours %= 24;
            break;
        case 'hour':
            microseconds = Math.trunc(nanoseconds / 1000);
            nanoseconds %= 1000;
            milliseconds = Math.trunc(microseconds / 1000);
            microseconds %= 1000;
            seconds += Math.trunc(milliseconds / 1000);
            milliseconds %= 1000;
            minutes = Math.trunc(seconds / 60);
            seconds %= 60;
            hours = Math.trunc(minutes / 60);
            minutes %= 60;
            break;
        case 'minute':
            microseconds = Math.trunc(nanoseconds / 1000);
            nanoseconds %= 1000;
            milliseconds = Math.trunc(microseconds / 1000);
            microseconds %= 1000;
            seconds += Math.trunc(milliseconds / 1000);
            milliseconds %= 1000;
            minutes = Math.trunc(seconds / 60);
            seconds %= 60;
            break;
        case 'second':
            microseconds = Math.trunc(nanoseconds / 1000);
            nanoseconds %= 1000;
            milliseconds = Math.trunc(microseconds / 1000);
            microseconds %= 1000;
            seconds += Math.trunc(milliseconds / 1000);
            milliseconds %= 1000;
            break;
        case 'millisecond':
            microseconds = Math.trunc(nanoseconds / 1000);
            nanoseconds %= 1000;
            milliseconds = FMAPowerOf10(seconds, 3, Math.trunc(microseconds / 1000));
            microseconds %= 1000;
            seconds = 0;
            break;
        case 'microsecond':
            microseconds = FMAPowerOf10(seconds, 6, Math.trunc(nanoseconds / 1000));
            nanoseconds %= 1000;
            seconds = 0;
            break;
        case 'nanosecond':
            nanoseconds = FMAPowerOf10(seconds, 9, nanoseconds);
            seconds = 0;
            break;
        default:
            /* c8 ignore next */ assertNotReached();
    }
    const TemporalDuration = GetIntrinsic('%Temporal.Duration%');
    return new TemporalDuration(internalDuration.date.years, internalDuration.date.months, internalDuration.date.weeks, internalDuration.date.days + sign * days, sign * hours, sign * minutes, sign * seconds, sign * milliseconds, sign * microseconds, sign * nanoseconds);
}
function CombineDateAndTimeDuration(dateDuration, timeDuration) {
    const dateSign = DateDurationSign(dateDuration);
    const timeSign = timeDuration.sign();
    assert(dateSign === 0 || timeSign === 0 || dateSign === timeSign, 'should not be able to create mixed sign duration fields here');
    return { date: dateDuration, time: timeDuration };
}
// Caution: month is 0-based
function ISODateToEpochDays(year, month, day) {
    return (GetUTCEpochMilliseconds({
        isoDate: { year, month: month + 1, day },
        time: { hour: 0, minute: 0, second: 0, millisecond: 0 }
    }) / DAY_MS);
}
// This is needed before calling GetUTCEpochNanoseconds, because it uses MakeDay
// which is ill-defined in how it handles large year numbers. If the issue
// https://github.com/tc39/ecma262/issues/1087 is fixed, this can be removed
// with no observable changes.
function CheckISODaysRange({ year, month, day }) {
    if (Math.abs(ISODateToEpochDays(year, month - 1, day)) > 1e8) {
        throw new RangeError('date/time value is outside the supported range');
    }
}
function DifferenceTime(time1, time2) {
    const hours = time2.hour - time1.hour;
    const minutes = time2.minute - time1.minute;
    const seconds = time2.second - time1.second;
    const milliseconds = time2.millisecond - time1.millisecond;
    const microseconds = time2.microsecond - time1.microsecond;
    const nanoseconds = time2.nanosecond - time1.nanosecond;
    const timeDuration = TimeDuration.fromComponents(hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    assert(timeDuration.abs().sec < 86400, '_bt_.[[Days]] should be 0');
    return timeDuration;
}
function DifferenceInstant(ns1, ns2, increment, smallestUnit, roundingMode) {
    let timeDuration = TimeDuration.fromEpochNsDiff(ns2, ns1);
    timeDuration = RoundTimeDuration(timeDuration, increment, smallestUnit, roundingMode);
    return CombineDateAndTimeDuration(ZeroDateDuration(), timeDuration);
}
function DifferenceISODateTime(isoDateTime1, isoDateTime2, calendar, largestUnit) {
    AssertISODateTimeWithinLimits(isoDateTime1);
    AssertISODateTimeWithinLimits(isoDateTime2);
    let timeDuration = DifferenceTime(isoDateTime1.time, isoDateTime2.time);
    const timeSign = timeDuration.sign();
    const dateSign = CompareISODate(isoDateTime1.isoDate, isoDateTime2.isoDate);
    // back-off a day from date2 so that the signs of the date and time diff match
    let adjustedDate = isoDateTime2.isoDate;
    if (dateSign === timeSign) {
        adjustedDate = BalanceISODate(adjustedDate.year, adjustedDate.month, adjustedDate.day + timeSign);
        timeDuration = timeDuration.add24HourDays(-timeSign);
    }
    const dateLargestUnit = LargerOfTwoTemporalUnits('day', largestUnit);
    const dateDifference = CalendarDateUntil(calendar, isoDateTime1.isoDate, adjustedDate, dateLargestUnit);
    if (largestUnit !== dateLargestUnit) {
        // largestUnit < days, so add the days in to the internal duration
        timeDuration = timeDuration.add24HourDays(dateDifference.days);
        dateDifference.days = 0;
    }
    return CombineDateAndTimeDuration(dateDifference, timeDuration);
}
function DifferenceZonedDateTime(ns1, ns2, timeZone, calendar, largestUnit) {
    const nsDiff = ns2 - ns1;
    if (nsDiff === ZERO)
        return { date: ZeroDateDuration(), time: TimeDuration.ZERO };
    const sign = nsDiff < 0n ? -1 : 1;
    // Convert start/end instants to datetimes
    const isoDtStart = GetISODateTimeFor(timeZone, ns1);
    const isoDtEnd = GetISODateTimeFor(timeZone, ns2);
    // Simulate moving ns1 as many years/months/weeks/days as possible without
    // surpassing ns2. This value is stored in intermediateDateTime/intermediateInstant/intermediateNs.
    // We do not literally move years/months/weeks/days with calendar arithmetic,
    // but rather assume intermediateDateTime will have the same time-parts as
    // dtStart and the date-parts from dtEnd, and move backward from there.
    // The number of days we move backward is stored in dayCorrection.
    // Credit to Adam Shaw for devising this algorithm.
    let dayCorrection = 0;
    let intermediateDateTime;
    // The max number of allowed day corrections depends on the direction of travel.
    // Both directions allow for 1 day correction due to an ISO wall-clock overshoot (see below).
    // Only the forward direction allows for an additional 1 day correction caused by a push-forward
    // 'compatible' DST transition causing the wall-clock to overshoot again.
    // This max value is inclusive.
    let maxDayCorrection = sign === 1 ? 2 : 1;
    // Detect ISO wall-clock overshoot.
    // If the diff of the ISO wall-clock times is opposite to the overall diff's sign,
    // we are guaranteed to need at least one day correction.
    let timeDuration = DifferenceTime(isoDtStart.time, isoDtEnd.time);
    if (timeDuration.sign() === -sign) {
        dayCorrection++;
    }
    for (; dayCorrection <= maxDayCorrection; dayCorrection++) {
        const intermediateDate = BalanceISODate(isoDtEnd.isoDate.year, isoDtEnd.isoDate.month, isoDtEnd.isoDate.day - dayCorrection * sign);
        // Incorporate time parts from dtStart
        intermediateDateTime = CombineISODateAndTimeRecord(intermediateDate, isoDtStart.time);
        // Convert intermediate datetime to epoch-nanoseconds (may disambiguate)
        const intermediateNs = GetEpochNanosecondsFor(timeZone, intermediateDateTime, 'compatible');
        // Compute the nanosecond diff between the intermediate instant and the final destination
        timeDuration = TimeDuration.fromEpochNsDiff(ns2, intermediateNs);
        // Did intermediateNs NOT surpass ns2?
        // If so, exit the loop with success (without incrementing dayCorrection past maxDayCorrection)
        if (timeDuration.sign() !== -sign) {
            break;
        }
    }
    assert(dayCorrection <= maxDayCorrection, `more than ${maxDayCorrection} day correction needed`);
    // Output of the above loop
    assertExists(intermediateDateTime);
    // Similar to what happens in DifferenceISODateTime with date parts only:
    const dateLargestUnit = LargerOfTwoTemporalUnits('day', largestUnit);
    const dateDifference = CalendarDateUntil(calendar, isoDtStart.isoDate, intermediateDateTime.isoDate, dateLargestUnit);
    return CombineDateAndTimeDuration(dateDifference, timeDuration);
}
// Epoch-nanosecond bounding technique where the start/end of the calendar-unit
// interval are converted to epoch-nanosecond times and destEpochNs is nudged to
// either one.
function NudgeToCalendarUnit(sign, durationParam, destEpochNs, isoDateTime, timeZone, calendar, increment, unit, roundingMode) {
    // unit must be day, week, month, or year
    // timeZone may be undefined
    let duration = durationParam;
    // Create a duration with smallestUnit trunc'd towards zero
    // Create a separate duration that incorporates roundingIncrement
    let r1, r2, startDuration, endDuration;
    switch (unit) {
        case 'year': {
            const years = RoundNumberToIncrement(duration.date.years, increment, 'trunc');
            r1 = years;
            r2 = years + increment * sign;
            startDuration = { years: r1, months: 0, weeks: 0, days: 0 };
            endDuration = { ...startDuration, years: r2 };
            break;
        }
        case 'month': {
            const months = RoundNumberToIncrement(duration.date.months, increment, 'trunc');
            r1 = months;
            r2 = months + increment * sign;
            startDuration = AdjustDateDurationRecord(duration.date, 0, 0, r1);
            endDuration = AdjustDateDurationRecord(duration.date, 0, 0, r2);
            break;
        }
        case 'week': {
            const yearsMonths = AdjustDateDurationRecord(duration.date, 0, 0);
            const weeksStart = CalendarDateAdd(calendar, isoDateTime.isoDate, yearsMonths, 'constrain');
            const weeksEnd = BalanceISODate(weeksStart.year, weeksStart.month, weeksStart.day + duration.date.days);
            const untilResult = CalendarDateUntil(calendar, weeksStart, weeksEnd, 'week');
            const weeks = RoundNumberToIncrement(duration.date.weeks + untilResult.weeks, increment, 'trunc');
            r1 = weeks;
            r2 = weeks + increment * sign;
            startDuration = AdjustDateDurationRecord(duration.date, 0, r1);
            endDuration = AdjustDateDurationRecord(duration.date, 0, r2);
            break;
        }
        case 'day': {
            const days = RoundNumberToIncrement(duration.date.days, increment, 'trunc');
            r1 = days;
            r2 = days + increment * sign;
            startDuration = AdjustDateDurationRecord(duration.date, r1);
            endDuration = AdjustDateDurationRecord(duration.date, r2);
            break;
        }
        default:
            /* c8 ignore next */ assertNotReached();
    }
    if (sign === 1)
        assert(r1 >= 0 && r1 < r2, `positive ordering of r1, r2: 0 ≤ ${r1} < ${r2}`);
    if (sign === -1)
        assert(r1 <= 0 && r1 > r2, `negative ordering of r1, r2: 0 ≥ ${r1} > ${r2}`);
    // Apply to origin, output PlainDateTimes
    const start = CalendarDateAdd(calendar, isoDateTime.isoDate, startDuration, 'constrain');
    const end = CalendarDateAdd(calendar, isoDateTime.isoDate, endDuration, 'constrain');
    // Convert to epoch-nanoseconds
    let startEpochNs, endEpochNs;
    const startDateTime = CombineISODateAndTimeRecord(start, isoDateTime.time);
    const endDateTime = CombineISODateAndTimeRecord(end, isoDateTime.time);
    if (timeZone) {
        startEpochNs = GetEpochNanosecondsFor(timeZone, startDateTime, 'compatible');
        endEpochNs = GetEpochNanosecondsFor(timeZone, endDateTime, 'compatible');
    }
    else {
        startEpochNs = GetUTCEpochNanoseconds(startDateTime);
        endEpochNs = GetUTCEpochNanoseconds(endDateTime);
    }
    // Round the smallestUnit within the epoch-nanosecond span
    if (sign === 1) {
        assert(startEpochNs <= destEpochNs && destEpochNs <= endEpochNs, `${unit} was 0 days long`);
    }
    if (sign === -1) {
        assert(endEpochNs <= destEpochNs && destEpochNs <= startEpochNs, `${unit} was 0 days long`);
    }
    assert(endEpochNs !== startEpochNs, 'startEpochNs must ≠ endEpochNs');
    const numerator = TimeDuration.fromEpochNsDiff(destEpochNs, startEpochNs);
    const denominator = TimeDuration.fromEpochNsDiff(endEpochNs, startEpochNs);
    const unsignedRoundingMode = GetUnsignedRoundingMode(roundingMode, sign < 0 ? 'negative' : 'positive');
    const cmp = numerator.add(numerator).abs().subtract(denominator.abs()).sign();
    const even = (Math.abs(r1) / increment) % 2 === 0;
    // prettier-ignore
    const roundedUnit = numerator.isZero()
        ? Math.abs(r1)
        : !numerator.cmp(denominator) // equal?
            ? Math.abs(r2)
            : ApplyUnsignedRoundingMode(Math.abs(r1), Math.abs(r2), cmp, even, unsignedRoundingMode);
    // Trick to minimize rounding error, due to the lack of fma() in JS
    const fakeNumerator = new TimeDuration(BigInt(denominator.totalNs) * BigInt(r1) + BigInt(numerator.totalNs) * BigInt(increment * sign));
    const total = fakeNumerator.fdiv(denominator.totalNs);
    assert(Math.abs(r1) <= Math.abs(total) && Math.abs(total) <= Math.abs(r2), 'r1 ≤ total ≤ r2');
    // Determine whether expanded or contracted
    const didExpandCalendarUnit = roundedUnit === Math.abs(r2);
    duration = { date: didExpandCalendarUnit ? endDuration : startDuration, time: TimeDuration.ZERO };
    const nudgeResult = {
        duration,
        nudgedEpochNs: didExpandCalendarUnit ? endEpochNs : startEpochNs,
        didExpandCalendarUnit
    };
    return { nudgeResult, total };
}
// Attempts rounding of time units within a time zone's day, but if the rounding
// causes time to exceed the total time within the day, rerun rounding in next
// day.
function NudgeToZonedTime(sign, durationParam, isoDateTime, timeZone, calendar, increment, unit, roundingMode) {
    // unit must be hour or smaller
    let duration = durationParam;
    // Apply to origin, output start/end of the day as PlainDateTimes
    const start = CalendarDateAdd(calendar, isoDateTime.isoDate, duration.date, 'constrain');
    const startDateTime = CombineISODateAndTimeRecord(start, isoDateTime.time);
    const endDate = BalanceISODate(start.year, start.month, start.day + sign);
    const endDateTime = CombineISODateAndTimeRecord(endDate, isoDateTime.time);
    // Compute the epoch-nanosecond start/end of the final whole-day interval
    // If duration has negative sign, startEpochNs will be after endEpochNs
    const startEpochNs = GetEpochNanosecondsFor(timeZone, startDateTime, 'compatible');
    const endEpochNs = GetEpochNanosecondsFor(timeZone, endDateTime, 'compatible');
    // The signed amount of time from the start of the whole-day interval to the end
    const daySpan = TimeDuration.fromEpochNsDiff(endEpochNs, startEpochNs);
    if (daySpan.sign() !== sign)
        throw new RangeError('time zone returned inconsistent Instants');
    // Compute time parts of the duration to nanoseconds and round
    // Result could be negative
    const unitIncrement = BigInt(NS_PER_TIME_UNIT[unit] * increment);
    let roundedTimeDuration = duration.time.round(unitIncrement, roundingMode);
    // Does the rounded time exceed the time-in-day?
    const beyondDaySpan = roundedTimeDuration.subtract(daySpan);
    const didRoundBeyondDay = beyondDaySpan.sign() !== -sign;
    let dayDelta, nudgedEpochNs;
    if (didRoundBeyondDay) {
        // If rounded into next day, use the day-end as the local origin and rerun
        // the rounding
        dayDelta = sign;
        roundedTimeDuration = beyondDaySpan.round(unitIncrement, roundingMode);
        nudgedEpochNs = roundedTimeDuration.addToEpochNs(endEpochNs);
    }
    else {
        // Otherwise, if time not rounded beyond day, use the day-start as the local
        // origin
        dayDelta = 0;
        nudgedEpochNs = roundedTimeDuration.addToEpochNs(startEpochNs);
    }
    const dateDuration = AdjustDateDurationRecord(duration.date, duration.date.days + dayDelta);
    const resultDuration = CombineDateAndTimeDuration(dateDuration, roundedTimeDuration);
    return {
        duration: resultDuration,
        nudgedEpochNs,
        didExpandCalendarUnit: didRoundBeyondDay
    };
}
// Converts all fields to nanoseconds and does integer rounding.
function NudgeToDayOrTime(durationParam, destEpochNs, largestUnit, increment, smallestUnit, roundingMode) {
    // unit must be day or smaller
    let duration = durationParam;
    const timeDuration = duration.time.add24HourDays(duration.date.days);
    // Convert to nanoseconds and round
    const roundedTime = timeDuration.round(BigInt(increment * NS_PER_TIME_UNIT[smallestUnit]), roundingMode);
    const diffTime = roundedTime.subtract(timeDuration);
    // Determine if whole days expanded
    const { quotient: wholeDays } = timeDuration.divmod(DAY_NANOS);
    const { quotient: roundedWholeDays } = roundedTime.divmod(DAY_NANOS);
    const didExpandDays = Math.sign(Number(roundedWholeDays - wholeDays)) === timeDuration.sign();
    const nudgedEpochNs = diffTime.addToEpochNs(destEpochNs);
    let days = 0n;
    let remainder = roundedTime;
    if (TemporalUnitCategory(largestUnit) === 'date') {
        days = roundedWholeDays;
        remainder = roundedTime.add(TimeDuration.fromComponents(-Number(roundedWholeDays * 24n), 0, 0, 0, 0, 0));
    }
    const dateDuration = AdjustDateDurationRecord(duration.date, Number(days));
    return {
        duration: { date: dateDuration, time: remainder },
        nudgedEpochNs,
        didExpandCalendarUnit: didExpandDays
    };
}
// Given a potentially bottom-heavy duration, bubble up smaller units to larger
// units. Any units smaller than smallestUnit are already zeroed-out.
function BubbleRelativeDuration(sign, durationParam, nudgedEpochNs, isoDateTime, timeZone, calendar, largestUnit, smallestUnit) {
    // smallestUnit is day or larger
    let duration = durationParam;
    if (smallestUnit === largestUnit)
        return duration;
    // Check to see if nudgedEpochNs has hit the boundary of any units higher than
    // smallestUnit, in which case increment the higher unit and clear smaller
    // units.
    const largestUnitIndex = UNITS_DESCENDING.indexOf(largestUnit);
    const smallestUnitIndex = UNITS_DESCENDING.indexOf(smallestUnit);
    for (let unitIndex = smallestUnitIndex - 1; unitIndex >= largestUnitIndex; unitIndex--) {
        // The only situation where days and smaller bubble-up into weeks is when
        // largestUnit is 'week' (not to be confused with the situation where
        // smallestUnit is 'week', in which case days and smaller are ROUNDED-up
        // into weeks, but that has already happened by the time this function
        // executes)
        // So, if days and smaller are NOT bubbled-up into weeks, and the current
        // unit is weeks, skip.
        const unit = UNITS_DESCENDING[unitIndex];
        if (unit === 'week' && largestUnit !== 'week') {
            continue;
        }
        let endDuration;
        switch (unit) {
            case 'year': {
                const years = duration.date.years + sign;
                endDuration = { years, months: 0, weeks: 0, days: 0 };
                break;
            }
            case 'month': {
                const months = duration.date.months + sign;
                endDuration = AdjustDateDurationRecord(duration.date, 0, 0, months);
                break;
            }
            case 'week': {
                const weeks = duration.date.weeks + sign;
                endDuration = AdjustDateDurationRecord(duration.date, 0, weeks);
                break;
            }
            default:
                /* c8 ignore next */ assertNotReached();
        }
        // Compute end-of-unit in epoch-nanoseconds
        const end = CalendarDateAdd(calendar, isoDateTime.isoDate, endDuration, 'constrain');
        const endDateTime = CombineISODateAndTimeRecord(end, isoDateTime.time);
        let endEpochNs;
        if (timeZone) {
            endEpochNs = GetEpochNanosecondsFor(timeZone, endDateTime, 'compatible');
        }
        else {
            endEpochNs = GetUTCEpochNanoseconds(endDateTime);
        }
        const didExpandToEnd = compare(nudgedEpochNs, endEpochNs) !== -sign;
        // Is nudgedEpochNs at the end-of-unit? This means it should bubble-up to
        // the next highest unit (and possibly further...)
        if (didExpandToEnd) {
            duration = { date: endDuration, time: TimeDuration.ZERO };
        }
        else {
            // NOT at end-of-unit. Stop looking for bubbling
            break;
        }
    }
    return duration;
}
function RoundRelativeDuration(durationParam, destEpochNs, isoDateTime, timeZone, calendar, largestUnitParam, increment, smallestUnit, roundingMode) {
    let duration = durationParam;
    // The duration must already be balanced. This should be achieved by calling
    // one of the non-rounding since/until internal methods prior. It's okay to
    // have a bottom-heavy weeks because weeks don't bubble-up into months. It's
    // okay to have >24 hour day assuming the final day of relativeTo+duration has
    // >24 hours in its timezone. (should automatically end up like this if using
    // non-rounding since/until internal methods prior)
    const irregularLengthUnit = IsCalendarUnit(smallestUnit) || (timeZone && smallestUnit === 'day');
    const sign = InternalDurationSign(duration) < 0 ? -1 : 1;
    let nudgeResult;
    if (irregularLengthUnit) {
        // Rounding an irregular-length unit? Use epoch-nanosecond-bounding technique
        ({ nudgeResult } = NudgeToCalendarUnit(sign, duration, destEpochNs, isoDateTime, timeZone, calendar, increment, smallestUnit, roundingMode));
    }
    else if (timeZone) {
        nudgeResult = NudgeToZonedTime(sign, duration, isoDateTime, timeZone, calendar, increment, smallestUnit, roundingMode);
    }
    else {
        // Rounding uniform-length days/hours/minutes/etc units. Simple nanosecond
        // math. years/months/weeks unchanged
        nudgeResult = NudgeToDayOrTime(duration, destEpochNs, largestUnitParam, increment, smallestUnit, roundingMode);
    }
    duration = nudgeResult.duration;
    // Did nudging cause the duration to expand to the next day or larger?
    // Bubble-up smaller calendar units into higher ones, except for weeks, which
    // don't balance up into months
    if (nudgeResult.didExpandCalendarUnit && smallestUnit !== 'week') {
        duration = BubbleRelativeDuration(sign, duration, nudgeResult.nudgedEpochNs, // The destEpochNs after expanding/contracting
            isoDateTime, timeZone, calendar, largestUnitParam, // where to STOP bubbling
            LargerOfTwoTemporalUnits(smallestUnit, 'day') // where to START bubbling-up from
        );
    }
    return duration;
}
function TotalRelativeDuration(duration, destEpochNs, isoDateTime, timeZone, calendar, unit) {
    // The duration must already be balanced. This should be achieved by calling
    // one of the non-rounding since/until internal methods prior. It's okay to
    // have a bottom-heavy weeks because weeks don't bubble-up into months. It's
    // okay to have >24 hour day assuming the final day of relativeTo+duration has
    // >24 hours in its timezone. (should automatically end up like this if using
    // non-rounding since/until internal methods prior)
    if (IsCalendarUnit(unit) || (timeZone && unit === 'day')) {
        // Rounding an irregular-length unit? Use epoch-nanosecond-bounding technique
        const sign = InternalDurationSign(duration) < 0 ? -1 : 1;
        return NudgeToCalendarUnit(sign, duration, destEpochNs, isoDateTime, timeZone, calendar, 1, unit, 'trunc').total;
    }
    // Rounding uniform-length days/hours/minutes/etc units. Simple nanosecond
    // math. years/months/weeks unchanged
    const timeDuration = duration.time.add24HourDays(duration.date.days);
    return TotalTimeDuration(timeDuration, unit);
}
function DifferencePlainDateTimeWithRounding(isoDateTime1, isoDateTime2, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode) {
    if (CompareISODateTime(isoDateTime1, isoDateTime2) == 0) {
        return { date: ZeroDateDuration(), time: TimeDuration.ZERO };
    }
    RejectDateTimeRange(isoDateTime1);
    RejectDateTimeRange(isoDateTime2);
    const duration = DifferenceISODateTime(isoDateTime1, isoDateTime2, calendar, largestUnit);
    if (smallestUnit === 'nanosecond' && roundingIncrement === 1)
        return duration;
    const destEpochNs = GetUTCEpochNanoseconds(isoDateTime2);
    return RoundRelativeDuration(duration, destEpochNs, isoDateTime1, null, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode);
}
function DifferencePlainDateTimeWithTotal(isoDateTime1, isoDateTime2, calendar, unit) {
    if (CompareISODateTime(isoDateTime1, isoDateTime2) == 0)
        return 0;
    RejectDateTimeRange(isoDateTime1);
    RejectDateTimeRange(isoDateTime2);
    const duration = DifferenceISODateTime(isoDateTime1, isoDateTime2, calendar, unit);
    if (unit === 'nanosecond')
        return duration.time.totalNs;
    const destEpochNs = GetUTCEpochNanoseconds(isoDateTime2);
    return TotalRelativeDuration(duration, destEpochNs, isoDateTime1, null, calendar, unit);
}
function DifferenceZonedDateTimeWithRounding(ns1, ns2, timeZone, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode) {
    if (TemporalUnitCategory(largestUnit) === 'time') {
        // The user is only asking for a time difference, so return difference of instants.
        return DifferenceInstant(ns1, ns2, roundingIncrement, smallestUnit, roundingMode);
    }
    const duration = DifferenceZonedDateTime(ns1, ns2, timeZone, calendar, largestUnit);
    if (smallestUnit === 'nanosecond' && roundingIncrement === 1)
        return duration;
    const dateTime = GetISODateTimeFor(timeZone, ns1);
    return RoundRelativeDuration(duration, ns2, dateTime, timeZone, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode);
}
function DifferenceZonedDateTimeWithTotal(ns1, ns2, timeZone, calendar, unit) {
    if (TemporalUnitCategory(unit) === 'time') {
        // The user is only asking for a time difference, so return difference of instants.
        return TotalTimeDuration(TimeDuration.fromEpochNsDiff(ns2, ns1), unit);
    }
    const duration = DifferenceZonedDateTime(ns1, ns2, timeZone, calendar, unit);
    const dateTime = GetISODateTimeFor(timeZone, ns1);
    return TotalRelativeDuration(duration, ns2, dateTime, timeZone, calendar, unit);
}
function GetDifferenceSettings(op, options, group, disallowed, fallbackSmallest, smallestLargestDefaultUnit) {
    const ALLOWED_UNITS = TEMPORAL_UNITS.reduce((allowed, unitInfo) => {
        const p = unitInfo[0];
        const s = unitInfo[1];
        const c = unitInfo[2];
        if ((group === 'datetime' || c === group) && !disallowed.includes(s)) {
            allowed.push(s, p);
        }
        return allowed;
    }, []);
    let largestUnit = GetTemporalUnitValuedOption(options, 'largestUnit', group, 'auto');
    if (disallowed.includes(largestUnit)) {
        throw new RangeError(`largestUnit must be one of ${ALLOWED_UNITS.join(', ')}, not ${largestUnit}`);
    }
    const roundingIncrement = GetTemporalRoundingIncrementOption(options);
    let roundingMode = GetRoundingModeOption(options, 'trunc');
    if (op === 'since')
        roundingMode = NegateRoundingMode(roundingMode);
    const smallestUnit = GetTemporalUnitValuedOption(options, 'smallestUnit', group, fallbackSmallest);
    if (disallowed.includes(smallestUnit)) {
        throw new RangeError(`smallestUnit must be one of ${ALLOWED_UNITS.join(', ')}, not ${smallestUnit}`);
    }
    const defaultLargestUnit = LargerOfTwoTemporalUnits(smallestLargestDefaultUnit, smallestUnit);
    if (largestUnit === 'auto')
        largestUnit = defaultLargestUnit;
    if (LargerOfTwoTemporalUnits(largestUnit, smallestUnit) !== largestUnit) {
        throw new RangeError(`largestUnit ${largestUnit} cannot be smaller than smallestUnit ${smallestUnit}`);
    }
    const MAX_DIFFERENCE_INCREMENTS = {
        hour: 24,
        minute: 60,
        second: 60,
        millisecond: 1000,
        microsecond: 1000,
        nanosecond: 1000
    };
    const maximum = MAX_DIFFERENCE_INCREMENTS[smallestUnit];
    if (maximum !== undefined)
        ValidateTemporalRoundingIncrement(roundingIncrement, maximum, false);
    return { largestUnit: largestUnit, roundingIncrement, roundingMode, smallestUnit: smallestUnit };
}
function DifferenceTemporalInstant(operation, instant, otherParam, options) {
    const other = ToTemporalInstant(otherParam);
    const resolvedOptions = GetOptionsObject(options);
    const settings = GetDifferenceSettings(operation, resolvedOptions, 'time', [], 'nanosecond', 'second');
    const onens = GetSlot(instant, EPOCHNANOSECONDS);
    const twons = GetSlot(other, EPOCHNANOSECONDS);
    const duration = DifferenceInstant(onens, twons, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    let result = TemporalDurationFromInternal(duration, settings.largestUnit);
    if (operation === 'since')
        result = CreateNegatedTemporalDuration(result);
    return result;
}
function DifferenceTemporalPlainDate(operation, plainDate, otherParam, options) {
    const other = ToTemporalDate(otherParam);
    const calendar = GetSlot(plainDate, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    if (!CalendarEquals(calendar, otherCalendar)) {
        throw new RangeError(`cannot compute difference between dates of ${calendar} and ${otherCalendar} calendars`);
    }
    const resolvedOptions = GetOptionsObject(options);
    const settings = GetDifferenceSettings(operation, resolvedOptions, 'date', [], 'day', 'day');
    const Duration = GetIntrinsic('%Temporal.Duration%');
    const isoDate = GetSlot(plainDate, ISO_DATE);
    const isoOther = GetSlot(other, ISO_DATE);
    if (CompareISODate(isoDate, isoOther) === 0)
        return new Duration();
    const dateDifference = CalendarDateUntil(calendar, isoDate, isoOther, settings.largestUnit);
    let duration = { date: dateDifference, time: TimeDuration.ZERO };
    const roundingIsNoop = settings.smallestUnit === 'day' && settings.roundingIncrement === 1;
    if (!roundingIsNoop) {
        const isoDateTime = CombineISODateAndTimeRecord(isoDate, MidnightTimeRecord());
        const isoDateTimeOther = CombineISODateAndTimeRecord(isoOther, MidnightTimeRecord());
        const destEpochNs = GetUTCEpochNanoseconds(isoDateTimeOther);
        duration = RoundRelativeDuration(duration, destEpochNs, isoDateTime, null, calendar, settings.largestUnit, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    }
    let result = TemporalDurationFromInternal(duration, 'day');
    if (operation === 'since')
        result = CreateNegatedTemporalDuration(result);
    return result;
}
function DifferenceTemporalPlainDateTime(operation, plainDateTime, otherParam, options) {
    const other = ToTemporalDateTime(otherParam);
    const calendar = GetSlot(plainDateTime, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    if (!CalendarEquals(calendar, otherCalendar)) {
        throw new RangeError(`cannot compute difference between dates of ${calendar} and ${otherCalendar} calendars`);
    }
    const resolvedOptions = GetOptionsObject(options);
    const settings = GetDifferenceSettings(operation, resolvedOptions, 'datetime', [], 'nanosecond', 'day');
    const Duration = GetIntrinsic('%Temporal.Duration%');
    const isoDateTime1 = GetSlot(plainDateTime, ISO_DATE_TIME);
    const isoDateTime2 = GetSlot(other, ISO_DATE_TIME);
    if (CompareISODateTime(isoDateTime1, isoDateTime2) === 0)
        return new Duration();
    const duration = DifferencePlainDateTimeWithRounding(isoDateTime1, isoDateTime2, calendar, settings.largestUnit, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    let result = TemporalDurationFromInternal(duration, settings.largestUnit);
    if (operation === 'since')
        result = CreateNegatedTemporalDuration(result);
    return result;
}
function DifferenceTemporalPlainTime(operation, plainTime, otherParam, options) {
    const other = ToTemporalTime(otherParam);
    const resolvedOptions = GetOptionsObject(options);
    const settings = GetDifferenceSettings(operation, resolvedOptions, 'time', [], 'nanosecond', 'hour');
    let timeDuration = DifferenceTime(GetSlot(plainTime, TIME), GetSlot(other, TIME));
    timeDuration = RoundTimeDuration(timeDuration, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    const duration = CombineDateAndTimeDuration(ZeroDateDuration(), timeDuration);
    let result = TemporalDurationFromInternal(duration, settings.largestUnit);
    if (operation === 'since')
        result = CreateNegatedTemporalDuration(result);
    return result;
}
function DifferenceTemporalPlainYearMonth(operation, yearMonth, otherParam, options) {
    const other = ToTemporalYearMonth(otherParam);
    const calendar = GetSlot(yearMonth, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    if (!CalendarEquals(calendar, otherCalendar)) {
        throw new RangeError(`cannot compute difference between months of ${calendar} and ${otherCalendar} calendars`);
    }
    const resolvedOptions = GetOptionsObject(options);
    const settings = GetDifferenceSettings(operation, resolvedOptions, 'date', ['week', 'day'], 'month', 'year');
    const Duration = GetIntrinsic('%Temporal.Duration%');
    if (CompareISODate(GetSlot(yearMonth, ISO_DATE), GetSlot(other, ISO_DATE)) == 0) {
        return new Duration();
    }
    const thisFields = ISODateToFields(calendar, GetSlot(yearMonth, ISO_DATE), 'year-month');
    thisFields.day = 1;
    const thisDate = CalendarDateFromFields(calendar, thisFields, 'constrain');
    const otherFields = ISODateToFields(calendar, GetSlot(other, ISO_DATE), 'year-month');
    otherFields.day = 1;
    const otherDate = CalendarDateFromFields(calendar, otherFields, 'constrain');
    const dateDifference = CalendarDateUntil(calendar, thisDate, otherDate, settings.largestUnit);
    let duration = { date: AdjustDateDurationRecord(dateDifference, 0, 0), time: TimeDuration.ZERO };
    if (settings.smallestUnit !== 'month' || settings.roundingIncrement !== 1) {
        const isoDateTime = CombineISODateAndTimeRecord(thisDate, MidnightTimeRecord());
        const isoDateTimeOther = CombineISODateAndTimeRecord(otherDate, MidnightTimeRecord());
        const destEpochNs = GetUTCEpochNanoseconds(isoDateTimeOther);
        duration = RoundRelativeDuration(duration, destEpochNs, isoDateTime, null, calendar, settings.largestUnit, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    }
    let result = TemporalDurationFromInternal(duration, 'day');
    if (operation === 'since')
        result = CreateNegatedTemporalDuration(result);
    return result;
}
function DifferenceTemporalZonedDateTime(operation, zonedDateTime, otherParam, options) {
    const other = ToTemporalZonedDateTime(otherParam);
    const calendar = GetSlot(zonedDateTime, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    if (!CalendarEquals(calendar, otherCalendar)) {
        throw new RangeError(`cannot compute difference between dates of ${calendar} and ${otherCalendar} calendars`);
    }
    const resolvedOptions = GetOptionsObject(options);
    const settings = GetDifferenceSettings(operation, resolvedOptions, 'datetime', [], 'nanosecond', 'hour');
    const ns1 = GetSlot(zonedDateTime, EPOCHNANOSECONDS);
    const ns2 = GetSlot(other, EPOCHNANOSECONDS);
    const Duration = GetIntrinsic('%Temporal.Duration%');
    let result;
    if (TemporalUnitCategory(settings.largestUnit) !== 'date') {
        // The user is only asking for a time difference, so return difference of instants.
        const duration = DifferenceInstant(ns1, ns2, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
        result = TemporalDurationFromInternal(duration, settings.largestUnit);
    }
    else {
        const timeZone = GetSlot(zonedDateTime, TIME_ZONE);
        if (!TimeZoneEquals(timeZone, GetSlot(other, TIME_ZONE))) {
            throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' " +
                'or smaller because day lengths can vary between time zones due to DST or time zone offset changes.');
        }
        if (ns1 === ns2)
            return new Duration();
        const duration = DifferenceZonedDateTimeWithRounding(ns1, ns2, timeZone, calendar, settings.largestUnit, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
        result = TemporalDurationFromInternal(duration, 'hour');
    }
    if (operation === 'since')
        result = CreateNegatedTemporalDuration(result);
    return result;
}
function AddTime({ hour, minute, second: secondParam, millisecond, microsecond, nanosecond: nanosecondParam }, timeDuration) {
    let second = secondParam;
    let nanosecond = nanosecondParam;
    second += timeDuration.sec;
    nanosecond += timeDuration.subsec;
    return BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);
}
function AddInstant(epochNanoseconds, timeDuration) {
    const result = timeDuration.addToEpochNs(epochNanoseconds);
    ValidateEpochNanoseconds(result);
    return result;
}
function AddZonedDateTime(epochNs, timeZone, calendar, duration, overflow = 'constrain') {
    // If only time is to be added, then use Instant math. It's not OK to fall
    // through to the date/time code below because compatible disambiguation in
    // the PlainDateTime=>Instant conversion will change the offset of any
    // ZonedDateTime in the repeated clock time after a backwards transition.
    // When adding/subtracting time units and not dates, this disambiguation is
    // not expected and so is avoided below via a fast path for time-only
    // arithmetic.
    // BTW, this behavior is similar in spirit to offset: 'prefer' in `with`.
    if (DateDurationSign(duration.date) === 0)
        return AddInstant(epochNs, duration.time);
    // RFC 5545 requires the date portion to be added in calendar days and the
    // time portion to be added in exact time.
    const dt = GetISODateTimeFor(timeZone, epochNs);
    const addedDate = CalendarDateAdd(calendar, dt.isoDate, duration.date, overflow);
    const dtIntermediate = CombineISODateAndTimeRecord(addedDate, dt.time);
    // Note that 'compatible' is used below because this disambiguation behavior
    // is required by RFC 5545.
    const intermediateNs = GetEpochNanosecondsFor(timeZone, dtIntermediate, 'compatible');
    return AddInstant(intermediateNs, duration.time);
}
function AddDurations(operation, duration, otherParam) {
    let other = ToTemporalDuration(otherParam);
    if (operation === 'subtract')
        other = CreateNegatedTemporalDuration(other);
    const largestUnit1 = DefaultTemporalLargestUnit(duration);
    const largestUnit2 = DefaultTemporalLargestUnit(other);
    const largestUnit = LargerOfTwoTemporalUnits(largestUnit1, largestUnit2);
    if (IsCalendarUnit(largestUnit)) {
        throw new RangeError('For years, months, or weeks arithmetic, use date arithmetic relative to a starting point');
    }
    const d1 = ToInternalDurationRecordWith24HourDays(duration);
    const d2 = ToInternalDurationRecordWith24HourDays(other);
    const result = CombineDateAndTimeDuration(ZeroDateDuration(), d1.time.add(d2.time));
    return TemporalDurationFromInternal(result, largestUnit);
}
function AddDurationToInstant(operation, instant, durationLike) {
    let duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract')
        duration = CreateNegatedTemporalDuration(duration);
    const largestUnit = DefaultTemporalLargestUnit(duration);
    if (TemporalUnitCategory(largestUnit) === 'date') {
        throw new RangeError(`Duration field ${largestUnit} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);
    }
    const internalDuration = ToInternalDurationRecordWith24HourDays(duration);
    const ns = AddInstant(GetSlot(instant, EPOCHNANOSECONDS), internalDuration.time);
    return CreateTemporalInstant(ns);
}
function AddDurationToDate(operation, plainDate, durationLike, options) {
    const calendar = GetSlot(plainDate, CALENDAR);
    let duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract')
        duration = CreateNegatedTemporalDuration(duration);
    const dateDuration = ToDateDurationRecordWithoutTime(duration);
    const resolvedOptions = GetOptionsObject(options);
    const overflow = GetTemporalOverflowOption(resolvedOptions);
    const addedDate = CalendarDateAdd(calendar, GetSlot(plainDate, ISO_DATE), dateDuration, overflow);
    return CreateTemporalDate(addedDate, calendar);
}
function AddDurationToDateTime(operation, dateTime, durationLike, options) {
    let duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract')
        duration = CreateNegatedTemporalDuration(duration);
    const resolvedOptions = GetOptionsObject(options);
    const overflow = GetTemporalOverflowOption(resolvedOptions);
    const calendar = GetSlot(dateTime, CALENDAR);
    const internalDuration = ToInternalDurationRecordWith24HourDays(duration);
    // Add the time part
    const isoDateTime = GetSlot(dateTime, ISO_DATE_TIME);
    const timeResult = AddTime(isoDateTime.time, internalDuration.time);
    const dateDuration = AdjustDateDurationRecord(internalDuration.date, timeResult.deltaDays);
    // Delegate the date part addition to the calendar
    RejectDuration(dateDuration.years, dateDuration.months, dateDuration.weeks, dateDuration.days, 0, 0, 0, 0, 0, 0);
    const addedDate = CalendarDateAdd(calendar, isoDateTime.isoDate, dateDuration, overflow);
    const result = CombineISODateAndTimeRecord(addedDate, timeResult);
    return CreateTemporalDateTime(result, calendar);
}
function AddDurationToTime(operation, temporalTime, durationLike) {
    let duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract')
        duration = CreateNegatedTemporalDuration(duration);
    const internalDuration = ToInternalDurationRecordWith24HourDays(duration);
    const { hour, minute, second, millisecond, microsecond, nanosecond } = AddTime(GetSlot(temporalTime, TIME), internalDuration.time);
    const time = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, 'reject');
    return CreateTemporalTime(time);
}
function AddDurationToYearMonth(operation, yearMonth, durationLike, options) {
    let duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract')
        duration = CreateNegatedTemporalDuration(duration);
    const resolvedOptions = GetOptionsObject(options);
    const overflow = GetTemporalOverflowOption(resolvedOptions);
    const sign = DurationSign(duration);
    const calendar = GetSlot(yearMonth, CALENDAR);
    const fields = ISODateToFields(calendar, GetSlot(yearMonth, ISO_DATE), 'year-month');
    fields.day = 1;
    let startDate = CalendarDateFromFields(calendar, fields, 'constrain');
    if (sign < 0) {
        const nextMonth = CalendarDateAdd(calendar, startDate, { months: 1 }, 'constrain');
        startDate = BalanceISODate(nextMonth.year, nextMonth.month, nextMonth.day - 1);
    }
    const durationToAdd = ToDateDurationRecordWithoutTime(duration);
    RejectDateRange(startDate);
    const addedDate = CalendarDateAdd(calendar, startDate, durationToAdd, overflow);
    const addedDateFields = ISODateToFields(calendar, addedDate, 'year-month');
    const isoDate = CalendarYearMonthFromFields(calendar, addedDateFields, overflow);
    return CreateTemporalYearMonth(isoDate, calendar);
}
function AddDurationToZonedDateTime(operation, zonedDateTime, durationLike, options) {
    let duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract')
        duration = CreateNegatedTemporalDuration(duration);
    const resolvedOptions = GetOptionsObject(options);
    const overflow = GetTemporalOverflowOption(resolvedOptions);
    const timeZone = GetSlot(zonedDateTime, TIME_ZONE);
    const calendar = GetSlot(zonedDateTime, CALENDAR);
    const internalDuration = ToInternalDurationRecord(duration);
    const epochNanoseconds = AddZonedDateTime(GetSlot(zonedDateTime, EPOCHNANOSECONDS), timeZone, calendar, internalDuration, overflow);
    return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar);
}
// ts-prune-ignore-next TODO: remove this after tests are converted to TS
function RoundNumberToIncrement(quantity, increment, mode) {
    const quotient = Math.trunc(quantity / increment);
    const remainder = quantity % increment;
    const sign = quantity < 0 ? 'negative' : 'positive';
    const r1 = Math.abs(quotient);
    const r2 = r1 + 1;
    const cmp = ComparisonResult(Math.abs(remainder * 2) - increment);
    const even = r1 % 2 === 0;
    const unsignedRoundingMode = GetUnsignedRoundingMode(mode, sign);
    const rounded = remainder === 0 ? r1 : ApplyUnsignedRoundingMode(r1, r2, cmp, even, unsignedRoundingMode);
    return increment * (sign === 'positive' ? rounded : -rounded);
}
// ts-prune-ignore-next TODO: remove this after tests are converted to TS
function RoundNumberToIncrementAsIfPositive(quantityParam, incrementParam, mode) {
    const quantity = quantityParam;
    const increment = incrementParam;
    const quotient = quantity / increment;
    const remainder = quantity % increment;
    const unsignedRoundingMode = GetUnsignedRoundingMode(mode, 'positive');
    let r1, r2;
    if (quantity < 0) {
        r1 = quotient - ONE;
        r2 = quotient;
    }
    else {
        r1 = quotient;
        r2 = quotient + ONE;
    }
    // Similar to the comparison in RoundNumberToIncrement, but multiplied by an
    // extra sign to make sure we treat it as positive
    const cmp = (compare(abs(remainder * TWO), increment) * (quantity < 0 ? -1 : 1) +
        0);
    const rounded = remainder === ZERO
        ? quotient
        : ApplyUnsignedRoundingMode(r1, r2, cmp, isEven(r1), unsignedRoundingMode);
    return rounded * increment;
}
function RoundTemporalInstant(epochNs, increment, unit, roundingMode) {
    const incrementNs = NS_PER_TIME_UNIT[unit] * increment;
    return RoundNumberToIncrementAsIfPositive(epochNs, BigInt(incrementNs), roundingMode);
}
function RoundISODateTime(isoDateTime, increment, unit, roundingMode) {
    AssertISODateTimeWithinLimits(isoDateTime);
    const { year, month, day } = isoDateTime.isoDate;
    const time = RoundTime(isoDateTime.time, increment, unit, roundingMode);
    const isoDate = BalanceISODate(year, month, day + time.deltaDays);
    return CombineISODateAndTimeRecord(isoDate, time);
}
function RoundTime({ hour, minute, second, millisecond, microsecond, nanosecond }, increment, unit, roundingMode) {
    let quantity;
    switch (unit) {
        case 'day':
        case 'hour':
            quantity = ((((hour * 60 + minute) * 60 + second) * 1000 + millisecond) * 1000 + microsecond) * 1000 + nanosecond;
            break;
        case 'minute':
            quantity = (((minute * 60 + second) * 1000 + millisecond) * 1000 + microsecond) * 1000 + nanosecond;
            break;
        case 'second':
            quantity = ((second * 1000 + millisecond) * 1000 + microsecond) * 1000 + nanosecond;
            break;
        case 'millisecond':
            quantity = (millisecond * 1000 + microsecond) * 1000 + nanosecond;
            break;
        case 'microsecond':
            quantity = microsecond * 1000 + nanosecond;
            break;
        case 'nanosecond':
            quantity = nanosecond;
    }
    const nsPerUnit = NS_PER_TIME_UNIT[unit];
    const result = RoundNumberToIncrement(quantity, nsPerUnit * increment, roundingMode) / nsPerUnit;
    switch (unit) {
        case 'day':
            return { deltaDays: result, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
        case 'hour':
            return BalanceTime(result, 0, 0, 0, 0, 0);
        case 'minute':
            return BalanceTime(hour, result, 0, 0, 0, 0);
        case 'second':
            return BalanceTime(hour, minute, result, 0, 0, 0);
        case 'millisecond':
            return BalanceTime(hour, minute, second, result, 0, 0);
        case 'microsecond':
            return BalanceTime(hour, minute, second, millisecond, result, 0);
        case 'nanosecond':
            return BalanceTime(hour, minute, second, millisecond, microsecond, result);
        default:
            throw new Error(`Invalid unit ${unit}`);
    }
}
function RoundTimeDuration(timeDuration, increment, unit, roundingMode) {
    // unit must be a time unit
    const divisor = NS_PER_TIME_UNIT[unit];
    return timeDuration.round(BigInt(divisor * increment), roundingMode);
}
function TotalTimeDuration(timeDuration, unit) {
    const divisor = NS_PER_TIME_UNIT[unit];
    return timeDuration.fdiv(BigInt(divisor));
}
function CompareISODate(isoDate1, isoDate2) {
    if (isoDate1.year !== isoDate2.year)
        return ComparisonResult(isoDate1.year - isoDate2.year);
    if (isoDate1.month !== isoDate2.month)
        return ComparisonResult(isoDate1.month - isoDate2.month);
    if (isoDate1.day !== isoDate2.day)
        return ComparisonResult(isoDate1.day - isoDate2.day);
    return 0;
}
function CompareTimeRecord(time1, time2) {
    if (time1.hour !== time2.hour)
        return ComparisonResult(time1.hour - time2.hour);
    if (time1.minute !== time2.minute)
        return ComparisonResult(time1.minute - time2.minute);
    if (time1.second !== time2.second)
        return ComparisonResult(time1.second - time2.second);
    if (time1.millisecond !== time2.millisecond)
        return ComparisonResult(time1.millisecond - time2.millisecond);
    if (time1.microsecond !== time2.microsecond)
        return ComparisonResult(time1.microsecond - time2.microsecond);
    if (time1.nanosecond !== time2.nanosecond)
        return ComparisonResult(time1.nanosecond - time2.nanosecond);
    return 0;
}
function CompareISODateTime(isoDateTime1, isoDateTime2) {
    const dateResult = CompareISODate(isoDateTime1.isoDate, isoDateTime2.isoDate);
    if (dateResult !== 0)
        return dateResult;
    return CompareTimeRecord(isoDateTime1.time, isoDateTime2.time);
}
function ToBigIntExternal(arg) {
    const jsbiBI = BigInt(arg);
    if (typeof globalThis.BigInt !== 'undefined')
        return globalThis.BigInt(jsbiBI.toString(10));
    return jsbiBI;
}
// rounding modes supported: floor, ceil, trunc
function epochNsToMs(epochNanosecondsParam, mode) {
    const epochNanoseconds = epochNanosecondsParam;
    const { quotient, remainder } = divmod(epochNanoseconds, MILLION);
    let epochMilliseconds = ToNumber(quotient);
    if (mode === 'floor' && remainder < 0)
        epochMilliseconds -= 1;
    if (mode === 'ceil' && remainder > 0)
        epochMilliseconds += 1;
    return epochMilliseconds;
}
function epochMsToNs(epochMilliseconds) {
    if (!Number.isInteger(epochMilliseconds))
        throw new RangeError('epoch milliseconds must be an integer');
    return BigInt(epochMilliseconds) * MILLION;
}
// Note: This method returns values with bogus nanoseconds based on the previous iteration's
// milliseconds. That way there is a guarantee that the full nanoseconds are always going to be
// increasing at least and that the microsecond and nanosecond fields are likely to be non-zero.
const SystemUTCEpochNanoSeconds = (() => {
    let ns = BigInt(Date.now() % 1e6);
    return () => {
        const now = Date.now();
        const ms = BigInt(now);
        const result = epochMsToNs(now) + ns;
        ns = ms % MILLION;
        if (result > NS_MAX)
            return NS_MAX;
        if (result < NS_MIN)
            return NS_MIN;
        return result;
    };
})();
function DefaultTimeZone() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function ComparisonResult(value) {
    return value < 0 ? -1 : value > 0 ? 1 : value;
}
function GetOptionsObject(options) {
    if (options === undefined)
        return Object.create(null);
    if (IsObject(options) && options !== null)
        return options;
    throw new TypeError(`Options parameter must be an object, not ${options === null ? 'null' : `${typeof options}`}`);
}
function CreateOnePropObject(propName, propValue) {
    const o = Object.create(null);
    o[propName] = propValue;
    return o;
}
function GetOption(options, property, allowedValues, fallback) {
    let value = options[property];
    if (value !== undefined) {
        value = ToString(value);
        if (!allowedValues.includes(value)) {
            throw new RangeError(`${property} must be one of ${allowedValues.join(', ')}, not ${value}`);
        }
        return value;
    }
    if (fallback === REQUIRED)
        throw new RangeError(`${property} option is required`);
    return fallback;
}
// This is a temporary implementation. Ideally we'd rely on Intl.DateTimeFormat
// here, to provide the latest CLDR alias data, when implementations catch up to
// the ECMA-402 change. The aliases below are taken from
// https://github.com/unicode-org/cldr/blob/main/common/bcp47/calendar.xml
function CanonicalizeCalendar(idParam) {
    const id = ASCIILowercase(idParam);
    if (!BUILTIN_CALENDAR_IDS.includes(ASCIILowercase(id))) {
        throw new RangeError(`invalid calendar identifier ${id}`);
    }
    switch (id) {
        case 'ethiopic-amete-alem':
            // May need to be removed in the future.
            // See https://github.com/tc39/ecma402/issues/285
            return 'ethioaa';
        // case 'gregorian':
        // (Skip 'gregorian'. It isn't a valid identifier as it's a single
        // subcomponent longer than 8 letters. It can only be used with the old
        // @key=value syntax.)
        case 'islamicc':
            return 'islamic-civil';
    }
    return id;
}
function ASCIILowercase(str) {
    // The spec defines this operation distinct from String.prototype.lowercase,
    // so we'll follow the spec here. Note that nasty security issues that can
    // happen for some use cases if you're comparing case-modified non-ASCII
    // values. For example, Turkish's "I" character was the source of a security
    // issue involving "file://" URLs. See
    // https://haacked.com/archive/2012/07/05/turkish-i-problem-and-why-you-should-care.aspx/.
    let lowercase = '';
    for (let ix = 0; ix < str.length; ix++) {
        const code = str.charCodeAt(ix);
        if (code >= 0x41 && code <= 0x5a) {
            lowercase += String.fromCharCode(code + 0x20);
        }
        else {
            lowercase += String.fromCharCode(code);
        }
    }
    return lowercase;
}
// This function isn't in the spec, but we put it in the polyfill to avoid
// repeating the same (long) error message in many files.
function ValueOfThrows(constructorName) {
    const compareCode = constructorName === 'PlainMonthDay'
        ? 'Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))'
        : `Temporal.${constructorName}.compare(obj1, obj2)`;
    throw new TypeError('Do not use built-in arithmetic operators with Temporal objects. ' +
        `When comparing, use ${compareCode}, not obj1 > obj2. ` +
        "When coercing to strings, use `${obj}` or String(obj), not '' + obj. " +
        'When coercing to numbers, use properties or methods of the object, not `+obj`. ' +
        'When concatenating with strings, use `${str}${obj}` or str.concat(obj), not str + obj. ' +
        'In React, coerce to a string before rendering a Temporal object.');
}
const OFFSET = new RegExp(`^${offset.source}$`);
const OFFSET_WITH_PARTS = new RegExp(`^${offsetWithParts.source}$`);
function bisect(getState, leftParam, rightParam, lstateParam = getState(leftParam), rstateParam = getState(rightParam)) {
    let left = leftParam;
    let right = rightParam;
    let lstate = lstateParam;
    let rstate = rstateParam;
    while (right - left > 1) {
        let middle = Math.trunc((left + right) / 2);
        const mstate = getState(middle);
        if (mstate === lstate) {
            left = middle;
            lstate = mstate;
        }
        else if (mstate === rstate) {
            right = middle;
            rstate = mstate;
        }
        else {
            /* c8 ignore next */ assertNotReached(`invalid state in bisection ${lstate} - ${mstate} - ${rstate}`);
        }
    }
    return right;
}

function arrayFromSet(src) {
    return [...src];
}
function calendarDateWeekOfYear(id, isoDate) {
    // Supports only ISO8601 calendar; can be updated to add support for other calendars.
    // Returns undefined for calendars without a well-defined week calendar system.
    // eslint-disable-next-line max-len
    // Also see: https://github.com/unicode-org/icu/blob/ab72ab1d4a3c3f9beeb7d92b0c7817ca93dfdb04/icu4c/source/i18n/calendar.cpp#L1606
    if (id !== 'iso8601')
        return undefined;
    const calendar = impl[id];
    let yow = isoDate.year;
    const { dayOfWeek, dayOfYear, daysInYear } = calendar.isoToDate(isoDate, {
        dayOfWeek: true,
        dayOfYear: true,
        daysInYear: true
    });
    const fdow = calendar.getFirstDayOfWeek();
    const mdow = calendar.getMinimalDaysInFirstWeek();
    // For both the input date and the first day of its calendar year, calculate the day of week
    // relative to first day of week in the relevant calendar (e.g., in iso8601, relative to Monday).
    let relDow = (dayOfWeek + 7 - fdow) % 7;
    // Assuming the year length is less than 7000 days.
    let relDowJan1 = (dayOfWeek - dayOfYear + 7001 - fdow) % 7;
    let woy = Math.floor((dayOfYear - 1 + relDowJan1) / 7);
    if (7 - relDowJan1 >= mdow) {
        ++woy;
    }
    // Adjust for weeks at the year end that overlap into the previous or next calendar year.
    if (woy == 0) {
        // Check for last week of previous year; if true, handle the case for
        // first week of next year
        const prevYearCalendar = calendar.isoToDate(calendar.dateAdd(isoDate, { years: -1 }, 'constrain'), {
            daysInYear: true
        });
        let prevDoy = dayOfYear + prevYearCalendar.daysInYear;
        woy = weekNumber(fdow, mdow, prevDoy, dayOfWeek);
        yow--;
    }
    else {
        // For it to be week 1 of the next year, dayOfYear must be >= lastDoy - 5
        //          L-5                  L
        // doy: 359 360 361 362 363 364 365 001
        // dow:      1   2   3   4   5   6   7
        let lastDoy = daysInYear;
        if (dayOfYear >= lastDoy - 5) {
            let lastRelDow = (relDow + lastDoy - dayOfYear) % 7;
            if (lastRelDow < 0) {
                lastRelDow += 7;
            }
            if (6 - lastRelDow >= mdow && dayOfYear + 7 - relDow > lastDoy) {
                woy = 1;
                yow++;
            }
        }
    }
    return { week: woy, year: yow };
}
function ISODateSurpasses(sign, y1, m1, d1, isoDate2) {
    if (y1 !== isoDate2.year) {
        if (sign * (y1 - isoDate2.year) > 0)
            return true;
    }
    else if (m1 !== isoDate2.month) {
        if (sign * (m1 - isoDate2.month) > 0)
            return true;
    }
    else if (d1 !== isoDate2.day) {
        if (sign * (d1 - isoDate2.day) > 0)
            return true;
    }
    return false;
}
/**
 * Implementations for each calendar.
 * Registration for each of these calendars happens throughout this file. The ISO and non-ISO calendars are registered
 * separately - look for 'iso8601' for the ISO calendar registration, and all non-ISO calendar registrations happens
 * at the bottom of the file.
 */
const impl = {};
/**
 * Implementation for the ISO 8601 calendar. This is the only calendar that's
 * guaranteed to be supported by all ECMAScript implementations, including those
 * without Intl (ECMA-402) support.
 */
impl['iso8601'] = {
    resolveFields(fields, type) {
        if ((type === 'date' || type === 'year-month') && fields.year === undefined) {
            throw new TypeError('year is required');
        }
        if ((type === 'date' || type === 'month-day') && fields.day === undefined) {
            throw new TypeError('day is required');
        }
        Object.assign(fields, resolveNonLunisolarMonth(fields));
    },
    dateToISO(fields, overflow) {
        return RegulateISODate(fields.year, fields.month, fields.day, overflow);
    },
    monthDayToISOReferenceDate(fields, overflow) {
        const referenceISOYear = 1972;
        const { month, day } = RegulateISODate(fields.year ?? referenceISOYear, fields.month, fields.day, overflow);
        return { month, day, year: referenceISOYear };
    },
    extraFields() {
        return [];
    },
    fieldKeysToIgnore(keys) {
        const result = new Set();
        for (let ix = 0; ix < keys.length; ix++) {
            const key = keys[ix];
            result.add(key);
            if (key === 'month') {
                result.add('monthCode');
            }
            else if (key === 'monthCode') {
                result.add('month');
            }
        }
        return arrayFromSet(result);
    },
    dateAdd(isoDate, { years = 0, months = 0, weeks = 0, days = 0 }, overflow) {
        let { year, month, day } = isoDate;
        year += years;
        month += months;
        ({ year, month } = BalanceISOYearMonth(year, month));
        ({ year, month, day } = RegulateISODate(year, month, day, overflow));
        day += days + 7 * weeks;
        return BalanceISODate(year, month, day);
    },
    dateUntil(one, two, largestUnit) {
        const sign = -CompareISODate(one, two);
        if (sign === 0)
            return { years: 0, months: 0, weeks: 0, days: 0 };
        let years = 0;
        let months = 0;
        let intermediate;
        if (largestUnit === 'year' || largestUnit === 'month') {
            // We can skip right to the neighbourhood of the correct number of years,
            // it'll be at least one less than two.year - one.year (unless it's zero)
            let candidateYears = two.year - one.year;
            if (candidateYears !== 0)
                candidateYears -= sign;
            // loops at most twice
            while (!ISODateSurpasses(sign, one.year + candidateYears, one.month, one.day, two)) {
                years = candidateYears;
                candidateYears += sign;
            }
            let candidateMonths = sign;
            intermediate = BalanceISOYearMonth(one.year + years, one.month + candidateMonths);
            // loops at most 12 times
            while (!ISODateSurpasses(sign, intermediate.year, intermediate.month, one.day, two)) {
                months = candidateMonths;
                candidateMonths += sign;
                intermediate = BalanceISOYearMonth(intermediate.year, intermediate.month + sign);
            }
            if (largestUnit === 'month') {
                months += years * 12;
                years = 0;
            }
        }
        intermediate = BalanceISOYearMonth(one.year + years, one.month + months);
        const constrained = ConstrainISODate(intermediate.year, intermediate.month, one.day);
        let weeks = 0;
        let days = ISODateToEpochDays(two.year, two.month - 1, two.day) -
            ISODateToEpochDays(constrained.year, constrained.month - 1, constrained.day);
        if (largestUnit === 'week') {
            weeks = Math.trunc(days / 7);
            days %= 7;
        }
        return { years, months, weeks, days };
    },
    isoToDate({ year, month, day }, requestedFields) {
        // requestedFields parameter is not part of the spec text. It's an
        // illustration of one way implementations may choose to optimize this
        // operation.
        const date = {
            era: undefined,
            eraYear: undefined,
            year,
            month,
            day,
            daysInWeek: 7,
            monthsInYear: 12
        };
        if (requestedFields.monthCode)
            date.monthCode = buildMonthCode(month);
        if (requestedFields.dayOfWeek) {
            // https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Disparate_variation
            const shiftedMonth = month + (month < 3 ? 10 : -2);
            const shiftedYear = year - (month < 3 ? 1 : 0);
            const century = Math.floor(shiftedYear / 100);
            const yearInCentury = shiftedYear - century * 100;
            const monthTerm = Math.floor(2.6 * shiftedMonth - 0.2);
            const yearTerm = yearInCentury + Math.floor(yearInCentury / 4);
            const centuryTerm = Math.floor(century / 4) - 2 * century;
            const dow = (day + monthTerm + yearTerm + centuryTerm) % 7;
            date.dayOfWeek = dow + (dow <= 0 ? 7 : 0);
        }
        if (requestedFields.dayOfYear) {
            let days = day;
            for (let m = month - 1; m > 0; m--) {
                days += ISODaysInMonth(year, m);
            }
            date.dayOfYear = days;
        }
        if (requestedFields.weekOfYear)
            date.weekOfYear = calendarDateWeekOfYear('iso8601', { year, month, day });
        if (requestedFields.daysInMonth)
            date.daysInMonth = ISODaysInMonth(year, month);
        if (requestedFields.daysInYear || requestedFields.inLeapYear) {
            date.inLeapYear = LeapYear(year);
            date.daysInYear = date.inLeapYear ? 366 : 365;
        }
        return date;
    },
    getFirstDayOfWeek() {
        return 1;
    },
    getMinimalDaysInFirstWeek() {
        return 4;
    }
};
function nonLeapMonthCodeNumberPart(monthCode) {
    if (!monthCode.startsWith('M')) {
        throw new RangeError(`Invalid month code: ${monthCode}.  Month codes must start with M.`);
    }
    const month = +monthCode.slice(1);
    if (Number.isNaN(month))
        throw new RangeError(`Invalid month code: ${monthCode}`);
    return month;
}
function buildMonthCode(month, leap = false) {
    const digitPart = `${month}`.padStart(2, '0');
    const leapMarker = leap ? 'L' : '';
    return `M${digitPart}${leapMarker}`;
}
/**
 * Safely merge a month, monthCode pair into an integer month.
 * If both are present, make sure they match.
 * This logic doesn't work for lunisolar calendars!
 * */
function resolveNonLunisolarMonth(calendarDate, overflow = undefined, monthsPerYear = 12) {
    let { month, monthCode } = calendarDate;
    if (monthCode === undefined) {
        if (month === undefined)
            throw new TypeError('Either month or monthCode are required');
        // The ISO calendar uses the default (undefined) value because it does
        // constrain/reject after this method returns. Non-ISO calendars, however,
        // rely on this function to constrain/reject out-of-range `month` values.
        if (overflow === 'reject')
            RejectToRange(month, 1, monthsPerYear);
        if (overflow === 'constrain')
            month = ConstrainToRange(month, 1, monthsPerYear);
        monthCode = buildMonthCode(month);
    }
    else {
        const numberPart = nonLeapMonthCodeNumberPart(monthCode);
        if (monthCode !== buildMonthCode(numberPart)) {
            throw new RangeError(`Invalid month code: ${monthCode}`);
        }
        if (month !== undefined && month !== numberPart) {
            throw new RangeError(`monthCode ${monthCode} and month ${month} must match if both are present`);
        }
        month = numberPart;
        if (month < 1 || month > monthsPerYear)
            throw new RangeError(`Invalid monthCode: ${monthCode}`);
    }
    return { ...calendarDate, month, monthCode };
}
function weekNumber(firstDayOfWeek, minimalDaysInFirstWeek, desiredDay, dayOfWeek) {
    let periodStartDayOfWeek = (dayOfWeek - firstDayOfWeek - desiredDay + 1) % 7;
    if (periodStartDayOfWeek < 0)
        periodStartDayOfWeek += 7;
    let weekNo = Math.floor((desiredDay + periodStartDayOfWeek - 1) / 7);
    if (7 - periodStartDayOfWeek >= minimalDaysInFirstWeek) {
        ++weekNo;
    }
    return weekNo;
}
/**
 * This prototype implementation of non-ISO calendars makes many repeated calls
 * to Intl APIs which may be slow (e.g. >0.2ms). This trivial cache will speed
 * up these repeat accesses. Each cache instance is associated (via a WeakMap)
 * to a specific Temporal object, which speeds up multiple calendar calls on the
 * same Temporal object instance.  No invalidation or pruning is necessary
 * because each object's cache is thrown away when the object is GC-ed.
 */
class OneObjectCache {
    // static monotonicTimestamp() {
    //   return performance?.now() ?? Date.now();
    // }
    constructor(cacheToClone) {
        this.map = new Map();
        this.calls = 0;
        // now = OneObjectCache.monotonicTimestamp();
        this.hits = 0;
        this.misses = 0;
        if (cacheToClone !== undefined) {
            let i = 0;
            for (const entry of cacheToClone.map.entries()) {
                if (++i > OneObjectCache.MAX_CACHE_ENTRIES)
                    break;
                this.map.set(...entry);
            }
        }
    }
    get(key) {
        const result = this.map.get(key);
        if (result) {
            this.hits++;
            this.report();
        }
        this.calls++;
        return result;
    }
    set(key, value) {
        this.map.set(key, value);
        this.misses++;
        this.report();
    }
    report() {
        // if (this.calls === 0) return;
        // const ms = OneObjectCache.monotonicTimestamp() - this.now;
        // const hitRate = ((100 * this.hits) / this.calls).toFixed(0);
        // const t = `${ms.toFixed(2)}ms`;
        // // eslint-disable-next-line no-console
        // console.log(`${this.calls} calls in ${t}. Hits: ${this.hits} (${hitRate}%). Misses: ${this.misses}.`);
    }
    setObject(obj) {
        if (OneObjectCache.objectMap.get(obj))
            throw new RangeError('object already cached');
        OneObjectCache.objectMap.set(obj, this);
        this.report();
    }
    /**
     * Returns a WeakMap-backed cache that's used to store expensive results
     * that are associated with a particular Temporal object instance.
     *
     * @param obj - object to associate with the cache
     */
    static getCacheForObject(obj) {
        let cache = OneObjectCache.objectMap.get(obj);
        if (!cache) {
            cache = new OneObjectCache();
            OneObjectCache.objectMap.set(obj, cache);
        }
        return cache;
    }
}
OneObjectCache.objectMap = new WeakMap();
OneObjectCache.MAX_CACHE_ENTRIES = 1000;
function toUtcIsoDateString({ isoYear, isoMonth, isoDay }) {
    const yearString = ISOYearString(isoYear);
    const monthString = ISODateTimePartString(isoMonth);
    const dayString = ISODateTimePartString(isoDay);
    return `${yearString}-${monthString}-${dayString}T00:00Z`;
}
function simpleDateDiff(one, two) {
    return {
        years: one.year - two.year,
        months: one.month - two.month,
        days: one.day - two.day
    };
}
/**
 * Implementation helper that's common to all non-ISO calendars
 */
class HelperBase {
    constructor() {
        this.eras = [];
        // Override if calendar uses eras
        this.hasEra = false;
        // See https://github.com/tc39/proposal-temporal/issues/1784
        this.erasBeginMidYear = false;
    }
    getFormatter() {
        // `new Intl.DateTimeFormat()` is amazingly slow and chews up RAM. Per
        // https://bugs.chromium.org/p/v8/issues/detail?id=6528#c4, we cache one
        // DateTimeFormat instance per calendar. Caching is lazy so we only pay for
        // calendars that are used. Note that the HelperBase class is extended to
        // create each calendar's implementation before any cache is created, so
        // each calendar gets its own separate cached formatter.
        if (typeof this.formatter === 'undefined') {
            this.formatter = new Intl.DateTimeFormat(`en-US-u-ca-${this.id}`, {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                era: 'short',
                timeZone: 'UTC'
            });
        }
        return this.formatter;
    }
    getCalendarParts(isoString) {
        let dateTimeFormat = this.getFormatter();
        let legacyDate = new Date(isoString);
        // PlainDate's minimum date -271821-04-19 is one day beyond legacy Date's
        // minimum -271821-04-20, because of accommodating all Instants in all time
        // zones. If we have -271821-04-19, instead format -271821-04-20 in a time
        // zone that pushes the result into the previous day. This is a slow path
        // because we create a new Intl.DateTimeFormat.
        if (isoString === '-271821-04-19T00:00Z') {
            const options = dateTimeFormat.resolvedOptions();
            dateTimeFormat = new Intl.DateTimeFormat(options.locale, {
                ...options,
                timeZone: 'Etc/GMT+1'
            });
            legacyDate = new Date('-271821-04-20T00:00Z');
        }
        try {
            return dateTimeFormat.formatToParts(legacyDate);
        }
        catch (e) {
            throw new RangeError(`Invalid ISO date: ${isoString}`);
        }
    }
    isoToCalendarDate(isoDate, cache) {
        const { year: isoYear, month: isoMonth, day: isoDay } = isoDate;
        const key = JSON.stringify({ func: 'isoToCalendarDate', isoYear, isoMonth, isoDay, id: this.id });
        const cached = cache.get(key);
        if (cached)
            return cached;
        const isoString = toUtcIsoDateString({ isoYear, isoMonth, isoDay });
        const parts = this.getCalendarParts(isoString);
        const result = {};
        for (let i = 0; i < parts.length; i++) {
            const { type, value } = parts[i];
            // TODO: remove this type annotation when `relatedYear` gets into TS lib types
            if (type === 'year' || type === 'relatedYear') {
                if (this.hasEra) {
                    result.eraYear = +value;
                }
                else {
                    result.year = +value;
                }
            }
            if (type === 'month') {
                const matches = /^([0-9]*)(.*?)$/.exec(value);
                if (!matches || matches.length != 3 || (!matches[1] && !matches[2])) {
                    throw new RangeError(`Unexpected month: ${value}`);
                }
                // If the month has no numeric part (should only see this for the Hebrew
                // calendar with newer FF / Chromium versions; see
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1751833) then set a
                // placeholder month index of `1` and rely on the derived class to
                // calculate the correct month index from the month name stored in
                // `monthExtra`.
                result.month = matches[1] ? +matches[1] : 1;
                if (result.month < 1) {
                    throw new RangeError(`Invalid month ${value} from ${isoString}[u-ca-${this.id}]` +
                        ' (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)');
                }
                if (result.month > 13) {
                    throw new RangeError(`Invalid month ${value} from ${isoString}[u-ca-${this.id}]` +
                        ' (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)');
                }
                // The ICU formats for the Hebrew calendar no longer support a numeric
                // month format. So we'll rely on the derived class to interpret it.
                // `monthExtra` is also used on the Chinese calendar to handle a suffix
                // "bis" indicating a leap month.
                if (matches[2])
                    result.monthExtra = matches[2];
            }
            if (type === 'day')
                result.day = +value;
            if (this.hasEra && type === 'era' && value != null && value !== '') {
                // The convention for Temporal era values is lowercase, so following
                // that convention in this prototype. Punctuation is removed, accented
                // letters are normalized, and spaces are replaced with dashes.
                // E.g.: "ERA0" => "era0", "Before R.O.C." => "before-roc", "En’ō" => "eno"
                // The call to normalize() and the replacement regex deals with era
                // names that contain non-ASCII characters like Japanese eras. Also
                // ignore extra content in parentheses like JPN era date ranges.
                result.era = value
                    .split(' (')[0]
                    .normalize('NFD')
                    .replace(/[^-0-9 \p{L}]/gu, '')
                    .replace(/ /g, '-')
                    .toLowerCase();
            }
        }
        if (this.hasEra && result.eraYear === undefined) {
            // Node 12 has outdated ICU data that lacks the `relatedYear` field in the
            // output of Intl.DateTimeFormat.formatToParts.
            throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
        }
        // Translate old ICU era codes "ERA0" etc. into canonical era names.
        if (this.hasEra) {
            const replacement = this.eras.find((e) => result.era === e.genericName);
            if (replacement)
                result.era = replacement.code;
        }
        // Translate eras that may be handled differently by Temporal vs. by Intl
        // (e.g. Japanese pre-Meiji eras). See https://github.com/tc39/proposal-temporal/issues/526.
        if (this.reviseIntlEra) {
            const { era, eraYear } = this.reviseIntlEra(result, isoDate);
            result.era = era;
            result.eraYear = eraYear;
        }
        if (this.checkIcuBugs)
            this.checkIcuBugs(isoDate);
        const calendarDate = this.adjustCalendarDate(result, cache, 'constrain', true);
        if (calendarDate.year === undefined)
            throw new RangeError(`Missing year converting ${JSON.stringify(isoDate)}`);
        if (calendarDate.month === undefined) {
            throw new RangeError(`Missing month converting ${JSON.stringify(isoDate)}`);
        }
        if (calendarDate.day === undefined)
            throw new RangeError(`Missing day converting ${JSON.stringify(isoDate)}`);
        cache.set(key, calendarDate);
        // Also cache the reverse mapping
        const cacheReverse = (overflow) => {
            const keyReverse = JSON.stringify({
                func: 'calendarToIsoDate',
                year: calendarDate.year,
                month: calendarDate.month,
                day: calendarDate.day,
                overflow,
                id: this.id
            });
            cache.set(keyReverse, isoDate);
        };
        ['constrain', 'reject'].forEach(cacheReverse);
        return calendarDate;
    }
    validateCalendarDate(calendarDate) {
        const { month, year, day, eraYear, monthCode, monthExtra } = calendarDate;
        // When there's a suffix (e.g. "5bis" for a leap month in Chinese calendar)
        // the derived class must deal with it.
        if (monthExtra !== undefined)
            throw new RangeError('Unexpected `monthExtra` value');
        if (year === undefined && eraYear === undefined)
            throw new TypeError('year or eraYear is required');
        if (month === undefined && monthCode === undefined)
            throw new TypeError('month or monthCode is required');
        if (day === undefined)
            throw new RangeError('Missing day');
        if (monthCode !== undefined) {
            if (typeof monthCode !== 'string') {
                throw new RangeError(`monthCode must be a string, not ${typeof monthCode}`);
            }
            if (!/^M([01]?\d)(L?)$/.test(monthCode)) {
                throw new RangeError(`Invalid monthCode: ${monthCode}`);
            }
        }
        if (this.hasEra) {
            if ((calendarDate['era'] === undefined) !== (calendarDate['eraYear'] === undefined)) {
                throw new TypeError('properties era and eraYear must be provided together');
            }
        }
    }
    /**
     * Allows derived calendars to add additional fields and/or to make
     * adjustments e.g. to set the era based on the date or to revise the month
     * number in lunisolar calendars per
     * https://github.com/tc39/proposal-temporal/issues/1203.
     *
     * The base implementation fills in missing values by assuming the simplest
     * possible calendar:
     * - no eras
     * - non-lunisolar calendar (no leap months)
     * */
    adjustCalendarDate(calendarDateParam, cache = undefined, overflow = 'constrain',
        // This param is only used by derived classes
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fromLegacyDate = false) {
        if (this.calendarType === 'lunisolar')
            throw new RangeError('Override required for lunisolar calendars');
        let calendarDate = calendarDateParam;
        this.validateCalendarDate(calendarDate);
        const largestMonth = this.monthsInYear(calendarDate, cache);
        let { month, monthCode } = calendarDate;
        ({ month, monthCode } = resolveNonLunisolarMonth(calendarDate, overflow, largestMonth));
        return { ...calendarDate, month, monthCode };
    }
    regulateMonthDayNaive(calendarDate, overflow, cache) {
        const largestMonth = this.monthsInYear(calendarDate, cache);
        let { month, day } = calendarDate;
        if (overflow === 'reject') {
            RejectToRange(month, 1, largestMonth);
            RejectToRange(day, 1, this.maximumMonthLength(calendarDate));
        }
        else {
            month = ConstrainToRange(month, 1, largestMonth);
            day = ConstrainToRange(day, 1, this.maximumMonthLength({ ...calendarDate, month }));
        }
        return { ...calendarDate, month, day };
    }
    calendarToIsoDate(dateParam, overflow = 'constrain', cache) {
        const originalDate = dateParam;
        // First, normalize the calendar date to ensure that (year, month, day)
        // are all present, converting monthCode and eraYear if needed.
        let date = this.adjustCalendarDate(dateParam, cache, overflow, false);
        // Fix obviously out-of-bounds values. Values that are valid generally, but
        // not in this particular year, may not be caught here for some calendars.
        // If so, these will be handled lower below.
        date = this.regulateMonthDayNaive(date, overflow, cache);
        const { year, month, day } = date;
        const key = JSON.stringify({ func: 'calendarToIsoDate', year, month, day, overflow, id: this.id });
        let cached = cache.get(key);
        if (cached)
            return cached;
        // If YMD are present in the input but the input has been constrained
        // already, then cache both the original value and the constrained value.
        let keyOriginal;
        if (originalDate.year !== undefined &&
            originalDate.month !== undefined &&
            originalDate.day !== undefined &&
            (originalDate.year !== date.year || originalDate.month !== date.month || originalDate.day !== date.day)) {
            keyOriginal = JSON.stringify({
                func: 'calendarToIsoDate',
                year: originalDate.year,
                month: originalDate.month,
                day: originalDate.day,
                overflow,
                id: this.id
            });
            cached = cache.get(keyOriginal);
            if (cached)
                return cached;
        }
        // First, try to roughly guess the result
        let isoEstimate = this.estimateIsoDate({ year, month, day });
        const calculateSameMonthResult = (diffDays) => {
            // If the estimate is in the same year & month as the target, then we can
            // calculate the result exactly and short-circuit any additional logic.
            // This optimization assumes that months are continuous. It would break if
            // a calendar skipped days, like the Julian->Gregorian switchover. But
            // current ICU calendars only skip days (japanese/roc/buddhist) because of
            // a bug (https://bugs.chromium.org/p/chromium/issues/detail?id=1173158)
            // that's currently worked around by a custom calendarToIsoDate
            // implementation in those calendars. So this optimization should be safe
            // for all ICU calendars.
            let testIsoEstimate = this.addDaysIso(isoEstimate, diffDays);
            if (date.day > this.minimumMonthLength(date)) {
                // There's a chance that the calendar date is out of range. Throw or
                // constrain if so.
                let testCalendarDate = this.isoToCalendarDate(testIsoEstimate, cache);
                while (testCalendarDate.month !== month || testCalendarDate.year !== year) {
                    if (overflow === 'reject') {
                        throw new RangeError(`day ${day} does not exist in month ${month} of year ${year}`);
                    }
                    // Back up a day at a time until we're not hanging over the month end
                    testIsoEstimate = this.addDaysIso(testIsoEstimate, -1);
                    testCalendarDate = this.isoToCalendarDate(testIsoEstimate, cache);
                }
            }
            return testIsoEstimate;
        };
        let sign = 0;
        let roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
        let diff = simpleDateDiff(date, roundtripEstimate);
        if (diff.years !== 0 || diff.months !== 0 || diff.days !== 0) {
            const diffTotalDaysEstimate = diff.years * 365 + diff.months * 30 + diff.days;
            isoEstimate = this.addDaysIso(isoEstimate, diffTotalDaysEstimate);
            roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
            diff = simpleDateDiff(date, roundtripEstimate);
            if (diff.years === 0 && diff.months === 0) {
                isoEstimate = calculateSameMonthResult(diff.days);
            }
            else {
                sign = this.compareCalendarDates(date, roundtripEstimate);
            }
        }
        // If the initial guess is not in the same month, then bisect the
        // distance to the target, starting with 8 days per step.
        let increment = 8;
        while (sign) {
            isoEstimate = this.addDaysIso(isoEstimate, sign * increment);
            const oldRoundtripEstimate = roundtripEstimate;
            roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
            const oldSign = sign;
            sign = this.compareCalendarDates(date, roundtripEstimate);
            if (sign) {
                diff = simpleDateDiff(date, roundtripEstimate);
                if (diff.years === 0 && diff.months === 0) {
                    isoEstimate = calculateSameMonthResult(diff.days);
                    // Signal the loop condition that there's a match.
                    sign = 0;
                }
                else if (oldSign && sign !== oldSign) {
                    if (increment > 1) {
                        // If the estimate overshot the target, try again with a smaller increment
                        // in the reverse direction.
                        increment /= 2;
                    }
                    else {
                        // Increment is 1, and neither the previous estimate nor the new
                        // estimate is correct. The only way that can happen is if the
                        // original date was an invalid value that will be constrained or
                        // rejected here.
                        if (overflow === 'reject') {
                            throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({ ...originalDate })}`);
                        }
                        else {
                            // To constrain, pick the earliest value
                            const order = this.compareCalendarDates(roundtripEstimate, oldRoundtripEstimate);
                            // If current value is larger, then back up to the previous value.
                            if (order > 0)
                                isoEstimate = this.addDaysIso(isoEstimate, -1);
                            sign = 0;
                        }
                    }
                }
            }
        }
        cache.set(key, isoEstimate);
        if (keyOriginal)
            cache.set(keyOriginal, isoEstimate);
        if (date.year === undefined ||
            date.month === undefined ||
            date.day === undefined ||
            date.monthCode === undefined ||
            (this.hasEra && (date.era === undefined || date.eraYear === undefined))) {
            throw new RangeError('Unexpected missing property');
        }
        return isoEstimate;
    }
    compareCalendarDates(date1, date2) {
        if (date1.year !== date2.year)
            return ComparisonResult(date1.year - date2.year);
        if (date1.month !== date2.month)
            return ComparisonResult(date1.month - date2.month);
        if (date1.day !== date2.day)
            return ComparisonResult(date1.day - date2.day);
        return 0;
    }
    /** Ensure that a calendar date actually exists. If not, return the closest earlier date. */
    regulateDate(calendarDate, overflow = 'constrain', cache) {
        const isoDate = this.calendarToIsoDate(calendarDate, overflow, cache);
        return this.isoToCalendarDate(isoDate, cache);
    }
    addDaysIso(isoDate, days) {
        const added = BalanceISODate(isoDate.year, isoDate.month, isoDate.day + days);
        return added;
    }
    addDaysCalendar(calendarDate, days, cache) {
        const isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
        const addedIso = this.addDaysIso(isoDate, days);
        const addedCalendar = this.isoToCalendarDate(addedIso, cache);
        return addedCalendar;
    }
    addMonthsCalendar(calendarDateParam, months, overflow, cache) {
        let calendarDate = calendarDateParam;
        const { day } = calendarDate;
        for (let i = 0, absMonths = Math.abs(months); i < absMonths; i++) {
            const { month } = calendarDate;
            const oldCalendarDate = calendarDate;
            const days = months < 0
                ? -Math.max(day, this.daysInPreviousMonth(calendarDate, cache))
                : this.daysInMonth(calendarDate, cache);
            const isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
            let addedIso = this.addDaysIso(isoDate, days);
            calendarDate = this.isoToCalendarDate(addedIso, cache);
            // Normally, we can advance one month by adding the number of days in the
            // current month. However, if we're at the end of the current month and
            // the next month has fewer days, then we rolled over to the after-next
            // month. Below we detect this condition and back up until we're back in
            // the desired month.
            if (months > 0) {
                const monthsInOldYear = this.monthsInYear(oldCalendarDate, cache);
                while (calendarDate.month - 1 !== month % monthsInOldYear) {
                    addedIso = this.addDaysIso(addedIso, -1);
                    calendarDate = this.isoToCalendarDate(addedIso, cache);
                }
            }
            if (calendarDate.day !== day) {
                // try to retain the original day-of-month, if possible
                calendarDate = this.regulateDate({ ...calendarDate, day }, 'constrain', cache);
            }
        }
        if (overflow === 'reject' && calendarDate.day !== day) {
            throw new RangeError(`Day ${day} does not exist in resulting calendar month`);
        }
        return calendarDate;
    }
    addCalendar(calendarDate, { years = 0, months = 0, weeks = 0, days = 0 }, overflow, cache) {
        const { year, day, monthCode } = calendarDate;
        const addedYears = this.adjustCalendarDate({ year: year + years, monthCode, day }, cache);
        const addedMonths = this.addMonthsCalendar(addedYears, months, overflow, cache);
        const initialDays = days + weeks * 7;
        const addedDays = this.addDaysCalendar(addedMonths, initialDays, cache);
        return addedDays;
    }
    untilCalendar(calendarOne, calendarTwo, largestUnit, cache) {
        let days = 0;
        let weeks = 0;
        let months = 0;
        let years = 0;
        switch (largestUnit) {
            case 'day':
                days = this.calendarDaysUntil(calendarOne, calendarTwo, cache);
                break;
            case 'week': {
                const totalDays = this.calendarDaysUntil(calendarOne, calendarTwo, cache);
                days = totalDays % 7;
                weeks = (totalDays - days) / 7;
                break;
            }
            case 'month':
            case 'year': {
                const sign = this.compareCalendarDates(calendarTwo, calendarOne);
                if (!sign) {
                    return { years: 0, months: 0, weeks: 0, days: 0 };
                }
                const diffYears = calendarTwo.year - calendarOne.year;
                const diffDays = calendarTwo.day - calendarOne.day;
                if (largestUnit === 'year' && diffYears) {
                    let diffInYearSign = 0;
                    if (calendarTwo.monthCode > calendarOne.monthCode)
                        diffInYearSign = 1;
                    if (calendarTwo.monthCode < calendarOne.monthCode)
                        diffInYearSign = -1;
                    if (!diffInYearSign)
                        diffInYearSign = Math.sign(diffDays);
                    const isOneFurtherInYear = diffInYearSign * sign < 0;
                    years = isOneFurtherInYear ? diffYears - sign : diffYears;
                }
                const yearsAdded = years ? this.addCalendar(calendarOne, { years }, 'constrain', cache) : calendarOne;
                // Now we have less than one year remaining. Add one month at a time
                // until we go over the target, then back up one month and calculate
                // remaining days and weeks.
                let current;
                let next = yearsAdded;
                do {
                    months += sign;
                    current = next;
                    next = this.addMonthsCalendar(current, sign, 'constrain', cache);
                    if (next.day !== calendarOne.day) {
                        // In case the day was constrained down, try to un-constrain it
                        next = this.regulateDate({ ...next, day: calendarOne.day }, 'constrain', cache);
                    }
                } while (this.compareCalendarDates(calendarTwo, next) * sign >= 0);
                months -= sign; // correct for loop above which overshoots by 1
                const remainingDays = this.calendarDaysUntil(current, calendarTwo, cache);
                days = remainingDays;
                break;
            }
        }
        return { years, months, weeks, days };
    }
    daysInMonth(calendarDate, cache) {
        // Add enough days to roll over to the next month. One we're in the next
        // month, we can calculate the length of the current month. NOTE: This
        // algorithm assumes that months are continuous. It would break if a
        // calendar skipped days, like the Julian->Gregorian switchover. But current
        // ICU calendars only skip days (japanese/roc/buddhist) because of a bug
        // (https://bugs.chromium.org/p/chromium/issues/detail?id=1173158) that's
        // currently worked around by a custom calendarToIsoDate implementation in
        // those calendars. So this code should be safe for all ICU calendars.
        const { day } = calendarDate;
        const max = this.maximumMonthLength(calendarDate);
        const min = this.minimumMonthLength(calendarDate);
        // easiest case: we already know the month length if min and max are the same.
        if (min === max)
            return min;
        // Add enough days to get into the next month, without skipping it
        const increment = day <= max - min ? max : min;
        const isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
        const addedIsoDate = this.addDaysIso(isoDate, increment);
        const addedCalendarDate = this.isoToCalendarDate(addedIsoDate, cache);
        // Now back up to the last day of the original month
        const endOfMonthIso = this.addDaysIso(addedIsoDate, -addedCalendarDate.day);
        const endOfMonthCalendar = this.isoToCalendarDate(endOfMonthIso, cache);
        return endOfMonthCalendar.day;
    }
    daysInPreviousMonth(calendarDate, cache) {
        const { day, month, year } = calendarDate;
        // Check to see if we already know the month length, and return it if so
        const previousMonthYear = month > 1 ? year : year - 1;
        let previousMonthDate = { year: previousMonthYear, month, day: 1 };
        const previousMonth = month > 1 ? month - 1 : this.monthsInYear(previousMonthDate, cache);
        previousMonthDate = { ...previousMonthDate, month: previousMonth };
        const min = this.minimumMonthLength(previousMonthDate);
        const max = this.maximumMonthLength(previousMonthDate);
        if (min === max)
            return max;
        const isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
        const lastDayOfPreviousMonthIso = this.addDaysIso(isoDate, -day);
        const lastDayOfPreviousMonthCalendar = this.isoToCalendarDate(lastDayOfPreviousMonthIso, cache);
        return lastDayOfPreviousMonthCalendar.day;
    }
    startOfCalendarYear(calendarDate) {
        return { year: calendarDate.year, month: 1, monthCode: 'M01', day: 1 };
    }
    startOfCalendarMonth(calendarDate) {
        return { year: calendarDate.year, month: calendarDate.month, day: 1 };
    }
    calendarDaysUntil(calendarOne, calendarTwo, cache) {
        const oneIso = this.calendarToIsoDate(calendarOne, 'constrain', cache);
        const twoIso = this.calendarToIsoDate(calendarTwo, 'constrain', cache);
        return (ISODateToEpochDays(twoIso.year, twoIso.month - 1, twoIso.day) -
            ISODateToEpochDays(oneIso.year, oneIso.month - 1, oneIso.day));
    }
    // Override this to shortcut the search space if certain month codes only
    // occur long in the past
    monthDaySearchStartYear(monthCode, day) {
        return 1972;
    }
    monthDayFromFields(fields, overflow, cache) {
        let { era, eraYear, year, month, monthCode, day } = fields;
        if (month !== undefined && year === undefined && (!this.hasEra || era === undefined || eraYear === undefined)) {
            throw new TypeError('when month is present, year (or era and eraYear) are required');
        }
        if (monthCode === undefined || year !== undefined || (this.hasEra && eraYear !== undefined)) {
            // Apply overflow behaviour to year/month/day, to get correct monthCode/day
            ({ monthCode, day } = this.isoToCalendarDate(this.calendarToIsoDate(fields, overflow, cache), cache));
        }
        let isoYear, isoMonth, isoDay;
        let closestCalendar, closestIso;
        // Look backwards starting from one of the calendar years spanning ISO year
        // 1972, up to 20 calendar years prior, to find a year that has this month
        // and day. Normal months and days will match immediately, but for leap days
        // and leap months we may have to look for a while. For searches longer than
        // 20 years, override the start date in monthDaySearchStartYear.
        const startDateIso = {
            year: this.monthDaySearchStartYear(monthCode, day),
            month: 12,
            day: 31
        };
        const calendarOfStartDateIso = this.isoToCalendarDate(startDateIso, cache);
        // Note: relies on lexicographical ordering of monthCodes
        const calendarYear = calendarOfStartDateIso.monthCode > monthCode ||
            (calendarOfStartDateIso.monthCode === monthCode && calendarOfStartDateIso.day >= day)
            ? calendarOfStartDateIso.year
            : calendarOfStartDateIso.year - 1;
        for (let i = 0; i < 20; i++) {
            const testCalendarDate = this.adjustCalendarDate({ day, monthCode, year: calendarYear - i }, cache);
            const isoDate = this.calendarToIsoDate(testCalendarDate, 'constrain', cache);
            const roundTripCalendarDate = this.isoToCalendarDate(isoDate, cache);
            ({ year: isoYear, month: isoMonth, day: isoDay } = isoDate);
            if (roundTripCalendarDate.monthCode === monthCode && roundTripCalendarDate.day === day) {
                return { month: isoMonth, day: isoDay, year: isoYear };
            }
            else if (overflow === 'constrain') {
                // If the requested day is never present in any instance of this month
                // code, and the round trip date is an instance of this month code with
                // the most possible days, we are as close as we can get.
                const maxDayForMonthCode = this.maxLengthOfMonthCodeInAnyYear(roundTripCalendarDate.monthCode);
                if (roundTripCalendarDate.monthCode === monthCode &&
                    roundTripCalendarDate.day === maxDayForMonthCode &&
                    day > maxDayForMonthCode) {
                    return { month: isoMonth, day: isoDay, year: isoYear };
                }
                // non-ISO constrain algorithm tries to find the closest date in a matching month
                if (closestCalendar === undefined ||
                    (roundTripCalendarDate.monthCode === closestCalendar.monthCode &&
                        roundTripCalendarDate.day > closestCalendar.day)) {
                    closestCalendar = roundTripCalendarDate;
                    closestIso = isoDate;
                }
            }
        }
        if (overflow === 'constrain' && closestIso !== undefined)
            return closestIso;
        throw new RangeError(`No recent ${this.id} year with monthCode ${monthCode} and day ${day}`);
    }
    getFirstDayOfWeek() {
        return undefined;
    }
    getMinimalDaysInFirstWeek() {
        return undefined;
    }
}
class HebrewHelper extends HelperBase {
    constructor() {
        super(...arguments);
        this.id = 'hebrew';
        this.calendarType = 'lunisolar';
        this.months = {
            Tishri: { leap: 1, regular: 1, monthCode: 'M01', days: 30 },
            Heshvan: { leap: 2, regular: 2, monthCode: 'M02', days: { min: 29, max: 30 } },
            Kislev: { leap: 3, regular: 3, monthCode: 'M03', days: { min: 29, max: 30 } },
            Tevet: { leap: 4, regular: 4, monthCode: 'M04', days: 29 },
            Shevat: { leap: 5, regular: 5, monthCode: 'M05', days: 30 },
            Adar: { leap: undefined, regular: 6, monthCode: 'M06', days: 29 },
            'Adar I': { leap: 6, regular: undefined, monthCode: 'M05L', days: 30 },
            'Adar II': { leap: 7, regular: undefined, monthCode: 'M06', days: 29 },
            Nisan: { leap: 8, regular: 7, monthCode: 'M07', days: 30 },
            Iyar: { leap: 9, regular: 8, monthCode: 'M08', days: 29 },
            Sivan: { leap: 10, regular: 9, monthCode: 'M09', days: 30 },
            Tamuz: { leap: 11, regular: 10, monthCode: 'M10', days: 29 },
            Av: { leap: 12, regular: 11, monthCode: 'M11', days: 30 },
            Elul: { leap: 13, regular: 12, monthCode: 'M12', days: 29 }
        };
    }
    inLeapYear(calendarDate) {
        const { year } = calendarDate;
        // FYI: In addition to adding a month in leap years, the Hebrew calendar
        // also has per-year changes to the number of days of Heshvan and Kislev.
        // Given that these can be calculated by counting the number of days in
        // those months, I assume that these DO NOT need to be exposed as
        // Hebrew-only prototype fields or methods.
        return (7 * year + 1) % 19 < 7;
    }
    monthsInYear(calendarDate) {
        return this.inLeapYear(calendarDate) ? 13 : 12;
    }
    minimumMonthLength(calendarDate) {
        return this.minMaxMonthLength(calendarDate, 'min');
    }
    maximumMonthLength(calendarDate) {
        return this.minMaxMonthLength(calendarDate, 'max');
    }
    minMaxMonthLength(calendarDate, minOrMax) {
        const { month, year } = calendarDate;
        const monthCode = this.getMonthCode(year, month);
        const monthInfo = Object.entries(this.months).find((m) => m[1].monthCode === monthCode);
        if (monthInfo === undefined)
            throw new RangeError(`unmatched Hebrew month: ${month}`);
        const daysInMonth = monthInfo[1].days;
        return typeof daysInMonth === 'number' ? daysInMonth : daysInMonth[minOrMax];
    }
    maxLengthOfMonthCodeInAnyYear(monthCode) {
        return ['M04', 'M06', 'M08', 'M10', 'M12'].includes(monthCode) ? 29 : 30;
    }
    /** Take a guess at what ISO date a particular calendar date corresponds to */
    estimateIsoDate(calendarDate) {
        const { year } = calendarDate;
        return { year: year - 3760, month: 1, day: 1 };
    }
    getMonthCode(year, month) {
        if (this.inLeapYear({ year })) {
            return month === 6 ? buildMonthCode(5, true) : buildMonthCode(month < 6 ? month : month - 1);
        }
        else {
            return buildMonthCode(month);
        }
    }
    adjustCalendarDate(calendarDate, cache, overflow = 'constrain', fromLegacyDate = false) {
        let { year, month, monthCode, day, monthExtra } = calendarDate;
        if (year === undefined)
            throw new TypeError('Missing property: year');
        if (fromLegacyDate) {
            // In Pre Node-14 V8, DateTimeFormat.formatToParts `month: 'numeric'`
            // output returns the numeric equivalent of `month` as a string, meaning
            // that `'6'` in a leap year is Adar I, while `'6'` in a non-leap year
            // means Adar. In this case, `month` will already be correct and no action
            // is needed. However, in Node 14 and later formatToParts returns the name
            // of the Hebrew month (e.g. "Tevet"), so we'll need to look up the
            // correct `month` using the string name as a key.
            if (monthExtra) {
                const monthInfo = this.months[monthExtra];
                if (!monthInfo)
                    throw new RangeError(`Unrecognized month from formatToParts: ${monthExtra}`);
                month = this.inLeapYear({ year }) ? monthInfo.leap : monthInfo.regular;
            }
            // Because we're getting data from legacy Date, then `month` will always be present
            monthCode = this.getMonthCode(year, month);
            return { year, month: month, day, monthCode };
        }
        else {
            // When called without input coming from legacy Date output, simply ensure
            // that all fields are present.
            this.validateCalendarDate(calendarDate);
            if (month === undefined) {
                assertExists(monthCode);
                if (monthCode.endsWith('L')) {
                    if (monthCode !== 'M05L') {
                        throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${monthCode}`);
                    }
                    month = 6;
                    if (!this.inLeapYear({ year })) {
                        if (overflow === 'reject') {
                            throw new RangeError(`Hebrew monthCode M05L is invalid in year ${year} which is not a leap year`);
                        }
                        else {
                            // constrain to same day of next month (Adar)
                            month = 6;
                            monthCode = 'M06';
                        }
                    }
                }
                else {
                    month = nonLeapMonthCodeNumberPart(monthCode);
                    // if leap month is before this one, the month index is one more than the month code
                    if (this.inLeapYear({ year }) && month >= 6)
                        month++;
                    const largestMonth = this.monthsInYear({ year });
                    if (month < 1 || month > largestMonth)
                        throw new RangeError(`Invalid monthCode: ${monthCode}`);
                }
            }
            else {
                if (overflow === 'reject') {
                    RejectToRange(month, 1, this.monthsInYear({ year }));
                    RejectToRange(day, 1, this.maximumMonthLength({ year, month }));
                }
                else {
                    month = ConstrainToRange(month, 1, this.monthsInYear({ year }));
                    day = ConstrainToRange(day, 1, this.maximumMonthLength({ year, month }));
                }
                if (monthCode === undefined) {
                    monthCode = this.getMonthCode(year, month);
                }
                else {
                    const calculatedMonthCode = this.getMonthCode(year, month);
                    if (calculatedMonthCode !== monthCode) {
                        throw new RangeError(`monthCode ${monthCode} doesn't correspond to month ${month} in Hebrew year ${year}`);
                    }
                }
            }
            return { ...calendarDate, day, month, monthCode, year };
        }
    }
}
/**
 * For Temporal purposes, the Islamic calendar is simple because it's always the
 * same 12 months in the same order.
 */
class IslamicBaseHelper extends HelperBase {
    constructor() {
        super(...arguments);
        this.calendarType = 'lunar';
        this.DAYS_PER_ISLAMIC_YEAR = 354 + 11 / 30;
        this.DAYS_PER_ISO_YEAR = 365.2425;
    }
    inLeapYear(calendarDate, cache) {
        const startOfYearCalendar = { year: calendarDate.year, month: 1, monthCode: 'M01', day: 1 };
        const startOfNextYearCalendar = { year: calendarDate.year + 1, month: 1, monthCode: 'M01', day: 1 };
        const result = this.calendarDaysUntil(startOfYearCalendar, startOfNextYearCalendar, cache);
        return result === 355;
    }
    monthsInYear( /* calendarYear, cache */) {
        return 12;
    }
    minimumMonthLength( /* calendarDate */) {
        return 29;
    }
    maximumMonthLength( /* calendarDate */) {
        return 30;
    }
    maxLengthOfMonthCodeInAnyYear( /* monthCode */) {
        return 30;
    }
    estimateIsoDate(calendarDate) {
        const { year } = this.adjustCalendarDate(calendarDate);
        return { year: Math.floor((year * this.DAYS_PER_ISLAMIC_YEAR) / this.DAYS_PER_ISO_YEAR) + 622, month: 1, day: 1 };
    }
}
// There are 6 Islamic calendars with the same implementation in this polyfill.
// They vary only in their ID. They do emit different output from the underlying
// Intl implementation, but our code for each of them is identical.
class IslamicHelper extends IslamicBaseHelper {
    constructor() {
        super(...arguments);
        this.id = 'islamic';
    }
}
class IslamicUmalquraHelper extends IslamicBaseHelper {
    constructor() {
        super(...arguments);
        this.id = 'islamic-umalqura';
    }
}
class IslamicTblaHelper extends IslamicBaseHelper {
    constructor() {
        super(...arguments);
        this.id = 'islamic-tbla';
    }
}
class IslamicCivilHelper extends IslamicBaseHelper {
    constructor() {
        super(...arguments);
        this.id = 'islamic-civil';
    }
}
class IslamicRgsaHelper extends IslamicBaseHelper {
    constructor() {
        super(...arguments);
        this.id = 'islamic-rgsa';
    }
}
class IslamicCcHelper extends IslamicBaseHelper {
    constructor() {
        super(...arguments);
        this.id = 'islamicc';
    }
}
class PersianHelper extends HelperBase {
    constructor() {
        super(...arguments);
        this.id = 'persian';
        this.calendarType = 'solar';
    }
    inLeapYear(calendarDate, cache) {
        // If the last month has 30 days, it's a leap year.
        return this.daysInMonth({ year: calendarDate.year, month: 12, day: 1 }, cache) === 30;
    }
    monthsInYear( /* calendarYear, cache */) {
        return 12;
    }
    minimumMonthLength(calendarDate) {
        const { month } = calendarDate;
        if (month === 12)
            return 29;
        return month <= 6 ? 31 : 30;
    }
    maximumMonthLength(calendarDate) {
        const { month } = calendarDate;
        if (month === 12)
            return 30;
        return month <= 6 ? 31 : 30;
    }
    maxLengthOfMonthCodeInAnyYear(monthCode) {
        const month = nonLeapMonthCodeNumberPart(monthCode);
        return month <= 6 ? 31 : 30;
    }
    estimateIsoDate(calendarDate) {
        const { year } = this.adjustCalendarDate(calendarDate);
        return { year: year + 621, month: 1, day: 1 };
    }
}
class IndianHelper extends HelperBase {
    constructor() {
        super(...arguments);
        this.id = 'indian';
        this.calendarType = 'solar';
        // Indian months always start at the same well-known Gregorian month and
        // day. So this conversion is easy and fast. See
        // https://en.wikipedia.org/wiki/Indian_national_calendar
        this.months = {
            1: { length: 30, month: 3, day: 22, leap: { length: 31, month: 3, day: 21 } },
            2: { length: 31, month: 4, day: 21 },
            3: { length: 31, month: 5, day: 22 },
            4: { length: 31, month: 6, day: 22 },
            5: { length: 31, month: 7, day: 23 },
            6: { length: 31, month: 8, day: 23 },
            7: { length: 30, month: 9, day: 23 },
            8: { length: 30, month: 10, day: 23 },
            9: { length: 30, month: 11, day: 22 },
            10: { length: 30, month: 12, day: 22 },
            11: { length: 30, month: 1, nextYear: true, day: 21 },
            12: { length: 30, month: 2, nextYear: true, day: 20 }
        };
        // https://bugs.chromium.org/p/v8/issues/detail?id=10529 causes Intl's Indian
        // calendar output to fail for all dates before 0001-01-01 ISO.  For example,
        // in Node 12 0000-01-01 is calculated as 6146/12/-583 instead of 10/11/-79 as
        // expected.
        this.vulnerableToBceBug = new Date('0000-01-01T00:00Z').toLocaleDateString('en-US-u-ca-indian', { timeZone: 'UTC' }) !== '10/11/-79 Saka';
    }
    inLeapYear(calendarDate) {
        // From https://en.wikipedia.org/wiki/Indian_national_calendar:
        // Years are counted in the Saka era, which starts its year 0 in the year 78
        // of the Common Era. To determine leap years, add 78 to the Saka year – if
        // the result is a leap year in the Gregorian calendar, then the Saka year
        // is a leap year as well.
        return isGregorianLeapYear(calendarDate.year + 78);
    }
    monthsInYear( /* calendarYear, cache */) {
        return 12;
    }
    minimumMonthLength(calendarDate) {
        return this.getMonthInfo(calendarDate).length;
    }
    maximumMonthLength(calendarDate) {
        return this.getMonthInfo(calendarDate).length;
    }
    maxLengthOfMonthCodeInAnyYear(monthCode) {
        const month = nonLeapMonthCodeNumberPart(monthCode);
        let monthInfo = this.months[month];
        monthInfo = monthInfo.leap ?? monthInfo;
        return monthInfo.length;
    }
    getMonthInfo(calendarDate) {
        const { month } = calendarDate;
        let monthInfo = this.months[month];
        if (monthInfo === undefined)
            throw new RangeError(`Invalid month: ${month}`);
        if (this.inLeapYear(calendarDate) && monthInfo.leap)
            monthInfo = monthInfo.leap;
        return monthInfo;
    }
    estimateIsoDate(calendarDateParam) {
        // FYI, this "estimate" is always the exact ISO date, which makes the Indian
        // calendar fast!
        const calendarDate = this.adjustCalendarDate(calendarDateParam);
        const monthInfo = this.getMonthInfo(calendarDate);
        const isoYear = calendarDate.year + 78 + (monthInfo.nextYear ? 1 : 0);
        const isoMonth = monthInfo.month;
        const isoDay = monthInfo.day;
        const isoDate = BalanceISODate(isoYear, isoMonth, isoDay + calendarDate.day - 1);
        return isoDate;
    }
    checkIcuBugs(isoDate) {
        if (this.vulnerableToBceBug && isoDate.year < 1) {
            throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01` +
                ' (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)');
        }
    }
}
/**
 * This function adds additional metadata that makes it easier to work with
 * eras. Note that it mutates and normalizes the original era objects, which is
 * OK because this is non-observable, internal-only metadata.
 *
 * The result is an array of eras with the shape defined above.
 * */
function adjustEras(erasParam) {
    let eras = erasParam;
    if (eras.length === 0) {
        throw new RangeError('Invalid era data: eras are required');
    }
    if (eras.length === 1 && eras[0].reverseOf) {
        throw new RangeError('Invalid era data: anchor era cannot count years backwards');
    }
    if (eras.length === 1 && !eras[0].code) {
        throw new RangeError('Invalid era data: at least one named era is required');
    }
    if (eras.filter((e) => e.reverseOf != null).length > 1) {
        throw new RangeError('Invalid era data: only one era can count years backwards');
    }
    // Find the "anchor era" which is the era used for (era-less) `year`. Reversed
    // eras can never be anchors. The era without an `anchorEpoch` property is the
    // anchor.
    let anchorEra;
    eras.forEach((e) => {
        if (e.isAnchor || (!e.anchorEpoch && !e.reverseOf)) {
            if (anchorEra)
                throw new RangeError('Invalid era data: cannot have multiple anchor eras');
            anchorEra = e;
            e.anchorEpoch = { year: e.hasYearZero ? 0 : 1 };
        }
        else if (!e.code) {
            throw new RangeError('If era name is blank, it must be the anchor era');
        }
    });
    // If the era name is undefined, then it's an anchor that doesn't interact
    // with eras at all. For example, Japanese `year` is always the same as ISO
    // `year`.  So this "era" is the anchor era but isn't used for era matching.
    // Strip it from the list that's returned.
    eras = eras.filter((e) => e.code);
    eras.forEach((e) => {
        // Some eras are mirror images of another era e.g. B.C. is the reverse of A.D.
        // Replace the string-valued "reverseOf" property with the actual era object
        // that's reversed.
        const { reverseOf } = e;
        if (reverseOf) {
            const reversedEra = eras.find((era) => era.code === reverseOf);
            if (reversedEra === undefined) {
                throw new RangeError(`Invalid era data: unmatched reverseOf era: ${reverseOf}`);
            }
            e.reverseOf = reversedEra; // genericName property added later
            e.anchorEpoch = reversedEra.anchorEpoch;
            e.isoEpoch = reversedEra.isoEpoch;
        }
        if (e.anchorEpoch.month === undefined)
            e.anchorEpoch.month = 1;
        if (e.anchorEpoch.day === undefined)
            e.anchorEpoch.day = 1;
    });
    // Ensure that the latest epoch is first in the array. This lets us try to
    // match eras in index order, with the last era getting the remaining older
    // years. Any reverse-signed era must be at the end.
    eras.sort((e1, e2) => {
        if (e1.reverseOf)
            return 1;
        if (e2.reverseOf)
            return -1;
        if (!e1.isoEpoch || !e2.isoEpoch)
            throw new RangeError('Invalid era data: missing ISO epoch');
        return e2.isoEpoch.year - e1.isoEpoch.year;
    });
    // If there's a reversed era, then the one before it must be the era that's
    // being reversed.
    const lastEraReversed = eras[eras.length - 1].reverseOf;
    if (lastEraReversed) {
        if (lastEraReversed !== eras[eras.length - 2]) {
            throw new RangeError('Invalid era data: invalid reverse-sign era');
        }
    }
    // Finally, add a "genericName" property in the format "era{n} where `n` is
    // zero-based index, with the oldest era being zero. This format is used by
    // older versions of ICU data.
    eras.forEach((e, i) => {
        e.genericName = `era${eras.length - 1 - i}`;
    });
    return { eras: eras, anchorEra: (anchorEra || eras[0]) };
}
function isGregorianLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
/** Base for all Gregorian-like calendars. */
class GregorianBaseHelperFixedEpoch extends HelperBase {
    constructor(id, isoEpoch) {
        super();
        this.calendarType = 'solar';
        this.id = id;
        this.isoEpoch = isoEpoch;
    }
    inLeapYear(calendarDate) {
        const { year } = this.estimateIsoDate({ month: 1, day: 1, year: calendarDate.year });
        return isGregorianLeapYear(year);
    }
    monthsInYear( /* calendarDate */) {
        return 12;
    }
    minimumMonthLength(calendarDate) {
        const { month } = calendarDate;
        if (month === 2)
            return this.inLeapYear(calendarDate) ? 29 : 28;
        return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31;
    }
    maximumMonthLength(calendarDate) {
        return this.minimumMonthLength(calendarDate);
    }
    maxLengthOfMonthCodeInAnyYear(monthCode) {
        const month = nonLeapMonthCodeNumberPart(monthCode);
        return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }
    estimateIsoDate(calendarDateParam) {
        const calendarDate = this.adjustCalendarDate(calendarDateParam);
        return RegulateISODate(calendarDate.year + this.isoEpoch.year, calendarDate.month + this.isoEpoch.month, calendarDate.day + this.isoEpoch.day, 'constrain');
    }
}
/** Base for Gregorian-like calendars with eras. */
class GregorianBaseHelper extends HelperBase {
    constructor(id, originalEras) {
        super();
        this.hasEra = true;
        this.calendarType = 'solar';
        this.id = id;
        const { eras, anchorEra } = adjustEras(originalEras);
        this.anchorEra = anchorEra;
        this.eras = eras;
    }
    inLeapYear(calendarDate) {
        // Calendars that don't override this method use the same months and leap
        // years as Gregorian. Once we know the ISO year corresponding to the
        // calendar year, we'll know if it's a leap year or not.
        const { year } = this.estimateIsoDate({ month: 1, day: 1, year: calendarDate.year });
        return isGregorianLeapYear(year);
    }
    monthsInYear( /* calendarDate */) {
        return 12;
    }
    minimumMonthLength(calendarDate) {
        const { month } = calendarDate;
        if (month === 2)
            return this.inLeapYear(calendarDate) ? 29 : 28;
        return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31;
    }
    maximumMonthLength(calendarDate) {
        return this.minimumMonthLength(calendarDate);
    }
    maxLengthOfMonthCodeInAnyYear(monthCode) {
        const month = nonLeapMonthCodeNumberPart(monthCode);
        return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }
    /** Fill in missing parts of the (year, era, eraYear) tuple */
    completeEraYear(calendarDate) {
        const checkField = (property, value, names) => {
            const currentValue = calendarDate[property];
            if (currentValue != null && currentValue != value && !(names || []).includes(currentValue)) {
                // Prefer displaying an era alias, instead of "gregory-inverse"
                const preferredName = names?.[0];
                const expected = preferredName ? `${value} (also called ${preferredName})` : value;
                throw new RangeError(`Input ${property} ${currentValue} doesn't match calculated value ${expected}`);
            }
        };
        const eraFromYear = (year) => {
            let eraYear;
            const adjustedCalendarDate = { ...calendarDate, year };
            const matchingEra = this.eras.find((e, i) => {
                if (i === this.eras.length - 1) {
                    if (e.reverseOf) {
                        // This is a reverse-sign era (like BCE) which must be the oldest
                        // era. Count years backwards.
                        if (year > 0)
                            throw new RangeError(`Signed year ${year} is invalid for era ${e.code}`);
                        eraYear = e.anchorEpoch.year - year;
                        return true;
                    }
                    // last era always gets all "leftover" (older than epoch) years,
                    // so no need for a comparison like below.
                    eraYear = year - e.anchorEpoch.year + (e.hasYearZero ? 0 : 1);
                    return true;
                }
                const comparison = this.compareCalendarDates(adjustedCalendarDate, e.anchorEpoch);
                if (comparison >= 0) {
                    eraYear = year - e.anchorEpoch.year + (e.hasYearZero ? 0 : 1);
                    return true;
                }
                return false;
            });
            if (!matchingEra)
                throw new RangeError(`Year ${year} was not matched by any era`);
            return { eraYear: eraYear, era: matchingEra.code, eraNames: matchingEra.names };
        };
        let { year, eraYear, era } = calendarDate;
        if (year != null) {
            const matchData = eraFromYear(year);
            ({ eraYear, era } = matchData);
            checkField('era', era, matchData?.eraNames);
            checkField('eraYear', eraYear);
        }
        else if (eraYear != null) {
            if (era === undefined)
                throw new RangeError('era and eraYear must be provided together');
            // TS limitation: https://github.com/microsoft/TypeScript/issues/11498
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const matchingEra = this.eras.find(({ code, names = [] }) => code === era || names.includes(era));
            if (!matchingEra)
                throw new RangeError(`Era ${era} (ISO year ${eraYear}) was not matched by any era`);
            if (matchingEra.reverseOf) {
                year = matchingEra.anchorEpoch.year - eraYear;
            }
            else {
                year = eraYear + matchingEra.anchorEpoch.year - (matchingEra.hasYearZero ? 0 : 1);
            }
            checkField('year', year);
            // We'll accept dates where the month/day is earlier than the start of
            // the era or after its end as long as it's in the same year. If that
            // happens, we'll adjust the era/eraYear pair to be the correct era for
            // the `year`.
            ({ eraYear, era } = eraFromYear(year));
        }
        else {
            throw new RangeError('Either year or eraYear and era are required');
        }
        return { ...calendarDate, year, eraYear, era };
    }
    adjustCalendarDate(calendarDateParam, cache, overflow = 'constrain') {
        let calendarDate = calendarDateParam;
        // Because this is not a lunisolar calendar, it's safe to convert monthCode to a number
        const { month, monthCode } = calendarDate;
        if (month === undefined)
            calendarDate = { ...calendarDate, month: nonLeapMonthCodeNumberPart(monthCode) };
        this.validateCalendarDate(calendarDate);
        calendarDate = this.completeEraYear(calendarDate);
        return super.adjustCalendarDate(calendarDate, cache, overflow);
    }
    estimateIsoDate(calendarDateParam) {
        const calendarDate = this.adjustCalendarDate(calendarDateParam);
        const { year, month, day } = calendarDate;
        const { anchorEra } = this;
        const isoYearEstimate = year + anchorEra.isoEpoch.year - (anchorEra.hasYearZero ? 0 : 1);
        return RegulateISODate(isoYearEstimate, month, day, 'constrain');
    }
}
/**
 * Some calendars are identical to Gregorian except era and year. For these
 * calendars, we can avoid using Intl.DateTimeFormat and just calculate the
 * year, era, and eraYear. This is faster (because Intl.DateTimeFormat is slow
 * and uses a huge amount of RAM), and it avoids ICU bugs like
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1173158.
 */
class SameMonthDayAsGregorianBaseHelper extends GregorianBaseHelper {
    constructor(id, originalEras) {
        super(id, originalEras);
    }
    isoToCalendarDate(isoDate) {
        // Month and day are same as ISO, so bypass Intl.DateTimeFormat and
        // calculate the year, era, and eraYear here.
        const { year: isoYear, month, day } = isoDate;
        const monthCode = buildMonthCode(month);
        const year = isoYear - this.anchorEra.isoEpoch.year + 1;
        return this.completeEraYear({ year, month, monthCode, day });
    }
}
const OrthodoxOps = {
    inLeapYear(calendarDate) {
        // Leap years happen one year before the Julian leap year. Note that this
        // calendar is based on the Julian calendar which has a leap year every 4
        // years, unlike the Gregorian calendar which doesn't have leap years on
        // years divisible by 100 except years divisible by 400.
        //
        // Note that we're assuming that leap years in before-epoch times match
        // how leap years are defined now. This is probably not accurate but I'm
        // not sure how better to do it.
        const { year } = calendarDate;
        return (year + 1) % 4 === 0;
    },
    monthsInYear( /* calendarDate */) {
        return 13;
    },
    minimumMonthLength(calendarDate) {
        const { month } = calendarDate;
        // Ethiopian/Coptic calendars have 12 30-day months and an extra 5-6 day 13th month.
        if (month === 13)
            return this.inLeapYear(calendarDate) ? 6 : 5;
        return 30;
    },
    maximumMonthLength(calendarDate) {
        return this.minimumMonthLength(calendarDate);
    },
    maxLengthOfMonthCodeInAnyYear(monthCode) {
        return monthCode === 'M13' ? 6 : 30;
    }
};
class OrthodoxBaseHelperFixedEpoch extends GregorianBaseHelperFixedEpoch {
    constructor(id, isoEpoch) {
        super(id, isoEpoch);
        this.inLeapYear = OrthodoxOps.inLeapYear;
        this.monthsInYear = OrthodoxOps.monthsInYear;
        this.minimumMonthLength = OrthodoxOps.minimumMonthLength;
        this.maximumMonthLength = OrthodoxOps.maximumMonthLength;
        this.maxLengthOfMonthCodeInAnyYear = OrthodoxOps.maxLengthOfMonthCodeInAnyYear;
    }
}
class OrthodoxBaseHelper extends GregorianBaseHelper {
    constructor(id, originalEras) {
        super(id, originalEras);
        this.inLeapYear = OrthodoxOps.inLeapYear;
        this.monthsInYear = OrthodoxOps.monthsInYear;
        this.minimumMonthLength = OrthodoxOps.minimumMonthLength;
        this.maximumMonthLength = OrthodoxOps.maximumMonthLength;
        this.maxLengthOfMonthCodeInAnyYear = OrthodoxOps.maxLengthOfMonthCodeInAnyYear;
    }
}
// `coptic` and `ethiopic` calendars are very similar to `ethioaa` calendar,
// with the following differences:
// - Coptic uses BCE-like positive numbers for years before its epoch (the other
//   two use negative year numbers before epoch)
// - Coptic has a different epoch date
// - Ethiopic has an additional second era that starts at the same date as the
//   zero era of ethioaa.
class EthioaaHelper extends OrthodoxBaseHelperFixedEpoch {
    constructor() {
        super('ethioaa', { year: -5492, month: 7, day: 17 });
    }
}
class CopticHelper extends OrthodoxBaseHelper {
    constructor() {
        super('coptic', [
            { code: 'coptic', isoEpoch: { year: 284, month: 8, day: 29 } },
            { code: 'coptic-inverse', reverseOf: 'coptic' }
        ]);
    }
}
// Anchor is currently the older era to match ethioaa, but should it be the newer era?
// See https://github.com/tc39/ecma402/issues/534 for discussion.
class EthiopicHelper extends OrthodoxBaseHelper {
    constructor() {
        super('ethiopic', [
            { code: 'ethioaa', names: ['ethiopic-amete-alem', 'mundi'], isoEpoch: { year: -5492, month: 7, day: 17 } },
            { code: 'ethiopic', names: ['incar'], isoEpoch: { year: 8, month: 8, day: 27 }, anchorEpoch: { year: 5501 } }
        ]);
    }
}
class RocHelper extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
        super('roc', [
            { code: 'roc', names: ['minguo'], isoEpoch: { year: 1912, month: 1, day: 1 } },
            { code: 'roc-inverse', names: ['before-roc'], reverseOf: 'roc' }
        ]);
    }
}
class BuddhistHelper extends GregorianBaseHelperFixedEpoch {
    constructor() {
        super('buddhist', { year: -543, month: 1, day: 1 });
    }
}
class GregoryHelper extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
        super('gregory', [
            { code: 'gregory', names: ['ad', 'ce'], isoEpoch: { year: 1, month: 1, day: 1 } },
            { code: 'gregory-inverse', names: ['be', 'bce'], reverseOf: 'gregory' }
        ]);
    }
    reviseIntlEra(calendarDate /*, isoDate: IsoDate*/) {
        let { era, eraYear } = calendarDate;
        // Firefox 96 introduced a bug where the `'short'` format of the era
        // option mistakenly returns the one-letter (narrow) format instead. The
        // code below handles either the correct or Firefox-buggy format. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1752253
        if (era === 'b')
            era = 'gregory-inverse';
        if (era === 'a')
            era = 'gregory';
        return { era, eraYear };
    }
}
// NOTE: Only the 5 modern eras (Meiji and later) are included. For dates
// before Meiji 1, the `ce` and `bce` eras are used. Challenges with pre-Meiji
// eras include:
// - Start/end dates of older eras are not precisely defined, which is
//   challenging given Temporal's need for precision
// - Some era dates and/or names are disputed by historians
// - As historical research proceeds, new eras are discovered and existing era
//   dates are modified, leading to considerable churn which is not good for
//   Temporal use.
//  - The earliest era (in 645 CE) may not end up being the earliest depending
//    on future historical scholarship
//  - Before Meiji, Japan used a lunar (or lunisolar?) calendar but AFAIK
//    that's not reflected in the ICU implementation.
//
// For more discussion: https://github.com/tc39/proposal-temporal/issues/526.
//
// Here's a full list of CLDR/ICU eras:
// https://github.com/unicode-org/icu/blob/master/icu4c/source/data/locales/root.txt#L1582-L1818
// https://github.com/unicode-org/cldr/blob/master/common/supplemental/supplementalData.xml#L4310-L4546
//
// NOTE: Japan started using the Gregorian calendar in 6 Meiji, replacing a
// lunisolar calendar. So the day before January 1 of 6 Meiji (1873) was not
// December 31, but December 2, of 5 Meiji (1872). The existing Ecma-402
// Japanese calendar doesn't seem to take this into account, so neither do we:
// > args = ['en-ca-u-ca-japanese', { era: 'short' }]
// > new Date('1873-01-01T12:00').toLocaleString(...args)
// '1 1, 6 Meiji, 12:00:00 PM'
// > new Date('1872-12-31T12:00').toLocaleString(...args)
// '12 31, 5 Meiji, 12:00:00 PM'
class JapaneseHelper extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
        super('japanese', [
            // The Japanese calendar `year` is just the ISO year, because (unlike other
            // ICU calendars) there's no obvious "default era", we use the ISO year.
            { code: 'reiwa', isoEpoch: { year: 2019, month: 5, day: 1 }, anchorEpoch: { year: 2019, month: 5, day: 1 } },
            { code: 'heisei', isoEpoch: { year: 1989, month: 1, day: 8 }, anchorEpoch: { year: 1989, month: 1, day: 8 } },
            { code: 'showa', isoEpoch: { year: 1926, month: 12, day: 25 }, anchorEpoch: { year: 1926, month: 12, day: 25 } },
            { code: 'taisho', isoEpoch: { year: 1912, month: 7, day: 30 }, anchorEpoch: { year: 1912, month: 7, day: 30 } },
            { code: 'meiji', isoEpoch: { year: 1868, month: 9, day: 8 }, anchorEpoch: { year: 1868, month: 9, day: 8 } },
            { code: 'japanese', names: ['japanese', 'gregory', 'ad', 'ce'], isoEpoch: { year: 1, month: 1, day: 1 } },
            { code: 'japanese-inverse', names: ['japanese-inverse', 'gregory-inverse', 'bc', 'bce'], reverseOf: 'japanese' }
        ]);
        this.erasBeginMidYear = true;
    }
    reviseIntlEra(calendarDate, isoDate) {
        const { era, eraYear } = calendarDate;
        const { year: isoYear } = isoDate;
        if (this.eras.find((e) => e.code === era))
            return { era, eraYear };
        return (isoYear < 1 ? { era: 'japanese-inverse', eraYear: 1 - isoYear } : { era: 'japanese', eraYear: isoYear });
    }
}
class ChineseBaseHelper extends HelperBase {
    constructor() {
        super(...arguments);
        this.calendarType = 'lunisolar';
    }
    inLeapYear(calendarDate, cache) {
        const months = this.getMonthList(calendarDate.year, cache);
        return Object.entries(months).length === 13;
    }
    monthsInYear(calendarDate, cache) {
        return this.inLeapYear(calendarDate, cache) ? 13 : 12;
    }
    minimumMonthLength( /* calendarDate */) {
        return 29;
    }
    maximumMonthLength( /* calendarDate */) {
        return 30;
    }
    maxLengthOfMonthCodeInAnyYear(monthCode) {
        // See note below about ICU4C vs ICU4X. It is possible this override should
        // always return 30.
        return ['M01L', 'M09L', 'M10L', 'M11L', 'M12L'].includes(monthCode) ? 29 : 30;
    }
    monthDaySearchStartYear(monthCode, day) {
        // Note that ICU4C actually has _no_ years in which leap months M01L and
        // M09L through M12L have 30 days. The values marked with (*) here are years
        // in which the leap month occurs with 29 days. ICU4C disagrees with ICU4X
        // here and it is not clear which is correct.
        const monthMap = {
            M01L: [1651, 1651],
            M02L: [1947, 1765],
            M03L: [1966, 1955],
            M04L: [1963, 1944],
            M05L: [1971, 1952],
            M06L: [1960, 1941],
            M07L: [1968, 1938],
            M08L: [1957, 1718],
            M09L: [1832, 1832],
            M10L: [1870, 1870],
            M11L: [1814, 1814],
            M12L: [1890, 1890] // *
        };
        const years = monthMap[monthCode] ?? [1972, 1972];
        return day < 30 ? years[0] : years[1];
    }
    getMonthList(calendarYear, cache) {
        if (calendarYear === undefined) {
            throw new TypeError('Missing year');
        }
        const key = JSON.stringify({ func: 'getMonthList', calendarYear, id: this.id });
        const cached = cache.get(key);
        if (cached)
            return cached;
        const dateTimeFormat = this.getFormatter();
        const getCalendarDate = (isoYear, daysPastFeb1) => {
            const isoStringFeb1 = toUtcIsoDateString({ isoYear, isoMonth: 2, isoDay: 1 });
            const legacyDate = new Date(isoStringFeb1);
            // Now add the requested number of days, which may wrap to the next month.
            legacyDate.setUTCDate(daysPastFeb1 + 1);
            const newYearGuess = dateTimeFormat.formatToParts(legacyDate);
            // The 'month' and 'day' parts are guaranteed to be present because the
            // formatter was created with month and day options.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const calendarMonthString = newYearGuess.find((tv) => tv.type === 'month').value;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const calendarDay = +newYearGuess.find((tv) => tv.type === 'day').value;
            const calendarYearPartToVerify = newYearGuess.find((tv) => tv.type === 'relatedYear');
            let calendarYearToVerify;
            if (calendarYearPartToVerify !== undefined) {
                calendarYearToVerify = +calendarYearPartToVerify.value;
            }
            else {
                // Node 12 has outdated ICU data that lacks the `relatedYear` field in the
                // output of Intl.DateTimeFormat.formatToParts.
                throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
            }
            return { calendarMonthString, calendarDay, calendarYearToVerify };
        };
        // First, find a date close to Chinese New Year. Feb 17 will either be in
        // the first month or near the end of the last month of the previous year.
        let isoDaysDelta = 17;
        let { calendarMonthString, calendarDay, calendarYearToVerify } = getCalendarDate(calendarYear, isoDaysDelta);
        // If we didn't guess the first month correctly, add (almost in some months)
        // a lunar month
        if (calendarMonthString !== '1') {
            isoDaysDelta += 29;
            ({ calendarMonthString, calendarDay } = getCalendarDate(calendarYear, isoDaysDelta));
        }
        // Now back up to near the start of the first month, but not too near that
        // off-by-one issues matter.
        isoDaysDelta -= calendarDay - 5;
        const result = {};
        let monthIndex = 1;
        let oldCalendarDay;
        let oldMonthString;
        let done = false;
        do {
            ({ calendarMonthString, calendarDay, calendarYearToVerify } = getCalendarDate(calendarYear, isoDaysDelta));
            if (oldCalendarDay) {
                result[oldMonthString].daysInMonth = oldCalendarDay + 30 - calendarDay;
            }
            if (calendarYearToVerify !== calendarYear) {
                done = true;
            }
            else {
                result[calendarMonthString] = { monthIndex: monthIndex++ };
                // Move to the next month. Because months are sometimes 29 days, the day of the
                // calendar month will move forward slowly but not enough to flip over to a new
                // month before the loop ends at 12-13 months.
                isoDaysDelta += 30;
            }
            oldCalendarDay = calendarDay;
            oldMonthString = calendarMonthString;
        } while (!done);
        result[oldMonthString].daysInMonth = oldCalendarDay + 30 - calendarDay;
        cache.set(key, result);
        return result;
    }
    estimateIsoDate(calendarDate) {
        const { year, month } = calendarDate;
        return { year, month: month >= 12 ? 12 : month + 1, day: 1 };
    }
    adjustCalendarDate(calendarDate, cache, overflow = 'constrain', fromLegacyDate = false) {
        let { year, month, monthExtra, day, monthCode } = calendarDate;
        if (year === undefined)
            throw new TypeError('Missing property: year');
        if (fromLegacyDate) {
            // Legacy Date output returns a string that's an integer with an optional
            // "bis" suffix used only by the Chinese/Dangi calendar to indicate a leap
            // month. Below we'll normalize the output.
            if (monthExtra && monthExtra !== 'bis')
                throw new RangeError(`Unexpected leap month suffix: ${monthExtra}`);
            const monthCode = buildMonthCode(month, monthExtra !== undefined);
            const monthString = `${month}${monthExtra || ''}`;
            const months = this.getMonthList(year, cache);
            const monthInfo = months[monthString];
            if (monthInfo === undefined)
                throw new RangeError(`Unmatched month ${monthString} in Chinese year ${year}`);
            month = monthInfo.monthIndex;
            return { year, month, day: day, monthCode };
        }
        else {
            // When called without input coming from legacy Date output,
            // simply ensure that all fields are present.
            this.validateCalendarDate(calendarDate);
            if (month === undefined) {
                assertExists(monthCode);
                const months = this.getMonthList(year, cache);
                let numberPart = monthCode.replace(/^M|L$/g, (ch) => (ch === 'L' ? 'bis' : ''));
                if (numberPart[0] === '0')
                    numberPart = numberPart.slice(1);
                let monthInfo = months[numberPart];
                month = monthInfo && monthInfo.monthIndex;
                // If this leap month isn't present in this year, constrain to the same
                // day of the previous month.
                if (month === undefined && monthCode.endsWith('L') && monthCode != 'M13L' && overflow === 'constrain') {
                    const withoutML = +monthCode.replace(/^M0?|L$/g, '');
                    monthInfo = months[withoutML];
                    if (monthInfo) {
                        month = monthInfo.monthIndex;
                        monthCode = buildMonthCode(withoutML);
                    }
                }
                if (month === undefined) {
                    throw new RangeError(`Unmatched month ${monthCode} in Chinese year ${year}`);
                }
            }
            else if (monthCode === undefined) {
                const months = this.getMonthList(year, cache);
                const monthEntries = Object.entries(months);
                const largestMonth = monthEntries.length;
                if (overflow === 'reject') {
                    RejectToRange(month, 1, largestMonth);
                    RejectToRange(day, 1, this.maximumMonthLength());
                }
                else {
                    month = ConstrainToRange(month, 1, largestMonth);
                    day = ConstrainToRange(day, 1, this.maximumMonthLength());
                }
                const matchingMonthEntry = monthEntries.find((entry) => entry[1].monthIndex === month);
                if (matchingMonthEntry === undefined) {
                    throw new RangeError(`Invalid month ${month} in Chinese year ${year}`);
                }
                monthCode = buildMonthCode(+matchingMonthEntry[0].replace('bis', ''), matchingMonthEntry[0].indexOf('bis') !== -1);
            }
            else {
                // Both month and monthCode are present. Make sure they don't conflict.
                const months = this.getMonthList(year, cache);
                let numberPart = monthCode.replace(/^M|L$/g, (ch) => (ch === 'L' ? 'bis' : ''));
                if (numberPart[0] === '0')
                    numberPart = numberPart.slice(1);
                const monthInfo = months[numberPart];
                if (!monthInfo)
                    throw new RangeError(`Unmatched monthCode ${monthCode} in Chinese year ${year}`);
                if (month !== monthInfo.monthIndex) {
                    throw new RangeError(`monthCode ${monthCode} doesn't correspond to month ${month} in Chinese year ${year}`);
                }
            }
            return { ...calendarDate, year, month, monthCode, day: day };
        }
    }
}
class ChineseHelper extends ChineseBaseHelper {
    constructor() {
        super(...arguments);
        this.id = 'chinese';
    }
}
// Dangi (Korean) calendar has same implementation as Chinese
class DangiHelper extends ChineseBaseHelper {
    constructor() {
        super(...arguments);
        this.id = 'dangi';
    }
}
/**
 * Common implementation of all non-ISO calendars.
 * Per-calendar id and logic live in `id` and `helper` properties attached later.
 * This split allowed an easy separation between code that was similar between
 * ISO and non-ISO implementations vs. code that was very different.
 */
class NonIsoCalendar {
    constructor(helper) {
        this.helper = helper;
    }
    extraFields(fields) {
        if (this.helper.hasEra && fields.includes('year')) {
            return ['era', 'eraYear'];
        }
        return [];
    }
    resolveFields(fields /* , type */) {
        if (this.helper.calendarType !== 'lunisolar') {
            const cache = new OneObjectCache();
            const largestMonth = this.helper.monthsInYear({ year: fields.year ?? 1972 }, cache);
            resolveNonLunisolarMonth(fields, undefined, largestMonth);
        }
    }
    dateToISO(fields, overflow) {
        const cache = new OneObjectCache();
        const result = this.helper.calendarToIsoDate(fields, overflow, cache);
        cache.setObject(result);
        return result;
    }
    monthDayToISOReferenceDate(fields, overflow) {
        const cache = new OneObjectCache();
        const result = this.helper.monthDayFromFields(fields, overflow, cache);
        // result.year is a reference year where this month/day exists in this calendar
        cache.setObject(result);
        return result;
    }
    fieldKeysToIgnore(keys) {
        const result = new Set();
        for (let ix = 0; ix < keys.length; ix++) {
            const key = keys[ix];
            result.add(key);
            switch (key) {
                case 'era':
                    result.add('eraYear');
                    result.add('year');
                    break;
                case 'eraYear':
                    result.add('era');
                    result.add('year');
                    break;
                case 'year':
                    result.add('era');
                    result.add('eraYear');
                    break;
                case 'month':
                    result.add('monthCode');
                    // See https://github.com/tc39/proposal-temporal/issues/1784
                    if (this.helper.erasBeginMidYear) {
                        result.add('era');
                        result.add('eraYear');
                    }
                    break;
                case 'monthCode':
                    result.add('month');
                    if (this.helper.erasBeginMidYear) {
                        result.add('era');
                        result.add('eraYear');
                    }
                    break;
                case 'day':
                    if (this.helper.erasBeginMidYear) {
                        result.add('era');
                        result.add('eraYear');
                    }
                    break;
            }
        }
        return arrayFromSet(result);
    }
    dateAdd(isoDate, { years, months, weeks, days }, overflow) {
        const cache = OneObjectCache.getCacheForObject(isoDate);
        const calendarDate = this.helper.isoToCalendarDate(isoDate, cache);
        const added = this.helper.addCalendar(calendarDate, { years, months, weeks, days }, overflow, cache);
        const isoAdded = this.helper.calendarToIsoDate(added, 'constrain', cache);
        // The new object's cache starts with the cache of the old object
        if (!OneObjectCache.getCacheForObject(isoAdded)) {
            const newCache = new OneObjectCache(cache);
            newCache.setObject(isoAdded);
        }
        return isoAdded;
    }
    dateUntil(one, two, largestUnit) {
        const cacheOne = OneObjectCache.getCacheForObject(one);
        const cacheTwo = OneObjectCache.getCacheForObject(two);
        const calendarOne = this.helper.isoToCalendarDate(one, cacheOne);
        const calendarTwo = this.helper.isoToCalendarDate(two, cacheTwo);
        const result = this.helper.untilCalendar(calendarOne, calendarTwo, largestUnit, cacheOne);
        return result;
    }
    isoToDate(isoDate, requestedFields) {
        const cache = OneObjectCache.getCacheForObject(isoDate);
        const calendarDate = this.helper.isoToCalendarDate(isoDate, cache);
        if (requestedFields.dayOfWeek) {
            calendarDate.dayOfWeek = impl['iso8601'].isoToDate(isoDate, { dayOfWeek: true }).dayOfWeek;
        }
        if (requestedFields.dayOfYear) {
            const startOfYear = this.helper.startOfCalendarYear(calendarDate);
            const diffDays = this.helper.calendarDaysUntil(startOfYear, calendarDate, cache);
            calendarDate.dayOfYear = diffDays + 1;
        }
        if (requestedFields.weekOfYear)
            calendarDate.weekOfYear = calendarDateWeekOfYear(this.helper.id, isoDate);
        calendarDate.daysInWeek = 7;
        if (requestedFields.daysInMonth)
            calendarDate.daysInMonth = this.helper.daysInMonth(calendarDate, cache);
        if (requestedFields.daysInYear) {
            const startOfYearCalendar = this.helper.startOfCalendarYear(calendarDate);
            const startOfNextYearCalendar = this.helper.addCalendar(startOfYearCalendar, { years: 1 }, 'constrain', cache);
            calendarDate.daysInYear = this.helper.calendarDaysUntil(startOfYearCalendar, startOfNextYearCalendar, cache);
        }
        if (requestedFields.monthsInYear)
            calendarDate.monthsInYear = this.helper.monthsInYear(calendarDate, cache);
        if (requestedFields.inLeapYear)
            calendarDate.inLeapYear = this.helper.inLeapYear(calendarDate, cache);
        return calendarDate;
    }
    getFirstDayOfWeek() {
        return this.helper.getFirstDayOfWeek();
    }
    getMinimalDaysInFirstWeek() {
        return this.helper.getMinimalDaysInFirstWeek();
    }
}
for (const Helper of [
    HebrewHelper,
    PersianHelper,
    EthiopicHelper,
    EthioaaHelper,
    CopticHelper,
    ChineseHelper,
    DangiHelper,
    RocHelper,
    IndianHelper,
    BuddhistHelper,
    GregoryHelper,
    JapaneseHelper,
    IslamicHelper,
    IslamicUmalquraHelper,
    IslamicTblaHelper,
    IslamicCivilHelper,
    IslamicRgsaHelper,
    IslamicCcHelper
]) {
    const helper = new Helper();
    // Construct a new NonIsoCalendar instance with the given Helper implementation that contains
    // per-calendar logic.
    impl[helper.id] = new NonIsoCalendar(helper);
}
function calendarImpl(calendar) {
    return impl[calendar];
}
// Probably not what the intrinsics mechanism was intended for, but view this as
// an export of calendarImpl while avoiding circular dependencies
DefineIntrinsic('calendarImpl', calendarImpl);

// Save the original Intl.DateTimeFormat, it will likely be overwritten
const OriginalIntlDateTimeFormat = Intl.DateTimeFormat;
// Construction of built-in Intl.DateTimeFormat objects is sloooooow,
// so we'll only create those instances when we need them.
// See https://bugs.chromium.org/p/v8/issues/detail?id=6528
function getSlotLazy(obj, slot) {
    let val = GetSlot(obj, slot);
    if (typeof val === 'function') {
        // If we get here, `val` is an "amender function". It will take the user's
        // options and transform them into suitable options to be passed into the
        // built-in (non-polyfill) Intl.DateTimeFormat constructor. These options
        // will vary depending on the Temporal type, so that's why we store separate
        // formatters in separate props on the polyfill's DateTimeFormat instances.
        // The efficiency happens because we don't create an (expensive) formatter
        // until the user calls toLocaleString for that Temporal type.
        val = new OriginalIntlDateTimeFormat(GetSlot(obj, LOCALE), val(GetSlot(obj, OPTIONS)));
        ResetSlot(obj, slot, val);
    }
    return val;
}
function createDateTimeFormat(dtf, locale, optionsParam) {
    const hasOptions = typeof optionsParam !== 'undefined';
    let options;
    if (hasOptions) {
        // Read all the options in the expected order and copy them to a
        // null-prototype object with which we can do further operations
        // unobservably
        const props = [
            'localeMatcher',
            'calendar',
            'numberingSystem',
            'hour12',
            'hourCycle',
            'timeZone',
            'weekday',
            'era',
            'year',
            'month',
            'day',
            'dayPeriod',
            'hour',
            'minute',
            'second',
            'fractionalSecondDigits',
            'timeZoneName',
            'formatMatcher',
            'dateStyle',
            'timeStyle'
        ];
        options = ToObject(optionsParam);
        const newOptions = Object.create(null);
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                newOptions[prop] = options[prop];
            }
        }
        options = newOptions;
    }
    else {
        options = Object.create(null);
    }
    const original = new OriginalIntlDateTimeFormat(locale, options);
    const ro = original.resolvedOptions();
    CreateSlots(dtf);
    // DateTimeFormat instances are very expensive to create. Therefore, they will
    // be lazily created only when needed, using the locale and options provided.
    // But it's possible for callers to mutate those inputs before lazy creation
    // happens. For this reason, we clone the inputs instead of caching the
    // original objects. To avoid the complexity of deep cloning any inputs that
    // are themselves objects (e.g. the locales array, or options property values
    // that will be coerced to strings), we rely on `resolvedOptions()` to do the
    // coercion and cloning for us. Unfortunately, we can't just use the resolved
    // options as-is because our options-amending logic adds additional fields if
    // the user doesn't supply any unit fields like year, month, day, hour, etc.
    // Therefore, we limit the properties in the clone to properties that were
    // present in the original input.
    if (hasOptions) {
        const clonedResolved = Object.assign(Object.create(null), ro);
        for (const prop in clonedResolved) {
            if (!Object.prototype.hasOwnProperty.call(options, prop)) {
                delete clonedResolved[prop];
            }
        }
        // hour12/hourCycle don't show up in resolvedOptions() unless the chosen
        // format includes an hour component, so copy them explicitly in case they
        // would otherwise be lost
        clonedResolved.hour12 = options.hour12;
        clonedResolved.hourCycle = options.hourCycle;
        SetSlot(dtf, OPTIONS, clonedResolved);
    }
    else {
        SetSlot(dtf, OPTIONS, options);
    }
    SetSlot(dtf, LOCALE, ro.locale);
    SetSlot(dtf, ORIGINAL, original);
    SetSlot(dtf, TZ_CANONICAL, ro.timeZone);
    SetSlot(dtf, CAL_ID, ro.calendar);
    SetSlot(dtf, DATE, dateAmend);
    SetSlot(dtf, YM, yearMonthAmend);
    SetSlot(dtf, MD, monthDayAmend);
    SetSlot(dtf, TIME_FMT, timeAmend);
    SetSlot(dtf, DATETIME, datetimeAmend);
    SetSlot(dtf, INST, instantAmend);
    // Save the original time zone, for a few reasons:
    // - Clearer error messages
    // - More clearly follows the spec for InitializeDateTimeFormat
    // - Because it follows the spec more closely, will make it easier to integrate
    //   support of offset strings and other potential changes like proposal-canonical-tz.
    const timeZoneOption = hasOptions ? options.timeZone : undefined;
    if (timeZoneOption === undefined) {
        SetSlot(dtf, TZ_ORIGINAL, ro.timeZone);
    }
    else {
        const id = ToString(timeZoneOption);
        if (id.startsWith('−')) {
            // The initial (Node 23) implementation of offset time zones allowed use
            // of the Unicode minus sign, which was disallowed by a later spec change.
            throw new RangeError('Unicode minus (U+2212) is not supported in time zone offsets');
        }
        // store a normalized identifier
        SetSlot(dtf, TZ_ORIGINAL, ToTemporalTimeZoneIdentifier(id));
    }
    return undefined; // TODO: I couldn't satisfy TS without adding this. Is there another way?
}
function IsPatchedDateTimeFormat(item) {
    return HasSlot(item, ORIGINAL);
}
class DateTimeFormatImpl {
    constructor(locales = undefined, options = undefined) {
        createDateTimeFormat(this, locales, options);
    }
    get format() {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        const boundFormat = format.bind(this);
        Object.defineProperties(boundFormat, {
            length: { value: 1, enumerable: false, writable: false, configurable: true },
            name: { value: '', enumerable: false, writable: false, configurable: true }
        });
        return boundFormat;
    }
    formatRange(a, b) {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        return formatRange.call(this, a, b);
    }
    formatToParts(datetime, ...rest) {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        return formatToParts.call(this, datetime, ...rest);
    }
    formatRangeToParts(a, b) {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        return formatRangeToParts.call(this, a, b);
    }
    resolvedOptions() {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        return resolvedOptions.call(this);
    }
}
if (!('formatToParts' in OriginalIntlDateTimeFormat.prototype)) {
    delete DateTimeFormatImpl.prototype.formatToParts;
}
if (!('formatRangeToParts' in OriginalIntlDateTimeFormat.prototype)) {
    delete DateTimeFormatImpl.prototype.formatRangeToParts;
}
// A non-class constructor is needed because Intl.DateTimeFormat must be able to
// be called without 'new'
const DateTimeFormat = function (locales = undefined, options = undefined) {
    return new DateTimeFormatImpl(locales, options);
};
DateTimeFormatImpl.prototype.constructor = DateTimeFormat;
Object.defineProperty(DateTimeFormat, 'prototype', {
    value: DateTimeFormatImpl.prototype,
    writable: false,
    enumerable: false,
    configurable: false
});
DateTimeFormat.supportedLocalesOf = OriginalIntlDateTimeFormat.supportedLocalesOf;
MakeIntrinsicClass(DateTimeFormat, 'Intl.DateTimeFormat');
function resolvedOptions() {
    const resolved = GetSlot(this, ORIGINAL).resolvedOptions();
    resolved.timeZone = GetSlot(this, TZ_ORIGINAL);
    return resolved;
}
// TODO: investigate why there's a rest parameter here. Does this function really need to accept extra params?
// And if so, why doesn't formatRange also accept extra params?
function format(datetime, ...rest) {
    let overrides = extractOverrides(datetime, this);
    let formatter, formatArgs;
    if (overrides.formatter) {
        formatter = overrides.formatter;
        formatArgs = [epochNsToMs(overrides.epochNs, 'floor')];
    }
    else {
        formatter = GetSlot(this, ORIGINAL);
        formatArgs = [datetime, ...rest];
    }
    return formatter.format(...formatArgs);
}
function formatToParts(datetime, ...rest) {
    let overrides = extractOverrides(datetime, this);
    let formatter, formatArgs;
    if (overrides.formatter) {
        formatter = overrides.formatter;
        formatArgs = [epochNsToMs(overrides.epochNs, 'floor')];
    }
    else {
        formatter = GetSlot(this, ORIGINAL);
        formatArgs = [datetime, ...rest];
    }
    return formatter.formatToParts(...formatArgs);
}
function formatRange(aParam, bParam) {
    if (aParam === undefined || bParam === undefined) {
        throw new TypeError('Intl.DateTimeFormat.formatRange requires two values');
    }
    const a = toDateTimeFormattable(aParam);
    const b = toDateTimeFormattable(bParam);
    let formatArgs = [a, b];
    let formatter;
    if (isTemporalObject(a) !== isTemporalObject(b)) {
        throw new TypeError('Intl.DateTimeFormat.formatRange accepts two values of the same type');
    }
    if (isTemporalObject(a)) {
        if (!sameTemporalType(a, b)) {
            throw new TypeError('Intl.DateTimeFormat.formatRange accepts two values of the same type');
        }
        const { epochNs: aa, formatter: aformatter } = extractOverrides(a, this);
        const { epochNs: bb, formatter: bformatter } = extractOverrides(b, this);
        if (aformatter) {
            assert(bformatter == aformatter, 'formatters for same Temporal type should be identical');
            formatter = aformatter;
            formatArgs = [epochNsToMs(aa, 'floor'), epochNsToMs(bb, 'floor')];
        }
    }
    if (!formatter) {
        formatter = GetSlot(this, ORIGINAL);
    }
    return formatter.formatRange(...formatArgs);
}
function formatRangeToParts(aParam, bParam) {
    if (aParam === undefined || bParam === undefined) {
        throw new TypeError('Intl.DateTimeFormat.formatRange requires two values');
    }
    const a = toDateTimeFormattable(aParam);
    const b = toDateTimeFormattable(bParam);
    let formatArgs = [a, b];
    let formatter;
    if (isTemporalObject(a) !== isTemporalObject(b)) {
        throw new TypeError('Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type');
    }
    if (isTemporalObject(a)) {
        if (!sameTemporalType(a, b)) {
            throw new TypeError('Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type');
        }
        const { epochNs: aa, formatter: aformatter } = extractOverrides(a, this);
        const { epochNs: bb, formatter: bformatter } = extractOverrides(b, this);
        if (aformatter) {
            assert(bformatter == aformatter, 'formatters for same Temporal type should be identical');
            formatter = aformatter;
            formatArgs = [epochNsToMs(aa, 'floor'), epochNsToMs(bb, 'floor')];
        }
    }
    if (!formatter) {
        formatter = GetSlot(this, ORIGINAL);
    }
    return formatter.formatRangeToParts(...formatArgs);
}
function amend(optionsParam = {}, amended = {}) {
    const options = Object.assign({}, optionsParam);
    const props = [
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'weekday',
        'dayPeriod',
        'timeZoneName',
        'dateStyle',
        'timeStyle'
    ];
    for (let i = 0; i < props.length; i++) {
        const opt = props[i];
        options[opt] = opt in amended ? amended[opt] : options[opt];
        if (options[opt] === false || options[opt] === undefined)
            delete options[opt];
    }
    return options;
}
function timeAmend(originalOptions) {
    const options = amend(originalOptions, {
        year: false,
        month: false,
        day: false,
        weekday: false,
        timeZoneName: false,
        dateStyle: false
    });
    if (options.timeStyle === 'long' || options.timeStyle === 'full') {
        // Try to fake what timeStyle should do if not printing the time zone name
        delete options.timeStyle;
        Object.assign(options, { hour: 'numeric', minute: '2-digit', second: '2-digit' });
    }
    if (!hasTimeOptions(options)) {
        if (hasAnyDateTimeOptions(originalOptions)) {
            throw new TypeError(`cannot format Temporal.PlainTime with options [${Object.keys(originalOptions)}]`);
        }
        Object.assign(options, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
    }
    return options;
}
function yearMonthAmend(originalOptions) {
    // Try to fake what dateStyle should do for dates without a day. This is not
    // accurate for locales that always print the era
    const dateStyleHacks = {
        short: { year: '2-digit', month: 'numeric' },
        medium: { year: 'numeric', month: 'short' },
        long: { year: 'numeric', month: 'long' },
        full: { year: 'numeric', month: 'long' }
    };
    const options = amend(originalOptions, {
        day: false,
        hour: false,
        minute: false,
        second: false,
        weekday: false,
        dayPeriod: false,
        timeZoneName: false,
        timeStyle: false
    });
    if ('dateStyle' in options && options.dateStyle) {
        const style = options.dateStyle;
        delete options.dateStyle;
        Object.assign(options, dateStyleHacks[style]);
    }
    if (!('year' in options || 'month' in options || 'era' in options)) {
        if (hasAnyDateTimeOptions(originalOptions)) {
            throw new TypeError(`cannot format PlainYearMonth with options [${Object.keys(originalOptions)}]`);
        }
        Object.assign(options, { year: 'numeric', month: 'numeric' });
    }
    return options;
}
function monthDayAmend(originalOptions) {
    // Try to fake what dateStyle should do for dates without a day
    const dateStyleHacks = {
        short: { month: 'numeric', day: 'numeric' },
        medium: { month: 'short', day: 'numeric' },
        long: { month: 'long', day: 'numeric' },
        full: { month: 'long', day: 'numeric' }
    };
    const options = amend(originalOptions, {
        year: false,
        hour: false,
        minute: false,
        second: false,
        weekday: false,
        dayPeriod: false,
        timeZoneName: false,
        timeStyle: false
    });
    if ('dateStyle' in options && options.dateStyle) {
        const style = options.dateStyle;
        delete options.dateStyle;
        Object.assign(options, dateStyleHacks[style]);
    }
    if (!('month' in options || 'day' in options)) {
        if (hasAnyDateTimeOptions(originalOptions)) {
            throw new TypeError(`cannot format PlainMonthDay with options [${Object.keys(originalOptions)}]`);
        }
        Object.assign(options, { month: 'numeric', day: 'numeric' });
    }
    return options;
}
function dateAmend(originalOptions) {
    const options = amend(originalOptions, {
        hour: false,
        minute: false,
        second: false,
        dayPeriod: false,
        timeZoneName: false,
        timeStyle: false
    });
    if (!hasDateOptions(options)) {
        if (hasAnyDateTimeOptions(originalOptions)) {
            throw new TypeError(`cannot format PlainDate with options [${Object.keys(originalOptions)}]`);
        }
        Object.assign(options, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    }
    return options;
}
function datetimeAmend(originalOptions) {
    const options = amend(originalOptions, { timeZoneName: false });
    if (options.timeStyle === 'long' || options.timeStyle === 'full') {
        // Try to fake what timeStyle should do if not printing the time zone name
        delete options.timeStyle;
        Object.assign(options, { hour: 'numeric', minute: '2-digit', second: '2-digit' });
        // If moving to a fake timeStyle while dateStyle is present, we also have to
        // move to a fake dateStyle. dateStyle is mutually exclusive with hour etc.
        if (options.dateStyle) {
            const dateStyleHacks = {
                short: { year: 'numeric', month: 'numeric', day: 'numeric' },
                medium: { year: 'numeric', month: 'short', day: 'numeric' },
                long: { year: 'numeric', month: 'long', day: 'numeric' },
                full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
            };
            Object.assign(options, dateStyleHacks[options.dateStyle]);
            delete options.dateStyle;
        }
    }
    if (!hasTimeOptions(options) && !hasDateOptions(options)) {
        if (hasAnyDateTimeOptions(originalOptions)) {
            throw new TypeError(`cannot format PlainDateTime with options [${Object.keys(originalOptions)}]`);
        }
        Object.assign(options, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
    }
    return options;
}
function instantAmend(optionsParam) {
    let options = optionsParam;
    if (!hasTimeOptions(options) && !hasDateOptions(options)) {
        options = Object.assign({}, options, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
    }
    return options;
}
function hasDateOptions(options) {
    return ('year' in options ||
        'month' in options ||
        'day' in options ||
        'weekday' in options ||
        'dateStyle' in options ||
        'era' in options);
}
function hasTimeOptions(options) {
    return ('hour' in options ||
        'minute' in options ||
        'second' in options ||
        'timeStyle' in options ||
        'dayPeriod' in options ||
        'fractionalSecondDigits' in options);
}
function hasAnyDateTimeOptions(originalOptions) {
    return (hasDateOptions(originalOptions) ||
        hasTimeOptions(originalOptions) ||
        'dateStyle' in originalOptions ||
        'timeStyle' in originalOptions ||
        'timeZoneName' in originalOptions);
}
function isTemporalObject(obj) {
    return (IsTemporalDate(obj) ||
        IsTemporalTime(obj) ||
        IsTemporalDateTime(obj) ||
        IsTemporalZonedDateTime(obj) ||
        IsTemporalYearMonth(obj) ||
        IsTemporalMonthDay(obj) ||
        IsTemporalInstant(obj));
}
function toDateTimeFormattable(value) {
    if (isTemporalObject(value))
        return value;
    return ToNumber(value);
}
function sameTemporalType(x, y) {
    if (!isTemporalObject(x) || !isTemporalObject(y))
        return false;
    if (IsTemporalTime(x) && !IsTemporalTime(y))
        return false;
    if (IsTemporalDate(x) && !IsTemporalDate(y))
        return false;
    if (IsTemporalDateTime(x) && !IsTemporalDateTime(y))
        return false;
    if (IsTemporalZonedDateTime(x) && !IsTemporalZonedDateTime(y))
        return false;
    if (IsTemporalYearMonth(x) && !IsTemporalYearMonth(y))
        return false;
    if (IsTemporalMonthDay(x) && !IsTemporalMonthDay(y))
        return false;
    if (IsTemporalInstant(x) && !IsTemporalInstant(y))
        return false;
    return true;
}
function extractOverrides(temporalObj, main) {
    if (IsTemporalTime(temporalObj)) {
        const isoDateTime = {
            isoDate: { year: 1970, month: 1, day: 1 },
            time: GetSlot(temporalObj, TIME)
        };
        return {
            epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), isoDateTime, 'compatible'),
            formatter: getSlotLazy(main, TIME_FMT)
        };
    }
    if (IsTemporalYearMonth(temporalObj)) {
        const calendar = GetSlot(temporalObj, CALENDAR);
        const mainCalendar = GetSlot(main, CAL_ID);
        if (calendar !== mainCalendar) {
            throw new RangeError(`cannot format PlainYearMonth with calendar ${calendar} in locale with calendar ${mainCalendar}`);
        }
        const isoDateTime = CombineISODateAndTimeRecord(GetSlot(temporalObj, ISO_DATE), NoonTimeRecord());
        return {
            epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), isoDateTime, 'compatible'),
            formatter: getSlotLazy(main, YM)
        };
    }
    if (IsTemporalMonthDay(temporalObj)) {
        const calendar = GetSlot(temporalObj, CALENDAR);
        const mainCalendar = GetSlot(main, CAL_ID);
        if (calendar !== mainCalendar) {
            throw new RangeError(`cannot format PlainMonthDay with calendar ${calendar} in locale with calendar ${mainCalendar}`);
        }
        const isoDateTime = CombineISODateAndTimeRecord(GetSlot(temporalObj, ISO_DATE), NoonTimeRecord());
        return {
            epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), isoDateTime, 'compatible'),
            formatter: getSlotLazy(main, MD)
        };
    }
    if (IsTemporalDate(temporalObj)) {
        const calendar = GetSlot(temporalObj, CALENDAR);
        const mainCalendar = GetSlot(main, CAL_ID);
        if (calendar !== 'iso8601' && calendar !== mainCalendar) {
            throw new RangeError(`cannot format PlainDate with calendar ${calendar} in locale with calendar ${mainCalendar}`);
        }
        const isoDateTime = CombineISODateAndTimeRecord(GetSlot(temporalObj, ISO_DATE), NoonTimeRecord());
        return {
            epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), isoDateTime, 'compatible'),
            formatter: getSlotLazy(main, DATE)
        };
    }
    if (IsTemporalDateTime(temporalObj)) {
        const calendar = GetSlot(temporalObj, CALENDAR);
        const mainCalendar = GetSlot(main, CAL_ID);
        if (calendar !== 'iso8601' && calendar !== mainCalendar) {
            throw new RangeError(`cannot format PlainDateTime with calendar ${calendar} in locale with calendar ${mainCalendar}`);
        }
        const isoDateTime = GetSlot(temporalObj, ISO_DATE_TIME);
        return {
            epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), isoDateTime, 'compatible'),
            formatter: getSlotLazy(main, DATETIME)
        };
    }
    if (IsTemporalZonedDateTime(temporalObj)) {
        throw new TypeError('Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.');
    }
    if (IsTemporalInstant(temporalObj)) {
        return {
            epochNs: GetSlot(temporalObj, EPOCHNANOSECONDS),
            formatter: getSlotLazy(main, INST)
        };
    }
    return {};
}
function temporalDurationToCompatibilityRecord(duration) {
    const record = Object.create(null);
    record.years = GetSlot(duration, YEARS);
    record.months = GetSlot(duration, MONTHS);
    record.weeks = GetSlot(duration, WEEKS);
    record.days = GetSlot(duration, DAYS);
    record.hours = GetSlot(duration, HOURS);
    record.minutes = GetSlot(duration, MINUTES);
    record.seconds = GetSlot(duration, SECONDS);
    record.milliseconds = GetSlot(duration, MILLISECONDS);
    record.microseconds = GetSlot(duration, MICROSECONDS);
    record.nanoseconds = GetSlot(duration, NANOSECONDS);
    return record;
}
const { format: IntlDurationFormatPrototypeFormat, formatToParts: IntlDurationFormatPrototypeFormatToParts } = Intl.DurationFormat?.prototype ?? Object.create(null);
function ModifiedIntlDurationFormatPrototypeFormat(durationLike) {
    Intl.DurationFormat.prototype.resolvedOptions.call(this); // brand check
    const duration = ToTemporalDuration(durationLike);
    const record = temporalDurationToCompatibilityRecord(duration);
    return IntlDurationFormatPrototypeFormat.call(this, record);
}
if (Intl.DurationFormat?.prototype) {
    Intl.DurationFormat.prototype.format = ModifiedIntlDurationFormatPrototypeFormat;
    Intl.DurationFormat.prototype.formatToParts = function formatToParts(durationLike) {
        Intl.DurationFormat.prototype.resolvedOptions.call(this); // brand check
        const duration = ToTemporalDuration(durationLike);
        const record = temporalDurationToCompatibilityRecord(duration);
        return IntlDurationFormatPrototypeFormatToParts.call(this, record);
    };
}

var intl = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DateTimeFormat: DateTimeFormat,
    ModifiedIntlDurationFormatPrototypeFormat: ModifiedIntlDurationFormatPrototypeFormat
});

class Instant {
    constructor(epochNanoseconds) {
        // Note: if the argument is not passed, ToBigInt(undefined) will throw. This check exists only
        //       to improve the error message.
        if (arguments.length < 1) {
            throw new TypeError('missing argument: epochNanoseconds is required');
        }
        const ns = BigInt(epochNanoseconds);
        CreateTemporalInstantSlots(this, ns);
    }
    get epochMilliseconds() {
        CheckReceiver(this, IsTemporalInstant);
        const value = GetSlot(this, EPOCHNANOSECONDS);
        return epochNsToMs(value, 'floor');
    }
    get epochNanoseconds() {
        CheckReceiver(this, IsTemporalInstant);
        return ToBigIntExternal(BigInt(GetSlot(this, EPOCHNANOSECONDS)));
    }
    add(temporalDurationLike) {
        CheckReceiver(this, IsTemporalInstant);
        return AddDurationToInstant('add', this, temporalDurationLike);
    }
    subtract(temporalDurationLike) {
        CheckReceiver(this, IsTemporalInstant);
        return AddDurationToInstant('subtract', this, temporalDurationLike);
    }
    until(other, options = undefined) {
        CheckReceiver(this, IsTemporalInstant);
        return DifferenceTemporalInstant('until', this, other, options);
    }
    since(other, options = undefined) {
        CheckReceiver(this, IsTemporalInstant);
        return DifferenceTemporalInstant('since', this, other, options);
    }
    round(roundToParam) {
        CheckReceiver(this, IsTemporalInstant);
        if (roundToParam === undefined)
            throw new TypeError('options parameter is required');
        const roundTo = typeof roundToParam === 'string'
            ? CreateOnePropObject('smallestUnit', roundToParam)
            : GetOptionsObject(roundToParam);
        const roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        const roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        const smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'time', REQUIRED);
        const maximumIncrements = {
            hour: 24,
            minute: 1440,
            second: 86400,
            millisecond: 86400e3,
            microsecond: 86400e6,
            nanosecond: 86400e9
        };
        ValidateTemporalRoundingIncrement(roundingIncrement, maximumIncrements[smallestUnit], true);
        const ns = GetSlot(this, EPOCHNANOSECONDS);
        const roundedNs = RoundTemporalInstant(ns, roundingIncrement, smallestUnit, roundingMode);
        return CreateTemporalInstant(roundedNs);
    }
    equals(otherParam) {
        CheckReceiver(this, IsTemporalInstant);
        const other = ToTemporalInstant(otherParam);
        const one = GetSlot(this, EPOCHNANOSECONDS);
        const two = GetSlot(other, EPOCHNANOSECONDS);
        return BigInt(one) === BigInt(two);
    }
    toString(options = undefined) {
        CheckReceiver(this, IsTemporalInstant);
        const resolvedOptions = GetOptionsObject(options);
        const digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        const roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        const smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour')
            throw new RangeError('smallestUnit must be a time unit other than "hour"');
        let timeZone = resolvedOptions.timeZone;
        if (timeZone !== undefined)
            timeZone = ToTemporalTimeZoneIdentifier(timeZone);
        const { precision, unit, increment } = ToSecondsStringPrecisionRecord(smallestUnit, digits);
        const ns = GetSlot(this, EPOCHNANOSECONDS);
        const roundedNs = RoundTemporalInstant(ns, increment, unit, roundingMode);
        const roundedInstant = CreateTemporalInstant(roundedNs);
        return TemporalInstantToString(roundedInstant, timeZone, precision);
    }
    toJSON() {
        CheckReceiver(this, IsTemporalInstant);
        return TemporalInstantToString(this, undefined, 'auto');
    }
    toLocaleString(locales = undefined, options = undefined) {
        CheckReceiver(this, IsTemporalInstant);
        return new DateTimeFormat(locales, options).format(this);
    }
    valueOf() {
        ValueOfThrows('Instant');
    }
    toZonedDateTimeISO(timeZoneParam) {
        CheckReceiver(this, IsTemporalInstant);
        const timeZone = ToTemporalTimeZoneIdentifier(timeZoneParam);
        return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), timeZone, 'iso8601');
    }
    static fromEpochMilliseconds(epochMilliseconds) {
        const epochNanoseconds = epochMsToNs(ToNumber(epochMilliseconds));
        return CreateTemporalInstant(epochNanoseconds);
    }
    static fromEpochNanoseconds(epochNanosecondsParam) {
        const epochNanoseconds = BigInt(epochNanosecondsParam);
        return CreateTemporalInstant(epochNanoseconds);
    }
    static from(item) {
        return ToTemporalInstant(item);
    }
    static compare(oneParam, twoParam) {
        const one = ToTemporalInstant(oneParam);
        const two = ToTemporalInstant(twoParam);
        const oneNs = GetSlot(one, EPOCHNANOSECONDS);
        const twoNs = GetSlot(two, EPOCHNANOSECONDS);
        if (oneNs < twoNs)
            return -1;
        if (oneNs > twoNs)
            return 1;
        return 0;
    }
}
MakeIntrinsicClass(Instant, 'Temporal.Instant');

class PlainDate {
    constructor(isoYear, isoMonth, isoDay, calendarParam = 'iso8601') {
        const year = ToIntegerWithTruncation(isoYear);
        const month = ToIntegerWithTruncation(isoMonth);
        const day = ToIntegerWithTruncation(isoDay);
        const calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
        RejectISODate(year, month, day);
        CreateTemporalDateSlots(this, { year, month, day }, calendar);
    }
    get calendarId() {
        CheckReceiver(this, IsTemporalDate);
        return GetSlot(this, CALENDAR);
    }
    get era() {
        return getCalendarProperty$4(this, 'era');
    }
    get eraYear() {
        return getCalendarProperty$4(this, 'eraYear');
    }
    get year() {
        return getCalendarProperty$4(this, 'year');
    }
    get month() {
        return getCalendarProperty$4(this, 'month');
    }
    get monthCode() {
        return getCalendarProperty$4(this, 'monthCode');
    }
    get day() {
        return getCalendarProperty$4(this, 'day');
    }
    get dayOfWeek() {
        return getCalendarProperty$4(this, 'dayOfWeek');
    }
    get dayOfYear() {
        return getCalendarProperty$4(this, 'dayOfYear');
    }
    get weekOfYear() {
        return getCalendarProperty$4(this, 'weekOfYear')?.week;
    }
    get yearOfWeek() {
        return getCalendarProperty$4(this, 'weekOfYear')?.year;
    }
    get daysInWeek() {
        return getCalendarProperty$4(this, 'daysInWeek');
    }
    get daysInMonth() {
        return getCalendarProperty$4(this, 'daysInMonth');
    }
    get daysInYear() {
        return getCalendarProperty$4(this, 'daysInYear');
    }
    get monthsInYear() {
        return getCalendarProperty$4(this, 'monthsInYear');
    }
    get inLeapYear() {
        return getCalendarProperty$4(this, 'inLeapYear');
    }
    with(temporalDateLike, options = undefined) {
        CheckReceiver(this, IsTemporalDate);
        if (!IsObject(temporalDateLike)) {
            throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalDateLike);
        const calendar = GetSlot(this, CALENDAR);
        let fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE));
        const partialDate = PrepareCalendarFields(calendar, temporalDateLike, ['year', 'month', 'monthCode', 'day'], [], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialDate);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        const isoDate = CalendarDateFromFields(calendar, fields, overflow);
        return CreateTemporalDate(isoDate, calendar);
    }
    withCalendar(calendarParam) {
        CheckReceiver(this, IsTemporalDate);
        const calendar = ToTemporalCalendarIdentifier(calendarParam);
        return CreateTemporalDate(GetSlot(this, ISO_DATE), calendar);
    }
    add(temporalDurationLike, options = undefined) {
        CheckReceiver(this, IsTemporalDate);
        return AddDurationToDate('add', this, temporalDurationLike, options);
    }
    subtract(temporalDurationLike, options = undefined) {
        CheckReceiver(this, IsTemporalDate);
        return AddDurationToDate('subtract', this, temporalDurationLike, options);
    }
    until(other, options = undefined) {
        CheckReceiver(this, IsTemporalDate);
        return DifferenceTemporalPlainDate('until', this, other, options);
    }
    since(other, options = undefined) {
        CheckReceiver(this, IsTemporalDate);
        return DifferenceTemporalPlainDate('since', this, other, options);
    }
    equals(otherParam) {
        CheckReceiver(this, IsTemporalDate);
        const other = ToTemporalDate(otherParam);
        if (CompareISODate(GetSlot(this, ISO_DATE), GetSlot(other, ISO_DATE)) !== 0)
            return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
    }
    toString(options = undefined) {
        CheckReceiver(this, IsTemporalDate);
        const resolvedOptions = GetOptionsObject(options);
        const showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        return TemporalDateToString(this, showCalendar);
    }
    toJSON() {
        CheckReceiver(this, IsTemporalDate);
        return TemporalDateToString(this);
    }
    toLocaleString(locales = undefined, options = undefined) {
        CheckReceiver(this, IsTemporalDate);
        return new DateTimeFormat(locales, options).format(this);
    }
    valueOf() {
        ValueOfThrows('PlainDate');
    }
    toPlainDateTime(temporalTime = undefined) {
        CheckReceiver(this, IsTemporalDate);
        const time = ToTimeRecordOrMidnight(temporalTime);
        const isoDateTime = CombineISODateAndTimeRecord(GetSlot(this, ISO_DATE), time);
        return CreateTemporalDateTime(isoDateTime, GetSlot(this, CALENDAR));
    }
    toZonedDateTime(item) {
        CheckReceiver(this, IsTemporalDate);
        let timeZone, temporalTime;
        if (IsObject(item)) {
            const timeZoneLike = item.timeZone;
            if (timeZoneLike === undefined) {
                timeZone = ToTemporalTimeZoneIdentifier(item);
            }
            else {
                timeZone = ToTemporalTimeZoneIdentifier(timeZoneLike);
                temporalTime = item.plainTime;
            }
        }
        else {
            timeZone = ToTemporalTimeZoneIdentifier(item);
        }
        const isoDate = GetSlot(this, ISO_DATE);
        let epochNs;
        if (temporalTime === undefined) {
            epochNs = GetStartOfDay(timeZone, isoDate);
        }
        else {
            temporalTime = ToTemporalTime(temporalTime);
            const isoDateTime = CombineISODateAndTimeRecord(isoDate, GetSlot(temporalTime, TIME));
            epochNs = GetEpochNanosecondsFor(timeZone, isoDateTime, 'compatible');
        }
        return CreateTemporalZonedDateTime(epochNs, timeZone, GetSlot(this, CALENDAR));
    }
    toPlainYearMonth() {
        CheckReceiver(this, IsTemporalDate);
        const calendar = GetSlot(this, CALENDAR);
        const fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE));
        const isoDate = CalendarYearMonthFromFields(calendar, fields, 'constrain');
        return CreateTemporalYearMonth(isoDate, calendar);
    }
    toPlainMonthDay() {
        CheckReceiver(this, IsTemporalDate);
        const calendar = GetSlot(this, CALENDAR);
        const fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE));
        const isoDate = CalendarMonthDayFromFields(calendar, fields, 'constrain');
        return CreateTemporalMonthDay(isoDate, calendar);
    }
    static from(item, options = undefined) {
        return ToTemporalDate(item, options);
    }
    static compare(oneParam, twoParam) {
        const one = ToTemporalDate(oneParam);
        const two = ToTemporalDate(twoParam);
        return CompareISODate(GetSlot(one, ISO_DATE), GetSlot(two, ISO_DATE));
    }
}
MakeIntrinsicClass(PlainDate, 'Temporal.PlainDate');
function getCalendarProperty$4(date, prop) {
    CheckReceiver(date, IsTemporalDate);
    const isoDate = GetSlot(date, ISO_DATE);
    return calendarImplForObj(date).isoToDate(isoDate, { [prop]: true })[prop];
}

class PlainDateTime {
    constructor(isoYear, isoMonth, isoDay, hourParam = 0, minuteParam = 0, secondParam = 0, millisecondParam = 0, microsecondParam = 0, nanosecondParam = 0, calendarParam = 'iso8601') {
        const year = ToIntegerWithTruncation(isoYear);
        const month = ToIntegerWithTruncation(isoMonth);
        const day = ToIntegerWithTruncation(isoDay);
        const hour = hourParam === undefined ? 0 : ToIntegerWithTruncation(hourParam);
        const minute = minuteParam === undefined ? 0 : ToIntegerWithTruncation(minuteParam);
        const second = secondParam === undefined ? 0 : ToIntegerWithTruncation(secondParam);
        const millisecond = millisecondParam === undefined ? 0 : ToIntegerWithTruncation(millisecondParam);
        const microsecond = microsecondParam === undefined ? 0 : ToIntegerWithTruncation(microsecondParam);
        const nanosecond = nanosecondParam === undefined ? 0 : ToIntegerWithTruncation(nanosecondParam);
        const calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
        RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
        CreateTemporalDateTimeSlots(this, { isoDate: { year, month, day }, time: { hour, minute, second, millisecond, microsecond, nanosecond } }, calendar);
    }
    get calendarId() {
        CheckReceiver(this, IsTemporalDateTime);
        return GetSlot(this, CALENDAR);
    }
    get year() {
        return getCalendarProperty$3(this, 'year');
    }
    get month() {
        return getCalendarProperty$3(this, 'month');
    }
    get monthCode() {
        return getCalendarProperty$3(this, 'monthCode');
    }
    get day() {
        return getCalendarProperty$3(this, 'day');
    }
    get hour() {
        return getTimeProperty$1(this, 'hour');
    }
    get minute() {
        return getTimeProperty$1(this, 'minute');
    }
    get second() {
        return getTimeProperty$1(this, 'second');
    }
    get millisecond() {
        return getTimeProperty$1(this, 'millisecond');
    }
    get microsecond() {
        return getTimeProperty$1(this, 'microsecond');
    }
    get nanosecond() {
        return getTimeProperty$1(this, 'nanosecond');
    }
    get era() {
        return getCalendarProperty$3(this, 'era');
    }
    get eraYear() {
        return getCalendarProperty$3(this, 'eraYear');
    }
    get dayOfWeek() {
        return getCalendarProperty$3(this, 'dayOfWeek');
    }
    get dayOfYear() {
        return getCalendarProperty$3(this, 'dayOfYear');
    }
    get weekOfYear() {
        return getCalendarProperty$3(this, 'weekOfYear')?.week;
    }
    get yearOfWeek() {
        return getCalendarProperty$3(this, 'weekOfYear')?.year;
    }
    get daysInWeek() {
        return getCalendarProperty$3(this, 'daysInWeek');
    }
    get daysInYear() {
        return getCalendarProperty$3(this, 'daysInYear');
    }
    get daysInMonth() {
        return getCalendarProperty$3(this, 'daysInMonth');
    }
    get monthsInYear() {
        return getCalendarProperty$3(this, 'monthsInYear');
    }
    get inLeapYear() {
        return getCalendarProperty$3(this, 'inLeapYear');
    }
    with(temporalDateTimeLike, options = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        if (!IsObject(temporalDateTimeLike)) {
            throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalDateTimeLike);
        const calendar = GetSlot(this, CALENDAR);
        const isoDateTime = GetSlot(this, ISO_DATE_TIME);
        let fields = {
            ...ISODateToFields(calendar, isoDateTime.isoDate),
            ...isoDateTime.time
        };
        const partialDateTime = PrepareCalendarFields(calendar, temporalDateTimeLike, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond'], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialDateTime);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        const newDateTime = InterpretTemporalDateTimeFields(calendar, fields, overflow);
        return CreateTemporalDateTime(newDateTime, calendar);
    }
    withPlainTime(temporalTime = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        const time = ToTimeRecordOrMidnight(temporalTime);
        const isoDateTime = CombineISODateAndTimeRecord(GetSlot(this, ISO_DATE_TIME).isoDate, time);
        return CreateTemporalDateTime(isoDateTime, GetSlot(this, CALENDAR));
    }
    withCalendar(calendarParam) {
        CheckReceiver(this, IsTemporalDateTime);
        const calendar = ToTemporalCalendarIdentifier(calendarParam);
        return CreateTemporalDateTime(GetSlot(this, ISO_DATE_TIME), calendar);
    }
    add(temporalDurationLike, options = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        return AddDurationToDateTime('add', this, temporalDurationLike, options);
    }
    subtract(temporalDurationLike, options = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        return AddDurationToDateTime('subtract', this, temporalDurationLike, options);
    }
    until(other, options = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        return DifferenceTemporalPlainDateTime('until', this, other, options);
    }
    since(other, options = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        return DifferenceTemporalPlainDateTime('since', this, other, options);
    }
    round(roundToParam) {
        CheckReceiver(this, IsTemporalDateTime);
        if (roundToParam === undefined)
            throw new TypeError('options parameter is required');
        const roundTo = typeof roundToParam === 'string'
            ? CreateOnePropObject('smallestUnit', roundToParam)
            : GetOptionsObject(roundToParam);
        const roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        const roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        const smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'time', REQUIRED, ['day']);
        const maximumIncrements = {
            day: 1,
            hour: 24,
            minute: 60,
            second: 60,
            millisecond: 1000,
            microsecond: 1000,
            nanosecond: 1000
        };
        const maximum = maximumIncrements[smallestUnit];
        const inclusive = maximum === 1;
        ValidateTemporalRoundingIncrement(roundingIncrement, maximum, inclusive);
        const isoDateTime = GetSlot(this, ISO_DATE_TIME);
        if (roundingIncrement === 1 && smallestUnit === 'nanosecond') {
            return CreateTemporalDateTime(isoDateTime, GetSlot(this, CALENDAR));
        }
        const result = RoundISODateTime(isoDateTime, roundingIncrement, smallestUnit, roundingMode);
        return CreateTemporalDateTime(result, GetSlot(this, CALENDAR));
    }
    equals(otherParam) {
        CheckReceiver(this, IsTemporalDateTime);
        const other = ToTemporalDateTime(otherParam);
        if (CompareISODateTime(GetSlot(this, ISO_DATE_TIME), GetSlot(other, ISO_DATE_TIME)) !== 0)
            return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
    }
    toString(options = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        const resolvedOptions = GetOptionsObject(options);
        const showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        const digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        const roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        const smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour')
            throw new RangeError('smallestUnit must be a time unit other than "hour"');
        const { precision, unit, increment } = ToSecondsStringPrecisionRecord(smallestUnit, digits);
        const result = RoundISODateTime(GetSlot(this, ISO_DATE_TIME), increment, unit, roundingMode);
        RejectDateTimeRange(result);
        return ISODateTimeToString(result, GetSlot(this, CALENDAR), precision, showCalendar);
    }
    toJSON() {
        CheckReceiver(this, IsTemporalDateTime);
        return ISODateTimeToString(GetSlot(this, ISO_DATE_TIME), GetSlot(this, CALENDAR), 'auto');
    }
    toLocaleString(locales = undefined, options = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        return new DateTimeFormat(locales, options).format(this);
    }
    valueOf() {
        ValueOfThrows('PlainDateTime');
    }
    toZonedDateTime(temporalTimeZoneLike, options = undefined) {
        CheckReceiver(this, IsTemporalDateTime);
        const timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
        const resolvedOptions = GetOptionsObject(options);
        const disambiguation = GetTemporalDisambiguationOption(resolvedOptions);
        const epochNs = GetEpochNanosecondsFor(timeZone, GetSlot(this, ISO_DATE_TIME), disambiguation);
        return CreateTemporalZonedDateTime(epochNs, timeZone, GetSlot(this, CALENDAR));
    }
    toPlainDate() {
        CheckReceiver(this, IsTemporalDateTime);
        return CreateTemporalDate(GetSlot(this, ISO_DATE_TIME).isoDate, GetSlot(this, CALENDAR));
    }
    toPlainTime() {
        CheckReceiver(this, IsTemporalDateTime);
        return CreateTemporalTime(GetSlot(this, ISO_DATE_TIME).time);
    }
    static from(item, options = undefined) {
        return ToTemporalDateTime(item, options);
    }
    static compare(oneParam, twoParam) {
        const one = ToTemporalDateTime(oneParam);
        const two = ToTemporalDateTime(twoParam);
        return CompareISODateTime(GetSlot(one, ISO_DATE_TIME), GetSlot(two, ISO_DATE_TIME));
    }
}
MakeIntrinsicClass(PlainDateTime, 'Temporal.PlainDateTime');
function getCalendarProperty$3(dt, prop) {
    CheckReceiver(dt, IsTemporalDateTime);
    const isoDate = GetSlot(dt, ISO_DATE_TIME).isoDate;
    return calendarImplForObj(dt).isoToDate(isoDate, { [prop]: true })[prop];
}
function getTimeProperty$1(dt, prop) {
    CheckReceiver(dt, IsTemporalDateTime);
    return GetSlot(dt, ISO_DATE_TIME).time[prop];
}

class Duration {
    constructor(yearsParam = 0, monthsParam = 0, weeksParam = 0, daysParam = 0, hoursParam = 0, minutesParam = 0, secondsParam = 0, millisecondsParam = 0, microsecondsParam = 0, nanosecondsParam = 0) {
        const years = yearsParam === undefined ? 0 : ToIntegerIfIntegral(yearsParam);
        const months = monthsParam === undefined ? 0 : ToIntegerIfIntegral(monthsParam);
        const weeks = weeksParam === undefined ? 0 : ToIntegerIfIntegral(weeksParam);
        const days = daysParam === undefined ? 0 : ToIntegerIfIntegral(daysParam);
        const hours = hoursParam === undefined ? 0 : ToIntegerIfIntegral(hoursParam);
        const minutes = minutesParam === undefined ? 0 : ToIntegerIfIntegral(minutesParam);
        const seconds = secondsParam === undefined ? 0 : ToIntegerIfIntegral(secondsParam);
        const milliseconds = millisecondsParam === undefined ? 0 : ToIntegerIfIntegral(millisecondsParam);
        const microseconds = microsecondsParam === undefined ? 0 : ToIntegerIfIntegral(microsecondsParam);
        const nanoseconds = nanosecondsParam === undefined ? 0 : ToIntegerIfIntegral(nanosecondsParam);
        RejectDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
        CreateSlots(this);
        SetSlot(this, YEARS, years);
        SetSlot(this, MONTHS, months);
        SetSlot(this, WEEKS, weeks);
        SetSlot(this, DAYS, days);
        SetSlot(this, HOURS, hours);
        SetSlot(this, MINUTES, minutes);
        SetSlot(this, SECONDS, seconds);
        SetSlot(this, MILLISECONDS, milliseconds);
        SetSlot(this, MICROSECONDS, microseconds);
        SetSlot(this, NANOSECONDS, nanoseconds);
        {
            Object.defineProperty(this, '_repr_', {
                value: `Temporal.Duration <${TemporalDurationToString(this, 'auto')}>`,
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
    }
    get years() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, YEARS);
    }
    get months() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, MONTHS);
    }
    get weeks() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, WEEKS);
    }
    get days() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, DAYS);
    }
    get hours() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, HOURS);
    }
    get minutes() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, MINUTES);
    }
    get seconds() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, SECONDS);
    }
    get milliseconds() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, MILLISECONDS);
    }
    get microseconds() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, MICROSECONDS);
    }
    get nanoseconds() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, NANOSECONDS);
    }
    get sign() {
        CheckReceiver(this, IsTemporalDuration);
        return DurationSign(this);
    }
    get blank() {
        CheckReceiver(this, IsTemporalDuration);
        return DurationSign(this) === 0;
    }
    with(durationLike) {
        CheckReceiver(this, IsTemporalDuration);
        const partialDuration = ToTemporalPartialDurationRecord(durationLike);
        const { years = GetSlot(this, YEARS), months = GetSlot(this, MONTHS), weeks = GetSlot(this, WEEKS), days = GetSlot(this, DAYS), hours = GetSlot(this, HOURS), minutes = GetSlot(this, MINUTES), seconds = GetSlot(this, SECONDS), milliseconds = GetSlot(this, MILLISECONDS), microseconds = GetSlot(this, MICROSECONDS), nanoseconds = GetSlot(this, NANOSECONDS) } = partialDuration;
        return new Duration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    }
    negated() {
        CheckReceiver(this, IsTemporalDuration);
        return CreateNegatedTemporalDuration(this);
    }
    abs() {
        CheckReceiver(this, IsTemporalDuration);
        return new Duration(Math.abs(GetSlot(this, YEARS)), Math.abs(GetSlot(this, MONTHS)), Math.abs(GetSlot(this, WEEKS)), Math.abs(GetSlot(this, DAYS)), Math.abs(GetSlot(this, HOURS)), Math.abs(GetSlot(this, MINUTES)), Math.abs(GetSlot(this, SECONDS)), Math.abs(GetSlot(this, MILLISECONDS)), Math.abs(GetSlot(this, MICROSECONDS)), Math.abs(GetSlot(this, NANOSECONDS)));
    }
    add(other) {
        CheckReceiver(this, IsTemporalDuration);
        return AddDurations('add', this, other);
    }
    subtract(other) {
        CheckReceiver(this, IsTemporalDuration);
        return AddDurations('subtract', this, other);
    }
    round(roundToParam) {
        CheckReceiver(this, IsTemporalDuration);
        if (roundToParam === undefined)
            throw new TypeError('options parameter is required');
        const existingLargestUnit = DefaultTemporalLargestUnit(this);
        const roundTo = typeof roundToParam === 'string'
            ? CreateOnePropObject('smallestUnit', roundToParam)
            : GetOptionsObject(roundToParam);
        let largestUnit = GetTemporalUnitValuedOption(roundTo, 'largestUnit', 'datetime', undefined, ['auto']);
        let { plainRelativeTo, zonedRelativeTo } = GetTemporalRelativeToOption(roundTo);
        const roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        const roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        let smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'datetime', undefined);
        let smallestUnitPresent = true;
        if (!smallestUnit) {
            smallestUnitPresent = false;
            smallestUnit = 'nanosecond';
        }
        const defaultLargestUnit = LargerOfTwoTemporalUnits(existingLargestUnit, smallestUnit);
        let largestUnitPresent = true;
        if (!largestUnit) {
            largestUnitPresent = false;
            largestUnit = defaultLargestUnit;
        }
        if (largestUnit === 'auto')
            largestUnit = defaultLargestUnit;
        if (!smallestUnitPresent && !largestUnitPresent) {
            throw new RangeError('at least one of smallestUnit or largestUnit is required');
        }
        if (LargerOfTwoTemporalUnits(largestUnit, smallestUnit) !== largestUnit) {
            throw new RangeError(`largestUnit ${largestUnit} cannot be smaller than smallestUnit ${smallestUnit}`);
        }
        const maximumIncrements = {
            hour: 24,
            minute: 60,
            second: 60,
            millisecond: 1000,
            microsecond: 1000,
            nanosecond: 1000
        };
        const maximum = maximumIncrements[smallestUnit];
        if (maximum !== undefined)
            ValidateTemporalRoundingIncrement(roundingIncrement, maximum, false);
        if (roundingIncrement > 1 && TemporalUnitCategory(smallestUnit) === 'date' && largestUnit !== smallestUnit) {
            throw new RangeError('For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit');
        }
        if (zonedRelativeTo) {
            let duration = ToInternalDurationRecord(this);
            const timeZone = GetSlot(zonedRelativeTo, TIME_ZONE);
            const calendar = GetSlot(zonedRelativeTo, CALENDAR);
            const relativeEpochNs = GetSlot(zonedRelativeTo, EPOCHNANOSECONDS);
            const targetEpochNs = AddZonedDateTime(relativeEpochNs, timeZone, calendar, duration);
            duration = DifferenceZonedDateTimeWithRounding(relativeEpochNs, targetEpochNs, timeZone, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode);
            if (TemporalUnitCategory(largestUnit) === 'date')
                largestUnit = 'hour';
            return TemporalDurationFromInternal(duration, largestUnit);
        }
        if (plainRelativeTo) {
            let duration = ToInternalDurationRecordWith24HourDays(this);
            const targetTime = AddTime(MidnightTimeRecord(), duration.time);
            // Delegate the date part addition to the calendar
            const isoRelativeToDate = GetSlot(plainRelativeTo, ISO_DATE);
            const calendar = GetSlot(plainRelativeTo, CALENDAR);
            const dateDuration = AdjustDateDurationRecord(duration.date, targetTime.deltaDays);
            const targetDate = CalendarDateAdd(calendar, isoRelativeToDate, dateDuration, 'constrain');
            const isoDateTime = CombineISODateAndTimeRecord(isoRelativeToDate, MidnightTimeRecord());
            const targetDateTime = CombineISODateAndTimeRecord(targetDate, targetTime);
            duration = DifferencePlainDateTimeWithRounding(isoDateTime, targetDateTime, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode);
            return TemporalDurationFromInternal(duration, largestUnit);
        }
        // No reference date to calculate difference relative to
        if (IsCalendarUnit(existingLargestUnit)) {
            throw new RangeError(`a starting point is required for ${existingLargestUnit}s balancing`);
        }
        if (IsCalendarUnit(largestUnit)) {
            throw new RangeError(`a starting point is required for ${largestUnit}s balancing`);
        }
        assert(!IsCalendarUnit(smallestUnit), 'smallestUnit was larger than largestUnit');
        let internalDuration = ToInternalDurationRecordWith24HourDays(this);
        if (smallestUnit === 'day') {
            // First convert time units up to days
            const { quotient, remainder } = internalDuration.time.divmod(DAY_NANOS);
            let days = internalDuration.date.days + ToNumber(quotient) + TotalTimeDuration(remainder, 'day');
            days = RoundNumberToIncrement(days, roundingIncrement, roundingMode);
            const dateDuration = { years: 0, months: 0, weeks: 0, days };
            internalDuration = CombineDateAndTimeDuration(dateDuration, TimeDuration.ZERO);
        }
        else {
            const timeDuration = RoundTimeDuration(internalDuration.time, roundingIncrement, smallestUnit, roundingMode);
            internalDuration = CombineDateAndTimeDuration(ZeroDateDuration(), timeDuration);
        }
        return TemporalDurationFromInternal(internalDuration, largestUnit);
    }
    total(optionsParam) {
        CheckReceiver(this, IsTemporalDuration);
        if (optionsParam === undefined)
            throw new TypeError('options argument is required');
        const options = typeof optionsParam === 'string'
            ? CreateOnePropObject('unit', optionsParam)
            : GetOptionsObject(optionsParam);
        let { plainRelativeTo, zonedRelativeTo } = GetTemporalRelativeToOption(options);
        const unit = GetTemporalUnitValuedOption(options, 'unit', 'datetime', REQUIRED);
        if (zonedRelativeTo) {
            const duration = ToInternalDurationRecord(this);
            const timeZone = GetSlot(zonedRelativeTo, TIME_ZONE);
            const calendar = GetSlot(zonedRelativeTo, CALENDAR);
            const relativeEpochNs = GetSlot(zonedRelativeTo, EPOCHNANOSECONDS);
            const targetEpochNs = AddZonedDateTime(relativeEpochNs, timeZone, calendar, duration);
            return DifferenceZonedDateTimeWithTotal(relativeEpochNs, targetEpochNs, timeZone, calendar, unit);
        }
        if (plainRelativeTo) {
            const duration = ToInternalDurationRecordWith24HourDays(this);
            let targetTime = AddTime(MidnightTimeRecord(), duration.time);
            // Delegate the date part addition to the calendar
            const isoRelativeToDate = GetSlot(plainRelativeTo, ISO_DATE);
            const calendar = GetSlot(plainRelativeTo, CALENDAR);
            const dateDuration = AdjustDateDurationRecord(duration.date, targetTime.deltaDays);
            const targetDate = CalendarDateAdd(calendar, isoRelativeToDate, dateDuration, 'constrain');
            const isoDateTime = CombineISODateAndTimeRecord(isoRelativeToDate, MidnightTimeRecord());
            const targetDateTime = CombineISODateAndTimeRecord(targetDate, targetTime);
            return ToNumber(DifferencePlainDateTimeWithTotal(isoDateTime, targetDateTime, calendar, unit));
        }
        // No reference date to calculate difference relative to
        const largestUnit = DefaultTemporalLargestUnit(this);
        if (IsCalendarUnit(largestUnit)) {
            throw new RangeError(`a starting point is required for ${largestUnit}s total`);
        }
        if (IsCalendarUnit(unit)) {
            throw new RangeError(`a starting point is required for ${unit}s total`);
        }
        const duration = ToInternalDurationRecordWith24HourDays(this);
        return TotalTimeDuration(duration.time, unit);
    }
    toString(options = undefined) {
        CheckReceiver(this, IsTemporalDuration);
        const resolvedOptions = GetOptionsObject(options);
        const digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        const roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        const smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour' || smallestUnit === 'minute') {
            throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');
        }
        const { precision, unit, increment } = ToSecondsStringPrecisionRecord(smallestUnit, digits);
        if (unit === 'nanosecond' && increment === 1)
            return TemporalDurationToString(this, precision);
        const largestUnit = DefaultTemporalLargestUnit(this);
        let internalDuration = ToInternalDurationRecord(this);
        const timeDuration = RoundTimeDuration(internalDuration.time, increment, unit, roundingMode);
        internalDuration = CombineDateAndTimeDuration(internalDuration.date, timeDuration);
        const roundedDuration = TemporalDurationFromInternal(internalDuration, LargerOfTwoTemporalUnits(largestUnit, 'second'));
        return TemporalDurationToString(roundedDuration, precision);
    }
    toJSON() {
        CheckReceiver(this, IsTemporalDuration);
        return TemporalDurationToString(this, 'auto');
    }
    toLocaleString(locales = undefined, options = undefined) {
        CheckReceiver(this, IsTemporalDuration);
        if (typeof Intl.DurationFormat === 'function') {
            const formatter = new Intl.DurationFormat(locales, options);
            return ModifiedIntlDurationFormatPrototypeFormat.call(formatter, this);
        }
        console.warn('Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat.');
        return TemporalDurationToString(this, 'auto');
    }
    valueOf() {
        ValueOfThrows('Duration');
    }
    static from(item) {
        return ToTemporalDuration(item);
    }
    static compare(oneParam, twoParam, options = undefined) {
        const one = ToTemporalDuration(oneParam);
        const two = ToTemporalDuration(twoParam);
        const resolvedOptions = GetOptionsObject(options);
        const { plainRelativeTo, zonedRelativeTo } = GetTemporalRelativeToOption(resolvedOptions);
        if (GetSlot(one, YEARS) === GetSlot(two, YEARS) &&
            GetSlot(one, MONTHS) === GetSlot(two, MONTHS) &&
            GetSlot(one, WEEKS) === GetSlot(two, WEEKS) &&
            GetSlot(one, DAYS) === GetSlot(two, DAYS) &&
            GetSlot(one, HOURS) === GetSlot(two, HOURS) &&
            GetSlot(one, MINUTES) === GetSlot(two, MINUTES) &&
            GetSlot(one, SECONDS) === GetSlot(two, SECONDS) &&
            GetSlot(one, MILLISECONDS) === GetSlot(two, MILLISECONDS) &&
            GetSlot(one, MICROSECONDS) === GetSlot(two, MICROSECONDS) &&
            GetSlot(one, NANOSECONDS) === GetSlot(two, NANOSECONDS)) {
            return 0;
        }
        const largestUnit1 = DefaultTemporalLargestUnit(one);
        const largestUnit2 = DefaultTemporalLargestUnit(two);
        const duration1 = ToInternalDurationRecord(one);
        const duration2 = ToInternalDurationRecord(two);
        if (zonedRelativeTo &&
            (TemporalUnitCategory(largestUnit1) === 'date' || TemporalUnitCategory(largestUnit2) === 'date')) {
            const timeZone = GetSlot(zonedRelativeTo, TIME_ZONE);
            const calendar = GetSlot(zonedRelativeTo, CALENDAR);
            const epochNs = GetSlot(zonedRelativeTo, EPOCHNANOSECONDS);
            const after1 = AddZonedDateTime(epochNs, timeZone, calendar, duration1);
            const after2 = AddZonedDateTime(epochNs, timeZone, calendar, duration2);
            return ComparisonResult(Number(after1 - after2));
        }
        let d1 = duration1.date.days;
        let d2 = duration2.date.days;
        if (IsCalendarUnit(largestUnit1) || IsCalendarUnit(largestUnit2)) {
            if (!plainRelativeTo) {
                throw new RangeError('A starting point is required for years, months, or weeks comparison');
            }
            d1 = DateDurationDays(duration1.date, plainRelativeTo);
            d2 = DateDurationDays(duration2.date, plainRelativeTo);
        }
        const timeDuration1 = duration1.time.add24HourDays(d1);
        const timeDuration2 = duration2.time.add24HourDays(d2);
        return timeDuration1.cmp(timeDuration2);
    }
}
MakeIntrinsicClass(Duration, 'Temporal.Duration');

class PlainMonthDay {
    constructor(isoMonth, isoDay, calendarParam = 'iso8601', referenceISOYear = 1972) {
        const month = ToIntegerWithTruncation(isoMonth);
        const day = ToIntegerWithTruncation(isoDay);
        const calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
        const year = ToIntegerWithTruncation(referenceISOYear);
        RejectISODate(year, month, day);
        CreateTemporalMonthDaySlots(this, { year, month, day }, calendar);
    }
    get monthCode() {
        return getCalendarProperty$2(this, 'monthCode');
    }
    get day() {
        return getCalendarProperty$2(this, 'day');
    }
    get calendarId() {
        CheckReceiver(this, IsTemporalMonthDay);
        return GetSlot(this, CALENDAR);
    }
    with(temporalMonthDayLike, options = undefined) {
        CheckReceiver(this, IsTemporalMonthDay);
        if (!IsObject(temporalMonthDayLike)) {
            throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalMonthDayLike);
        const calendar = GetSlot(this, CALENDAR);
        let fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE), 'month-day');
        const partialMonthDay = PrepareCalendarFields(calendar, temporalMonthDayLike, ['year', 'month', 'monthCode', 'day'], [], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialMonthDay);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        const isoDate = CalendarMonthDayFromFields(calendar, fields, overflow);
        return CreateTemporalMonthDay(isoDate, calendar);
    }
    equals(otherParam) {
        CheckReceiver(this, IsTemporalMonthDay);
        const other = ToTemporalMonthDay(otherParam);
        if (CompareISODate(GetSlot(this, ISO_DATE), GetSlot(other, ISO_DATE)) !== 0)
            return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
    }
    toString(options = undefined) {
        CheckReceiver(this, IsTemporalMonthDay);
        const resolvedOptions = GetOptionsObject(options);
        const showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        return TemporalMonthDayToString(this, showCalendar);
    }
    toJSON() {
        CheckReceiver(this, IsTemporalMonthDay);
        return TemporalMonthDayToString(this);
    }
    toLocaleString(locales = undefined, options = undefined) {
        CheckReceiver(this, IsTemporalMonthDay);
        return new DateTimeFormat(locales, options).format(this);
    }
    valueOf() {
        ValueOfThrows('PlainMonthDay');
    }
    toPlainDate(item) {
        CheckReceiver(this, IsTemporalMonthDay);
        if (!IsObject(item))
            throw new TypeError('argument should be an object');
        const calendar = GetSlot(this, CALENDAR);
        const fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE), 'month-day');
        const inputFields = PrepareCalendarFields(calendar, item, ['year'], [], []);
        let mergedFields = CalendarMergeFields(calendar, fields, inputFields);
        const isoDate = CalendarDateFromFields(calendar, mergedFields, 'constrain');
        return CreateTemporalDate(isoDate, calendar);
    }
    static from(item, options = undefined) {
        return ToTemporalMonthDay(item, options);
    }
}
MakeIntrinsicClass(PlainMonthDay, 'Temporal.PlainMonthDay');
function getCalendarProperty$2(md, prop) {
    CheckReceiver(md, IsTemporalMonthDay);
    const isoDate = GetSlot(md, ISO_DATE);
    return calendarImplForObj(md).isoToDate(isoDate, { [prop]: true })[prop];
}

function SystemDateTime(timeZone) {
    return GetISODateTimeFor(timeZone, SystemUTCEpochNanoSeconds());
}
const instant = () => {
    return CreateTemporalInstant(SystemUTCEpochNanoSeconds());
};
const plainDateTimeISO = (temporalTimeZoneLike = DefaultTimeZone()) => {
    const timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
    const isoDateTime = SystemDateTime(timeZone);
    return CreateTemporalDateTime(isoDateTime, 'iso8601');
};
const zonedDateTimeISO = (temporalTimeZoneLike = DefaultTimeZone()) => {
    const timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
    return CreateTemporalZonedDateTime(SystemUTCEpochNanoSeconds(), timeZone, 'iso8601');
};
const plainDateISO = (temporalTimeZoneLike = DefaultTimeZone()) => {
    const timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
    const isoDateTime = SystemDateTime(timeZone);
    return CreateTemporalDate(isoDateTime.isoDate, 'iso8601');
};
const plainTimeISO = (temporalTimeZoneLike = DefaultTimeZone()) => {
    const timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
    const isoDateTime = SystemDateTime(timeZone);
    return CreateTemporalTime(isoDateTime.time);
};
const timeZoneId = () => {
    return DefaultTimeZone();
};
const Now = {
    instant,
    plainDateTimeISO,
    plainDateISO,
    plainTimeISO,
    timeZoneId,
    zonedDateTimeISO,
    [Symbol.toStringTag]: 'Temporal.Now'
};
Object.defineProperty(Now, Symbol.toStringTag, {
    value: 'Temporal.Now',
    writable: false,
    enumerable: false,
    configurable: true
});

class PlainTime {
    constructor(isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0) {
        const hour = isoHour === undefined ? 0 : ToIntegerWithTruncation(isoHour);
        const minute = isoMinute === undefined ? 0 : ToIntegerWithTruncation(isoMinute);
        const second = isoSecond === undefined ? 0 : ToIntegerWithTruncation(isoSecond);
        const millisecond = isoMillisecond === undefined ? 0 : ToIntegerWithTruncation(isoMillisecond);
        const microsecond = isoMicrosecond === undefined ? 0 : ToIntegerWithTruncation(isoMicrosecond);
        const nanosecond = isoNanosecond === undefined ? 0 : ToIntegerWithTruncation(isoNanosecond);
        RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
        const time = { hour, minute, second, millisecond, microsecond, nanosecond };
        CreateTemporalTimeSlots(this, time);
    }
    get hour() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).hour;
    }
    get minute() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).minute;
    }
    get second() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).second;
    }
    get millisecond() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).millisecond;
    }
    get microsecond() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).microsecond;
    }
    get nanosecond() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).nanosecond;
    }
    with(temporalTimeLike, options = undefined) {
        CheckReceiver(this, IsTemporalTime);
        if (!IsObject(temporalTimeLike)) {
            throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalTimeLike);
        const partialTime = ToTemporalTimeRecord(temporalTimeLike, 'partial');
        const fields = ToTemporalTimeRecord(this);
        let { hour, minute, second, millisecond, microsecond, nanosecond } = Object.assign(fields, partialTime);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        ({ hour, minute, second, millisecond, microsecond, nanosecond } = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, overflow));
        return new PlainTime(hour, minute, second, millisecond, microsecond, nanosecond);
    }
    add(temporalDurationLike) {
        CheckReceiver(this, IsTemporalTime);
        return AddDurationToTime('add', this, temporalDurationLike);
    }
    subtract(temporalDurationLike) {
        CheckReceiver(this, IsTemporalTime);
        return AddDurationToTime('subtract', this, temporalDurationLike);
    }
    until(other, options = undefined) {
        CheckReceiver(this, IsTemporalTime);
        return DifferenceTemporalPlainTime('until', this, other, options);
    }
    since(other, options = undefined) {
        CheckReceiver(this, IsTemporalTime);
        return DifferenceTemporalPlainTime('since', this, other, options);
    }
    round(roundToParam) {
        CheckReceiver(this, IsTemporalTime);
        if (roundToParam === undefined)
            throw new TypeError('options parameter is required');
        const roundTo = typeof roundToParam === 'string'
            ? CreateOnePropObject('smallestUnit', roundToParam)
            : GetOptionsObject(roundToParam);
        const roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        const roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        const smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'time', REQUIRED);
        const MAX_INCREMENTS = {
            hour: 24,
            minute: 60,
            second: 60,
            millisecond: 1000,
            microsecond: 1000,
            nanosecond: 1000
        };
        ValidateTemporalRoundingIncrement(roundingIncrement, MAX_INCREMENTS[smallestUnit], false);
        const time = RoundTime(GetSlot(this, TIME), roundingIncrement, smallestUnit, roundingMode);
        return CreateTemporalTime(time);
    }
    equals(otherParam) {
        CheckReceiver(this, IsTemporalTime);
        const other = ToTemporalTime(otherParam);
        return CompareTimeRecord(GetSlot(this, TIME), GetSlot(other, TIME)) === 0;
    }
    toString(options = undefined) {
        CheckReceiver(this, IsTemporalTime);
        const resolvedOptions = GetOptionsObject(options);
        const digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        const roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        const smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour')
            throw new RangeError('smallestUnit must be a time unit other than "hour"');
        const { precision, unit, increment } = ToSecondsStringPrecisionRecord(smallestUnit, digits);
        const time = RoundTime(GetSlot(this, TIME), increment, unit, roundingMode);
        return TimeRecordToString(time, precision);
    }
    toJSON() {
        CheckReceiver(this, IsTemporalTime);
        return TimeRecordToString(GetSlot(this, TIME), 'auto');
    }
    toLocaleString(locales = undefined, options = undefined) {
        CheckReceiver(this, IsTemporalTime);
        return new DateTimeFormat(locales, options).format(this);
    }
    valueOf() {
        ValueOfThrows('PlainTime');
    }
    static from(item, options = undefined) {
        return ToTemporalTime(item, options);
    }
    static compare(oneParam, twoParam) {
        const one = ToTemporalTime(oneParam);
        const two = ToTemporalTime(twoParam);
        return CompareTimeRecord(GetSlot(one, TIME), GetSlot(two, TIME));
    }
}
MakeIntrinsicClass(PlainTime, 'Temporal.PlainTime');

class PlainYearMonth {
    constructor(isoYear, isoMonth, calendarParam = 'iso8601', referenceISODay = 1) {
        const year = ToIntegerWithTruncation(isoYear);
        const month = ToIntegerWithTruncation(isoMonth);
        const calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
        const day = ToIntegerWithTruncation(referenceISODay);
        RejectISODate(year, month, day);
        CreateTemporalYearMonthSlots(this, { year, month, day }, calendar);
    }
    get year() {
        return getCalendarProperty$1(this, 'year');
    }
    get month() {
        return getCalendarProperty$1(this, 'month');
    }
    get monthCode() {
        return getCalendarProperty$1(this, 'monthCode');
    }
    get calendarId() {
        CheckReceiver(this, IsTemporalYearMonth);
        return GetSlot(this, CALENDAR);
    }
    get era() {
        return getCalendarProperty$1(this, 'era');
    }
    get eraYear() {
        return getCalendarProperty$1(this, 'eraYear');
    }
    get daysInMonth() {
        return getCalendarProperty$1(this, 'daysInMonth');
    }
    get daysInYear() {
        return getCalendarProperty$1(this, 'daysInYear');
    }
    get monthsInYear() {
        return getCalendarProperty$1(this, 'monthsInYear');
    }
    get inLeapYear() {
        return getCalendarProperty$1(this, 'inLeapYear');
    }
    with(temporalYearMonthLike, options = undefined) {
        CheckReceiver(this, IsTemporalYearMonth);
        if (!IsObject(temporalYearMonthLike)) {
            throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalYearMonthLike);
        const calendar = GetSlot(this, CALENDAR);
        let fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE), 'year-month');
        const partialYearMonth = PrepareCalendarFields(calendar, temporalYearMonthLike, ['year', 'month', 'monthCode'], [], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialYearMonth);
        const overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        const isoDate = CalendarYearMonthFromFields(calendar, fields, overflow);
        return CreateTemporalYearMonth(isoDate, calendar);
    }
    add(temporalDurationLike, options = undefined) {
        CheckReceiver(this, IsTemporalYearMonth);
        return AddDurationToYearMonth('add', this, temporalDurationLike, options);
    }
    subtract(temporalDurationLike, options = undefined) {
        CheckReceiver(this, IsTemporalYearMonth);
        return AddDurationToYearMonth('subtract', this, temporalDurationLike, options);
    }
    until(other, options = undefined) {
        CheckReceiver(this, IsTemporalYearMonth);
        return DifferenceTemporalPlainYearMonth('until', this, other, options);
    }
    since(other, options = undefined) {
        CheckReceiver(this, IsTemporalYearMonth);
        return DifferenceTemporalPlainYearMonth('since', this, other, options);
    }
    equals(otherParam) {
        CheckReceiver(this, IsTemporalYearMonth);
        const other = ToTemporalYearMonth(otherParam);
        if (CompareISODate(GetSlot(this, ISO_DATE), GetSlot(other, ISO_DATE)) !== 0)
            return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
    }
    toString(options = undefined) {
        CheckReceiver(this, IsTemporalYearMonth);
        const resolvedOptions = GetOptionsObject(options);
        const showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        return TemporalYearMonthToString(this, showCalendar);
    }
    toJSON() {
        CheckReceiver(this, IsTemporalYearMonth);
        return TemporalYearMonthToString(this);
    }
    toLocaleString(locales = undefined, options = undefined) {
        CheckReceiver(this, IsTemporalYearMonth);
        return new DateTimeFormat(locales, options).format(this);
    }
    valueOf() {
        ValueOfThrows('PlainYearMonth');
    }
    toPlainDate(item) {
        CheckReceiver(this, IsTemporalYearMonth);
        if (!IsObject(item))
            throw new TypeError('argument should be an object');
        const calendar = GetSlot(this, CALENDAR);
        const fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE), 'year-month');
        const inputFields = PrepareCalendarFields(calendar, item, ['day'], [], []);
        const mergedFields = CalendarMergeFields(calendar, fields, inputFields);
        const isoDate = CalendarDateFromFields(calendar, mergedFields, 'constrain');
        return CreateTemporalDate(isoDate, calendar);
    }
    static from(item, options = undefined) {
        return ToTemporalYearMonth(item, options);
    }
    static compare(oneParam, twoParam) {
        const one = ToTemporalYearMonth(oneParam);
        const two = ToTemporalYearMonth(twoParam);
        return CompareISODate(GetSlot(one, ISO_DATE), GetSlot(two, ISO_DATE));
    }
}
MakeIntrinsicClass(PlainYearMonth, 'Temporal.PlainYearMonth');
function getCalendarProperty$1(ym, prop) {
    CheckReceiver(ym, IsTemporalYearMonth);
    const isoDate = GetSlot(ym, ISO_DATE);
    return calendarImplForObj(ym).isoToDate(isoDate, { [prop]: true })[prop];
}

const customResolvedOptions = DateTimeFormat.prototype.resolvedOptions;
class ZonedDateTime {
    constructor(epochNanosecondsParam, timeZoneParam, calendarParam = 'iso8601') {
        // Note: if the argument is not passed, ToBigInt(undefined) will throw. This check exists only
        //       to improve the error message.
        if (arguments.length < 1) {
            throw new TypeError('missing argument: epochNanoseconds is required');
        }
        const epochNanoseconds = epochNanosecondsParam;
        let timeZone = RequireString(timeZoneParam);
        const { tzName, offsetMinutes } = ParseTimeZoneIdentifier(timeZone);
        if (offsetMinutes === undefined) {
            // if offsetMinutes is undefined, then tzName must be present
            const record = GetAvailableNamedTimeZoneIdentifier(tzName);
            if (!record)
                throw new RangeError(`unknown time zone ${tzName}`);
            timeZone = record.identifier;
        }
        else {
            timeZone = FormatOffsetTimeZoneIdentifier(offsetMinutes);
        }
        const calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
        CreateTemporalZonedDateTimeSlots(this, epochNanoseconds, timeZone, calendar);
    }
    get calendarId() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return GetSlot(this, CALENDAR);
    }
    get timeZoneId() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return GetSlot(this, TIME_ZONE);
    }
    get year() {
        return getCalendarProperty(this, 'year');
    }
    get month() {
        return getCalendarProperty(this, 'month');
    }
    get monthCode() {
        return getCalendarProperty(this, 'monthCode');
    }
    get day() {
        return getCalendarProperty(this, 'day');
    }
    get hour() {
        return getTimeProperty(this, 'hour');
    }
    get minute() {
        return getTimeProperty(this, 'minute');
    }
    get second() {
        return getTimeProperty(this, 'second');
    }
    get millisecond() {
        return getTimeProperty(this, 'millisecond');
    }
    get microsecond() {
        return getTimeProperty(this, 'microsecond');
    }
    get nanosecond() {
        return getTimeProperty(this, 'nanosecond');
    }
    get era() {
        return getCalendarProperty(this, 'era');
    }
    get eraYear() {
        return getCalendarProperty(this, 'eraYear');
    }
    get epochMilliseconds() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const value = GetSlot(this, EPOCHNANOSECONDS);
        return epochNsToMs(value, 'floor');
    }
    get epochNanoseconds() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return ToBigIntExternal(GetSlot(this, EPOCHNANOSECONDS));
    }
    get dayOfWeek() {
        return getCalendarProperty(this, 'dayOfWeek');
    }
    get dayOfYear() {
        return getCalendarProperty(this, 'dayOfYear');
    }
    get weekOfYear() {
        return getCalendarProperty(this, 'weekOfYear')?.week;
    }
    get yearOfWeek() {
        return getCalendarProperty(this, 'weekOfYear')?.year;
    }
    get hoursInDay() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const timeZone = GetSlot(this, TIME_ZONE);
        const today = dateTime(this).isoDate;
        const tomorrow = BalanceISODate(today.year, today.month, today.day + 1);
        const todayNs = GetStartOfDay(timeZone, today);
        const tomorrowNs = GetStartOfDay(timeZone, tomorrow);
        const diff = TimeDuration.fromEpochNsDiff(tomorrowNs, todayNs);
        return TotalTimeDuration(diff, 'hour');
    }
    get daysInWeek() {
        return getCalendarProperty(this, 'daysInWeek');
    }
    get daysInMonth() {
        return getCalendarProperty(this, 'daysInMonth');
    }
    get daysInYear() {
        return getCalendarProperty(this, 'daysInYear');
    }
    get monthsInYear() {
        return getCalendarProperty(this, 'monthsInYear');
    }
    get inLeapYear() {
        return getCalendarProperty(this, 'inLeapYear');
    }
    get offset() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const offsetNs = GetOffsetNanosecondsFor(GetSlot(this, TIME_ZONE), GetSlot(this, EPOCHNANOSECONDS));
        return FormatUTCOffsetNanoseconds(BigInt(offsetNs));
    }
    get offsetNanoseconds() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return GetOffsetNanosecondsFor(GetSlot(this, TIME_ZONE), GetSlot(this, EPOCHNANOSECONDS));
    }
    with(temporalZonedDateTimeLike, options = undefined) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        if (!IsObject(temporalZonedDateTimeLike)) {
            throw new TypeError('invalid zoned-date-time-like');
        }
        RejectTemporalLikeObject(temporalZonedDateTimeLike);
        const calendar = GetSlot(this, CALENDAR);
        const timeZone = GetSlot(this, TIME_ZONE);
        const epochNs = GetSlot(this, EPOCHNANOSECONDS);
        const offsetNs = GetOffsetNanosecondsFor(timeZone, epochNs);
        const isoDateTime = dateTime(this);
        let fields = {
            ...ISODateToFields(calendar, isoDateTime.isoDate),
            ...isoDateTime.time,
            offset: FormatUTCOffsetNanoseconds(BigInt(offsetNs))
        };
        const partialZonedDateTime = PrepareCalendarFields(calendar, temporalZonedDateTimeLike, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'offset'], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialZonedDateTime);
        const resolvedOptions = GetOptionsObject(options);
        const disambiguation = GetTemporalDisambiguationOption(resolvedOptions);
        const offset = GetTemporalOffsetOption(resolvedOptions, 'prefer');
        const overflow = GetTemporalOverflowOption(resolvedOptions);
        const newDateTime = InterpretTemporalDateTimeFields(calendar, fields, overflow);
        const newOffsetNs = ParseDateTimeUTCOffset(fields.offset);
        const epochNanoseconds = InterpretISODateTimeOffset(newDateTime.isoDate, newDateTime.time, 'option', newOffsetNs, timeZone, disambiguation, offset,
        /* matchMinute = */ false);
        return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar);
    }
    withPlainTime(temporalTimeParam = undefined) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const timeZone = GetSlot(this, TIME_ZONE);
        const calendar = GetSlot(this, CALENDAR);
        const iso = dateTime(this).isoDate;
        let epochNs;
        if (temporalTimeParam === undefined) {
            epochNs = GetStartOfDay(timeZone, iso);
        }
        else {
            const temporalTime = ToTemporalTime(temporalTimeParam);
            const dt = CombineISODateAndTimeRecord(iso, GetSlot(temporalTime, TIME));
            epochNs = GetEpochNanosecondsFor(timeZone, dt, 'compatible');
        }
        return CreateTemporalZonedDateTime(epochNs, timeZone, calendar);
    }
    withTimeZone(timeZoneParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const timeZone = ToTemporalTimeZoneIdentifier(timeZoneParam);
        return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), timeZone, GetSlot(this, CALENDAR));
    }
    withCalendar(calendarParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const calendar = ToTemporalCalendarIdentifier(calendarParam);
        return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), GetSlot(this, TIME_ZONE), calendar);
    }
    add(temporalDurationLike, options = undefined) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return AddDurationToZonedDateTime('add', this, temporalDurationLike, options);
    }
    subtract(temporalDurationLike, options = undefined) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return AddDurationToZonedDateTime('subtract', this, temporalDurationLike, options);
    }
    until(other, options = undefined) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return DifferenceTemporalZonedDateTime('until', this, other, options);
    }
    since(other, options = undefined) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return DifferenceTemporalZonedDateTime('since', this, other, options);
    }
    round(roundToParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        if (roundToParam === undefined)
            throw new TypeError('options parameter is required');
        const roundTo = typeof roundToParam === 'string'
            ? CreateOnePropObject('smallestUnit', roundToParam)
            : GetOptionsObject(roundToParam);
        const roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        const roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        const smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'time', REQUIRED, ['day']);
        const maximumIncrements = {
            day: 1,
            hour: 24,
            minute: 60,
            second: 60,
            millisecond: 1000,
            microsecond: 1000,
            nanosecond: 1000
        };
        const maximum = maximumIncrements[smallestUnit];
        const inclusive = maximum === 1;
        ValidateTemporalRoundingIncrement(roundingIncrement, maximum, inclusive);
        if (smallestUnit === 'nanosecond' && roundingIncrement === 1) {
            return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), GetSlot(this, TIME_ZONE), GetSlot(this, CALENDAR));
        }
        // first, round the underlying DateTime fields
        const timeZone = GetSlot(this, TIME_ZONE);
        const thisNs = GetSlot(this, EPOCHNANOSECONDS);
        const iso = dateTime(this);
        let epochNanoseconds;
        if (smallestUnit === 'day') {
            // Compute Instants for start-of-day and end-of-day
            // Determine how far the current instant has progressed through this span.
            const dateStart = iso.isoDate;
            const dateEnd = BalanceISODate(dateStart.year, dateStart.month, dateStart.day + 1);
            const startNs = GetStartOfDay(timeZone, dateStart);
            assert(thisNs >= startNs, 'cannot produce an instant during a day that occurs before start-of-day instant');
            const endNs = GetStartOfDay(timeZone, dateEnd);
            assert(thisNs < endNs, 'cannot produce an instant during a day that occurs on or after end-of-day instant');
            const dayLengthNs = endNs - startNs;
            const dayProgressNs = TimeDuration.fromEpochNsDiff(thisNs, startNs);
            const roundedDayNs = dayProgressNs.round(dayLengthNs, roundingMode);
            epochNanoseconds = roundedDayNs.addToEpochNs(startNs);
        }
        else {
            // smallestUnit < day
            // Round based on ISO-calendar time units
            const roundedDateTime = RoundISODateTime(iso, roundingIncrement, smallestUnit, roundingMode);
            // Now reset all DateTime fields but leave the TimeZone. The offset will
            // also be retained if the new date/time values are still OK with the old
            // offset. Otherwise the offset will be changed to be compatible with the
            // new date/time values. If DST disambiguation is required, the `compatible`
            // disambiguation algorithm will be used.
            const offsetNs = GetOffsetNanosecondsFor(timeZone, thisNs);
            epochNanoseconds = InterpretISODateTimeOffset(roundedDateTime.isoDate, roundedDateTime.time, 'option', offsetNs, timeZone, 'compatible', 'prefer',
            /* matchMinute = */ false);
        }
        return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, GetSlot(this, CALENDAR));
    }
    equals(otherParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const other = ToTemporalZonedDateTime(otherParam);
        const one = GetSlot(this, EPOCHNANOSECONDS);
        const two = GetSlot(other, EPOCHNANOSECONDS);
        if (one !== two)
            return false;
        if (!TimeZoneEquals(GetSlot(this, TIME_ZONE), GetSlot(other, TIME_ZONE)))
            return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
    }
    toString(options = undefined) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const resolvedOptions = GetOptionsObject(options);
        const showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        const digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        const showOffset = GetTemporalShowOffsetOption(resolvedOptions);
        const roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        const smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour')
            throw new RangeError('smallestUnit must be a time unit other than "hour"');
        const showTimeZone = GetTemporalShowTimeZoneNameOption(resolvedOptions);
        const { precision, unit, increment } = ToSecondsStringPrecisionRecord(smallestUnit, digits);
        return TemporalZonedDateTimeToString(this, precision, showCalendar, showTimeZone, showOffset, {
            unit,
            increment,
            roundingMode
        });
    }
    toLocaleString(locales = undefined, options = undefined) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const resolvedOptions = GetOptionsObject(options);
        // This is not quite per specification, but this polyfill's DateTimeFormat
        // already doesn't match the InitializeDateTimeFormat operation, and the
        // access order might change anyway;
        // see https://github.com/tc39/ecma402/issues/747
        const optionsCopy = Object.create(null);
        CopyDataProperties(optionsCopy, resolvedOptions, ['timeZone']);
        if (resolvedOptions.timeZone !== undefined) {
            throw new TypeError('ZonedDateTime toLocaleString does not accept a timeZone option');
        }
        if (optionsCopy.year === undefined &&
            optionsCopy.month === undefined &&
            optionsCopy.day === undefined &&
            optionsCopy.era === undefined &&
            optionsCopy.weekday === undefined &&
            optionsCopy.dateStyle === undefined &&
            optionsCopy.hour === undefined &&
            optionsCopy.minute === undefined &&
            optionsCopy.second === undefined &&
            optionsCopy.fractionalSecondDigits === undefined &&
            optionsCopy.timeStyle === undefined &&
            optionsCopy.dayPeriod === undefined &&
            optionsCopy.timeZoneName === undefined) {
            optionsCopy.timeZoneName = 'short';
            // The rest of the defaults will be filled in by formatting the Instant
        }
        optionsCopy.timeZone = GetSlot(this, TIME_ZONE);
        if (IsOffsetTimeZoneIdentifier(optionsCopy.timeZone)) {
            // Note: https://github.com/tc39/ecma402/issues/683 will remove this
            throw new RangeError('toLocaleString does not currently support offset time zones');
        }
        const formatter = new DateTimeFormat(locales, optionsCopy);
        const localeCalendarIdentifier = customResolvedOptions.call(formatter).calendar;
        const calendarIdentifier = GetSlot(this, CALENDAR);
        if (calendarIdentifier !== 'iso8601' &&
            localeCalendarIdentifier !== 'iso8601' &&
            !CalendarEquals(localeCalendarIdentifier, calendarIdentifier)) {
            throw new RangeError(`cannot format ZonedDateTime with calendar ${calendarIdentifier}` +
                ` in locale with calendar ${localeCalendarIdentifier}`);
        }
        return formatter.format(CreateTemporalInstant(GetSlot(this, EPOCHNANOSECONDS)));
    }
    toJSON() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return TemporalZonedDateTimeToString(this, 'auto');
    }
    valueOf() {
        ValueOfThrows('ZonedDateTime');
    }
    startOfDay() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const timeZone = GetSlot(this, TIME_ZONE);
        const isoDate = dateTime(this).isoDate;
        const epochNanoseconds = GetStartOfDay(timeZone, isoDate);
        return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, GetSlot(this, CALENDAR));
    }
    getTimeZoneTransition(directionParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        const timeZone = GetSlot(this, TIME_ZONE);
        if (directionParam === undefined)
            throw new TypeError('options parameter is required');
        const direction = GetDirectionOption(typeof directionParam === 'string'
            ? CreateOnePropObject('direction', directionParam)
            : GetOptionsObject(directionParam));
        if (direction === undefined)
            throw new TypeError('direction option is required');
        // Offset time zones or UTC have no transitions
        if (IsOffsetTimeZoneIdentifier(timeZone) || timeZone === 'UTC') {
            return null;
        }
        const thisEpochNanoseconds = GetSlot(this, EPOCHNANOSECONDS);
        const epochNanoseconds = direction === 'next'
            ? GetNamedTimeZoneNextTransition(timeZone, thisEpochNanoseconds)
            : GetNamedTimeZonePreviousTransition(timeZone, thisEpochNanoseconds);
        return epochNanoseconds === null
            ? null
            : CreateTemporalZonedDateTime(epochNanoseconds, timeZone, GetSlot(this, CALENDAR));
    }
    toInstant() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return CreateTemporalInstant(GetSlot(this, EPOCHNANOSECONDS));
    }
    toPlainDate() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return CreateTemporalDate(dateTime(this).isoDate, GetSlot(this, CALENDAR));
    }
    toPlainTime() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return CreateTemporalTime(dateTime(this).time);
    }
    toPlainDateTime() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return CreateTemporalDateTime(dateTime(this), GetSlot(this, CALENDAR));
    }
    static from(item, optionsParam = undefined) {
        return ToTemporalZonedDateTime(item, optionsParam);
    }
    static compare(oneParam, twoParam) {
        const one = ToTemporalZonedDateTime(oneParam);
        const two = ToTemporalZonedDateTime(twoParam);
        const ns1 = GetSlot(one, EPOCHNANOSECONDS);
        const ns2 = GetSlot(two, EPOCHNANOSECONDS);
        if (BigInt(ns1) < BigInt(ns2))
            return -1;
        if (BigInt(ns1) > BigInt(ns2))
            return 1;
        return 0;
    }
}
MakeIntrinsicClass(ZonedDateTime, 'Temporal.ZonedDateTime');
function dateTime(zdt) {
    return GetISODateTimeFor(GetSlot(zdt, TIME_ZONE), GetSlot(zdt, EPOCHNANOSECONDS));
}
function getCalendarProperty(zdt, prop) {
    CheckReceiver(zdt, IsTemporalZonedDateTime);
    const isoDate = dateTime(zdt).isoDate;
    return calendarImplForObj(zdt).isoToDate(isoDate, { [prop]: true })[prop];
}
function getTimeProperty(zdt, prop) {
    CheckReceiver(zdt, IsTemporalZonedDateTime);
    return dateTime(zdt).time[prop];
}

var temporal = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Duration: Duration,
    Instant: Instant,
    Now: Now,
    PlainDate: PlainDate,
    PlainDateTime: PlainDateTime,
    PlainMonthDay: PlainMonthDay,
    PlainTime: PlainTime,
    PlainYearMonth: PlainYearMonth,
    ZonedDateTime: ZonedDateTime
});

// By default, a plain function can be called as a constructor. A method such as
// Date.prototype.toTemporalInstant should not be able to. We could check
// new.target in the body of toTemporalInstant, but that is not sufficient for
// preventing construction when passing it as the newTarget parameter of
// Reflect.construct. So we create it as a method of an otherwise unused class,
// and monkeypatch it onto Date.prototype.
class LegacyDateImpl {
    toTemporalInstant() {
        const epochNanoseconds = epochMsToNs(Date.prototype.valueOf.call(this));
        return CreateTemporalInstant(epochNanoseconds);
    }
}
const toTemporalInstant = LegacyDateImpl.prototype.toTemporalInstant;

// This entry point treats Temporal as a library, and does not polyfill it onto
// the global object.
// This is in order to avoid breaking the web in the future, if the polyfill
// gains wide adoption before the API is finalized. We do not want checks such
// as `if (typeof Temporal === 'undefined')` in the wild, until browsers start
// shipping the finalized API.
// Work around https://github.com/babel/babel/issues/2025.
const types = [
    Instant,
    PlainDate,
    PlainDateTime,
    Duration,
    PlainMonthDay,
    // Temporal.Now, // plain object (not a constructor), so no `prototype`
    PlainTime,
    PlainYearMonth,
    ZonedDateTime
];
for (const type of types) {
    const descriptor = Object.getOwnPropertyDescriptor(type, 'prototype');
    if (descriptor.configurable || descriptor.enumerable || descriptor.writable) {
        descriptor.configurable = false;
        descriptor.enumerable = false;
        descriptor.writable = false;
        Object.defineProperty(type, 'prototype', descriptor);
    }
}

export { intl as Intl, temporal as Temporal, toTemporalInstant };
//# sourceMappingURL=index.esm.js.map
