import React, { useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "pharmacist" },
    { id: 2, name: "Bob", role: "cashier" },
  ]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("pharmacist");

  const addUser = () => {
    if (!newUserName.trim()) return;
    const newUser = {
      id: Date.now(),
      name: newUserName.trim(),
      role: newUserRole,
    };
    setUsers((prev) => [...prev, newUser]);
    setNewUserName("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="User Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <select
          value={newUserRole}
          onChange={(e) => setNewUserRole(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        >
          <option value="pharmacist">Pharmacist</option>
          <option value="cashier">Cashier</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, role }) => (
            <tr key={id}>
              <td className="border px-4 py-2">{id}</td>
              <td className="border px-4 py-2">{name}</td>
              <td className="border px-4 py-2">{role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
