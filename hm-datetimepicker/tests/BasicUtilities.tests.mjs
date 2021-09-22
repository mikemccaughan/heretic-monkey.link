import BasicUtilities from '../BasicUtilities.mjs';
import { Assert } from './test.mjs';

function runTests() {
  const fn = () => {};
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
      BasicUtilities.areTheSame(fn, () => {}),
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
        { a: 'a', one: 1, c: new Date(1234, 1, 2, 0, 0, 0, 0) }
      ),
      true,
      'areTheSame',
      'different objects with the same properties are the same if deep is false'
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
    console.log(`All tests passed. Exiting.`);
  } catch (e) {
    console.error(e);
    console.error(`At least one test failed. Exiting.`);
  }
}
runTests();
