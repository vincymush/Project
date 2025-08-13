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
  IconButton,
  Select,
  MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { db } from "../firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  deleteDoc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";

export default function AdminRolesUsers() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newRole, setNewRole] = useState("");
  const [newPermission, setNewPermission] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserUID, setNewUserUID] = useState(""); // ✅ store UID for new user

  const docRef = doc(db, "roles_permissions", "config");

  // Default seed values
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

  // Fetch roles & permissions config (auto-seed if missing)
  useEffect(() => {
    const fetchOrSeedConfig = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRoles(data.roles || []);
        setPermissions(data.permissions || []);
        setRolePermissions(data.rolePermissions || {});
        if (data.roles.length > 0) setNewUserRole(data.roles[0]);
      } else {
        // Seed Firestore with defaults
        await setDoc(docRef, {
          roles: defaultRoles,
          permissions: defaultPermissions,
          rolePermissions: defaultRolePermissions
        });
        setRoles(defaultRoles);
        setPermissions(defaultPermissions);
        setRolePermissions(defaultRolePermissions);
        setNewUserRole(defaultRoles[0]);
        console.log("✅ Seeded default roles & permissions.");
      }
      setLoading(false);
    };
    fetchOrSeedConfig();
  }, []);

  // Real-time users listener
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // ====== Roles & Permissions ======
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

  const handleSaveConfig = async () => {
    await setDoc(docRef, { roles, permissions, rolePermissions });
    alert("✅ Roles & permissions saved!");
  };

  // ====== User Management ======
  const addUser = async () => {
    if (!newUserName.trim() || !newUserRole || !newUserUID.trim()) {
      return alert("Please enter UID, name, and role");
    }
    await setDoc(doc(db, "users", newUserUID.trim()), {
      name: newUserName.trim(),
      role: newUserRole
    });
    setNewUserName("");
    setNewUserUID("");
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  const updateUserRole = async (id, role) => {
    await updateDoc(doc(db, "users", id), { role });
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel — Roles, Permissions & Users
      </Typography>

      {/* ====== ROLES & PERMISSIONS ====== */}
      <Typography variant="h6" gutterBottom>Roles & Permissions</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            {permissions.map((perm) => (
              <TableCell key={perm}>
                {perm}
                <IconButton size="small" onClick={() => handleDeletePermission(perm)}>
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

      {/* Add Role & Permission */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <TextField label="New Role" value={newRole} onChange={(e) => setNewRole(e.target.value)} size="small" />
        <Button variant="outlined" onClick={handleAddRole}>Add Role</Button>
      </div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <TextField label="New Permission" value={newPermission} onChange={(e) => setNewPermission(e.target.value)} size="small" />
        <Button variant="outlined" onClick={handleAddPermission}>Add Permission</Button>
      </div>
      <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveConfig} sx={{ mt: 2 }}>
        Save Roles & Permissions
      </Button>

      {/* ====== USERS ====== */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>User Management</Typography>
      <div className="mb-6 flex gap-2" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <TextField label="Firebase UID" value={newUserUID} onChange={(e) => setNewUserUID(e.target.value)} size="small" />
        <TextField label="User Name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} size="small" />
        <Select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} size="small">
          {roles.map((role) => <MenuItem key={role} value={role}>{role}</MenuItem>)}
        </Select>
        <Button variant="contained" onClick={addUser}>Add User</Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, name, role }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>
                <Select value={role} onChange={(e) => updateUserRole(id, e.target.value)} size="small">
                  {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </Select>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => deleteUser(id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
