// src/pages/AdminDashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  FaHome, FaPills, FaPlusCircle, FaTruck, FaFileAlt, 
  FaUsers, FaShoppingCart, FaUserCircle 
} from "react-icons/fa";

export default function AdminDashboard({ onLogout }) {
  const links = [
    { to: "", label: "Home", icon: <FaHome /> },
    { to: "medicines", label: "Medicines", icon: <FaPills /> },
    { to: "add-medicine", label: "Add Medicine", icon: <FaPlusCircle /> },
    { to: "add-supplier", label: "Add Supplier", icon: <FaTruck /> },
    { to: "suppliers", label: "Suppliers", icon: <FaTruck /> },
    { to: "report", label: "Reports", icon: <FaFileAlt /> },
    { to: "users", label: "User Management", icon: <FaUsers /> },
    { to: "orders", label: "Orders", icon: <FaShoppingCart /> },
    { to: "profile", label: "Profile", icon: <FaUserCircle /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-600 to-pink-500 text-white shadow-lg p-6">
        <h2 className="text-2xl font-extrabold mb-8 text-yellow-300">Admin Panel</h2>
        <nav className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-yellow-400 hover:text-purple-800 transition-colors"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 bg-gradient-to-tr from-green-100 via-blue-100 to-purple-100">
        <Outlet /> {/* Nested routes render here */}
      </main>
    </div>
  );
}
