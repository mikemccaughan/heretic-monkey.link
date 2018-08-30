import React, { Component } from 'react';

class Scoreboard extends Component {
    render() {
        return (
            <div className="scoreboard">
                <span className="scoreboard-unit">
                    <span
                        className="icon clock"
                        role="img"
                        aria-label="clock representing the time elapsed">⏱</span>
                    <span className="timer">{this.props.clockValue}</span>
                </span>
                <span className="scoreboard-unit">
                    <span
                        className="icon mine"
                        role="img"
                        aria-label="mine representing the number of mines left">💣</span>
                    <span className="count">{this.props.minesRemaining}</span>
                </span>
            </div>
        );
    }
}

export default Scoreboard;