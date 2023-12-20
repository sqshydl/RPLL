import React, { useState, useEffect } from "react";
import TimerBox from "./TimerBox";
import Clock from "./clock";
import TablePage from "./TablePage";
import "./App.css";

function App() {
  const pcNames = [
    "PS 1",
    "PS 2",
    "PS 3",
    "PS 4",
    "PS 5",
    "PS 6",
    "PS 7",
    "PS 8",
  ];

  // Render App dengan TimerBox untuk setiap PC
  return (
    <div className="grid-container">
      {pcNames.map((pcName) => (
        <TimerBox key={pcName} pcName={pcName} />
      ))}
      <Clock />
      <TablePage />
    </div>
  );
}

export default App;
