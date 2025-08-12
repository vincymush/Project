import React, { useState } from "react";

export default function Orders() {
  const [orders] = useState([
    { id: 101, customer: "John Doe", total: 150, status: "Pending" },
    { id: 102, customer: "Jane Smith", total: 200, status: "Completed" },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Total ($)</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ id, customer, total, status }) => (
            <tr key={id}>
              <td className="border px-4 py-2">{id}</td>
              <td className="border px-4 py-2">{customer}</td>
              <td className="border px-4 py-2">{total}</td>
              <td className="border px-4 py-2">{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
