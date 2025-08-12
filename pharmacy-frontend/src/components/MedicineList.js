import React, { useState } from "react";

export default function MedicineList() {
  // Sample initial medicines data
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", stock: 50, expiryDate: "2025-12-31" },
    { id: 2, name: "Ibuprofen", stock: 20, expiryDate: "2024-06-15" },
    { id: 3, name: "Amoxicillin", stock: 0, expiryDate: "2023-11-01" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      // Filter out the deleted medicine
      setMedicines(medicines.filter((med) => med.id !== id));
    }
  };

  return (
    <div>
      <h3>Medicine List</h3>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No medicines available</td>
            </tr>
          ) : (
            medicines.map((med) => (
              <tr key={med.id}>
                <td>{med.name}</td>
                <td>{med.stock}</td>
                <td>{med.expiryDate}</td>
                <td>
                  <button
                    onClick={() => handleDelete(med.id)}
                    style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
