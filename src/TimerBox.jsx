import React, { useState, useEffect } from "react";

function TimerBox({ pcName }) {
  // State untuk menyimpan ID interval timer, total detik, dan biaya
  const [timer, setTimer] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [cost, setCost] = useState(0);
  const [shouldUpload, setShouldUpload] = useState(true);

  // Menghentikan interval timer saat komponen dibongkar
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  // Fungsi untuk memasukkan data ke database
  async function insertData(pcName, totalProfit, date, time) {
    try {
      const response = await fetch("/api/add-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pcName, totalProfit, date, time }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  }

  // Fungsi untuk mengupdate timer setiap detik
  function updateTimer() {
    if (totalSeconds > 0) {
      setTotalSeconds((prevSeconds) => prevSeconds - 1);
      console.log(
        `Remaining Time (${pcName}): ${formatTime(totalSeconds - 1)}`
      );
    } else {
      clearInterval(timer);
      setTimer(null);
      setTotalSeconds(0);
      console.log(`Timer reached 0 for ${pcName}`);
    }
  }

  // Fungsi untuk memformat waktu dalam format menit:detik
  function formatTime(remainingSeconds) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Fungsi untuk memulai atau menghentikan timer
  async function startTimer() {
    // Jika timer sedang berjalan, hentikan timer
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    } else if (totalSeconds > 0) {
      // Jika masih ada sisa waktu, mulai timer
      const initialCost = calculateCost(totalSeconds);
      setCost(initialCost);

      // Upload data awal jika timer tidak dijeda
      if (shouldUpload) {
        const currentDate = new Date().toISOString().split("T")[0];
        const currentTime = new Date().toLocaleTimeString();
        await insertData(pcName, initialCost, currentDate, currentTime);
        setShouldUpload(false); // Prevent uploading during ongoing timer
      }

      // Atur interval untuk mengupdate timer dan menghitung biaya
      setTimer(
        setInterval(() => {
          updateTimer();
          const currentCost = calculateCost(totalSeconds);

          // Cek apakah timer telah mencapai 0
          if (timer && shouldUpload) {
            const currentDate = new Date().toISOString().split("T")[0];
            const currentTime = new Date().toLocaleTimeString();
            insertData(pcName, currentCost, currentDate, currentTime);
            setShouldUpload(false); // Prevent uploading during ongoing timer
          }

          // Cek apakah timer telah mencapai 0
          if (totalSeconds === 0) {
            clearInterval(timer);
            setTimer(null);
          }
        }, 1000)
      );
    }
  }

  // Fungsi untuk menambah waktu 30 menit
  function add30Minutes() {
    setTotalSeconds((prevSeconds) => prevSeconds + 30 * 60);
    setShouldUpload(true); // Allow uploading after adding time
  }

  // Fungsi untuk mengurangi waktu 30 menit (minimum 0)
  function subtract30Minutes() {
    setTotalSeconds((prevSeconds) => Math.max(0, prevSeconds - 30 * 60));
    setShouldUpload(true); // Allow uploading after subtracting time
  }

  // Fungsi untuk menghitung biaya berdasarkan total detik
  function calculateCost(seconds) {
    const halfHourBlocks = seconds / (30 * 60);
    const costPerHalfHour = 2500;
    return Math.ceil(halfHourBlocks) * costPerHalfHour;
  }

  // Render TimerBox dengan kontrol timer dan tampilan sisa waktu dan biaya
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-nishiki-1 text-nishiki-5">
      <div className="timer-box bg-nishiki-3 shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-nishiki-2">{pcName}</h2>
        <div className="timer-controls flex justify-between mb-4">
          <button
            className="bg-nishiki-4 text-nishiki-5 rounded px-4 py-2"
            onClick={startTimer}
          >
            {timer ? "Pause Timer" : "Start Timer"}
          </button>
          <button
            className="bg-nishiki-4 text-nishiki-5 rounded px-4 py-2"
            onClick={add30Minutes}
          >
            +30
          </button>
          <button
            className="bg-nishiki-4 text-nishiki-5 rounded px-4 py-2"
            onClick={subtract30Minutes}
          >
            -30
          </button>
        </div>
        <div className="timer-display">
          <p className="mb-2 text-nishiki-2">
            Remaining Time: {formatTime(totalSeconds)}
          </p>
          <p className="text-nishiki-2">Cost: Rp. {cost.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default TimerBox;
