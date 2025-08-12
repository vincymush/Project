import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SalesReport from "./SalesReport";
import Profile from "./Profile";
import Billing from "./Billing";

export default function CashierDashboard({ onLogout }) {
  const location = useLocation();

  const [medicineName, setMedicineName] = useState("");
  const [barcode, setBarcode] = useState("");

  // Decide which page to render based on URL path
  const renderPage = () => {
    if (location.pathname.includes("billing")) return <Billing />;
    if (location.pathname.includes("profile")) return <Profile />;

    // default sales report page with search
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search by medicine name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              width: "200px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Search by barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              width: "200px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={() =>
              alert(
                `Searching for: Medicine Name = ${medicineName}, Barcode = ${barcode}`
              )
            }
            style={{
              padding: "8px 16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        <SalesReport />

        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => alert("Invoice generated!")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Generate Invoice
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar role="cashier" onLogout={onLogout} />
      <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
        {renderPage()}
      </div>
    </div>
  );
}
