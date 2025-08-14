// src/pages/UserManagement.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  setDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUserUID, setNewUserUID] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [search, setSearch] = useState("");

  // Live listen to users collection
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Add a new user
  const addUser = async () => {
    if (!newUserUID.trim() || !newUserName.trim()) {
      return alert("Please enter UID and name");
    }
    try {
      await setDoc(doc(db, "users", newUserUID.trim()), {
        name: newUserName.trim(),
      });
      setNewUserUID("");
      setNewUserName("");
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Filter users based on search input
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Add User Form */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="Firebase UID"
          value={newUserUID}
          onChange={(e) => setNewUserUID(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="User Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </div>

      {/* Search Users */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full max-w-sm"
      />

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">UID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(({ id, name }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{id}</td>
                  <td className="border px-4 py-2">{name}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => deleteUser(id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
