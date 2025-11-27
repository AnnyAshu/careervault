import React from "react";

function DashboardCard({ title, value, bg }) {
  return (
    <div className="card" style={{ background: bg || "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default DashboardCard;  // <<< THIS IS REQUIRED
