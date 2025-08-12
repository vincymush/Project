// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./pages/LoginPage";
import Login from "./pages/LoginPage";
import AdminRoutes from "./pages/AdminRoutes";
import PharmacistRoutes from "./pages/PharmacistRoutes";
import CashierRoutes from "./pages/CashierRoutes";
import CustomerRoutes from "./pages/CustomerRoutes";

function RequireAuth({ children }) {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;
  return children;
}

function RedirectBasedOnRole() {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;

  switch (role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "pharmacist":
      return <Navigate to="/pharmacist" replace />;
    case "cashier":
      return <Navigate to="/cashier" replace />;
    case "customer":
      return <Navigate to="/customer" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public login page */}
          <Route path="/login" element={<Login />} />

          {/* Redirect from root or unknown routes to role-based dashboard */}
          <Route path="/" element={<RedirectBasedOnRole />} />
          <Route path="*" element={<RedirectBasedOnRole />} />

          {/* Protected routes */}
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminRoutes />
              </RequireAuth>
            }
          />
          <Route
            path="/pharmacist/*"
            element={
              <RequireAuth>
                <PharmacistRoutes />
              </RequireAuth>
            }
          />
          <Route
            path="/cashier/*"
            element={
              <RequireAuth>
                <CashierRoutes />
              </RequireAuth>
            }
          />
          <Route
            path="/customer/*"
            element={
              <RequireAuth>
                <CustomerRoutes />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
