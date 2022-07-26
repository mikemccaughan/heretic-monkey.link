import React, { useState, useEffect } from 'react';

export interface ScoreboardProps {
    isActive: boolean;
    remaining: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive/*, setIsActive*/] = useState(props.isActive);
    const [remaining/*, setRemaining*/] = useState(props.remaining);

/*
    function stop() {
        setIsActive(false);
    }

    function reset() {
        setSeconds(0);
        stop();
    }

    function setMineCount(mineCount: number) {
        setRemaining(mineCount);
    }

    function endGame(difficulty: { width: number, height: number, density: number }, isWin: boolean) {
        if (isWin) {
            const highScores = JSON.parse(localStorage.get('highScores')) ?? {};
            highScores[JSON.stringify(difficulty)] = seconds;
            localStorage.setItem('highScores', JSON.stringify(highScores));
        }
        reset();
    }
*/
    useEffect(() => {
        let interval: number = -1;
        if (isActive) {
            interval = window.setInterval(() => {
                setSeconds((seconds: number) => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            window.clearInterval(interval);
        }
        return () => window.clearInterval(interval);
    }, [isActive, seconds]);

    const formatter = new Intl.DateTimeFormat('en-US', {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    function formatSeconds(s: number) {
        const sDate = new Date(s * 1000);
        return formatter.format(sDate);
    }

    return (
        <aside>
            <span className="high-score"><span role="img" aria-label="high-score award">🥇</span>&nbsp;--:--:--</span>
            <span className="elapsed"><span role="img" aria-label="stopwatch timer">⏱</span>&nbsp;{formatSeconds(seconds)}</span>
            <span className="remaining"><span role="img" aria-label="mine bomb">💣</span>&nbsp;{remaining}</span>
        </aside>
    );
};