import React from "react";
import { Navigate } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";
import AdminRolesUsers from "./AdminRolesUsers";

/**
 * Protects Admin Panel so only users with "manage_roles" can access.
 * @param {string} userId - Firestore user ID of the logged-in user
 */
export default function AdminProtected({ userId }) {
  const { permissions, loading } = usePermissions(userId);

  if (loading) return <div>Loading...</div>;

  // If user doesn't have "manage_roles", block access
  if (!permissions.includes("manage_roles")) {
    return <Navigate to="/" replace />;
  }

  return <AdminRolesUsers />;
}
