import React, { useState, useEffect } from 'react';

function Clock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString();

  return (
    <div className="fixed top-0 right-0 m-9 font-mono">
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
}

export default Clock;
