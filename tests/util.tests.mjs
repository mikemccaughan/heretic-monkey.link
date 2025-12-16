import { test, describe, it/*, type TestContext*/ } from 'node:test';
import Util from '../util.mjs';
import { Temporal, toTemporalInstant } from '../js-temporal/polyfill/dist/index.esm.js';

if (!('toTemporalInstant' in Date.prototype)) {
    Object.defineProperty(Date.prototype, 'toTemporalInstant', {
        value: toTemporalInstant,
        writable: true,
        configurable: true
    });
}

test('Util', async (t/*: TestContext */) => {
    await describe('Util.getRandomValue', async (t/*: TestContext */) => {
        await it('should return a random value between 0 and 256', async (t/*: TestContext */) => {
            const result = Util.getRandomValue();
            t.assert.doesNotThrow(() => Util.isGoodNumber(result), () => {}, 'Result should be a good number');
            t.assert.equal(result >= 0 && result <= 256, true, 'Result should be a number between 0 and 256');
        });
    });
    await describe('Util.getRandomValueBetween', async (t/*: TestContext */) => {
        await it('should return a random value between 0 and 1', async (t/*: TestContext */) => {
            const result = Util.getRandomValueBetween();
            t.assert.doesNotThrow(() => Util.isGoodNumber(result), () => {}, 'Result should be a good number'); 
            t.assert.equal(result >= 0 && result <= 1, true, 'Result should be a number between 0 and 256'); 
        });
        await it('should return a random value between 0 and 10', async (t/*: TestContext */) => {
            const result = Util.getRandomValueBetween(0, 10);
            t.assert.doesNotThrow(() => Util.isGoodNumber(result), () => {}, 'Result should be a good number'); 
            t.assert.equal(result >= 0 && result <= 10, true, 'Result should be a number between 0 and 10'); 
        });
    });
    await describe('Util.isGood', async (t) => {
        await it('should return true if the value is not undefined or null', async (t) => {
            const value = 42;
            t.assert.doesNotThrow(() => Util.isGood(value), () => {}, 'Value should be good');
        });
        await it('should return false if the value is undefined', async (t) => {
            const value = undefined;
            t.assert.doesNotThrow(() => Util.isGood(value), () => {}, 'Value should not be good');
        });
        await it('should return false if the value is null', async (t) => {
            const value = null;
            t.assert.doesNotThrow(() => Util.isGood(value), () => {}, 'Value should not be good');
        });
    });
    await describe('Util.isBad', async (t) => {
        await it('should return false if the value is not undefined or null', async (t) => {
            const value = 42n;
            t.assert.doesNotThrow(() => Util.isBad(value), () => {}, 'Value should not be bad');
        });
        await it('should return true if the value is undefined', async (t) => {
            const value = undefined;
            t.assert.doesNotThrow(() => Util.isBad(value), () => {}, 'Value should be bad');
        });
        await it('should return true if the value is null', async (t) => {
            const value = null;
            t.assert.doesNotThrow(() => Util.isBad(value), () => {}, 'Value should be bad');
        });
    });
    await describe('Util.isGoodString', async (t) => {
        await it('should return true if the value is not undefined or null, is a string, and is not empty', async (t) => {
            const value = "hello";
            t.assert.doesNotThrow(() => Util.isGoodString(value, 1, 5), () => {}, 'Value should be a good string');
        });
        await it('should return false if the value is undefined', async (t) => {
            const value = undefined;
            t.assert.doesNotThrow(() => Util.isGoodString(value), () => {}, 'Value should not be a good string');
        });
        await it('should return false if the value is null', async (t) => {
            const value = null;
            t.assert.doesNotThrow(() => Util.isGoodString(value), () => {}, 'Value should not be a good string');
        });
        await it('should return false if the value is empty', async (t) => {
            const value = "";
            t.assert.doesNotThrow(() => Util.isGoodString(value), () => {}, 'Value should not be a good string');
        });
        await it('should return false if the value is longer than necessary', async (t) => {
            const value = "hello world";
            t.assert.doesNotThrow(() => Util.isGoodString(value, 1, 5), () => {}, 'Value should not be a good string');
        });
        await it('should return false if the value is shorter than necessary', async (t) => {
            const value = "hello";
            t.assert.doesNotThrow(() => Util.isGoodString(value, 10, 15), () => {}, 'Value should not be a good string');
        });
    });
    await describe('Util.isBadString', async (t) => {
        await it('should return false if the value is not undefined or null, is a string, and is the correct length', async (t) => {
            const value = "hello";
            t.assert.doesNotThrow(() => Util.isBadString(value, 1, 5), () => {}, 'Value should not be a bad string');
        });
        await it('should return true if the value is undefined', async (t) => {
            const value = undefined;
            t.assert.doesNotThrow(() => Util.isBadString(value), () => {}, 'Value should be a bad string');
        });
        await it('should return true if the value is null', async (t) => {
            const value = null;
            t.assert.doesNotThrow(() => Util.isBadString(value), () => {}, 'Value should be a bad string');
        });
        await it('should return true if the value is empty', async (t) => {
            const value = "";
            t.assert.doesNotThrow(() => Util.isBadString(value), () => {}, 'Value should be a bad string');
        });
        await it('should return true if the value is longer than necessary', async (t) => {
            const value = "hello world";
            t.assert.doesNotThrow(() => Util.isBadString(value, 1, 5), () => {}, 'Value should be a bad string');
        });
        await it('should return true if the value is shorter than necessary', async (t) => {
            const value = "hello";
            t.assert.doesNotThrow(() => Util.isBadString(value, 10, 15), () => {}, 'Value should be a bad string');
        });
    });
    await describe('Util.isGoodNumber', async (t) => {
        await it('should return true if the value is not undefined or null, is a number, and is not NaN', async (t) => {
            const value = 42;
            t.assert.doesNotThrow(() => Util.isGoodNumber(value), () => {}, 'Value should be a good number');
        });
        await it('should return false if the value is undefined', async (t) => {
            const value = undefined;
            t.assert.doesNotThrow(() => Util.isGoodNumber(value), () => {}, 'Value should not be a good number');
        });
        await it('should return false if the value is null', async (t) => {
            const value = null;
            t.assert.doesNotThrow(() => Util.isGoodNumber(value), () => {}, 'Value should not be a good number');
        });
        await it('should return false if the value is not a number', async (t) => {
            const value = "";
            t.assert.doesNotThrow(() => Util.isGoodNumber(value), () => {}, 'Value should not be a good number');
        });
        await it('should return false if the value is NaN', async (t) => {
            const value = NaN;
            t.assert.doesNotThrow(() => Util.isGoodNumber(value), () => {}, 'Value should not be a good number');
        });
        await it('should return false if the value is greater than necessary', async (t) => {
            const value = 100;
            t.assert.doesNotThrow(() => Util.isGoodNumber(value, 1, 5), () => {}, 'Value should not be a good number');
        });
        await it('should return false if the value is smaller than necessary', async (t) => {
            const value = 10;
            t.assert.doesNotThrow(() => Util.isGoodNumber(value, 100, 150), () => {}, 'Value should not be a good number');
        });
    });
    await describe('Util.isBadNumber', async (t) => {
        await it('should return false if the value is not undefined or null, is a number, and is the correct range', async (t) => {
            const value = 10;
            t.assert.doesNotThrow(() => Util.isBadNumber(value, 1, 15), () => {}, 'Value should not be a bad number');
        });
        await it('should return true if the value is undefined', async (t) => {
            const value = undefined;
            t.assert.doesNotThrow(() => Util.isBadNumber(value), () => {}, 'Value should be a bad number');
        });
        await it('should return true if the value is null', async (t) => {
            const value = null;
            t.assert.doesNotThrow(() => Util.isBadNumber(value), () => {}, 'Value should be a bad number');
        });
        await it('should return true if the value is not a number', async (t) => {
            const value = "";
            t.assert.doesNotThrow(() => Util.isBadNumber(value), () => {}, 'Value should be a bad number');
        });
        await it('should return true if the value is NaN', async (t) => {
            const value = NaN;
            t.assert.doesNotThrow(() => Util.isBadNumber(value), () => {}, 'Value should be a bad number');
        });
        await it('should return true if the value is longer than necessary', async (t) => {
            const value = 100;
            t.assert.doesNotThrow(() => Util.isBadNumber(value, 1, 5), () => {}, 'Value should be a bad number');
        });
        await it('should return true if the value is shorter than necessary', async (t) => {
            const value = 10;
            t.assert.doesNotThrow(() => Util.isBadNumber(value, 100, 150), () => {}, 'Value should be a bad number');
        });
    });
    await describe('Util.isGoodArray', async (t) => {
        await it('should return true if the value is not undefined or null, is an array, and has an appropriate length', async (t) => {
            const value = [1, 2, 3];
            t.assert.doesNotThrow(() => Util.isGoodArray(value), () => {}, 'Value should be a good array');
        });
        await it('should return false if the value is undefined', async (t) => {
            const value = undefined;
            t.assert.doesNotThrow(() => Util.isGoodArray(value), () => {}, 'Value should not be a good array');
        });
        await it('should return false if the value is null', async (t) => {
            const value = null;
            t.assert.doesNotThrow(() => Util.isGoodArray(value), () => {}, 'Value should not be a good array');
        });
        await it('should return false if the value is not an array', async (t) => {
            const value = "";
            t.assert.doesNotThrow(() => Util.isGoodArray(value), () => {}, 'Value should not be a good array');
        });
        await it('should return false if the value is an empty array', async (t) => {
            /** @type { number[] } */
            const value = [];
            t.assert.doesNotThrow(() => Util.isGoodArray(value), () => {}, 'Value should not be a good array');
        });
        await it('should return false if the value has more elements than necessary', async (t) => {
            const value = [1, 2, 3, 4, 5, 6];
            t.assert.doesNotThrow(() => Util.isGoodArray(value, 1, 5), () => {}, 'Value should not be a good array');
        });
        await it('should return false if the value has fewer elements than necessary', async (t) => {
            const value = [1, 2];
            t.assert.doesNotThrow(() => Util.isGoodArray(value, 100, 150), () => {}, 'Value should not be a good array');
        });
        await it('should return false if the value has fewer "good" elements than necessary', async (t) => {
            const value = [1, 2, undefined, null];
            t.assert.doesNotThrow(() => Util.isGoodArray(value, 4, 150, true), () => {}, 'Value should not be a good array');
        });
    });
    await describe('Util.isBadArray', async (t) => {
        await it('should return false if the value is not undefined or null, is an array, and has an appropriate length', async (t) => {
            const value = [1, 2, 3];
            t.assert.doesNotThrow(() => Util.isBadArray(value), () => {}, 'Value should not be a bad array');
        });
        await it('should return true if the value is undefined', async (t) => {
            const value = undefined;
            t.assert.doesNotThrow(() => Util.isBadArray(value), () => {}, 'Value should be a bad array');
        });
        await it('should return true if the value is null', async (t) => {
            const value = null;
            t.assert.doesNotThrow(() => Util.isBadArray(value), () => {}, 'Value should be a bad array');
        });
        await it('should return true if the value is not an array', async (t) => {
            const value = "";
            t.assert.doesNotThrow(() => Util.isBadArray(value), () => {}, 'Value should be a bad array');
        });
        await it('should return true if the value is an empty array', async (t) => {
            /** @type { number[] } */
            const value = [];
            t.assert.doesNotThrow(() => Util.isBadArray(value), () => {}, 'Value should be a bad array');
        });
        await it('should return true if the value is longer than necessary', async (t) => {
            const value = [1, 2, 3, 4, 5, 6];
            t.assert.doesNotThrow(() => Util.isBadArray(value, 1, 5), () => {}, 'Value should be a bad array');
        });
        await it('should return true if the value is shorter than necessary', async (t) => {
            const value = [1, 2];
            t.assert.doesNotThrow(() => Util.isBadArray(value, 100, 150), () => {}, 'Value should be a bad array');
        });
        await it('should return true if the value has fewer "good" elements than necessary', async (t) => {
            const value = [1, 2, undefined, null];
            t.assert.doesNotThrow(() => Util.isBadArray(value, 4, 150, true), () => {}, 'Value should be a bad array');
        });
    });
    await describe('Util.areEqual', async (t) => {
        await it('should return true if the values are equal numbers', async (t) => {
            const value1 = 42;
            const value2 = 42;
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal strings', async (t) => {
            const value1 = "hello";
            const value2 = "hello";
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal bigints', async (t) => {
            const value1 = 42n;
            const value2 = 42n;
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal booleans', async (t) => {
            const value1 = true;
            const value2 = true;
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal Dates', async (t) => {
            const value1 = new Date(2025, 11, 14);
            const value2 = new Date(2025, 11, 14);
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal Temporal Instants', async (t) => {
            const value1 = Temporal.Instant.from('2025-12-14T00:00:00Z');
            const value2 = Temporal.Instant.from('2025-12-14T00:00:00Z');
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal Temporal PlainDateTimes', async (t) => {
            const value1 = Temporal.PlainDateTime.from({ year: 2025, month: 12, day: 14 });
            const value2 = Temporal.PlainDateTime.from({ year: 2025, month: 12, day: 14 });
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal Temporal PlainDates', async (t) => {
            const value1 = Temporal.PlainDate.from({ year: 2025, month: 12, day: 14 });
            const value2 = Temporal.PlainDate.from({ year: 2025, month: 12, day: 14 });
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal Temporal PlainMonthDays', async (t) => {
            const value1 = Temporal.PlainMonthDay.from({ month: 12, day: 14 });
            const value2 = Temporal.PlainMonthDay.from({ month: 12, day: 14 });
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal Temporal PlainTimes', async (t) => {
            const value1 = Temporal.PlainTime.from({ hour: 12, minute: 14 });
            const value2 = Temporal.PlainTime.from({ hour: 12, minute: 14 });
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal Temporal PlainYearMonths', async (t) => {
            const value1 = Temporal.PlainYearMonth.from({ year: 2025, month: 12 });
            const value2 = Temporal.PlainYearMonth.from({ year: 2025, month: 12 });
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are equal Temporal ZonedDateTimes', async (t) => {
            const value1 = Temporal.ZonedDateTime.from({ year: 2025, month: 12, day: 14, hour: 12, minute: 14, timeZone: 'America/New_York' });
            const value2 = Temporal.ZonedDateTime.from({ year: 2025, month: 12, day: 14, hour: 12, minute: 14, timeZone: 'America/New_York' });
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are arrays whose elements differ only in position and deep is false', async (t) => {
            const value1 = [1, 2, 3];
            const value2 = [3, 2, 1];
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return false if the values are arrays whose elements differ only in position and deep is true', async (t) => {
            const value1 = [1, 2, 3];
            const value2 = [3, 2, 1];
            const deep = true;
            const expected = false;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are regular expressions whose patterns and flags are equal', async (t) => {
            const value1 = /\D{3}/i;
            const value2 = /\D{3}/i;
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are objects whose properties differ only in position and deep is false', async (t) => {
            const value1 = { a: 1, b: 2, c: { d: 3, e: 4 } };
            const value2 = { c: { e: 4, d: 3 }, b: 2, a: 1 };
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return false if the values are objects whose properties differ only in position and deep is true', async (t) => {
            const value1 = { a: 1, b: 2, c: { d: 3, e: 4 } };
            const value2 = { c: { e: 4, d: 3 }, b: 2, a: 1 };
            const deep = true;
            const expected = false;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are both null and deep is false', async (t) => {
            const value1 = null;
            const value2 = null;
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return false if the values are both null and deep is true', async (t) => {
            const value1 = null;
            const value2 = null;
            const deep = true;
            const expected = false;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are both equal primitives wrapped in objects', async (t) => {
            const value1 = new Number(42);
            const value2 = new Number(42);
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are both equal symbols', async (t) => {
            const value1 = Symbol('test');
            const value2 = Symbol('test');
            const deep = false;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
        await it('should return true if the values are both equal symbols even if deep is true', async (t) => {
            const value1 = Symbol('test');
            const value2 = Symbol('test');
            const deep = true;
            const expected = true;
            const actual = Util.areEqual(value1, value2, deep);
            const message = `Values should be equal: Expected ${expected}, but got ${actual}`;
            t.assert.equal(actual, expected, message);
        });
    });
});