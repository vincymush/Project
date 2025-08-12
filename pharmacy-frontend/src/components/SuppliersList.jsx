import React from "react";

export default function SuppliersList({ suppliers }) {
  if (suppliers.length === 0) {
    return <p>No suppliers added yet.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6 max-w-md">
      <h3 className="text-xl font-semibold mb-3">Suppliers List</h3>
      <ul className="list-disc list-inside space-y-1">
        {suppliers.map((supplier, index) => (
          <li key={index}>
            <strong>{supplier.name}</strong> — {supplier.contact} — {supplier.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
