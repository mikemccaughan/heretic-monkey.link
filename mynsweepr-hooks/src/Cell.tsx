import React from 'react';

export interface CellProps {
  val?: number;
  index?: number;
  x?: number;
  y?: number;
  hidden?: boolean;
  flag?: boolean;
}

const Cell: React.FC<CellProps> = ({
  val,
  index,
  x,
  y,
  hidden,
  flag
}: CellProps) => {
  const classes = ['cell'];
  if (hidden) {
    classes.push('hidden');
  }
  if (flag) {
    classes.push('flag');
  }
  return (
    <button
      type="button"
      id={`cell${index}`}
      className={classes.join(' ')}
      data-val={val}
    ></button>
  );
};

export default Cell;
