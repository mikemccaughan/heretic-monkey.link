export class Assert {
  static isEqual(a, b, title, desc) {
    if (Array.isArray(a) && Array.isArray(b)) {
      Assert.hasSameValues(a, b, title, desc);
    }
    if (a instanceof Date && b instanceof Date) {
      if (a.valueOf() !== b.valueOf()) {
        throw new Error(
          `${title}: ${desc}: The values given are not the same: Expected ${a} to equal ${b}.`
        );
      }
    }
    if (a !== b) {
      throw new Error(
        `${title}: ${desc}: The values given are not the same: Expected ${a} to equal ${b}.`
      );
    }
  }
  static isClose(a, b, title, desc) {
    if (a instanceof Date && b instanceof Date) {
      if (a.valueOf() != b.valueOf()) {
        throw new Error(
          `${title}: ${desc}: The values given are not the same: Expected ${a} to equal ${b}.`
        );
      }
    }
    if (a != b) {
      throw new Error(
        `${title}: ${desc}: The values given are not the same: Expected ${a} to equal ${b}.`
      );
    }
  }
  static hasSameValues(a, b, title, desc) {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (
        !a.every((ae) => b.some((be) => Assert.isEqual(ae, be, title, desc)))
      ) {
        throw new Error(
          `${title}: ${desc}: The values given are not the same: Expected ${a} to equal ${b}.`
        );
      }
    } else if (a instanceof Date && b instanceof Date) {
      if (a.valueOf() !== b.valueOf()) {
        throw new Error(
          `${title}: ${desc}: The values given are not the same: Expected ${a} to equal ${b}.`
        );
      }
    } else if (typeof a === 'object' && typeof b === 'object') {
      Assert.hasSameValues(Object.entries(a), Object.entries(b), title, desc);
    } else {
      if (JSON.stringify(a) !== JSON.stringify(b)) {
        throw new Error(
          `${title}: ${desc}: The values given are not the same: Expected ${a} to equal ${b}.`
        );
      }
    }
  }
}
