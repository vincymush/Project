import React from "react";

export default function ReportSummary({ report }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Generated Report</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>
          <span className="font-medium">Total Sales:</span> {report.totalSales}
        </li>
        <li>
          <span className="font-medium">Prescriptions Verified:</span>{" "}
          {report.prescriptionsVerified}
        </li>
        <li>
          <span className="font-medium">Medicines Restocked:</span>{" "}
          {report.medicinesRestocked}
        </li>
      </ul>
    </div>
  );
}
