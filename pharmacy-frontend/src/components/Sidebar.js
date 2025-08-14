import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPills, FaTruck, FaChartLine, FaUsers, FaFileInvoice, FaUserPlus, FaClipboardList, FaCapsules, FaFileAlt, FaUser, FaCashRegister, FaArrowLeft, FaArrowRight, FaSignOutAlt } from "react-icons/fa";

// Role-based dashboard titles
const roleTitles = {
  admin: "Admin Dashboard",
  pharmacist: "Pharmacy Dashboard",
  supplier: "Supplier Dashboard",
  cashier: "Cashier Dashboard",
};

// Role-based menu definitions with icons
const roleMenus = {
  admin: [
    { label: "Dashboard", to: "/admin", icon: <FaChartLine /> },
    { label: "Medicines", to: "/admin/medicines", icon: <FaPills /> },
    { label: "Add Supplier", to: "/admin/add-supplier", icon: <FaTruck /> },
    { label: "Suppliers", to: "/admin/suppliers", icon: <FaUsers /> },
    { label: "Reports", to: "/admin/report", icon: <FaFileAlt /> },
    { label: "User Management", to: "/admin/users", icon: <FaUsers /> },
    { label: "Orders", to: "/admin/orders", icon: <FaClipboardList /> },
    { label: "Add Pharmacist/Cashier", to: "/admin/profile", icon: <FaUserPlus /> },
  ],
  pharmacist: [
    { label: "Add Medicine", to: "/pharmacist/add-medicine", icon: <FaCapsules /> },
    { label: "Expired Medicines", to: "/pharmacist/expired-medicines", icon: <FaFileAlt /> },
    { label: "Reports", to: "/pharmacist/reports", icon: <FaChartLine /> },
    { label: "Profile", to: "/pharmacist/profile", icon: <FaUser /> },
  ],
  supplier: [
    { label: "Dashboard", to: "/supplier", icon: <FaChartLine /> },
    { label: "Supply Orders", to: "/supplier/orders", icon: <FaClipboardList /> },
    { label: "Profile", to: "/supplier/profile", icon: <FaUser /> },
  ],
  cashier: [
    { label: "Sales Report", to: "/cashier/sales-report", icon: <FaFileInvoice /> },
    { label: "Billing", to: "/cashier/billing", icon: <FaCashRegister /> },
    { label: "Profile", to: "/cashier/profile", icon: <FaUser /> },
  ],
};

export default function Sidebar({ role, onLogout, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const sections = roleMenus[role] || [];
  const appTitle = roleTitles[role] || "PharmacyApp";

  const handleLogout = () => {
    onLogout?.();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col shadow-lg">
      {/* App title */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">{appTitle}</h2>
      </div>

      {/* Navigation menu */}
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {sections.map(({ label, to, icon }) => {
          const isActive = location.pathname.startsWith(to);
          return (
            <button
              key={label}
              onClick={() => {
                navigate(to);
                onNavigate?.(label);
              }}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Navigation controls */}
      <div className="px-4 py-3 flex justify-between gap-2 border-t border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded transition"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={() => navigate(1)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded transition"
        >
          Forward <FaArrowRight />
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
