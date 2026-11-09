import { CellData } from "./cell";

class Utils {
    /**
     * Returns a value indicating whether a or b is greater, judging by its index.
     * @param {Cell} a The first cell to compare
     * @param {Cell} b The second cell to compare
     * @returns {number} A value greater than zero if a is greater than b, less than zero
     * if b is greater than a, or equal to zero if a is equal to b.
     */
    public static sortByIndex(a: CellData, b: CellData): number {
        return (a?.index ?? 0) - (b?.index ?? 0);
    }

    /**
     * Returns a value indicating whether a or b are equal, meaning if the values are arrays, they have
     * the same length, and the same values at the same indexes and if the values are objects, they have
     * the same number of own keys with the same values at the same keys, otherwise it returns the result
     * of perfoming a strict equality check on the values (===).
     * @param {unknown} a The first value to compare
     * @param {unknown} b The second value to compare
     * @returns {boolean} True if a and b are equal, false otherwise.
     */
    public static deepEqual(a: unknown, b: unknown): boolean {
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            return a.every((aValue, aIndex) => this.deepEqual(aValue, b[aIndex]));
        } else if (a instanceof Object && b instanceof Object) {
            const keysA = Object.keys(a) as Array<keyof typeof a>;
            const keysB = Object.keys(b) as Array<keyof typeof b>;
            if (keysA.length !== keysB.length) return false;
            return keysA.every((aKey) => keysB.includes(aKey)) && 
                keysA.every((aKey) => this.deepEqual(a[aKey], b[aKey]));
        } else {
            if (a === b) return true;
            if (typeof a !== typeof b) return false;
            return false;
        }
    }
}

export default Utils;