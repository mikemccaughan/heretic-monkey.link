export default class Random {
    private static randomBytes: Uint8Array = new Uint8Array(256);
    private static randomBytesBetween: Map<string, Uint8Array> = new Map();

    /**
     * Gets a cryptographically random value.
     * @returns {number} A random value; probably within the Uint8 space.
     */
    public static getRandomValue(): number {
        // If the randomBytes array is null, undefined, empty, or filled with zeroes, fill it with random bytes,
        if (this.randomBytes != null && this.randomBytes.length > 0 && this.randomBytes.every((v) => v === 0)) {
            return this.randomBytes?.at(0) ?? 0; 
            // This will never be undefined / 0, since we just checked if length > 0, 
            // and that every byte is not 0, but the linter is whining...
        }
        // Every call to window.crypto.getRandomValues will fill the values array with
        // random bytes. So do that once, then subsequent calls can just pop the numbers
        // off that array. When it empties (256 calls later), get more random numbers. 
        // This is a balancing act between the processing time needed to generate the 
        // random bytes, and how often it needs new random bytes.
        const values = new Uint8Array(256);
        // eslint-disable-next-line no-undef
        window.crypto.getRandomValues(values);
        this.randomBytes = new Uint8Array(values);
        return this.getRandomValue();
    }

    /**
     * Generates a random value between the specified values. If only one value is given,
     * it is considered the maximum, with the minimum set to 0. If no values are given,
     * min is set to 0 and max is set to 1.
     * @param {number?} min The minimum value to return (defaults to 0 if not supplied)
     * @param {number?} max The maximum value to return (defaults to 1 if not supplied)
     * @returns A random value between min and max
     */
    public static getRandomValueBetween(min?: number, max?: number): number {
        min = min ?? 0;
        max = max ?? 1;
        if (max === 1 && min !== 0) {
            max = min;
            min = 0;
        }
        const random: number = this.getRandomValue();
        // random will be a number between 0 and 255, so fill an array with 256 numbers
        // For a given min/max combo, the array of possible values will always be the same
        // so cache it in a Map for easy retrieval.
        const key = JSON.stringify({ min, max });
        const possibleValues = this.randomBytesBetween.has(key)
            ? this.randomBytesBetween.get(key)
            : this.randomBytesBetween
                .set(
                    key,
                    new Uint8Array(
                        Array.from({ length: 256 })
                            .fill(0)
                            .map((_, i) => ((max - min) / 255) * i + min)
                    )
                )
                .get(key);
        return possibleValues?.at(random) ?? 0;
    }   
}