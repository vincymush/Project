// src/pages/CashierRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SalesReport from "./SalesReport";
import Billing from "./Billing";
import Profile from "./Profile";

export default function CashierRoutes({ onLogout }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with cashier role */}
      <Sidebar role="cashier" onLogout={onLogout} />

      {/* Main content area */}
      <main className="flex-grow p-5 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="billing" element={<Billing />} />
          <Route path="profile" element={<Profile />} />

          {/* Redirect any unknown path to sales-report */}
          <Route path="*" element={<Navigate to="sales-report" replace />} />
        </Routes>
      </main>
    </div>
  );
}
