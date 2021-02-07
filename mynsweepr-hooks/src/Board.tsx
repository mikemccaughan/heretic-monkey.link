import React, { EventHandler, SyntheticEvent } from 'react';
import Cell, { CellProps } from './Cell';

interface BoardProps {
  cells: CellProps[];
  cellClick: EventHandler<SyntheticEvent>;
  cellDoubleClick: EventHandler<SyntheticEvent>;
  cellRightClick: EventHandler<SyntheticEvent>;
}

const Board: React.FC<BoardProps> = ({
  cells,
  cellClick,
  cellDoubleClick,
  cellRightClick
}: BoardProps) => {
  return (
    <div className="board">
      {cells.map(({ val, index, x, y, hidden, flag, hasMine, nearby }) => (
        <Cell
          key={`x${x}y${y}`}
          val={val}
          index={index}
          x={x}
          y={y}
          hidden={hidden}
          flag={flag}
          hasMine={hasMine}
          nearby={nearby}
          cellClick={cellClick}
          cellDoubleClick={cellDoubleClick}
          cellRightClick={cellRightClick}
        ></Cell>
      ))}
    </div>
  );
};

export default Board;
