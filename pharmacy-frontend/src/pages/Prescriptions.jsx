import React, { useState } from "react";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, patient: "John Doe", medicine: "Amoxicillin", date: "2025-08-01", verified: false },
    { id: 2, patient: "Jane Smith", medicine: "Paracetamol", date: "2025-08-05", verified: false },
  ]);

  const [searchId, setSearchId] = useState("");
  const [filteredPrescription, setFilteredPrescription] = useState(null);

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

  const toggleVerified = (id) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, verified: !p.verified } : p
      )
    );

    if (filteredPrescription && filteredPrescription.id === id) {
      setFilteredPrescription({
        ...filteredPrescription,
        verified: !filteredPrescription.verified,
      });
    }

    alert(`Prescription ${id} ${filteredPrescription?.verified ? 'unverified' : 'verified'}.`);
  };

  const updateStock = (medicine) => {
    alert(`Stock updated for medicine: ${medicine}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Prescriptions</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by Prescription ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button onClick={handleSearch} style={{ padding: 8 }}>
          Search
        </button>
      </div>

      {filteredPrescription ? (
        <div
          style={{
            marginBottom: 30,
            border: "1px solid #ccc",
            padding: 15,
            borderRadius: 6,
          }}
        >
          <h2>Prescription Details</h2>
          <p>
            <strong>ID:</strong> {filteredPrescription.id}
          </p>
          <p>
            <strong>Patient:</strong> {filteredPrescription.patient}
          </p>
          <p>
            <strong>Medicine:</strong> {filteredPrescription.medicine}
          </p>
          <p>
            <strong>Date:</strong> {filteredPrescription.date}
          </p>
          <p>
            <strong>Verified:</strong>{" "}
            {filteredPrescription.verified ? "Yes" : "No"}
          </p>

          <button
            onClick={() => toggleVerified(filteredPrescription.id)}
            className={`px-4 py-2 rounded font-semibold text-white transition ${
              filteredPrescription.verified
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
            style={{ marginRight: 10 }}
          >
            {filteredPrescription.verified
              ? "Unverify Prescription"
              : "Verify Prescription"}
          </button>

          <button
            onClick={() => updateStock(filteredPrescription.medicine)}
            className="px-4 py-2 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Update Stock
          </button>
        </div>
      ) : (
        <p>Search for a prescription by ID to view details.</p>
      )}

      <h2>All Prescriptions</h2>
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
          {prescriptions.map((p) => (
            <tr
              key={p.id}
              style={{ backgroundColor: p.verified ? "#d4edda" : "white" }}
            >
              <td>{p.id}</td>
              <td>{p.patient}</td>
              <td>{p.medicine}</td>
              <td>{p.date}</td>
              <td>{p.verified ? "Yes" : "No"}</td>
              <td>
                <button
                  onClick={() => toggleVerified(p.id)}
                  className={`px-3 py-1 rounded text-white font-semibold transition ${
                    p.verified
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  style={{ marginRight: 6 }}
                >
                  {p.verified ? "Unverify" : "Verify"}
                </button>
                <button
                  onClick={() => updateStock(p.medicine)}
                  className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Update Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
