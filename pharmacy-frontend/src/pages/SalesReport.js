import React, { useState } from "react";

export default function SalesReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Sample sales data
  const salesData = [
    { id: 1, date: "2025-08-01", item: "Paracetamol", amount: 200 },
    { id: 2, date: "2025-08-03", item: "Cough Syrup", amount: 350 },
    { id: 3, date: "2025-08-05", item: "Antibiotics", amount: 500 },
    { id: 4, date: "2025-08-10", item: "Vitamin C", amount: 150 },
  ];

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const filtered = salesData.filter(
      (sale) => sale.date >= startDate && sale.date <= endDate
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Sales Report</h1>
      <p>Filter sales reports by date range.</p>

      <div style={{ marginBottom: "20px" }}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label style={{ marginLeft: "10px" }}>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button style={{ marginLeft: "10px" }} onClick={handleFilter}>
          Filter
        </button>
      </div>

      {filteredData.length > 0 ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Item</th>
              <th>Amount (KES)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.date}</td>
                <td>{sale.item}</td>
                <td>{sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sales found for the selected date range.</p>
      )}
    </div>
  );
}
