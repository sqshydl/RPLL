import React, { useEffect, useState } from "react";
import axios from "axios";

const TablePage = () => {
  // Membuat state untuk data, sortField, dan sortDirection
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(true);

  const toggleSortDirection = () => {
    setSortDirection(prevSortDirection => !prevSortDirection);
  };

  // Menggunakan useEffect untuk memanggil data saat komponen pertama kali dimuat
    const fetchData = async () => {
      // Mengambil data dari server
      const result = await axios("/api/get-data"); // Updated URL
      // Menyimpan data ke state
      setData(result.data);
    };

    // Memanggil fungsi fetchData
    useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk mengurutkan data berdasarkan field yang dipilih
  const sortData = (field) => {
  // Calculate new sort direction
  const newSortDirection = !sortDirection;

  // Set new sort direction
  setSortDirection(newSortDirection);

  // Sort data
const sortedData = [...data].sort((a, b) => {
  if (field === "time") {
    // Convert time strings to seconds
    const timeA = a[field].split(':').reduce((acc, time) => (60 * acc) + parseInt(time, 10), 0);
    const timeB = b[field].split(':').reduce((acc, time) => (60 * acc) + parseInt(time, 10), 0);
    // Compare the times in seconds
    return newSortDirection ? timeA - timeB : timeB - timeA;
  } else {
    // For other fields, we can directly compare them
    if (a[field] < b[field]) return newSortDirection ? -1 : 1;
    if (a[field] > b[field]) return newSortDirection ? 1 : -1;
    return 0;
  }
});

// Now sortedData contains the sorted array based on the specified field


setData(sortedData);
};

  // Render komponen
  return (
    <div className="w-full text-center">
      <div className="inline-block">
        {/* Tombol untuk mengurutkan data berdasarkan pc_name, total_profit, dan time */}
        <button
          className="bg-nishiki-1 text-white py-2 px-4 rounded m-2"
          onClick={() => sortData("pc_name")}
        >
          Sort by PC Name{" "}
          {sortField === "pc_name" ? (sortDirection ? "↑" : "↓") : ""}
        </button>
        <button
          className="bg-nishiki-2 text-white py-2 px-4 rounded m-2"
          onClick={() => sortData("total_profit")}
        >
          Sort by Total Profit{" "}
          {sortField === "total_profit" ? (sortDirection ? "↑" : "↓") : ""}
        </button>
        <button
          className="bg-nishiki-3 text-nishiki-4 py-2 px-4 rounded m-2"
          onClick={() => sortData("time")}
        >
          Sort by Time {sortField === "time" ? (sortDirection ? "↑" : "↓") : ""}
        </button>
        <button
          className="bg-nishiki-3 text-nishiki-4 py-2 px-4 rounded m-2"
          onClick={fetchData}
        >
          Refresh Data
        </button>
      </div>
      {/* Tabel untuk menampilkan data */}
      <table className="table-auto mx-auto mt-4 bg-nishiki-4 text-nishiki-5 w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">PS Name</th>
            <th className="px-4 py-2">Cost</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Menampilkan data di tabel */}
          {Array.isArray(data) &&
            data.map((item, index) => {
              // Log the date and time values to the console
              console.log("Item:", item);

              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-nishiki-1" : ""}
                >
                  <td className="border px-4 py-2">{item.pc_name}</td>
                  <td className="border px-4 py-2">{item.total_profit}</td>
                  <td className="border px-4 py-2">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{item.time}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
