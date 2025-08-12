import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ onLogout, role }) {
  const navigate = useNavigate();

  const appTitle = {
    admin: "Admin Dashboard",
    pharmacist: "Pharmacy Dashboard",
    supplier: "Supplier Dashboard",
    cashier: "Cashier Dashboard",
    customer: "Customer Dashboard",
  }[role] || "PharmacyApp";

  const roleMenus = {
    cashier: [
      { label: "Sales Report", to: "/cashier/sales-report", key: "salesReport" },
      { label: "Billing", to: "/cashier/billing", key: "billing" },
      { label: "Profile", to: "/cashier/profile", key: "profile" },
    ],
    // add other roles here if needed
  };

  const sections = roleMenus[role] || [];
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (label) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  const activeClass =
    "bg-gray-700 text-white rounded px-3 py-2 block font-semibold";
  const inactiveClass =
    "text-gray-300 hover:bg-gray-700 hover:text-white rounded px-3 py-2 block";

  return (
    <div className="w-56 bg-gray-800 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-10 select-none cursor-default">
        {appTitle}
      </h2>

      <nav className="flex-grow overflow-y-auto">
        {sections.map(({ label, to, submenu }) => (
          <div key={label} className="mb-2">
            {!submenu ? (
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                end
              >
                {label}
              </NavLink>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => toggleSection(label)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-expanded={expandedSection === label}
                  aria-controls={`${label}-submenu`}
                >
                  <span className="font-semibold">{label}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      expandedSection === label ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {expandedSection === label && (
                  <div
                    id={`${label}-submenu`}
                    className="pl-5 mt-2"
                    role="region"
                    aria-label={`${label} submenu`}
                  >
                    {submenu.map(({ label: subLabel, to: subTo }) => (
                      <NavLink
                        key={subTo}
                        to={subTo}
                        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                        end
                      >
                        {subLabel}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
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
        onClick={() => {
          if (typeof onLogout === "function") {
            onLogout();
          }
        }}
        className="mt-6 bg-red-600 hover:bg-red-700 rounded px-4 py-2 font-semibold"
        type="button"
      >
        Logout
      </button>
    </div>
  );
}
