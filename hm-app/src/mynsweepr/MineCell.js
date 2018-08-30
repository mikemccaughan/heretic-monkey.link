import React, { Component } from 'react';

class MineCell extends Component {
    render() {
        let nearby = this.props.value >= 0 ? this.props.value : 0;
        let nearbyClassName = `nearby-${nearby}`;
        let isHidden = this.props.hidden;
        let hasFlag = this.props.flag;
        let hasMine = !isHidden && !hasFlag && this.props.value < 0;
        let hasNearby = !isHidden && !hasFlag && !hasMine && nearby !== 0;

        return (
            <button 
                className={"cell" + (isHidden ? " hidden" : "") + (hasFlag ? " flag" : "") + (hasMine ? " mine":"") + (hasNearby ? " nearby " + nearbyClassName : "")} 
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