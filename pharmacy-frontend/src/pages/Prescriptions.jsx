import React, { useState } from "react";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, patient: "John Doe", medicine: "Amoxicillin", date: "2025-08-01", verified: false },
    { id: 2, patient: "Jane Smith", medicine: "Paracetamol", date: "2025-08-05", verified: false },
    { id: 3, patient: "Mary Johnson", medicine: "Ibuprofen", date: "2025-08-08", verified: true },
    { id: 4, patient: "David Kim", medicine: "Cetirizine", date: "2025-08-10", verified: false },
    { id: 5, patient: "Peter Parker", medicine: "Aspirin", date: "2025-08-12", verified: true },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Filter prescriptions based on case-insensitive partial matches
  const filteredPrescriptions = prescriptions.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.id.toString().includes(term) ||
      p.patient.toLowerCase().includes(term) ||
      p.medicine.toLowerCase().includes(term) ||
      p.date.includes(term)
    );
  });

  const toggleVerified = (id) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, verified: !p.verified } : p
      )
    );
  };

  const updateStock = (medicine) => {
    alert(`Stock updated for medicine: ${medicine}`);
  };

  // Highlight all occurrences of search term
  const highlight = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.toString().split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: "yellow" }}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Prescriptions</h1>

      {/* Search Input */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by ID, patient, medicine, or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: 8, width: "300px" }}
        />
      </div>

      {/* Prescriptions Table */}
      <h2>All Prescriptions</h2>
      {filteredPrescriptions.length > 0 ? (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", marginTop: 10, width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Medicine</th>
              <th>Date</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((p) => (
              <tr
                key={p.id}
                onClick={() => setSelectedPrescription(p)}
                style={{
                  backgroundColor: p.verified ? "#d4edda" : "white",
                  cursor: "pointer",
                }}
              >
                <td>{highlight(p.id)}</td>
                <td>{highlight(p.patient)}</td>
                <td>{highlight(p.medicine)}</td>
                <td>{highlight(p.date)}</td>
                <td>{p.verified ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVerified(p.id);
                    }}
                    style={{
                      marginRight: 6,
                      backgroundColor: p.verified ? "#dc3545" : "#28a745",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: 4,
                    }}
                  >
                    {p.verified ? "Unverify" : "Verify"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStock(p.medicine);
                    }}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: 4,
                    }}
                  >
                    Update Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: "red" }}>No prescriptions match your search.</p>
      )}

      {/* Prescription Modal */}
      {selectedPrescription && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedPrescription(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              minWidth: 300,
              maxWidth: "500px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Prescription Details</h3>
            <p><strong>ID:</strong> {highlight(selectedPrescription.id)}</p>
            <p><strong>Patient:</strong> {highlight(selectedPrescription.patient)}</p>
            <p><strong>Medicine:</strong> {highlight(selectedPrescription.medicine)}</p>
            <p><strong>Date:</strong> {highlight(selectedPrescription.date)}</p>
            <p><strong>Verified:</strong> {selectedPrescription.verified ? "Yes" : "No"}</p>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => toggleVerified(selectedPrescription.id)}
                style={{
                  marginRight: 6,
                  backgroundColor: selectedPrescription.verified ? "#dc3545" : "#28a745",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: 4,
                }}
              >
                {selectedPrescription.verified ? "Unverify" : "Verify"}
              </button>
              <button
                onClick={() => updateStock(selectedPrescription.medicine)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: 4,
                }}
              >
                Update Stock
              </button>
            </div>

            <button
              onClick={() => setSelectedPrescription(null)}
              style={{
                marginTop: 15,
                backgroundColor: "#6c757d",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: 4,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
