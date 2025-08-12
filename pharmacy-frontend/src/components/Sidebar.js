import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ onLogout, role, onNavigate }) {
  const navigate = useNavigate();

  const appTitle = {
    admin: "Admin Dashboard",
    pharmacist: "Pharmacy Dashboard",
    supplier: "Supplier Dashboard",
    cashier: "Cashier Dashboard",
    customer: "Customer Dashboard",
  }[role] || "PharmacyApp";

  // Full menu per role:
  const roleMenus = {
    admin: [
      { label: "Dashboard", to: "/admin", key: "dashboard" },
      { label: "Medicines", to: "/admin/medicines", key: "medicines" },
      { label: "Add Supplier", to: "/admin/add-supplier", key: "addSupplier" },
      { label: "Suppliers", to: "/admin/suppliers", key: "suppliers" },
      { label: "Reports", to: "/admin/report", key: "reports" },
      { label: "User Management", to: "/admin/users", key: "users" },
      { label: "Orders", to: "/admin/orders", key: "orders" },
      { label: "Profile", to: "/admin/profile", key: "profile" },
    ],
    pharmacist: [
      { label: "Prescriptions", to: "/pharmacist/prescriptions", key: "prescriptions" },
      { label: "Expired Medicines", to: "/pharmacist/expired-medicines", key: "expiredMedicines" },
      { label: "Reports", to: "/pharmacist/reports", key: "reports" },
      { label: "Profile", to: "/pharmacist/profile", key: "profile" },
    ],
    supplier: [
      { label: "Dashboard", to: "/supplier", key: "dashboard" },
      { label: "Supply Orders", to: "/supplier/orders", key: "orders" },
      { label: "Profile", to: "/supplier/profile", key: "profile" },
    ],
    cashier: [
      { label: "Sales Report", to: "/cashier/sales-report", key: "salesReport" },
      { label: "Billing", to: "/cashier/billing", key: "billing" },
      { label: "Profile", to: "/cashier/profile", key: "profile" },
    ],
    customer: [
      { label: "Dashboard", to: "/customer", key: "dashboard" },
      { label: "Shop", to: "/customer/shop", key: "shop" },
      { label: "Orders", to: "/customer/orders", key: "orders" },
      { label: "Profile", to: "/customer/profile", key: "profile" },
    ],
  };

  const sections = roleMenus[role] || [];

  const activeClass =
    "bg-gray-700 text-white rounded px-3 py-2 block font-semibold";
  const inactiveClass =
    "text-gray-300 hover:bg-gray-700 hover:text-white rounded px-3 py-2 block";

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <div className="w-56 bg-gray-800 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-10 select-none cursor-default">
        {appTitle}
      </h2>

      <nav className="flex-grow overflow-y-auto">
        {sections.map(({ label, to }) => (
          <div key={label} className="mb-2">
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              end
              onClick={() => onNavigate && onNavigate(label)}
            >
              {label}
            </NavLink>
          </div>
        ))}
      </nav>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 rounded px-3 py-2 text-sm"
          type="button"
          aria-label="Go back"
        >
          &#8592; Back
        </button>
        <button
          onClick={() => navigate(1)}
          className="bg-gray-600 hover:bg-gray-700 rounded px-3 py-2 text-sm"
          type="button"
          aria-label="Go forward"
        >
          Forward &#8594;
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 rounded px-4 py-2 font-semibold"
        type="button"
      >
        Logout
      </button>
    </div>
  );
}
