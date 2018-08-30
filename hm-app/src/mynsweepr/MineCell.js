import React, { Component } from 'react';

class MineCell extends Component {
    render() {
        let hasMine = this.props.value < 0;
        let nearby = this.props.value >= 0 ? this.props.value : 0;
        let nearbyClassName = `nearby-${nearby}`;

        return (
            <button 
                className={"cell" + (this.props.hidden ? " hidden" : "") + (this.props.flag ? " flag" : "") + (!this.props.hidden && !this.props.flag && hasMine ? " mine":"") + (!this.props.hidden && !this.props.flag && !hasMine && nearby !== 0 ? " nearby" : "") + (!this.props.hidden && !this.props.flag && !hasMine && nearby !== 0 ? " " + nearbyClassName : "")} 
                data-cell={JSON.stringify(this.props)}
                onClick={this.props.click}
                onContextMenu={this.props.rightClick}
                onDoubleClick={this.props.doubleClick}>
                <span className="overlay">
                    <span className="flag" role="img" aria-label="flag">🚩</span>
                    <span className="mine" role="img" aria-label="boom!">💣</span>
                    <span className="nearby" role="img" aria-label="number of nearby cells that have a mine">{nearby}</span>
                </span>
            </button>
        );
    }
}

export default MineCell;