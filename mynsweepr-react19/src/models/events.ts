import { Board } from "./board";
import { CellData } from "./cell";

export class ShowCellEvent extends Event {
    public cell: CellData;
    constructor(
        public board: Board,
        public index: number
    ) {
        super("showCell");
        this.board = board;
        this.index = index;
        this.cell = this.board.cells[index];
    }
    public dispatch(): void {
        this.board.alterCellByIndex(this.index, "hidden", false);
        this.board.alterCellByIndex(this.index, "flagged", false);
        if (this.cell.isMine) {
            this.board.showLoss();
        } else if (this.cell.value === 0) {
            this.board.showCellsAround(new ShowCellsAroundEvent(this.board, this.index, this.index));
        }
    }
}

export class ShowCellsAroundEvent extends ShowCellEvent {
    constructor(
        public board: Board,
        public index: number,
        public originalIndex: number
    ) {
        super(board, index);
    }
    public dispatch(): void {
        this.board.showCellsAround(new ShowCellsAroundEvent(this.board, this.index, this.originalIndex));
    }
}