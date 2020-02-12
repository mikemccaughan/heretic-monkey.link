import React from 'react';
import Cell, { CellProps } from './Cell';

interface BoardProps {
  cells: CellProps[];
}

const Board: React.FC<BoardProps> = ({ cells }: BoardProps) => {
  return (
    <div className="board">
      {cells.map(({ val, index, x, y, hidden, flag }) => (
        <Cell
          key={`x${x}y${y}`}
          val={val}
          index={index}
          x={x}
          y={y}
          hidden={hidden}
          flag={flag}
        ></Cell>
      ))}
    </div>
  );
};

export default Board;
