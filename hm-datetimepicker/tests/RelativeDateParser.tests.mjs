import { Assert } from './test.mjs';
import RelativeDateParser from '../RelativeDateParser.mjs';

function runTests() {
  try {
    Assert.isEqual(RelativeDateParser.canParse(undefined), false, `Should not be able to parse undefined as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse(null), false, `Should not be able to parse null as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse(''), false, `Should not be able to parse '' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('next Wednesday'), false, `Should not be able to parse 'next Wednesday' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('y'), false, `Should not be able to parse 'y' without a number as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('yesterday'), true, `Should be able to parse 'yesterday' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('today'), true, `Should be able to parse 'today' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('tomorrow'), true, `Should be able to parse 'tomorrow' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('1y'), true, `Should be able to parse '1y' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('-2y'), true, `Should be able to parse '-2y' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('3q'), true, `Should be able to parse '3q' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('-4q'), true, `Should be able to parse '-4q' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('+5m'), true, `Should be able to parse '+5m' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('-6m'), true, `Should be able to parse '-6m' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('7d'), true, `Should be able to parse '7d' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('-8d'), true, `Should be able to parse '-8d' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('+9h'), true, `Should be able to parse '+9h' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('-10h'), true, `Should be able to parse '-10h' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('11n'), true, `Should be able to parse '11n' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('-12n'), true, `Should be able to parse '-12n' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('13s'), true, `Should be able to parse '13s' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('-14s'), true, `Should be able to parse '-14s' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('15l'), true, `Should be able to parse '15l' as a relative date.`);
    Assert.isEqual(RelativeDateParser.canParse('-16l'), true, `Should be able to parse '-16l' as a relative date.`);
    const getDateString = (date) => date.toISOString().slice(0, 10);
    const getDateTimeString = (date) => date.toISOString();
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    Assert.isEqual(getDateString(RelativeDateParser.parse('yesterday')), getDateString(yesterday), `Parsing 'yesterday' should produce yesterday's date.`);
    Assert.isEqual(getDateString(RelativeDateParser.parse('today')), getDateString(today), `Parsing 'today' should produce today's date.`);
    Assert.isEqual(getDateString(RelativeDateParser.parse('tomorrow')), getDateString(tomorrow), `Parsing 'tomorrow' should produce tomorrow's date.`);
    const addYears = (date, years) => new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
    const addQuarters = (date, quarters) => new Date(date.getFullYear(), date.getMonth() + 3 * quarters, date.getDate());
    const addMonths = (date, months) => new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
    const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    const addHours = (date, hours) =>
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() + hours,
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );
    const addMinutes = (date, minutes) =>
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes() + minutes,
        date.getSeconds(),
        date.getMilliseconds()
      );
    const addSeconds = (date, seconds) =>
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds() + seconds,
        date.getMilliseconds()
      );
    const addMs = (date, ms) =>
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds() + ms
      );
    Assert.isEqual(getDateString(RelativeDateParser.parse('1y')), getDateString(addYears(today, 1)));
    Assert.isEqual(getDateString(RelativeDateParser.parse('-2y')), getDateString(addYears(today, -2)));
    Assert.isEqual(getDateString(RelativeDateParser.parse('3q')), getDateString(addQuarters(today, 3)));
    Assert.isEqual(getDateString(RelativeDateParser.parse('-4q')), getDateString(addQuarters(today, -4)));
    Assert.isEqual(getDateString(RelativeDateParser.parse('5m')), getDateString(addMonths(today, 5)));
    Assert.isEqual(getDateString(RelativeDateParser.parse('-6m')), getDateString(addMonths(today, -6)));
    Assert.isEqual(getDateString(RelativeDateParser.parse('7d')), getDateString(addDays(today, 7)));
    Assert.isEqual(getDateString(RelativeDateParser.parse('-8d')), getDateString(addDays(today, -8)));
    let result = RelativeDateParser.parse('+9h');
    let nowIsh = RelativeDateParser.parse('-9h', result);
    Assert.isEqual(getDateTimeString(result), getDateTimeString(addHours(nowIsh, 9)));
    result = RelativeDateParser.parse('-10h');
    nowIsh = RelativeDateParser.parse('+10h', result);
    Assert.isEqual(getDateTimeString(result), getDateTimeString(addHours(nowIsh, -10)));
    result = RelativeDateParser.parse('+11n');
    nowIsh = RelativeDateParser.parse('-11n', result);
    Assert.isEqual(getDateTimeString(result), getDateTimeString(addMinutes(nowIsh, 11)));
    result = RelativeDateParser.parse('-12n');
    nowIsh = RelativeDateParser.parse('+12n', result);
    Assert.isEqual(getDateTimeString(result), getDateTimeString(addMinutes(nowIsh, -12)));
    result = RelativeDateParser.parse('+13s');
    nowIsh = RelativeDateParser.parse('-13s', result);
    Assert.isEqual(getDateTimeString(result), getDateTimeString(addSeconds(nowIsh, 13)));
    result = RelativeDateParser.parse('-14s');
    nowIsh = RelativeDateParser.parse('+14s', result);
    Assert.isEqual(getDateTimeString(result), getDateTimeString(addSeconds(nowIsh, -14)));
    result = RelativeDateParser.parse('+15l');
    nowIsh = RelativeDateParser.parse('-15l', result);
    Assert.isEqual(getDateTimeString(result), getDateTimeString(addMs(nowIsh, 15)));
    result = RelativeDateParser.parse('-16l');
    nowIsh = RelativeDateParser.parse('+16l', result);
    Assert.isEqual(getDateTimeString(result), getDateTimeString(addMs(nowIsh, -16)));
    console.log('All tests passed. Exiting.');
  } catch (e) {
    console.error(e);
    console.error(`At least one test failed. Exiting.`);
  }
}
runTests();
