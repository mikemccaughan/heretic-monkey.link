import { DateHelper } from '../DateHelper.mjs';
import { Assert } from './test.mjs';

function runTests() {
  let df = new DateHelper('en-US');
  let date = new Date(Date.UTC(2021, 0, 15, 0, 0, 0, 0));
  try {
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
      ''
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
        format: 'EEE, MMM d, y',
        timeZone: 'America/New_York',
      }),
      '木, 1 d, 2021',
      'formatDate ja-JP, EEE, MMM d, y, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('1/15/2021', {
        locale: 'en-US',
        format: 'M/d/y',
        timeZone: 'America/New_York',
      }).valueOf(),
      new Date(2021, 0, 15).valueOf(),
      'parseDate 1/15/2021, en-US, M/d/y, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('15/1/2021', {
        locale: 'en-GB',
        format: 'd/M/y',
        timeZone: 'America/New_York',
      }).valueOf(),
      new Date(2021, 0, 15).valueOf(),
      'parseDate 15/1/2021, en-GB, d/M/y, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('2022-01-15', {
        locale: 'en-US',
        format: 'y-M-d',
        timeZone: 'America/New_York',
      }).valueOf(),
      new Date(2022, 0, 15).valueOf(),
      'parseDate 2022-01-15, en-US, y-M-d, America/New_York',
      ''
    );
    Assert.isEqual(
      DateHelper.parseDate('Thu, Jan 15, 2021', {
        locale: 'en-US',
        format: 'EEE, MMM d, y',
        timeZone: 'America/New_York',
      }).valueOf(),
      new Date(2021, 0, 15, 0, 0, 0, 0).valueOf(),
      'parseDate Thu, Jan 15, 2021, en-US, EEE, MMM d, y, America/New_York',
      ''
    );
    console.log(`${DateHelper.getPossibleClientTimeZoneNames().length} time zones match the current time zone offset`);
    console.log('All tests passed. Exiting.');
  } catch (e) {
    console.error(e);
    console.error(`At least one test failed. Exiting.`);
  }
}
runTests();
