import React, { Component } from 'react';
import MineCell from './MineCell';
// import Utility from '../utility';

class MineBoard extends Component {
    constructor(props) {
        super(props);
        console.log("props", JSON.stringify(this.props))
        this.state = {
            revealingMany: false,
            totalClickCount: 0
        };
    }
    updateCells(cells) { 
        console.log("updateCells", JSON.stringify(this.state.cells), JSON.stringify(cells));
        this.setState({cells: [...cells]});
        this.props.minesRemainingChanged();
    }
    cellRightClick(event, cell) {
        console.log("cellRightClick", cell);
        event.preventDefault();
        if (this.state.totalClickCount === 0) {
            this.setState({ totalClickCount: this.state.totalClickCount + 1 });
            this.props.startClock();
        }
        this.updateCells(this.props.field.flagCellInCells(cell));
    }
    cellClick(event, cell) {
        event.persist();
        if (cell.clickCount === 2) {
            this.cellDoubleClick(event, cell);
        } else {
            this.clickTimeout = setTimeout(() => {
                this.updateCells(this.props.field.takeActionOnCell(cell, (cel) => Object.assign({}, cel, {clickCount: 0})));
                this.props.field.revealCell(cell);
                this.updateCells(this.props.field.cells);
                this.props.startClock();
            }, 500);
        }

        this.updateCells(this.props.field.takeActionOnCell(cell, (cel) => Object.assign({}, cel, {clickCount: cel.clickCount + 1})));
    }
    cellDoubleClick(event, cell) {
        console.log("double-click:", event.target);
        // TODO: reveal around if the number of nearby mines equals the number of flagged cells
        if (cell.value <= 0) {
            return;
        }

        let count = 0;
        this.props.field.takeActionOnSurroundingCells(cell, (cel) => cel.flag ? count++ : () => {});
        if (count === cell.value) {
            this.props.field.revealAround(cell);
        } else {
            console.log(`${count} !== ${cell.value}`);
        }

        this.updateCells(this.props.field.cells);
        this.props.startClock();
    }
    render() {
        const cells = this.props.field.cells;
        console.log("render", cells);
        return (
            <div className="board" style={{width:(this.props.width * 42)+'px'}}>
                {cells.map((cell) => <MineCell 
                    key={cell.key} 
                    value={cell.value} 
                    x={cell.x} 
                    y={cell.y} 
                    index={cell.index}
                    hidden={cell.hidden}
                    flag={cell.flag}
                    click={(e) => this.cellClick(e, cell)}
                    rightClick={(e) => this.cellRightClick(e, cell)}
                    doubleClick={(e) => this.cellDoubleClick(e, cell)} />)}
            </div>
        );
    }
}

export default MineBoard;