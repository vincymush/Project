import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ onLogout, role }) {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 px-4 py-2 transition-colors duration-200"
      : "text-gray-600 hover:text-blue-600 px-4 py-2 transition-colors duration-200";

  const handleLogout = () => {
    onLogout();
    navigate("/login"); // redirect to login after logout
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center space-x-8">
      <div className="text-2xl font-extrabold text-blue-600 tracking-wide cursor-default">
        PharmacyApp
      </div>

      <NavLink to={`/${role}`} className={linkClass}>
        Dashboard
      </NavLink>

      <NavLink to={`/${role}/profile`} className={linkClass}>
        Profile
      </NavLink>

      <button
        onClick={handleLogout}
        className="ml-auto bg-red-100 text-red-600 hover:bg-red-200 focus:bg-red-300 focus:outline-none rounded px-4 py-2 font-semibold transition-colors duration-200"
        aria-label="Logout"
      >
        Logout
      </button>
    </nav>
  );
}
