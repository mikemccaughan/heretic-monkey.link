import Random from './random';

export class Preboard extends Array<Array<number>> {

    [key: number]: Array<number>;

    constructor(
        public cols: number,
        public rows: number,
        public density: number = 1 / 6
    ) {
        const cells = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
        super(...cells);
        if (density <= 0 || density >= 1) {
            throw new Error(
                `Density must be between 0 and 1 (exclusive). Received: ${density}`
            );
        }
        if (rows <= 0 || cols <= 0) {
            throw new Error(
                `Rows and columns must be greater than 0. Received: ${rows} rows, ${cols} columns`
            );
        }
        return this.generatePreboard(cols, rows, density);
    }

    /**
     * Indicates whether a given number value is between a minimum and maximum value, inclusively
     * @param {number} value The value
     * @param {number} min The smallest value value can be
     * @param {number} max The largest value value can be
     * @returns true if value is between min and max (inclusively); otherwise, false
     */
    public static isBetween(value: number, min: number, max: number): boolean {
        return value >= min && value <= max;
    }

    /**
     * Generates a Mynsweeper Preboard object, which is a board with a given number of cells and mines.
     * @param {number} width The width of the board, in number of blocks (default: 9)
     * @param {number} height The height of the board, in number of blocks (default: 9)
     * @param {number} density The number of mines per block, expressed as a "float" (default: 1/6)
     * @returns {Preboard} An array of arrays of values. Each array represents a row of the board,
     * and each value represents a cell in that row. The values are either less than 0 (indicating
     * a mine) or greater than or equal to 0 (indicating the number of mines surrounding that cell).
     */
    public generatePreboard(width: number = this.cols, height: number = this.rows, density: number = this.density): Preboard {
        let mineCount = Math.floor(width * height * density);
        let value = -(mineCount * 2);
        for (let i = 0; i < mineCount; i++) {
            let x: number;
            let y: number;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                x = Random.getRandomValueBetween(width);
                y = Random.getRandomValueBetween(height);
                if (this[y][x] >= 0 || (x === 0 && y === 0)) {
                    break;
                }
            }
            for (let m = -1; m < 2; m++) {
                for (let n = -1; n < 2; n++) {
                    if (n === 0 && m === 0) {
                        this[y][x] = value;
                    } else if (
                        Preboard.isBetween(y + n, 0, height - 1) &&
                        Preboard.isBetween(x + m, 0, width - 1)
                    ) {
                        this[y + n][x + m]++;
                    }
                }
            }
        }
        return this;
    }
}