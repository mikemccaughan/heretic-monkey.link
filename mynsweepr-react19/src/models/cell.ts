import { Board } from "../models/board";

export interface CellProps {
    row: number;
    col: number;
    index: number;
    isMine: boolean;
    hidden: boolean;
    flagged: boolean;
    value: number;
    board?: Board;
}

export class CellData {
    constructor(
        public row: number,
        public col: number,
        public index: number,
        public value: number,
        public isMine: boolean = false,
        public hidden: boolean = true,
        public flagged: boolean = false
    ) {}
    [key: string]: number | boolean;
}