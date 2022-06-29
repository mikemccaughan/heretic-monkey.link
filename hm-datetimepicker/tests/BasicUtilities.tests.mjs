import BasicUtilities, { DateComparisonGranularity, DeepEqualityArgs, NumberComparisonGranularity } from '../BasicUtilities.mjs';
import { Assert } from './test.mjs';

function runTests() {
  const fn = () => { };
  try {
    Assert.isEqual(
      BasicUtilities.areTheSame(1, 1),
      true,
      'areTheSame',
      '1 and 1 are the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(1, 2),
      false,
      'areTheSame',
      '1 and 2 are not the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame('a', 'a'),
      true,
      'areTheSame',
      'a and a are the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame('a', 'b'),
      false,
      'areTheSame',
      'a and b are not the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(1n, 1n),
      true,
      'areTheSame',
      '1n and 1n (bigints) are the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(1n, 2n),
      false,
      'areTheSame',
      '1n and 2n (bigints) are not the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(true, true),
      true,
      'areTheSame',
      'true and true are not same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(true, false),
      false,
      'areTheSame',
      'true and false are not the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(fn, fn),
      true,
      'areTheSame',
      'fn and fn (references to the same function) are the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(fn, () => { }),
      false,
      'areTheSame',
      'fn and an anonymous function that does the smae thing are not the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        { a: 'a', one: 1, c: new Date(1234, 1, 2, 0, 0, 0, 0) },
        { b: 'b', two: 2, d: new Date(4321, 3, 4, 0, 0, 0, 0) }
      ),
      false,
      'areTheSame',
      'different objects are not the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        { a: 'a', one: 1, c: new Date(1234, 1, 2, 0, 0, 0, 0) },
        { a: 'a', one: 1, c: new Date(1234, 1, 2, 0, 0, 0, 0) },
        true
      ),
      true,
      'areTheSame',
      'different objects with the same properties are the same if deep is true'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        {
          a: 'a',
          one: 1,
          c: { a: 'a', one: 1, c: new Date(1234, 1, 2, 0, 0, 0, 0) },
        },
        {
          a: 'a',
          one: 1,
          c: { a: 'a', one: 1, c: new Date(1234, 1, 2, 0, 0, 0, 0) },
        }
      ),
      false,
      'areTheSame',
      'different objects with the same nested object properties are not the same if deep is false'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        new Date(2021, 8, 21, 0, 0, 0, 0),
        new Date(2021, 8, 21, 0, 0, 0, 0)
      ),
      true,
      'areTheSame',
      'Two date objects with the same value are the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        new Date(2021, 8, 21, 0, 0, 0, 0),
        new Date(2021, 9, 21, 0, 0, 0, 0)
      ),
      false,
      'areTheSame',
      'Two date objects with different values are not the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        ['a', 1, new Date(1234, 1, 2, 0, 0, 0, 0)],
        ['b', 2, new Date(4321, 3, 4, 0, 0, 0, 0)]
      ),
      false,
      'areTheSame',
      'arrays with different values are not the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        ['a', 1, new Date(1234, 1, 2, 0, 0, 0, 0)],
        ['a', 1, new Date(1234, 1, 2, 0, 0, 0, 0)]
      ),
      true,
      'areTheSame',
      'arrays with same values are the same'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        [
          'a',
          1,
          {
            a: 'a',
            one: 1,
            c: { a: 'a', one: 1, d: new Date(1234, 1, 2, 0, 0, 0, 0) },
          },
        ],
        [
          'a',
          1,
          {
            a: 'a',
            one: 1,
            c: { a: 'a', one: 1, d: new Date(1234, 1, 2, 0, 0, 0, 0) },
          },
        ],
        false
      ),
      false,
      'areTheSame',
      'arrays with nested objects with the same values are NOT the same, when deep is false'
    );
    Assert.isEqual(
      BasicUtilities.areTheSame(
        [
          'a',
          1,
          {
            a: 'a',
            one: 1,
            c: { a: 'a', one: 1, d: new Date(1234, 1, 2, 0, 0, 0, 0) },
          },
        ],
        [
          'a',
          1,
          {
            a: 'a',
            one: 1,
            c: { a: 'a', one: 1, d: new Date(1234, 1, 2, 0, 0, 0, 0) },
          },
        ],
        true
      ),
      true,
      'areTheSame',
      'arrays with nested objects with the same values are the same, when deep is true'
    );
    Assert.isEqual(
      BasicUtilities.deepEquals(
        {
          a: 'a',
          one: 1,
          c: new Date(1234, 1, 2, 0, 0, 0, 0),
        },
        {
          c: new Date(1234, 1, 2, 0, 0, 0, 0),
          one: 1,
          a: 'a',
        },
        {
          validatePropertyOrder: true
        }
      ),
      false,
      'deepEquals',
      'validatePropertyOrder causes deepEquals to return false when two objects share the same values but in different order'
    );
    Assert.isEqual(
      BasicUtilities.deepEqualsArrays(
        [
          'a',
          1,
          new Date(1234, 1, 2, 0, 0, 0, 0),
        ],
        [
          new Date(1234, 1, 2, 0, 0, 0, 0),
          1,
          'a',
        ],
        {
          validateElementOrder: true
        }
      ),
      false,
      'deepEquals',
      'validateElementOrder causes deepEqualsArrays to return false when two arrays share the same elements but in different order'
    );
    Assert.isEqual(
      BasicUtilities.deepEquals(
        {
          a: [
            'a',
            1,
            new Date(1234, 1, 2, 0, 0, 0, 0),
          ],
          b: 3
        },
        {
          a: [
            new Date(1234, 1, 2, 0, 0, 0, 0),
            1,
            'a',
          ],
          b: 3
        },
        {
          validateElementOrder: true
        }
      ),
      false,
      'deepEquals',
      'validateElementOrder causes deepEquals to return false when two arrays share the same elements but in different order, in nested properties'
    );
    function testDeepEquals(a, b, deepArgs, expected, text) {
      Assert.isEqual(
        BasicUtilities.deepEquals(a,b, deepArgs),
        expected,
        'BasicUtilities.deepEquals',
        `${text}: (${JSON.stringify(a)}, ${JSON.stringify(b)})`
      );
    }
    let a = 1;
    let b = 1.01;
    let args = {
      numberGranularity: NumberComparisonGranularity.Hundredths
    };
    testDeepEquals(a, b, args, true, 'NumberComparisonGranularity.Hundredths allows a difference of 0.01 between the two values');
    a = 1;
    b = 1.011;
    args = {
      numberGranularity: NumberComparisonGranularity.Hundredths
    };
    testDeepEquals(a, b, args, false, 'NumberComparisonGranularity.Hundredths does not allow a difference of > 0.01 between the two values');
    a = 1;
    b = 1 + Number.EPSILON;
    args = {
      numberGranularity: NumberComparisonGranularity.Default
    };
    testDeepEquals(a, b, args, true, 'NumberComparisonGranularity.Default allows a difference of Number.EPSILON between the two values');
    a = 1;
    b = 1 + 2*Number.EPSILON;
    args = {
      numberGranularity: NumberComparisonGranularity.Default
    };
    testDeepEquals(a, b, args, false, 'NumberComparisonGranularity.Default does not allow a difference of > Number.EPSILON between the two values');
    a = 1;
    b = 101;
    args = {
      numberGranularity: NumberComparisonGranularity.Hundreds
    };
    testDeepEquals(a, b, args, true, 'NumberComparisonGranularity.Hundreds allows a difference of 100 between the two values');
    a = 1;
    b = 101.1;
    args = {
      numberGranularity: NumberComparisonGranularity.Hundreds
    };
    testDeepEquals(a, b, args, false, 'NumberComparisonGranularity.Hundreds does not allow a difference of > 100 between the two values');
    a = 1;
    b = 2;
    args = {
      numberGranularity: NumberComparisonGranularity.Integer
    };
    testDeepEquals(a, b, args, true, 'NumberComparisonGranularity.Integer allows a difference of 1 between the two values');
    a = 1;
    b = 2.1;
    args = {
      numberGranularity: NumberComparisonGranularity.Integer
    };
    testDeepEquals(a, b, args, false, 'NumberComparisonGranularity.Integer does not allow a difference of > 1 between the two values');
    a = 1;
    b = 11;
    args = {
      numberGranularity: NumberComparisonGranularity.Tens
    };
    testDeepEquals(a, b, args, true, 'NumberComparisonGranularity.Tens allows a difference of 10 between the two values');
    a = 1;
    b = 11.1;
    args = {
      numberGranularity: NumberComparisonGranularity.Tens
    };
    testDeepEquals(a, b, args, false, 'NumberComparisonGranularity.Tens does not allow a difference of > 10 between the two values');
    a = 1;
    b = 1.1;
    args = {
      numberGranularity: NumberComparisonGranularity.Tenths
    };
    testDeepEquals(a, b, args, true, 'NumberComparisonGranularity.Tenths allows a difference of 0.1 between the two values');
    a = 1;
    b = 1.11;
    args = {
      numberGranularity: NumberComparisonGranularity.Tenths
    };
    testDeepEquals(a, b, args, false, 'NumberComparisonGranularity.Tenths does not allow a difference of > 0.1 between the two values');
    a = 1;
    b = 1001;
    args = {
      numberGranularity: NumberComparisonGranularity.Thousands
    };
    testDeepEquals(a, b, args, true, 'NumberComparisonGranularity.Thousands allows a difference of 1000 between the two values');
    a = 1;
    b = 1001.1;
    args = {
      numberGranularity: NumberComparisonGranularity.Thousands
    };
    testDeepEquals(a, b, args, false, 'NumberComparisonGranularity.Thousands does not allow a difference of > 1000 between the two values');
    a = 1;
    b = 1.001;
    args = {
      numberGranularity: NumberComparisonGranularity.Thousandths
    };
    testDeepEquals(a, b, args, true, 'NumberComparisonGranularity.Thousanths allows a difference of 0.001 between the two values');
    a = 1;
    b = 1.0011;
    args = {
      numberGranularity: NumberComparisonGranularity.Thousandths
    };
    testDeepEquals(a, b, args, false, 'NumberComparisonGranularity.Thousanths does not allow a difference of > 0.001 between the two values');
    function testDiffDates(a, b, granularity, custom, amount, unit, text) {
      Assert.hasSameValues(
        BasicUtilities.diffDates(
          a,
          b,
          granularity,
          custom),
        { amount, unit },
        'BasicUtilities.diffDates',
        `${text}: ("${a.toISOString()}", "${b.toISOString()}")`
      );
    }
    a = new Date(2021, 6, 15, 0, 0, 0, 0);
    b = new Date(2022, 6, 15, 0, 0, 0, 0);
    testDiffDates(
      a,
      b,
      undefined,
      undefined,
      BasicUtilities.msPerYear,
      DateComparisonGranularity.Millisecond,
      'default is the same as DateComparisonGranularity.Millisecond returns the number of milliseconds between two dates'
    );
    a = new Date(2021, 6, 15, 0, 0, 0, 0);
    b = new Date(2022, 6, 15, 0, 0, 0, 0);
    testDiffDates(
      a,
      b,
      DateComparisonGranularity.Second,
      undefined,
      BasicUtilities.msPerYear / BasicUtilities.msPerSecond,
      DateComparisonGranularity.Second,
      'DateComparisonGranularity.Second returns the number of seconds between two dates'
    );
    testDiffDates(
      a,
      b,
      DateComparisonGranularity.Year,
      undefined,
      1,
      DateComparisonGranularity.Year,
      'DateComparisonGranularity.Year returns the number of years between two dates'
    );
    a = new Date(2020, 0, 1, 0, 0, 0, 0);
    b = new Date(2022, 0, 1, 0, 0, 0, 0);
    testDiffDates(
      a,
      b,
      DateComparisonGranularity.Year,
      undefined,
      2,
      DateComparisonGranularity.Year,
      `DateComparisonGranularity.Year returns the number of years between two dates, for leap years`
    );
    a = new Date(2021, 6, 1, 12, 30, 30, 50);
    b = new Date(2022, 0, 1, 0, 0, 0, 0);
    testDiffDates(
      a,
      b,
      DateComparisonGranularity.Year,
      undefined,
      0.5027958507737189,
      DateComparisonGranularity.Year,
      'DateComparisonGranularity.Year returns the number of partial years between two dates'
    );
    a = new Date(2021, 0, 1, 0, 0, 0, 0);
    b = new Date(2021, 6, 1, 0, 0, 0, 0);
    testDiffDates(
      a,
      b,
      DateComparisonGranularity.Month,
      undefined,
      6,
      DateComparisonGranularity.Month,
      'DateComparisonGranularity.Month returns the number of months between two dates'
    );
    a = new Date(2021, 1, 1, 0, 0, 0, 0);
    b = new Date(2021, 1, 15, 0, 0, 0, 0);
    testDiffDates(
      a,
      b,
      DateComparisonGranularity.Month,
      undefined,
      0.5,
      DateComparisonGranularity.Month,
      'DateComparisonGranularity.Month returns the partial number of months between two dates'
    );
    a = new Date(2021, 0, 1, 0, 0, 0, 0);
    b = new Date(2021, 6, 1, 0, 0, 0, 0);
    testDiffDates(
      a,
      b,
      DateComparisonGranularity.Quarter,
      undefined,
      2,
      DateComparisonGranularity.Quarter,
      'DateComparisonGranularity.Quarter returns the number of months between two dates divided by three'
    );
    a = new Date(2021, 6, 1, 0, 0, 0, 0);
    b = new Date(2021, 0, 1, 0, 0, 0, 0);
    testDiffDates(
      a,
      b,
      DateComparisonGranularity.Custom,
      (a, b) => ({ amount: Math.abs(a.valueOf() - b.valueOf()) / (BasicUtilities.msPerDay * 30), unit: "thrity-month" }),
      6.031944444444444,
      "thrity-month",
      'DateComparisonGranularity.Custom returns the number of periods of thrity days between two dates'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean('True'),
      true,
      'parseBoolean',
      '"True" is true'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean('No'),
      false,
      'parseBoolean',
      '"No" is false'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean('Sure'),
      false,
      'parseBoolean',
      '"Sure" is false'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean('y'),
      true,
      'parseBoolean',
      '"y" is true'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean('YES'),
      true,
      'parseBoolean',
      '"YES" is true'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean('1'),
      true,
      'parseBoolean',
      '"1" is true'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean(1),
      true,
      'parseBoolean',
      '1 is true'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean(0),
      false,
      'parseBoolean',
      '0 is false'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean({a: false}),
      true,
      'parseBoolean',
      '{a: false} is true'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean(undefined),
      false,
      'parseBoolean',
      'undefined is false'
    );
    Assert.isEqual(
      BasicUtilities.parseBoolean(null),
      false,
      'parseBoolean',
      'null is false'
    );
    console.log(`All tests passed. Exiting.`);
  } catch (e) {
    console.error(e);
    console.error(`At least one test failed. Exiting.`);
  }
}
runTests();
