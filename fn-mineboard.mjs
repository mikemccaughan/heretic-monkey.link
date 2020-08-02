export function generateBoard(width, height, density) {
    width = width ?? 9;
    height = height ?? 9;
    density = density ?? (1/6);
    if (width < 2) throw new Error(`width must be >= 1, got ${width}`);
    if (height < 2) throw new Error(`height must be >= 1, got ${height}`);
    if (density <= 0 || density >= 1) throw new Error(`density must be > 0 and < 1, got ${density}`);
    let cells = new Array(width * height);
    let mineCount = Math.floor(width * height * density);
    const isBetween = (value, min, max) => value >=  min && value <= max;
    let boardCells = new Array(height).fill(new Array(width).fill(0));
    let value = -(mineCount * 2);
    for (let i = 0; i < mineCount; i++) {
        let x, y;
        while (true) {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * height);
            if (boardCells[y][x] >= 0) {
                break;
            }
        }
        for (let m = -1; m < 2; m++) {
            for (let n = -1; n < 2; n++) {
                if (n === 0 && m === 0) {
                    boardCells[y][x] = value;
                } else if (isBetween(y + n, 0, height - 1) && isBetween(x + m, 0, width - 1)) {
                    boardCells[y + n][x + m]++;
                }
            }
        }
    }
    let index = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let i = index;
            cells[index++] = {
                value: boardCells[y][x],
                hasMine = boardCells[y][x] < 0,
                nearby = boardCells[y][x] >= 0 ? boardCells[y][x] : 0,
                x: x,
                y: y,
                index: i,
                hidden: true,
                flag: false,
                hadOverlay: false
            };
        }
    }

    return {cells,mineCount};
}

/*
type clearAroundArgs = {
    cells: Cell[];
    mineCount: number;
    width: number;
    height: number;
    index: number;
    hadOverlay?: boolean;
    wasClicked?: boolean;
    onLose?: Function;
    onBlank?: Function;
    onNearby?: Function;
    onWin?: Function;
    onReveal?: Function;
}

*/
export function clearAround(clearAroundArgs) {
    const cell = clearAroundArgs.cells[clearAroundArgs.index];
    const minX = cell.x === 0 ? 0 : cell.x - 1;
    const maxX = cell.x === width - 1 ? cell.x : cell.x + 1;
    const minY = cell.y === 0 ? 0 : cell.y - 1;
    const maxY = cell.y === height - 1 ? cell.y : cell.y + 1;
    let revealCellArgs = {
        cells: updateCellAtIndex(clearAroundArgs.cells, clearAroundArgs.index, 'hidden', false),
        index: clearAroundArgs.index,
        hadOverlay: cell.hadOverlay,
        wasClicked: cell.wasClicked,
        onLose: clearAroundArgs.onLose,
        onBlank: clearAroundArgs.onBlank,
        onNearby: clearAroundArgs.onNearby,
        onWin: clearAroundArgs.onWin,
        onReveal: clearAroundArgs.onReveal
    };
    for (let x = minX; x < maxX; x++) {
        for (let y = minY; y < maxY; y++) {
            let nextCell = clearAroundArgs.cells.find(c => c.x === x && c.y === y);
            if (nextCell && nextCell.index !== index && nextCell.hidden) {
                revealCellArgs = revealCell(revealCellArgs);
            }
        }
    }

    return revealCellArgs;
}

function updateCellAtIndex(cells, index, propertyName, propertyValue) {
    if (index === 0) {
        return [
            {
                ...cells[0],
                [propertyName]: propertyValue
            },
            ...cells.slice(1)
        ];
    } else if (index === cells.length - 1) {
        return [
            ...cells.slice(0, -1),
            {
                ...cells[index],
                [propertyName]: propertyValue
            }
        ];
    }

    return [
        ...cells.slice(0, index - 1),
        {
            ...cells[index],
            [propertyName]: propertyValue
        },
        ...cells.slice(index + 1)
    ];
}



/*
type revealCellArgs = {
    cells: Cell[];
    mineCount: number;
    index: number;
    hadOverlay: boolean;
    wasClicked: boolean;
    onLose?: Function;
    onBlank?: Function;
    onNearby?: Function;
    onWin?: Function;
    onReveal?: Function;
}

*/
export function revealCell(revealCellArgs) {
    if (revealCellArgs.onReveal) revealCellArgs = revealCellArgs.onReveal(revealCellArgs);
    revealCellArgs = {
        ...revealCellArgs,
        cells: updateCellAtIndex(revealCellArgs.cells, revealCellArgs.index, 'hadOverlay', revealCellArgs.hadOverlay)
    };
    return showCell(revealCellArgs);
}

/*
type showCellArgs = {
    cells: Cell[];
    mineCount: number;
    index: number;
    wasClicked: boolean;
    onLose: Function;
    onBlank: Function;
    onNearby: Function;
    onWin: Function;
    onReveal?: Function;
}
*/
export function showCell(showCellArgs) {
    const cell = showCellArgs.cells[showCellArgs.index];
    showCellArgs = {
        ...showCellArgs,
        cells: updateCellAtIndex(showCellArgs.cells, showCellArgs.index, 'hidden', false)
    }
    if (cell.hasMine && showCellArgs.onLose) {
        showCellArgs = showCellArgs.onLose(showCellArgs);
    } else if (cell.nearby === 0 && showCellArgs.onBlank) {
        showCellArgs = showCellArgs.onBlank(showCellArgs);
    } else if (showCellArgs.mineCount === 0 && showCellArgs.onWin) {
        showCellArgs = showCellArgs.onWin(showCellArgs);
    } else if (showCellArgs.onNearby) {
        showCellArgs = showCellArgs.onNearby(showCellArgs);
    }

    return showCellArgs;
}

/*
type flagCellArgs = {
    cells: Cell[];
    mineCount: number;
    index: number;
    hadOverlay: boolean;
    wasClicked: boolean;
    onLose?: Function;
    onBlank?: Function;
    onNearby?: Function;
    onWin?: Function;
    onReveal?: Function;
}
*/
export function flagCell(flagCellArgs) {
    const cell = flagCellArgs.cells[flagCellArgs.index];
    if (cell.flag) {
        return {
            ...flagCellArgs,
            cells: updateCellAtIndex(flagCellArgs.cells, flagCellArgs.index, 'flag', false),
            mineCount: flagCellArgs.mineCount + 1
        };
    }
    return {
        ...flagCellArgs,
        cells: updateCellAtIndex(flagCellArgs.cells, flagCellArgs.index, 'flag', true),
        mineCount: flagCellArgs.mineCount - 1
    };
}


export function showAllCells(cells) {
    return [
        ...cells.filter(c => !c.hidden),
        ...cells.filter(c => c.hidden).map(c => ({
            ...c,
            hidden: false
        }))
    ].sort((a,b) => a.index - b.index);
}