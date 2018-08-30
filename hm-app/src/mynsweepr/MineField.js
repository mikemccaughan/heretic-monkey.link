import Utility from '../utility';

class MineField {
    constructor(width, height, lost, cells) {
        this.width = typeof width === 'number' ? width : 9;
        this.height = typeof height === 'number' ? height : 9;
        this.cells = cells && cells.length === this.width * this.height ? cells : this.initializeBoard(this.width, this.height);
        if (typeof lost === 'function') {
            this.lost = lost;
        }
    }
    getMinesRemaining() {
        return Utility.count(this.cells, (cel) => cel.value < 0 && !cel.flag);
    }
    createCell(x, y, value, index, clickCount, hidden, flag) {
        hidden = typeof hidden === 'boolean' ? hidden : true;
        flag = typeof flag === 'boolean' ? flag : false;
        let key = `${x}.${y}.${value}`;
        return {
            key: key,
            value: value,
            x: x,
            y: y,
            index: index,
            clickCount: clickCount || 0,
            hidden: hidden,
            flag: flag
        };
    }
    initializeBoard(width, height) {
        this.width = typeof width === 'number' ? width : 9;
        this.height = typeof height === 'number' ? height : 9;
        if (this.cells && this.cells.length === this.width * this.height) {
            return this.cells;
        }

        let cellCount = this.width * this.height;
        let mineCount = Math.floor(cellCount / 6);
        let board = [];
        let cells = [];
        let cellIndex = 0;
        for (let y = 0; y < this.height; y++) {
            board[y] = [];
            for (let x = 0; x < this.width; x++) {
                board[y][x] = 0;
            }
        }
        let value = -(mineCount * 2);
        let isBetween = function (value, min, max) {
            return (value >= min) && (value <= max);
        };
        for (let i = 0; i < mineCount; i++) {
            let x, y;
            while (true) {
                x = Math.floor(Math.random() * this.width);
                y = Math.floor(Math.random() * this.height);
                if (0 <= board[y][x]) {
                    break;
                }
            }
            for (let m = -1; m < 2; m++) {
                for (let n = -1; n < 2; n++) {
                    if (n === 0 && m === 0) {
                        board[y][x] = value;
                    } else if (isBetween(y + n, 0, this.height - 1) &&
                        isBetween(x + m, 0, width - 1)) {
                        board[y + n][x + m]++;
                    }
                }
            }
        }
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                cells[cellIndex] = this.createCell(x, y, board[y][x], cellIndex);
                cellIndex++;
            }
        }

        return cells;
    }
    makeNewCell(cell) {
        return Object.assign({}, cell, this.createCell(cell.x, cell.y, cell.value, cell.index, 0, cell.hidden, cell.flag));
    }
    takeActionOnCell(cell, action) {
        const cellsBefore = cell.index > 0 ? [...this.cells.slice(0, cell.index)] : [];
        const cellsAfter = cell.index + 1 < this.cells.length ? this.cells.slice(cell.index + 1) : [];
        return [...cellsBefore, action(cell), ...cellsAfter];
    }
    showCell(cell) {
        return Object.assign({}, cell, { hidden: false });
    }
    showCellInCells(cell) {
        console.log("showCellInCells");
        this.cells = this.takeActionOnCell(cell, this.showCell);
        return this.cells;
    }
    flagCell(cell) {
        return Object.assign({}, cell, { flag: !cell.flag });
    }
    flagCellInCells(cell) {
        console.log("flagCellInCells");
        this.cells = this.takeActionOnCell(cell, this.flagCell);
        return this.cells;
    }
    takeActionOnSurroundingCells(cell, action, conditional = (cel) => true, takeActionOnSelf = false) {
        let minX = 0, maxX = this.width - 1;
        let minY = 0, maxY = this.height - 1;
        let startX = cell.x - 1 <= minX ? minX : cell.x - 1;
        let stopX = cell.x + 1 >= maxX ? maxX : cell.x + 1;
        let startY = cell.y - 1 <= minY ? minY : cell.y - 1;
        let stopY = cell.y + 1 >= maxY ? maxY : cell.y + 1;
        for (let cellX = startX; cellX <= stopX; cellX++) {
            for (let cellY = startY; cellY <= stopY; cellY++) {
                if (takeActionOnSelf || !(cellY === cell.y && cellX === cell.x)) {
                    let cell = this.cells.find((c) => c.x === cellX && c.y === cellY);
                    if (conditional(cell)) {
                        console.log(`taking action "${action.name}" on \n${JSON.stringify(cell)}`);
                        action(cell);
                    }
                }
            }
        }
    }
    revealAllCells() {
        for (let cell of this.cells) {
            this.revealCell(cell, true);
        }
    }
    revealAround(cell) {
        this.takeActionOnSurroundingCells(cell, this.revealCell.bind(this), cel => cel && cel.value >= 0, false);
    }
    revealCell(cell, revealingAll = false) {
        if (!cell) {
            debugger;
            return;
        }
        let cellState = this.cells[cell.index];
        if (!cellState) {
            console.error("No such cell in state...");
            return;
        }
        if (!cellState.hidden) {
            console.log("not revealing cell (not hidden) ", cell);
            return;
        }
        if (cellState.flag) {
            console.log("not revealing cell (flagged) ", cell);
            return;
        }
        if (cell.value < 0) {
            this.showCellInCells(cell);
            console.log("you lose");
            this.lost();
            this.revealAllCells();
        } else if (cell.value === 0) {
            console.log("revealing cell (blank)", cell);
            this.showCellInCells(cell);
            if (!revealingAll) {
                this.revealAround(cell);
            }
        } else {
            console.log("revealing cell (nearby)", cell);
            this.showCellInCells(cell);
        }
    }
}

export default MineField;