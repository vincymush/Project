import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import AddMedicine from "./AddMedicine";
import ExpiredMedicines from "./ExpiredMedicines";
import Profile from "./Profile";
import Reports from "./Reports";

import { rtdb } from "../config";
import { ref, onValue } from "firebase/database";

export default function PharmacistDashboard({ onLogout }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const medicinesRef = ref(rtdb, "medicines");

    const unsubscribe = onValue(medicinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const medicinesArray = Object.values(data);

        medicinesArray.sort((a, b) => {
          const nameComparison = a.name.localeCompare(b.name, undefined, {
            sensitivity: "base",
          });
          if (nameComparison !== 0) {
            return nameComparison;
          }
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        });

        setMedicines(medicinesArray);
      } else {
        setMedicines([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ color: "#2c3e50" }}>Loading medicines...</h2>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <Sidebar role="pharmacist" onLogout={onLogout} />

      <main
        style={{
          flex: 1,
          padding: "20px",
          background: "#f4f6f8",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ color: "#2c3e50", margin: 0, fontSize: "1.8rem" }}>
            Pharmacist Dashboard
          </h1>
          <p style={{ color: "#7f8c8d", marginTop: "8px" }}>
            Manage medicines, track expiry dates, and monitor reports
          </p>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="add-medicine" replace />} />

          <Route
            path="add-medicine"
            element={
              <AddMedicine
                medicines={medicines}
                setMedicines={setMedicines}
                buttonStyle={{
                  background: "#27ae60",
                  color: "#fff",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.2s",
                }}
              />
            }
          />

          <Route
            path="expired-medicines"
            element={
              <ExpiredMedicines
                medicines={medicines}
                buttonStyle={{
                  background: "#c0392b",
                  color: "#fff",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.2s",
                }}
              />
            }
          />

          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<Reports />} />

          <Route path="*" element={<Navigate to="add-medicine" replace />} />
        </Routes>
      </main>
    </div>
  );
}
