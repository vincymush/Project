import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CustomerUploadPage from "./CustomerUploadPage";

export default function CustomerRoutes({ onLogout }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Uncomment and add Sidebar for customer if needed */}
      {/* <Sidebar role="customer" onLogout={onLogout} /> */}

      <main
        style={{
          flex: 1,
          padding: 20,
          background: "#f5f5f5",
          overflowY: "auto",
        }}
      >
        <Routes>
          {/* Default route: redirect /customer to /customer/upload */}
          <Route index element={<Navigate to="upload" replace />} />

          {/* Customer upload page */}
          <Route path="upload" element={<CustomerUploadPage onLogout={onLogout} />} />

          {/* Add more customer-specific routes here */}

          {/* Redirect unknown paths under /customer back to upload */}
          <Route path="*" element={<Navigate to="upload" replace />} />
        </Routes>
      </main>
    </div>
  );
}
