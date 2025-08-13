// src/pages/AdminRoutes.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../components/Sidebar"; // Use Sidebar for navigation, not AdminDashboard
import MedicinesTable from "../components/MedicinesTable";
import AddSupplierForm from "../components/AddSupplierForm";
import SuppliersList from "../components/SuppliersList";
import ReportSummary from "../components/ReportSummary";
import RecentActivities from "../components/RecentActivities";

import UserManagement from "./UserManagement";
import Orders from "./Orders";
import Profile from "./Profile";

export default function AdminRoutes({ onLogout }) {
  const [medicines] = useState([
    { id: 1, name: "Paracetamol", stock: 10, expiryDate: "2025-12-31" },
    { id: 2, name: "Ibuprofen", stock: 3, expiryDate: "2024-06-01" },
    { id: 3, name: "Aspirin", stock: 0, expiryDate: "2023-11-30" },
  ]);

  const [suppliers, setSuppliers] = useState([]);

  const report = {
    totalSales: 120,
    prescriptionsVerified: 25,
    medicinesRestocked: 10,
  };

  const handleAddSupplier = (newSupplier) => {
    setSuppliers((prev) => [...prev, newSupplier]);
    console.log("Supplier added:", newSupplier);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for navigation */}
      <Sidebar role="admin" onLogout={onLogout} />

      {/* Main content area */}
      <main className="flex-grow p-6 flex flex-col overflow-auto">
        <Routes>
          <Route path="medicines" element={<MedicinesTable medicines={medicines} />} />
          <Route path="add-supplier" element={<AddSupplierForm onAddSupplier={handleAddSupplier} />} />
          <Route path="suppliers" element={<SuppliersList suppliers={suppliers} />} />
          <Route path="report" element={<ReportSummary report={report} />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />

          {/* Default dashboard home */}
          <Route
            path=""
            element={
              <div>
                <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
                <RecentActivities />
              </div>
            }
          />

          {/* Redirect unknown admin routes back to dashboard */}
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </main>
    </div>
  );
}


//kthQ6CwRCdQZGUF0Y1PLDaqKgn82
//7hLfAlOYHrWRD3o7VDU32C5kZ6G2