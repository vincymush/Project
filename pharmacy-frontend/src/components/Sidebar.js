import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Role-based dashboard titles
const roleTitles = {
  admin: "Admin Dashboard",
  pharmacist: "Pharmacy Dashboard",
  supplier: "Supplier Dashboard",
  cashier: "Cashier Dashboard",
  
};

// Role-based menu definitions
const roleMenus = {
  admin: [
    { label: "Dashboard", to: "/admin" },
    { label: "Medicines", to: "/admin/medicines" },
    { label: "Add Supplier", to: "/admin/add-supplier" },
    { label: "Suppliers", to: "/admin/suppliers" },
    { label: "Reports", to: "/admin/report" },
    { label: "User Management", to: "/admin/users" },
    { label: "Orders", to: "/admin/orders" },
    { label: "Add pharmacist/Cashier", to: "/admin/profile" },
  ],
  pharmacist: [
    { label: "Add Medicine", to: "/pharmacist/add-medicine" },
    { label: "Expired Medicines", to: "/pharmacist/expired-medicines" },
    { label: "Reports", to: "/pharmacist/reports" },
    { label: "Profile", to: "/pharmacist/profile" },
  ],
  supplier: [
    { label: "Dashboard", to: "/supplier" },
    { label: "Supply Orders", to: "/supplier/orders" },
    { label: "Profile", to: "/supplier/profile" },
  ],
  cashier: [
    { label: "Sales Report", to: "/cashier/sales-report" },
    { label: "Billing", to: "/cashier/billing" },
    { label: "Profile", to: "/cashier/profile" },
  ],

};

export default function Sidebar({ role, onLogout, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation(); // Detect current path
  const sections = roleMenus[role] || [];
  const appTitle = roleTitles[role] || "PharmacyApp";

  const linkBase = "rounded px-3 py-2 block transition-colors duration-150 font-semibold";
  const activeClass = `bg-gray-700 text-white ${linkBase}`;
  const inactiveClass = `text-gray-300 hover:bg-gray-700 hover:text-white ${linkBase}`;

  const handleLogout = () => {
    onLogout?.();
    navigate("/login");
  };

  return (
    <aside className="w-56 bg-gray-800 text-white min-h-screen p-6 flex flex-col">
      {/* App title */}
      <h2 className="text-2xl font-bold mb-10 select-none">{appTitle}</h2>

      {/* Navigation menu */}
      <nav className="flex-grow overflow-y-auto space-y-1">
        {sections.map(({ label, to }) => {
          // Check if current path starts with the menu path
          const isActive = location.pathname.startsWith(to);

          return (
            <div
              key={label}
              className={isActive ? activeClass : inactiveClass}
              onClick={() => {
                navigate(to);
                onNavigate?.(label);
              }}
            >
              {label}
            </div>
          );
        })}
      </nav>

      {/* Navigation controls */}
      <div className="mt-6 flex justify-between gap-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 rounded px-3 py-2 text-sm transition"
        >
          ← Back
        </button>
        <button
          onClick={() => navigate(1)}
          className="bg-gray-600 hover:bg-gray-700 rounded px-3 py-2 text-sm transition"
        >
          Forward →
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 rounded px-4 py-2 font-semibold transition"
      >
        Logout
      </button>
    </aside>
  );
}
