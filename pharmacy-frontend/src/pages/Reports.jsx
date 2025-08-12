import React, { useState } from "react";

export default function Reports() {
  const [salesData, setSalesData] = useState([
    { id: 1, date: "2025-08-01", totalSales: 500 },
    { id: 2, date: "2025-08-05", totalSales: 350 },
  ]);

  return (
    <div>
      <h1>Reports</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total Sales (Ksh)</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.date}</td>
              <td>{report.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
