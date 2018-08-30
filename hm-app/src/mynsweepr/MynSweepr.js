import React, { Component } from 'react';
import DifficultySelector from './DifficultySelector';
import MineBoard from './MineBoard';
import MineField from './MineField';
import './MynSweepr.css';
import Scoreboard from './Scoreboard';

class MynSweepr extends Component {
    constructor(props) {
        super(props);
        this.handleDifficultyChanged = this.difficultyChanged.bind(this);
        this.handleWidthChanged = this.widthChanged.bind(this);
        this.handleHeightChanged = this.heightChanged.bind(this);
        this.handleBack = this.back.bind(this);
        this.handleMinesRemainingChanged = this.minesRemainingChanged.bind(this);
        this.handleStartClock = this.startClock.bind(this);
        this.handleStopClock = this.stopClock.bind(this);
        this.handleLoss = this.lost.bind(this);
        this.handleUpdateClock = this.updateClockValue.bind(this);
        this.state = {
            difficulty: '9',
            size: {
                width: 9,
                height: 9
            },
            clock: {
                date: new Date(),
                value: '00:00',
                isRunning: false,
                intervalId: null
            },
            minesRemaining: 0,
            won: false,
            lost: false,
            field: new MineField(9, 9, this.handleLoss)
        };
    }
    difficultyChanged(changeEvent) {
        let difficult = parseInt(changeEvent.target.value, 10);
        let width = isNaN(difficult) ? 30 : difficult;
        let height = isNaN(difficult) ? 16 : difficult === 30 ? 16 : difficult;
        this.setState({
            difficulty: changeEvent.target.value,
            size: {
                width: width,
                height: height
            },
            field: new MineField(width, height, this.handleLoss)
        });
    }
    widthChanged(changeEvent) {
        let width = parseInt(changeEvent.target.value, 10);
        width = isNaN(width) ? 0 : width;
        this.setState(prevState => {
            let height = prevState.size.height;
            return {
                size: {
                    width: width,
                    height: height
                },
                field: new MineField(width, height, this.handleLoss)
            };
        });
    }
    heightChanged(changeEvent) {
        let height = parseInt(changeEvent.target.value, 10);
        height = isNaN(height) ? 0 : height;
        this.setState(prevState => {
            let width = prevState.size.width;
            return {
                size: {
                    width: width,
                    height: height
                },
                field: new MineField(width, height, this.handleLoss)
            };
        });
    }
    minesRemainingChanged() {
        const remainingMines = this.state.field.getMinesRemaining();
        this.setState({ minesRemaining: remainingMines });
        if (remainingMines === 0) {
            this.setState({ won: true });
            this.stopClock();
        }
    }
    back() {
        this.props.parent.setState({ which: 0 });
    }
    lost() {
        this.setState({ lost: true });
        this.stopClock();
    }
    updateClockValue() {
        console.log(this.state);
        console.log(this.state.clock);
        console.log(this.state.clock.date);
        let elapsedMs = new Date().valueOf() - this.state.clock.date.valueOf();
        let elapsed = new Date(elapsedMs).toISOString();
        this.setState({ 
            clock: {
                date: this.state.clock.date,
                value: elapsed.substring(elapsed.indexOf(':') + 1, elapsed.indexOf('.')),
                isRunning: true,
                intervalId: this.state.clock.intervalId
            }
        });
    }
    stopClock() {
        if (this.state.clock.isRunning) {
            clearInterval(this.state.clock.intervalId);
            this.setState({ 
                clock: {
                    date: new Date(), 
                    value: '00:00',
                    isRunning: false,
                    intervalId: null
                }
            });
        }
    }
    startClock() {
        if (!this.state.clock.isRunning) {
            this.setState({ 
                clock: {
                    date: new Date(), 
                    value: '00:00',
                    isRunning: true,
                    intervalId: setInterval(this.handleUpdateClock, 1000)
                }
            });
        }
    }
    render() {
        return (
            <div className="minesweeper">
                <button onClick={this.handleBack}>Back</button>
                <DifficultySelector
                    difficulty={this.state.difficulty}
                    width={this.state.size.width}
                    height={this.state.size.height}
                    difficultyChanged={this.handleDifficultyChanged}
                    widthChanged={this.handleWidthChanged}
                    heightChanged={this.handleHeightChanged} />
                <Scoreboard
                    minesRemaining={this.state.minesRemaining}
                    clockValue={this.state.clock.value} />
                <MineBoard
                    won={this.state.won}
                    lost={this.state.lost}
                    field={this.state.field}
                    width={this.state.size.width}
                    height={this.state.size.height}
                    minesRemainingChanged={this.handleMinesRemainingChanged}
                    startClock={this.handleStartClock}>
                </MineBoard>
            </div>
        );
    }
}

export default MynSweepr;