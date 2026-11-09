import { CellData } from "./cell";
import { ShowCellEvent, ShowCellsAroundEvent } from "./events";
import { ModalService } from "./modal.service";
import { Preboard } from "./preboard";
import { Timer } from "./timer";

export class Board {
    public width: number = 9;
    public height: number = 9;
    public density: number = 1 / 6;
    public mineCount: number = Math.floor(this.width * this.height * this.density);    
    public cells: Array<CellData>;
    public cellsByCoord: Array<Array<CellData>>;
    public timer: Timer;
    public modalSvc: ModalService = ModalService.getInstance();
    
    constructor(preboard?: Preboard) {
        this.width = preboard ? preboard.cols : this.width;
        this.height = preboard ? preboard.rows : this.height;
        this.density = preboard ? preboard.density : this.density;
        this.mineCount = Math.floor(this.width * this.height * this.density);
        let index = 0;
        if (!preboard || preboard.length === 0) {
            this.cellsByCoord = Array.from({ length: this.height }, (_, r) =>
                Array.from({ length: this.width }, (_, c) => 
                    new CellData(r, c, index++, 0)
                )
            );
        } else {
            this.cellsByCoord = Array.from({ length: preboard.length }, (_, r) => 
                Array.from({ length: preboard[r].length }, (_, c) => 
                    new CellData(r, c, index++, preboard[r][c], preboard[r][c] < 0)
                )
            );
        }
        this.cells = this.cellsByCoord.flat();
        this.mineCount = this.cells.filter(cell => cell.isMine).length;
        this.timer = new Timer();
    }

    public alterCellByIndex(index: number, key: keyof CellData, value: CellData[typeof key]): Board {
        const cell = this.cells[index];
        if (cell && cell instanceof CellData && key in cell) {
            cell[key] = value;
        }
        this.cells[index] = cell;
        this.cellsByCoord[cell.row][cell.col] = cell;
        this.mineCount = this.cells.filter(cell => cell.isMine).length;

        return this;
    }

    public alterCellByCoord(row: number, col: number, key: keyof CellData, value: CellData[typeof key]): Board {
        const cell = this.cellsByCoord[row][col];
        if (cell && cell instanceof CellData && key in cell) {
            cell[key] = value;
        }
        this.cells[cell.index] = cell;
        this.cellsByCoord[cell.row][cell.col] = cell;
        this.mineCount = this.cells.filter(cell => cell.isMine).length;

        return this;
    }

    public alterAllCells(key: keyof CellData, value: CellData[typeof key]): Board {
        this.cells.forEach(cell => {
            if (cell && cell instanceof CellData && key in cell) {
                cell[key] = value;
            }
            this.cells[cell.index] = cell;
            this.cellsByCoord[cell.row][cell.col] = cell;
        });
        this.mineCount = this.cells.filter(cell => cell.isMine).length;

        return this;
    }

    public showCell(showCellEvent: ShowCellEvent): Board {
        let board: Board = this;
        const cell = board.cells[showCellEvent.index];
        if (cell && cell instanceof CellData && !cell.flagged) {
            board.alterCellByIndex(showCellEvent.index, "hidden", false);
            board.alterCellByIndex(showCellEvent.index, "flagged", false);
            if (cell.isMine) {
                board = board.showLoss();
            } else if (cell.value === 0) {
                board = board.showCellsAround(new ShowCellsAroundEvent(board, cell.index, showCellEvent.index));
            } else {
                return board;
            }
        }
        return board;
    }


    public showCellsAround(showCellsAroundEvent: ShowCellsAroundEvent): Board {
        let { board, index } = showCellsAroundEvent;
        const cell = board.cells[index];
        if (cell && cell instanceof CellData && !cell.flagged) {
            board.alterCellByIndex(index, "hidden", false);
            let rowMin = cell.row === 0 ? 0 : cell.row - 1;
            let rowMax = cell.row === board.height - 1 ? board.height - 1 : cell.row + 1;
            let colMin = cell.col === 0 ? 0 : cell.col - 1;
            let colMax = cell.col === board.width - 1 ? board.width - 1 : cell.col + 1;
            for (let r = rowMin; r <= rowMax; r++) {
                for (let c = colMin; c <= colMax; c++) {
                    const cellAround = board.cellsByCoord[r][c];
                    if (cellAround && cellAround instanceof CellData && cellAround.hidden && !cellAround.flagged) {
                        board = board.showCell(new ShowCellEvent(board, cellAround.index));
                    }
                }
            }
        }
        return board;
    }

    public showLoss(): Board {
        this.modalSvc.openModal("gameOver");
        this.timer.stop();
        return this.alterAllCells("hidden", false);
    }
}

export interface BoardProps {
    board: Board | null;
}
