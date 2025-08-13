import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  getDoc
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  // Fetch roles from roles_permissions/config
  useEffect(() => {
    const fetchRoles = async () => {
      const docRef = doc(db, "roles_permissions", "config");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRoles(data.roles || []);
        if (data.roles.length > 0) {
          setNewUserRole(data.roles[0]); // default
        }
      }
    };
    fetchRoles();
  }, []);

  // Listen to users collection
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Add a new user
  const addUser = async () => {
    if (!newUserName.trim() || !newUserRole || !newUserEmail.trim() || !newUserPassword.trim()) {
      return alert("⚠ Please fill in all fields");
    }
    try {
      // Create Auth account
      const userCred = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );

      // Save user record in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        name: newUserName.trim(),
        role: String(newUserRole) // always save as string
      });

      alert("✅ User added successfully!");

      // Reset form
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole(roles[0] || "");
    } catch (err) {
      console.error("Error adding user:", err);
      alert("❌ " + err.message);
    }
  };

  // Delete from Firestore only (Auth deletion is separate)
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const updateUserRole = async (id, newRole) => {
    try {
      await updateDoc(doc(db, "users", id), { role: String(newRole) });
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Add user form */}
      <div className="mb-6 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="User Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={newUserRole}
          onChange={(e) => setNewUserRole(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      {/* Users table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">UID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, role }) => (
            <tr key={id}>
              <td className="border px-4 py-2">{id}</td>
              <td className="border px-4 py-2">{name}</td>
              <td className="border px-4 py-2">
                <select
                  value={role}
                  onChange={(e) => updateUserRole(id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => deleteUser(id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
