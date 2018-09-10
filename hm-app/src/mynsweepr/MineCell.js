import React, { Component } from 'react';

export default class MineCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCount: 0
        };
        this.handleLeftClick = this.leftClicked.bind(this);
        this.handleRightClick = this.rightClicked.bind(this);
        this.handleDoubleClick = this.doubleClicked.bind(this);
    }
    leftClicked(e) {
        e.persist();
        if (this.state.clickCount === 2) {
            this.doubleClicked(e);
        } else {
            this.clickTimeout = setTimeout(() => {
                this.setState({clickCount: 0});
                if (this.props.cell.hidden) {
                    this.props.revealCell(this.props.cell);
                }
            }, 500);
        }

        this.setState({clickCount: this.state.clickCount + 1});
    }
    rightClicked(e) {
        e.preventDefault();
        if (this.props.cell.hidden) {
            this.props.flagCell(this.props.cell);
        }
    }
    doubleClicked(e) {
        if (!this.props.cell.hidden && this.props.cell.value > 0) {
            this.props.revealNearby(this.props.cell);
        }
    }
    render() {
        let nearby = this.props.cell.value >= 0 ? this.props.cell.value : 0;
        let nearbyClassName = `nearby-${nearby}`;
        let isHidden = this.props.cell.hidden;
        let hasFlag = this.props.cell.flag;
        let hasMine = !isHidden && !hasFlag && this.props.cell.value < 0;
        let hasNearby = !isHidden && !hasFlag && !hasMine && nearby !== 0;

        return (
            <button 
                className={"cell" + (isHidden ? " hidden" : "") + (hasFlag ? " flag" : "") + (hasMine ? " mine":"") + (hasNearby ? " nearby " + nearbyClassName : "")} 
                onClick={this.handleLeftClick}
                onContextMenu={this.handleRightClick}
                onDoubleClick={this.handleDoubleClick}>
                <span className="overlay">
                    <span className="flag" role="img" aria-label="flag">🚩</span>
                    <span className="mine" role="img" aria-label="boom!">💣</span>
                    <span className="nearby" role="img" aria-label="number of nearby cells that have a mine">{nearby}</span>
                </span>
            </button>
        );
    }
}
