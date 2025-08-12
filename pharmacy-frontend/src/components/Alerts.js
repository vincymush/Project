import React from "react";

export default function Alerts({ alerts }) {
  if (!alerts.length) return null;

  return (
    <div style={{ marginBottom: 20, color: "red" }}>
      {alerts.map((alert, i) => (
        <p key={i}>{alert}</p>
      ))}
    </div>
  );
}
