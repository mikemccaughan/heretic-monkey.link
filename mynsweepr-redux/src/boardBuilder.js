export class BoardBuilder {
  static sortCells(cells) {
    const isNotSorted = cells.some((c, i) => c.index !== i);
    if (isNotSorted) {
      return cells.sort((a, b) => a.index - b.index);
    }

    return cells;
  }
  static createCell(x, y, value, index, clickCount, hidden, flag) {
    hidden = typeof hidden === 'boolean' ? hidden : true;
    flag = typeof flag === 'boolean' ? flag : false;
    let key = `${x}.${y}.${value}`;
    return {
      key: key,
      value: value,
      x: x,
      y: y,
      index: index,
      clickCount: clickCount || 0,
      hidden: hidden,
      flag: flag
    };
  }
  static initializeBoard(width, height) {
    width = typeof width === 'number' ? width : 9;
    height = typeof height === 'number' ? height : 9;

    let cellCount = width * height;
    let mineCount = Math.floor(cellCount / 6);
    let board = [];
    let cells = [];
    let cellIndex = 0;
    for (let y = 0; y < height; y++) {
      board[y] = [];
      for (let x = 0; x < width; x++) {
        board[y][x] = 0;
      }
    }
    let value = -(mineCount * 2);
    let isBetween = function(value, min, max) {
      return value >= min && value <= max;
    };
    for (let i = 0; i < mineCount; i++) {
      let x, y;
      while (true) {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
        if (0 <= board[y][x]) {
          break;
        }
      }
      for (let m = -1; m < 2; m++) {
        for (let n = -1; n < 2; n++) {
          if (n === 0 && m === 0) {
            board[y][x] = value;
          } else if (
            isBetween(y + n, 0, height - 1) &&
            isBetween(x + m, 0, width - 1)
          ) {
            board[y + n][x + m]++;
          }
        }
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        cells[cellIndex] = BoardBuilder.createCell(
          x,
          y,
          board[y][x],
          cellIndex
        );
        cellIndex++;
      }
    }

    return BoardBuilder.sortCells(cells);
  }
}
