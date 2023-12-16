import React, { useState, useEffect } from 'react';
import './App.css';

// Komponen TimerBox untuk menampilkan dan mengelola timer
function TimerBox({ pcName }) {
  // State untuk menyimpan ID interval timer, total detik, dan biaya
  const [timer, setTimer] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [cost, setCost] = useState(0);

  // Menghentikan interval timer saat komponen dibongkar
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  // Fungsi untuk mengupdate timer setiap detik
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

  // Fungsi untuk memformat waktu dalam format menit:detik
  function formatTime(remainingSeconds) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Fungsi untuk memulai atau menghentikan timer
  function startTimer() {
    if (!timer && totalSeconds > 0) {
      setTimer(setInterval(updateTimer, 1000));
      // Menghitung biaya saat memulai timer
      const initialCost = calculateCost(totalSeconds);
      setCost(initialCost);
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }

  // Fungsi untuk menambah waktu 30 menit
  function add30Minutes() {
    setTotalSeconds((prevSeconds) => prevSeconds + 30 * 60);
  }

  // Fungsi untuk mengurangi waktu 30 menit (minimum 0)
  function subtract30Minutes() {
    setTotalSeconds((prevSeconds) => Math.max(0, prevSeconds - 30 * 60));
  }

  // Fungsi untuk menghitung biaya berdasarkan total detik
  function calculateCost(seconds) {
    const halfHourBlocks = seconds / (30 * 60);
    const costPerHalfHour = 2500;
    return Math.ceil(halfHourBlocks) * costPerHalfHour;
  }  

  // Render TimerBox dengan kontrol timer dan tampilan sisa waktu dan biaya
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

// Komponen App untuk menampilkan beberapa TimerBox
function App() {
  // Daftar nama PC
  const pcNames = ['PS 1', 'PS 2', 'PS 3', 'PS 4', 'PS 5', 'PS 6', 'PS 7', 'PS 8'];

  // Render App dengan TimerBox untuk setiap PC
  return (
    <div className="grid-container">
      {pcNames.map((pcName) => (
        <TimerBox key={pcName} pcName={pcName} />
      ))}
    </div>
  );
}

// Ekspor komponen App sebagai default
export default App;
