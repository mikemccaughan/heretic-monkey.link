export interface Cell {
    value: number;
    hasMine: boolean;
    nearby: number;
    x: number;
    y: number;
    index: number;
    hidden: boolean;
    flag: boolean;
    hadOverlay: boolean;
    wasClicked?: boolean;
};

function getRandom(maxValue: number) {
    let max = Number.MAX_SAFE_INTEGER;
    let randomValue = window.crypto.getRandomValues(new Uint32Array(1))[0] / max;
    return Math.floor(randomValue * maxValue);
}

export function generateBoard(width: number, height: number, density: number): { cells: Cell[], mineCount: number } {
    width = width ?? 9;
    height = height ?? 9;
    density = density ?? (1 / 6);
    if (width < 2) throw new Error(`width must be >= 1, got ${width}`);
    if (height < 2) throw new Error(`height must be >= 1, got ${height}`);
    if (density <= 0 || density >= 1) throw new Error(`density must be > 0 and < 1, got ${density}`);
    let cells = new Array(width * height);
    let mineCount = Math.floor(width * height * density);
    const isBetween = (value: number, min: number, max: number): boolean => value >= min && value <= max;
    let boardCells = new Array(height).fill(new Array(width).fill(0));
    let value = -(mineCount * 2);
    let randomValues = new Int32Array(cells.length);
    window.crypto.getRandomValues(randomValues);
    for (let i = 0; i < mineCount; i++) {
        let x, y;
        while (true) {
            x = getRandom(width); // Math.floor(Math.random() * width);
            y = getRandom(height); // Math.floor(Math.random() * height);
            if (0 <= boardCells[y][x]) {
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
                hasMine: boardCells[y][x] < 0,
                nearby: boardCells[y][x] >= 0 ? boardCells[y][x] : 0,
                x: x,
                y: y,
                index: i,
                hidden: true,
                flag: false,
                hadOverlay: false
            };
        }
    }

    return { cells, mineCount };
}

export interface fnArgs {
    cells: Cell[];
    mineCount: number;
    index: number;
    hadOverlay?: boolean;
    wasClicked?: boolean;
    onLose?: Function;
    onBlank?: Function;
    onNearby?: Function;
    onWin?: Function;
    onReveal?: Function;
}

export interface clearAroundArgs extends fnArgs {
    width: number;
    height: number;
}

export function clearAround(args: clearAroundArgs): fnArgs {
    const cell = args.cells[args.index];
    const minX = cell.x === 0 ? 0 : cell.x - 1;
    const maxX = cell.x === args.width - 1 ? cell.x : cell.x + 1;
    const minY = cell.y === 0 ? 0 : cell.y - 1;
    const maxY = cell.y === args.height - 1 ? cell.y : cell.y + 1;
    let revealCellArgs: fnArgs = {
        cells: updateCellAtIndex(args.cells, args.index, 'hidden', false),
        mineCount: args.mineCount,
        index: args.index,
        hadOverlay: cell.hadOverlay,
        wasClicked: cell.wasClicked,
        onLose: args.onLose,
        onBlank: args.onBlank,
        onNearby: args.onNearby,
        onWin: args.onWin,
        onReveal: args.onReveal
    };
    for (let x = minX; x < maxX; x++) {
        for (let y = minY; y < maxY; y++) {
            let nextCell = args.cells.find(c => c.x === x && c.y === y);
            if (nextCell && nextCell.index !== args.index && nextCell.hidden) {
                revealCellArgs = revealCell(revealCellArgs as revealCellArgs);
            }
        }
    }

    return revealCellArgs;
}

function updateCellAtIndex(cells: Cell[], index: number, propertyName: string, propertyValue: number | boolean) {
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

export interface revealCellArgs extends fnArgs {
    hadOverlay: boolean;
}

export function revealCell(args: revealCellArgs): fnArgs {
    if (args.onReveal) args = args.onReveal(args);
    args = {
        ...args,
        cells: updateCellAtIndex(args.cells, args.index, 'hadOverlay', args.hadOverlay)
    };
    return showCell(args as showCellArgs);
}

export interface showCellArgs extends fnArgs {
}

export function showCell(args: showCellArgs): fnArgs {
    const cell = args.cells[args.index];
    args = {
        ...args,
        cells: updateCellAtIndex(args.cells, args.index, 'hidden', false)
    }
    if (cell.hasMine && args.onLose) {
        args = args.onLose(args);
    } else if (cell.nearby === 0 && args.onBlank) {
        args = args.onBlank(args);
    } else if (args.mineCount === 0 && args.onWin) {
        args = args.onWin(args);
    } else if (args.onNearby) {
        args = args.onNearby(args);
    }

    return args;
}

export interface flagCellArgs extends fnArgs {
}

export function flagCell(args: flagCellArgs): fnArgs {
    const cell = args.cells[args.index];
    if (cell.flag) {
        return {
            ...args,
            cells: updateCellAtIndex(args.cells, args.index, 'flag', false),
            mineCount: args.mineCount + 1
        };
    }
    return {
        ...args,
        cells: updateCellAtIndex(args.cells, args.index, 'flag', true),
        mineCount: args.mineCount - 1
    };
}

export function showAllCells(cells: Cell[]) {
    return [
        ...cells.filter(c => !c.hidden),
        ...cells.filter(c => c.hidden).map(c => ({
            ...c,
            hidden: false
        }))
    ].sort((a, b) => a.index - b.index);
}