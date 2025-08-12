import React, { useState, useEffect } from "react";

export default function Reports() {
  const [lowStock, setLowStock] = useState([]);
  const [expiredMeds, setExpiredMeds] = useState([]);
  const [dailyReport, setDailyReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const sampleMedicines = [
        { id: 1, name: "Paracetamol", stock: 10, expiryDate: "2025-12-31" },
        { id: 2, name: "Ibuprofen", stock: 3, expiryDate: "2024-06-01" },
        { id: 3, name: "Aspirin", stock: 0, expiryDate: "2023-11-30" },
      ];

      const today = new Date();

      const lowStockMeds = sampleMedicines.filter((med) => med.stock <= 5);
      const expired = sampleMedicines.filter(
        (med) => new Date(med.expiryDate) < today
      );

      const daily = {
        totalSales: 120,
        prescriptionsVerified: 25,
        medicinesRestocked: 10,
      };

      setLowStock(lowStockMeds);
      setExpiredMeds(expired);
      setDailyReport(daily);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="flex flex-wrap gap-4">
      {/* Low Stock Box */}
      <section className="bg-white p-4 rounded shadow-md w-48 h-30 overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Low Stock Alerts (≤ 5 units)</h3>
        {lowStock.length === 0 ? (
          <p>No low stock medicines.</p>
        ) : (
          <ul className="text-sm">
            {lowStock.map((med) => (
              <li key={med.id}>
                {med.name} — Stock: {med.stock}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Expired Medicines Box */}
      <section className="bg-white p-4 rounded shadow-md w-48 h-35 overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Expired Medicines</h3>
        {expiredMeds.length === 0 ? (
          <p>No expired medicines.</p>
        ) : (
          <ul className="text-sm">
            {expiredMeds.map((med) => (
              <li key={med.id}>
                {med.name} — Expired on: {med.expiryDate}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Daily Report Box */}
      <section className="bg-white p-4 rounded shadow-md w-48 h-35">
        <h3 className="text-lg font-semibold mb-2">Daily Report</h3>
        <ul className="text-sm">
          <li>Total Sales: {dailyReport.totalSales}</li>
          <li>Prescriptions Verified: {dailyReport.prescriptionsVerified}</li>
          <li>Medicines Restocked: {dailyReport.medicinesRestocked}</li>
        </ul>
      </section>
    </div>
  );
}
