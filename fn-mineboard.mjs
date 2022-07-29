/** @type {number[]} */
let randomValues = [];
function getRandomValue() {
    if (randomValues != null && randomValues.length > 0) {
        return randomValues.pop();
    }
    let values = new Uint8Array();
    window.crypto.getRandomValues(values);
    randomValues = [...values];
    return getRandomValue();
}

/**
The board on which mines will be laid (in cells)
@typedef {{
    width: number,
    height: number,
    density: number,
    cells: Cell[],
    mineCount: number
}} Board
A cell within the board
@typedef {{
    value: number,
    hasMine: boolean,
    nearby: number,
    x: number,
    y: number,
    index: number,
    hidden: boolean,
    flag: boolean,
    hadOverlay: boolean,
    wasClicked?: boolean
}} Cell
Arguments common to all of the functions in this module
@typedef {{
    cells: Cell[],
    mineCount: number,
    index: number,
    hadOverlay?: boolean,
    wasClicked?: boolean,
    onLose?: Function,
    onBlank?: Function,
    onNearby?: Function,
    onWin?: Function,
    onReveal?: Function
}} fnArgs
*/

/**
 * Generates a Mynsweeper board
 * @param {number} width The width of the board, in number of blocks (default: 9)
 * @param {number} height The height of the board, in number of blocks (default: 9)
 * @param {number} density The number of mines per block, expressed as a "float" (default: 1/6)
 * @returns {Board} An object with a "cells" property which is an 
 * array of objects, and a "mineCount"  property with the number of mines generated (which will 
 * be equal to width * height * density).
 */
export function generateBoard(width, height, density) {
    width = width ?? 9;
    height = height ?? 9;
    density = density ?? (1/6);
    if (width < 2) throw new Error(`width must be >= 1, got ${width}`);
    if (height < 2) throw new Error(`height must be >= 1, got ${height}`);
    if (density <= 0 || density >= 1) throw new Error(`density must be > 0 and < 1, got ${density}`);
    /** @type { Cell[] } */
    let cells = new Array(width * height);
    /** @type {number} */
    let mineCount = Math.floor(width * height * density);
    /**
     * Indicates whether a given number value is between a minimum and maximum value, inclusively
     * @param {number} value The value
     * @param {number} min The smallest value value can be
     * @param {number} max The largest value value can be
     * @returns true if value is between min and max (inclusively); otherwise, false
     */
    const isBetween = (value, min, max) => value >=  min && value <= max;
    /** @type {number[][]} */
    let boardCells = new Array(height).fill(new Array(width).fill(0));
    /** @type {number} */
    let value = -(mineCount * 2);
    for (let i = 0; i < mineCount; i++) {
        let x, y;
        while (true) {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * height);
            if (boardCells[y][x] >= 0) {
                break;
            }
        }
        for (let m = -1; m < 2; m++) {
            for (let n = -1; n < 2; n++) {
                if (n === 0 && m === 0) {
                    boardCells[y][x] = value;
                } else if (isBetween(y + n, 0, height - 1) && isBetween(x + m, 0, width - 1)) {
                    boardCells[y + n][x + m]++;
                }
            }
        }
    }
    let index = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let i = index;
            cells[index++] = {
                value: boardCells[y][x],
                hasMine: boardCells[y][x] < 0,
                nearby: boardCells[y][x] >= 0 ? boardCells[y][x] : 0,
                x: x,
                y: y,
                index: i,
                hidden: true,
                flag: false,
                hadOverlay: false
            };
        }
    }

    return {
        cells,
        mineCount,
        width,
        height,
        density
    };
}

/**
@typedef {{
    cells: Cell[],
    mineCount: number,
    index: number,
    hadOverlay?: boolean,
    wasClicked?: boolean,
    onLose?: Function,
    onBlank?: Function,
    onNearby?: Function,
    onWin?: Function,
    onReveal?: Function
}} RevealCellArgs
*/
/** 
@typedef {{
    board: Board,
    cells: Cell[],
    mineCount: number,
    width: number,
    height: number,
    index: number,
    hadOverlay?: boolean,
    wasClicked?: boolean,
    onLose?: Function,
    onBlank?: Function,
    onNearby?: Function,
    onWin?: Function,
    onReveal?: Function
}} ClearAroundArgs
*/
/**
 * Reveals cells around the specified cell, recursively. Used for when a cell is known to
 * have no nearby cells with mines.
 * @param {ClearAroundArgs} clearAroundArgs An object which tell the function 
 * which cell to clear around
 * @returns {fnArgs} An object with updated cells
 */
export function clearAround(clearAroundArgs) {
    const {board, index, onLose, onBlank, onNearby, onWin, onReveal } = clearAroundArgs;
    let {cells} = clearAroundArgs;
    const cell = cells[index];
    const { width, height } = board;
    const minX = cell.x === 0 ? 0 : cell.x - 1;
    const maxX = cell.x === width - 1 ? cell.x : cell.x + 1;
    const minY = cell.y === 0 ? 0 : cell.y - 1;
    const maxY = cell.y === height - 1 ? cell.y : cell.y + 1;
    cells = updateCellAtIndex(cells, index, 'hidden', false);
    /** @type {RevealCellArgs} */
    let revealCellArgs = {
        cells: cells,
        mineCount: cells.filter(c => c.hasMine && !c.flag).length,
        index: index,
        hadOverlay: cell.hadOverlay,
        wasClicked: cell.wasClicked,
        onLose: onLose,
        onBlank: onBlank,
        onNearby: onNearby,
        onWin: onWin,
        onReveal: onReveal
    };
    for (let x = minX; x < maxX; x++) {
        for (let y = minY; y < maxY; y++) {
            let nextCell = cells.find(c => c.x === x && c.y === y);
            if (nextCell && nextCell.index !== index && nextCell.hidden) {
                revealCellArgs = revealCell(revealCellArgs);
            }
        }
    }

    return revealCellArgs;
}

/**
 * Updates the specified property of the cell and the specified index in the array of cells 
 * to the specified value and returns the new array of cells.
 * @param {Cell[]} cells The cells in which the cell to update is located
 * @param {number} index The index within cell at which the cell to update is located
 * @param {string} propertyName The name of the property to update
 * @param {any} propertyValue The value of the property
 * @returns {Cell[]} A new array of Cells, with the updated cell within
 */
function updateCellAtIndex(cells, index, propertyName, propertyValue) {
    if (index < 0 || index > cells.length - 1) {
        throw new Error('index must be between 0 and the end of the array');
    }
    // This bit of math ensures the index lies within the bounds of the cells array
    // We already have the above parameter guard, this is just to double check.
    const minIndex = Math.min(Math.max(index + 1, 0), cells.length - 1);
    const maxIndex = Math.min(cells.length, Math.max(index + 1, 0) + 1);
    return [
        ...cells.slice(0, minIndex),
        {
            ...cells[minIndex],
            [propertyName]: propertyValue
        },
        ...cells.slice(maxIndex)
    ];
}

/**
 * Reveals the cell at the specified index.
 * @param {RevealCellArgs} revealCellArgs An object tellling the function which cell to reveal
 * @returns {fnArgs} An object, similar to revealCellArgs, that is updated with updated cells
 */
export function revealCell(revealCellArgs) {
    if (revealCellArgs.onReveal) revealCellArgs = revealCellArgs.onReveal(revealCellArgs);
    revealCellArgs = {
        ...revealCellArgs,
        cells: updateCellAtIndex(revealCellArgs.cells, revealCellArgs.index, 'hadOverlay', revealCellArgs.hadOverlay)
    };
    return showCell(revealCellArgs);
}

/**
@typedef {{
    cells: Cell[],
    mineCount: number,
    index: number,
    hadOverlay?: boolean,
    wasClicked?: boolean,
    onLose?: Function,
    onBlank?: Function,
    onNearby?: Function,
    onWin?: Function,
    onReveal?: Function
}} ShowCellArgs 
*/
/**
 * Shows a specific cell.
 * @param {ShowCellArgs} showCellArgs An object specifying which cell to show
 * @returns An object with the new list of cells
 */
export function showCell(showCellArgs) {
    const cell = showCellArgs.cells[showCellArgs.index];
    showCellArgs = {
        ...showCellArgs,
        cells: updateCellAtIndex(showCellArgs.cells, showCellArgs.index, 'hidden', false)
    }
    if (cell.hasMine && showCellArgs.onLose) {
        showCellArgs = showCellArgs.onLose(showCellArgs);
    } else if (cell.nearby === 0 && showCellArgs.onBlank) {
        showCellArgs = showCellArgs.onBlank(showCellArgs);
    } else if (showCellArgs.mineCount === 0 && showCellArgs.onWin) {
        showCellArgs = showCellArgs.onWin(showCellArgs);
    } else if (showCellArgs.onNearby) {
        showCellArgs = showCellArgs.onNearby(showCellArgs);
    }

    return showCellArgs;
}

/**
@typedef {{
    cells: Cell[],
    mineCount: number,
    index: number,
    hadOverlay: boolean,
    wasClicked?: boolean,
    onLose?: Function,
    onBlank?: Function,
    onNearby?: Function,
    onWin?: Function,
    onReveal?: Function
}} FlagCellArgs 
*/
/**
 * Flags a cell as possibly having a mine
 * @param {FlagCellArgs} flagCellArgs An object specifying the cell to flag
 * @returns {fnArgs} An object with the new array of cells.
 */
export function flagCell(flagCellArgs) {
    const cell = flagCellArgs.cells[flagCellArgs.index];
    if (cell.flag) {
        return {
            ...flagCellArgs,
            cells: updateCellAtIndex(flagCellArgs.cells, flagCellArgs.index, 'flag', false),
            mineCount: flagCellArgs.mineCount + 1
        };
    }
    return {
        ...flagCellArgs,
        cells: updateCellAtIndex(flagCellArgs.cells, flagCellArgs.index, 'flag', true),
        mineCount: flagCellArgs.mineCount - 1
    };
}

/**
 * Shows all cells on the board
 * @param {Cell[]} cells The cells to show
 * @returns {Cell[]} The same array of cells, all with their hidden property set to false
 */
export function showAllCells(cells) {
    return [
        ...cells.filter(c => !c.hidden),
        ...cells.filter(c => c.hidden).map(c => ({
            ...c,
            hidden: false
        }))
    ].sort((a,b) => a.index - b.index);
}