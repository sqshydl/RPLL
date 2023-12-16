import React, { useState, useEffect } from 'react';
import './App.css';

function TimerBox({ pcName }) {
  const [timer, setTimer] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  function updateTimer() {
    if (totalSeconds > 0) {
      setTotalSeconds((prevSeconds) => prevSeconds - 1);
      console.log(`Remaining Time (${pcName}): ${formatTime(totalSeconds - 1)}`);
    } else {
      clearInterval(timer);
      setTimer(null);
      console.log(`Timer reached 0 for ${pcName}`);
    }
  }

  function formatTime(remainingSeconds) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function startTimer() {
    if (!timer && totalSeconds > 0) {
      setTimer(setInterval(updateTimer, 1000));
      // Calculate cost at the start of the timer
      const initialCost = calculateCost(totalSeconds);
      setCost(initialCost);
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }

  function add30Minutes() {
    setTotalSeconds((prevSeconds) => prevSeconds + 30 * 60);
  }

  function subtract30Minutes() {
    setTotalSeconds((prevSeconds) => Math.max(0, prevSeconds - 30 * 60));
  }

  function calculateCost(seconds) {
    const halfHourBlocks = seconds / (30 * 60);
    const costPerHalfHour = 2500;
    return Math.ceil(halfHourBlocks) * costPerHalfHour;
  }  

  return (
    <div className="timer-box">
      <h2>{pcName}</h2>
      <div className="timer-controls">
        <button onClick={startTimer}>{timer ? 'Pause Timer' : 'Start Timer'}</button>
        <button onClick={add30Minutes}>+30</button>
        <button onClick={subtract30Minutes}>-30</button>
      </div>
      <div className="timer-display">
        <p>Remaining Time: {formatTime(totalSeconds)}</p>
        <p>Cost: Rp. {cost.toLocaleString()}</p>
      </div>
    </div>
  );
}

function App() {
  const pcNames = ['PS 1', 'PS 2', 'PS 3', 'PS 4', 'PS 5', 'PS 6', 'PS 7', 'PS 8'];

  return (
    <div className="grid-container">
      {pcNames.map((pcName) => (
        <TimerBox key={pcName} pcName={pcName} />
      ))}
    </div>
  );
}

export default App;
