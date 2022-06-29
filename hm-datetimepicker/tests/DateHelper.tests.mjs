import DateHelper from '../DateHelper.mjs';
import { DateComparisonGranularity } from '../BasicUtilities.mjs';
import { Assert } from './test.mjs';

function runTests() {
  let df = new DateHelper('en-US');
  let date = new Date(Date.UTC(2021, 0, 15, 0, 0, 0, 0));
  let datePlus101y = new Date(Date.UTC(2122, 0, 15, 0, 0, 0, 0));
  let dateWithNegYear = new Date(Date.UTC(-2021, 0, 15, 0, 0, 0, 0));
  let datePlus1y = new Date(Date.UTC(2022, 0, 15, 0, 0, 0, 0));
  let datePlus1y1M = new Date(Date.UTC(2022, 1, 15, 0, 0, 0, 0));
  let datePlus0y0M29d = new Date(Date.UTC(2021, 1, 14, 0, 0, 0, 0));
  let datePlus0y1M1d = new Date(Date.UTC(2021, 1, 16, 0, 0, 0, 0));
  let datePlus0y0M1d = new Date(Date.UTC(2021, 0, 16, 0, 0, 0, 0));
  let datePlus0y0M0d1h = new Date(Date.UTC(2021, 0, 15, 1, 0, 0, 0));
  let datePlus0y0M0d0h1m = new Date(Date.UTC(2021, 0, 15, 0, 1, 0, 0));
  let datePlus0y0M0d0h0m1s = new Date(Date.UTC(2021, 0, 15, 0, 0, 1, 0));
  let datePlus0y0M0d0h0m0s1ms = new Date(Date.UTC(2021, 0, 15, 0, 0, 0, 1));
  try {
    Assert.isEqual(
      DateHelper.getProbableClientTimeZoneName(),
      new Intl.DateTimeFormat([]).resolvedOptions().timeZone,
      'getProbableClientTimeZoneName',
      `Couldn't get the time zone name from resolvedOptions() or something`
    );
    Assert.isEqual(
      DateHelper.isSame(date, datePlus101y, DateComparisonGranularity.Era),
      true,
      'isSame',
      `"${date.toLocaleString([], { era: 'short' })}" should be the same as "${datePlus101y.toLocaleString([], { era: 'short' })}" at era granularity`
    );
    Assert.isEqual(
      DateHelper.isSame(date, dateWithNegYear, DateComparisonGranularity.Era),
      false,
      'isSame',
      `"${date.toLocaleString([], { era: 'short' })}" should not be the same as "${datePlus101y.toLocaleString([], { era: 'short' })}" at era granularity`
    );
    Assert.isEqual(
      DateHelper.isSame(date, datePlus1y, DateComparisonGranularity.Year),
      true,
      'isSame',
      `"${date.toISOString()}" should be the same as "${datePlus1y.toISOString()}" at Year granularity`
    );
    Assert.isEqual(
      DateHelper.isSame(date, datePlus1y1M, DateComparisonGranularity.Year),
      false,
      'isSame',
      `"${date.toISOString()}" should not be the same as "${datePlus1y1M.toISOString()}" at Year granularity`
    );
    Assert.isEqual(
      DateHelper.isSame(date, datePlus0y0M29d, DateComparisonGranularity.Month),
      true,
      'isSame',
      `"${date.toISOString()}" should be the same as "${datePlus0y0M29d.toISOString()}" at Month granularity`
    );
    Assert.isEqual(
      DateHelper.isSame(date, datePlus0y1M1d, DateComparisonGranularity.Month),
      false,
      'isSame',
      `"${date.toISOString()}" should not be the same as "${datePlus0y1M1d.toISOString()}" at Month granularity`
    );
    Assert.isEqual(
      df.formatDate(date),
      '1/15/2021',
      'formatDate no extras',
      ''
    );
    Assert.isEqual(
      df.formatDate(date, { format: 'iso' }),
      '2021-01-15T00:00:00.000Z',
      'formatDate iso format',
      ''
    );
    Assert.isEqual(
      DateHelper.formatDate(date, {
        locale: 'en-US',
        format: undefined,
        timeZone: 'Australia/Sydney',
      }),
      '1/15/2021',
      'formatDate en-US, no format, Australia/Sydney',
      'M/d/y is the default format for Sydney, apparently.'
    );
    Assert.isEqual(
      DateHelper.formatDate(date, {
        locale: 'en-US',
        format: 'EEE, MMM d, y',
        timeZone: 'America/New_York',
      }),
      'Thu, Jan 14, 2021',
      'formatDate en-US, EEE, MMM d, y, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.formatDate(date, {
        locale: 'ja-JP',
        format: 'y年MM月dd日 (EEE)',
        timeZone: 'Asia/Tokyo',
      }),
      '2021年01月15日 (金)',
      'formatDate ja-JP, y年MM月dd日 (EEE), Asia/Tokyo',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('1/15/2021', {
        locale: 'en-US',
        format: 'M/d/y',
        timeZone: 'America/New_York',
      }).toISOString(),
      '2021-01-15T05:00:00.000Z',
      'parseDate 1/15/2021, en-US, M/d/y, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('15/1/2021', {
        locale: 'en-GB',
        format: 'd/M/y',
        timeZone: 'America/New_York',
      }).toISOString(),
      '2021-01-15T05:00:00.000Z',
      'parseDate 15/1/2021, en-GB, d/M/y, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('2022-01-15', {
        locale: 'en-US',
        format: 'y-M-d',
        timeZone: 'America/New_York',
      }).toISOString(),
      '2022-01-15T05:00:00.000Z',
      'parseDate 2022-01-15, en-US, y-M-d, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('2022-01-15T15:37:57.962Z', {
        locale: 'en-US',
        format: 'iso',
        timeZone: 'UTC',
      }).toISOString(),
      '2022-01-15T15:37:57.962Z',
      'parseDate 2022-01-15T15:37:57.962Z, en-US, iso, UTC',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('Thu, Jan 15, 2021', {
        locale: 'en-US',
        format: 'EEE, MMM d, y',
        timeZone: 'America/New_York',
      }).toISOString(),
      '2021-01-15T05:00:00.000Z',
      'parseDate Thu, Jan 15, 2021, en-US, EEE, MMM d, y, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.now({
        timeZone: 'America/New_York'
      }).toISOString().slice(0, 19),
      new Date(DateHelper.formatDate(new Date(), { format: 'y-MM-ddTHH:mm:ss.fffZ', timeZone: 'America/New_York' })).toISOString().slice(0, 19),
      'now, America/New_York',
      'The values are equal down to the second. Because of the time it takes to run the tests, they may vary by several milliseconds.'
    );
    Assert.isEqual(
      DateHelper.today({
        timeZone: 'America/New_York'
      }).toISOString().slice(0, 19),
      new Date(DateHelper.formatDate(new Date(new Date().setHours(0,0,0,0)), { format: 'y-MM-ddTHH:mm:ss.fffZ', timeZone: 'America/New_York' })).toISOString().slice(0, 19),
      'now, America/New_York',
      'The values are equal down to the second. Because of the time it takes to run the tests, they may vary by several milliseconds.'
    );
    Assert.isEqual(
      DateHelper.getDefaultFormatForLocale('en-US'),
      'M/d/y',
      'getDefaultFormatForLocale, en-US',
      ''
    );
    Assert.isEqual(
      DateHelper.getDefaultFormatForLocale('en-GB'),
      'dd/MM/y',
      'getDefaultFormatForLocale, en-GB',
      ''
    );
    Assert.isEqual(
      DateHelper.getDefaultFormatForLocale('ja-JP'),
      'y/M/d',
      'getDefaultFormatForLocale, ja-JP',
      ''
    );
    //console.log(DateHelper.getDefaultFormatForDateAndTime({}));
    console.log(`${DateHelper.getPossibleClientTimeZoneNames().length} time zones match the current time zone offset`);
    console.log('All tests passed. Exiting.');
  } catch (e) {
    console.error(e);
    console.error(`At least one test failed. Exiting.`);
  }
}
runTests();
