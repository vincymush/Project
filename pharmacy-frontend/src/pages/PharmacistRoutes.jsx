import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Prescriptions from "./Prescriptions";
import ExpiredMedicines from "./ExpiredMedicines";
import Profile from "./Profile";
import Reports from "./Reports";

export default function PharmacistDashboard({ onLogout }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar role="pharmacist" onLogout={onLogout} />

      <main style={{ flex: 1, padding: 20, background: "#f5f5f5", overflowY: "auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="prescriptions" replace />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="expired-medicines" element={<ExpiredMedicines />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<Reports />} />

          {/* Redirect unknown pharmacist paths to prescriptions */}
          <Route path="*" element={<Navigate to="prescriptions" replace />} />
        </Routes>
      </main>
    </div>
  );
}
