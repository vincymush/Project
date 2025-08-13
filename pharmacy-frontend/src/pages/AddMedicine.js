// src/pages/AddMedicine.jsx
import React, { useState } from "react";

export default function AddMedicine({ medicines, setMedicines }) {
  const [form, setForm] = useState({ name: "", barcode: "", price: "", expiryDate: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, barcode, price, expiryDate } = form;
    if (!name || !barcode || !price || !expiryDate) {
      alert("Please fill in all fields");
      return;
    }

    if (editId !== null) {
      setMedicines((prev) =>
        prev.map((med) => (med.id === editId ? { ...form, id: editId } : med))
      );
      setEditId(null);
    } else {
      const newMedicine = { ...form, id: Date.now() }; // Unique ID
      setMedicines((prev) => [...prev, newMedicine]);
    }

    setForm({ name: "", barcode: "", price: "", expiryDate: "" });
  };

  const handleEdit = (id) => {
    const med = medicines.find((m) => m.id === id);
    if (med) {
      setForm({ name: med.name, barcode: med.barcode, price: med.price, expiryDate: med.expiryDate });
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines((prev) => prev.filter((m) => m.id !== id));
      if (editId === id) setEditId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Medicine</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6 space-y-4">
        <div>
          <label className="block font-semibold mb-1">Medicine Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Barcode:</label>
          <input type="text" name="barcode" value={form.barcode} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Price (Ksh):</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Expiry Date:</label>
          <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId !== null ? "Update Medicine" : "Add Medicine"}
        </button>
      </form>

      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Barcode</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Expiry Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {medicines.map((med) => (
              <tr key={med.id}>
                <td className="px-6 py-4">{med.name}</td>
                <td className="px-6 py-4">{med.barcode}</td>
                <td className="px-6 py-4">Ksh {med.price}</td>
                <td className="px-6 py-4">{med.expiryDate}</td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => handleEdit(med.id)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(med.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
