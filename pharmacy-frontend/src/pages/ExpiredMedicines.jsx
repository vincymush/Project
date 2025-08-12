import React, { useState } from "react";

export default function ExpiredMedicines() {
  const [expiredList, setExpiredList] = useState([
    { id: 1, name: "Ibuprofen", expiryDate: "2025-07-20" },
    { id: 2, name: "Vitamin C", expiryDate: "2025-06-15" },
  ]);

  return (
    <div>
      <h1>Expired Medicines</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {expiredList.map((med) => (
            <tr key={med.id}>
              <td>{med.id}</td>
              <td>{med.name}</td>
              <td>{med.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
