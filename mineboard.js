import Timer from "./timer.js";
import Modal from "./modal.js";
export default class MineBoard {
    constructor(boardRoot, width, height) {
        this.element = boardRoot;
        this.width = width;
        this.height = height;
        this.cellCount = width * height;
        this.mineCount = Math.floor(this.cellCount / 6);
        this.cells = new Array(this.cellCount);
        this.lastClick = 0;
        this.timer = new Timer(document.querySelector(".timer"));
        this.timer.clear();
        this.randomValues = new Uint8Array(this.cellCount);
        window.crypto.getRandomValues(this.randomValues);
    }
    init() {
        let isBetween = function (value, min, max) {
            return (value >= min) && (value <= max);
        };
        let boardCells = [];
        for (let y = 0; y < this.height; y++) {
            boardCells[y] = [];
            for (let x = 0; x < this.width; x++) {
                boardCells[y][x] = 0;
            }
        }

        let value = -(this.mineCount * 2);
        for (let i = 0; i < this.mineCount; i++) {
            let x, y;
            while (true) {
                x = Math.floor(Math.random() * this.width);
                y = Math.floor(Math.random() * this.height);
                if (0 <= boardCells[y][x]) {
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
                this.cells[index++] = {
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
        this.modals = {
            win: new Modal("youWin", "<h2>You win! 🎉</h2>", this.element),
            lose: new Modal("youLose", "<h2>You lose! 😞</h2>", this.element)
        }
    }
    clearNearby(cellIndex, wasClicked) {
        let cell = this.cells[cellIndex];
        console.log(`nearby {hadOverlay: ${cell.hadOverlay}, wasClicked: ${wasClicked}}`);
    }
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
    showCell(options) {
        let { cellIndex, wasClicked, onLose, onBlank, onNearby, onWin } = options;
        let cell = this.cells[cellIndex];
        cell.hidden = false;
        let cel = cell.element;
        if (cell.hasMine) {
            // lose
            cel.className = "cell mine";
            cel.innerHTML = "💣";
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
                cel.innerHTML = cell.nearby;
                this.lastClick -= 1;
            }, this.lastClick * 20);
            this.lastClick += 1;
            if (onNearby) { onNearby(cellIndex, wasClicked); }
        }
    }
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
    win() {
        this.timer.stop();
        this.modals.win.show();
    }
    lose() {
        this.timer.stop();
        this.modals.lose.show();
        this.cells.filter(c => c.hidden).forEach(c => this.showCell({cellIndex: c.index}));
    }
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
        document.querySelector(".count").innerHTML = this.mineCount;
    }
    clearBoard() {
        this.element.innerHTML = "";
    }
}
