import Timer from "./timer.js";
import Modal from "./modal.js";
export default class MineBoard {
    /**
     * Creates an instance of the MineBoard class
     * @param {HTMLElement} boardRoot The root element of the mine board.
     * @param {number | undefined} width The number of cells across
     * @param {number | undefined} height The number of cells down
     */
    constructor(boardRoot, width, height) {
        this.element = boardRoot;
        this.width = width;
        this.height = height;
        this.cellCount = width * height;
        this.mineCount = Math.floor(this.cellCount / 6);
        /**
         * The cells populating the board.
         * @type {{
         *  value: number;
         *  hasMine: boolean;
         *  nearby: number;
         *  x: number;
         *  y: number;
         *  index: number;
         *  hidden: boolean;
         *  flag: boolean;
         *  hadOverlay: boolean;
         *  element?: HTMLElement;
         * }[]}
         */
        this.cells = new Array(this.cellCount);
        this.lastClick = 0;
        this.timer = new Timer(document.querySelector(".timer"));
        this.timer.clear();
        this.randomValues = new Uint8Array(this.cellCount);
        window.crypto.getRandomValues(this.randomValues);
    }
    /**
     * Initializes the MineBoard with mines
     */
    init() {
        /**
         * Indicates whether value is between min and max, inclusively
         * @param {number} value The given value
         * @param {number} min The minimum value the given value can be
         * @param {number} max The maximum value the given value can be
         * @returns true if the value is between min and max (inclusively); otherwise, false
         */
        let isBetween = function (value, min, max) {
            return (value >= min) && (value <= max);
        };
        /* initialize a matrix width x height, filled with 0s for now */
        let boardCells = Array.from({length:this.height}).map((_, i) => Array.from({length:this.width}).fill(0));

        let value = -(this.mineCount * 2);
        /* use the matrix as the board; set the values randomly to be positive (the number of nearby mines) or
           negative (a mine). */
        for (let i = 0; i < this.mineCount; i++) {
            let x, y;
            while (true) {
                x = Math.floor(Math.random() * this.width);
                y = Math.floor(Math.random() * this.height);
                // @ts-ignore
                if ('undefined' !== typeof boardCells[y][x] && 0 <= boardCells[y][x]) {
                    break;
                }
            }
            for (let m = -1; m < 2; m++) {
                for (let n = -1; n < 2; n++) {
                    if (n === 0 && m === 0) {
                        boardCells[y][x] = value;
                    } else if (isBetween(y + n, 0, this.height - 1) && isBetween(x + m, 0, this.width - 1)) {
                        boardCells[y + n][x + m]++;
                    }
                }
            }
        }
        let index = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let i = index;
                if (boardCells[y][x] !== undefined) {
                    this.cells[index++] = {
                        /**
                         * The value of the cell.
                         * @type {number}
                         */
                        value: boardCells[y][x],
                        /**
                         * Indicates whether the cell has a mine.
                         * @type {boolean}
                         */
                        // @ts-ignore
                        hasMine: boardCells[y][x] < 0,  
                        /**
                         * The number of adjacent mines.
                         * @type {number}
                         */
                        // @ts-ignore
                        nearby: boardCells[y][x] >= 0 ? boardCells[y][x] : 0,
                        /**
                         * The x coordinate of the cell.
                         * @type {number}
                         */
                        x: x,
                        /**
                         * The y coordinate of the cell.
                         * @type {number}
                         */
                        y: y,
                        /**
                         * The index of the cell.
                         * @type {number}
                         */
                        index: i,
                        /**
                         * Indicates whether the cell is hidden.
                         * @type {boolean}
                         */
                        hidden: true,
                        /**
                         * Indicates whether the cell has a flag.
                         * @type {boolean}
                         */
                        flag: false,
                        /**
                         * Indicates whether the cell had an overlay.
                         * @type {boolean}
                         */
                        hadOverlay: false
                    };
                }
            }
        }
        this.modals = {
            win: new Modal("youWin", "<h2>You win! 🎉</h2>", this.element),
            lose: new Modal("youLose", "<h2>You lose! 😞</h2>", this.element)
        }
    }
    /**
     * Clears nearby cells.
     * @param {number} cellIndex The index of the cell clicked
     * @param {boolean} wasClicked true if the cell was clicked; false if the call was a recursive.
     */
    clearNearby(cellIndex, wasClicked) {
        let cell = this.cells[cellIndex];
        console.log(`nearby {hadOverlay: ${cell.hadOverlay}, wasClicked: ${wasClicked}}`);
    }
    /**
     * Shows the cells around the given cell.
     * @param {number} cellIndex The index of the cell to clear around
     */
    clearAround(cellIndex) {
        let cell = this.cells[cellIndex];
        cell.hidden = false;
        let minX = cell.x === 0 ? 0 : cell.x - 1;
        let maxX = cell.x === this.width - 1 ? cell.x : cell.x + 1;
        let minY = cell.y === 0 ? 0 : cell.y - 1;
        let maxY = cell.y === this.height - 1 ? cell.y : cell.y + 1;
        for (let x = minX; x < maxX + 1; x++) {
            for (let y = minY; y < maxY + 1; y++) {
                let nextCell = this.cells.filter(c => c.x === x && c.y === y)[0];
                if (nextCell.index !== cellIndex && nextCell.hidden) {
                    this.revealCell(nextCell.index, true, false);
                }
            }
        }
    }
    /**
     * Shows the cell.
     * @param {{
     *  cellIndex: number;
     *  wasClicked?: boolean;
     *  onLose?: function;
     *  onBlank?: function;
     *  onNearby?: function;
     *  onWin?: function;
     * }} options An object representing options for what to do when showing the cell.
     */
    showCell(options) {
        let { cellIndex, wasClicked, onLose, onBlank, onNearby, onWin } = options;
        let cell = this.cells[cellIndex];
        cell.hidden = false;
        let cel = cell.element;
        if (cell.hasMine) {
            // lose
            cel.className = "cell mine";
            cel.textContent = "💣";
            if (onLose) { onLose(); }
        } else if (cell.nearby === 0) {
            cel.className = "cell hidden blank";
            setTimeout(() => {
                cel.classList.remove("hidden");
                cel.innerHTML = "&nbsp;";
                this.lastClick -= 1;
            }, this.lastClick * 20);
            this.lastClick += 1;
            if (onBlank) { onBlank(cellIndex); }
        } else if (this.mineCount === 0) {
            if (onWin) { onWin(); }
        } else {
            cel.className = `cell hidden nearby nearby-${cell.nearby}`;
            setTimeout(() => {
                cel.classList.remove("hidden");
                cel.textContent = cell.nearby.toString();
                this.lastClick -= 1;
            }, this.lastClick * 20);
            this.lastClick += 1;
            if (onNearby) { onNearby(cellIndex, wasClicked); }
        }
    }
    /**
     * Reveals the cell at the specified cellIndex.
     * @param {number} cellIndex The index of the cell to reveal
     * @param {boolean} hadOverlay true if the cell was previously untouched
     * @param {boolean} wasClicked true if the cell was clicked; false if the call is recursive
     */
    revealCell(cellIndex, hadOverlay, wasClicked) {
        if (!this.timer.isRunning) {
            this.timer.start();
        }
        this.cells[cellIndex].hadOverlay = hadOverlay;
        this.showCell({
            cellIndex: cellIndex,
            wasClicked: wasClicked,
            onLose: this.lose.bind(this),
            onBlank: this.clearAround.bind(this),
            onNearby: this.clearNearby.bind(this),
            onWin: this.win.bind(this)
        });
        console.log(`cell ${cellIndex} revealed`);
    }
    /**
     * Shows the dialog informing the user of a win.
     */
    win() {
        this.timer.stop();
        this.modals.win.show();
    }
    /**
     * Shows the dialog informing the user of a loss.
     */
    lose() {
        this.timer.stop();
        this.modals.lose.show();
        this.cells.filter(c => c.hidden).forEach(c => this.showCell({cellIndex: c.index}));
    }
    /**
     * Toggles the flag on or off the given cell
     * @param {number} cellIndex The index of the cell on which to toggle the flag
     */
    toggleFlag(cellIndex) {
        let cell = this.cells[cellIndex];
        let cel = cell.element;
        if (cell.flag) {
            cell.flag = false;
            cel.classList.remove("flag");
            cel.querySelector(".overlay").innerHTML = "&nbsp;";
            this.mineCount++;
        } else if (cell.hidden) {
            cell.flag = true;
            cel.classList.add("flag");
            cel.querySelector(".overlay").innerHTML = "🚩";
            this.mineCount--;
        }
        document.querySelector(".count").innerHTML = this.mineCount.toString();
    }
    /**
     * Clears the board completely.
     */
    clearBoard() {
        this.element.innerHTML = "";
    }
}
