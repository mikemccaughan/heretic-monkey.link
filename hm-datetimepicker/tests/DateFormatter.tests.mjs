import { DateFormatter } from '../DateFormatter.mjs';
import { Assert } from './test.mjs';

function runTests() {
  let df = new DateFormatter('en-US');
  let date = new Date(Date.UTC(2021, 0, 15));
  try {
    Assert.isEqual(df.formatDate(date), '1/15/2021');
    Assert.isEqual(
      df.formatDate(date, { format: 'iso' }),
      '2021-01-15T00:00:00.000Z'
    );
    console.log('All tests passed. Exiting.');
  } catch (e) {
    console.error(e);
    console.error(`At least one test failed. Exiting.`);
  }
}
runTests();
