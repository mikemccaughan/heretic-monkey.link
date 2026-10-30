export class Utils {
  static isNull(value: unknown): value is null {
    return value === null;
  }

  static isUndefined(value: unknown): value is undefined {
    return value === undefined;
  }

  static isNullOrUndefined(value: unknown): value is null | undefined {
    return Utils.isNull(value) || Utils.isUndefined(value);
  }

  static isObject(value: unknown): value is object {
    return typeof value === "object" && !Utils.isNull(value);
  }

  static isFunction(value: unknown): value is Function {
    return typeof value === "function";
  }

  static isString(value: unknown): value is string {
    return typeof value === "string";
  }

  static toString(value: unknown): string {
    if (Utils.isNullOrUndefined(value)) {
      return "";
    }
    if (Utils.isFunction(value.toString)) {
      return value.toString();
    }
    return String(value);
  }

  static isGoodString(value: unknown): value is string {
    return Utils.isString(value) && value.trim().length > 0;
  }

  static isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  static isFiniteNumber(value: unknown): value is number {
    return Utils.isNumber(value) && isFinite(value);
  }

  static isInteger(value: unknown): value is number {
    return Utils.isNumber(value) && Number.isInteger(value);
  }

  static isBigInt(value: unknown): value is bigint {
    return typeof value === "bigint";
  }

  static isBigIntNumber(value: unknown): value is bigint {
    return Utils.isBigInt(value) && Number.isSafeInteger(Number(value));
  }

  static isSymbol(value: unknown): value is symbol {
    return typeof value === "symbol";
  }

  static isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
  }

  static isArray(value: unknown): value is Array<unknown> {
    return Array.isArray(value);
  }

  static isDate(value: unknown): value is Date {
    return value instanceof Date;
  }

  static isGoodDate(value: unknown): value is Date {
    return Utils.isDate(value) && !isNaN(value.getTime());
  }

  /**
   * Checks if a value is "good" based on its type and the provided minimum and maximum values.
   * @param value The value to check.
   * @param min The minimum value (minimum length when value is a string, ms since epoch when value is Date).
   * @param max The maximum value (maximum length when value is a string, ms since epoch when value is Date).
   * @returns True if the value is good, false otherwise.
   */
  static isGood(value: unknown, min: unknown = 0, max: unknown = Number.MAX_SAFE_INTEGER): boolean {
    if (Utils.isNullOrUndefined(value)) {
      return false;
    }
    if (Utils.isString(value)) {
      const trimmedValue = value.trim();
      return (
        trimmedValue.length > ((min as number) ?? 0) &&
        trimmedValue.length < ((max as number) ?? Number.MAX_SAFE_INTEGER)
      );
    }
    if (Utils.isNumber(value)) {
      if (isNaN(value)) {
        return false;
      }
      return (
        value >= ((min as number) ?? 0) && value <= ((max as number) ?? Number.MAX_SAFE_INTEGER)
      );
    }
    if (Utils.isArray(value)) {
      if (value.length === 0) {
        return false;
      }
      return (
        value.length >= ((min as number) ?? 0) &&
        value.length <= ((max as number) ?? Number.MAX_SAFE_INTEGER)
      );
    }
    if (Utils.isDate(value)) {
      if (isNaN(value.valueOf())) {
        return false;
      }
      return (
        value.valueOf() >= ((min as number) ?? 0) &&
        value.valueOf() <= ((max as number) ?? Number.MAX_SAFE_INTEGER)
      );
    }
    return true; // For objects and other types, we assume they are good if they are not null or undefined.
  }
  static setTimeout(fn: TimerHandler, delay: number, ...args: unknown[]): number {
    return window.setTimeout(fn, delay, ...args);
  }
}
