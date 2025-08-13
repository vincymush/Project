import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  TextField,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import { db, auth } from "../firebase/config"; // ✅ import auth to get UID
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [loading, setLoading] = useState(true);

  const [newRole, setNewRole] = useState("");
  const [newPermission, setNewPermission] = useState("");

  const docRef = doc(db, "roles_permissions", "config");

  const defaultRoles = ["admin", "pharmacist", "cashier", "customer"];
  const defaultPermissions = [
    "view_prescriptions",
    "add_prescription",
    "delete_prescription",
    "view_inventory",
    "add_inventory",
    "update_inventory",
    "delete_inventory",
    "view_sales",
    "process_sales",
    "manage_users",
    "manage_roles"
  ];
  const defaultRolePermissions = {
    admin: [...defaultPermissions],
    pharmacist: [
      "view_prescriptions",
      "add_prescription",
      "delete_prescription",
      "view_inventory",
      "add_inventory",
      "update_inventory"
    ],
    cashier: ["view_sales", "process_sales"],
    customer: ["view_prescriptions"]
  };

  useEffect(() => {
    const fetchOrSeedData = async () => {
      const docSnap = await getDoc(docRef);
      let updatedData;

      if (docSnap.exists()) {
        updatedData = docSnap.data();

        // Ensure admin has manage_roles
        if (!updatedData.roles.includes("admin")) {
          updatedData.roles.push("admin");
        }
        if (!updatedData.permissions.includes("manage_roles")) {
          updatedData.permissions.push("manage_roles");
        }
        if (!updatedData.rolePermissions.admin) {
          updatedData.rolePermissions.admin = [];
        }
        if (!updatedData.rolePermissions.admin.includes("manage_roles")) {
          updatedData.rolePermissions.admin.push("manage_roles");
        }

        // Save back to Firestore if we made changes
        await setDoc(docRef, updatedData);
      } else {
        // Seed Firestore if missing
        updatedData = {
          roles: defaultRoles,
          permissions: defaultPermissions,
          rolePermissions: defaultRolePermissions
        };
        await setDoc(docRef, updatedData);
        console.log("✅ Seeded default roles & permissions.");
      }

      // ✅ Auto-create/update logged-in user as admin
      const currentUser = auth.currentUser;
      if (currentUser) {
        await setDoc(
          doc(db, "users", currentUser.uid),
          {
            name: currentUser.email,
            role: "admin"
          },
          { merge: true }
        );
        console.log(`✅ Ensured ${currentUser.email} is admin.`);
      }

      setRoles(updatedData.roles || []);
      setPermissions(updatedData.permissions || []);
      setRolePermissions(updatedData.rolePermissions || {});
      setLoading(false);
    };

    fetchOrSeedData();
  }, []);

  const togglePermission = (role, permission) => {
    setRolePermissions((prev) => {
      const current = prev[role] || [];
      const updated = current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission];
      return { ...prev, [role]: updated };
    });
  };

  const handleAddRole = () => {
    if (!newRole || roles.includes(newRole)) return;
    setRoles([...roles, newRole]);
    setRolePermissions({ ...rolePermissions, [newRole]: [] });
    setNewRole("");
  };

  const handleAddPermission = () => {
    if (!newPermission || permissions.includes(newPermission)) return;
    setPermissions([...permissions, newPermission]);
    setNewPermission("");
  };

  const handleDeleteRole = (role) => {
    setRoles(roles.filter((r) => r !== role));
    const updated = { ...rolePermissions };
    delete updated[role];
    setRolePermissions(updated);
  };

  const handleDeletePermission = (permission) => {
    setPermissions(permissions.filter((p) => p !== permission));
    const updated = { ...rolePermissions };
    for (const role in updated) {
      updated[role] = updated[role].filter((p) => p !== permission);
    }
    setRolePermissions(updated);
  };

  const handleSave = async () => {
    await setDoc(docRef, {
      roles,
      permissions,
      rolePermissions
    });
    alert("✅ Permissions saved to Firebase!");
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Roles & Permissions
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            {permissions.map((perm) => (
              <TableCell key={perm}>
                {perm}
                <IconButton
                  size="small"
                  onClick={() => handleDeletePermission(perm)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role}>
              <TableCell>{role}</TableCell>
              {permissions.map((perm) => (
                <TableCell key={perm}>
                  <Checkbox
                    checked={rolePermissions[role]?.includes(perm) || false}
                    onChange={() => togglePermission(role, perm)}
                  />
                </TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => handleDeleteRole(role)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <TextField
          label="New Role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          size="small"
        />
        <Button variant="outlined" onClick={handleAddRole}>
          Add Role
        </Button>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <TextField
          label="New Permission"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          size="small"
        />
        <Button variant="outlined" onClick={handleAddPermission}>
          Add Permission
        </Button>
      </div>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handleSave}
        sx={{ mt: 3 }}
      >
        Save Permissions
      </Button>
    </Container>
  );
}
