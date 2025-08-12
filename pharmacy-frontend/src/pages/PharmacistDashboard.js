import React, { useState } from "react";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, patient: "John Doe", medicine: "Amoxicillin", date: "2025-08-01", verified: false },
    { id: 2, patient: "Jane Smith", medicine: "Paracetamol", date: "2025-08-05", verified: false },
  ]);

  const [searchId, setSearchId] = useState("");
  const [filteredPrescription, setFilteredPrescription] = useState(null);

  // Handle search
  const handleSearch = () => {
    const idNum = parseInt(searchId, 10);
    if (isNaN(idNum)) {
      alert("Please enter a valid numeric ID");
      return;
    }
    const found = prescriptions.find((p) => p.id === idNum);
    if (found) {
      setFilteredPrescription(found);
    } else {
      alert(`No prescription found with ID ${idNum}`);
      setFilteredPrescription(null);
    }
  };

  // Verify prescription
  const verifyPrescription = (id) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, verified: true } : p
      )
    );
    if (filteredPrescription && filteredPrescription.id === id) {
      setFilteredPrescription({ ...filteredPrescription, verified: true });
    }
    alert(`Prescription ${id} verified.`);
  };

  // Update stock button action
  const updateStock = (medicine) => {
    alert(`Stock updated for medicine: ${medicine}`);
  };

  return (
    <div>
      <h1>Prescriptions</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Prescription ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button onClick={handleSearch} style={{ padding: "8px" }}>
          Search
        </button>
      </div>

      {filteredPrescription ? (
        <div style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px", borderRadius: "6px" }}>
          <h2>Prescription Details</h2>
          <p><strong>ID:</strong> {filteredPrescription.id}</p>
          <p><strong>Patient:</strong> {filteredPrescription.patient}</p>
          <p><strong>Medicine:</strong> {filteredPrescription.medicine}</p>
          <p><strong>Date:</strong> {filteredPrescription.date}</p>
          <p><strong>Verified:</strong> {filteredPrescription.verified ? "Yes" : "No"}</p>

          <button
            onClick={() => verifyPrescription(filteredPrescription.id)}
            disabled={filteredPrescription.verified}
            style={{ marginRight: "10px", padding: "8px" }}
          >
            {filteredPrescription.verified ? "Verified" : "Verify Prescription"}
          </button>

          <button
            onClick={() => updateStock(filteredPrescription.medicine)}
            style={{ padding: "8px" }}
          >
            Update Stock
          </button>
        </div>
      ) : (
        <p>Search for a prescription by ID to view details.</p>
      )}

      <h2>All Prescriptions</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Medicine</th>
            <th>Date</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((p) => (
            <tr key={p.id} style={{ backgroundColor: p.verified ? "#d4edda" : "white" }}>
              <td>{p.id}</td>
              <td>{p.patient}</td>
              <td>{p.medicine}</td>
              <td>{p.date}</td>
              <td>{p.verified ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
