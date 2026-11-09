import React, { useState } from "react";
import { BoardProps } from "../models/board";
import Cell from "./cell";
import "./board.css";

export function Board(props: BoardProps) {
    const [board, _setBoard] = useState(props.board);

    return (
      <div className="board">
        {
            board?.cells?.map((cell, index) => 
                {
                    const r = cell.row;
                    const c = cell.col;
                    return (
                        <div className="cell" data-key={`cell-${r}-${c}`} key={`cell-${r}-${c}`} data-index={index}>
                            <Cell
                                row={r}
                                col={c}
                                index={index} 
                                hidden={cell.hidden}
                                flagged={cell.flagged}
                                value={cell.value}
                                isMine={cell.isMine}
                                board={board}
                            />
                        </div>
                    )
                }
            )
        }
      </div>
    );
}

