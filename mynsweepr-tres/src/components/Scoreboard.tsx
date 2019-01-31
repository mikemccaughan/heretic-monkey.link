import React from 'react';

export interface ScoreboardProps {
    time?: string;
    remaining?: number;
}

const Scoreboard: React.FunctionComponent<ScoreboardProps> = ({ time, remaining }) => (
    <div className="scoreboard">
        <span className="scoreboard-unit">
            <span
                className="icon clock"
                role="img"
                aria-label="clock representing the time elapsed">⏱</span>
            <span className="timer">{time}</span>
        </span>
        <span className="scoreboard-unit">
            <span
                className="icon mine"
                role="img"
                aria-label="mine representing the number of mines left">💣</span>
            <span className="count">{remaining}</span>
        </span>
    </div>
);
Scoreboard.displayName = 'Scoreboard';
Scoreboard.defaultProps = {
  time: '00:00:00',
  remaining: 0
};

export default Scoreboard;