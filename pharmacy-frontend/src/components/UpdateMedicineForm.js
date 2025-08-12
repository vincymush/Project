import React, { useState, useEffect } from "react";

export default function UpdateMedicineForm({ medicine, onUpdate }) {
  const [formData, setFormData] = useState({
    name: medicine.name,
    stock: medicine.stock,
    expiryDate: medicine.expiryDate,
  });

  // To update form when medicine prop changes
  useEffect(() => {
    setFormData({
      name: medicine.name,
      stock: medicine.stock,
      expiryDate: medicine.expiryDate,
    });
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-semibold mb-4">Update Medicine Info</h3>

      <div>
        <label htmlFor="name" className="block font-medium mb-1">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="stock" className="block font-medium mb-1">Stock:</label>
        <input
          id="stock"
          type="number"
          name="stock"
          min="0"
          value={formData.stock}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="expiryDate" className="block font-medium mb-1">Expiry Date:</label>
        <input
          id="expiryDate"
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
      >
        Update Medicine
      </button>
    </form>
  );
}
