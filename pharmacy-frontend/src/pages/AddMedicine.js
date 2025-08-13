// src/pages/AddMedicine.jsx
import React, { useState } from "react";

export default function AddMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({ name: "", barcode: "", price: "", expiryDate: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.barcode || !form.price || !form.expiryDate) {
      alert("Please fill in all fields");
      return;
    }

    if (editIndex !== null) {
      const updated = [...medicines];
      updated[editIndex] = form;
      setMedicines(updated);
      setEditIndex(null);
    } else {
      setMedicines([...medicines, form]);
    }

    setForm({ name: "", barcode: "", price: "", expiryDate: "" });
  };

  const handleEdit = (index) => {
    setForm(medicines[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Medicine</h1>

      {/* Medicine Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md mb-6 space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Medicine Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Barcode:</label>
          <input
            type="text"
            name="barcode"
            value={form.barcode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Price (Ksh):</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Expiry Date:</label>
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition-colors"
        >
          {editIndex !== null ? "Update Medicine" : "Add Medicine"}
        </button>
      </form>

      {/* Medicines Table */}
      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Barcode</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Price (Ksh)</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Expiry Date</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No medicines added yet
                </td>
              </tr>
            ) : (
              medicines.map((med, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{med.name}</td>
                  <td className="px-6 py-4">{med.barcode}</td>
                  <td className="px-6 py-4">Ksh {med.price}</td>
                  <td className="px-6 py-4">{med.expiryDate}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
