import React, { Component } from 'react';

export default class Scoreboard extends Component {
    constructor(props) {
        super(props);

        this.defaultClock = {
            date: new Date(),
            value: '00:00',
            isRunning: false,
            intervalId: null
        };

        this.state = {
            clock: Object.assign({}, this.defaultClock)
        };

        this.handleStartClock = this.startClock.bind(this);
        this.handleStopClock = this.stopClock.bind(this);
        this.handleUpdateClock = this.updateClockValue.bind(this);
    }
    updateClockValue() {
        let elapsedMs = new Date().valueOf() - this.state.clock.date.valueOf();
        let elapsed = new Date(elapsedMs).toISOString();
        this.setState({ 
            clock: {
                ...this.state.clock,
                value: elapsed.substring(elapsed.indexOf(':') + 1, elapsed.indexOf('.')),
                isRunning: true
            }
        });
    }
    stopClock() {
        if (this.state.clock.isRunning) {
            clearInterval(this.state.clock.intervalId);
            this.setState({ 
                clock: {
                    ...this.defaultClock
                }
            });
        }
    }
    startClock() {
        if (!this.state.clockIsRunning) {
            this.setState({ 
                clock: {
                    ...this.defaultClock,
                    date: new Date(),
                    isRunning: true,
                    intervalId: setInterval(this.handleUpdateClock, 1000)
                }
            });
        }
    }
    render() {
        return (
            <div className="scoreboard">
                <span className="scoreboard-unit">
                    <span
                        className="icon clock"
                        role="img"
                        aria-label="clock representing the time elapsed">⏱</span>
                    <span className="timer">{this.state.clock.value}</span>
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