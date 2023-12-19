import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TablePage = () => {
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3001/'); // Change this to your server's endpoint
      setData(result.data);
    };

    fetchData();
  }, []);

  const sortData = (field) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[field] < b[field]) return sortDirection ? -1 : 1;
      if (a[field] > b[field]) return sortDirection ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortField(field);
    setSortDirection(field === sortField ? !sortDirection : true); // toggle sort direction if the same field is clicked, else sort ascending

  };

  return (
    <div className="text-center">
      <button className="bg-nishiki-1 text-white py-2 px-4 rounded m-2" onClick={() => sortData('pc_name')}>
        Sort by PC Name {sortField === 'pc_name' ? (sortDirection ? '↑' : '↓') : ''}
      </button>
      <button className="bg-nishiki-2 text-white py-2 px-4 rounded m-2" onClick={() => sortData('total_profit')}>
        Sort by Total Profit {sortField === 'total_profit' ? (sortDirection ? '↑' : '↓') : ''}
      </button>
      <button className="bg-nishiki-3 text-nishiki-4 py-2 px-4 rounded m-2" onClick={() => sortData('Time')}>
        Sort by Time {sortField === 'Time' ? (sortDirection ? '↑' : '↓') : ''}
      </button>
      <table className="table-auto mx-auto mt-4 bg-nishiki-4 text-nishiki-5">
        <thead>
          <tr>
            <th className="px-4 py-2">PS Name</th>
            <th className="px-4 py-2">Cost</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-nishiki-1' : ''}>
              <td className="border px-4 py-2">{item.pc_name}</td>
              <td className="border px-4 py-2">{item.total_profit}</td>
              <td className="border px-4 py-2">{new Date(item.Date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{item.Time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;