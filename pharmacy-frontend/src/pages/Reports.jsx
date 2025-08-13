import React, { useState } from "react";

export default function Reports() {
  const [salesData] = useState([
    { id: 1, date: "2025-08-01", totalSales: 500 },
    { id: 2, date: "2025-08-05", totalSales: 350 },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <table
        className="min-w-full border border-gray-300 mt-4"
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Total Sales (Ksh)</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{report.id}</td>
              <td className="border border-gray-300 px-4 py-2">{report.date}</td>
              <td className="border border-gray-300 px-4 py-2">{report.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
