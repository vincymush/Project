import React from "react";

export default function MedicinesTable({ medicines }) {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Medicines Table</h2>
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Stock</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{med.id}</td>
              <td className="border border-gray-300 px-4 py-2">{med.name}</td>
              <td className="border border-gray-300 px-4 py-2">{med.stock}</td>
              <td className="border border-gray-300 px-4 py-2">{med.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
