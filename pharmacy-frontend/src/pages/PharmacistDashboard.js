// src/pages/PharmacistDashboard.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import AddMedicine from "./AddMedicine";
import ExpiredMedicines from "./ExpiredMedicines";
import Profile from "./Profile";
import Reports from "./Reports";

export default function PharmacistDashboard({ onLogout }) {
  // Shared medicines state
  const [medicines, setMedicines] = useState([]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar role="pharmacist" onLogout={onLogout} />

      <main style={{ flex: 1, padding: 20, background: "#f5f5f5", overflowY: "auto" }}>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="add-medicine" replace />} />

          {/* Pages with shared medicines state */}
          <Route
            path="add-medicine"
            element={<AddMedicine medicines={medicines} setMedicines={setMedicines} />}
          />
          <Route
            path="expired-medicines"
            element={<ExpiredMedicines medicines={medicines} />}
          />

          {/* Other pages */}
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<Reports />} />

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="add-medicine" replace />} />
        </Routes>
      </main>
    </div>
  );
}
