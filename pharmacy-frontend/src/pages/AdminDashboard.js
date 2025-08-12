// src/pages/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard({ onLogout, role }) {
  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-3">
        <Link to="" className="block hover:text-blue-600">Home</Link>
        <Link to="medicines" className="block hover:text-blue-600">Medicines</Link>
        <Link to="add-supplier" className="block hover:text-blue-600">Add Supplier</Link>
        <Link to="suppliers" className="block hover:text-blue-600">Suppliers</Link>
        <Link to="report" className="block hover:text-blue-600">Reports</Link>
        <Link to="users" className="block hover:text-blue-600">User Management</Link>
        <Link to="orders" className="block hover:text-blue-600">Orders</Link>
        <Link to="profile" className="block hover:text-blue-600">Profile</Link>
      </nav>

      <button
        onClick={onLogout}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
}
