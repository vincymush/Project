import React from "react";

const sampleActivities = [
  { id: 1, activity: "Added new medicine: Paracetamol", timestamp: "2025-08-10 10:45" },
  { id: 2, activity: "Updated stock for Ibuprofen", timestamp: "2025-08-10 09:30" },
  { id: 3, activity: "Verified prescription #12345", timestamp: "2025-08-09 15:20" },
  { id: 4, activity: "Added new supplier: ABC Pharma", timestamp: "2025-08-09 14:10" },
];

export default function RecentActivities() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Recent Activities</h2>
      <ul className="space-y-3 max-h-[calc(100vh-150px)] overflow-y-auto">
        {sampleActivities.map(({ id, activity, timestamp }) => (
          <li key={id} className="border-b border-gray-200 pb-2">
            <p className="text-gray-800">{activity}</p>
            <p className="text-gray-500 text-xs">{timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
