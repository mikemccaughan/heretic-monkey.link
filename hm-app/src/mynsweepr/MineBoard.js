import React, { Component } from 'react';
import MineCell from './MineCell';

export default class MineBoard extends Component {
    render() {
        const cells = this.props.cells;
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
                    cell={cell}
                    revealCell={this.props.revealCell}
                    flagCell={this.props.flagCell}
                    revealNearby={this.props.revealNearby} />)}
            </div>
        );
    }
}