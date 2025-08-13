// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import AdminRoutes from "./pages/AdminRoutes";
import PharmacistRoutes from "./pages/PharmacistRoutes";
import CashierRoutes from "./pages/CashierRoutes"; // ✅ create if not exists
import { usePermissions } from "./hooks/usePermissions";
import AccessDenied from "./pages/AccessDenied";

function RequireAuth({ children, allowedRoles }) {
  const { user, role, loading: authLoading } = useAuth();
  const { loading: permsLoading } = usePermissions(user?.uid);

  if (authLoading || permsLoading) return <div>Loading...</div>;
  if (!role) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

function RedirectBasedOnRole() {
  const { role } = useAuth();
  switch (role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "pharmacist":
      return <Navigate to="/pharmacist" replace />;
    case "cashier":
      return <Navigate to="/cashier" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Redirect root */}
          <Route path="/" element={<RedirectBasedOnRole />} />
          <Route path="*" element={<RedirectBasedOnRole />} />

          {/* Protected */}
          <Route
            path="/admin/*"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <AdminRoutes />
              </RequireAuth>
            }
          />
          <Route
            path="/pharmacist/*"
            element={
              <RequireAuth allowedRoles={["pharmacist"]}>
                <PharmacistRoutes />
              </RequireAuth>
            }
          />
          <Route
            path="/cashier/*"
            element={
              <RequireAuth allowedRoles={["cashier"]}>
                <CashierRoutes />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
