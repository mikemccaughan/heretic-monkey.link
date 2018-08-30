import React, { Component } from 'react';
import MineCell from './MineCell';
// import Utility from '../utility';

class MineBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revealingMany: false,
            totalClickCount: 0
        };
    }
    updateCells(cells) { 
        this.setState({cells: [...cells]});
        this.props.minesRemainingChanged();
    }
    maybeStartClock() {
        if (this.state.totalClickCount === 0) {
            this.setState({ totalClickCount: this.state.totalClickCount + 1 });
            this.props.startClock();
        }
    }
    cellRightClick(event, cell) {
        event.preventDefault();
        if (cell.hidden) {
            this.maybeStartClock();
            this.updateCells(this.props.field.flagCellInCells(cell));
        }
    }
    cellClick(event, cell) {
        event.persist();
        if (cell.clickCount === 2) {
            this.cellDoubleClick(event, cell);
        } else {
            this.clickTimeout = setTimeout(() => {
                this.updateCells(this.props.field.takeActionOnCell(cell, (cel) => Object.assign({}, cel, {clickCount: 0})));
                if (cell.hidden) {
                    this.maybeStartClock();
                    this.props.field.revealCell(cell);
                    this.updateCells(this.props.field.cells);
                }
            }, 500);
        }

        this.updateCells(this.props.field.takeActionOnCell(cell, (cel) => Object.assign({}, cel, {clickCount: cel.clickCount + 1})));
    }
    cellDoubleClick(event, cell) {
        if (cell.hidden || cell.value <= 0) {
            return;
        }

        this.maybeStartClock();

        let count = 0;
        this.props.field.takeActionOnSurroundingCells(cell, (cel) => cel.flag ? count++ : () => {});
        if (count === cell.value) {
            this.props.field.revealAround(cell);
        } else {
            console.log(`${count} !== ${cell.value}`);
        }

        this.updateCells(this.props.field.cells);
    }
    render() {
        const cells = this.props.field.cells;
        return (
            <div className={`board ${this.props.won ? "won" : ""} ${this.props.lost ? "lost" : ""}`} style={{width:(this.props.width * 42)+'px'}}>
                <div className="dialog won">
                    <div className="dialog-content">
                        You win! <span role="img" aria-label="party time">🎉</span>
                    </div>
                    <div className="dialog-buttons">
                        <button type="button" onClick={this.props.confirm}>Super!</button>
                    </div>
                </div>
                <div className="dialog lost">
                    <div className="dialog-content">
                        You lose! <span role="img" aria-label="sad">😞</span>
                    </div>
                    <div className="dialog-buttons">
                        <button type="button" onClick={this.props.confirm}>Fake news!</button>
                    </div>
                </div>
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