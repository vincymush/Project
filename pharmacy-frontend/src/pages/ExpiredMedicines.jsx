import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // ✅ Adjust path if needed

export default function ExpiredMedicines() {
  const [expiredList, setExpiredList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const today = new Date();
        const soonThreshold = new Date();
        soonThreshold.setDate(today.getDate() + 30); // 30 days ahead

        const querySnapshot = await getDocs(collection(db, "medicines"));
        const fetched = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.expiryDate) {
            const expiry = new Date(data.expiryDate);
            if (expiry < today || expiry <= soonThreshold) {
              fetched.push({
                id: doc.id,
                name: data.name,
                barcode: data.barcode,
                price: data.price,
                expiryDate: data.expiryDate,
                status: expiry < today ? "Expired" : "Expiring Soon",
              });
            }
          }
        });

        setExpiredList(fetched);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading medicines...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Expired & Near-Expiry Medicines</h2>

      {expiredList.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Barcode</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Expiry Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {expiredList.map((med) => (
              <tr key={med.id} className="border-t">
                <td className="p-2">{med.name}</td>
                <td className="p-2">{med.barcode}</td>
                <td className="p-2">{med.price}</td>
                <td className="p-2">{med.expiryDate}</td>
                <td
                  className={`p-2 font-semibold ${
                    med.status === "Expired" ? "text-red-600" : "text-yellow-600"
                  }`}
                >
                  {med.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-green-600 font-semibold">
          ✅ No expired or near-expiry medicines found.
        </p>
      )}
    </div>
  );
}
