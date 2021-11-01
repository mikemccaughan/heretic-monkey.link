import TimeSpan from '../TimeSpan.mjs';
import { Assert } from './test.mjs';

function runTests() {
  try {
    Assert.isEqual(TimeSpan.Zero.totalMilliseconds, 0, `Has a static Zero property that returns a TimeSpan initialized to 0 milliseconds`);
    Assert.isEqual(
      TimeSpan.MinValue.totalMilliseconds,
      -8640000000000000,
      `Has a static MinValue property that returns a TimeSpan initialized to -8640000000000000 milliseconds`
    );
    Assert.isEqual(
      TimeSpan.MaxValue.totalMilliseconds,
      8640000000000000,
      `Has a static MaxValue property that returns a TimeSpan initialized to 8640000000000000 milliseconds`
    );
    Assert.isEqual(
      TimeSpan.msPerMillisecond,
      1,
      `has a static msPerMillisecond property that returns the number of internal "ms" intervals there are per millisecond`
    );
    Assert.isEqual(TimeSpan.msPerSecond, 1000, `has a static msPerSecond property that returns the number of internal "ms" intervals there are per second`);
    Assert.isEqual(TimeSpan.secondPerMinute, 60, `has a static secondPerMinute property that returns the number of seconds there are per minute`);
    Assert.isEqual(TimeSpan.msPerMinute, 60000, `has a static msPerMinute property that returns the number of internal "ms" intervals there are per minute`);
    Assert.isEqual(TimeSpan.minutePerHour, 60, `has a static minutePerHour property that returns the number of minutes there are per hour`);
    Assert.isEqual(TimeSpan.msPerHour, 3600000, `has a static msPerHour property that returns the number of internal "ms" intervals there are per hour`);
    Assert.isEqual(TimeSpan.hourPerDay, 24, `has a static hourPerDay property that returns the number of hours there are per day`);
    Assert.isEqual(TimeSpan.msPerDay, 86400000, `has a static msPerDay property that returns the number of internal "ms" intervals there are per day`);
    let actual = null;
    try {
      actual = new TimeSpan(1, 1, 1, 1, 1, 1, 1);
      Assert.isEqual(actual != null, false, `This assert should never be reached because the constructor with more than 6 arguments should throw an error.`);
    } catch (e) {
      Assert.isEqual(e.message, 'The TimeSpan constructor only takes 5 or fewer arguments', `Throws exception if given more than 6 arguments in constructor`);
    }
    let days = 2;
    let hours = 3;
    let minutes = 4;
    let seconds = 5;
    let milliseconds = 6;
    actual = new TimeSpan(days, hours, minutes, seconds, milliseconds);
    Assert.isEqual(Math.trunc(actual.totalDays), days, `Using a constructor with 5 arguments`, `The specified total days are not the same.`);
    Assert.isEqual(Math.trunc(actual.totalHours), days * 24 + hours, `Using a constructor with 5 arguments`, `The specified total hours are not the same.`);
    Assert.isEqual(
      Math.trunc(actual.totalMinutes),
      days * 24 * 60 + hours * 60 + minutes,
      `Using a constructor with 5 arguments`,
      `The specified total minutes are not the same.`
    );
    Assert.isEqual(
      Math.trunc(actual.totalSeconds),
      days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds,
      `Using a constructor with 5 arguments`,
      `The specified total seconds are not the same.`
    );
    Assert.isEqual(
      Math.trunc(actual.totalMilliseconds),
      days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds,
      `Using a constructor with 5 arguments`,
      `The specified total milliseconds are not the same.`
    );
    actual = new TimeSpan(hours, minutes, seconds);
    Assert.isEqual(Math.trunc(actual.totalHours), hours, `Using a constructor with 3 arguments`, `The specified total hours are not the same.`);
    Assert.isEqual(
      Math.trunc(actual.totalMinutes),
      hours * 60 + minutes,
      `Using a constructor with 3 arguments`,
      `The specified total minutes are not the same.`
    );
    Assert.isEqual(
      Math.trunc(actual.totalSeconds),
      hours * 60 * 60 + minutes * 60 + seconds,
      `Using a constructor with 3 arguments`,
      `The specified total seconds are not the same.`
    );
    const date = new Date(2021, 10, 1, 0, 0, 0, 0);
    const ts = TimeSpan.fromHours(11);
    let result = ts.addToDate(date);
    Assert.isEqual(result.getHours(), 11, 'addToDate', 'The number of hours added was incorrect');
    result = ts.subtractFromDate(result);
    Assert.isEqual(result.getHours(), 0, 'subtractFromDate', 'The number of hours subtracted was incorrect');
    Assert.isEqual(TimeSpan.Zero.asDate.valueOf(), new Date(0).valueOf(), 'asDate', 'The conversion to date was incorrect');
    Assert.isEqual(TimeSpan.fromDays(2).totalDays, 2, 'totalDays', 'Between fromDays and totalDays, something went wrong');
    Assert.isEqual(TimeSpan.fromHours(2).totalHours, 2, 'totalHours', 'Between fromHours and totalHours, something went wrong');
    console.log(`All tests passed. Exiting.`);
  } catch (e) {
    console.error(e);
    console.error(`At least one test failed. Exiting.`);
  }
}
runTests();
