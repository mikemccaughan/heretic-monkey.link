import React, { EventHandler, SyntheticEvent } from 'react';

export interface CellProps {
  val?: number;
  index?: number;
  x?: number;
  y?: number;
  hidden?: boolean;
  flag?: boolean;
  hasMine?: boolean;
  nearby?: number;
  cellClick?: EventHandler<SyntheticEvent>;
  cellDoubleClick?: EventHandler<SyntheticEvent>;
  cellRightClick?: EventHandler<SyntheticEvent>;
}

const Cell: React.FC<CellProps> = ({
  val,
  index,
  x,
  y,
  hidden,
  flag,
  hasMine,
  nearby,
  cellClick,
  cellDoubleClick,
  cellRightClick
}: CellProps) => {
  const classes = ['cell'];
  if (hidden) {
    classes.push('hidden');
  }
  if (flag) {
    classes.push('flag');
  }
  if (hasMine) {
    classes.push('mine');
  }
  if (nearby ?? false) {
    classes.push('nearby');
  }
  return (
    <button
      type="button"
      id={`cell${index}`}
      className={classes.join(' ')}
      data-val={val}
      data-index={index}
      onClick={cellClick}
      onDoubleClick={cellDoubleClick}
      onContextMenu={cellRightClick}
    >{nearby}</button>
  );
};

export default Cell;
