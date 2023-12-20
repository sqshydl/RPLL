import React, { useState, useEffect } from "react";

function Clock() {
  // Membuat state untuk menyimpan tanggal dan waktu saat ini
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Membuat interval yang akan memperbarui tanggal dan waktu setiap detik
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Menghapus interval saat komponen dilepas
    return () => clearInterval(interval);
  }, []);

  // Memformat tanggal dan waktu untuk ditampilkan
  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString();

  return (
    // Menampilkan tanggal dan waktu yang telah diformat
    <div className="fixed top-0 right-0 m-9 font-mono">
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
}

export default Clock;
