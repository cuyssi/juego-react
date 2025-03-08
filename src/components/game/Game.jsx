import React from 'react';
import { useState, useEffect } from 'react';
import Btn from '../btn/Btn';
import './Game.css';

const Game = () => {
    const [color, setColor] = useState("red");
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [ranking, setRanking] = useState(0);
    const [mode, setMode] = useState(false)

    useEffect(() => {
        const timeRandom = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
        let timeOutColor;
        if (color === "red") {
            timeOutColor = setTimeout(() => {
                setColor("yellow")
                setIsRunning(true)
            }, timeRandom * 1000);
        }
        return () => clearTimeout(timeOutColor);
    }, [color])

    const handleOn = () => {
        if (!mode) setMode(true);
        else setMode(false);
    }

    useEffect(() => {
        let yellowTimeout;
        if (color === "yellow" && mode === true && isRunning) {
            yellowTimeout = setTimeout(() => {
                setColor("red")
                setIsRunning(false)
            }, 1000);
        }
        return () => clearTimeout(yellowTimeout);
    }, [color, mode, isRunning]);

    useEffect(() => {
        let timeout;
        if (isRunning) timeout = setTimeout(() => setCount(prev => prev + 1), 100);
        return () => clearTimeout(timeout);
    }, [isRunning, count]);

    const Pause = () => {
        if (isRunning) {
            setIsRunning(false)
            if (count < ranking || ranking === 0) setRanking(count);
        } else {
            setCount(0)
            setColor("red");
        }
    }

    const pauseText = color === "red" || isRunning ? "Parar" : "Volver a Intentar";
    const modeText = mode ? "Modo Difícil: ON" : "Modo Difícil: OFF";
    const classNameBtnMode = mode ? "mode-button active" : "mode-button";    
    const classNameBtnPause = (color === "red" || isRunning) ? "mode-button active" : "mode-button";


    return (
        <div>
            <Btn onClick={handleOn} text={modeText} className={classNameBtnMode} />
            <section id="square" style={{ backgroundColor: color }}></section>
            <Btn onClick={Pause} text={pauseText}  className={classNameBtnPause}/>
            <p>Tu tiempo de reacción: {count}</p>
            <p>Mejor tiempo: {ranking}</p>
        </div>
    )
}

export default Game;