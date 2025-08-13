// src/pages/ExpiredMedicines.jsx
import React from "react";

export default function ExpiredMedicines({ medicines }) {
  const today = new Date();

  // Filter medicines whose expiry date is before today
  const expiredList = medicines.filter((med) => new Date(med.expiryDate) < today);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Expired Medicines</h1>

      {expiredList.length === 0 ? (
        <p>No expired medicines found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Barcode</th>
                <th className="px-6 py-3 text-left">Price (Ksh)</th>
                <th className="px-6 py-3 text-left">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expiredList.map((med, index) => (
                <tr key={index} className="bg-red-100">
                  <td className="px-6 py-4">{med.name}</td>
                  <td className="px-6 py-4">{med.barcode}</td>
                  <td className="px-6 py-4">Ksh {med.price}</td>
                  <td className="px-6 py-4">{med.expiryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
