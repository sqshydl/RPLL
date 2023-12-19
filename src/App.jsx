import React, { useState, useEffect } from 'react';
import TimerBox from './TimerBox'; // Import TimerBox from the new file
import Clock from './clock'; // Import the Clock component
import './App.css';


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
      <Clock /> {/* Add the Clock component */}
    </div>
  );
}

// Ekspor komponen App sebagai default
export default App;
