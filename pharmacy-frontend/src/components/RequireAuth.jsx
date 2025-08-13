// src/components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePermissions } from "../hooks/usePermissions";

export default function RequireAuth({ children, allowedRoles, requiredPermission }) {
  const { userId, role, loading: authLoading } = useAuth();
  const { permissions, loading: permLoading } = usePermissions(userId);

  if (authLoading || permLoading) return <div>Loading...</div>;

  if (!role) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  if (requiredPermission && !permissions.includes(requiredPermission)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}
